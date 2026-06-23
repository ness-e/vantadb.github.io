import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { TypewriterHero } from "./TypewriterHero";
import { AmberParticles } from "./AmberParticles";

const EASE = [0.23, 1, 0.32, 1] as const;

export function SingularityHero() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* Magnetic CTA */
  useEffect(() => {
    const el = ctaRef.current;
    if (!el || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const quickX = gsap.quickTo(el, "x", {
      duration: 0.4,
      ease: "power2.out",
    });
    const quickY = gsap.quickTo(el, "y", {
      duration: 0.4,
      ease: "power2.out",
    });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.08;
      const dy = (e.clientY - cy) * 0.08;
      quickX(dx);
      quickY(dy);
    };

    const onLeave = () => {
      quickX(0);
      quickY(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [mounted]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText("pip install vantadb-py").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  if (!mounted) {
    return <div className="hero-section" />;
  }

  return (
    <div className="hero-section" id="hero">
      <AmberParticles />

      <div className="hero-content">
        <motion.div
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
        >
          <span className="hero-eyebrow-dot" />
          <span>Open Source</span>
          <span className="hero-eyebrow-sep">·</span>
          <span>Rust Core</span>
          <span className="hero-eyebrow-sep">·</span>
          <span>MIT</span>
        </motion.div>

        <motion.h1
          className="hero-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
        >
          VantaDB
        </motion.h1>

        <motion.div
          className="hero-rule"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
        />

        <motion.p
          className="hero-descriptor"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
        >
          The embedded database for <TypewriterHero />
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.7 }}
        >
          <div className="hero-install">
            <span className="hero-install-prompt" aria-hidden="true">
              $
            </span>
            <code className="hero-install-code">pip install vantadb-py</code>
            <button
              className="hero-install-copy"
              onClick={handleCopy}
              aria-label="Copy install command"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </motion.div>

        <motion.div
          className="hero-secondary"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.85 }}
        >
          <a
            ref={ctaRef}
            href="https://github.com/ness-e/Vantadb"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-ghost"
            id="hero-github"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>View on GitHub</span>
          </a>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 1 }}
        >
          <div className="hero-stat">
            <span className="hero-stat-value">1.2ms</span>
            <span className="hero-stat-label">p99 Hybrid</span>
          </div>
          <div className="hero-stat-divider" aria-hidden="true" />
          <div className="hero-stat">
            <span className="hero-stat-value">100%</span>
            <span className="hero-stat-label">Recall@10</span>
          </div>
          <div className="hero-stat-divider" aria-hidden="true" />
          <div className="hero-stat">
            <span className="hero-stat-value">0</span>
            <span className="hero-stat-label">Servers</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
