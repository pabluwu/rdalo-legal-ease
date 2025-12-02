import { TrendingUp } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const AumentoPension = () => {
  return (
    <ServicePageLayout
      title="Aumento de Pensión"
      subtitle="Cuando las necesidades de tus hijos aumentan, la pensión también puede hacerlo"
      icon={<TrendingUp className="h-10 w-10 text-primary" />}
    >
      <div className="prose prose-lg max-w-none">
        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">¿Cuándo puedo pedir un aumento?</h2>
          <p className="text-muted-foreground">
            Texto pendiente - aquí irá la explicación sobre las circunstancias que 
            justifican solicitar un aumento de la pensión de alimentos.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Requisitos legales</h2>
          <p className="text-muted-foreground">
            Texto pendiente - aquí irá la explicación sobre los requisitos y 
            condiciones que deben cumplirse para solicitar el aumento.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Proceso y plazos</h2>
          <p className="text-muted-foreground">
            Texto pendiente - aquí irá la explicación del proceso legal, 
            tiempos estimados y etapas del procedimiento.
          </p>
        </div>

        <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Documentos necesarios</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Sentencia de pensión vigente</li>
            <li>Comprobantes de nuevos gastos</li>
            <li>Antecedentes de cambio de circunstancias</li>
            <li>Certificados médicos o educacionales (si aplica)</li>
          </ul>
        </div>
      </div>
    </ServicePageLayout>
  );
};

export default AumentoPension;
