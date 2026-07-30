import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Seo from "@/seo/Seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Seo
        title="Página no encontrada | Acuérdalo"
        description="La página que buscas no existe o fue movida."
        robots="noindex,nofollow"
        canonical="https://acuerdalo.cl/404"
      />
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Página no encontrada</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Volver al inicio
        </a>
      </div>
    </div>
  );
};

export default NotFound;
