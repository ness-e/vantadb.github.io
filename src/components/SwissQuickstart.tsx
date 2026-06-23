import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, TextPlugin);

// ── Swiss Quickstart — Terminal + 4 pasos ──────────────────────────────────
// Swiss rule: process as typography. Each step is a module on the grid.

const STEPS = [
  {
    num: "01",
    title: "Install",
    cmd: "pip install vantadb",
    desc: "Single package. No native dependencies. Works on macOS, Linux, Windows, Android, iOS.",
  },
  {
    num: "02",
    title: "Initialize",
    cmd: 'from vantadb import VantaDB\ndb = VantaDB("./memory.db")',
    desc: "One import. The database file is created automatically.",
  },
  {
    num: "03",
    title: "Store",
    cmd: 'db.add_text("user_42", "Paris is the capital of France",\n  metadata={"source": "wiki"})',
    desc: "Embeddings are generated automatically. No external model needed.",
  },
  {
    num: "04",
    title: "Query",
    cmd: 'results = db.search("What is the capital of France?",\n  mode="hybrid", limit=5)',
    desc: "Semantic + keyword + SQL in one call. No orchestration layer.",
  },
];

export function SwissQuickstart() {
  const [activeStep, setActiveStep] = useState(0);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      gsap.to(codeRef.current, {
        duration: Math.max(0.4, STEPS[activeStep]!.cmd.length * 0.015),
        text: STEPS[activeStep]!.cmd,
        ease: "none",
      });
    }
  }, [activeStep]);

  return (
    <section className="swiss-section swiss-section--dark">
      <div className="swiss-inner">
        <div className="swiss-qs__layout">
          {/* Left: Steps nav */}
          <div className="swiss-qs__steps">
            <span className="swiss-eyebrow">03 / 08 — Quickstart</span>
            <h2 className="swiss-qs__title">
              Zero to
              <br />
              running.
            </h2>

            <ol className="swiss-qs__step-list">
              {STEPS.map((step, i) => (
                <li
                  className={`swiss-qs__step${activeStep === i ? " is-active" : ""}`}
                  key={step.num}
                  onClick={() => setActiveStep(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setActiveStep(i)}
                  aria-current={activeStep === i ? "step" : undefined}
                >
                  <span className="swiss-qs__step-num">{step.num}</span>
                  <div className="swiss-qs__step-body">
                    <span className="swiss-qs__step-title">{step.title}</span>
                    <p className="swiss-qs__step-desc">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="swiss-qs__cta-row">
              <Link className="btn-primary" to="/docs">
                FULL DOCS →
              </Link>
            </div>
          </div>

          {/* Right: Code terminal */}
          <div className="swiss-qs__terminal">
            <div className="swiss-qs__terminal-bar">
              <span className="swiss-qs__terminal-step">STEP {STEPS[activeStep]!.num}</span>
              <span className="swiss-qs__terminal-title">
                {STEPS[activeStep]!.title.toUpperCase()}
              </span>
            </div>
            <div className="swiss-qs__terminal-body">
              <pre className="swiss-qs__terminal-code">
                <code ref={codeRef}></code>
              </pre>
            </div>
            <div className="swiss-qs__terminal-footer">
              <span className="swiss-qs__terminal-prompt">
                <span className="swiss-qs__prompt-dollar">$</span>
                <span className="swiss-qs__prompt-cursor" aria-hidden="true">
                  _
                </span>
              </span>
              <span className="swiss-qs__terminal-py">Python 3.9+</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
