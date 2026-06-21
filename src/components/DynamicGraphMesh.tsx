import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Props {
  style?: React.CSSProperties;
}

export function DynamicGraphMesh({ style }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const NODE_COUNT = 60;
    const CONNECT_DIST = 150;
    const REPEL_RADIUS = 180;
    let mouseX = -9999, mouseY = -9999;
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

    function initNodes() {
      nodes.length = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: 1.2 + Math.random() * 1.8,
        });
      }
    }

    function draw() {
      if (paused) return;
      c2d.clearRect(0, 0, W, H);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;

        let dx = mouseX - n.x;
        let dy = mouseY - n.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          n.x -= (dx / dist) * force * 3;
          n.y -= (dy / dist) * force * 3;
        }

        if (n.x < 0) n.x = W;
        if (n.x > W) n.x = 0;
        if (n.y < 0) n.y = H;
        if (n.y > H) n.y = 0;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.15;
            c2d.beginPath();
            c2d.moveTo(nodes[i].x, nodes[i].y);
            c2d.lineTo(nodes[j].x, nodes[j].y);
            c2d.strokeStyle = `rgba(255,140,60,${alpha})`;
            c2d.lineWidth = 0.6;
            c2d.stroke();
          }
        }
      }

      for (const n of nodes) {
        c2d.beginPath();
        c2d.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        c2d.fillStyle = `rgba(255,140,60,${0.15 + n.r * 0.08})`;
        c2d.fill();
      }
    }

    resize();
    initNodes();

    const obs = new IntersectionObserver(([entry]) => { paused = !entry.isIntersecting; }, { threshold: 0 });
    obs.observe(cvs);

    const ticker = gsap.ticker.add(draw);

    const onMove = (e: MouseEvent) => {
      const rect = cvs.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onLeave = () => { mouseX = -9999; mouseY = -9999; };
    const onResize = () => { resize(); initNodes(); };

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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="bg-canvas"
      style={{ opacity: 0.7, ...style }}
    />
  );
}
