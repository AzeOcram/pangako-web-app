(function () {
  const DURATION = 900;

  function validLink(link, e) {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return false;
    if (link.target === '_blank') return false;
    if (link.hasAttribute('download')) return false;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false;
    return true;
  }

  function getRect(el) {
    const r = el.getBoundingClientRect();
    return {
      left: r.left,
      top: r.top,
      width: r.width,
      height: r.height
    };
  }

  function makeClone(el, className) {
    const clone = el.cloneNode(true);
    clone.classList.add(className);

    const r = getRect(el);
    Object.assign(clone.style, {
      position: 'fixed',
      left: `${r.left}px`,
      top: `${r.top}px`,
      width: `${r.width}px`,
      height: `${r.height}px`,
      margin: '0',
      zIndex: '99999',
      pointerEvents: 'none'
    });

    return clone;
  }

  function runHomeExitTransition(href) {
    const logo = document.querySelector('.hero-logo');
    const nav = document.querySelector('.nav-links-wrapper-home');
    const sub = document.querySelector('.hero-sub');
    const realGradient = document.querySelector('.home-gradient-layer');

    if (!logo || !nav || !realGradient) {
      window.location.href = href;
      return;
    }

    const layer = document.createElement('div');
    layer.className = 'transition-layer';
    document.body.appendChild(layer);

    const whiteFill = document.createElement('div');
    whiteFill.className = 'transition-white-fill';

    const oldGradient = document.createElement('div');
    oldGradient.className = 'transition-gradient-old';

    const newGradient = document.createElement('div');
    newGradient.className = 'transition-gradient-new';

    const logoClone = makeClone(logo, 'transition-logo-clone');
    const navClone = makeClone(nav, 'transition-nav-clone');

    layer.appendChild(whiteFill);
    layer.appendChild(oldGradient);
    layer.appendChild(newGradient);
    layer.appendChild(navClone);
    layer.appendChild(logoClone);

    // Hide the actual home elements immediately
    realGradient.style.opacity = '0';
    logo.style.opacity = '0';
    nav.style.opacity = '0';
    if (sub) sub.style.opacity = '0';

    const navRect = getRect(nav);
    const logoRect = getRect(logo);

    // Match your inner-page CSS:
    // .page-logo { top: 16px; left: 40px; }
    // .page-logo-img { height: 36px; }
    // .navbar { padding: 16px 40px; justify-content: flex-end; }
    const targetBarHeight = 68;
    const targetLogoHeight = 36;
    const logoRatio = logoRect.width / logoRect.height;
    const targetLogoWidth = targetLogoHeight * logoRatio;

    const targetLogo = {
      left: 40,
      top: 16,
      width: targetLogoWidth,
      height: targetLogoHeight
    };

    const targetNav = {
      left: window.innerWidth - navRect.width - 40,
      top: 16,
      width: navRect.width,
      height: navRect.height
    };

    requestAnimationFrame(() => {
      logoClone.style.transition = `all ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      navClone.style.transition = `all ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      oldGradient.style.transition = `transform ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      newGradient.style.transition = `opacity ${DURATION * 0.8}ms ease`;

      logoClone.style.left = `${targetLogo.left}px`;
      logoClone.style.top = `${targetLogo.top}px`;
      logoClone.style.width = `${targetLogo.width}px`;
      logoClone.style.height = `${targetLogo.height}px`;

      navClone.style.left = `${targetNav.left}px`;
      navClone.style.top = `${targetNav.top}px`;
      navClone.style.width = `${targetNav.width}px`;
      navClone.style.height = `${targetNav.height}px`;

      // Keep old gradient visible while it physically shrinks to the bar
      oldGradient.style.transform = `scaleY(${targetBarHeight / window.innerHeight})`;

      // Fade in the destination navbar gradient near the end
      setTimeout(() => {
        newGradient.style.opacity = '1';
      }, DURATION * 0.45);
    });

    setTimeout(() => {
      window.location.href = href;
    }, DURATION);
  }

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link || !validLink(link, e)) return;

    const isHome = !!document.querySelector('.hero-logo');
    if (!isHome) return;

    e.preventDefault();
    runHomeExitTransition(link.href);
  });
})();