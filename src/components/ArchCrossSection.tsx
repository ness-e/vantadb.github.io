function Scanlines() {
  return <div aria-hidden="true" className="scanlines" />;
}

const layers = [
  { name: "Python SDK", desc: "vantadb.put() / search() / get()" },
  { name: "PyO3 Bindings", desc: "src/sdk.rs — zero-copy FFI" },
  { name: "Query Planner", desc: "BM25 · HNSW · RRF routing" },
  { name: "Fjall Storage", desc: "WAL + fsync + CRC32C" },
  { name: "HNSW Core", desc: "Cosine · M · ef_construction" },
];
const widths = [94, 86, 78, 70, 62];

const hexBytes = ["01", "FF", "A9", "8C", "E3", "1B", "7A", "D4", "3F", "B2"];

export function ArchCrossSection() {
  return (
    <div className="arch-terminal">
      <Scanlines />
      <div className="arch-titlebar">
        <span className="term-dot-sm term-dot--red" />
        <span className="term-dot-sm term-dot--yellow" />
        <span className="term-dot-sm term-dot--green" />
        <span className="term-label-sm">vantadb — stack depth v1.1</span>
      </div>
      <div className="arch-body">
        <div className="arch-rail" />
        <div className="hex-tunnel">
          {hexBytes.map((b, i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                left: Math.random() > 0.5 ? "0" : "auto",
                right: Math.random() > 0.5 ? "0.2rem" : "auto",
                fontFamily: "var(--font-mono)",
                fontSize: "0.48rem",
                color: "var(--steel)",
                opacity: 0.2,
                animation: "tunnel-down 2.8s linear infinite",
                animationDelay: `${i * 0.28}s`,
              }}
            >
              {b}
            </span>
          ))}
        </div>
        {layers.map((l, i) => (
          <div
            key={i}
            className="arch-layer-row"
            style={{ marginBottom: i < layers.length - 1 ? "0.4rem" : 0 }}
          >
            <div
              className="arch-bar"
              style={{
                maxWidth: `${widths[i]}%`,
                background: `linear-gradient(135deg, rgba(139,158,183,${0.02 + 0.015 * (layers.length - i)}) 0%, rgba(139,158,183,${0.06 + 0.02 * (layers.length - i)}) 100%)`,
              }}
            >
              <span className="arch-bar-label">{l.name}</span>
              <span className="arch-bar-meta">{l.desc}</span>
              <span className="arch-bar-glow" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
