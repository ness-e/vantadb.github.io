import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SingularityHero } from "@/components/SingularityHero";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CodeGridBackground } from "@/components/CodeGridBackground";
import { ProtocolDiagram } from "@/components/ProtocolDiagram";
import { HNSWLayerIcon } from "@/components/HNSWLayerIcon";
import { HybridCube } from "@/components/HybridCube";
import { DAGPlan } from "@/components/DAGPlan";
import { Flamegraph } from "@/components/Flamegraph";
import { ComparisonTable } from "@/components/ComparisonTable";
import { InteractiveQuickstart } from "@/components/InteractiveQuickstart";
import { ArchCrossSection } from "@/components/ArchCrossSection";
import { ScrollStory } from "@/components/ScrollStory";
import { ScrambleText } from "@/components/ScrambleText";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VantaDB — Where Context Never Escapes" },
      {
        name: "description",
        content:
          "Embedded Rust engine for AI agents. Hybrid search via BM25 + HNSW, GraphRAG, crash-safe WAL durability. Zero servers, one pip install.",
      },
    ],
  }),
  component: Landing,
});

// ── GSAP ScrollTrigger reveal (GSAP Performance) ───────────────────────────────
function useGSAPReveal() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    // Reduced motion → reveal everything instantly
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".reveal, #integrations .glow-card", {
        opacity: 1, y: 0, scale: 1, strokeDashoffset: 0,
      });
    });

    // Full motion
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Batch all .reveal elements with a single ScrollTrigger
      ScrollTrigger.batch(".reveal", {
        start: "top 87%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1, y: 0, duration: 0.65, stagger: 0.06, ease: "power2.out", overwrite: "auto",
          });
        },
      });

      // Glow cards batch
      ScrollTrigger.batch("#integrations .glow-card", {
        start: "top 78%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out", overwrite: "auto",
          });
        },
      });
    });

    // Glow card mouse tracking — gsap.quickTo pattern
    const quickTos: (() => void)[] = [];
    document.querySelectorAll(".glow-card").forEach((el) => {
      const toMX = gsap.quickTo(el, "--mx", { x: 0 });
      const toMY = gsap.quickTo(el, "--my", { y: 0 });
      const handler = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        toMX(e.clientX - rect.left);
        toMY(e.clientY - rect.top);
      };
      el.addEventListener("mousemove", handler);
      quickTos.push(() => el.removeEventListener("mousemove", handler));
    });

    return () => {
      mm.revert();
      quickTos.forEach((fn) => fn());
    };
  }, []);
}

// ── Scanlines — minimal overlay, still used in Landing() directly ──────────────
function Scanlines() { return <div aria-hidden="true" className="scanlines" />; }

// ── Architecture layers (extracted) ─────────────────────────────────────────────
// ArchCrossSection lives in src/components/ArchCrossSection.tsx.

// ── Typewriter Title (extracted) ──────────────────────────────────────────────
// TypewriterTitle lives in src/components/TypewriterTitle.tsx.

// ── ComparisonTable (extracted) ───────────────────────────────────────────────
// ComparisonTable + TerminalCell live in src/components/ComparisonTable.tsx.

// ── InteractiveQuickstart (extracted) ─────────────────────────────────────────
// InteractiveQuickstart lives in src/components/InteractiveQuickstart.tsx.

// ── Main Landing ───────────────────────────────────────────────────────────────
function Landing() {
  useGSAPReveal();

  return (
    <>
      <style>{`
        html, body { overflow: auto !important; touch-action: auto !important; user-select: auto !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideInUp { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeInLeft { from { opacity:0; transform:translateX(-24px); } to { opacity:1; transform:translateX(0); } }
        @keyframes drawLine { from { stroke-dashoffset:1000; } to { stroke-dashoffset:0; } }
        @keyframes archLayerIn { from { opacity:0; transform:translateX(-16px); } to { opacity:1; transform:translateX(0); } }
        @keyframes ping { from { opacity:0.3; transform:scale(0.8); } to { opacity:1; transform:scale(1.2); } }
        .tl-pulse-ring { animation:tl-pulse 2.5s ease-out infinite; }

        .glow-card { position:relative; background:var(--surface); border-radius:var(--radius-md); overflow:hidden; z-index:1; cursor:default; will-change:transform,opacity; }
        .glow-card::before { content:''; position:absolute; inset:0; background:radial-gradient(500px circle at var(--mx,0) var(--my,0), rgba(139,158,183,0.18), transparent 40%); z-index:-1; opacity:0; transition:opacity 0.35s ease; pointer-events:none; }
        .glow-card:hover::before { opacity:1; }

        .ss-panel-inner { max-width:640px; }
        .ss-title { font-family:var(--font-display); font-size:clamp(2.5rem,5vw,4rem); font-weight:600; letter-spacing:-0.03em; line-height:1.1; color:var(--white); margin-bottom:1rem; }
        .ss-desc { font-family:var(--font-body); font-size:1.05rem; line-height:1.7; color:var(--muted); margin-bottom:2rem; max-width:560px; }
        .ss-metrics { display:flex; gap:2.5rem; }
        .ss-metric { display:flex; flex-direction:column; gap:0.15rem; }
        .ss-metric-value { font-family:var(--font-display); font-size:1.8rem; font-weight:600; letter-spacing:-0.02em; color:var(--amber); }
        .ss-metric-label { font-family:var(--font-mono); font-size:0.6rem; letter-spacing:0.08em; text-transform:uppercase; color:var(--steel); }
      `}</style>

      {/* Hero */}
      <SingularityHero />

      <div className="hero-nebula" />

      <main className="page-content">
        {/* ── 1. COMPARISON BAR (Old Stack vs VantaDB) ── */}
        <div className="section--engine">
          <Scanlines />
          <ComparisonTable />
        </div>

        {/* ── 1b. METRICS STRIP — real benchmarks ── */}
        <div className="metrics-strip-wrap">
          <div className="metrics-strip">
            <div className="metric-item reveal">
              <span className="metric-value">1.2ms</span>
              <span className="metric-label">p99 Query Latency</span>
            </div>
            <div className="metric-item reveal">
              <span className="metric-value">32K</span>
              <span className="metric-label">Max Vector Dims</span>
            </div>
            <div className="metric-item reveal">
              <span className="metric-value">100%</span>
              <span className="metric-label">BM25 Recall</span>
            </div>
            <div className="metric-item reveal">
              <span className="metric-value">0</span>
              <span className="metric-label">External Dependencies</span>
            </div>
          </div>
        </div>

        {/* ── 2. INTERACTIVE QUICKSTART (Terminal Stepper) ── */}
        <InteractiveQuickstart />

        <div className="section-divider" />

        {/* ── 3. ENGINE — Scroll Story (pinning + scrub) ── */}
        <ScrollStory
          id="engine-core"
          start="top top"
          end="+=400%"
          scrub={1.5}
          panels={[
            {
              id: "bm25",
              content: (
                <div className="ss-panel-inner">
                  <ScrambleText text="BM25 Text Search" className="ss-title" />
                  <p className="ss-desc">
                    Full-text lexical search at 1.2ms p99 with 100% recall. No sidecars, no
                    separate indexing pipeline — the Rust engine embeds directly into your process.
                  </p>
                  <div className="ss-metrics">
                    <div className="ss-metric"><span className="ss-metric-value">1.2ms</span><span className="ss-metric-label">p99 latency</span></div>
                    <div className="ss-metric"><span className="ss-metric-value">100%</span><span className="ss-metric-label">BM25 recall</span></div>
                    <div className="ss-metric"><span className="ss-metric-value">0</span><span className="ss-metric-label">external deps</span></div>
                  </div>
                </div>
              ),
            },
            {
              id: "hnsw",
              content: (
                <div className="ss-panel-inner">
                  <ScrambleText text="HNSW Vector Index" className="ss-title" />
                  <p className="ss-desc">
                    Hierarchical Navigable Small World graphs for approximate nearest neighbor
                    search. Supports up to 32K dimensions with 1KB fixed-size keys and sub-millisecond
                    query times.
                  </p>
                  <div className="ss-metrics">
                    <div className="ss-metric"><span className="ss-metric-value">32K</span><span className="ss-metric-label">max dims</span></div>
                    <div className="ss-metric"><span className="ss-metric-value">1KB</span><span className="ss-metric-label">fixed keys</span></div>
                    <div className="ss-metric"><span className="ss-metric-value">&lt;1ms</span><span className="ss-metric-label">query p99</span></div>
                  </div>
                </div>
              ),
            },
            {
              id: "graphrag",
              content: (
                <div className="ss-panel-inner">
                  <ScrambleText text="GraphRAG" className="ss-title" />
                  <p className="ss-desc">
                    Weighted-edge graph relations with 0.2ms traversal. Enables multi-hop reasoning
                    across entities, documents, and agent memory — all within a single Rust binary.
                  </p>
                  <div className="ss-metrics">
                    <div className="ss-metric"><span className="ss-metric-value">0.2ms</span><span className="ss-metric-label">hop recovery</span></div>
                    <div className="ss-metric"><span className="ss-metric-value">Weighted</span><span className="ss-metric-label">edge relations</span></div>
                    <div className="ss-metric"><span className="ss-metric-value">Multi-hop</span><span className="ss-metric-label">reasoning</span></div>
                  </div>
                </div>
              ),
            },
            {
              id: "wal",
              content: (
                <div className="ss-panel-inner">
                  <ScrambleText text="WAL Durability" className="ss-title" />
                  <p className="ss-desc">
                    CRC32C-checksummed Write-Ahead Log with fsync durability. Crash-safe recovery
                    with zero data loss. Every write is journaled before acknowledgement.
                  </p>
                  <div className="ss-metrics">
                    <div className="ss-metric"><span className="ss-metric-value">CRC32C</span><span className="ss-metric-label">checksum</span></div>
                    <div className="ss-metric"><span className="ss-metric-value">fsync</span><span className="ss-metric-label">durability</span></div>
                    <div className="ss-metric"><span className="ss-metric-value">Zero</span><span className="ss-metric-label">data loss</span></div>
                  </div>
                </div>
              ),
            },
          ]}
        />

        <div className="section-divider" />

        {/* ── 4. ARCHITECTURE — Stack Cross-Section (Cinematic Industrial) ── */}
        <section
          id="architecture"
          aria-labelledby="arch-heading"
          className="section-padded--surface section-frame"
        >
          <div className="noise-overlay noise-overlay--15" />
          <CodeGridBackground />
          {/* Pipeline SVG decoration */}
          <svg
            aria-hidden="true"
            className="arch-pipeline-svg"
            viewBox="0 0 200 600"
            fill="none"
          >
            <path d="M100 0 L100 600" stroke="var(--amber)" strokeWidth="0.5" strokeDasharray="4 4" />
            {[0, 120, 240, 360, 480].map((y, i) => (
              <circle key={i} cx={100 + (i % 2 === 0 ? -30 : 30)} cy={y + 60} r={6} fill="var(--amber)" opacity={0.15 + i * 0.03}>
                <animate attributeName="r" values="6;10;6" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.15;0.4;0.15" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
              </circle>
            ))}
            {[0, 120, 240, 360, 480].map((y, i) => (
              <circle key={i + 10} cx={100 + (i % 2 === 0 ? 30 : -30)} cy={y + 60} r={3} fill="var(--steel)" opacity={0.1}>
                <animate attributeName="r" values="3;5;3" dur={`${2 + i * 0.2}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </svg>
          <div
            className="section-split--z1"
          >
            <div>
              <span className="section-eyebrow reveal">// Architecture</span>
              <ScrambleText
                text="Zero-copy from Python to Rust."
                className="section-title section-title--sm reveal"
              />
              <p className="section-sub reveal reveal-delay-2 section-sub--mb">
                PyO3 FFI bridge with zero serialization overhead. WAL + CRC32C checksums at every
                layer. Runs on Linux, macOS, Windows, Android, and iOS — no container required.
              </p>
              <div className="reveal reveal-delay-3">
                <Link
                  to="/architecture"
                  className="cta-link nav-cta"
                >
                  View Deep FFI Architecture →
                </Link>
              </div>
            </div>
            <div className="reveal reveal-delay-2 arch-side-col">
              <div className="reveal--rel">
                <ArchCrossSection />
                <div className="anime-logo-deco"><HNSWLayerIcon size={80} /></div>
              </div>
              <Flamegraph />
            </div>
          </div>
        </section>

        {/* ── 5. INTEGRATIONS — Ecosystem Hub (Cinematic Industrial) ── */}
        <section
          id="integrations"
          aria-labelledby="integrations-heading"
          className="section-padded--integrations section-frame"
        >
          <div className="noise-overlay noise-overlay--12" />
          <ProtocolDiagram />
          {/* Hub+spoke SVG decoration */}
          <svg
            aria-hidden="true"
            className="eco-hub-svg"
            viewBox="0 0 400 400"
            fill="none"
          >
            <circle cx="200" cy="200" r="80" stroke="var(--amber)" strokeWidth="0.5" strokeDasharray="2 6" />
            <circle cx="200" cy="200" r="140" stroke="var(--steel)" strokeWidth="0.3" strokeDasharray="1 8" />
            <circle cx="200" cy="200" r="10" fill="var(--amber)" opacity="0.3">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" />
            </circle>
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const rad = angle * Math.PI / 180;
              const x = 200 + 80 * Math.cos(rad);
              const y = 200 + 80 * Math.sin(rad);
              return (
                <g key={i}>
                  <line x1={200} y1={200} x2={x} y2={y} stroke="var(--steel)" strokeWidth="0.3" opacity={0.2} />
                  <circle cx={x} cy={y} r={4} fill="var(--steel)" opacity={0.15}>
                    <animate attributeName="opacity" values="0.15;0.4;0.15" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
                  </circle>
                </g>
              );
            })}
          </svg>
          <div
            className="section-split--z1"
          >
            <div>
              <span className="section-eyebrow reveal">// Ecosystem</span>
              <ScrambleText
                text="Drop-in for any agent framework."
                className="section-title section-title--sm reveal"
              />
              <p className="section-sub reveal reveal-delay-2 section-sub--mb">
                LangChain vectorstores, LlamaIndex index traversal, AutoGen tools, MCP servers — all
                connect via direct FFI bindings. No HTTP bridge, no sidecar process. Just import and query.
              </p>
              <div className="reveal reveal-delay-3">
                <Link
                  to="/integrations"
                  className="cta-link nav-cta"
                >
                  Explore Ecosystem →
                </Link>
              </div>
            </div>
            <div className="reveal reveal-delay-2 reveal--rel">
              <div className="int-grid">
                {[
                  {
                    name: "LangChain",
                    protocol: "VectorStore",
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill="var(--steel)" d="M7.53 15.975a7.53 7.53 0 0 0 2.206-5.325A7.54 7.54 0 0 0 7.53 5.325L2.205 0A7.54 7.54 0 0 0 0 5.325a7.54 7.54 0 0 0 2.205 5.325zm11.144.493a7.54 7.54 0 0 0-5.325-2.206a7.54 7.54 0 0 0-5.325 2.206l5.325 5.325a7.54 7.54 0 0 0 5.325 2.205A7.54 7.54 0 0 0 24 21.793zM2.219 21.78a7.54 7.54 0 0 0 5.325 2.205v-7.53H.014a7.54 7.54 0 0 0 2.205 5.325M20.73 8.595a7.53 7.53 0 0 0-5.327-2.206a7.53 7.53 0 0 0-5.325 2.207l5.325 5.325z"/>
                      </svg>
                    ),
                  },
                  {
                    name: "LlamaIndex",
                    protocol: "Index Traversal",
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill="var(--steel)" d="M15.5 17.3c-2.1.9-4.4.5-5.2.2 0 .2 0 .9-.1 1.8 0 .9-.3 1.5-.5 1.7v2.3c.1-.6.6-.9.8-1.1.1-1.2-.1-2.2-.2-2.6-.2.5-.5 1.5-.7 2.1-.1.4-.3.9-.7 1.3h-1c0-.6.3-.8.5-.8.1-.2.3-.7.5-1.5.1-.8-.1-2.3-.2-3v-2c-1.5-.8-2.1-1.6-2.5-2.6-.3-.7-.2-1.8-.1-2.3-.1-.2-.4-.6-.5-1.2-.1-.9-.1-1.5 0-1.9-.1 0-.3-.6-.3-1.8 0-1.1.4-1.8.5-2v-.5c-.7 0-1.3-.3-1.7-.7-.4-.4-.1-1 .1-1.2.3-.2.5 0 .8-.1.4-.1.6-.2.8-.5.2-.7 0-1.6-.1-2.1.6.1 1 .6 1.1.8V0c.7.3 2 1.2 2.4 2.9.4 1.4.6 4.4.7 5.8 1.8 0 4.1-.3 6.2.2 1.9.4 2.8 1.2 3.8 1.2s1.6-.6 2.3-.1c.7.5 1.1 1.8 1 2.8-.1.8-.7 1.1-1 1.1-.4 1.3 0 2.5.2 3v1.8c.1.2.3.7.3 1.4 0 .7-.2 1.1-.3 1.3.2 1-.1 2.2-.2 2.6h-1.3c.2-.4.4-.5.5-.5.2-1.2.1-2.3 0-2.7-.7-.4-1.2-1.1-1.3-1.5 0 .3 0 .7-.3 1.9-.3.8-.8 1.3-.9 1.5v1h-1.3c0-.6.3-.7.5-.7.2-.4.8-1 .8-2.2 0-1-.7-1.5-1.2-2.4-.3-.5-.4-1.5-.3-2Z"/>
                      </svg>
                    ),
                  },
                  {
                    name: "AutoGen",
                    protocol: "Tool API",
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="2" fill="var(--steel)" opacity="0.15"/>
                        <path fill="var(--steel)" d="M8.16 7.18 5.84 14.25h-1.87l2.92-8.53h1.19l.08 1.46Zm1.93 7.07-2.32-7.07-.19-1.46h1.2l3.19 8.53h-1.88Zm-.1-3.18v1.38H5.48v-1.38h4.51Zm9.43-1.3v3.38c-.13.16-.34.34-.62.52-.27.18-.63.34-1.07.47-.44.14-.97.2-1.59.2a4.2 4.2 0 0 1-1.5-.27 2.64 2.64 0 0 1-1.17-.8 3.32 3.32 0 0 1-.75-1.29c-.18-.51-.27-1.1-.27-1.75v-.53c0-.66.09-1.24.26-1.76.17-.51.41-.94.73-1.3.32-.35.7-.62 1.13-.8.44-.18.93-.28 1.46-.28.74 0 1.35.12 1.83.36.48.24.84.57 1.09.99.25.43.41.91.47 1.46h-1.7a1.9 1.9 0 0 0-.2-.76c-.11-.21-.3-.38-.52-.5-.22-.13-.51-.19-.87-.19-.3 0-.56.06-.78.18-.23.12-.42.3-.58.52-.16.23-.27.52-.35.86-.09.34-.13.74-.13 1.18v.55c0 .44.04.84.13 1.17.08.34.2.63.38.86.17.23.38.4.63.52.25.12.54.18.87.18.28 0 .51-.03.69-.07.19-.05.34-.1.45-.17.12-.07.21-.14.27-.2v-1.52h-1.61v-1.26h3.36Z"/>
                      </svg>
                    ),
                  },
                  {
                    name: "MCP",
                    protocol: "Model Context",
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill="var(--steel)" d="M13.85 0a4.16 4.16 0 0 0-2.95 1.217L1.456 10.66a.835.835 0 0 0 0 1.18.835.835 0 0 0 1.18 0l9.442-9.442a2.49 2.49 0 0 1 3.541 0 2.49 2.49 0 0 1 0 3.541L8.59 12.97l-.1.1a.835.835 0 0 0 0 1.18.835.835 0 0 0 1.18 0l.1-.098 7.03-7.034a2.49 2.49 0 0 1 3.542 0l.049.05a2.49 2.49 0 0 1 0 3.54l-8.54 8.54a1.96 1.96 0 0 0 0 2.755l1.753 1.753a.835.835 0 0 0 1.18 0 .835.835 0 0 0 0-1.18l-1.753-1.753a.266.266 0 0 1 0-.394l8.54-8.54a4.185 4.185 0 0 0 0-5.9l-.05-.05A4.16 4.16 0 0 0 13.85 0m0 3.333a.84.84 0 0 0-.59.245L6.275 10.56a4.186 4.186 0 0 0 0 5.902 4.186 4.186 0 0 0 5.902 0L19.16 9.48a.835.835 0 0 0 0-1.18.835.835 0 0 0-1.18 0l-6.985 6.984a2.49 2.49 0 0 1-3.54 0 2.49 2.49 0 0 1 0-3.54l6.983-6.985a.835.835 0 0 0 0-1.18.84.84 0 0 0-.59-.245"/>
                      </svg>
                    ),
                  },
                  {
                    name: "Python SDK",
                    protocol: "Direct FFI",
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill="var(--steel)" d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
                      </svg>
                    ),
                  },
                  {
                    name: "Custom SDK",
                    protocol: "REST / gRPC",
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="8" width="16" height="10" rx="1" stroke="var(--steel)" strokeWidth="1.2"/>
                        <path d="M8 12l3 3 5-5" stroke="var(--steel)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ),
                  },
                ].map((fw, i) => (
                  <div key={i} className="glow-card">
                    <div className="int-card-inner">
                    <div className="int-card-row">
                      <div className="int-icon-box">
                        {fw.icon}
                      </div>
                      <div>
                        <div className="int-name">
                          {fw.name}
                        </div>
                        <div className="int-protocol">
                          {fw.protocol}
                        </div>
                      </div>
                    </div>
                    <div className="int-badge">
                      <span className="status-dot" style={{ background: i >= 4 ? "var(--warn)" : "var(--success)" }} />
                      {i >= 4 ? "BETA" : "STABLE"}
                    </div>
                  </div>
                </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── 6. USE CASES — Data Flow Terminal Cards (NEW) ── */}
        <section
          id="use-cases"
          aria-labelledby="use-cases-heading"
          className="section-padded--engine section-frame"
        >
          <div className="noise-overlay noise-overlay--12" />
          <div
            className="section-split"
          >
            <div>
              <span className="section-eyebrow reveal">// Use Cases</span>
              <ScrambleText
                text="Built for agents that need context."
                className="section-title section-title--md reveal"
              />
              <p className="section-sub section-sub--mb reveal reveal-delay-2">
                Persistent agent memory, local-first RAG pipelines, codebase intelligence, and
                edge environments with zero network footprint. One engine, every deployment.
              </p>
              <div className="reveal reveal-delay-3">
                <Link
                  to="/use-cases"
                  className="cta-link nav-cta"
                >
                  View Design Patterns & Code →
                </Link>
              </div>
            </div>
            <div className="reveal reveal-delay-2 uc-col">
              {/* Featured card — AI Agents Memory */}
              <div className="term-window section-frame">
                <div className="term-titlebar">
                  <span className="term-dot term-dot--red" />
                  <span className="term-dot term-dot--yellow" />
                  <span className="term-dot term-dot--green" />
                  <span className="term-label">USE CASE 01</span>
                </div>
                <div className="uc-featured-body">
                  <div className="uc-content">
                    <div className="uc-card-title">AI Agents Memory</div>
                    <div className="uc-tag-row">
                      <span className="tl-tag">≤1ms read</span>
                      <span className="tl-tag">crash-safe</span>
                      <span className="tl-tag">zero-config</span>
                    </div>
                    <p className="uc-desc">
                      Persistent conversation history for agent runtimes — survives restarts, no external database.
                    </p>
                  </div>
                  {/* SVG data flow */}
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="uc-svg">
                    <circle cx="20" cy="40" r="8" stroke="var(--steel)" strokeWidth="1" fill="none" opacity="0.4" />
<circle cx="60" cy="40" r="8" stroke="var(--steel)" strokeWidth="1" 
                      fill="none" opacity="0.4" />
                    <path d="M28 40 Q40 20 52 40" stroke="var(--amber)" strokeWidth="0.8" fill="none" strokeDasharray="2 2" opacity="0.5">
                      <animate attributeName="strokeDashoffset" from="0" to="20" dur="2s" repeatCount="indefinite" />
                    </path>
                    <circle cx="40" cy="40" r="3" fill="var(--steel)" opacity="0.5">
                      <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                </div>
              </div>
              {/* Two smaller cards side by side */}
              <div className="uc-grid-2">
                {/* Card 2: Local-First RAG */}
                <div className="term-window">
                  <div className="term-titlebar">
                    <span className="term-dot term-dot--red" />
                    <span className="term-dot term-dot--yellow" />
                    <span className="term-dot term-dot--green" />
                    <span className="term-label">USE CASE 02</span>
                  </div>
                  <div className="uc-card-pad">
                    <div className="uc-card-flex">
                      <div className="uc-content">
                        <div className="uc-card-title--sm">Local-First RAG</div>
                        <div className="uc-tag-row">
                          <span className="tl-tag">zero deps</span>
                          <span className="tl-tag">on-device</span>
                        </div>
                        <p className="uc-desc--sm">
                          Full hybrid search without spinning up a server.
                        </p>
                      </div>
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="uc-svg--mt">
                        <rect x="10" y="14" width="28" height="20" rx="2" stroke="var(--steel)" strokeWidth="0.8" opacity="0.3" fill="none" />
<path d="M18 24l4 4 8-8" stroke="var(--steel)" strokeWidth="1" 
                        strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
                      </svg>
                    </div>
                  </div>
                </div>
                {/* Card 3: Codebase Intelligence */}
                <div className="term-window">
                  <div className="term-titlebar">
                    <span className="term-dot term-dot--red" />
                    <span className="term-dot term-dot--yellow" />
                    <span className="term-dot term-dot--green" />
                    <span className="term-label">USE CASE 03</span>
                  </div>
                  <div className="uc-card-pad">
                    <div className="uc-card-flex">
                      <div className="uc-content">
                        <div className="uc-card-title--sm">Codebase Intelligence</div>
                        <div className="uc-tag-row">
                          <span className="tl-tag">30K loc/s</span>
                          <span className="tl-tag">AST-aware</span>
                        </div>
                        <p className="uc-desc--sm">
                          Parse, index and search codebases with structural awareness.
                        </p>
                      </div>
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="uc-svg--mt">
                        <path d="M16 16h16v16H16z" stroke="var(--steel)" strokeWidth="0.8" opacity="0.3" fill="none" />
                        <path d="M24 22l-4 4 4 4" stroke="var(--steel)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
                        <path d="M24 22l4 4-4 4" stroke="var(--steel)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── 7. CTA — Cinematic Industrial (unified) ── */}
        <section
          id="cta"
          aria-labelledby="cta-heading"
          className="cta-section section-frame"
        >
          <div className="noise-overlay noise-overlay--10" />
          <HybridCube />
          <div
            className="reveal cta-content"
          >
            {/* Glow ring decoration */}
            <div className="cta-glow-ring" />
            <ScrambleText text="Context that never fragments." className="cta-heading" />
            <p className="cta-desc">
              BM25 + HNSW + GraphRAG in a single Rust binary. MIT — go build.
            </p>
            <div className="cta-actions">
              <button
                className="btn-primary"
                onClick={() => navigator.clipboard?.writeText("pip install vantadb-py")}
              >
                pip install vantadb-py
              </button>
              <a
                href="https://github.com/ness-e/Vantadb"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost--link btn-ghost"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
