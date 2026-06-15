import { useEffect, useRef, useState } from "react";

export function SingularityHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    let experience: any = null;

    // Mock the window.preloader that Experience.js expects
    (window as any).preloader = {
      hidePreloader: () => {},
      showPlayButton: (cb: any) => cb && cb(),
    };

    import("./singularity-master/src/Experience/Experience.js")
      .then(({ default: Experience }) => {
        experience = new Experience(canvasRef.current);

        // ── Performance: pause when tab is hidden ──────────────────
        const onVisibilityChange = () => {
          const renderer = experience?.renderer?.instance;
          if (!renderer) return;
          if (document.hidden) {
            renderer.setAnimationLoop(null); // stop loop
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
              // Hero visible — run at full speed
              renderer.setAnimationLoop(async () => experience.update());
            } else {
              // Hero scrolled away — stop rendering (saves GPU)
              renderer.setAnimationLoop(null);
            }
          },
          { threshold: 0.01 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        // Store cleanup refs on experience object
        (experience as any)._cleanupVisiblityHandler = onVisibilityChange;
        (experience as any)._cleanupObserver = observer;
      })
      .catch((e) => {
        console.error("Experience Load Error:", e);
      });

    return () => {
      if (experience) {
        document.removeEventListener(
          "visibilitychange",
          (experience as any)._cleanupVisiblityHandler
        );
        (experience as any)._cleanupObserver?.disconnect();
        if (typeof experience.destroy === "function") experience.destroy();
      }
    };
  }, [mounted]);

  if (!mounted) {
    return <div className="hero-section" />;
  }

  return (
    <div ref={sectionRef} className="hero-section">
      <canvas id="preloader"></canvas>
      <div id="play-button" style={{ display: "none" }}></div>
      <canvas ref={canvasRef} className="webgl"></canvas>

      <div className="hero-content">
        <div className="hero-eyebrow animate-enter stagger-1">
          <span className="hero-eyebrow-dot"></span>
          Rust-Powered · PyPI Available · Apache 2.0
        </div>

        <h1 className="hero-h1 animate-enter stagger-2">
          <span className="word-vanta">Vanta</span>
          <span className="word-db">DB</span>
        </h1>

        <p className="hero-tagline animate-enter stagger-2">Where context never escapes</p>

        <p className="hero-p animate-enter stagger-3">
          Embedded cognitive memory engine for AI agents. Hybrid search via BM25 + HNSW,
          GraphRAG relations, and crash-safe durability — no servers, no config, one pip install.
        </p>

        <div className="hero-stats animate-enter stagger-4">
          <div>
            <span className="hero-stat-value">1.2ms</span>
            <span className="hero-stat-label">Hybrid Search Latency</span>
          </div>
          <div>
            <span className="hero-stat-value">100%</span>
            <span className="hero-stat-label">Recall@10</span>
          </div>
          <div>
            <span className="hero-stat-value">0</span>
            <span className="hero-stat-label">External Services</span>
          </div>
        </div>

        <div className="cta-group animate-enter stagger-5">
          <button className="btn-primary">pip install vantadb-py</button>
          <a
            href="https://github.com/ness-e/Vantadb"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
