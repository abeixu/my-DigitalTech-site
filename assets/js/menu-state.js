/* Remember only explicit changes to each native Relearn menu checkbox. */
(() => {
  const inputs = document.querySelectorAll('#R-sidebar .R-sidebarmenu .collapsible-menu input[type="checkbox"][id]');
  const keyFor = (input) => 'crazy-abei:menu:' + input.id;

  const restore = () => {
    let changed = false;
    inputs.forEach((input) => {
      try {
        const saved = window.sessionStorage.getItem(keyFor(input));
        if (saved === 'open' || saved === 'closed') {
          changed = changed || input.checked !== (saved === 'open');
          input.checked = saved === 'open';
        }
      } catch {
        // Keep native navigation usable if browser storage is unavailable.
      }
    });
    return changed;
  };

  restore();
  inputs.forEach((input) => {
    input.addEventListener('change', () => {
      try {
        window.sessionStorage.setItem(keyFor(input), input.checked ? 'open' : 'closed');
      } catch {
        // The checkbox still works without saved state.
      }
    });
  });
  // Browsers may restore form controls when navigating back or forward.
  window.addEventListener('pageshow', () => {
    if (restore()) window.dispatchEvent(new Event('resize'));
  });
})();
