import { createFileRoute } from "@tanstack/react-router";
import { SingularityHero } from "@/components/SingularityHero";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VantaDB — Where Context Never Escapes" },
      { name: "description", content: "Embedded Rust engine for AI agents. Hybrid search via BM25 + HNSW, GraphRAG, crash-safe WAL durability. Zero servers, one pip install." },
    ],
  }),
  component: Landing,
});

// ── Scroll reveal ──────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("is-visible"); }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ── Counter animation ─────────────────────────────────────────────────────────
function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started || !ref.current) return;
    const duration = 1600;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      const val = (to * ease).toFixed(decimals);
      if (ref.current) ref.current.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, to, suffix, decimals]);
  return <span ref={ref}>0{suffix}</span>;
}

// ── Typewriter ────────────────────────────────────────────────────────────────
function Typewriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let i = 0;
      setTimeout(() => {
        const id = setInterval(() => {
          if (ref.current) ref.current.textContent = text.slice(0, i + 1);
          i++;
          if (i >= text.length) clearInterval(id);
        }, 38);
      }, delay);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [text, delay]);
  return <span ref={ref} style={{ fontFamily: "var(--font-mono)" }}></span>;
}

// ── Animated SVG data flow ────────────────────────────────────────────────────
function DataFlowSVG() {
  return (
    <svg viewBox="0 0 900 320" style={{ width: "100%", height: "auto", overflow: "visible" }}>
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6A00" stopOpacity="0" />
          <stop offset="50%" stopColor="#FF6A00" stopOpacity="1" />
          <stop offset="100%" stopColor="#FF6A00" stopOpacity="0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Layer labels */}
      {[
        { x: 60, label: "Python SDK", sub: "vantadb_py" },
        { x: 240, label: "PyO3 Bindings", sub: "src/sdk.rs" },
        { x: 420, label: "Query Planner", sub: "BM25 · HNSW · RRF" },
        { x: 600, label: "Storage Engine", sub: "Fjall + WAL" },
        { x: 780, label: "HNSW Index", sub: "Cosine · M,ef" },
      ].map((layer, i) => (
        <g key={i} style={{ animation: `layerIn 0.5s ease-out ${i * 0.12}s both` }}>
          {/* Vertical line */}
          <line x1={layer.x + 30} y1="60" x2={layer.x + 30} y2="240"
            stroke="rgba(255,106,0,0.12)" strokeWidth="1" strokeDasharray="4 4" />
          {/* Node */}
          <circle cx={layer.x + 30} cy="160" r="18"
            fill="rgba(255,106,0,0.08)" stroke="rgba(255,106,0,0.4)" strokeWidth="1"
            filter="url(#glow)" />
          <circle cx={layer.x + 30} cy="160" r="6" fill="#FF6A00" />
          {/* Label */}
          <text x={layer.x + 30} y="42" textAnchor="middle" fill="rgba(230,224,240,0.7)"
            fontSize="11" fontFamily="'Syne', sans-serif" fontWeight="700">{layer.label}</text>
          <text x={layer.x + 30} y="58" textAnchor="middle" fill="rgba(255,106,0,0.6)"
            fontSize="9" fontFamily="'JetBrains Mono', monospace">{layer.sub}</text>
        </g>
      ))}

      {/* Horizontal connection lines */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <line x1={90 + i * 180} y1="160" x2={240 + i * 180} y2="160"
            stroke="rgba(255,106,0,0.15)" strokeWidth="1" />
          {/* Animated packet */}
          <circle r="4" fill="#FF6A00" filter="url(#glow)" opacity="0.9">
            <animateMotion dur={`${1.2 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.4}s`}>
              <mpath>
                <path d={`M ${90 + i * 180} 160 L ${240 + i * 180} 160`} />
              </mpath>
            </animateMotion>
          </circle>
        </g>
      ))}

      {/* Bottom description */}
      {[
        { x: 90, text: "call" },
        { x: 270, text: "FFI" },
        { x: 450, text: "plan" },
        { x: 630, text: "write" },
      ].map((t, i) => (
        <text key={i} x={t.x} y="210" textAnchor="middle" fill="rgba(255,106,0,0.35)"
          fontSize="8" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.1em">
          {t.text}
        </text>
      ))}

      <style>{`
        @keyframes layerIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </svg>
  );
}

// ── Orbit rings decorative ─────────────────────────────────────────────────────
function OrbitRings() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", right: "-80px", top: "50%", transform: "translateY(-50%)", width: "500px", height: "500px", pointerEvents: "none", zIndex: 0 }}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{
          position: "absolute", inset: `${i * 55}px`,
          border: `1px solid rgba(255,106,0,${0.08 - i * 0.015})`,
          borderRadius: "50%",
          animation: `spin ${18 + i * 7}s linear infinite ${i % 2 === 0 ? "" : "reverse"}`,
        }} />
      ))}
      <div style={{
        position: "absolute", inset: "50%", transform: "translate(-50%,-50%)",
        width: "16px", height: "16px",
        background: "#FF6A00", borderRadius: "50%",
        boxShadow: "0 0 30px rgba(255,106,0,0.8)",
      }} />
    </div>
  );
}

// ── Scanline overlay ───────────────────────────────────────────────────────────
function Scanlines() {
  return (
    <div aria-hidden="true" style={{
      position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
    }} />
  );
}

// ── Feature row (alternating fullwidth) ───────────────────────────────────────
function FeatureRow({ num, title, desc, tag, reverse = false, visual }: {
  num: string; title: string; desc: string; tag: string; reverse?: boolean; visual: React.ReactNode;
}) {
  return (
    <div className="feature-row reveal" style={{
      display: "grid",
      gridTemplateColumns: reverse ? "1fr 1fr" : "1fr 1fr",
      gap: "clamp(3rem, 6vw, 8rem)",
      alignItems: "center",
      direction: reverse ? "rtl" : "ltr",
    }}>
      <div style={{ direction: "ltr" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "1.5rem" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "5rem", fontWeight: 800, color: "rgba(255,106,0,0.08)", lineHeight: 1, letterSpacing: "-0.05em" }}>{num}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--amber)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{tag}</span>
        </div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, color: "var(--white)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.25rem" }}
          dangerouslySetInnerHTML={{ __html: title }} />
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.75, fontWeight: 300, maxWidth: "480px" }}>{desc}</p>
      </div>
      <div style={{ direction: "ltr" }}>{visual}</div>
    </div>
  );
}

// ── Terminal block ─────────────────────────────────────────────────────────────
function TerminalBlock() {
  return (
    <div className="terminal-window" style={{ boxShadow: "0 60px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,106,0,0.08), inset 0 1px 0 rgba(255,106,0,0.1)" }}>
      <div className="terminal-header">
        <div className="term-dot term-dot-red" /><div className="term-dot term-dot-yellow" /><div className="term-dot term-dot-green" />
        <span className="terminal-title">agent_memory.py — vanta_data/</span>
      </div>
      <div className="terminal-body">
        <div><span className="term-amber">$</span> <span className="term-white">pip install vantadb-py</span></div>
        <div style={{ color: "rgba(230,224,240,0.25)", fontSize: "0.72rem", paddingLeft: "1rem" }}>✓ Installing vantadb-py-0.1.0 · wheels for win/mac/linux</div>
        <div style={{ height: "0.75rem" }} />
        <div><span className="term-keyword">import</span> <span className="term-white">vantadb_py</span> <span className="term-keyword">as</span> <span className="term-white">vantadb</span></div>
        <div style={{ height: "0.25rem" }} />
        <div><span className="term-func">db</span><span className="term-white"> = vantadb.</span><span className="term-amber">VantaDB</span><span className="term-white">(</span><span className="term-string">"./vanta_data"</span><span className="term-white">)</span></div>
        <div style={{ height: "0.25rem" }} />
        <div><span className="term-func">db</span><span className="term-white">.</span><span className="term-amber">put</span><span className="term-white">(</span><span className="term-string">"agent/main"</span><span className="term-white">, </span><span className="term-string">"mem-001"</span><span className="term-white">,</span></div>
        <div style={{ paddingLeft: "1.5rem" }}><span className="term-string">"User prefers dark mode"</span><span className="term-white">,</span></div>
        <div style={{ paddingLeft: "1.5rem" }}><span className="term-func">vector</span><span className="term-white">=[</span><span className="term-bool">0.12</span><span className="term-white">, </span><span className="term-bool">0.88</span><span className="term-white">, </span><span className="term-bool">0.54</span><span className="term-white">])</span></div>
        <div style={{ height: "0.25rem" }} />
        <div><span className="term-func">hits</span><span className="term-white"> = db.</span><span className="term-amber">search_memory</span><span className="term-white">(</span><span className="term-string">"agent/main"</span><span className="term-white">,</span></div>
        <div style={{ paddingLeft: "1.5rem" }}><span className="term-func">vector</span><span className="term-white">=[</span><span className="term-bool">0.11</span><span className="term-white">, </span><span className="term-bool">0.89</span><span className="term-white">, </span><span className="term-bool">0.55</span><span className="term-white">], top_k=</span><span className="term-bool">5</span><span className="term-white">)</span></div>
        <div style={{ height: "0.5rem" }} />
        <div style={{ borderTop: "1px solid rgba(255,106,0,0.1)", paddingTop: "0.5rem" }}>
          <span className="term-amber">→</span> <span className="term-string">"mem-001"</span><span className="term-muted"> score=</span><span className="term-bool">0.987</span><span className="term-muted"> latency=</span><span className="term-amber">1.2ms</span><span className="term-cursor" />
        </div>
      </div>
    </div>
  );
}

// ── Architecture visual ────────────────────────────────────────────────────────
function ArchVisual() {
  const layers = [
    { label: "Python SDK", color: "#FF6A00", sub: "vantadb.put() / search() / get()" },
    { label: "PyO3 Bindings", color: "#E05A00", sub: "src/sdk.rs — stable FFI boundary" },
    { label: "Query Planner", color: "#C44A00", sub: "BM25 + HNSW + RRF routing" },
    { label: "Fjall Storage", color: "#A83A00", sub: "WAL + fsync + CRC32C" },
    { label: "HNSW Index", color: "#8C2A00", sub: "Cosine · M · ef_construction" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3px", position: "relative" }}>
      {layers.map((l, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: "1rem",
          padding: "0.875rem 1.25rem",
          background: `rgba(255,106,0,${0.04 + (4 - i) * 0.015})`,
          border: `1px solid rgba(255,106,0,${0.08 + (4 - i) * 0.02})`,
          borderRadius: "6px",
          animation: `layerSlide 0.5s ease-out ${i * 0.08}s both`,
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", left: 0, top: 0, bottom: 0,
            width: "3px",
            background: l.color,
            opacity: 0.6,
          }} />
          <div style={{ flex: 1, paddingLeft: "0.5rem" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 700, color: "var(--white)", letterSpacing: "-0.01em" }}>{l.label}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "rgba(255,106,0,0.6)", marginTop: "0.15rem", letterSpacing: "0.05em" }}>{l.sub}</div>
          </div>
          {/* Animated ping when in view */}
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: l.color, boxShadow: `0 0 8px ${l.color}`, animation: `ping ${1.5 + i * 0.3}s ease-in-out infinite alternate` }} />
        </div>
      ))}
      <style>{`
        @keyframes layerSlide { from { opacity:0; transform:translateX(-16px); } to { opacity:1; transform:translateX(0); } }
        @keyframes ping { from { opacity:0.3; transform:scale(0.8); } to { opacity:1; transform:scale(1.2); } }
      `}</style>
    </div>
  );
}

// ── Graph topology ─────────────────────────────────────────────────────────────
function GraphTopology() {
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
  const edges = [[0,1],[0,3],[0,2],[1,4],[2,4],[2,5],[3,6],[4,7],[1,7],[2,6]];

  return (
    <svg viewBox="0 0 540 330" style={{ width: "100%", height: "auto" }}>
      <defs>
        <radialGradient id="ng" r="50%">
          <stop offset="0%" stopColor="#FF6A00" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FF6A00" stopOpacity="0" />
        </radialGradient>
        <filter id="ng2"><feGaussianBlur stdDeviation="4" /></filter>
      </defs>
      {edges.map(([a,b],i) => (
        <line key={i}
          x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke="rgba(255,106,0,0.18)" strokeWidth="1"
          style={{ animation: `efade 0.5s ease-out ${0.3+i*0.06}s both` }}
        />
      ))}
      {/* Animated data packet on random edge */}
      <circle r="3" fill="#FF6A00" opacity="0.9">
        <animateMotion dur="2.5s" repeatCount="indefinite" begin="0.5s">
          <mpath><path d={`M ${nodes[0].x} ${nodes[0].y} L ${nodes[1].x} ${nodes[1].y} L ${nodes[4].x} ${nodes[4].y} L ${nodes[7].x} ${nodes[7].y}`} /></mpath>
        </animateMotion>
      </circle>
      <circle r="3" fill="#FFC107" opacity="0.7">
        <animateMotion dur="3.2s" repeatCount="indefinite" begin="1.2s">
          <mpath><path d={`M ${nodes[3].x} ${nodes[3].y} L ${nodes[0].x} ${nodes[0].y} L ${nodes[2].x} ${nodes[2].y} L ${nodes[5].x} ${nodes[5].y}`} /></mpath>
        </animateMotion>
      </circle>
      {nodes.map((n,i) => (
        <g key={i} style={{ animation: `nfade 0.4s ease-out ${i*0.07}s both` }}>
          <circle cx={n.x} cy={n.y} r={n.size*3.5} fill="url(#ng)" filter="url(#ng2)" />
          <circle cx={n.x} cy={n.y} r={n.size} fill="rgba(255,106,0,0.08)" stroke="rgba(255,106,0,0.4)" strokeWidth="1" />
          <circle cx={n.x} cy={n.y} r={n.size * 0.45} fill="#FF6A00" />
          <text x={n.x} y={n.y - n.size - 5} textAnchor="middle" fill="rgba(230,224,240,0.4)" fontSize="8" fontFamily="'JetBrains Mono',monospace">{n.label}</text>
        </g>
      ))}
      <style>{`
        @keyframes nfade { from { opacity:0; transform:scale(0.5); } to { opacity:1; transform:scale(1); } }
        @keyframes efade { from { opacity:0; } to { opacity:1; } }
      `}</style>
    </svg>
  );
}

// ── Main Landing ───────────────────────────────────────────────────────────────
function Landing() {
  useReveal();

  return (
    <>
      <style>{`
        html, body { overflow: auto !important; touch-action: auto !important; user-select: auto !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideInUp { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeInLeft { from { opacity:0; transform:translateX(-24px); } to { opacity:1; transform:translateX(0); } }
        @keyframes drawLine { from { stroke-dashoffset: 1000; } to { stroke-dashoffset: 0; } }
        @keyframes floatUp { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }

        .reveal { opacity:0; transform:translateY(24px); transition: opacity 0.75s cubic-bezier(0.23,1,0.32,1), transform 0.75s cubic-bezier(0.23,1,0.32,1); }
        .reveal.is-visible { opacity:1; transform:translateY(0); }
        .reveal-delay-1 { transition-delay:0.07s; }
        .reveal-delay-2 { transition-delay:0.15s; }
        .reveal-delay-3 { transition-delay:0.23s; }
        .reveal-delay-4 { transition-delay:0.31s; }

        .feature-row { margin-bottom: 7rem; }

        /* Hover link underline draw */
        .draw-link { position:relative; display:inline-block; }
        .draw-link::after { content:''; position:absolute; bottom:-2px; left:0; right:100%; height:1px; background:var(--amber); transition:right 250ms cubic-bezier(0.23,1,0.32,1); }
        .draw-link:hover::after { right:0; }
      `}</style>

      {/* Nav */}
      <nav className="vanta-nav">
        <div className="vanta-logo">
          <div className="vanta-logo-icon" />
          Vanta<span>DB</span>
        </div>
        <ul className="nav-links">
          <li><a href="#quickstart" className="draw-link">Quickstart</a></li>
          <li><a href="#engine" className="draw-link">Engine</a></li>
          <li><a href="#architecture" className="draw-link">Architecture</a></li>
          <li><a href="#use-cases" className="draw-link">Use Cases</a></li>
        </ul>
        <a href="https://github.com/ness-e/Vantadb" target="_blank" rel="noopener" className="nav-cta">GitHub ↗</a>
      </nav>

      {/* Hero */}
      <SingularityHero />

      <main className="page-content">

        {/* ── METRICS — animated counters ───────────────────────── */}
        <div style={{ borderBottom: "1px solid var(--subtle)", borderTop: "1px solid var(--subtle)", position: "relative", overflow: "hidden" }}>
          <Scanlines />
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(1.5rem,5vw,4rem)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "var(--subtle)" }}>
            {[
              { label: "Search latency", value: 1.2, suffix: "ms", decimals: 1 },
              { label: "Recall@10", value: 100, suffix: "%", decimals: 0 },
              { label: "External services", value: 0, suffix: "", decimals: 0 },
              { label: "Lines of config", value: 0, suffix: "", decimals: 0 },
            ].map((m, i) => (
              <div key={i} className="reveal" style={{ background: "var(--background)", padding: "2.5rem 2rem", position: "relative", overflow: "hidden" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", fontWeight: 800, color: "var(--amber)", letterSpacing: "-0.05em", lineHeight: 1, marginBottom: "0.5rem" }}>
                  <Counter to={m.value} suffix={m.suffix} decimals={m.decimals} />
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── QUICKSTART ──────────────────────────────────────────── */}
        <section id="quickstart" style={{ padding: "8rem clamp(1.5rem,5vw,4rem)", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "6rem", alignItems: "center" }}>
            <div>
              <span className="section-eyebrow reveal">// Quickstart</span>
              <h2 className="section-title reveal reveal-delay-1" style={{ fontSize: "clamp(2rem,4vw,3.2rem)" }}>
                From pip install<br />to hybrid search<br />
                <span style={{ color: "var(--amber)" }}>in 5 minutes.</span>
              </h2>
              <p className="section-sub reveal reveal-delay-2" style={{ marginBottom: "2.5rem" }}>
                No schema migrations. No daemon to launch. No YAML to write.
                VantaDB opens a file path and returns a live database.
              </p>
              {/* Animated steps */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }} className="reveal reveal-delay-3">
                {[
                  "pip install vantadb-py",
                  'db = vantadb.VantaDB("./data")',
                  'db.put("ns", "key", "text", vector=[...])',
                  'hits = db.search_memory("ns", vector=[...])',
                ].map((cmd, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: "1rem",
                    padding: "0.75rem 1rem",
                    borderLeft: "2px solid rgba(255,106,0,0.2)",
                    borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.03)" : "none",
                    transition: "border-left-color 200ms, background 200ms",
                    cursor: "default",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderLeftColor = "#FF6A00"; (e.currentTarget as HTMLElement).style.background = "rgba(255,106,0,0.04)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderLeftColor = "rgba(255,106,0,0.2)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "rgba(255,106,0,0.4)", minWidth: "1.5rem" }}>0{i + 1}</span>
                    <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--frost)" }}>{cmd}</code>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal reveal-delay-2">
              <TerminalBlock />
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── ENGINE — feature rows ────────────────────────────────── */}
        <section id="engine" style={{ padding: "8rem clamp(1.5rem,5vw,4rem)", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "6rem" }}>
            <span className="section-eyebrow reveal">// Core Engine</span>
            <h2 className="section-title reveal reveal-delay-1">Four memory modalities.<br /><span style={{ color: "var(--amber)" }}>One atomic contract.</span></h2>
          </div>

          {/* Feature 1 */}
          <FeatureRow
            num="01" tag="HYBRID SEARCH"
            title="BM25 + HNSW,<br/>fused via RRF."
            desc="Lexical and vector retrieval unified in a single query plan. Reciprocal Rank Fusion weighs both signals automatically. No embedding pipeline required — the engine handles indexing natively."
            visual={
              <div className="reveal reveal-delay-2" style={{ position: "relative" }}>
                <div style={{ background: "var(--surface)", border: "1px solid rgba(255,106,0,0.12)", borderRadius: "8px", padding: "2rem", position: "relative", overflow: "hidden" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", marginBottom: "1.5rem", color: "var(--amber)", letterSpacing: "0.1em" }}>FUSION WEIGHTS</div>
                  {[
                    { name: "BM25 (lexical)", value: 88, color: "#FF6A00" },
                    { name: "HNSW (vector)", value: 95, color: "#FFC107" },
                    { name: "RRF (fused)", value: 100, color: "#FF8C38" },
                  ].map((b, i) => (
                    <div key={i} style={{ marginBottom: "1.25rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem", fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--muted)" }}>
                        <span>{b.name}</span><span style={{ color: b.color }}>{b.value}%</span>
                      </div>
                      <div style={{ height: "3px", background: "rgba(255,255,255,0.05)", borderRadius: "2px", overflow: "hidden" }}>
                        <div style={{
                          height: "100%", width: "0", borderRadius: "2px",
                          background: `linear-gradient(to right, ${b.color}, rgba(255,255,255,0.3))`,
                          transition: `width 1.2s cubic-bezier(0.23,1,0.32,1) ${i * 0.15 + 0.3}s`,
                        }} className="bar-fill" data-w={b.value} />
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: "1.5rem", padding: "0.75rem 1rem", background: "rgba(255,106,0,0.06)", border: "1px solid rgba(255,106,0,0.15)", borderRadius: "6px", fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--amber)" }}>
                    → 1.2ms avg · 100% Recall@10 · Validated 10K–100K vecs
                  </div>
                </div>
              </div>
            }
          />

          {/* Feature 2 */}
          <FeatureRow
            num="02" tag="GRAPH EDGES" reverse
            title="Relations live<br/>alongside vectors."
            desc="Directed edges with optional weights stored as local adjacency lists. Traverse the knowledge graph while retrieving by similarity — GraphRAG without the infrastructure overhead."
            visual={
              <div className="reveal reveal-delay-2">
                <GraphTopology />
              </div>
            }
          />

          {/* Feature 3 */}
          <FeatureRow
            num="03" tag="DURABILITY"
            title="WAL + CRC32C.<br/>Crash-certified."
            desc="Every write hits the Write-Ahead Log with CRC32C checksum before acknowledgment. Recovery is automatic on next open. Validated by a dedicated Heavy Certification CI pipeline."
            visual={
              <div className="reveal reveal-delay-2" style={{ position: "relative" }}>
                <div style={{ background: "var(--surface)", border: "1px solid rgba(255,106,0,0.1)", borderRadius: "8px", padding: "1.75rem", fontFamily: "var(--font-mono)", fontSize: "0.75rem", lineHeight: 2, position: "relative", overflow: "hidden" }}>
                  <Scanlines />
                  {[
                    { t: "00:00:001", msg: "txn:open", col: "var(--muted)" },
                    { t: "00:00:002", msg: "wal:write key=mem-001", col: "var(--amber)" },
                    { t: "00:00:003", msg: "crc32c:verify ok", col: "#28c840" },
                    { t: "00:00:004", msg: "fsync:complete", col: "#28c840" },
                    { t: "00:00:005", msg: "txn:commit", col: "var(--amber)" },
                    { t: "CRASH", msg: "process killed", col: "#ff5f57" },
                    { t: "00:00:000", msg: "wal:replay → recovered", col: "#28c840" },
                  ].map((r, i) => (
                    <div key={i} style={{ display: "flex", gap: "1rem", animation: `slideInUp 0.3s ease-out ${i * 0.1}s both` }}>
                      <span style={{ color: r.t === "CRASH" ? "#ff5f57" : "rgba(255,106,0,0.35)", minWidth: "6rem", flexShrink: 0 }}>{r.t}</span>
                      <span style={{ color: r.col }}>{r.msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            }
          />
        </section>

        {/* ── ARCHITECTURE FLOW ─────────────────────────────────────── */}
        <section id="architecture" style={{ background: "var(--surface)", borderTop: "1px solid var(--subtle)", borderBottom: "1px solid var(--subtle)", padding: "8rem clamp(1.5rem,5vw,4rem)", position: "relative", overflow: "hidden" }}>
          <OrbitRings />
          <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <span className="section-eyebrow reveal">// Architecture</span>
            <h2 className="section-title reveal reveal-delay-1">Built different.<br /><span style={{ color: "var(--amber)" }}>Runs everywhere.</span></h2>
            <p className="section-sub reveal reveal-delay-2" style={{ marginBottom: "4rem" }}>
              Every call from Python travels a deterministic, verifiable path through Rust. No network hops. No marshaling overhead. No surprise.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
              <div className="reveal reveal-delay-1">
                <ArchVisual />
              </div>
              <div>
                <div className="reveal reveal-delay-2" style={{ marginBottom: "4rem" }}>
                  <DataFlowSVG />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="reveal reveal-delay-3">
                  {[
                    { icon: "⬡", label: "Zero-copy FFI", desc: "PyO3 passes data without heap allocation where possible" },
                    { icon: "⬡", label: "Stable boundary", desc: "sdk.rs is the only public surface — internals evolve safely" },
                    { icon: "⬡", label: "Native HNSW", desc: "M=16, ef_construction=200 — configurable per namespace" },
                    { icon: "⬡", label: "JSONL export", desc: "Full backup/restore via streaming JSONL — no binary format" },
                  ].map((f, i) => (
                    <div key={i} style={{
                      padding: "1rem",
                      border: "1px solid rgba(255,255,255,0.04)",
                      borderRadius: "6px",
                      transition: "border-color 200ms, transform 200ms cubic-bezier(0.23,1,0.32,1)",
                      cursor: "default",
                    }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,106,0,0.25)"; el.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.04)"; el.style.transform = "translateY(0)"; }}
                    >
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", fontWeight: 700, color: "var(--white)", marginBottom: "0.35rem" }}>{f.label}</div>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--muted)", lineHeight: 1.55, fontWeight: 300 }}>{f.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── USE CASES — horizontal scrolling type ─────────────────── */}
        <section id="use-cases" style={{ padding: "8rem clamp(1.5rem,5vw,4rem)", maxWidth: "1200px", margin: "0 auto" }}>
          <span className="section-eyebrow reveal">// Use Cases</span>
          <h2 className="section-title reveal reveal-delay-1">Where VantaDB<br /><span style={{ color: "var(--amber)" }}>fits perfectly.</span></h2>

          <div style={{ marginTop: "4rem", display: "flex", flexDirection: "column", gap: "0" }}>
            {[
              { num: "01", tag: "AI AGENTS", title: "Persistent Agent Memory", desc: "Store conversations, tool results, and preferences. Retrieve them in 1.2ms. Agents with memory that survives restarts." },
              { num: "02", tag: "RAG", title: "Embedded RAG Backend", desc: "Replace Pinecone for local-first RAG. BM25 + HNSW in one call, no external embedding service, no latency floor." },
              { num: "03", tag: "CODE AGENTS", title: "Codebase Intelligence", desc: "Index code chunks with vectors + AST metadata. Graph edges between functions. Hybrid search for LLM context retrieval." },
              { num: "04", tag: "EDGE / OFFLINE", title: "Offline Applications", desc: "Ship intelligent desktop tools that work fully offline. Single binary. Single file database. No infra required." },
              { num: "05", tag: "MULTI-AGENT", title: "Shared Scratchpad", desc: "Namespace-scoped records let multiple agents share one database with full isolation. Deterministic node IDs." },
              { num: "06", tag: "RESEARCH", title: "Reproducible Experiments", desc: "WAL audit trail + JSONL export. Rebuilding from canonical records at any time. Every experiment is reproducible." },
            ].map((uc, i) => (
              <div key={i} className="reveal" style={{ transitionDelay: `${(i % 3) * 0.08}s` }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "2rem",
                  padding: "2rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  cursor: "default",
                  transition: "all 200ms cubic-bezier(0.23,1,0.32,1)",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.paddingLeft = "1rem";
                  el.style.borderBottomColor = "rgba(255,106,0,0.2)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.paddingLeft = "0";
                  el.style.borderBottomColor = "rgba(255,255,255,0.04)";
                }}
                >
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "4rem", fontWeight: 800, color: "rgba(255,106,0,0.1)", letterSpacing: "-0.05em", lineHeight: 1, minWidth: "5rem", flexShrink: 0 }}>{uc.num}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--amber)", minWidth: "8rem", flexShrink: 0 }}>{uc.tag}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "var(--white)", letterSpacing: "-0.02em", marginBottom: "0.4rem" }}>{uc.title}</div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "var(--muted)", fontWeight: 300, lineHeight: 1.6, maxWidth: "600px" }}>{uc.desc}</div>
                  </div>
                  <div style={{ color: "rgba(255,106,0,0.3)", fontSize: "1.5rem", flexShrink: 0, transition: "color 200ms, transform 200ms" }}>→</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider" />

        {/* ── CTA ────────────────────────────────────────────────────── */}
        <section style={{ padding: "9rem clamp(1.5rem,5vw,4rem)", position: "relative", overflow: "hidden", textAlign: "center" }}>
          <div aria-hidden="true" style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            width: "700px", height: "700px",
            background: "radial-gradient(ellipse, rgba(255,106,0,0.07) 0%, transparent 65%)",
            pointerEvents: "none",
          }} />
          {/* Orbit rings */}
          {[1,2,3].map(i => (
            <div key={i} aria-hidden="true" style={{
              position: "absolute", top: "50%", left: "50%",
              width: `${i * 200 + 100}px`, height: `${i * 200 + 100}px`,
              marginLeft: `${-(i * 100 + 50)}px`, marginTop: `${-(i * 100 + 50)}px`,
              border: `1px solid rgba(255,106,0,${0.05 - i * 0.01})`,
              borderRadius: "50%",
              animation: `spin ${20 + i * 10}s linear infinite ${i % 2 ? "reverse" : ""}`,
              pointerEvents: "none",
            }} />
          ))}

          <div style={{ position: "relative" }}>
            <h2 className="cta-title reveal" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem,6vw,5.5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--white)", lineHeight: 1, marginBottom: "1.5rem" }}>
              Memory that<br /><span style={{ color: "var(--amber)" }}>never escapes.</span>
            </h2>
            <p className="reveal reveal-delay-1" style={{ fontFamily: "var(--font-sans)", fontSize: "1.05rem", color: "var(--muted)", maxWidth: "440px", margin: "0 auto 2.5rem", fontWeight: 300, lineHeight: 1.7 }}>
              Start building AI agents with persistent, hybrid-searchable memory today. Apache 2.0. One pip install.
            </p>
            <div className="cta-group-center reveal reveal-delay-2">
              <button
                className="btn-primary"
                style={{ fontSize: "0.9rem", padding: "1rem 2rem" }}
                onClick={() => navigator.clipboard?.writeText("pip install vantadb-py")}
              >
                pip install vantadb-py
              </button>
              <a href="https://github.com/ness-e/Vantadb" target="_blank" rel="noopener" className="btn-ghost" style={{ textDecoration: "none" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
                View on GitHub
              </a>
            </div>
            <div className="reveal reveal-delay-3" style={{ marginTop: "2.5rem", display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
              {["CI passing", "Apache 2.0", "Python 3.8+", "Rust 1.94.1+", "0 external deps"].map(b => (
                <span key={b} style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.1em" }}>✓ {b}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer ─────────────────────────────────────────────────── */}
        <footer className="vanta-footer">
          <div>
            <div className="footer-brand">Vanta<span>DB</span></div>
            <div className="footer-tagline">Where Context Never Escapes</div>
          </div>
          <ul className="footer-links">
            <li><a href="https://github.com/ness-e/Vantadb" target="_blank" rel="noopener">GitHub</a></li>
            <li><a href="https://pypi.org/project/vantadb-py/" target="_blank" rel="noopener">PyPI</a></li>
            <li><a href="https://github.com/ness-e/Vantadb/tree/main/docs" target="_blank" rel="noopener">Docs</a></li>
            <li><a href="https://github.com/ness-e/Vantadb/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener">Contribute</a></li>
          </ul>
          <div className="footer-copy">© 2026 VantaDB · Apache 2.0</div>
        </footer>
      </main>
    </>
  );
}
