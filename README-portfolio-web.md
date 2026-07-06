# Portfolio — Javier Botella Muñoz

Personal portfolio deployed on GitHub Pages inside the profile repo itself (`JaviBot00/JaviBot00`).

**URL:** `https://javibot00.github.io/JaviBot00/`

---

## Project structure

```cmd
/
├── index.html              # Entry point. Semantic HTML, no logic.
│
├── css/
│   ├── tokens.css          # CSS variables: colors, fonts, radii, transitions
│   ├── reset.css           # Normalization, base body, scrollbar
│   ├── layout.css          # Nav, container, sections, footer, global buttons
│   ├── animations.css      # Keyframes and .reveal classes
│   ├── hero.css            # Hero section (brand icon instead of terminal)
│   ├── about.css           # "About" section, avatar, stats
│   ├── stack.css           # Technology tags
│   ├── experience.css      # Collapsible experience timeline
│   ├── education.css       # Education card grid
│   ├── projects.css        # Project grid and cards
│   ├── contact.css         # Form and contact links
│   └── responsive.css      # Media queries (≤900px and ≤600px)
│
├── js/
│   ├── i18n.js             # Internationalization system (ES/EN)
│   ├── animations.js       # Scroll reveal, scroll-based active nav
│   └── main.js             # Orchestrator: theme, dynamic renders, form
│
├── locales/
│   ├── es.json             # All content, Spanish
│   └── en.json             # All content, English
│
├── assets/
│   ├── SPEC.md             # Brand spec (palette, typography, logo)
│   ├── icon-96.svg         # Brand icon (nav, hero, favicon base)
│   ├── favicon-24.svg
│   ├── banner-dark.svg     # Profile README banner (dark mode)
│   ├── banner-light.svg    # Profile README banner (light mode)
│   └── foto.jpg            # ⚠️ Pending — see "Photo" section below
│
└── docs/
    └── CV_Javier_Botella.pdf   # Downloadable CV
```

---

## Features

| Feature | Where |
|---|---|
| Dark / light theme (sun/moon icon, no JS or emoji) | `css/layout.css` `.theme-toggle` + `js/main.js` → `Theme`|
| Bilingual ES / EN                                  | `js/i18n.js` + `locales/*.json`                          |
| Scroll reveal                                      | `js/animations.js` → `initReveal`                        |
| Expandable timeline                                | `js/main.js` → `toggleTimeline`                          |
| Scroll-based active nav                            | `js/animations.js` → `initNavHighlight`                  |
| Contact form                                       | `js/main.js` → `initContactForm`                         |

**Note:** `#stack` is no longer a top-level nav section. It lives as a subsection directly under `#about` (`.subsection` in `css/layout.css`) to avoid repeating the `section-label` + `section-title` pattern six times in a row. If it's ever split out again, restore its entry in `nav.about` (locales) and in `<ul class="nav-links">`.

---

## How to update content

### Text

Edit `locales/es.json` and `locales/en.json`. The JS loads them at runtime — no need to touch the HTML.

### Projects

Add or edit the `projects.items` array in both JSON files:

```json
{
  "name": "Project name",
  "subtitle": "Technical subtitle",
  "description": "Short description.",
  "tags": ["Java", "Docker"],
  "links": [
    { "label": "GitHub", "url": "https://github.com/JaviBot00/repo" }
  ]
}
```

### Experience

`experience.jobs` array in both JSON files. Array order is timeline order.

### Photo

1. Copy your photo to `assets/foto.jpg` (the `assets/` folder already exists — it holds `SPEC.md` and the brand assets, don't recreate it)
2. In `index.html`, inside `#about`, uncomment the `<img ...>` line and comment out / remove the `.about-avatar-placeholder` block

### CV

Replace `docs/CV_Javier_Botella.pdf` with the updated version. The filename can be changed in the button's `href` in `index.html`.

### Accent colors

The palette comes from `assets/SPEC.md` (official JBotella brand): `--accent: #cc2222` on `--bg: #0e0e0e`. Don't change `--accent` without checking `SPEC.md` first — it's the same palette used in the profile README, the CV, and the brand assets (banner, icon, favicon). If the brand color is ever updated, the change starts in `assets/SPEC.md`, not here.

---

## Contact form (setup)

The form simulates submission by default. To wire it up to a real service:

### Option A — Formspree (free, no backend)

1. Create an account at [formspree.io](https://formspree.io)
2. Create a form and copy your endpoint (`https://formspree.io/f/XXXXXXXX`)
3. In `js/main.js`, `initContactForm` function, uncomment the `fetch` block and replace `YOUR_ID`

### Option B — EmailJS

1. Create an account at [emailjs.com](https://emailjs.com)
2. Follow their docs to get `serviceID`, `templateID` and `publicKey`
3. Add their SDK in `index.html` and call it from `initContactForm`

---

## GitHub Pages deployment

The portfolio lives in the same repo as the profile README (`JaviBot00/JaviBot00`).

### One-time setup

1. Go to **Settings → Pages** in the repo
2. Source: `Deploy from a branch`
3. Branch: `main` / `(root)`
4. Save → GitHub Pages will publish automatically on every push

### Coexistence with the profile README

GitHub Pages serves `index.html` from the repo root. GitHub uses `README.md` for the profile page. They don't collide: they're two separate things.

If the repo already has an `index.html` with other content, move that content into a subfolder and adjust the paths.

---

## Technologies used

- **HTML5** semantic, with ARIA attributes
- **CSS3**: custom properties, grid, flexbox, `backdrop-filter`, `IntersectionObserver`-friendly
- **JavaScript ES6+**: IIFE modules, `async/await`, `IntersectionObserver`, `fetch`
- No frameworks, no dependencies, no build step

---

## Pre-deploy checklist

- [ ] Photo added at `assets/foto.jpg` and enabled in `index.html` ("JB" placeholder is still active)
- [ ] `og:url` in `index.html` points to the real URL
- [ ] `javierb.dev` domain — once active, update the "Portfolio" link in the root `README.md` (currently points to `javibot00.github.io/JaviBot00`)
- [ ] Checked with `prefers-reduced-motion` enabled
- [ ] Checked in both light and dark mode
