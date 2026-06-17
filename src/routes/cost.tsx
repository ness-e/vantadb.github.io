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
    <div style={{ background: "var(--background)", minHeight: "100vh" }}>
      <header className="page-header-extended">
        <span className="section-eyebrow reveal">// Infrastructure Cost</span>
        <h1 className="title-accent reveal reveal-delay-1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, letterSpacing: "-0.04em", margin: "0.5rem 0 1.5rem" }}>
          Zero cost
          <br />at runtime.
        </h1>
        <p className="section-sub reveal reveal-delay-2" style={{ maxWidth: "680px", margin: 0 }}>
          No per-vector pricing, no server bills, no hidden egress fees. VantaDB is free software — the only cost is the hardware you already own.
        </p>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(1.5rem, 5vw, 4rem) 8rem" }}>
        <section style={{ padding: "4rem 0", borderBottom: "1px solid var(--subtle)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
          <div className="reveal">
            <span className="section-eyebrow">// Legacy Costs</span>
            <h2 className="section-title" style={{ margin: "0.5rem 0 1.5rem" }}>~$200/mo + hidden fees</h2>
            <ul style={{ listStyle: "none", padding: 0, fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--muted)", lineHeight: "2.2" }}>
              <li><span style={{ color: "var(--crimson)" }}>✗</span> Pinecone: $70/mo (pod-based, 1M vectors)</li>
              <li><span style={{ color: "var(--crimson)" }}>✗</span> Redis: $30/mo (ElastiCache serverless)</li>
              <li><span style={{ color: "var(--crimson)" }}>✗</span> S3: $15/mo + API request costs</li>
              <li><span style={{ color: "var(--crimson)" }}>✗</span> Network egress: unpredictable overage fees</li>
              <li><span style={{ color: "var(--crimson)" }}>✗</span> Ops overhead: monitoring, scaling, patching</li>
            </ul>
          </div>
          <div className="reveal reveal-delay-1">
            <span className="section-eyebrow">// VantaDB Costs</span>
            <h2 className="section-title" style={{ margin: "0.5rem 0 1.5rem" }}>$0 runtime</h2>
            <ul style={{ listStyle: "none", padding: 0, fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--muted)", lineHeight: "2.2" }}>
              <li><span style={{ color: "var(--amber)" }}>✓</span> Free and open-source (MIT license)</li>
              <li><span style={{ color: "var(--amber)" }}>✓</span> No cloud dependency — runs on your hardware</li>
              <li><span style={{ color: "var(--amber)" }}>✓</span> No per-query or per-vector pricing</li>
              <li><span style={{ color: "var(--amber)" }}>✓</span> Zero ops cost — no servers to maintain</li>
            </ul>
          </div>
        </section>

        <section style={{ padding: "4rem 0", borderBottom: "1px solid var(--subtle)" }}>
          <div className="reveal text-center" style={{ maxWidth: "720px", margin: "0 auto" }}>
            <span className="section-eyebrow">// Total Cost of Ownership</span>
            <h2 className="section-title" style={{ margin: "0.5rem 0 1.5rem" }}>From $200/mo to $0</h2>
            <p className="section-sub">
              By eliminating three managed services, VantaDB removes the single largest variable cost
              from your vector search infrastructure. Your only expense is the compute you already run.
            </p>
          </div>
        </section>

        <nav style={{ marginTop: "3rem", textAlign: "center" }}>
          <Link to="/" className="nav-cta" style={{ display: "inline-block", padding: "0.85rem 2rem", textDecoration: "none" }}>
            ← Back to comparison
          </Link>
        </nav>
      </main>
    </div>
  );
}
