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
    <div className="page-wrapper">
      <header className="page-header-extended">
        <span className="section-eyebrow reveal">// Maintenance</span>
        <h1 className="title-accent reveal reveal-delay-1">
          Nothing
          <br />to monitor.
        </h1>
        <p className="section-sub reveal reveal-delay-2 desc-text">
          Three services means three dashboards, three alerting rules, and three sets of logs.
          VantaDB is a library — update it like any other dependency and move on.
        </p>
      </header>

      <main className="main-content">
        <section className="comparison-split">
          <div className="reveal">
            <span className="section-eyebrow">// Legacy Ops</span>
            <h2 className="section-title section-title--compact">3 services to monitor</h2>
            <ul className="comparison-list">
              <li><span className="icon-cross">✗</span> Pinecone: pod health, index fullness, rate limits</li>
              <li><span className="icon-cross">✗</span> Redis: memory usage, evictions, replication lag</li>
              <li><span className="icon-cross">✗</span> S3: bucket sizes, request rates, error rates</li>
              <li><span className="icon-cross">✗</span> Version upgrades across 3 providers</li>
              <li><span className="icon-cross">✗</span> Incident response for 3 independent systems</li>
            </ul>
          </div>
          <div className="reveal reveal-delay-1">
            <span className="section-eyebrow">// VantaDB Ops</span>
            <h2 className="section-title section-title--compact">0 daemon deps</h2>
            <ul className="comparison-list">
              <li><span className="icon-check">✓</span> No servers, no daemons, no sidecars</li>
              <li><span className="icon-check">✓</span> Update via pip upgrade — that's it</li>
              <li><span className="icon-check">✓</span> No dashboards to watch</li>
              <li><span className="icon-check">✓</span> Zero alerting rules to configure</li>
              <li><span className="icon-check">✓</span> Restarts with your app — no orchestration</li>
            </ul>
          </div>
        </section>

        <section className="section-narrow">
          <div className="reveal text-center reveal-centered">
            <span className="section-eyebrow">// Operational Simplicity</span>
            <h2 className="section-title section-title--compact">One Dependency, Zero Ops</h2>
            <p className="section-sub">
              VantaDB collapses three independent systems into a single pip package.
              No PagerDuty alerts for index rebuilds, no 3AM callbacks for Redis OOM — just
              search that works.
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
