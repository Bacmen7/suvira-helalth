(function () {
  var BASE = (function () {
    var s = document.currentScript ? document.currentScript.src : '';
    return s.replace(/assets\/shared\.js.*$/, '');
  })();

  function load(url, callback) {
    fetch(url)
      .then(function (r) { return r.text(); })
      .then(callback)
      .catch(function (e) { console.warn('shared.js: could not load ' + url, e); });
  }

  // ── Inject navbar ──
  load(BASE + 'assets/navbar.html', function (html) {
    var placeholder = document.getElementById('shared-nav');
    if (placeholder) {
      placeholder.outerHTML = html;
    } else {
      document.body.insertAdjacentHTML('afterbegin', html);
    }
    setActiveLink();
    initHamburger();
  });

  // ── Inject footer ──
  load(BASE + 'assets/footer.html', function (html) {
    var placeholder = document.getElementById('shared-footer');
    if (placeholder) {
      placeholder.outerHTML = html;
    } else {
      document.body.insertAdjacentHTML('beforeend', html);
    }
  });

  // ── Mark current page active ──
  function setActiveLink() {
    var current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      var href = a.getAttribute('href').split('/').pop();
      if (href === current) a.classList.add('active');
    });
  }

  // ── Hamburger menu ──
  function initHamburger() {
    var btn = document.getElementById('navHamburger');
    var links = document.getElementById('navLinks');
    if (!btn || !links) return;
    btn.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open);
      document.body.classList.toggle('nav-lock', open);
    });
    document.addEventListener('click', function (e) {
      if (!btn.contains(e.target) && !links.contains(e.target)) {
        links.classList.remove('open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', false);
        document.body.classList.remove('nav-lock');
      }
    });
  }
})();
