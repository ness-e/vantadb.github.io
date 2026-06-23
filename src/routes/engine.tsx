import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { HeroSubpage } from "@/components/HeroSubpage";
import { ScrollStory } from "@/components/ScrollStory";

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
    [0, 1], [0, 3], [0, 2], [1, 4], [2, 4],
    [2, 5], [3, 6], [4, 7], [1, 7], [2, 6],
  ];

  const isEdgeHighlighted = (a: number, b: number) => {
    if (activeNode === null) return false;
    return a === activeNode || b === activeNode;
  };

  return (
    <svg viewBox="0 0 540 330" className="graph-topology-svg">
      <defs>
        <radialGradient id="ng" r="50%">
          <stop offset="0%" stopColor="#8B9EB7" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#8B9EB7" stopOpacity="0" />
        </radialGradient>
        <filter id="ng2">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          className="graph-edge"
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke={isEdgeHighlighted(a, b) ? "rgba(139,158,183,0.8)" : "rgba(139,158,183,0.18)"}
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
            cx={n.x} cy={n.y} r={n.size * 3.5}
            fill="url(#ng)" filter="url(#ng2)"
            opacity={activeNode === i ? 1 : 0.6}
          />
          <circle
            className="graph-node-ring"
            cx={n.x} cy={n.y} r={n.size}
            fill="rgba(139,158,183,0.08)"
            stroke={activeNode === i ? "var(--steel)" : "rgba(139,158,183,0.4)"}
            strokeWidth="1"
          />
          <circle cx={n.x} cy={n.y} r={n.size * 0.45} fill="#FF6A00" />
          <text
            x={n.x} y={n.y - n.size - 5}
            textAnchor="middle"
            fill={activeNode === i ? "var(--foreground)" : "rgba(0,0,0,0.18)"}
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

// ── Interactive RRF Weights Slider Component ───────────────────────────────────
function RRFWeightsSlider() {
  const [bm25Weight, setBm25Weight] = useState(50);
  const hnswWeight = 100 - bm25Weight;

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
        type="range" min="0" max="100"
        value={bm25Weight}
        onChange={(e) => setBm25Weight(Number(e.target.value))}
        className="rrf-slider"
      />

      <div className="rrf-metrics-grid">
        <div className="rrf-metric-card">
          <div className="rrf-metric-label">LEXICAL RECALL</div>
          <div className="rrf-metric-value">{lexicalRecall}%</div>
        </div>
        <div className="rrf-metric-card">
          <div className="rrf-metric-label">VECTOR RECALL</div>
          <div className="rrf-metric-value">{vectorRecall}%</div>
        </div>
        <div className="rrf-metric-card--amber">
          <div className="rrf-metric-label--amber">FUSED RECALL@10</div>
          <div className="rrf-metric-value--amber">{fusedRecall}%</div>
        </div>
      </div>
    </div>
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
          <div className="wal-status-dot" data-state={engineState} />
          <span className="wal-status-label">ENGINE STATUS: {engineState}</span>
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
          <div key={idx} className={`wal-log-entry ${getLogClass(log)}`}>
            {log}
          </div>
        ))}
        <div ref={consoleEndRef} />
      </div>
    </div>
  );
}

// ── Architecture Pipeline Component ────────────────────────────────────────────
function ArchitecturePipeline() {
  const stages = [
    { name: "Query", desc: "Parser & tokenizer", color: "var(--amber)" },
    { name: "BM25", desc: "Lexical scoring", color: "var(--frost)" },
    { name: "HNSW", desc: "Vector recall", color: "var(--steel)" },
    { name: "RRF", desc: "Fusion ranker", color: "var(--amber)" },
    { name: "GraphRAG", desc: "Traversal", color: "var(--frost)" },
    { name: "WAL", desc: "Persist", color: "var(--steel)" },
  ];

  return (
    <section className="engine-section reveal">
      <span className="section-eyebrow reveal">Pipeline</span>
      <h2 className="section-title reveal reveal-delay-1">
        End-to-End Engine Architecture
      </h2>
      <p className="section-sub reveal reveal-delay-2 section-sub--mb-sm">
        Every query flows through a unified pipeline — from lexical parsing through
        vector recall, fusion ranking, graph traversal, and finally durable persistence.
      </p>
      <div className="tactile-card reveal reveal-delay-3" style={{ padding: "2rem 1.5rem", overflowX: "auto" }}>
        <div className="arch-pipeline-track">
          {stages.map((s, i) => (
            <div key={s.name} className="arch-pipeline-stage">
              <div className="arch-pipeline-node" style={{ borderColor: s.color }}>
                <div className="arch-pipeline-name">{s.name}</div>
                <div className="arch-pipeline-desc">{s.desc}</div>
              </div>
              {i < stages.length - 1 && (
                <svg className="arch-pipeline-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14m-4-4l4 4-4 4" stroke="var(--subtle)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Main Page Component ────────────────────────────────────────────────────────
function EnginePage() {
  useScrollReveal();

  const hybridPanels = [
    {
      id: "bm25",
      content: (
        <div className="ss-panel-inner" style={{ maxWidth: 640 }}>
          <span className="section-eyebrow">01 — LEXICAL</span>
          <h2 className="ss-title" style={{ fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1rem" }}>BM25 Text Search</h2>
          <p className="ss-desc" style={{ fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 560 }}>
            Full-text lexical search at 1.2ms p99 with 100% recall. Zero infrastructure, one pip install.
          </p>
          <div className="ss-metrics" style={{ display: "flex", gap: "2.5rem" }}>
            <div className="ss-metric">
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--amber)" }}>1.2ms</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--steel)", display: "block" }}>p99 latency</span>
            </div>
            <div className="ss-metric">
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--amber)" }}>100%</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--steel)", display: "block" }}>recall</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "hnsw",
      content: (
        <div className="ss-panel-inner" style={{ maxWidth: 640 }}>
          <span className="section-eyebrow">02 — VECTOR</span>
          <h2 className="ss-title" style={{ fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1rem" }}>HNSW Vector Recall</h2>
          <p className="ss-desc" style={{ fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 560 }}>
            Hierarchical Navigable Small World graphs for sub-50ms approximate nearest neighbor search across 10M+ vectors.
          </p>
          <div className="ss-metrics" style={{ display: "flex", gap: "2.5rem" }}>
            <div className="ss-metric">
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--amber)" }}>M=16</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--steel)", display: "block" }}>connections/node</span>
            </div>
            <div className="ss-metric">
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--amber)" }}>Cosine</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--steel)", display: "block" }}>distance metric</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "rrf",
      content: (
        <div className="ss-panel-inner" style={{ maxWidth: 640 }}>
          <span className="section-eyebrow">03 — FUSION</span>
          <h2 className="ss-title" style={{ fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1rem" }}>RRF Scoring</h2>
          <p className="ss-desc" style={{ fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 560 }}>
            Reciprocal Rank Fusion combines BM25 and HNSW rankings into a single relevance score with dynamic weight tuning.
          </p>
          <div className="ss-metrics" style={{ display: "flex", gap: "2.5rem" }}>
            <div className="ss-metric">
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--amber)" }}>2-in-1</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--steel)", display: "block" }}>search modes</span>
            </div>
            <div className="ss-metric">
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--amber)" }}>98%</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--steel)", display: "block" }}>fused recall@10</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const durabilityPanels = [
    {
      id: "wal-journal",
      content: (
        <div className="ss-panel-inner" style={{ maxWidth: 640 }}>
          <span className="section-eyebrow">01 — PERSISTENCE</span>
          <h2 className="ss-title" style={{ fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1rem" }}>WAL Journal</h2>
          <p className="ss-desc" style={{ fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 560 }}>
            Append-only write-ahead log with CRC32C checksumming. Every mutation is fsynced before acknowledgment — zero data loss on power failure.
          </p>
          <div className="ss-metrics" style={{ display: "flex", gap: "2.5rem" }}>
            <div className="ss-metric">
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--amber)" }}>CRC32C</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--steel)", display: "block" }}>integrity check</span>
            </div>
            <div className="ss-metric">
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--amber)" }}>fsync</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--steel)", display: "block" }}>on every write</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "crash-recovery",
      content: (
        <div className="ss-panel-inner" style={{ maxWidth: 640 }}>
          <span className="section-eyebrow">02 — RESILIENCE</span>
          <h2 className="ss-title" style={{ fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1rem" }}>Crash Recovery</h2>
          <p className="ss-desc" style={{ fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 560 }}>
            Automatic WAL replay on engine.open(). Checksum verification catches corruption before it reaches runtime indexes. Recovery completes in under 1ms.
          </p>
          <div className="ss-metrics" style={{ display: "flex", gap: "2.5rem" }}>
            <div className="ss-metric">
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--amber)" }}>&lt;1ms</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--steel)", display: "block" }}>recovery time</span>
            </div>
            <div className="ss-metric">
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--amber)" }}>Auto</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--steel)", display: "block" }}>replay on open</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <HeroSubpage
        eyebrow="// Core Engine"
        title="Four modalities. One atomic contract."
        subtitle="VantaDB consolidates lexical matching, HNSW vector search, Graph traversal nodes and transactional persistence in a zero-dependency Rust local-first library database."
      />

      <main className="main-content">
        {/* Story 1: Hybrid Search — BM25 / HNSW / RRF */}
        <ScrollStory id="hybrid-search" panels={hybridPanels} />

        {/* Interactive demos: Graph Topology + RRF Slider */}
        <section className="engine-section engine-section--bordered">
          <div className="engine-grid">
            <div>
              <span className="section-eyebrow reveal">Interactive</span>
              <h2 className="section-title reveal reveal-delay-1 section-title--compact">
                Graph Topology
              </h2>
              <p className="section-sub reveal reveal-delay-2 section-sub--mb-sm">
                Hover nodes to explore the live knowledge graph. VantaDB stores directed weighted adjacency lists in-process — no external Graph servers required.
              </p>
              <ul className="spec-list reveal reveal-delay-3">
                {[
                  "graph_hops=2 traversal search capability.",
                  "Target weight attributes for contextual relevance.",
                  "60% less prompt token usage vs flat memory arrays.",
                ].map((spec, sIdx) => (
                  <li key={sIdx} className="spec-item">
                    <span className="spec-check">✓</span> {spec}
                  </li>
                ))}
              </ul>
            </div>
            <div className="tactile-card reveal reveal-delay-2" style={{ padding: "1.5rem" }}>
              <GraphTopology />
            </div>
          </div>
        </section>

        <section className="engine-section engine-section--bordered">
          <div className="engine-grid--reverse">
            <div className="tactile-card reveal reveal-delay-2" style={{ padding: "1.5rem" }}>
              <RRFWeightsSlider />
            </div>
            <div>
              <span className="section-eyebrow reveal">Interactive</span>
              <h2 className="section-title reveal reveal-delay-1 section-title--compact">
                Tune RRF Fusion Weights
              </h2>
              <p className="section-sub reveal reveal-delay-2 section-sub--mb-sm">
                Drag the slider to balance BM25 lexical weight against HNSW vector similarity. The RRF planner recomputes fused recall in real time.
              </p>
              <ul className="spec-list reveal reveal-delay-3">
                {[
                  "k1=1.2, b=0.75 text tf-idf saturation.",
                  "ef_construction=200, M=16 HNSW params.",
                  "Cosine, Euclidean, and Dot Product distances.",
                ].map((spec, sIdx) => (
                  <li key={sIdx} className="spec-item">
                    <span className="spec-check">✓</span> {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Story 2: Durability — WAL Journal / Crash Recovery */}
        <ScrollStory id="durability" panels={durabilityPanels} />

        {/* WAL Simulator */}
        <section className="engine-section">
          <div className="engine-grid--reverse">
            <div className="tactile-card reveal reveal-delay-2" style={{ padding: "1.5rem" }}>
              <WALSimulator />
            </div>
            <div>
              <span className="section-eyebrow reveal">Interactive</span>
              <h2 className="section-title reveal reveal-delay-1 section-title--compact">
                Durability: WAL + CRC32C Verification
              </h2>
              <p className="section-sub reveal reveal-delay-2 section-sub--mb-sm">
                VantaDB guarantees ACID durability by forcing log flushes inside the Write-Ahead Log before returning write confirmations. Checksum validation prevents corrupted sectors from reaching runtime indexes.
              </p>
              <ul className="spec-list reveal reveal-delay-3">
                {[
                  "Fsync enabled block transactions.",
                  "Automatic WAL replay on engine.open().",
                  "Heavy certification testing validation suites.",
                ].map((spec, sIdx) => (
                  <li key={sIdx} className="spec-item">
                    <span className="spec-check">✓</span> {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Architecture Pipeline */}
        <ArchitecturePipeline />
      </main>

      <style>{`
        .arch-pipeline-track {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          min-width: max-content;
          padding: 1rem 0;
        }
        .arch-pipeline-stage {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .arch-pipeline-node {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 0.75rem 1.25rem;
          text-align: center;
          min-width: 80px;
          transition: border-color 150ms linear;
        }
        .arch-pipeline-node:hover {
          border-color: var(--amber);
        }
        .arch-pipeline-name {
          font-family: var(--font-display);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--foreground);
          letter-spacing: -0.03em;
        }
        .arch-pipeline-desc {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--muted);
          margin-top: 0.25rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .arch-pipeline-arrow {
          flex-shrink: 0;
        }
        .ss-metric span {
          display: block;
        }
        @media (max-width: 768px) {
          .arch-pipeline-track {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
