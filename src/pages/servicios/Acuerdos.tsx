import { Handshake } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const Acuerdos = () => {
  return (
    <ServicePageLayout
      title="Acuerdos Extrajudiciales"
      subtitle="Soluciones consensuadas sin necesidad de ir a tribunales"
      icon={<Handshake className="h-10 w-10 text-primary" />}
    >
      <div className="prose prose-lg max-w-none">
        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">¿Qué son los acuerdos extrajudiciales?</h2>
          <p className="text-muted-foreground">
            Texto pendiente - aquí irá la explicación sobre qué son estos acuerdos, 
            su validez legal y cuándo conviene utilizarlos.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Tipos de acuerdos</h2>
          <p className="text-muted-foreground">
            Texto pendiente - aquí irá la explicación sobre los diferentes tipos: 
            transacciones, avenimientos, acuerdos de mediación.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Ventajas de un acuerdo</h2>
          <p className="text-muted-foreground">
            Texto pendiente - aquí irá la explicación sobre las ventajas: 
            rapidez, menor costo, menor desgaste emocional.
          </p>
        </div>

        <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Documentos necesarios</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Cédula de identidad de ambas partes</li>
            <li>Certificados de nacimiento de hijos (si aplica)</li>
            <li>Antecedentes relevantes del caso</li>
            <li>Propuesta inicial de acuerdo</li>
          </ul>
        </div>
      </div>
    </ServicePageLayout>
  );
};

export default Acuerdos;
