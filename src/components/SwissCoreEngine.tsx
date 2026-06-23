import { Link } from "@tanstack/react-router";

// ── Swiss Core Engine — 6 features en grid OLED ────────────────────────────
// Swiss rule: feature grid as taxonomy table. No icons decorativos.

const FEATURES = [
  {
    id: "hybrid",
    tag: "HYBRID SEARCH",
    headline: "One query, three engines.",
    body: "VantaDB merges SQL filters, vector similarity (HNSW), and full-text search (BM25) in a single API call. No pipeline glue code.",
    link: "/engine",
  },
  {
    id: "embedded",
    tag: "EMBEDDED",
    headline: "No server. No infra.",
    body: "Ships as a ~400KB binary. Import it like a library. Works on Raspberry Pi, mobile devices, and serverless edge runtimes.",
    link: "/architecture",
  },
  {
    id: "rust",
    tag: "RUST RUNTIME",
    headline: "Memory-safe by design.",
    body: "Written in Rust. No GC pauses, no data races, no undefined behavior. Predictable latency under concurrent load.",
    link: "/engine",
  },
  {
    id: "python",
    tag: "PYTHON SDK",
    headline: "pip install. Done.",
    body: "Native Python bindings via PyO3. Works in Jupyter, FastAPI, LangChain, and any Python 3.9+ environment.",
    link: "/integrations",
  },
  {
    id: "wal",
    tag: "DURABILITY",
    headline: "WAL persistence.",
    body: "Write-Ahead Log for crash recovery. ACID semantics on every transaction. Your data survives power loss.",
    link: "/engine",
  },
  {
    id: "mit",
    tag: "MIT LICENSE",
    headline: "Ship without asking.",
    body: "No seat limits. No usage fees. No vendor lock-in. Build on VantaDB in open-source or commercial products alike.",
    link: "/about",
  },
];

export function SwissCoreEngine() {
  return (
    <section className="swiss-section">
      <div className="swiss-inner">
        {/* Section header — bordered */}
        <div className="swiss-section-header swiss-section-header--bordered">
          <span className="swiss-eyebrow">04 / 08 — Core Engine</span>
          <div className="split-7-5" style={{ marginTop: "1.25rem" }}>
            <h2 className="swiss-core__title">
              Three engines.
              <br />
              One binary.
            </h2>
            <p className="section-sub">
              VantaDB replaces the entire retrieval stack — no
              orchestration, no round-trips, no separate services.
            </p>
          </div>
        </div>

        {/* Feature grid — 3×2 */}
        <div className="swiss-core__grid">
          {FEATURES.map((feat, i) => (
            <div className="swiss-core__feature" key={feat.id}>
              {/* Index + tag */}
              <div className="swiss-core__feature-meta">
                <span className="swiss-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="swiss-core__feature-tag">{feat.tag}</span>
              </div>

              {/* Divider */}
              <div className="grid-line-h swiss-core__feature-divider" />

              {/* Content */}
              <h3 className="swiss-core__feature-headline">{feat.headline}</h3>
              <p className="swiss-core__feature-body">{feat.body}</p>

              {/* Link */}
              <Link className="swiss-core__feature-link" to={feat.link}>
                LEARN MORE →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
