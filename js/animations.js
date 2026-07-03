/* ============================================================
   ANIMATIONS.JS — Typing effect, scroll reveal, nav activo
   ============================================================ */

const Animations = (() => {

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
  }

  return { init };
})();
