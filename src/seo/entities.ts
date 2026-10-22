/**
 * Identificadores estables de las entidades del sitio.
 *
 * Sin `@id`, cada página declaraba su propio nodo suelto: la abogada del
 * `Person` de /quienes-somos y la marca del `LegalService` de la home no eran,
 * para un buscador, las mismas entidades que firman las guías. Con estos `@id`
 * las referencias apuntan al mismo nodo desde cualquier página.
 */
export const SITE_URL = "https://acuerdalo.cl";

export const ORG_ID = `${SITE_URL}/#organizacion`;
export const AUTOR_ID = `${SITE_URL}/quienes-somos#michelle-alvarez`;
export const MIGUEL_ID = `${SITE_URL}/quienes-somos#miguel-reyes`;

/** Referencia ligera a la organización, para `publisher`. */
export const orgRef = { "@id": ORG_ID };

/** Referencia ligera a la autora, para `author`. */
export const autorRef = { "@id": AUTOR_ID };
