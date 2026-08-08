import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import HowWeWork from "@/components/HowWeWork";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Seo from "@/seo/Seo";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Acuérdalo",
  url: "https://acuerdalo.cl",
  image: "https://acuerdalo.cl/og-image.jpg",
  telephone: "+56990538001",
  areaServed: {
    "@type": "Country",
    name: "Chile",
  },
  description:
    "Asesoría legal en derecho de familia en Chile: pensión de alimentos, divorcio, cuidado personal y medidas de protección.",
  serviceType: [
    "Pensión de alimentos",
    "Divorcio",
    "Cuidado personal",
    "Medidas de protección",
  ],
};

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      // Timeout garantiza que el DOM ya pintó tras el cambio de ruta
      setTimeout(() => element.scrollIntoView({ behavior: "smooth" }), 0);
    }
  }, [location]);

  return (
    <main className="min-h-screen bg-background font-outfit">
      <Seo
        title="Abogado de familia en Chile: pensión y calculadora online"
        description="Abogado de familia y trabajadora social en Chile. Calculadora de pensión de alimentos, divorcio, retención, demanda y asesoría en derecho de familia."
        jsonLd={organizationJsonLd}
      />
      <Navbar />
      <div className="pt-16">
        <Hero />
        <section id="servicios">
          <Services />
        </section>
        <section id="precios">
          <Pricing />
        </section>
        <section id="faq">
          <FAQ />
        </section>
        <HowWeWork />
        <section id="contacto">
          <FinalCTA />
        </section>
        <Footer />
      </div>
    </main>
  );
};

export default Index;
