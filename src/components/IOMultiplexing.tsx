import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Props {
  style?: React.CSSProperties;
}

export function IOMultiplexing({ style }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cvs = canvas;
    const c2d = ctx;

    let W = 0, H = 0;
    const LANES = 4;
    const DOTS_PER_LANE = 25;
    const SPEED = 1.2;

    interface Dot {
      x: number; y: number;
      speed: number;
      state: "queued" | "processed";
      progress: number;
    }

    const dots: Dot[] = [];
    let paused = false;

    function resize() {
      const parent = cvs.parentElement;
      if (!parent) return;
      W = parent.offsetWidth;
      H = parent.offsetHeight;
      cvs.width = W * 2;
      cvs.height = H * 2;
      cvs.style.width = W + "px";
      cvs.style.height = H + "px";
      c2d.scale(2, 2);
    }

    function initDots() {
      dots.length = 0;
      const laneH = H / (LANES + 1);
      for (let lane = 0; lane < LANES; lane++) {
        const y = laneH * (lane + 1);
        for (let i = 0; i < DOTS_PER_LANE; i++) {
          dots.push({
            x: -10 - Math.random() * W * 0.5,
            y: y + (Math.random() - 0.5) * 6,
            speed: SPEED * (0.7 + Math.random() * 0.6),
            state: Math.random() > 0.5 ? "queued" : "processed",
            progress: Math.random(),
          });
        }
      }
    }

    function draw() {
      if (paused) return;
      c2d.clearRect(0, 0, W, H);

      for (let lane = 0; lane < LANES; lane++) {
        const laneY = (H / (LANES + 1)) * (lane + 1);
        c2d.strokeStyle = "rgba(255,140,60,0.04)";
        c2d.lineWidth = 1;
        c2d.beginPath();
        c2d.moveTo(0, laneY);
        c2d.lineTo(W, laneY);
        c2d.stroke();
      }

      for (const d of dots) {
        d.x += d.speed;
        d.progress = Math.min(1, d.x / W);

        if (d.progress < 0.3) {
          d.state = "queued";
        } else if (d.progress > 0.7) {
          d.state = "processed";
        }

        const isProc = d.state === "processed";
        const alpha = isProc ? 0.15 + 0.35 * (d.progress - 0.7) / 0.3 : 0.1 + 0.2 * d.progress / 0.3;
        const radius = isProc ? 3 : 2;
        const color = isProc
          ? `rgba(80,220,100,${alpha})`
          : `rgba(255,255,255,${alpha})`;

        c2d.beginPath();
        c2d.arc(d.x, d.y, radius, 0, Math.PI * 2);
        c2d.fillStyle = color;
        c2d.fill();

        if (d.x > W + 10) {
          d.x = -10;
          d.progress = 0;
          d.state = "queued";
        }
      }
    }

    resize();
    initDots();

    const obs = new IntersectionObserver(([entry]) => { paused = !entry.isIntersecting; }, { threshold: 0 });
    obs.observe(cvs);

    gsap.ticker.add(draw);

    const onResize = () => { resize(); initDots(); };
    window.addEventListener("resize", onResize);

    return () => {
      obs.disconnect();
      gsap.ticker.remove(draw);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="bg-canvas"
      style={{ opacity: 0.5, ...style }}
    />
  );
}
