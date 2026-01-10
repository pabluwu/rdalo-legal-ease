import { Helmet } from "react-helmet-async";
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
  /** JSON-LD object/array */
  jsonLd?: unknown;
};

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
  return normalizeCanonical(`https://acuerdalo.cl${path}`);
}

export default function Seo({
  title,
  description,
  canonical,
  robots = "index,follow",
  jsonLd,
}: SeoProps) {
  const location = useLocation();

  const computedCanonical = canonical
    ? normalizeCanonical(canonical)
    : buildCanonicalFromRoute(location.pathname);

  return (
    <Helmet>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
      <meta name="robots" content={robots} />
      {computedCanonical ? <link rel="canonical" href={computedCanonical} /> : null}
      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  );
}
