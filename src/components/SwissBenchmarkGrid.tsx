import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";

// ── Swiss Benchmark Grid — Bento asimétrico 6 métricas ─────────────────────
// Swiss rule: numbers are the design element. No charts. No fluff.

const METRICS = [
  {
    id: "latency",
    value: "< 1ms",
    label: "Hybrid Query Latency",
    sub: "SQL + vector + FTS combined",
    size: "large",
    accent: true,
  },
  {
    id: "binary",
    value: "~400KB",
    label: "Binary Size",
    sub: "Embedded, zero deps",
    size: "medium",
    accent: false,
  },
  {
    id: "throughput",
    value: "10× faster",
    label: "vs Chroma + SQLite stack",
    sub: "Eliminating round trips",
    size: "medium",
    accent: false,
  },
  {
    id: "ram",
    value: "< 8MB",
    label: "RAM Overhead",
    sub: "Edge & mobile ready",
    size: "medium",
    accent: false,
  },
  {
    id: "engines",
    value: "3",
    label: "Unified Engines",
    sub: "SQL · Vector · FTS — one call",
    size: "medium",
    accent: false,
  },
  {
    id: "license",
    value: "MIT",
    label: "License",
    sub: "No vendor lock-in",
    size: "medium",
    accent: false,
  },
];

export function SwissBenchmarkGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer reveal
  useEffect(() => {
    const cells = sectionRef.current?.querySelectorAll("[data-reveal]");
    if (!cells) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    cells.forEach((c, i) => {
      const el = c as HTMLElement;
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
      el.style.transition = `opacity 0.3s var(--ease-cut) ${i * 0.06}s, transform 0.3s var(--ease-cut) ${i * 0.06}s`;
      obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  return (
    <section className="swiss-section" ref={sectionRef}>
      <div className="swiss-inner">
        {/* Section header */}
        <div className="swiss-benchmark__header">
          <span className="swiss-eyebrow">02 / 08 — Performance</span>
          <div className="swiss-benchmark__header-split">
            <h2 className="swiss-benchmark__title">
              Numbers
              <br />
              don't lie.
            </h2>
            <p className="section-sub">
              Every metric is measured in isolation on commodity hardware.
              No cloud infrastructure. No managed services.
            </p>
          </div>
        </div>

        {/* Bento grid */}
        <div className="swiss-benchmark__bento">
          {/* Large hero metric */}
          <div
            className="swiss-benchmark__cell swiss-benchmark__cell--hero"
            data-reveal
          >
            <span className="swiss-benchmark__cell-value swiss-benchmark__cell-value--xl">
              &lt; 1ms
            </span>
            <span className="swiss-benchmark__cell-label">
              Hybrid Query Latency
            </span>
            <span className="swiss-benchmark__cell-sub">
              SQL + vector + FTS in a single call
            </span>
            <Link className="swiss-benchmark__cell-link" to="/latency">
              VIEW BENCHMARK →
            </Link>
          </div>

          {/* Right column: 5 smaller cells */}
          <div className="swiss-benchmark__grid-right">
            {METRICS.slice(1).map((m) => (
              <div
                className="swiss-benchmark__cell"
                data-reveal
                key={m.id}
              >
                <span className="swiss-benchmark__cell-value">{m.value}</span>
                <span className="swiss-benchmark__cell-label">{m.label}</span>
                <span className="swiss-benchmark__cell-sub">{m.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison note */}
        <div className="swiss-benchmark__footnote">
          <span className="swiss-index">
            Benchmarks vs Chroma + SQLite + BM25 on M2 MacBook Pro. See{" "}
            <Link to="/latency">methodology →</Link>
          </span>
        </div>
      </div>
    </section>
  );
}
