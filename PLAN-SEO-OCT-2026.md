# Plan SEO — ciclo de octubre de 2026

> **Origen:** auditoría del 12 de octubre de 2026 (`../seo/audit-acuerdalo.html`).
> **Estado de partida:** SEO Health Score **64/100** sobre 56 comprobaciones
> (29 pass · 13 warn · 14 fail). Era 76/100 sobre 24 comprobaciones el 28 de septiembre.
> **Dominio canónico:** `https://acuerdalo.cl` (sin `www`). Sin cambios.
>
> El ciclo anterior (`PLAN-SEO.md`, julio–septiembre) cerró la causa raíz técnica:
> prerenderizado, canonical, redirecciones, 404 real, bots de IA y autoría visible.
> Este ciclo ataca lo que apareció al medir con datos de campo y en móvil.

---

## 0. Veredicto en una línea

El sitio está bien construido y **Google solo indexa 5 de sus 8 páginas**, con la serie
a la baja. La causa más probable y accionable es que **el LCP en móvil es de 7,2 s**
—354 KB de scripts de terceros por delante de 230 KB de aplicación— y que la página que
sostiene toda la autoridad E-E-A-T tiene 231 palabras. Hasta que la indexación vuelva a
subir, publicar páginas nuevas solo alarga la cola de «descubierta, actualmente sin indexar».

---

## 1. Qué cerró el ciclo anterior

No repetir este trabajo. Verificado en vivo el 12 de octubre.

| Hallazgo de septiembre | Estado | Evidencia en vivo |
|---|---|---|
| H-01 Bots de IA con 403 | ✅ Cerrado | GPTBot, ClaudeBot, Amazonbot, OAI-SearchBot, Claude-SearchBot, PerplexityBot → `200` |
| H-02 Autoría invisible | ⚠️ Mitad | Firma + fecha visibles en las 5 páginas de contenido. `/quienes-somos` sigue en 231 palabras |
| H-03 Calculadora sin enlaces | ⚠️ Mitad | 0 → 14 enlaces contextuales. Sigue sin `<main>`/`<article>` |
| M-03 Caché y bundle | ⚠️ Mitad | Assets a 1 año `immutable` y HTML en el edge. Bundle sigue único (234 KB gzip) |
| M-04 Cabeceras de seguridad | ✅ Cerrado | HSTS, XCTO, XFO, Referrer-Policy presentes |
| M-05 Variantes de URL con 200 | ✅ Cerrado | `/guias/` y `/index.html` → `301`. Las 4 URLs `marco-teorico` también |
| L-01 H1 de la calculadora | ✅ Cerrado | «Calculadora de pensión de alimentos en Chile» |
| M-01 Schema mínimo | ❌ Abierto | Sin cambios |
| M-02 Cero imágenes | ❌ Abierto | Sin cambios |
| M-06 Solo WhatsApp | ❌ Abierto | 0 enlaces `mailto:` en el sitio |

**Corrección al plan anterior.** `PLAN-SEO.md` describió las 8 páginas de
`src/pages/servicios/` como «contenido hecho que no existe como URL». No es así: cada una
tiene ~50 líneas y cuatro bloques con el literal `Texto pendiente - aquí irá…`. Son
plantillas vacías. El coste de H-04 pasa de un sprint técnico a semanas de redacción
jurídica. Ver §6.

---

## 2. Hallazgos nuevos

### C-01 · Crítico — Google indexa 5 de 8 páginas y la serie baja

Export de cobertura de Search Console (`sc-domain:acuerdalo.cl`, al 21 sep):

```
24 ago   7 indexadas ·  4 sin indexar
28 ago   6 indexadas · 11 sin indexar
14 sep   5 indexadas · 12 sin indexar   ← se mantiene hasta el cierre del export
```

Desglose de las 12 sin indexar:

| Motivo | Páginas | Lectura |
|---|---:|---|
| Página con redirección | 3 | Esperado — son las URLs antiguas `marco-teorico` |
| **Descubierta: sin indexar** | **6** | Presupuesto de rastreo. Correlaciona con lentitud y autoridad baja |
| **Rastreada: sin indexar** | **2** | Peor: Google las leyó y las descartó. Juicio de calidad |
| Duplicada sin canónica | 1 | No encaja — las 8 páginas vivas tienen canonical correcto |

### C-02 · Crítico — LCP de 7,2 s en móvil

Lighthouse 13.5.0, Chrome headless, perfil móvil con throttling:

| Métrica | Móvil | Escritorio | Umbral |
|---|---:|---:|---:|
| LCP | **7,2 s** | 1,9 s | ≤ 2,5 s |
| FCP | 2,8–3,2 s | 1,1 s | — |
| TBT | 240 ms | 0 ms | — |
| CLS | 0 | 0 | ≤ 0,1 |
| Performance | 65–68 | 89 | — |

Medido en `/` y `/calculadora-pension`. TTFB del documento 80 ms: **el servidor no es el
problema**. FCP a 2,8 s + LCP a 7,2 s + CLS 0 + TTI idéntico al LCP = contención de CPU
por evaluación de scripts.

Y el móvil es justo donde el sitio funciona (GSC, 3 meses al 21 sep):

```
Móviles     105 impresiones · 1 clic · posición media 41,4
Ordenador   296 impresiones · 0 clics · posición media 74,7
```

### H-03 · Alto — 354 KB de terceros pesan más que la app

| Recurso | Peso | Origen |
|---|---:|---|
| `/assets/app-CMOXUB-V.js` | 229,6 KB | Bundle propio, único, sin fragmentar |
| `googletagmanager.com/gtag/js` | 190,7 KB | GA4 `G-C0CB5BTKDY`, cargado **por** GTM |
| `googletagmanager.com/gtm.js` | 127,1 KB | Contenedor `GTM-K6SPZ92X`, en el `<head>` de `index.html` |
| `scripts.clarity.ms` | 25,0 KB | Microsoft Clarity, cargado por GTM |
| `cloudflareinsights.com/beacon` | 10,2 KB | Analítica del edge |

**Terceros 354 KB vs propio 230 KB.** Evaluación de scripts 593 ms · bootup 0,6 s ·
272 KiB de JS sin usar · el bundle sin comprimir son 798 KB.

### H-01 · Alto — `<meta charset>` en el byte 6.212

`index.html` lo declara en la línea 4, pero `vite-react-ssg` inyecta las etiquetas de
`react-helmet-async` y el JSON-LD **antes** al prerenderizar. Queda muy por detrás del
límite de 1.024 bytes de la especificación.

Consecuencia observable — la description de Twitter llega mal decodificada:

```
"…según tu sueldo y el n<?>mero de hijos"
```

Esto afecta a cómo se ve un enlace compartido en WhatsApp, que es el canal principal
del negocio.

### Resto

| ID | Sev. | Hallazgo |
|---|---|---|
| H-02 | Alto | `/quienes-somos`: 231 palabras, sin foto, sin colegiatura, sin LinkedIn. `seo_checker.py` 79/100 — la única de las 8 que no saca 100 |
| H-04 | Alto | Las 8 páginas de servicio son plantillas con «Texto pendiente» |
| H-05 | Alto | `/calculadora-pension` sin `<main>`: axe `landmark-one-main` falla, a11y 91/100 |
| M-01 | Medio | `LegalService` sin `sameAs`/`priceRange`/`hasOfferCatalog`; `Person` sin `image`/`sameAs`/`description`/`knowsAbout`; sin `WebSite` en la home |
| M-02 | Medio | 0 `<img>` en 8 páginas; la misma `og-image.jpg` en todas; `favicon.ico` de 67 KB |
| M-03 | Medio | 6 de los 14 enlaces de la calculadora van a `/guias/pension-de-alimentos`, 5 con anchor idéntico |
| M-04 | Medio | axe `color-contrast` y `link-in-text-block` fallan |
| M-05 | Medio | Sin CSP; HSTS a 180 días sin `includeSubDomains` ni `preload`. Las pone Cloudflare, no nginx — ver §4.6 |
| M-06 | Medio | 0 `mailto:`; sin dirección, RUT ni razón social |
| L-01 | Bajo | `lastmod` del sitemap desactualizado; titles cortos; favicon; sin `WebSite`; breadcrumb «Home» en es-CL; 7 bots bloqueados sin declarar |

---

## 3. Día 1 — Saber qué URL concreta no está indexada

Media hora en Search Console, sin tocar código. Va primero porque C-01 y H-02 se trabajan
distinto según qué páginas caigan en cada grupo, y el export agregado no lo dice.

- [ ] Export nuevo de cobertura — el del proyecto es del 21 sep, anterior al deploy del 2 oct
- [ ] Informe de indexación → anotar la URL exacta de cada grupo: «descubierta» (6),
      «rastreada» (2), «duplicada sin canónica» (1)
- [ ] Comprobar si la «duplicada» es una variante antigua; si lo es, retirarla o redirigirla
- [ ] **No** solicitar reindexación todavía: sin cambios, el resultado no cambia

Enlace directo (ver memoria del proyecto: la propiedad es `sc-domain`, no prefijo de URL):
`https://search.google.com/search-console/index?resource_id=sc-domain%3Aacuerdalo.cl`

> La inspección de URL no se abre por enlace directo; hay que escribir la URL en la barra
> de búsqueda superior de la interfaz.

---

## 4. Semana 1 — Quitar peso de terceros y arreglar el charset

El mayor retorno por esfuerzo del ciclo. Las dos primeras acciones son configuración, sin
desplegar aplicación, y sacan 317 KB del camino crítico. Atacan C-02 y, por la vía del
presupuesto de rastreo, también las 6 URLs «descubiertas sin indexar».

### 4.1 Reducir terceros

**Decisión (12 oct): quedarse con Clarity.** Eso cambió el planteamiento de este apartado.
El plan original decía «quitar el tag de GA4 del contenedor GTM», lo que exigía el panel de
GTM y seguía costando 127 KB de contenedor para entregar 25 KB de Clarity. Al verificar que
**Clarity también se cargaba a través de GTM**, la opción mejor resultó ser quitar GTM del
sitio por completo — y eso se resuelve en código, sin panel.

- [x] **GTM fuera, Clarity directo.** `index.html` carga Clarity (proyecto `wjaumb7euk`) con
      el mismo patrón de dos mitades: cola síncrona, descarga diferida. GA4 desaparece con el
      contenedor.
- [x] `src/analytics/gtm.ts` → `src/analytics/clarity.ts`. `calculo_pension` pasa de
      `dataLayer.push` a la API de Clarity: `clarity("set", clave, valor)` para las cinco
      dimensiones y `clarity("event", "calculo_pension")` para el evento. Clarity solo acepta
      cadenas como valor, así que los booleanos se formatean a `"si"`/`"no"`.
- [x] `src/hooks/useGtmPageView.ts` eliminado y desenganchado de `Layout.tsx`. Existía porque
      GA4 no detecta navegación en SPA; Clarity sí lo hace de forma nativa — el beacon
      inyectado lo declara con `"spa":2`.
- [x] `<noscript>` de GTM retirado: Clarity graba sesiones, y sin JS no hay sesión que grabar.
- [x] Verificado: **terceros de 354 KB → 29,5 KB (−92 %)**, por debajo del objetivo de
      <100 KB de §10. Ninguna petición a `googletagmanager.com` en el build.
- [ ] **Desactivar Cloudflare Insights** — **requiere el panel de Cloudflare.** Ver abajo.

#### Cloudflare Insights: por qué sigue pendiente

El beacon **no está en el código ni en GTM**. Cloudflare lo inyecta en el edge, y solo para
peticiones que parecen navegador — con `curl` a secas no aparece, con un `User-Agent` de
Chrome sí:

```
<script type="module" src="https://static.cloudflareinsights.com/beacon.min.js/v4bc70e..."
  data-cf-beacon='{"version":"2024.11.0","token":"50faae332dee46b3aed0fde7e3b3df6d","r":1,"spa":2}'>
```

Es Web Analytics con *Automatic Setup* activado para la zona. Solo se desactiva desde el
panel o la API, y **no hay token de API de Cloudflare en esta máquina**.

Conducir Chrome tampoco funcionó, y conviene dejar constancia de por qué: Chrome 136+
rechaza `--remote-debugging-port` sobre el perfil por defecto («DevTools remote debugging
requires a non-default data directory»), una protección deliberada para que ningún proceso
pueda manejar un navegador con sesiones abiertas. La vía alternativa —copiar el perfil a
otro directorio— es exactamente lo que esa protección impide, así que se descartó.

**Qué hacer (30 segundos, en el panel):** `dash.cloudflare.com` → `acuerdalo.cl` →
**Analytics & Logs** → **Web Analytics** → desactivar *Automatic Setup* para el sitio, o
eliminar el sitio de Web Analytics. Vale −10 KB y una conexión menos.

Verificación después:

```bash
curl -sS --compressed -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) \
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36" \
  https://acuerdalo.cl/ | grep -c cloudflareinsights   # debe dar 0
```

> Decisión de producto, no técnica. GA4 da adquisición y consultas; Clarity da grabaciones
> y mapas de calor. Para diagnosticar por qué la calculadora no convierte, Clarity rinde
> más; para seguir posiciones, Search Console ya cubre lo necesario.

### 4.2 Diferir GTM

`index.html` carga GTM síncronamente en el `<head>`. Moverlo a después del `load` saca
317 KB del camino del LCP sin perder los eventos que importan (`calculo_pension` se dispara
tras interacción, siempre posterior al `load`).

- [x] Reemplazar el snippet del `<head>` por una carga diferida tras `load` o primera interacción
- [x] Conservar el `<noscript>` del `<body>`
- [ ] Verificar en GTM Preview que `calculo_pension` sigue registrándose — **requiere panel**

> **Hallazgo durante la ejecución.** `pushDataLayer` (`src/analytics/gtm.ts:14`) hace
> `if (!Array.isArray(dataLayer)) return;` — descarta el evento en silencio si el array no
> existe. Diferir el snippet completo habría perdido los cálculos hechos antes de que
> llegara `gtm.js`. La implementación separa las dos mitades: **`dataLayer` se crea
> síncrono en el `<head>`** (cuesta nada) y solo se difiere la descarga de `gtm.js`. Los
> eventos se encolan en el array y GTM los procesa al cargar, que es el comportamiento
> estándar del contenedor.

### 4.3 Charset al primer lugar del `<head>`

Dos vías; aplicar **ambas**, son independientes y baratas.

- [x] **Post-build.** `scripts/fix-charset.mjs` reubica `<meta charset="UTF-8">` justo tras
      `<head>` en los 9 HTML generados (las 8 páginas + `/404`). Quita todas las apariciones
      antes de reinsertar una sola, y **falla el build** si alguna queda por encima del byte
      1.024. Medido: **byte 6.212 → byte 40** en las 9.
      · `prioritizeSeoTags` se descartó: `Seo.tsx` usa `Head` de `vite-react-ssg`, no
      `react-helmet-async` directamente, así que la opción no aplica a este stack.
- [x] **nginx.** `charset utf-8;` añadido al server block de `acuerdalo.cl`
      (`/etc/nginx/sites-available/acuerdalo.conf`, tras `root`/`index`). Copia de seguridad
      en `acuerdalo.conf.bak-20261013`. `nginx -t` correcto y `systemctl reload nginx`
      aplicado el 13 oct.
      · Origen verificado: `text/html; charset=utf-8` en las 8 páginas, y el sitemap pasa a
      `text/xml; charset=utf-8`. El CSS no lo recibe, y es correcto: `text/css` no está en
      el `charset_types` por defecto de nginx y la especificación ya asume UTF-8.
- [x] Verificado contra el origen en las 8 URLs

> **Por qué la URL real todavía muestra la cabecera vieja.** Cloudflare responde
> `cf-cache-status: REVALIDATED`: con `max-age=300` el edge revalida contra el origen, recibe
> un `304 Not Modified` —el fichero no ha cambiado— y sirve el cuerpo **y las cabeceras que
> tenía almacenadas**. Un 304 no actualiza el `Content-Type`. Con `?cb=<aleatorio>` se fuerza
> un `MISS` y la cabecera nueva aparece, que es la prueba de que el origen está bien.
>
> Se resuelve solo en el próximo deploy, porque cambia el `Last-Modified` de los 9 HTML y el
> edge recibirá `200` en vez de `304`. Purgar la caché de Cloudflare lo adelantaría, pero
> requiere el panel.
- [x] ~~Verificar que desaparece el mojibake de `twitter:description`~~ — **falsa alarma.**
      El fichero prerenderizado siempre tuvo UTF-8 correcto y no contiene ningún U+FFFD; el
      mojibake que recogió la auditoría era un artefacto de la lectura con `curl`, no del
      sitio. El problema de posición del charset es real y Lighthouse lo marcaba; la
      consecuencia en los metadatos de compartición, no.

> **Límite de la verificación local.** El audit `charset` de Lighthouse da `1` (pass) tanto
> antes como después contra el preview local, porque `preview-dist.mjs` envía
> `Content-Type: text/html; charset=utf-8` y la cabecera satisface el audit. En producción
> nginx envía `text/html` a secas, así que **el audit solo se puede validar tras el deploy**.
> La corrección está verificada estructuralmente leyendo los ficheros (byte 40, una sola
> aparición por fichero). Esto refuerza por qué hace falta también la parte de nginx.

### 4.4 `lastmod` real en el sitemap

Los 8 `lastmod` dicen `2026-09-21`; el `last-modified` de las respuestas es del 2 de octubre.
Con C-01 abierto, es justo la señal que no conviene desperdiciar.

- [x] Generar el sitemap en el build con la fecha real de cada ruta —
      `scripts/gen-sitemap.mjs` escribe `dist/sitemap.xml` con el `lastmod` tomado del último
      commit que tocó el componente de cada página. `public/sitemap.xml` se eliminó: era un
      fichero fijo que quedaba obsoleto en cada deploy, y tener las dos fuentes invitaba a
      editar la que no se publica.
      · Incluye **chequeo de deriva**: si el prerenderizado y la tabla `RUTAS` dejan de
      coincidir, el build falla en lugar de publicar un sitemap con huérfanas o fantasmas.
      Es lo que preserva la propiedad «0 huérfanas» que verificó la auditoría.
- [ ] Reenviar el sitemap en Search Console tras el deploy — **requiere panel**

### 4.5 Verificación de la semana

```bash
npx lighthouse https://acuerdalo.cl/calculadora-pension \
  --only-categories=performance --form-factor=mobile --screenEmulation.mobile \
  --chrome-flags="--headless=new" --quiet --output=json --output-path=/tmp/lh.json
```

**Objetivo:** LCP móvil por debajo de 4,0 s (salir de «pobre»). Si no baja, §5 es lo que falta.

#### Medición ya hecha (12 oct, antes del deploy)

Comparación aislada: misma máquina, mismo servidor local, perfil móvil con throttling,
construyendo el commit anterior y el actual. Las cifras **absolutas** no son las de
producción —`preview-dist.mjs` no comprime, así que sirve 780 KB de JS en vez de 230 KB
gzip— pero el **delta** aísla el efecto del cambio.

| Métrica | Original | GTM diferido | **Clarity directo** |
|---|---:|---:|---:|
| TBT | 160 ms | 90 ms | **0 ms** |
| bootup | 0,8 s | 0,7 s | **0,3 s** |
| Terceros | 354 KB | 354 KB | **29,5 KB** |
| LCP | 9,4 s | 6,2 s | 6,2–7,4 s ⁽¹⁾ |
| FCP | 5,6 s | 5,6 s | 5,7 s |
| CLS | 0 | 0 | 0 |
| Performance | 59 | 63 | 62–64 ⁽¹⁾ |

⁽¹⁾ El LCP local oscila entre 6,2 y 7,4 s en tres ejecuciones consecutivas del mismo build.
Es ruido: aquí lo domina la descarga del bundle **sin comprimir** (780 KB en vez de 230 KB
gzip), que ninguno de estos cambios toca — eso es §5.1. **No se puede concluir nada del LCP
desde el preview local.**

Lo que sí es concluyente son las métricas de CPU, que es lo que diagnosticaba C-02: **TBT a
0 ms de forma consistente** en las tres ejecuciones, bootup −63 % y 324 KB de terceros
fuera del camino crítico. FCP no se mueve por la misma razón que el LCP.

**Falta medir en producción tras el deploy.** Es la única cifra que cuenta para el objetivo
de < 4,0 s, y además la semana 1 solo está completa cuando se aplique §4.1, que vale
201 KB más.

- [x] Lint sin regresiones — 10 problemas idénticos antes y después, todos preexistentes
      en `src/components/ui/*` y `tailwind.config.ts`
- [x] `tsc --noEmit` limpio tras sustituir GTM por Clarity
- [x] Contenido prerenderizado intacto en las 8 URLs (1.177 / 1.887 / 1.497 / 1.309 / 1.370 /
      1.362 / 412 / 231 palabras) y `<title>` presente en todas
- [ ] Lighthouse móvil contra producción

---

### 4.6 Hallazgos del VPS (13 oct)

Dos cosas que aparecieron al revisar `acuerdalo.conf` y que **no se han tocado**, por quedar
fuera del alcance de la semana 1. Ninguna es urgente; las dos son de coherencia.

**a) El origen y Cloudflare discrepan en la caché de assets.** La config dice 30 días; lo que
llega al navegador es 1 año, porque hay una regla de Cloudflare por encima:

```nginx
location ^~ /assets/ {
    add_header Cache-Control "public, max-age=2592000";   # 30 días en el origen
}
```
```
cache-control: public, max-age=31536000, immutable        # lo que sirve el edge
```

La auditoría dio M-03 por cerrado mirando la respuesta del edge, y para el usuario lo está.
Pero el origen quedó desalineado, y este mismo fichero razona en otro sitio que conviene
duplicar las reglas «para que el origen sea coherente por si esa regla desaparece». Si la
regla de Cloudflare se borra algún día, la caché de assets cae a 30 días sin que nadie lo
note. Alinear el origen a `max-age=31536000, immutable` es una línea.

**b) Aviso de nginx en cada recarga.** `listen 443 ssl http2;` está obsoleto desde nginx
1.25.1 (aquí corre 1.26.3):

```
[warn] the "listen ... http2" directive is deprecated, use the "http2" directive instead
       in /etc/nginx/sites-enabled/acuerdalo.conf:32 y :33
```

Es anterior a estos cambios y solo un aviso, pero ensucia cada `nginx -t`. La corrección es
quitar `http2` de las dos líneas `listen` y poner `http2 on;` en el server block. No lo hice
porque tocar `listen` en un servidor HTTPS en producción no es un cambio que convenga colar
dentro de otro trabajo.

**Lo que no está en el VPS.** Las cabeceras de seguridad (HSTS, `X-Content-Type-Options`,
`X-Frame-Options`, `Referrer-Policy`) no aparecen en ninguna config de nginx: las pone
Cloudflare. Así que M-05 —subir HSTS a un año y añadir CSP— es trabajo de panel, no de
servidor.

---

## 5. Semana 2 — Fragmentar el bundle y cerrar la calculadora

### 5.1 Code splitting por ruta

`src/App.tsx` importa los 10 componentes de página de forma estática, así que quien lee una
guía descarga también la calculadora. `vite-react-ssg` admite rutas `lazy` en `RouteRecord`.

- [ ] Convertir las rutas de `App.tsx` a `lazy` — mantener `Layout` estático
- [ ] **Verificar que el prerenderizado sigue produciendo HTML completo por ruta.** Es el
      riesgo real del cambio: si el SSG no resuelve el `lazy`, se vuelve al HTML vacío que el
      ciclo anterior costó corregir. Comprobar con `curl` que las 8 URLs siguen trayendo su
      contenido antes de hacer merge
- [ ] Confirmar que `unused-javascript` baja de los 272 KiB actuales

### 5.2 Autoalojar la fuente Outfit

- [ ] Descargar los pesos usados (300–700) a `public/fonts/`, declarar `@font-face` con
      `font-display: swap`, añadir `<link rel="preload">`
- [ ] Quitar el `<link>` a `fonts.googleapis.com` y los dos `preconnect`

### 5.3 Calculadora: landmark, contraste y enlaces

- [ ] `CalculadoraPension.tsx`: envolver el contenido en `<main>` y `<article>` como el resto
      del sitio — dos líneas · **H-05**
- [ ] `text-decoration: underline` en los enlaces dentro de párrafos · **M-04**
- [ ] Revisar el contraste de `text-muted-foreground` sobre `bg-card` en `tailwind.config.ts` · **M-04**
- [ ] Redistribuir 4 de los 6 enlaces repetidos a `/guias/pension-de-alimentos`: dejar 2 con
      anchor descriptivo según la sección («cómo se cobra si no pagan», «requisitos para pedir
      un aumento») y reaprovechar el resto hacia destinos que hoy no reciben nada · **M-03**

---

## 6. Semanas 3–4 — Hacer verificable la autoría

Es lo que puede mover las 2 URLs que Google leyó y descartó. Va después del rendimiento
porque esas páginas necesitan además que el rastreo sea barato, pero no depende
técnicamente de nada anterior: **se puede adelantar si la foto y los datos de colegiatura
ya están a mano.**

- [ ] Ampliar `/quienes-somos` a 600–900 palabras: foto profesional, N.º de colegiatura del
      Poder Judicial, años de ejercicio, tipos de causa tramitadas, LinkedIn · **H-02**
- [ ] Alargar su `title` de 25 a ~55 caracteres · **L-01**
- [ ] `Person`: añadir `image`, `sameAs`, `description`, `knowsAbout` · **M-01**
- [ ] `LegalService`: añadir `sameAs`, `priceRange`, `hasOfferCatalog`. La home publica precios
      (15.000 / desde 150.000 / desde 80.000) que no están modelados · **M-01**
- [ ] `WebSite` schema en la home; breadcrumb de primer nivel «Inicio» en lugar de «Home» · **M-01**
- [ ] Correo y razón social en el pie · **M-06**
- [ ] **Ahora sí:** solicitar reindexación de las 2 URLs «rastreadas sin indexar»

---

## 7. Semana 5 — Punto de control

Una decisión, no una tarea. Es la bifurcación del plan; tomarla con el dato delante.

| Resultado | Siguiente paso |
|---|---|
| **Indexadas > 5** | Continuar con §8, ampliación de superficie |
| **Indexadas = 5** | El freno es **autoridad de dominio**, no cobertura. La prioridad pasa a enlaces externos y menciones (colegio de abogados, directorios legales chilenos, prensa local). **No** escribir páginas nuevas |

- [ ] Páginas indexadas en Search Console
- [ ] Informe de Core Web Vitals de Search Console — a los 28 días ya refleja LCP e INP de campo
- [ ] Repetir Lighthouse móvil y comparar con la línea base de §2

---

## 8. Meses 2–3 — Ampliar superficie, escribiendo de verdad

**Condicionado al punto de control.** Y con el alcance corregido: no son 8 páginas listas
para enrutar, son guías por escribir.

- [ ] Validar demanda en el export de consultas y elegir **dos** servicios, no cinco · **H-04**
- [ ] Escribirlas al estándar de las existentes: ~1.100 palabras, H2 numerados, «Puntos clave»,
      FAQ, cita de norma con enlace a BCN por `idNorma`
- [ ] **Publicar la ruta solo cuando el contenido esté completo.** Nunca con «Texto pendiente»
- [ ] Foto profesional y dos diagramas: vías de divorcio con plazos, y tramos de porcentaje
      por número de hijos. Con `width`, `height` y `loading="lazy"` salvo la primera visible · **M-02**
- [ ] `og:image` propia por página · **M-02**
- [ ] HSTS a 1 año con `includeSubDomains`; CSP en `Report-Only` una vez decididos los terceros · **M-05**
- [ ] Optimizar `favicon.ico` (67 KB → 5–10 KB); declarar los 7 bots bloqueados en `robots.txt` · **L-01**

### Candidatos con demanda ya observada

Del export de consultas (3 meses al 21 sep). Posiciones entre 63 y 76: hay impresiones y
no hay página propia.

| Consulta | Impresiones | Posición |
|---|---:|---:|
| calculo de pension alimenticia | 13 | 63,8 |
| cuanto es el porcentaje de pension alimenticia | 10 | 64,2 |
| como se calcula la pensión de alimentos | 7 | 76,1 |
| tipos de divorcio en chile | 5 | 65,2 |
| medida de protección por vulneración de derechos | 9 | 71,7 |

> Ojo: las tres primeras las cubre ya la calculadora. Antes de escribir una página nueva,
> comprobar que no canibaliza — el ciclo anterior consiguió que calculadora y guía de pensión
> tuvieran solo 3–11 % de solapamiento, y conviene no romperlo.

---

## 9. Qué no tocar

Verificado en vivo el 12 de octubre. No hay trabajo pendiente aquí.

- Prerenderizado con `vite-react-ssg` — 1.144 palabras servidas en HTML sin JS
- Acceso de rastreadores de IA — 10 tokens verificados con `200`
- Redirecciones — `www`, `http`, `/guias/`, `/index.html` y las 4 `marco-teorico`: `301` en un salto
- Canonical autorreferencial en las 8 páginas
- Titles y descriptions — 100 % únicos, en rango
- Jerarquía de encabezados — `seo_checker.py` da 100/100 a 7 de las 8 páginas
- Firma y fecha visibles en las 5 páginas de contenido
- Sitemap — 8 URLs, coincidencia exacta con los enlaces internos, 0 huérfanas
- 404 real, también en `/servicios/*` y `/documentos`
- Caché — assets a 1 año `immutable`, HTML en el edge, brotli, HTTP/2 con HTTP/3
- CLS = 0 en móvil y escritorio; rendimiento en escritorio (LCP 1,9 s)
- Grafo de schema `Article` → `author @id` → `Person`, `publisher @id` → `LegalService`
- Citas a BCN/LeyChile por `idNorma`
- Transparencia de IA en el widget de consulta

---

## 10. Métricas del ciclo

Una sola métrica decide si el ciclo funcionó.

| Métrica | Línea base | Objetivo | Cadencia |
|---|---:|---:|---|
| **Páginas indexadas (GSC)** | **5 / 8** | **8 / 8** | Semanal |
| LCP móvil (Lighthouse) | 7,2 s | < 2,5 s | Tras cada deploy |
| Peso de terceros | 354 KB | < 100 KB | ✅ **29,5 KB** (12 oct) |
| JS sin usar | 272 KiB | < 100 KiB | Tras §5 |
| SEO Health Score | 64 / 100 | > 80 / 100 | Fin de ciclo |
| `/quienes-somos` | 231 palabras | 600–900 | Tras §6 |
| Consultas únicas con impresiones | — | Al alza mes a mes | Mensual |

El seguimiento semanal de posiciones de la calculadora sigue en `SEGUIMIENTO-SEO.md` y no
cambia: se mide **posición**, no clics.

---

## 11. Riesgos

| Riesgo | Mitigación |
|---|---|
| El `lazy` de §5.1 rompe el prerenderizado y se vuelve al HTML vacío | Verificar las 8 URLs con `curl` antes del merge. Es el fallo que costó dos meses en el ciclo anterior |
| Diferir GTM pierde el evento `calculo_pension` | `calculo_pension` se dispara tras interacción, siempre posterior al `load`. Verificar en GTM Preview |
| Se arregla todo y la indexación no sube | Es el punto de control de §7, con una salida definida: enlaces externos en lugar de más páginas |
| Reindexar antes de cambiar nada quema la solicitud | §3 lo prohíbe explícitamente. Reindexación solo tras §6 |
| El export de GSC del proyecto es del 21 sep, anterior al deploy del 2 oct | §3 empieza con un export nuevo |
| CrUX sin muestra suficiente para el dominio | El LCP está medido en laboratorio. Una clave gratuita de PageSpeed daría campo, pero con 1,2 visitas/día puede no haber muestra. El dato de laboratorio es suficiente para decidir |

---

**Auditoría completa:** `../seo/audit-acuerdalo.html` ·
[informe publicado](https://claude.ai/code/artifact/f2a7a022-5712-4d2a-980d-457e8c26b50b)
**Ciclo anterior:** `PLAN-SEO.md` · **Seguimiento semanal:** `SEGUIMIENTO-SEO.md`
