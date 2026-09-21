import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const API_URL = "https://api.acuerdalo.cl/api/asistente";

const WHATSAPP_BASE = "https://wa.me/56990538001?text=";

interface Turno {
  rol: "usuario" | "asistente";
  texto: string;
}

export type TemaAsistente =
  | "general"
  | "calculadora"
  | "calculadora-con-resultado"
  | "pension"
  | "divorcio"
  | "visitas"
  | "medidas";

interface AsistenteLegalProps {
  /** Selecciona titular, sugerencias y mensaje de derivación. */
  tema?: TemaAsistente;
  /** Contexto del cálculo. Solo lo pasa la calculadora, cuando ya hay resultado. */
  montoCalculado?: number;
  cantidadHijos?: number;
  ingresoMensual?: number;
}

/**
 * Las sugerencias salen de consultas reales de Search Console: son las preguntas
 * con las que la gente llega al sitio y que hoy ninguna página responde de frente.
 */
const CONTENIDO: Record<
  TemaAsistente,
  { titulo: string; intro: string; sugerencias: string[]; whatsapp: string }
> = {
  general: {
    titulo: "Pregunta sobre tu caso de familia",
    intro:
      "Orientación inmediata sobre pensión de alimentos, divorcio, cuidado personal y medidas de protección en Chile.",
    sugerencias: [
      "¿Cómo se calcula la pensión de alimentos?",
      "¿Cuánto tarda un divorcio en Chile?",
      "¿Cómo se fija un régimen de visitas?",
    ],
    whatsapp: "Hola, tengo una consulta de derecho de familia.",
  },
  calculadora: {
    titulo: "¿Dudas antes de calcular?",
    intro:
      "Pregunta cómo se llega al monto, qué ingresos cuentan o qué pasa si no te pagan.",
    sugerencias: [
      "¿Cómo se calcula la pensión de alimentos?",
      "¿Qué ingresos se consideran?",
      "¿Qué pasa si no me pagan la pensión?",
    ],
    whatsapp: "Hola, tengo una consulta sobre mi caso de pensión de alimentos.",
  },
  /** Mismo sitio que "calculadora", pero cuando la persona ya tiene una cifra. */
  "calculadora-con-resultado": {
    titulo: "¿Tienes dudas sobre tu resultado?",
    intro:
      "Pregunta sobre el monto que acabas de obtener, cómo se ajusta o qué hacer si no te pagan.",
    sugerencias: [
      "¿Cómo se llegó a ese monto?",
      "¿Puedo pedir que se ajuste más adelante?",
      "¿Qué pasa si no me pagan la pensión?",
    ],
    whatsapp: "Hola, tengo una consulta sobre mi caso de pensión de alimentos.",
  },
  pension: {
    titulo: "¿Dudas sobre la pensión de alimentos?",
    intro:
      "Pregunta por el cálculo, los montos mínimos, la tramitación o qué hacer si no te pagan.",
    sugerencias: [
      "¿Cuánto es la pensión mínima por hijo?",
      "¿Qué porcentaje corresponde por dos hijos?",
      "¿Qué pasa si no me pagan la pensión?",
    ],
    whatsapp: "Hola, tengo una consulta sobre pensión de alimentos.",
  },
  divorcio: {
    titulo: "¿Dudas sobre tu divorcio?",
    intro:
      "Pregunta por los tipos de divorcio, los plazos, los requisitos o la compensación económica.",
    sugerencias: [
      "¿Qué pasa si mi cónyuge se niega?",
      "¿Cuánto tarda un divorcio unilateral?",
      "¿Qué es la compensación económica?",
    ],
    whatsapp: "Hola, tengo una consulta sobre divorcio.",
  },
  visitas: {
    titulo: "¿Dudas sobre visitas o cuidado personal?",
    intro:
      "Pregunta por el régimen de visitas, los criterios del tribunal o cómo se decide el cuidado personal.",
    sugerencias: [
      "¿Cómo se fija un régimen de visitas?",
      "¿Puedo pedir el cuidado personal de mi hijo?",
      "¿Los abuelos tienen derecho a visitas?",
    ],
    whatsapp: "Hola, tengo una consulta sobre visitas y cuidado personal.",
  },
  medidas: {
    titulo: "¿Dudas sobre una medida de protección?",
    intro:
      "Pregunta por qué es una medida de protección, cómo se inicia la causa y qué ocurre después.",
    sugerencias: [
      "¿Qué es una medida de protección?",
      "¿Cómo se inicia una causa de protección?",
      "¿Qué pasa después de la audiencia?",
    ],
    whatsapp: "Hola, tengo una consulta sobre una medida de protección.",
  },
};

const AsistenteLegal = ({
  tema = "general",
  montoCalculado,
  cantidadHijos,
  ingresoMensual,
}: AsistenteLegalProps) => {
  const temaEfectivo =
    tema === "calculadora" && montoCalculado !== undefined
      ? "calculadora-con-resultado"
      : tema;
  const { titulo, intro, sugerencias, whatsapp } = CONTENIDO[temaEfectivo];
  const whatsappUrl = WHATSAPP_BASE + encodeURIComponent(whatsapp);

  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [pregunta, setPregunta] = useState("");
  const [cargando, setCargando] = useState(false);
  const [derivar, setDerivar] = useState(false);
  const finRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [turnos, cargando]);

  const consultar = async (texto: string) => {
    const limpio = texto.trim();
    if (!limpio || cargando) return;

    // El historial que se envía es el previo a este turno; la pregunta va aparte.
    const historialPrevio = turnos;
    setTurnos((prev) => [...prev, { rol: "usuario", texto: limpio }]);
    setPregunta("");
    setCargando(true);
    setDerivar(false);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pregunta: limpio,
          historial: historialPrevio,
          // El contexto de cálculo solo existe cuando el asistente vive bajo la
          // calculadora y la persona ya obtuvo una cifra.
          contexto:
            montoCalculado !== undefined
              ? { montoCalculado, cantidadHijos, ingresoMensual }
              : undefined,
        }),
      });

      if (!res.ok || !res.body) {
        setDerivar(true);
        return;
      }

      // El backend responde SSE: se van pintando los fragmentos conforme llegan.
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let respuesta = "";
      let abierto = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const bloques = buffer.split("\n\n");
        buffer = bloques.pop() ?? "";

        for (const bloque of bloques) {
          const evento = bloque.match(/^event: (.+)$/m)?.[1];
          const datos = bloque.match(/^data: (.+)$/m)?.[1];
          if (!datos) continue;

          const payload = JSON.parse(datos);

          if (evento === "error") {
            setDerivar(true);
            continue;
          }
          if (evento !== "texto" || typeof payload.texto !== "string") continue;

          respuesta += payload.texto;
          setTurnos((prev) => {
            if (!abierto) {
              abierto = true;
              return [...prev, { rol: "asistente", texto: respuesta }];
            }
            const copia = [...prev];
            copia[copia.length - 1] = { rol: "asistente", texto: respuesta };
            return copia;
          });
        }
      }
    } catch {
      setDerivar(true);
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="mt-10 mb-8 max-w-2xl mx-auto px-6">
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        {/*
          Titular, intro, sugerencias y descargo se renderizan siempre, también en
          el HTML prerenderizado: son el contenido que ve un rastreador y quien
          llega a la página sin interactuar. Solo el hilo de conversación es
          exclusivo de cliente.
        */}
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
          <h2 className="text-lg font-bold">{titulo}</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-5">{intro}</p>

        {turnos.length === 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {sugerencias.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => consultar(s)}
                className="text-xs rounded-full border border-border px-3 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {turnos.length > 0 && (
          <div
            className="space-y-4 mb-5 max-h-96 overflow-y-auto"
            aria-live="polite"
            aria-atomic="false"
          >
            {turnos.map((t, i) => (
              <div
                key={i}
                className={
                  t.rol === "usuario"
                    ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground"
                    : "mr-auto max-w-[90%] text-sm leading-relaxed whitespace-pre-wrap"
                }
              >
                {t.texto}
              </div>
            ))}
            {cargando && turnos[turnos.length - 1]?.rol === "usuario" && (
              <p className="text-sm text-muted-foreground animate-pulse">
                Escribiendo…
              </p>
            )}
            <div ref={finRef} />
          </div>
        )}

        {derivar && (
          <div className="mb-5 flex items-start gap-2 rounded-xl bg-muted p-3">
            <AlertCircle
              className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0"
              aria-hidden="true"
            />
            <p className="text-sm text-muted-foreground">
              No pude responder en este momento.{" "}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline font-medium"
              >
                Escríbenos por WhatsApp
              </a>{" "}
              y te orientamos directamente.
            </p>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            consultar(pregunta);
          }}
          className="flex gap-2"
        >
          <Input
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
            placeholder="Escribe tu consulta…"
            maxLength={2000}
            disabled={cargando}
            aria-label="Tu consulta"
          />
          <Button type="submit" size="icon" disabled={cargando || !pregunta.trim()}>
            <Send className="w-4 h-4" />
            <span className="sr-only">Enviar consulta</span>
          </Button>
        </form>

        <p className="mt-4 text-xs text-muted-foreground">
          Orientación referencial generada con IA. No constituye asesoría legal ni
          reemplaza a un abogado.{" "}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            Habla con nuestro equipo
          </a>{" "}
          para revisar tu caso.
        </p>
      </div>
    </section>
  );
};

export default AsistenteLegal;
