import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SwissSubpageHero } from "@/components/SwissSubpageHero";

export const Route = createFileRoute("/changelog")({
  head: () => ({
    meta: [
      { title: "VantaDB — Changelog" },
      {
        name: "description",
        content:
          "Release notes for VantaDB. Track new features, performance improvements, bug fixes, and breaking changes across versions.",
      },
    ],
  }),
  component: ChangelogPage,
});

// ── Data ─────────────────────────────────────────────────────────────────────
const releases = [
  {
    version: "v0.6.0",
    date: "2026-06-15",
    tag: "Hybrid RRF GA",
    changes: [
      {
        type: "feature",
        text: "Hybrid search with reciprocal rank fusion (RRF) — combine vector + BM25 scores in one query.",
      },
      {
        type: "feature",
        text: "Python SDK v0.6.0: new `query_hybrid()` method with configurable alpha weighting.",
      },
      {
        type: "perf",
        text: "HNSW index build 28% faster on high-cardinality datasets (10M+ vectors).",
      },
      {
        type: "fix",
        text: "WAL replay no longer stalls on corrupted checkpoint segments — automatic recovery.",
      },
      {
        type: "breaking",
        text: "Rust SDK: `QueryBuilder::hybrid()` now requires explicit `alpha` parameter (default 0.5).",
      },
    ],
  },
  {
    version: "v0.5.1",
    date: "2026-05-20",
    tag: "Stability Release",
    changes: [
      {
        type: "fix",
        text: "Fixed race condition in concurrent reader/writer scenarios under heavy load.",
      },
      {
        type: "fix",
        text: "Memory-mapped file handle leak on Windows after 10K+ connections.",
      },
      {
        type: "perf",
        text: "Reduced lock contention in WAL commit path — 15% higher throughput on multi-threaded workloads.",
      },
    ],
  },
  {
    version: "v0.5.0",
    date: "2026-04-28",
    tag: "Multi-node Replication",
    changes: [
      {
        type: "feature",
        text: "WAL-based replication: stream mutations from primary to N replicas with strict ordering.",
      },
      {
        type: "feature",
        text: "C API 0.5.0: `vantadb_replicate_start()` / `vantadb_replicate_stop()` for embedded replication control.",
      },
      {
        type: "feature",
        text: "New CLI subcommand: `vantadb repl --connect <primary>` for headless replica setup.",
      },
      {
        type: "perf",
        text: "Vector search p50 latency improved from 1.4ms to 1.2ms (HNSW+SIMD path).",
      },
    ],
  },
  {
    version: "v0.4.2",
    date: "2026-03-10",
    tag: "Performance",
    changes: [
      {
        type: "perf",
        text: "22% faster hybrid queries — fused vector + BM25 evaluation in a single scan pass.",
      },
      {
        type: "fix",
        text: "BM25 term frequency normalization edge case for documents with repeated tokens.",
      },
      {
        type: "feature",
        text: "Rust SDK: `Collection::vocabulary()` returns full token dictionary for custom scoring.",
      },
    ],
  },
  {
    version: "v0.4.1",
    date: "2026-02-14",
    tag: "Bug Fix",
    changes: [
      {
        type: "fix",
        text: "Python SDK: `insert_many()` now correctly batches WAL commits instead of one per row.",
      },
      {
        type: "fix",
        text: "IVF index training OOM on datasets >5M vectors — now uses streaming k-means.",
      },
      { type: "perf", text: "Reduced memory footprint of BM25 posting lists by 40%." },
    ],
  },
  {
    version: "v0.4.0",
    date: "2026-01-20",
    tag: "iOS + Android",
    changes: [
      {
        type: "feature",
        text: "Android NDK support — build VantaDB as a shared library for Android apps via C API.",
      },
      {
        type: "feature",
        text: "iOS framework — XCFramework distribution with Swift-friendly C bindings.",
      },
      {
        type: "feature",
        text: "Python SDK: `vantadb.connect()` now accepts `:memory:` for fully in-memory databases.",
      },
      {
        type: "breaking",
        text: "C API: `vantadb_init()` now requires pointer to allocator struct (or NULL for default).",
      },
    ],
  },
];

const TYPE_CONFIG: Record<string, { label: string; color: string }> = {
  feature: { label: "FEATURE", color: "var(--foreground)" },
  perf: { label: "PERF", color: "var(--amber)" },
  fix: { label: "FIX", color: "var(--steel)" },
  breaking: { label: "BREAKING", color: "#ff3b30" },
};

// ── Filter bar ────────────────────────────────────────────────────────────────
const ALL_TYPES = ["all", "feature", "perf", "fix", "breaking"];

function ChangelogPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredReleases = releases
    .map((r) => ({
      ...r,
      changes:
        activeFilter === "all" ? r.changes : r.changes.filter((c) => c.type === activeFilter),
    }))
    .filter((r) => r.changes.length > 0);

  return (
    <div className="engine-page">
      <SwissSubpageHero
        num="04"
        eyebrow="Changelog"
        title={
          <span>
            What changed.
            <br />
            Why it matters.
          </span>
        }
        sub="Every release — features, performance gains, fixes, and migration notes. No marketing fluff."
      />

      <main className="engine-main">
        {/* Filter bar */}
        <div
          style={{
            display: "flex",
            gap: "1px",
            background: "var(--border)",
            border: "1px solid var(--border)",
            marginBottom: "4rem",
            width: "fit-content",
          }}
        >
          {ALL_TYPES.map((t) => {
            const cfg = TYPE_CONFIG[t];
            const isActive = activeFilter === t;
            return (
              <button
                key={t}
                onClick={() => setActiveFilter(t)}
                style={{
                  background: isActive ? "var(--surface-raised)" : "var(--background)",
                  border: "none",
                  borderBottom: isActive
                    ? `2px solid ${t === "all" ? "var(--foreground)" : cfg?.color || "var(--foreground)"}`
                    : "2px solid transparent",
                  padding: "0.75rem 1.5rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: isActive
                    ? t === "all"
                      ? "var(--foreground)"
                      : cfg?.color || "var(--foreground)"
                    : "var(--steel)",
                  cursor: "pointer",
                  transition: "all 150ms var(--ease-cut)",
                  whiteSpace: "nowrap",
                }}
              >
                {t === "all" ? "ALL" : cfg?.label || t.toUpperCase()}
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1px",
            background: "var(--border)",
            border: "1px solid var(--border)",
          }}
        >
          {filteredReleases.map((release, i) => (
            <div
              key={release.version}
              style={{
                display: "grid",
                gridTemplateColumns: "220px 1fr",
                background: "var(--background)",
              }}
            >
              {/* Left: version + date */}
              <div
                style={{
                  padding: "2.5rem 2rem",
                  borderRight: "1px solid var(--border)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  position: "relative",
                }}
              >
                {i === 0 && (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.55rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "var(--amber)",
                      background: "rgba(255, 85, 0, 0.1)",
                      padding: "0.2rem 0.5rem",
                      marginBottom: "0.5rem",
                      width: "fit-content",
                    }}
                  >
                    LATEST
                  </span>
                )}
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    color: "var(--foreground)",
                    lineHeight: 1,
                  }}
                >
                  {release.version}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    color: "var(--steel)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {release.date}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.72rem",
                    color: "var(--muted)",
                    marginTop: "0.25rem",
                  }}
                >
                  {release.tag}
                </span>
              </div>

              {/* Right: changes list */}
              <div
                style={{
                  padding: "2.5rem 2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0",
                }}
              >
                {release.changes.map((change, ci) => {
                  const cfg = TYPE_CONFIG[change.type] || {
                    label: change.type.toUpperCase(),
                    color: "var(--muted)",
                  };
                  return (
                    <div
                      key={ci}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "80px 1fr",
                        gap: "1rem",
                        alignItems: "baseline",
                        padding: "0.85rem 0",
                        borderBottom:
                          ci < release.changes.length - 1 ? "1px solid var(--border)" : "none",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.55rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: cfg.color,
                          paddingTop: "2px",
                        }}
                      >
                        {cfg.label}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.82rem",
                          color: "var(--muted)",
                          lineHeight: 1.6,
                        }}
                      >
                        {change.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Semver note */}
        <section
          className="engine-section"
          style={{
            borderTop: "1px solid var(--border)",
            marginTop: "1px",
            background: "var(--surface)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              gap: "3rem",
              alignItems: "start",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  color: "var(--amber)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                SEMVER
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.82rem",
                color: "var(--muted)",
                lineHeight: 1.7,
                margin: 0,
                maxWidth: "600px",
              }}
            >
              VantaDB follows semantic versioning. Patch upgrades (0.4.x → 0.4.y) require no code
              changes. Minor bumps (0.4 → 0.5) may include breaking changes — check those tags
              before deploying to production.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
