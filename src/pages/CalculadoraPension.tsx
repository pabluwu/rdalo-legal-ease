import { useState } from "react";
import { Link } from "react-router-dom";
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
import AsistenteLegal from "@/components/AsistenteLegal";
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
import { pushDataLayer } from "@/analytics/gtm";
import AuthorByline from "@/components/AuthorByline";
import { buildBreadcrumbJsonLd } from "@/seo/breadcrumbJsonLd";
import { buildArticleJsonLd } from "@/seo/articleJsonLd";

// Fuente unica del ingreso minimo mensual: el calculo, la tabla de minimos, los
// ejemplos y el JSON-LD de FAQ derivan todos de esta constante. Antes el codigo
// usaba 539.000 y el texto decia 529.000, de modo que la pagina se contradecia a
// si misma. Al cambiar este numero se actualiza toda la pagina.
// Vigente desde el 21 de septiembre de 2026.
const INGRESO_MINIMO = 553553;

// Minimos legales por numero de hijos (Ley N 14.908): 40% de un ingreso minimo
// para un hijo, 30% por cada hijo cuando son dos o mas.
const porcentajeMinimoLegal = (hijos: number) =>
  hijos === 1 ? 0.4 : 0.3 * hijos;

/** Tope legal: la pension no puede superar el 50% de las rentas del alimentante. */
const TOPE_LEGAL = 0.5;

// Tramos para analitica. Se registra el rango, nunca la cifra exacta: sirve igual
// para saber con que sueldos e ingresos se usa la calculadora, sin guardar la
// situacion economica de nadie. El prefijo numerico es para que ordenen bien en
// los informes.
const tramoIngreso = (ingresos: number) => {
  if (ingresos < INGRESO_MINIMO) return "1_bajo_el_minimo";
  if (ingresos < 800_000) return "2_minimo_a_800k";
  if (ingresos < 1_200_000) return "3_800k_a_1200k";
  if (ingresos < 2_000_000) return "4_1200k_a_2000k";
  if (ingresos < 3_000_000) return "5_2000k_a_3000k";
  return "6_sobre_3000k";
};

const tramoMonto = (monto: number) => {
  if (monto < 300_000) return "1_bajo_300k";
  if (monto < 500_000) return "2_300k_a_500k";
  if (monto < 800_000) return "3_500k_a_800k";
  if (monto < 1_500_000) return "4_800k_a_1500k";
  return "5_sobre_1500k";
};

const formatoCLP = (valor: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  }).format(Math.round(valor));

/** Lo que da el calculo por hijo, antes de aplicar el tope. */
const calculoPorHijoEnPesos = (hijos: number) =>
  INGRESO_MINIMO * porcentajeMinimoLegal(hijos);

/**
 * Minimo aplicable en pesos para N hijos. El tope del 50% siempre prevalece,
 * aunque el calculo por hijo de un porcentaje mayor, asi que desde dos hijos el
 * piso queda fijado en el 50% de un ingreso minimo.
 */
const minimoEnPesos = (hijos: number) =>
  INGRESO_MINIMO * Math.min(porcentajeMinimoLegal(hijos), TOPE_LEGAL);

/**
 * Monto referencial para un sueldo y un numero de hijos: el porcentaje aplicado a
 * las rentas, nunca por debajo del minimo legal. Es la misma formula que usa el
 * boton de calcular, extraida aqui a proposito: la tabla "segun sueldo" de mas
 * abajo se genera con esta funcion, de modo que no puede contradecir a la
 * calculadora. En septiembre de 2026 ya habia pasado que la prosa afirmaba
 * minimos que el propio calculo desmentia.
 */
const pensionReferencial = (ingresos: number, hijos: number) => {
  const porcentaje = Math.min(porcentajeMinimoLegal(hijos), TOPE_LEGAL);
  return Math.max(ingresos * porcentaje, INGRESO_MINIMO * porcentaje);
};

/**
 * Sueldos de la tabla "segun sueldo". Salen de las consultas reales de Search
 * Console ("si gano 700 cuanto debo pagar de pension alimenticia", "si gano un
 * millon cuanto pago de pension alimenticia", "si gano 800 cuanto debes pagar").
 */
const SUELDOS_TABLA = [500_000, 700_000, 800_000, 1_000_000, 1_500_000, 2_000_000];


const faqs = [
  {
    question: "¿Cómo se saca el porcentaje de pensión alimenticia?",
    answer:
      `El porcentaje se calcula sobre los ingresos del demandado y las necesidades del hijo. La Ley N° 14.908 fija mínimos sobre el ingreso mínimo mensual (${formatoCLP(INGRESO_MINIMO)}): 40% de un ingreso mínimo para un hijo y 30% por cada hijo cuando son dos o más. Sobre ese cálculo prevalece siempre el tope del 50%, tanto sobre el mínimo como sobre las rentas del alimentante.`,
  },
  {
    question: "¿Cuánto es el porcentaje de pensión alimenticia por 2 hijos?",
    answer:
      `Por dos hijos el cálculo da 30% de un ingreso mínimo por cada uno, es decir un 60% en total. Pero el tope del 50% siempre prevalece, así que el mínimo aplicable es ${formatoCLP(minimoEnPesos(2))} mensuales. Ese tope se mide sobre las rentas del alimentante: con un sueldo más alto la pensión sube hasta el 50% de ese sueldo.`,
  },
  {
    question: "¿Cuánto es el porcentaje de pensión alimenticia por 3 hijos?",
    answer:
      `Por tres hijos el cálculo daría 30% por cada uno, un 90% en total, pero el tope del 50% prevalece. El mínimo aplicable es ${formatoCLP(minimoEnPesos(3))} mensuales, el mismo que por dos hijos, y sobre un sueldo mayor la referencia es el 50% de ese sueldo. Ese total se reparte entre los tres hijos; los gastos extraordinarios se fijan aparte.`,
  },
  {
    question: "¿La pensión de alimentos se calcula sobre el sueldo bruto o el líquido?",
    answer:
      "Sobre el líquido: el porcentaje se aplica a lo que la persona efectivamente recibe, descontadas las cotizaciones previsionales y de salud obligatorias. Los descuentos voluntarios, como un crédito de consumo o un ahorro previsional voluntario, no se restan del ingreso considerado.",
  },
  {
    question: "¿Cuánto es la pensión mínima por un hijo?",
    answer:
      `Para un hijo el mínimo legal es el 40% de un ingreso mínimo mensual, esto es ${formatoCLP(minimoEnPesos(1))} al mes. El tribunal puede fijar un monto mayor si los ingresos del alimentante o las necesidades del hijo lo justifican.`,
  },
  {
    question: "¿Qué ingresos se consideran para el cálculo?",
    answer:
      "Se consideran todos los ingresos: sueldo base, gratificaciones, bonos, horas extra, honorarios, e incluso rentas por arriendos o inversiones. El tribunal evalúa la capacidad económica total, no solo la liquidación de sueldo.",
  },
  {
    question: "¿Qué incluye la pensión de alimentos?",
    answer:
      "Cubre lo necesario para la subsistencia y el desarrollo del hijo: alimentación, vestuario, salud, educación, vivienda y recreación básica. Los gastos extraordinarios, como una cirugía o la matrícula anual, suelen fijarse aparte y repartirse entre ambos padres.",
  },
  {
    question: "¿Qué pasa si no me pagan la pensión de alimentos?",
    answer:
      "Se puede pedir la liquidación de la deuda ante el tribunal. El deudor ingresa al Registro Nacional de Deudores de Pensiones de Alimentos y proceden la retención de remuneraciones, la retención de la devolución de impuestos y apremios como el arraigo, el arresto nocturno y la suspensión de la licencia de conducir.",
  },
  {
    question: "¿Se puede aumentar o rebajar la pensión después?",
    answer:
      "Sí. El monto no es definitivo: puede revisarse cuando cambian las circunstancias, por ejemplo si aumentan las necesidades del hijo, mejora la situación económica del alimentante o este pierde su trabajo. Requiere mediación previa y prueba documental del cambio.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const articleJsonLd = buildArticleJsonLd({
  headline: "Calculadora de pensión de alimentos en Chile",
  description:
    "Cómo se calcula la pensión de alimentos en Chile: porcentajes por número de hijos, mínimos legales, tope del 50 %, qué ingresos se consideran y qué incluye.",
  path: "/calculadora-pension",
  datePublished: "2025-12-05",
  dateModified: "2026-09-21",
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Calculadora de pensión de alimentos", path: "/calculadora-pension" },
]);

const CalculadoraPension = () => {
  const [hijosInput, setHijosInput] = useState<string>("1");
  /** Valor normalizado (1-10) que usa todo lo que no es el propio input. */
  const cantidadHijos = Math.min(Math.max(parseInt(hijosInput) || 1, 1), 10);

  const [ingresosPadre, setIngresosPadre] = useState<string>("");
  const [esPensionado, setEsPensionado] = useState<string>("no");
  const [tieneIngresoExtra, setTieneIngresoExtra] = useState<string>("no");
  const [resultado, setResultado] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showPensionadoWarning, setShowPensionadoWarning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // El titulo del 21 de abril de 2026 cambio "calculadora de pension de alimentos
  // chile" —la consulta que traia el 100% de los clics— por "Ley Papito Corazon",
  // un apodo coloquial que casi nadie busca. La pagina perdio su posicion en las
  // semanas siguientes. Estos textos vuelven a la consulta real y suman el gancho
  // de clic (gratis, segun sueldo y numero de hijos). Ver PLAN-SEO.md, Fase 5.
  const pageTitle = "Calculadora de pensión de alimentos Chile 2026 | Gratis";

  const pageH1 = "Calculadora de pensión de alimentos en Chile";

  const pageDescription =
    "Calcula gratis la pensión de alimentos en Chile 2026 según tu sueldo y el número de hijos. Resultado al instante con los porcentajes de la Ley N° 14.908.";

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

    const porcentajeFinal = Math.min(porcentajeMinimoLegal(cantidadHijos), TOPE_LEGAL);

    const pensionCalculada = ingresos * porcentajeFinal;
    const pensionMinima = INGRESO_MINIMO * porcentajeFinal;

    // La pensión no puede ser menor al porcentaje del ingreso mínimo. Misma
    // fórmula que `pensionReferencial`, que alimenta la tabla según sueldo.
    const pensionFinal = pensionReferencial(ingresos, cantidadHijos);

    setResultado(pensionFinal);
    setShowModal(true);

    // Un calculo no se persiste en ninguna parte: es estado de cliente. Sin este
    // evento no habia forma de saber cuantas visitas a la calculadora llegan a
    // calcular, ni con cuantos hijos ni en que tramo de ingresos.
    pushDataLayer({
      event: "calculo_pension",
      hijos: cantidadHijos,
      tramo_ingreso: tramoIngreso(ingresos),
      tramo_resultado: tramoMonto(pensionFinal),
      // true cuando gana tan poco que el resultado lo fija el minimo legal y no
      // su sueldo: dice cuanta de la audiencia esta en el piso.
      aplica_minimo_legal: pensionMinima > pensionCalculada,
      es_pensionado: esPensionado === "si",
    });
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
        title={pageTitle}
        description={pageDescription}
        canonical="https://acuerdalo.cl/calculadora-pension"
        jsonLd={[articleJsonLd, faqSchema, breadcrumbJsonLd]}
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
              {pageH1}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
              Calcula gratis cuánto corresponde según tu sueldo y el número de hijos,
              con los porcentajes y el tope que fija la Ley N° 14.908.
            </p>
            <div className="flex justify-center">
              <AuthorByline updatedAt="21 de septiembre de 2026" />
            </div>
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
                  value={hijosInput}
                  onChange={(e) => {
                    // Permite borrar y escribir libremente
                    setHijosInput(e.target.value);
                  }}
                  onBlur={() => {
                    // Al salir del campo se escribe el valor ya normalizado
                    setHijosInput(String(cantidadHijos));
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

            </div>
          </motion.div>
        </div>
      </section>

      {/* SEO content pushed lower */}
      <section className="mt-8 mb-4 max-w-3xl mx-auto px-4 space-y-10">
        {/* Indice. Cada seccion de abajo responde un grupo de consultas concreto de
            Search Console; el ancla permite enlazarla desde las guias y desde fuera
            sin crear todavia una URL nueva. Ver PLAN-SEO.md, Fase 5. */}
        <nav
          aria-label="Contenido de esta página"
          className="rounded-2xl border border-border bg-muted/30 p-5"
        >
          {/* <p> y no <h2>: el indice no es una seccion de contenido y no debe
              aparecer en el esquema de encabezados de la pagina. */}
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            En esta página
          </p>
          <ul className="grid gap-2 sm:grid-cols-2 text-sm">
            <li>
              <a href="#como-se-calcula" className="text-primary hover:underline">
                Cómo se calcula
              </a>
            </li>
            <li>
              <a href="#porcentaje-por-hijos" className="text-primary hover:underline">
                Porcentaje por 1, 2 o 3 hijos
              </a>
            </li>
            <li>
              <a href="#segun-sueldo" className="text-primary hover:underline">
                Tabla según sueldo
              </a>
            </li>
            <li>
              <a href="#bruto-o-liquido" className="text-primary hover:underline">
                ¿Sueldo bruto o líquido?
              </a>
            </li>
            <li>
              <a href="#que-ingresos" className="text-primary hover:underline">
                Qué ingresos se consideran
              </a>
            </li>
            <li>
              <a href="#preguntas-frecuentes" className="text-primary hover:underline">
                Preguntas frecuentes
              </a>
            </li>
          </ul>
        </nav>

        <div id="como-se-calcula" className="space-y-4 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold">
            Cómo se calcula la pensión de alimentos en Chile
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            La pensión de alimentos se fija según dos cosas: las necesidades del hijo o
            hija y la capacidad económica de quien debe pagarla. La{" "}
            <a
              href="https://www.bcn.cl/leychile/navegar?idNorma=27977"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Ley N° 14.908
            </a>{" "}
            no entrega una fórmula cerrada, pero sí un piso y un techo que el tribunal
            debe respetar. Esta calculadora aplica esos dos límites. El detalle del
            procedimiento, los requisitos y la jurisprudencia están en la{" "}
            <Link
              to="/guias/pension-de-alimentos"
              className="text-primary hover:underline"
            >
              guía de pensión de alimentos
            </Link>
            .
          </p>
        </div>

        <div id="porcentaje-por-hijos" className="space-y-4 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold">
            Porcentaje de pensión alimenticia por 1, 2 o 3 hijos
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            El mínimo legal se mide sobre el ingreso mínimo mensual, hoy{" "}
            {formatoCLP(INGRESO_MINIMO)}. Sobre ese piso el monto sube según los ingresos
            reales del alimentante, siempre con el límite del 50 %, que prevalece en
            cualquier caso.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
              <caption className="sr-only">
                Mínimo legal de pensión de alimentos según número de hijos
              </caption>
              <thead className="bg-muted/50">
                <tr>
                  <th scope="col" className="text-left p-3 font-semibold">
                    Número de hijos
                  </th>
                  <th scope="col" className="text-left p-3 font-semibold">
                    Cálculo por hijo
                  </th>
                  <th scope="col" className="text-left p-3 font-semibold">
                    Mínimo aplicable
                  </th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4].map((hijos) => (
                  <tr key={hijos} className="border-t border-border">
                    <td className="p-3">
                      {hijos} {hijos === 1 ? "hijo" : "hijos"}
                    </td>
                    <td className="p-3 text-muted-foreground">
                      {Math.round(porcentajeMinimoLegal(hijos) * 100)} % de un ingreso mínimo
                      {porcentajeMinimoLegal(hijos) > TOPE_LEGAL && (
                        <span className="block text-xs">
                          {formatoCLP(calculoPorHijoEnPesos(hijos))}, sobre el tope
                        </span>
                      )}
                    </td>
                    <td className="p-3 font-medium">
                      {formatoCLP(minimoEnPesos(hijos))}
                      {porcentajeMinimoLegal(hijos) > TOPE_LEGAL && (
                        <span className="block text-xs font-normal text-muted-foreground">
                          tope del 50 %
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground">
            El tope del 50 % siempre prevalece, aunque el cálculo por hijo dé un
            porcentaje mayor. Por eso desde dos hijos el mínimo se detiene en{" "}
            {formatoCLP(minimoEnPesos(2))}: sumar hijos no baja ese piso, pero tampoco lo
            sube. Son montos mínimos, no esperables: el tope se mide sobre las rentas de
            quien paga, así que con un sueldo más alto la pensión sube hasta el 50 % de
            ese sueldo.
          </p>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              Porcentaje de pensión alimenticia por 1 hijo
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Por un hijo el mínimo legal es el{" "}
              {Math.round(porcentajeMinimoLegal(1) * 100)} % de un ingreso mínimo
              mensual, hoy {formatoCLP(minimoEnPesos(1))}. Sobre ese piso la referencia
              es el 40 % de las rentas de quien paga: con un sueldo de{" "}
              {formatoCLP(800000)} son {formatoCLP(pensionReferencial(800000, 1))} al
              mes. Con un solo hijo el tope del 50 % no llega a aplicarse.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              Porcentaje de pensión alimenticia por 2 hijos
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Por dos hijos el cálculo da 30 % por cada uno, es decir un 60 %. Ese 60 %
              está sobre el tope legal, así que lo aplicable es el 50 %: el mínimo queda
              en {formatoCLP(minimoEnPesos(2))} mensuales en total —no por hijo— y con un
              sueldo de {formatoCLP(800000)} la referencia sube a{" "}
              {formatoCLP(pensionReferencial(800000, 2))}.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              Porcentaje de pensión alimenticia por 3 hijos
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Por tres hijos el cálculo daría un 90 %, muy por encima del tope. El
              resultado es el mismo que por dos: {formatoCLP(minimoEnPesos(3))} de mínimo
              y un 50 % de las rentas como referencia. No es un error de la calculadora:
              desde el segundo hijo el tope ya está alcanzado y sumar hijos no mueve el
              total. Lo que sí cambia es cómo se reparte ese monto y el peso de los
              gastos extraordinarios, que se fijan aparte.
            </p>
          </div>
        </div>

        <div id="segun-sueldo" className="space-y-4 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold">
            Pensión de alimentos según sueldo: tabla 2026
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            La tabla aplica el mismo cálculo que la calculadora de arriba: el porcentaje
            sobre las rentas, nunca por debajo del mínimo legal. Son montos referenciales
            sobre el sueldo líquido total.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
              <caption className="sr-only">
                Pensión de alimentos referencial según sueldo mensual y número de hijos
              </caption>
              <thead className="bg-muted/50">
                <tr>
                  <th scope="col" className="text-left p-3 font-semibold">
                    Sueldo mensual
                  </th>
                  <th scope="col" className="text-left p-3 font-semibold">
                    1 hijo
                  </th>
                  <th scope="col" className="text-left p-3 font-semibold">
                    2 hijos
                  </th>
                  <th scope="col" className="text-left p-3 font-semibold">
                    3 o más hijos
                  </th>
                </tr>
              </thead>
              <tbody>
                {SUELDOS_TABLA.map((sueldo) => (
                  <tr key={sueldo} className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-medium">
                      {formatoCLP(sueldo)}
                    </th>
                    {[1, 2, 3].map((hijos) => (
                      <td key={hijos} className="p-3 text-muted-foreground">
                        {formatoCLP(pensionReferencial(sueldo, hijos))}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground">
            Las columnas de 2 y 3 hijos coinciden porque ambas llegan al tope del 50 %.
            Con un sueldo bajo el ingreso mínimo ({formatoCLP(INGRESO_MINIMO)}) el
            resultado no baja del piso legal: {formatoCLP(minimoEnPesos(1))} por un hijo y{" "}
            {formatoCLP(minimoEnPesos(2))} desde dos. Si quien debe pagar no tiene trabajo
            formal, el tribunal igual puede fijar pensión estimando su capacidad
            económica; ese escenario está explicado en la{" "}
            <Link
              to="/guias/pension-de-alimentos"
              className="text-primary hover:underline"
            >
              guía de pensión de alimentos
            </Link>
            .
          </p>
        </div>

        <div id="bruto-o-liquido" className="space-y-4 scroll-mt-24">
          <h3 className="text-xl font-semibold">
            ¿La pensión se calcula sobre el sueldo bruto o el líquido?
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Sobre el líquido. El porcentaje se aplica a lo que la persona efectivamente
            recibe, descontadas las cotizaciones previsionales y de salud obligatorias, no
            sobre el sueldo bruto del contrato. Los descuentos voluntarios —un crédito de
            consumo, un ahorro previsional voluntario, una cuota social— no se restan: de
            lo contrario bastaría con endeudarse para bajar la pensión. Por eso esta
            calculadora pide los ingresos líquidos.
          </p>
        </div>

        <div id="que-ingresos" className="space-y-4 scroll-mt-24">
          <h3 className="text-xl font-semibold">Qué ingresos se consideran</h3>
          <p className="text-muted-foreground leading-relaxed">
            No solo el sueldo base. El tribunal evalúa la capacidad económica completa:
          </p>
          <ul className="list-disc ml-5 space-y-2 text-muted-foreground">
            <li>Sueldo líquido, gratificaciones, bonos y horas extra.</li>
            <li>Honorarios y trabajos a boleta.</li>
            <li>Rentas de arriendo, inversiones y utilidades de sociedades.</li>
            <li>
              Ingresos informales, que pueden acreditarse por movimientos bancarios,
              nivel de vida o prueba testimonial.
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Qué incluye la pensión de alimentos</h3>
          <p className="text-muted-foreground leading-relaxed">
            Cubre lo necesario para la subsistencia y el desarrollo del hijo o hija:
            alimentación, vestuario, salud, educación, vivienda y recreación básica. Los
            gastos extraordinarios —una cirugía, la matrícula anual, un tratamiento
            prolongado— no se entienden incluidos y suelen fijarse aparte, repartidos
            entre ambos padres. La{" "}
            <Link
              to="/guias/pension-de-alimentos"
              className="text-primary hover:underline"
            >
              guía de pensión de alimentos
            </Link>{" "}
            detalla qué se ha considerado gasto extraordinario en la práctica.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Qué pasa si no se paga</h3>
          <p className="text-muted-foreground leading-relaxed">
            El incumplimiento se persigue pidiendo la liquidación de la deuda al tribunal.
            A partir de ahí operan el Registro Nacional de Deudores de Pensiones de
            Alimentos, la retención de remuneraciones y de la devolución de impuestos, y
            medidas de apremio como el arraigo, el arresto nocturno y la suspensión de la
            licencia de conducir. La{" "}
            <a
              href="https://www.bcn.cl/leychile/navegar?idNorma=1181003"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Ley N° 21.389
            </a>{" "}
            reforzó estos mecanismos. El procedimiento de cobro, paso a paso, está en
            la{" "}
            <Link
              to="/guias/pension-de-alimentos"
              className="text-primary hover:underline"
            >
              guía de pensión de alimentos
            </Link>
            .
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Cómo se tramita, paso a paso</h3>
          <ol className="list-decimal ml-5 space-y-2 text-muted-foreground">
            <li>
              <strong className="text-foreground">Mediación previa obligatoria.</strong>{" "}
              Antes de demandar hay que pasar por un centro de mediación familiar.
            </li>
            <li>
              <strong className="text-foreground">Demanda ante el tribunal de familia</strong>{" "}
              del domicilio del alimentario, si la mediación fracasa.
            </li>
            <li>
              <strong className="text-foreground">Alimentos provisorios.</strong> El juez
              puede fijar un monto desde el inicio, mientras se tramita la causa.
            </li>
            <li>
              <strong className="text-foreground">Audiencia y prueba</strong> de ingresos y
              necesidades.
            </li>
            <li>
              <strong className="text-foreground">Sentencia</strong> que fija el monto
              definitivo y su forma de pago.
            </li>
          </ol>
          <p className="text-muted-foreground leading-relaxed">
            Cada etapa, con plazos y documentos, está desarrollada en la{" "}
            <Link
              to="/guias/pension-de-alimentos"
              className="text-primary hover:underline"
            >
              guía de pensión de alimentos en Chile
            </Link>
            .
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Se puede aumentar o rebajar después</h3>
          <p className="text-muted-foreground leading-relaxed">
            El monto no queda congelado. Puede revisarse cuando cambian las
            circunstancias: si aumentan las necesidades del hijo, si mejora la situación
            económica de quien paga o si esa persona pierde su trabajo. También requiere
            mediación previa y prueba documental del cambio.
          </p>
        </div>

        <div id="preguntas-frecuentes" className="space-y-4 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold">
            Preguntas frecuentes sobre el cálculo de pensión
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl border border-border bg-card p-5"
              >
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-muted/30 p-5 space-y-3">
          <p className="text-sm text-muted-foreground">
            Este cálculo es referencial. El tribunal puede fijar un monto distinto según
            el nivel de vida del hijo, los gastos de educación y salud, y la capacidad
            económica de ambos padres.
          </p>
          <p className="text-sm text-muted-foreground">
            Para el detalle legal completo, revisa la{" "}
            <Link to="/guias/pension-de-alimentos" className="text-primary underline">
              guía de pensión de alimentos
            </Link>
            . Si tu caso también involucra{" "}
            <Link to="/divorcio-en-chile" className="text-primary underline">
              divorcio
            </Link>
            ,{" "}
            <Link
              to="/guias/visitas-y-cuidado-personal"
              className="text-primary underline"
            >
              visitas y cuidado personal
            </Link>{" "}
            o{" "}
            <Link to="/guias/medidas-de-proteccion" className="text-primary underline">
              medidas de protección
            </Link>
            , tenemos guías para cada uno.
          </p>
        </div>
      </section>

      {/* Visible siempre, no solo tras calcular: escondido tras el resultado casi
          nadie llegaba a verlo, y su cáscara estática es contenido indexable.
          Cuando ya hay cifra se le pasa como contexto para respuestas del caso. */}
      <AsistenteLegal
        tema="calculadora"
        montoCalculado={resultado ?? undefined}
        cantidadHijos={resultado !== null ? cantidadHijos : undefined}
        ingresoMensual={
          resultado !== null ? Number(ingresosPadre) || undefined : undefined
        }
      />

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
