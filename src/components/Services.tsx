import { motion } from "framer-motion";
import { Briefcase, Users, FileText, Landmark, PenLine } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Briefcase,
    title: "Laboral",
    description: "Despidos, finiquitos, cobro de prestaciones, entre otros",
  },
  {
    icon: Users,
    title: "Familia",
    description: "Pensión de alimentos, visitas, divorcio, cuidado personal, permisos de viaje, entre otros",
  },
  {
    icon: FileText,
    title: "Civil",
    description: "Contratos, arriendos, deudas, posesiones efectivas, escritos, prescripciones, entre otros",
  },
  {
    icon: Landmark,
    title: "Tributario",
    description: "SII, multas, declaraciones, defensa, defensa de deudores, entre otros",
  },
  {
    icon: PenLine,
    title: "Trámites extrajudiciales",
    description: "Acuerdos, redacción de documentos, entre otros",
  },
];

const Services = () => {
  return (
    <section id="servicios" className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Servicios que Ofrecemos
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
            Asesoría jurídica integral, 100% online en todo Chile
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
                <Card className="border-border bg-card hover:shadow-soft hover:border-primary/30 transition-all duration-300 h-full group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-light">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
