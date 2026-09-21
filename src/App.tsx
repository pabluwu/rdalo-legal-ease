import type { RouteRecord } from "vite-react-ssg";
import Layout from "./Layout";
import Index from "./pages/Index";
import CalculadoraPension from "./pages/CalculadoraPension";
import QuienesSomos from "./pages/QuienesSomos";
import DivorcioEnChile from "./pages/DivorcioEnChile";
import NotFound from "./pages/NotFound";
import GuiasIndex from "./pages/guias/GuiasIndex";
import PensionAlimentosIndex from "./pages/guias/PensionAlimentosIndex";
import VisitasCuidadoPersonalIndex from "./pages/guias/VisitasCuidadoPersonalIndex";
import MedidasProteccionIndex from "./pages/guias/MedidasProteccionIndex";

export const routes: RouteRecord[] = [
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Index },
      { path: "calculadora-pension", Component: CalculadoraPension },
      { path: "quienes-somos", Component: QuienesSomos },
      { path: "divorcio-en-chile", Component: DivorcioEnChile },
      // Las URLs viejas (/guias/*/marco-teorico y /guias/divorcio) se redirigen con 301
      // desde nginx: no existen como rutas de la app. Ver PLAN-SEO.md.
      { path: "guias", Component: GuiasIndex },
      { path: "guias/pension-de-alimentos", Component: PensionAlimentosIndex },
      {
        path: "guias/visitas-y-cuidado-personal",
        Component: VisitasCuidadoPersonalIndex,
      },
      { path: "guias/medidas-de-proteccion", Component: MedidasProteccionIndex },
      // Ruta estática, prerenderizada, servida como página de error real (ver config nginx)
      { path: "404", Component: NotFound },
      // Fallback de cliente para navegación interna a rutas inexistentes
      { path: "*", Component: NotFound },
    ],
  },
];
