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
      <Hero />
      <Services />
      <Pricing />
      <FAQ />
      <HowWeWork />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Index;
