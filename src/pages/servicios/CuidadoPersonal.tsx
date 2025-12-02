import { Heart } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const CuidadoPersonal = () => {
  return (
    <ServicePageLayout
      title="Cuidado Personal"
      subtitle="Custodia y tuición de los hijos: protege el bienestar de tu familia"
      icon={<Heart className="h-10 w-10 text-primary" />}
    >
      <div className="prose prose-lg max-w-none">
        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">¿Qué es el cuidado personal?</h2>
          <p className="text-muted-foreground">
            Texto pendiente - aquí irá la explicación sobre el cuidado personal, 
            la diferencia con la patria potestad y su regulación legal.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Tipos de cuidado personal</h2>
          <p className="text-muted-foreground">
            Texto pendiente - aquí irá la explicación sobre el cuidado personal 
            exclusivo vs compartido y sus implicancias.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Criterios del tribunal</h2>
          <p className="text-muted-foreground">
            Texto pendiente - aquí irá la explicación sobre qué factores considera 
            el juez para otorgar el cuidado personal.
          </p>
        </div>

        <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Documentos necesarios</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Certificado de nacimiento del hijo/a</li>
            <li>Cédula de identidad</li>
            <li>Antecedentes que acrediten idoneidad</li>
            <li>Informes sociales o psicológicos (si existen)</li>
            <li>Certificados de residencia</li>
          </ul>
        </div>
      </div>
    </ServicePageLayout>
  );
};

export default CuidadoPersonal;
