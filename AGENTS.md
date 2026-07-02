# AGENTS.md

## What this is

Personal portfolio website for Javier Botella Muñoz. Pure HTML/CSS/JS — no build step, no frameworks, no dependencies. Deployed on GitHub Pages from the repo root.

## Structure

```
index.html              Entry point
css/tokens.css          Design tokens (colors, fonts, spacing) — load FIRST
css/                    Per-section stylesheets (loaded in index.html order)
js/i18n.js              i18n system — must load before other JS
js/animations.js        Typing effect, scroll reveal, nav highlight
js/main.js              Theme, dynamic renders, contact form
locales/es.json         All text content (Spanish)
locales/en.json         All text content (English)
assets/SPEC.md          Brand identity spec (colors, typography, SVG coords)
.agents/skills/         OpenCode skills (accessibility, frontend-design, seo)
skills-lock.json        Skill registry lockfile
```

## Key conventions

- **No build/serve needed.** Open `index.html` in a browser. Any static server works.
- **CSS load order matters.** `tokens.css` must be first; other files reference its variables.
- **JS load order matters.** `i18n.js` → `animations.js` → `main.js`. I18n initializes async before other modules.
- **Content lives in locale JSONs, not HTML.** HTML uses `data-i18n="key"` attributes. Edit `locales/*.json` to change text. The JS `I18n.get()` reads nested keys via dot notation.
- **Dynamic sections are JS-rendered.** Stack, experience, projects, education, and contact links are generated from JSON at runtime. Don't hardcode them in HTML.
- **Theme is CSS-driven.** Toggle sets `data-theme="dark|light"` on `<html>`. All theme styles use `[data-theme="light"]` selector in `css/tokens.css`.
- **Bilingual: ES/EN only.** Language detection: localStorage → browser lang → fallback to ES.

## Skills

Three OpenCode skills are registered in `skills-lock.json` and stored in `.agents/skills/`:

- **accessibility** — WCAG 2.2 audit checklist. Use when improving a11y, adding ARIA, fixing contrast, or testing keyboard navigation.
- **frontend-design** — Design quality guidelines for creating distinctive UI. Use when building or restyling components/sections.
- **seo** — Search engine optimization checklist. Use when improving meta tags, structured data, sitemaps, or crawlability.

Load a skill with the `skill` tool when the task matches its description.

## Brand spec

`assets/SPEC.md` contains the full brand identity (palette, typography, SVG coordinates). Key constraints:
- Accent color `#cc2222` is for branding assets only; the portfolio uses `#6C63FF` (defined in `css/tokens.css`).
- SVG banner coords were calibrated against a real screenshot (v1.2) — do not guess coordinates.

## Common edits

| Task | Where |
|------|-------|
| Change accent color | `css/tokens.css` → `--accent` and derived vars |
| Add/edit content text | `locales/es.json` and `locales/en.json` (keep both in sync) |
| Add a project | `projects.items` array in both locale JSONs |
| Add experience | `experience.jobs` array in both locale JSONs |
| Update CV | Replace `docs/CV_Javier_Botella.pdf` |
| Update photo | Place in `assets/`, uncomment `<img>` in `index.html` `#about` section |
| Contact form backend | Uncomment fetch block in `js/main.js` `initContactForm()` and add provider |

## Gotchas

- The contact form is simulated — no real submission unless you wire up Formspree/EmailJS.
- `renderStack()` in `js/main.js:91` has hardcoded tech categories (not from JSON). Category labels come from i18n but tag lists are static.
- The terminal content in `renderTerminal()` is static and not internationalized.
- The only CI workflow (`.github/workflows/snake.yml`) generates a snake animation SVG — it does not build or deploy the portfolio.
