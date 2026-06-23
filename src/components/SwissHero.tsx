import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";

// ── Swiss Hero — 100% Typographic + Animated Grid Background ───────────────
// Animated grid: SVG hairlines with stroke-dashoffset drift (CSS only, no GSAP)
// No images, no particles, no gradients. Typography IS the design.

export function SwissHero() {
  const copyRef = useRef<HTMLButtonElement>(null);

  function handleCopy() {
    void navigator.clipboard.writeText("pip install vantadb").then(() => {
      const btn = copyRef.current;
      if (!btn) return;
      const orig = btn.dataset.label ?? "COPY";
      btn.dataset.label = "COPIED";
      btn.setAttribute("aria-label", "Copied to clipboard");
      setTimeout(() => {
        btn.dataset.label = orig;
        btn.setAttribute("aria-label", "Copy install command");
      }, 2000);
    });
  }

  return (
    <section aria-label="VantaDB hero" className="swiss-hero">
      {/* ── Animated Grid Background ─────────────────────────────────── */}
      <div aria-hidden="true" className="swiss-hero__grid-bg">
        <svg
          className="swiss-hero__grid-svg"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Vertical lines */}
          {[...Array(13)].map((_, i) => (
            <line
              key={`v${i}`}
              className="swiss-hero__grid-line swiss-hero__grid-line--v"
              style={{ "--col": i } as React.CSSProperties}
              x1={`${(i / 12) * 100}%`}
              x2={`${(i / 12) * 100}%`}
              y1="0"
              y2="100%"
            />
          ))}
          {/* Horizontal lines */}
          {[...Array(9)].map((_, i) => (
            <line
              key={`h${i}`}
              className="swiss-hero__grid-line swiss-hero__grid-line--h"
              style={{ "--row": i } as React.CSSProperties}
              x1="0"
              x2="100%"
              y1={`${(i / 8) * 100}%`}
              y2={`${(i / 8) * 100}%`}
            />
          ))}
          {/* Accent cross — Safety Orange, appears at grid intersection */}
          <line
            className="swiss-hero__accent-line"
            stroke="var(--amber)"
            strokeWidth="1"
            x1="8.33%"
            x2="8.33%"
            y1="0"
            y2="100%"
          />
        </svg>
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="swiss-hero__inner">
        {/* Eyebrow */}
        <div className="swiss-hero__eyebrow-row">
          <span className="swiss-hero__index">01 / 08</span>
          <span className="swiss-hero__eyebrow">
            Open-source embedded vector database
          </span>
        </div>

        {/* Main headline — typographic mass */}
        <h1 className="swiss-hero__headline">
          <span className="swiss-hero__headline-line">Memory</span>
          <span className="swiss-hero__headline-line swiss-hero__headline-line--indent">
            for AI
          </span>
          <span className="swiss-hero__headline-line swiss-hero__headline-line--accent">
            Agents.
          </span>
        </h1>

        {/* Sub-statement */}
        <p className="swiss-hero__sub">
          SQL + vector + full-text search in one Rust binary.
          <br />
          Sub-millisecond hybrid queries. Zero infrastructure.
        </p>

        {/* Install strip */}
        <div className="swiss-hero__install-row">
          <div className="swiss-hero__install-pill" role="group">
            <span className="swiss-hero__install-prefix">$</span>
            <code className="swiss-hero__install-cmd">pip install vantadb</code>
            <button
              ref={copyRef}
              aria-label="Copy install command"
              className="swiss-hero__install-copy"
              data-label="COPY"
              onClick={handleCopy}
              type="button"
            >
              <svg
                aria-hidden="true"
                fill="none"
                height="14"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                width="14"
              >
                <rect height="13" rx="0" ry="0" width="13" x="9" y="9" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
          </div>

          {/* CTA buttons */}
          <div className="swiss-hero__cta-group">
            <Link className="btn-primary" to="/docs">
              GET STARTED
            </Link>
            <a
              className="btn-ghost"
              href="https://github.com/ness-e/Vantadb"
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg
                aria-hidden="true"
                fill="none"
                height="14"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                width="14"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              GITHUB
            </a>
          </div>
        </div>

        {/* Proof strip */}
        <div className="swiss-hero__proof-strip">
          {[
            { value: "< 1ms", label: "Hybrid queries" },
            { value: "~400KB", label: "Binary size" },
            { value: "MIT", label: "License" },
            { value: "Rust", label: "Runtime" },
          ].map((item) => (
            <div className="swiss-hero__proof-item" key={item.label}>
              <span className="swiss-hero__proof-value">{item.value}</span>
              <span className="swiss-hero__proof-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
