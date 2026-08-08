import { Link } from "react-router-dom";

const guideLinks = [
  { to: "/calculadora-pension", label: "Calculadora de pensión de alimentos" },
  { to: "/guias/pension-de-alimentos", label: "Guías de pensión de alimentos" },
  { to: "/guias/divorcio", label: "Guías de divorcio" },
  { to: "/guias/visitas-y-cuidado-personal", label: "Guías de visitas y cuidado personal" },
  { to: "/guias/medidas-de-proteccion", label: "Guías de medidas de protección" },
];

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <span className="font-bold text-lg text-foreground">Acuérdalo</span>
          <p className="text-sm text-muted-foreground font-light mt-2 max-w-xs">
            Abogado de familia y trabajadora social en Chile. Asesoría en pensión de
            alimentos, divorcio y derecho de familia, 100% online.
          </p>
        </div>

        <nav aria-label="Guías legales">
          <p className="text-sm font-semibold text-foreground mb-3">Guías legales</p>
          <ul className="space-y-2 text-sm">
            {guideLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Enlaces">
          <p className="text-sm font-semibold text-foreground mb-3">Enlaces</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/guias" className="text-muted-foreground hover:text-primary transition-colors">
                Todas las guías
              </Link>
            </li>
            <li>
              <Link to="/quienes-somos" className="text-muted-foreground hover:text-primary transition-colors">
                Quiénes somos
              </Link>
            </li>
            <li>
              <a
                href="https://wa.me/56990538001"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contacto por WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-border">
        <p className="text-muted-foreground font-light text-sm text-center">
          © {new Date().getFullYear()} Acuérdalo. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
