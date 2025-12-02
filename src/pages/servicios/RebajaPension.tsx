import { TrendingDown } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const RebajaPension = () => {
  return (
    <ServicePageLayout
      title="Rebaja de Pensión"
      subtitle="Cuando tu situación económica cambia, puedes solicitar una modificación"
      icon={<TrendingDown className="h-10 w-10 text-primary" />}
    >
      <div className="prose prose-lg max-w-none">
        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">¿Cuándo puedo pedir una rebaja?</h2>
          <p className="text-muted-foreground">
            Texto pendiente - aquí irá la explicación sobre las circunstancias que 
            justifican solicitar una rebaja de la pensión de alimentos.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Causales aceptadas</h2>
          <p className="text-muted-foreground">
            Texto pendiente - aquí irá la explicación sobre las causales legales 
            que permiten solicitar una disminución del monto.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Proceso legal</h2>
          <p className="text-muted-foreground">
            Texto pendiente - aquí irá la explicación del proceso, 
            incluyendo mediación y demanda si es necesario.
          </p>
        </div>

        <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Documentos necesarios</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Sentencia de pensión vigente</li>
            <li>Finiquito o carta de despido (si aplica)</li>
            <li>Certificado de cesantía</li>
            <li>Antecedentes de nueva situación económica</li>
            <li>Certificados de otros gastos obligatorios</li>
          </ul>
        </div>
      </div>
    </ServicePageLayout>
  );
};

export default RebajaPension;
