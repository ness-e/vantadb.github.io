import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSubpage } from "../components/HeroSubpage";
import { PageShell } from "../components/PageShell";
import { CtaSection } from "../components/CtaSection";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const Route = createFileRoute("/config")({
  head: () => ({
    meta: [
      { title: "VantaDB — Zero Configuration: Schema-Free" },
      { name: "description", content: "No YAML files, no .env secrets, no migration scripts. VantaDB requires zero configuration — just pip install and connect." },
    ],
  }),
  component: ConfigPage,
});

function ConfigPage() {
  useScrollReveal();

  return (
    <PageShell>
      <HeroSubpage
        eyebrow="// Configuration"
        title={<>Zero config.<br />Just connect.</>}
        subtitle="No YAML, no .env, no migration scripts. VantaDB is schema-free and self-configuring. Point it at a file path and start querying."
        stats={[
          { value: "0", label: "Config files" },
          { value: "0", label: "Env vars required" },
          { value: "1", label: "Line to connect" },
        ]}
      />

      <main className="main-content">
        <section className="comparison-split">
          <div className="reveal">
            <span className="section-eyebrow">// Legacy Setup</span>
            <h2 className="section-title section-title--compact">Pages of configuration</h2>
            <ul className="comparison-list">
              <li><span className="icon-cross">✗</span> Pinecone: API key, environment, pod type, index config</li>
              <li><span className="icon-cross">✗</span> Redis: host, port, password, TLS, cluster mode</li>
              <li><span className="icon-cross">✗</span> S3: region, bucket, credentials, IAM roles, CORS</li>
              <li><span className="icon-cross">✗</span> Schema migrations: define, version, migrate, rollback</li>
              <li><span className="icon-cross">✗</span> Connection pooling: tune pool size, timeouts, retries</li>
            </ul>
          </div>
          <div className="reveal reveal-delay-1">
            <span className="section-eyebrow">// VantaDB Setup</span>
            <h2 className="section-title section-title--compact">Zero lines of config</h2>
            <ul className="comparison-list">
              <li><span className="icon-check">✓</span> No API keys to configure or rotate</li>
              <li><span className="icon-check">✓</span> No host/port/password — connect to a file path</li>
              <li><span className="icon-check">✓</span> No cloud credentials or IAM policies</li>
              <li><span className="icon-check">✓</span> Schema-free: insert data, DB infers types</li>
              <li><span className="icon-check">✓</span> Auto-indexing: vectors indexed automatically</li>
            </ul>
          </div>
        </section>

        <section className="section-narrow">
          <div className="reveal text-center reveal-centered mb-12">
            <span className="section-eyebrow">// Code Comparison</span>
            <h2 className="section-title section-title--compact">From 50 lines to 1</h2>
          </div>

          <div className="ops-grid">
            <div className="terminal-window reveal">
              <div className="terminal-header">
                <span className="term-dot term-dot-red" />
                <span className="term-dot term-dot-yellow" />
                <span className="term-dot term-dot-green" />
                <span className="terminal-title">legacy_setup.py</span>
              </div>
              <div className="terminal-body">
                <span className="term-comment"># Set up 3 services + auth + schema</span><br />
                <span className="term-keyword">import</span> pinecone<br />
                <span className="term-keyword">import</span> redis<br />
                <span className="term-keyword">import</span> boto3<br /><br />
                pinecone.init(api_key=..., <span className="term-muted">environment=...</span>)<br />
                r = redis.Redis(host=..., <span className="term-muted">port=..., password=...</span>)<br />
                s3 = boto3.client(<span className="term-string">"s3"</span>, <span className="term-muted">region=...</span>)<br /><br />
                <span className="term-comment"># Define schema, create index, set up cache…</span><br />
                <span className="term-muted">(50+ lines of config)</span>
              </div>
            </div>

            <div className="terminal-window reveal reveal-delay-1">
              <div className="terminal-header">
                <span className="term-dot term-dot-red" />
                <span className="term-dot term-dot-yellow" />
                <span className="term-dot term-dot-green" />
                <span className="terminal-title">vantadb_setup.py</span>
              </div>
              <div className="terminal-body">
                <span className="term-keyword">import</span> vantadb_py<br /><br />
                db = vantadb_py.connect(<span className="term-string">"./my_db.vdb"</span>)<br /><br />
                <span className="term-comment">// Ready. No config, no schema, no cloud.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-narrow">
          <div className="reveal text-center reveal-centered">
            <span className="section-eyebrow">// Developer Experience</span>
            <h2 className="section-title section-title--compact">Configuration that disappears</h2>
            <p className="section-sub">
              Every minute spent configuring infrastructure is a minute not spent building your product.
              VantaDB's zero-config philosophy means your database setup time goes from hours to seconds.
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
