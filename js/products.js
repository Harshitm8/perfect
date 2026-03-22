/**
 * products.js — Indo Thai Global
 * Home page: single Solar Dryer card that opens the detail modal.
 * Products page: full catalogue rendering.
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════
     PRODUCT DATA
  ═══════════════════════════════════════════════════════ */
  const PRODUCTS = [
    {
      id: 1,
      name: 'Solar Dryer',
      category: 'Solar',
      icon: '☀️',
      tagline: 'Advanced Solar & Hybrid Drying Systems — 5 kg to 500 kg capacity',
      description:
        'Indo Thai Global manufactures advanced solar drying systems for agriculture, food processing, and herbal industries. Available in small, medium and large capacity models from 5 kg to 500 kg with solar, hybrid and electric backup options.',
      specs: [
        { key: 'Models',      val: 'ITG-SD5 · SD25 · SD50 · SD100 · SD250 · SD500' },
        { key: 'Capacity',    val: '5 kg to 500 kg' },
        { key: 'Temperature', val: '45°C – 90°C (model dependent)' },
        { key: 'Material',    val: 'SS 304/316 · Food-grade stainless steel' },
        { key: 'Energy',      val: 'Solar + Electric/Biomass hybrid backup' },
        { key: 'Optional',    val: 'IoT monitoring · Digital temp control · Mobility wheels' },
      ],
      image: 'assets/products/solar-dryer.png',
    },
  ];

  /* ═══════════════════════════════════════════════════════
     DETECT PAGE — home shows only Solar Dryer card
  ═══════════════════════════════════════════════════════ */
  const isHome = !!document.getElementById('sdModalBackdrop');
  const displayProducts = isHome ? [PRODUCTS[0]] : PRODUCTS;

  /* ═══════════════════════════════════════════════════════
     CARD RENDERING
  ═══════════════════════════════════════════════════════ */
  function renderCardImg(p) {
    const ph = '<div class="prod-img-placeholder" style="display:none"><span class="ph-icon">' + p.icon + '</span><span class="ph-label">' + p.category + '</span></div>';
    if (p.image) {
      return '<img src="' + p.image + '" alt="' + p.name + '" class="prod-img" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'"/>' + ph;
    }
    return '<div class="prod-img-placeholder"><span class="ph-icon">' + p.icon + '</span><span class="ph-label">' + p.category + '</span></div>';
  }

  function buildCard(p) {
    const card = document.createElement('article');
    card.className = 'prod-card';
    card.setAttribute('data-id', p.id);
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', 'View details for ' + p.name);

    card.innerHTML =
      '<div class="prod-img-wrap">' +
        renderCardImg(p) +
        '<span class="prod-badge">' + p.category + '</span>' +
        '<div class="prod-overlay" aria-hidden="true">' +
          '<div class="ov-title">' + p.name + '</div>' +
          '<div class="ov-desc">' + p.description + '</div>' +
          '<div class="ov-row">' +
            '<button class="ov-btn" data-id="' + p.id + '">View Details ›</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="prod-body">' +
        '<div class="prod-name">' + p.name + '</div>' +
        '<div class="prod-tagline">' + p.tagline + '</div>' +
        '<div class="prod-footer">' +
          '<span class="prod-cat-tag">' + p.category + '</span>' +
          '<span class="prod-more">Details <span aria-hidden="true">→</span></span>' +
        '</div>' +
      '</div>';

    return card;
  }

  function injectCards() {
    document.querySelectorAll('.products-grid').forEach(function (grid) {
      displayProducts.forEach(function (p) { grid.appendChild(buildCard(p)); });
    });
  }

  /* ═══════════════════════════════════════════════════════
     SCROLL REVEAL for cards
  ═══════════════════════════════════════════════════════ */
  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.prod-card').forEach(function (c) { c.classList.add('is-visible'); });
      return;
    }
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.prod-card').forEach(function (c) { obs.observe(c); });
  }

  /* ═══════════════════════════════════════════════════════
     SOLAR DRYER DETAIL MODAL (home page only)
  ═══════════════════════════════════════════════════════ */
  function initSdModal() {
    const backdrop  = document.getElementById('sdModalBackdrop');
    const closeBtn  = document.getElementById('sdModalClose');
    const tabs      = document.querySelectorAll('.sd-tab');
    const panels    = document.querySelectorAll('.sd-tab-panel');
    if (!backdrop) return;

    function openModal() {
      backdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      setTimeout(function () { closeBtn && closeBtn.focus(); }, 50);
    }
    function closeModal() {
      backdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    // Tab switching
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        panels.forEach(function (p) { p.classList.remove('active'); });
        tab.classList.add('active');
        var target = document.getElementById('tab-' + tab.dataset.tab);
        if (target) target.classList.add('active');
      });
    });

    closeBtn && closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', function (e) { if (e.target === backdrop) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

    // Open modal when solar dryer card is clicked
    document.addEventListener('click', function (e) {
      var btn  = e.target.closest('.ov-btn');
      var card = e.target.closest('.prod-card');
      if (!btn && !card) return;
      var id = Number((btn || card).dataset.id);
      if (id === 1 && isHome) { e.stopPropagation(); openModal(); return; }
      // On products page — use standard modal
      if (!isHome) openStandardModal(id);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        var card = e.target.closest('.prod-card');
        if (card) { e.preventDefault(); var id = Number(card.dataset.id); if (id === 1 && isHome) openModal(); else if (!isHome) openStandardModal(id); }
      }
    });
  }

  /* ═══════════════════════════════════════════════════════
     STANDARD MODAL (products page)
  ═══════════════════════════════════════════════════════ */
  var standardBackdrop = null;

  function buildStandardModal() {
    if (isHome) return;
    var el = document.createElement('div');
    el.className = 'modal-backdrop';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.innerHTML =
      '<div class="modal-box" id="modalBox">' +
        '<div class="modal-img-pane" id="modalImgPane"></div>' +
        '<div class="modal-info">' +
          '<div class="modal-cat"     id="modalCat"></div>' +
          '<div class="modal-name"    id="modalName"></div>' +
          '<div class="modal-tagline-text" id="modalTagline"></div>' +
          '<div class="modal-rule"></div>' +
          '<div class="modal-desc"    id="modalDesc"></div>' +
          '<ul  class="modal-specs"   id="modalSpecs"></ul>' +
          '<div class="modal-actions">' +
            '<a href="quote.html"   class="btn btn-dark"  style="font-size:0.8rem;padding:.5rem 1.2rem">Request Quote →</a>' +
            '<a href="contact.html" class="btn btn-ghost" style="font-size:0.8rem;padding:.48rem 1.1rem">Contact Us</a>' +
          '</div>' +
        '</div>' +
        '<button class="modal-close" id="modalClose" aria-label="Close">✕</button>' +
      '</div>';
    document.body.appendChild(el);
    standardBackdrop = el;
    document.getElementById('modalClose').addEventListener('click', closeStandardModal);
    el.addEventListener('click', function (e) { if (e.target === el) closeStandardModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeStandardModal(); });
  }

  function openStandardModal(id) {
    var p = PRODUCTS.find(function (x) { return x.id === id; });
    if (!p || !standardBackdrop) return;
    var imgPane = document.getElementById('modalImgPane');
    imgPane.innerHTML = p.image
      ? '<img src="' + p.image + '" alt="' + p.name + '" onerror="this.parentElement.innerHTML=\'<div class=modal-ph>' + p.icon + '</div>\'">'
      : '<div class="modal-ph">' + p.icon + '</div>';
    document.getElementById('modalCat').textContent     = p.category;
    document.getElementById('modalName').textContent    = p.name;
    document.getElementById('modalTagline').textContent = p.tagline;
    document.getElementById('modalDesc').textContent    = p.description;
    document.getElementById('modalSpecs').innerHTML = p.specs.map(function (s) {
      return '<li class="modal-spec"><span class="spec-k">' + s.key + ':</span> ' + s.val + '</li>';
    }).join('');
    standardBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { document.getElementById('modalClose').focus(); }, 50);
  }

  function closeStandardModal() {
    if (standardBackdrop) { standardBackdrop.classList.remove('is-open'); document.body.style.overflow = ''; }
  }

  /* INIT */
  injectCards();
  initReveal();
  if (isHome) {
    initSdModal();
  } else {
    buildStandardModal();
    document.addEventListener('click', function (e) {
      var btn  = e.target.closest('.ov-btn');
      var card = e.target.closest('.prod-card');
      if (btn)  { e.stopPropagation(); openStandardModal(Number(btn.dataset.id)); return; }
      if (card) { openStandardModal(Number(card.dataset.id)); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        var card = e.target.closest('.prod-card');
        if (card) { e.preventDefault(); openStandardModal(Number(card.dataset.id)); }
      }
    });
  }

})();