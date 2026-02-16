document.addEventListener("DOMContentLoaded", () => {

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

  // Dark mode toggle
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const iconSun = document.getElementById('icon-sun');
  const iconMoon = document.getElementById('icon-moon');

  // High contrast toggle (AAA legibility boost)
  const contrastToggle = document.getElementById('contrast-toggle');
  let highContrastOn = false;

  // Function to sync high contrast with theme
  function syncHighContrastWithTheme(theme) {
    const wasOn = document.body.classList.contains('high-contrast');
    
    if (theme === 'dark') {
      // Hide high contrast button and reset to normal
      if (contrastToggle) {
        contrastToggle.style.display = 'none';
      }
      if (wasOn) {
        document.body.classList.remove('high-contrast');
        localStorage.setItem('high-contrast', 'off');
        highContrastOn = false;
      }
    } else {
      // Show high contrast button (light theme only)
      if (contrastToggle) {
        contrastToggle.style.display = 'block';
      }
    }
  }

  // Apply saved theme or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  updateToggle(savedTheme);
  syncHighContrastWithTheme(savedTheme); // Sync on load

  toggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggle(newTheme);
    syncHighContrastWithTheme(newTheme); // Sync on toggle
  });

  function updateToggle(theme) {
    if (theme === 'dark') {
      toggle.setAttribute('aria-label', 'Hellmodus einschalten');
      toggle.setAttribute('title', 'Hellmodus einschalten');
      iconSun.classList.add('hidden');
      iconMoon.classList.remove('hidden');
    } else {
      toggle.setAttribute('aria-label', 'Dunkelmodus einschalten');
      toggle.setAttribute('title', 'Dunkelmodus einschalten');
      iconMoon.classList.add('hidden');
      iconSun.classList.remove('hidden');
    }
  }

  // High contrast toggle logic (light theme only)
  if (contrastToggle && html.getAttribute('data-theme') === 'light') {
    // Apply saved high-contrast state or default off
    const savedContrast = localStorage.getItem('high-contrast') || 'off';
    if (savedContrast === 'on') {
      document.body.classList.add('high-contrast');
      highContrastOn = true;
    }

    contrastToggle.addEventListener('click', () => {
      const isOn = document.body.classList.contains('high-contrast');
      const newState = isOn ? 'off' : 'on';
      
      if (newState === 'on') {
        document.body.classList.add('high-contrast');
        highContrastOn = true;
      } else {
        document.body.classList.remove('high-contrast');
        highContrastOn = false;
      }
      
      localStorage.setItem('high-contrast', newState);
      contrastToggle.setAttribute('aria-label', newState === 'on' 
        ? 'High contrast mode ausschalten' 
        : 'High contrast mode einschalten');
    });
  }
});
