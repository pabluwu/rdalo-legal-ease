import { Users } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const Visitas = () => {
  return (
    <ServicePageLayout
      title="Régimen de Visitas"
      subtitle="Establece o modifica el régimen de visitas para mantener el vínculo con tus hijos"
      icon={<Users className="h-10 w-10 text-primary" />}
    >
      <div className="prose prose-lg max-w-none">
        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">¿Qué es el régimen de visitas?</h2>
          <p className="text-muted-foreground">
            Texto pendiente - aquí irá la explicación sobre el derecho de relación 
            directa y regular, su importancia y marco legal.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Tipos de régimen</h2>
          <p className="text-muted-foreground">
            Texto pendiente - aquí irá la explicación sobre los diferentes tipos 
            de régimen según la edad del menor y circunstancias familiares.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">¿Qué hacer si no me dejan ver a mi hijo?</h2>
          <p className="text-muted-foreground">
            Texto pendiente - aquí irá la explicación sobre las acciones legales 
            disponibles cuando se impide el contacto con los hijos.
          </p>
        </div>

        <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Documentos necesarios</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Certificado de nacimiento del hijo/a</li>
            <li>Cédula de identidad</li>
            <li>Antecedentes del vínculo parental</li>
            <li>Propuesta de régimen de visitas</li>
          </ul>
        </div>
      </div>
    </ServicePageLayout>
  );
};

export default Visitas;
