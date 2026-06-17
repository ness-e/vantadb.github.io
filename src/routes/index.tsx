import { createFileRoute, Link } from "@tanstack/react-router";
import { SingularityHero } from "@/components/SingularityHero";
import { useEffect, useRef, useState } from "react";

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

// ── Scroll reveal ──────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

    // Animate bar fills on intersection
    const barObs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const bars = e.target.querySelectorAll(".bar-fill");
            bars.forEach((bar) => {
              const w = bar.getAttribute("data-w");
              if (w) (bar as HTMLElement).style.width = w + "%";
            });
          }
        }),
      { threshold: 0.3 },
    );
    document.querySelectorAll(".bars-container").forEach((el) => barObs.observe(el));

    // Nav glassmorphism on scroll
    const nav = document.querySelector(".vanta-nav");
    const onScroll = () => {
      if (nav) {
        nav.classList.toggle("scrolled", window.scrollY > 60);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      obs.disconnect();
      barObs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}

// ── Scanline overlay ───────────────────────────────────────────────────────────
function Scanlines() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
      }}
    />
  );
}

// ── Architecture layers ─────────────────────────────────────────────────────────
function ArchVisual() {
  const layers = [
    { label: "Python SDK", sub: "vantadb.put() / search() / get()", depth: 5 },
    { label: "PyO3 Bindings", sub: "src/sdk.rs — stable FFI boundary", depth: 4 },
    { label: "Query Planner", sub: "BM25 + HNSW + RRF routing", depth: 3 },
    { label: "Fjall Storage", sub: "WAL + fsync + CRC32C", depth: 2 },
    { label: "HNSW Index", sub: "Cosine · M · ef_construction", depth: 1 },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
      {layers.map((l, i) => (
        <div key={i} className="arch-layer" style={{ animationDelay: `${i * 0.08}s` }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "var(--white)",
                letterSpacing: "-0.01em",
              }}
            >
              {l.label}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "rgba(255,106,0,0.6)",
                marginTop: "0.15rem",
                letterSpacing: "0.05em",
              }}
            >
              {l.sub}
            </div>
          </div>
          <div className="arch-ping" style={{ animationDuration: `${1.5 + i * 0.3}s` }} />
        </div>
      ))}
    </div>
  );
}

// ── ComparisonBar Component ───────────────────────────────────────────────────
function ComparisonBar() {
  const oldWayItems = [
    { label: "Storage Architecture", val: "Pinecone + Redis + S3" },
    { label: "Infrastructure Cost", val: "~$200/mo + latency floor" },
    { label: "p99 Query Latency", val: "200ms (network bound)" },
    { label: "Configuration & Schema", val: "Complex migrations & indexes" },
    { label: "Maintenance", val: "3 separate services to monitor" },
  ];

  const vantaWayItems = [
    { label: "Storage Architecture", val: "pip install vantadb (Local File)" },
    { label: "Infrastructure Cost", val: "Single file, $0 runtime" },
    { label: "p99 Query Latency", val: "1.2ms (in-process FFI)" },
    { label: "Configuration & Schema", val: "Zero config, namespace-scoped" },
    { label: "Maintenance", val: "0 external daemon dependencies" },
  ];

  return (
    <div
      style={{
        padding: "5rem clamp(1.5rem, 5vw, 4rem)",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div className="reveal text-center" style={{ marginBottom: "3rem" }}>
        <span className="section-eyebrow">// VantaDB vs. The Stack</span>
        <h2 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
          Simpler. Faster. <span style={{ color: "var(--amber)" }}>Zero Infra.</span>
        </h2>
      </div>

      <div className="comparison-container reveal reveal-delay-1">
        <div className="comparison-card old-way">
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "var(--crimson)",
              marginBottom: "1.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            THE OLD WAY
          </div>
          {oldWayItems.map((item, idx) => (
            <div key={idx} className="comparison-item">
              <span style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{item.label}</span>
              <span className="comparison-item-val" style={{ fontSize: "0.85rem" }}>
                {item.val}
              </span>
            </div>
          ))}
        </div>

        <div className="comparison-card vanta-way">
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "var(--amber)",
              marginBottom: "1.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            VANTADB WAY
          </div>
          {vantaWayItems.map((item, idx) => (
            <div key={idx} className="comparison-item">
              <span
                style={{
                  color: "var(--white)",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                }}
              >
                {item.label}
              </span>
              <span className="comparison-item-val" style={{ fontSize: "0.85rem" }}>
                {item.val}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── InteractiveQuickstart Component ───────────────────────────────────────────
function InteractiveQuickstart() {
  const [activeStep, setActiveStep] = useState(0);
  const [lang, setLang] = useState<"python" | "rust">("python");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const steps = [
    {
      title: "01 INSTALL",
      label: "Install package",
      pythonCode: "pip install vantadb-py",
      rustCode: "cargo add vantadb",
      pythonOutput: [
        "$ pip install vantadb-py",
        "Downloading vantadb_py-0.1.4-cp310-win_amd64.whl (1.2 MB)",
        "Installing collected packages: vantadb-py",
        "Successfully installed vantadb-py-0.1.4",
        "✓ Pure Rust core compiled (HNSW, WAL, Fjall)",
        "✓ PyO3 FFI bindings loaded in 0.3s",
      ],
      rustOutput: [
        "$ cargo add vantadb",
        "    Updating crates.io index",
        "      Adding vantadb v0.1.4 to dependencies",
        "✓ Pure Rust core dependencies analyzed",
        "✓ Ready for building target bindings",
      ],
    },
    {
      title: "02 INITIALIZE",
      label: "Open local DB",
      pythonCode: 'import vantadb_py as vanta\n\ndb = vanta.VantaDB("./agent_memory")',
      rustCode: 'use vantadb::VantaDB;\n\nlet db = VantaDB::open("./agent_memory")?;',
      pythonOutput: [
        ">>> db = vanta.VantaDB('./agent_memory')",
        "✓ Folder path validated",
        "✓ WAL recovery completed in 0.2ms (0 entries replayed)",
        "✓ Fjall storage backend initialized successfully",
        "✓ Database instance live",
      ],
      rustOutput: [
        'let db = VantaDB::open("./agent_memory")?;',
        "✓ WAL recovery complete (CRC32C verified)",
        "✓ Raw storage initialized at ./agent_memory",
        "✓ Safe Rust wrapper initialized",
      ],
    },
    {
      title: "03 STORE",
      label: "Put record",
      pythonCode:
        'db.put(\n  "memories",\n  "key-1",\n  "Agent learned user prefers async Python",\n  vector=[0.12, 0.88, 0.54],\n  metadata={"priority": "high"}\n)',
      rustCode:
        'db.put(\n    "memories",\n    "key-1",\n    "Agent learned user prefers async Python",\n    vec![0.12, 0.88, 0.54],\n    None\n)?;',
      pythonOutput: [
        ">>> db.put('memories', 'key-1', ...)",
        "✓ Key formatted and serialized to Fjall WAL",
        "✓ HNSW Index updated for namespace 'memories'",
        "✓ CRC32C calculated: 0x92f3a1d4",
        "✓ Fsync flushed successfully (WAL safe)",
      ],
      rustOutput: [
        'db.put("memories", "key-1", ...)?;',
        "✓ CRC32C verified: 0x92f3a1d4",
        "✓ WAL sync succeeded immediately",
        "✓ Key stored and index locked",
      ],
    },
    {
      title: "04 SEARCH",
      label: "Hybrid search",
      pythonCode:
        'hits = db.search_memory(\n  "memories",\n  query_vector=[0.11, 0.89, 0.55],\n  top_k=5\n)',
      rustCode:
        'let hits = db.search_memory(\n    "memories",\n    vec![0.11, 0.89, 0.55],\n    5\n)?;',
      pythonOutput: [
        ">>> hits = db.search_memory('memories', ...)",
        "🔍 Executing hybrid plan: BM25 (lexical) + HNSW (vector) + RRF fusion",
        "→ hit key-1: 'Agent learned user prefers async Python'",
        "  Score: 0.987 (RRF fused)",
        "  Latency: 1.2ms (100% local FFI execution)",
      ],
      rustOutput: [
        'let hits = db.search_memory("memories", ...)?;',
        "🔍 Query plan: BM25 (lexical) + HNSW (vector) + RRF fusion",
        "→ key-1: 'Agent learned user prefers async Python'",
        "  Fused Score: 0.987",
        "  Latency: 0.8ms (Rust direct call)",
      ],
    },
  ];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleTabClick = (idx: number) => {
    setActiveStep(idx);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 4);
      }, 7000);
    }
  };

  const currentStep = steps[activeStep];
  const codeText = lang === "python" ? currentStep.pythonCode : currentStep.rustCode;
  const outputLines = lang === "python" ? currentStep.pythonOutput : currentStep.rustOutput;

  return (
    <section
      id="quickstart"
      style={{
        padding: "6rem clamp(1.5rem, 5vw, 4rem)",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: "5rem",
          alignItems: "center",
        }}
      >
        <div>
          <span className="section-eyebrow">// Quickstart</span>
          <h2
            className="section-title reveal reveal-delay-1"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              marginBottom: "1.5rem",
            }}
          >
            Get started in <span style={{ color: "var(--amber)" }}>seconds.</span>
          </h2>
          <p className="section-sub reveal reveal-delay-2" style={{ marginBottom: "2.5rem" }}>
            Install, import and query locally. Zero dependencies. Open a file and go.
          </p>

          <div
            style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}
            className="reveal reveal-delay-3"
          >
            <button
              className={`btn-ghost ${lang === "python" ? "active" : ""}`}
              onClick={() => setLang("python")}
              style={{
                fontSize: "0.75rem",
                padding: "0.5rem 1rem",
                border: "1px solid rgba(255,106,0,0.15)",
                borderRadius: "var(--radius-sm)",
                color: lang === "python" ? "var(--amber)" : "var(--steel)",
              }}
            >
              Python SDK
            </button>
            <button
              className={`btn-ghost ${lang === "rust" ? "active" : ""}`}
              onClick={() => setLang("rust")}
              style={{
                fontSize: "0.75rem",
                padding: "0.5rem 1rem",
                border: "1px solid rgba(255,106,0,0.15)",
                borderRadius: "var(--radius-sm)",
                color: lang === "rust" ? "var(--amber)" : "var(--steel)",
              }}
            >
              Rust Core (FFI)
            </button>
          </div>

          <div
            className="reveal reveal-delay-3"
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            {steps.map((st, i) => (
              <div
                key={i}
                className={`quickstart-step ${activeStep === i ? "active" : ""}`}
                onClick={() => handleTabClick(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.25rem",
                  padding: "1.25rem 1.5rem",
                  borderLeft: activeStep === i ? "3px solid var(--amber)" : "3px solid transparent",
                  background: activeStep === i ? "rgba(255, 106, 0, 0.04)" : "transparent",
                  cursor: "pointer",
                  borderRadius: "0 var(--radius-md) var(--radius-md) 0",
                  transition: "all 200ms",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    color: activeStep === i ? "var(--amber)" : "rgba(255,106,0,0.4)",
                  }}
                >
                  0{i + 1}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: activeStep === i ? "var(--white)" : "var(--steel)",
                    }}
                  >
                    {st.title}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--muted)",
                      marginTop: "0.15rem",
                    }}
                  >
                    {st.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal reveal-delay-2">
          <div className="quickstart-panel">
            <div className="quickstart-stepper">
              {steps.map((st, idx) => (
                <button
                  key={idx}
                  className={`stepper-tab ${activeStep === idx ? "active" : ""}`}
                  onClick={() => handleTabClick(idx)}
                >
                  {st.title.split(" ")[1]}
                </button>
              ))}
            </div>
            <div className="quickstart-editor-wrap">
              <div className="editor-code-panel">
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    color: "rgba(255, 106, 0, 0.4)",
                    marginBottom: "1rem",
                    textTransform: "uppercase",
                  }}
                >
                  {lang === "python" ? "python editor" : "rust editor"}
                </div>
                <pre className="code-block-premium" style={{ border: "none", padding: 0 }}>
                  <code>{codeText}</code>
                </pre>
              </div>
              <div className="terminal-output-panel">
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    color: "rgba(255, 255, 255, 0.2)",
                    marginBottom: "1rem",
                    textTransform: "uppercase",
                  }}
                >
                  bash console
                </div>
                {outputLines.map((line, lIdx) => (
                  <div
                    key={lIdx}
                    style={{
                      margin: "0.25rem 0",
                      lineHeight: 1.5,
                      color: line.startsWith("$")
                        ? "var(--steel)"
                        : line.startsWith("✓")
                          ? "#28c840"
                          : line.startsWith("🔍") || line.startsWith("→")
                            ? "var(--amber-soft)"
                            : "var(--frost)",
                    }}
                  >
                    {line}
                  </div>
                ))}
                <span className="term-cursor" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Main Landing ───────────────────────────────────────────────────────────────
function Landing() {
  useReveal();

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

        .reveal { opacity:0; transform:translateY(24px); transition: opacity 0.75s cubic-bezier(0.23,1,0.32,1), transform 0.75s cubic-bezier(0.23,1,0.32,1); }
        .reveal.is-visible { opacity:1; transform:translateY(0); }
        .reveal-delay-1 { transition-delay:0.07s; }
        .reveal-delay-2 { transition-delay:0.15s; }
        .reveal-delay-3 { transition-delay:0.23s; }
        .reveal-delay-4 { transition-delay:0.31s; }
      `}</style>

      {/* Hero (immutable) */}
      <SingularityHero />

      <div className="hero-nebula" />

      <main className="page-content">
        {/* ── 1. COMPARISON BAR (Old Stack vs VantaDB) ── */}
        <div
          style={{
            borderBottom: "1px solid var(--subtle)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Scanlines />
          <ComparisonBar />
        </div>

        {/* ── 2. INTERACTIVE QUICKSTART (Terminal Stepper) ── */}
        <InteractiveQuickstart />

        <div className="section-divider" />

        {/* ── 3. ENGINE PORTAL ── */}
        <section
          id="engine"
          style={{
            padding: "8rem clamp(1.5rem,5vw,4rem)",
            maxWidth: "1200px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <div className="noise-overlay" style={{ opacity: 0.1 }} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: "6rem",
              alignItems: "center",
            }}
          >
            <div>
              <span className="section-eyebrow reveal">// Core Engine</span>
              <h2
                className="section-title reveal reveal-delay-1"
                style={{ fontSize: "clamp(2rem,4vw,3.2rem)", marginBottom: "1.5rem" }}
              >
                Four memory modalities.
                <br />
                <span style={{ color: "var(--amber)" }}>One atomic contract.</span>
              </h2>
              <p className="section-sub reveal reveal-delay-2" style={{ marginBottom: "2.5rem" }}>
                BM25 + HNSW unified via RRF in a single local database engine. relations stored
                natively as weighted graph edges. CRC32C Write-Ahead Logging for absolute crash
                safety.
              </p>
              <div className="reveal reveal-delay-3">
                <Link
                  to="/engine"
                  className="nav-cta"
                  style={{
                    display: "inline-block",
                    padding: "0.85rem 2rem",
                    textDecoration: "none",
                    fontSize: "0.8rem",
                  }}
                >
                  Explore Core Engine Features →
                </Link>
              </div>
            </div>
            <div className="reveal reveal-delay-2" style={{ position: "relative" }}>
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid rgba(255,106,0,0.08)",
                  borderRadius: "var(--radius-md)",
                  padding: "2rem",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Scanlines />
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    marginBottom: "1.5rem",
                    color: "var(--amber)",
                    letterSpacing: "0.1em",
                  }}
                >
                  HYBRID FUSION pipeline
                </div>
                <div className="bars-container">
                  {[
                    { name: "BM25 (lexical)", value: 88, color: "#FF6A00" },
                    { name: "HNSW (vector)", value: 95, color: "#FFC107" },
                    { name: "RRF (fused)", value: 100, color: "#FF8C38" },
                  ].map((b, i) => (
                    <div key={i} style={{ marginBottom: "1.25rem" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "0.4rem",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.7rem",
                          color: "var(--muted)",
                        }}
                      >
                        <span>{b.name}</span>
                        <span style={{ color: b.color }}>{b.value}%</span>
                      </div>
                      <div
                        style={{
                          height: "3px",
                          background: "rgba(255,255,255,0.03)",
                          borderRadius: "2px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          className="bar-fill"
                          style={
                            {
                              "--delay": `${i * 0.15 + 0.3}s`,
                              height: "100%",
                              width: "0",
                              borderRadius: "2px",
                              background: `linear-gradient(to right, ${b.color}, rgba(255,255,255,0.3))`,
                            } as React.CSSProperties
                          }
                          data-w={b.value}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── 4. ARCHITECTURE PORTAL ── */}
        <section
          id="architecture"
          style={{
            background: "var(--surface)",
            borderTop: "1px solid var(--subtle)",
            borderBottom: "1px solid var(--subtle)",
            padding: "8rem clamp(1.5rem,5vw,4rem)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="noise-overlay" style={{ opacity: 0.15 }} />
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr",
              gap: "6rem",
              alignItems: "center",
            }}
          >
            <div className="reveal reveal-delay-1">
              <ArchVisual />
            </div>
            <div>
              <span className="section-eyebrow reveal">// Architecture</span>
              <h2
                className="section-title reveal reveal-delay-1"
                style={{ fontSize: "clamp(2rem,4vw,3.2rem)", marginBottom: "1.5rem" }}
              >
                Built different.
                <br />
                <span style={{ color: "var(--amber)" }}>Runs everywhere.</span>
              </h2>
              <p className="section-sub reveal reveal-delay-2" style={{ marginBottom: "2.5rem" }}>
                VantaDB bridges direct native Python execution to high-performance compiled Rust
                memory storage using PyO3 FFI boundary limits, avoiding expensive serialization or
                server process loops.
              </p>
              <div className="reveal reveal-delay-3">
                <Link
                  to="/architecture"
                  className="nav-cta"
                  style={{
                    display: "inline-block",
                    padding: "0.85rem 2rem",
                    textDecoration: "none",
                    fontSize: "0.8rem",
                  }}
                >
                  View Deep FFI Architecture →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. INTEGRATIONS PORTAL ── */}
        <section
          id="integrations"
          style={{
            padding: "8rem clamp(1.5rem,5vw,4rem)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="noise-overlay" style={{ opacity: 0.12 }} />
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: "6rem",
              alignItems: "center",
            }}
          >
            <div>
              <span className="section-eyebrow reveal">// Ecosystem</span>
              <h2
                className="section-title reveal reveal-delay-1"
                style={{ fontSize: "clamp(2rem,4vw,3.2rem)", marginBottom: "1.5rem" }}
              >
                Agnostic.
                <br />
                <span style={{ color: "var(--amber)" }}>Unbound.</span>
              </h2>
              <p className="section-sub reveal reveal-delay-2" style={{ marginBottom: "2.5rem" }}>
                Directly connect VantaDB to your current AI agents framework. Built with first-class
                support for LlamaIndex index traversal, LangChain vectorstores, AutoGen, and Model
                Context Protocol (MCP).
              </p>
              <div className="reveal reveal-delay-3">
                <Link
                  to="/integrations"
                  className="nav-cta"
                  style={{
                    display: "inline-block",
                    padding: "0.85rem 2rem",
                    textDecoration: "none",
                    fontSize: "0.8rem",
                  }}
                >
                  Explore Orbit Ecosystem →
                </Link>
              </div>
            </div>
            <div className="reveal reveal-delay-2">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid rgba(255,106,0,0.08)",
                    padding: "1.5rem",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      color: "var(--amber)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    SUPPORTED FRAMEWORK
                  </div>
                  <div style={{ color: "var(--white)", fontWeight: 600, fontSize: "1.1rem" }}>
                    LangChain
                  </div>
                </div>
                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid rgba(255,106,0,0.08)",
                    padding: "1.5rem",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      color: "var(--amber)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    SUPPORTED FRAMEWORK
                  </div>
                  <div style={{ color: "var(--white)", fontWeight: 600, fontSize: "1.1rem" }}>
                    LlamaIndex
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── 6. USE CASES PORTAL ── */}
        <section
          id="use-cases"
          style={{ padding: "8rem clamp(1.5rem,5vw,4rem)", maxWidth: "1200px", margin: "0 auto" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr",
              gap: "6rem",
              alignItems: "center",
            }}
          >
            <div>
              <span className="section-eyebrow reveal">// Use Cases</span>
              <h2
                className="section-title reveal reveal-delay-1"
                style={{ fontSize: "clamp(2.5rem,4vw,3.2rem)", marginBottom: "1.5rem" }}
              >
                Where VantaDB
                <br />
                <span style={{ color: "var(--amber)" }}>fits perfectly.</span>
              </h2>
              <p className="section-sub reveal reveal-delay-2" style={{ marginBottom: "2.5rem" }}>
                Persistent scratchpads, memory that survives agent crashes, AST parsing context
                databases, and secure edge execution contexts with zero network footprints.
              </p>
              <div className="reveal reveal-delay-3">
                <Link
                  to="/use-cases"
                  className="nav-cta"
                  style={{
                    display: "inline-block",
                    padding: "0.85rem 2rem",
                    textDecoration: "none",
                    fontSize: "0.8rem",
                  }}
                >
                  View Design Patterns & Code →
                </Link>
              </div>
            </div>
            <div className="reveal reveal-delay-2">
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {["AI AGENTS MEMORY", "LOCAL-FIRST RAG", "CODEBASE INTELLIGENCE"].map((uc, i) => (
                  <div
                    key={i}
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      paddingBottom: "1rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        color: "var(--steel)",
                      }}
                    >
                      0{i + 1} / {uc}
                    </span>
                    <span style={{ color: "var(--amber)" }}>→</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── 7. CTA / SINGULARITY (Glassmorphic bg) ── */}
        <section
          style={{
            padding: "12rem clamp(1.5rem,5vw,4rem)",
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
            backgroundImage: "url('/bg_singularity_cta.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="noise-overlay" style={{ opacity: 0.12 }} />
          <div
            style={{
              position: "relative",
              background: "var(--surface-glass)",
              border: "1px solid rgba(255, 106, 0, 0.12)",
              borderRadius: "var(--radius-xl)",
              padding: "4rem 2rem",
              maxWidth: "800px",
              margin: "0 auto",
              backdropFilter: "blur(12px)",
              boxShadow: "var(--shadow-xl)",
            }}
            className="reveal"
          >
            <h2 className="cta-title" style={{ color: "var(--white)", marginBottom: "1.5rem" }}>
              Memory that
              <br />
              <span style={{ color: "var(--amber)" }}>never escapes.</span>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1.05rem",
                color: "var(--muted)",
                maxWidth: "440px",
                margin: "0 auto 2.5rem",
                lineHeight: 1.7,
              }}
            >
              Start building AI agents with persistent, hybrid-searchable memory today. Apache 2.0.
              One pip install.
            </p>
            <div
              className="cta-group-center"
              style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
            >
              <button
                className="btn-primary"
                style={{ fontSize: "0.9rem", padding: "1rem 2rem" }}
                onClick={() => navigator.clipboard?.writeText("pip install vantadb-py")}
              >
                pip install vantadb-py
              </button>
              <a
                href="https://github.com/ness-e/Vantadb"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                style={{
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                View on GitHub
              </a>
            </div>
            <div
              style={{
                marginTop: "2.5rem",
                display: "flex",
                gap: "1.5rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {["CI passing", "Apache 2.0", "Python 3.8+", "Rust 1.94.1+", "0 external deps"].map(
                (b) => (
                  <span
                    key={b}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      color: "var(--muted)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    ✓ {b}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
