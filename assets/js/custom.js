document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#R-sidebar .R-sidebarmenu li').forEach(item => {
    const article = item.querySelector(':scope > a');
    const toggle = item.querySelector(':scope > input[type="checkbox"]');
    const children = item.querySelector(':scope > ul');
    if (!article || !toggle || !children?.children.length) return;

    article.setAttribute('role', 'button');
    article.setAttribute('aria-controls', children.id);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => article.setAttribute('aria-expanded', String(toggle.checked));
    const setAccessibility = () => {
      children.inert = !toggle.checked;
      children.setAttribute('aria-hidden', String(!toggle.checked));
    };
    sync();
    setAccessibility();
    children.style.height = toggle.checked ? 'auto' : '0px';
    children.style.opacity = toggle.checked ? '1' : '0';
    item.classList.add('menu-animated');

    toggle.addEventListener('change', () => {
      sync();
      const height = children.getBoundingClientRect().height;
      children.style.height = `${height}px`;
      setAccessibility();
      if (reducedMotion.matches) {
        children.style.height = toggle.checked ? 'auto' : '0px';
        children.style.opacity = toggle.checked ? '1' : '0';
        return;
      }
      children.getBoundingClientRect();
      requestAnimationFrame(() => {
        children.style.height = `${toggle.checked ? children.scrollHeight : 0}px`;
        children.style.opacity = toggle.checked ? '1' : '0';
      });
    });
    children.addEventListener('transitionend', event => {
      if (event.target === children && event.propertyName === 'height' && toggle.checked) {
        children.style.height = 'auto';
      }
    });

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
