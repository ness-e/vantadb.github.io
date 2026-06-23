import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const Route = createFileRoute("/integrations")({
  head: () => ({
    meta: [
      { title: "VantaDB — Ecosystem & Integrations" },
      {
        name: "description",
        content:
          "Integrate VantaDB vector store and persistent memory tools natively inside LangChain, LlamaIndex and MCP runtimes.",
      },
    ],
  }),
  component: IntegrationsPage,
});

// ── Satellite Icons (inline SVG) ────────────────────────────────────────────────
const IconLangChain = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const IconLlamaIndex = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 17V7l5 5-5 5z" />
  </svg>
);

const IconMCP = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3z" />
    <path d="M6 21a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3v12a3 3 0 0 0 3 3z" />
  </svg>
);

const IconPython = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12h8M12 8v8" />
  </svg>
);

function IntegrationsPage() {
  const [selectedSat, setSelectedSat] = useState<string>("langchain");

  const integrations = [
    {
      id: "langchain",
      name: "LangChain integration",
      tag: "langchain_vantadb",
      desc: "Implement VantaDB as a lightweight persistent vectorstore within your LangChain document pipelines.",
      code: `from langchain_vantadb import VantaDBVectorStore
from langchain_openai import OpenAIEmbeddings

embeddings = OpenAIEmbeddings()
vector_store = VantaDBVectorStore(
    path="./langchain_data",
    embedding_function=embeddings,
    namespace="agent_history"
)

# Add records to local db
vector_store.add_texts(
    texts=["User prefers async python workflows"],
    metadatas=[{"priority": "high"}]
)

# Similarity query execution
docs = vector_store.similarity_search("python developer", k=3)`,
    },
    {
      id: "llamaindex",
      name: "LlamaIndex connector",
      tag: "llama-index-vector-stores-vantadb",
      desc: "Connect LLM index pipelines directly to VantaDB. Leverage in-process traversals for rapid structured memory pipelines.",
      code: `from llama_index.core import SimpleDirectoryReader, VectorStoreIndex
from llama_index.vector_stores.vantadb import VantaDBVectorStore
from llama_index.core.storage.storage_context import StorageContext

# Initialize in-process store
vector_store = VantaDBVectorStore(path="./llama_data")
storage_context = StorageContext.from_defaults(vector_store=vector_store)

# Load data and build index
documents = SimpleDirectoryReader("./data").load_data()
index = VectorStoreIndex.from_documents(
    documents, storage_context=storage_context
)

# Query vector index
query_engine = index.as_query_engine()
response = query_engine.query("What is the system limits?")`,
    },
    {
      id: "mcp",
      name: "Model Context Protocol",
      tag: "mcp-server-vantadb",
      desc: "Expose local vector storage utilities and namespace keys dynamically to Claude Desktop or any MCP client runtime.",
      code: `{
  "mcpServers": {
    "vantadb-memory": {
      "command": "python",
      "args": ["-m", "vantadb_mcp_server", "--path", "./mcp_agent_memory"],
      "env": {
        "VANTA_DEFAULT_NAMESPACE": "agent_context"
      }
    }
  }
}`,
    },
    {
      id: "python",
      name: "Python Native SDK",
      tag: "vantadb-py",
      desc: "Direct direct Rust bindings via PyO3. Absolute speed with zero TCP networking latency floors.",
      code: `import vantadb_py as vanta

# Open database path
db = vanta.VantaDB("./vanta_memory")

# Store structured memory
db.put(
    "memories",
    "user-pref",
    "Developer is building high-end interfaces",
    vector=[0.15, 0.82, 0.44]
)

# Multi-modal retrieval
hits = db.search_memory(
    "memories",
    query_vector=[0.14, 0.85, 0.40],
    top_k=1
)`,
    },
  ];

  useScrollReveal();

  const activeIntegration = integrations.find((i) => i.id === selectedSat) || integrations[0];

  return (
    <div className="page-wrapper">
      <header className="page-header-extended">
        <span className="section-eyebrow reveal">// Ecosystem</span>
        <h1 className="title-accent reveal reveal-delay-1">
          Fits your stack.
          <br />
          Not the other way.
        </h1>
        <p className="section-sub reveal reveal-delay-2 desc-text">
          Connect VantaDB directly to the frameworks you already know. Built for first-class Python
          and Rust ecosystems.
        </p>
      </header>

      <main className="main-content">
        {/* ── Section: Orbit Universe and Code panel ── */}
        <section className="int-section">
          <div className="reveal">
            <div className="int-header">
              <h2 className="section-title section-title--no-mb">{activeIntegration.name}</h2>
              <span className="int-tag">{activeIntegration.tag}</span>
            </div>
            <p className="section-sub section-sub--mb-sm">{activeIntegration.desc}</p>

            <pre className="code-block-premium">
              <button
                className="code-copy-btn"
                onClick={() => navigator.clipboard?.writeText(activeIntegration.code)}
              >
                Copy snippet
              </button>
              <code>{activeIntegration.code}</code>
            </pre>
          </div>

          <div className="reveal reveal-delay-2 int-selector-grid">
            {[
              { id: "langchain", icon: <IconLangChain />, label: "LangChain" },
              { id: "llamaindex", icon: <IconLlamaIndex />, label: "LlamaIndex" },
              { id: "python", icon: <IconPython />, label: "Python SDK" },
              { id: "mcp", icon: <IconMCP />, label: "MCP" },
            ].map((fw) => (
              <button
                key={fw.id}
                className={`int-selector-card ${selectedSat === fw.id ? "active" : ""}`}
                onClick={() => setSelectedSat(fw.id)}
              >
                <div className="int-selector-icon">{fw.icon}</div>
                <div className="int-selector-label">{fw.label}</div>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
