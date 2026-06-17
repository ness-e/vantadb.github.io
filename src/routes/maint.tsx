import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/maint")({
  head: () => ({
    meta: [
      { title: "VantaDB — Maintenance: Nothing to Monitor" },
      { name: "description", content: "Zero daemon dependencies. No servers to restart, no databases to rebalance, no queues to drain. VantaDB is maintenance-free." },
    ],
  }),
  component: MaintPage,
});

function MaintPage() {
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
        <span className="section-eyebrow reveal">// Maintenance</span>
        <h1 className="title-accent reveal reveal-delay-1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, letterSpacing: "-0.04em", margin: "0.5rem 0 1.5rem" }}>
          Nothing
          <br />to monitor.
        </h1>
        <p className="section-sub reveal reveal-delay-2" style={{ maxWidth: "680px", margin: 0 }}>
          Three services means three dashboards, three alerting rules, and three sets of logs.
          VantaDB is a library — update it like any other dependency and move on.
        </p>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(1.5rem, 5vw, 4rem) 8rem" }}>
        <section style={{ padding: "4rem 0", borderBottom: "1px solid var(--subtle)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
          <div className="reveal">
            <span className="section-eyebrow">// Legacy Ops</span>
            <h2 className="section-title" style={{ margin: "0.5rem 0 1.5rem" }}>3 services to monitor</h2>
            <ul style={{ listStyle: "none", padding: 0, fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--muted)", lineHeight: "2.2" }}>
              <li><span style={{ color: "var(--crimson)" }}>✗</span> Pinecone: pod health, index fullness, rate limits</li>
              <li><span style={{ color: "var(--crimson)" }}>✗</span> Redis: memory usage, evictions, replication lag</li>
              <li><span style={{ color: "var(--crimson)" }}>✗</span> S3: bucket sizes, request rates, error rates</li>
              <li><span style={{ color: "var(--crimson)" }}>✗</span> Version upgrades across 3 providers</li>
              <li><span style={{ color: "var(--crimson)" }}>✗</span> Incident response for 3 independent systems</li>
            </ul>
          </div>
          <div className="reveal reveal-delay-1">
            <span className="section-eyebrow">// VantaDB Ops</span>
            <h2 className="section-title" style={{ margin: "0.5rem 0 1.5rem" }}>0 daemon deps</h2>
            <ul style={{ listStyle: "none", padding: 0, fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--muted)", lineHeight: "2.2" }}>
              <li><span style={{ color: "var(--amber)" }}>✓</span> No servers, no daemons, no sidecars</li>
              <li><span style={{ color: "var(--amber)" }}>✓</span> Update via pip upgrade — that's it</li>
              <li><span style={{ color: "var(--amber)" }}>✓</span> No dashboards to watch</li>
              <li><span style={{ color: "var(--amber)" }}>✓</span> Zero alerting rules to configure</li>
              <li><span style={{ color: "var(--amber)" }}>✓</span> Restarts with your app — no orchestration</li>
            </ul>
          </div>
        </section>

        <section style={{ padding: "4rem 0", borderBottom: "1px solid var(--subtle)" }}>
          <div className="reveal text-center" style={{ maxWidth: "720px", margin: "0 auto" }}>
            <span className="section-eyebrow">// Operational Simplicity</span>
            <h2 className="section-title" style={{ margin: "0.5rem 0 1.5rem" }}>One Dependency, Zero Ops</h2>
            <p className="section-sub">
              VantaDB collapses three independent systems into a single pip package.
              No PagerDuty alerts for index rebuilds, no 3AM callbacks for Redis OOM — just
              search that works.
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
