interface Props {
  size?: number;
  style?: React.CSSProperties;
}

export function HNSWLayerIcon({ size = 80, style }: Props) {
  const s = size;
  const layers = [
    { nodes: 3, y: 10, r: 5 },
    { nodes: 5, y: 35, r: 4 },
    { nodes: 9, y: 60, r: 3.5 },
    { nodes: 15, y: 78, r: 3 },
  ];

  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 100 90"
      fill="none"
      aria-hidden="true"
      style={{ opacity: 0.6, ...style }}
    >
      {layers.map((layer, li) => {
        const spacing = 85 / (layer.nodes + 1);
        const positions = Array.from({ length: layer.nodes }, (_, i) => ({
          x: spacing * (i + 1) + 7.5,
          y: layer.y,
        }));
        const edges: { x1: number; y1: number; x2: number; y2: number }[] = [];
        if (li > 0) {
          const prev = layers[li - 1];
          const prevSpacing = 85 / (prev.nodes + 1);
          for (let pi = 0; pi < prev.nodes; pi++) {
            const px = prevSpacing * (pi + 1) + 7.5;
            const py = prev.y;
            for (let ni = 0; ni < layer.nodes; ni++) {
              if (Math.abs(pi / prev.nodes - ni / layer.nodes) < 0.35) {
                edges.push({ x1: px, y1: py, x2: positions[ni].x, y2: positions[ni].y });
              }
            }
          }
        }
        return (
          <g key={li}>
            {edges.map((e, ei) => (
              <line
                key={ei}
                x1={e.x1}
                y1={e.y1}
                x2={e.x2}
                y2={e.y2}
                stroke="var(--amber)"
                strokeWidth="0.3"
                opacity={0.12}
              />
            ))}
            {positions.map((p, ni) => (
              <circle
                key={ni}
                cx={p.x}
                cy={p.y}
                r={layer.r}
                fill="none"
                stroke="var(--amber)"
                strokeWidth="0.6"
                opacity={0.25 + (li === 0 ? 0.15 : 0)}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
}
