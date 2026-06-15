Viewed implementation_plan.md:1-310
Viewed index.tsx:1-800
Viewed index.tsx:800-878
Edited implementation_plan.md

He realizado una auditoría exhaustiva comparando el plan original descrito en [implementation_plan.md](file:///c:/Users/Eros/.gemini/antigravity-ide/brain/bea92bb0-936e-45d7-8b51-55f0173059cb/implementation_plan.md) con el código actual en [index.tsx](file:///c:/Users/Eros/VantaDB%20Proyect/VantaDB-landing/vantadb-page/vantadb-landing/src/routes/index.tsx).

### Tabla Comparativa de Implementación

| Componente del Plan | Estado en [index.tsx](file:///c:/Users/Eros/VantaDB%20Proyect/VantaDB-landing/vantadb-page/vantadb-landing/src/routes/index.tsx) | Diagnóstico Técnico |
| :--- | :--- | :--- |
| **ComparisonBar** (VantaDB vs The Stack) | **No Implementado** | Se mantiene el componente `METRICS STRIP` antiguo con una rejilla estática de 4 columnas y contadores básicos. |
| **InteractiveQuickstart** (Terminal Interactiva) | **No Implementado** | Sigue la estructura estática clásica. El componente `TerminalBlock` es inerte y los comandos laterales no responden a eventos. |
| **FeatureShowcase** (Carrusel/Deck de Engine) | **No Implementado** | Persisten las filas de características `FeatureRow` duplicadas en zig-zag con diagramas fijos. |
| **Layered Depth Architecture** (Isométrico con bg) | **No Implementado** | Grilla rígida de dos columnas con `ArchVisual` secuencial y sin la profundidad en perspectiva isométrica ni fondo dinámico. |
| **IntegrationOrbit** (Ecosistema Orbital) | **No Implementado** | Bento grid estático con tarjetas de texto repetitivas y un icono SVG genérico (`Lucide Layers`). |
| **UseCases** (Acordeón de Código) | **No Implementado** | Se renderiza mediante una lista vertical tradicional plana. |
| **CTA** (Full-bleed con Glass Panel y Background) | **No Implementado** | Sección centrada simple con anillos orbitales CSS genéricos en lugar del layout con soporte para la imagen `bg_singularity_cta.png`. |

---

### Conclusión y Siguientes Pasos

El plan **no ha sido ejecutado en el código fuente actual**. Los elementos post-hero siguen siendo genéricos, planos y carentes de la interactividad premium que caracteriza a las landing pages de referencia (SurrealDB, Pinecone, Chroma o Qdrant).

He actualizado el archivo [implementation_plan.md](file:///c:/Users/Eros/.gemini/antigravity-ide/brain/bea92bb0-936e-45d7-8b51-55f0173059cb/implementation_plan.md) para estructurar detalladamente la lógica, la interactividad y los estados reactivos de los nuevos componentes interactivos que reemplazarán a las tarjetas genéricas.

Por favor, revisa el plan actualizado y confírmame tu aprobación para proceder con la implementación y el desarrollo de estos componentes dinámicos.

# Plan de Implementación: Rediseño Premium de Elementos Post-Hero

## 1. Análisis de Estado Actual (Auditoría de Código vs. Plan)

Tras una revisión exhaustiva del código fuente en [index.tsx](file:///c:/Users/Eros/VantaDB%20Proyect/VantaDB-landing/vantadb-page/vantadb-landing/src/routes/index.tsx), se ha constatado que el plan de rediseño **NO ha sido implementado**. El archivo actual mantiene una estructura simple con componentes estáticos y genéricos:

- **Metrics Strip**: Celdas simples de 4 columnas con contadores básicos.
- **Quickstart**: Stepper de código estático a la izquierda y un terminal inerte a la derecha.
- **Engine Feature Rows**: Secciones simples en zig-zag con diagramas SVG fijos y barras de progreso inmóviles.
- **Architecture**: Panel de capas vertical rígido sin profundidad de capas real ni fondo dinámico.
- **Integrations**: Bento grid simple de 4 tarjetas con descripción de texto estático y un SVG repetitivo de Lucide Layers.
- **Use Cases**: Lista vertical clásica con efecto de hover simple.
- **CTA**: Sección centralizada convencional con círculos orbitales de CSS básicos.

---

## 2. Propuesta de Rediseño (Inspiración: SurrealDB, Chroma, Pinecone, Weaviate, Qdrant)

Reemplazaremos todos los componentes estáticos y tarjetas genéricas por interfaces altamente dinámicas, interactivas y con micro-animaciones premium en `styles.css`.

### A. ComparisonBar ("VantaDB vs. The Stack")

* **Inspiración**: Pinecone y SurrealDB (comparativas de costes/latencias realistas).
- **Diseño**: Un componente de comparación tipo split-screen interactivo. La columna de la izquierda ("The Old Way") muestra servicios tradicionales (Pinecone + Redis + S3) que se "tachan" con una animación de rayado (strikethrough) roja y se oscurecen al pasar el cursor. La columna de la derecha ("VantaDB") resplandece con un glow ámbar y destaca un simple `pip install vantadb-py`.
- **Interactividad**: Hover en los elementos resalta las métricas comparativas y los tiempos de latencia (1.2ms p99 vs. 200ms p99).

### B. InteractiveQuickstart (Terminal Interactivo Multietapa)

* **Inspiración**: La consola interactiva de SurrealDB y Chroma.
- **Diseño**: Un panel integrado que fusiona el selector de etapas, un editor de código y una terminal simulada.
- **Interactividad**:
  - Stepper con 4 pasos: `01 INSTALL`, `02 INITIALIZE`, `03 STORE`, `04 SEARCH`.
  - Al hacer click en un paso (o mediante avance automático cada 5s), el código de la consola se actualiza con un efecto de escritura automática (Typewriter), y la simulación del terminal ejecuta el comando imprimiendo el output simulado en tiempo real con estados de carga.
  - Pestañas con soporte para alternar entre el SDK de **Python** y comandos raw de **Rust (FFI)**.

### C. FeatureShowcase (Interactive Feature Deck)

* **Inspiración**: El carrusel interactivo y interactivos visuales de Qdrant/Pinecone.
- **Diseño**: En lugar de filas de características consecutivas, crearemos un contenedor de "Showcase" premium.
- **Componentes visuales interactivos**:
  - **Hybrid Search**: Control deslizante interactivo donde el usuario puede arrastrar una barra para ajustar el peso entre **BM25 (Léxico)** y **HNSW (Vectorial)**, y ver cómo varía dinámicamente la fusión RRF y el Recall en un pipeline animado en tiempo real.
  - **GraphRAG**: Un grafo SVG interactivo real (interactividad por hover sobre nodos para iluminar relaciones en cascada y mostrar pesos de aristas).
  - **Crash-Safe WAL**: Un timeline interactivo de simulación de fallo. El usuario presiona un botón "CRASH ENGINE", se simula una caída del proceso en el log, y luego un botón "AUTO-RECOVER" que muestra el replay del WAL con CRC32C y la restauración del estado en milisegundos.

### D. Layered Depth Architecture with Cosmic Flow

* **Inspiración**: Capas 3D en perspectiva isométrica de Milvus y Pinecone.
- **Diseño**: Estructura de capas con perspectiva isométrica pseudo-3D utilizando CSS transforms. Las capas se separarán visualmente con líneas de conexión al pasar el mouse por encima.
- **Fondo**: Integración de la imagen generada `bg_gravitational_flow.png` con parallax suave sobre la sección de arquitectura.

### E. IntegrationOrbit (Ecosystem Satellites)

* **Inspiración**: SurrealDB y LangChain ecosystem diagrams.
- **Diseño**: En lugar de una cuadrícula de tarjetas de texto estáticas, diseñaremos un sistema planetario orbital.
- **Interactividad**:
  - Un sol central representando a **VantaDB**.
  - Órbitas concéntricas con satélites animados (LangChain, LlamaIndex, MCP, AutoGen).
  - Al hacer click o hover sobre un satélite, la órbita correspondiente se activa y se despliega un panel flotante de código con el snippet real para integrar esa herramienta específica de manera instantánea.

### F. UseCases (Interactive Code Accordion)

* **Inspiración**: Stripe y Weaviate (ejemplos prácticos y ejecutables de casos de uso).
- **Diseño**: Acordeón vertical interactivo de 4 paneles.
- **Interactividad**: Al abrir un caso de uso (p. ej., "Conversational Agent Memory"), se expande con una transición suave de altura máxima y revela a la derecha una pestaña de código que contiene la implementación real de VantaDB para ese patrón específico.

---

## 3. Cambios Propuestos

### Archivos Nuevos/Modificados

#### [MODIFY] [index.tsx](file:///c:/Users/Eros/VantaDB%20Proyect/VantaDB-landing/vantadb-page/vantadb-landing/src/routes/index.tsx)

- Reemplazar el `metrics-cell` estático por el componente reactivo `ComparisonBar`.
- Desarrollar el hook de estado del stepper en `InteractiveQuickstart` para manejar animaciones de terminal.
- Reemplazar las filas de características con el deck interactivo `FeatureShowcase`.
- Reestructurar el diagrama de capas de arquitectura para dotarlo de transforms isométricos CSS al hacer hover.
- Programar el componente `IntegrationOrbit` para interactuar con los satélites de ecosistema y cambiar pestañas de código dinámicas.
- Rediseñar la lista de casos de uso convirtiéndola en un `CodeAccordion` animado.
- Añadir el panel de glassmorphism sobre `bg_singularity_cta.png` en la sección final del CTA.

#### [MODIFY] [styles.css](file:///c:/Users/Eros/VantaDB%20Proyect/VantaDB-landing/vantadb-page/vantadb-landing/src/styles.css)

- Reglas de layout avanzadas para posicionamiento isométrico, órbitas de ecosistema y transiciones de acordeón.
- Estilos premium de terminal, animaciones del slider RRF e interactividad de capas.
- Micro-interacciones de hover de los elementos interactivos con glow dinámico de color ámbar y acero.
- Adaptabilidad mobile en CSS con fallbacks simplificados pero limpios para tamaños menores a 768px.

---

## 4. Plan de Verificación

### Pruebas Visuales y de Rendimiento

- **Renderizado Adaptativo**: Comprobar en mobile (Safari iOS, Chrome Android) que las órbitas e isométricos se reorganicen limpiamente en layouts verticales planos.
- **Rendimiento**: Controlar el uso de CPU provocado por animaciones continuas de SVG. Usar `will-change: transform` y optimizaciones de hardware en CSS para evitar caídas de frame rate en dispositivos de gama media.
- **Interactividad**: Validar el funcionamiento del RRF slider y los clicks en satélites orbitantes para verificar que los fragmentos de código carguen al instante.

# Rediseño Profundo: Secciones Post-Hero

> **Alcance**: Todo después del `<SingularityHero />` hasta el footer.
> **Filosofía**: Cada sección tiene un componente visual ÚNICO. Cero tarjetas genéricas. La información viene de la documentación oficial de VantaDB.
> **Assets**: 2 imágenes de fondo generadas (gravitational flow + singularity CTA).

---

## Secciones Rediseñadas

### 1. Trust Bar (reemplaza Metrics Strip)

**Antes**: 4 columnas con contadores animados.
**Ahora**: Comparativa visual "VantaDB vs. The Stack" — un componente tipo split-comparison.

```
┌─────────────────────────────────────────────────────┐
│  THE OLD WAY              vs.         VANTADB       │
│  ─────────────                        ───────       │
│  Pinecone + Redis + S3      →   pip install vantadb │
│  ~$200/mo + latency                   1 file, $0    │
│  200ms p99                            1.2ms p99     │
│  Schema migrations                    Zero config   │
│  3 services to maintain              0 dependencies │
└─────────────────────────────────────────────────────┘
```

**Componente**: `ComparisonBar` — dos columnas con líneas que se "resuelven" con animación de strikethrough en la columna izquierda y glow en la derecha.

---

### 2. Quickstart (rediseño del terminal)

**Antes**: Grid 2 columnas con pasos a la izquierda + terminal a la derecha.
**Ahora**: Terminal interactivo full-width con stepper progresivo.

```
┌──────────────────────────────────────────────────────────┐
│  ┌─ Step 01: INSTALL ─┐  ┌─ Step 02: OPEN ──┐           │
│  │ ● activo            │  │ ○ siguiente       │  ...      │
│  └────────────────────┘  └──────────────────┘           │
│                                                          │
│  ┌─ Terminal ──────────────────────────────────────────┐ │
│  │ $ pip install vantadb-py                            │ │
│  │ Successfully installed vantadb-py-0.1.4             │ │
│  │                                                     │ │
│  │  ✓ Pure Rust core compiled                          │ │
│  │  ✓ PyO3 bindings loaded                             │ │
│  │  ✓ Ready in 0.3s                                    │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                          │
│  # The actual code for this step:                        │
│  ┌─ Code ──────────────────────────────────────────────┐ │
│  │ import vantadb_py as vanta                          │ │
│  │ db = vanta.VantaDB("./agent_memory")                │ │
│  └─────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

**Componente**: `InteractiveQuickstart` — 4 pasos clickeables (Install → Open → Store → Search). Cada paso muestra terminal output + código Python. Auto-avanza cada 4 segundos.

**Contenido expandido** (de la documentación SDK):

- Step 1: `pip install vantadb-py` — wheels precompilados para Linux, macOS, Windows
- Step 2: `db = vanta.VantaDB("./agent_memory")` — zero-config, abre un file path
- Step 3: `db.put("memories", "key-1", "Agent learned user prefers Python", vector=[...])` — namespace-scoped
- Step 4: `hits = db.search_memory("memories", query_vector=[...], top_k=5)` — hybrid search

---

### 3. Engine — Horizontal Scroll Feature Showcase

**Antes**: 3 FeatureRow alternados (izq/der).
**Ahora**: Horizontal scroll con "cards" de formato editorial (full-height panels que se deslizan).

```
┌───────────────────────────────────────────────────────┐
│ ←  01/04  HYBRID SEARCH                          → │
│                                                       │
│  BM25 + HNSW,              ┌─ Diagram ─────────────┐ │
│  fused via RRF.             │                       │ │
│                              │  [Animated pipeline   │ │
│  Lexical and vector          │   showing query flow  │ │
│  retrieval unified...        │   through BM25→HNSW   │ │
│                              │   →RRF fusion]        │ │
│  • k1=1.2, b=0.75          │                       │ │
│  • M=16, ef=200             └───────────────────────┘ │
│  • Cosine · Euclidean · Dot                           │
│                                                       │
│  ──────── 1.2ms · 100% Recall@10 ────────            │
└───────────────────────────────────────────────────────┘
```

**Features expandidas** (de documentación):

| # | Feature | Visual |
|:---|:---|:---|
| 01 | **Hybrid Search**: BM25 + HNSW + RRF. k1=1.2, b=0.75 para saturación TF. M=16, ef_construction=200. Cosine, Euclidean, Dot configurable | Pipeline animado con barras de fusión |
| 02 | **GraphRAG**: Edges dirigidos con pesos opcionales. `graph_hops=2` para traversal. Reduce tokens 60% vs RAG plano | Grafo SVG interactivo (ya existe GraphTopology) |
| 03 | **Crash-Safe WAL**: CRC32C checksums. fsync por defecto. Recovery automático al abrir. Heavy Certification CI | Timeline de escritura animada |
| 04 | **Namespace Isolation** (NUEVO): Registros scoped por namespace. Multi-agent sobre una sola DB. Filtros por metadata `$gte`, `$in` | Diagrama de namespaces aislados |

**Componente**: `FeatureShowcase` — Panel horizontal scrollable con snap points. Cada panel ocupa 100% viewport width. Navegación con dots + flechas + keyboard.

---

### 4. Architecture — Layered Depth Diagram con Background Image

**Antes**: Grid 2 columnas con ArchVisual + DataFlowSVG + 4 mini-cards.
**Ahora**: Full-width section con la imagen de fondo generada (gravitational flow) + un diagrama de capas animado tipo "corte transversal".

```
┌─────────────────────────────────────────────────────────┐
│  [Background: bg_gravitational_flow.png]                │
│                                                         │
│  // Architecture                                        │
│  Built different. Runs everywhere.                      │
│                                                         │
│  ┌─ LAYER STACK (animado) ─────────────────────────┐   │
│  │  ┌──────────────────────────────────────────┐   │   │
│  │  │  Python SDK    vantadb.put() / search()  │   │   │
│  │  ├──────────────────────────────────────────┤   │   │
│  │  │  PyO3 FFI      src/sdk.rs — stable       │   │   │
│  │  ├──────────────────────────────────────────┤   │   │
│  │  │  Query Planner  BM25 + HNSW + RRF        │   │   │
│  │  ├──────────────────────────────────────────┤   │   │
│  │  │  Fjall Storage  WAL + fsync + CRC32C     │   │   │
│  │  ├──────────────────────────────────────────┤   │   │
│  │  │  HNSW Index     Cosine · M · ef          │   │   │
│  │  └──────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─ SPECS GRID ────────────────────────────────────┐   │
│  │ Key: 1KB · Vec: 32K dims · Text: 10MB           │   │
│  │ Writers: 1 (RwLock) · Readers: ∞                 │   │
│  │ Formats: Cosine, Euclidean, Dot                  │   │
│  │ Export: JSONL streaming · Import: JSONL           │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Datos expandidos** (de documentación técnica):

- Límites operativos: Key 1KB, Vector 32K dims, Text 10MB, Metadata 64KB
- Concurrencia: 1 writer exclusivo (RwLock), lectores ilimitados
- Backend: Fjall (default) o RocksDB
- sync_mode: "always" (default), "periodic", "never"
- Engine states: Initializing → Ready → Rebuilding/Flushing → Closing → Closed

---

### 5. Integrations (NUEVA SECCIÓN)

**Contenido de**: Estrategia de Ecosistema y GTM.

```
┌─────────────────────────────────────────────────────────┐
│  // Ecosystem                                           │
│  Fits your stack. Not the other way around.             │
│                                                         │
│  ┌─ INTEGRATION ORBIT ─────────────────────────────┐   │
│  │                                                   │   │
│  │        LlamaIndex ○─────○ LangChain              │   │
│  │                    \   /                           │   │
│  │                     ● VantaDB                     │   │
│  │                    / | \                           │   │
│  │          CrewAI ○─  |  ─○ MCP                    │   │
│  │                     |                             │   │
│  │               AutoGen ○                           │   │
│  │                                                   │   │
│  └───────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─ Code tabs: LangChain | LlamaIndex | MCP ────────┐  │
│  │ from langchain_vantadb import VantaDBVectorStore  │  │
│  │ vectorstore = VantaDBVectorStore(                 │  │
│  │     path="./langchain_memory",                    │  │
│  │     embedding_function=embeddings                 │  │
│  │ )                                                 │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Componente**: `IntegrationOrbit` — SVG de órbita con VantaDB al centro y satélites (LangChain, LlamaIndex, MCP, CrewAI, AutoGen, Semantic Kernel). Al hacer hover/click en un satélite, muestra el código de integración correspondiente en un tab.

---

### 6. Use Cases — Accordion con Code Previews

**Antes**: Lista vertical con hover slide.
**Ahora**: Accordion expandible donde cada caso muestra un código real de uso.

```
┌─────────────────────────────────────────────────────────┐
│  // Use Cases                                           │
│  Where VantaDB fits perfectly.                          │
│                                                         │
│  ┌─ 01 AI AGENTS ──────────────────────── [expanded] ─┐ │
│  │  Persistent Agent Memory                            │ │
│  │                                                     │ │
│  │  Store conversations, tool results, and prefs.      │ │
│  │  Retrieve in 1.2ms. Memory that survives restarts.  │ │
│  │                                                     │ │
│  │  ┌─ Code ─────────────────────────────────────────┐ │ │
│  │  │ db.put("agent-memory", "conv-123",             │ │ │
│  │  │     "User prefers async Python patterns",      │ │ │
│  │  │     vector=embed(text), metadata={             │ │ │
│  │  │         "agent_id": "researcher",              │ │ │
│  │  │         "session": "2026-06-15"                │ │ │
│  │  │     })                                         │ │ │
│  │  └────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────┘ │
│  ┌─ 02 RAG BACKEND ──────────────────── [collapsed] ──┐ │
│  ├─ 03 GRAPHRAG ──────────────────────── [collapsed] ──┤ │
│  ├─ 04 CODEBASE INTELLIGENCE ─────────── [collapsed] ──┤ │
│  ├─ 05 OFFLINE / EDGE ───────────────── [collapsed] ──┤ │
│  └─ 06 MULTI-AGENT SCRATCHPAD ────────── [collapsed] ──┘ │
└─────────────────────────────────────────────────────────┘
```

**Contenido expandido** (de SDK + GTM docs):

- AI Agents: `db.put()` con namespaces para conversaciones
- RAG: `db.search_memory()` con hybrid search, reemplaza Pinecone local-first
- GraphRAG: `graph_hops=2`, edges con `trabaja_en`, `amigo_de`
- Codebase: Index code chunks con AST metadata en fields
- Offline: Single binary, single file, 0 deps
- Multi-Agent: Namespace isolation, `db.list_memory("ns")` con filtros

---

### 7. CTA — Dramatic Full-Width con Background Generado

**Antes**: Orbit rings CSS + título + botones.
**Ahora**: Full-bleed section con imagen de fondo (singularity CTA) + contenido centrado con glassmorphism panel.

```
┌─────────────────────────────────────────────────────────┐
│  [Background: bg_singularity_cta.png, fixed]            │
│                                                         │
│       ┌─ Glass Panel ────────────────────────────┐      │
│       │                                          │      │
│       │  Memory that never escapes.              │      │
│       │                                          │      │
│       │  Apache 2.0 · Python 3.8+ · Rust 1.94+  │      │
│       │  CI passing · 0 external deps            │      │
│       │                                          │      │
│       │  [pip install vantadb-py]  [GitHub ↗]    │      │
│       │                                          │      │
│       └──────────────────────────────────────────┘      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

### 8. Footer Expandido

**Antes**: Logo + 4 links + copyright.
**Ahora**: Grid de 4 columnas: Product, Resources, Community, Company.

---

## Proposed Changes

### Assets

#### [NEW] bg_gravitational_flow.png

Imagen de fondo para la sección de Arquitectura — ya generada.

#### [NEW] bg_singularity_cta.png

Imagen de fondo para la sección CTA — ya generada.

### Code

#### [MODIFY] [index.tsx](file:///c:/Users/Eros/VantaDB%20Proyect/VantaDB-landing/vantadb-page/vantadb-landing/src/routes/index.tsx)

- Reemplazar Metrics Strip → `ComparisonBar`
- Reemplazar Quickstart → `InteractiveQuickstart` con stepper + terminal
- Reemplazar Engine FeatureRows → `FeatureShowcase` horizontal scroll
- Reemplazar Architecture grid → Layered diagram con background image
- Añadir sección Integrations con `IntegrationOrbit` + code tabs
- Reemplazar Use Cases lista → Accordion con code previews
- Reemplazar CTA → Full-bleed con background image + glass panel
- Expandir Footer → Grid de 4 columnas

#### [MODIFY] [styles.css](file:///c:/Users/Eros/VantaDB%20Proyect/VantaDB-landing/vantadb-page/vantadb-landing/src/styles.css)

- Nuevos estilos para cada componente rediseñado
- Animaciones para el horizontal scroll
- Glassmorphism para el CTA panel
- Accordion animations
- Responsive breakpoints para cada sección nueva

---

## Open Questions

> [!IMPORTANT]
> **Q1: ¿Horizontal scroll para Engine o mantener vertical con componentes únicos?**
> El horizontal scroll es más impactante pero menos accesible en mobile. La alternativa es mantener vertical pero con componentes visualmente distintos para cada feature (no rows repetitivos).

> [!IMPORTANT]
> **Q2: ¿Añadir la sección de Integrations o es prematuro dado que LangChain/LlamaIndex están "en desarrollo"?**
> La documentación marca estas integraciones como "🔄 En desarrollo". Podemos mostrarlas como "Coming Soon" o con código real pero badge de "preview".

---

## Verification Plan

### Visual

- Verificar cada sección en viewport 1440px y 375px
- Verificar contraste con backgrounds (AA 4.5:1)
- Verificar que imágenes de fondo no aumenten significativamente el LCP
- Verificar que el horizontal scroll funcione con keyboard y touch
