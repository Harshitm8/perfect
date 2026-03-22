/**
 * navbar.js — FIXED VERSION
 */

(function () {
  'use strict';

  const nav      = document.getElementById('nav');
  const progress = document.getElementById('navProgress');
  const burger   = document.getElementById('burger');
  const drawer   = document.getElementById('drawer');

  if (!nav) return;

  /* ── SCROLL ── */
  function onScroll() {
    const scrolled = window.scrollY > 12;
    nav.classList.toggle('is-scrolled', scrolled);

    if (progress) {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct  = docH > 0 ? (window.scrollY / docH) * 100 : 0;
      progress.style.width = pct.toFixed(2) + '%';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── DRAWER FIX (NO RETURN BUG) ── */
  if (burger && drawer) {
    let isOpen = false;

    function toggleDrawer(force) {
      isOpen = typeof force === 'boolean' ? force : !isOpen;
      burger.classList.toggle('is-open', isOpen);
      drawer.classList.toggle('is-open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    burger.addEventListener('click', () => toggleDrawer());

    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => toggleDrawer(false));
    });

    document.addEventListener('click', (e) => {
      if (isOpen && !nav.contains(e.target) && !drawer.contains(e.target)) {
        toggleDrawer(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) toggleDrawer(false);
    });

    window.addEventListener('resize', () => {
      if (isOpen && window.innerWidth > 900) toggleDrawer(false);
    }, { passive: true });
  }

  /* ── ACTIVE LINK FIX ── */
  const path = window.location.pathname;
  let current = path.split('/').pop();

  if (!current || current === '') current = 'home.html';

  document.querySelectorAll('.nav-link, .drawer-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current) link.classList.add('active');
    else link.classList.remove('active');
  });

})();

(function () {
  var navLang    = document.getElementById('navLang');
  var langBtn    = document.getElementById('langBtn');
  var langCur    = document.getElementById('langCurrent');
  var langFlag   = document.getElementById('langFlag');
  var langSearch = document.getElementById('langSearch');
  var scroll     = document.getElementById('langOptionsScroll');

  if (!navLang || !langBtn) return;

  langBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    navLang.classList.toggle('open');
  });

  document.addEventListener('click', () => navLang.classList.remove('open'));
  navLang.addEventListener('click', e => e.stopPropagation());

  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', function () {
      const lang = opt.dataset.lang;
      const flag = opt.dataset.flag;
      const code = opt.querySelector('.lang-option-code').textContent;

      langCur.textContent = code;
      langFlag.textContent = flag;

      localStorage.setItem('itg-lang', lang);
      document.documentElement.setAttribute('lang', lang);

      document.querySelectorAll('.lang-option').forEach(o =>
        o.classList.remove('active')
      );
      opt.classList.add('active');

      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event('change'));
      }
    });
  });

})();