import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Heart, 
  FileText, 
  Scale,
  Handshake,
  ArrowRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Calculator,
    title: "Pensión de Alimentos",
    description: "Demandas y cálculos ajustados a ley",
    href: "/servicios/pension-alimentos",
  },
  {
    icon: TrendingUp,
    title: "Aumento de Pensión",
    description: "Cuando las necesidades aumentan",
    href: "/servicios/aumento-pension",
  },
  {
    icon: TrendingDown,
    title: "Rebaja de Pensión",
    description: "Cuando tu situación cambia",
    href: "/servicios/rebaja-pension",
  },
  {
    icon: Users,
    title: "Régimen de Visitas",
    description: "Establece o modifica las visitas",
    href: "/servicios/visitas",
  },
  {
    icon: Heart,
    title: "Cuidado Personal",
    description: "Custodia y tuición de los hijos",
    href: "/servicios/cuidado-personal",
  },
  {
    icon: FileText,
    title: "Divorcio",
    description: "Unilateral o de mutuo acuerdo",
    href: "/servicios/divorcio",
  },
  {
    icon: Scale,
    title: "Cobro de Deuda",
    description: "Recupera pensiones impagas",
    href: "/servicios/cobro-deuda",
  },
  {
    icon: Handshake,
    title: "Acuerdos Extrajudiciales",
    description: "Soluciones sin ir a tribunales",
    href: "/servicios/acuerdos",
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
            Soluciones legales especializadas en derecho de familia, 100% online
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Link to={service.href}>
                <Card className="border-border bg-card hover:shadow-soft hover:border-primary/30 transition-all duration-300 h-full group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-light mb-3">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Ver más <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
