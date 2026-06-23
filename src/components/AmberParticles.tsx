import { useEffect, useRef } from "react";

const GRID_STEP = 60; // Distance between grid intersections

export function AmberParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Keep track of grid intersections and their dynamic alphas
    const dots: { x: number; y: number; maxAlpha: number; speed: number; phase: number }[] = [];

    const initializeGrid = () => {
      dots.length = 0;
      const cols = Math.ceil(w / GRID_STEP) + 1;
      const rows = Math.ceil(h / GRID_STEP) + 1;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          dots.push({
            x: c * GRID_STEP,
            y: r * GRID_STEP,
            maxAlpha: 0.03 + Math.random() * 0.08,
            speed: 0.5 + Math.random() * 1.5,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    initializeGrid();
    
    let time = 0;

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      time += 0.015;

      // Draw faint background grid lines (Swiss technical blueprint feel)
      ctx!.strokeStyle = "rgba(0, 0, 0, 0.02)";
      ctx!.lineWidth = 1;

      for (let x = 0; x < w; x += GRID_STEP) {
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, h);
        ctx!.stroke();
      }

      for (let y = 0; y < h; y += GRID_STEP) {
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(w, y);
        ctx!.stroke();
      }

      // Draw precision micro-elements at grid intersections
      for (const dot of dots) {
        const alpha = Math.max(0, dot.maxAlpha * (0.3 + 0.7 * Math.sin(time * dot.speed + dot.phase)));
        
        ctx!.fillStyle = `rgba(255, 85, 0, ${alpha})`;
        
        // Draw 3x3px square dot instead of circle
        ctx!.fillRect(dot.x - 1, dot.y - 1, 3, 3);
        
        // Occasionally draw a tiny crosshair decoration (10px span) at random spots
        if (dot.maxAlpha > 0.09 && Math.sin(time * 0.1 + dot.phase) > 0.95) {
          ctx!.strokeStyle = `rgba(255, 85, 0, ${alpha * 0.4})`;
          ctx!.lineWidth = 0.5;
          ctx!.beginPath();
          ctx!.moveTo(dot.x - 5, dot.y);
          ctx!.lineTo(dot.x + 5, dot.y);
          ctx!.moveTo(dot.x, dot.y - 5);
          ctx!.lineTo(dot.x, dot.y + 5);
          ctx!.stroke();
        }
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-particles"
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
