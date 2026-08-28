const SITE_URL = "https://acuerdalo.cl";

export type BreadcrumbTrailItem = {
  name: string;
  /** Ruta relativa, ej. "/guias" */
  path: string;
};

export function buildBreadcrumbJsonLd(items: BreadcrumbTrailItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
