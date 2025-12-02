import { motion } from "framer-motion";
import { 
  MessageCircle, 
  Search, 
  FileText, 
  PenTool, 
  Rocket, 
  BarChart3 
} from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Te contactas",
    description: "Por WhatsApp, formulario o email",
    color: "from-green-400 to-green-600",
  },
  {
    icon: Search,
    title: "Evaluamos tu caso",
    description: "Analizamos tu situación en detalle",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: FileText,
    title: "Enviamos presupuesto",
    description: "Transparente y sin sorpresas",
    color: "from-purple-400 to-purple-600",
  },
  {
    icon: PenTool,
    title: "Firmas electrónicamente",
    description: "Sin necesidad de ir a ningún lugar",
    color: "from-orange-400 to-orange-600",
  },
  {
    icon: Rocket,
    title: "Iniciamos trámites",
    description: "Comenzamos tu proceso legal",
    color: "from-pink-400 to-pink-600",
  },
  {
    icon: BarChart3,
    title: "Reporte semanal",
    description: "Seguimiento en tu intranet personal",
    color: "from-teal-400 to-teal-600",
  },
];

const HowWeWork = () => {
  return (
    <section id="proceso" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Cómo Trabajamos
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
            Un proceso simple y transparente, 100% online
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line - hidden on mobile */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 -translate-y-1/2" />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Step number */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center z-10">
                    {index + 1}
                  </div>
                  
                  {/* Icon container */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <step.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  
                  {/* Content */}
                  <h3 className="text-base font-semibold text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-light">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
