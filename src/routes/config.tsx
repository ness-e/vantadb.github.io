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
    <div style={{ background: "var(--background)", minHeight: "100vh" }}>
      <header className="page-header-extended">
        <span className="section-eyebrow reveal">// Configuration & Schema</span>
        <h1 className="title-accent reveal reveal-delay-1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, letterSpacing: "-0.04em", margin: "0.5rem 0 1.5rem" }}>
          No config
          <br />files needed.
        </h1>
        <p className="section-sub reveal reveal-delay-2" style={{ maxWidth: "680px", margin: 0 }}>
          Legacy vector databases require schema planning, migration scripts, and YAML configuration.
          VantaDB is zero-configuration by design.
        </p>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(1.5rem, 5vw, 4rem) 8rem" }}>
        <section style={{ padding: "4rem 0", borderBottom: "1px solid var(--subtle)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
          <div className="reveal">
            <span className="section-eyebrow">// Legacy Setup</span>
            <h2 className="section-title" style={{ margin: "0.5rem 0 1.5rem" }}>Complex migrations</h2>
            <ul style={{ listStyle: "none", padding: 0, fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--muted)", lineHeight: "2.2" }}>
              <li><span style={{ color: "var(--crimson)" }}>✗</span> Pinecone: pod spec, index config, metadata schema</li>
              <li><span style={{ color: "var(--crimson)" }}>✗</span> Redis: data model design, key patterns</li>
              <li><span style={{ color: "var(--crimson)" }}>✗</span> S3: bucket policies, lifecycle rules</li>
              <li><span style={{ color: "var(--crimson)" }}>✗</span> Migration scripts for schema changes</li>
              <li><span style={{ color: "var(--crimson)" }}>✗</span> Environment-specific config files</li>
            </ul>
          </div>
          <div className="reveal reveal-delay-1">
            <span className="section-eyebrow">// VantaDB Setup</span>
            <h2 className="section-title" style={{ margin: "0.5rem 0 1.5rem" }}>Zero config</h2>
            <ul style={{ listStyle: "none", padding: 0, fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--muted)", lineHeight: "2.2" }}>
              <li><span style={{ color: "var(--amber)" }}>✓</span> pip install vantadb & import it</li>
              <li><span style={{ color: "var(--amber)" }}>✓</span> No .env, no YAML, no JSON config</li>
              <li><span style={{ color: "var(--amber)" }}>✓</span> Schema-free — insert any JSON metadata</li>
              <li><span style={{ color: "var(--amber)" }}>✓</span> Auto-indexing: HNSW built on write</li>
              <li><span style={{ color: "var(--amber)" }}>✓</span> Works identically in dev and production</li>
            </ul>
          </div>
        </section>

        <section style={{ padding: "4rem 0", borderBottom: "1px solid var(--subtle)" }}>
          <div className="reveal text-center" style={{ maxWidth: "720px", margin: "0 auto" }}>
            <span className="section-eyebrow">// Developer Experience</span>
            <h2 className="section-title" style={{ margin: "0.5rem 0 1.5rem" }}>From Zero to Search in One Line</h2>
            <p className="section-sub">
              No dashboards to click through, no API keys to provision, no clusters to spin up.
              Import the library, insert your vectors, and search. That's it.
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
