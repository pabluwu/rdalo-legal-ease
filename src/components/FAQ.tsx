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
    question: "¿Qué hago si no me pagan la pensión?",
    answer: "Texto pendiente - aquí irá la explicación detallada sobre el cobro de pensiones impagas, los pasos legales y las consecuencias para el deudor.",
  },
  {
    id: "visitas-impedidas",
    question: "¿Qué hago si no me dejan ver a mi hijo?",
    answer: "Texto pendiente - aquí irá la explicación sobre el derecho a visitas, qué hacer cuando se impide el contacto y las acciones legales disponibles.",
  },
  {
    id: "modificar-pension",
    question: "¿Qué pasa si quiero modificar la pensión?",
    answer: "Texto pendiente - aquí irá la explicación sobre cuándo y cómo se puede solicitar aumento o rebaja de la pensión de alimentos.",
  },
  {
    id: "divorcio-chile",
    question: "¿Cómo funciona el divorcio en Chile?",
    answer: "Texto pendiente - aquí irá la explicación sobre los tipos de divorcio (mutuo acuerdo y unilateral), requisitos, plazos y costos.",
  },
  {
    id: "cuidado-personal",
    question: "¿Cómo puedo obtener el cuidado personal de mi hijo?",
    answer: "Texto pendiente - aquí irá la explicación sobre la tuición, criterios que considera el tribunal y el proceso legal.",
  },
  {
    id: "mediacion",
    question: "¿Es obligatorio ir a mediación antes de demandar?",
    answer: "Texto pendiente - aquí irá la explicación sobre la mediación obligatoria en materias de familia y sus excepciones.",
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
