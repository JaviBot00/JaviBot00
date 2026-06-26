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
│   ├── hero.css            # Sección hero y terminal decorativa
│   ├── about.css           # Sección "Sobre mí", avatar, stats
│   ├── stack.css           # Tags de tecnologías
│   ├── experience.css      # Timeline colapsable de experiencia
│   ├── projects.css        # Grid de proyectos y tarjetas
│   ├── contact.css         # Formulario y links de contacto
│   └── responsive.css      # Media queries (≤900px y ≤600px)
│
├── js/
│   ├── i18n.js             # Sistema de internacionalización (ES/EN)
│   ├── animations.js       # Typing effect, scroll reveal, nav activo
│   └── main.js             # Orquestador: tema, renders dinámicos, formulario
│
├── locales/
│   ├── es.json             # Todos los textos en español
│   └── en.json             # Todos los textos en inglés
│
└── docs/
    └── CV_Javier_Botella.pdf   # CV descargable
```

---

## Funcionalidades

| Feature               | Dónde está                              |
|-----------------------|-----------------------------------------|
| Tema oscuro / claro   | `js/main.js` → `Theme`                  |
| Bilingüe ES / EN      | `js/i18n.js` + `locales/*.json`         |
| Typing animation      | `js/animations.js` → `startTyping`      |
| Scroll reveal         | `js/animations.js` → `initReveal`       |
| Timeline expandible   | `js/main.js` → `toggleTimeline`         |
| Nav activo por scroll | `js/animations.js` → `initNavHighlight` |
| Formulario de contacto| `js/main.js` → `initContactForm`        |

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

1. Copia tu foto a `assets/foto.jpg` (crea la carpeta `assets/`)
2. En `index.html`, dentro de `#about`, descomenta la línea `<img ...>` y comenta/elimina el bloque `.about-avatar-placeholder`

### CV

Reemplaza `docs/CV_Javier_Botella.pdf` con la versión actualizada. El nombre del archivo se puede cambiar en el `href` del botón en `index.html`.

### Colores de acento

Cambia `--accent` en `css/tokens.css`. El resto de variables derivadas (`--accent-dim`, `--accent-glow`, `--accent-subtle`) se calculan visualmente; ajústalas si cambias mucho el color base.

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
- [ ] Foto añadida en `assets/` y activada en `index.html` (opcional)
- [ ] Formulario conectado a Formspree / EmailJS
- [ ] `og:url` en `index.html` apunta a la URL real
- [ ] Revisado en móvil (Chrome DevTools → responsive)
- [ ] Revisado con `prefers-reduced-motion` activado
- [ ] Revisado en modo claro y oscuro
