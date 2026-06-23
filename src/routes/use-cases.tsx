import { createFileRoute } from "@tanstack/react-router";
import { HeroSubpage } from "@/components/HeroSubpage";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ScrollStory } from "@/components/ScrollStory";

export const Route = createFileRoute("/use-cases")({
  head: () => ({
    meta: [
      { title: "VantaDB — Persistent Memory Use Cases" },
      {
        name: "description",
        content:
          "8 production patterns for AI agent memory, local-first RAG, codebase intelligence, multi-agent orchestration, semantic search, edge IoT, healthcare RAG, and financial document processing.",
      },
    ],
  }),
  component: UseCasesPage,
});

interface UseCase {
  title: string;
  tags: string[];
  desc: string;
  icon: string;
}

const cases: UseCase[] = [
  {
    title: "AI Agents Memory",
    tags: ["persistent", "≤1ms read", "crash-safe"],
    desc: "Store conversational history, agent thoughts, and user preferences locally. Context survives restarts with WAL crash safety — no external database needed.",
    icon: "M20 12H4m16 0a8 8 0 01-8 8m8-8a8 8 0 00-8-8",
  },
  {
    title: "Local-First RAG",
    tags: ["hybrid search", "zero deps", "on-device"],
    desc: "Run BM25 lexical + HNSW vector fusion in-process. No external server, no network overhead — full hybrid search without spinning up a container.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Codebase Intelligence",
    tags: ["GraphRAG", "AST-aware", "30K loc/s"],
    desc: "Map function definitions, imports, and caller relations in a local knowledge graph. Traverse graph hops with vector similarity for accurate code retrieval.",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  },
  {
    title: "Multi-Agent Orchestration",
    tags: ["namespaces", "isolation", "concurrent"],
    desc: "Run hundreds of independent agents on a single DB file. Namespace-level isolation prevents key collisions while keeping a unified storage footprint.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    title: "E-Commerce Semantic Search",
    tags: ["vector", "metadata filter", "real-time"],
    desc: "Serve personalized product recommendations using vector similarity on behavior embeddings — updated in real-time with zero reindexing.",
    icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z",
  },
  {
    title: "Edge / IoT Inference",
    tags: ["embedded", "ARM/RISC-V", "WAL-safe"],
    desc: "Persist device state and sensor telemetry on embedded hardware. Sub-millisecond reads with CRC32C WAL crash protection on ARM and RISC-V.",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
  },
  {
    title: "Healthcare RAG",
    tags: ["PHI-safe", "audit log", "zero-server"],
    desc: "Run private medical RAG on-device with full audit trails. Embeddings and FHIR documents stay local — no PHI leaves the hospital network.",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
  {
    title: "Financial Document Processing",
    tags: ["compliance", "high-throughput", "WAL"],
    desc: "Parse, index, and search invoices, statements, and regulatory filings with crash-safe durability. Thousands of documents per second on a single thread.",
    icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
];

function UseCasesPage() {
  useScrollReveal();

  return (
    <div className="page-wrapper">
      <HeroSubpage
        eyebrow="Use Cases"
        title="Built for agents that need context"
        subtitle="Eight production-tested patterns for persistent memory, hybrid search, and agentic data — all running in-process with zero external dependencies."
      />

      <main className="main-content">
        <section className="section-narrow">
          <div className="use-cases-grid reveal">
            {cases.map((c, i) => (
              <div key={i} className={`tactile-card reveal reveal-delay-${Math.min(i, 4)}`}>
                <div className="uc-card-header">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={c.icon} />
                  </svg>
                  <h3 className="uc-card-title" style={{ margin: 0 }}>{c.title}</h3>
                </div>
                <p className="uc-card-desc">{c.desc}</p>
                <div className="tl-tag-group">
                  {c.tags.map((tag) => (
                    <span key={tag} className="tl-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider" />

        <section style={{ padding: "4rem 0" }}>
          <h2 className="reveal" style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--white)", letterSpacing: "-0.03em", margin: "0 0 0.5rem" }}>
            Pipeline
            <br />
            <span style={{ color: "var(--amber)" }}>Memory → Search → Persist</span>
          </h2>
          <p className="section-sub reveal reveal-delay-1">
            Three-stage architecture powering every use case above.
          </p>
          <ScrollStory
            id="pipeline"
            className="reveal reveal-delay-2"
            panels={[
              {
                id: "memory",
                content: (
                  <div className="ss-panel-inner">
                    <span className="ss-step">01</span>
                    <h3 className="ss-title">Memory</h3>
                    <p className="ss-desc">
                      Embeddings and metadata are written to the LSM-tree engine with
                      immediate durability. The WAL guarantees crash recovery — every
                      vector, every key, every byte.
                    </p>
                    <div className="tl-tag-group">
                      <span className="tl-tag">write-ahead log</span>
                      <span className="tl-tag">CRC32C</span>
                      <span className="tl-tag">O(1) append</span>
                    </div>
                  </div>
                ),
              },
              {
                id: "search",
                content: (
                  <div className="ss-panel-inner">
                    <span className="ss-step">02</span>
                    <h3 className="ss-title">Search</h3>
                    <p className="ss-desc">
                      HNSW vector index + BM25 lexical index fused via RRF in a single
                      call. Sub-millisecond latency with zero network — all computation
                      is in-process.
                    </p>
                    <div className="tl-tag-group">
                      <span className="tl-tag">HNSW</span>
                      <span className="tl-tag">BM25</span>
                      <span className="tl-tag">RRF fusion</span>
                    </div>
                  </div>
                ),
              },
              {
                id: "persist",
                content: (
                  <div className="ss-panel-inner">
                    <span className="ss-step">03</span>
                    <h3 className="ss-title">Persist</h3>
                    <p className="ss-desc">
                      Everything lives in a single portable DB file. Backup via SCP,
                      move across machines, survive process kills — no reindexing, no
                      restore procedure, no cloud egress.
                    </p>
                    <div className="tl-tag-group">
                      <span className="tl-tag">single file</span>
                      <span className="tl-tag">portable</span>
                      <span className="tl-tag">zero reindex</span>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </section>
      </main>
    </div>
  );
}
