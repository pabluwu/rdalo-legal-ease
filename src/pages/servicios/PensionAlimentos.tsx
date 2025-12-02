import { Calculator } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const PensionAlimentos = () => {
  return (
    <ServicePageLayout
      title="Pensión de Alimentos"
      subtitle="Demandas y cálculos de pensión alimenticia ajustados a la ley chilena"
      icon={<Calculator className="h-10 w-10 text-primary" />}
    >
      <div className="prose prose-lg max-w-none">
        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">¿Qué es la pensión de alimentos?</h2>
          <p className="text-muted-foreground">
            Texto pendiente - aquí irá la explicación sobre qué es la pensión de alimentos, 
            quiénes tienen derecho a solicitarla y las obligaciones del alimentante.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">¿Cómo se calcula?</h2>
          <p className="text-muted-foreground">
            Texto pendiente - aquí irá la explicación sobre los criterios para calcular 
            el monto de la pensión, porcentajes legales y factores que se consideran.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Proceso legal</h2>
          <p className="text-muted-foreground">
            Texto pendiente - aquí irá la explicación del proceso paso a paso, 
            desde la mediación hasta la demanda y sentencia.
          </p>
        </div>

        <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Documentos necesarios</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Certificado de nacimiento del hijo/a</li>
            <li>Certificado de matrimonio (si aplica)</li>
            <li>Liquidaciones de sueldo o declaración de renta</li>
            <li>Comprobantes de gastos del menor</li>
            <li>Cédula de identidad</li>
          </ul>
        </div>
      </div>
    </ServicePageLayout>
  );
};

export default PensionAlimentos;
