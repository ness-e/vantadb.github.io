import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title: "VantaDB — Engine Architecture & Limits" },
      {
        name: "description",
        content:
          "Behind the FFI: stable boundary FFI bindings, Fjall storage layers, concurrency models and hardware limits.",
      },
    ],
  }),
  component: ArchitecturePage,
});

function SpecRow({ label, val, desc }: { label: string; val: string; desc: string }) {
  return (
    <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.03)" }}>
      <td
        style={{
          padding: "1.25rem 1rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.8rem",
          color: "var(--white)",
        }}
      >
        {label}
      </td>
      <td
        style={{
          padding: "1.25rem 1rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.8rem",
          color: "var(--amber)",
        }}
      >
        {val}
      </td>
      <td style={{ padding: "1.25rem 1rem", fontSize: "0.85rem", color: "var(--muted)" }}>
        {desc}
      </td>
    </tr>
  );
}

function ArchitecturePage() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  const layers = [
    {
      index: 4,
      name: "Python SDK wrapper",
      tech: "python package",
      desc: "Direct importable Python library offering namespace queries, hybrid search fusing, and structured JSON FFI calls.",
      spec: "vantadb.put() / search_memory() / delete()",
    },
    {
      index: 3,
      name: "PyO3 Bindings",
      tech: "src/sdk.rs (FFI)",
      desc: "Fast FFI boundary compilation translating Python dicts to Rust structs without heap allocation loops.",
      spec: "Zero-copy bindings · Stable FFI boundaries",
    },
    {
      index: 2,
      name: "Query Planner",
      tech: "rust fusion",
      desc: "Splits queries into lexical inverted indexes and HNSW indexes, calculating Reciprocal Rank Fusion relevance in parallel.",
      spec: "BM25 + HNSW + RRF routing",
    },
    {
      index: 1,
      name: "Fjall Log-Structured Engine",
      tech: "fjall (LSM)",
      desc: "In-process log-structured merge-tree engine managing blocks, WAL buffers, compaction runs, and transaction safety.",
      spec: "WAL sync · CRC32C integrity · fsync",
    },
    {
      index: 0,
      name: "Index Storage Layer",
      tech: "hnsw mapping",
      desc: "Flat files storing the vector coordinates and graph adjacencies directly mapped into physical RAM spaces.",
      spec: "M=16 construction · Cosine/Euclidean/Dot",
    },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: "var(--background)", minHeight: "100vh" }}>
      <header className="page-header-extended">
        <span className="section-eyebrow reveal">// Architecture</span>
        <h1
          className="title-accent reveal reveal-delay-1"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            margin: "0.5rem 0 1.5rem",
          }}
        >
          Built different.
          <br />
          Runs everywhere.
        </h1>
        <p className="section-sub reveal reveal-delay-2" style={{ maxWidth: "680px", margin: 0 }}>
          VantaDB compiles to a single native library wrapper. No extra TCP connections, no separate
          processes to start. Just pure memory speed.
        </p>
      </header>

      <main
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(1.5rem, 5vw, 4rem) 8rem" }}
      >
        {/* ── Layered depth section (isometric pseudo-3D stack) ── */}
        <section
          style={{
            padding: "4rem 0 8rem",
            borderBottom: "1px solid var(--subtle)",
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "6rem",
            alignItems: "center",
          }}
        >
          <div className="reveal">
            <span className="section-eyebrow">// Depth Layout</span>
            <h2 className="section-title" style={{ margin: "0.5rem 0 1.5rem" }}>
              In-Process Stack depth
            </h2>
            <p className="section-sub" style={{ marginBottom: "2rem" }}>
              Hover over or click any layer in the isometric stack to analyze the technology stack,
              data flow bounds, and implementation specifics.
            </p>

            <div
              style={{
                minHeight: "180px",
                background: "var(--surface)",
                border: "1px solid rgba(255,106,0,0.08)",
                padding: "2rem",
                borderRadius: "var(--radius-lg)",
              }}
            >
              {activeLayer !== null ? (
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      color: "var(--amber)",
                      textTransform: "uppercase",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {layers.find((l) => l.index === activeLayer)?.tech}
                  </div>
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--white)",
                      fontSize: "1.2rem",
                      margin: "0 0 0.75rem",
                    }}
                  >
                    {layers.find((l) => l.index === activeLayer)?.name}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--muted)",
                      margin: "0 0 1rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {layers.find((l) => l.index === activeLayer)?.desc}
                  </p>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "var(--steel)",
                    }}
                  >
                    API surface: {layers.find((l) => l.index === activeLayer)?.spec}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "140px",
                    color: "var(--steel)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                  }}
                >
                  // Hover over the stack layers to view details
                </div>
              )}
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <div className="isometric-stack">
              {layers.map((layer) => (
                <button
                  key={layer.index}
                  className="isometric-layer"
                  style={{ "--layer-index": layer.index } as React.CSSProperties}
                  onMouseEnter={() => setActiveLayer(layer.index)}
                  onMouseLeave={() => setActiveLayer(null)}
                  onClick={() => setActiveLayer(layer.index)}
                >
                  <div className="isometric-layer-info">
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "var(--white)",
                      }}
                    >
                      {layer.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.62rem",
                        color: "var(--amber)",
                      }}
                    >
                      L0{5 - layer.index}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section: Hardware Limits & Specifications ── */}
        <section style={{ padding: "6rem 0" }}>
          <div className="reveal">
            <span className="section-eyebrow">// Specifications</span>
            <h2 className="section-title" style={{ margin: "0.5rem 0 2rem" }}>
              Operational limits & Concurrency model
            </h2>
          </div>

          <div
            className="reveal reveal-delay-1"
            style={{
              background: "var(--surface)",
              border: "1px solid rgba(255,106,0,0.06)",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr
                  style={{
                    background: "rgba(0,0,0,0.2)",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <th
                    style={{
                      padding: "1.25rem 1rem",
                      fontFamily: "var(--font-display)",
                      fontSize: "0.9rem",
                      color: "var(--white)",
                      fontWeight: 600,
                    }}
                  >
                    Parameter
                  </th>
                  <th
                    style={{
                      padding: "1.25rem 1rem",
                      fontFamily: "var(--font-display)",
                      fontSize: "0.9rem",
                      color: "var(--white)",
                      fontWeight: 600,
                    }}
                  >
                    VantaDB Limits
                  </th>
                  <th
                    style={{
                      padding: "1.25rem 1rem",
                      fontFamily: "var(--font-display)",
                      fontSize: "0.9rem",
                      color: "var(--white)",
                      fontWeight: 600,
                    }}
                  >
                    Technical Details & Behavior
                  </th>
                </tr>
              </thead>
              <tbody>
                <SpecRow
                  label="Key Size Limit"
                  val="1 KB"
                  desc="Identifiers must be compact to ensure lightning-fast pointer indexing in standard LSM memory bounds."
                />
                <SpecRow
                  label="Vector Dimensions Limit"
                  val="32,768 dims"
                  desc="Configurable HNSW index structures, optimized up to high-end sparse embeddings."
                />
                <SpecRow
                  label="Text Content Limit"
                  val="10 MB per put"
                  desc="Larger chunk payloads are offloaded directly to binary buffers, preserving planner heap latency floors."
                />
                <SpecRow
                  label="Metadata Size Limit"
                  val="64 KB"
                  desc="Structured dictionaries for lexical pre-filtering operations before RRF fusion runs."
                />
                <SpecRow
                  label="Concurrency Model"
                  val="1 Writer (RwLock) · ∞ Readers"
                  desc="Safe thread concurrent read executions, write paths synchronize locks to protect journal logs."
                />
                <SpecRow
                  label="sync_mode Options"
                  val="always | periodic | never"
                  desc="Set flush WAL constraints depending on durability trade-offs (Periodic sync defaults to 500ms intervals)."
                />
                <SpecRow
                  label="Engine States"
                  val="Initializing → Ready → Flushing → Closed"
                  desc="Exposes state transitions cleanly through FFI to allow hot rebuilding without data losses."
                />
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
