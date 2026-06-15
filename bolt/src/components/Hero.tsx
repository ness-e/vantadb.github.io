import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Github, Star } from 'lucide-react';
import SingularityCanvas from './SingularityCanvas';

export default function Hero() {
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Delay content fade-in slightly so the canvas can start initializing
    const t = setTimeout(() => setContentVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#000000]">

      {/* Singularity three.js black hole background */}
      <SingularityCanvas />

      {/* Overlay gradients — ensure text legibility over the canvas */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Radial dark center-vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 20%, rgba(0,0,0,0.65) 100%)',
          }}
        />
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />
        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d0d0f] to-transparent" />
      </div>

      {/* Hero content */}
      <div
        className={`relative z-20 flex flex-col items-center text-center px-6 max-w-5xl mx-auto
          transition-all duration-1000 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF6A00]/30 bg-[#FF6A00]/10 backdrop-blur-sm mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse" />
          <span className="text-xs text-[#FFB703] font-jetbrains tracking-widest uppercase">
            Written in Rust · Open Source
          </span>
        </div>

        {/* Main headline */}
        <h1 className="font-space-grotesk text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6">
          <span className="text-white">The SQLite</span>
          <br />
          <span className="text-white">for </span>
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(90deg, #FF6A00, #FFB703, #DC143C)' }}
          >
            AI Agents
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-[#a0a0b0] max-w-2xl leading-relaxed mb-4 font-jetbrains">
          Persistent memory, hybrid search, and structured context.
          <br className="hidden md:block" />
          Embedded, local-first, and written in Rust.
        </p>

        {/* Tagline */}
        <p className="text-sm text-[#FF6A00]/80 font-space-grotesk font-medium tracking-[0.18em] uppercase mb-10">
          Where Context Never Escapes
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            id="get-started"
            href="#code-section"
            className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-semibold
              bg-[#FF6A00] hover:bg-[#ff7d1a] text-white transition-all duration-300
              shadow-[0_0_30px_rgba(255,106,0,0.4)] hover:shadow-[0_0_50px_rgba(255,106,0,0.6)]
              font-space-grotesk"
          >
            Get Started
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="https://github.com/vantadb"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-semibold text-white
              border border-white/15 hover:border-white/35 hover:bg-white/5 backdrop-blur-sm
              transition-all duration-300 font-space-grotesk"
          >
            <Github size={18} />
            View GitHub
          </a>
        </div>

        {/* Stats strip */}
        <div className="flex items-center gap-6 mt-12 text-sm text-[#555568] font-jetbrains flex-wrap justify-center">
          <div className="flex items-center gap-1.5">
            <Star size={13} className="text-[#FFB703]" />
            <span>MIT License</span>
          </div>
          <span className="w-px h-4 bg-white/10 hidden sm:block" />
          <span>Zero Dependencies</span>
          <span className="w-px h-4 bg-white/10 hidden sm:block" />
          <code className="text-[#FF6A00]/70">pip install vantadb-py</code>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 animate-bounce">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#FF6A00]/40" />
        <div className="w-1 h-1 rounded-full bg-[#FF6A00]/40" />
      </div>
    </section>
  );
}
