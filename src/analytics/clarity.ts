/**
 * Eventos de producto hacia Microsoft Clarity.
 *
 * Sustituye a `gtm.ts`: al quedarse solo con Clarity, mantener Google Tag Manager
 * costaba 127 KB para entregar un script de 25 KB. Ver PLAN-SEO-OCT-2026.md §4.1.
 *
 * Clarity separa dos cosas que en el dataLayer de GTM iban juntas:
 *
 * - `clarity("event", nombre)` marca que algo ocurrió. Es lo que aparece como
 *   filtro de sesiones y lo que permite segmentar grabaciones.
 * - `clarity("set", clave, valor)` añade una etiqueta a la sesión. Los valores
 *   son siempre cadenas, así que los booleanos y números hay que formatearlos.
 *
 * El snippet de `index.html` crea la cola síncrona, de modo que llamar aquí
 * antes de que el script llegue no pierde nada: se encola en `clarity.q`.
 */

type Clarity = (...args: unknown[]) => void;

/** Etiquetas de una sesión. Clarity solo acepta cadenas como valor. */
type Etiquetas = Record<string, string>;

function obtenerClarity(): Clarity | undefined {
  // `typeof window === "undefined"` cubre el prerenderizado de vite-react-ssg,
  // donde este módulo se evalúa en Node y no hay navegador.
  if (typeof window === "undefined") return undefined;

  const { clarity } = window as unknown as { clarity?: Clarity };
  return typeof clarity === "function" ? clarity : undefined;
}

/**
 * Registra un evento con sus etiquetas.
 *
 * Silencioso cuando Clarity no está disponible —bloqueadores, red caída, o el
 * render del build estático—: la analítica nunca debe romper la página.
 */
export function registrarEvento(nombre: string, etiquetas: Etiquetas = {}) {
  const clarity = obtenerClarity();
  if (!clarity) return;

  // Las etiquetas van antes del evento: así la sesión ya las lleva cuando el
  // evento se registra, y el filtrado en el panel las encuentra juntas.
  for (const [clave, valor] of Object.entries(etiquetas)) {
    clarity("set", clave, valor);
  }

  clarity("event", nombre);
}

/** Parámetros del cálculo de pensión, tal como se miden. */
type DatosCalculo = {
  hijos: number;
  tramoIngreso: string;
  tramoResultado: string;
  aplicaMinimoLegal: boolean;
  esPensionado: boolean;
};

/**
 * Un cálculo no se persiste en ninguna parte: es estado de cliente. Sin este
 * evento no hay forma de saber cuántas visitas a la calculadora llegan a
 * calcular, ni con cuántos hijos ni en qué tramo de ingresos.
 */
export function registrarCalculo({
  hijos,
  tramoIngreso,
  tramoResultado,
  aplicaMinimoLegal,
  esPensionado,
}: DatosCalculo) {
  registrarEvento("calculo_pension", {
    hijos: String(hijos),
    tramo_ingreso: tramoIngreso,
    tramo_resultado: tramoResultado,
    // true cuando gana tan poco que el resultado lo fija el mínimo legal y no
    // su sueldo: dice cuánta de la audiencia está en el piso.
    aplica_minimo_legal: aplicaMinimoLegal ? "si" : "no",
    es_pensionado: esPensionado ? "si" : "no",
  });
}
