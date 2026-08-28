import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Head } from "vite-react-ssg";

const NEW_PATH = "/divorcio-en-chile";
const NEW_URL = `https://acuerdalo.cl${NEW_PATH}`;

/**
 * Redirect stub: esta guía se movió a /divorcio-en-chile.
 * Mientras no exista un 301 real a nivel de nginx (fuera de este repo, ver PLAN-SEO.md),
 * esta página sirve un meta-refresh de 0s + canonical a la nueva URL, que Google interpreta
 * como equivalente a un 301 a efectos de ranking. Reemplazar por un 301 de servidor apenas
 * se pueda tocar la config de nginx del VPS.
 */
const DivorcioMarcoTeorico = () => {
  useEffect(() => {
    window.location.replace(NEW_PATH);
  }, []);

  return (
    <>
      <Head>
        <title>Redirigiendo… | Acuérdalo</title>
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href={NEW_URL} />
        <meta httpEquiv="refresh" content={`0;url=${NEW_PATH}`} />
      </Head>
      <p style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        Esta guía se movió a <a href={NEW_PATH}>{NEW_URL}</a>.
      </p>
      <Navigate to={NEW_PATH} replace />
    </>
  );
};

export default DivorcioMarcoTeorico;
