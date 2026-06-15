import { useState, useEffect } from 'react';
import { Github, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0d0d0f]/90 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <ellipse cx="16" cy="17" rx="13" ry="5.5" stroke="#e6e6e6" strokeWidth="1.5" fill="none" transform="rotate(-15 16 17)" />
              <circle cx="16" cy="16" r="5.5" fill="#000" stroke="#e6e6e6" strokeWidth="1.2" />
              <ellipse cx="16" cy="16" rx="14" ry="3.5" stroke="#FF6A00" strokeWidth="1.2" fill="none" transform="rotate(-15 16 16)" opacity="0.7" />
            </svg>
          </div>
          <span className="font-space-grotesk text-xl font-bold tracking-tight">
            <span className="text-white">Vanta</span>
            <span className="text-[#FF6A00]">DB</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {['Features', 'Use Cases', 'Docs'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-sm text-[#a0a0b0] hover:text-white transition-colors duration-200 tracking-wide font-jetbrains"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/vantadb"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-[#a0a0b0] hover:text-white border border-white/10 hover:border-white/25 transition-all duration-200 font-jetbrains"
          >
            <Github size={15} />
            GitHub
          </a>
          <a
            href="#get-started"
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-[#FF6A00] hover:bg-[#ff7d1a] text-white transition-all duration-200 shadow-[0_0_20px_rgba(255,106,0,0.3)] hover:shadow-[0_0_30px_rgba(255,106,0,0.5)] font-space-grotesk"
          >
            Get Started
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d0d0f]/95 backdrop-blur-xl border-t border-white/5 px-6 py-5 flex flex-col gap-4">
          {['Features', 'Use Cases', 'Docs'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-[#a0a0b0] hover:text-white text-sm font-jetbrains"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="https://github.com/vantadb"
            className="flex items-center gap-2 text-[#a0a0b0] hover:text-white text-sm font-jetbrains"
          >
            <Github size={15} /> GitHub
          </a>
          <a
            href="#get-started"
            className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#FF6A00] text-white text-center font-space-grotesk"
          >
            Get Started
          </a>
        </div>
      )}
    </header>
  );
}
