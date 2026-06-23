import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSubpage } from "../components/HeroSubpage";
import { PageShell } from "../components/PageShell";
import { CtaSection } from "../components/CtaSection";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const Route = createFileRoute("/cost")({
  head: () => ({
    meta: [
      { title: "VantaDB — Infrastructure Cost: Zero Runtime" },
      { name: "description", content: "Eliminate $200+/mo infrastructure costs. VantaDB runs in-process with zero cloud dependencies and no per-query pricing." },
    ],
  }),
  component: CostPage,
});

const breakdowns = [
  { label: "Vector DB", bills: [70, 90, 80, 0], color: "var(--amber)" },
  { label: "Cache",    bills: [30, 0, 0, 0], color: "var(--amber-soft)" },
  { label: "Storage",  bills: [15, 20, 18, 0], color: "var(--steel-light)" },
  { label: "Egress",   bills: [25, 15, 20, 0], color: "var(--crimson)" },
  { label: "Ops",      bills: [60, 50, 45, 0], color: "var(--warn)" },
];

const planNames = ["Pinecone + Redis + S3", "Weaviate Cloud", "Qdrant Cloud", "VantaDB"];
const planTotals = [200, 175, 163, 0];

function CostPage() {
  useScrollReveal();

  return (
    <PageShell>
      <HeroSubpage
        eyebrow="// Infrastructure Cost"
        title={<>Zero cost<br />at runtime.</>}
        subtitle="No per-vector pricing, no server bills, no hidden egress fees. VantaDB is free software — the only cost is the hardware you already own."
        stats={[
          { value: "$200", label: "Avg legacy cost/mo" },
          { value: "$0", label: "VantaDB runtime" },
          { value: "MIT", label: "License" },
        ]}
      />

      <main className="main-content">
        <section className="comparison-split">
          <div className="reveal">
            <span className="section-eyebrow">// Legacy Costs</span>
            <h2 className="section-title section-title--compact">~$200/mo + hidden fees</h2>
            <ul className="comparison-list">
              <li style={{ transitionDelay: "0.05s" }}><span className="icon-cross">✗</span> Pinecone: $70/mo (pod-based, 1M vectors)</li>
              <li style={{ transitionDelay: "0.1s" }}><span className="icon-cross">✗</span> Redis: $30/mo (ElastiCache serverless)</li>
              <li style={{ transitionDelay: "0.15s" }}><span className="icon-cross">✗</span> S3: $15/mo + API request costs</li>
              <li style={{ transitionDelay: "0.2s" }}><span className="icon-cross">✗</span> Network egress: unpredictable overage fees</li>
              <li style={{ transitionDelay: "0.25s" }}><span className="icon-cross">✗</span> Ops overhead: monitoring, scaling, patching</li>
            </ul>
          </div>
          <div className="reveal reveal-delay-1">
            <span className="section-eyebrow">// VantaDB Costs</span>
            <h2 className="section-title section-title--compact">$0 runtime</h2>
            <ul className="comparison-list">
              <li><span className="icon-check">✓</span> Free and open-source (MIT license)</li>
              <li><span className="icon-check">✓</span> No cloud dependency — runs on your hardware</li>
              <li><span className="icon-check">✓</span> No per-query or per-vector pricing</li>
              <li><span className="icon-check">✓</span> Zero ops cost — no servers to maintain</li>
            </ul>
          </div>
        </section>

        <section className="chart-section">
          <div className="reveal text-center mb-12">
            <span className="section-eyebrow">// Cost Breakdown</span>
            <h2 className="section-title section-title--compact">Monthly cost by provider</h2>
          </div>

          <div className="chart-table">
            <div className="chart-table-row chart-table-header">
              <span className="chart-table-col-label"></span>
              {planNames.map((n) => <span key={n} className="chart-table-col-value">{n}</span>)}
            </div>
            {breakdowns.map((b) => (
              <div key={b.label} className="chart-table-row reveal">
                <span className="chart-table-col-label">{b.label}</span>
                {b.bills.map((bill, i) => (
                  <span key={i} className="chart-table-col-value">
                    <span className="chart-table-col-vis" style={{ "--bar-color": b.color, "--bar-w": `${(bill / 200) * 100}%` } as React.CSSProperties}>
                      <span className="chart-table-col-bar" />
                    </span>
                    <span className="chart-table-col-num">${bill}</span>
                  </span>
                ))}
              </div>
            ))}
            <div className="chart-table-row chart-table-footer reveal reveal-delay-1">
              <span className="chart-table-col-label">Total</span>
              {planTotals.map((t, i) => (
                <span key={i} className="chart-table-col-value" style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: t === 0 ? "var(--amber)" : "var(--white)" }}>
                  ${t}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section-narrow">
          <div className="reveal text-center reveal-centered">
            <span className="section-eyebrow">// Total Cost of Ownership</span>
            <h2 className="section-title section-title--compact">From $200/mo to $0</h2>
            <p className="section-sub">
              By eliminating three managed services, VantaDB removes the single largest variable cost
              from your vector search infrastructure. Your only expense is the compute you already run.
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
