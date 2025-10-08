document.addEventListener("DOMContentLoaded", () => {

  console.log("✅ Sidebar marker script loaded");

  // Startseite
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

  // Select all h3 headings that label their parent sections
  const headings = document.querySelectorAll("main section > h3[id]");
  const navLinks = document.querySelectorAll("aside nav a[href^='#']");

  function clearArrows() {
    navLinks.forEach((link) => {
      link.textContent = link.textContent.replace("→", "").trim();
      link.classList.remove("active");
    });
  }

  function setActiveBySectionId(sectionId) {
    clearArrows();
    const activeLink = document.querySelector(`aside nav a[href="#${sectionId}"]`);
    if (activeLink) {
      activeLink.textContent = `${activeLink.textContent.trim()} →`;
      activeLink.classList.add("active");
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible.length > 0) {
        const heading = visible[0].target;
        const section = heading.closest("section[id]");
        if (section) {
          setActiveBySectionId(section.id);
        }
      }
    },
    {
      root: null,
      threshold: 0.3,
      rootMargin: "0px 0px -50% 0px",
    }
  );

  headings.forEach((h3) => observer.observe(h3));

});
