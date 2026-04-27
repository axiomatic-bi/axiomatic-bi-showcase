# GitHub Pages Theme Reference

This document records the current visual theme choices used by the showcase site so they can be reused consistently in other projects.

## Theme Foundation

- Platform: static Astro site deployed to GitHub Pages.
- Theme implementation: custom CSS variables and component classes (no Tailwind or third-party UI framework).
- Global theme source: `src/layouts/BaseLayout.astro`.
- Colour mode: dual dark/light palettes driven by `prefers-color-scheme`.
- Font stack: `Inter, "Segoe UI", Arial, sans-serif`.
- Visual tone: technical, minimal, high-contrast surfaces with indigo accent.

## Colour Tokens

### Dark Mode (default)

- `--bg`: `#080b11`
- `--surface`: `#111723`
- `--surface-soft`: `#161d2b`
- `--surface-subtle`: `#1b2436`
- `--border`: `#2a344a`
- `--border-strong`: `#3b4966`
- `--text`: `#e8edf7`
- `--text-muted`: `#b9c4d8`
- `--text-soft`: `#96a4c0`
- `--accent`: `#7b8dff`
- `--accent-strong`: `#96a5ff`
- `--accent-soft`: `rgba(123, 141, 255, 0.18)`
- `--accent-contrast`: `#ffffff`

### Light Mode (`@media (prefers-color-scheme: light)`)

- `--bg`: `#f4f6fb`
- `--surface`: `#ffffff`
- `--surface-soft`: `#f9faff`
- `--surface-subtle`: `#eef2fd`
- `--border`: `#d5ddf0`
- `--border-strong`: `#bec9e3`
- `--text`: `#111a2e`
- `--text-muted`: `#3a4864`
- `--text-soft`: `#5a6783`
- `--accent`: `#4f5ffd`
- `--accent-strong`: `#3b4cf8`
- `--accent-soft`: `rgba(79, 95, 253, 0.12)`
- `--accent-contrast`: `#ffffff`

## Spacing, Radius, and Layout Tokens

- Radius scale: `--radius-sm` `10px`, `--radius-md` `14px`, `--radius-lg` `18px`.
- Spacing scale: `--space-1` through `--space-16` (`0.25rem` to `4rem`).
- Section rhythm: `--section-gap: clamp(4.5rem, 7vw, 6.5rem)`.
- Content width: `--content-max-width` and `--band-max-width` are `1140px`.
- Hero width: `--hero-max-width: 1280px`.
- Shadow: `--shadow-soft` token differs by colour mode.

## Typography System

- `h1`: `clamp(2rem, 4.4vw, 3rem)` with tight letter-spacing.
- Hero `h1` (`.hero-scene .page-header h1`): `clamp(2.8rem, 7vw, 5rem)`.
- `h2`: `clamp(1.32rem, 2.8vw, 1.86rem)`.
- `h3`: `1.05rem`.
- Labels (`.section-label`, `.process-index`, `.case-preview-list dt`): uppercase, small size, wider tracking.
- Body text and list items use `--text-muted`.

## Core Component Styling

- Navigation: rounded pill links with subtle border; active state uses `--accent-soft`.
- Buttons:
  - Base `.button`: rounded, medium weight, slight hover lift (`translateY(-1px)`).
  - `.button-primary`: solid accent background.
  - `.button-secondary`: surface-based button with accent-tinted border.
- Cards: repeated pattern of `--radius-md`, tinted surface background, and semi-transparent border.
- Chips/tags: pill shape, transparent background, thin border.
- Code blocks:
  - Inline `code`: `--surface-subtle` background.
  - `pre`: `--surface` with border and rounded corners.
- Mermaid diagrams: wrapped in bordered container, custom light/dark Mermaid theme variables, strict security level.

## Page Composition Patterns

- Sticky blurred header with translucent background.
- Full-bleed hero bands using layered radial + linear gradients.
- Alternating content bands (`proof-band`, `engine-band`, `reporting-band`, `roadmap-band`, `cta-band`) to break long pages.
- Section-first structure: label -> heading -> concise lead paragraph -> supporting cards/grids.
- Reusable proof/evidence patterns:
  - evidence chips
  - proof cards
  - evidence callout list with typed tags (`code`, `sql`, `test`, `diagram`, `video`)

## Grid and Responsive Behaviour

- Breakpoint `max-width: 860px`:
  - hero and multi-column sections collapse to single column
  - process grid changes from 4 columns to 2
- Breakpoint `max-width: 640px`:
  - tighter container padding
  - process grid becomes 1 column
- Breakpoint `max-width: 680px` on case-study action bar:
  - horizontal button row stacks vertically

## Iconography and Visual Language

- Icons: Lucide React icons, typically `size={18}` for section headings and `size={16}` for button affordances.
- Icon badges use `--accent-soft` background and accent-tinted border.
- Imagery: high-contrast technical abstract visuals with rounded corners and subtle accent glow borders.

## Interaction and Accessibility Choices

- Keyboard focus states use `:focus-visible` with `2px` accent outline and offset.
- Hover feedback is subtle and consistent (colour/border shifts plus slight lift on buttons).
- Semantic landmarks are used (`header`, `main`, `footer`, `section`, `aside`, `nav`).
- Site language tag is set to `en-GB`.

## Known Theme Notes (for future reuse)

- Most visual tokens are centralised in `src/layouts/BaseLayout.astro`; reuse should start there.
- Page-specific refinements are local style blocks in route files (for example `src/pages/index.astro`).
- Some page-level gradients reference `var(--background, ...)`, while the global token name is `--bg`; if you standardise for reuse, align on one token name.
