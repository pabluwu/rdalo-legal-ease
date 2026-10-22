import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import { ABOGADOS, telLink, waLink } from "@/lib/contacto";

const guideLinks = [
  { to: "/calculadora-pension", label: "Calculadora de pensión de alimentos" },
  { to: "/guias/pension-de-alimentos", label: "Guías de pensión de alimentos" },
  { to: "/divorcio-en-chile", label: "Guías de divorcio" },
  { to: "/guias/visitas-y-cuidado-personal", label: "Guías de visitas y cuidado personal" },
  { to: "/guias/medidas-de-proteccion", label: "Guías de medidas de protección" },
];

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <Logo iconClassName="h-8 w-8" textClassName="text-lg" />
          <p className="text-sm text-muted-foreground font-light mt-2 max-w-xs">
            Acuérdalo, estudio jurídico. Asesoría en derecho laboral, de familia, civil y
            tributario, 100% online en todo Chile.
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
                href={waLink()}
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
        <div className="grid gap-6 sm:grid-cols-2 mb-6">
          {ABOGADOS.map((abogado) => (
            <div key={abogado.email}>
              <p className="text-sm font-semibold text-foreground">{abogado.nombre}</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li>
                  <a href={telLink(abogado.telefono)} className="text-muted-foreground hover:text-primary transition-colors">
                    {abogado.telefono}
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${abogado.wa}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href={`mailto:${abogado.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {abogado.email}
                  </a>
                </li>
              </ul>
            </div>
          ))}
        </div>
        <p className="text-muted-foreground font-light text-sm text-center mb-3">
          Respondemos en menos de 24 horas · Atención 100% online en todo Chile
        </p>
        <p className="text-muted-foreground font-light text-sm text-center">
          © {__BUILD_YEAR__} Acuérdalo. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
