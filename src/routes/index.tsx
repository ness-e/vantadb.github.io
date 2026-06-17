import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SingularityHero } from "@/components/SingularityHero";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VantaDB — Where Context Never Escapes" },
      {
        name: "description",
        content:
          "Embedded Rust engine for AI agents. Hybrid search via BM25 + HNSW, GraphRAG, crash-safe WAL durability. Zero servers, one pip install.",
      },
    ],
  }),
  component: Landing,
});

// ── Scroll reveal ──────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

    // Animate bar fills + table rows on intersection
    const barObs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const target = e.target;
            target.classList.add("is-visible");
            const bars = target.querySelectorAll(".bar-fill, .specsheet-bar-fill, .comp-bar-fill");
            bars.forEach((bar) => {
              const w = bar.getAttribute("data-w") || bar.getAttribute("data-width");
              if (w) (bar as HTMLElement).style.width = w + "%";
            });
          }
        }),
      { threshold: 0.3 },
    );
    document.querySelectorAll(".bars-container, .specsheet-grid, .comp-table").forEach((el) => barObs.observe(el));

    // Nav glassmorphism on scroll
    const nav = document.querySelector(".vanta-nav");
    const onScroll = () => {
      if (nav) {
        nav.classList.toggle("scrolled", window.scrollY > 60);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      obs.disconnect();
      barObs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}

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

// ── Architecture layers ─────────────────────────────────────────────────────────
function ArchVisual() {
  const layers = [
    { label: "Python SDK", sub: "vantadb.put() / search() / get()", depth: 5 },
    { label: "PyO3 Bindings", sub: "src/sdk.rs — stable FFI boundary", depth: 4 },
    { label: "Query Planner", sub: "BM25 + HNSW + RRF routing", depth: 3 },
    { label: "Fjall Storage", sub: "WAL + fsync + CRC32C", depth: 2 },
    { label: "HNSW Index", sub: "Cosine · M · ef_construction", depth: 1 },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
      {layers.map((l, i) => (
        <div key={i} className="arch-layer" style={{ animationDelay: `${i * 0.08}s` }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "var(--white)",
                letterSpacing: "-0.01em",
              }}
            >
              {l.label}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "rgba(255,106,0,0.6)",
                marginTop: "0.15rem",
                letterSpacing: "0.05em",
              }}
            >
              {l.sub}
            </div>
          </div>
          <div className="arch-ping" style={{ animationDuration: `${1.5 + i * 0.3}s` }} />
        </div>
      ))}
    </div>
  );
}

// ── Typewriter Title Component ─────────────────────────────────────────────────
function TypewriterTitle({ phase }: { phase: number | null }) {
  const phrases = [
    { pre: "", word: "One", post: " dependency, not three." },
    { pre: "", word: "Zero", post: " cost at runtime." },
    { pre: "", word: "In-process", post: ", not networked." },
    { pre: "", word: "No", post: " config files needed." },
    { pre: "", word: "Nothing", post: " to monitor." },
  ];
  const [charCount, setCharCount] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => setBlink((c) => !c), 530);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (phase === null) { setCharCount(0); return; }

    const baseIdx = phase < phrases.length ? phase : 0;
    setCurrentIdx(baseIdx);

    let cancelled = false;
    const SPEED = 65;
    const DEL_SPEED = 50;
    const PAUSE = 2200;
    const GAP = 800;

    const typePhrase = (phraseIdx: number, cb: () => void) => {
      if (cancelled) return;
      const phrase = phrases[phraseIdx % phrases.length];
      const full = phrase.pre + phrase.word + phrase.post;
      setCurrentIdx(phraseIdx);
      setCharCount(0);
      let ci = 0;

      const ti = setInterval(() => {
        if (cancelled) { clearInterval(ti); return; }
        ci++;
        setCharCount(ci);
        if (ci >= full.length) {
          clearInterval(ti);
          setTimeout(() => {
            if (cancelled) return;
            const di = setInterval(() => {
              if (cancelled) { clearInterval(di); return; }
              ci--;
              setCharCount(ci);
              if (ci <= 0) {
                clearInterval(di);
                setTimeout(() => { if (!cancelled) cb(); }, GAP);
              }
            }, DEL_SPEED);
          }, PAUSE);
        }
      }, SPEED);
    };

    if (phase < phrases.length) {
      typePhrase(phase, () => {});
    } else {
      let idx = 0;
      const loop = () => {
        typePhrase(idx, () => {
          if (cancelled) return;
          idx = (idx + 1) % phrases.length;
          loop();
        });
      };
      loop();
    }

    return () => { cancelled = true; };
  }, [phase]);

  const renderText = () => {
    const phrase = phrases[currentIdx % phrases.length];
    const full = phrase.pre + phrase.word + phrase.post;
    const a = phrase.pre.length;
    const b = a + phrase.word.length;
    const count = Math.min(charCount, full.length);

    return (
      <>
        <span>{full.slice(0, Math.min(count, a))}</span>
        {count > a && (
          <span style={{ color: "var(--amber)" }}>
            {full.slice(a, Math.min(count, b))}
          </span>
        )}
        {count > b && (
          <span>{full.slice(b, count)}</span>
        )}
      </>
    );
  };

  return (
    <h2 className="section-title" style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", letterSpacing: "normal", lineHeight: 1.4, minHeight: "1.2em" }}>
      {phase !== null ? renderText() : null}
      <span className="term-cursor" />
    </h2>
  );
}

// ── TerminalCell ──────────────────────────────────────────────────────────────
function TerminalCell({ item, active, onDone }: {
  item: { label: string; full: string; oldVal: string; vantaVal: string; oldBadge: string; vantaBadge: string };
  active: boolean;
  onDone: () => void;
}) {
  const [phase, setPhase] = useState<"idle" | "visible" | "done">("idle");
  const navigate = useNavigate();

  const routeMap: Record<string, string> = {
    STORAGE: "/storage",
    COST: "/cost",
    LATENCY: "/latency",
    CONFIG: "/config",
    MAINT: "/maint",
  };

  useEffect(() => {
    if (active && phase === "idle") {
      setPhase("visible");
    }
  }, [active, phase]);

  useEffect(() => {
    if (phase !== "visible") return;
    const t = setTimeout(() => {
      setPhase("done");
      onDone();
    }, 3000);
    return () => clearTimeout(t);
  }, [phase, onDone]);

  const handleClick = () => {
    const path = routeMap[item.label];
    if (path) navigate({ to: path });
  };

  return (
    <div
      className={`term-cell ${phase !== "idle" ? "visible" : ""} ${phase === "done" ? "done" : ""}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") handleClick(); }}
    >
      <div className="term-cell-titlebar">
        <span className="term-cell-dot" style={{ background: "#ff5f57" }} />
        <span className="term-cell-dot" style={{ background: "#febc2e" }} />
        <span className="term-cell-dot" style={{ background: "#28c840" }} />
        <span className="term-cell-title">{item.label}</span>
      </div>
      <div className="term-cell-body">
        <div className="term-cell-metric">{item.full}</div>
        <div className="term-cell-line old">
          <span className="term-cell-x">✗</span>
          <span className="term-cell-tag">LEGACY</span>
        </div>
        <div className="term-cell-val old">{item.oldVal}</div>
        <div className="term-cell-score old">{item.oldBadge}</div>
        <div className="term-cell-div" />
        <div className="term-cell-line vanta">
          <span className="term-cell-check">✓</span>
          <span className="term-cell-tag vanta">VANTADB</span>
        </div>
        <div className="term-cell-val vanta">{item.vantaVal}</div>
        <div className="term-cell-score vanta">{item.vantaBadge}</div>
      </div>
    </div>
  );
}

// ── ComparisonTable Component ──────────────────────────────────────────────────
function ComparisonTable() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const items = [
    { label: "STORAGE", full: "Storage Architecture", oldVal: "Pinecone + Redis + S3", vantaVal: "pip install vantadb", oldBadge: "3 DEPS", vantaBadge: "1 CMD" },
    { label: "COST", full: "Infrastructure Cost", oldVal: "~$200/mo + latency floor", vantaVal: "$0 runtime", oldBadge: "$200+", vantaBadge: "FREE" },
    { label: "LATENCY", full: "p99 Query Latency", oldVal: "200ms (network bound)", vantaVal: "1.2ms (in-process)", oldBadge: "200ms", vantaBadge: "1.2ms" },
    { label: "CONFIG", full: "Configuration & Schema", oldVal: "Complex migrations", vantaVal: "Zero config", oldBadge: "COMPLEX", vantaBadge: "ZERO" },
    { label: "MAINT", full: "Maintenance", oldVal: "3 services to monitor", vantaVal: "0 daemon deps", oldBadge: "3 SVC", vantaBadge: "0 DEPS" },
  ];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveIdx(0);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleDone = () => {
    setActiveIdx((prev) => {
      if (prev === null) return null;
      if (prev < items.length) return prev + 1;
      return prev;
    });
  };

  return (
    <div
      style={{
        padding: "5rem clamp(1.5rem, 5vw, 4rem)",
        maxWidth: "1500px",
        margin: "0 auto",
      }}
    >
      <div className="reveal text-center" style={{ marginBottom: "2.5rem" }}>
        <span className="section-eyebrow">// VantaDB vs. The Stack</span>
        <TypewriterTitle phase={activeIdx} />
        <p className="section-sub" style={{ maxWidth: "520px", margin: "0 auto" }}>
          A side-by-side comparison of every infrastructure layer — complexity, cost, and performance.
        </p>
      </div>

      <div ref={containerRef} className="term-grid">
        {items.map((item, idx) => (
          <TerminalCell key={idx} item={item} active={activeIdx === idx} onDone={handleDone} />
        ))}
      </div>
    </div>
  );
}

// ── Syntax highlighting helpers ──────────────────────────────────────────────
const PY_KEYWORDS = new Set([
  "import", "from", "as", "def", "return", "if", "else", "elif", "for", "in",
  "while", "class", "try", "except", "finally", "with", "pass", "break",
  "continue", "and", "or", "not", "is", "None", "True", "False", "raise",
  "yield", "lambda", "global", "nonlocal", "assert", "del",
]);
const RUST_KEYWORDS = new Set([
  "use", "fn", "let", "mut", "return", "if", "else", "for", "in", "while",
  "loop", "match", "struct", "enum", "impl", "trait", "pub", "self", "super",
  "crate", "where", "as", "ref", "move", "async", "await", "unsafe", "type",
  "const", "static", "true", "false", "Some", "None", "Ok", "Err",
]);
const PY_BUILTINS = new Set([
  "print", "len", "range", "int", "str", "float", "list", "dict", "set",
  "tuple", "type", "isinstance", "hasattr", "getattr", "open", "map",
  "filter", "sorted", "enumerate", "zip", "reversed", "super",
]);

function tokenizePython(line: string) {
  const parts: { t: string; v: string }[] = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === "#") {
      parts.push({ t: "comment", v: line.slice(i) });
      break;
    }
    if (line[i] === '"' || line[i] === "'") {
      const q = line[i];
      let j = i + 1;
      while (j < line.length && line[j] !== q) j++;
      if (line[j] === q) j++;
      parts.push({ t: "string", v: line.slice(i, j) });
      i = j;
      continue;
    }
    if (/[\d]/.test(line[i]) && (i === 0 || !/\w/.test(line[i - 1]))) {
      let j = i;
      while (j < line.length && /[\d.]/.test(line[j])) j++;
      parts.push({ t: "number", v: line.slice(i, j) });
      i = j;
      continue;
    }
    if (/\w/.test(line[i]) || line[i] === "_") {
      let j = i;
      while (j < line.length && (/\w/.test(line[j]) || line[j] === "_")) j++;
      const word = line.slice(i, j);
      if (PY_KEYWORDS.has(word)) parts.push({ t: "keyword", v: word });
      else if (PY_BUILTINS.has(word)) parts.push({ t: "builtin", v: word });
      else if (i > 0 && line[i - 1] === ".") parts.push({ t: "function", v: word });
      else if (j < line.length && line[j] === "(") parts.push({ t: "function", v: word });
      else parts.push({ t: "plain", v: word });
      i = j;
      continue;
    }
    if (/[\[\](){},.]/.test(line[i])) {
      parts.push({ t: "punctuation", v: line[i] });
      i++;
      continue;
    }
    if (/[=+\-*/<>!&|%^~?:@]/.test(line[i])) {
      parts.push({ t: "operator", v: line[i] });
      i++;
      continue;
    }
    parts.push({ t: "plain", v: line[i] });
    i++;
  }
  return parts;
}

function tokenizeRust(line: string) {
  const parts: { t: string; v: string }[] = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === "/" && line[i + 1] === "/") {
      parts.push({ t: "comment", v: line.slice(i) });
      break;
    }
    if (line[i] === '"') {
      let j = i + 1;
      while (j < line.length && line[j] !== '"') {
        if (line[j] === "\\") j++;
        j++;
      }
      if (line[j] === '"') j++;
      parts.push({ t: "string", v: line.slice(i, j) });
      i = j;
      continue;
    }
    if (line[i] === "#" && line[i + 1] === "[") {
      let j = i;
      while (j < line.length && line[j] !== "]") j++;
      if (j < line.length) j++;
      parts.push({ t: "attribute", v: line.slice(i, j) });
      i = j;
      continue;
    }
    if (/[\d]/.test(line[i]) && (i === 0 || !/\w/.test(line[i - 1]))) {
      let j = i;
      while (j < line.length && /[\d._]/.test(line[j])) j++;
      parts.push({ t: "number", v: line.slice(i, j) });
      i = j;
      continue;
    }
    if (/\w/.test(line[i]) || line[i] === "_") {
      let j = i;
      while (j < line.length && (/\w/.test(line[j]) || line[j] === "_")) j++;
      const word = line.slice(i, j);
      if (RUST_KEYWORDS.has(word)) parts.push({ t: "keyword", v: word });
      else if (j < line.length && line[j] === "(") parts.push({ t: "function", v: word });
      else if (word.endsWith("!")) parts.push({ t: "builtin", v: word });
      else parts.push({ t: "plain", v: word });
      i = j;
      continue;
    }
    if (/[\[\](){},.;:]/.test(line[i])) {
      parts.push({ t: "punctuation", v: line[i] });
      i++;
      continue;
    }
    if (/[=+\-*/<>!&|%^~?:@]/.test(line[i])) {
      parts.push({ t: "operator", v: line[i] });
      i++;
      continue;
    }
    parts.push({ t: "plain", v: line[i] });
    i++;
  }
  return parts;
}

function highlightCode(code: string, lang: string) {
  const lines = code.split("\n");
  const tokenizer = lang === "python" ? tokenizePython : tokenizeRust;
  return lines.map((line, lIdx) => {
    const tokens = tokenizer(line);
    return (
      <div key={lIdx} style={{ display: "flex" }}>
        {tokens.map((t, tIdx) => (
          <span key={tIdx} className={`token-${t.t}`}>{t.v}</span>
        ))}
      </div>
    );
  });
}

function liveHighlight(code: string, typed: number, lang: string, cursor: boolean) {
  const visible = code.slice(0, typed);
  const lines = visible.split("\n");
  const tokenizer = lang === "python" ? tokenizePython : tokenizeRust;
  return lines.map((line, lIdx) => {
    const isLast = lIdx === lines.length - 1;
    const tokens = tokenizer(line);
    return (
      <div key={lIdx} style={{ display: "flex" }}>
        {tokens.map((t, tIdx) => (
          <span key={tIdx} className={`token-${t.t}`}>{t.v}</span>
        ))}
        {isLast && cursor && <span className="typing-cursor">▊</span>}
      </div>
    );
  });
}

// ── InteractiveQuickstart Component ───────────────────────────────────────────
function InteractiveQuickstart() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set([0]));
  const [ready, setReady] = useState(false);
  const [lang, setLang] = useState<"python" | "rust">("python");
  const [copied, setCopied] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => {
      setReady(true);
    }));
    return () => cancelAnimationFrame(id);
  }, []);

  const steps: {
    title: string; label: string;
    pythonCode: string; rustCode: string;
    pythonOutput: string[]; rustOutput: string[];
  }[] = [
    {
      title: "INSTALL", label: "pip install",
      pythonCode: "pip install vantadb-py",
      rustCode: 'cargo add vantadb\n# Cargo.toml\nvantadb = "0.1"',
      pythonOutput: [
        "$ pip install vantadb-py",
        "Collecting vantadb-py",
        "  Downloading vantadb_py-0.1.4-cp312-cp312-manylinux_2_34_x86_64.whl",
        "✓ Successfully installed vantadb-py-0.1.4",
        "      Adding vantadb v0.1.4 to dependencies",
        "✓ Pure Rust core dependencies analyzed",
        "✓ Ready for building target bindings",
      ],
      rustOutput: [
        '$ cargo add vantadb',
        "    Updating crates.io index",
        "      Adding vantadb v0.1.4 to dependencies",
        "✓ Pure Rust core, zero bindings layer",
        "✓ Cargo.toml ready for build",
      ],
    },
    {
      title: "INITIALIZE", label: "Open local DB",
      pythonCode: 'import vantadb_py as vanta\n\ndb = vanta.VantaDB("./agent_memory")',
      rustCode: 'use vantadb::VantaDB;\n\nlet db = VantaDB::open("./agent_memory")?;',
      pythonOutput: [
        ">>> db = vanta.VantaDB('./agent_memory')",
        "✓ Folder path validated",
        "✓ WAL recovery completed in 0.2ms (0 entries replayed)",
        "✓ Fjall storage backend initialized successfully",
        "✓ Database instance live",
      ],
      rustOutput: [
        'let db = VantaDB::open("./agent_memory")?;',
        "✓ WAL recovery complete (CRC32C verified)",
        "✓ Raw storage initialized at ./agent_memory",
        "✓ Safe Rust wrapper initialized",
      ],
    },
    {
      title: "STORE", label: "Put record",
      pythonCode:
        'db.put(\n  "memories",\n  "key-1",\n  "Agent learned user prefers async Python",\n  vector=[0.12, 0.88, 0.54],\n  metadata={"priority": "high"}\n)',
      rustCode:
        'db.put(\n    "memories",\n    "key-1",\n    "Agent learned user prefers async Python",\n    vec![0.12, 0.88, 0.54],\n    None\n)?;',
      pythonOutput: [
        ">>> db.put('memories', 'key-1', ...)",
        "✓ Key formatted and serialized to Fjall WAL",
        "✓ HNSW Index updated for namespace 'memories'",
        "✓ CRC32C calculated: 0x92f3a1d4",
        "✓ Fsync flushed successfully (WAL safe)",
      ],
      rustOutput: [
        'db.put("memories", "key-1", ...)?;',
        "✓ CRC32C verified: 0x92f3a1d4",
        "✓ WAL sync succeeded immediately",
        "✓ Key stored and index locked",
      ],
    },
    {
      title: "SEARCH", label: "Hybrid search",
      pythonCode:
        'hits = db.search_memory(\n  "memories",\n  query_vector=[0.11, 0.89, 0.55],\n  top_k=5\n)',
      rustCode:
        'let hits = db.search_memory(\n    "memories",\n    vec![0.11, 0.89, 0.55],\n    5\n)?;',
      pythonOutput: [
        ">>> hits = db.search_memory('memories', ...)",
        "🔍 Executing hybrid plan: BM25 (lexical) + HNSW (vector) + RRF fusion",
        "→ hit key-1: 'Agent learned user prefers async Python'",
        "  Score: 0.987 (RRF fused)",
        "  Latency: 1.2ms (100% local FFI execution)",
      ],
      rustOutput: [
        'let hits = db.search_memory("memories", ...)?;',
        "🔍 Query plan: BM25 (lexical) + HNSW (vector) + RRF fusion",
        "→ key-1: 'Agent learned user prefers async Python'",
        "  Fused Score: 0.987",
        "  Latency: 0.8ms (Rust direct call)",
      ],
    },
  ];

  const navigate = (idx: number) => {
    setActiveIdx(idx);
    setCompleted((prev) => {
      const next = new Set(prev);
      for (let i = 0; i <= idx; i++) next.add(i);
      return next;
    });
  };

  const copyCode = async (key: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    } catch { /* clipboard unavailable */ }
  };

  const outColor = (line: string) =>
    line.startsWith("$") || line.startsWith("cargo") || line.startsWith("    Updating")
      ? "var(--steel)"
      : line.startsWith(">>>") || line.startsWith("✓")
        ? "#28c840"
        : line.startsWith("🔍") || line.startsWith("→") || line.startsWith("  ")
          ? "var(--amber-soft)"
          : "var(--frost)";

  const step = steps[activeIdx];
  const codeText = lang === "python" ? step.pythonCode : step.rustCode;
  const outputLines = lang === "python" ? step.pythonOutput : step.rustOutput;
  const copyKey = `${activeIdx}-${lang}`;

  // Typewriter
  const [typedCount, setTypedCount] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const [outRevealed, setOutRevealed] = useState(0);

  useEffect(() => {
    setTypedCount(0);
    setTypingDone(false);
    setOutRevealed(0);
    let ci = 0;
    const speed = 45;
    const t = setInterval(() => {
      ci++;
      setTypedCount(ci);
      if (ci >= codeText.length) {
        clearInterval(t);
        setTimeout(() => {
          setTypingDone(true);
          let oi = 0;
          const o = setInterval(() => {
            oi++;
            setOutRevealed(oi);
            if (oi >= outputLines.length) clearInterval(o);
          }, 120);
        }, 300);
      }
    }, speed);
    return () => { clearInterval(t); };
  }, [codeText, outputLines.length]);

  return (
    <section
      id="quickstart"
      style={{
        padding: "7rem clamp(1.5rem, 5vw, 4rem) 8rem",
        maxWidth: "1200px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      <div className="reveal" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <span className="section-eyebrow">// Quickstart</span>
        <h2
          className="section-title"
          style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", marginBottom: "1rem" }}
        >
          Get started in <span style={{ color: "var(--amber)" }}>seconds.</span>
        </h2>
        <p className="section-sub" style={{ marginBottom: "1.5rem", maxWidth: "480px", marginLeft: "auto", marginRight: "auto" }}>
          Install, import and query locally. Zero dependencies. Open a file and go.
        </p>
      </div>

      <div className={`sp-layout ${ready ? "ready" : ""}`}>
        {/* Sidebar */}
        <nav className="sp-sidebar">
          {steps.map((s, idx) => {
            const status = activeIdx === idx ? "active" : completed.has(idx) ? "completed" : "pending";
            return (
              <button key={idx} className={`sp-sidebar-item ${status}`} onClick={() => navigate(idx)}>
                <span className="sp-sidebar-num">{String(idx + 1).padStart(2, "0")}</span>
                <span>{s.title}</span>
                <span className={`sp-sidebar-icon ${status === "active" ? "active-dot" : status === "completed" ? "done-dot" : ""}`}>
                  {status === "active" ? "●" : status === "completed" ? "✓" : ""}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Content */}
        <div className="sp-content" ref={contentRef}>
          <div className="tl-window">
            <div className="tl-titlebar">
              <div className="tl-dot-group">
                <span className="tl-dot" />
                <span className="tl-dot" />
                <span className="tl-dot" />
              </div>
              <span className="tl-title">vantadb — interactive shell v0.1</span>
              <div className="tl-legend">
                <span className="tl-legend-item" style={{ color: "var(--amber)" }}>● active</span>
                <span className="tl-legend-item" style={{ color: "#28c840" }}>✓ done</span>
                <span className="tl-legend-item">○ pending</span>
              </div>
            </div>

            <div className="sp-block is-visible" key={copyKey}>
              <div className="sp-block-header">
                <span className="sp-step-title">{step.title}</span>
                <span className="sp-step-tag">{step.label}</span>
              </div>

              <div className="sp-lang-tabs">
                <button
                  className={`sp-lang-tab ${lang === "python" ? "active" : ""}`}
                  onClick={() => setLang("python")}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                  Python SDK
                </button>
                <button
                  className={`sp-lang-tab ${lang === "rust" ? "active" : ""}`}
                  onClick={() => setLang("rust")}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Rust Core (FFI)
                </button>
              </div>

              <div className="sp-code-wrap" key={`code-${copyKey}`}>
                <button className="sp-copy-btn" onClick={() => copyCode(copyKey, codeText)}>
                  {copied === copyKey ? (
                    <span className="sp-copied-label">Copied</span>
                  ) : (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  )}
                </button>
                <div className="sp-code">
                  {typingDone
                    ? highlightCode(codeText, lang)
                    : liveHighlight(codeText, typedCount, lang, true)}
                </div>
              </div>

              <div className="sp-output" key={`out-${copyKey}`}>
                {outputLines.slice(0, outRevealed).map((line, lIdx) => (
                  <div key={lIdx} className="sp-out-line" style={{ color: outColor(line) }}>{line}</div>
                ))}
                {outRevealed > 0 && outRevealed <= outputLines.length && typingDone && <span className="typing-cursor" style={{ marginTop: "0.2rem", display: "inline-block" }}>▊</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
        @keyframes drawLine { from { stroke-dashoffset:1000; } to { stroke-dashoffset:0; } }
        @keyframes archLayerIn { from { opacity:0; transform:translateX(-16px); } to { opacity:1; transform:translateX(0); } }
        @keyframes ping { from { opacity:0.3; transform:scale(0.8); } to { opacity:1; transform:scale(1.2); } }

        .reveal { opacity:0; transform:translateY(24px); transition: opacity 0.75s cubic-bezier(0.23,1,0.32,1), transform 0.75s cubic-bezier(0.23,1,0.32,1); }
        .reveal.is-visible { opacity:1; transform:translateY(0); }
        .reveal-delay-1 { transition-delay:0.07s; }
        .reveal-delay-2 { transition-delay:0.15s; }
        .reveal-delay-3 { transition-delay:0.23s; }
        .reveal-delay-4 { transition-delay:0.31s; }
      `}</style>

      {/* Hero (immutable) */}
      <SingularityHero />

      <div className="hero-nebula" />

      <main className="page-content">
        {/* ── 1. COMPARISON BAR (Old Stack vs VantaDB) ── */}
        <div
          style={{
            borderBottom: "1px solid var(--subtle)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Scanlines />
          <ComparisonTable />
        </div>

        {/* ── 2. INTERACTIVE QUICKSTART (Terminal Stepper) ── */}
        <InteractiveQuickstart />

        <div className="section-divider" />

        {/* ── 3. ENGINE PORTAL ── */}
        <section
          id="engine"
          style={{
            padding: "8rem clamp(1.5rem,5vw,4rem)",
            maxWidth: "1200px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <div className="noise-overlay" style={{ opacity: 0.1 }} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: "6rem",
              alignItems: "center",
            }}
          >
            <div>
              <span className="section-eyebrow reveal">// Core Engine</span>
              <h2
                className="section-title reveal reveal-delay-1"
                style={{ fontSize: "clamp(2rem,4vw,3.2rem)", marginBottom: "1.5rem" }}
              >
                Four memory modalities.
                <br />
                <span style={{ color: "var(--amber)" }}>One atomic contract.</span>
              </h2>
              <p className="section-sub reveal reveal-delay-2" style={{ marginBottom: "2.5rem" }}>
                BM25 + HNSW unified via RRF in a single local database engine. relations stored
                natively as weighted graph edges. CRC32C Write-Ahead Logging for absolute crash
                safety.
              </p>
              <div className="reveal reveal-delay-3">
                <Link
                  to="/engine"
                  className="nav-cta"
                  style={{
                    display: "inline-block",
                    padding: "0.85rem 2rem",
                    textDecoration: "none",
                    fontSize: "0.8rem",
                  }}
                >
                  Explore Core Engine Features →
                </Link>
              </div>
            </div>
            <div className="reveal reveal-delay-2" style={{ position: "relative" }}>
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid rgba(255,106,0,0.08)",
                  borderRadius: "var(--radius-md)",
                  padding: "2rem",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Scanlines />
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    marginBottom: "1.5rem",
                    color: "var(--amber)",
                    letterSpacing: "0.1em",
                  }}
                >
                  HYBRID FUSION pipeline
                </div>
                <div className="bars-container">
                  {[
                    { name: "BM25 (lexical)", value: 88, color: "#FF6A00" },
                    { name: "HNSW (vector)", value: 95, color: "#FFC107" },
                    { name: "RRF (fused)", value: 100, color: "#FF8C38" },
                  ].map((b, i) => (
                    <div key={i} style={{ marginBottom: "1.25rem" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "0.4rem",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.7rem",
                          color: "var(--muted)",
                        }}
                      >
                        <span>{b.name}</span>
                        <span style={{ color: b.color }}>{b.value}%</span>
                      </div>
                      <div
                        style={{
                          height: "3px",
                          background: "rgba(255,255,255,0.03)",
                          borderRadius: "2px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          className="bar-fill"
                          style={
                            {
                              "--delay": `${i * 0.15 + 0.3}s`,
                              height: "100%",
                              width: "0",
                              borderRadius: "2px",
                              background: `linear-gradient(to right, ${b.color}, rgba(255,255,255,0.3))`,
                            } as React.CSSProperties
                          }
                          data-w={b.value}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── 4. ARCHITECTURE PORTAL ── */}
        <section
          id="architecture"
          style={{
            background: "var(--surface)",
            borderTop: "1px solid var(--subtle)",
            borderBottom: "1px solid var(--subtle)",
            padding: "8rem clamp(1.5rem,5vw,4rem)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="noise-overlay" style={{ opacity: 0.15 }} />
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr",
              gap: "6rem",
              alignItems: "center",
            }}
          >
            <div className="reveal reveal-delay-1">
              <ArchVisual />
            </div>
            <div>
              <span className="section-eyebrow reveal">// Architecture</span>
              <h2
                className="section-title reveal reveal-delay-1"
                style={{ fontSize: "clamp(2rem,4vw,3.2rem)", marginBottom: "1.5rem" }}
              >
                Built different.
                <br />
                <span style={{ color: "var(--amber)" }}>Runs everywhere.</span>
              </h2>
              <p className="section-sub reveal reveal-delay-2" style={{ marginBottom: "2.5rem" }}>
                VantaDB bridges direct native Python execution to high-performance compiled Rust
                memory storage using PyO3 FFI boundary limits, avoiding expensive serialization or
                server process loops.
              </p>
              <div className="reveal reveal-delay-3">
                <Link
                  to="/architecture"
                  className="nav-cta"
                  style={{
                    display: "inline-block",
                    padding: "0.85rem 2rem",
                    textDecoration: "none",
                    fontSize: "0.8rem",
                  }}
                >
                  View Deep FFI Architecture →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. INTEGRATIONS PORTAL ── */}
        <section
          id="integrations"
          style={{
            padding: "8rem clamp(1.5rem,5vw,4rem)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="noise-overlay" style={{ opacity: 0.12 }} />
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: "6rem",
              alignItems: "center",
            }}
          >
            <div>
              <span className="section-eyebrow reveal">// Ecosystem</span>
              <h2
                className="section-title reveal reveal-delay-1"
                style={{ fontSize: "clamp(2rem,4vw,3.2rem)", marginBottom: "1.5rem" }}
              >
                Agnostic.
                <br />
                <span style={{ color: "var(--amber)" }}>Unbound.</span>
              </h2>
              <p className="section-sub reveal reveal-delay-2" style={{ marginBottom: "2.5rem" }}>
                Directly connect VantaDB to your current AI agents framework. Built with first-class
                support for LlamaIndex index traversal, LangChain vectorstores, AutoGen, and Model
                Context Protocol (MCP).
              </p>
              <div className="reveal reveal-delay-3">
                <Link
                  to="/integrations"
                  className="nav-cta"
                  style={{
                    display: "inline-block",
                    padding: "0.85rem 2rem",
                    textDecoration: "none",
                    fontSize: "0.8rem",
                  }}
                >
                  Explore Orbit Ecosystem →
                </Link>
              </div>
            </div>
            <div className="reveal reveal-delay-2">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid rgba(255,106,0,0.08)",
                    padding: "1.5rem",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      color: "var(--amber)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    SUPPORTED FRAMEWORK
                  </div>
                  <div style={{ color: "var(--white)", fontWeight: 600, fontSize: "1.1rem" }}>
                    LangChain
                  </div>
                </div>
                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid rgba(255,106,0,0.08)",
                    padding: "1.5rem",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      color: "var(--amber)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    SUPPORTED FRAMEWORK
                  </div>
                  <div style={{ color: "var(--white)", fontWeight: 600, fontSize: "1.1rem" }}>
                    LlamaIndex
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── 6. USE CASES PORTAL ── */}
        <section
          id="use-cases"
          style={{ padding: "8rem clamp(1.5rem,5vw,4rem)", maxWidth: "1200px", margin: "0 auto" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr",
              gap: "6rem",
              alignItems: "center",
            }}
          >
            <div>
              <span className="section-eyebrow reveal">// Use Cases</span>
              <h2
                className="section-title reveal reveal-delay-1"
                style={{ fontSize: "clamp(2.5rem,4vw,3.2rem)", marginBottom: "1.5rem" }}
              >
                Where VantaDB
                <br />
                <span style={{ color: "var(--amber)" }}>fits perfectly.</span>
              </h2>
              <p className="section-sub reveal reveal-delay-2" style={{ marginBottom: "2.5rem" }}>
                Persistent scratchpads, memory that survives agent crashes, AST parsing context
                databases, and secure edge execution contexts with zero network footprints.
              </p>
              <div className="reveal reveal-delay-3">
                <Link
                  to="/use-cases"
                  className="nav-cta"
                  style={{
                    display: "inline-block",
                    padding: "0.85rem 2rem",
                    textDecoration: "none",
                    fontSize: "0.8rem",
                  }}
                >
                  View Design Patterns & Code →
                </Link>
              </div>
            </div>
            <div className="reveal reveal-delay-2">
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {["AI AGENTS MEMORY", "LOCAL-FIRST RAG", "CODEBASE INTELLIGENCE"].map((uc, i) => (
                  <div
                    key={i}
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      paddingBottom: "1rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        color: "var(--steel)",
                      }}
                    >
                      0{i + 1} / {uc}
                    </span>
                    <span style={{ color: "var(--amber)" }}>→</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── 7. CTA / SINGULARITY (Glassmorphic bg) ── */}
        <section
          style={{
            padding: "12rem clamp(1.5rem,5vw,4rem)",
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
            backgroundImage: "url('/bg_singularity_cta.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="noise-overlay" style={{ opacity: 0.12 }} />
          <div
            style={{
              position: "relative",
              background: "var(--surface-glass)",
              border: "1px solid rgba(255, 106, 0, 0.12)",
              borderRadius: "var(--radius-xl)",
              padding: "4rem 2rem",
              maxWidth: "800px",
              margin: "0 auto",
              backdropFilter: "blur(12px)",
              boxShadow: "var(--shadow-xl)",
            }}
            className="reveal"
          >
            <h2 className="cta-title" style={{ color: "var(--white)", marginBottom: "1.5rem" }}>
              Memory that
              <br />
              <span style={{ color: "var(--amber)" }}>never escapes.</span>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1.05rem",
                color: "var(--muted)",
                maxWidth: "440px",
                margin: "0 auto 2.5rem",
                lineHeight: 1.7,
              }}
            >
              Start building AI agents with persistent, hybrid-searchable memory today. Apache 2.0.
              One pip install.
            </p>
            <div
              className="cta-group-center"
              style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
            >
              <button
                className="btn-primary"
                style={{ fontSize: "0.9rem", padding: "1rem 2rem" }}
                onClick={() => navigator.clipboard?.writeText("pip install vantadb-py")}
              >
                pip install vantadb-py
              </button>
              <a
                href="https://github.com/ness-e/Vantadb"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                style={{
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                View on GitHub
              </a>
            </div>
            <div
              style={{
                marginTop: "2.5rem",
                display: "flex",
                gap: "1.5rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {["CI passing", "Apache 2.0", "Python 3.8+", "Rust 1.94.1+", "0 external deps"].map(
                (b) => (
                  <span
                    key={b}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      color: "var(--muted)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    ✓ {b}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
