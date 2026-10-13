// Reubica <meta charset> al primer lugar del <head> en los HTML prerenderizados.
//
// El problema: index.html lo declara en la línea 4, pero vite-react-ssg inyecta
// las etiquetas de <Seo> (title, description, og:*, JSON-LD) ANTES de ella al
// prerenderizar. En la salida real el charset caía en el byte ~6.212, muy por
// detrás del límite de 1.024 bytes que exige la especificación.
//
// Consecuencia observable: el navegador parsea con una codificación supuesta
// hasta encontrar la declaración y entonces vuelve a parsear desde cero, lo que
// retrasa el primer render. Y los metadatos de compartición llegaban mal
// decodificados — "el n<?>mero de hijos" en twitter:description, visible al
// compartir por WhatsApp. Ver PLAN-SEO-OCT-2026.md §4.3.
//
// Esto no sustituye a declarar `charset utf-8;` en nginx: son capas distintas y
// la cabecera gana sobre la etiqueta. Hacen falta las dos.
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const LIMITE_SPEC = 1024;
const CHARSET = '<meta charset="UTF-8">';

// Cualquier forma en que pueda venir escrito: con o sin barra, comillas simples
// o dobles, utf-8 en cualquier caja, espaciado variable.
const RE_CHARSET = /<meta\s+charset=["']?[^"'>\s]+["']?\s*\/?>/gi;

const raiz = process.argv[2] ?? "dist";

// Recorrido a mano en lugar de fs.glob: el build corre en el VPS y glob exige
// Node 22+. Esto funciona en cualquier versión con la que se despliegue.
async function buscarHtml(dir) {
  const encontrados = [];
  for (const entrada of await readdir(dir, { withFileTypes: true })) {
    const ruta = join(dir, entrada.name);
    if (entrada.isDirectory()) encontrados.push(...(await buscarHtml(ruta)));
    else if (entrada.name.endsWith(".html")) encontrados.push(ruta);
  }
  return encontrados;
}

const ficheros = await buscarHtml(raiz);

if (ficheros.length === 0) {
  console.error(`fix-charset: no se encontró ningún .html en ${raiz}/`);
  process.exit(1);
}

let corregidos = 0;
const fallos = [];

for (const fichero of ficheros.sort()) {
  const original = await readFile(fichero, "utf8");

  const posHead = original.search(/<head[^>]*>/i);
  if (posHead === -1) {
    fallos.push(`${fichero}: sin <head>`);
    continue;
  }
  const finHead = posHead + original.match(/<head[^>]*>/i)[0].length;

  // Quita todas las apariciones y reinserta una sola justo tras <head>. Quitar
  // todas importa: dejar una segunda más abajo mantiene el audit en rojo.
  const sinCharset = original.slice(finHead).replace(RE_CHARSET, "");
  const corregido = original.slice(0, finHead) + CHARSET + sinCharset;

  const pos = corregido.indexOf(CHARSET);
  if (pos === -1 || pos >= LIMITE_SPEC) {
    fallos.push(`${fichero}: charset quedó en el byte ${pos}`);
    continue;
  }

  if (corregido !== original) {
    await writeFile(fichero, corregido);
    corregidos++;
  }

  const relativo = fichero.slice(raiz.length + 1) || "index.html";
  console.log(`  charset en el byte ${String(pos).padStart(3)} · ${relativo}`);
}

if (fallos.length) {
  console.error(`\nfix-charset: ${fallos.length} fichero(s) sin corregir:`);
  for (const f of fallos) console.error(`  ${f}`);
  process.exit(1);
}

console.log(
  `fix-charset: ${corregidos} de ${ficheros.length} ficheros reescritos, todos con charset bajo el byte ${LIMITE_SPEC}.`,
);
