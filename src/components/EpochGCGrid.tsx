import { useEffect, useRef } from "react";

const ROWS = 4;
const COLS = 6;
const STATES = ["free", "active", "stale", "reclaiming"] as const;
const STATE_COLORS: Record<string, string> = {
  free: "rgba(255,255,255,0.02)",
  active: "rgba(255,140,60,0.08)",
  stale: "rgba(255,140,60,0.02)",
  reclaiming: "rgba(80,220,100,0.06)",
};
const STATE_BORDERS: Record<string, string> = {
  free: "rgba(255,255,255,0.03)",
  active: "rgba(255,140,60,0.12)",
  stale: "rgba(255,140,60,0.05)",
  reclaiming: "rgba(80,220,100,0.08)",
};

let nextId = 0;

function createBlock(): { id: number; state: string } {
  return { id: nextId++, state: "free" };
}

export function EpochGCGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const cells = el.querySelectorAll<HTMLDivElement>(".epoch-cell");
    const blocks = Array.from({ length: ROWS * COLS }, () => createBlock());
    const stateOrder = ["active", "stale", "reclaiming", "free"];

    function tick() {
      for (let i = 0; i < blocks.length; i++) {
        const b = blocks[i];
        const curIdx = stateOrder.indexOf(b.state);
        const nextIdx = (curIdx + 1) % stateOrder.length;
        if (Math.random() > 0.55) {
          b.state = stateOrder[nextIdx];
        }
      }
      cells.forEach((cell, i) => {
        if (i < blocks.length) {
          const b = blocks[i];
          (cell as HTMLDivElement).style.background = STATE_COLORS[b.state];
          (cell as HTMLDivElement).style.borderColor = STATE_BORDERS[b.state];
        }
      });
    }

    const interval = setInterval(tick, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="epoch-grid"
      style={{ gridTemplateColumns: `repeat(${COLS}, 10px)` }}
    >
      {Array.from({ length: ROWS * COLS }).map((_, i) => (
        <div key={i} className="epoch-cell" />
      ))}
    </div>
  );
}
