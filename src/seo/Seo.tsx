import { Head } from "vite-react-ssg";
import { useLocation } from "react-router-dom";

type RobotsValue =
  | "index,follow"
  | "noindex,follow"
  | "noindex,nofollow"
  | "index,nofollow";

type SeoProps = {
  title: string;
  description?: string;
  /** Override absoluto (si lo pasas, se usa este). */
  canonical?: string;
  robots?: RobotsValue;
  /** Imagen para og:image / twitter:image. Por defecto usa la imagen de marca global. */
  image?: string;
  /** JSON-LD object/array */
  jsonLd?: unknown;
};

const SITE_NAME = "Acuérdalo";
const SITE_URL = "https://acuerdalo.cl";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

/** Convención: SIN trailing slash (excepto "/"). Quita hash y query params. */
function normalizeCanonical(raw?: string) {
  if (!raw) return undefined;

  const withoutHash = raw.split("#")[0]?.trim();
  if (!withoutHash) return undefined;

  try {
    const url = new URL(withoutHash);

    // limpia hash + query
    url.hash = "";
    url.search = "";

    // normaliza trailing slash
    if (url.pathname !== "/" && url.pathname.endsWith("/")) {
      url.pathname = url.pathname.slice(0, -1);
    }

    return url.toString();
  } catch {
    // Si no es absoluta, normaliza como string simple
    let s = withoutHash.split("?")[0]; // quita query
    if (s !== "/" && s.endsWith("/")) s = s.slice(0, -1);
    return s;
  }
}

function buildCanonicalFromRoute(pathname: string) {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return normalizeCanonical(`${SITE_URL}${path}`);
}

export default function Seo({
  title,
  description,
  canonical,
  robots = "index,follow",
  image = DEFAULT_OG_IMAGE,
  jsonLd,
}: SeoProps) {
  const location = useLocation();

  const computedCanonical = canonical
    ? normalizeCanonical(canonical)
    : buildCanonicalFromRoute(location.pathname);

  return (
    <Head>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
      <meta name="robots" content={robots} />
      {computedCanonical ? <link rel="canonical" href={computedCanonical} /> : null}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      {description ? <meta property="og:description" content={description} /> : null}
      {computedCanonical ? <meta property="og:url" content={computedCanonical} /> : null}
      <meta property="og:image" content={image} />

      <meta name="twitter:title" content={title} />
      {description ? <meta name="twitter:description" content={description} /> : null}
      <meta name="twitter:image" content={image} />

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Head>
  );
}
