(() => {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const SEL = [
    // первый экран
    '.hero__copy > *',
    // направления
    '.proc__head > div > *', '.proc__controls', '.proc__card', '.proc__more',
    // работы
    '.portfolio__head .eyebrow', '.portfolio__head .h2', '.portfolio__slide', '.portfolio__controls',
    // предложения
    '.deals__head > *', '.deal',
    // студия
    '.space__intro > *', '.shot', '.space__facts li',
    // диагностика
    '.diag__copy > *', '.diag__carousel', '.diag__list li', '.diag__mistakes', '.diag__offer', '.diag__actions',
    // отзывы
    '.trust__head > *', '.scores li', '.quote',
    '.revs__head > *', '.revs__item', '.revs__more', '.revs__actions > *',
    // о мастере
    '.founder__figure', '.founder__copy > *',
    // вопросы
    '.faq__intro > *',
    // призыв и контакты
    '.cta__inner > *',
    '.contacts__copy > .eyebrow', '.contacts__copy > .h2', '.cn__row',
    '.contacts__actions', '.contacts__social', '.map',
    // страница цен
    '.price__head > div > *', '.price__note', '.price__fine', '.price--page__back',
    '.cat', '.cat__about',
    // политика
    '.policy__inner > *',
    // подвал
    '.foot__main', '.foot__bar > *'
  ].join(',');

  const els = document.querySelectorAll(SEL);
  if (!els.length) return;

  els.forEach((el) => {
    el.classList.add('rv', 'rv--instant');
    if (el.matches('.space__intro > *, .trust__head > *, .founder__copy > *, .contacts__copy > *, .diag__copy > *, .faq__intro > *')) el.classList.add('rv--left');
    else if (el.matches('.diag__carousel, .founder__figure, .map, .scores, .diag__mistakes')) el.classList.add('rv--right');
    else if (el.matches('.eyebrow, .link, .price__fine, .foot__bar > *, .proc__controls, .portfolio__controls')) el.classList.add('rv--soft');
    else if (el.matches('.shot, .quote, .deal, .proc__card, .diag__offer, .cat')) el.classList.add('rv--rise');
  });

  // каскад: каждый следующий элемент группы стартует чуть позже
  [['.hero__copy > *', 90], ['.founder__copy > *', 80], ['.cta__inner > *', 80],
   ['.proc__card', 70], ['.portfolio__slide', 55], ['.deal', 90], ['.shot', 85],
   ['.scores li', 75], ['.quote', 90], ['.revs__item', 60], ['.cat', 55],
   ['.cn__row', 70], ['.foot__bar > *', 60], ['.price__head > div > *', 80],
   ['.diag__list li', 70], ['.space__facts li', 70], 
   ['.policy__inner > *', 40]
  ].forEach(([sel, step]) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.style.setProperty('--rd', Math.min(i, 5) * step);
    });
  });

  // первое скрытие — без анимации, иначе при загрузке блоки успевают мигнуть
  void document.body.offsetWidth;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => els.forEach((el) => el.classList.remove('rv--instant')));
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      io.unobserve(el);
      el.classList.add('rv-in');
      setTimeout(() => {
        el.classList.remove('rv', 'rv-in', 'rv--left', 'rv--right', 'rv--soft', 'rv--rise', 'rv--instant');
        el.style.removeProperty('--rd');
      }, 1800);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -7% 0px' });

  els.forEach((el) => io.observe(el));
})();
