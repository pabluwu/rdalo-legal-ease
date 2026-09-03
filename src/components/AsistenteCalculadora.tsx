import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const API_URL = "https://api.acuerdalo.cl/api/asistente";

const WHATSAPP_URL =
  "https://wa.me/56990538001?text=Hola,%20tengo%20una%20consulta%20sobre%20mi%20caso%20de%20pensi%C3%B3n%20de%20alimentos.";

interface Turno {
  rol: "usuario" | "asistente";
  texto: string;
}

interface AsistenteCalculadoraProps {
  montoCalculado: number;
  cantidadHijos: number;
  ingresoMensual?: number;
}

const SUGERENCIAS = [
  "¿Cómo se llegó a ese monto?",
  "¿Puedo pedir que se ajuste más adelante?",
  "¿Qué pasa si no me pagan la pensión?",
];

const AsistenteCalculadora = ({
  montoCalculado,
  cantidadHijos,
  ingresoMensual,
}: AsistenteCalculadoraProps) => {
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
          contexto: { montoCalculado, cantidadHijos, ingresoMensual },
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
    <section className="mt-10 mb-8 max-w-2xl mx-auto">
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
          <h2 className="text-lg font-bold">¿Tienes dudas sobre tu resultado?</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          Pregunta sobre pensión de alimentos, divorcio, cuidado personal o medidas
          de protección.
        </p>

        {turnos.length === 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {SUGERENCIAS.map((s) => (
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
                href={WHATSAPP_URL}
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
            href={WHATSAPP_URL}
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

export default AsistenteCalculadora;
