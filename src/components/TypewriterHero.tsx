import { useEffect, useRef, useState } from "react";

const words = ["memory", "context", "knowledge", "recall", "intelligence"];

export function TypewriterHero() {
  const [displayed, setDisplayed] = useState(words[0]);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");
  const idxRef = useRef(0);
  const charRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const SPEED = 80;
    const PAUSE = 2200;
    const DEL_SPEED = 40;

    let lastTime = 0;
    let accumulator = 0;

    const tick = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      const word = words[idxRef.current % words.length];

      if (phase === "typing") {
        accumulator += delta;
        if (accumulator >= SPEED) {
          accumulator = 0;
          charRef.current++;
          setDisplayed(word.slice(0, charRef.current));
          if (charRef.current >= word.length) {
            setPhase("pausing");
          }
        }
      } else if (phase === "pausing") {
        accumulator += delta;
        if (accumulator >= PAUSE) {
          accumulator = 0;
          setPhase("deleting");
        }
      } else if (phase === "deleting") {
        accumulator += delta;
        if (accumulator >= DEL_SPEED) {
          accumulator = 0;
          charRef.current--;
          setDisplayed(word.slice(0, charRef.current));
          if (charRef.current <= 0) {
            idxRef.current++;
            setPhase("typing");
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  return (
    <span className="typewriter-hero">
      <span className="typewriter-hero-word">{displayed}</span>
      <span className="typewriter-hero-cursor" />
    </span>
  );
}
