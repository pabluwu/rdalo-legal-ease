import type { RouteRecord } from "vite-react-ssg";
import Layout from "./Layout";
import Index from "./pages/Index";
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

export const routes: RouteRecord[] = [
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Index },
      { path: "calculadora-pension", Component: CalculadoraPension },
      { path: "calculadora-pension/:cantidadHijosParam", Component: CalculadoraPension },
      { path: "guias", Component: GuiasIndex },
      { path: "guias/pension-de-alimentos", Component: PensionAlimentosIndex },
      {
        path: "guias/pension-de-alimentos/marco-teorico",
        Component: PensionAlimentosMarcoTeorico,
      },
      { path: "guias/divorcio", Component: DivorcioIndex },
      { path: "guias/divorcio/marco-teorico", Component: DivorcioMarcoTeorico },
      {
        path: "guias/visitas-y-cuidado-personal",
        Component: VisitasCuidadoPersonalIndex,
      },
      {
        path: "guias/visitas-y-cuidado-personal/marco-teorico",
        Component: VisitasCuidadoPersonalMarcoTeorico,
      },
      { path: "guias/medidas-de-proteccion", Component: MedidasProteccionIndex },
      {
        path: "guias/medidas-de-proteccion/marco-teorico",
        Component: MedidasProteccionMarcoTeorico,
      },
      // Ruta estática, prerenderizada, servida como página de error real (ver config nginx)
      { path: "404", Component: NotFound },
      // Fallback de cliente para navegación interna a rutas inexistentes
      { path: "*", Component: NotFound },
    ],
  },
];
