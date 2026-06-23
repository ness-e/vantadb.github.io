import { useRef } from "react";
import { Link } from "@tanstack/react-router";

// ── Swiss Monolith CTA — "The Monolith" ────────────────────────────────────
// OLED black block. Massive install command. Single CTA.
// Swiss rule: reduce to the irreducible minimum.

export function SwissMonolith() {
  const copyRef = useRef<HTMLButtonElement>(null);

  function handleCopy() {
    void navigator.clipboard.writeText("pip install vantadb").then(() => {
      const btn = copyRef.current;
      if (!btn) return;
      btn.classList.add("is-copied");
      setTimeout(() => btn.classList.remove("is-copied"), 2000);
    });
  }

  return (
    <section className="swiss-monolith" aria-label="Get started with VantaDB">
      <div className="swiss-monolith__inner">
        {/* Section label */}
        <div className="swiss-monolith__label-row">
          <span className="swiss-monolith__section-num">08 / 08</span>
          <span className="swiss-monolith__section-tag">Deploy</span>
        </div>

        {/* Main copy */}
        <div className="swiss-monolith__copy">
          <p className="swiss-monolith__headline">
            One command.
            <br />
            That's the
            <br />
            <span className="swiss-monolith__headline--orange">whole</span>{" "}
            install.
          </p>
        </div>

        {/* Install block — the centerpiece */}
        <div className="swiss-monolith__install-block">
          <div className="swiss-monolith__install-prefix">$</div>
          <code className="swiss-monolith__install-cmd">
            pip install vantadb
          </code>
          <button
            ref={copyRef}
            aria-label="Copy install command"
            className="swiss-monolith__copy-btn"
            onClick={handleCopy}
            type="button"
          >
            <span className="swiss-monolith__copy-label">COPY</span>
            <svg
              aria-hidden="true"
              fill="none"
              height="16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="16"
            >
              <rect height="13" rx="0" ry="0" width="13" x="9" y="9" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>
        </div>

        {/* Actions */}
        <div className="swiss-monolith__actions">
          <Link className="btn-primary" to="/docs">
            READ THE DOCS
          </Link>
          <a
            className="btn-ghost btn-ghost--inverted"
            href="https://github.com/ness-e/Vantadb"
            rel="noopener noreferrer"
            target="_blank"
          >
            VIEW ON GITHUB
          </a>
        </div>

        {/* Rule line */}
        <div className="swiss-monolith__rule">
          <span className="swiss-monolith__rule-text">MIT LICENSE</span>
          <div className="swiss-monolith__rule-line" />
          <span className="swiss-monolith__rule-text">OPEN SOURCE</span>
          <div className="swiss-monolith__rule-line" />
          <span className="swiss-monolith__rule-text">ZERO INFRA</span>
        </div>
      </div>
    </section>
  );
}
