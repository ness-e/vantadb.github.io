import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function HNSWIsometric() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const dots = el.querySelectorAll<HTMLDivElement>(".hnsw-dot");
    const ctx = gsap.context(() => {
      dots.forEach((dot, i) => {
        gsap.to(dot, {
          opacity: 0.15 + Math.random() * 0.5,
          scale: 0.6 + Math.random() * 0.8,
          duration: 1 + Math.random() * 2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="hnsw-container"
    >
      {[0, 1, 2].map((layer) => (
        <div
          key={layer}
          className="hnsw-layer"
          style={{
            position: "absolute",
            width: `${62 - layer * 14}%`,
            height: `${62 - layer * 14}%`,
            transform: `rotateX(60deg) rotateZ(-45deg) translateY(${layer * 8}px)`,
            transformStyle: "preserve-3d",
            border: "1px solid rgba(255,140,60,0.12)",
            borderRadius: "12px",
            background: `rgba(255,140,60,${0.02 + layer * 0.01})`,
            transition: "transform 0.3s ease, border-color 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: `${4 - layer}px`,
            padding: `${12 - layer * 3}%`,
          }}
          onMouseEnter={(e) => {
            const t = e.currentTarget;
            t.style.transform = `rotateX(60deg) rotateZ(-45deg) translateY(${layer * 8}px) translateZ(12px)`;
            t.style.borderColor = "rgba(255,140,60,0.3)";
          }}
          onMouseLeave={(e) => {
            const t = e.currentTarget;
            t.style.transform = `rotateX(60deg) rotateZ(-45deg) translateY(${layer * 8}px)`;
            t.style.borderColor = "rgba(255,140,60,0.12)";
          }}
        >
          {Array.from({ length: 5 - layer }).map((_, i) => (
            <div
              key={i}
              className="hnsw-dot"
              style={{
                width: 4 + (2 - layer) * 2,
                height: 4 + (2 - layer) * 2,
                borderRadius: "50%",
                background: "var(--amber)",
                opacity: 0.2,
              }}
            />
          ))}
        </div>
      ))}
      <div className="hnsw-label">
        M=32 · ef_construction=200 · ef_search=40
      </div>
    </div>
  );
}
