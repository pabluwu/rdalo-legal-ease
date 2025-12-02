import { Scale } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const CobroDeuda = () => {
  return (
    <ServicePageLayout
      title="Cobro de Deuda de Pensión"
      subtitle="Recupera las pensiones impagas con el respaldo de la ley"
      icon={<Scale className="h-10 w-10 text-primary" />}
    >
      <div className="prose prose-lg max-w-none">
        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">¿Qué hacer si no me pagan?</h2>
          <p className="text-muted-foreground">
            Texto pendiente - aquí irá la explicación sobre las acciones legales 
            disponibles cuando el alimentante no cumple con su obligación.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Apremios legales</h2>
          <p className="text-muted-foreground">
            Texto pendiente - aquí irá la explicación sobre los apremios: 
            arresto, retención de licencia, arraigo nacional, embargo.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Proceso de cobro</h2>
          <p className="text-muted-foreground">
            Texto pendiente - aquí irá la explicación del proceso judicial 
            para cobrar las pensiones adeudadas.
          </p>
        </div>

        <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Documentos necesarios</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Sentencia de pensión de alimentos</li>
            <li>Liquidación de deuda</li>
            <li>Antecedentes de pagos realizados</li>
            <li>Certificado de la cuenta donde se deposita</li>
          </ul>
        </div>
      </div>
    </ServicePageLayout>
  );
};

export default CobroDeuda;
