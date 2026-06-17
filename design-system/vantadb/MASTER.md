# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.
>
> **Generated via:** `vanta-design-orchestrator` + `ui-ux-pro-max` + `impeccable` + `redesign-existing-projects`
> **Last updated:** 2026-06-17

---

**Project:** VantaDB  
**Category:** Developer Tool — Embedded Vector+Graph Database for AI Agents  
**Aesthetic Family:** Gravitational Editorial Dark · Cinematic Terminal  
**Anti-Slop Tier:** STRICT — All patterns verified against impeccable v3.6.0 slop-test

---

## IMMUTABLE CONSTRAINTS (Do Not Change)

These values are locked from user preference and must never be overridden:

| Asset          | Value                                | Reason                               |
| -------------- | ------------------------------------ | ------------------------------------ |
| Hero Component | `<SingularityHero>`                  | WebGL black-hole — untouchable       |
| Heading Font   | **Space Grotesk**                    | Explicitly requested                 |
| Monospace Font | **JetBrains Mono**                   | Project identity, terminal aesthetic |
| Body Font      | **Outfit** (or IBM Plex Sans as alt) | Readability + modern                 |
| Primary Accent | `#FF6A00` (amber-orange)             | Brand identity                       |
| Background     | `#050507` (near-void black)          | Deep space feel                      |

---

## Global Rules

### 1. Color Palette

All values in OKLCH-mapped CSS variables. **Never use raw hex in components — always use tokens.**

| Role                   | CSS Variable       | Hex                      | OKLCH approx         |
| ---------------------- | ------------------ | ------------------------ | -------------------- |
| Background             | `--background`     | `#050507`                | oklch(3% 0.01 264)   |
| Surface                | `--surface`        | `#0e0e14`                | oklch(8% 0.012 265)  |
| Surface Raised         | `--surface-raised` | `#14141c`                | oklch(10% 0.015 265) |
| Amber (Primary CTA)    | `--amber`          | `#FF6A00`                | oklch(65% 0.18 44)   |
| Amber Light            | `--amber-light`    | `#FF8C38`                | oklch(72% 0.15 50)   |
| Amber Soft             | `--amber-soft`     | `#FFB574`                | oklch(80% 0.11 60)   |
| Amber Dim              | `--amber-dim`      | `rgba(255,106,0,0.12)`   | —                    |
| Steel (Secondary)      | `--steel`          | `#8B9EB7`                | oklch(65% 0.03 235)  |
| Steel Light            | `--steel-light`    | `#B0C4DE`                | oklch(76% 0.025 230) |
| White (Headings)       | `--white`          | `#F0EDE6`                | oklch(93% 0.005 80)  |
| Frost (Body)           | `--frost`          | `#E0DEE5`                | oklch(89% 0.006 280) |
| Muted (Secondary text) | `--muted`          | `rgba(240,237,230,0.70)` | —                    |
| Subtle (Borders)       | `--subtle`         | `rgba(240,237,230,0.20)` | —                    |
| Void                   | `--void`           | `#030305`                | oklch(2% 0.008 265)  |

**Color Rules:**

- **One accent only:** `--amber`. Never add purple, blue, or green accents.
- **Shadows must be tinted:** Use `rgba(255,106,0,0.04-0.08)` not pure black.
- **Text minimum contrast:** 4.5:1 for body (`--frost`), 7:1 for critical labels.
- **No warm-neutral backgrounds:** The `#050507` IS the warmth. No cream/sand/beige sections.
- **Section dividers:** `1px solid var(--subtle)` — never thick borders.

### 2. Typography Scale

```css
/* Font Stack */
--font-display: "Space Grotesk", "Cabinet Grotesk", system-ui, sans-serif;
--font-sans: "Outfit", "IBM Plex Sans", system-ui, sans-serif;
--font-mono: "JetBrains Mono", "Fira Code", monospace;

/* Scale (fluid with clamp) */
--text-xs: clamp(0.6rem, 0.6vw + 0.5rem, 0.72rem);
--text-sm: clamp(0.75rem, 0.8vw + 0.6rem, 0.875rem);
--text-base: clamp(0.875rem, 1vw + 0.7rem, 1rem);
--text-lg: clamp(1rem, 1.2vw + 0.8rem, 1.125rem);
--text-xl: clamp(1.1rem, 1.5vw + 0.8rem, 1.35rem);
--text-2xl: clamp(1.3rem, 2vw + 0.9rem, 1.75rem);
--text-3xl: clamp(1.6rem, 3vw + 0.9rem, 2.5rem);
--text-4xl: clamp(2rem, 4vw + 1rem, 3.5rem);
--text-display: clamp(2.5rem, 6vw + 1rem, 5.5rem);
```

**Typography Rules:**

- **Headings:** Space Grotesk, `letter-spacing: -0.04em` for display, `-0.02em` for h2-h3.
- **`text-wrap: balance`** on all h1–h3. `text-wrap: pretty` on paragraphs.
- **Hero H1 ceiling:** `clamp(3rem, 6vw, 5.5rem)`. Never above 5.5rem.
- **Body line-height:** 1.65–1.75. Never below 1.5.
- **Max paragraph width:** `65ch`. Enforce with `max-width`.
- **Tabular numbers:** `font-variant-numeric: tabular-nums` on all metric displays.
- **NO ALL-CAPS EYEBROWS on every section.** Max 1 eyebrow style per section type. Use `// comment` style monospace labels instead (`// Core Engine`, `// Architecture`).
- **Weight hierarchy:** 700 (display) → 600 (h2-h3) → 500 (labels) → 400 (body). Never jump from 700 to 400 with nothing in between.

### 3. Spacing System

Base: 4px. Scale factor: 1.5× per step.

```css
--space-1: 4px; /* Tight icon gaps */
--space-2: 8px; /* Inline elements */
--space-3: 12px; /* Dense elements */
--space-4: 16px; /* Standard */
--space-6: 24px; /* Component padding */
--space-8: 32px; /* Section inner padding */
--space-12: 48px; /* Between major elements */
--space-16: 64px; /* Section vertical padding */
--space-24: 96px; /* Major section gaps */
--space-32: 128px; /* Hero / CTA breathing room */
```

**Spacing Rules:**

- **Section vertical padding:** min `8rem`, prefer `10rem–12rem` for impact.
- **Max content width:** `1200px` with auto margins.
- **Never uniform top/bottom padding.** Optically, bottom should be 10% larger.
- **Double the spacing** when unsure. VantaDB is editorial, not dense.

### 4. Shadow Depths

```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
--shadow-md: 0 8px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 106, 0, 0.04);
--shadow-lg: 0 24px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 106, 0, 0.06);
--shadow-xl: 0 40px 100px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 106, 0, 0.08);
--shadow-glow: 0 0 20px rgba(255, 106, 0, 0.2), 0 0 40px rgba(255, 106, 0, 0.1);
```

**All shadows must be amber-tinted.** Pure black shadows at low opacity = AI fingerprint.

---

## Component Specifications

### Buttons

```css
/* Primary — CTA */
.btn-primary {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  padding: 0.9rem 2rem;
  background: var(--amber);
  color: #050507;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition:
    transform 160ms var(--ease-out),
    box-shadow 160ms var(--ease-out);
}
.btn-primary:hover {
  box-shadow: 0 8px 30px rgba(255, 106, 0, 0.4);
  transform: translateY(-1px);
}
.btn-primary:active {
  transform: scale(0.97);
}

/* Ghost */
.btn-ghost {
  font-family: var(--font-mono);
  padding: 0.85rem 1.75rem;
  background: transparent;
  color: var(--frost);
  border: 1px solid var(--subtle);
  border-radius: var(--radius-md);
  transition:
    border-color 200ms,
    background 200ms;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.btn-ghost:hover {
  border-color: rgba(255, 106, 0, 0.35);
  background: rgba(255, 106, 0, 0.05);
}
```

**Button Rules:**

- Primary: amber fill, dark text. Never white text on amber.
- Ghost: subtle border only. No fill on default state.
- No pill shapes for primary actions. `--radius-md` (8px) max.
- **Mandatory `cursor: pointer`** on all interactive elements.
- Minimum touch target: 44×44px (Fitts Law).

### Cards

**Cards must justify their existence.** Use cards ONLY when elevation communicates hierarchy. Default to lists, rows, or inline text.

```css
/* Feature Card — use only for isolated feature callouts */
.feature-card {
  background: var(--surface);
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-lg);
  padding: 2rem;
  transition:
    border-color 250ms var(--ease-out),
    transform 250ms var(--ease-out);
}
.feature-card:hover {
  border-color: rgba(255, 106, 0, 0.2);
  transform: translateY(-3px);
}
```

**Anti-pattern — BANNED:**

- ❌ Three identical cards in a row (3-column equal grid). Replace with zig-zag 2-col or Bento.
- ❌ Cards with `border + shadow + white background`.
- ❌ Icon + Heading + Body text card repeated N times. Use `<FeatureRow>` pattern instead.
- ❌ Nested cards (card inside card).

### Feature Rows (zig-zag layout — preferred over card grids)

Alternating left/right layout. 2-column grid `1fr 1fr` with `gap: 5rem–8rem`. Every other row reverses (`.reverse` class). Large number label (`01`, `02`, `03`) as ghost decoration — NOT as navigation eyebrow.

### Bento Grid

For feature overviews. Use `grid-template-columns: repeat(12, 1fr)`. Cells span different widths (`span 4`, `span 8`, `span 6`) to create intentional asymmetry. Never all same-sized cells.

### Metric Bar / Stats Strip

Horizontal row, `borderTop + borderBottom: 1px solid var(--subtle)`. 4 columns with `1px gap + var(--subtle) background` between cells. Large amber number, small mono label below. Never use this as a "hero-metric template" (big number + gradient accent = banned).

### Navigation

```css
.vanta-nav {
  position: sticky;
  top: 0;
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(5, 5, 7, 0.85);
  border-bottom: 1px solid var(--subtle);
  z-index: 100;
}
```

Active nav link: `color: var(--white)` + underline. Never background-highlighted.

### InteractiveQuickstart (Split Playground)

**Layout:** Sticky sidebar (140px, 4-step navigation) + terminal window content pane. Language tabs (Python SDK / Rust Core) inside the content pane switch between code+output per step.

**Terminal Window (`.tl-window`):**
- Background `#08080c`, border `1px solid rgba(255,255,255,0.06)`, radius `var(--radius-xl)`
- Title bar with macOS-style dots (red/yellow/green) + centered label `vantadb — interactive shell v0.1` + status legend (● active / ✓ done / ○ pending)
- Title bar: `--steel` text, bottom border `rgba(255,255,255,0.04)`

**Sidebar (`.sp-sidebar`):**
- Sticky at `top: 6rem`, width 140px
- Each item: hover background `rgba(255,255,255,0.02)`, active gets `inset 2px 0 0 var(--amber)` + amber bg tint (`rgba(255,106,0,0.06)`)
- Completed: `rgba(255,106,0,0.5)` text
- Entrance: 900ms `var(--ease-out)`, translateX(-16px) → 0

**Step Block (`.sp-block`):**
- Entrance: 700ms `var(--ease-out)` fade+slide-up (20px)
- Remounts on step/lang change via React `key` — triggers fresh animation
- Typewriter effect: code characters appear at 45ms/char with `liveHighlight()` (real-time syntax highlighting via tokenizer on the partial substring)
- After code typing finishes → 300ms pause → output lines reveal at 120ms/line with stagger fade-in (350ms each)
- Visible cursor `▊` blinks at 1.2s `step-end`, amber color

**Syntax Highlighting Tokens (Material Palenight):**
```
--keyword: #c792ea  (purple)
--string:  #c3e88d  (green)
--comment: #546e7a  (slate, italic)
--number:  #f78c6c  (orange)
--function:#82aaff  (blue)
--builtin: #ffcb6b  (gold)
--operator:#89ddff  (cyan)
--punct:   rgba(240,237,230,0.3)
```

**Language Tabs (`.sp-lang-tab`):**
- Flex row with 1px divider between tabs
- Default: `--steel` text. Active: amber text + `rgba(255,106,0,0.04)` bg
- Font: `var(--font-mono)`, 0.65rem, letter-spacing 0.04em
- Each tab has inline SVG icon (layers icon for Python, circle for Rust)

**Output (`.sp-output`):**
- Background `rgba(0,0,0,0.15)`, border `rgba(255,255,255,0.01)`, radius `var(--radius-md)`
- Lines colored by prefix: `$`/`cargo` → `--steel`, `>>>`/`✓` → `#28c840`, `🔍`/`→` → `--amber-soft`, else `--frost`

**Copy Button (`.sp-copy-btn`):**
- Absolute top-right of code wrap, hidden by default (`opacity: 0`)
- Appears on `.sp-code-wrap:hover` or `:focus-visible`
- Hover: amber tint bg + border

**Mobile (< 768px):**
- Sidebar collapses to horizontal pill row (scrollable, rounded-full)
- Sidebar icon indicators hidden
- Legend hidden in titlebar
- All margins reduce to 1rem

---

## Layout Patterns

### Asymmetry Rules (Anti-Slop Priority)

- **Never 3 equal columns for features.** Use 60/40 splits, zig-zag rows, or Bento Grid.
- **No centered + symmetrical everything.** At least 2 sections must be left-heavy or right-heavy.
- **Whitespace is intentional.** Large `padding-top` differences between sections create rhythm.
- **Optical bottom padding:** `padding-bottom` = `padding-top × 1.1` to account for visual weight.
- **Overlap elements** using negative margins or `position: absolute` for depth/layering.

### Section Order (Landing Page)

```
1. Nav (sticky, glassmorphism)
2. Hero (SingularityHero — WebGL, IMMUTABLE)
3. Metrics Strip (4 stats — animated counters)
4. Quickstart (sidebar nav + terminal content pane, Python/Rust language tabs, typewriter code reveal)
5. Engine (zig-zag FeatureRows: Hybrid Search, Graph, WAL)
6. Architecture (full-width dark surface: SVG diagram + specs grid)
7. Ecosystem / Integrations (Bento Grid or asymmetric 4-card stagger)
8. Use Cases (vertical list with large ghost numbers — NOT cards)
9. CTA / Singularity (centered, orbital rings, deep radial glow)
10. Footer (minimal: logo, tagline, 4 links, copyright)
```

### Grid Variables

```css
--grid-max: 1200px;
--grid-cols: 12;
--grid-gap: 2rem;
--section-pad: clamp(6rem, 10vw, 10rem);
```

---

## Motion System

### Easing Tokens

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1); /* All UI exit/hover */
--ease-spring: cubic-bezier(0.25, 1, 0.5, 1); /* Spring-feel entries */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1); /* Page transitions */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1); /* Drawers, slides */
```

### Duration Scale

| Context                       | Duration   | Easing          |
| ----------------------------- | ---------- | --------------- |
| Micro (hover state change)    | 150ms      | `--ease-out`    |
| Standard (button, card hover) | 200-250ms  | `--ease-out`    |
| Entry animation               | 600-700ms  | `--ease-spring` |
| Page section reveal           | 700-900ms  | `--ease-out`    |
| Max (complex transition)      | 800ms      | `--ease-in-out` |
| Typewriter per character      | 45ms       | linear          |
| Output line stagger           | 120ms      | linear          |
| Output line fade-in           | 350ms      | `--ease-out`    |
| Sidebar entrance              | 900ms      | `--ease-out`    |
| Cursor blink                  | 1.2s       | `step-end`      |

### Animation Rules (Emil Kowalski Philosophy)

- **No `ease-in` in UI.** Feels slow and unresponsive. Always ease-out or spring.
- **No bounce/elastic.** Overshoot = unprofessional.
- **Hover scale max: `scale(1.02)`.** Never `scale(1.1)` — too aggressive.
- **Feedback < 100ms.** Visual state change must feel instant.
- **`will-change: transform`** only on elements known to animate. Never `will-change: all`.
- **Stagger entries.** Never mount all elements simultaneously. `transition-delay: 0.05s–0.3s`.
- **`@media (prefers-reduced-motion: reduce)`** is mandatory on every animated element.
- **Never animate `top`, `left`, `width`, `height`.** Only `transform` + `opacity` for GPU compositing.

### SVG / Graph Animations

```css
/* Stroke draw animation */
.anim-draw {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawLine 3s var(--ease-spring) forwards;
}
@keyframes drawLine {
  to {
    stroke-dashoffset: 0;
  }
}

/* Pulse glow for nodes */
.anim-pulse {
  animation: pulseGlow 3s ease-in-out infinite;
}
@keyframes pulseGlow {
  0%,
  100% {
    opacity: 0.5;
    filter: drop-shadow(0 0 2px rgba(255, 138, 0, 0.2));
  }
  50% {
    opacity: 1;
    filter: drop-shadow(0 0 8px rgba(255, 138, 0, 0.8));
  }
}

/* Orbit ring for CTA section */
.anim-orbit {
  transform-origin: center;
  animation: orbitSpin linear infinite;
}
```

---

## Surface Techniques

### Noise Overlay (Anti-Flatness)

```css
.noise-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,..."); /* base64 SVG turbulence */
  background-repeat: repeat;
  mix-blend-mode: overlay;
  z-index: 0;
  opacity: 0.08-0.15;
}
```

Apply to: Engine section, Architecture, Integrations, CTA. **Never on Hero (WebGL handles it).**

### Radial Glows (Ambient Lighting)

```css
.radial-glow-amber {
  background: radial-gradient(circle at center, rgba(255, 138, 0, 0.15) 0%, transparent 60%);
  /* Place: CTA center, Architecture bottom-left */
}

.radial-glow-steel {
  background: radial-gradient(circle at center, rgba(139, 158, 183, 0.1) 0%, transparent 60%);
  /* Place: Engine top-right */
}
```

### Glassmorphism (Use Sparingly)

Only for cards that float over background content (e.g., Integrations):

```css
backdrop-filter: blur(12px) saturate(180%);
background: rgba(14, 14, 20, 0.75);
border: 1px solid rgba(255, 255, 255, 0.06);
/* Add inner top border for refraction effect */
box-shadow:
  inset 0 1px 0 rgba(255, 255, 255, 0.05),
  var(--shadow-md);
```

---

## Iconography

- **Primary approach:** Inline `<svg>` elements — no icon library dependency. Keep icons small (12-14px for UI, 20-24px for standalone).
- **Stroke width:** 1.5px uniformly. Never mix 1px and 2px strokes.
- **No emoji as icons.** Ever. (Output text may contain `🔍` as data content, but never as interface icons.)
- **Custom icons for VantaDB concepts:** graph nodes (hexagons), WAL journal (scroll), orbit rings, vector embedding (constellation pattern).

---

## Copy & Microcopy Rules

**Banned AI clichés:** "Elevate", "Seamless", "Unleash", "Next-Gen", "Game-changer", "Delve", "Tapestry".

**Voice:** Direct, technical, confident. Write like a senior Rust engineer explaining their tool.

**CTAs:** Start with verb + specific outcome.

- ✅ `pip install vantadb-py` (imperative, technical)
- ✅ `View on GitHub` (clear destination)
- ❌ `Get Started Today!` (exclamation = weak)
- ❌ `Learn More` (too vague)

**Numbers:** Use organic data. `1.2ms` not `<5ms`. `100%` only if validated.

**Headers:** Sentence case. Never Title Case On Every Word.

**Error messages:** Direct. "Connection failed. Retry." not "Oops! Something went wrong 😅".

---

## Accessibility (WCAG AA Minimum)

- Body text (`--frost`) on `--background`: must hit **4.5:1** minimum.
- Amber on dark: verify per usage. `#FF6A00` on `#050507` ≈ 5.8:1 ✓
- **All interactive elements need visible focus state.** Use `outline: 2px solid var(--amber); outline-offset: 3px`.
- **`prefers-reduced-motion`:** All animations must fall back to instant/crossfade.
- **Minimum touch target:** 44×44px. Apply `min-height: 44px; min-width: 44px`.
- **Skip-to-content link** at top of page (hidden, appears on focus).
- **`aria-label`** on icon-only buttons. All SVG icons have `aria-hidden="true"` when decorative.

---

## Code Quality Standards

- **No inline styles in components.** All values must use CSS variables. **Exception:** dynamic output line colors (prefix-based coloring in terminal output) may use inline `style={{ color }}` computed from runtime data.
- **No `z-index: 9999`.** Establish z-index scale: `--z-nav: 100`, `--z-modal: 200`, `--z-toast: 300`.
- **`min-height: 100dvh`** not `height: 100vh` for full-screen sections.
- **Semantic HTML:** `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
- **No commented-out dead code** before shipping.
- **`scroll-behavior: smooth`** in CSS root.

---

## Anti-Patterns (BANNED — NEVER USE)

From `impeccable` v3.6.0 + `redesign-existing-projects` slop-test:

### Visual

- ❌ **Gradient text** (`background-clip: text`) — decorative noise.
- ❌ **Purple/blue "AI gradient"** — biggest fingerprint. Amber or nothing.
- ❌ **Glassmorphism as default** — only for specific floating cards.
- ❌ **Hero-metric template** — big number + gradient accent = SaaS cliché.
- ❌ **Three equal card columns as feature row** — the most generic AI layout.
- ❌ **Tiny uppercase tracked eyebrow above EVERY section** — use `// comment` style mono labels maximum once per section, not repeated on all.
- ❌ **Numbered section markers as default scaffolding (01/02/03 as eyebrows)** — only use when truly sequential content.
- ❌ **Warm-neutral body background** — no cream, sand, beige, linen.
- ❌ **Side-stripe borders** (`border-left > 1px` as accent) — never on cards or sections. **Exception:** sidebar nav active item uses `inset 2px 0 0 var(--amber)` as navigation indicator.
- ❌ **Emojis as icons**.
- ❌ **Scale on image hover** (`.group:hover img { transform: scale }`) — animate card border/shadow instead.

### Layout

- ❌ **Symmetrical everything** — must have at least 2 intentionally asymmetric sections.
- ❌ **`height: 100vh`** — use `min-height: 100dvh`.
- ❌ **4-column footer link farm** — simplify to 4 links max.
- ❌ **Accordion FAQ** — use inline progressive disclosure.
- ❌ **Nested cards** (card inside card) — ever.

### Content

- ❌ **Lorem ipsum** — always real copy.
- ❌ **Round fake numbers** (`99.99%`, `100K`) — use real validated metrics.
- ❌ **"Oops!" error messages**.
- ❌ **Exclamation marks in CTAs or success messages**.

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis as icons — SVG only
- [ ] All icons same stroke weight (1.5px)
- [ ] `cursor: pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Text contrast ≥4.5:1 on all body text
- [ ] Focus states visible (amber outline)
- [ ] `prefers-reduced-motion` respected on every animation
- [ ] Responsive: 375px, 768px, 1024px, 1440px tested
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
- [ ] No inline styles — all values use CSS tokens
- [ ] No `z-index: 9999` — use z-index scale
- [ ] Slop test passed (no 3-equal-col cards, no purple gradients, no emoji icons)
- [ ] Asymmetric layout on ≥2 sections
- [ ] Noise overlay on non-hero sections
- [ ] Amber radial glow on CTA section
