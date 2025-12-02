import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "./Footer";

interface ServicePageLayoutProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ServicePageLayout = ({ title, subtitle, icon, children }: ServicePageLayoutProps) => {
  const openWhatsApp = () => {
    window.open(`https://wa.me/56912345678?text=Hola,%20necesito%20información%20sobre%20${encodeURIComponent(title)}`, "_blank");
  };

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
          <Link to="/documentos">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <FileText className="h-4 w-4 mr-2" />
              Documentos
            </Button>
          </Link>
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
              {icon}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
              {subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {children}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              ¿Necesitas ayuda con {title.toLowerCase()}?
            </h2>
            <p className="text-muted-foreground mb-6">
              Escríbenos y evaluamos tu caso sin compromiso
            </p>
            <Button 
              onClick={openWhatsApp}
              size="lg" 
              className="bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg rounded-full px-8 py-6 text-lg font-medium transition-all hover:scale-105"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Consultar por WhatsApp
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ServicePageLayout;
