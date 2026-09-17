(() => {
  const STORAGE_KEY = 'krasivaya_cookie_consent_v2';
  const METRIKA_ID = Number(document.querySelector('meta[name="yandex-metrika-id"]')?.content || 0);
  let metrikaLoaded = false;

  const loadMetrika = () => {
    if (metrikaLoaded || !Number.isInteger(METRIKA_ID) || METRIKA_ID <= 0) return;
    window[`disableYaCounter${METRIKA_ID}`] = false;
    metrikaLoaded = true;
    window.ym = window.ym || function () { (window.ym.a = window.ym.a || []).push(arguments); };
    window.ym.l = Date.now();
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://mc.yandex.ru/metrika/tag.js';
    document.head.appendChild(script);
    window.ym(METRIKA_ID, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: false
    });
  };

  const banner = document.createElement('section');
  banner.className = 'cookie-banner';
  banner.hidden = true;
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Настройки cookies');
  banner.innerHTML = `
    <p class="cookie-banner__text">Мы используем cookie и Яндекс Метрику, чтобы улучшать работу сайта. Подробнее — в <a href="policy.html">Политике обработки персональных данных</a>.</p>
    <div class="cookie-banner__actions">
      <button class="cookie-banner__button cookie-banner__button--necessary" type="button">Только необходимые</button>
      <button class="cookie-banner__button cookie-banner__button--accept" type="button">Согласен</button>
    </div>`;
  document.body.appendChild(banner);

  const readChoice = () => {
    try { return localStorage.getItem(STORAGE_KEY); }
    catch { return null; }
  };

  const save = (value) => {
    try { localStorage.setItem(STORAGE_KEY, value); }
    catch {}
    banner.hidden = true;
    if (value === 'accepted') loadMetrika();
    else if (METRIKA_ID > 0) window[`disableYaCounter${METRIKA_ID}`] = true;
  };

  banner.querySelector('.cookie-banner__button--accept').addEventListener('click', () => save('accepted'));
  banner.querySelector('.cookie-banner__button--necessary').addEventListener('click', () => save('necessary'));
  document.querySelectorAll('[data-cookie-settings]').forEach((button) => {
    button.addEventListener('click', () => { banner.hidden = false; banner.querySelector('.cookie-banner__button--accept').focus(); });
  });

  const saved = readChoice();
  if (saved === 'accepted') loadMetrika();
  else if (saved !== 'necessary') banner.hidden = false;
})();
