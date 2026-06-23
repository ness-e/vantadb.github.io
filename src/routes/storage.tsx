import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSubpage } from "../components/HeroSubpage";
import { PageShell } from "../components/PageShell";
import { CtaSection } from "../components/CtaSection";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const Route = createFileRoute("/storage")({
  head: () => ({
    meta: [
      { title: "VantaDB — Single-Binary Storage Architecture" },
      {
        name: "description",
        content:
          "VantaDB replaces Pinecone + Redis + S3 with a single Rust binary. LSM-tree storage, WAL durability, HNSW indexing — everything in one file.",
      },
    ],
  }),
  component: StoragePage,
});

function StoragePage() {
  useScrollReveal();

  return (
    <PageShell>
      <HeroSubpage
        eyebrow="// Storage Architecture"
        title={
          <>
            Single binary.
            <br />
            Three engines.
          </>
        }
        subtitle="No more juggling Pinecone, Redis, and S3. VantaDB unifies vector, full-text, and structured storage in one embedded engine with WAL-backed durability."
        stats={[
          { value: "1", label: "Binary to deploy" },
          { value: "3", label: "Query engines" },
          { value: "0", label: "External deps" },
        ]}
      />

      <main className="main-content">
        <section className="comparison-split">
          <div className="reveal">
            <span className="section-eyebrow">// Legacy Stack</span>
            <h2 className="section-title section-title--compact">Three services, three SDKs</h2>
            <ul className="comparison-list">
              <li>
                <span className="icon-cross">✗</span> Pinecone: vector index (proprietary,
                cloud-only)
              </li>
              <li>
                <span className="icon-cross">✗</span> Redis: metadata + cache (in-memory, not
                durable)
              </li>
              <li>
                <span className="icon-cross">✗</span> S3: document storage + backups
              </li>
              <li>
                <span className="icon-cross">✗</span> Three different SDKs, auth mechanisms,
                latencies
              </li>
              <li>
                <span className="icon-cross">✗</span> No transactional consistency across services
              </li>
            </ul>
          </div>
          <div className="reveal reveal-delay-1">
            <span className="section-eyebrow">// VantaDB Stack</span>
            <h2 className="section-title section-title--compact">One embedded engine</h2>
            <ul className="comparison-list">
              <li>
                <span className="icon-check">✓</span> HNSW vector index: native, configurable recall
              </li>
              <li>
                <span className="icon-check">✓</span> BM25 full-text: tokenized, stemmed, scored
              </li>
              <li>
                <span className="icon-check">✓</span> SQL analytics: typed columns, filter,
                aggregate
              </li>
              <li>
                <span className="icon-check">✓</span> WAL-backed durability: crash-safe, no data
                loss
              </li>
              <li>
                <span className="icon-check">✓</span> Single SDK: `pip install vantadb-py`, one
                `connect()`
              </li>
            </ul>
          </div>
        </section>

        <section className="chart-section">
          <div className="reveal text-center mb-12">
            <span className="section-eyebrow">// Stack Comparison</span>
            <h2 className="section-title section-title--compact">Three services → one engine</h2>
          </div>

          <div className="stack-diagram">
            <div className="stack-col stack-col--legacy">
              <span className="stack-col-header">Legacy</span>
              <div
                className="stack-card"
                style={{ "--accent": "var(--crimson)" } as React.CSSProperties}
              >
                <span className="stack-card-name">Pinecone</span>
                <span className="stack-card-role">Vector index</span>
              </div>
              <div
                className="stack-card"
                style={{ "--accent": "var(--warn)" } as React.CSSProperties}
              >
                <span className="stack-card-name">Redis</span>
                <span className="stack-card-role">Cache + metadata</span>
              </div>
              <div
                className="stack-card"
                style={{ "--accent": "var(--steel-light)" } as React.CSSProperties}
              >
                <span className="stack-card-name">S3</span>
                <span className="stack-card-role">Document storage</span>
              </div>
              <span className="stack-figures">3 services, 3 SDKs, 3 bills</span>
            </div>
            <div className="stack-arrow">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--amber)"
                strokeWidth="1.5"
              >
                <path d="M5 12h14m-4-4 4 4-4 4" />
              </svg>
            </div>
            <div className="stack-col stack-col--vanta">
              <span className="stack-col-header">VantaDB</span>
              <div
                className="stack-card stack-card--single"
                style={{ "--accent": "var(--amber)" } as React.CSSProperties}
              >
                <span className="stack-card-name">vantadb</span>
                <span className="stack-card-role">Vector · Full-text · SQL · WAL</span>
              </div>
              <span className="stack-figures">1 binary, 1 SDK, $0</span>
            </div>
          </div>
        </section>

        <section className="chart-section">
          <div className="reveal text-center mb-12">
            <span className="section-eyebrow">// Storage Architecture</span>
            <h2 className="section-title section-title--compact">How it works</h2>
          </div>

          <div className="three-column-grid">
            {[
              {
                step: "01",
                title: "LSM-Tree Foundation",
                desc: "Columnar storage with log-structured merge-tree compaction. Typed, nullable columns with efficient compression and predicate pushdown.",
              },
              {
                step: "02",
                title: "HNSW Vector Index",
                desc: "Hierarchical navigable small world graphs for approximate nearest neighbor search. Configurable M (16-64) and efConstruction for recall/speed tradeoffs.",
              },
              {
                step: "03",
                title: "WAL Durability",
                desc: "Write-ahead log with checksum verification and automatic recovery. Configurable sync modes: async (fastest), fsync (safe), or full (maximum durability).",
              },
            ].map((item) => (
              <div key={item.step} className="arch-card reveal">
                <div className="arch-number">{item.step}</div>
                <div className="arch-title">{item.title}</div>
                <div className="arch-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-narrow">
          <div className="reveal text-center reveal-centered">
            <span className="section-eyebrow">// Engine States</span>
            <h2 className="section-title section-title--compact">One database, many modes</h2>
            <p className="section-sub">
              VantaDB's storage engine operates across three states:{" "}
              <strong style={{ color: "var(--amber)" }}>Active</strong> (serving reads + writes),
              <strong style={{ color: "var(--amber)" }}> Checkpoint</strong> (WAL flush + index
              compaction), and <strong style={{ color: "var(--amber)" }}> Recovery</strong>
              (WAL replay on restart). All transparent — no manual intervention required.
            </p>
          </div>
        </section>

        <CtaSection />

        <nav className="bottom-nav">
          <Link to="/" className="back-link nav-cta">
            ← Back to comparison
          </Link>
        </nav>
      </main>
    </PageShell>
  );
}
