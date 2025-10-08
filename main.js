document.addEventListener("DOMContentLoaded", () => {
  const accordionButtons = document.querySelectorAll(".accordion-button");

  accordionButtons.forEach((button) => {
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    if (!panel) return;

    button.setAttribute("aria-expanded", "false");

    const plus = button.querySelector(".plus");
    const minus = button.querySelector(".minus");
    if (plus) plus.classList.remove("hidden");
    if (minus) minus.classList.add("hidden");

    button.addEventListener("click", () => toggleAccordion(button));
    button.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleAccordion(button);
      }
    });
  });

  function toggleAccordion(button) {
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    if (!panel) return;

    const expanded = button.getAttribute("aria-expanded") === "true";
    const plus = button.querySelector(".plus");
    const minus = button.querySelector(".minus");

    // Close all panels
    document.querySelectorAll(".accordion-content").forEach((p) => {
      p.style.maxHeight = null;
      p.classList.remove("active");
    });
    accordionButtons.forEach((btn) => {
      btn.setAttribute("aria-expanded", "false");
      const btnPlus = btn.querySelector(".plus");
      const btnMinus = btn.querySelector(".minus");
      if (btnPlus) btnPlus.classList.remove("hidden");
      if (btnMinus) btnMinus.classList.add("hidden");
    });

    // Open selected panel
    if (!expanded) {
      button.setAttribute("aria-expanded", "true");
      if (plus) plus.classList.add("hidden");
      if (minus) minus.classList.remove("hidden");

      panel.classList.add("active");
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }
});
