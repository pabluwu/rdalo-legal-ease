import { Link } from "react-router-dom";

type AuthorBylineProps = {
  updatedAt: string;
};

const AuthorByline = ({ updatedAt }: AuthorBylineProps) => (
  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
    <span>
      Escrito por{" "}
      <Link to="/quienes-somos" className="text-primary hover:underline font-medium">
        Michelle Alvarez Villalón
      </Link>
      , Abogada de Familia (Universidad Andrés Bello)
    </span>
    <span aria-hidden="true">·</span>
    <span>Actualizado el {updatedAt}</span>
  </div>
);

export default AuthorByline;
