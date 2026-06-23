import { useState } from "react";

interface Frame {
  label: string;
  w: number;
  children?: Frame[];
}

const FRAMES: Frame[] = [
  {
    label: "pyo3_call",
    w: 100,
    children: [
      {
        label: "ffi_transfer",
        w: 92,
        children: [
          { label: "memory_pin", w: 40 },
          {
            label: "query_parse",
            w: 52,
            children: [
              { label: "lexer", w: 20 },
              { label: "hnsw_search", w: 28 },
            ],
          },
        ],
      },
      { label: "gc_pause", w: 8 },
    ],
  },
  {
    label: "wal_flush",
    w: 48,
    children: [
      { label: "crc32c", w: 28 },
      { label: "fsync", w: 16 },
    ],
  },
  {
    label: "index_merge",
    w: 60,
    children: [
      { label: "bm25_merge", w: 30 },
      { label: "graph_merge", w: 24 },
    ],
  },
];

function FrameBar({ frame, depth }: { frame: Frame; depth: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="framebar-wrapper" style={{ width: `${frame.w}%` }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="framebar-inner"
        style={{
          background: hovered
            ? `rgba(255, 85, 0, ${0.45 + depth * 0.05})`
            : `rgba(0, 0, 0, ${0.035 + depth * 0.03})`,
        }}
      >
        <span className="framebar-label">{frame.label}</span>
      </div>
      {hovered && (
        <div className="framebar-tooltip">
          {frame.label} — {(frame.w * 0.42).toFixed(1)}ms
        </div>
      )}
    </div>
  );
}

function Row({ frames, depth }: { frames: Frame[]; depth?: number }) {
  return (
    <div className="fg-row">
      {frames.map((f, i) => (
        <FrameBar key={i} frame={f} depth={depth ?? 0} />
      ))}
    </div>
  );
}

function renderAll(frames: Frame[], depth = 0) {
  const result: React.ReactNode[] = [];
  result.push(<Row key={depth} frames={frames} depth={depth} />);
  const maxChild = Math.max(...frames.map((f) => f.children?.length ?? 0));
  if (maxChild > 0) {
    for (let ci = 0; ci < maxChild; ci++) {
      const childFrames = frames
        .filter((f) => f.children && f.children[ci])
        .map((f) => ({ ...f.children![ci], w: (f.w / 100) * f.children![ci].w }));
      if (childFrames.length > 0) {
        result.push(...renderAll(childFrames, depth + 1));
      }
    }
  }
  return result;
}

export function Flamegraph() {
  return (
    <div className="fg-outer">
      <div className="fg-label">PROFILE — query latency</div>
      <div className="fg-inner">{renderAll(FRAMES)}</div>
    </div>
  );
}
