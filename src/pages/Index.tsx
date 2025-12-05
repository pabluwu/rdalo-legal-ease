import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import HowWeWork from "@/components/HowWeWork";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background font-outfit">
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
