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

const GuiasIndex = () => {
  return (
    <main className="min-h-screen bg-background font-outfit">
      <Seo
        title="Guías legales en Chile | Acuérdalo"
        description="Guías legales en Chile organizadas por tema: pensión de alimentos, divorcio, visitas y cuidado personal, y medidas de protección."
      />
      <Navbar />
      <div className="pt-16">
        <header className="bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Guías</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Hub de guías legales
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-3">
              Guías legales por categoría
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mt-4">
              Navega por las categorías y encuentra guías claras, con base legal, organizadas para
              facilitar tu búsqueda.
            </p>
          </div>
        </header>

        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                Pensión de alimentos
              </h2>
              <p className="text-muted-foreground mb-4">
                Guías sobre marco legal, requisitos, cálculo y procedimiento en pensión de
                alimentos.
              </p>
              <ul className="text-primary space-y-2 text-sm">
                <li>
                  <Link className="hover:underline" to="/guias/pension-de-alimentos">
                    Panorama general de la categoría
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:underline"
                    to="/guias/pension-de-alimentos/marco-teorico"
                  >
                    Marco jurídico de la pensión de alimentos
                  </Link>
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-3">Divorcio</h2>
              <p className="text-muted-foreground mb-4">
                Guías para entender el proceso de divorcio y sus principales etapas.
              </p>
              <ul className="text-primary space-y-2 text-sm">
                <li>
                  <Link className="hover:underline" to="/guias/divorcio">
                    Panorama general de la categoría
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" to="/guias/divorcio/marco-teorico">
                    Marco teórico del divorcio en Chile
                  </Link>
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                Visitas y cuidado personal
              </h2>
              <p className="text-muted-foreground mb-4">
                Guías sobre relación directa y regular, y cuidado personal en familia.
              </p>
              <ul className="text-primary space-y-2 text-sm">
                <li>
                  <Link className="hover:underline" to="/guias/visitas-y-cuidado-personal">
                    Panorama general de la categoría
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:underline"
                    to="/guias/visitas-y-cuidado-personal/marco-teorico"
                  >
                    Marco teórico de cuidado personal y visitas
                  </Link>
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                Medidas de protección
              </h2>
              <p className="text-muted-foreground mb-4">
                Guías sobre medidas de protección y su alcance en el ámbito familiar.
              </p>
              <ul className="text-primary space-y-2 text-sm">
                <li>
                  <Link className="hover:underline" to="/guias/medidas-de-proteccion">
                    Panorama general de la categoría
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:underline"
                    to="/guias/medidas-de-proteccion/marco-teorico"
                  >
                    Marco teórico de medidas de protección
                  </Link>
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section className="bg-muted/30">
          <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col items-start gap-4">
            <h2 className="text-2xl font-semibold text-foreground">
              ¿Buscas orientación legal?
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Podemos ayudarte a entender tu situación con información clara y una orientación
              inicial.
            </p>
            <a
              href="https://wa.me/56990538001?text=Hola,%20necesito%20orientación%20legal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Solicitar orientación
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
};

export default GuiasIndex;
