import { createFileRoute } from "@tanstack/react-router";
import { HeroSubpage } from "@/components/HeroSubpage";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "VantaDB — Documentation" },
      { name: "description", content: "Get started with VantaDB: embedded database for AI agents. Installation, quickstart, SDK reference, and guides." },
    ],
  }),
  component: DocsPage,
});

const sections = [
  {
    id: "getting-started",
    title: "Getting Started",
    code: `$ pip install vantadb-py

$ python
>>> import vantadb
>>> db = vantadb.connect("./my_project.vdb")
>>> db.insert("docs", {
...   "title": "Hello, VantaDB!",
...   "content": "VantaDB is an embedded vector database for AI agents.",
...   "vector": [0.12, 0.45, 0.78, 0.33]
... })
>>> results = db.query("docs", "vector database", top_k=5)
>>> results[0].score
0.9421`,
    desc: "Install VantaDB and run your first hybrid query in under 60 seconds. The engine ships as a single native binary with zero system dependencies — Python 3.10+ or Rust 1.75+ required.",
  },
  {
    id: "python-sdk",
    title: "Python SDK",
    code: `import vantadb

db = vantadb.connect("./my_db.vdb")

# Insert
db.insert("collection", {
  "vector": [0.1, 0.2, 0.35],
  "metadata": {"source": "web", "tags": ["ai", "ml"]},
  "content": "Document text here"
})

# Hybrid search (BM25 + HNSW with RRF)
results = db.query(
  "collection",
  "query text",
  top_k=10,
  mode="hybrid",
  rrf_k=60
)

# With metadata filter
results = db.query(
  "collection", "query",
  filter={"source": "web"}
)

# Delete by ID
db.delete("collection", ids=[1, 2, 3])`,
    desc: "The Python SDK provides a pandas-friendly interface with full type hints. Supports semantic search, hybrid BM25+HNSW retrieval, metadata filtering, and WAL-backed durability out of the box.",
  },
  {
    id: "rust-embedding",
    title: "Rust SDK",
    code: `use vantadb::prelude::*;

fn main() -> Result<()> {
  let mut db = VantaDB::open("./my_db.vdb")?;

  db.insert("docs", vec![
    Document::new()
      .vector(vec![0.1, 0.2, 0.3])
      .field("title", "Hello")
      .field("content", "Document body")
  ])?;

  let results = db.query("docs", "search query")
    .top_k(10)
    .mode(SearchMode::Hybrid)
    .run()?;

  for doc in results {
    println!("{} — {}", doc.score, doc.field::<str>("title"));
  }
  Ok(())
}`,
    desc: "Zero-cost abstractions over the core Rust engine. Embed VantaDB directly into your application with no sidecars or IPC — ideal for edge devices, CLI tools, and agent runtimes.",
  },
  {
    id: "cli-reference",
    title: "CLI Reference",
    code: `$ vantadb --help
VantaDB 0.4.2 — Embedded vector database for AI agents

USAGE:
    vantadb [OPTIONS] <COMMAND>

COMMANDS:
    init      Initialize a new database
    insert    Insert documents from JSON/CSV
    query     Run a semantic or hybrid search
    serve     Start the HTTP API server (optional)
    inspect   Inspect database stats and index
    checkpoint   Force WAL checkpoint

OPTIONS:
    --db-path <PATH>      Database path [default: ./.vantadb]
    --log-level <LEVEL>   Log level [default: info]

$ vantadb init --db-path ./my_db.vdb
[2026-06-21T10:00:00Z INFO  vantadb] Initialized database at ./my_db.vdb
[2026-06-21T10:00:00Z INFO  vantadb] Index configured: HNSW (M=16, ef=200)

$ vantadb query "hybrid search example" --top-k 5 --mode hybrid
# Returns ranked results with RRF scores`,
    desc: "The `vantadb` CLI provides full database management from the terminal — initialize databases, bulk-insert documents, run queries, inspect indexes, and manage WAL checkpoints without writing code.",
  },
  {
    id: "configuration",
    title: "Configuration",
    code: `# .vantadb/config.toml

[storage]
path = "./data"
sync_mode = "fsync"     # async | fsync | full
wal_flush_interval_ms = 100

[indexing.defaults]
m = 16                  # HNSW neighbors per node
ef_construction = 200   # index quality
ef_search = 50          # search breadth

[indexing.bm25]
tokenizer = "whitespace"
stemmer = "english"
k1 = 1.2
b = 0.75

[hybrid]
rrf_k = 60
weights = [0.5, 0.5]   # [bm25, vector]

[limits]
max_document_size = 10485760   # 10 MB
max_collections = 256`,
    desc: "Configure every aspect of the VantaDB engine via TOML, environment variables, or inline API calls. Tune HNSW parameters for recall/latency tradeoffs, set durability guarantees, and constrain resource usage.",
  },
  {
    id: "migration-guide",
    title: "Migration Guide",
    code: `# v0.3 → v0.4 Migration

## Breaking changes
- The sync_mode default changed from "async" to "fsync"
  → Explicitly set sync_mode="async" for maximum throughput

- INSERT now returns UUIDs instead of incrementing integers
  → Update foreign key references if relying on numeric IDs

- BM25 tokenizer changed from "word" to "whitespace"
  → Set tokenizer = "word" in config for old behavior

## Deprecated
- db.bulk_insert() → use db.insert() with batch parameter
- --http-port CLI flag → use vantadb serve --port

## Removed
- db.create_collection() (auto-created on first insert)
- Python 3.9 support (minimum is now 3.10)

$ python -m vantadb.migrate ./old_db.vdb --target v0.4`,
    desc: "Follow our migration guides to upgrade between major versions. Each guide includes breaking changes, deprecated APIs, and automated migration scripts to keep your data safe.",
  },
];

function DocsPage() {
  return (
    <PageShell>
      <HeroSubpage
        eyebrow="// Documentation"
        title="Documentation"
        subtitle="Comprehensive guides, SDK references, and configuration reference for VantaDB — the embedded database for AI agents."
      />

      {sections.map((s, i) => {
        const isOdd = i % 2 === 0;
        return (
          <section
            key={s.id}
            id={s.id}
            className={`section-padded--engine ${!isOdd ? "section-padded--surface" : ""}`}
          >
            <div className="reveal">
              <span className="section-eyebrow reveal">// {s.title}</span>
              <h2 className="section-title section-title--sm reveal reveal-delay-1">
                {s.title}
              </h2>
              <p className="section-sub section-sub--mb reveal reveal-delay-2">
                {s.desc}
              </p>
            </div>
            <div className="tactile-card reveal reveal-delay-2" style={{ marginTop: "1.5rem" }}>
              <div className="term-window" style={{ border: "none", background: "transparent" }}>
                <div className="term-titlebar">
                  <span className="term-dot term-dot--red" />
                  <span className="term-dot term-dot--yellow" />
                  <span className="term-dot term-dot--green" />
                  <span className="term-label">{s.id}</span>
                </div>
                <pre style={{ margin: 0, padding: "1.25rem 1.5rem", fontSize: "0.8125rem", lineHeight: 1.6, overflowX: "auto" }}>
                  <code style={{ fontFamily: "var(--font-mono)", color: "var(--steel)" }}>{s.code}</code>
                </pre>
              </div>
            </div>
          </section>
        );
      })}
    </PageShell>
  );
}
