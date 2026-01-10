import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/seo/Seo";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const faqs = [
  {
    id: "cuidado-personal",
    question: "¿Qué es el cuidado personal en Chile?",
    answer:
      "Es el conjunto de deberes y derechos de los padres respecto de la crianza, educación y establecimiento del hogar de sus hijos. Se refiere a la tenencia física y la responsabilidad cotidiana sobre el bienestar del niño.",
  },
  {
    id: "patria-potestad",
    question: "¿En qué se diferencia el cuidado personal de la patria potestad?",
    answer:
      "El cuidado personal se relaciona con la tenencia física y la responsabilidad cotidiana del niño. La patria potestad dice relación con la administración de los bienes del hijo y su representación legal.",
  },
  {
    id: "corresponsabilidad",
    question: "¿Qué establece la ley sobre corresponsabilidad parental?",
    answer:
      "La Ley N° 20.680 introdujo el principio de corresponsabilidad parental, estableciendo que ambos padres deben participar de manera activa, equitativa y permanente en la crianza de los hijos, vivan juntos o separados.",
  },
  {
    id: "quien-tiene",
    question: "¿Cómo se determina quién tiene el cuidado personal?",
    answer:
      "Puede fijarse por acuerdo entre los padres mediante escritura pública o acta ante el Registro Civil, por falta de acuerdo con el padre o madre con quien el hijo convive, o por resolución judicial considerando el interés superior del niño.",
  },
  {
    id: "criterios-tribunal",
    question: "¿Qué criterios usa el juez para decidir el cuidado personal?",
    answer:
      "El tribunal analiza, entre otros, la vinculación afectiva del niño con cada progenitor, la aptitud para garantizar estabilidad emocional y material, el cumplimiento de alimentos, la opinión del niño e informes periciales psicológicos y sociales.",
  },
  {
    id: "requisitos-demanda",
    question: "¿Qué se requiere para demandar cuidado personal?",
    answer:
      "Se requiere certificado de nacimiento del hijo, certificado de mediación frustrada, antecedentes de idoneidad parental y comparecencia obligatoria con abogado ante el tribunal.",
  },
  {
    id: "relacion-directa",
    question: "¿Qué es la relación directa y regular?",
    answer:
      "Es el derecho del niño a mantener contacto permanente y significativo con el padre o madre con quien no vive. No es un favor del cuidador, sino un derecho fundamental del hijo.",
  },
  {
    id: "incumplimiento-visitas",
    question: "¿Qué pasa si se incumple el régimen de visitas?",
    answer:
      "Si el cuidador impide las visitas, el padre afectado puede dejar constancia, pedir recuperación del tiempo, solicitar multas o arrestos, y demandar cambio de cuidado personal en casos reiterados. Si el padre visitante no asiste, puede justificarse la suspensión o modificación del régimen.",
  },
  {
    id: "abuelos",
    question: "¿Los abuelos tienen derecho a relación directa y regular?",
    answer:
      "La ley reconoce el derecho de los abuelos a mantener contacto con sus nietos, protegido por el artículo 229-2 del Código Civil, como parte del interés superior del niño.",
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

const VisitasCuidadoPersonalMarcoTeorico = () => {
  return (
    <main className="min-h-screen bg-background font-outfit">
      <Seo
        title="Cuidado personal y visitas: marco legal en Chile"
        description="Guía sobre cuidado personal y relación directa y regular en Chile: marco legal, criterios judiciales, requisitos, visitas, incumplimientos y derechos de abuelos."
        robots="index,follow"
        jsonLd={faqJsonLd}
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
                  <BreadcrumbLink asChild>
                    <Link to="/guias/visitas-y-cuidado-personal">Visitas y cuidado personal</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Marco teórico</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                Guías legales · Chile
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Cuidado personal y relación directa y regular en Chile
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Guía jurídica sobre cuidado personal y relación directa y regular: conceptos,
                marco legal, criterios judiciales, requisitos, régimen de visitas, incumplimientos,
                modificaciones y derecho de los abuelos.
              </p>
            </div>
          </div>
        </header>

        <nav aria-label="En esta guía" className="border-y border-border bg-card">
          <div className="max-w-5xl mx-auto px-6 py-6">
            <p className="text-sm font-semibold text-foreground mb-3">En esta guía</p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-sm">
              <a className="text-primary hover:underline" href="#cuidado-personal">
                Cuidado personal
              </a>
              <a className="text-primary hover:underline" href="#marco-legal">
                Marco legal
              </a>
              <a className="text-primary hover:underline" href="#quien-puede">
                ¿Quién puede tenerlo?
              </a>
              <a className="text-primary hover:underline" href="#criterios">
                Criterios del juez
              </a>
              <a className="text-primary hover:underline" href="#requisitos">
                Requisitos de demanda
              </a>
              <a className="text-primary hover:underline" href="#relacion-directa">
                Relación directa y regular
              </a>
              <a className="text-primary hover:underline" href="#tipos-visitas">
                Tipos de régimen
              </a>
              <a className="text-primary hover:underline" href="#incumplimiento">
                Incumplimiento
              </a>
              <a className="text-primary hover:underline" href="#modificacion">
                Modificación
              </a>
              <a className="text-primary hover:underline" href="#abuelos">
                Derecho de abuelos
              </a>
            </div>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto px-6 py-12 grid gap-10 lg:grid-cols-[1fr_280px]">
          <article className="space-y-10">
            <section id="cuidado-personal" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                1. El cuidado personal: concepto y evolución legal
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                El cuidado personal es el conjunto de deberes y derechos que corresponden a los
                padres respecto de la crianza, educación y establecimiento del hogar de sus hijos.
                Se refiere a la tenencia física y a la responsabilidad cotidiana sobre el bienestar
                del niño.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                No debe confundirse con la patria potestad, que dice relación con la administración
                de los bienes del hijo y su representación legal.
              </p>
            </section>

            <section id="marco-legal" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                2. Marco legal del cuidado personal y corresponsabilidad parental
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    2.1 Ley de tuición compartida
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    La Ley N° 20.680 introdujo el principio de corresponsabilidad parental,
                    eliminando la regla histórica que entregaba automáticamente el cuidado personal
                    a la madre. Actualmente, la ley establece que ambos padres deben participar de
                    manera activa, equitativa y permanente en la crianza de los hijos, vivan juntos
                    o separados.
                  </p>
                </div>
              </div>
            </section>

            <section id="quien-puede" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                3. ¿Quién puede tener el cuidado personal?
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    3.1 Por acuerdo entre los padres
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Los padres pueden acordar quién tendrá el cuidado personal o si este será
                    compartido, mediante escritura pública o acta extendida ante el Registro Civil.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">3.2 Por falta de acuerdo</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Si no existe acuerdo ni resolución judicial, el hijo permanecerá bajo el
                    cuidado personal del padre o madre con quien esté conviviendo.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    3.3 Por resolución judicial
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    El juez de familia puede asignar el cuidado personal a uno de los padres o
                    establecer un cuidado compartido, siempre considerando el interés superior del
                    niño.
                  </p>
                </div>
              </div>
            </section>

            <section id="criterios" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                4. Criterios que utiliza el juez para decidir el cuidado personal
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Al resolver una demanda de cuidado personal, el tribunal analiza, entre otros, los
                siguientes factores:
              </p>
              <ul className="list-disc list-outside ml-5 text-muted-foreground space-y-1">
                <li>vinculación afectiva del niño con cada progenitor</li>
                <li>aptitud de los padres para garantizar estabilidad emocional y material</li>
                <li>cumplimiento de la obligación de alimentos</li>
                <li>opinión del niño, según su edad y madurez</li>
                <li>informes periciales psicológicos y sociales</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Estos criterios se encuentran regulados en el artículo 225-2 del Código Civil.
              </p>
            </section>

            <section id="requisitos" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                5. Requisitos para demandar cuidado personal
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Para iniciar una demanda de cuidado personal se requiere:
              </p>
              <ul className="list-disc list-outside ml-5 text-muted-foreground space-y-1">
                <li>certificado de nacimiento del hijo</li>
                <li>certificado de mediación frustrada</li>
                <li>antecedentes que acrediten idoneidad parental</li>
                <li>comparecencia obligatoria con abogado ante el tribunal</li>
              </ul>
            </section>

            <section id="relacion-directa" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                6. La relación directa y regular (régimen de visitas)
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                La relación directa y regular es el derecho del niño a mantener contacto permanente
                y significativo con el padre o madre con quien no vive. No constituye un favor del
                cuidador, sino un derecho fundamental del hijo.
              </p>
            </section>

            <section id="tipos-visitas" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                7. Tipos de régimen de visitas
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">7.1 Régimen ordinario</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Corresponde al calendario habitual de visitas, como fines de semana alternados
                    o días de semana determinados.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">7.2 Régimen extraordinario</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Regula situaciones especiales como vacaciones, cumpleaños, fiestas de fin de
                    año y fechas relevantes para el niño.
                  </p>
                </div>
              </div>
            </section>

            <section id="incumplimiento" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                8. Incumplimiento del régimen de visitas
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                El incumplimiento puede provenir del cuidador o del progenitor visitante.
              </p>
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    8.1 Cuando el cuidador impide las visitas
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    El padre afectado puede:
                  </p>
                  <ul className="list-disc list-outside ml-5 text-muted-foreground space-y-1">
                    <li>dejar constancia del incumplimiento</li>
                    <li>solicitar recuperación del tiempo perdido</li>
                    <li>pedir aplicación de multas o arrestos</li>
                    <li>demandar cambio de cuidado personal en casos reiterados</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    8.2 Cuando el padre visitante no asiste
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    La inasistencia reiterada puede justificar la suspensión o modificación del
                    régimen, para proteger la estabilidad emocional del niño.
                  </p>
                </div>
              </div>
            </section>

            <section id="modificacion" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                9. Modificación del cuidado personal o del régimen de visitas
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Las resoluciones en materia de familia no son definitivas y pueden modificarse si
                cambian las circunstancias.
              </p>
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    9.1 Causales de modificación
                  </h3>
                  <ul className="list-disc list-outside ml-5 text-muted-foreground space-y-1">
                    <li>cambios en las necesidades del niño</li>
                    <li>cambios laborales o residenciales de los padres</li>
                    <li>aparición de conductas de riesgo</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">9.2 Procedimiento</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Se requiere mediación previa y, de fracasar, demanda judicial acompañada de
                    antecedentes que acrediten el nuevo escenario.
                  </p>
                </div>
              </div>
            </section>

            <section id="abuelos" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                10. Derecho de los abuelos a la relación directa y regular
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                La ley chilena reconoce el derecho de los abuelos a mantener contacto con sus
                nietos, como parte del interés superior del niño.
              </p>
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">10.1 Fundamento legal</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    El artículo 229-2 del Código Civil protege el derecho del niño a relacionarse
                    con su familia extendida.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    10.2 Casos en que pueden demandar los abuelos
                  </h3>
                  <ul className="list-disc list-outside ml-5 text-muted-foreground space-y-1">
                    <li>fallecimiento del padre o madre</li>
                    <li>impedimento del progenitor para ver al niño</li>
                    <li>conflictos graves que priven al niño de su identidad familiar</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    El régimen concedido suele ser acotado y siempre subordinado al bienestar del
                    menor.
                  </p>
                </div>
              </div>
            </section>

            <section id="faq" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Preguntas frecuentes sobre cuidado personal y visitas
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
                <li>Corresponsabilidad parental activa, equitativa y permanente.</li>
                <li>Criterios judiciales definidos por el Código Civil.</li>
                <li>Relación directa y regular como derecho del niño.</li>
                <li>Modificaciones posibles por cambios de circunstancias.</li>
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
                href="https://wa.me/56990538001?text=Hola,%20necesito%20orientación%20sobre%20cuidado%20personal%20y%20visitas"
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
                  <Link className="hover:underline" to="/guias/visitas-y-cuidado-personal">
                    Guías de visitas y cuidado personal
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" to="/guias/pension-de-alimentos">
                    Guías de pensión de alimentos
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" to="/guias/divorcio">
                    Guías de divorcio
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        <Footer />
      </div>
    </main>
  );
};

export default VisitasCuidadoPersonalMarcoTeorico;
