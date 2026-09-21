import { SITE_URL, autorRef, orgRef } from "./entities";

type ArticleInput = {
  /** Titular de la guía, el mismo que ve el usuario en el H1. */
  headline: string;
  description: string;
  /** Ruta relativa, ej. "/guias/pension-de-alimentos". */
  path: string;
  /** ISO 8601, ej. "2026-01-09". Fecha real de primera publicación. */
  datePublished: string;
  /** ISO 8601. Debe coincidir con la fecha que muestra `AuthorByline`. */
  dateModified: string;
};

/**
 * `Article` con autoría y fechas para las guías legales.
 *
 * El sitio ya firmaba cada guía de forma visible con `AuthorByline`, pero esa
 * autoría no existía en los datos estructurados: para un buscador las guías no
 * tenían autor. En contenido YMYL —pensiones, divorcio— esa señal de E-E-A-T es
 * justamente la que se evalúa, así que la firma visible y la declarada deben
 * decir lo mismo.
 */
export function buildArticleJsonLd({
  headline,
  description,
  path,
  datePublished,
  dateModified,
}: ArticleInput) {
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#articulo`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline,
    description,
    inLanguage: "es-CL",
    datePublished,
    dateModified,
    author: autorRef,
    publisher: orgRef,
    image: `${SITE_URL}/og-image.jpg`,
  };
}
