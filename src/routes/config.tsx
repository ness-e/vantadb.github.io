import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/config")({
  head: () => ({
    meta: [
      { title: "VantaDB — Configuration & Schema: Zero Config" },
      { name: "description", content: "No migration files, no schema definitions, no YAML bloat. VantaDB works out of the box with zero configuration." },
    ],
  }),
  component: ConfigPage,
});

function ConfigPage() {
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
        <span className="section-eyebrow reveal">// Configuration & Schema</span>
        <h1 className="title-accent reveal reveal-delay-1">
          No config
          <br />files needed.
        </h1>
        <p className="section-sub reveal reveal-delay-2 desc-text">
          Legacy vector databases require schema planning, migration scripts, and YAML configuration.
          VantaDB is zero-configuration by design.
        </p>
      </header>

      <main className="main-content">
        <section className="comparison-split">
          <div className="reveal">
            <span className="section-eyebrow">// Legacy Setup</span>
            <h2 className="section-title section-title--compact">Complex migrations</h2>
            <ul className="comparison-list">
              <li><span className="icon-cross">✗</span> Pinecone: pod spec, index config, metadata schema</li>
              <li><span className="icon-cross">✗</span> Redis: data model design, key patterns</li>
              <li><span className="icon-cross">✗</span> S3: bucket policies, lifecycle rules</li>
              <li><span className="icon-cross">✗</span> Migration scripts for schema changes</li>
              <li><span className="icon-cross">✗</span> Environment-specific config files</li>
            </ul>
          </div>
          <div className="reveal reveal-delay-1">
            <span className="section-eyebrow">// VantaDB Setup</span>
            <h2 className="section-title section-title--compact">Zero config</h2>
            <ul className="comparison-list">
              <li><span className="icon-check">✓</span> pip install vantadb & import it</li>
              <li><span className="icon-check">✓</span> No .env, no YAML, no JSON config</li>
              <li><span className="icon-check">✓</span> Schema-free — insert any JSON metadata</li>
              <li><span className="icon-check">✓</span> Auto-indexing: HNSW built on write</li>
              <li><span className="icon-check">✓</span> Works identically in dev and production</li>
            </ul>
          </div>
        </section>

        <section className="section-narrow">
          <div className="reveal text-center reveal-centered">
            <span className="section-eyebrow">// Developer Experience</span>
            <h2 className="section-title section-title--compact">From Zero to Search in One Line</h2>
            <p className="section-sub">
              No dashboards to click through, no API keys to provision, no clusters to spin up.
              Import the library, insert your vectors, and search. That's it.
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
