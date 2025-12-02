import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";

const documentSections = [
  {
    title: "Pensión de Alimentos",
    documents: [
      "Certificado de nacimiento del hijo/a",
      "Certificado de matrimonio (si aplica)",
      "Liquidaciones de sueldo (últimos 6 meses)",
      "Declaración de renta",
      "Comprobantes de gastos del menor",
      "Cédula de identidad",
    ],
  },
  {
    title: "Divorcio",
    documents: [
      "Certificado de matrimonio",
      "Certificados de nacimiento de hijos",
      "Cédulas de identidad de ambos cónyuges",
      "Acuerdo completo y suficiente (mutuo acuerdo)",
      "Antecedentes de cese de convivencia",
      "Inventario de bienes (si hay liquidación)",
    ],
  },
  {
    title: "Cuidado Personal",
    documents: [
      "Certificado de nacimiento del hijo/a",
      "Cédula de identidad del solicitante",
      "Certificado de residencia",
      "Antecedentes de idoneidad parental",
      "Informes sociales o psicológicos (si existen)",
    ],
  },
  {
    title: "Régimen de Visitas",
    documents: [
      "Certificado de nacimiento del hijo/a",
      "Cédula de identidad",
      "Propuesta de régimen de visitas",
      "Antecedentes del vínculo parental",
    ],
  },
  {
    title: "Cobro de Pensión Adeudada",
    documents: [
      "Sentencia de pensión de alimentos",
      "Liquidación de deuda actualizada",
      "Comprobantes de pagos realizados",
      "Certificado de cuenta bancaria",
    ],
  },
  {
    title: "Acuerdos Extrajudiciales",
    documents: [
      "Cédulas de identidad de ambas partes",
      "Certificados de nacimiento de hijos (si aplica)",
      "Antecedentes relevantes del caso",
      "Propuesta inicial de acuerdo",
    ],
  },
];

const Documentos = () => {
  return (
    <main className="min-h-screen bg-background font-outfit">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Volver</span>
          </Link>
          <Link to="/" className="text-xl font-bold text-primary">
            Acuérdalo
          </Link>
          <div className="w-20" />
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-6 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <FileText className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Documentos Necesarios
            </h1>
            <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
              Conoce qué documentos necesitas para cada trámite
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {documentSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-border hover:shadow-soft transition-all">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.documents.map((doc) => (
                        <li key={doc} className="flex items-start gap-3">
                          <Download className="h-4 w-4 text-primary shrink-0 mt-1" />
                          <span className="text-sm text-muted-foreground">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="bg-muted/50 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                ¿No sabes qué documentos necesitas?
              </h2>
              <p className="text-muted-foreground mb-6">
                Escríbenos y te orientamos según tu caso específico
              </p>
              <Button 
                onClick={() => window.open("https://wa.me/56990538001?text=Hola,%20necesito%20saber%20qué%20documentos%20necesito", "_blank")}
                size="lg" 
                className="bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg rounded-full px-8 py-6 text-lg font-medium transition-all hover:scale-105"
              >
                Consultar por WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Documentos;
