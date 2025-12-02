import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar } from "lucide-react";

const Hero = () => {
  const openWhatsApp = () => {
    window.open("https://wa.me/56912345678?text=Hola,%20necesito%20asesoría%20legal", "_blank");
  };

  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-[85vh] flex items-center justify-center px-6 py-20 bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
            100% Online • Atención Personalizada
          </span>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
            Abogada de Familia{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              100% Online
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-light max-w-2xl mx-auto">
            Resolvemos tu caso rápido y con trato humano
          </p>
          
          <p className="text-lg text-muted-foreground/80 mb-10 max-w-xl mx-auto font-light">
            Pensiones, visitas, divorcios y más. Sin salir de tu casa.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={openWhatsApp}
              size="lg" 
              className="bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg rounded-full px-8 py-6 text-lg font-medium transition-all hover:scale-105 w-full sm:w-auto"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Hablar por WhatsApp ahora
            </Button>
            
            <Button 
              onClick={scrollToContact}
              variant="outline"
              size="lg" 
              className="border-primary/30 text-foreground hover:bg-primary/5 rounded-full px-8 py-6 text-lg font-medium transition-all w-full sm:w-auto"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Agenda una hora aquí
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
