import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSubpage } from "../../components/HeroSubpage";
import { ScrollStory } from "../../components/ScrollStory";
import { PageShell } from "../../components/PageShell";

export const Route = createFileRoute("/solutions/ai-ide-tooling")({
  head: () => ({
    meta: [
      { title: "VantaDB — AI-Powered IDE Tooling" },
      {
        name: "description",
        content:
          "Augment your coding workflow with semantic code search, AST-aware retrieval, and context-aware completions powered by an embedded vector database.",
      },
    ],
  }),
  component: IdeToolingPage,
});

function IdeToolingPage() {
  return (
    <PageShell>
      <HeroSubpage
        eyebrow="// Solution: AI IDE Tooling"
        title={
          <>
            Your codebase
            <br />
            searchable by meaning.
          </>
        }
        subtitle="Augment your IDE with semantic code search, AST-aware retrieval, and context-aware completions. VantaDB powers the next generation of AI coding tools."
        stats={[
          { value: "1.2ms", label: "Code retrieval" },
          { value: "Hybrid", label: "Code + text search" },
          { value: "AST", label: "Structure-aware" },
        ]}
      />

      <main className="main-content">
        <section className="comparison-split">
          <div className="reveal">
            <span className="section-eyebrow">// The Problem</span>
            <h2 className="section-title section-title--compact">Code search is still text-only</h2>
            <ul className="comparison-list">
              <li>
                <span className="icon-cross">✗</span> grep/ripgrep: lexical only, no semantic
                understanding
              </li>
              <li>
                <span className="icon-cross">✗</span> IDE symbol search: requires indexed projects,
                misses patterns
              </li>
              <li>
                <span className="icon-cross">✗</span> GitHub Code Search: cloud-dependent, can't
                search local repos
              </li>
              <li>
                <span className="icon-cross">✗</span> Cloud vector DBs: add latency, require
                network, leak code context
              </li>
            </ul>
          </div>
          <div className="reveal reveal-delay-1">
            <span className="section-eyebrow">// The VantaDB Solution</span>
            <h2 className="section-title section-title--compact">Semantic code search, embedded</h2>
            <ul className="comparison-list">
              <li>
                <span className="icon-check">✓</span> "Find the function that handles JWT
                authentication" — not just keywords
              </li>
              <li>
                <span className="icon-check">✓</span> AST-aware indexing: functions, classes,
                imports as structured metadata
              </li>
              <li>
                <span className="icon-check">✓</span> BM25 for symbol search + HNSW for semantic =
                hybrid retrieval
              </li>
              <li>
                <span className="icon-check">✓</span> Runs in your IDE extension process — no cloud,
                no latency
              </li>
            </ul>
          </div>
        </section>

        <section style={{ padding: "4rem 0", borderBottom: "1px solid var(--subtle)" }}>
          <div className="reveal text-center" style={{ marginBottom: "3rem" }}>
            <span className="section-eyebrow">// Use Cases</span>
            <h2 className="section-title section-title--compact">Beyond grep</h2>
          </div>
          <div className="grid-3">
            {[
              {
                title: "Semantic Symbol Lookup",
                desc: '"Where do we validate tokens?" returns the auth middleware function — even if "token" appears in zero comments.',
              },
              {
                title: "Pattern Matching",
                desc: '"Find all places we fetch from an API and cache the result" — understands the architectural pattern, not just the code.',
              },
              {
                title: "Context Retrieval",
                desc: "When editing a file, automatically retrieve related functions, type definitions, and usage examples from across the codebase.",
              },
            ].map((item) => (
              <div key={item.title} className="arch-card reveal">
                <div className="arch-title">{item.title}</div>
                <div className="arch-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-narrow">
          <div className="reveal text-center reveal-centered">
            <span className="section-eyebrow">// Architecture</span>
            <h2 className="section-title section-title--compact">Code → Vectors → Retrieval</h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>
              Each code unit (function, class, module) is indexed as a vector embedding plus
              structured AST metadata (name, signature, dependencies, docstring). Queries use hybrid
              search: BM25 for symbol matching, HNSW for semantic similarity, with RRF fusion for
              final ranking.
            </p>
          </div>
        </section>

        <ScrollStory
          id="ide-pipeline"
          className="story-agents"
          panels={[
            {
              id: "index",
              content: (
                <div className="story-panel-inner">
                  <span className="section-eyebrow">// Step 1: Index</span>
                  <h2 className="section-title section-title--sm" style={{ maxWidth: 500 }}>
                    AST-aware code indexing
                  </h2>
                  <p className="section-sub">
                    Each function, class, module is parsed into structured metadata (name,
                    signature, deps, docstring) plus a vector embedding.
                  </p>
                </div>
              ),
            },
            {
              id: "search",
              content: (
                <div className="story-panel-inner">
                  <span className="section-eyebrow">// Step 2: Search</span>
                  <h2 className="section-title section-title--sm" style={{ maxWidth: 500 }}>
                    Semantic + symbol hybrid
                  </h2>
                  <p className="section-sub">
                    "Find the auth middleware" matches via BM25 for "auth" + HNSW for semantic
                    similarity. RRF fusion, one result set.
                  </p>
                </div>
              ),
            },
            {
              id: "context",
              content: (
                <div className="story-panel-inner">
                  <span className="section-eyebrow">// Step 3: Context</span>
                  <h2 className="section-title section-title--sm" style={{ maxWidth: 500 }}>
                    Auto-retrieve related code
                  </h2>
                  <p className="section-sub">
                    Edit a file and VantaDB surfaces related functions, type definitions, and usage
                    examples from across your codebase — in-process, in milliseconds.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <nav className="bottom-nav">
          <Link to="/" className="back-link nav-cta">
            ← Back to Home
          </Link>
        </nav>
      </main>
    </PageShell>
  );
}
