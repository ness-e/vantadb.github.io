import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollStoryPanel {
  id: string;
  content: ReactNode;
}

interface ScrollStoryProps {
  id: string;
  panels: ScrollStoryPanel[];
  className?: string;
  start?: string;
  end?: string;
  scrub?: number;
}

export function ScrollStory({
  id,
  panels,
  className = "",
  start = "top top",
  end = "+=300%",
  scrub = 1.2,
}: ScrollStoryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const stableKey = useRef("");

  // Stable key based on panel IDs, not ReactNode references
  const currentKey = panels.map((p) => p.id).join(",");
  if (!stableKey.current) stableKey.current = currentKey;

  useEffect(() => {
    const section = sectionRef.current;
    const panelsEl = panelsRef.current;
    if (!section || !panelsEl) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const panelNodes = panelsEl.querySelectorAll(".scroll-panel");

        if (panelNodes.length <= 1) return;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            pinSpacing: true,
            start,
            end,
            scrub,
            anticipatePin: 1,
            id: `story-${id}`,
          },
        });

        const totalMove = 100 * (panelNodes.length - 1);
        const panelHeight = 100 / panelNodes.length;

        panelNodes.forEach((panel, i) => {
          if (i === 0) return;
          const fromY = i * panelHeight;
          const toY = -fromY;
          timeline.to(
            panelsEl,
            {
              y: `${toY}vh`,
              duration: 1,
              ease: "none",
            },
            fromY / totalMove,
          );
        });

        // Entrance animation for each panel
        panelNodes.forEach((panel, i) => {
          const el = panel.querySelector(".scroll-panel-content");
          if (!el) return;
          gsap.fromTo(
            el,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "top 30%",
                scrub: 1,
                containerAnimation: timeline,
                id: `story-${id}-panel-${i}`,
              },
            },
          );
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(panelsEl, { clearProps: "all" });
        panelsEl.querySelectorAll(".scroll-panel-content").forEach((el) => {
          gsap.set(el, { opacity: 1, y: 0 });
        });
      });
    }, section);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, stableKey.current, start, end, scrub]);

  return (
    <section ref={sectionRef} className={`scroll-story ${className}`} data-story={id}>
      <div ref={panelsRef} className="scroll-panels">
        {panels.map((panel, i) => (
          <div key={panel.id} className="scroll-panel" data-index={i}>
            <div className="scroll-panel-content">{panel.content}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
