import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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

  useGSAP(
    () => {
      // Reveal general
      gsap.fromTo(
        "[data-reveal]",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".swiss-benchmark__bento",
            start: "top 80%",
          },
        },
      );

      // Count-up para el valor Hero (< 1ms)
      const heroVal = document.querySelector(".swiss-benchmark__cell-value--xl");
      if (heroVal) {
        const obj = { val: 10 };
        gsap.to(obj, {
          val: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroVal,
            start: "top 85%",
          },
          onUpdate: () => {
            heroVal.innerHTML = `&lt; ${Math.round(obj.val)}ms`;
          },
        });
      }

      // Count-up para "10x faster" y "400KB"
      document.querySelectorAll(".swiss-benchmark__cell-value.count-up").forEach((el) => {
        const targetText = el.getAttribute("data-target") || "";
        const numericMatch = targetText.match(/\d+/);
        if (!numericMatch) return;
        const targetNum = parseInt(numericMatch[0], 10);
        const prefix = targetText.substring(0, numericMatch.index);
        const suffix = targetText.substring(numericMatch.index! + numericMatch[0].length);

        const obj = { val: 0 };
        gsap.to(obj, {
          val: targetNum,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          onUpdate: () => {
            el.innerHTML = `${prefix}${Math.round(obj.val)}${suffix}`;
          },
        });
      });
    },
    { scope: sectionRef },
  );

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
              Every metric is measured in isolation on commodity hardware. No cloud infrastructure.
              No managed services.
            </p>
          </div>
        </div>

        {/* Bento grid */}
        <div className="swiss-benchmark__bento">
          {/* Large hero metric */}
          <div className="swiss-benchmark__cell swiss-benchmark__cell--hero" data-reveal>
            <span className="swiss-benchmark__cell-value swiss-benchmark__cell-value--xl">
              &lt; 1ms
            </span>
            <span className="swiss-benchmark__cell-label">Hybrid Query Latency</span>
            <span className="swiss-benchmark__cell-sub">SQL + vector + FTS in a single call</span>
            <Link className="swiss-benchmark__cell-link" to="/latency">
              VIEW BENCHMARK →
            </Link>
          </div>

          {/* Right column: 5 smaller cells */}
          <div className="swiss-benchmark__grid-right">
            {METRICS.slice(1).map((m) => {
              const isNumeric = /\d/.test(m.value) && m.id !== "license";
              return (
                <div className="swiss-benchmark__cell" data-reveal key={m.id}>
                  <span
                    className={`swiss-benchmark__cell-value ${isNumeric ? "count-up" : ""}`}
                    data-target={isNumeric ? m.value : undefined}
                  >
                    {isNumeric ? "0" : m.value}
                  </span>
                  <span className="swiss-benchmark__cell-label">{m.label}</span>
                  <span className="swiss-benchmark__cell-sub">{m.sub}</span>
                </div>
              );
            })}
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
