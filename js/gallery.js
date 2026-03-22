/**
 * gallery.js — Indo Thai Global
 * • Filter tabs (show/hide by category)
 * • Lightbox (open / prev / next / close / keyboard)
 * • Scroll reveal for .Animation elements (bi-directional)
 * • data-reveal scroll reveal
 */

(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════════════
     FILTER TABS
  ══════════════════════════════════════════════════════════════ */
  var filterTabs  = document.querySelectorAll('.filter-tab');
  var galleryItems = document.querySelectorAll('.gallery-item');

  filterTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var filter = tab.getAttribute('data-filter');

      /* Update active tab */
      filterTabs.forEach(function (t) { t.classList.remove('is-active'); });
      tab.classList.add('is-active');

      /* Show / hide items */
      galleryItems.forEach(function (item) {
        if (filter === 'all' || item.getAttribute('data-cat') === filter) {
          item.classList.remove('is-hidden');
        } else {
          item.classList.add('is-hidden');
        }
      });
    });
  });


  /* ══════════════════════════════════════════════════════════════
     LIGHTBOX
  ══════════════════════════════════════════════════════════════ */
  var backdrop   = document.getElementById('lightboxBackdrop');
  var lbImg      = document.getElementById('lightboxImg');
  var lbCaption  = document.getElementById('lightboxCaption');
  var lbClose    = document.getElementById('lightboxClose');
  var lbPrev     = document.getElementById('lightboxPrev');
  var lbNext     = document.getElementById('lightboxNext');

  var visibleItems = [];
  var currentIndex = 0;

  function getVisibleItems() {
    return Array.from(galleryItems).filter(function (item) {
      return !item.classList.contains('is-hidden');
    });
  }

  function openLightbox(index) {
    visibleItems = getVisibleItems();
    currentIndex = index;
    showImage(currentIndex);
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  function showImage(index) {
    var item   = visibleItems[index];
    var img    = item.querySelector('img');
    var cap    = item.querySelector('.gallery-caption');
    lbImg.src  = img ? img.src : '';
    lbImg.alt  = img ? img.alt : '';
    lbCaption.textContent = cap ? cap.textContent : '';
  }

  function prevImage() {
    visibleItems = getVisibleItems();
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    showImage(currentIndex);
  }

  function nextImage() {
    visibleItems = getVisibleItems();
    currentIndex = (currentIndex + 1) % visibleItems.length;
    showImage(currentIndex);
  }

  /* Attach click to each gallery item */
  galleryItems.forEach(function (item, i) {
    item.addEventListener('click', function () {
      var vis = getVisibleItems();
      var visIndex = vis.indexOf(item);
      if (visIndex !== -1) openLightbox(visIndex);
    });
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev)  lbPrev.addEventListener('click',  prevImage);
  if (lbNext)  lbNext.addEventListener('click',  nextImage);

  /* Close on backdrop click */
  if (backdrop) {
    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) closeLightbox();
    });
  }

  /* Keyboard navigation */
  document.addEventListener('keydown', function (e) {
    if (!backdrop || !backdrop.classList.contains('is-open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   prevImage();
    if (e.key === 'ArrowRight')  nextImage();
  });


  /* ══════════════════════════════════════════════════════════════
     SCROLL REVEAL — .Animation elements (bi-directional)
  ══════════════════════════════════════════════════════════════ */
  if ('IntersectionObserver' in window) {

    /* .Animation elements */
    var animObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          el.style.animationDelay = el.style.getPropertyValue('--delay') || '0s';
          el.classList.add('active');
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

    document.querySelectorAll('.Animation').forEach(function (el) {
      animObs.observe(el);
    });

    /* data-reveal elements */
    var revealObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      revealObs.observe(el);
    });

  } else {
    /* Fallback */
    document.querySelectorAll('.Animation').forEach(function (el) {
      el.style.opacity='1'; el.style.transform='none'; el.classList.add('active');
    });
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      el.classList.add('visible');
    });
  }

})();