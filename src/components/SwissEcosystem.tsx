import { Link } from "@tanstack/react-router";

const INTEGRATIONS = [
  "LangChain",
  "LlamaIndex",
  "FastAPI",
  "Jupyter",
  "Transformers",
  "Sentence-Transformers",
  "PyO3",
  "SQLite",
  "Rust",
];

export function SwissEcosystem() {
  return (
    <section className="swiss-ecosystem-section">
      <div className="swiss-inner">
        <span className="swiss-eyebrow">06 / 08 — Ecosystem</span>
        <h2 className="swiss-ecosystem-title">Works with your stack.</h2>

        <div className="swiss-ecosystem-grid">
          {INTEGRATIONS.map((name) => (
            <div key={name} className="swiss-ecosystem-cell">
              {name}
            </div>
          ))}
        </div>

        <div className="swiss-ecosystem-action">
          <Link className="btn-primary" to="/integrations">
            SEE ALL INTEGRATIONS
          </Link>
        </div>
      </div>
    </section>
  );
}
