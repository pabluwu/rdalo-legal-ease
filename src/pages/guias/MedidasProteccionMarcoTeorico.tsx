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
    id: "concepto",
    question: "¿Qué son las medidas de protección de derechos?",
    answer:
      "Son resoluciones judiciales dictadas por los Tribunales de Familia para cesar una vulneración de derechos de un niño, niña o adolescente y restituir el pleno ejercicio de esos derechos.",
  },
  {
    id: "sin-controversia",
    question: "¿Las causas de protección tienen controversia entre partes?",
    answer:
      "No. En las causas de protección no existe una controversia entre partes; el foco del proceso es el bienestar del niño.",
  },
  {
    id: "marco-legal",
    question: "¿Cuál es el marco legal del sistema de protección?",
    answer:
      "Se sustenta en la Ley N° 19.968 sobre Tribunales de Familia, la Ley N° 21.430 de garantías de la niñez, la Convención sobre los Derechos del Niño y la Ley N° 21.302 que crea el Servicio Mejor Niñez.",
  },
  {
    id: "vulneracion",
    question: "¿Qué se entiende por vulneración de derechos?",
    answer:
      "La intervención judicial ocurre cuando existen hechos graves que afectan los derechos fundamentales del niño, como maltrato físico o psicológico, negligencia grave, abuso sexual, exposición a violencia intrafamiliar o consumo problemático de alcohol o drogas por parte de cuidadores.",
  },
  {
    id: "inicio-causa",
    question: "¿Quién puede iniciar una causa de protección?",
    answer:
      "Puede iniciarse por denuncia de particulares, actuación de oficio del juez o denuncia obligatoria de profesionales de salud, educación u otros sectores.",
  },
  {
    id: "tipos-medidas",
    question: "¿Qué tipos de medidas de protección existen?",
    answer:
      "Existen medidas cautelares urgentes, como entrega provisional a un familiar, prohibición de acercamiento o ingreso a programas de salud, y medidas de protección definitivas como apoyo ambulatorio, cuidado con familia extensa, acogimiento familiar o ingreso a residencia.",
  },
  {
    id: "curador",
    question: "¿Qué rol cumple el curador ad litem?",
    answer:
      "Es un abogado designado por el Estado que representa los intereses del niño, vela por el debido proceso y conoce su realidad personal y familiar.",
  },
  {
    id: "termino",
    question: "¿Cómo termina una medida de protección?",
    answer:
      "La causa termina cuando se acredita que la vulneración ha sido superada. El tribunal realiza audiencias periódicas y puede flexibilizar, mantener o hacer más restrictiva la medida.",
  },
  {
    id: "vif",
    question: "¿Qué relación hay entre medidas de protección y violencia intrafamiliar?",
    answer:
      "Las causas de protección pueden coexistir con procesos de violencia intrafamiliar. La causa de protección busca resguardar al niño, mientras la VIF busca sancionar al agresor.",
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

const MedidasProteccionMarcoTeorico = () => {
  return (
    <main className="min-h-screen bg-background font-outfit">
      <Seo
        title="Medidas de protección de derechos en Chile"
        description="Guía sobre medidas de protección en Chile: concepto, marco legal, vulneración de derechos, inicio de causas, tipos de medidas y rol del curador ad litem."
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
                    <Link to="/guias/medidas-de-proteccion">Medidas de protección</Link>
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
                Medidas de protección de derechos en Chile
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Guía jurídica sobre medidas de protección: concepto, marco legal, vulneración de
                derechos, inicio de causas, tipos de medidas, rol del curador ad litem y término de
                la medida.
              </p>
              <AuthorByline updatedAt="8 de agosto de 2026" />
            </div>
          </div>
        </header>

        <nav aria-label="En esta guía" className="border-y border-border bg-card">
          <div className="max-w-5xl mx-auto px-6 py-6">
            <p className="text-sm font-semibold text-foreground mb-3">En esta guía</p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-sm">
              <a className="text-primary hover:underline" href="#concepto">
                Concepto
              </a>
              <a className="text-primary hover:underline" href="#marco-legal">
                Marco legal
              </a>
              <a className="text-primary hover:underline" href="#vulneracion">
                Vulneración de derechos
              </a>
              <a className="text-primary hover:underline" href="#inicio">
                Inicio de la causa
              </a>
              <a className="text-primary hover:underline" href="#tipos-medidas">
                Tipos de medidas
              </a>
              <a className="text-primary hover:underline" href="#curador">
                Curador ad litem
              </a>
              <a className="text-primary hover:underline" href="#termino">
                Término de la medida
              </a>
              <a className="text-primary hover:underline" href="#vif">
                Medidas y VIF
              </a>
            </div>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto px-6 py-12 grid gap-10 lg:grid-cols-[1fr_280px]">
          <article className="space-y-10">
            <section id="concepto" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                1. Concepto de las medidas de protección
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Las medidas de protección son resoluciones judiciales dictadas por los Tribunales
                de Familia con el objetivo de cesar una vulneración de derechos de un niño, niña o
                adolescente y restituirle el pleno ejercicio de los mismos.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                A diferencia de otros procedimientos de familia, como alimentos o visitas, en las
                causas de protección no existe una controversia entre partes. El foco central del
                proceso es exclusivamente el bienestar del niño.
              </p>
            </section>

            <section id="marco-legal" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                2. Marco legal del sistema de protección
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                El sistema de protección de derechos de la niñez en Chile se sustenta en un marco
                normativo robusto.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">2.1 Tribunales de Familia</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    La Ley N° 19.968 regula el procedimiento de protección, estableciendo las reglas
                    procesales y las facultades del juez para intervenir cuando existe una
                    vulneración de derechos.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    2.2 Ley de garantías de la niñez
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    La Ley N° 21.430 establece el deber del Estado, la familia y la sociedad de
                    garantizar el desarrollo integral de niños, niñas y adolescentes, reconociéndolos
                    como sujetos de derechos.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    2.3 Convención sobre los Derechos del Niño
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Tratado internacional ratificado por Chile con rango constitucional, que obliga
                    a considerar el interés superior del niño como principio rector de toda decisión
                    que le afecte.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">2.4 Servicio Mejor Niñez</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    La Ley N° 21.302 crea el Servicio Nacional de Protección Especializada a la
                    Niñez y Adolescencia, encargado de ejecutar los programas y medidas ordenadas por
                    los tribunales.
                  </p>
                </div>
              </div>
            </section>

            <section id="vulneracion" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                3. ¿Qué se entiende por vulneración de derechos?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                No toda dificultad familiar da lugar a una medida de protección. La intervención
                judicial ocurre cuando existen hechos graves que afectan los derechos fundamentales
                del niño, como:
              </p>
              <ul className="list-disc list-outside ml-5 text-muted-foreground space-y-1">
                <li>maltrato físico o psicológico</li>
                <li>negligencia grave en cuidados básicos</li>
                <li>abuso sexual o explotación</li>
                <li>exposición a violencia intrafamiliar</li>
                <li>consumo problemático de alcohol o drogas por parte de los cuidadores</li>
              </ul>
            </section>

            <section id="inicio" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                4. ¿Quién puede iniciar una causa de protección?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                El procedimiento puede iniciarse por distintas vías:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">4.1 Denuncia de particulares</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Cualquier persona que tenga conocimiento de una situación de riesgo puede
                    denunciar ante el tribunal.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">4.2 Actuación de oficio</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    El juez puede iniciar una causa de protección al detectar una vulneración en
                    otro proceso judicial.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">4.3 Denuncia obligatoria</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Profesionales de la salud, educación y otros sectores tienen la obligación
                    legal de denunciar si detectan indicios de vulneración de derechos.
                  </p>
                </div>
              </div>
            </section>

            <section id="tipos-medidas" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                5. Tipos de medidas de protección y su alcance
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Las medidas de protección son temporales y se aplican según la gravedad del caso.
              </p>
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    5.1 Medidas cautelares urgentes
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    Se dictan de forma inmediata cuando existe peligro inminente para el niño, como:
                  </p>
                  <ul className="list-disc list-outside ml-5 text-muted-foreground space-y-1">
                    <li>entrega provisional al cuidado de un familiar</li>
                    <li>prohibición de acercamiento del presunto vulnerador</li>
                    <li>ingreso urgente a programas de salud</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    5.2 Medidas de protección definitivas
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    Luego del análisis del caso, el tribunal puede ordenar:
                  </p>
                  <ul className="list-disc list-outside ml-5 text-muted-foreground space-y-1">
                    <li>apoyo ambulatorio con programas de intervención</li>
                    <li>cuidado con terceros de la familia extensa</li>
                    <li>acogimiento familiar con familias acreditadas</li>
                    <li>ingreso a residencia, como última alternativa</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="curador" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                6. El rol del curador ad litem y la opinión del niño
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                En las causas de protección, el niño cuenta con representación legal propia.
              </p>
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">6.1 Curador ad litem</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Es un abogado designado por el Estado cuya función es representar los intereses
                    del niño, velar por el debido proceso y conocer directamente su realidad personal
                    y familiar.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">6.2 Derecho a ser oído</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    El juez debe escuchar al niño en una audiencia reservada, considerando su edad
                    y madurez. Aunque su opinión no es vinculante, debe ser expresamente considerada
                    en la sentencia.
                  </p>
                </div>
              </div>
            </section>

            <section id="termino" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                7. ¿Cómo terminar una medida de protección?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                El objetivo del sistema es la reunificación familiar, no la separación permanente.
              </p>
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">7.1 Plan de intervención</h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    La medida va acompañada de un plan de trabajo que puede incluir:
                  </p>
                  <ul className="list-disc list-outside ml-5 text-muted-foreground space-y-1">
                    <li>terapia psicológica</li>
                    <li>tratamiento de adicciones</li>
                    <li>mejora de condiciones de vida</li>
                    <li>capacitación en crianza respetuosa</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">7.2 Seguimiento judicial</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    El tribunal realiza audiencias periódicas para evaluar avances, pudiendo
                    flexibilizar la medida, mantenerla o hacerla más restrictiva. La causa termina
                    con el cese de la medida de protección cuando se acredita que la vulneración ha
                    sido superada.
                  </p>
                </div>
              </div>
            </section>

            <section id="vif" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                8. Medidas de protección y violencia intrafamiliar
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Las causas de protección pueden coexistir con procesos de violencia intrafamiliar.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Mientras la causa de VIF busca sancionar al agresor, la causa de protección busca
                resguardar al niño que vive en ese entorno.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                El incumplimiento de una medida de protección constituye el delito de desacato y
                puede acarrear penas privativas de libertad.
              </p>
            </section>

            <section id="faq" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Preguntas frecuentes sobre medidas de protección
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
                <li>Medidas dictadas por Tribunales de Familia.</li>
                <li>Foco en el bienestar del niño, sin controversia.</li>
                <li>Medidas urgentes y definitivas según gravedad.</li>
                <li>Seguimiento judicial hasta superar vulneración.</li>
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
                href="https://wa.me/56990538001?text=Hola,%20necesito%20orientación%20sobre%20medidas%20de%20protección"
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
                  <Link className="hover:underline" to="/guias/medidas-de-proteccion">
                    Guías de medidas de protección
                  </Link>
                </li>
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
              </ul>
            </div>
          </aside>
        </div>

        <Footer />
      </div>
    </main>
  );
};

export default MedidasProteccionMarcoTeorico;
