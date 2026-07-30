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
        description="Accede a guías sobre divorcio en Chile. Estamos preparando contenidos organizados por etapas."
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
              Estamos preparando guías sobre divorcio organizadas por etapas y preguntas comunes.
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
        </section>

        <Footer />
      </div>
    </main>
  );
};

export default DivorcioIndex;
