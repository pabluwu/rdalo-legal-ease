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
  { name: "Medidas de protección", path: "/guias/medidas-de-proteccion" },
]);

const MedidasProteccionIndex = () => {
  return (
    <main className="min-h-screen bg-background font-outfit">
      <Seo
        title="Guías de medidas de protección | Acuérdalo"
        description="Guías sobre medidas de protección de derechos de niños, niñas y adolescentes en Chile: cuándo proceden y ante qué tribunal se solicitan."
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
                  <BreadcrumbPage>Medidas de protección</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Categoría · Guías legales
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-3">
              Guías de medidas de protección
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mt-4">
              Las medidas de protección buscan resguardar a niños, niñas y adolescentes cuyos
              derechos están siendo vulnerados o amenazados. Se rigen por la Ley N° 19.968 sobre
              Tribunales de Familia, la Ley N° 21.430 de garantías de la niñez y la Convención sobre
              los Derechos del Niño.
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
                <Link className="hover:underline" to="/guias/medidas-de-proteccion/marco-teorico">
                  Marco teórico de medidas de protección de derechos
                </Link>
              </li>
            </ul>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6 mt-6">
            <h2 className="text-2xl font-semibold text-foreground mb-3">
              ¿Qué vas a encontrar en esta categoría?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Cualquier persona, incluido el propio niño, niña o adolescente, puede solicitar una
              medida de protección ante el Tribunal de Familia competente cuando existe una
              vulneración de derechos: negligencia, maltrato, exposición a violencia intrafamiliar u
              otras situaciones de riesgo. El tribunal puede decretar medidas como el ingreso a un
              programa de apoyo, la asistencia obligatoria a tratamiento, o la derivación al Servicio
              Nacional de Protección Especializada, creado por la Ley N° 21.302.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Estas medidas son independientes de un juicio de divorcio, pensión de alimentos o
              cuidado personal, aunque pueden coexistir con ellos si en esas causas también se detecta
              una vulneración de derechos.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6 mt-6">
            <h2 className="text-2xl font-semibold text-foreground mb-3">Guías relacionadas</h2>
            <ul className="text-primary space-y-2 text-sm">
              <li>
                <Link className="hover:underline" to="/guias/visitas-y-cuidado-personal">
                  Guías de visitas y cuidado personal
                </Link>
              </li>
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
            </ul>
          </article>
        </section>

        <Footer />
      </div>
    </main>
  );
};

export default MedidasProteccionIndex;
