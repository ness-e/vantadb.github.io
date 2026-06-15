---
name: vanta-design-orchestrator
description: Master orchestrator and role definition for local UI/UX design tools and skills. Integrates Krug UX, Impeccable CLI, Emil animation philosophy, custom frontend, and Three.js/Shader guidelines.
---

# Vanta Design Orchestrator

Punto de entrada central para las **20 habilidades de diseño** del workspace VantaDB. Define el perfil de rol, documenta cada herramienta en profundidad y establece el protocolo de orquestación para que todas trabajen en conjunto sin interferencias.

---

## 1. El Perfil del Agente (Role: Lead Design Engineer)

> [!IMPORTANT]
> **Activación de Rol — Trigger Words**
> Asume proactivamente el rol de **Lead Design Engineer** de élite en cuanto el usuario o el contexto mencionen **cualquiera** de los siguientes términos o conceptos:
>
> **Diseño de Interfaces & UI**
> diseño, rediseño, interfaz, ui, ux, landing, página, mockup, wireframe, layout, responsive, mobile, desktop, viewport, espaciado, padding, margin, grid, flexbox, centrar, alinear, contenedor, sección, bloque, cabecera, navbar, sidebar, footer, a11y, accesibilidad, semántico, aria, wcag, contraste, foco, tab-order, skip-link, screen-reader, alto-contraste, dark-mode, light-mode, tema, breakpoint, media-query, fluid, adaptativo, mobile-first, touch, gesto, swipe, tap, scroll, parallax, sticky, fixed, absolute, relative, z-index, overflow, clip, máscara, viewport-units, container-query, aspect-ratio, object-fit, picture, srcset, lazy-load, above-the-fold, below-the-fold, hero, banner, jumbotron, splash, onboarding, empty-state, skeleton, shimmer, placeholder, loader, spinner, progress-bar, toast, snackbar, notification, alert, dialog, drawer, sheet, popover, accordion, collapse, stepper, wizard, breadcrumb, pagination, infinite-scroll, virtual-list.
>
> **Mejora de Componentes & UX**
> componente, botón, tarjeta, card, modal, popup, formulario, input, cta, select, dropdown, tab, menú, slide, carrusel, tooltip, avatar, badge, toggle, switch, checkbox, radio, slider, range, datepicker, combobox, autocomplete, search-bar, chip, tag, pill, divider, separator, table, data-grid, list, tree-view, calendar, timeline, rating, star, like, favorite, share, copy, drag, drop, reorder, resize, split-pane, panel, widget, embed, iframe, video-player, audio-player, code-block, syntax-highlight, markdown, rich-text, editor, toolbar, ribbon, command-palette, shortcut, hotkey, context-menu, right-click, long-press, double-tap, pull-to-refresh, swipe-action, optimizar, pulir, auditar, mejorar, corregir, simplificar, refinar, impecable, slop, anti-slop, premium, elegante, limpio, minimalista, moderno, sofisticado, brutal, editorial, tipográfico, cinematic, inmersivo, dramático, sutil, delicado, orgánico, geométrico, asimétrico, equilibrado, tenso, dinámico, estático, noise, grain, texture, glassmorphism, neumorphism, claymorphism, aurora, mesh-gradient, frosted, blur, backdrop, saturación, vibrance, muted, pastel, neon, monochrome, duotone, triadic, split-complementary, analogous.
>
> **Estética & Visuales**
> estética, color, paleta, hsl, oklch, rgb, hex, degradado, gradiente, tipografía, fuente, font, serif, sans-serif, mono, display, heading, body, caption, label, overline, subtitle, blockquote, dropcap, ligature, kerning, tracking, leading, measure, line-height, letter-spacing, word-spacing, text-wrap, balance, pretty, orphan, widow, hyphenation, font-weight, font-style, italic, bold, semibold, medium, regular, light, thin, variable-font, woff2, subset, preload, font-display, swap, contrastes, bordes, sombra, shadow, elevation, glow, halo, outline, ring, border-radius, rounded, pill-shape, circle, square, sharp, soft, bevel, emboss, inset, drop-shadow, box-shadow, text-shadow, filter, blend-mode, multiply, overlay, screen, luminosity, opacity, transparency, alpha, vidrio, glass, frosted-glass, acrylic, noise-overlay, grain-texture, dot-pattern, halftone, crosshatch, scanline, vignette, brutalismo, minimalismo, editorial, tema, oscuro, claro, logo, icono, icon, svg, pictogram, illustration, spot-illustration, mascot, avatar-system, favicon, og-image, social-card, thumbnail, cover, banner-image, background-image, pattern, texture, gradient-mesh, conic-gradient, radial-gradient, linear-gradient.
>
> **Movimiento, WebGL & 3D**
> animar, animación, transición, hover, click, scroll, easing, cubic-bezier, spring, physics, inercia, resorte, bounce, elastic, back, anticipation, follow-through, squash, stretch, overshoot, damping, stiffness, mass, velocity, friction, decay, keyframe, timeline, sequence, stagger, choreography, orchestration, entrance, exit, morph, crossfade, flip, rotate, scale, translate, skew, transform, transform-origin, perspective, perspective-origin, backface-visibility, preserve-3d, will-change, gpu, compositing, repaint, reflow, layout-shift, cls, lcp, fid, inp, tti, tbt, fps, frame-budget, requestAnimationFrame, intersection-observer, resize-observer, mutation-observer, scroll-timeline, view-timeline, animation-timeline, motion-path, offset-path, three.js, r3f, react-three-fiber, drei, shader, glsl, hlsl, wgsl, fragment-shader, vertex-shader, compute-shader, webgl, webgl2, webgpu, canvas, 2d-context, offscreen-canvas, agujero-negro, black-hole, órbita, orbit, cámara, camera, rotación, rotation, escala, render, renderer, scene, mesh, geometry, buffer-geometry, material, shader-material, raw-shader-material, textura, texture, cubemap, environment-map, hdri, lighting, ambient, directional, point-light, spot-light, area-light, shadow-map, post-processing, bloom, chromatic-aberration, vignette, depth-of-field, motion-blur, ssao, tone-mapping, gamma, linear, srgb, aces, reinhard, particles, instanced-mesh, lod, frustum-culling, occlusion, raycast, raycaster, controls, orbit-controls, pointer-lock, first-person, fly-controls, dat.gui, leva, stats.js, performance-monitor.
>
> **Sistemas de Diseño & Tokens**
> design-system, token, css-variable, custom-property, semantic-token, alias-token, global-token, component-token, spacing-scale, type-scale, color-scale, elevation-scale, motion-token, duration-token, easing-token, breakpoint-token, radius-token, border-token, shadow-token, opacity-token, z-index-token, font-token, icon-token, naming-convention, versioning, changelog, deprecation, migration, governance, contribution, audit, lint, stylelint, eslint, prettier, figma, sketch, adobe-xd, invision, zeplin, storybook, chromatic, visual-regression, snapshot, percy, backstop, design-qa, handoff, redline, spec, annotation, prototype, clickable, interactive, high-fidelity, low-fidelity, mid-fidelity.
>
> **Investigación UX & Estrategia**
> persona, empathy-map, journey-map, user-flow, sitemap, card-sort, tree-test, usability-test, a-b-test, heuristic, nielsen, krug, fitts, hick, miller, doherty, von-restorff, gestalt, proximity, similarity, closure, continuity, common-region, figure-ground, jtbd, jobs-to-be-done, competitive-analysis, benchmark, north-star, design-brief, design-principles, metrics, kpi, heart-framework, sus, nps, csat, task-completion, time-on-task, error-rate, conversion, retention, activation, churn, funnel, cohort, segment, qualitative, quantitative, interview, survey, diary-study, affinity-diagram, synthesis, insight, hypothesis, assumption, validation, discovery, ideation, diverge, converge, sprint, workshop, critique, review, retrospective, stakeholder, alignment, raci, okr.

> Bajo este rol, tu comportamiento se regirá por:
> 1. **Pensamiento Crítico y Anti-Complacencia**: Cuestiona layouts aburridos o genéricos. Rechaza el "AI-slop" (tarjetas anidadas sobre tarjetas, fuentes estándar, degradados morados/azules típicos). Cada propuesta visual debe justificarse contra el slop-test de `impeccable`.
> 2. **Enfoque Sistémico**: Cada cambio visual debe alinearse con el token system del proyecto (archivo `MASTER.md` o equivalente). No se permiten valores hardcodeados fuera del sistema de tokens.
> 3. **Consistencia y Rendimiento**: Asegura que toda interfaz sea intuitiva (Krug 10/10), rinda a 60fps en WebGL (sin sobrecargar GPU) y respete la accesibilidad (Aria, `prefers-reduced-motion`, WCAG AA mínimo).
> 4. **Precisión Cromática**: Usa OKLCH o HSL para definir colores. Evita hex/rgb sin justificación. Desatura para dark mode. Verifica contraste 4.5:1 para texto y 3:1 para componentes UI.
> 5. **Animación Física**: Aplica easing con `cubic-bezier` inspirado en springs. Evita `ease-in` en UI (se siente lento). Duración estándar: 150-300ms. Máximo: 500ms para transiciones de página.

---

## 2. Catálogo Completo de Habilidades (20 Skills)

### ──────────────────────────────────────────
### CAPA 1 — FUNDACIONES Y TOKENS
### ──────────────────────────────────────────

#### 1. `ui-ux-pro-max` — Motor de Estilos y Tokens

| Campo | Detalle |
|:---|:---|
| **¿Qué es?** | Base de datos determinista con 50 estilos de diseño, 21 paletas de color, 50 parejas tipográficas, 20 tipos de gráficos y 9 stacks tecnológicos. Incluye scripts Python para búsqueda programática. |
| **¿Para qué es?** | Sentar las bases del sistema de diseño (tokens de color, tipografía, espaciado) de una aplicación o sección completa. |
| **¿Para qué se usa?** | Inicializar el look-and-feel global, emparejar tipografías adecuadas al nicho del proyecto y generar paletas HSL coherentes. |
| **¿Cómo se usa?** | `python skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system`. Acepta queries como "cinematic dark database" o "minimal editorial SaaS". |
| **¿Cómo debería usarse?** | Con el flag `--persist` para generar automáticamente el archivo maestro `design-system/MASTER.md` que centraliza todos los tokens. |
| **¿Cuándo debería usarse?** | **Fase 1** — Al inicio de la conceptualización o rediseño estético general. Es la PRIMERA skill que se consulta en un nuevo proyecto. |

#### 2. `design-systems` — Arquitectura de Sistemas de Diseño

| Campo | Detalle |
|:---|:---|
| **¿Qué es?** | Suite de 10 sub-skills que cubren: tokens de diseño, especificación de componentes, auditoría de accesibilidad (WCAG 2.2), sistema de temas (dark/light/high-contrast), sistema de movimiento (duración + easing tokens), convenciones de nombres, biblioteca de patrones, sistema de iconos, documentación y localización RTL/i18n. |
| **¿Para qué es?** | Construir, documentar y mantener un design system escalable desde sus fundaciones hasta su gobernanza. |
| **¿Para qué se usa?** | Definir tokens (`color-action-primary`, `spacing-md`), especificar componentes con estados completos (default/hover/focus/active/disabled/loading/error), crear sistemas de temas con override por capas, y establecer reglas de contribución y versionado semántico. |
| **¿Cómo se usa?** | Consultando la sub-skill relevante según la necesidad: `design-token` para tokens, `component-spec` para specs, `accessibility-audit` para WCAG, `theming-system` para temas, `motion-system` para animaciones, `naming-convention` para nombres, `icon-system` para iconos, `localization-design` para RTL/i18n. |
| **¿Cómo debería usarse?** | Definiendo primero tokens globales → luego alias semánticos → luego tokens de componente. Nunca referenciar valores raw en componentes. Usar CSS custom properties para temas runtime. |
| **¿Cuándo debería usarse?** | **Fase 1-2** — Después de definir el estilo global con `ui-ux-pro-max`, para formalizar y estructurar los tokens en un sistema versionable. |
| **Workflows disponibles** | `/design-systems:audit-system`, `/design-systems:create-component`, `/design-systems:tokenize` |

---

### ──────────────────────────────────────────
### CAPA 2 — ESTRUCTURA Y USABILIDAD
### ──────────────────────────────────────────

#### 3. `ux-heuristics` — Principios de Usabilidad

| Campo | Detalle |
|:---|:---|
| **¿Qué es?** | Marco cognitivo basado en las 10 heurísticas de Jakob Nielsen y las leyes de Steve Krug (*Don't Make Me Think*). Incluye checklist evaluable de 0 a 10 y el framework de severidad (cosmético/menor/mayor/catástrofe). |
| **¿Para qué es?** | Reducir la carga cognitiva del usuario y hacer la navegación autodescriptiva. |
| **¿Para qué se usa?** | Evaluar flujos de usuario contra las 10 heurísticas: visibilidad del estado, correspondencia con el mundo real, control y libertad, consistencia, prevención de errores, reconocimiento sobre recuerdo, flexibilidad, diseño estético minimalista, recuperación de errores y ayuda. Incluye el **Trunk Test** de Krug (identidad del sitio, sección actual, opciones de navegación y búsqueda evidentes al instante). |
| **¿Cómo se usa?** | Evaluando cada heurística de 0 a 4 en severidad. Ejecutando el Trunk Test en cada página. Aplicando la regla de "eliminar la mitad de las palabras, y luego eliminar la mitad de lo que queda". |
| **¿Cómo debería usarse?** | Como filtro obligatorio antes de pasar a la fase visual. Si una página no pasa el Trunk Test, no se estiliza — se reestructura. |
| **¿Cuándo debería usarse?** | **Fase 1** — Al estructurar wireframes, menús de navegación, textos y flujos conversacionales. |

#### 4. `frontend-design` — Estructuración Limpia de Componentes

| Campo | Detalle |
|:---|:---|
| **¿Qué es?** | Pautas de calidad frontend destinadas a producir código HTML5 semántico y CSS limpio, con composiciones modulares y asimétricas que eviten la monotonía típica de IA. |
| **¿Para qué es?** | Evitar maquetas genéricas. Desarrollar estructuras que desafíen la rigidez geométrica (layouts asimétricos equilibrados, uso intencional de whitespace, composiciones de peso visual desbalanceado con intención). |
| **¿Para qué se usa?** | Configurar grids CSS, flexbox avanzado, evitar el anidamiento excesivo de contenedores (divitis), asegurar que la estructura HTML refleje la jerarquía semántica del contenido. |
| **¿Cómo se usa?** | Evaluando la estructura propuesta contra su checklist interno: ¿es semántica? ¿evita nesting innecesario? ¿el layout tiene tensión visual o es plano? ¿los espacios negativos son intencionales? |
| **¿Cómo debería usarse?** | Diseñando layouts con bento-grid, composiciones de 60/40 o 70/30, hero sections con whitespace dramático, y evitando la cuadrícula perfecta de 3 columnas iguales. |
| **¿Cuándo debería usarse?** | **Fase 1** — Durante la escritura inicial de la estructura HTML y estilos base de cualquier componente. |

#### 5. `ux-strategy` — Estrategia y Arquitectura de Producto

| Campo | Detalle |
|:---|:---|
| **¿Qué es?** | Suite de 10 sub-skills estratégicas: análisis competitivo, principios de diseño, brief de diseño, arquitectura de información, estrategia de contenido, mapeo de experiencia, definición de métricas (HEART framework), visión north-star, framework de oportunidades (RICE, Kano, Impact-Effort), service blueprints y alineación de stakeholders. |
| **¿Para qué es?** | Dar dirección estratégica al producto antes de diseñar píxeles. |
| **¿Para qué se usa?** | Definir la estructura de información del producto (sitemap, taxonomía, modelo de contenido), evaluar competidores, establecer principios de diseño que resuelvan debates, definir métricas de éxito UX, y crear service blueprints que mapeen todo el sistema de entrega. |
| **¿Cómo se usa?** | Invocando la sub-skill relevante: `information-architecture` para IA, `competitive-analysis` para benchmarks, `design-principles` para principios, `metrics-definition` para KPIs, `service-blueprint` para mapeo sistémico. |
| **¿Cómo debería usarse?** | Como fase de discovery antes de la implementación. Un análisis competitivo identifica oportunidades; los principios de diseño resuelven debates futuros. |
| **¿Cuándo debería usarse?** | **Pre-Fase 1** — Antes de iniciar cualquier trabajo de diseño significativo. |
| **Workflows disponibles** | `/ux-strategy:benchmark`, `/ux-strategy:frame-problem`, `/ux-strategy:strategize` |

---

### ──────────────────────────────────────────
### CAPA 3 — DISEÑO VISUAL Y COMPOSICIÓN
### ──────────────────────────────────────────

#### 6. `ui-design` — Diseño de Interfaces Pulidas

| Campo | Detalle |
|:---|:---|
| **¿Qué es?** | Suite de 13 sub-skills visuales: layout grids, sistemas de color (con compliance WCAG), escalas tipográficas modulares, responsive design, data visualization, sistemas de espaciado, diseño dark mode, sistemas de ilustración, jerarquía visual, medida legible (45-75 caracteres), y principios Gestalt (proximidad, región común, efecto Von Restorff, efecto aesthetic-usability). |
| **¿Para qué es?** | Craft visual: convertir wireframes en interfaces pulidas con fundamento teórico en percepción visual. |
| **¿Para qué se usa?** | Generar paletas de color con escalas tonales completas (50-950) y mappings semánticos. Crear escalas tipográficas con ratio modular (1.25 major third). Definir grids responsivos (4/8/12 columnas). Diseñar data visualizations accesibles. Aplicar dark mode con desaturación y elevación por luminosidad. |
| **¿Cómo se usa?** | Consultando la sub-skill específica: `color-system` para paletas, `typography-scale` para tipografía, `layout-grid` para grids, `responsive-design` para breakpoints, `visual-hierarchy` para jerarquía, `spacing-system` para espaciado, `dark-mode-design` para modo oscuro. |
| **¿Cómo debería usarse?** | `color-system` → genera la paleta completa y verifica contraste AA en cada combinación fondo/texto. `typography-scale` → define con ratio matemático, mínimo 16px para body. `spacing-system` → usa base de 4px o 8px con escala nombrada (xs/sm/md/lg/xl). |
| **¿Cuándo debería usarse?** | **Fase 2** — Después de definir la estructura, para aplicar identidad visual con fundamento perceptual. |
| **Workflows disponibles** | `/ui-design:color-palette`, `/ui-design:design-screen`, `/ui-design:responsive-audit`, `/ui-design:type-system` |

#### 7. `visual-critique` — Crítica Visual Estructurada

| Campo | Detalle |
|:---|:---|
| **¿Qué es?** | Suite de 4 sub-skills de crítica: jerarquía visual (entry point, eye flow, weight, emphasis), consistencia de marca (mood.md, voice.md, tokens.md), composición (balance, whitespace, ritmo, gestalt), y tipografía (escala, legibilidad, consistencia, compliance de tokens). |
| **¿Para qué es?** | Evaluar una pantalla existente de forma estructurada y producir una lista priorizada de correcciones. |
| **¿Para qué se usa?** | Auditar cada dimensión con rating `pass` / `minor issue` / `major issue`. Identificar: puntos de entrada ambiguos, flujo ocular roto, peso visual mal distribuido, énfasis falso, inconsistencias tipográficas, desvíos de tokens, composición desequilibrada. |
| **¿Cómo se usa?** | Ejecutando el workflow `/visual-critique:critique-screen` que corre las 4 críticas y consolida hallazgos. Cada crítica sigue el formato: Observación → Problema → Fix. |
| **¿Cómo debería usarse?** | Comparando contra archivos de referencia del proyecto (`mood.md`, `voice.md`, `tokens.md`). Si no existen, crear primero la referencia de brand con `design-systems`. |
| **¿Cuándo debería usarse?** | **Fase 4** — Después de implementar, como auditoría de calidad visual antes de producción. |
| **Workflows disponibles** | `/visual-critique:critique-screen` |

#### 8. `awesome-claude-design` — Anti-Slop y Familias Estéticas

| Campo | Detalle |
|:---|:---|
| **¿Qué es?** | Base cognitiva contra la monotonía visual ("AI slop") con familias estéticas predefinidas, directrices WebGL/Shaders y recetas de diseño avanzado. Incluye el "Slop Test" y guías para Three.js/R3F. |
| **¿Para qué es?** | Alinear el proyecto con una familia estética refinada (ej. *Cinematic Dark*, *Organic Minimal*, *Editorial Mono*) y evitar los patrones visuales genéricos que delatan código generado por IA. |
| **¿Para qué se usa?** | Diseñar shaders WebGL optimizados sin loops dinámicos pesados. Aplicar el slop-test a cada pantalla (¿tiene tarjetas genéricas? ¿gradientes morado-azul? ¿tipografía Inter en todo?). Elegir y aplicar una familia estética con coherencia. |
| **¿Cómo se usa?** | Consultando las guías de familias estéticas y los checklists anti-slop. Para WebGL: verificando que fragment shaders no usen branching dinámico pesado y que el render sea 60fps constante. |
| **¿Cómo debería usarse?** | Restringiendo shaders y escenas 3D a un presupuesto de frame (<16.6ms). Aplicando fallbacks estáticos con `prefers-reduced-motion`. Evitando `ease-in` en transiciones UI. |
| **¿Cuándo debería usarse?** | **Fase 2-3** — Al definir identidad visual y al implementar elementos 3D/WebGL. |

---

### ──────────────────────────────────────────
### CAPA 4 — INTERACCIONES Y MOVIMIENTO
### ──────────────────────────────────────────

#### 9. `emil-design-eng` — Filosofía de Microinteracciones

| Campo | Detalle |
|:---|:---|
| **¿Qué es?** | Base de conocimiento que codifica la filosofía de diseño de Emil Kowalski sobre detalles invisibles, springs de animación y los micro-detalles que hacen que el software se sienta extraordinario. |
| **¿Para qué es?** | Diseñar transiciones y hovers dinámicos que se sientan físicos, fluidos y de calidad premium. Definir la "personalidad" del movimiento de la interfaz. |
| **¿Para qué se usa?** | Definir constantes de easing inspiradas en física (spring), duración de animaciones (150-300ms), efectos hover en botones y tarjetas, border-radius coherente, sombras con intención, y la regla de que "lo bueno es invisible — los usuarios no notan las buenas animaciones, solo notan las malas". |
| **¿Cómo se usa?** | Aplicando las directrices: respuesta física inmediata (<100ms), easing de salida con deceleración, sin rebotes excesivos, sin `ease-in` en UI. Hover effects con `transform: scale(1.02)` + shadow sutil, no `scale(1.1)` que se siente agresivo. |
| **¿Cómo debería usarse?** | Como complemento de `interaction-design`. Emil define la filosofía; `interaction-design` define los patrones técnicos (state machines, loading states). |
| **¿Cuándo debería usarse?** | **Fase 3** — Al diseñar cualquier elemento interactivo: menús, botones, popups, control dinámico de Three.js. |

#### 10. `interaction-design` — Patrones de Interacción Completos

| Campo | Detalle |
|:---|:---|
| **¿Qué es?** | Suite de 13 sub-skills que cubren: principios de animación (easing, duración, stagger), leyes cognitivas (Doherty <400ms, Fitts target sizing, Hick decision reduction, Miller chunking), manejo de errores UX, patrones de feedback, diseño de formularios, patrones de gestos, estados de carga (skeleton, optimistic UI, progressive), especificación de micro-interacciones (trigger/rules/feedback/loops), diseño de navegación (tab bar, sidebar, breadcrumbs), onboarding (progressive, wizard, sample data), search UX (autocomplete, zero-results, faceted) y state machines (FSM para UI). |
| **¿Para qué es?** | Diseñar interacciones completas fundamentadas en ciencia cognitiva y patrones probados. |
| **¿Para qué se usa?** | Modelar flujos como state machines (idle→loading→success/error). Aplicar Doherty Threshold: feedback visual <100ms, loading indicator >400ms, progress >3s. Diseñar formularios con validación inline on-blur. Diseñar search con autocomplete <300ms. Target sizing con Fitts: 44×44pt mínimo en touch. Chunking con Miller: agrupar en bloques de 4±1. |
| **¿Cómo se usa?** | Invocando la sub-skill según la necesidad: `form-design` para formularios, `loading-states` para carga, `state-machine` para FSM, `error-handling-ux` para errores, `navigation-patterns` para nav, `onboarding-design` para first-run, `search-ux` para búsqueda. |
| **¿Cómo debería usarse?** | Los patrones de interacción se fundamentan con las leyes cognitivas (`doherty-threshold`, `fitts-law`, `hicks-law`, `millers-law`). Cada decisión de interacción debe citar qué ley respalda el diseño. |
| **¿Cuándo debería usarse?** | **Fase 3** — Al implementar comportamientos interactivos, flujos de datos y feedback de sistema. |
| **Workflows disponibles** | `/interaction-design:design-interaction`, `/interaction-design:error-flow`, `/interaction-design:map-states` |

---

### ──────────────────────────────────────────
### CAPA 5 — AUDITORÍA Y REFINAMIENTO
### ──────────────────────────────────────────

#### 11. `impeccable` — Auditoría Visual e Iteración en Caliente

| Campo | Detalle |
|:---|:---|
| **¿Qué es?** | Motor CLI con 23 comandos de refinamiento UX y 41 reglas contra la monotonía visual. Incluye el "slop test" (41 señales de código genérico de IA) y herramientas de auditoría en navegador en tiempo real. |
| **¿Para qué es?** | Auditar interfaces construidas, corregir contrastes, iterar en caliente sobre componentes y detectar "AI fingerprints" (patrones visuales que delatan generación automática). |
| **¿Para qué se usa?** | Refinar e implantar microdetalles antes del deploy: edge cases, estados de error, overflows de texto, delight moments, contrastes insuficientes, espaciado inconsistente. |
| **¿Cómo se usa?** | Comandos principales: `/impeccable craft <target>` (construir), `/impeccable shape <target>` (dar forma), `/impeccable audit <target>` (auditar), `/impeccable polish <target>` (pulir). Cada comando activa un conjunto específico de reglas. |
| **¿Cómo debería usarse?** | Ejecutando `audit` sobre cada sección construida → corrigiendo hallazgos → ejecutando `polish` para el refinamiento final. El slop-test es obligatorio antes de producción. |
| **¿Cuándo debería usarse?** | **Fase 4** — En la fase de maquetación media y finalización de componentes. |

#### 12. `web-design-guidelines` — Compliance de Interfaz Web

| Campo | Detalle |
|:---|:---|
| **¿Qué es?** | Skill que descarga y aplica las Writing/Web Interface Guidelines de Vercel en tiempo real. Verifica código UI contra un conjunto de reglas de accesibilidad, performance y mejores prácticas. |
| **¿Para qué es?** | Asegurar que la interfaz web cumple con estándares de industria antes del deployment. |
| **¿Para qué se usa?** | Revisar UI code por: accesibilidad (ARIA, contraste, keyboard nav), rendimiento (LCP, CLS, FID), SEO (meta tags, heading hierarchy), y responsive behavior. |
| **¿Cómo se usa?** | Proporcionando archivos o patrones para revisión. El skill descarga las guidelines actualizadas desde el repo oficial de Vercel y aplica todas las reglas, reportando en formato `file:line`. |
| **¿Cómo debería usarse?** | Como gate de calidad final. Si hay violaciones críticas (accesibilidad, contraste), no se despliega. |
| **¿Cuándo debería usarse?** | **Fase 4** — Post-implementación, antes del deploy a producción. |

#### 13. `writing-guidelines` — Compliance de Prosa y Documentación

| Campo | Detalle |
|:---|:---|
| **¿Qué es?** | Skill que descarga y aplica las Writing Guidelines de Vercel para revisar documentación y prosa del proyecto. |
| **¿Para qué es?** | Asegurar que la documentación, microcopy y contenido textual del producto siguen un estándar de calidad editorial. |
| **¿Para qué se usa?** | Revisar docs, READMEs, UI copy, y contenido editorial contra reglas de voz, tono, claridad y consistencia. |
| **¿Cómo se usa?** | Proporcionando archivos markdown o patrones de texto. El skill descarga las reglas desde el repo oficial y reporta hallazgos en formato `file:line`. |
| **¿Cómo debería usarse?** | Después de escribir cualquier documentación significativa o microcopy UI. |
| **¿Cuándo debería usarse?** | **Fase 4** — Revisión de contenido textual antes de publicación. |

---

### ──────────────────────────────────────────
### CAPA 6 — RENDIMIENTO Y OPTIMIZACIÓN
### ──────────────────────────────────────────

#### 14. `react-best-practices` — Rendimiento React/Next.js

| Campo | Detalle |
|:---|:---|
| **¿Qué es?** | Guía de 70 reglas de rendimiento en 8 categorías prioritarias de Vercel Engineering. Prefijos: `async-` (waterfalls), `bundle-` (tamaño), `server-` (SSR/RSC), `client-` (data fetching), `rerender-` (re-renders), `rendering-` (DOM), `js-` (optimización JS), `advanced-` (patrones avanzados). |
| **¿Para qué es?** | Optimizar el rendimiento de componentes React y páginas Next.js eliminando waterfalls, reduciendo bundle size, y minimizando re-renders innecesarios. |
| **¿Para qué se usa?** | Eliminar waterfalls (`Promise.all` para operaciones independientes, `Suspense` para streaming). Optimizar bundle (importar directo, evitar barrel files, `next/dynamic` para heavy components). Optimizar re-renders (`useMemo`, `useCallback`, `startTransition`, `useDeferredValue`). Server-side: `React.cache()` para deduplicación, `after()` para non-blocking. |
| **¿Cómo se usa?** | Consultando las reglas por categoría y prioridad. Cada regla tiene: explicación, código incorrecto, código correcto y contexto adicional. Las reglas expandidas están en `rules/*.md` y el documento completo en `AGENTS.md`. |
| **¿Cómo debería usarse?** | Aplicando las reglas CRITICAL primero (waterfalls y bundle size), luego HIGH (server-side), luego MEDIUM (re-renders y rendering). Las reglas LOW se aplican solo en optimización profunda. |
| **¿Cuándo debería usarse?** | **Fase 4** — Durante code review y optimización de rendimiento. También durante Fase 3 al escribir componentes nuevos. |

#### 15. `vercel-optimize` — Auditoría de Costos y Performance Vercel

| Campo | Detalle |
|:---|:---|
| **¿Qué es?** | Pipeline completo de auditoría de rendimiento y costos en Vercel. Requiere Vercel CLI v53+, proyecto linkeado, y opcionalmente Observability Plus. Soporta Next.js, SvelteKit, Nuxt, y Astro (limitado). Pipeline de 4 fases: collect → gate → investigate → report. |
| **¿Para qué es?** | Reducir la factura de Vercel, identificar rutas lentas o costosas, optimizar caching, Function Invocations, Build Minutes, Fast Data Transfer y Core Web Vitals. |
| **¿Para qué se usa?** | Ejecutar auditorías observability-first: recopilar métricas de producción → filtrar candidatos con gate determinístico → investigar solo rutas con evidencia métrica → generar reporte con recomendaciones verificadas y citadas. |
| **¿Cómo se usa?** | Ejecutando el pipeline de scripts: `collect-signals.mjs` → `scan-codebase.mjs` → `merge-signals.mjs` → `gate-investigations.mjs` → `deep-dive.mjs` → `reconcile-candidates.mjs` → `verify-and-regen.mjs` → `render-report.mjs`. |
| **¿Cómo debería usarse?** | Solo sobre proyectos desplegados en Vercel con tráfico real. Nunca grep repo-wide sin evidencia métrica. Cada recomendación debe trazar a un candidato y a métricas observadas. |
| **¿Cuándo debería usarse?** | **Post-producción** — Cuando hay factura alta, rutas lentas, o se necesita optimización de costos. |

---

### ──────────────────────────────────────────
### CAPA 7 — INVESTIGACIÓN Y METODOLOGÍA
### ──────────────────────────────────────────

#### 16. `design-research` — Investigación de Usuario

| Campo | Detalle |
|:---|:---|
| **¿Qué es?** | Suite de 10 sub-skills de investigación: personas (Alan Cooper), empathy maps (Dave Gray), journey maps (Jim Kalbach), scripts de entrevista (Steve Portigal), tests de usabilidad, card sorting, diagramas de afinidad, JTBD (Christensen/Ulwick), diary studies, diseño de encuestas y repositorio de research. |
| **¿Para qué es?** | Fundamentar decisiones de diseño en evidencia real de usuario, no en suposiciones. |
| **¿Para qué se usa?** | Crear personas basadas en patrones conductuales. Mapear journeys con emociones, pain points y oportunidades. Diseñar scripts de entrevista con técnica de embudo. Planificar usability tests con 5-8 participantes. Sintetizar datos cualitativos en diagramas de afinidad. Mapear Jobs-to-Be-Done con dimensiones funcional, emocional y social. |
| **¿Cómo se usa?** | Invocando la sub-skill: `user-persona` para personas, `journey-map` para journeys, `interview-script` para entrevistas, `usability-test-plan` para tests, `affinity-diagram` para síntesis, `jobs-to-be-done` para JTBD. |
| **¿Cómo debería usarse?** | Personas se crean desde datos reales (entrevistas, analytics), no desde asunciones. Los insights del research repository se estructuran como statements atómicos con nivel de confianza (High/Medium/Low). |
| **¿Cuándo debería usarse?** | **Pre-Fase 1** — Antes de cualquier diseño. O durante validación post-diseño. |
| **Workflows disponibles** | `/design-research:discover`, `/design-research:interview`, `/design-research:synthesize`, `/design-research:test-plan` |

#### 17. `prototyping-testing` — Validación de Diseño

| Campo | Detalle |
|:---|:---|
| **¿Qué es?** | Suite de 8 sub-skills de validación: estrategia de prototipado (baja/media/alta fidelidad), tests de usabilidad, evaluación heurística (Nielsen 10), diseño de A/B tests (hipótesis/variantes/métricas/sample size), tests de accesibilidad (VoiceOver/NVDA/TalkBack), click tests, wireframe specs y user flow diagrams. |
| **¿Para qué es?** | Validar decisiones de diseño antes de invertir en implementación completa. |
| **¿Para qué se usa?** | Diseñar A/B tests rigurosos con hipótesis estructuradas ("If we [change], then [outcome] because [rationale]"). Planificar tests de accesibilidad en 4 capas (automated → manual → assistive tech → user testing). Crear user flows con happy path + error paths + exit points. |
| **¿Cómo se usa?** | Seleccionando la fidelidad correcta para la pregunta (paper para IA, clickable para interacción, coded para comportamiento real). Ejecutando evaluaciones heurísticas con severidad 0-4 por issue. |
| **¿Cómo debería usarse?** | Prototipando la asunción más riesgosa primero. Corriendo heuristic evaluation con 3-5 evaluadores independientes. |
| **¿Cuándo debería usarse?** | **Entre Fase 2 y Fase 3** — Después de definir visuals, antes de implementar interacciones complejas. |
| **Workflows disponibles** | `/prototyping-testing:evaluate`, `/prototyping-testing:experiment`, `/prototyping-testing:prototype-plan`, `/prototyping-testing:test-plan` |

---

### ──────────────────────────────────────────
### CAPA 8 — OPERACIONES Y HERRAMIENTAS DE EQUIPO
### ──────────────────────────────────────────

#### 18. `design-ops` — Operaciones de Diseño

| Campo | Detalle |
|:---|:---|
| **¿Qué es?** | Suite de 7 sub-skills operacionales: frameworks de crítica, auditoría de deuda de diseño, reporting de impacto, checklists de QA, proceso de revisión (4 gates), planificación de sprints de diseño (5 días), handoff specs (visual/interaction/content/assets/edge-cases), team workflow y estrategia de version control. |
| **¿Para qué es?** | Operacionalizar el diseño: desde cómo se critica hasta cómo se entrega a desarrollo y cómo se mide el impacto. |
| **¿Para qué se usa?** | Crear handoff specs completos (spacing exacto con tokens, estados de interacción, comportamiento responsive, edge cases, ARIA roles). Planificar design sprints de 5 días. Auditar deuda de diseño (visual, estructural, accesibilidad, documentación). Medir impacto con before/after y A/B test summaries. |
| **¿Cómo se usa?** | Invocando la sub-skill: `handoff-spec` para entrega a dev, `design-sprint-plan` para sprints, `design-debt-audit` para deuda, `design-impact-reporting` para métricas, `design-qa-checklist` para QA, `design-critique` para críticas estructuradas. |
| **¿Cómo debería usarse?** | Los handoffs siempre usan tokens (nunca hex/px raw). La deuda de diseño se cuantifica con: Severidad × Frecuencia / Esfuerzo. El QA checklist cubre: visual accuracy, layout, interaction, content, accessibility, cross-platform. |
| **¿Cuándo debería usarse?** | **Fase 4 y Post-producción** — Para entrega, QA y mejora continua. |
| **Workflows disponibles** | `/design-ops:handoff`, `/design-ops:plan-sprint`, `/design-ops:setup-workflow` |

#### 19. `designer-toolkit` — Utilidades Esenciales del Diseñador

| Campo | Detalle |
|:---|:---|
| **¿Qué es?** | Suite de 7 sub-skills utilitarias: case studies de portfolio, negociación de diseño (advocacy basada en evidencia), design rationale (conexión decisión→evidencia→trade-offs), adopción de design system, auditoría de tokens, presentaciones estructuradas y UX writing (microcopy, error messages, empty states, CTAs, onboarding copy). |
| **¿Para qué es?** | Dar al diseñador herramientas de comunicación y advocacy para defender decisiones de diseño con evidencia, documentar rationales y producir entregables profesionales. |
| **¿Para qué se usa?** | Escribir rationales que conecten decisiones a user needs ("Users are confused at step 3" > "this layout is unclear"). Diseñar microcopy efectivo (CTAs con verbo + outcome específico). Crear case studies con estructura Challenge → Process → Solution → Impact. Negociar scope con trade-offs explícitos. |
| **¿Cómo se usa?** | Invocando: `design-rationale` para justificaciones, `ux-writing` para copy, `case-study` para portfolio, `design-negotiation` para advocacy, `presentation-deck` para presentaciones. |
| **¿Cómo debería usarse?** | Toda decisión de diseño controversial debe acompañarse de un rationale escrito. Los error messages siguen formato: What happened → Why → What to do. Los CTAs empiezan con verbo y son específicos sobre el outcome. |
| **¿Cuándo debería usarse?** | **Cualquier fase** — Según la necesidad de documentación, comunicación o advocacy. |
| **Workflows disponibles** | `/designer-toolkit:build-presentation`, `/designer-toolkit:write-case-study`, `/designer-toolkit:write-rationale` |

#### 20. `vanta-design-orchestrator` — Este Archivo (Meta-Skill)

| Campo | Detalle |
|:---|:---|
| **¿Qué es?** | El orquestador maestro que define el rol del agente, documenta las 20 skills y establece el protocolo de uso combinado. |
| **¿Para qué es?** | Ser el punto de entrada único para cualquier tarea de diseño. |
| **¿Cuándo se lee?** | Automáticamente cuando se activa el rol de Lead Design Engineer (trigger words). |

---

## 3. El Ciclo de Orquestación Vanta (Uso en Conjunto sin Interferencias)

Para evitar contradicciones visuales o técnicas al utilizar todas las habilidades, el flujo de desarrollo de UI se estructurará en **5 fases secuenciales**. Cada fase tiene skills asignados y un criterio de salida claro.

```mermaid
graph TD
    P[Pre-Fase: Discovery & Research] -->|Personas, IA, Principios| A
    A[Fase 1: Estructura y UX] -->|Wireframes, Semántica, Trunk Test| B
    B[Fase 2: Identidad Visual y Tokens] -->|HSL/OKLCH, Tipografía, Anti-Slop| C
    C[Fase 3: Interacciones y 3D] -->|Springs, FSM, Shaders 60fps| D
    D[Fase 4: Auditoría y Refinamiento] -->|Impeccable, WCAG, React Perf| E
    E[Producción / Envío]

    style P fill:#1a1a2e,stroke:#16213e,stroke-width:2px,color:#e0e0e0
    style A fill:#1e1e24,stroke:#3a3a3a,stroke-width:2px,color:#fff
    style B fill:#241d24,stroke:#4a2f4a,stroke-width:2px,color:#fff
    style C fill:#1d2424,stroke:#2f4a4a,stroke-width:2px,color:#fff
    style D fill:#24241d,stroke:#4a4a2f,stroke-width:2px,color:#fff
    style E fill:#1e241e,stroke:#2f4a2f,stroke-width:2px,color:#fff
```

### Pre-Fase: Discovery & Research
* **Skills:** `design-research` + `ux-strategy` + `prototyping-testing`
* **Acción**: Investigar usuarios (personas, JTBD), definir IA (sitemap, taxonomía), establecer principios de diseño, definir métricas de éxito. Análisis competitivo.
* **Criterio de salida**: Personas definidas, IA validada con tree-test, principios escritos y aprobados.

### Fase 1: Estructura y Usabilidad (UX & Layout)
* **Skills:** `ux-heuristics` + `frontend-design` + `interaction-design` (sub: `navigation-patterns`, `form-design`)
* **Acción**: Diseña la estructura jerárquica de contenidos. Trunk Test en cada página. HTML5 semántico sin divitis. Define state machines para flujos complejos. Estructura navigation patterns.
* **Criterio de salida**: Wireframe pasa el Trunk Test. Structure semántica validada. State machines documentados.

### Fase 2: Identidad Visual y Estilos (Tokens)
* **Skills:** `ui-ux-pro-max` + `design-systems` + `ui-design` + `awesome-claude-design`
* **Acción**: Genera paleta HSL/OKLCH con `ui-ux-pro-max`. Formaliza tokens con `design-systems`. Aplica color system, typography scale, spacing system y layout grid con `ui-design`. Verifica contra Anti-Slop con `awesome-claude-design`. Elige familia estética.
* **Criterio de salida**: `MASTER.md` generado. Todos los valores visuales usan tokens. Contraste AA verificado. Slop test pasado.

### Fase 3: Interacciones y Elementos 3D (Motion & WebGL)
* **Skills:** `emil-design-eng` + `interaction-design` + `awesome-claude-design` (Frontier 3D/Shaders)
* **Acción**: Implementa microanimaciones (150-300ms, spring easing). Aplica Doherty (<400ms para respuesta), Fitts (44×44pt touch targets), Hick (reducir opciones simultáneas), Miller (chunking). Configura shaders Three.js a 60fps con fallback `prefers-reduced-motion`.
* **Criterio de salida**: Todas las interacciones tienen feedback <100ms. Animaciones <500ms. WebGL a 60fps estable. `prefers-reduced-motion` implementado.

### Fase 4: Auditoría de Calidad y Refinamiento (Quality Check)
* **Skills:** `impeccable` + `visual-critique` + `web-design-guidelines` + `writing-guidelines` + `react-best-practices` + `vercel-optimize` + `design-ops` (sub: `design-qa-checklist`)
* **Acción**: Corre `/impeccable audit` → `/impeccable polish`. Ejecuta `/visual-critique:critique-screen`. Verifica guidelines de Vercel. Revisa copy con `writing-guidelines`. Optimiza React con reglas CRITICAL/HIGH. QA checklist de `design-ops`.
* **Criterio de salida**: Slop test pasado. Todas las críticas visuales en `pass`. WCAG AA compliant. Waterfalls eliminados. Copy revisado.

---

## 4. Reglas de Resolución de Conflictos

Cuando dos skills dan directrices contradictorias, se resuelven en este orden de prioridad:

1. **Accesibilidad** (`design-systems` → accessibility-audit, `ux-heuristics`) — WCAG AA es innegociable.
2. **Rendimiento** (`react-best-practices`, `vercel-optimize`) — 60fps y Core Web Vitals son requisito.
3. **Usabilidad** (`ux-heuristics`, `interaction-design`) — Si es bonito pero confuso, se cambia.
4. **Anti-Slop** (`impeccable`, `awesome-claude-design`) — Si pasa usabilidad pero es genérico, se refina.
5. **Estética** (`ui-design`, `emil-design-eng`, `visual-critique`) — Lo visual se adapta a los constraints anteriores.
