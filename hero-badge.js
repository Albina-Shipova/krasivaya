(() => {
  const hero = document.querySelector('.hero');
  const badge = hero?.querySelector('.hero-good-place');
  const stats = hero?.querySelector('.hero__stats');
  if (!badge || !stats) return;

  const align = () => {
    if (!window.matchMedia('(min-width: 761px)').matches) {
      badge.style.removeProperty('--hero-badge-top');
      return;
    }
    let offset = 0;
    for (let el = stats; el && el !== hero; el = el.offsetParent) offset += el.offsetTop;
    const top = offset + stats.offsetHeight - badge.offsetHeight;
    badge.style.setProperty('--hero-badge-top', `${top}px`);
  };

  const observer = new ResizeObserver(align);
  observer.observe(hero);
  observer.observe(hero.querySelector('.hero__copy'));
  observer.observe(stats);
  observer.observe(badge);
  window.addEventListener('resize', align);
  document.fonts.ready.then(align);
  badge.querySelector('img').addEventListener('load', align);
  const started = performance.now();
  const followIntro = (now) => {
    align();
    if (now - started < 1600) requestAnimationFrame(followIntro);
  };
  requestAnimationFrame(followIntro);
  align();
})();
