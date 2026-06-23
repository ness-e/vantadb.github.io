import { useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface LayerInfo {
  title: string;
  desc: string;
}

const LAYER_DETAILS: Record<string, LayerInfo> = {
  default: {
    title: "VantaDB Stack Overview",
    desc: "Hover over the blueprint layers to inspect how VantaDB coordinates queries and storage inside a single embedded Rust binary.",
  },
  api: {
    title: "[01] Client API & Bindings",
    desc: "Zero-dependency embedded bindings for Python (PyO3) and Rust, alongside a lightweight CLI/REST wrapper. Communicates directly with the database in-process.",
  },
  planner: {
    title: "[02] Hybrid Query Planner",
    desc: "Optimizes combined SQL filters, HNSW vector similarity, and BM25 full-text queries, synthesizing them into a single-pass execution plan.",
  },
  storage: {
    title: "[03] Unified Storage Engine",
    desc: "A custom storage layout packing SQL tables, HNSW indexes, and full-text indexes into a single .db file under 400KB. Uses WAL for crash-safe operations.",
  },
};

export function SwissArchSection() {
  const [activeLayer, setActiveLayer] = useState<string>("default");
  const containerRef = useRef<HTMLElement>(null);

  const currentInfo = LAYER_DETAILS[activeLayer] || LAYER_DETAILS.default;

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".swiss-arch-visual",
          start: "top 80%",
        },
      });

      tl.fromTo(
        ".swiss-blueprint-box",
        { opacity: 0, scaleX: 0.95 },
        { opacity: 1, scaleX: 1, duration: 0.6, stagger: 0.2, ease: "power2.out" },
      )
        .fromTo(
          ".swiss-blueprint-text",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
          "-=0.4",
        )
        .fromTo(
          ".swiss-blueprint-line",
          { opacity: 0 },
          { opacity: 1, duration: 0.5, stagger: 0.1 },
          "-=0.2",
        );

      gsap.fromTo(
        ".swiss-arch-content > *",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".swiss-arch-content", start: "top 85%" },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="swiss-arch-section">
      <div className="swiss-inner">
        <div className="swiss-section-header swiss-section-header--bordered">
          <span className="swiss-eyebrow">07 / 08 — Architecture</span>
        </div>

        <div className="swiss-arch-grid">
          <div className="swiss-arch-content">
            <h2 className="swiss-arch-title">
              Three layers.
              <br />
              One file.
            </h2>
            <p className="swiss-arch-body">
              VantaDB stacks a SQL engine, an HNSW vector index, and a BM25 full-text index in a
              single embedded binary. No IPC, no sockets, no network overhead.
            </p>
            <div style={{ marginTop: "1rem" }}>
              <Link className="btn-ghost" to="/architecture">
                VIEW ARCHITECTURE →
              </Link>
            </div>
          </div>

          <div className="swiss-arch-visual">
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  color: "var(--steel)",
                  letterSpacing: "0.05em",
                }}
              >
                SYSTEM_BLUEPRINT_V2.0
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  color: "var(--amber)",
                }}
              >
                INTERACTIVE
              </span>
            </div>

            <svg
              viewBox="0 0 400 240"
              className="swiss-blueprint-svg"
              aria-label="Database architecture diagram"
            >
              {/* API Layer Box */}
              <rect
                x="20"
                y="15"
                width="360"
                height="40"
                className="swiss-blueprint-box"
                onMouseEnter={() => setActiveLayer("api")}
                onMouseLeave={() => setActiveLayer("default")}
              />
              <text x="40" y="38" className="swiss-blueprint-text">
                [01] CLIENT API & BINDINGS
              </text>
              <text x="310" y="38" className="swiss-blueprint-text swiss-blueprint-text--accent">
                RUST / PY
              </text>

              {/* Connecting Lines 1 */}
              <line
                x1="80"
                y1="55"
                x2="80"
                y2="95"
                className={`swiss-blueprint-line ${activeLayer === "api" || activeLayer === "planner" ? "swiss-blueprint-line--active" : ""}`}
              />
              <line
                x1="320"
                y1="55"
                x2="320"
                y2="95"
                className={`swiss-blueprint-line ${activeLayer === "api" || activeLayer === "planner" ? "swiss-blueprint-line--active" : ""}`}
              />

              {/* Query Planner Box */}
              <rect
                x="20"
                y="95"
                width="360"
                height="40"
                className="swiss-blueprint-box"
                onMouseEnter={() => setActiveLayer("planner")}
                onMouseLeave={() => setActiveLayer("default")}
              />
              <text x="40" y="118" className="swiss-blueprint-text">
                [02] HYBRID QUERY PLANNER
              </text>
              <text x="310" y="118" className="swiss-blueprint-text swiss-blueprint-text--accent">
                SQL + VEC
              </text>

              {/* Connecting Lines 2 */}
              <line
                x1="120"
                y1="135"
                x2="120"
                y2="175"
                className={`swiss-blueprint-line ${activeLayer === "planner" || activeLayer === "storage" ? "swiss-blueprint-line--active" : ""}`}
              />
              <line
                x1="280"
                y1="135"
                x2="280"
                y2="175"
                className={`swiss-blueprint-line ${activeLayer === "planner" || activeLayer === "storage" ? "swiss-blueprint-line--active" : ""}`}
              />

              {/* Storage Box */}
              <rect
                x="20"
                y="175"
                width="360"
                height="45"
                className="swiss-blueprint-box"
                onMouseEnter={() => setActiveLayer("storage")}
                onMouseLeave={() => setActiveLayer("default")}
              />
              <text x="40" y="198" className="swiss-blueprint-text">
                [03] STORAGE ENGINE & WAL
              </text>
              <text x="310" y="198" className="swiss-blueprint-text swiss-blueprint-text--accent">
                .DB FILE
              </text>

              {/* Background structural lines decoration */}
              <line
                x1="20"
                y1="5"
                x2="380"
                y2="5"
                stroke="var(--border)"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <line
                x1="20"
                y1="235"
                x2="380"
                y2="235"
                stroke="var(--border)"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </svg>

            <div className="swiss-blueprint-info">
              <div className="swiss-blueprint-info-title">{currentInfo.title}</div>
              <div className="swiss-blueprint-info-desc">{currentInfo.desc}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
