import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthorByline from "@/components/AuthorByline";
import Seo from "@/seo/Seo";
import { buildArticleJsonLd } from "@/seo/articleJsonLd";
import AsistenteLegal from "@/components/AsistenteLegal";
import { buildBreadcrumbJsonLd } from "@/seo/breadcrumbJsonLd";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { waLink } from "@/lib/contacto";

const faqs = [
  {
    id: "naturaleza-juridica",
    question: "¿Cuál es la naturaleza jurídica de la pensión de alimentos en Chile?",
    answer:
      "La pensión de alimentos es un derecho humano fundamental derivado de la filiación y la solidaridad familiar. Es una asignación forzosa impuesta por ley, irrenunciable, intransferible e inembargable.",
  },
  {
    id: "marco-legal",
    question: "¿Qué leyes regulan la pensión de alimentos en Chile?",
    answer:
      "El marco legal incluye el Código Civil (artículo 321 y siguientes), la Ley N° 14.908 sobre procedimiento judicial de alimentos, la Ley de Responsabilidad Parental y el Registro Nacional de Deudores.",
  },
  {
    id: "quienes-solicitan",
    question: "¿Quiénes pueden solicitar pensión de alimentos?",
    answer:
      "Pueden solicitarla hijos hasta los 21 años, hijos hasta los 28 años si estudian, hijos con discapacidad (derecho vitalicio), cónyuge, ascendientes en estado de necesidad y hermanos en casos excepcionales.",
  },
  {
    id: "requisitos-tribunal",
    question: "¿Qué requisitos exige el tribunal para otorgar una pensión?",
    answer:
      "Se exige título legal, estado de necesidad del alimentario y capacidad económica del alimentante. Estos elementos deben acreditarse copulativamente.",
  },
  {
    id: "calculo-pension",
    question: "¿Cómo se calcula la pensión de alimentos?",
    answer:
      "Se determina con criterios de equidad y proporcionalidad, considerando mínimos legales (40% del ingreso mínimo para un hijo y 30% por hijo si son dos o más), un límite máximo del 50% de la renta líquida y criterios judiciales como proporcionalidad, cuidado personal y gastos extraordinarios.",
  },
  {
    id: "incumplimiento",
    question: "¿Qué ocurre si no se paga la pensión de alimentos?",
    answer:
      "El incumplimiento se persigue mediante liquidación de deuda. Puede implicar ingreso al Registro Nacional de Deudores, Mecanismo de Pago Efectivo y medidas de apremio como arraigo, arresto y suspensión de licencia.",
  },
  {
    id: "aumento-pension",
    question: "¿Se puede aumentar la pensión de alimentos?",
    answer:
      "Sí. Se puede pedir aumento cuando cambian las circunstancias: aumento de necesidades del alimentario, mejora económica del alimentante o disminución de ingresos del cuidador. Requiere mediación obligatoria y prueba documental.",
  },
  {
    id: "visitas",
    question: "¿La pensión de alimentos afecta el derecho de visitas?",
    answer:
      "No. La pensión de alimentos y la relación directa y regular son derechos independientes. No pagar no habilita a impedir visitas y no permitir visitas no habilita a dejar de pagar.",
  },
];

const faqJsonLd = {
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
  headline: "Pensión de alimentos en Chile: marco jurídico y requisitos clave",
  description:
    "Guía sobre pensión de alimentos en Chile: naturaleza jurídica, marco legal, requisitos, cálculo, incumplimiento, aumento y relación con visitas.",
  path: "/guias/pension-de-alimentos",
  datePublished: "2026-01-09",
  dateModified: "2026-09-21",
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guías", path: "/guias" },
  { name: "Pensión de alimentos", path: "/guias/pension-de-alimentos" },
]);

const PensionAlimentosIndex = () => {
  return (
    <main className="min-h-screen bg-background font-outfit">
      <Seo
        title="Pensión de alimentos en Chile: marco legal y requisitos"
        description="Guía sobre pensión de alimentos en Chile: naturaleza jurídica, marco legal, requisitos, cálculo, incumplimiento, aumento y relación con visitas."
        robots="index,follow"
        jsonLd={[articleJsonLd, faqJsonLd, breadcrumbJsonLd]}
      />
      <Navbar />
      <div className="pt-16">
        <header className="bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-5xl mx-auto px-6 py-12">
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/guias">Guías</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Pensión de alimentos</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                Guías legales · Chile
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Pensión de alimentos en Chile: marco jurídico y requisitos clave
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Informe jurídico sobre la pensión de alimentos en Chile: naturaleza jurídica,
                marco legal, requisitos, procedimiento, cálculo, incumplimiento y su relación con
                el derecho de visitas.
              </p>
              <AuthorByline updatedAt="21 de septiembre de 2026" />
            </div>
          </div>
        </header>

        <nav aria-label="En esta guía" className="border-y border-border bg-card">
          <div className="max-w-5xl mx-auto px-6 py-6">
            <p className="text-sm font-semibold text-foreground mb-3">En esta guía</p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-sm">
              <a className="text-primary hover:underline" href="#naturaleza-juridica">
                Naturaleza jurídica
              </a>
              <a className="text-primary hover:underline" href="#marco-legal">
                Marco legal
              </a>
              <a className="text-primary hover:underline" href="#derecho-solicitar">
                ¿Quiénes pueden solicitar?
              </a>
              <a className="text-primary hover:underline" href="#requisitos">
                Requisitos del tribunal
              </a>
              <a className="text-primary hover:underline" href="#proceso">
                Proceso de tramitación
              </a>
              <a className="text-primary hover:underline" href="#calculo">
                Determinación y cálculo
              </a>
              <a className="text-primary hover:underline" href="#incumplimiento">
                Incumplimiento y ejecución
              </a>
              <a className="text-primary hover:underline" href="#aumento">
                Aumento de pensión
              </a>
              <a className="text-primary hover:underline" href="#visitas">
                Pensión y visitas
              </a>
            </div>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto px-6 py-12 grid gap-10 lg:grid-cols-[1fr_280px]">
          <article className="space-y-10">
            <section id="naturaleza-juridica" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                1. Naturaleza jurídica de la pensión de alimentos
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                La pensión de alimentos en el ordenamiento jurídico chileno no constituye un mero
                pago de dinero, sino un derecho humano fundamental derivado de la filiación y la
                solidaridad familiar. Su naturaleza jurídica corresponde a una asignación forzosa,
                es decir, una obligación impuesta por la ley.
              </p>
              <ul className="list-disc list-outside ml-5 text-muted-foreground mt-4 space-y-1">
                <li>irrenunciable</li>
                <li>intransferible</li>
                <li>inembargable</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Su finalidad es asegurar la subsistencia y el desarrollo integral del alimentario,
                permitiéndole vivir de manera acorde a su posición social.
              </p>
            </section>

            <section id="marco-legal" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                2. Marco legal de la pensión de alimentos en Chile
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">2.1 Código Civil</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    El Código Civil, en su artículo 321 y siguientes, establece quiénes se deben
                    alimentos y define su alcance, indicando que deben ser suficientes para
                    permitir al alimentario subsistir modestamente conforme a su posición social.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">2.2 Ley N° 14.908</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    La{" "}
                    <a
                      href="https://www.bcn.cl/leychile/navegar?idNorma=27977"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Ley N° 14.908
                    </a>{" "}
                    regula el procedimiento judicial de alimentos, las medidas de apremio y las
                    garantías de pago. Ha sido modificada de forma sustancial en los últimos años
                    para enfrentar la morosidad estructural.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    2.3 Ley de Responsabilidad Parental
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    La{" "}
                    <a
                      href="https://www.bcn.cl/leychile/navegar?idNorma=1181003"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Ley N° 21.484
                    </a>{" "}
                    introdujo el Mecanismo de Pago Efectivo, permitiendo al tribunal investigar el
                    patrimonio del deudor en cuentas bancarias, instrumentos financieros y fondos
                    previsionales.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    2.4 Registro Nacional de Deudores
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    La{" "}
                    <a
                      href="https://www.bcn.cl/leychile/navegar?idNorma=1168463"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Ley N° 21.389
                    </a>{" "}
                    establece un sistema de control que genera consecuencias civiles, financieras y
                    administrativas para quienes adeudan pensiones de alimentos.
                  </p>
                </div>
              </div>
            </section>

            <section id="derecho-solicitar" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                3. ¿Quiénes tienen derecho a solicitar pensión de alimentos?
              </h2>
              <ul className="list-disc list-outside ml-5 text-muted-foreground space-y-1">
                <li>Hijos hasta los 21 años</li>
                <li>Hijos hasta los 28 años si estudian</li>
                <li>Hijos con discapacidad (derecho vitalicio)</li>
                <li>Cónyuge</li>
                <li>Ascendientes en estado de necesidad</li>
                <li>Hermanos en casos excepcionales</li>
              </ul>
            </section>

            <section id="requisitos" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                4. Requisitos para que el tribunal otorgue una pensión
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Para que proceda una demanda de alimentos deben concurrir copulativamente los
                siguientes elementos:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">4.1 Título legal</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Debe acreditarse el vínculo mediante certificados del Registro Civil.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    4.2 Estado de necesidad del alimentario
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    El demandante debe acreditar sus gastos mensuales, incluyendo vivienda,
                    alimentación, salud, educación, recreación y servicios básicos. La pensión busca
                    mantener el nivel de vida del menor.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    4.3 Capacidad económica del alimentante
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Debe acreditarse la existencia de ingresos o bienes. En caso de no probarse el
                    ingreso real, la ley presume capacidad mínima.
                  </p>
                </div>
              </div>
            </section>

            <section id="proceso" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                5. Proceso de tramitación de la pensión de alimentos
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                El procedimiento comienza obligatoriamente con una mediación familiar. Si existe
                acuerdo, este se aprueba judicialmente y tiene valor de sentencia. Si no hay
                acuerdo, se emite un certificado de mediación frustrada, requisito indispensable
                para demandar ante el tribunal.
              </p>
            </section>

            <section id="calculo" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                6. Determinación y cálculo de la pensión de alimentos
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                El cálculo no se basa únicamente en porcentajes, sino en criterios de equidad y
                proporcionalidad.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">6.1 Mínimos legales</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    La ley utiliza el Ingreso Mínimo Mensual como referencia: 40% para un hijo y 30%
                    por hijo si son dos o más.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">6.2 Límite máximo</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    La pensión no puede exceder el 50% de la renta líquida del alimentante, salvo
                    situaciones excepcionales.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    6.3 Criterios utilizados por el juez
                  </h3>
                  <ul className="list-disc list-outside ml-5 text-muted-foreground space-y-1">
                    <li>proporcionalidad de ingresos</li>
                    <li>cuidado personal del menor</li>
                    <li>gastos extraordinarios</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    El monto suele fijarse en UTM para mantener su valor real.
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Usa nuestra{" "}
                <Link to="/calculadora-pension" className="text-primary hover:underline">
                  calculadora de pensión de alimentos
                </Link>{" "}
                para estimar un monto de referencia según tu caso.
              </p>
            </section>

            <section id="incumplimiento" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                7. Incumplimiento y medidas de ejecución
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                El incumplimiento se persigue mediante liquidación de deuda.
              </p>
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    7.1 Registro Nacional de Deudores
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    El ingreso al registro produce consecuencias como:
                  </p>
                  <ul className="list-disc list-outside ml-5 text-muted-foreground space-y-1">
                    <li>retención de devoluciones de impuestos</li>
                    <li>restricciones crediticias</li>
                    <li>impedimentos para transferir bienes</li>
                    <li>inhabilidades para cargos públicos</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    7.2 Mecanismo de Pago Efectivo
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    Permite al tribunal ordenar pagos desde:
                  </p>
                  <ul className="list-disc list-outside ml-5 text-muted-foreground space-y-1">
                    <li>cuentas bancarias</li>
                    <li>instrumentos financieros</li>
                    <li>fondos previsionales</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">7.3 Medidas de apremio</h3>
                  <ul className="list-disc list-outside ml-5 text-muted-foreground space-y-1">
                    <li>arraigo nacional</li>
                    <li>arresto nocturno</li>
                    <li>arresto total</li>
                    <li>suspensión de licencia de conducir</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="aumento" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                8. Aumento de la pensión de alimentos
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                La pensión puede modificarse si cambian las circunstancias.
              </p>
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">8.1 Causales de aumento</h3>
                  <ul className="list-disc list-outside ml-5 text-muted-foreground space-y-1">
                    <li>aumento de necesidades del alimentario</li>
                    <li>mejora económica del alimentante</li>
                    <li>disminución de ingresos del cuidador</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">8.2 Procedimiento</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Requiere mediación obligatoria y prueba documental. El juez puede decretar un
                    aumento provisorio y establecer retroactividad desde la notificación.
                  </p>
                </div>
              </div>
            </section>

            <section id="visitas" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                9. Pensión de alimentos y derecho de visitas
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                La pensión de alimentos y la relación directa y regular son derechos independientes.
              </p>
              <ul className="list-disc list-outside ml-5 text-muted-foreground space-y-1">
                <li>No pagar pensión no habilita a impedir visitas.</li>
                <li>No permitir visitas no habilita a dejar de pagar.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Ambos derechos se protegen bajo el principio del interés superior del niño. La
                suspensión de visitas solo procede si se acredita riesgo para el menor, nunca por
                razones económicas.
              </p>
            </section>

            <section id="faq" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Preguntas frecuentes sobre pensión de alimentos
              </h2>
              <div className="space-y-6">
                {faqs.map((faq) => (
                  <div key={faq.id} className="border border-border rounded-xl p-5 bg-card">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </article>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-base font-semibold text-foreground mb-3">Puntos clave</h2>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>Obligación legal, irrenunciable e inembargable.</li>
                <li>Mediación previa obligatoria antes de demandar.</li>
                <li>Mínimos y máximos legales definidos por ley.</li>
                <li>Medidas de apremio y registro ante incumplimiento.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-muted/40 p-6">
              <h2 className="text-base font-semibold text-foreground mb-3">
                ¿Necesitas orientación?
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Si necesitas ayuda para entender tu caso, podemos orientarte de forma discreta.
              </p>
              <a
                href={waLink("Hola, necesito orientación sobre pensión de alimentos")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Consulta legal
              </a>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-base font-semibold text-foreground mb-3">Más guías</h2>
              <ul className="text-sm text-primary space-y-2">
                <li>
                  <Link className="hover:underline" to="/divorcio-en-chile">
                    Guías de divorcio
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" to="/guias/visitas-y-cuidado-personal">
                    Guías de visitas y cuidado personal
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        <AsistenteLegal tema="pension" />

        <Footer />
      </div>
    </main>
  );
};

export default PensionAlimentosIndex;
