#!/usr/bin/env python3
"""Registra la posicion semanal de la calculadora en Google.

Los clics son demasiado pocos para ver tendencias: entre 0 y 1 por semana desde
mayo de 2026. Una semana con 1 clic y otra con 0 no dicen nada. La posicion
media de las consultas cabeza si se mueve de forma legible, asi que es la
metrica que seguimos.

Uso
---
1. En Search Console: Rendimiento > Resultados de busqueda.
2. Filtro "Pagina" = https://acuerdalo.cl/calculadora-pension (exacta).
3. Rango de fechas = los ultimos 7 dias completos (lunes a domingo).
4. Boton EXPORTAR > Descargar CSV. Se baja un .zip.
5. python3 scripts/seo-posiciones.py <ruta-del-zip> --semana 2026-10-05

El script lee Consultas.csv del export (que ya viene filtrado por pagina y por
el rango elegido) y agrega una fila por consulta seguida a
seo-posiciones.csv. Sin --semana usa el lunes de la semana en curso.

    python3 scripts/seo-posiciones.py --tendencia

imprime la serie por consulta para ver si sube o baja.
"""

from __future__ import annotations

import argparse
import csv
import datetime as dt
import io
import os
import sys
import unicodedata
import zipfile

HISTORIAL = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "seo-posiciones.csv")
COLUMNAS = ["semana", "consulta", "posicion", "impresiones", "clics"]

# Consultas cabeza de la calculadora. Las cinco primeras son las que trajeron el
# trafico de marzo y abril de 2026; las ultimas son la cola larga que ya aparece
# en pagina 1 y que las secciones nuevas intentan capturar.
CONSULTAS = [
    "calculadora de pension de alimentos chile",
    "calculadora de pension de alimentos",
    "calcular pension de alimentos",
    "calculo pension alimentos",
    "calculadora de pension alimenticia",
    "porcentaje de pension alimenticia por 3 hijos",
    "porcentaje de pension alimenticia por 1 hijos",
    "porcentaje de pension alimenticia por 2 hijos",
    "cuanto debe pagar de pension alimenticia segun su sueldo",
    "calculo pension alimenticia segun sueldo",
    "tabla para calcular pension de alimentos",
    "como se saca el porcentaje de pension alimenticia",
]


def normaliza(texto: str) -> str:
    """Sin tildes y en minusculas: en GSC la misma consulta aparece escrita de
    las dos formas y si no se normaliza se cuentan como distintas."""
    sin_tildes = unicodedata.normalize("NFKD", texto).encode("ascii", "ignore").decode()
    return " ".join(sin_tildes.lower().split())


def lee_consultas(ruta_zip: str) -> dict[str, dict[str, str]]:
    """Devuelve {consulta normalizada: fila} desde Consultas.csv del export."""
    with zipfile.ZipFile(ruta_zip) as z:
        destino = None
        for info in z.infolist():
            try:
                nombre = info.filename.encode("cp437").decode("utf-8")
            except (UnicodeDecodeError, UnicodeEncodeError):
                nombre = info.filename
            if normaliza(nombre) == "consultas.csv":
                destino = info
                break
        if destino is None:
            sys.exit(f"{ruta_zip} no contiene Consultas.csv. ¿Es un export de Rendimiento?")
        texto = z.read(destino).decode("utf-8-sig")

    filas = {}
    for fila in csv.DictReader(io.StringIO(texto)):
        valores = list(fila.values())
        filas[normaliza(valores[0])] = {
            "clics": valores[1],
            "impresiones": valores[2],
            "posicion": valores[4] if len(valores) > 4 else "",
        }
    return filas


def lunes_de(fecha: dt.date) -> str:
    return (fecha - dt.timedelta(days=fecha.weekday())).isoformat()


def registra(ruta_zip: str, semana: str) -> None:
    datos = lee_consultas(ruta_zip)
    existe = os.path.exists(HISTORIAL)
    previas = set()
    if existe:
        with io.open(HISTORIAL, encoding="utf-8") as f:
            previas = {(r["semana"], r["consulta"]) for r in csv.DictReader(f)}

    nuevas = []
    for consulta in CONSULTAS:
        if (semana, consulta) in previas:
            continue
        fila = datos.get(consulta)
        nuevas.append({
            "semana": semana,
            "consulta": consulta,
            # Sin fila = la consulta no tuvo ni una impresion esa semana. Se
            # registra vacio, que no es lo mismo que posicion 0.
            "posicion": fila["posicion"] if fila else "",
            "impresiones": fila["impresiones"] if fila else "0",
            "clics": fila["clics"] if fila else "0",
        })

    if not nuevas:
        print(f"La semana {semana} ya estaba registrada. Nada que hacer.")
        return

    with io.open(HISTORIAL, "a", encoding="utf-8", newline="") as f:
        escritor = csv.DictWriter(f, fieldnames=COLUMNAS)
        if not existe:
            escritor.writeheader()
        escritor.writerows(nuevas)

    con_datos = sum(1 for n in nuevas if n["posicion"])
    print(f"Semana {semana}: {len(nuevas)} consultas registradas, {con_datos} con impresiones.")
    for n in nuevas:
        if n["posicion"]:
            print(f"  {n['posicion']:>6}  {n['impresiones']:>4} impr.  {n['consulta']}")


def tendencia() -> None:
    if not os.path.exists(HISTORIAL):
        sys.exit("Todavia no hay historial. Registra al menos una semana.")
    with io.open(HISTORIAL, encoding="utf-8") as f:
        filas = list(csv.DictReader(f))

    semanas = sorted({r["semana"] for r in filas})
    print("consulta".ljust(56) + "".join(s[5:].rjust(8) for s in semanas))
    for consulta in CONSULTAS:
        por_semana = {r["semana"]: r["posicion"] for r in filas if r["consulta"] == consulta}
        celdas = "".join((por_semana.get(s) or "-").rjust(8) for s in semanas)
        print(consulta[:55].ljust(56) + celdas)
    print("\n'-' = sin impresiones esa semana. Posicion mas baja = mejor.")


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("zip", nargs="?", help="export de Rendimiento de Search Console (.zip)")
    p.add_argument("--semana", help="lunes de la semana medida (AAAA-MM-DD)")
    p.add_argument("--tendencia", action="store_true", help="imprime la serie y sale")
    args = p.parse_args()

    if args.tendencia:
        return tendencia()
    if not args.zip:
        p.error("falta la ruta del .zip (o usa --tendencia)")
    registra(args.zip, args.semana or lunes_de(dt.date.today()))


if __name__ == "__main__":
    main()
