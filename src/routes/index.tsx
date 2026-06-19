import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SingularityHero } from "@/components/SingularityHero";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

// ── GSAP ScrollTrigger reveal ──────────────────────────────────────────────────
function useGSAPReveal() {
  useEffect(() => {
    // ── All .reveal elements (sections 1-7) ──
    document.querySelectorAll(".reveal").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    // ── Section 3: Engine quadrants stagger ──
    gsap.fromTo(
      ".eng-cell",
      { opacity: 0, y: 20, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".eng-wrap",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );

    // ── Engine SVG line draw ──
    gsap.fromTo(
      ".eng-svg-line",
      { strokeDashoffset: 400 },
      {
        strokeDashoffset: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".eng-wrap",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      },
    );

    // ── Section 5: Glow cards stagger ──
    gsap.fromTo(
      "#integrations .glow-card",
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#integrations",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      },
    );

    // ── Section 6: Timeline rail ──
    gsap.fromTo(
      ".tl-rail",
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1,
        ease: "power2.out",
        transformOrigin: "top",
        scrollTrigger: {
          trigger: ".tl-wrap",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );

    // ── Timeline items stagger ──
    gsap.fromTo(
      ".tl-item",
      { opacity: 0, x: -16 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".tl-wrap",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      },
    );

    // ── Timeline dots ──
    gsap.fromTo(
      ".tl-dot",
      { scale: 0 },
      {
        scale: 1,
        duration: 0.4,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".tl-wrap",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      },
    );

    // ── Nav glassmorphism on scroll ──
    const nav = document.querySelector(".vanta-nav");
    const onScroll = () => {
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Glow card mouse tracking ──
    const glowTrack = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    document.querySelectorAll(".glow-card").forEach((el) => el.addEventListener("mousemove", glowTrack));

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener("scroll", onScroll);
      document.querySelectorAll(".glow-card").forEach((el) => el.removeEventListener("mousemove", glowTrack));
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
function ArchCrossSection() {
  const layers = [
    { name: "Python SDK", desc: "vantadb.put() / search() / get()" },
    { name: "PyO3 Bindings", desc: "src/sdk.rs — zero-copy FFI" },
    { name: "Query Planner", desc: "BM25 · HNSW · RRF routing" },
    { name: "Fjall Storage", desc: "WAL + fsync + CRC32C" },
    { name: "HNSW Core", desc: "Cosine · M · ef_construction" },
  ];
  const widths = [94, 86, 78, 70, 62];
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid rgba(255,106,0,0.08)",
        borderRadius: "var(--radius-lg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Scanlines />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.85rem 1.25rem",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          background: "rgba(255,255,255,0.01)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          color: "var(--steel)",
          letterSpacing: "0.04em",
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f56", display: "inline-block" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
        <span style={{ flex: 1, textAlign: "center", opacity: 0.5 }}>vantadb — stack depth v1.1</span>
      </div>
      <div style={{ padding: "1.5rem" }}>
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              right: "0.75rem",
              top: 0,
              bottom: 0,
              width: "1px",
              background:
                "linear-gradient(to bottom, transparent, rgba(255,106,0,0.3), transparent)",
            }}
          />
          {/* Tunnel flow bytes on the rail */}
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "2.5rem", overflow: "hidden", pointerEvents: "none", opacity: 0.6 }}>
            {["01", "FF", "A9", "8C", "E3", "1B", "7A", "D4", "3F", "B2"].map((b, i) => (
              <span key={i} style={{ position: "absolute", left: Math.random() > 0.5 ? "0" : "auto", right: Math.random() > 0.5 ? "0.2rem" : "auto", fontFamily: "var(--font-mono)", fontSize: "0.48rem", color: "var(--amber)", opacity: 0.3, animation: "tunnel-down 2.8s linear infinite", animationDelay: `${i * 0.28}s` }}>{b}</span>
            ))}
          </div>
          {layers.map((l, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: i < layers.length - 1 ? "0.4rem" : 0,
                position: "relative",
              }}
            >
              <div
                style={{
                  flex: 1,
                  maxWidth: `${widths[i]}%`,
                  height: "2.8rem",
                  background: `linear-gradient(135deg, rgba(255,106,0,${0.02 + 0.015 * (layers.length - i)}) 0%, rgba(255,106,0,${0.06 + 0.02 * (layers.length - i)}) 100%)`,
                  border: "1px solid rgba(255,106,0,0.06)",
                  borderRadius: "var(--radius-sm)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 0.75rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    color: "var(--white)",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                  }}
                >
                  {l.name}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    color: "var(--steel)",
                  }}
                >
                  {l.desc}
                </span>
              </div>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--amber)",
                  boxShadow: "0 0 8px rgba(255,106,0,0.5)",
                  display: "inline-block",
                  flexShrink: 0,
                  position: "relative",
                  zIndex: 1,
                }}
              />
            </div>
          ))}
        </div>
      </div>
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
      className="comparison-table"
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
                {/* Terminal footer with typewriter query */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.025)", padding: "0.65rem 1.25rem", display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--steel)" }}>
                  <span style={{ color: "var(--amber)", opacity: 0.7 }}>$</span>
                  <span className="eng-query" style={{ overflow: "hidden", whiteSpace: "nowrap", display: "inline-block", verticalAlign: "bottom", animation: "query-type-in 2.5s steps(35) 0.5s both" }}>MATCH (n) WHERE n.vector &lt;=&gt; [0.85, 0.12] RETURN n</span>
                  <span style={{ display: "inline-block", width: 6, height: 12, background: "var(--amber)", opacity: 0.5, animation: "blink 1s step-end infinite" }} />
                </div>
              </div>
      </div>
    </section>
  );
}

// ── Main Landing ───────────────────────────────────────────────────────────────
function Landing() {
  useGSAPReveal();
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
        @keyframes tl-rail-grow { from { transform:scaleY(0); } to { transform:scaleY(1); } }
        @keyframes tl-dot-in { from { opacity:0; transform:scale(0); } to { opacity:1; transform:scale(1); } }
        @keyframes tl-pulse { 0% { box-shadow:0 0 0 0 rgba(255,106,0,0.3); } 100% { box-shadow:0 0 0 12px rgba(255,106,0,0); } }
        @keyframes eng-wave { 0%,100% { transform:scaleY(0.15); } 50% { transform:scaleY(0.85); } }
        @keyframes eng-ring { 0% { transform:scale(0.2); opacity:0.5; } 100% { transform:scale(1.6); opacity:0; } }
        @keyframes eng-dot-pulse { 0%,100% { opacity:0.15; transform:scale(1); } 50% { opacity:0.7; transform:scale(1.4); } }
        @keyframes eng-breathe { 0%,100% { opacity:0.35; transform:scale(1); } 50% { opacity:0.7; transform:scale(1.06); } }
        @keyframes eng-line-draw { to { stroke-dashoffset:0; } }
        @keyframes tunnel-down { 0% { transform:translateY(-24px); opacity:0; } 12% { opacity:1; } 80% { opacity:0.7; } 100% { transform:translateY(340px); opacity:0; } }
        @keyframes query-type-in { from { max-width:0; } to { max-width:60ch; } }
        @keyframes boot-blink { 0%,100% { opacity:1; } 50% { opacity:0; } }

        .tl-pulse-ring { animation:tl-pulse 2.5s ease-out infinite; }
        .eng-svg-line { stroke-dasharray:400; stroke-dashoffset:400; }

        .glow-card { position:relative; background:var(--surface); border-radius:var(--radius-md); overflow:hidden; z-index:1; cursor:default; }
        .glow-card::before { content:''; position:absolute; inset:0; background:radial-gradient(500px circle at var(--mx,0) var(--my,0), rgba(255,106,0,0.18), transparent 40%); z-index:-1; opacity:0; transition:opacity 0.35s ease; pointer-events:none; }
        .glow-card:hover::before { opacity:1; }
      `}</style>

      {/* Hero (immutable) */}
      <SingularityHero ready={heroReady} />

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

        {/* ── 3. ENGINE — Digital Core (animated quadrant matrix) ── */}
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
                BM25 + HNSW unified via RRF in a single local database engine. Relations stored
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
            <div className="reveal reveal-delay-2 eng-wrap" style={{ position: "relative" }}>
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid rgba(255,106,0,0.1)",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Scanlines />
                {/* Minimal title bar */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.85rem 1.5rem",
                    borderBottom: "1px solid rgba(255,255,255,0.03)",
                    background: "rgba(255,255,255,0.01)",
                  }}
                >
                  <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#ff5f56", display: "inline-block" }} />
                  <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
                  <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
                  <span style={{ flex: 1, textAlign: "center", fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--steel)", opacity: 0.5, letterSpacing: "0.04em" }}>vantadb — digital core</span>
                </div>

                {/* 2×2 quadrant grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
                  {/* ── Cell 1: BM25 ── */}
                  <div className="eng-cell" style={{ borderRight: "1px solid rgba(255,255,255,0.025)", borderBottom: "1px solid rgba(255,255,255,0.025)", padding: "1.5rem" }}>
                    <div style={{ height: 85, position: "relative", overflow: "hidden", marginBottom: "1rem", borderRadius: "var(--radius-sm)", background: "rgba(255,140,60,0.025)", display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 5, padding: "0 10%" }}>
                      {[0, 0.12, 0.24, 0.36, 0.48, 0.36, 0.24, 0.12].map((d, i) => (
                        <div key={i} style={{ width: 5, background: "linear-gradient(to top, rgba(255,140,60,0.45), rgba(255,106,0,0.15))", borderRadius: "2px 2px 0 0", height: "100%", transformOrigin: "bottom", animation: "eng-wave 1.4s ease-in-out infinite", animationDelay: `${d}s` }} />
                      ))}
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--amber)", letterSpacing: "0.1em", marginBottom: "0.6rem", opacity: 0.9 }}>BM25 TEXT SEARCH</div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.5 }}>
                      BM25 lexical search — <span style={{ color: "var(--amber)", fontWeight: 600 }}>1.2ms</span> p99 at <span style={{ color: "var(--white)", fontWeight: 600 }}>100%</span> recall
                    </div>
                  </div>

                  {/* ── Cell 2: HNSW ── */}
                  <div className="eng-cell" style={{ borderBottom: "1px solid rgba(255,255,255,0.025)", padding: "1.5rem" }}>
                    <div style={{ height: 85, position: "relative", overflow: "hidden", marginBottom: "1rem", borderRadius: "var(--radius-sm)", background: "rgba(255,140,60,0.025)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {[0, 0.5, 1, 1.5].map((d, i) => (
                        <div key={i} style={{ position: "absolute", width: "80%", paddingTop: "80%", borderRadius: "50%", border: "1px solid rgba(255,140,60,0.18)", animation: "eng-ring 3s ease-out infinite", animationDelay: `${d}s` }} />
                      ))}
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--amber)", opacity: 0.5, boxShadow: "0 0 12px rgba(255,106,0,0.25)", animation: "eng-breathe 2s ease-in-out infinite" }} />
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--amber)", letterSpacing: "0.1em", marginBottom: "0.6rem", opacity: 0.9 }}>HNSW VECTOR INDEX</div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.5 }}>
                      HNSW vector index — up to <span style={{ color: "var(--white)", fontWeight: 600 }}>32K</span> dimensions, <span style={{ color: "var(--white)", fontWeight: 600 }}>1KB</span> keys
                    </div>
                  </div>

                  {/* ── Cell 3: GraphRAG ── */}
                  <div className="eng-cell" style={{ borderRight: "1px solid rgba(255,255,255,0.025)", padding: "1.5rem" }}>
                    <div style={{ height: 85, position: "relative", overflow: "hidden", marginBottom: "1rem", borderRadius: "var(--radius-sm)", background: "rgba(255,140,60,0.025)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg viewBox="0 0 60 60" style={{ width: "75%", height: "75%" }}>
                        <line x1="10" y1="10" x2="30" y2="10" stroke="rgba(255,140,60,0.12)" strokeWidth="1.2" />
                        <line x1="10" y1="10" x2="10" y2="30" stroke="rgba(255,140,60,0.12)" strokeWidth="1.2" />
                        <line x1="30" y1="10" x2="50" y2="10" stroke="rgba(255,140,60,0.12)" strokeWidth="1.2" />
                        <line x1="50" y1="10" x2="50" y2="30" stroke="rgba(255,140,60,0.12)" strokeWidth="1.2" />
                        <line x1="10" y1="30" x2="30" y2="30" stroke="rgba(255,140,60,0.12)" strokeWidth="1.2" />
                        <line x1="30" y1="30" x2="50" y2="30" stroke="rgba(255,140,60,0.12)" strokeWidth="1.2" />
                        <line x1="30" y1="30" x2="30" y2="50" stroke="rgba(255,140,60,0.12)" strokeWidth="1.2" />
                        <line x1="10" y1="30" x2="10" y2="50" stroke="rgba(255,140,60,0.12)" strokeWidth="1.2" />
                        <line x1="50" y1="30" x2="50" y2="50" stroke="rgba(255,140,60,0.12)" strokeWidth="1.2" />
                        <line x1="10" y1="50" x2="30" y2="50" stroke="rgba(255,140,60,0.12)" strokeWidth="1.2" />
                        <line x1="30" y1="50" x2="50" y2="50" stroke="rgba(255,140,60,0.12)" strokeWidth="1.2" />
                        <circle cx="10" cy="10" r="2.8" fill="rgba(255,140,60,0.2)" animation="eng-dot-pulse 3s ease-in-out infinite 0s" />
                        <circle cx="30" cy="10" r="2.8" fill="rgba(255,140,60,0.2)" animation="eng-dot-pulse 3s ease-in-out infinite 0.4s" />
                        <circle cx="50" cy="10" r="2.8" fill="rgba(255,140,60,0.2)" animation="eng-dot-pulse 3s ease-in-out infinite 0.8s" />
                        <circle cx="10" cy="30" r="2.8" fill="rgba(255,140,60,0.2)" animation="eng-dot-pulse 3s ease-in-out infinite 1.2s" />
                        <circle cx="30" cy="30" r="4" fill="var(--amber)" opacity="0.35" animation="eng-breathe 2.4s ease-in-out infinite" />
                        <circle cx="50" cy="30" r="2.8" fill="rgba(255,140,60,0.2)" animation="eng-dot-pulse 3s ease-in-out infinite 0.6s" />
                        <circle cx="10" cy="50" r="2.8" fill="rgba(255,140,60,0.2)" animation="eng-dot-pulse 3s ease-in-out infinite 1.8s" />
                        <circle cx="30" cy="50" r="2.8" fill="rgba(255,140,60,0.2)" animation="eng-dot-pulse 3s ease-in-out infinite 0.2s" />
                        <circle cx="50" cy="50" r="2.8" fill="rgba(255,140,60,0.2)" animation="eng-dot-pulse 3s ease-in-out infinite 1s" />
                      </svg>
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--amber)", letterSpacing: "0.1em", marginBottom: "0.6rem", opacity: 0.9 }}>GRAPH RAG</div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.5 }}>
                      Weighted-edge graph relations — <span style={{ color: "var(--amber-soft)", fontWeight: 600 }}>0.2ms</span> recovery
                    </div>
                  </div>

                  {/* ── Cell 4: WAL ── */}
                  <div className="eng-cell" style={{ padding: "1.5rem" }}>
                    <div style={{ height: 85, position: "relative", overflow: "hidden", marginBottom: "1rem", borderRadius: "var(--radius-sm)", background: "rgba(255,140,60,0.025)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 48, height: 48, borderRadius: "50%", border: "2px solid rgba(255,140,60,0.2)", display: "flex", alignItems: "center", justifyContent: "center", animation: "eng-breathe 2.5s ease-in-out infinite" }}>
                        <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(255,106,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--amber)", opacity: 0.45, boxShadow: "0 0 8px rgba(255,106,0,0.2)" }} />
                        </div>
                      </div>
                      <svg viewBox="0 0 60 60" style={{ position: "absolute", width: "82%", height: "82%" }}>
                        <path d="M12 30 Q30 6 48 30" fill="none" stroke="rgba(255,140,60,0.1)" strokeWidth="1.5" />
                        <path d="M12 36 Q30 12 48 36" fill="none" stroke="rgba(255,140,60,0.06)" strokeWidth="1.2" />
                      </svg>
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--amber)", letterSpacing: "0.1em", marginBottom: "0.6rem", opacity: 0.9 }}>WAL DURABILITY</div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--muted)", lineHeight: 1.5 }}>
                      <span style={{ color: "var(--white)", fontWeight: 600 }}>CRC32C</span>-checksummed WAL with <span style={{ color: "var(--white)", fontWeight: 600 }}>fsync</span> durability
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── 4. ARCHITECTURE — Stack Cross-Section ── */}
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
              gridTemplateColumns: "1.2fr 1fr",
              gap: "6rem",
              alignItems: "center",
            }}
          >
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
            <div className="reveal reveal-delay-2">
              <ArchCrossSection />
            </div>
          </div>
        </section>

        {/* ── 5. INTEGRATIONS — Compatibility Matrix ── */}
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
            <div className="reveal reveal-delay-2" style={{ position: "relative" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.75rem",
                }}
              >
                {[
                  {
                    name: "LangChain",
                    protocol: "VectorStore",
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill="var(--amber)" d="M7.53 15.975a7.53 7.53 0 0 0 2.206-5.325A7.54 7.54 0 0 0 7.53 5.325L2.205 0A7.54 7.54 0 0 0 0 5.325a7.54 7.54 0 0 0 2.205 5.325zm11.144.493a7.54 7.54 0 0 0-5.325-2.206a7.54 7.54 0 0 0-5.325 2.206l5.325 5.325a7.54 7.54 0 0 0 5.325 2.205A7.54 7.54 0 0 0 24 21.793zM2.219 21.78a7.54 7.54 0 0 0 5.325 2.205v-7.53H.014a7.54 7.54 0 0 0 2.205 5.325M20.73 8.595a7.53 7.53 0 0 0-5.327-2.206a7.53 7.53 0 0 0-5.325 2.207l5.325 5.325z"/>
                      </svg>
                    ),
                    accent: "#FF6A00",
                  },
                  {
                    name: "LlamaIndex",
                    protocol: "Index Traversal",
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill="var(--amber)" d="M15.5 17.3c-2.1.9-4.4.5-5.2.2 0 .2 0 .9-.1 1.8 0 .9-.3 1.5-.5 1.7v2.3c.1-.6.6-.9.8-1.1.1-1.2-.1-2.2-.2-2.6-.2.5-.5 1.5-.7 2.1-.1.4-.3.9-.7 1.3h-1c0-.6.3-.8.5-.8.1-.2.3-.7.5-1.5.1-.8-.1-2.3-.2-3v-2c-1.5-.8-2.1-1.6-2.5-2.6-.3-.7-.2-1.8-.1-2.3-.1-.2-.4-.6-.5-1.2-.1-.9-.1-1.5 0-1.9-.1 0-.3-.6-.3-1.8 0-1.1.4-1.8.5-2v-.5c-.7 0-1.3-.3-1.7-.7-.4-.4-.1-1 .1-1.2.3-.2.5 0 .8-.1.4-.1.6-.2.8-.5.2-.7 0-1.6-.1-2.1.6.1 1 .6 1.1.8V0c.7.3 2 1.2 2.4 2.9.4 1.4.6 4.4.7 5.8 1.8 0 4.1-.3 6.2.2 1.9.4 2.8 1.2 3.8 1.2s1.6-.6 2.3-.1c.7.5 1.1 1.8 1 2.8-.1.8-.7 1.1-1 1.1-.4 1.3 0 2.5.2 3v1.8c.1.2.3.7.3 1.4 0 .7-.2 1.1-.3 1.3.2 1-.1 2.2-.2 2.6h-1.3c.2-.4.4-.5.5-.5.2-1.2.1-2.3 0-2.7-.7-.4-1.2-1.1-1.3-1.5 0 .3 0 .7-.3 1.9-.3.8-.8 1.3-.9 1.5v1h-1.3c0-.6.3-.7.5-.7.2-.4.8-1 .8-2.2 0-1-.7-1.5-1.2-2.4-.3-.5-.4-1.5-.3-2Z"/>
                      </svg>
                    ),
                    accent: "#FF8C38",
                  },
                  {
                    name: "AutoGen",
                    protocol: "Tool API",
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="2" fill="var(--amber)" opacity="0.15"/>
                        <path fill="var(--amber)" d="M8.16 7.18 5.84 14.25h-1.87l2.92-8.53h1.19l.08 1.46Zm1.93 7.07-2.32-7.07-.19-1.46h1.2l3.19 8.53h-1.88Zm-.1-3.18v1.38H5.48v-1.38h4.51Zm9.43-1.3v3.38c-.13.16-.34.34-.62.52-.27.18-.63.34-1.07.47-.44.14-.97.2-1.59.2a4.2 4.2 0 0 1-1.5-.27 2.64 2.64 0 0 1-1.17-.8 3.32 3.32 0 0 1-.75-1.29c-.18-.51-.27-1.1-.27-1.75v-.53c0-.66.09-1.24.26-1.76.17-.51.41-.94.73-1.3.32-.35.7-.62 1.13-.8.44-.18.93-.28 1.46-.28.74 0 1.35.12 1.83.36.48.24.84.57 1.09.99.25.43.41.91.47 1.46h-1.7a1.9 1.9 0 0 0-.2-.76c-.11-.21-.3-.38-.52-.5-.22-.13-.51-.19-.87-.19-.3 0-.56.06-.78.18-.23.12-.42.3-.58.52-.16.23-.27.52-.35.86-.09.34-.13.74-.13 1.18v.55c0 .44.04.84.13 1.17.08.34.2.63.38.86.17.23.38.4.63.52.25.12.54.18.87.18.28 0 .51-.03.69-.07.19-.05.34-.1.45-.17.12-.07.21-.14.27-.2v-1.52h-1.61v-1.26h3.36Z"/>
                      </svg>
                    ),
                    accent: "#FFC107",
                  },
                  {
                    name: "MCP",
                    protocol: "Model Context",
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill="var(--amber)" d="M13.85 0a4.16 4.16 0 0 0-2.95 1.217L1.456 10.66a.835.835 0 0 0 0 1.18.835.835 0 0 0 1.18 0l9.442-9.442a2.49 2.49 0 0 1 3.541 0 2.49 2.49 0 0 1 0 3.541L8.59 12.97l-.1.1a.835.835 0 0 0 0 1.18.835.835 0 0 0 1.18 0l.1-.098 7.03-7.034a2.49 2.49 0 0 1 3.542 0l.049.05a2.49 2.49 0 0 1 0 3.54l-8.54 8.54a1.96 1.96 0 0 0 0 2.755l1.753 1.753a.835.835 0 0 0 1.18 0 .835.835 0 0 0 0-1.18l-1.753-1.753a.266.266 0 0 1 0-.394l8.54-8.54a4.185 4.185 0 0 0 0-5.9l-.05-.05A4.16 4.16 0 0 0 13.85 0m0 3.333a.84.84 0 0 0-.59.245L6.275 10.56a4.186 4.186 0 0 0 0 5.902 4.186 4.186 0 0 0 5.902 0L19.16 9.48a.835.835 0 0 0 0-1.18.835.835 0 0 0-1.18 0l-6.985 6.984a2.49 2.49 0 0 1-3.54 0 2.49 2.49 0 0 1 0-3.54l6.983-6.985a.835.835 0 0 0 0-1.18.84.84 0 0 0-.59-.245"/>
                      </svg>
                    ),
                    accent: "#FF6A00",
                  },
                  {
                    name: "Python SDK",
                    protocol: "Direct FFI",
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill="var(--amber)" d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
                      </svg>
                    ),
                    accent: "#FF8C38",
                  },
                  {
                    name: "Custom SDK",
                    protocol: "REST / gRPC",
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="8" width="16" height="10" rx="1" stroke="var(--amber)" strokeWidth="1.2"/>
                        <path d="M8 12l3 3 5-5" stroke="var(--amber)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ),
                    accent: "#FFC107",
                  },
                ].map((fw, i) => (
                  <div key={i} className="glow-card" style={{ border: "1px solid rgba(255,106,0,0.06)" }}>
                    <div
                      style={{
                        background: "var(--surface)",
                        borderRadius: "calc(var(--radius-md) - 1px)",
                        margin: "1px",
                        padding: "1.25rem 1rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                      }}
                    >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "var(--radius-sm)",
                          background: "rgba(255,106,0,0.04)",
                          border: "1px solid rgba(255,106,0,0.06)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {fw.icon}
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            color: "var(--white)",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {fw.name}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.6rem",
                            color: "var(--steel)",
                            marginTop: "0.1rem",
                          }}
                        >
                          {fw.protocol}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        alignSelf: "flex-start",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "4px",
                        background: "rgba(255,106,0,0.06)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.55rem",
                        color: "var(--amber-soft)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: i === 2 ? "#febc2e" : "#28c840", display: "inline-block" }} />
                      {i === 2 ? "BETA" : "STABLE"}
                    </div>
                  </div>
                </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── 6. USE CASES — Application Cards ── */}
        <section
          id="use-cases"
          style={{ padding: "8rem clamp(1.5rem,5vw,4rem)", maxWidth: "1200px", margin: "0 auto" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
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
            <div className="reveal reveal-delay-2 tl-wrap" style={{ position: "relative", paddingLeft: "3rem", minHeight: "320px" }}>
              {/* Vertical rail */}
              <div className="tl-rail" style={{ position: "absolute", left: "16px", top: "10px", bottom: "10px", width: "1px", background: "linear-gradient(to bottom, var(--amber), rgba(255,106,0,0.04))" }} />
              {[
                {
                  title: "AI Agents Memory",
                  tags: ["≤1ms read", "crash-safe", "zero-config"],
                  desc: "Persistent conversation history for agent runtimes — survives restarts, no external database.",
                },
                {
                  title: "Local-First RAG",
                  tags: ["zero deps", "on-device", "BM25+HNSW"],
                  desc: "Full hybrid search without spinning up a server or installing separate infrastructure.",
                },
                {
                  title: "Codebase Intelligence",
                  tags: ["30K loc/s", "AST-aware", "semantic"],
                  desc: "Parse, index and search codebases with structural awareness and context preservation.",
                },
              ].map((uc, i) => (
                <div key={i} className="tl-item" style={{ display: "flex", gap: "1rem", marginBottom: i < 2 ? "2rem" : 0 }}>
                  {/* Animated dot */}
                  <div style={{ position: "relative", flexShrink: 0, width: 32, height: 32, marginTop: "0.15rem" }}>
                    <div className="tl-dot" style={{ width: 32, height: 32, borderRadius: "50%", border: "1.5px solid rgba(255,106,0,0.35)", background: "var(--surface)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--amber)", position: "relative", zIndex: 1 }}>{i + 1}</div>
                    <div className="tl-pulse-ring" style={{ position: "absolute", inset: -5, borderRadius: "50%", border: "1px solid rgba(255,106,0,0.12)" }} />
                  </div>
                  {/* Content */}
                  <div style={{ flex: 1, paddingTop: "0.2rem" }}>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.25rem" }}>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", fontWeight: 600, color: "var(--white)", letterSpacing: "-0.02em" }}>{uc.title}</span>
                      <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
                        {uc.tags.map((t, ti) => (
                          <span key={ti} style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "var(--amber-soft)", background: "rgba(255,106,0,0.06)", padding: "0.1rem 0.4rem", borderRadius: "3px", letterSpacing: "0.03em" }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.55, margin: 0 }}>{uc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── 7. CTA MINIMAL ── */}
        <section
          style={{
            padding: "10rem clamp(1.5rem,5vw,4rem)",
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
            backgroundImage: "url('/bg_singularity_cta.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="noise-overlay" style={{ opacity: 0.08 }} />
          <div
            className="reveal"
            style={{
              position: "relative",
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem,5vw,4rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "var(--white)",
                lineHeight: 1.1,
                margin: "0 0 1.5rem",
              }}
            >
              Memory that
              <br />
              <span style={{ color: "var(--amber)" }}>never escapes.</span>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                color: "var(--muted)",
                lineHeight: 1.7,
                maxWidth: "460px",
                margin: "0 auto 2.5rem",
              }}
            >
              Start building AI agents with persistent, hybrid-searchable memory. Apache 2.0. One pip install.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                className="btn-primary"
                style={{ fontSize: "0.9rem", padding: "1rem 2.25rem" }}
                onClick={() => navigator.clipboard?.writeText("pip install vantadb-py")}
              >
                pip install vantadb-py
              </button>
              <a
                href="https://github.com/ness-e/Vantadb"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
              >
                View on GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
