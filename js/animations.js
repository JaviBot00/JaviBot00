/* ============================================================
   ANIMATIONS.JS — Typing effect, scroll reveal, nav activo
   ============================================================ */

const Animations = (() => {

  /* ----------------------------------------------------------
     TYPING EFFECT (hero)
     Escribe y borra las frases del array roles del i18n.
  ---------------------------------------------------------- */
  let typingTimer = null;

  function startTyping() {
    const el = document.getElementById('hero-role-text');
    if (!el) return;

    const roles = I18n.get('hero.roles') || [];
    if (!roles.length) return;

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    const SPEED_TYPE   = 65;
    const SPEED_DELETE = 35;
    const PAUSE_END    = 1800;
    const PAUSE_START  = 400;

    function tick() {
      const current = roles[roleIndex];

      if (!deleting) {
        // Escribiendo
        el.textContent = current.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex === current.length) {
          // Pausa al llegar al final antes de borrar
          deleting = true;
          typingTimer = setTimeout(tick, PAUSE_END);
          return;
        }
      } else {
        // Borrando
        el.textContent = current.slice(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          typingTimer = setTimeout(tick, PAUSE_START);
          return;
        }
      }

      typingTimer = setTimeout(tick, deleting ? SPEED_DELETE : SPEED_TYPE);
    }

    clearTimeout(typingTimer);
    charIndex = 0;
    deleting = false;
    roleIndex = 0;
    el.textContent = '';
    tick();
  }

  /* ----------------------------------------------------------
     SCROLL REVEAL
     IntersectionObserver para animar elementos .reveal
     cuando entran en el viewport.
  ---------------------------------------------------------- */
  function initReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // solo anima una vez
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  /* ----------------------------------------------------------
     NAV ACTIVO
     Resalta el enlace de nav correspondiente a la sección visible.
  ---------------------------------------------------------- */
  function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navLinks.forEach(a => a.classList.remove('active'));
            const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach(s => observer.observe(s));
  }

  /* ----------------------------------------------------------
     SCROLL TO TOP
     Muestra el botón cuando el usuario baja suficiente.
  ---------------------------------------------------------- */
  function initScrollTop() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ----------------------------------------------------------
     API PÚBLICA
  ---------------------------------------------------------- */
  function init() {
    initReveal();
    initNavHighlight();
    initScrollTop();
    // El typing se inicia desde main.js después de cargar i18n
  }

  return { init, startTyping };
})();
