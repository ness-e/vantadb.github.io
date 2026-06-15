import { useEffect, useRef, useState } from 'react';
import { Bot, Database, Code2, ArrowRight } from 'lucide-react';

const cases = [
  {
    icon: <Bot size={28} className="text-[#FF6A00]" />,
    audience: 'AI Agent Developers',
    title: 'Agents that actually remember',
    description:
      'Give your LangChain, AutoGen, or custom agent a persistent, searchable memory store. VantaDB handles episodic history, semantic recall, and structured preferences — all in one embedded call.',
    points: [
      'Episodic memory with semantic search',
      'Structured preference and context storage',
      'Graph-linked entity tracking across sessions',
    ],
    accent: '#FF6A00',
    bg: 'rgba(255,106,0,0.04)',
  },
  {
    icon: <Database size={28} className="text-[#FFB703]" />,
    audience: 'RAG Platforms',
    title: 'Retrieval that fits in a file',
    description:
      'Replace your vector-store + keyword-search + graph-DB stack with a single embedded dependency. Hybrid retrieval with RRF fusion, GraphRAG context pruning, and ACID durability — all local.',
    points: [
      'Hybrid HNSW + BM25 retrieval in one query',
      '40–60% token reduction via GraphRAG',
      'No external services, no SLA dependencies',
    ],
    accent: '#FFB703',
    bg: 'rgba(255,183,3,0.04)',
  },
  {
    icon: <Code2 size={28} className="text-[#e6e6e6]" />,
    audience: 'Local Tooling & IDEs',
    title: 'Intelligence that travels with code',
    description:
      'Ship AI features in your CLI tools, editor plugins, or offline applications without requiring network access. VantaDB runs in the same process, with zero config and full transactional safety.',
    points: [
      'Single-file embedding, ships in your binary',
      'Works fully offline — no cloud dependency',
      'Consistent writes even during power loss',
    ],
    accent: '#e6e6e6',
    bg: 'rgba(230,230,230,0.03)',
  },
];

function UseCaseCard({ c, index, inView }: { c: (typeof cases)[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative rounded-2xl p-8 border border-white/6 transition-all duration-700 flex flex-col group ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
        background: hovered
          ? `linear-gradient(135deg, #1a1a1f, #111115)`
          : 'linear-gradient(135deg, #141418, #0f0f13)',
        borderColor: hovered ? `${c.accent}35` : 'rgba(255,255,255,0.05)',
        boxShadow: hovered ? `0 0 50px rgba(0,0,0,0.5), 0 0 20px ${c.bg}` : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-8 right-8 h-px transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${c.accent}60, transparent)`, opacity: hovered ? 1 : 0 }}
      />

      {/* Audience badge */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="p-2.5 rounded-xl transition-all duration-300"
          style={{ background: `${c.accent}12`, border: `1px solid ${c.accent}20` }}
        >
          {c.icon}
        </div>
        <span className="text-xs font-jetbrains tracking-widest uppercase" style={{ color: c.accent }}>
          {c.audience}
        </span>
      </div>

      <h3 className="font-space-grotesk text-2xl font-bold text-white mb-3">{c.title}</h3>
      <p className="text-sm text-[#666680] leading-relaxed font-jetbrains mb-6 flex-1">{c.description}</p>

      {/* Feature points */}
      <ul className="space-y-2.5 mb-6">
        {c.points.map((pt, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm font-jetbrains text-[#888890]">
            <div
              className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
              style={{ background: c.accent }}
            />
            {pt}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#code-section"
        className="inline-flex items-center gap-2 text-sm font-space-grotesk font-medium transition-all duration-200 group/link"
        style={{ color: c.accent }}
      >
        See how it works
        <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
      </a>
    </div>
  );
}

export default function UseCasesSection() {
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
    <section id="use-cases" ref={sectionRef} className="py-28 bg-[#080809] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#FF6A00]/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#DC143C]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-[#FF6A00]/20 bg-[#FF6A00]/8 mb-5">
            <span className="text-xs text-[#FF6A00] font-jetbrains tracking-widest uppercase">Use Cases</span>
          </div>
          <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-white mb-4">
            Built for builders
            <br />
            <span className="text-[#FF6A00]">on the edge of AI</span>
          </h2>
          <p className="text-[#666680] text-base font-jetbrains max-w-xl mx-auto">
            Whether you're building autonomous agents, retrieval pipelines, or local dev tools — VantaDB fits in your stack without changing it.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <UseCaseCard key={c.audience} c={c} index={i} inView={inView} />
          ))}
        </div>

        {/* Bottom CTA block */}
        <div
          className={`mt-20 text-center transition-all duration-700 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="inline-flex flex-col items-center gap-5 p-10 rounded-2xl border border-white/6 bg-[#0f0f13]">
            <p className="text-2xl font-space-grotesk font-bold text-white">
              Ready to give your agent a memory?
            </p>
            <p className="text-sm text-[#666680] font-jetbrains max-w-sm">
              One command to install. One file to store everything. Zero infrastructure to maintain.
            </p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <a
                href="#code-section"
                className="px-7 py-3 rounded-xl text-sm font-semibold bg-[#FF6A00] hover:bg-[#ff7d1a] text-white transition-all duration-200 shadow-[0_0_25px_rgba(255,106,0,0.35)] hover:shadow-[0_0_40px_rgba(255,106,0,0.5)] font-space-grotesk"
              >
                Get Started
              </a>
              <a
                href="https://github.com/vantadb"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3 rounded-xl text-sm font-semibold text-white border border-white/12 hover:border-white/25 hover:bg-white/5 transition-all duration-200 font-space-grotesk"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
