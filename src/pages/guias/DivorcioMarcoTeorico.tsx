import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthorByline from "@/components/AuthorByline";
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
    id: "naturaleza-divorcio",
    question: "¿Qué es el divorcio en Chile?",
    answer:
      "Es el acto jurídico y judicial que pone término al vínculo matrimonial, permitiendo a los ex cónyuges recuperar su estado civil de solteros. Se decreta por sentencia judicial y produce efectos personales y patrimoniales.",
  },
  {
    id: "marco-legal",
    question: "¿Qué normas regulan el divorcio en Chile?",
    answer:
      "La Ley N° 19.947 regula el divorcio vincular, sus tipos, causales, plazos y efectos. La Ley N° 21.394 introdujo mejoras procedimentales y el Código Civil regula efectos patrimoniales.",
  },
  {
    id: "tipos-divorcio",
    question: "¿Qué tipos de divorcio existen y cuáles son sus plazos?",
    answer:
      "Hay divorcio de mutuo acuerdo (cese de convivencia de al menos un año), divorcio unilateral por cese de convivencia (al menos tres años) y divorcio culposo, que no requiere plazo.",
  },
  {
    id: "documentos",
    question: "¿Qué documentos se requieren para iniciar un divorcio?",
    answer:
      "Se requieren, entre otros, certificado de matrimonio, certificado de nacimiento de los hijos si existen, acta o prueba del cese de convivencia y certificado de residencia para determinar competencia del tribunal.",
  },
  {
    id: "compensacion",
    question: "¿Qué es la compensación económica en el divorcio?",
    answer:
      "Es un mecanismo destinado a corregir el menoscabo económico del cónyuge que, por dedicarse al hogar o a los hijos, no pudo desarrollar plenamente su vida laboral. No es indemnización ni premio.",
  },
  {
    id: "bienes-vivienda",
    question: "¿Cómo se resuelven bienes y vivienda familiar en el divorcio?",
    answer:
      "Depende del régimen patrimonial. En sociedad conyugal, los bienes adquiridos se liquidan en partes iguales. La vivienda puede declararse bien familiar para proteger a los hijos, impidiendo su venta sin autorización judicial.",
  },
  {
    id: "oposicion",
    question: "¿Qué pasa si el otro cónyuge se niega a divorciarse?",
    answer:
      "Cumplido el plazo legal de tres años de cese de convivencia, uno de los cónyuges puede demandar divorcio unilateral. La oposición solo prospera si no se cumplió el plazo o hubo reanudación de la vida en común.",
  },
  {
    id: "hijos",
    question: "¿Qué efectos tiene el divorcio respecto de los hijos?",
    answer:
      "El divorcio no afecta la filiación ni los deberes parentales. La sentencia debe regular cuidado personal, relación directa y regular y patria potestad, velando por el interés superior del niño.",
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

const DivorcioMarcoTeorico = () => {
  return (
    <main className="min-h-screen bg-background font-outfit">
      <Seo
        title="Divorcio en Chile: requisitos, plazos y marco legal 2026"
        description="Guía sobre el divorcio en Chile: naturaleza jurídica, marco legal, tipos, plazos, requisitos, compensación económica, bienes y efectos en los hijos."
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
                    <Link to="/guias/divorcio">Divorcio</Link>
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
                Divorcio en Chile: marco teórico y bases legales
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Guía jurídica sobre el divorcio en Chile: naturaleza jurídica, marco legal, tipos,
                requisitos, compensación económica, bienes y efectos respecto de los hijos.
              </p>
              <AuthorByline updatedAt="8 de agosto de 2026" />
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
              <a className="text-primary hover:underline" href="#tipos-divorcio">
                Tipos de divorcio
              </a>
              <a className="text-primary hover:underline" href="#requisitos">
                Requisitos y documentos
              </a>
              <a className="text-primary hover:underline" href="#compensacion">
                Compensación económica
              </a>
              <a className="text-primary hover:underline" href="#bienes-vivienda">
                Bienes y vivienda
              </a>
              <a className="text-primary hover:underline" href="#negativa">
                Negativa del cónyuge
              </a>
              <a className="text-primary hover:underline" href="#efectos-hijos">
                Efectos respecto de hijos
              </a>
            </div>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto px-6 py-12 grid gap-10 lg:grid-cols-[1fr_280px]">
          <article className="space-y-10">
            <section id="naturaleza-juridica" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                1. Naturaleza jurídica del divorcio
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                El divorcio en Chile es el acto jurídico y judicial que pone término al vínculo
                matrimonial, permitiendo a los ex cónyuges recuperar su estado civil de solteros. A
                diferencia de la separación de hecho, el divorcio disuelve los deberes de fidelidad
                y socorro mutuo, y extingue los derechos hereditarios recíprocos.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                El divorcio solo puede decretarse por sentencia judicial y produce efectos
                personales y patrimoniales relevantes para ambos cónyuges.
              </p>
            </section>

            <section id="marco-legal" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                2. Marco legal del divorcio en Chile
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    2.1 Ley de Matrimonio Civil
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    La{" "}
                    <a
                      href="https://www.bcn.cl/leychile/navegar?idNorma=225128"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Ley N° 19.947
                    </a>{" "}
                    introdujo el divorcio vincular en Chile en el año 2004. Regula
                    los tipos de divorcio, las causales, los plazos y los efectos jurídicos del
                    término del matrimonio.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    2.2 Reformas de eficiencia judicial
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    La{" "}
                    <a
                      href="https://www.bcn.cl/leychile/navegar?idNorma=1168803"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Ley N° 21.394
                    </a>{" "}
                    introdujo mejoras procedimentales, como la posibilidad de
                    audiencias remotas y el llamado divorcio de plano en casos de mutuo acuerdo bajo
                    estrictas condiciones.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">2.3 Código Civil</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    El Código Civil regula los efectos patrimoniales del divorcio, especialmente la
                    liquidación del régimen matrimonial y los derechos sobre los bienes.
                  </p>
                </div>
              </div>
            </section>

            <section id="tipos-divorcio" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                3. Tipos de divorcio en Chile y sus plazos
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Existen tres vías principales para obtener el divorcio, cada una con requisitos y
                plazos distintos.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    3.1 Divorcio de mutuo acuerdo
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Requiere que ambos cónyuges soliciten el divorcio conjuntamente y acrediten un
                    cese de convivencia de al menos un año. Además, deben presentar un acuerdo
                    completo y suficiente que regule alimentos, visitas, cuidado de los hijos y
                    bienes.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    3.2 Divorcio unilateral por cese de convivencia
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Procede cuando solo uno de los cónyuges desea divorciarse. La ley exige
                    acreditar un cese de convivencia de al menos tres años, sin reanudación de la
                    vida en común.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">3.3 Divorcio culposo</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    No requiere plazo de cese de convivencia. Se funda en una falta grave imputable
                    a uno de los cónyuges que haga intolerable la vida en común, como violencia
                    intrafamiliar, atentado contra la vida, abandono reiterado o conductas
                    delictivas graves.
                  </p>
                </div>
              </div>
            </section>

            <section id="requisitos" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                4. Requisitos y documentación necesaria para divorciarse
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Para iniciar un proceso de divorcio se requiere, entre otros documentos:
              </p>
              <ul className="list-disc list-outside ml-5 text-muted-foreground space-y-1">
                <li>Certificado de matrimonio</li>
                <li>Certificado de nacimiento de los hijos, si existen</li>
                <li>Acta o prueba del cese de convivencia</li>
                <li>Certificado de residencia para determinar competencia del tribunal</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                El cese de convivencia es la prueba central del proceso, especialmente en
                matrimonios celebrados después del 17 de noviembre de 2004.
              </p>
            </section>

            <section id="compensacion" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                5. Compensación económica en el divorcio
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                La compensación económica no es una indemnización ni un premio, sino un mecanismo
                destinado a corregir el menoscabo económico sufrido por el cónyuge que, por
                dedicarse al cuidado del hogar o de los hijos, no pudo desarrollar plenamente su
                vida laboral.
              </p>
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">5.1 Criterios legales</h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    El juez pondera, entre otros factores:
                  </p>
                  <ul className="list-disc list-outside ml-5 text-muted-foreground space-y-1">
                    <li>duración del matrimonio y de la vida en común</li>
                    <li>situación patrimonial de ambos cónyuges</li>
                    <li>edad y estado de salud</li>
                    <li>calificación profesional y posibilidades laborales</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    5.2 Métodos de estimación judicial
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    En la práctica, se utilizan criterios como:
                  </p>
                  <ul className="list-disc list-outside ml-5 text-muted-foreground space-y-1">
                    <li>costo de oportunidad laboral</li>
                    <li>costo de reemplazo de labores domésticas</li>
                    <li>perjuicio previsional por lagunas en cotizaciones</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="bienes-vivienda" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                6. Conflictos sobre bienes y vivienda familiar
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                El destino de los bienes depende del régimen patrimonial elegido al casarse.
              </p>
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">6.1 Sociedad conyugal</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Los bienes adquiridos durante el matrimonio pertenecen a la comunidad y deben
                    liquidarse en partes iguales al divorciarse.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">6.2 Bien familiar</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Si existen hijos, la vivienda puede ser declarada bien familiar, impidiendo su
                    venta o gravamen sin autorización judicial, para proteger el interés de los
                    menores.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    6.3 Permanencia en la vivienda
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Salvo casos de violencia intrafamiliar, la salida de uno de los cónyuges del
                    hogar suele resolverse con la sentencia de divorcio o mediante juicios
                    posteriores.
                  </p>
                </div>
              </div>
            </section>

            <section id="negativa" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                7. Divorcio cuando el otro cónyuge se niega
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Nadie está obligado a permanecer casado contra su voluntad.
              </p>
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">7.1 Divorcio unilateral</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Cumplido el plazo legal de tres años de cese de convivencia, uno de los
                    cónyuges puede demandar divorcio unilateral aunque el otro se oponga.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    7.2 Notificación y oposición
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    La demanda debe notificarse legalmente. La oposición solo prospera si se prueba
                    que no se cumplió el plazo o que hubo reanudación de la vida en común.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">7.3 Cláusula de dureza</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    El juez puede rechazar el divorcio unilateral si el demandante ha incumplido
                    reiteradamente el pago de pensión de alimentos, teniendo medios para hacerlo.
                  </p>
                </div>
              </div>
            </section>

            <section id="efectos-hijos" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                8. Efectos del divorcio respecto de los hijos
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                El divorcio pone término al matrimonio, pero no afecta la filiación ni los deberes
                parentales.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                La sentencia debe regular cuidado personal, relación directa y regular y patria
                potestad. El tribunal debe velar por que el acuerdo no perjudique el interés
                superior del niño ni su estabilidad emocional.
              </p>
            </section>

            <section id="faq" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Preguntas frecuentes sobre divorcio en Chile
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
                <li>Sentencia judicial obligatoria para decretar el divorcio.</li>
                <li>Plazos distintos según el tipo de divorcio.</li>
                <li>Compensación económica según menoscabo.</li>
                <li>La sentencia regula efectos respecto de hijos.</li>
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
                href="https://wa.me/56990538001?text=Hola,%20necesito%20orientación%20sobre%20divorcio"
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
                  <Link className="hover:underline" to="/guias/divorcio">
                    Guías de divorcio
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" to="/guias/pension-de-alimentos">
                    Guías de pensión de alimentos
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

        <Footer />
      </div>
    </main>
  );
};

export default DivorcioMarcoTeorico;
