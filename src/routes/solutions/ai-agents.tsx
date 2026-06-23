import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSubpage } from "../../components/HeroSubpage";
import { ScrollStory } from "../../components/ScrollStory";
import { PageShell } from "../../components/PageShell";

export const Route = createFileRoute("/solutions/ai-agents")({
  head: () => ({
    meta: [
      { title: "VantaDB — AI Agent Memory & State Management" },
      {
        name: "description",
        content:
          "Persistent memory for AI agents. Store conversation history, tool call results, and agent state in an embedded vector database.",
      },
    ],
  }),
  component: AiAgentsPage,
});

const code = [
  `import vantadb

db = vantadb.connect("./agent_memory.vdb")

# Store an agent memory with vector + metadata
db.insert("memories", {
  "vector": embedding,
  "metadata": {"role": "user", "session": session_id},
  "content": message
})

# Semantic recall — no API call, no network
results = db.query("memories", "What did we discuss about pricing?")`,
];

function AiAgentsPage() {
  return (
    <PageShell>
      <HeroSubpage
        eyebrow="// Solution: AI Agents"
        title={
          <>
            Memory that
            <br />
            doesn't forget.
          </>
        }
        subtitle="Give your AI agent persistent memory — conversation history, tool call results, learned preferences, and ephemeral state — all in one embedded database that lives inside your agent process."
        stats={[
          { value: "1.2ms", label: "Memory retrieval" },
          { value: "0", label: "External servers" },
          { value: "MIT", label: "License" },
        ]}
      />

      <main className="main-content">
        <section className="comparison-split">
          <div className="reveal">
            <span className="section-eyebrow">// The Problem</span>
            <h2 className="section-title section-title--compact">
              Agents without memory are stateless
            </h2>
            <ul className="comparison-list">
              <li>
                <span className="icon-cross">✗</span> OpenAI assistants: context window limited to
                128K tokens
              </li>
              <li>
                <span className="icon-cross">✗</span> Redis + embedding: two services to manage for
                persisted memory
              </li>
              <li>
                <span className="icon-cross">✗</span> Flat files: no semantic search, no structured
                querying
              </li>
              <li>
                <span className="icon-cross">✗</span> Cloud vector DB: adds 100ms+ latency per
                memory access
              </li>
            </ul>
          </div>
          <div className="reveal reveal-delay-1">
            <span className="section-eyebrow">// The VantaDB Solution</span>
            <h2 className="section-title section-title--compact">
              Embedded memory, zero infrastructure
            </h2>
            <ul className="comparison-list">
              <li>
                <span className="icon-check">✓</span> Store agent memories as typed vector +
                metadata records
              </li>
              <li>
                <span className="icon-check">✓</span> Semantic recall: "What did the user say about
                pricing?"
              </li>
              <li>
                <span className="icon-check">✓</span> Structured queries: "Show tool calls from last
                24h with errors"
              </li>
              <li>
                <span className="icon-check">✓</span> In-process: no net call, no serialization,
                1.2ms recall
              </li>
            </ul>
          </div>
        </section>

        <section className="section-narrow">
          <div className="reveal text-center reveal-centered">
            <span className="section-eyebrow">// How It Works</span>
            <h2 className="section-title section-title--compact">Memory in four primitives</h2>
          </div>
          <div className="grid-2" style={{ marginTop: "2rem" }}>
            {[
              {
                title: "Conversation Log",
                desc: "Append-only log of every turn. Query by semantic similarity, time range, or metadata tags.",
              },
              {
                title: "Tool Result Cache",
                desc: "Store tool call outputs keyed by input hash. Avoid redundant LLM invocations.",
              },
              {
                title: "User Preferences",
                desc: "Persistent key-value with vector embeddings for preference matching across sessions.",
              },
              {
                title: "Ephemeral State",
                desc: "In-memory WAL for active session state. Flushed to durable storage on checkpoint.",
              },
            ].map((item) => (
              <div key={item.title} className="arch-card reveal">
                <div className="arch-title">{item.title}</div>
                <div className="arch-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: "4rem 0" }}>
          <div className="reveal text-center" style={{ marginBottom: "3rem" }}>
            <span className="section-eyebrow">// Code Example</span>
            <h2 className="section-title section-title--compact">Three lines of memory</h2>
          </div>
          <div className="terminal-window reveal" style={{ maxWidth: 600, margin: "0 auto" }}>
            <div className="terminal-header">
              <span className="term-dot term-dot-red" />
              <span className="term-dot term-dot-yellow" />
              <span className="term-dot term-dot-green" />
              <span className="terminal-title">agent_memory.py</span>
            </div>
            <pre
              className="terminal-body"
              style={{ fontSize: "0.72rem", lineHeight: "1.7", margin: 0, whiteSpace: "pre" }}
            >
              {code[0]}
            </pre>
          </div>
        </section>

        <ScrollStory
          id="agents-memory"
          className="story-agents"
          panels={[
            {
              id: "in",
              content: (
                <div className="story-panel-inner">
                  <span className="section-eyebrow">// Step 1: Ingest</span>
                  <h2 className="section-title section-title--sm" style={{ maxWidth: 500 }}>
                    Agent memories as structured data
                  </h2>
                  <p className="section-sub">
                    Every conversation turn, tool call, and state update becomes a typed record with
                    an embedding. No serialization, no external cache.
                  </p>
                </div>
              ),
            },
            {
              id: "store",
              content: (
                <div className="story-panel-inner">
                  <span className="section-eyebrow">// Step 2: Store</span>
                  <h2 className="section-title section-title--sm" style={{ maxWidth: 500 }}>
                    Hybrid index: vector + metadata
                  </h2>
                  <p className="section-sub">
                    HNSW for semantic recall, BM25 for keyword matching, SQL for structured queries.
                    Single query, unified results.
                  </p>
                </div>
              ),
            },
            {
              id: "recall",
              content: (
                <div className="story-panel-inner">
                  <span className="section-eyebrow">// Step 3: Recall</span>
                  <h2 className="section-title section-title--sm" style={{ maxWidth: 500 }}>
                    1.2ms in-process retrieval
                  </h2>
                  <p className="section-sub">
                    No network call, no serialization. The agent asks "what did we discuss about
                    pricing?" and gets relevant memories in under 2ms.
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
