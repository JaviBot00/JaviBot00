/* ============================================================
   I18N.JS — Sistema de internacionalización
   Detecta idioma del navegador, carga el JSON correcto
   y expone funciones globales para el resto de módulos.
   ============================================================ */

const I18n = (() => {
  let currentLang = 'es';
  let translations = {};

  /**
   * Detecta el idioma preferido del navegador.
   * Si no es español, usamos inglés.
   * Se puede sobrescribir con localStorage.
   */
  function detectLang() {
    const saved = localStorage.getItem('jb-lang');
    if (saved) return saved;

    const browserLang = navigator.language || navigator.userLanguage || 'es';
    return browserLang.startsWith('es') ? 'es' : 'en';
  }

  /**
   * Carga el archivo JSON del idioma indicado.
   * @param {string} lang - 'es' o 'en'
   */
  async function load(lang) {
    try {
      const res = await fetch(`locales/${lang}.json`);
      if (!res.ok) throw new Error(`No se pudo cargar locales/${lang}.json`);
      translations = await res.json();
      currentLang = lang;
      localStorage.setItem('jb-lang', lang);
    } catch (err) {
      console.error('[I18n] Error cargando traducciones:', err);
    }
  }

  /**
   * Devuelve un valor anidado del objeto de traducciones.
   * Ejemplo: get('hero.name') → translations.hero.name
   * @param {string} key - clave con notación de punto
   * @returns {*}
   */
  function get(key) {
    return key.split('.').reduce((obj, k) => obj?.[k], translations);
  }

  /**
   * Aplica todas las traducciones al DOM.
   * Busca elementos con data-i18n="clave" y sustituye su textContent.
   * También actualiza el lang del <html>.
   */
  function applyToDOM() {
    document.documentElement.lang = currentLang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = get(key);
      if (value && typeof value === 'string') {
        el.textContent = value;
      }
    });

    // Atributos especiales: placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const value = get(key);
      if (value) el.placeholder = value;
    });

    // Atributos especiales: aria-label
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      const value = get(key);
      if (value) el.setAttribute('aria-label', value);
    });
  }

  /**
   * Cambia el idioma activo y re-renderiza el contenido dinámico.
   * @param {string} lang
   */
  async function switchTo(lang) {
    await load(lang);
    applyToDOM();
    // Notifica a otros módulos que el idioma cambió
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  /**
   * Alterna entre 'es' y 'en'.
   */
  async function toggle() {
    await switchTo(currentLang === 'es' ? 'en' : 'es');
  }

  /**
   * Inicialización: detecta idioma, carga JSON y aplica al DOM.
   */
  async function init() {
    const lang = detectLang();
    await load(lang);
    applyToDOM();
  }

  // API pública
  return { init, get, toggle, switchTo, current: () => currentLang };
})();
