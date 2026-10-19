/* Folder titles are links first, disclosures second.
 * - First visit to a folder: navigate to its article normally.
 * - Clicking the already-open folder title: toggle child list.
 * - Leaf article: always navigate normally, even if already selected.
 * Keep the theme's native checkbox so its CSS animation still works. */
(() => {
  const normalizePath = (url) => {
    const path = new URL(url, document.baseURI).pathname;
    return (path.replace(/\/index\.html$/i, "/").replace(/\/+$/, "") || "/");
  };
  const currentPath = normalizePath(window.location.href);
  const folderSelector = '#R-sidebar .R-sidebarmenu ul.collapsible-menu li';
  const folders = [];

  document.querySelectorAll(folderSelector).forEach((li) => {
    const link = li.querySelector(':scope > a');
    const input = li.querySelector(':scope > label > input[type="checkbox"]');
    if (!link || !input) return;

    const key = 'crazy-abei:folder:' + normalizePath(link.href);
    const save = () => {
      try {
        sessionStorage.setItem(key, input.checked ? 'open' : 'closed');
      } catch {
        // Interaction still works when browser storage is unavailable.
      }
    };
    const restore = () => {
      try {
        const saved = sessionStorage.getItem(key);
        if (saved === 'open') input.checked = true;
        else if (saved === 'closed') input.checked = false;
      } catch {
        // Leave the Hugo-provided initial checked state intact.
      }
      link.setAttribute('aria-expanded', String(input.checked));
    };

    restore();
    folders.push({ restore });
    input.addEventListener('change', () => {
      link.setAttribute('aria-expanded', String(input.checked));
      save();
    });

    link.title = '打开目录文章；再次点击当前目录可展开或收起子文章';
    link.addEventListener('click', (event) => {
      // Allow open-in-new-tab, download and other normal link behaviors.
      if (event.defaultPrevented || event.button !== 0 ||
          event.ctrlKey || event.metaKey || event.shiftKey || event.altKey ||
          link.target === '_blank') return;

      // First click navigates; only subsequent clicks on the active page toggle.
      if (normalizePath(link.href) !== currentPath) return;
      event.preventDefault();
      input.checked = !input.checked;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  });

  // Browsers can restore stale form states when navigating back/forward.
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) folders.forEach(({ restore }) => restore());
  });
})();
