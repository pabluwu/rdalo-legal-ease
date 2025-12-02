import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Documentos from "./pages/Documentos";
import PensionAlimentos from "./pages/servicios/PensionAlimentos";
import AumentoPension from "./pages/servicios/AumentoPension";
import RebajaPension from "./pages/servicios/RebajaPension";
import Visitas from "./pages/servicios/Visitas";
import CuidadoPersonal from "./pages/servicios/CuidadoPersonal";
import Divorcio from "./pages/servicios/Divorcio";
import CobroDeuda from "./pages/servicios/CobroDeuda";
import Acuerdos from "./pages/servicios/Acuerdos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/documentos" element={<Documentos />} />
          <Route path="/servicios/pension-alimentos" element={<PensionAlimentos />} />
          <Route path="/servicios/aumento-pension" element={<AumentoPension />} />
          <Route path="/servicios/rebaja-pension" element={<RebajaPension />} />
          <Route path="/servicios/visitas" element={<Visitas />} />
          <Route path="/servicios/cuidado-personal" element={<CuidadoPersonal />} />
          <Route path="/servicios/divorcio" element={<Divorcio />} />
          <Route path="/servicios/cobro-deuda" element={<CobroDeuda />} />
          <Route path="/servicios/acuerdos" element={<Acuerdos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
