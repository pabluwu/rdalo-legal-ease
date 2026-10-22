import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/seo/Seo";
import { AUTOR_ID, MIGUEL_ID, ORG_ID, SITE_URL } from "@/seo/entities";
import { buildBreadcrumbJsonLd } from "@/seo/breadcrumbJsonLd";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ABOGADOS, telLink, waLink } from "@/lib/contacto";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": AUTOR_ID,
  name: "Michelle Álvarez Villalón",
  url: `${SITE_URL}/quienes-somos`,
  jobTitle: "Abogada de Familia",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universidad Andrés Bello",
  },
  worksFor: {
    "@type": "LegalService",
    "@id": ORG_ID,
    name: "Acuérdalo",
    url: SITE_URL,
  },
};

const miguelJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": MIGUEL_ID,
  name: "Miguel Reyes Rojas",
  url: `${SITE_URL}/quienes-somos`,
  jobTitle: "Abogado",
  email: "miguelreyes@acuerdalo.cl",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universidad Andrés Bello",
  },
  worksFor: {
    "@type": "LegalService",
    "@id": ORG_ID,
    name: "Acuérdalo",
    url: SITE_URL,
  },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Quiénes somos", path: "/quienes-somos" },
]);

const QuienesSomos = () => {
  return (
    <main className="min-h-screen bg-background font-outfit">
      <Seo
        title="Quiénes somos | Acuérdalo"
        description="Conoce a Miguel Reyes Rojas y Michelle Álvarez Villalón, abogados de la Universidad Andrés Bello, y el enfoque de Acuérdalo, estudio jurídico online en Chile."
        jsonLd={[personJsonLd, miguelJsonLd, breadcrumbJsonLd]}
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
                  <BreadcrumbPage>Quiénes somos</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Acuérdalo
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-3">
              Quiénes somos
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mt-4">
              Acuérdalo, estudio jurídico, nació para hacer más simple y humano el acceso a la
              justicia en Chile: laboral, familia, civil, tributario y trámites extrajudiciales,
              100% online.
            </p>
          </div>
        </header>

        <section className="max-w-5xl mx-auto px-6 py-12">
          <article className="rounded-2xl border border-border bg-card p-6 md:p-8 mb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Miguel Reyes Rojas
            </h2>
            <p className="text-sm font-medium text-primary mb-4">
              Abogado · Universidad Andrés Bello
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Miguel es abogado de la Universidad Andrés Bello y parte del equipo de Acuérdalo,
              estudio jurídico que atiende casos laborales, de familia, civiles y tributarios,
              además de trámites extrajudiciales, 100% online en todo Chile.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Michelle Álvarez Villalón
            </h2>
            <p className="text-sm font-medium text-primary mb-4">
              Abogada de Familia · Universidad Andrés Bello
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Michelle es la abogada responsable del contenido legal de Acuérdalo y de la
              orientación que reciben quienes nos contactan. Su trabajo se centra en derecho de
              familia: pensión de alimentos, divorcio, cuidado personal, relación directa y
              regular, y medidas de protección de niños, niñas y adolescentes.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Las guías legales publicadas en este sitio son escritas y revisadas por Michelle,
              con referencias a la normativa vigente (Código Civil, Ley N° 19.947, Ley N° 14.908,
              Ley N° 19.968, entre otras) para que la información se mantenga clara y actualizada.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-muted/40 p-6 md:p-8 mt-6">
            <h2 className="text-xl font-semibold text-foreground mb-3">
              ¿Necesitas orientación con tu caso?
            </h2>
            <p className="text-muted-foreground mb-4">
              Podemos ayudarte a entender tu situación con información clara y una orientación
              inicial, sin salir de tu casa.
            </p>
            <a
              href={waLink("Hola, necesito orientación legal")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Hablar por WhatsApp
            </a>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 text-sm">
              {ABOGADOS.map((abogado) => (
                <div key={abogado.email}>
                  <p className="font-semibold text-foreground">{abogado.nombre}</p>
                  <a href={telLink(abogado.telefono)} className="block text-muted-foreground hover:text-primary transition-colors">
                    {abogado.telefono}
                  </a>
                  <a href={`mailto:${abogado.email}`} className="block text-muted-foreground hover:text-primary transition-colors">
                    {abogado.email}
                  </a>
                </div>
              ))}
            </div>
          </article>
        </section>

        <Footer />
      </div>
    </main>
  );
};

export default QuienesSomos;
