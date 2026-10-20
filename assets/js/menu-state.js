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

  document.querySelectorAll('#R-sidebar .R-sidebarmenu ul.collapsible-menu li').forEach((li) => {
    const link = li.querySelector(':scope > a');
    const control = li.querySelector(':scope > input[type="checkbox"]');
    if (!link || !control) return; // Leaf pages have no disclosure.
    const href = canonical(link.href);
    const storageKey = 'crazy-abei:folder:' + href;

    function restore() {
      let saved = null;
      try { saved = sessionStorage.getItem(storageKey); } catch {}
      // Important: ignore Hugo's automatic active-ancestor expansion.
      // Only a user's own prior toggle determines whether this folder opens.
      control.checked = saved === 'open';
      link.setAttribute('aria-expanded', String(control.checked));
    }
    function persist() {
      link.setAttribute('aria-expanded', String(control.checked));
      try {
        sessionStorage.setItem(storageKey, control.checked ? 'open' : 'closed');
      } catch {}
    }

    restore();
    restoreCallbacks.push(restore);
    control.addEventListener('change', persist);
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
