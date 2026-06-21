import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/cost")({
  head: () => ({
    meta: [
      { title: "VantaDB — Infrastructure Cost: Zero Runtime" },
      { name: "description", content: "Eliminate $200+/mo infrastructure costs. VantaDB runs in-process with zero cloud dependencies and no per-query pricing." },
    ],
  }),
  component: CostPage,
});

function CostPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("is-visible"); }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="page-wrapper">
      <header className="page-header-extended">
        <span className="section-eyebrow reveal">// Infrastructure Cost</span>
        <h1 className="title-accent reveal reveal-delay-1">
          Zero cost
          <br />at runtime.
        </h1>
        <p className="section-sub reveal reveal-delay-2 desc-text">
          No per-vector pricing, no server bills, no hidden egress fees. VantaDB is free software — the only cost is the hardware you already own.
        </p>
      </header>

      <main className="main-content">
        <section className="comparison-split">
          <div className="reveal">
            <span className="section-eyebrow">// Legacy Costs</span>
            <h2 className="section-title section-title--compact">~$200/mo + hidden fees</h2>
            <ul className="comparison-list">
              <li><span className="icon-cross">✗</span> Pinecone: $70/mo (pod-based, 1M vectors)</li>
              <li><span className="icon-cross">✗</span> Redis: $30/mo (ElastiCache serverless)</li>
              <li><span className="icon-cross">✗</span> S3: $15/mo + API request costs</li>
              <li><span className="icon-cross">✗</span> Network egress: unpredictable overage fees</li>
              <li><span className="icon-cross">✗</span> Ops overhead: monitoring, scaling, patching</li>
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

        <nav className="bottom-nav">
          <Link to="/" className="back-link nav-cta">
            ← Back to comparison
          </Link>
        </nav>
      </main>
    </div>
  );
}
