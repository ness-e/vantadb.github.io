import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { TypewriterTitle } from "./TypewriterTitle";

const items = [
  {
    label: "STORAGE",
    full: "Storage Architecture",
    oldVal: "Pinecone + Redis + S3",
    vantaVal: "pip install vantadb-py",
    oldBadge: "3 DEPS",
    vantaBadge: "1 CMD",
  },
  {
    label: "COST",
    full: "Infrastructure Cost",
    oldVal: "~$200/mo + latency floor",
    vantaVal: "$0 runtime",
    oldBadge: "$200+",
    vantaBadge: "FREE",
  },
  {
    label: "LATENCY",
    full: "p99 Query Latency",
    oldVal: "200ms (network bound)",
    vantaVal: "1.2ms (in-process)",
    oldBadge: "200ms",
    vantaBadge: "1.2ms",
  },
  {
    label: "CONFIG",
    full: "Configuration & Schema",
    oldVal: "Complex migrations",
    vantaVal: "Zero config",
    oldBadge: "COMPLEX",
    vantaBadge: "ZERO",
  },
  {
    label: "MAINT",
    full: "Maintenance",
    oldVal: "3 services to monitor",
    vantaVal: "0 daemon deps",
    oldBadge: "3 SVC",
    vantaBadge: "0 DEPS",
  },
];

const metrics = [
  { value: "15M+", label: "downloads" },
  { value: "1,000+", label: "GitHub stars" },
  { value: "99.97%", label: "uptime" },
  { value: "MIT", label: "license" },
];

function TerminalCell({
  item,
  active,
  onDone,
}: {
  item: (typeof items)[number];
  active: boolean;
  onDone: () => void;
}) {
  const [phase, setPhase] = useState<"idle" | "visible" | "done">("idle");
  const navigate = useNavigate();

  const routeMap: Record<string, string> = {
    STORAGE: "/storage",
    COST: "/cost",
    LATENCY: "/latency",
    CONFIG: "/config",
    MAINT: "/maint",
  };

  useEffect(() => {
    if (active && phase === "idle") setPhase("visible");
  }, [active, phase]);

  useEffect(() => {
    if (phase !== "visible") return;
    const t = setTimeout(() => {
      setPhase("done");
      onDone();
    }, 2200);
    return () => clearTimeout(t);
  }, [phase, onDone]);

  const handleClick = () => {
    const path = routeMap[item.label];
    if (path) navigate({ to: path });
  };

  return (
    <div
      className={`term-cell ${phase !== "idle" ? "visible" : ""} ${phase === "done" ? "done" : ""}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="term-cell-titlebar">
        <span className="term-cell-dot term-cell-dot--red" />
        <span className="term-cell-dot term-cell-dot--yellow" />
        <span className="term-cell-dot term-cell-dot--green" />
        <span className="term-cell-title">{item.label}</span>
      </div>
      <div className="term-cell-body">
        <div className="term-cell-metric">{item.full}</div>
        <div className="term-cell-line old">
          <span className="term-cell-x">✗</span>
          <span className="term-cell-tag">LEGACY</span>
        </div>
        <div className="term-cell-val old">{item.oldVal}</div>
        <div className="term-cell-score old">{item.oldBadge}</div>
        <div className="term-cell-div" />
        <div className="term-cell-line vanta">
          <span className="term-cell-check">✓</span>
          <span className="term-cell-tag vanta">VANTADB</span>
        </div>
        <div className="term-cell-val vanta">{item.vantaVal}</div>
        <div className="term-cell-score vanta">{item.vantaBadge}</div>
      </div>
    </div>
  );
}

export function ComparisonTable() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveIdx(0);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleDone = () => {
    setActiveIdx((prev) => {
      if (prev === null) return null;
      if (prev < items.length) return prev + 1;
      return prev;
    });
  };

  return (
    <div className="comparison-table section-wrapper--cmp">
      <div className="reveal text-center text-center--mb">
        <span className="section-eyebrow">// VantaDB vs. The Stack</span>
        <TypewriterTitle phase={activeIdx} />
        <p className="section-sub section-sub--centered">
          A side-by-side comparison of every infrastructure layer — complexity, cost, and
          performance.
        </p>
      </div>

      <div ref={containerRef} className="term-grid">
        {items.map((item, idx) => (
          <TerminalCell key={idx} item={item} active={activeIdx === idx} onDone={handleDone} />
        ))}
      </div>

      <div className="reveal reveal-delay-2 cmp-metrics-wrap">
        <div className="metrics-strip">
          {metrics.map((m, i) => (
            <div key={i} className="metric-item">
              <span className="metric-value">{m.value}</span>
              <span className="metric-label">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
