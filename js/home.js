/**
 * home.js — Indo Thai Global (fresh build)
 * 1. Hero slideshow
 * 2. Scroll reveal (.reveal-up / .reveal-left / .reveal-right → adds .in-view)
 */

/* ── Hero Slideshow ──────────────────────────────────────────── */
(function () {
  var slides   = document.querySelectorAll('.hero-slide');
  var dotsWrap = document.getElementById('heroSlideDots');
  var prevBtn  = document.getElementById('heroPrev');
  var nextBtn  = document.getElementById('heroNext');

  if (!slides.length || !dotsWrap) return;

  var current  = 0;
  var timer    = null;
  var DELAY    = 4000;

  /* Build dots */
  slides.forEach(function (_, i) {
    var d = document.createElement('button');
    d.className = 'hero-dot' + (i === 0 ? ' is-active' : '');
    d.setAttribute('aria-label', 'Slide ' + (i + 1));
    d.addEventListener('click', function () { go(i); reset(); });
    dotsWrap.appendChild(d);
  });

  function dots() { return dotsWrap.querySelectorAll('.hero-dot'); }

  function go(n) {
    slides[current].classList.remove('is-active');
    dots()[current].classList.remove('is-active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    dots()[current].classList.add('is-active');
  }

  function start() { timer = setInterval(function () { go(current + 1); }, DELAY); }
  function reset() { clearInterval(timer); start(); }

  if (prevBtn) prevBtn.addEventListener('click', function () { go(current - 1); reset(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { go(current + 1); reset(); });

  var hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mouseenter', function () { clearInterval(timer); });
    hero.addEventListener('mouseleave', start);
  }

  start();
}());


/* ── Scroll Reveal ───────────────────────────────────────────── */
(function () {
  var SEL = '.reveal-up, .reveal-left, .reveal-right';
  var els = Array.prototype.slice.call(document.querySelectorAll(SEL));

  if (!els.length) return;

  /* No IntersectionObserver? Just show everything. */
  if (!window.IntersectionObserver) {
    els.forEach(function (el) { el.classList.add('in-view'); });
    return;
  }

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
      } else {
        e.target.classList.remove('in-view');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
  
  els.forEach(function (el) { obs.observe(el); });
}());