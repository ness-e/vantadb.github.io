import { useEffect, useRef } from "react";
import { animate } from "animejs";

interface Props {
  size?: number;
  style?: React.CSSProperties;
}

const SHAPES = [
  // Cube
  "M12 2 L22 7 L22 17 L12 22 L2 17 L2 7 Z M12 2 L12 12 M22 7 L12 12 M2 7 L12 12 M12 22 L12 12",
  // Cylinder
  "M12 2 C7 2, 3 4.5, 3 8 L3 18 C3 21.5, 7 24, 12 24 C17 24, 21 21.5, 21 18 L21 8 C21 4.5, 17 2, 12 2 Z M3 8 C3 11.5, 7 14, 12 14 C17 14, 21 11.5, 21 8",
  // Graph nodes
  "M12 3 L12 9 M12 9 L8 15 M12 9 L16 15 M8 15 L4 21 M16 15 L20 21 M6 6 A2 2 0 1 1 2 6 A2 2 0 1 1 6 6 Z M22 6 A2 2 0 1 1 18 6 A2 2 0 1 1 22 6 Z M14 21 A2 2 0 1 1 10 21 A2 2 0 1 1 14 21 Z",
];

export function AnimeMorphLogo({ size = 120, style }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const anim = animate(path, {
      d: SHAPES.map((s) => ({ value: s })),
      duration: 3000,
      easing: "easeInOutQuad",
      direction: "alternate",
      loop: true,
    });

    return () => { anim.pause(); };
  }, []);

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--amber)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ opacity: 0.5, ...style }}
    >
      <path ref={pathRef} d={SHAPES[0]} />
    </svg>
  );
}
