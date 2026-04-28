const root = document.documentElement;

function initThemeToggle(): void {
  const toggleButton = document.querySelector<HTMLElement>("[data-theme-toggle]");
  if (!toggleButton) return;

  function getActiveTheme(): "light" | "dark" {
    const currentTheme = root.getAttribute("data-theme");
    if (currentTheme === "dark" || currentTheme === "light") {
      return currentTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function updateToggleUi(theme: "light" | "dark"): void {
    toggleButton.setAttribute("data-active-theme", theme);
    toggleButton.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    const nextTheme = theme === "dark" ? "light" : "dark";
    const tooltip = `Switch to ${nextTheme} mode`;
    toggleButton.setAttribute("aria-label", tooltip);
    toggleButton.setAttribute("data-tooltip", tooltip);
  }

  function setTheme(theme: "light" | "dark"): void {
    root.setAttribute("data-theme", theme);
    updateToggleUi(theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // Ignore storage access issues; theme still applies for this page.
    }
    window.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
  }

  updateToggleUi(getActiveTheme());

  toggleButton.addEventListener("click", () => {
    const activeTheme = getActiveTheme();
    setTheme(activeTheme === "dark" ? "light" : "dark");
  });
}

function initMobileNavToggle(): void {
  const actions = document.querySelector<HTMLElement>(".site-header-actions");
  const toggleButton = document.querySelector<HTMLButtonElement>("[data-mobile-nav-toggle]");
  if (!actions || !toggleButton) return;

  function setMenuState(isOpen: boolean): void {
    actions.setAttribute("data-mobile-nav-open", isOpen ? "true" : "false");
    toggleButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggleButton.textContent = isOpen ? "Close menu" : "Menu";
  }

  setMenuState(false);

  toggleButton.addEventListener("click", () => {
    const isOpen = actions.getAttribute("data-mobile-nav-open") === "true";
    setMenuState(!isOpen);
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 861px)").matches) {
      setMenuState(false);
    }
  });
}

export function initThemeAndMobileNav(): void {
  const bootstrap = (): void => {
    initThemeToggle();
    initMobileNavToggle();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap, { once: true });
  } else {
    bootstrap();
  }
}
