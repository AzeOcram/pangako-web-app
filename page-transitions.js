(function () {
  const DURATION = 900;
  const NAV_SCALE = 0.96; // smaller final navbar

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

    realGradient.style.opacity = '0';
    logo.style.opacity = '0';
    nav.style.opacity = '0';
    if (sub) sub.style.opacity = '0';

    const navRect = getRect(nav);
    const logoRect = getRect(logo);

    const targetBarHeight = 75;
    const targetLogoHeight = 36;
    const logoRatio = logoRect.width / logoRect.height;
    const targetLogoWidth = targetLogoHeight * logoRatio;

    const targetLogo = {
      left: 40,
      top: 16,
      width: targetLogoWidth,
      height: targetLogoHeight
    };

    const scaledNavWidth = navRect.width * NAV_SCALE;

    const targetNav = {
      left: window.innerWidth - scaledNavWidth - 40,
      top: 16
    };

    navClone.style.transformOrigin = 'top left';

    requestAnimationFrame(() => {
      logoClone.style.transition = `all ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      navClone.style.transition = `transform ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      oldGradient.style.transition = `transform ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      newGradient.style.transition = `opacity ${DURATION * 0.8}ms ease`;

      logoClone.style.left = `${targetLogo.left}px`;
      logoClone.style.top = `${targetLogo.top}px`;
      logoClone.style.width = `${targetLogo.width}px`;
      logoClone.style.height = `${targetLogo.height}px`;

      const translateX = targetNav.left - navRect.left;
      const translateY = targetNav.top - navRect.top;
      navClone.style.transform = `translate(${translateX}px, ${translateY}px) scale(${NAV_SCALE})`;

      oldGradient.style.transform = `scaleY(${targetBarHeight / window.innerHeight})`;

      setTimeout(() => {
        newGradient.style.opacity = '1';
      }, DURATION * 0.45);
    });

    setTimeout(() => {
      window.location.href = href;
    }, DURATION);
  }

  function runInnerToHomeTransition(href) {
    const logo = document.querySelector('.page-logo-img');
    const nav = document.querySelector('.nav-links-wrapper');
    const navbar = document.querySelector('.navbar');
    const pageContent =
      document.querySelector('.news') ||
      document.querySelector('.politicians') ||
      document.querySelector('.feedback-main') ||
      document.querySelector('main');

    if (!logo || !nav || !navbar) {
      window.location.href = href;
      return;
    }

    const layer = document.createElement('div');
    layer.className = 'transition-layer';
    document.body.appendChild(layer);

    const whiteFill = document.createElement('div');
    whiteFill.className = 'transition-white-fill';

    const oldGradient = document.createElement('div');
    oldGradient.className = 'transition-gradient-new';
    oldGradient.style.opacity = '1';
    oldGradient.style.height = '75px';

    const newGradient = document.createElement('div');
    newGradient.className = 'transition-gradient-old';
    newGradient.style.transform = `scaleY(${75 / window.innerHeight})`;

    const logoClone = makeClone(logo, 'transition-logo-clone');
    const navClone = makeClone(nav, 'transition-nav-clone');

    layer.appendChild(whiteFill);
    layer.appendChild(newGradient);
    layer.appendChild(oldGradient);
    layer.appendChild(navClone);
    layer.appendChild(logoClone);

    logo.style.opacity = '0';
    nav.style.opacity = '0';
    navbar.style.background = 'transparent';
    if (pageContent) pageContent.style.opacity = '0';

    const navRect = getRect(nav);
    const logoRect = getRect(logo);

    const homeLogoWidth = window.innerWidth * 0.48;
    const homeLogoHeight = homeLogoWidth / (logoRect.width / logoRect.height);

    const targetLogo = {
      left: (window.innerWidth - homeLogoWidth) / 2,
      top: (window.innerHeight - homeLogoHeight) / 2 - (-4),
      width: homeLogoWidth,
      height: homeLogoHeight
    };

    const homeNavLeft = (window.innerWidth - navRect.width) / 2 - 20;
    const homeNavTop = 24;

    navClone.style.transformOrigin = 'top left';

    requestAnimationFrame(() => {
      logoClone.style.transition = `all ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      navClone.style.transition = `transform ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      newGradient.style.transition = `transform ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      oldGradient.style.transition = `opacity ${DURATION * 0.55}ms ease`;

      logoClone.style.left = `${targetLogo.left}px`;
      logoClone.style.top = `${targetLogo.top}px`;
      logoClone.style.width = `${targetLogo.width}px`;
      logoClone.style.height = `${targetLogo.height}px`;

      const currentScaledNavWidth = navRect.width * NAV_SCALE;
      const translateX = homeNavLeft - navRect.left + ((navRect.width - currentScaledNavWidth) / 2);
      const translateY = homeNavTop - navRect.top;
      const reverseScale = 1 / NAV_SCALE;

      navClone.style.transform = `translate(${translateX}px, ${translateY}px) scale(${reverseScale})`;

      oldGradient.style.opacity = '0';
      newGradient.style.transform = 'scaleY(1)';
    });

    setTimeout(() => {
      window.location.href = href;
    }, DURATION);
  }

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link || !validLink(link, e)) return;

    const href = link.getAttribute('href');
    const isHomePage = !!document.querySelector('.hero-logo');
    const isGoingHome =
      href === '../index.html' ||
      href === 'index.html' ||
      /(^|\/)index\.html$/.test(href);

    e.preventDefault();

    if (isHomePage) {
      runHomeExitTransition(link.href);
      return;
    }

    if (isGoingHome) {
      runInnerToHomeTransition(link.href);
      return;
    }

    window.location.href = link.href;
  });
})();