import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SingularityCanvas } from "@/components/singularity-canvas";
import {
  ArrowRight,
  Github,
  Search,
  Network,
  ShieldCheck,
  Zap,
  Bot,
  Database,
  Code2,
  Package,
  BookOpen,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VantaDB — The SQLite for AI Agents" },
      {
        name: "description",
        content:
          "VantaDB is an embedded, local-first cognitive memory engine for AI agents. Hybrid search, GraphRAG, and certifiable durability — written in Rust.",
      },
      { property: "og:title", content: "VantaDB — The SQLite for AI Agents" },
      {
        property: "og:description",
        content:
          "Persistent memory, hybrid search, and structured context. Embedded, local-first, written in Rust.",
      },
    ],
  }),
  component: Landing,
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

function Landing() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />
      <Hero />
      <CodeBlock />
      <Features />
      <UseCases />
      <Footer />
    </main>
  );
}

/* -------------------- NAV -------------------- */
function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <nav className="glass flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-2.5">
        <a href="#" className="flex items-center gap-2 font-display text-sm font-semibold tracking-tight">
          <LogoMark />
          <span>VantaDB</span>
        </a>
        <div className="hidden items-center gap-7 text-xs font-medium text-muted-foreground md:flex">
          <a href="#features" className="transition hover:text-foreground">Features</a>
          <a href="#code" className="transition hover:text-foreground">Quickstart</a>
          <a href="#use-cases" className="transition hover:text-foreground">Use cases</a>
          <a href="#" className="transition hover:text-foreground">Docs</a>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-1.5 text-xs font-semibold text-background transition hover:opacity-90"
        >
          <Github className="h-3.5 w-3.5" /> Star
        </a>
      </nav>
    </header>
  );
}

function LogoMark() {
  return (
    <div className="relative h-6 w-6">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[oklch(0.8_0.18_290)] to-[oklch(0.55_0.2_240)]" />
      <div className="absolute inset-[3px] rounded-full bg-background" />
      <div className="absolute inset-[7px] rounded-full bg-foreground" />
    </div>
  );
}

/* -------------------- HERO -------------------- */
function Hero() {
  return (
    <section className="relative isolate flex min-h-screen w-full items-center justify-center px-4 pt-32 pb-20">
      <SingularityCanvas />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass mb-8 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-glow)] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-glow)]" />
          </span>
          Open-source · Embedded · Written in Rust
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-5xl font-semibold leading-[1.02] tracking-tight text-gradient sm:text-6xl md:text-7xl lg:text-8xl"
        >
          The SQLite for
          <br />
          <span className="text-accent-gradient">AI Agents</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-7 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg"
        >
          Persistent memory, hybrid search, and structured context.
          Embedded, local-first, and written in Rust.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href="#code"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-[0_0_40px_-10px_var(--color-glow)] transition hover:translate-y-[-1px]"
          >
            Get Started
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </a>
          <a
            href="#"
            className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-white/10"
          >
            <Github className="h-4 w-4" /> View GitHub
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70"
        >
          $ pip install vantadb-py
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------- CODE -------------------- */
function CodeBlock() {
  return (
    <section id="code" className="relative px-4 py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div {...fadeUp} className="mb-12 text-center">
          <SectionLabel>Quickstart</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">
            Zero-config. Four lines.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            No servers. No schemas. No network. Open a file and start writing
            vectors, documents and relations under a single atomic contract.
          </p>
        </motion.div>

        <motion.div {...fadeUp} className="glass overflow-hidden rounded-2xl">
          <div className="flex items-center justify-between border-b border-white/10 bg-black/30 px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            </div>
            <span className="font-mono text-[11px] text-muted-foreground">
              agent_memory.py
            </span>
            <span className="font-mono text-[11px] text-muted-foreground">python</span>
          </div>

          <pre className="overflow-x-auto bg-black/40 p-6 font-mono text-sm leading-relaxed">
<code>
<span className="text-muted-foreground"># 1. Install</span>{"\n"}
<span className="text-[oklch(0.75_0.15_140)]">$</span> <span className="text-foreground">pip install vantadb-py</span>{"\n"}
{"\n"}
<span className="text-muted-foreground"># 2. Persist cognitive memory in four lines</span>{"\n"}
<span className="text-[oklch(0.75_0.18_295)]">from</span> <span className="text-foreground">vantadb</span> <span className="text-[oklch(0.75_0.18_295)]">import</span> <span className="text-foreground">Vanta</span>{"\n"}
{"\n"}
<span className="text-foreground">db </span><span className="text-[oklch(0.7_0.18_25)]">=</span><span className="text-foreground"> Vanta(</span><span className="text-[oklch(0.85_0.13_90)]">"./agent.vanta"</span><span className="text-foreground">)</span>{"\n"}
<span className="text-foreground">db.upsert(</span><span className="text-[oklch(0.85_0.13_90)]">"memories"</span><span className="text-foreground">, id</span><span className="text-[oklch(0.7_0.18_25)]">=</span><span className="text-[oklch(0.85_0.13_90)]">"m1"</span><span className="text-foreground">, text</span><span className="text-[oklch(0.7_0.18_25)]">=</span><span className="text-[oklch(0.85_0.13_90)]">"user prefers dark UI"</span><span className="text-foreground">, vector</span><span className="text-[oklch(0.7_0.18_25)]">=</span><span className="text-foreground">embed(...))</span>{"\n"}
<span className="text-foreground">db.link(</span><span className="text-[oklch(0.85_0.13_90)]">"m1"</span><span className="text-foreground">, </span><span className="text-[oklch(0.85_0.13_90)]">"PREFERENCE_OF"</span><span className="text-foreground">, </span><span className="text-[oklch(0.85_0.13_90)]">"user:42"</span><span className="text-foreground">)</span>{"\n"}
<span className="text-foreground">hits </span><span className="text-[oklch(0.7_0.18_25)]">=</span><span className="text-foreground"> db.search(</span><span className="text-[oklch(0.85_0.13_90)]">"what does the user like?"</span><span className="text-foreground">, hybrid</span><span className="text-[oklch(0.7_0.18_25)]">=</span><span className="text-[oklch(0.75_0.18_295)]">True</span><span className="text-foreground">)</span>{"\n"}
</code>
          </pre>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------- FEATURES (Bento) -------------------- */
function Features() {
  return (
    <section id="features" className="relative px-4 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div {...fadeUp} className="mb-14 text-center">
          <SectionLabel>The engine</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">
            One atomic contract.
            <br />
            Four memory modalities.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-2">
          <BentoCard
            className="md:col-span-3 md:row-span-2"
            icon={<Search className="h-5 w-5" />}
            title="Native hybrid search"
            description="HNSW vector search, BM25 lexical retrieval and Reciprocal Rank Fusion in the core — not bolted on. One query plan, one transaction."
          >
            <HybridVisual />
          </BentoCard>

          <BentoCard
            className="md:col-span-3"
            icon={<Network className="h-5 w-5" />}
            title="GraphRAG integrated"
            description="Traverse relations alongside vectors. 40–60% fewer prompt tokens for the same agent recall."
          >
            <GraphVisual />
          </BentoCard>

          <BentoCard
            className="md:col-span-2"
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Certifiable durability"
            description="WAL + fsync + CRC32C. Every write is crash-safe and verifiable."
          />

          <BentoCard
            className="md:col-span-1"
            icon={<Zap className="h-5 w-5" />}
            title="Zero-config"
            description="pip install. Open a file. Done."
          />
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </span>
  );
}

function BentoCard({
  icon,
  title,
  description,
  className = "",
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      {...fadeUp}
      className={`glass group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 transition hover:border-white/20 ${className}`}
    >
      {children && <div className="mb-6 flex-1">{children}</div>}
      <div>
        <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[var(--color-glow)]">
          {icon}
        </div>
        <h3 className="font-display text-lg font-semibold text-foreground">
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

function HybridVisual() {
  return (
    <div className="relative h-56 w-full overflow-hidden rounded-xl border border-white/5 bg-black/20">
      <svg viewBox="0 0 400 224" className="h-full w-full">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="oklch(0.8 0.18 290)" stopOpacity="0.9" />
            <stop offset="1" stopColor="oklch(0.7 0.18 220)" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="g2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="oklch(0.75 0.18 220)" stopOpacity="0.9" />
            <stop offset="1" stopColor="oklch(0.8 0.18 290)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x="20" y={20 + i * 36} width={120 - i * 8} height="14" rx="3" fill="url(#g1)" />
            <rect x="260" y={20 + i * 36} width={120 - (4 - i) * 8} height="14" rx="3" fill="url(#g2)" />
          </g>
        ))}
        <text x="20" y="14" fill="oklch(0.68 0.02 270)" fontSize="9" fontFamily="JetBrains Mono">VECTOR · HNSW</text>
        <text x="260" y="14" fill="oklch(0.68 0.02 270)" fontSize="9" fontFamily="JetBrains Mono">LEXICAL · BM25</text>
        <g transform="translate(170 30)">
          <rect width="60" height="170" rx="6" fill="oklch(1 0 0 / 0.04)" stroke="oklch(1 0 0 / 0.12)" />
          <text x="30" y="90" textAnchor="middle" fill="oklch(0.98 0.005 270)" fontSize="10" fontFamily="JetBrains Mono">RRF</text>
          <text x="30" y="105" textAnchor="middle" fill="oklch(0.68 0.02 270)" fontSize="7" fontFamily="JetBrains Mono">fusion</text>
        </g>
      </svg>
    </div>
  );
}

function GraphVisual() {
  const nodes = [
    { x: 80, y: 60, label: "agent" },
    { x: 200, y: 30, label: "memory" },
    { x: 320, y: 80, label: "entity" },
    { x: 240, y: 130, label: "fact" },
    { x: 110, y: 150, label: "session" },
  ];
  return (
    <div className="relative h-48 w-full overflow-hidden rounded-xl border border-white/5 bg-black/20">
      <svg viewBox="0 0 400 180" className="h-full w-full">
        {[
          [0, 1], [1, 2], [1, 3], [3, 4], [0, 4], [2, 3],
        ].map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="oklch(0.7 0.18 290 / 0.4)"
            strokeWidth="1"
          />
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="6" fill="oklch(0.85 0.15 290)" />
            <circle cx={n.x} cy={n.y} r="12" fill="oklch(0.85 0.15 290 / 0.15)" />
            <text x={n.x + 12} y={n.y + 3} fill="oklch(0.85 0.005 270)" fontSize="9" fontFamily="JetBrains Mono">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* -------------------- USE CASES -------------------- */
function UseCases() {
  const items = [
    {
      icon: <Bot className="h-5 w-5" />,
      title: "AI Agents",
      copy: "Give agents persistent, structured memory between sessions. One file, no infra.",
    },
    {
      icon: <Database className="h-5 w-5" />,
      title: "RAG platforms",
      copy: "Hybrid retrieval and graph traversal in a single atomic transaction.",
    },
    {
      icon: <Code2 className="h-5 w-5" />,
      title: "Local-first tools",
      copy: "Ship intelligent IDEs and desktop apps that work fully offline.",
    },
  ];
  return (
    <section id="use-cases" className="relative px-4 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div {...fadeUp} className="mb-14 text-center">
          <SectionLabel>Built for</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">
            Where VantaDB fits.
          </h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="glass group relative overflow-hidden rounded-2xl p-6"
            >
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[var(--color-glow)]">
                {it.icon}
              </div>
              <h3 className="font-display text-xl font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.copy}</p>
              <div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(400px circle at 50% 0%, oklch(0.7 0.18 290 / 0.18), transparent 60%)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- FOOTER -------------------- */
function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2 font-display text-sm font-semibold">
            <LogoMark />
            VantaDB
          </div>
          <p className="mt-2 max-w-sm text-xs text-muted-foreground">
            Embedded cognitive memory engine for the next generation of AI agents.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <FooterLink href="#" icon={<Github className="h-3.5 w-3.5" />}>GitHub</FooterLink>
          <FooterLink href="#" icon={<Package className="h-3.5 w-3.5" />}>PyPI</FooterLink>
          <FooterLink href="#" icon={<BookOpen className="h-3.5 w-3.5" />}>Documentation</FooterLink>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-white/5 pt-6 font-mono text-[11px] text-muted-foreground">
        © {new Date().getFullYear()} VantaDB · Open-source · Apache-2.0
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="glass inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium text-foreground transition hover:bg-white/10"
    >
      {icon}
      {children}
    </a>
  );
}
