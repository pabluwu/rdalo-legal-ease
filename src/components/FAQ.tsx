import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "pension-impaga",
    question:
      "¿Qué puedo hacer si el padre o madre no paga la pensión de alimentos?",
    answer: (
      <>
        <p>
          Si el otro progenitor no paga la pensión de alimentos, los pasos a
          seguir dependen de tu situación:
        </p>
        <br />
        <ul className="list-disc list-outside space-y-4 ml-5">
          <li className="pl-2">
            <strong>Pensión ya regulada: </strong>
            Verificamos cuántos meses adeuda (continuos o discontinuos). Con eso
            iniciamos el{" "}
            <strong>cobro ordinario de pensión de alimentos.</strong> Si no
            tiene fondos disponibles, avanzamos al{" "}
            <strong>cobro extraordinario</strong> y solicitamos su{" "}
            <strong>
              inscripción en el Registro Nacional de Deudores de Pensiones de
              Alimentos.
            </strong>
          </li>
          <li className="pl-2">
            <strong>Pensión no regulada: </strong>
            Revisamos si existe una{" "}
            <strong>mediación previa y su fecha.</strong> Si la mediación está
            frustrada, podemos{" "}
            <strong>presentar una demanda de alimentos</strong> para fijar la
            pensión y luego gestionar el <strong>cobro de la deuda.</strong>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "visitas-impedidas",
    question: "¿Qué hago si no me dejan ver a mi hijo?",
    answer: (
      <>
        <p>
          Si no te permiten{" "}
          <strong>ver a tu hijo o ejercer tu derecho de visitas</strong>, lo
          primero es <strong>dejar constancia del impedimento</strong>. Con esa
          evidencia, podemos presentar una{" "}
          <strong>demanda de relación directa y regular (visitas)</strong> ante
          el Tribunal de Familia para restablecer tus derechos y fijar un
          régimen claro de visitas.
        </p>
      </>
    ),
  },
  {
    id: "modificar-pension",
    question: "¿Qué pasa si quiero modificar la pensión?",
    answer: (
      <>
        <p>
          Si necesitas <strong>modificar la pensión de alimentos</strong> en
          Chile —ya sea{" "}
          <strong>aumentarla, rebajarla o solicitar su cese</strong>— debes
          presentar una <strong>demanda de modificación de pensión</strong> ante
          el Tribunal de Familia. Este procedimiento permite ajustar el monto
          cuando cambian las circunstancias del hijo o del padre/madre que paga
          la pensión.
        </p>
      </>
    ),
  },
  {
    id: "divorcio-chile",
    question: "¿Cómo funciona el divorcio en Chile?",
    answer: (
      <>
        <p>
          En Chile, el <strong>divorcio</strong> puede tramitarse de tres
          maneras:
          <strong>unilateral</strong>, <strong>de común acuerdo</strong> o
          <strong>por culpa</strong> (también llamado <em>divorcio sanción</em>
          ).
        </p>
        <br />
        <ul className="list-disc list-outside space-y-4 ml-5">
          <li className="pl-2">
            <strong>Divorcio unilateral:</strong>
            requiere <strong>3 años de cese de convivencia</strong> debidamente
            notificado.
          </li>
          <li className="pl-2">
            <strong>Divorcio de mutuo acuerdo:</strong>
            requiere <strong>1 año de cese de convivencia</strong> y la
            presentación del
            <strong>acuerdo completo y suficiente</strong>, especialmente si hay
            hijos menores.
          </li>
          <li className="pl-2">
            <strong>Divorcio por culpa:</strong>
            procede cuando uno de los cónyuges incumple gravemente sus
            obligaciones matrimoniales (por ejemplo, en casos de violencia
            intrafamiliar). <strong>No exige plazo mínimo</strong> de
            separación.
          </li>
        </ul>
        <br />

        <p>
          <strong>Prueba del cese de convivencia:</strong>
        </p>
        <br />
        <ul className="list-disc list-outside space-y-4 ml-5">
          <li className="pl-2">
            <strong>Casados antes de 2004:</strong>
            existe libertad probatoria, pudiendo acreditarse con{" "}
            <strong>dos testigos</strong>.
          </li>
          <li className="pl-2">
            <strong>Casados después de 2004:</strong>
            el cese debe probarse mediante su{" "}
            <strong>notificación formal</strong>.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cuidado-personal",
    question: "¿Cómo puedo obtener el cuidado personal de mi hijo?",
    answer: (
      <>
        <p>
          Para obtener el cuidado personal de tu(s) hijo(s) en Chile, debes
          demostrar ante el Tribunal de Familia que esta opción es lo más
          adecuado para su bienestar. El proceso comienza generalmente con una
          mediación obligatoria y, si no hay acuerdo, se presenta una demanda de
          cuidado personal.
        </p>
        <br />
        <ul className="list-disc list-outside space-y-4 ml-5">
          <li className="pl-2">
            Demostrar que puedes garantizar estabilidad emocional y material al
            menor.
          </li>
          <li className="pl-2">
            Acreditar hechos o circunstancias que justifiquen el cambio, si el
            cuidado ya está asignado al otro progenitor.
          </li>
          <li className="pl-2">
            Presentar pruebas como testigos, informes, antecedentes de salud,
            documentos escolares u otros elementos que respalden tu solicitud.
          </li>
        </ul>
        <br />
        <p>
          El tribunal evalúa el interés superior del niño, su entorno, vínculo
          con cada progenitor y las condiciones de cuidado antes de decidir.
        </p>
      </>
    ),
  },
  {
    id: "mediacion",
    question: "¿Es obligatorio ir a mediación antes de demandar?",
    answer: (
      <>
        <p>
          Sí. En Chile, la mediación es obligatoria antes de presentar una
          demanda en la mayoría de los asuntos de familia, como alimentos,
          cuidado personal y relación directa y regular. Solo se puede omitir
          cuando existen situaciones excepcionales, como violencia intrafamiliar
          o cuando no es posible notificar a la otra parte.
        </p>
        <br />
        <ul className="list-disc list-outside space-y-4 ml-5">
          <li className="pl-2">
            Si la mediación termina frustrada, puedes presentar la demanda ante
            el tribunal.
          </li>
          <li className="pl-2">
            La constancia de mediación frustrada es un requisito para continuar
            el proceso judicial en estos casos.
          </li>
        </ul>
      </>
    ),
  },
];

const FAQ = () => {
  return (
    <section id="preguntas" className="py-20 px-6 bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-muted-foreground font-light">
            Resolvemos tus dudas más comunes
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-soft transition-all"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-5">
                  <span className="text-lg font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
