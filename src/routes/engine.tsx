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
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
      }}
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
    <svg viewBox="0 0 540 330" style={{ width: "100%", height: "auto" }}>
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
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={
            isEdgeHighlighted(a, b)
              ? "rgba(255,106,0,0.8)"
              : "rgba(255,106,0,0.18)"
          }
          strokeWidth={isEdgeHighlighted(a, b) ? "2" : "1"}
          style={{ transition: "stroke 200ms, stroke-width 200ms" }}
        />
      ))}
      {nodes.map((n, i) => (
        <g
          key={i}
          onMouseEnter={() => setActiveNode(i)}
          onMouseLeave={() => setActiveNode(null)}
          style={{ cursor: "pointer" }}
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
            cx={n.x}
            cy={n.y}
            r={n.size}
            fill="rgba(255,106,0,0.08)"
            stroke={activeNode === i ? "var(--amber)" : "rgba(255,106,0,0.4)"}
            strokeWidth="1"
            style={{ transition: "stroke 200ms" }}
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
    <div style={{ background: "var(--surface)", border: "1px solid rgba(255,106,0,0.08)", borderRadius: "var(--radius-lg)", padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: engineState === "ready" ? "#28c840" : engineState === "crashed" ? "#ff5f57" : "#ffc107", boxShadow: `0 0 10px ${engineState === "ready" ? "#28c840" : engineState === "crashed" ? "#ff5f57" : "#ffc107"}` }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--white)", textTransform: "uppercase" }}>
            ENGINE STATUS: {engineState}
          </span>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            className="btn-ghost"
            style={{ fontSize: "0.7rem", padding: "0.4rem 0.8rem", color: engineState === "ready" ? "var(--crimson)" : "var(--steel)", borderColor: engineState === "ready" ? "rgba(220,20,60,0.2)" : "rgba(255,255,255,0.05)" }}
            onClick={triggerCrash}
            disabled={engineState !== "ready"}
          >
            CRASH ENGINE
          </button>
          <button
            className="btn-primary"
            style={{ fontSize: "0.7rem", padding: "0.4rem 0.8rem" }}
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
            className="wal-log-entry"
            style={{
              color: log.includes("!!!")
                ? "#ff5f57"
                : log.includes("STATUS: READY") || log.includes("OK")
                  ? "#28c840"
                  : log.includes("RECOVER")
                    ? "var(--amber)"
                    : "var(--frost)",
              fontWeight: log.includes("!!!") || log.includes("STATUS") ? 600 : 400,
            }}
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1rem" }}>
        <h4 style={{ fontFamily: "var(--font-display)", color: "var(--white)", margin: 0, fontSize: "1.1rem" }}>
          Interactive Reciprocal Rank Fusion (RRF) Planner
        </h4>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--amber)" }}>
          PLANNER LATENCY: {queryLatency}ms
        </span>
      </div>
      <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: "0 0 1.5rem" }}>
        Adjust the slider to balance lexical matching (BM25) and vector embedding similarity (HNSW). VantaDB fuses both signals dynamically.
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--steel)" }}>
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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginTop: "1.5rem" }}>
        <div style={{ background: "rgba(0,0,0,0.2)", padding: "1rem", borderRadius: "var(--radius-md)", border: "1px solid rgba(255,255,255,0.03)" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--steel)", marginBottom: "0.25rem" }}>LEXICAL RECALL</div>
          <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--white)" }}>{lexicalRecall}%</div>
        </div>
        <div style={{ background: "rgba(0,0,0,0.2)", padding: "1rem", borderRadius: "var(--radius-md)", border: "1px solid rgba(255,255,255,0.03)" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--steel)", marginBottom: "0.25rem" }}>VECTOR RECALL</div>
          <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--white)" }}>{vectorRecall}%</div>
        </div>
        <div style={{ background: "var(--amber-dim)", padding: "1rem", borderRadius: "var(--radius-md)", border: "1px solid rgba(255,106,0,0.15)" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--amber-soft)", marginBottom: "0.25rem" }}>FUSED RECALL@10</div>
          <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--amber)" }}>{fusedRecall}%</div>
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
    <div style={{ background: "var(--background)", minHeight: "100vh" }}>
      <header className="page-header-extended">
        <span className="section-eyebrow reveal">// Core Engine</span>
        <h1 className="title-accent reveal reveal-delay-1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, letterSpacing: "-0.04em", margin: "0.5rem 0 1.5rem" }}>
          Four modalities.<br />One atomic contract.
        </h1>
        <p className="section-sub reveal reveal-delay-2" style={{ maxWidth: "680px", margin: 0 }}>
          VantaDB consolidates lexical matching, HNSW vector search, Graph traversal nodes and transactional persistence in a zero-dependency Rust local-first library database.
        </p>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(1.5rem, 5vw, 4rem) 8rem" }}>
        
        {/* ── Section 1: BM25 + HNSW Hybrid Search ── */}
        <section style={{ padding: "6rem 0", borderBottom: "1px solid var(--subtle)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "6rem", alignItems: "center" }}>
            <div>
              <span className="section-eyebrow reveal">Modalidad 01</span>
              <h2 className="section-title reveal reveal-delay-1" style={{ margin: "0.5rem 0 1.5rem" }}>
                Hybrid Search with RRF Fusion
              </h2>
              <p className="section-sub reveal reveal-delay-2" style={{ marginBottom: "2rem" }}>
                VantaDB executes lexical BM25 matching and high-dimensional HNSW vector recall under a unified internal query engine framework. The fusion relies on Reciprocal Rank Fusion (RRF), weighting relevance dynamically.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }} className="reveal reveal-delay-3">
                {["k1=1.2, b=0.75 text tf-idf saturation configuration.", "ef_construction=200, M=16 HNSW parameters.", "Cosine, Euclidean, and Dot Product distances."].map((spec, sIdx) => (
                  <li key={sIdx} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", fontSize: "0.85rem", color: "var(--steel)" }}>
                    <span style={{ color: "var(--amber)" }}>✓</span> {spec}
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
        <section style={{ padding: "6rem 0", borderBottom: "1px solid var(--subtle)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "6rem", alignItems: "center" }}>
            <div className="reveal reveal-delay-2">
              <div style={{ background: "var(--surface)", border: "1px solid rgba(255,106,0,0.08)", padding: "2rem", borderRadius: "var(--radius-lg)" }}>
                <Scanlines />
                <GraphTopology />
              </div>
            </div>
            <div>
              <span className="section-eyebrow reveal">Modalidad 02</span>
              <h2 className="section-title reveal reveal-delay-1" style={{ margin: "0.5rem 0 1.5rem" }}>
                Graph Relations alongside vectors
              </h2>
              <p className="section-sub reveal reveal-delay-2" style={{ marginBottom: "2rem" }}>
                Establish semantic connections between vectors natively. VantaDB stores directed weighted adjacency lists in-process. Traverse the local knowledge graph via similarity keys without spawning network-bound Graph servers.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }} className="reveal reveal-delay-3">
                {["graph_hops=2 traversal search capability.", "Target weight attributes for contextual relevance.", "60% less prompt token usage compared to flat memory arrays."].map((spec, sIdx) => (
                  <li key={sIdx} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", fontSize: "0.85rem", color: "var(--steel)" }}>
                    <span style={{ color: "var(--amber)" }}>✓</span> {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Section 3: Crash-Safe Durability ── */}
        <section style={{ padding: "6rem 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "6rem", alignItems: "center" }}>
            <div>
              <span className="section-eyebrow reveal">Modalidad 03</span>
              <h2 className="section-title reveal reveal-delay-1" style={{ margin: "0.5rem 0 1.5rem" }}>
                Durability: WAL + CRC32C Verification
              </h2>
              <p className="section-sub reveal reveal-delay-2" style={{ marginBottom: "2rem" }}>
                VantaDB guarantees ACID durability levels by forcing log flushes inside the Write-Ahead Log (WAL) before returning write confirmations. A checksum validation prevents corrupted sectors from reading into runtime indexes.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }} className="reveal reveal-delay-3">
                {["Fsync enabled block transactions.", "Automatic WAL replay integrity verification on engine.open().", "Heavy certification testing validation suites."].map((spec, sIdx) => (
                  <li key={sIdx} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", fontSize: "0.85rem", color: "var(--steel)" }}>
                    <span style={{ color: "var(--amber)" }}>✓</span> {spec}
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
