import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background font-outfit">
      <Hero />
      <Services />
      <About />
      <ContactForm />
      <Footer />
    </main>
  );
};

export default Index;
