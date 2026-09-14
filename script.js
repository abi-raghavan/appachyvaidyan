(function () {
  'use strict';

  var STORAGE_KEY = 'lang';
  var body = document.body;
  var html = document.documentElement;
  var buttons = document.querySelectorAll('.lang-btn');
  var foucGuard = document.getElementById('lang-fouc-guard');

  function isEnglish() {
    return body.classList.contains('lang-en');
  }

  function setLanguage(lang) {
    var useEnglish = lang === 'en';

    body.classList.toggle('lang-en', useEnglish);
    html.classList.remove('lang-en-pending');
    html.setAttribute('lang', useEnglish ? 'en' : 'ml');

    buttons.forEach(function (btn) {
      var active = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }

  function init() {
    var stored = 'ml';
    try {
      stored = localStorage.getItem(STORAGE_KEY) || 'ml';
    } catch (e) {}

    if (foucGuard) {
      foucGuard.remove();
    }

    setLanguage(stored === 'en' ? 'en' : 'ml');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lang = btn.getAttribute('data-lang');
        if (lang === 'ml' || lang === 'en') {
          setLanguage(lang);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
