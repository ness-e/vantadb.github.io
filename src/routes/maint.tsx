import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSubpage } from "../components/HeroSubpage";
import { PageShell } from "../components/PageShell";
import { CtaSection } from "../components/CtaSection";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const Route = createFileRoute("/maint")({
  head: () => ({
    meta: [
      { title: "VantaDB — Zero Maintenance Operations" },
      { name: "description", content: "No daemons to monitor, no clusters to scale, no patches to schedule. VantaDB runs as an embedded library — your app IS the database server." },
    ],
  }),
  component: MaintPage,
});

function MaintPage() {
  useScrollReveal();

  return (
    <PageShell>
      <HeroSubpage
        eyebrow="// Operations & Maintenance"
        title={<>Zero ops.<br />Just upgrade.</>}
        subtitle="No daemons to monitor, no clusters to scale, no patches to schedule. VantaDB runs embedded in your process — the database is just another import."
        stats={[
          { value: "0", label: "Daemons to monitor" },
          { value: "0", label: "Dashboards needed" },
          { value: "1", label: "Command to upgrade" },
        ]}
      />

      <main className="main-content">
        <section className="comparison-split">
          <div className="reveal">
            <span className="section-eyebrow">// Legacy Ops</span>
            <h2 className="section-title section-title--compact">Three services to maintain</h2>
            <ul className="comparison-list">
              <li><span className="icon-cross">✗</span> Pinecone: monitor pod health, scale pods, watch quotas</li>
              <li><span className="icon-cross">✗</span> Redis: replication lag, OOM handling, failover testing</li>
              <li><span className="icon-cross">✗</span> S3: lifecycle policies, bucket versioning, access audits</li>
              <li><span className="icon-cross">✗</span> Network: DNS changes, TLS certs, firewall rules</li>
              <li><span className="icon-cross">✗</span> Alerting: 3+ dashboards, pager duty rotations</li>
            </ul>
          </div>
          <div className="reveal reveal-delay-1">
            <span className="section-eyebrow">// VantaDB Ops</span>
            <h2 className="section-title section-title--compact">Nothing to maintain</h2>
            <ul className="comparison-list">
              <li><span className="icon-check">✓</span> No daemon to monitor — runs in your process</li>
              <li><span className="icon-check">✓</span> No cluster scaling — uses your app's resources</li>
              <li><span className="icon-check">✓</span> No network config — local file access only</li>
              <li><span className="icon-check">✓</span> No dashboards — your app's observability is enough</li>
              <li><span className="icon-check">✓</span> Upgrades: `pip install --upgrade vantadb-py`</li>
            </ul>
          </div>
        </section>

        <section className="section-narrow">
          <div className="reveal text-center reveal-centered mb-12">
            <span className="section-eyebrow">// Weekly Ops Timeline</span>
            <h2 className="section-title section-title--compact">From 4 hours to 4 seconds</h2>
          </div>

          <div className="ops-grid">
            <div className="ops-card reveal">
              <span className="section-eyebrow mb-6">Legacy Weekly Ops</span>
              {[
                "Review 3 monitoring dashboards (30m)",
                "Check Pinecone pod utilization (15m)",
                "Rotate Redis credentials (20m)",
                "Review S3 access logs (15m)",
                "Patch/update 3 services (2h)",
                "Respond to 2-3 alerts (45m)",
              ].map((task) => (
                <div key={task} className="ops-task">
                  <span className="icon-cross">✗</span>
                  <span>{task}</span>
                </div>
              ))}
              <div className="ops-total-time text-danger">
                ~4 hours/week
              </div>
            </div>

            <div className="ops-card-vanta reveal reveal-delay-1">
              <span className="section-eyebrow mb-6">VantaDB Weekly Ops</span>
              {[
                "Check for new version on PyPI (5s)",
                "Run pip install --upgrade (10s)",
                "Verify app still works (15s)",
                "Done.",
              ].map((task) => (
                <div key={task} className="ops-task">
                  <span className="icon-check">✓</span>
                  <span>{task}</span>
                </div>
              ))}
              <div className="ops-total-time text-amber">
                ~30 seconds/week
              </div>
            </div>
          </div>
        </section>

        <section className="section-narrow">
          <div className="reveal text-center reveal-centered">
            <span className="section-eyebrow">// Embedded Architecture</span>
            <h2 className="section-title section-title--compact">Your app IS the server</h2>
            <p className="section-sub">
              Because VantaDB runs as an embedded library (not a separate server process), there's nothing
              to deploy, monitor, or scale independently. Your application's lifecycle IS the database lifecycle.
              No pager duty. No 2 AM wakeups.
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
