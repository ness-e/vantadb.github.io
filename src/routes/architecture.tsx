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
    <tr className="spec-table-row">
      <td className="spec-table-cell spec-table-label">{label}</td>
      <td className="spec-table-cell spec-table-value">{val}</td>
      <td className="spec-table-desc">{desc}</td>
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
    <div className="page-wrapper">
      <header className="page-header-extended">
        <span className="section-eyebrow reveal">// Architecture</span>
        <h1 className="title-accent reveal reveal-delay-1">
          Built different.
          <br />
          Runs everywhere.
        </h1>
        <p className="section-sub reveal reveal-delay-2 desc-text">
          VantaDB compiles to a single native library wrapper. No extra TCP connections, no separate
          processes to start. Just pure memory speed.
        </p>
      </header>

      <main className="main-content">
        {/* ── Layered depth section (isometric pseudo-3D stack) ── */}
        <section className="arch-section">
          <div className="reveal">
            <span className="section-eyebrow">// Depth Layout</span>
            <h2 className="section-title section-title--compact">
              In-Process Stack depth
            </h2>
            <p className="section-sub section-sub--mb-sm">
              Hover over or click any layer in the isometric stack to analyze the technology stack,
              data flow bounds, and implementation specifics.
            </p>

            <div className="arch-detail-panel">
              {activeLayer !== null ? (
                <div>
                  <div className="arch-detail-tech">
                    {layers.find((l) => l.index === activeLayer)?.tech}
                  </div>
                  <h4 className="arch-detail-name">
                    {layers.find((l) => l.index === activeLayer)?.name}
                  </h4>
                  <p className="arch-detail-desc">
                    {layers.find((l) => l.index === activeLayer)?.desc}
                  </p>
                  <div className="arch-detail-spec">
                    API surface: {layers.find((l) => l.index === activeLayer)?.spec}
                  </div>
                </div>
              ) : (
                <div className="arch-empty-state">
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
                    <span className="arch-layer-name">
                      {layer.name}
                    </span>
                    <span className="arch-layer-index">
                      L0{5 - layer.index}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section: Hardware Limits & Specifications ── */}
        <section className="arch-spec-section">
          <div className="reveal">
            <span className="section-eyebrow">// Specifications</span>
            <h2 className="section-title section-title--arch-sm">
              Operational limits & Concurrency model
            </h2>
          </div>

          <div className="arch-table-card reveal reveal-delay-1">
            <table className="arch-spec-table">
              <thead>
                <tr className="arch-table-head-row">
                  <th className="arch-table-th">
                    Parameter
                  </th>
                  <th className="arch-table-th">
                    VantaDB Limits
                  </th>
                  <th className="arch-table-th">
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
