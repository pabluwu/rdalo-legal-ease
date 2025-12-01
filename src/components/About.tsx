import { motion } from "framer-motion";
import { Heart, Shield, Clock } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Atención Personalizada",
    description: "Cada familia es única y merece un trato cálido y profesional",
  },
  {
    icon: Shield,
    title: "Profesionalismo",
    description: "Respaldo legal sólido con años de experiencia en derecho de familia",
  },
  {
    icon: Clock,
    title: "Respuesta Rápida",
    description: "Agilizamos tus trámites para que puedas enfocarte en lo importante",
  },
];

const About = () => {
  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Nos comprometemos con tu bienestar familiar desde el primer contacto
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-secondary/30 to-primary/30 flex items-center justify-center">
                <feature.icon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
