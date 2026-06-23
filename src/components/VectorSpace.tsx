import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Props {
  style?: React.CSSProperties;
  grid?: boolean;
}

export function VectorSpace({ style, grid = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0,
      H = 0;
    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const COUNT = 80;
    const REPEL_RADIUS = 250;
    let mouseX = -9999,
      mouseY = -9999;
    let paused = false;

    const cvs = canvas;
    const c2d = ctx;

    function resize() {
      const parent = cvs.parentElement;
      if (!parent) return;
      W = parent.offsetWidth;
      H = parent.offsetHeight;
      cvs.width = W * 2;
      cvs.height = H * 2;
      cvs.style.width = W + "px";
      cvs.style.height = H + "px";
      c2d.setTransform(2, 0, 0, 2, 0, 0);
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: 0.6 + Math.random() * 1.4,
        });
      }
    }

    function draw() {
      if (paused) return;
      c2d.clearRect(0, 0, W, H);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        let dx = mouseX - p.x;
        let dy = mouseY - p.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          p.x -= (dx / dist) * force * 2.5;
          p.y -= (dy / dist) * force * 2.5;
        }

        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;
      }

      if (grid) {
        c2d.strokeStyle = "rgba(255,255,255,0.02)";
        c2d.lineWidth = 0.5;
        const step = 60;
        for (let x = 0; x < W; x += step) {
          c2d.beginPath();
          c2d.moveTo(x, 0);
          c2d.lineTo(x, H);
          c2d.stroke();
        }
        for (let y = 0; y < H; y += step) {
          c2d.beginPath();
          c2d.moveTo(0, y);
          c2d.lineTo(W, y);
          c2d.stroke();
        }
      }

      for (const p of particles) {
        c2d.beginPath();
        c2d.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        c2d.fillStyle = `rgba(255,255,255,${0.08 + p.r * 0.06})`;
        c2d.fill();
      }
    }

    resize();
    initParticles();

    const obs = new IntersectionObserver(
      ([entry]) => {
        paused = !entry.isIntersecting;
      },
      { threshold: 0 },
    );
    obs.observe(cvs);

    gsap.ticker.add(draw);

    const onMove = (e: MouseEvent) => {
      const rect = cvs.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };
    const onResize = () => {
      resize();
      initParticles();
    };

    cvs.addEventListener("mousemove", onMove);
    cvs.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    return () => {
      obs.disconnect();
      gsap.ticker.remove(draw);
      cvs.removeEventListener("mousemove", onMove);
      cvs.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [grid]);

  return <canvas ref={canvasRef} className="bg-canvas" style={{ opacity: 0.6, ...style }} />;
}
