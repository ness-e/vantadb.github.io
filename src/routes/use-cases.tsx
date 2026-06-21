import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/use-cases")({
  head: () => ({
    meta: [
      { title: "VantaDB — Persistent Memory Use Cases" },
      {
        name: "description",
        content:
          "Practical SDK examples for AI agent memory, codebase parsing, local-first RAG and namespace isolation.",
      },
    ],
  }),
  component: UseCasesPage,
});

function UseCasesPage() {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const cases = [
    {
      title: "Conversational Agent Memory",
      tag: "PERSISTENT AGENTS",
      desc: "Store conversatonal history, agent thoughts, and user preferences locally. Make sure context survives restarts with absolute crash safety.",
      code: `import vantadb_py as vanta

db = vanta.VantaDB("./agent_memory")

# Store conversation memory block
db.put(
    "conversations",
    "sess-0012",
    "User asked for a premium dark mode redesign",
    vector=[0.11, 0.88, 0.55],
    metadata={
        "user_id": "user-44",
        "agent_role": "UI/UX Orchestrator",
        "timestamp": "2026-06-15"
    }
)

# Recall relevant conversational context
hits = db.search_memory(
    "conversations",
    query_vector=[0.12, 0.85, 0.52],
    top_k=3
)`,
    },
    {
      title: "Embedded Local-First RAG Backend",
      tag: "VECTOR + LEXICAL",
      desc: "Avoid external server Round-Trip-Times (RTT). Run BM25 keyword matching and vector similarities in-process to feed LLMs contextual data instantly.",
      code: `import vantadb_py as vanta

db = vanta.VantaDB("./rag_store")

# Index document chunk
db.put(
    "documents",
    "chunk-8921",
    "Fjall uses LSM-trees for fast write workloads.",
    vector=[0.45, 0.22, 0.91],
    metadata={"source": "fjall_docs.txt"}
)

# Search using RRF fusion
results = db.search_memory(
    "documents",
    query_vector=[0.42, 0.25, 0.88],
    top_k=5
)`,
    },
    {
      title: "Codebase Intelligence (AST GraphRAG)",
      tag: "GRAPHRAG",
      desc: "Map function definitions, imports, and caller relations inside a local Knowledge Graph. Query similarity vectors while traversing graph hops.",
      code: `import vantadb_py as vanta

db = vanta.VantaDB("./codebase_graph")

# Store class metadata
db.put(
    "ast",
    "class:VantaDB",
    "class VantaDB handles raw FFI PyO3 operations",
    vector=[0.72, 0.12, 0.61]
)

# Store relation edge
db.put(
    "ast",
    "fn:open",
    "fn open initializes Fjall storage boundaries",
    vector=[0.70, 0.15, 0.59],
    metadata={
        "calls": "class:VantaDB",
        "relation_weight": 1.0
    }
)

# Retrieve with GraphRAG hops
hits = db.search_memory(
    "ast",
    query_vector=[0.71, 0.14, 0.60],
    graph_hops=2
)`,
    },
    {
      title: "Multi-Agent Sandbox Isolation",
      tag: "NAMESPACES",
      desc: "Run multiple independent agents on top of a single database file. Keep keys isolated inside namespaces with structured filters.",
      code: `import vantadb_py as vanta

db = vanta.VantaDB("./shared_db")

# Store research agent memory
db.put(
    "researcher",
    "fact-01",
    "SurrealDB uses Rust for parsing query states",
    vector=[0.25, 0.65, 0.12]
)

# Store designer agent memory
db.put(
    "designer",
    "fact-01",
    "High-end landing pages use asymmetric grids",
    vector=[0.11, 0.82, 0.35]
)

# Query isolated namespace with filter
hits = db.search_memory(
    "designer",
    query_vector=[0.12, 0.80, 0.38],
    top_k=2
)`,
    },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="page-wrapper">
      <header className="page-header-extended">
        <span className="section-eyebrow reveal">// Use Cases</span>
        <h1 className="title-accent reveal reveal-delay-1">
          Where VantaDB
          <br />
          fits perfectly.
        </h1>
        <p className="section-sub reveal reveal-delay-2 desc-text">
          Practical design patterns built on top of the VantaDB SDK. Leverage persistent memory in
          production.
        </p>
      </header>

      <main className="main-content">
        {/* ── Section: Accordion component ── */}
        <section className="section-narrow">
          <div className="accordion-wrapper reveal">
            {cases.map((c, idx) => (
              <div
                key={idx}
                className={`accordion-item-premium ${activeIdx === idx ? "active" : ""}`}
              >
                <button
                  className="accordion-header"
                  onClick={() => setActiveIdx(activeIdx === idx ? -1 : idx)}
                >
                  <div className="accordion-header-row">
                    <span
                      className="accordion-index"
                      style={{ color: activeIdx === idx ? "var(--amber)" : "var(--steel)" }}
                    >
                      0{idx + 1}
                    </span>
                    <h4>{c.title}</h4>
                  </div>
                  <span className="accordion-icon">
                    {activeIdx === idx ? "✕" : "＋"}
                  </span>
                </button>
                <div
                  className="accordion-content"
                  style={{
                    maxHeight: activeIdx === idx ? "600px" : "0",
                  }}
                >
                  <div className="accordion-content-inner">
                    <div>
                      <span className="use-case-tag">{c.tag}</span>
                      <p className="use-case-desc">{c.desc}</p>
                      <pre className="code-block-premium code-block-premium--compact">
                        <button
                          className="code-copy-btn"
                          onClick={() => navigator.clipboard?.writeText(c.code)}
                        >
                          Copy
                        </button>
                        <code>{c.code}</code>
                      </pre>
                    </div>
                    <div className="behavior-panel">
                      <div className="behavior-label">DESIGN PATTERN BEHAVIOR</div>
                      <ul className="behavior-list">
                          {idx === 0 &&
                            [
                              "Keys synchronized immediately inside Fjall log engines.",
                              "1.2ms p99 latency ensures zero agent loop blocking.",
                              "Restarts trigger safe WAL replay recoveries automatically.",
                            ].map((li, lIdx) => (
                              <li key={lIdx}>{li}</li>
                            ))}
                          {idx === 1 &&
                            [
                              "Lexical searches use BM25 score distributions.",
                              "Vector searches use HNSW graph indices.",
                              "Reciprocal Rank Fusion fuses relevance queries in 1ms.",
                            ].map((li, lIdx) => (
                              <li key={lIdx}>{li}</li>
                            ))}
                          {idx === 2 &&
                            [
                              "directed connections stored in adjacency files.",
                              "graph_hops=2 traversal walks namespaces locally.",
                              "Eliminates prompt overflow tokens by 60%.",
                            ].map((li, lIdx) => (
                              <li key={lIdx}>{li}</li>
                            ))}
                          {idx === 3 &&
                            [
                              "Namespaces separate tables safely inside standard files.",
                              "Filters pre-isolate records before calculating cosine ranks.",
                              "Run hundreds of agent memories under a single DB.",
                            ].map((li, lIdx) => (
                              <li key={lIdx}>{li}</li>
                            ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
