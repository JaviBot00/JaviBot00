# JBotella — Brand Identity SPEC

**Versión:** 1.2  
**Alias principal:** `JBotella`  
**Alias paquetería:** `jbotella` (todo minúscula)  
**Dominio web:** `javierb.dev`  
**Eslogan:** *Backend by default. Full-stack by choice.*

---

## Paleta de color

| Token         | Hex       | Uso                                  |
|---------------|-----------|--------------------------------------|
| `--bg-base`   | `#0e0e0e` | Fondo principal (dark)               |
| `--bg-white`  | `#ffffff` | Fondo principal (light)              |
| `--bg-key`    | `#1e1e1e` | Cara superior tecla                  |
| `--bg-shadow` | `#2a2a2a` | Sombra inferior tecla (efecto 3D)    |
| `--bg-inner`  | `#161616` | Interior bisel                       |
| `--accent`    | `#cc2222` | Cursor `_`, líneas rojas, eslogan    |
| `--text`      | `#f0f0f0` | Nombre y monograma (dark)            |
| `--text-dark` | `#0e0e0e` | Nombre (light)                       |
| `--bevel`     | `#444444` | Diagonales bisel                     |
| `--border`    | `#333333` | Borde rect interior                  |

---

## Tipografía

| Uso               | Stack                                              | Peso | Tamaño   |
|-------------------|----------------------------------------------------|------|----------|
| Banner / nombre   | 'Courier New', 'Monaco', 'Menlo', 'Consolas', mono | 700  | 100px    |
| Eslogan           | ídem                                               | 400  | 40px     |
| UI / portfolio    | Fira Code                                          | 400  | —        |
| Cuerpo texto      | Inter                                              | 400  | —        |

---

## Banner tipográfico — `jbotella-banner-dark.svg` / `jbotella-banner-light.svg`

**ViewBox:** `0 0 1032 265`  
**Tamaño exportado:** 1032 × 265px

### Estructura

1. **Nombre** `JBotella` — x=516 y=108, font-size 100, bold, text-anchor middle
2. **Líneas rojas** — y=141, height=3, fill `#cc2222`
   - Izquierda: x=37, width=217
   - Derecha: x=778, width=217
3. **Eslogan** — x=516 y=214, font-size 40, text-anchor middle, fill `#cc2222`

### Calibración de líneas (v1.2 — medida por análisis de píxeles, no estimada)

> **Historial:** v1.1 usaba coordenadas calculadas a mano desde un ratio de avance de Courier New (`x=239/730 width=63`, eslogan 26px). Al comparar esa versión contra la captura de pantalla real aprobada por el usuario, el error fue sustancial: las líneas reales son 3.4× más largas y el eslogan real es 54% más grande. v1.1 nunca fue validada contra un render real, solo calculada.
>
> **v1.2 — valores medidos directamente sobre `Screenshot_From_2026-07-01_20-55-29.png` (1032×265px, misma resolución que el viewBox):**
> - Líneas: banda de filas 141–144px, columnas 37–254 (izq.) y 778–994 (der.) → x=37/778, width=217, height=3
> - Eslogan: banda de filas 186–223px, columnas 23–1002 → font-size≈40px (41 caracteres × 0.60 ratio Courier), baseline y≈214
> - Nombre: columnas 275–759, filas 34–108 → confirma font-size 100 sin cambios
>
> **Verificación de jerarquía (nombre vs. eslogan):** densidad de tinta real (píxeles pintados, no bounding box) — nombre 12,478px vs eslogan 5,557px → ratio 0.445 (el nombre pesa 2.24× más). Pese a que el eslogan a 40px ocupa un área de caja similar a la del nombre, la combinación de bold vs. regular + blanco de máximo contraste vs. rojo de acento mantiene al nombre como elemento dominante. El eslogan no compite en jerarquía.
>
> Si la fuente cae a Monaco/Menlo/Consolas el alineado puede variar ligeramente — aceptable dentro de ±10px.  
> Para recalibrar en el futuro: renderizar el SVG real (no estimar a mano) y medir el bbox por análisis de píxeles, como se hizo aquí — no repetir el error de v1.1.

---

## Icono / Avatar — `jbotella-icon-96.svg`

**ViewBox:** `0 0 96 96` — cuadrado, escalar con CSS (`width`/`height`)

### Capas (fondo → frente)

1. Fondo `rx=18` fill `#0e0e0e`
2. Sombra tecla `x=4 y=8 w=88 h=88 rx=14` fill `#2a2a2a`
3. Cara tecla `x=4 y=4 w=88 h=88 rx=14` fill `#1e1e1e`
4. Interior bisel `x=14 y=14 w=68 h=68 rx=7` fill `#161616` stroke `#333` 0.5px
5. Diagonales bisel — 4 líneas ~3px con gap de 5px desde cada vértice, stroke `#444`
6. Monograma JB — stroke `#f0f0f0` 3px
7. Cursor `_` — stroke `#cc2222` 3px

### Monograma JB — coordenadas (viewBox 96px)

```cmd
J  serif izq  x1=27,y1=31 → x2=34,y2=31
   palo        x1=34,y1=31 → x2=34,y2=52
   rabillo     M34,52 Q34,63 27,63 Q22,63 21,59

B  palo        x1=43,y1=31 → x2=43,y2=63
   arco sup    M43,31 Q54,31 54,39 Q54,47 43,47
   arco inf    M43,47 Q56,47 56,55 Q56,63 43,63

_  cursor      x1=58,y1=63 → x2=68,y2=63  stroke #cc2222
```

---

## Favicon — `jbotella-favicon-24.svg`

A 24px el monograma es ilegible. Solo cursor rojo centrado en la tecla:

```cmd
<line x1="24" y1="65" x2="72" y2="65" stroke="#cc2222" stroke-width="7" stroke-linecap="round"/>
```

---

## Tabla de usos

| Contexto              | Archivo                          | Notas                              |
|-----------------------|----------------------------------|------------------------------------|
| GitHub avatar         | `jbotella-icon-96.svg`           | Escalar a 96×96 o 400×400          |
| Favicon web           | `jbotella-favicon-24.svg`        | Convertir a `.ico` con RealFavicon |
| Cabecera portfolio    | `jbotella-banner-dark.svg`       | Embeber inline o `<img>`           |
| Fondo claro           | `jbotella-banner-light.svg`      | —                                  |
| Firma email           | `jbotella-banner-dark.svg`       | Fondo transparente: quitar `<rect>`|
| Paquetería npm/maven  | texto `jbotella`                 | Sin SVG                            |

---

## Changelog

- **v1.2** — Recalibradas las líneas rojas y el eslogan del wordmark (`jbotella-banner-dark.svg` / `jbotella-banner-light.svg`) por medición de píxeles contra la captura aprobada por el usuario, en lugar de estimación manual. `jbotella-icon-96.svg` y `jbotella-favicon-24.svg` no se modificaron — no hay captura de referencia para ellos.
- **v1.1** — Versión con coordenadas de líneas y tamaño de eslogan estimados manualmente (deprecada; ver nota de calibración arriba).

## Restricciones

- No sobrepasar las líneas rojas por encima del eslogan
- No cambiar `#cc2222` sin revisar contraste WCAG
- No usar fuente distinta a Courier New como primera opción del stack
- No embeber el SVG como `<img>` si se añade JS en el futuro
- Las líneas rojas **no deben sobrepasar el ancho del eslogan**
