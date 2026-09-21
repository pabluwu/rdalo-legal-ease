# Plan SEO — acuerdalo.cl

> **Objetivo:** corregir la causa raíz técnica que impide posicionar, y luego construir
> sobre las dos URLs con alcance real (calculadora de pensión y guía de divorcio) para
> ganar posiciones en Google en el mercado chileno de derecho de familia.
>
> **Dominio canónico definido:** `https://acuerdalo.cl` (sin `www`).
> Todo canonical, sitemap, redirección y enlace interno debe apuntar a este host.
>
> **Fuentes:** export de Google Search Console (29/04/2026 – 28/07/2026), auditoría
> técnica del sitio en vivo y revisión del código en este repositorio.
> **Fecha:** 30 de julio de 2026.

---

## 0. Veredicto en una línea

El sitio nunca posicionó, y la causa es técnica: es un SPA (Vite + React) que entrega a
Google un HTML **vacío e idéntico en todas las URLs**. Hasta corregir eso (Fase 1),
ninguna otra acción de contenido tendrá efecto. Después, todo el esfuerzo se concentra en
dos clústeres: **pensión de alimentos** (donde ya se convierte) y **divorcio** (donde hay
demanda enorme y hoy desperdiciada).

---

## 1. Diagnóstico verificado

Estado a fecha de auditoría, confirmado contra el código y contra el HTML servido en vivo.

| Problema | Evidencia | Gravedad |
|---|---|---|
| HTML inicial vacío e idéntico en todas las URLs | SPA Vite+React sin SSR/prerender; `<div id="root">` vacío en todas las rutas. Todo el `<title>`/description se inyecta en cliente con `react-helmet-async`. | **Crítica** |
| Títulos y descripciones duplicados al 100% | El HTML servido en `/calculadora-pension` trae el `<title>` genérico de la home, en inglés. | **Crítica** |
| Host duplicado sin redirección | `https://acuerdalo.cl/` y `https://www.acuerdalo.cl/` devuelven **ambos HTTP 200**. | **Alta** |
| Soft 404 masivos | Una URL inventada devuelve **HTTP 200** con la app, en vez de 404. | **Alta** |
| `<html lang="en">` | En `index.html`, sobre un sitio 100% chileno en español. | **Media** |
| Dos sistemas de SEO en conflicto | `src/seo/Seo.tsx` (bueno) vs `src/hooks/useSeo.ts` (sin canonical, con `meta keywords` obsoleto). La **home y los índices no tienen canonical**. | **Media** |
| Sin `og:image` | Se declara `twitter:card = summary_large_image` sin imagen. | **Media** |
| robots.txt con dos bloques `User-agent: *` | Uno inyectado por Cloudflare + otro del repo. `Sitemap:` apunta a host equivocado. | **Baja** |
| Sitemap sin `lastmod` y con host sin definir | Impide priorizar re-rastreo; debe usar host canónico. | **Baja** |
| Ruta `/calculadora-pension/:cantidadHijosParam` | Puede generar múltiples URLs indexables de la misma calculadora. | **Baja** |
| 8 páginas `/servicios/*` + `/documentos` construidas pero comentadas | Contenido hecho que no existe como URL (`src/App.tsx`). | **Baja** |

### Magnitud del problema (GSC, 91 días)

- **747 impresiones, 7 clics** en total → un visitante orgánico cada ~13 días.
- 96,1 % de las impresiones ocurren en posición 51 o peor; 66,8 % en posición 81+.
  Perfil típico de "indexado pero enterrado": Google conoce el dominio pero apenas
  entiende el contenido.
- La "mejora" de posición media en julio (de 83 a 28) es un **espejismo**: el sitio dejó
  de aparecer en los términos grandes y solo sobreviven consultas residuales de cola larga.

### Factores agravantes

- **Core update de mayo 2026** (21 may – 2 jun): coincide con el deterioro. No es la causa,
  es el detonante; los core updates descartan justo este perfil (sin contenido legible en
  HTML, sin señales de autoría).
- **Contenido YMYL sin E-E-A-T:** derecho de familia, pensiones y divorcio exigen un
  estándar altísimo de experiencia/autoridad/confianza. La SERP chilena está dominada por
  bcn.cl, pjud.cl y despachos consolidados. Competir sin autor identificado, credenciales
  ni citas a la normativa es inviable.

---

## 2. URLs de mayor alcance (foco del plan)

Prioridad derivada directamente de Search Console.

| URL | Impresiones | Clics | Posición | Rol estratégico |
|---|---:|---:|---:|---|
| `/calculadora-pension` | 406 | **7 (100 % de los clics)** | 18,4 | **Único activo que convierte.** Subir a top 10. |
| `/guias/divorcio/marco-teorico` | 291 | 0 | 82 | **73 % de las impresiones**, enterrada. Mayor oportunidad de contenido. |
| `/guias/pension-de-alimentos/marco-teorico` | 36 | 0 | 63 | Reforzar el clúster de pensión junto a la calculadora. |
| `/guias/medidas-de-proteccion/marco-teorico` | 9 | 0 | 27 | Ya cerca; empuje pequeño. |
| `/` (home) | 5 | 0 | 6 | Marca. Mantener. |

**Distribución de la demanda por tema:**

| Tema | Consultas | Impresiones | % del total | Posición media | Clics |
|---|---:|---:|---:|---:|---:|
| Divorcio | 25 | 282 | 73,1 % | 84,0 | 0 |
| Pensión de alimentos | 45 | 104 | 26,9 % | 63,3 | 0 |

**Lectura estratégica:** la herramienta (calculadora) funciona; el "marco teórico" no. El
73 % de las impresiones viene de divorcio pero está en posición 84 y no convierte. La
señal es clara: hay que **replicar el modelo de la calculadora** (utilidad interactiva) y
**reescribir las guías con enfoque de usuario**, no de apunte académico.

**Mercado objetivo:** el tráfico útil es de Chile y mayoritariamente móvil. Las impresiones
de EE. UU. (89) y de países sin relación (Bangladés, Sierra Leona, Túnez, Taiwán…) son
ruido irrelevante para un servicio legal chileno.

---

## 3. Fase 1 — Bloqueante (semanas 1-2)

Sin esto, nada más funciona. La métrica que valida el éxito es **el número de páginas
indexadas en Search Console**: si tras el deploy no sube en 1-3 semanas, el prerender no
está sirviendo bien y hay que revisar antes de continuar.

### 3.1 Prerenderizado estático con `vite-react-ssg` — la corrección central

**Decisión técnica:** para este stack (Vite + React Router + contenido estático + ~13
rutas + Cloudflare), la solución correcta es **prerenderizado estático en el build**, no un
servidor. Recomendación: [`vite-react-ssg`](https://github.com/Daydreamer-riri/vite-react-ssg).

Por qué esta opción y no Next.js/Astro:
- El contenido es **estático** (guías legales); no se necesita servidor, se necesita HTML
  pre-generado por ruta.
- Es casi *drop-in*: mantiene React Router y `react-helmet-async`. Genera un `.html` real
  por ruta, con su título, contenido y canonical dentro del HTML.
- Riesgo bajo, sin reescribir la app. Migrar a Next.js serían semanas innecesarias.

Toques de migración:
1. Extraer las rutas de `src/App.tsx` al formato de rutas de `vite-react-ssg`.
2. Cambiar el entrypoint en `src/main.tsx` a `ViteReactSSG`.
3. Ajustar `vite.config.ts` / script de build (`vite-react-ssg build`).
4. Verificar que la calculadora sigue interactiva tras la hidratación (client-side normal).
5. Confirmar que cada ruta genera su `index.html` con contenido real:
   `/index.html`, `/calculadora-pension/index.html`,
   `/guias/divorcio/marco-teorico/index.html`, etc.

### 3.2 Acciones de higiene técnica (impacto alto / esfuerzo bajo)

| # | Acción | Dónde | Estado |
|---|---|---|---|
| 1 | Prerender con `vite-react-ssg` | `main.tsx`, `App.tsx`, `Layout.tsx`, `vite.config.ts` | ✅ Hecho en código |
| 2 | `lang="es-CL"` | `index.html` | ✅ Hecho en código |
| 3 | Unificar SEO en `Seo.tsx` | 6 páginas | ✅ Hecho en código |
| 4 | Quitar `meta keywords` | `index.html` + `useSeo` eliminado | ✅ Hecho en código |
| 5 | Canonical autorreferencial en todas las páginas | `Seo.tsx` | ✅ Hecho en código |
| 6 | 301 `www` → no-www | Cloudflare (regla de redirección) | ✅ Aplicado y confirmado en vivo (30/07/2026) |
| 7 | Devolver 404 real | nginx del VPS | ✅ Aplicado y confirmado en vivo (30/07/2026) |
| 8 | robots.txt limpio | `public/robots.txt` | ✅ Hecho en código |
| 9 | Sitemap al host canónico + `lastmod` | `public/sitemap.xml` | ✅ Hecho en código |
| 10 | `og:image`, `og:url`, `og:site_name` | `index.html` / `Seo.tsx` | ✅ Hecho. `public/og-image.jpg` existe y se sirve (verificado en vivo 21/09/2026) |
| 11 | Canonicalizar la calculadora paramétrica | `CalculadoraPension.tsx` | ✅ Hecho en código |
| 12 | Verificar en Search Console | GSC → Inspección de URL | ✅ Hecho (30/07/2026) — `/`, `/calculadora-pension` y `/guias/divorcio/marco-teorico` inspeccionadas y reindexación solicitada |

### 3.3 Notas de despliegue (fuera de este repositorio)

El sitio se sirve desde un VPS con **nginx**, detrás de **Cloudflare** como proxy
(`.github/workflows/deploy.yml`: build → `rsync` a `/var/www/acuerdalo/` → `systemctl restart nginx`).
Estos tres puntos no se pueden resolver con cambios de código; requieren acceso al
panel de Cloudflare o al servidor:

**a) Redirección 301 `www` → sin `www`** ✅ **Aplicado y confirmado en vivo (30/07/2026)**:
`https://www.acuerdalo.cl/*` → 301 → `https://acuerdalo.cl/*` en un solo salto.

**b) 404 real + evitar el 301 automático de nginx en rutas nested** (config de nginx en el VPS).
El build ahora genera un `index.html` estático real por cada ruta (`dist/calculadora-pension/index.html`,
`dist/guias/divorcio/marco-teorico/index.html`, etc.) más `dist/404/index.html`.

⚠️ **Confirmado en vivo tras el deploy de Fase 1 (30/07/2026):** con la config de nginx previa al
cambio (típica de SPA: `try_files $uri $uri/ /index.html;`), cualquier URL nested devuelve
**HTTP 301** agregando el slash final (`/calculadora-pension` → 301 → `/calculadora-pension/`) —
comportamiento automático de nginx cuando la URL solicitada coincide con un directorio físico real
sin slash. Esto afecta a **10 de las 11 URLs del sitemap** (todo excepto `/`) y hace que el propio
`<link rel="canonical">` de cada página (sin slash, por convención) redirija lejos de sí mismo antes
de servir contenido — justo el tipo de señal de canonicalización confusa que se buscaba eliminar.

Sugerencia de bloque `server` (ajustar `root` a `/var/www/acuerdalo`) — usa `$uri/index.html`
(un **archivo**) en vez de `$uri/` (que nginx interpreta como directorio y dispara el 301):

```nginx
location / {
  try_files $uri $uri/index.html /index.html;
}
error_page 404 /404/index.html;
```

Esto logra: cada URL real sirve su HTML propio **sin redirect**; `/calculadora-pension/2-hijos`
(parametrizada, no prerenderizada) sigue mostrando la calculadora vía el fallback SPA (`/index.html`);
cualquier otra URL inexistente devuelve **HTTP 404** real con la página `NotFound` (marcada `noindex`).

✅ **Aplicado y confirmado en vivo (30/07/2026):** las 11 URLs del sitemap responden 200 directo
(sin redirect), el canonical de cada página ya no se redirige a sí mismo, y una URL inventada
devuelve HTTP 404 real sirviendo la página `NotFound`.

**c) Asset de imagen `og-image.jpg`** (1200×630px, con marca): subir a `public/og-image.jpg`
en el repo. Las etiquetas `og:image`/`twitter:image` ya apuntan a `https://acuerdalo.cl/og-image.jpg`;
falta el archivo.

**d) Verificación en Search Console** ✅ **Hecho (30/07/2026):** Inspección de URL sobre
`/`, `/calculadora-pension` y `/guias/divorcio/marco-teorico` y reindexación solicitada, ya con
el fix de nginx aplicado (sin los 301 que habrían distorsionado el resultado).

---

## 4. Fase 2 — Contenido y confianza (semanas 3-8)

Con el HTML ya legible, atacar los dos clústeres.

### 4.1 Clúster Divorcio (mayor alcance latente)

- **Renombrar la URL** `/guias/divorcio/marco-teorico` → `/divorcio-en-chile`
  (con **301** desde la antigua para no perder las 291 impresiones). "Marco teórico" suena
  a apunte académico; la gente busca "cómo divorciarme", plazos, costos, paso a paso.
- **Reescribir con enfoque de usuario:** proceso paso a paso, plazos por tipo de divorcio,
  costos, qué pasa si el otro se niega, compensación económica con ejemplos. Mayor
  profundidad frente a bcn.cl/pjud.cl.
- **Firmar la guía** con autor real, credenciales verificables y fecha de actualización.
- **Herramienta interactiva** replicando el modelo de la calculadora (p. ej. simulador de
  tipo de divorcio / plazos según situación).

### 4.2 Clúster Pensión de alimentos (donde ya se convierte)

- **Expandir alrededor de la calculadora**, que es el único activo con tracción probada.
- Guías de apoyo: cómo se calcula, porcentajes por número de hijos, qué incluye, retención,
  aumento/rebaja de pensión.
- **Enlazado interno** calculadora ↔ guías en ambos sentidos.

### 4.3 E-E-A-T y datos estructurados (todo el sitio)

- Página **"Quiénes somos"** con el equipo, credenciales y experiencia.
- **Firmar cada guía** con autor + fecha de actualización.
- **Citar y enlazar la normativa** aplicable desde bcn.cl (Ley 19.947 de Matrimonio Civil,
  Ley 14.908 de Abandono de Familia y Pago de Pensiones Alimenticias).
- **Datos estructurados:** `Organization`, `LegalService`, `BreadcrumbList` y `FAQPage`
  (esta última ya existe en la guía de divorcio — replicar en las demás).
- **Revivir las páginas `/servicios/*`** como landing pages de conversión reales.

---

## 5. Fase 3 — Crecimiento (mes 3 en adelante)

| Acción | Impacto | Esfuerzo |
|---|---|---|
| Expandir el clúster de pensión alrededor de la calculadora | Alto | Medio |
| Más herramientas interactivas por tema (simuladores, generadores de acuerdo) | Alto | Medio |
| Enlaces desde colegios de abogados, medios y directorios legales chilenos | Alto | Alto |
| Ficha de Google Business Profile (si hay atención presencial) | Medio | Bajo |
| Revisión mensual de Search Console (páginas indexadas, posiciones) | Medio | Bajo |

---

## 6. Expectativas realistas

- **Semanas 1-3 tras el deploy de SSG:** sube el número de páginas indexadas y las
  impresiones. Primer indicador de que la corrección funcionó.
- **Semanas 4-10:** posiciones migran del rango 80+ hacia 20-40. La posición media
  *aparente* puede empeorar al principio porque el sitio vuelve a aparecer en términos
  competitivos: es buena señal, no mala.
- **Meses 3-6:** primeros clics sostenidos, siempre que la Fase 2 esté ejecutada. Sin
  E-E-A-T no habrá top 10 en YMYL.

**Métrica por encima de todas:** páginas indexadas en Search Console. Si tras el SSG no
sube, el despliegue no está sirviendo bien el HTML y hay que revisarlo antes de seguir.

---

## 7. Checklist de implementación (para ejecutar luego)

### Fase 1 — Técnica (bloqueante)
- [x] Migrar a `vite-react-ssg` (rutas, entrypoint, build) y verificar HTML por ruta
- [x] `lang="es-CL"` en `index.html`
- [x] Migrar Home + `GuiasIndex` + 4 índices de `useSeo` → `Seo.tsx`
- [x] Borrar `src/hooks/useSeo.ts`
- [x] Eliminar `meta keywords` de `index.html`
- [x] Canonical autorreferencial en todas las páginas (host `acuerdalo.cl`)
- [x] 301 `www.acuerdalo.cl` → `acuerdalo.cl` en Cloudflare — confirmado en vivo (30/07/2026)
- [x] Ruta `/404` prerenderizada y marcada `noindex` (código listo)
- [x] Config de nginx para servir 404 real — confirmado en vivo (30/07/2026)
- [x] `public/robots.txt` limpio, `Sitemap:` a `https://acuerdalo.cl/sitemap.xml`
- [x] `public/sitemap.xml` con host canónico + `lastmod`
- [x] Etiquetas `og:image` + `og:url` + `og:site_name` conectadas en `Seo.tsx`
- [x] Subir archivo real `public/og-image.jpg` — verificado en vivo (21/09/2026)
- [x] Canonical de `/calculadora-pension/:param` → `/calculadora-pension`
- [x] GSC: inspección de URL + solicitar reindexación — hecho (30/07/2026)

### Fase 2 — Contenido y confianza
- [x] Renombrar `/guias/divorcio/marco-teorico` → `/divorcio-en-chile` — el 301 en nginx está
      aplicado y confirmado en vivo (21/09/2026)
- [x] Reescribir guía de divorcio con enfoque de usuario
- [x] Autor + credenciales + fecha en cada guía (fechas actualizadas al 28/08/2026)
- [x] Página "Quiénes somos"
- [x] Citas y enlaces a normativa (bcn.cl) en las 4 guías (divorcio, pensión, visitas, medidas)
- [x] Datos estructurados: `Organization`/`LegalService` (home), `Person` (Quiénes somos),
      `BreadcrumbList` (10 páginas), `FAQPage` (4 guías)
- [x] Enlazado interno calculadora ↔ guías (bidireccional en las 4 guías principales)
- [ ] Revivir páginas `/servicios/*` — **no iniciado**. Las 8 páginas (`src/pages/servicios/*`)
      existen pero su contenido es literalmente "Texto pendiente..." placeholder, sin `<Seo>`,
      sin breadcrumb ni autor. Publicarlas así reintroduciría el problema de contenido delgado
      que motivó la Fase 1. Requiere redactar y verificar contenido legal real por cada servicio
      antes de descomentar las rutas en `App.tsx`.

### Fase 3 — Crecimiento
- [ ] Nuevas herramientas interactivas por tema
- [ ] Link building (colegios de abogados, medios, directorios)
- [ ] Google Business Profile (si aplica)
- [ ] Revisión mensual de Search Console
</content>


---

## 8. Fase 4 — Reparar y consolidar (21 de septiembre de 2026)

Revisión con los informes de GSC (20/06–19/09/2026), Cobertura y Microsoft Clarity.

### 8.1 Qué decían los datos

| Métrica | Informe julio | Informe 21/09 |
|---|---:|---:|
| Impresiones (91 d) | 747 | 405 |
| Clics | 7 | 1 (desde Irlanda, pos. 4) |
| Posición de `/calculadora-pension` | 18,4 | 40,5 |
| Páginas indexadas | — | **5**, bajando desde 7 |
| Páginas sin indexar | — | **12** |

Tres hallazgos nuevos:

1. **Hidratación rota, pero solo en `/calculadora-pension/:cantidadHijosParam`.** nginx servía el
   HTML prerenderizado de `/calculadora-pension` mientras React renderizaba la variante
   paramétrica, con H1 distinto. 10 errores de React por carga (#418/#423/#425). El resto de las
   páginas hidrataba limpio: los 64 errores de JS que reporta Clarity son ~6-7 cargas de esa ruta,
   no un problema de todo el sitio.
2. **Canibalización.** Dos URLs por tema: un índice de 248–311 palabras y una guía de ~1.300. Google
   indexaba la equivocada (en pensión rankeaba el índice de 275 palabras) o ninguna.
3. **El tráfico real viene de Bing.** Clarity: Bing 70 sesiones, Yahoo 15, **Google 2**. Y convierte:
   4 envíos de formulario sobre 81 sesiones reales. El embudo funciona; lo roto es la adquisición
   desde Google.

Advertencia de lectura: el commit `945ff4c` (02/09) documenta que el CI publicó código viejo *"de
julio a septiembre"*. El contenido de Fase 2 pudo tener exposición real recién desde el 2 de
septiembre.

### 8.2 Qué se hizo en el código

- **Eliminada la ruta `/calculadora-pension/:cantidadHijosParam`.** No estaba enlazada desde ninguna
  parte, su canonical apuntaba a `/calculadora-pension` (así que nunca podría rankear) y era la
  única fuente de errores de hidratación. También eliminaba la superficie infinita de soft-404
  (`/calculadora-pension/99-hijos` devolvía 200).
- **Consolidación de 12 URLs a 8.** El contenido largo de cada `*/marco-teorico` pasó a vivir en la
  URL de categoría, que ya tenía historial en Google. `/guias/divorcio` desaparece en favor de
  `/divorcio-en-chile`.
- **Calculadora expandida** de 508 a ~1.210 palabras, con las secciones que piden las consultas de
  GSC: tabla de mínimos por número de hijos, ejemplos resueltos, qué ingresos cuentan, qué incluye
  la pensión, qué pasa si no se paga, tramitación paso a paso, aumento y rebaja. Más `AuthorByline`,
  `BreadcrumbList` y citas a bcn.cl.
- **Asistente de IA visible.** `AsistenteCalculadora` → `AsistenteLegal`, con prop `tema`. Deja de
  estar condicionado a `resultado !== null` y aparece en las 6 páginas de contenido más `/guias`.
  Su cáscara (titular, intro, sugerencias, descargo) se prerenderiza: antes eran 0 palabras en el
  HTML servido.
- **Fuente única para el ingreso mínimo.** El código usaba 539.000 y el texto 529.000; el JSON-LD de
  FAQ afirmaba un mínimo por dos hijos que el propio cálculo contradecía. Ahora todo deriva de la
  constante `INGRESO_MINIMO`, actualizada a **553.553** (vigente desde el 21/09/2026). Al cambiar
  ese número se actualizan tabla, prosa, ejemplos y datos estructurados a la vez.
- **Las respuestas del FAQ de la home no llegaban al rastreador.** Radix `Accordion` no monta el
  contenido de los items cerrados, así que unas 600 palabras de `src/components/FAQ.tsx` —las seis
  respuestas completas— no existían en el HTML prerenderizado. Con `forceMount` y ocultación por
  CSS la home pasa de **576 a 1.179 palabras** sin cambiar nada de lo que ve el usuario. Se pierde
  la animación de cierre del acordeón; la de apertura se mantiene.
- **La home no tenía ni un enlace interno en su cuerpo.** Todos los enlaces vivían en navbar y
  footer. Las seis respuestas del FAQ tratan justo los temas de las guías, así que cada una enlaza
  ahora a la suya: 4 destinos distintos desde la página con mejor posición del sitio.
- **Autoría en datos estructurados.** El sitio firmaba cada guía de forma visible con
  `AuthorByline`, pero para un buscador las guías no tenían autor. Nuevo `src/seo/articleJsonLd.ts`:
  las 4 guías y la calculadora declaran `Article` con `author`, `datePublished` (fecha real, del
  historial de git) y `dateModified` (la misma que muestra la firma visible). Nuevo
  `src/seo/entities.ts` con `@id` estables, de modo que el `Person` de /quienes-somos y el
  `LegalService` de la home son las mismas entidades que firman y publican las guías. Es la señal
  de E-E-A-T que el diagnóstico señalaba como bloqueo en contenido YMYL.
- `public/sitemap.xml` reescrito con las 8 URLs y `lastmod` real.

### 8.3 Pendiente en nginx del VPS (fuera de este repo)

Deben aplicarse **antes** del deploy del código, o esas URLs devolverán 404 en la ventana intermedia.

```nginx
# Consolidación de guías: el contenido largo vive ahora en la URL de categoría
location = /guias/pension-de-alimentos/marco-teorico        { return 301 /guias/pension-de-alimentos; }
location = /guias/visitas-y-cuidado-personal/marco-teorico  { return 301 /guias/visitas-y-cuidado-personal; }
location = /guias/medidas-de-proteccion/marco-teorico       { return 301 /guias/medidas-de-proteccion; }
location = /guias/divorcio                                  { return 301 /divorcio-en-chile; }

# La ruta paramétrica de la calculadora ya no existe en la app. Hoy hay una regla
# que sirve /calculadora-pension/index.html para cualquier subruta: hay que
# reemplazarla por este 301, o quedará sirviendo HTML que React no puede hidratar.
location ^~ /calculadora-pension/ { return 301 /calculadora-pension; }
```

`/guias/medidas-de-proteccion/marco-teorico` tenía 15 impresiones en posición 69: ese 301 no es
opcional.

⚠️ **`deploy.yml` hace `rsync` sin `--delete`**, así que los HTML de las URLs eliminadas seguirán en
`/var/www/acuerdalo/`. Los `location =` de arriba tienen prioridad sobre los archivos estáticos, así
que el 301 gana igualmente, pero conviene limpiar el directorio y añadir `--delete` al rsync.

### 8.4 Criterio de cálculo (resuelto)

**El tope del 50 % siempre prevalece, aunque el cálculo por hijo dé un porcentaje mayor.** Criterio
confirmado por Michelle Alvarez el 21/09/2026.

Consecuencia: desde dos hijos el mínimo aplicable se detiene en el 50 % de un ingreso mínimo
(hoy $276.777) y sumar hijos no lo mueve. El tope se mide sobre las rentas del alimentante, así que
con un sueldo más alto la pensión sube hasta el 50 % de ese sueldo.

La fórmula de `calcularPension()` ya lo hacía. Lo que hubo que corregir fue el texto: la tabla de
mínimos, la nota que la acompaña, el ejemplo de dos hijos y dos respuestas del `FAQPage` afirmaban
mínimos sin topar, de modo que la página contradecía a su propia calculadora (decía que el mínimo
por 3 hijos eran $498.198 y entregaba $400.000 con un sueldo de $800.000). La tabla ahora muestra
las dos cifras —el cálculo por hijo y el mínimo aplicable tras el tope— para que el mecanismo se
entienda y no parezca un error que 2, 3 y 4 hijos compartan el mismo piso.

### 8.5 Medición de la calculadora

Un cálculo no se persistía en ninguna parte: `calcularPension()` es estado de cliente y no hace
ninguna llamada de red. El dato solo llegaba a la base de rebote —dentro del texto libre de
`contact_messages` si la persona completaba la pre-evaluación, o en `ai_conversations.contexto_calculo`
si preguntaba al asistente—. Con 88 de 123 sesiones de Clarity aterrizando en la calculadora, no
había forma de saber cuántas llegaban a calcular.

Se añade un evento a GTM (`src/analytics/gtm.ts`), sin backend ni tabla nueva:

```js
{ event: "calculo_pension", hijos, tramo_ingreso, tramo_resultado,
  aplica_minimo_legal, es_pensionado }
```

Se registra el **tramo**, nunca el sueldo exacto: sirve igual para decidir qué ejemplos poner en la
página y qué tramos cubrir, sin guardar la situación económica de nadie. `aplica_minimo_legal` dice
qué parte de la audiencia queda en el piso legal en vez de en un porcentaje de su sueldo.

Configurado en el contenedor `GTM-K6SPZ92X` (21/09/2026), **guardado pero sin publicar**:

- 5 variables de capa de datos: `DLV - hijos`, `DLV - tramo_ingreso`, `DLV - tramo_resultado`,
  `DLV - aplica_minimo_legal`, `DLV - es_pensionado`.
- Activador de evento personalizado `CE - calculo_pension`.
- Etiqueta `GA4 - calculo_pension` (Google Analytics: evento de GA4), con ID de medición
  `{{GA4 Id}}` —la constante que ya existía— y los 5 parámetros mapeados.

Pendiente: pulsar **Enviar** en GTM (mejor después del deploy del código, porque hasta entonces el
evento no existe en el sitio en vivo) y registrar los 5 parámetros como **dimensiones
personalizadas en GA4** (Administrar → Definiciones personalizadas), sin lo cual llegan al evento
pero no se pueden segmentar en los informes.

**Bug corregido de paso:** el estado del número de hijos declaraba `number` pero guardaba `string`
(el input necesita texto para poder borrarse). Además de los tres errores de tipos, provocaba que
`numeroHijos === 1` fuera falso y el modal ofreciera compartir *"por 1 hijos"*. Ahora el input guarda
el texto y el resto de la página usa un valor derivado ya normalizado a 1-10.

### 8.6 Fuera del código

- **Bing Webmaster Tools + IndexNow.** Es el hallazgo más barato del informe: Bing y Yahoo aportan
  el 99 % del tráfico real y nadie lo está cultivando.
- **Leer la tabla `ai_conversations`** (repo `api-acuerdalo-legal`): guarda cada pregunta real hecha
  al asistente. Es investigación de palabras clave en el lenguaje de los usuarios, y no aparece en
  Search Console.
- **Revisar `AI_TOPE_DIARIO_USD`** (hoy 1 USD/día) antes de que el asistente pase de 1 a 7 páginas.
- **Los clics muertos (30 % en Clarity) siguen sin explicación.** Ya no se pueden atribuir a la
  hidratación: hay que investigarlos aparte.
