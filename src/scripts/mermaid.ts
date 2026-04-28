import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";

const root = document.documentElement;

const darkThemeConfig = {
  theme: "base",
  themeVariables: {
    background: "#111a2c",
    primaryColor: "#162136",
    secondaryColor: "#111a2c",
    tertiaryColor: "#0b1220",
    clusterBkg: "transparent",
    clusterBorder: "transparent",
    borderRadius: 10,
    primaryTextColor: "#e6edf7",
    secondaryTextColor: "#e6edf7",
    tertiaryTextColor: "#e6edf7",
    primaryBorderColor: "transparent",
    lineColor: "#9cb0d1",
    fontFamily: "Inter, Segoe UI, Arial, sans-serif"
  }
};

const lightThemeConfig = {
  theme: "base",
  themeVariables: {
    background: "#ffffff",
    primaryColor: "#eff6ff",
    secondaryColor: "#f8fafc",
    tertiaryColor: "#ffffff",
    clusterBkg: "transparent",
    clusterBorder: "transparent",
    borderRadius: 10,
    primaryTextColor: "#0f172a",
    secondaryTextColor: "#0f172a",
    tertiaryTextColor: "#0f172a",
    primaryBorderColor: "transparent",
    lineColor: "#475569",
    fontFamily: "Inter, Segoe UI, Arial, sans-serif"
  }
};

function getActiveTheme(): "light" | "dark" {
  const explicitTheme = root.getAttribute("data-theme");
  if (explicitTheme === "light" || explicitTheme === "dark") {
    return explicitTheme;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getThemeConfig(theme: "light" | "dark") {
  return theme === "dark" ? darkThemeConfig : lightThemeConfig;
}

function getInlineMermaidContainers(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(".mermaid")).filter(
    (container) => !container.closest(".mermaid-lightbox-content")
  );
}

function captureMermaidSources(): void {
  getInlineMermaidContainers().forEach((container) => {
    if (!container.dataset.mermaidSource) {
      container.dataset.mermaidSource = container.textContent?.trim() ?? "";
    }
  });
}

function ensureMermaidLightbox(): HTMLDialogElement {
  const existing = document.querySelector<HTMLDialogElement>("dialog.mermaid-lightbox");
  if (existing) return existing;

  const dialog = document.createElement("dialog");
  dialog.className = "mermaid-lightbox";
  dialog.innerHTML = `
    <form method="dialog" class="mermaid-lightbox-header">
      <button class="button button-secondary" value="close">Close</button>
    </form>
    <div class="mermaid-lightbox-content" data-mermaid-lightbox-content></div>
  `;
  document.body.appendChild(dialog);
  return dialog;
}

async function renderInlineMermaid(theme: "light" | "dark"): Promise<void> {
  const mermaidContainers = getInlineMermaidContainers();

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict",
    flowchart: {
      useMaxWidth: true,
      htmlLabels: false,
      curve: "linear"
    },
    ...getThemeConfig(theme)
  });

  mermaidContainers.forEach((container, index) => {
    const source = container.dataset.mermaidSource ?? "";
    if (!source) return;
    container.removeAttribute("data-processed");
    container.id = `mermaid-inline-${theme}-${index}-${Date.now()}`;
    container.textContent = source;
  });

  await mermaid.run({ nodes: mermaidContainers });
}

async function openMermaidLightbox(container: HTMLElement): Promise<void> {
  const dialog = ensureMermaidLightbox();
  const content = dialog.querySelector<HTMLElement>("[data-mermaid-lightbox-content]");
  if (!content) return;

  const source = container.dataset.mermaidSource ?? "";
  if (!source) return;

  content.innerHTML = "";
  dialog.showModal();

  const lightboxDiagram = document.createElement("div");
  lightboxDiagram.className = "mermaid mermaid-lightbox-diagram";
  lightboxDiagram.textContent = source;
  content.appendChild(lightboxDiagram);

  const theme = getActiveTheme();
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict",
    flowchart: {
      useMaxWidth: false,
      htmlLabels: false,
      curve: "linear"
    },
    ...getThemeConfig(theme)
  });

  lightboxDiagram.removeAttribute("data-processed");
  lightboxDiagram.id = `mermaid-lightbox-${theme}-${Date.now()}`;
  await mermaid.run({ nodes: [lightboxDiagram] });

  const svg = lightboxDiagram.querySelector<SVGElement>("svg");
  if (svg) {
    svg.style.setProperty("max-width", "none", "important");
    svg.style.setProperty("width", "auto", "important");
    svg.style.setProperty("height", "auto", "important");
  }
}

function bindMermaidLightbox(): void {
  const mermaidContainers = getInlineMermaidContainers();

  mermaidContainers.forEach((container) => {
    if (container.dataset.mermaidLightboxBound === "true") return;

    container.dataset.mermaidLightboxBound = "true";
    container.setAttribute("role", "button");
    container.setAttribute("tabindex", "0");
    container.setAttribute("aria-label", "Open Mermaid diagram in full size");

    container.addEventListener("click", () => {
      void openMermaidLightbox(container);
    });

    container.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        void openMermaidLightbox(container);
      }
    });
  });
}

async function renderMermaidForTheme(theme: "light" | "dark"): Promise<void> {
  captureMermaidSources();
  await renderInlineMermaid(theme);
  bindMermaidLightbox();
}

export function initMermaid(): void {
  void renderMermaidForTheme(getActiveTheme());
  window.addEventListener("themechange", () => {
    void renderMermaidForTheme(getActiveTheme());
  });
}
