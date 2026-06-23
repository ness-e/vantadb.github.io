import { useEffect, useRef, useState } from "react";
import { highlightCode, liveHighlight } from "./terminal-utils";

const steps: {
  title: string;
  label: string;
  pythonCode: string;
  rustCode: string;
  pythonOutput: string[];
  rustOutput: string[];
}[] = [
  {
    title: "INSTALL",
    label: "pip install",
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
      "$ cargo add vantadb",
      "    Updating crates.io index",
      "      Adding vantadb v0.1.4 to dependencies",
      "✓ Pure Rust core, zero bindings layer",
      "✓ Cargo.toml ready for build",
    ],
  },
  {
    title: "INITIALIZE",
    label: "Open local DB",
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
    title: "STORE",
    label: "Put record",
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
    title: "SEARCH",
    label: "Hybrid search",
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

export function InteractiveQuickstart() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set([0]));
  const [ready, setReady] = useState(false);
  const [lang, setLang] = useState<"python" | "rust">("python");
  const [copied, setCopied] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    return () => cancelAnimationFrame(id);
  }, []);

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
    } catch {
      /* clipboard unavailable */
    }
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
    return () => {
      clearInterval(t);
    };
  }, [codeText, outputLines.length]);

  return (
    <section id="quickstart" aria-labelledby="quickstart-heading" className="section-wrapper--qs">
      <div className="reveal text-center--mb-lg">
        <span className="section-eyebrow">// Quickstart</span>
        <h2 id="quickstart-heading" className="section-title section-title--qs">
          Get started in <span className="text-highlight--amber">seconds.</span>
        </h2>
        <p className="section-sub section-sub--qs">
          Install, import and query locally. Zero dependencies. Open a file and go.
        </p>
      </div>

      <div className={`sp-layout ${ready ? "ready" : ""}`}>
        <nav className="sp-sidebar" aria-label="Quickstart steps">
          {steps.map((s, idx) => {
            const status =
              activeIdx === idx ? "active" : completed.has(idx) ? "completed" : "pending";
            return (
              <button
                key={idx}
                className={`sp-sidebar-item ${status}`}
                onClick={() => navigate(idx)}
              >
                <span className="sp-sidebar-num">{String(idx + 1).padStart(2, "0")}</span>
                <span>{s.title}</span>
                <span
                  className={`sp-sidebar-icon ${status === "active" ? "active-dot" : status === "completed" ? "done-dot" : ""}`}
                >
                  {status === "active" ? "●" : status === "completed" ? "✓" : ""}
                </span>
              </button>
            );
          })}
        </nav>

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
                <span className="tl-legend-item text-highlight--amber">● active</span>
                <span className="tl-legend-item tl-legend-item--done">✓ done</span>
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
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
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
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Rust Core (FFI)
                </button>
              </div>

              <div className="sp-code-wrap" key={`code-${copyKey}`}>
                <button
                  className="sp-copy-btn"
                  onClick={() => copyCode(copyKey, codeText)}
                  aria-label="Copy code"
                >
                  {copied === copyKey ? (
                    <span className="sp-copied-label">Copied</span>
                  ) : (
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
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
                  <div key={lIdx} className="sp-out-line" style={{ color: outColor(line) }}>
                    {line}
                  </div>
                ))}
                {outRevealed > 0 && outRevealed <= outputLines.length && typingDone && (
                  <span className="typing-cursor typing-cursor--out">▊</span>
                )}
              </div>
            </div>

            <div className="term-footer">
              <span className="term-prompt">$</span>
              <span className="term-query term-query--anim">
                MATCH (n) WHERE n.vector &lt;=&gt; [0.85, 0.12] RETURN n
              </span>
              <span className="term-cursor-block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
