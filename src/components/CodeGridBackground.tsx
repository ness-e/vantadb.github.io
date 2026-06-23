import { useEffect, useRef } from "react";

const HEX_CHARS = "0123456789ABCDEF";
const ROWS = 28;
const COLS = 40;

function randomHexPair(): string {
  return HEX_CHARS[Math.floor(Math.random() * 16)] + HEX_CHARS[Math.floor(Math.random() * 16)];
}

function randomByte(): string {
  const n = Math.floor(Math.random() * 256);
  return n.toString(16).toUpperCase().padStart(2, "0");
}

const SEED_LINES: string[] = [];

function initGrid() {
  if (SEED_LINES.length > 0) return;
  for (let r = 0; r < ROWS; r++) {
    let line = "";
    const offset = randomByte();
    line += `${offset}  `;
    for (let c = 0; c < COLS; c++) {
      if (c % 4 === 0 && c !== 0) line += " ";
      line += randomHexPair();
    }
    line += `  `;
    for (let c = 0; c < COLS; c++) {
      const n = Math.floor(Math.random() * 95) + 32;
      line += String.fromCharCode(n);
    }
    SEED_LINES.push(line);
  }
}

interface Props {
  style?: React.CSSProperties;
}

export function CodeGridBackground({ style }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef(0);
  const linesRef = useRef<string[]>([]);

  useEffect(() => {
    initGrid();
    linesRef.current = SEED_LINES.map((l) => l);
    const el = containerRef.current;
    if (!el) return;

    function render() {
      if (!el) return;
      const lines = linesRef.current;
      const changed = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < changed; i++) {
        const ri = Math.floor(Math.random() * ROWS);
        const ci = 6 + Math.floor(Math.random() * (COLS * 3 + COLS - 1));
        const chars = lines[ri].split("");
        chars[ci] = HEX_CHARS[Math.floor(Math.random() * 16)];
        lines[ri] = chars.join("");
      }
      el.textContent = lines.slice(0, ROWS).join("\n");
      animRef.current = requestAnimationFrame(render);
    }

    const idle = setTimeout(() => {
      animRef.current = requestAnimationFrame(render);
    }, 2000);

    return () => {
      clearTimeout(idle);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: "7px",
        lineHeight: "1.25",
        letterSpacing: "0.04em",
        color: "rgba(255,106,0,0.04)",
        whiteSpace: "pre",
        overflow: "hidden",
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        userSelect: "none",
        padding: "1rem",
        ...style,
      }}
    />
  );
}
