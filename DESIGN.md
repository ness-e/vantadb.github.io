---
name: VantaDB
description: Embedded cognitive memory for AI agents — Swiss High-Contrast Minimal design system
colors:
  background: oklch(98% 0.005 85)
  surface: oklch(96% 0.002 85)
  surface-raised: oklch(92% 0.003 85)
  surface-overlay: oklch(100% 0 0)
  surface-glass: rgba(249, 248, 246, 0.85)
  foreground: oklch(0% 0 0)
  amber: oklch(65% 0.26 45)
  amber-light: oklch(70% 0.24 45)
  amber-soft: oklch(80% 0.15 45)
  amber-dim: rgba(255, 85, 0, 0.08)
  steel: oklch(35% 0.01 240)
  steel-light: oklch(25% 0.015 240)
  steel-dim: rgba(35, 35, 45, 0.06)
  muted: oklch(40% 0.01 80)
  subtle: oklch(88% 0.004 85)
  border: oklch(15% 0.008 265)
  border-strong: oklch(0% 0 0)
  success: oklch(58% 0.18 140)
  warn: oklch(76% 0.15 85)
  danger: oklch(50% 0.23 25)
typography:
  display:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.8rem, 8vw, 7.5rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: -0.05em
  headline:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 5vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.04em
  title:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.02em
  body:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: 1.05rem
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: -0.01em
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: 0.72rem
    fontWeight: 600
    letterSpacing: 0.14em
    textTransform: uppercase
  code:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: 0.88rem
    fontWeight: 400
rounded:
  sm: 0px
  md: 2px
  lg: 4px
  xl: 6px
  pill: 0px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 96px
components:
  button-primary:
    backgroundColor: "{colors.amber}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: 10px 24px
    typography: label
  button-primary-hover:
    backgroundColor: "#000000"
    textColor: "#ffffff"
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
    border: 1px solid "{colors.border}"
    padding: 10px 24px
  button-ghost-hover:
    backgroundColor: "{colors.border}"
    textColor: "#ffffff"
  nav-link:
    backgroundColor: transparent
    textColor: "{colors.steel}"
    typography: label
  nav-link-hover:
    textColor: "{colors.foreground}"
  nav-link-active:
    textColor: "{colors.amber}"
---

# Design System: VantaDB (Swiss High-Contrast Minimal)

## 1. Overview & Creative North Star

**Creative North Star: "Swiss Grid Tech / Safety Signal"**

VantaDB es un motor de base de datos empotrado e invisible. Esta invisibilidad no se traduce en timidez estética, sino en precisión estructural quirúrgica. El nuevo sistema de diseño adopta los principios de la **Escuela Suiza de Diseño**: asimetría audaz, cuadrículas rígidas, vacíos masivos con intención y una tipografía monumental sin adornos.

El lienzo oscuro anterior es reemplazado por un fondo de papel cálido texturizado (`warm paper`), que se ve interrumpido por bloques sólidos de negro absoluto y líneas de bordes oscuros muy finos (`hairlines`). El color naranja de seguridad (`Safety Orange`) sirve como una señal estridente que llama a la acción y resalta las métricas cruciales.

Este sistema rechaza de forma absoluta los degradados suaves, las sombras redondeadas, el difuminado decorativo y los adornos innecesarios. Es honesto, estructurado e industrial.

---

## 2. Visual DNA & References

La identidad de VantaDB se fundamenta en tres pilares de precisión:

*   **Grid Suizo Riguroso (Helvetica/Bauhaus Heritage):** Diseño estructurado por cuadrículas de hairlines de 1px negras que delimitan las áreas. Asimetría intencional y contraste tipográfico masivo.
*   **Safety Orange Signal (Diseño Industrial & Señalética):** El color naranja no es decorativo; es un aviso. Representa velocidad, advertencia técnica y durabilidad física.
*   **Linear & Technical Docs (Honestidad de Datos):** Gráficos minimalistas e interactivos de rendimiento, tablas de datos claras basadas en fuentes monospace y un uso nulo de placeholders.

---

## 3. Color Palette: Neon Precision

La paleta se define por contrastes duros. No hay grises medios lavados.

### 3.1 Colors Table
| CSS Variable | OKLCH / Value | Role / Usage |
| :--- | :--- | :--- |
| `--black` | `#000000` | Negro absoluto para texto principal, bordes y bloques |
| `--background` | `#f9f8f6` | Lienzo warm paper de fondo |
| `--deep-space` | `oklch(96% 0.003 85)` | Fondo alternativo para bloques y subsecciones |
| `--void` | `oklch(94% 0.004 85)` | Contenedores de código y terminales |
| `--surface` | `#ffffff` | Fondo de tarjetas y componentes resting |
| `--surface-raised` | `oklch(92% 0.003 85)` | Tarjetas elevadas o activas (hover) |
| `--surface-glass` | `rgba(249, 248, 246, 0.85)` | Capa flotante de navegación con filtro blur mínimo |
| `--surface-overlay`| `#ffffff` | Modals y menús móviles |
| `--foreground` | `#000000` | Texto principal del sitio |
| `--white` | `#000000` | Títulos y headings principales |
| `--frost` | `oklch(20% 0.005 85)` | Cuerpo de texto legible |
| `--muted` | `oklch(40% 0.01 80)` | Texto secundario y descriptivo |
| `--steel` | `oklch(35% 0.01 240)` | Etiquetas, metadatos y botones inactivos |
| `--steel-light` | `oklch(25% 0.015 240)` | Hover en metadatos |
| `--steel-dim` | `rgba(35, 35, 45, 0.06)` | Fondos sutiles de etiquetas |
| `--amber` | `#ff5500` | Naranja de seguridad para CTAs, señales y estados activos |
| `--amber-light` | `#ff3300` | Hover en elementos naranja |
| `--amber-soft` | `#ff7733` | Sub-indicadores activos |
| `--amber-dim` | `rgba(255, 85, 0, 0.08)` | Fondo sutil de elementos activos |
| `--border` | `oklch(15% 0.008 265)` | Líneas de división de 1px de alta visibilidad |
| `--subtle` | `oklch(88% 0.004 85)` | Líneas secundarias o guías de grilla |
| `--border-strong` | `#000000` | Enfoques y bordes de acción principal |
| `--success` | `#00aa30` | Validaciones exitosas |
| `--warn` | `#dd9900` | Umbrales de advertencia |
| `--danger` | `#cc1100` | Errores y estados de fallo |

---

## 4. Typography

### 4.1 Families
*   **Display Font:** `Space Grotesk` — Estructura geométrica, geométrica y ruda.
*   **Body Font:** `Outfit` — Sans-serif limpia y legible.
*   **Mono / Label Font:** `JetBrains Mono` — Para tablas, código y metadatos.

### 4.2 Typographic Hierarchy
| Role | Size | Weight | Letter-spacing | Line-height | Font Family |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | `clamp(3.8rem, 8vw, 7.5rem)` | 700 | `-0.05em` | 0.95 | Space Grotesk |
| **Headline** | `clamp(2.2rem, 5vw, 4rem)` | 700 | `-0.04em` | 1.05 | Space Grotesk |
| **Title** | `clamp(1.3rem, 2.2vw, 1.7rem)` | 600 | `-0.02em` | 1.2 | Outfit |
| **Body** | `1.05rem` | 400 | `-0.01em` | 1.65 | Outfit |
| **Label** | `0.72rem` | 600 | `0.14em` | 1.2 | JetBrains Mono (ALL CAPS) |
| **Code** | `0.88rem` | 400 | `normal` | 1.5 | JetBrains Mono |

---

## 5. Elevation & Tactile Depth

*   **Sin Sombras Difusas:** No se utilizan sombras suaves ni degradados tridimensionales. La profundidad se logra estrictamente con bordes oscuros contrastados y cambios de color de fondo.
*   **Bordes de Bloque (1px Hairlines):** Todos los contenedores se separan mediante bordes sólidos oscuros de 1px.
*   **Elevación por Contorno:** Los elementos activos (hover) pueden cambiar su borde de `--border` a `--border-strong` (negro absoluto) y modificar su fondo.

---

## 6. Spacing & Border Radius

### 6.1 Border Radius Scale
*   `--radius-sm`: `0px` (Esquinas vivas para botones, inputs y controles)
*   `--radius-md`: `2px` (Radios mínimos)
*   `--radius-lg`: `4px` (Esquinas sutilmente suavizadas para tarjetas pequeñas)
*   `--radius-xl`: `6px` (Máximo suavizado del sistema para terminales o imágenes)
*   `--radius-pill`: `0px` (Los botones son estrictamente rectangulares)

### 6.2 Spacing Scale
*   `--spacing-xs`: `4px`
*   `--spacing-sm`: `8px`
*   `--spacing-md`: `16px`
*   `--spacing-lg`: `24px`
*   `--spacing-xl`: `32px`
*   `--spacing-2xl`: `48px`
*   `--spacing-3xl`: `64px`
*   `--spacing-4xl`: `96px`

---

## 7. Motion & Animation

*   **Rápido y Rígido:** La UI debe sentirse mecánica y veloz. Las duraciones se reducen a un rango de `150ms` a `250ms`.
*   **Easing Lineal / Cortante:** Evitamos transiciones elásticas lentas. Preferimos `--ease-out: cubic-bezier(0.25, 1, 0.5, 1)` y `--ease-linear: cubic-bezier(0.2, 0.8, 0.2, 1)`.
*   **Cortes Editoriales:** Transiciones de página secas y directas.

---

## 8. Layout Structures

### 8.1 Containers
*   `.section`: `max-width: 1200px`, padding `6rem` (top/bottom) sobre fondo warm paper.
*   `.section-sm`: padding `3rem`.
*   `.section-narrow`: Separación estricta por bordes oscuros de 1px.

---

## 9. Key Components

*   **Buttons:** Rectangulares con esquinas vivas (`0px`). Relleno Safety Orange con texto blanco para el primario, o fondo transparente con borde negro fino para el secundario.
*   **Navigation:** Barra superior minimalista blanca (`#ffffff`), altura fija de 64px, con una línea inferior fina negra de 1px.
*   **Terminal Windows:** Simulación limpia con fondo gris claro (`--void`), sin sombras, con borde oscuro nítido de 1px.

---

## 10. Technology Stack

*   **Framework:** React 19 + TypeScript 5
*   **Routing:** TanStack Router (File-based routing)
*   **Bundler:** Vite 8 + Rolldown
*   **CSS System:** Tailwind CSS v4 + native CSS custom properties
*   **WebGL / 3D:** Three.js (WebGL renderer para la Singularity Black Hole)
*   **Animation Library:** GSAP (GreenSock) + ScrollTrigger
*   **Content Parsing:** gray-matter + marked (Blog posts markdown)
*   **Hosting:** Vercel SPA deployment
