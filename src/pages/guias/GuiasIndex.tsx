import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/seo/Seo";
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

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guías", path: "/guias" },
]);

const GuiasIndex = () => {
  return (
    <main className="min-h-screen bg-background font-outfit">
      <Seo
        title="Guías legales en Chile | Acuérdalo"
        description="Guías legales en Chile organizadas por tema: pensión de alimentos, divorcio, visitas y cuidado personal, y medidas de protección."
        jsonLd={breadcrumbJsonLd}
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
              Cuatro guías de derecho de familia chileno, escritas para quien no es abogado:
              pensión de alimentos, divorcio, cuidado personal y visitas, y medidas de
              protección. Cada una parte del problema concreto —cuánto, cuándo, qué pasa
              si— y cita la ley que lo respalda.
            </p>
            <p className="text-muted-foreground max-w-3xl mt-3">
              Si no sabes por dónde empezar y tu caso es de pensión, la{" "}
              <Link to="/calculadora-pension" className="text-primary hover:underline">
                calculadora de pensión de alimentos
              </Link>{" "}
              te da una cifra de referencia en un minuto. Si tienes una duda puntual,
              pregúntasela al asistente que está más abajo.
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
                Cuánto corresponde según el número de hijos, cuál es el mínimo legal y el tope
                del 50 %, qué ingresos cuentan, cómo se tramita y qué ocurre cuando no se
                paga.
              </p>
              <ul className="text-primary space-y-2 text-sm">
                <li>
                  <Link className="hover:underline" to="/guias/pension-de-alimentos">
                    Pensión de alimentos: marco legal, cálculo y procedimiento
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" to="/calculadora-pension">
                    Calculadora de pensión de alimentos
                  </Link>
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-3">Divorcio</h2>
              <p className="text-muted-foreground mb-4">
                Las tres vías de divorcio y sus plazos, qué hacer si el cónyuge se niega, cómo
                se acredita el cese de convivencia y cómo funciona la compensación
                económica.
              </p>
              <ul className="text-primary space-y-2 text-sm">
                <li>
                  <Link className="hover:underline" to="/divorcio-en-chile">
                    Divorcio en Chile: requisitos, plazos y marco legal
                  </Link>
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                Visitas y cuidado personal
              </h2>
              <p className="text-muted-foreground mb-4">
                Cómo se fija un régimen de visitas, qué criterios pesan en el cuidado personal,
                qué pasa si no se cumple lo acordado y qué derechos tienen los abuelos.
              </p>
              <ul className="text-primary space-y-2 text-sm">
                <li>
                  <Link className="hover:underline" to="/guias/visitas-y-cuidado-personal">
                    Cuidado personal y relación directa y regular
                  </Link>
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                Medidas de protección
              </h2>
              <p className="text-muted-foreground mb-4">
                Qué es una vulneración de derechos, quién puede pedir una medida, cómo se inicia
                la causa, qué medidas puede decretar el tribunal y el rol del curador ad
                litem.
              </p>
              <ul className="text-primary space-y-2 text-sm">
                <li>
                  <Link className="hover:underline" to="/guias/medidas-de-proteccion">
                    Medidas de protección por vulneración de derechos
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
              href={waLink("Hola, necesito orientación legal")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Solicitar orientación
            </a>
          </div>
        </section>

        <AsistenteLegal tema="general" />

        <Footer />
      </div>
    </main>
  );
};

export default GuiasIndex;
