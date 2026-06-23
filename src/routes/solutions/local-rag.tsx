import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSubpage } from "../../components/HeroSubpage";
import { ScrollStory } from "../../components/ScrollStory";
import { PageShell } from "../../components/PageShell";

export const Route = createFileRoute("/solutions/local-rag")({
  head: () => ({
    meta: [
      { title: "VantaDB — Local-First RAG Pipeline" },
      {
        name: "description",
        content:
          "Run RAG entirely on-device. No vectors in the cloud. Embed documents locally, query with your local LLM, keep your data private.",
      },
    ],
  }),
  component: LocalRagPage,
});

const code = `import vantadb
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")
db = vantadb.connect("./docs.vdb")

# Index documents
for doc in documents:
    vec = model.encode(doc.text)
    db.insert("docs", {"vector": vec, "content": doc.text})

# Query — all local, all private
results = db.query("docs", query_text, top_k=5)`;

function LocalRagPage() {
  return (
    <PageShell>
      <HeroSubpage
        eyebrow="// Solution: Local RAG"
        title={
          <>
            Your data never
            <br />
            leaves your laptop.
          </>
        }
        subtitle="Run Retrieval-Augmented Generation entirely on-device. VantaDB embeds, indexes, and queries documents locally — no vectors in the cloud, no data leaks, no API costs."
        stats={[
          { value: "Private", label: "By design" },
          { value: "Local", label: "Embedding + retrieval" },
          { value: "1", label: "Binary to deploy" },
        ]}
      />

      <main className="main-content">
        <section className="comparison-split">
          <div className="reveal">
            <span className="section-eyebrow">// The Problem</span>
            <h2 className="section-title section-title--compact">Cloud RAG leaks your data</h2>
            <ul className="comparison-list">
              <li>
                <span className="icon-cross">✗</span> Pinecone/Weaviate: your document embeddings
                leave your network
              </li>
              <li>
                <span className="icon-cross">✗</span> SaaS vector DB: every query crosses the wire,
                every result is visible
              </li>
              <li>
                <span className="icon-cross">✗</span> Hybrid cloud: embedding API + vector DB + LLM
                = 3 data exposures
              </li>
              <li>
                <span className="icon-cross">✗</span> Data residency: cloud providers may store in
                any region
              </li>
            </ul>
          </div>
          <div className="reveal reveal-delay-1">
            <span className="section-eyebrow">// The VantaDB Solution</span>
            <h2 className="section-title section-title--compact">Local-first RAG, zero exposure</h2>
            <ul className="comparison-list">
              <li>
                <span className="icon-check">✓</span> Embed documents locally — your data never
                touches a network
              </li>
              <li>
                <span className="icon-check">✓</span> In-process retrieval — no API calls for vector
                search
              </li>
              <li>
                <span className="icon-check">✓</span> Works with local LLMs (Ollama, llama.cpp, MLX)
              </li>
              <li>
                <span className="icon-check">✓</span> Air-gap compatible — no internet connection
                required
              </li>
            </ul>
          </div>
        </section>

        <section className="section-narrow">
          <div className="reveal text-center reveal-centered">
            <span className="section-eyebrow">// Architecture</span>
            <h2 className="section-title section-title--compact">Local RAG pipeline</h2>
          </div>
          <div className="grid-3" style={{ marginTop: "2rem" }}>
            {[
              {
                step: "01",
                title: "Ingest",
                desc: "Load documents (PDF, Markdown, code). Chunk and embed with a local model (all-MiniLM-L6-v2, nomic-embed-text).",
              },
              {
                step: "02",
                title: "Index",
                desc: "Store embeddings + text in VantaDB. BM25 full-text index for lexical fallback. Hybrid query with RRF fusion.",
              },
              {
                step: "03",
                title: "Retrieve",
                desc: "Query with semantic + keyword search. Pass results to local LLM. All in-process, all private.",
              },
            ].map((item) => (
              <div key={item.step} className="arch-card reveal">
                <div className="arch-number">{item.step}</div>
                <div className="arch-title">{item.title}</div>
                <div className="arch-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: "4rem 0" }}>
          <div className="reveal text-center" style={{ marginBottom: "3rem" }}>
            <span className="section-eyebrow">// Code Example</span>
            <h2 className="section-title section-title--compact">RAG in 5 lines</h2>
          </div>
          <div className="terminal-window reveal" style={{ maxWidth: 600, margin: "0 auto" }}>
            <div className="terminal-header">
              <span className="term-dot term-dot-red" />
              <span className="term-dot term-dot-yellow" />
              <span className="term-dot term-dot-green" />
              <span className="terminal-title">local_rag.py</span>
            </div>
            <pre
              className="terminal-body"
              style={{ fontSize: "0.72rem", lineHeight: "1.7", margin: 0, whiteSpace: "pre" }}
            >
              {code}
            </pre>
          </div>
        </section>

        <ScrollStory
          id="rag-pipeline"
          className="story-agents"
          panels={[
            {
              id: "ingest",
              content: (
                <div className="story-panel-inner">
                  <span className="section-eyebrow">// Step 1: Ingest</span>
                  <h2 className="section-title section-title--sm" style={{ maxWidth: 500 }}>
                    Load, chunk, embed — all local
                  </h2>
                  <p className="section-sub">
                    PDFs, Markdown, code. Chunked and embedded with a local model. Your data never
                    touches a network.
                  </p>
                </div>
              ),
            },
            {
              id: "index",
              content: (
                <div className="story-panel-inner">
                  <span className="section-eyebrow">// Step 2: Index</span>
                  <h2 className="section-title section-title--sm" style={{ maxWidth: 500 }}>
                    Dual index: HNSW + BM25
                  </h2>
                  <p className="section-sub">
                    Vectors in HNSW for semantic search, inverted index for keyword fallback. Hybrid
                    query fuses both with RRF.
                  </p>
                </div>
              ),
            },
            {
              id: "retrieve",
              content: (
                <div className="story-panel-inner">
                  <span className="section-eyebrow">// Step 3: Retrieve + Generate</span>
                  <h2 className="section-title section-title--sm" style={{ maxWidth: 500 }}>
                    In-process RAG, zero cloud
                  </h2>
                  <p className="section-sub">
                    Query hits local VantaDB, results pass to your local LLM (Ollama, llama.cpp).
                    All in-process, all private.
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
