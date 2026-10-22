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
import { AUTOR_ID, MIGUEL_ID, ORG_ID, SITE_URL } from "@/seo/entities";
import { ABOGADOS } from "@/lib/contacto";
import AsistenteLegal from "@/components/AsistenteLegal";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": ORG_ID,
  name: "Acuérdalo",
  alternateName: "Acuérdalo, estudio jurídico",
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  logo: `${SITE_URL}/logo.svg`,
  telephone: ABOGADOS[1].telefono.replace(/\s/g, ""),
  email: ABOGADOS[1].email,
  priceRange: "$20.000 - $200.000+",
  areaServed: {
    "@type": "Country",
    name: "Chile",
  },
  description:
    "Estudio jurídico 100% online en Chile. Asesoría en derecho de familia, laboral, civil, tributario y trámites extrajudiciales. Primera orientación gratuita.",
  serviceType: [
    "Derecho laboral",
    "Derecho de familia",
    "Derecho civil",
    "Derecho tributario",
    "Trámites extrajudiciales",
  ],
  employee: [{ "@id": MIGUEL_ID }, { "@id": AUTOR_ID }],
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
        title="Acuérdalo, estudio jurídico online en Chile | Familia, laboral, civil"
        description="Estudio jurídico 100% online en Chile. Asesoría en derecho de familia, laboral, civil, tributario y trámites extrajudiciales. Primera orientación gratuita."
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
        <AsistenteLegal tema="general" />
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
