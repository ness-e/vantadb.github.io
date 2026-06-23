import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSubpage } from "../../components/HeroSubpage";
import { PageShell } from "../../components/PageShell";

export const Route = createFileRoute("/about/company")({
  head: () => ({
    meta: [
      { title: "About VantaDB — Company" },
      { name: "description", content: "VantaDB is an open-source, embedded vector database built for AI agents, local RAG, and intelligent applications." },
    ],
  }),
  component: CompanyPage,
});

function CompanyPage() {
  return (
    <PageShell>
      <HeroSubpage
        eyebrow="// About"
        title={<>Built for the<br />AI-native era.</>}
        subtitle="VantaDB is an open-source, embedded vector database that unifies SQL, vector search, and full-text search in a single Rust binary. Zero servers. Zero ops. One pip install."
        stats={[
          { value: "MIT", label: "Open core" },
          { value: "Rust", label: "Core engine" },
          { value: "1.2ms", label: "p50 latency" },
        ]}
      />

      <main className="main-content">
        <section className="section-narrow">
          <div className="reveal">
            <span className="section-eyebrow">// Our Purpose</span>
            <h2 className="section-title section-title--compact">Make vector-native data infrastructure invisible.</h2>
            <p className="section-sub" style={{ maxWidth: 600 }}>
              Every AI agent, every RAG pipeline, every intelligent application deserves a database that embeds as easily
              as SQLite but understands vectors, text, and SQL — without requiring a dedicated infrastructure team.
            </p>
          </div>
        </section>

        <section className="section-narrow">
          <div className="reveal">
            <span className="section-eyebrow">// Our Values</span>
            <h2 className="section-title section-title--compact">What drives us</h2>
          </div>
          <div className="grid-2" style={{ marginTop: "1rem" }}>
            {[
              { title: "Radical Simplicity", desc: "One binary, one pip install, zero servers. Complexity is the enemy — we eat it so developers don't have to." },
              { title: "Performance Without Compromise", desc: "Sub-millisecond queries at 0.998 Recall@10. Every microsecond matters when your agent is waiting." },
              { title: "Developer Empathy First", desc: "We ship SDKs, docs, and APIs that feel like they were built by developers for developers — because they were." },
              { title: "Open by Default", desc: "Open core, open benchmarks, open roadmap. Our community trusts us because we show receipts." },
            ].map((v) => (
              <div key={v.title} className="arch-card reveal">
                <div className="arch-title">{v.title}</div>
                <div className="arch-desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-narrow" style={{ borderBottom: "none" }}>
          <div className="reveal">
            <span className="section-eyebrow">// Why VantaDB</span>
            <h2 className="section-title section-title--compact">The AI stack shouldn't need a database team.</h2>
            <div className="comparison-split" style={{ marginTop: "2rem" }}>
              <div>
                <ul className="comparison-list">
                  <li><span className="icon-cross">✗</span> Pinecone: $70/mo + per-vector pricing</li>
                  <li><span className="icon-cross">✗</span> Weaviate/Qdrant: server process + ops team</li>
                  <li><span className="icon-cross">✗</span> SQLite + extensions: limited vector support</li>
                  <li><span className="icon-cross">✗</span> LanceDB: data model is a second thought</li>
                </ul>
              </div>
              <div>
                <ul className="comparison-list">
                  <li><span className="icon-check">✓</span> VantaDB: one binary, zero ops, MIT license</li>
                  <li><span className="icon-check">✓</span> SQL + vector + full-text in a single query</li>
                  <li><span className="icon-check">✓</span> Embedded in your process — no network hop</li>
                  <li><span className="icon-check">✓</span> Sub-millisecond hybrid search</li>
                </ul>
              </div>
            </div>
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
