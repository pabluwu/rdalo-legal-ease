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

const DivorcioIndex = () => {
  return (
    <main className="min-h-screen bg-background font-outfit">
      <Seo
        title="Guías de divorcio en Chile | Acuérdalo"
        description="Guías sobre divorcio en Chile: tipos de divorcio, plazos, requisitos, compensación económica y efectos respecto de los hijos."
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
                  <BreadcrumbPage>Divorcio</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Categoría · Guías legales
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-3">
              Guías de divorcio
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mt-4">
              El divorcio en Chile se rige por la Ley N° 19.947, de Matrimonio Civil, y solo puede
              decretarse por sentencia judicial. Estas guías explican los tipos de divorcio
              disponibles, sus plazos, los requisitos para iniciarlo y qué pasa con la compensación
              económica, los bienes y los hijos.
            </p>
          </div>
        </header>

        <section className="max-w-5xl mx-auto px-6 py-12">
          <article className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-3">
              Guías disponibles
            </h2>
            <ul className="text-primary space-y-2 text-sm">
              <li>
                <Link className="hover:underline" to="/guias/divorcio/marco-teorico">
                  Marco teórico del divorcio en Chile
                </Link>
              </li>
            </ul>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6 mt-6">
            <h2 className="text-2xl font-semibold text-foreground mb-3">
              ¿Qué vas a encontrar en esta categoría?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              En Chile existen tres vías de divorcio: de mutuo acuerdo (cese de convivencia de al
              menos un año), unilateral por cese de convivencia (al menos tres años) y culposo, sin
              plazo mínimo pero fundado en una falta grave imputable a uno de los cónyuges. Cada vía
              tiene requisitos y documentación distintos, y en cualquiera de ellas puede solicitarse
              compensación económica cuando uno de los cónyuges sufrió un menoscabo por dedicarse al
              hogar o a los hijos.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Si el proceso de divorcio involucra hijos en común, normalmente se resuelve en paralelo
              la pensión de alimentos y el régimen de cuidado personal y visitas; revisa también esas
              guías si es tu caso.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6 mt-6">
            <h2 className="text-2xl font-semibold text-foreground mb-3">Guías relacionadas</h2>
            <ul className="text-primary space-y-2 text-sm">
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
              <li>
                <Link className="hover:underline" to="/calculadora-pension">
                  Calculadora de pensión de alimentos
                </Link>
              </li>
            </ul>
          </article>
        </section>

        <Footer />
      </div>
    </main>
  );
};

export default DivorcioIndex;
