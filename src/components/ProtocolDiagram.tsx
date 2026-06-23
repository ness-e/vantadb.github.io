import { useEffect, useRef } from "react";

const STEPS = [
  { label: "PYTHON SDK", detail: "langchain.vectorstores", x: 10, color: "var(--steel)" },
  { label: "FFI BRIDGE", detail: "PyO3 · zero-copy", x: 30, color: "var(--amber)" },
  { label: "RUST ENGINE", detail: "HNSW + BM25 + WAL", x: 50, color: "var(--border-strong)" },
  { label: "QUERY RESULT", detail: "1.2ms p99", x: 70, color: "var(--steel)" },
  { label: "AGENT MEMORY", detail: "crash-safe", x: 88, color: "var(--amber)" },
];

const ARROWS = [
  [10, 30],
  [30, 50],
  [50, 70],
  [70, 88],
];

interface Props {
  style?: React.CSSProperties;
}

export function ProtocolDiagram({ style }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let frame = 0;
    let id = 0;
    function tick() {
      const svg = svgRef.current;
      if (!svg) return;
      frame = (frame + 1) % 120;
      const dots = svg.querySelectorAll<SVGRectElement>(".pd-pulse");
      dots.forEach((d, i) => {
        const t = ((frame + i * 20) % 120) / 120;
        const dash = svg.querySelectorAll<SVGPathElement>(".pd-arrow-path")[i];
        if (dash) {
          const len = dash.getTotalLength();
          const pt = dash.getPointAtLength(Math.min(t * len, len));
          d.setAttribute("x", String(pt.x - 0.75));
          d.setAttribute("y", String(pt.y - 0.75));
        }
      });
      id = requestAnimationFrame(tick);
    }
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      viewBox="0 0 100 30"
      preserveAspectRatio="xMidYMid meet"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.65,
        pointerEvents: "none",
        ...style,
      }}
    >
      {STEPS.map((s, i) => (
        <g key={i}>
          {/* Swiss sharp corners: rx="0" ry="0" */}
          <rect
            x={s.x - 7.5}
            y="3.5"
            width="15"
            height="23"
            rx="0"
            fill="none"
            stroke={s.color}
            strokeWidth="0.4"
            opacity={0.6}
          />
          <text
            x={s.x}
            y="11.5"
            textAnchor="middle"
            fill={s.color}
            fontSize="2.4"
            fontFamily='"JetBrains Mono", monospace'
            fontWeight="700"
            opacity={0.9}
            letterSpacing="0.4"
          >
            {s.label}
          </text>
          <text
            x={s.x}
            y="17"
            textAnchor="middle"
            fill="var(--steel)"
            fontSize="1.6"
            fontFamily='"Outfit", sans-serif'
            fontWeight="500"
            opacity={0.6}
          >
            {s.detail}
          </text>
        </g>
      ))}

      {ARROWS.map(([from, to], i) => (
        <g key={`arrow-${i}`}>
          <path
            className="pd-arrow-path"
            d={`M${from + 7.5} 15 L${to - 7.5} 15`}
            stroke="var(--border)"
            strokeWidth="0.35"
            opacity={0.3}
            strokeDasharray="1.5 2.5"
          />
          {/* Pulsing square for Swiss theme instead of circle */}
          <rect
            className="pd-pulse"
            x={from + 7.5}
            y={15}
            width="1.5"
            height="1.5"
            fill="var(--amber)"
            opacity="0.85"
          />
        </g>
      ))}
    </svg>
  );
}
