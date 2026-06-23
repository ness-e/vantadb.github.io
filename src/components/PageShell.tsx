import { useEffect, type ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("is-visible");
      }),
      { threshold: 0.08 },
    );

    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => obs.observe(el));

    return () => obs.disconnect();
  }, []);

  return (
    <div className="page-wrapper">
      {children}
    </div>
  );
}
