import { useEffect, useRef, useState } from 'react';
import { Search, GitBranch, Shield, Zap } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  tag: string;
  title: string;
  description: string;
  detail: string;
  accent: string;
  glow: string;
  large?: boolean;
  visual?: React.ReactNode;
}

function HybridSearchVisual() {
  return (
    <div className="relative w-full h-28 mt-auto flex items-end justify-center overflow-hidden">
      <div className="absolute bottom-0 flex items-end gap-1">
        {[
          { h: 35, label: 'HNSW', c: '#FF6A00' },
          { h: 55, label: 'BM25', c: '#FFB703' },
          { h: 80, label: 'RRF', c: '#DC143C' },
          { h: 48, label: 'Hybrid', c: '#FF6A00' },
          { h: 95, label: 'Result', c: '#ffffff' },
        ].map((b, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className="w-8 rounded-t-sm transition-all duration-700"
              style={{ height: b.h, background: `${b.c}33`, borderTop: `2px solid ${b.c}`, animationDelay: `${i * 0.1}s` }}
            />
            <span className="text-[8px] text-[#444455] font-jetbrains">{b.label}</span>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1f] via-transparent to-transparent" />
    </div>
  );
}

function GraphVisual() {
  const nodes = [
    { x: 50, y: 20, r: 4, c: '#FF6A00' },
    { x: 20, y: 55, r: 3, c: '#FFB703' },
    { x: 80, y: 55, r: 3, c: '#FFB703' },
    { x: 35, y: 80, r: 2.5, c: '#DC143C' },
    { x: 65, y: 80, r: 2.5, c: '#DC143C' },
    { x: 10, y: 85, r: 2, c: '#555570' },
    { x: 90, y: 30, r: 2, c: '#555570' },
  ];
  const edges = [[0,1],[0,2],[1,3],[2,4],[1,2],[3,4],[0,6],[1,5]];
  return (
    <div className="w-full h-28 mt-2">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {edges.map(([a,b], i) => (
          <line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke="#2c2f36" strokeWidth="0.8"
          />
        ))}
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={n.c} opacity={0.8} />
        ))}
      </svg>
    </div>
  );
}

function WALVisual() {
  const rows = ['WAL write — seq 4821', 'fsync → disk', 'CRC32C verified ✓', 'Commit acknowledged'];
  return (
    <div className="mt-3 space-y-1.5">
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-2 text-[10px] font-jetbrains text-[#555570]">
          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${i === rows.length - 1 ? 'bg-[#FF6A00]' : 'bg-[#2c2f36]'}`} />
          <span className={i === rows.length - 1 ? 'text-[#FF6A00]' : ''}>{r}</span>
        </div>
      ))}
    </div>
  );
}

const features: Feature[] = [
  {
    icon: <Search size={22} className="text-[#FF6A00]" />,
    tag: 'Core Engine',
    title: 'Native Hybrid Search',
    description: 'HNSW vector search, BM25 keyword retrieval, and Reciprocal Rank Fusion — all fused in a single atomic query call. No pipelines, no glue code.',
    detail: 'HNSW + BM25 + RRF fusion',
    accent: '#FF6A00',
    glow: 'rgba(255,106,0,0.12)',
    large: true,
    visual: <HybridSearchVisual />,
  },
  {
    icon: <GitBranch size={20} className="text-[#FFB703]" />,
    tag: 'GraphRAG',
    title: 'Integrated Graph Context',
    description: 'Entities and relations stored as a native property graph. GraphRAG traversal delivers structured context that reduces prompt token usage by 40–60%.',
    detail: '40–60% token reduction',
    accent: '#FFB703',
    glow: 'rgba(255,183,3,0.10)',
    visual: <GraphVisual />,
  },
  {
    icon: <Shield size={20} className="text-[#DC143C]" />,
    tag: 'Durability',
    title: 'Certifiable Persistence',
    description: 'Write-Ahead Log with fsync and per-record CRC32C checksums. Every commit is durable before acknowledgement — no silent data loss.',
    detail: 'WAL + fsync + CRC32C',
    accent: '#DC143C',
    glow: 'rgba(220,20,60,0.10)',
    visual: <WALVisual />,
  },
  {
    icon: <Zap size={20} className="text-[#e6e6e6]" />,
    tag: 'Developer Experience',
    title: 'Truly Zero-Config',
    description: 'One pip install, one vantadb.open() call. No YAML files, no daemon to start, no connection strings. It just works, embedded in your process.',
    detail: 'pip install vantadb-py',
    accent: '#e6e6e6',
    glow: 'rgba(230,230,230,0.06)',
  },
];

function FeatureCard({ f, index, inView }: { f: Feature; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative rounded-2xl p-6 border transition-all duration-700 cursor-default group ${
        f.large ? 'md:col-span-2 md:row-span-2' : ''
      } ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{
        transitionDelay: `${index * 120}ms`,
        background: hovered
          ? `linear-gradient(135deg, #1a1a1f 0%, #161619 100%)`
          : 'linear-gradient(135deg, #161619 0%, #111115 100%)',
        borderColor: hovered ? `${f.accent}40` : 'rgba(255,255,255,0.06)',
        boxShadow: hovered ? `0 0 40px ${f.glow}, inset 0 1px 0 rgba(255,255,255,0.05)` : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glassmorphism highlight */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse at top left, ${f.glow}, transparent 60%)`,
          opacity: hovered ? 1 : 0.4,
        }}
      />

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="p-2.5 rounded-xl"
            style={{ background: `${f.accent}15`, border: `1px solid ${f.accent}25` }}
          >
            {f.icon}
          </div>
          <span
            className="text-[10px] font-jetbrains tracking-widest uppercase px-2.5 py-1 rounded-full"
            style={{ color: f.accent, background: `${f.accent}12`, border: `1px solid ${f.accent}20` }}
          >
            {f.tag}
          </span>
        </div>

        <h3 className="font-space-grotesk text-xl font-bold text-white mb-2.5">{f.title}</h3>
        <p className="text-sm text-[#666680] leading-relaxed font-jetbrains flex-1">{f.description}</p>

        {/* Detail badge */}
        <div className="mt-5 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: f.accent }} />
          <code className="text-xs font-jetbrains" style={{ color: f.accent }}>{f.detail}</code>
        </div>

        {/* Visual */}
        {f.visual}
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-28 bg-[#0d0d0f] relative overflow-hidden">
      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-[#FF6A00]/20 bg-[#FF6A00]/8 mb-5">
            <span className="text-xs text-[#FF6A00] font-jetbrains tracking-widest uppercase">Core Capabilities</span>
          </div>
          <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-white mb-4">
            Everything your agent
            <br />
            <span className="text-[#FF6A00]">needs to remember</span>
          </h2>
          <p className="text-[#666680] text-base font-jetbrains max-w-xl mx-auto">
            Four pillars, one embedded file. VantaDB unifies every memory primitive under a single atomic contract.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-auto">
          {/* Large card (spans 2 cols x 2 rows visually) */}
          <FeatureCard f={features[0]} index={0} inView={inView} />
          {/* Right column: 3 smaller cards */}
          {features.slice(1).map((f, i) => (
            <FeatureCard key={f.title} f={f} index={i + 1} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
