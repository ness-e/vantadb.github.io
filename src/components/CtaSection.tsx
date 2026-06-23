import React, { useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { ScrambleText } from "./ScrambleText";

interface CtaSectionProps {
  title?: string;
  subtitle?: string;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  title = "Context that never fragments.",
  subtitle = "BM25 + HNSW + GraphRAG in a single Rust binary. MIT — go build.",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard?.writeText("pip install vantadb-py").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <section
      className="cta-section section-frame"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div className="cta-section-bg" />
      <div className="reveal cta-content">
        <div className="cta-glow-ring" />
        <ScrambleText text={title} className="cta-heading" />
        <p className="cta-desc">{subtitle}</p>
        <div className="cta-actions">
          <button className="btn-primary" onClick={handleCopy}>
            {copied ? "Copied" : "pip install vantadb-py"}
          </button>
          <Link to="/docs" className="btn-ghost">
            Read docs
          </Link>
        </div>
      </div>
    </section>
  );
};
