import { Github, Package, BookOpen, ExternalLink } from 'lucide-react';

const links = [
  { label: 'GitHub', href: 'https://github.com/vantadb', icon: <Github size={14} /> },
  { label: 'PyPI', href: 'https://pypi.org/project/vantadb-py/', icon: <Package size={14} /> },
  { label: 'Documentation', href: '#', icon: <BookOpen size={14} /> },
];

const legalLinks = ['License (MIT)', 'Privacy', 'Security'];

export default function Footer() {
  return (
    <footer className="bg-[#000000] border-t border-white/5 py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="relative w-7 h-7">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <ellipse cx="16" cy="17" rx="13" ry="5.5" stroke="#e6e6e6" strokeWidth="1.5" fill="none" transform="rotate(-15 16 17)" />
                  <circle cx="16" cy="16" r="5.5" fill="#000" stroke="#e6e6e6" strokeWidth="1.2" />
                  <ellipse cx="16" cy="16" rx="14" ry="3.5" stroke="#FF6A00" strokeWidth="1.2" fill="none" transform="rotate(-15 16 16)" opacity="0.7" />
                </svg>
              </div>
              <span className="font-space-grotesk text-lg font-bold">
                <span className="text-white">Vanta</span>
                <span className="text-[#FF6A00]">DB</span>
              </span>
            </div>
            <p className="text-xs text-[#444455] font-jetbrains max-w-xs leading-relaxed">
              The SQLite for AI Agents. Embedded, local-first, written in Rust.
            </p>
            <p className="text-xs text-[#333345] font-jetbrains tracking-widest uppercase">
              Where Context Never Escapes
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <p className="text-xs text-[#444455] font-jetbrains tracking-widest uppercase">Resources</p>
            <div className="flex flex-col gap-2.5">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-2 text-sm text-[#555570] hover:text-white transition-colors duration-200 font-jetbrains group"
                >
                  <span className="text-[#333345] group-hover:text-[#FF6A00] transition-colors">{l.icon}</span>
                  {l.label}
                  {l.href.startsWith('http') && (
                    <ExternalLink size={10} className="text-[#333345] group-hover:text-[#555570] transition-colors" />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Install block */}
          <div className="flex flex-col gap-3">
            <p className="text-xs text-[#444455] font-jetbrains tracking-widest uppercase">Quick Install</p>
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-[#0f0f13] border border-white/6">
              <span className="text-[#FF6A00] font-jetbrains text-sm select-none">$</span>
              <code className="font-jetbrains text-sm text-[#a0a0b0]">pip install vantadb-py</code>
            </div>
            <p className="text-xs text-[#333345] font-jetbrains">Requires Python 3.8+</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#2c2c3a] font-jetbrains">
            &copy; {new Date().getFullYear()} VantaDB. Open source under MIT License.
          </p>
          <div className="flex items-center gap-5">
            {legalLinks.map((l) => (
              <a key={l} href="#" className="text-xs text-[#333345] hover:text-[#666680] transition-colors font-jetbrains">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
