import { useEffect, useState } from "react";

const phrases = [
  { pre: "", word: "One", post: " dependency, not three." },
  { pre: "", word: "Zero", post: " cost at runtime." },
  { pre: "", word: "In-process", post: ", not networked." },
  { pre: "", word: "No", post: " config files needed." },
  { pre: "", word: "Nothing", post: " to monitor." },
];

export function TypewriterTitle({ phase }: { phase: number | null }) {
  const [charCount, setCharCount] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => setBlink((c) => !c), 530);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (phase === null) { setCharCount(0); return; }

    const baseIdx = phase < phrases.length ? phase : 0;
    setCurrentIdx(baseIdx);

    let cancelled = false;
    const SPEED = 65;
    const DEL_SPEED = 50;
    const PAUSE = 2200;
    const GAP = 800;

    const typePhrase = (phraseIdx: number, cb: () => void) => {
      if (cancelled) return;
      const phrase = phrases[phraseIdx % phrases.length];
      const full = phrase.pre + phrase.word + phrase.post;
      setCurrentIdx(phraseIdx);
      setCharCount(0);
      let ci = 0;
      const ti = setInterval(() => {
        if (cancelled) { clearInterval(ti); return; }
        ci++;
        setCharCount(ci);
        if (ci >= full.length) {
          clearInterval(ti);
          setTimeout(() => {
            if (cancelled) return;
            const di = setInterval(() => {
              if (cancelled) { clearInterval(di); return; }
              ci--;
              setCharCount(ci);
              if (ci <= 0) {
                clearInterval(di);
                setTimeout(() => { if (!cancelled) cb(); }, GAP);
              }
            }, DEL_SPEED);
          }, PAUSE);
        }
      }, SPEED);
    };

    if (phase < phrases.length) {
      typePhrase(phase, () => {});
    } else {
      let idx = 0;
      const loop = () => {
        typePhrase(idx, () => {
          if (cancelled) return;
          idx = (idx + 1) % phrases.length;
          loop();
        });
      };
      loop();
    }

    return () => { cancelled = true; };
  }, [phase]);

  const renderText = () => {
    const phrase = phrases[currentIdx % phrases.length];
    const full = phrase.pre + phrase.word + phrase.post;
    const a = phrase.pre.length;
    const b = a + phrase.word.length;
    const count = Math.min(charCount, full.length);
    return (
      <>
        <span>{full.slice(0, Math.min(count, a))}</span>
        {count > a && (
          <span className="text-highlight--amber">
            {full.slice(a, Math.min(count, b))}
          </span>
        )}
        {count > b && (
          <span>{full.slice(b, count)}</span>
        )}
      </>
    );
  };

  return (
    <h2 className="section-title typewriter-h2">
      {phase !== null ? renderText() : null}
      <span className="term-cursor" />
    </h2>
  );
}
