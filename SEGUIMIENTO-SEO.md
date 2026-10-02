# Seguimiento semanal — calculadora de pensión

> **Qué se mide:** la **posición** de `/calculadora-pension` en sus consultas cabeza.
> **Qué no se mide como señal:** los clics.
>
> Entre mayo y septiembre de 2026 la calculadora sumó **3 clics en 22 semanas**. Una
> semana con 1 clic y la siguiente con 0 no es una caída del 100 %, es ruido. La posición
> media sí se mueve de forma legible semana a semana, y se movió antes que los clics
> cuando la página se hundió en mayo: la posición ya estaba en 33 el 10 de mayo, cuando
> los clics todavía podían pasar por casualidad.
>
> Los clics se miran una vez al mes, como confirmación, no como señal semanal.

---

## Rutina de los lunes (5 minutos)

1. Search Console → **Rendimiento** → *Resultados de búsqueda*.
2. Filtro **Página** → *URL exacta* → `https://acuerdalo.cl/calculadora-pension`.
3. **Fecha** → *Personalizado* → lunes a domingo de la semana que acaba de cerrar.
4. Pestaña **Consultas** → botón **EXPORTAR** → *Descargar CSV* (baja un `.zip`).
5. En este repositorio:

```bash
python3 scripts/seo-posiciones.py ~/Downloads/acuerdalo.cl-Performance-on-Search-AAAA-MM-DD.zip
```

El script añade una fila por consulta seguida a `seo-posiciones.csv`. Es idempotente: si
se repite la misma semana, avisa y no duplica. Para ver la serie completa:

```bash
python3 scripts/seo-posiciones.py --tendencia
```

El `.zip` descargado no hace falta guardarlo: el histórico vive en el CSV.

> ⚠️ **El filtro de página importa.** Sin él, el export mezcla la calculadora con las
> guías de divorcio, que están en posición 70-90 y arrastran la media hacia abajo. La
> "posición media del sitio" de 48 en mayo no describe a ninguna página real.

---

## Línea base (export del 2 de octubre de 2026, 12 meses)

Posición de las consultas que se siguen. Son los números con los que hay que comparar las
primeras semanas tras el deploy de octubre.

| Consulta | Impresiones | Posición |
|---|---:|---:|
| calculadora de pensión de alimentos chile | 116 | 7,7 |
| calculadora de pensión de alimentos | 84 | 12,0 / 37,7 ⁽¹⁾ |
| calculo pension alimentos | 17 | 39,8 |
| calcular pension de alimentos | 52 | 21,2 |
| **porcentaje de pensión alimenticia por 3 hijos** | 28 | **9,2** |
| **porcentaje de pensión alimenticia por 1 hijos** | 7 | **4,3** |
| porcentaje de pensión alimenticia por 2 hijos | 5 | 35,4 |
| **cuanto debe pagar de pension alimenticia segun su sueldo** | 10 | **1,0** |
| **cálculo pensión alimenticia según sueldo** | 7 | **1,0** |
| **tabla para calcular pension de alimentos** | 4 | **1,8** |
| como se saca el porcentaje de pension alimenticia | 6 | 3,0 |

⁽¹⁾ Google reporta por separado la consulta con tilde y sin tilde. El script las normaliza
al registrar, pero en la interfaz aparecen como dos filas.

**Página completa:** 4.209 impresiones, 60 clics, posición media 8,81 (12 meses).

### Cómo leer las posiciones 1-3 con pocas impresiones

Las cuatro consultas en negrita con posición ≈1 tienen entre 4 y 10 impresiones. Una
posición 1 sobre 4 impresiones no significa "estamos primeros": significa que esa consulta
se buscó 4 veces, probablemente de forma muy específica y con poca competencia, y ahí
salimos arriba. **No** son victorias consolidadas.

Lo que sí es señal es el **patrón**: de las 255 consultas del export, 99 están en posición
10 o mejor, y **50 de ellas** son de la familia "porcentaje / según sueldo / tabla / cuánto
por N hijos", con pocas impresiones cada una. Sumadas valen más que la consulta cabeza, y es el tipo de demanda
que una página con tablas y respuestas directas puede capturar sin pelear contra bcn.cl.
Por eso se siguen como grupo, no una a una.

---

## Umbrales de decisión

Marcas para no quedarse mirando el gráfico sin decidir nada.

| Cuándo | Qué mirar | Qué hacer |
|---|---|---|
| **Semanas 1-2** tras el deploy | ¿Google volvió a rastrear? Inspección de URL → *Último rastreo* | Si sigue con fecha vieja, solicitar indexación otra vez |
| **Semanas 2-4** | "calculadora de pensión de alimentos chile" | Si no se mueve de 7-8, el problema no era el título |
| **Semanas 4-8** | Las consultas de cola larga de la tabla | Si suben y suman impresiones, las secciones funcionan |
| **Semanas 8-12** | Impresiones de la página completa | Volver a ~2.000/mes sería recuperar el nivel de abril |
| **Cualquier momento** | Una sección de cola larga pasa de ~150 impresiones/mes de forma sostenida | Ahí sí conviene sacarla a página propia (ver PLAN-SEO.md, Fase 5) |

---

## Histórico

`seo-posiciones.csv` — una fila por semana y consulta, generada por el script. Se versiona
en el repositorio a propósito: es el único registro de posiciones que sobrevive a los
16 meses de retención de Search Console.
