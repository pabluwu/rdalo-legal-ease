interface LogoProps {
  /** Tamaño del ícono (clases de Tailwind). */
  iconClassName?: string;
  /** Tamaño del texto (clases de Tailwind). */
  textClassName?: string;
}

const Logo = ({ iconClassName = "h-9 w-9", textClassName = "text-xl" }: LogoProps) => (
  <span className="flex items-center gap-2">
    <img src="/logo.svg" alt="" className={iconClassName} />
    <span className={`font-outfit font-bold text-foreground ${textClassName}`}>Acuérdalo</span>
  </span>
);

export default Logo;
