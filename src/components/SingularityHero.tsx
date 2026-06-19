import { useEffect, useRef, useState, useCallback } from "react";

export function SingularityHero({ ready = false }: { ready?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const experienceRef = useRef<any>(null);
  const readyRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync readyRef
  useEffect(() => { readyRef.current = ready; });

  // Single effect: import + start when both mounted and ready
  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    (window as any).preloader = {
      hidePreloader: () => {
        const el = document.getElementById("preloader");
        if (el) el.style.opacity = "0";
        setTimeout(() => {
          if (el) el.style.display = "none";
        }, 500);
      },
      showPlayButton: (cb: any) => cb && cb(),
    };

    import("./singularity-master/src/Experience/Experience.js")
      .then(({ default: Experience }) => {
        if (!readyRef.current || experienceRef.current || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const experience = new Experience(canvas);
        experienceRef.current = experience;

        // ── Performance: pause when tab is hidden ──────────────────
        const onVisibilityChange = () => {
          const renderer = experience?.renderer?.instance;
          if (!renderer) return;
          if (document.hidden) {
            renderer.setAnimationLoop(null);
          } else {
            renderer.setAnimationLoop(async () => experience.update());
          }
        };
        document.addEventListener("visibilitychange", onVisibilityChange);

        // ── Performance: throttle when hero is off-screen ──────────
        const observer = new IntersectionObserver(
          ([entry]) => {
            const renderer = experience?.renderer?.instance;
            if (!renderer) return;
            if (entry.isIntersecting) {
              renderer.setAnimationLoop(async () => experience.update());
            } else {
              renderer.setAnimationLoop(null);
            }
          },
          { threshold: 0.01 },
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        (experience as any)._cleanupVisiblityHandler = onVisibilityChange;
        (experience as any)._cleanupObserver = observer;
      })
      .catch((e) => console.error("Experience Load Error:", e));

    return () => {
      const exp = experienceRef.current;
      if (exp) {
        document.removeEventListener("visibilitychange", (exp as any)._cleanupVisiblityHandler);
        (exp as any)._cleanupObserver?.disconnect();
        if (typeof exp.destroy === "function") exp.destroy();
        experienceRef.current = null;
      }
    };
  }, [mounted, ready]);

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
    <div ref={sectionRef} className="hero-section" id="hero">
      <canvas id="preloader"></canvas>
      <div id="play-button" style={{ display: "none" }}></div>
      <canvas ref={canvasRef} className="webgl"></canvas>

      <div className="hero-content">
        {/* Eyebrow badge */}
        <div className="hero-eyebrow animate-enter stagger-1">
          <span className="hero-eyebrow-dot" />
          <span>Open Source</span>
          <span className="hero-eyebrow-sep">·</span>
          <span>Rust Core</span>
          <span className="hero-eyebrow-sep">·</span>
          <span>Apache 2.0</span>
        </div>

        {/* Headline — editorial two-line treatment */}
        <div className="hero-headline-group animate-enter stagger-2">
          <p className="hero-descriptor">The embedded database for</p>
          <h1 className="hero-h1">
            <span className="word-vanta">Vanta</span>
            <span className="word-db">DB</span>
          </h1>
        </div>

        {/* Tagline */}
        <p className="hero-tagline animate-enter stagger-2">Cognitive memory that never forgets</p>

        {/* Description */}
        <p className="hero-p animate-enter stagger-3">
          Give your AI agents persistent memory with hybrid BM25&nbsp;+&nbsp;HNSW search, native
          GraphRAG relations, and crash-safe WAL durability. No servers. No config.
          One&nbsp;pip&nbsp;install.
        </p>

        {/* CTA group */}
        <div className="cta-group animate-enter stagger-4">
          {/* Install chip — copiable */}
          <button
            className="btn-install"
            onClick={handleCopy}
            aria-label="Copy install command"
            id="hero-copy-install"
          >
            <svg
              className="btn-install-icon"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
              <polyline points="7 11 12 16 17 11" />
              <line x1="12" y1="4" x2="12" y2="16" />
            </svg>
            <code>pip install vantadb-py</code>
            <span className="btn-install-feedback">{copied ? "Copied!" : ""}</span>
          </button>

          {/* GitHub button */}
          <a
            href="https://github.com/ness-e/Vantadb"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            id="hero-github"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>

        {/* Stats strip */}
        <div className="hero-stats animate-enter stagger-5">
          <div className="hero-stat">
            <span className="hero-stat-value">1.2ms</span>
            <span className="hero-stat-label">p99 Hybrid Search</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-value">100%</span>
            <span className="hero-stat-label">Recall@10</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-value">0</span>
            <span className="hero-stat-label">External Services</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator animate-enter stagger-5" aria-hidden="true">
        <div className="hero-scroll-line" />
      </div>
    </div>
  );
}
