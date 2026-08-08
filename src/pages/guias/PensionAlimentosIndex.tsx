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

const PensionAlimentosIndex = () => {
  return (
    <main className="min-h-screen bg-background font-outfit">
      <Seo
        title="Guías de pensión de alimentos en Chile | Acuérdalo"
        description="Guías sobre pensión de alimentos en Chile: marco jurídico, montos, requisitos, procedimiento judicial y cálculo según la Ley N° 14.908."
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
                  <BreadcrumbPage>Pensión de alimentos</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Categoría · Guías legales
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-3">
              Guías de pensión de alimentos
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mt-4">
              La pensión de alimentos se rige por el Código Civil y por la Ley N° 14.908 sobre
              procedimiento judicial de alimentos. Estas guías explican quién puede solicitarla, cómo
              se calcula el monto y qué hacer si el pago no se cumple.
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
                  to="/guias/pension-de-alimentos/marco-teorico"
                >
                  Marco jurídico de la pensión de alimentos
                </Link>
              </li>
              <li>
                <Link className="hover:underline" to="/calculadora-pension">
                  Calculadora de pensión de alimentos
                </Link>
              </li>
            </ul>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6 mt-6">
            <h2 className="text-2xl font-semibold text-foreground mb-3">
              ¿Qué vas a encontrar en esta categoría?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              La pensión de alimentos es el derecho de un hijo o hija a recibir de sus padres lo
              necesario para su subsistencia: alimentación, salud, educación y vivienda, entre otros.
              El monto se fija según los ingresos del demandado y las necesidades del alimentario, con
              un mínimo legal basado en el ingreso mínimo mensual y un tope del 50% de las rentas del
              alimentante. Si la pensión no se paga, existen mecanismos como la retención judicial y el
              Registro Nacional de Deudores de Pensiones de Alimentos.
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
                <Link className="hover:underline" to="/guias/visitas-y-cuidado-personal">
                  Guías de visitas y cuidado personal
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

export default PensionAlimentosIndex;
