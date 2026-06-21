import { useEffect, useRef } from "react";

const ROWS = 8;
const COLS_SCALAR = 1;
const COLS_SIMD = 4;

export function SIMDVectorized() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scalarCells = el.querySelectorAll<HTMLDivElement>(".simd-scalar .simd-cell");
    const simdCells = el.querySelectorAll<HTMLDivElement>(".simd-simd .simd-cell");
    const scalarActive = el.querySelectorAll<HTMLDivElement>(".simd-scalar .simd-active");
    const simdActive = el.querySelectorAll<HTMLDivElement>(".simd-simd .simd-active");

    let tick = 0;
    const interval = setInterval(() => {
      tick = (tick + 1) % ROWS;

      scalarActive.forEach((c) => { c.style.opacity = "0"; });
      simdActive.forEach((c) => { c.style.opacity = "0"; });

      if (scalarCells[tick]) {
        const cell = scalarCells[tick].querySelector<HTMLDivElement>(".simd-active");
        if (cell) cell.style.opacity = "1";
      }

      for (let c = 0; c < COLS_SIMD; c++) {
        const idx = (tick * COLS_SIMD + c) % (ROWS * COLS_SIMD);
        const simdRow = Math.floor(idx / COLS_SIMD);
        if (simdCells[simdRow]) {
          const cell = simdCells[simdRow].querySelectorAll<HTMLDivElement>(".simd-active");
          if (cell[c]) cell[c].style.opacity = "1";
        }
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="simd-container"
    >
      {/* Scalar column */}
      <div className="simd-col simd-scalar">
        <div className="simd-col-header simd-col-header--scalar">SCALAR</div>
        <div className="simd-col-sub simd-col-sub--scalar">1 op/cycle</div>
        <div className="simd-col-inner">
          {Array.from({ length: ROWS }).map((_, r) => (
            <div key={r} className="simd-row simd-cell">
              <div className="simd-cell-box">
                <div className="simd-active-dot simd-active" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrow separator */}
      <div className="simd-arrow">→</div>

      {/* SIMD column */}
      <div className="simd-col simd-simd">
        <div className="simd-col-header simd-col-header--simd">SIMD</div>
        <div className="simd-col-sub simd-col-sub--simd">4 ops/cycle</div>
        <div className="simd-col-inner">
          {Array.from({ length: ROWS }).map((_, r) => (
            <div key={r} className="simd-row simd-cell">
              {Array.from({ length: COLS_SIMD }).map((_, c) => (
                <div key={c} className="simd-cell-box">
                  <div className="simd-active-dot simd-active" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
