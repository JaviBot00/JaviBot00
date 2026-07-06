/* ============================================================
   MAIN.JS — Orquestador principal
   Inicializa módulos, renderiza contenido dinámico,
   gestiona tema, nav móvil y formulario de contacto.
   ============================================================ */

/* ----------------------------------------------------------
   TEMA (oscuro / claro)
   Persiste en localStorage. Por defecto: oscuro.
---------------------------------------------------------- */
const Theme = (() => {
  const KEY = "jb-theme";

  function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(KEY, theme);
    // El icono (sol/luna) lo alterna CSS a partir de [data-theme], ver layout.css
  }

  function toggle() {
    const current =
      document.documentElement.getAttribute("data-theme") || "dark";
    apply(current === "dark" ? "light" : "dark");
  }

  function init() {
    const saved = localStorage.getItem(KEY) || "dark";
    apply(saved);
    document.getElementById("theme-toggle")?.addEventListener("click", toggle);
  }

  return { init };
})();

/* ----------------------------------------------------------
   NAV MÓVIL (hamburguesa)
---------------------------------------------------------- */
function initMobileNav() {
  const btn = document.getElementById("nav-menu-btn");
  const links = document.getElementById("nav-links");
  if (!btn || !links) return;

  btn.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });

  // Cierra el menú al hacer clic en un enlace
  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => links.classList.remove("open"));
  });
}

/* ----------------------------------------------------------
   RENDER: STACK TAGS
   Lee las categorías del JSON y genera los elementos del DOM.
---------------------------------------------------------- */
function renderStack() {
  const container = document.getElementById("stack-content");
  if (!container) return;

  // Datos del stack: clave de categoría → array de tecnologías
  const stackData = {
    languages: ["Java", "Kotlin", "Python", "PHP", "SQL", "Bash", "Perl"],
    backend: [
      "Spring Boot",
      "Quarkus",
      "Laravel",
      "JSF/PrimeFaces",
      "API REST",
      "Microservicios",
      "MySQL",
      "SQL Server",
      "PostgreSQL",
      "Swagger",
    ],
    mobile: [
      "Android Studio",
      "MVVM",
      "Jetpack Compose",
      "Retrofit",
      "OkHttp",
      "SQLite",
      "Hilt",
      "Coroutines",
    ],
    devops: [
      "Docker",
      "Kubernetes",
      "Jenkins",
      "Ansible",
      "CI/CD",
      "Bitbucket",
      "Git",
    ],
    observability: [
      "Wazuh",
      "Zabbix",
      "Elasticsearch",
      "Logstash",
      "Kibana",
      "Filebeat",
      "RabbitMQ",
    ],
    methods: ["SCRUM", "SOLID", "Clean Architecture", "Testing"],
  };

  const catLabels = I18n.get("stack.categories") || {};

  container.innerHTML = Object.entries(stackData)
    .map(
      ([cat, tags]) => `
    <div class="stack-category reveal">
      <div class="stack-category-title">${catLabels[cat] || cat}</div>
      <div class="stack-tags">
        ${tags
          .map(
            (t) => `
          <span class="stack-tag">
            <span class="tag-dot"></span>${t}
          </span>
        `,
          )
          .join("")}
      </div>
    </div>
  `,
    )
    .join("");
}

/* ----------------------------------------------------------
   RENDER: ABOUT STATS
   Mini tarjetas debajo del texto de "Sobre mí".
---------------------------------------------------------- */
function renderAboutStats() {
  const container = document.getElementById("about-stats");
  if (!container) return;

  const t = I18n.get("about") || {};

  const stats = [
    {
      label: I18n.current() === "es" ? "Ubicación" : "Location",
      value: t.location,
    },
    {
      label: I18n.current() === "es" ? "Formación" : "Education",
      value: t.status,
    },
    {
      label: I18n.current() === "es" ? "Idiomas" : "Languages",
      value: t.languages,
    },
    { label: "Focus", value: t.focus },
  ];

  container.innerHTML = stats
    .map(
      (s) => `
    <div class="about-stat">
      <div class="about-stat-label">${s.label}</div>
      <div class="about-stat-value">${s.value || ""}</div>
    </div>
  `,
    )
    .join("");
}

/* ----------------------------------------------------------
   RENDER: EXPERIENCE TIMELINE
   Genera el timeline desde el JSON de traducciones.
   Cada entrada es expandible/colapsable.
---------------------------------------------------------- */
function renderExperience() {
  const container = document.getElementById("timeline");
  if (!container) return;

  const jobs = I18n.get("experience.jobs") || [];

  container.innerHTML = jobs
    .map(
      (job, i) => `
    <div class="timeline-item reveal reveal-delay-${Math.min(i + 1, 4)}">
      <div class="timeline-header" onclick="toggleTimeline(${i})">
        <div>
          <div class="timeline-company">${job.company}</div>
          <div class="timeline-role">${job.role}</div>
        </div>
        <div style="display:flex;align-items:flex-start;gap:0.75rem;flex-shrink:0">
          <span class="timeline-period">${job.period}</span>
          <button class="timeline-toggle" id="toggle-${i}" aria-label="Expandir" aria-expanded="false">+</button>
        </div>
      </div>
      <ul class="timeline-items" id="items-${i}">
        ${job.items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </div>
  `,
    )
    .join("");
}

// Expuesto globalmente para el onclick inline
function toggleTimeline(index) {
  const list = document.getElementById(`items-${index}`);
  const toggle = document.getElementById(`toggle-${index}`);
  if (!list || !toggle) return;

  const isOpen = list.classList.toggle("open");
  toggle.textContent = isOpen ? "−" : "+";
  toggle.setAttribute("aria-expanded", isOpen);
}

window.toggleTimeline = toggleTimeline;

/* ----------------------------------------------------------
   RENDER: PROJECTS
   Genera las tarjetas desde el JSON de traducciones.
---------------------------------------------------------- */
function renderProjects() {
  const container = document.getElementById("projects-grid");
  if (!container) return;

  const items = I18n.get("projects.items") || [];
  const codeLabel = I18n.get("projects.view_code") || "Code";

  container.innerHTML = items
    .map(
      (p, i) => `
    <div class="project-card reveal reveal-delay-${(i % 2) + 1}">
      <div>
        <div class="project-name">${p.name}</div>
        <div class="project-subtitle">${p.subtitle}</div>
      </div>
      <p class="project-desc">${p.description}</p>
      <div class="project-tags">
        ${p.tags.map((t) => `<span class="project-tag">${t}</span>`).join("")}
      </div>
      <div class="project-links">
        ${p.links
          .map(
            (l) => `
          <a class="project-link" href="${l.url}" target="_blank" rel="noopener noreferrer">
            ↗ ${l.label}
          </a>
        `,
          )
          .join("")}
      </div>
    </div>
  `,
    )
    .join("");
}

/* ----------------------------------------------------------
   RENDER: EDUCATION
   Genera las tarjetas de formación desde el JSON.
   La primera entrada (en curso) ocupa el ancho completo.
---------------------------------------------------------- */
function renderEducation() {
  const container = document.getElementById("education-grid");
  if (!container) return;

  const items = I18n.get("education.items") || [];
  const presentLabel = I18n.get("education.present") || "En curso";

  container.innerHTML = items
    .map(
      (item) => `
    <div class="education-card ${item.current ? "current" : ""} reveal">
      <div class="education-card-left">
        <div class="education-degree">${item.degree}</div>
        <div class="education-center">${item.center}</div>
        <div class="education-meta">
          <span class="education-period">${item.period}</span>
          ${item.current ? `<span class="education-badge">${presentLabel}</span>` : ""}
        </div>
        <div class="education-tags">
          ${item.tags.map((t) => `<span class="education-tag">${t}</span>`).join("")}
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

/* ----------------------------------------------------------
   RENDER: CONTACT LINKS
   Genera los links de contacto desde el JSON.
---------------------------------------------------------- */
function renderContactLinks() {
  const container = document.getElementById("contact-links");
  if (!container) return;

  const t = I18n.get("contact") || {};

  const links = [
    {
      icon: "MAIL",
      label: t.email_label,
      href: "mailto:javibot00@gmail.com",
      text: "javibot00@gmail.com",
    },
    {
      icon: "GIT",
      label: t.github_label,
      href: "https://github.com/JaviBot00",
      text: "github.com/JaviBot00",
    },
    {
      icon: "IN",
      label: t.linkedin_label,
      href: "https://www.linkedin.com/in/javier-botella-mu%C3%B1oz-a58928186/",
      text: "linkedin.com/in/javier-botella-muñoz",
    },
  ];

  container.innerHTML = links
    .map(
      (l) => `
    <a class="contact-link-item" href="${l.href}" target="_blank" rel="noopener noreferrer" aria-label="${l.label}">
      <span class="contact-link-icon">${l.icon}</span>
      <span>${l.text}</span>
    </a>
  `,
    )
    .join("");
}

/* ----------------------------------------------------------
   FORMULARIO DE CONTACTO
   Simulación de envío (sin backend).
   Para conectar con Formspree / EmailJS: editar aquí.
---------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const status = document.getElementById("form-status");
    const btn = form.querySelector('button[type="submit"]');

    btn.disabled = true;
    btn.textContent = "···";

    try {
      // TODO: conectar con Formspree o EmailJS
      const res = await fetch("https://formspree.io/f/meebdaly", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });

      // Simulación de éxito
      await new Promise((r) => setTimeout(r, 800));
      status.className = "form-status success";
      status.textContent =
        I18n.current() === "es"
          ? "✓ Mensaje enviado. Te respondo pronto."
          : "✓ Message sent. I'll get back to you soon.";
      form.reset();
    } catch {
      status.className = "form-status error";
      status.textContent =
        I18n.current() === "es"
          ? "✗ Error al enviar. Escríbeme directamente a javibot00@gmail.com"
          : "✗ Send error. Email me directly at javibot00@gmail.com";
    } finally {
      btn.disabled = false;
      btn.textContent = I18n.get("contact.form_send") || "Send";
    }
  });
}

/* ----------------------------------------------------------
   BOTÓN DE IDIOMA (nav)
---------------------------------------------------------- */
function initLangToggle() {
  const btn = document.getElementById("lang-toggle");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    await I18n.toggle();
    renderAll(); // re-renderiza el contenido dinámico
    btn.textContent = I18n.get("lang.switch");
  });

  // Actualiza el label inicial
  btn.textContent = I18n.get("lang.switch");
}

/* ----------------------------------------------------------
   RENDER ALL — llama a todos los renders dinámicos
   Se ejecuta al inicio y al cambiar de idioma.
---------------------------------------------------------- */
function renderAll() {
  renderAboutStats();
  renderStack();
  renderExperience();
  renderEducation();
  renderProjects();
  renderContactLinks();
  // Re-registra los observers de reveal para los nuevos elementos
  Animations.init();
}

/* ----------------------------------------------------------
   ARRANQUE
---------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", async () => {
  // 1. Tema
  Theme.init();

  // 2. Idioma y traducciones
  await I18n.init();

  // 3. Contenido dinámico
  renderAll();

  // 4. Botones de nav
  initLangToggle();
  initMobileNav();

  // 5. Animaciones
  Animations.init();

  // 6. Formulario
  initContactForm();
});
