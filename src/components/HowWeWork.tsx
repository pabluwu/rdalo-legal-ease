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
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center bg-card/50 rounded-2xl p-4 border border-border/30 h-full">
                  {/* Step number badge - integrated at top */}
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center mb-3">
                    {index + 1}
                  </div>
                  
                  {/* Icon container */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-3 shadow-md`}
                  >
                    <step.icon className="h-7 w-7 text-white" />
                  </motion.div>
                  
                  {/* Content */}
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Arrow connector - only on desktop, not on last item */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-primary/40 z-10">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
