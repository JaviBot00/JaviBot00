# JBotella — Brand Identity SPEC

**Version:** 1.4
**Primary alias:** `JBotella`
**Package alias:** `jbotella` (all lowercase)
**Web domain:** `javierb.dev`
**Slogan:** *Backend by default. Full-stack by choice.*

---

## Color palette

| Token         | Hex       | Usage                         |
|---------------|-----------|-------------------------------|
| `--bg-base`   | `#0e0e0e` | Main background (dark)        |
| `--bg-white`  | `#ffffff` | Main background (light)       |
| `--bg-key`    | `#1e1e1e` | Keycap top face               |
| `--bg-inner`  | `#161616` | Bevel interior                |
| `--accent`    | `#cc2222` | Cursor `_`, red lines, slogan |
| `--text`      | `#f0f0f0` | Name and monogram (dark)      |
| `--text-dark` | `#0e0e0e` | Name (light)                  |
| `--bevel`     | `#444444` | Bevel diagonals               |
| `--border`    | `#333333` | Inner rect border             |

---

## Typography

| Usage          | Stack                                               | Weight | Size    |
|----------------|-----------------------------------------------------|--------|---------|
| Banner / name  | 'Courier New', 'Monaco', 'Menlo', 'Consolas', mono  | 700    | 100px   |
| Slogan         | same                                                | 400    | 40px    |
| UI / portfolio | Fira Code                                           | 400    | —       |
| Body text      | Inter                                               | 400    | —       |

---

## Typographic banner — `banner-dark.svg` / `banner-light.svg`

**ViewBox:** `0 0 1032 265`
**Exported size:** 1032 × 265px

### Structure

1. **Name** `JBotella` — x=516 y=108, font-size 100, bold, text-anchor middle
2. **Red lines** — y=141, height=3, fill `#cc2222`
   - Left: x=37, width=217
   - Right: x=778, width=217
3. **Slogan** — x=516 y=214, font-size 40, text-anchor middle, fill `#cc2222`

### Line calibration (v1.2 — measured by pixel analysis, not estimated)

> **History:** v1.1 used hand-calculated coordinates from a Courier New advance-width ratio (`x=239/730 width=63`, 26px slogan). Comparing that version against the real screenshot approved by the user, the error was substantial: the real lines are 3.4× longer and the real slogan is 54% larger. v1.1 was never validated against a real render, only calculated.
>
> **v1.2 — values measured directly on `Screenshot_From_2026-07-01_20-55-29.png` (1032×265px, same resolution as the viewBox):**
>
> - Lines: row band 141–144px, columns 37–254 (left) and 778–994 (right) → x=37/778, width=217, height=3
> - Slogan: row band 186–223px, columns 23–1002 → font-size≈40px (41 characters × 0.60 Courier ratio), baseline y≈214
> - Name: columns 275–759, rows 34–108 → confirms font-size 100, unchanged
>
> **Hierarchy verification (name vs. slogan):** real ink density (painted pixels, not bounding box) — name 12,478px vs slogan 5,557px → ratio 0.445 (the name weighs 2.24× more). Even though the slogan at 40px occupies a similar bounding-box area to the name, the combination of bold vs. regular weight + maximum-contrast white vs. accent red keeps the name as the dominant element. The slogan does not compete for hierarchy.
>
> If the font falls back to Monaco/Menlo/Consolas, alignment may vary slightly — acceptable within ±10px.
> To recalibrate in the future: render the actual SVG (don't hand-estimate) and measure the bounding box via pixel analysis, as done here — don't repeat the v1.1 mistake.

---

## Icon / Avatar — `icon-96.svg`

**ViewBox:** `0 0 96 96` — square, scale with CSS (`width`/`height`)

### Layers (background → front)

1. Background `rx=18` fill `#0e0e0e`
2. Keycap face `x=4 y=4 w=88 h=88 rx=14` fill `#1e1e1e`
3. Bevel interior `x=14 y=14 w=68 h=68 rx=7` fill `#161616` stroke `#333` 0.5px
4. Bevel diagonals — 4 lines, 1.5px stroke, starting 9px from each corner vertex, stroke `#444`
5. JB monogram — stroke `#f0f0f0` 3px
6. Cursor `_` — stroke `#cc2222` 3px

### JB monogram — coordinates (96px viewBox)

```cmd
J  left serif  x1=27,y1=31 → x2=34,y2=31
   stem        x1=34,y1=31 → x2=34,y2=52
   tail        M34,52 Q34,63 27,63 Q22,63 21,59

B  stem        x1=43,y1=31 → x2=43,y2=63
   upper arc   M43,31 Q54,31 54,39 Q54,47 43,47
   lower arc   M43,47 Q56,47 56,55 Q56,63 43,63

_  cursor      x1=58,y1=63 → x2=68,y2=63  stroke #cc2222
```

---

## Favicon — `favicon-24.svg`

At 24px the monogram is illegible. Cursor only, centered on the keycap.

Reuses the same background layers as `icon-96.svg` (base rect, shadow, face, interior bevel) but without the JB monogram or the corner diagonals.

**Intentional divergence:** the interior bevel uses `stroke #444` `1px` (not `#333` `0.5px` as in `icon-96.svg`). The heavier stroke compensates for lost contrast at 24px — this is a deliberate choice, not an oversight. Do not homogenize with the base icon if reviewed in the future.

```cmd
<line x1="24" y1="65" x2="72" y2="65" stroke="#cc2222" stroke-width="7" stroke-linecap="round"/>
```

---

## Usage table

| Context               | File                 | Notes                                   |
|-----------------------|----------------------|-----------------------------------------|
| GitHub avatar         | `icon-96.svg`        | Scale to 96×96 or 400×400               |
| Web favicon           | `favicon-24.svg`     | Convert to `.ico` with RealFavicon      |
| Portfolio header      | `banner-dark.svg`    | Embed inline or via `<img>`             |
| Light background      | `banner-light.svg`   | —                                       |
| Email signature       | `banner-dark.svg`    | Transparent background: remove `<rect>` |
| npm/maven packaging   | text `jbotella`      | No SVG                                  |

---

## Changelog

- **v1.4** — Corrected the bevel diagonal measurements in `icon-96.svg` documentation (1.5px stroke starting 9px from each vertex, not "~3px" starting at a "5px gap" — the old values were never measured against the actual file). Documented the intentional divergence between `favicon-24.svg`'s interior bevel stroke (`#444` 1px) and `icon-96.svg`'s (`#333` 0.5px) so it isn't mistaken for an inconsistency to "fix" later.
- **v1.3** — Corrected documented file names: the SPEC referred to `jbotella-banner-dark.svg` etc. with a prefix, but the real files in `assets/` never had it. The root README and `index.html` already used the real names; the SPEC was updated to match, not the other way around.
- **v1.2** — Recalibrated the red lines and slogan of the wordmark (`banner-dark.svg` / `banner-light.svg`) by pixel measurement against the user-approved screenshot, instead of manual estimation. `icon-96.svg` and `favicon-24.svg` were not modified at that time — there was no reference screenshot for them.
- **v1.1** — Version with line coordinates and slogan size estimated by hand (deprecated; see calibration note above).

## Constraints

- Do not let the red lines extend beyond the slogan's width
- Do not change `#cc2222` without checking WCAG contrast
- Do not use a font other than Courier New as the first choice in the stack
- Do not embed the SVG as `<img>` if JS is added to it in the future
- The red lines **must not exceed the slogan's width**
