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

    // Create overlay element dynamically
    const overlay = document.createElement('div');
    overlay.className = 'nav-drawer-overlay';
    document.body.appendChild(overlay);

    function toggleDrawer(force) {
      isOpen = typeof force === 'boolean' ? force : !isOpen;
      burger.classList.toggle('is-open', isOpen);
      drawer.classList.toggle('is-open', isOpen);
      overlay.classList.toggle('is-open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    burger.addEventListener('click', () => toggleDrawer());

    // Close when overlay is clicked
    overlay.addEventListener('click', () => toggleDrawer(false));

    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => toggleDrawer(false));
    });

    document.addEventListener('click', (e) => {
      if (isOpen && !nav.contains(e.target) && !drawer.contains(e.target) && !overlay.contains(e.target)) {
        toggleDrawer(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) toggleDrawer(false);
    });

    window.addEventListener('resize', () => {
      if (isOpen && window.innerWidth > 960) toggleDrawer(false);
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

  /* ── All languages data ── */
  var LANGUAGES = [
    /* Google Translate code, display name, native name, flag, region */
    /* South Asia */
    {c:'en',    n:'English',            nat:'English',          f:'🇬🇧', r:'South Asia'},
    {c:'hi',    n:'Hindi',              nat:'हिन्दी',           f:'🇮🇳', r:'South Asia'},
    {c:'pa',    n:'Punjabi',            nat:'ਪੰਜਾਬੀ',           f:'🇮🇳', r:'South Asia'},
    {c:'bn',    n:'Bengali',            nat:'বাংলা',            f:'🇧🇩', r:'South Asia'},
    {c:'gu',    n:'Gujarati',           nat:'ગુજરાતી',          f:'🇮🇳', r:'South Asia'},
    {c:'mr',    n:'Marathi',            nat:'मराठी',            f:'🇮🇳', r:'South Asia'},
    {c:'ta',    n:'Tamil',              nat:'தமிழ்',            f:'🇮🇳', r:'South Asia'},
    {c:'te',    n:'Telugu',             nat:'తెలుగు',           f:'🇮🇳', r:'South Asia'},
    {c:'kn',    n:'Kannada',            nat:'ಕನ್ನಡ',            f:'🇮🇳', r:'South Asia'},
    {c:'ml',    n:'Malayalam',          nat:'മലയാളം',           f:'🇮🇳', r:'South Asia'},
    {c:'ur',    n:'Urdu',               nat:'اردو',             f:'🇵🇰', r:'South Asia'},
    {c:'ne',    n:'Nepali',             nat:'नेपाली',           f:'🇳🇵', r:'South Asia'},
    {c:'si',    n:'Sinhala',            nat:'සිංහල',            f:'🇱🇰', r:'South Asia'},
    {c:'or',    n:'Odia',               nat:'ଓଡ଼ିଆ',            f:'🇮🇳', r:'South Asia'},
    {c:'as',    n:'Assamese',           nat:'অসমীয়া',          f:'🇮🇳', r:'South Asia'},
    /* Southeast Asia */
    {c:'th',    n:'Thai',               nat:'ภาษาไทย',          f:'🇹🇭', r:'Southeast Asia'},
    {c:'vi',    n:'Vietnamese',         nat:'Tiếng Việt',       f:'🇻🇳', r:'Southeast Asia'},
    {c:'id',    n:'Indonesian',         nat:'Bahasa Indonesia', f:'🇮🇩', r:'Southeast Asia'},
    {c:'ms',    n:'Malay',              nat:'Bahasa Melayu',    f:'🇲🇾', r:'Southeast Asia'},
    {c:'tl',    n:'Filipino',           nat:'Filipino',         f:'🇵🇭', r:'Southeast Asia'},
    {c:'km',    n:'Khmer',              nat:'ខ្មែរ',             f:'🇰🇭', r:'Southeast Asia'},
    {c:'my',    n:'Burmese',            nat:'မြန်မာ',           f:'🇲🇲', r:'Southeast Asia'},
    {c:'lo',    n:'Lao',                nat:'ລາວ',              f:'🇱🇦', r:'Southeast Asia'},
    /* East Asia */
    {c:'zh-CN', n:'Chinese Simplified', nat:'中文 (简体)',       f:'🇨🇳', r:'East Asia'},
    {c:'zh-TW', n:'Chinese Traditional',nat:'中文 (繁體)',       f:'🇹🇼', r:'East Asia'},
    {c:'ja',    n:'Japanese',           nat:'日本語',            f:'🇯🇵', r:'East Asia'},
    {c:'ko',    n:'Korean',             nat:'한국어',            f:'🇰🇷', r:'East Asia'},
    {c:'mn',    n:'Mongolian',          nat:'Монгол',           f:'🇲🇳', r:'East Asia'},
    /* Middle East & Central Asia */
    {c:'ar',    n:'Arabic',             nat:'العربية',          f:'🇸🇦', r:'Middle East'},
    {c:'fa',    n:'Persian',            nat:'فارسی',            f:'🇮🇷', r:'Middle East'},
    {c:'he',    n:'Hebrew',             nat:'עברית',            f:'🇮🇱', r:'Middle East'},
    {c:'tr',    n:'Turkish',            nat:'Türkçe',           f:'🇹🇷', r:'Middle East'},
    {c:'kk',    n:'Kazakh',             nat:'Қазақша',          f:'🇰🇿', r:'Middle East'},
    {c:'uz',    n:'Uzbek',              nat:"O'zbek",           f:'🇺🇿', r:'Middle East'},
    {c:'az',    n:'Azerbaijani',        nat:'Azərbaycan',       f:'🇦🇿', r:'Middle East'},
    {c:'ky',    n:'Kyrgyz',             nat:'Кыргызча',         f:'🇰🇬', r:'Middle East'},
    {c:'tg',    n:'Tajik',              nat:'Тоҷикӣ',           f:'🇹🇯', r:'Middle East'},
    {c:'tk',    n:'Turkmen',            nat:'Türkmen',          f:'🇹🇲', r:'Middle East'},
    /* Europe West */
    {c:'fr',    n:'French',             nat:'Français',         f:'🇫🇷', r:'Europe West'},
    {c:'de',    n:'German',             nat:'Deutsch',          f:'🇩🇪', r:'Europe West'},
    {c:'es',    n:'Spanish',            nat:'Español',          f:'🇪🇸', r:'Europe West'},
    {c:'it',    n:'Italian',            nat:'Italiano',         f:'🇮🇹', r:'Europe West'},
    {c:'pt',    n:'Portuguese',         nat:'Português',        f:'🇵🇹', r:'Europe West'},
    {c:'nl',    n:'Dutch',              nat:'Nederlands',       f:'🇳🇱', r:'Europe West'},
    {c:'sv',    n:'Swedish',            nat:'Svenska',          f:'🇸🇪', r:'Europe West'},
    {c:'no',    n:'Norwegian',          nat:'Norsk',            f:'🇳🇴', r:'Europe West'},
    {c:'da',    n:'Danish',             nat:'Dansk',            f:'🇩🇰', r:'Europe West'},
    {c:'fi',    n:'Finnish',            nat:'Suomi',            f:'🇫🇮', r:'Europe West'},
    {c:'ca',    n:'Catalan',            nat:'Català',           f:'🇪🇸', r:'Europe West'},
    {c:'gl',    n:'Galician',           nat:'Galego',           f:'🇪🇸', r:'Europe West'},
    {c:'eu',    n:'Basque',             nat:'Euskara',          f:'🇪🇸', r:'Europe West'},
    /* Europe East */
    {c:'ru',    n:'Russian',            nat:'Русский',          f:'🇷🇺', r:'Europe East'},
    {c:'uk',    n:'Ukrainian',          nat:'Українська',       f:'🇺🇦', r:'Europe East'},
    {c:'pl',    n:'Polish',             nat:'Polski',           f:'🇵🇱', r:'Europe East'},
    {c:'cs',    n:'Czech',              nat:'Čeština',          f:'🇨🇿', r:'Europe East'},
    {c:'sk',    n:'Slovak',             nat:'Slovenčina',       f:'🇸🇰', r:'Europe East'},
    {c:'ro',    n:'Romanian',           nat:'Română',           f:'🇷🇴', r:'Europe East'},
    {c:'hu',    n:'Hungarian',          nat:'Magyar',           f:'🇭🇺', r:'Europe East'},
    {c:'bg',    n:'Bulgarian',          nat:'Български',        f:'🇧🇬', r:'Europe East'},
    {c:'hr',    n:'Croatian',           nat:'Hrvatski',         f:'🇭🇷', r:'Europe East'},
    {c:'sr',    n:'Serbian',            nat:'Српски',           f:'🇷🇸', r:'Europe East'},
    {c:'sl',    n:'Slovenian',          nat:'Slovenščina',      f:'🇸🇮', r:'Europe East'},
    {c:'el',    n:'Greek',              nat:'Ελληνικά',         f:'🇬🇷', r:'Europe East'},
    {c:'lt',    n:'Lithuanian',         nat:'Lietuvių',         f:'🇱🇹', r:'Europe East'},
    {c:'lv',    n:'Latvian',            nat:'Latviešu',         f:'🇱🇻', r:'Europe East'},
    {c:'et',    n:'Estonian',           nat:'Eesti',            f:'🇪🇪', r:'Europe East'},
    {c:'sq',    n:'Albanian',           nat:'Shqip',            f:'🇦🇱', r:'Europe East'},
    {c:'mk',    n:'Macedonian',         nat:'Македонски',       f:'🇲🇰', r:'Europe East'},
    {c:'bs',    n:'Bosnian',            nat:'Bosanski',         f:'🇧🇦', r:'Europe East'},
    {c:'be',    n:'Belarusian',         nat:'Беларуская',       f:'🇧🇾', r:'Europe East'},
    /* Americas */
    {c:'pt',    n:'Portuguese (Brazil)',nat:'Português (Brasil)',f:'🇧🇷', r:'Americas'},
    {c:'es',    n:'Spanish (Lat. Am.)', nat:'Español (América)', f:'🌎', r:'Americas'},
    {c:'ht',    n:'Haitian Creole',     nat:'Kreyòl ayisyen',   f:'🇭🇹', r:'Americas'},
    /* Africa */
    {c:'sw',    n:'Swahili',            nat:'Kiswahili',        f:'🇰🇪', r:'Africa'},
    {c:'am',    n:'Amharic',            nat:'አማርኛ',             f:'🇪🇹', r:'Africa'},
    {c:'ha',    n:'Hausa',              nat:'Hausa',            f:'🇳🇬', r:'Africa'},
    {c:'yo',    n:'Yoruba',             nat:'Yorùbá',           f:'🇳🇬', r:'Africa'},
    {c:'ig',    n:'Igbo',               nat:'Igbo',             f:'🇳🇬', r:'Africa'},
    {c:'zu',    n:'Zulu',               nat:'isiZulu',          f:'🇿🇦', r:'Africa'},
    {c:'af',    n:'Afrikaans',          nat:'Afrikaans',        f:'🇿🇦', r:'Africa'},
    {c:'so',    n:'Somali',             nat:'Soomaali',         f:'🇸🇴', r:'Africa'},
    {c:'ny',    n:'Chichewa',           nat:'Chichewa',         f:'🇲🇼', r:'Africa'},
    {c:'sn',    n:'Shona',              nat:'Shona',            f:'🇿🇼', r:'Africa'},
    {c:'st',    n:'Sesotho',            nat:'Sesotho',          f:'🇱🇸', r:'Africa'},
    {c:'xh',    n:'Xhosa',              nat:'isiXhosa',         f:'🇿🇦', r:'Africa'},
    /* Other */
    {c:'hy',    n:'Armenian',           nat:'Հայերեն',          f:'🇦🇲', r:'Other'},
    {c:'ka',    n:'Georgian',           nat:'ქართული',          f:'🇬🇪', r:'Other'},
    {c:'is',    n:'Icelandic',          nat:'Íslenska',         f:'🇮🇸', r:'Other'},
    {c:'ga',    n:'Irish',              nat:'Gaeilge',          f:'🇮🇪', r:'Other'},
    {c:'cy',    n:'Welsh',              nat:'Cymraeg',          f:'🏴󠁧󠁢󠁷󠁬󠁳󠁿', r:'Other'},
    {c:'mt',    n:'Maltese',            nat:'Malti',            f:'🇲🇹', r:'Other'},
    {c:'lb',    n:'Luxembourgish',      nat:'Lëtzebuergesch',   f:'🇱🇺', r:'Other'},
    {c:'eo',    n:'Esperanto',          nat:'Esperanto',        f:'🌍', r:'Other'},
    {c:'la',    n:'Latin',              nat:'Latina',           f:'🏛️', r:'Other'}
  ];

  var REGION_ICONS = {
    'South Asia':    '🌏',
    'Southeast Asia':'🌏',
    'East Asia':     '🌏',
    'Middle East':   '🕌',
    'Europe West':   '🌍',
    'Europe East':   '🌍',
    'Americas':      '🌎',
    'Africa':        '🌍',
    'Other':         '🌐'
  };

  var navLang  = document.getElementById('navLang');
  var langBtn  = document.getElementById('langBtn');
  var langCur  = document.getElementById('langCurrent');
  var langFlag = document.getElementById('langFlag');
  var langSearch = document.getElementById('langSearch');
  var scroll   = document.getElementById('langOptionsScroll');

  if (!navLang || !langBtn || !scroll) return;

  /* ── Build the list ── */
  var activeLang = 'en';
  var allItems   = [];

  function buildList() {
    scroll.innerHTML = '';
    var regions = [];
    LANGUAGES.forEach(function(l) {
      if (regions.indexOf(l.r) === -1) regions.push(l.r);
    });

    regions.forEach(function(region) {
      var grp = document.createElement('div');
      grp.className = 'lang-group';
      grp.setAttribute('data-region', region);

      var lbl = document.createElement('div');
      lbl.className = 'lang-group-label';
      lbl.textContent = (REGION_ICONS[region] || '🌐') + ' ' + region;
      grp.appendChild(lbl);

      LANGUAGES.forEach(function(lang) {
        if (lang.r !== region) return;
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'lang-option' + (lang.c === activeLang ? ' active' : '');
        btn.setAttribute('data-lang', lang.c);
        btn.setAttribute('data-flag', lang.f);
        btn.setAttribute('data-search', (lang.n + ' ' + lang.nat).toLowerCase());
        btn.innerHTML =
          '<span class="lang-option-flag">' + lang.f + '</span>' +
          '<span class="lang-option-name">' + lang.n + '<span class="lang-option-nat"> — ' + lang.nat + '</span></span>' +
          '<span class="lang-option-code">' + lang.c.toUpperCase().substring(0,2) + '</span>';
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          selectLang(lang, btn);
        });
        grp.appendChild(btn);
        allItems.push({el: btn, lang: lang});
      });

      scroll.appendChild(grp);
    });
  }

  /* ── Select ── */
  function selectLang(lang, btn) {
    if (langFlag) langFlag.textContent = lang.f;
    if (langCur)  langCur.textContent  = lang.n;
    activeLang = lang.c;

    scroll.querySelectorAll('.lang-option').forEach(function(o) { o.classList.remove('active'); });
    if (btn) btn.classList.add('active');

    navLang.classList.remove('open');
    langBtn.setAttribute('aria-expanded', 'false');
    if (langSearch) { langSearch.value = ''; filterLangs(''); }

    if (lang.c === 'en') {
      restoreEnglish();
    } else {
      doTranslate(lang.c);
    }
  }

  /* ── Google Translate ── */
  function doTranslate(code) {
    var val = '/en/' + code;
    document.cookie = 'googtrans=' + val + '; path=/';
    document.cookie = 'googtrans=' + val + '; path=/; domain=' + location.hostname;
    document.cookie = 'googtrans=' + val + '; path=/; domain=.' + location.hostname;
    var combo = document.querySelector('.goog-te-combo');
    if (combo) { combo.value = code; combo.dispatchEvent(new Event('change')); }
    else { location.reload(); }
  }

  function restoreEnglish() {
    ['', location.hostname, '.' + location.hostname].forEach(function(d) {
      var extra = d ? '; domain=' + d : '';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/' + extra;
    });
    location.reload();
  }

  /* ── Filter ── */
  function filterLangs(q) {
    q = (q || '').toLowerCase().trim();
    scroll.querySelectorAll('.lang-group').forEach(function(grp) {
      var any = false;
      grp.querySelectorAll('.lang-option').forEach(function(opt) {
        var s = opt.getAttribute('data-search') || '';
        var show = !q || s.indexOf(q) !== -1;
        opt.hidden = !show;
        if (show) any = true;
      });
      grp.classList.toggle('all-hidden', !any);
    });
  }

  /* ── Toggle ── */
  langBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    var isOpen = navLang.classList.toggle('open');
    langBtn.setAttribute('aria-expanded', String(isOpen));
    if (isOpen && langSearch) setTimeout(function() { langSearch.focus(); }, 60);
  });

  document.addEventListener('click', function(e) {
    if (!navLang.contains(e.target)) {
      navLang.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      navLang.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    }
  });

  if (langSearch) {
    langSearch.addEventListener('input', function() { filterLangs(this.value); });
  }

  /* ── Restore from cookie ── */
  (function() {
    var match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
    if (match && match[1] && match[1] !== 'en') {
      activeLang = match[1];
      var found = LANGUAGES.filter(function(l) { return l.c === activeLang; })[0];
      if (found) {
        if (langFlag) langFlag.textContent = found.f;
        if (langCur)  langCur.textContent  = found.n;
      }
    }
  })();

  buildList();

})();