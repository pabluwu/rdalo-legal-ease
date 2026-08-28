import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/seo/Seo";
import { buildBreadcrumbJsonLd } from "@/seo/breadcrumbJsonLd";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guías", path: "/guias" },
  { name: "Visitas y cuidado personal", path: "/guias/visitas-y-cuidado-personal" },
]);

const VisitasCuidadoPersonalIndex = () => {
  return (
    <main className="min-h-screen bg-background font-outfit">
      <Seo
        title="Guías de visitas y cuidado personal | Acuérdalo"
        description="Guías sobre cuidado personal y relación directa y regular en Chile: corresponsabilidad parental, criterios judiciales y derechos de los hijos."
        jsonLd={breadcrumbJsonLd}
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
                  <BreadcrumbPage>Visitas y cuidado personal</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Categoría · Guías legales
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-3">
              Guías de visitas y cuidado personal
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mt-4">
              La Ley N° 20.680 establece que ambos padres deben participar de forma activa y
              equitativa en la crianza de los hijos, vivan juntos o separados. Estas guías explican
              cómo se define el cuidado personal, qué es la relación directa y regular (visitas), y
              qué criterios usa el tribunal para resolver desacuerdos.
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
                <Link
                  className="hover:underline"
                  to="/guias/visitas-y-cuidado-personal/marco-teorico"
                >
                  Marco teórico de cuidado personal y relación directa y regular
                </Link>
              </li>
            </ul>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6 mt-6">
            <h2 className="text-2xl font-semibold text-foreground mb-3">
              ¿Qué vas a encontrar en esta categoría?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              El cuidado personal determina con quién vive el hijo o hija el día a día, mientras que
              la relación directa y regular (comúnmente llamada "visitas") organiza el tiempo del
              padre o madre que no vive con él. El artículo 225-2 del Código Civil fija los criterios
              que el tribunal pondera para resolver: la vinculación afectiva, la disponibilidad para
              atender al hijo y su opinión, según su edad y madurez. El artículo 229-2 protege además
              el derecho de los abuelos a mantener contacto con sus nietos.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Estos acuerdos suelen resolverse en paralelo a un proceso de divorcio o de pensión de
              alimentos; revisa esas guías si es tu caso.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6 mt-6">
            <h2 className="text-2xl font-semibold text-foreground mb-3">Guías relacionadas</h2>
            <ul className="text-primary space-y-2 text-sm">
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
                <Link className="hover:underline" to="/guias/medidas-de-proteccion">
                  Guías de medidas de protección
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

export default VisitasCuidadoPersonalIndex;
