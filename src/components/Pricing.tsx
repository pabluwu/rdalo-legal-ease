import { motion } from "framer-motion";
import { Check, Gift } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const pricingItems = [
  {
    title: "Consulta Legal",
    price: "$15.000",
    description: "Evaluación inicial de tu caso",
    features: [
      "30 minutos de asesoría",
      "Análisis de tu situación",
      "Orientación sobre pasos a seguir",
      "Por videollamada o teléfono",
    ],
    highlighted: false,
  },
  {
    title: "Casos Judiciales",
    price: "Desde $150.000",
    description: "Depende del tipo de trámite",
    features: [
      "Pensión de alimentos",
      "Visitas y cuidado personal",
      "Divorcio",
      "Cobro de deudas",
    ],
    highlighted: true,
  },
  {
    title: "Acuerdos",
    price: "Desde $80.000",
    description: "Soluciones extrajudiciales",
    features: [
      "Redacción de acuerdos",
      "Redacción de escritos civiles / extrajudicial",
      "Permisos de viaje",
    ],
    highlighted: false,
  },
];

const paymentOptions = [
  "Pago en cuotas sin interés",
  "Pago por etapas del proceso",
  "Transferencia bancaria",
];

const Pricing = () => {
  return (
    <section id="precios" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Precios Transparentes
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
            Sin sorpresas. Conoce nuestros valores antes de comenzar.
          </p>
        </motion.div>

        {/* Free consultation banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-6 flex items-center justify-center gap-4">
            <Gift className="h-8 w-8 text-primary" />
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">
                Primera orientación general gratuita
              </p>
              <p className="text-sm text-muted-foreground">
                Escríbenos y te orientamos sin compromiso
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {pricingItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className={`h-full transition-all duration-300 ${
                  item.highlighted 
                    ? "border-primary shadow-lg scale-105" 
                    : "border-border hover:shadow-soft"
                }`}
              >
                <CardHeader className="text-center pb-4">
                  {item.highlighted && (
                    <span className="inline-block px-3 py-1 mb-2 text-xs font-medium rounded-full bg-primary text-primary-foreground">
                      Más solicitado
                    </span>
                  )}
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <p className="text-3xl font-bold text-primary mt-2">{item.price}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Payment options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-sm font-medium text-foreground mb-4">Formas de pago flexibles:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {paymentOptions.map((option) => (
              <span 
                key={option}
                className="px-4 py-2 rounded-full bg-muted text-sm text-muted-foreground"
              >
                {option}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
