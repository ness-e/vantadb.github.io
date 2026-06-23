import { createFileRoute } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { HeroSubpage } from "@/components/HeroSubpage";
import { ScrollStory } from "@/components/ScrollStory";
import { ArchCrossSection } from "@/components/ArchCrossSection";
import { Flamegraph } from "@/components/Flamegraph";

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

const storyPanels = [
  {
    id: "python-sdk",
    content: (
      <>
        <span className="section-eyebrow">Layer 1</span>
        <h2 className="ss-title">Python SDK</h2>
        <p className="ss-desc">
          Direct importable Python library offering namespace queries, hybrid search
          fusing, and structured JSON FFI calls. Zero-copy from Python to Rust.
        </p>
        <div className="ss-metrics">
          <div className="ss-metric">
            <span className="ss-metric-value">vantadb.put()</span>
            <span className="ss-metric-label">Primary API</span>
          </div>
          <div className="ss-metric">
            <span className="ss-metric-value">search_memory()</span>
            <span className="ss-metric-label">Query entry</span>
          </div>
          <div className="ss-metric">
            <span className="ss-metric-value">delete()</span>
            <span className="ss-metric-label">Mutation</span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "pyo3-ffi",
    content: (
      <>
        <span className="section-eyebrow">Layer 2</span>
        <h2 className="ss-title">PyO3 FFI Boundary</h2>
        <p className="ss-desc">
          Fast FFI boundary compilation translating Python dicts to Rust structs
          without heap allocation loops. Stable boundary guarantees no GIL contention.
        </p>
        <div className="ss-metrics">
          <div className="ss-metric">
            <span className="ss-metric-value">src/sdk.rs</span>
            <span className="ss-metric-label">Source</span>
          </div>
          <div className="ss-metric">
            <span className="ss-metric-value">Zero-copy</span>
            <span className="ss-metric-label">Boundary</span>
          </div>
          <div className="ss-metric">
            <span className="ss-metric-value">Stable FFI</span>
            <span className="ss-metric-label">Contract</span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "core-engine",
    content: (
      <>
        <span className="section-eyebrow">Layer 3</span>
        <h2 className="ss-title">Core Engine</h2>
        <p className="ss-desc">
          Splits queries into lexical inverted indexes and HNSW indexes, calculating
          Reciprocal Rank Fusion relevance in parallel across all available cores.
        </p>
        <div className="ss-metrics">
          <div className="ss-metric">
            <span className="ss-metric-value">BM25</span>
            <span className="ss-metric-label">Lexical</span>
          </div>
          <div className="ss-metric">
            <span className="ss-metric-value">HNSW</span>
            <span className="ss-metric-label">Vector</span>
          </div>
          <div className="ss-metric">
            <span className="ss-metric-value">RRF</span>
            <span className="ss-metric-label">Fusion</span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "storage",
    content: (
      <>
        <span className="section-eyebrow">Layer 4</span>
        <h2 className="ss-title">Log-Structured Storage</h2>
        <p className="ss-desc">
          In-process log-structured merge-tree engine managing blocks, WAL buffers,
          compaction runs, and transaction safety with CRC32C integrity checks.
        </p>
        <div className="ss-metrics">
          <div className="ss-metric">
            <span className="ss-metric-value">WAL sync</span>
            <span className="ss-metric-label">Durability</span>
          </div>
          <div className="ss-metric">
            <span className="ss-metric-value">CRC32C</span>
            <span className="ss-metric-label">Integrity</span>
          </div>
          <div className="ss-metric">
            <span className="ss-metric-value">fsync</span>
            <span className="ss-metric-label">Flush</span>
          </div>
        </div>
      </>
    ),
  },
];

function ArchitecturePage() {
  useScrollReveal();

  return (
    <div className="page-wrapper">
      <HeroSubpage
        eyebrow="Architecture"
        title="Zero-copy from Python to Rust"
        subtitle="VantaDB compiles to a single native library wrapper. No extra TCP connections, no separate processes to start. Just pure memory speed."
      />

      <main className="main-content">
        <ScrollStory
          id="arch-stack"
          panels={storyPanels}
          start="top top"
          end="+=300%"
          scrub={1.2}
        />

        <section className="arch-section">
          <div className="reveal">
            <span className="section-eyebrow">// Cross Section</span>
            <h2 className="section-title section-title--compact">
              Runtime profile & data flow
            </h2>
            <p className="section-sub section-sub--mb-sm">
              Visual breakdown of the in-process stack, hot paths, and per-layer
              CPU time distribution.
            </p>
          </div>
          <div className="reveal reveal-delay-1">
            <ArchCrossSection />
          </div>
          <div className="reveal reveal-delay-2">
            <Flamegraph />
          </div>
        </section>

        <section className="arch-spec-section">
          <div className="reveal">
            <span className="section-eyebrow">// Specifications</span>
            <h2 className="section-title section-title--arch-sm">
              Operational limits & Concurrency model
            </h2>
          </div>

          <div className="tactile-card reveal reveal-delay-1">
            <table className="arch-spec-table">
              <thead>
                <tr className="arch-table-head-row">
                  <th className="arch-table-th">Parameter</th>
                  <th className="arch-table-th">VantaDB Limits</th>
                  <th className="arch-table-th">Technical Details & Behavior</th>
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
