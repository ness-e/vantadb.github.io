import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

interface Props {
  rows?: number;
  cols?: number;
  style?: React.CSSProperties;
}

export function AnimeStaggerGrid({ rows = 10, cols = 10, style }: Props) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const dots = el.querySelectorAll<HTMLDivElement>(".stagger-dot");

    const anim = animate(dots, {
      scale: [
        { value: [0.2, 1], duration: 600 },
        { value: 0.2, duration: 600 },
      ],
      opacity: [
        { value: [0, 0.5], duration: 600 },
        { value: 0, duration: 600 },
      ],
      delay: stagger(40, {
        grid: [cols, rows],
        from: "center",
      }),
      loop: true,
      easing: "easeInOutQuad",
    });

    return () => {
      anim.pause();
    };
  }, [rows, cols]);

  return (
    <div
      ref={gridRef}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 3,
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <div key={i} className="stagger-dot stagger-dot-cell" />
      ))}
    </div>
  );
}
