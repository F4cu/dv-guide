document.addEventListener('DOMContentLoaded', () => {
  const accordionButtons = document.querySelectorAll('.accordion-button');

  accordionButtons.forEach(button => {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    if (!panel) return;
    panel.classList.remove('active');

    // Setup icon states
    const plus = button.querySelector('.plus');
    const minus = button.querySelector('.minus');
    if (plus) plus.classList.remove('hidden');
    if (minus) minus.classList.add('hidden');

    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';

      // Close all: remove .active immediately from all panels
      accordionButtons.forEach(btn => {
        const p = document.getElementById(btn.getAttribute('aria-controls'));
        if (!p) return;
        btn.setAttribute('aria-expanded', 'false');
        p.classList.remove('active');
        const btnPlus = btn.querySelector('.plus');
        const btnMinus = btn.querySelector('.minus');
        if (btnPlus) btnPlus.classList.remove('hidden');
        if (btnMinus) btnMinus.classList.add('hidden');
      });

      // Open the clicked one now (no delay)
      if (!expanded) {
        button.setAttribute('aria-expanded', 'true');
        panel.classList.add('active');
        if (plus) plus.classList.add('hidden');
        if (minus) minus.classList.remove('hidden');
      }
    });
  });
});
