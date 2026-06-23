import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSubpage } from "../components/HeroSubpage";
import { PageShell } from "../components/PageShell";

export const Route = createFileRoute("/changelog")({
  head: () => ({
    meta: [
      { title: "VantaDB — Changelog" },
      { name: "description", content: "Release notes for VantaDB. Track new features, performance improvements, bug fixes, and breaking changes across versions." },
    ],
  }),
  component: ChangelogPage,
});

const releases = [
  {
    version: "v0.6.0",
    date: "2026-06-15",
    tag: "Hybrid RRF GA",
    changes: [
      { type: "feature", text: "Hybrid search with reciprocal rank fusion (RRF) — combine vector + BM25 scores in one query." },
      { type: "feature", text: "Python SDK v0.6.0: new `query_hybrid()` method with configurable alpha weighting." },
      { type: "perf", text: "HNSW index build 28% faster on high-cardinality datasets (10M+ vectors)." },
      { type: "fix", text: "WAL replay no longer stalls on corrupted checkpoint segments — automatic recovery." },
      { type: "breaking", text: "Rust SDK: `QueryBuilder::hybrid()` now requires explicit `alpha` parameter (default 0.5)." },
    ],
  },
  {
    version: "v0.5.1",
    date: "2026-05-20",
    tag: "Stability release",
    changes: [
      { type: "fix", text: "Fixed race condition in concurrent reader/writer scenarios under heavy load." },
      { type: "fix", text: "Memory-mapped file handle leak on Windows after 10K+ connections." },
      { type: "perf", text: "Reduced lock contention in WAL commit path — 15% higher throughput on multi-threaded workloads." },
    ],
  },
  {
    version: "v0.5.0",
    date: "2026-04-28",
    tag: "Multi-node replication",
    changes: [
      { type: "feature", text: "WAL-based replication: stream mutations from primary to N replicas with strict ordering." },
      { type: "feature", text: "C API 0.5.0: `vantadb_replicate_start()` / `vantadb_replicate_stop()` for embedded replication control." },
      { type: "feature", text: "New CLI subcommand: `vantadb repl --connect <primary>` for headless replica setup." },
      { type: "perf", text: "Vector search p50 latency improved from 1.4ms to 1.2ms (HNSW+SIMD path)." },
    ],
  },
  {
    version: "v0.4.2",
    date: "2026-03-10",
    tag: "Performance",
    changes: [
      { type: "perf", text: "22% faster hybrid queries — fused vector + BM25 evaluation in a single scan pass." },
      { type: "fix", text: "BM25 term frequency normalization edge case for documents with repeated tokens." },
      { type: "feature", text: "Rust SDK: `Collection::vocabulary()` returns full token dictionary for custom scoring." },
    ],
  },
  {
    version: "v0.4.1",
    date: "2026-02-14",
    tag: "Bug fix release",
    changes: [
      { type: "fix", text: "Python SDK: `insert_many()` now correctly batches WAL commits instead of one per row." },
      { type: "fix", text: "IVF index training OOM on datasets >5M vectors — now uses streaming k-means." },
      { type: "perf", text: "Reduced memory footprint of BM25 posting lists by 40%." },
    ],
  },
  {
    version: "v0.4.0",
    date: "2026-01-20",
    tag: "iOS + Android",
    changes: [
      { type: "feature", text: "Android NDK support — build VantaDB as a shared library for Android apps via C API." },
      { type: "feature", text: "iOS framework — XCFramework distribution with Swift-friendly C bindings." },
      { type: "feature", text: "Python SDK: `vantadb.connect()` now accepts `:memory:` for fully in-memory databases." },
      { type: "breaking", text: "C API: `vantadb_init()` now requires pointer to allocator struct (or NULL for default)." },
    ],
  },
];

const typeConfig: Record<string, { color: string; label: string }> = {
  feature: { color: "var(--success)", label: "Feature" },
  perf: { color: "var(--amber)", label: "Perf" },
  fix: { color: "var(--steel-light)", label: "Fix" },
  breaking: { color: "var(--danger)", label: "Breaking" },
};

function ChangelogPage() {
  return (
    <PageShell>
      <HeroSubpage
        eyebrow="// Changelog"
        title={<>What's new.<br />What's improved.</>}
        subtitle="Every release of VantaDB — features, performance gains, bug fixes, and migration notes. No marketing fluff, just the diff."
        stats={[
          { value: "v0.6.0", label: "Latest" },
          { value: "6", label: "Releases" },
          { value: "MIT", label: "License" },
        ]}
      />

      <main className="main-content">
        <section className="cl-timeline">
          <div className="cl-line" />

          {releases.map((release, i) => (
            <div key={release.version} className="cl-release reveal" style={{ transitionDelay: `${i * 0.06}s` }}>
              <div className="cl-dot" />

              <div className="cl-release-header">
                <h3 className="cl-version">{release.version}</h3>
                <span className="cl-date">{release.date}</span>
                <span className="cl-tag">{release.tag}</span>
              </div>

              <ul className="cl-changes">
                {release.changes.map((c) => {
                  const cfg = typeConfig[c.type] || { color: "var(--muted)", label: c.type };
                  return (
                    <li key={c.text} className="cl-change">
                      <span className="cl-change-type" style={{ color: cfg.color, borderColor: cfg.color }}>
                        {cfg.label}
                      </span>
                      <span className="cl-change-text">{c.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </section>

        <section className="section-narrow" style={{ borderBottom: "none" }}>
          <div className="reveal text-center reveal-centered">
            <span className="section-eyebrow">// Upgrade</span>
            <h2 className="section-title section-title--compact">Upgrade notes</h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>
              VantaDB follows semantic versioning. Upgrading between patch versions (0.4.x → 0.4.y) requires no code changes.
              Minor version bumps (0.4 → 0.5) may introduce breaking changes — check the Breaking tags above.
              Always test against your data before deploying to production.
            </p>
          </div>
        </section>

        <nav className="bottom-nav">
          <Link to="/" className="back-link nav-cta">
            ← Back to Home
          </Link>
        </nav>
      </main>
    </PageShell>
  );
}
