import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import useGtmPageView from "./hooks/useGtmPageView";
import Documentos from "./pages/Documentos";
import PensionAlimentos from "./pages/servicios/PensionAlimentos";
import AumentoPension from "./pages/servicios/AumentoPension";
import RebajaPension from "./pages/servicios/RebajaPension";
import Visitas from "./pages/servicios/Visitas";
import CuidadoPersonal from "./pages/servicios/CuidadoPersonal";
import Divorcio from "./pages/servicios/Divorcio";
import CobroDeuda from "./pages/servicios/CobroDeuda";
import Acuerdos from "./pages/servicios/Acuerdos";
import CalculadoraPension from "./pages/CalculadoraPension";
import NotFound from "./pages/NotFound";
import GuiasIndex from "./pages/guias/GuiasIndex";
import PensionAlimentosIndex from "./pages/guias/PensionAlimentosIndex";
import PensionAlimentosMarcoTeorico from "./pages/guias/PensionAlimentosMarcoTeorico";
import DivorcioIndex from "./pages/guias/DivorcioIndex";
import DivorcioMarcoTeorico from "./pages/guias/DivorcioMarcoTeorico";
import VisitasCuidadoPersonalIndex from "./pages/guias/VisitasCuidadoPersonalIndex";
import VisitasCuidadoPersonalMarcoTeorico from "./pages/guias/VisitasCuidadoPersonalMarcoTeorico";
import MedidasProteccionIndex from "./pages/guias/MedidasProteccionIndex";
import MedidasProteccionMarcoTeorico from "./pages/guias/MedidasProteccionMarcoTeorico";

const queryClient = new QueryClient();

const GtmPageViewListener = () => {
  useGtmPageView();
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GtmPageViewListener />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calculadora-pension" element={<CalculadoraPension />} />
          <Route path="/guias" element={<GuiasIndex />} />
          <Route path="/guias/pension-de-alimentos" element={<PensionAlimentosIndex />} />
          <Route
            path="/guias/pension-de-alimentos/marco-teorico"
            element={<PensionAlimentosMarcoTeorico />}
          />
          <Route path="/guias/divorcio" element={<DivorcioIndex />} />
          <Route path="/guias/divorcio/marco-teorico" element={<DivorcioMarcoTeorico />} />
          <Route
            path="/guias/visitas-y-cuidado-personal"
            element={<VisitasCuidadoPersonalIndex />}
          />
          <Route
            path="/guias/visitas-y-cuidado-personal/marco-teorico"
            element={<VisitasCuidadoPersonalMarcoTeorico />}
          />
          <Route path="/guias/medidas-de-proteccion" element={<MedidasProteccionIndex />} />
          <Route
            path="/guias/medidas-de-proteccion/marco-teorico"
            element={<MedidasProteccionMarcoTeorico />}
          />
          {/* <Route path="/documentos" element={<Documentos />} />
          <Route path="/servicios/pension-alimentos" element={<PensionAlimentos />} />
          <Route path="/servicios/aumento-pension" element={<AumentoPension />} />
          <Route path="/servicios/rebaja-pension" element={<RebajaPension />} />
          <Route path="/servicios/visitas" element={<Visitas />} />
          <Route path="/servicios/cuidado-personal" element={<CuidadoPersonal />} />
          <Route path="/servicios/divorcio" element={<Divorcio />} />
          <Route path="/servicios/cobro-deuda" element={<CobroDeuda />} />
          <Route path="/servicios/acuerdos" element={<Acuerdos />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
