# Portfolio — Javier Botella Muñoz

Portfolio personal desplegado en GitHub Pages dentro del mismo repo de perfil (`JaviBot00/JaviBot00`).

**URL:** `https://javibot00.github.io/JaviBot00/`

---

## Estructura del proyecto

```cmd
/
├── index.html              # Punto de entrada. HTML semántico, sin lógica.
│
├── css/
│   ├── tokens.css          # Variables CSS: colores, fuentes, radios, transiciones
│   ├── reset.css           # Normalización, base body, scrollbar
│   ├── layout.css          # Nav, contenedor, secciones, footer, botones globales
│   ├── animations.css      # Keyframes y clases .reveal
│   ├── hero.css            # Sección hero (icono de marca en vez de terminal)
│   ├── about.css           # Sección "Sobre mí", avatar, stats
│   ├── stack.css           # Tags de tecnologías
│   ├── experience.css      # Timeline colapsable de experiencia
│   ├── education.css       # Grid de tarjetas de formación
│   ├── projects.css        # Grid de proyectos y tarjetas
│   ├── contact.css         # Formulario y links de contacto
│   └── responsive.css      # Media queries (≤900px y ≤600px)
│
├── js/
│   ├── i18n.js             # Sistema de internacionalización (ES/EN)
│   ├── animations.js       # Scroll reveal, nav activo por scroll
│   └── main.js             # Orquestador: tema, renders dinámicos, formulario
│
├── locales/
│   ├── es.json             # Todos los textos en español
│   └── en.json             # Todos los textos en inglés
│
├── assets/
│   ├── SPEC.md             # Especificación de marca (paleta, tipografía, logo)
│   ├── icon-96.svg         # Icono de marca (nav, hero, favicon base)
│   ├── favicon-24.svg
│   ├── banner-dark.svg     # Banner del README de perfil (modo oscuro)
│   ├── banner-light.svg    # Banner del README de perfil (modo claro)
│   └── foto.jpg            # ⚠️ Pendiente — ver sección "Foto" más abajo
│
└── docs/
    └── CV_Javier_Botella.pdf   # CV descargable
```

---

## Funcionalidades

| Feature                                               | Dónde está                                                |
|-------------------------------------------------------|-----------------------------------------------------------|
| Tema oscuro / claro (icono sol/luna, sin JS ni emoji) | `css/layout.css` `.theme-toggle` + `js/main.js` → `Theme` |
| Bilingüe ES / EN                                      | `js/i18n.js` + `locales/*.json`                           |
| Scroll reveal                                         | `js/animations.js` → `initReveal`                         |
| Timeline expandible                                   | `js/main.js` → `toggleTimeline`                           |
| Nav activo por scroll                                 | `js/animations.js` → `initNavHighlight`                   |
| Formulario de contacto                                | `js/main.js` → `initContactForm`                          |

**Nota:** `#stack` ya no es una sección de nivel superior en el nav. Vive como subsección justo debajo de `#about` (`.subsection` en `css/layout.css`) para no repetir el patrón `section-label` + `section-title` seis veces seguidas. Si en el futuro se separa de nuevo, hay que devolverle su entrada en `nav.about` (locales) y en `<ul class="nav-links">`.

---

## Cómo actualizar contenido

### Textos

Edita los archivos `locales/es.json` y `locales/en.json`. El JS los carga en tiempo de ejecución; no hace falta tocar el HTML.

### Proyectos

Añade o modifica el array `projects.items` en ambos JSON:

```json
{
  "name": "Nombre del proyecto",
  "subtitle": "Subtítulo técnico",
  "description": "Descripción breve.",
  "tags": ["Java", "Docker"],
  "links": [
    { "label": "GitHub", "url": "https://github.com/JaviBot00/repo" }
  ]
}
```

### Experiencia

Array `experience.jobs` en ambos JSON. El orden del array es el orden del timeline.

### Foto

1. Copia tu foto a `assets/foto.jpg` (la carpeta `assets/` ya existe — contiene `SPEC.md` y los assets de marca, no la crees de nuevo)
2. En `index.html`, dentro de `#about`, descomenta la línea `<img ...>` y comenta/elimina el bloque `.about-avatar-placeholder`

### CV

Reemplaza `docs/CV_Javier_Botella.pdf` con la versión actualizada. El nombre del archivo se puede cambiar en el `href` del botón en `index.html`.

### Colores de acento

La paleta viene de `assets/SPEC.md` (marca oficial JBotella): `--accent: #cc2222` sobre `--bg: #0e0e0e`. No cambies `--accent` sin revisar antes el SPEC — es la misma paleta usada en el README de perfil, el CV y los assets (banner, icono, favicon). Si algún día se actualiza el color de marca, el cambio empieza en `assets/SPEC.md`, no aquí.

---

## Formulario de contacto (configuración)

El formulario por defecto simula el envío. Para activarlo con un servicio real:

### Opción A — Formspree (gratuito, sin backend)

1. Crea cuenta en [formspree.io](https://formspree.io)
2. Crea un formulario y copia tu endpoint (`https://formspree.io/f/XXXXXXXX`)
3. En `js/main.js`, función `initContactForm`, descomenta el bloque `fetch` y sustituye `YOUR_ID`

### Opción B — EmailJS

1. Crea cuenta en [emailjs.com](https://emailjs.com)
2. Sigue su documentación para obtener `serviceID`, `templateID` y `publicKey`
3. Añade su SDK en `index.html` y llámalo desde `initContactForm`

---

## Despliegue en GitHub Pages

El portfolio vive en el mismo repo que el README de perfil (`JaviBot00/JaviBot00`).

### Configuración necesaria (una sola vez)

1. Ve a **Settings → Pages** en el repo
2. Source: `Deploy from a branch`
3. Branch: `main` / `(root)`
4. Guarda → GitHub Pages publicará automáticamente en cada push

### Coexistencia con el README de perfil

GitHub Pages sirve `index.html` desde la raíz del repo. El `README.md` lo usa GitHub para el perfil. No se pisan: son dos cosas distintas.

Si el repo ya tiene un `index.html` de otro contenido, mueve ese contenido a una subcarpeta y ajusta las rutas.

---

## Tecnologías utilizadas

- **HTML5** semántico con atributos ARIA
- **CSS3**: custom properties, grid, flexbox, `backdrop-filter`, `IntersectionObserver`-friendly
- **JavaScript ES6+**: módulos IIFE, `async/await`, `IntersectionObserver`, `fetch`
- Sin frameworks, sin dependencias, sin build step

---

## Checklist pre-deploy

- [ ] CV actualizado en `docs/`
- [ ] Foto añadida en `assets/foto.jpg` y activada en `index.html` (placeholder "JB" sigue activo)
- [ ] Formulario conectado a Formspree / EmailJS
- [ ] `og:url` en `index.html` apunta a la URL real
- [ ] Dominio `javierb.dev` — cuando esté activo, actualizar el link "Portfolio" en el `README.md` raíz (hoy apunta a `javibot00.github.io/JaviBot00`)
- [ ] Badge de LinkedIn en `README.md` raíz usa `custom-icon-badges.demolab.com` (mirror de terceros, no `img.shields.io`) por un bug conocido de Simple Icons con fondos no oficiales — si deja de responder, sustituir por SVG propio en `assets/`
- [ ] Revisado en móvil (Chrome DevTools → responsive)
- [ ] Revisado con `prefers-reduced-motion` activado
- [ ] Revisado en modo claro y oscuro
