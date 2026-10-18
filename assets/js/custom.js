document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#R-sidebar .R-sidebarmenu li').forEach(item => {
    const article = item.querySelector(':scope > a');
    const toggle = item.querySelector(':scope > input[type="checkbox"]');
    const children = item.querySelector(':scope > ul');
    if (!article || !toggle || !children?.children.length) return;

    article.setAttribute('role', 'button');
    article.setAttribute('aria-controls', children.id);
    const sync = () => article.setAttribute('aria-expanded', String(toggle.checked));
    toggle.addEventListener('change', sync);
    sync();

    article.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      toggle.click();
    });
    article.addEventListener('keydown', event => {
      if (event.key !== ' ') return;
      event.preventDefault();
      toggle.click();
    });
  });
});
