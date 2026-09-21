type EventoDataLayer = Record<string, unknown> & { event: string };

/**
 * Empuja un evento al dataLayer de Google Tag Manager.
 *
 * Silencioso cuando GTM no está disponible —bloqueadores de anuncios, red caída,
 * o el render del build estático, donde no existe `window`—: la analítica nunca
 * debe romper la página.
 */
export function pushDataLayer(evento: EventoDataLayer) {
  if (typeof window === "undefined") return;

  const { dataLayer } = window as unknown as { dataLayer?: unknown[] };
  if (!Array.isArray(dataLayer)) return;

  dataLayer.push(evento);
}
