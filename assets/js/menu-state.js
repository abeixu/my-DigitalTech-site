/* Start closed, then restore explicit changes to each native menu checkbox. */
(() => {
  const inputs = document.querySelectorAll('#R-sidebar .R-sidebarmenu .collapsible-menu input[type="checkbox"][id]');
  const keyFor = (input) => 'crazy-abei:menu:' + input.id;

  const restore = () => {
    let changed = false;
    inputs.forEach((input) => {
      let saved = null;
      try {
        saved = window.sessionStorage.getItem(keyFor(input));
      } catch {
        // First visits still start closed when browser storage is unavailable.
      }
      const isOpen = saved === 'open';
      changed = changed || input.checked !== isOpen;
      input.checked = isOpen;
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
