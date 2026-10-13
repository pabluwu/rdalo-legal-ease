// Genera dist/sitemap.xml con un <lastmod> real por ruta.
//
// Antes el sitemap era un fichero fijo en public/ y sus 8 lastmod decían
// 2026-09-21 mientras el last-modified de las respuestas era del 2 de octubre.
// Un lastmod inventado no sirve de nada; con la indexación en 5 de 8 páginas es
// justo la señal que no conviene desperdiciar. Ver PLAN-SEO-OCT-2026.md §4.4.
//
// La fecha sale del último commit que tocó el componente de la página. Eso es
// «cuándo cambió esta página de verdad», no «cuándo se desplegó».
//
// Nota: los .md de content/ NO entran aquí. No alimentan el render —son
// documentos de referencia, copiados también al repo de la API— así que su
// fecha no dice nada sobre cuándo cambió la página publicada.
import { writeFile, readdir } from "node:fs/promises";
import { execFile } from "node:child_process";
import { join } from "node:path";
import { promisify } from "node:util";

const ejecutar = promisify(execFile);

const SITIO = "https://acuerdalo.cl";
const raiz = process.argv[2] ?? "dist";

// Tabla explícita en lugar de inferir el origen desde dist/: así se ve de un
// vistazo qué URL existe y con qué prioridad, y el chequeo de deriva de abajo
// avisa si el prerenderizado y esta lista dejan de coincidir.
const RUTAS = [
  { url: "/", fuente: "src/pages/Index.tsx", priority: "1.0", changefreq: "weekly" },
  { url: "/calculadora-pension", fuente: "src/pages/CalculadoraPension.tsx", priority: "0.9", changefreq: "weekly" },
  { url: "/divorcio-en-chile", fuente: "src/pages/DivorcioEnChile.tsx", priority: "0.9", changefreq: "weekly" },
  { url: "/guias/pension-de-alimentos", fuente: "src/pages/guias/PensionAlimentosIndex.tsx", priority: "0.8", changefreq: "weekly" },
  { url: "/guias/visitas-y-cuidado-personal", fuente: "src/pages/guias/VisitasCuidadoPersonalIndex.tsx", priority: "0.8", changefreq: "weekly" },
  { url: "/guias/medidas-de-proteccion", fuente: "src/pages/guias/MedidasProteccionIndex.tsx", priority: "0.8", changefreq: "weekly" },
  { url: "/guias", fuente: "src/pages/guias/GuiasIndex.tsx", priority: "0.7", changefreq: "monthly" },
  { url: "/quienes-somos", fuente: "src/pages/QuienesSomos.tsx", priority: "0.5", changefreq: "monthly" },
];

// /404 se prerenderiza como página de error y nunca va en el sitemap.
const SIN_INDEXAR = new Set(["/404"]);

const hoy = new Date().toISOString().slice(0, 10);

/** Fecha del último commit que tocó el fichero (YYYY-MM-DD). */
async function ultimaModificacion(fuente) {
  try {
    const { stdout } = await ejecutar("git", ["log", "-1", "--format=%cs", "--", fuente]);
    // Fallback a la fecha de build: nunca es falso, solo menos preciso.
    return stdout.trim() || hoy;
  } catch {
    return hoy;
  }
}

/** Rutas realmente prerenderizadas, leídas de dist/. */
async function rutasGeneradas(dir, base = "") {
  const rutas = [];
  for (const entrada of await readdir(dir, { withFileTypes: true })) {
    if (entrada.isDirectory()) {
      if (entrada.name === "assets") continue;
      rutas.push(...(await rutasGeneradas(join(dir, entrada.name), `${base}/${entrada.name}`)));
    } else if (entrada.name === "index.html") {
      rutas.push(base || "/");
    }
  }
  return rutas;
}

const generadas = new Set(await rutasGeneradas(raiz));
const declaradas = new Set(RUTAS.map((r) => r.url));

// Chequeo de deriva. La auditoría verificó «coincidencia exacta con los enlaces
// internos, 0 huérfanas»; esto es lo que impide que se pierda en silencio al
// añadir una página y olvidar el sitemap.
const huerfanas = [...generadas].filter((r) => !declaradas.has(r) && !SIN_INDEXAR.has(r));
const fantasma = [...declaradas].filter((r) => !generadas.has(r));

if (huerfanas.length || fantasma.length) {
  console.error("gen-sitemap: el prerenderizado y la tabla RUTAS no coinciden.");
  for (const r of huerfanas) console.error(`  prerenderizada pero no en el sitemap: ${r}`);
  for (const r of fantasma) console.error(`  en el sitemap pero no prerenderizada: ${r}`);
  console.error("  Corrige la tabla RUTAS en scripts/gen-sitemap.mjs.");
  process.exit(1);
}

const conFecha = await Promise.all(
  RUTAS.map(async (ruta) => ({ ...ruta, lastmod: await ultimaModificacion(ruta.fuente) })),
);

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...conFecha.map(({ url, lastmod, priority, changefreq }) =>
    [
      "  <url>",
      `    <loc>${url === "/" ? `${SITIO}/` : `${SITIO}${url}`}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      "  </url>",
    ].join("\n"),
  ),
  "</urlset>",
  "",
].join("\n");

await writeFile(join(raiz, "sitemap.xml"), xml);

console.log(`gen-sitemap: ${RUTAS.length} URLs escritas en ${raiz}/sitemap.xml`);
for (const { url, lastmod } of conFecha) console.log(`  ${lastmod}  ${url}`);
