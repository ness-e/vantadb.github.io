import { Link } from "@tanstack/react-router";

interface UseCase {
  id: string;
  num: string;
  tag: string;
  headline: string;
  body: string;
  link: string;
}

const USE_CASES: UseCase[] = [
  {
    id: "agents",
    num: "01",
    tag: "AI Agents",
    headline: "Persistent agent memory.",
    body: "Give your agents a memory that persists across sessions. Store facts, embeddings, and structured context in one place.",
    link: "/solutions/ai-agents",
  },
  {
    id: "rag",
    num: "02",
    tag: "Local RAG",
    headline: "RAG without the cloud.",
    body: "Run retrieval-augmented generation fully offline. No API calls to external embedding services. Your data stays local.",
    link: "/solutions/local-rag",
  },
  {
    id: "ide",
    num: "03",
    tag: "IDE Tooling",
    headline: "Context for AI coding.",
    body: "Power AI IDE assistants with codebase-aware semantic search. Index and query your entire project in milliseconds.",
    link: "/solutions/ai-ide-tooling",
  },
];

export function SwissUseCases() {
  return (
    <section className="swiss-use-cases-section">
      <div className="swiss-inner">
        <div className="swiss-section-header swiss-section-header--bordered">
          <span className="swiss-eyebrow">05 / 08 — Use Cases</span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              marginTop: "1.25rem",
              marginBottom: 0,
            }}
          >
            Where VantaDB works.
          </h2>
        </div>

        <div className="swiss-use-cases-grid">
          {USE_CASES.map((uc) => (
            <div key={uc.id} className="swiss-use-case-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span className="swiss-use-case-tag">{uc.tag}</span>
                <span className="swiss-use-case-num">{uc.num}</span>
              </div>
              <h3 className="swiss-use-case-title">{uc.headline}</h3>
              <p className="swiss-use-case-body">{uc.body}</p>
              <Link to={uc.link as any} className="swiss-use-case-link">
                <span>Explore</span>
                <span>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
