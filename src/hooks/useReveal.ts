import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

    // Animate bar fills on intersection
    const barObs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const bars = e.target.querySelectorAll(".bar-fill");
            bars.forEach((bar) => {
              const w = bar.getAttribute("data-w");
              if (w) (bar as HTMLElement).style.width = w + "%";
            });
          }
        }),
      { threshold: 0.3 },
    );
    document.querySelectorAll(".bars-container").forEach((el) => barObs.observe(el));

    // Nav glassmorphism on scroll
    const nav = document.querySelector(".vanta-nav");
    const onScroll = () => {
      if (nav) {
        nav.classList.toggle("scrolled", window.scrollY > 60);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Initial check on mount
    onScroll();

    return () => {
      obs.disconnect();
      barObs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}
