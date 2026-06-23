import React, { useEffect, useRef } from "react";
import { useTextScramble } from "@/hooks/useTextScramble";

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "div";
  duration?: number;
  triggerOnce?: boolean;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className,
  as: Tag = "h2",
  duration = 800,
  triggerOnce = true,
}) => {
  const elRef = useRef<HTMLElement>(null);
  const { scramble } = useTextScramble();
  const hasTriggered = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (triggerOnce && hasTriggered.current) return;

            // Add a temporary decoding class for extra flair if defined in CSS
            el.classList.add("text-decoding");
            scramble(el, text, duration);

            setTimeout(() => {
              el.classList.remove("text-decoding");
            }, duration);

            hasTriggered.current = true;
          } else if (!triggerOnce) {
            hasTriggered.current = false;
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, duration, triggerOnce, scramble]);

  return (
    <Tag ref={elRef as any} className={className}>
      {text}
    </Tag>
  );
};
