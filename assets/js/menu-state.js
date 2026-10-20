/* Independent folder state, with article-first / repeat-click toggle behavior.
   Each directory has its own session key, so navigating to another article
   does not automatically expand or collapse unrelated directories. */
(() => {
  const canonical = (value) => {
    const path = new URL(value, document.baseURI).pathname;
    return path.replace(/\/index\.html$/i, '/').replace(/\/+$/, '') || '/';
  };
  const current = canonical(location.href);
  const restoreCallbacks = [];

  // The menu remains one line; native hover text reveals any clipped title.
  document.querySelectorAll('#R-sidebar .R-sidebarmenu ul.collapsible-menu li > a').forEach((link) => {
    if (!link.hasAttribute('title')) link.title = link.textContent.trim();
  });

  document.querySelectorAll('#R-sidebar .R-sidebarmenu ul.collapsible-menu li').forEach((li) => {
    const link = li.querySelector(':scope > a');
    const control = li.querySelector(':scope > input[type="checkbox"]');
    if (!link || !control) return; // Leaf pages have no disclosure.
    const submenu = li.querySelector(':scope > ul.collapsible-menu');
    if (!submenu) return;
    submenu.classList.add('abei-animated-submenu');
    const href = canonical(link.href);
    const storageKey = 'crazy-abei:folder:' + href;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animation = null;

    function showSubmenu(open, animated) {
      // Measure the visible frame before cancelling an in-progress animation.
      const fromHeight = submenu.getBoundingClientRect().height;
      const fromOpacity = Number.parseFloat(getComputedStyle(submenu).opacity) || 0;
      if (animation) animation.cancel();

      submenu.style.visibility = 'visible';
      submenu.style.height = open ? 'auto' : '0px';
      submenu.style.opacity = open ? '1' : '0';
      if (!animated || reducedMotion.matches || !submenu.animate) {
        if (!open) submenu.style.visibility = 'hidden';
        animation = null;
        return;
      }

      const toHeight = open ? submenu.scrollHeight : 0;
      const current = submenu.animate(
        [
          { height: `${fromHeight}px`, opacity: fromOpacity },
          { height: `${toHeight}px`, opacity: open ? 1 : 0 },
        ],
        { duration: 320, easing: 'cubic-bezier(.22, 1, .36, 1)' }
      );
      animation = current;
      current.addEventListener('finish', () => {
        if (animation !== current) return;
        animation = null;
        if (!open) submenu.style.visibility = 'hidden';
      });
    }

    function restore() {
      let saved = null;
      try { saved = sessionStorage.getItem(storageKey); } catch {}
      // Important: ignore Hugo's automatic active-ancestor expansion.
      // Only a user's own prior toggle determines whether this folder opens.
      control.checked = saved === 'open';
      link.setAttribute('aria-expanded', String(control.checked));
      showSubmenu(control.checked, false);
    }
    function persist() {
      link.setAttribute('aria-expanded', String(control.checked));
      try {
        sessionStorage.setItem(storageKey, control.checked ? 'open' : 'closed');
      } catch {}
    }

    restore();
    restoreCallbacks.push(restore);
    control.addEventListener('change', () => {
      persist();
      showSubmenu(control.checked, true);
    });
    link.addEventListener('click', (event) => {
      if (event.defaultPrevented || event.button !== 0 ||
          event.ctrlKey || event.metaKey || event.shiftKey || event.altKey ||
          link.hasAttribute('download') || (link.target && link.target !== '_self')) return;

      // First click on a different directory loads its own article.
      if (href !== current) return;

      // Second click on the already-open directory changes only its subtree.
      event.preventDefault();
      control.checked = !control.checked;
      control.dispatchEvent(new Event('change', { bubbles: true }));
    });
  });

  window.addEventListener('pageshow', (event) => {
    if (event.persisted) restoreCallbacks.forEach((restore) => restore());
  });
})();
