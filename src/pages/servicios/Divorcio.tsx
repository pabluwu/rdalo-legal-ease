import { FileText } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const Divorcio = () => {
  return (
    <ServicePageLayout
      title="Divorcio"
      subtitle="Divorcio unilateral o de mutuo acuerdo: te acompañamos en el proceso"
      icon={<FileText className="h-10 w-10 text-primary" />}
    >
      <div className="prose prose-lg max-w-none">
        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Tipos de divorcio en Chile</h2>
          <p className="text-muted-foreground">
            Texto pendiente - aquí irá la explicación sobre los tipos de divorcio: 
            mutuo acuerdo, unilateral por cese de convivencia y por culpa.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Divorcio de mutuo acuerdo</h2>
          <p className="text-muted-foreground">
            Texto pendiente - aquí irá la explicación sobre requisitos, proceso 
            y tiempos del divorcio cuando ambos están de acuerdo.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Divorcio unilateral</h2>
          <p className="text-muted-foreground">
            Texto pendiente - aquí irá la explicación sobre el divorcio cuando 
            solo una parte quiere divorciarse, requisitos y plazos.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">¿Cuánto demora?</h2>
          <p className="text-muted-foreground">
            Texto pendiente - aquí irá la explicación sobre los plazos estimados 
            según el tipo de divorcio y la complejidad del caso.
          </p>
        </div>

        <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Documentos necesarios</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Certificado de matrimonio</li>
            <li>Certificados de nacimiento de hijos (si hay)</li>
            <li>Cédula de identidad de ambos cónyuges</li>
            <li>Acuerdo completo y suficiente (si es mutuo acuerdo)</li>
            <li>Antecedentes de cese de convivencia</li>
          </ul>
        </div>
      </div>
    </ServicePageLayout>
  );
};

export default Divorcio;
