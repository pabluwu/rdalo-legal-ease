import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  AlertCircle,
  MessageCircle,
  Mail,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ModalCalculadora, { WizardData } from "@/components/ModalCalculadora";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Seo from "@/seo/Seo";

const INGRESO_MINIMO_2025 = 539000; 

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cómo se saca el porcentaje de pensión alimenticia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El porcentaje se calcula sobre los ingresos del demandado y las necesidades del hijo. En Chile, la ley establece montos mínimos basados en el sueldo mínimo ($529.000 en 2025): para un hijo es el 40% de un ingreso mínimo y para dos o más es el 30% por cada uno, con un tope máximo legal del 50% de las rentas del alimentante.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto es el porcentaje de pensión alimenticia por 2 hijos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Para dos o más hijos, el monto mínimo legal es el 30% de un ingreso mínimo mensual por cada hijo. Con el sueldo mínimo actual de $529.000, la pensión mínima total por dos hijos es de $317.400, siempre que este monto no supere el límite máximo del 50% de los ingresos totales del padre o madre que paga.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué ingresos se consideran para el cálculo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Se deben considerar todos los ingresos, incluyendo sueldo base, gratificaciones, bonos, honorarios e incluso rentas por arriendos o inversiones. El tribunal evaluará la capacidad económica total para fijar el monto definitivo.",
      },
    },
  ],
};

const CalculadoraPension = () => {
  const { cantidadHijosParam } = useParams<{ cantidadHijosParam?: string }>();
  const [cantidadHijos, setCantidadHijos] = useState<number>(1);

  useEffect(() => {
    if (cantidadHijosParam) {
      const match = cantidadHijosParam.match(/^(\d+)/);
      if (match) {
        const num = parseInt(match[1]);
        if (num > 0 && num <= 10) {
          setCantidadHijos(num);
        }
      }
    }
  }, [cantidadHijosParam]);

  const [ingresosPadre, setIngresosPadre] = useState<string>("");
  const [esPensionado, setEsPensionado] = useState<string>("no");
  const [tieneIngresoExtra, setTieneIngresoExtra] = useState<string>("no");
  const [resultado, setResultado] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showPensionadoWarning, setShowPensionadoWarning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const isSpecificSearch = cantidadHijosParam && /^\d+/.test(cantidadHijosParam);
  const dynamicTitle = isSpecificSearch 
    ? `Calculadora de Pensión por ${cantidadHijos} Hijos en Chile (2026)` 
    : "Calculadora Ley Papito Corazón 2026: Cálculo exacto de pensión";
  
  const dynamicH1 = isSpecificSearch
    ? `Calculadora de Pensión por ${cantidadHijos} Hijos`
    : "Calculadora de Pensión de Alimentos: Porcentajes Pensión Alimenticia";

  const dynamicDescription = isSpecificSearch
    ? `Obtén el cálculo exacto de pensión por ${cantidadHijos} hijos según la Ley Papito Corazón 2026. Calcula en segundos el monto legal según el sueldo mínimo en Chile.`
    : "Calcula cuánta pensión corresponde según tu sueldo con nuestra tabla 2026 actualizada. Resultados instantáneos bajo la Ley Papito Corazón. ¡Entra aquí!";

  const calcularPension = () => {
    // Verificar si es pensionado sin ingresos extra
    if (esPensionado === "si" && tieneIngresoExtra === "no") {
      setShowPensionadoWarning(true);
      setResultado(null);
      return;
    }

    const ingresos = parseFloat(ingresosPadre);
    if (isNaN(ingresos) || ingresos <= 0) {
      toast({
        title: "Error",
        description: "Por favor ingresa un monto válido de ingresos",
        variant: "destructive",
      });
      return;
    }

    let porcentaje: number;
    if (cantidadHijos === 1) {
      porcentaje = 0.4; // 40% para 1 hijo
    } else {
      porcentaje = 0.3 * cantidadHijos; // 30% por cada hijo
    }

    // Limitar al 50% máximo
    const porcentajeMaximo = 0.5;
    const porcentajeFinal = Math.min(porcentaje, porcentajeMaximo);

    const pensionCalculada = ingresos * porcentajeFinal;
    const pensionMinima = INGRESO_MINIMO_2025 * porcentajeFinal;

    // La pensión no puede ser menor al porcentaje del ingreso mínimo
    const pensionFinal = Math.max(pensionCalculada, pensionMinima);

    setResultado(pensionFinal);
    setShowModal(true);
  };

  const handleWizardSubmit = async (data: WizardData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.acuerdalo.cl/api/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: data.contacto.nombre,
          correo: data.contacto.email,
          telefono: data.contacto.whatsapp,
          mensaje: [
            "NUEVA PRE-EVALUACIÓN DE PENSIÓN",
            "--------------------------------",
            `Monto Estimado: ${formatCurrency(data.montoCalculado)}`,
            `Número de Hijos: ${data.numeroHijos}`,
            "",
            "DATOS DEL CASO:",
            `- Rol: ${data.respuestas.rol}`,
            `- Gastos Extraordinarios: ${data.respuestas.gastosExtraordinarios}`,
            `- Situación Laboral: ${data.respuestas.situacionLaboral}`,
            `- Acuerdo Previo: ${data.respuestas.acuerdoPrevio}`,
            "",
            "CONTACTO:",
            `- Nombre: ${data.contacto.nombre}`,
            `- WhatsApp: ${data.contacto.whatsapp}`,
            `- Email: ${data.contacto.email}`
          ].join("\n"),
        }),
      });

      if (response.ok) {
        toast({
          title: "¡Recibido!",
          description: "Un especialista revisará tu caso y te contactará a la brevedad.",
        });
        setShowModal(false);
      } else {
        throw new Error("Error en la solicitud");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar la información. Por favor intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={dynamicTitle}
        description={dynamicDescription}
        canonical="https://acuerdalo.cl/calculadora-pension"
        jsonLd={faqSchema}
      />
      <Navbar />

      {/* Hero simplified for "App feel" */}
      <section className="pt-20 pb-6 md:pt-32 md:pb-10 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl md:text-4xl font-extrabold text-foreground tracking-tight mb-2">
              {dynamicH1}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section - More compact and App-like */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="max-w-xl mx-auto"
          >
            <div className="bg-card rounded-[2.5rem] shadow-2xl border border-border/50 p-6 md:p-10 space-y-8">
              {/* Cantidad de hijos - Numeric selector style */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <Label htmlFor="hijos" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Número de Hijos
                  </Label>
                  <span className="text-2xl font-bold text-primary">{cantidadHijos}</span>
                </div>
                <Input
                  id="hijos"
                  type="number"
                  min={1}
                  max={10}
                  value={cantidadHijos}
                  onChange={(e) => {
                    // Permite borrar y escribir libremente
                    setCantidadHijos(e.target.value);
                  }}
                  onBlur={() => {
                    let num = parseInt(cantidadHijos);
            
                    if (isNaN(num) || num < 1) num = 1;
                    if (num > 10) num = 10;
            
                    setCantidadHijos(String(num));
                  }}
                  className="h-14 text-xl font-medium rounded-2xl bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>

              {/* Ingresos - More prominent */}
              <div className="space-y-4">
                <Label htmlFor="ingresos" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Ingresos Mensuales Líquidos
                </Label>
                <div className="relative group">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-medium text-muted-foreground group-focus-within:text-primary transition-colors">
                    $
                  </span>
                  <Input
                    id="ingresos"
                    type="number"
                    min={0}
                    placeholder="800.000"
                    value={ingresosPadre}
                    onChange={(e) => setIngresosPadre(e.target.value)}
                    className="pl-12 h-16 text-2xl font-bold rounded-2xl bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
                  />
                </div>
              </div>

              {/* Es pensionado - Fixed Interaction */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/20">
                  <Label className="text-sm font-medium">¿El demandado es pensionado?</Label>
                  <RadioGroup
                    value={esPensionado}
                    onValueChange={setEsPensionado}
                    className="flex bg-background p-1 rounded-xl border border-border"
                  >
                    <div className={`flex items-center px-4 py-1.5 rounded-lg transition-all ${esPensionado === "no" ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-muted"}`}>
                      <RadioGroupItem value="no" id="no-pensionado" className="sr-only" />
                      <Label htmlFor="no-pensionado" className="text-sm font-bold cursor-pointer">No</Label>
                    </div>
                    <div className={`flex items-center px-4 py-1.5 rounded-lg transition-all ${esPensionado === "si" ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-muted"}`}>
                      <RadioGroupItem value="si" id="si-pensionado" className="sr-only" />
                      <Label htmlFor="si-pensionado" className="text-sm font-bold cursor-pointer">Sí</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Ingreso extra - Restored Logic */}
                <AnimatePresence>
                  {esPensionado === "si" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 rounded-2xl bg-amber-50 border border-amber-100 space-y-4"
                    >
                      <Label className="text-sm font-semibold text-amber-900">
                        ¿Tiene ingresos adicionales además de la pensión?
                      </Label>
                      <RadioGroup
                        value={tieneIngresoExtra}
                        onValueChange={setTieneIngresoExtra}
                        className="flex gap-2"
                      >
                        <div className={`flex-1 flex items-center justify-center p-3 rounded-xl border transition-all cursor-pointer ${tieneIngresoExtra === "si" ? "bg-amber-600 text-white border-amber-600" : "bg-white border-amber-200 text-amber-900"}`}>
                          <RadioGroupItem value="si" id="si-extra" className="sr-only" />
                          <Label htmlFor="si-extra" className="font-bold cursor-pointer text-sm">Sí, tiene otros</Label>
                        </div>
                        <div className={`flex-1 flex items-center justify-center p-3 rounded-xl border transition-all cursor-pointer ${tieneIngresoExtra === "no" ? "bg-amber-600 text-white border-amber-600" : "bg-white border-amber-200 text-amber-900"}`}>
                          <RadioGroupItem value="no" id="no-extra" className="sr-only" />
                          <Label htmlFor="no-extra" className="font-bold cursor-pointer text-sm">No, solo pensión</Label>
                        </div>
                      </RadioGroup>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Botón calcular - Primary action */}
              <Button
                onClick={calcularPension}
                className="w-full h-16 text-xl font-bold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all"
                size="lg"
              >
                <Calculator className="w-6 h-6 mr-3" />
                Ver mi cálculo ahora
              </Button>

              <p className="text-xs text-muted-foreground text-center font-medium animate-pulse">
                ⚡️ {Math.floor(Math.random() * 20) + 80} personas calculando ahora
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEO content pushed lower */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center">
              Guía Legal: ¿Como se saca el porcentaje de pension alimenticia?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-2xl border border-border">
                <h3 className="font-bold mb-2">Porcentaje de pensión alimenticia por 3 hijos</h3>
                <p className="text-sm text-muted-foreground">La ley chilena busca proteger el bienestar de los menores estableciendo topes y mínimos claros.</p>
              </div>
              <div className="bg-card p-6 rounded-2xl border border-border">
                <h3 className="font-bold mb-2">Cálculo exacto 2026</h3>
                <p className="text-sm text-muted-foreground">Basado en el sueldo mínimo actual de $529.000 y la Ley Papito Corazón.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-8 max-w-3xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold">
          ¿Como se saca el porcentaje de pension alimenticia?
        </h2>

        <p>
          En Chile, la pensión de alimentos se determina en base a los ingresos
          del padre o madre que debe pagarla y las necesidades del hijo. La ley
          establece porcentajes referenciales que los tribunales utilizan como
          base para fijar el monto.
        </p>

        <h3 className="text-xl font-semibold">
          Porcentaje de pensión alimenticia por 3 hijos
        </h3>
        <p>Como regla general, la pensión corresponde a:</p>
        <ul className="list-disc ml-5 space-y-2">
          <li>
            <strong>1 hijo:</strong> hasta un 40% de los ingresos
          </li>
          <li>
            <strong>2 o más hijos:</strong> aproximadamente un 30% por cada hijo
          </li>
          <li>
            <strong>Tope máximo:</strong> 50% del ingreso total del demandado
          </li>
        </ul>

        <h3 className="text-xl font-semibold">
          Monto mínimo de pensión en Chile
        </h3>
        <p>
          La pensión de alimentos no puede ser inferior a un porcentaje del
          ingreso mínimo mensual. Esto asegura que, incluso si el demandado
          declara bajos ingresos, exista un monto base para cubrir las
          necesidades del menor.
        </p>

        <h3 className="text-xl font-semibold">Qué ingresos se consideran</h3>
        <p>
          Para calcular la pensión, se consideran todos los ingresos del
          demandado, incluyendo sueldo, honorarios, arriendos, inversiones y
          cualquier otra fuente de ingreso regular.
        </p>

        <h3 className="text-xl font-semibold">
          Importante: cada caso es distinto
        </h3>
        <p>
          Este cálculo es solo referencial. El tribunal puede ajustar el monto
          según factores como el nivel de vida del menor, gastos educacionales,
          salud y la capacidad económica de ambos padres.
        </p>
        <h3 className="text-xl font-semibold">
          ¿Cuánto se paga realmente por pensión de alimentos en Chile?
        </h3>

        <p>
          En la práctica, los tribunales de familia en Chile evalúan múltiples
          factores, por lo que el monto puede variar considerablemente. Sin
          embargo, muchas personas buscan respuestas como:
        </p>

        <ul className="list-disc ml-5 space-y-2">
          <li>Cuánto pagar por pensión de alimentos con sueldo mínimo</li>
          <li>Cuánto corresponde por 1 hijo o 2 hijos</li>
          <li>Cómo se calcula si hay ingresos informales</li>
        </ul>

        <p>
          Esta calculadora te entrega un estimado basado en criterios comunes
          utilizados por tribunales, pero siempre es recomendable revisar tu
          caso específico.
        </p>
        <p className="pb-16">
          Si quieres entender en detalle cómo funciona la pensión de alimentos
          en Chile, revisa nuestra <br />
          <a
            href="/guias/pension-de-alimentos/marco-teorico"
            className="text-primary underline"
          >
            guía completa sobre pensión de alimentos
          </a>
          .
        </p>
      </section>

      <div className="mt-4 text-center mb-8">
        <p className="mb-4 text-muted-foreground">
          ¿Quieres saber el monto exacto según tu caso?
        </p>

        <Button asChild size="lg">
          <a target="_blank" href="https://wa.me/56990538001?text=Hola,%20acabo%20de%20usar%20la%20calculadora%20de%20pensión%20y%20me%20gustaría%20una%20consulta%20profesional.">Consultar por mi caso</a>
        </Button>
      </div>

      {/* Modal de resultado con Wizard */}
      <ModalCalculadora
        open={showModal}
        onOpenChange={setShowModal}
        montoCalculado={resultado || 0}
        numeroHijos={cantidadHijos}
        onSubmit={handleWizardSubmit}
      />

      {/* Modal para pensionados sin ingreso extra */}
      <Dialog
        open={showPensionadoWarning}
        onOpenChange={setShowPensionadoWarning}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Caso Especial</DialogTitle>
          </DialogHeader>

          <div className="py-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-amber-600" />
              </div>
            </div>

            <p className="text-center text-muted-foreground mb-6">
              Cuando el demandado es pensionado y no tiene ingresos adicionales,
              el cálculo de pensión de alimentos requiere un análisis especial
              que debe ser revisado por un abogado, ya que existen
              consideraciones legales particulares.
            </p>

            <div className="space-y-4">
              <Button asChild className="w-full py-6" size="lg">
                <a
                  href="https://wa.me/56990538001?text=Hola,%20necesito%20consultar%20sobre%20pensión%20de%20alimentos%20para%20un%20caso%20donde%20el%20demandado%20es%20pensionado."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Consultar con un Abogado
                </a>
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowPensionadoWarning(false)}
              >
                Volver a la calculadora
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default CalculadoraPension;
