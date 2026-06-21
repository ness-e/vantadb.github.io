import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";

export const Route = createFileRoute("/engine")({
  head: () => ({
    meta: [
      { title: "VantaDB — Core Engine Modalities" },
      {
        name: "description",
        content:
          "Deep dive into the VantaDB engine: BM25 + HNSW Hybrid Search, GraphRAG relations, and WAL durability.",
      },
    ],
  }),
  component: EnginePage,
});

// ── Scanline overlay ───────────────────────────────────────────────────────────
function Scanlines() {
  return (
    <div
      aria-hidden="true"
      className="scanlines"
    />
  );
}

// ── Graph topology (Interactive) ────────────────────────────────────────────────
function GraphTopology() {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const nodes = [
    { x: 160, y: 90, label: "agent:main", size: 14 },
    { x: 320, y: 50, label: "memory:001", size: 10 },
    { x: 280, y: 180, label: "context:rag", size: 11 },
    { x: 80, y: 200, label: "vector:embed", size: 9 },
    { x: 420, y: 130, label: "hnsw:idx", size: 10 },
    { x: 370, y: 240, label: "edge:weight", size: 8 },
    { x: 150, y: 290, label: "bm25:score", size: 9 },
    { x: 460, y: 60, label: "namespace:db", size: 12 },
  ];
  const edges = [
    [0, 1],
    [0, 3],
    [0, 2],
    [1, 4],
    [2, 4],
    [2, 5],
    [3, 6],
    [4, 7],
    [1, 7],
    [2, 6],
  ];

  const isEdgeHighlighted = (a: number, b: number) => {
    if (activeNode === null) return false;
    return a === activeNode || b === activeNode;
  };

  return (
    <svg viewBox="0 0 540 330" className="graph-topology-svg">
      <defs>
        <radialGradient id="ng" r="50%">
          <stop offset="0%" stopColor="#FF6A00" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FF6A00" stopOpacity="0" />
        </radialGradient>
        <filter id="ng2">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          className="graph-edge"
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={isEdgeHighlighted(a, b) ? "rgba(255,106,0,0.8)" : "rgba(255,106,0,0.18)"}
          strokeWidth={isEdgeHighlighted(a, b) ? "2" : "1"}
        />
      ))}
      {nodes.map((n, i) => (
        <g
          key={i}
          className="graph-node-group"
          onMouseEnter={() => setActiveNode(i)}
          onMouseLeave={() => setActiveNode(null)}
        >
          <circle
            cx={n.x}
            cy={n.y}
            r={n.size * 3.5}
            fill="url(#ng)"
            filter="url(#ng2)"
            opacity={activeNode === i ? 1 : 0.6}
          />
          <circle
            className="graph-node-ring"
            cx={n.x}
            cy={n.y}
            r={n.size}
            fill="rgba(255,106,0,0.08)"
            stroke={activeNode === i ? "var(--amber)" : "rgba(255,106,0,0.4)"}
            strokeWidth="1"
          />
          <circle cx={n.x} cy={n.y} r={n.size * 0.45} fill="#FF6A00" />
          <text
            x={n.x}
            y={n.y - n.size - 5}
            textAnchor="middle"
            fill={activeNode === i ? "var(--white)" : "rgba(200,194,208,0.35)"}
            fontSize="8"
            fontFamily="'JetBrains Mono',monospace"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function getLogClass(log: string): string {
  if (log.includes("!!!")) return "wal-log-entry--error";
  if (log.includes("STATUS: READY")) return "wal-log-entry--success";
  if (log.includes("OK")) return "wal-log-entry--success-light";
  if (log.includes("RECOVER")) return "wal-log-entry--recover";
  if (log.includes("STATUS")) return "wal-log-entry--status";
  return "wal-log-entry--info";
}

// ── WAL Fallo Simulator Component ───────────────────────────────────────────────
function WALSimulator() {
  const [logs, setLogs] = useState<string[]>([
    "[00:00:01] System boot initialized",
    "[00:00:02] Storage engine opened at path ./agent_memory",
    "[00:00:03] Replaying WAL logs... 0 transactions found",
    "[00:00:04] Database state: READY",
  ]);
  const [engineState, setEngineState] = useState<"ready" | "crashed" | "recovering">("ready");
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const triggerCrash = () => {
    if (engineState !== "ready") return;
    setEngineState("crashed");
    setLogs((prev) => [
      ...prev,
      "[00:02:15] put txn: namespace=memories, key=conv-88",
      "[00:02:16] wal: writing page log CRC32C=0xab12de",
      "!!! CRITICAL FAILURE: PROCESS TERMINATED OUTSIDE CLEAN DISCONNECT !!!",
      "STATUS: OFFLINE",
    ]);
  };

  const recoverFromWAL = () => {
    if (engineState !== "crashed") return;
    setEngineState("recovering");
    setLogs((prev) => [
      ...prev,
      "[00:03:01] Database reopened. Initializing WAL scan...",
      "[00:03:02] WAL found. Unflushed write at sector index 43",
      "[00:03:03] Checking integrity: verifying CRC32C checksums...",
      "[00:03:04] Checksum 0xab12de OK. Syncing WAL entry 1/1",
      "[00:03:05] WAL sync finished. Rebuilding transient HNSW indexes",
      "[00:03:06] State restored in 0.4ms. 1 transaction recovered.",
      "STATUS: READY",
    ]);
    setTimeout(() => {
      setEngineState("ready");
    }, 1200);
  };

  return (
    <div className="wal-simulator">
      <div className="wal-header">
        <div className="wal-status-group">
          <div
            className="wal-status-dot"
            data-state={engineState}
          />
          <span className="wal-status-label">
            ENGINE STATUS: {engineState}
          </span>
        </div>
        <div className="wal-actions">
          <button
            className="btn-ghost wal-btn-sm"
            onClick={triggerCrash}
            disabled={engineState !== "ready"}
          >
            CRASH ENGINE
          </button>
          <button
            className="btn-primary wal-btn-sm"
            onClick={recoverFromWAL}
            disabled={engineState !== "crashed"}
          >
            RECOVER FROM WAL
          </button>
        </div>
      </div>

      <div className="wal-console">
        {logs.map((log, idx) => (
          <div
            key={idx}
            className={`wal-log-entry ${getLogClass(log)}`}
          >
            {log}
          </div>
        ))}
        <div ref={consoleEndRef} />
      </div>
    </div>
  );
}

// ── Interactive RRF Weights Slider Component ───────────────────────────────────
function RRFWeightsSlider() {
  const [bm25Weight, setBm25Weight] = useState(50);
  const hnswWeight = 100 - bm25Weight;

  // Simulate metrics depending on weights
  const lexicalRecall = Math.round(bm25Weight * 0.7 + 10);
  const vectorRecall = Math.round(hnswWeight * 0.8 + 15);
  const fusedRecall = Math.round(100 - Math.abs(bm25Weight - 45) * 0.15);
  const queryLatency = (1.2 + (hnswWeight / 100) * 0.4).toFixed(2);

  return (
    <div className="slider-container">
      <div className="rrf-header">
        <h4 className="rrf-title">
          Interactive Reciprocal Rank Fusion (RRF) Planner
        </h4>
        <span className="rrf-latency">
          PLANNER LATENCY: {queryLatency}ms
        </span>
      </div>
      <p className="rrf-description">
        Adjust the slider to balance lexical matching (BM25) and vector embedding similarity (HNSW).
        VantaDB fuses both signals dynamically.
      </p>

      <div className="rrf-labels">
        <span>BM25 (Léxico): {bm25Weight}%</span>
        <span>HNSW (Vector): {hnswWeight}%</span>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={bm25Weight}
        onChange={(e) => setBm25Weight(Number(e.target.value))}
        className="rrf-slider"
      />

      <div className="rrf-metrics-grid">
        <div className="rrf-metric-card">
          <div className="rrf-metric-label">
            LEXICAL RECALL
          </div>
          <div className="rrf-metric-value">
            {lexicalRecall}%
          </div>
        </div>
        <div className="rrf-metric-card">
          <div className="rrf-metric-label">
            VECTOR RECALL
          </div>
          <div className="rrf-metric-value">
            {vectorRecall}%
          </div>
        </div>
        <div className="rrf-metric-card--amber">
          <div className="rrf-metric-label--amber">
            FUSED RECALL@10
          </div>
          <div className="rrf-metric-value--amber">
            {fusedRecall}%
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page Component ────────────────────────────────────────────────────────
function EnginePage() {
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
    <div className="engine-page">
      <header className="page-header-extended">
        <span className="section-eyebrow reveal">// Core Engine</span>
        <h1 className="engine-hero-title title-accent reveal reveal-delay-1">
          Four modalities.
          <br />
          One atomic contract.
        </h1>
        <p className="section-sub reveal reveal-delay-2 desc-text">
          VantaDB consolidates lexical matching, HNSW vector search, Graph traversal nodes and
          transactional persistence in a zero-dependency Rust local-first library database.
        </p>
      </header>

      <main className="engine-main">
        {/* ── Section 1: BM25 + HNSW Hybrid Search ── */}
        <section className="engine-section engine-section--bordered">
          <div className="engine-grid">
            <div>
              <span className="section-eyebrow reveal">Modalidad 01</span>
              <h2
                className="section-title reveal reveal-delay-1 section-title--compact"
              >
                Hybrid Search with RRF Fusion
              </h2>
              <p className="section-sub reveal reveal-delay-2 section-sub--mb-sm">
                VantaDB executes lexical BM25 matching and high-dimensional HNSW vector recall under
                a unified internal query engine framework. The fusion relies on Reciprocal Rank
                Fusion (RRF), weighting relevance dynamically.
              </p>
              <ul className="spec-list reveal reveal-delay-3">
                {[
                  "k1=1.2, b=0.75 text tf-idf saturation configuration.",
                  "ef_construction=200, M=16 HNSW parameters.",
                  "Cosine, Euclidean, and Dot Product distances.",
                ].map((spec, sIdx) => (
                  <li key={sIdx} className="spec-item">
                    <span className="spec-check">✓</span> {spec}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal reveal-delay-2">
              <RRFWeightsSlider />
            </div>
          </div>
        </section>

        {/* ── Section 2: GraphRAG Relations ── */}
        <section className="engine-section engine-section--bordered">
          <div className="engine-grid--reverse">
            <div className="reveal reveal-delay-2">
              <div className="graph-card">
                <Scanlines />
                <GraphTopology />
              </div>
            </div>
            <div>
              <span className="section-eyebrow reveal">Modalidad 02</span>
              <h2
                className="section-title reveal reveal-delay-1 section-title--compact"
              >
                Graph Relations alongside vectors
              </h2>
              <p className="section-sub reveal reveal-delay-2 section-sub--mb-sm">
                Establish semantic connections between vectors natively. VantaDB stores directed
                weighted adjacency lists in-process. Traverse the local knowledge graph via
                similarity keys without spawning network-bound Graph servers.
              </p>
              <ul className="spec-list reveal reveal-delay-3">
                {[
                  "graph_hops=2 traversal search capability.",
                  "Target weight attributes for contextual relevance.",
                  "60% less prompt token usage compared to flat memory arrays.",
                ].map((spec, sIdx) => (
                  <li key={sIdx} className="spec-item">
                    <span className="spec-check">✓</span> {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Section 3: Crash-Safe Durability ── */}
        <section className="engine-section">
          <div className="engine-grid">
            <div>
              <span className="section-eyebrow reveal">Modalidad 03</span>
              <h2
                className="section-title reveal reveal-delay-1 section-title--compact"
              >
                Durability: WAL + CRC32C Verification
              </h2>
              <p className="section-sub reveal reveal-delay-2 section-sub--mb-sm">
                VantaDB guarantees ACID durability levels by forcing log flushes inside the
                Write-Ahead Log (WAL) before returning write confirmations. A checksum validation
                prevents corrupted sectors from reading into runtime indexes.
              </p>
              <ul className="spec-list reveal reveal-delay-3">
                {[
                  "Fsync enabled block transactions.",
                  "Automatic WAL replay integrity verification on engine.open().",
                  "Heavy certification testing validation suites.",
                ].map((spec, sIdx) => (
                  <li key={sIdx} className="spec-item">
                    <span className="spec-check">✓</span> {spec}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal reveal-delay-2">
              <WALSimulator />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
