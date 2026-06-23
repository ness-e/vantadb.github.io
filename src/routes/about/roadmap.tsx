import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSubpage } from "../../components/HeroSubpage";
import { PageShell } from "../../components/PageShell";

export const Route = createFileRoute("/about/roadmap")({
  head: () => ({
    meta: [
      { title: "VantaDB — Engineering Roadmap" },
      {
        name: "description",
        content:
          "Transparent engineering roadmap for VantaDB. Track milestones, KPI targets, and architectural decisions for the embedded vector database.",
      },
    ],
  }),
  component: RoadmapPage,
});

const phases = [
  {
    name: "Fase 0 — Stabilization",
    status: "100%",
    label: "Completed",
    items: [
      "Migration connectome-server → vanta-server",
      "ADR documentation and CI/CD pipeline",
      "Dead code removal and profile unification",
    ],
  },
  {
    name: "Fase 1 — HNSW Scalability",
    status: "100%",
    label: "Completed",
    metrics: [
      { label: "Recall@10 (100K)", target: "≥0.95", achieved: "0.998" },
      { label: "Latency p50 (100K)", target: "<20ms", achieved: "12.4ms" },
      { label: "Memory efficiency", target: "<1500 B/vec", achieved: "1172 B/vec" },
    ],
  },
  {
    name: "Fase 2 — Architectural Hardening",
    status: "100%",
    label: "Completed",
    items: [
      "WAL durability: fsync before ACK, CRC32C checksums",
      "Concurrency: exclusive locks on rebuild, GIL released via py.allow_threads",
      "File locking via fs2 — cross-platform safety",
      "Chaos testing: 30 iterations crash injection",
    ],
  },
  {
    name: "Fase 3 — Pre-launch",
    status: "100%",
    label: "Completed",
    items: [
      "SQ8 quantization: 4x RAM reduction",
      "rkyv zero-copy archives for fast deserialization",
      "TTL-based record expiration with purge_expired()",
      "WAL compaction / vacuum at 256MB trigger",
      "Grafana dashboard, Prometheus metrics, JSON logging",
      "Documentation: GraphRAG, durability, migration guides",
      "Core crate published on crates.io (v0.1.4)",
    ],
    exitCriteria: [
      "Python SDK p50 < 20ms",
      "Windows CI green",
      "Chaos tests 30/30 pass",
      "1M vectors no OOM on 16GB RAM",
      "Documentation 90%+ coverage",
    ],
  },
  {
    name: "Fase 4 — Community Launch",
    status: "35%",
    label: "In progress",
    items: [
      "TypeScript SDK (WASM, npm, examples)",
      "Framework integrations: LangChain, LlamaIndex, Mem0, CrewAI, DSPy",
      "API completeness: filters, delete_by_filter, similar_to_key",
      "CLI polish: backup, restore, doctor, stats, inspect, repl, TUI",
      "Launch campaign: landing page, blog, Show HN, Discord, CONTRIBUTING",
      "Distribution: ARM64, Homebrew, Python 3.13",
      "Developer experience: demo app, benchmark site, Rust examples",
    ],
    exitCriteria: [
      "1,000+ GitHub stars",
      "10,000+ PyPI downloads / month",
      "500+ Discord members",
      "20+ contributors",
      "TypeScript SDK on npm",
      "LangChain + LlamaIndex integrations on PyPI",
    ],
  },
  {
    name: "Fase 5 — Enterprise / Pre-seed",
    status: "0%",
    label: "Planned Q4 2026",
    items: [
      "Enterprise readiness: encryption, audit logs, WAL shipping",
      "VantaDB Cloud beta + business model",
      "Pitch deck, enterprise pilots, case studies",
    ],
    exitCriteria: ["10+ enterprise pilots", "$10K+ MRR", "3+ published case studies"],
  },
];

function RoadmapPage() {
  return (
    <PageShell>
      <HeroSubpage
        eyebrow="// Roadmap"
        title={
          <>
            What we're building.
            <br />
            What's next.
          </>
        }
        subtitle="Transparent engineering milestones for VantaDB. No marketing dates — just quantitative exit criteria and honest status updates."
        stats={[
          { value: "4", label: "Phases completed" },
          { value: "1", label: "In progress" },
          { value: "Open", label: "By default" },
        ]}
      />

      <main className="main-content">
        <section style={{ padding: "4rem 0" }}>
          {phases.map((phase, i) => (
            <div
              key={phase.name}
              className="reveal"
              style={{
                padding: "2rem 0",
                borderBottom: i < phases.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "var(--white)",
                    letterSpacing: "-0.03em",
                    margin: 0,
                  }}
                >
                  {phase.name}
                </h3>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color:
                      phase.label === "Completed" || phase.label === "In progress"
                        ? "var(--amber)"
                        : "var(--steel)",
                    background:
                      phase.label === "Completed" || phase.label === "In progress"
                        ? "var(--amber-dim)"
                        : "var(--surface)",
                    padding: "0.15rem 0.6rem",
                    borderRadius: "var(--radius-pill)",
                  }}
                >
                  {phase.label}
                </span>
              </div>

              {"metrics" in phase && phase.metrics && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  {phase.metrics.map((m) => (
                    <div
                      key={m.label}
                      style={{
                        background: "var(--surface)",
                        padding: "1rem",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid rgba(255,106,0,0.06)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.62rem",
                          color: "var(--steel)",
                          marginBottom: "0.3rem",
                        }}
                      >
                        {m.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          color: "var(--amber)",
                        }}
                      >
                        {m.achieved}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.62rem",
                          color: "var(--steel-light)",
                        }}
                      >
                        target: {m.target}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {"items" in phase && phase.items && (
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem" }}>
                  {phase.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--muted)",
                        padding: "0.25rem 0",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                      }}
                    >
                      <span
                        style={{
                          color:
                            phase.label === "Completed"
                              ? "var(--success)"
                              : phase.label === "In progress"
                                ? "var(--amber)"
                                : "var(--steel)",
                        }}
                      >
                        ◆
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {"exitCriteria" in phase && phase.exitCriteria && (
                <details style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem" }}>
                  <summary
                    style={{ color: "var(--steel)", cursor: "pointer", padding: "0.4rem 0" }}
                  >
                    Exit criteria
                  </summary>
                  <ul style={{ listStyle: "none", padding: "0.5rem 0 0 1rem", margin: 0 }}>
                    {phase.exitCriteria.map((c) => (
                      <li key={c} style={{ color: "var(--steel-light)", padding: "0.15rem 0" }}>
                        → {c}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          ))}
        </section>

        <section className="section-narrow" style={{ borderBottom: "none" }}>
          <div className="reveal text-center reveal-centered">
            <span className="section-eyebrow">// Philosophy</span>
            <h2 className="section-title section-title--compact">How we build</h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>
              Engineering milestones, not marketing dates. Stability before features. Radical
              transparency — roadmap is public, status updates are weekly, and known issues are
              documented. No surprises.
            </p>
          </div>
        </section>

        <nav className="bottom-nav">
          <Link to="/about" className="back-link nav-cta">
            ← About
          </Link>
        </nav>
      </main>
    </PageShell>
  );
}
