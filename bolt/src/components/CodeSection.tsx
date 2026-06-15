import { useState, useRef, useEffect } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';

const installCode = `pip install vantadb-py`;

const usageCode = [
  { line: 1, tokens: [{ text: 'import', cls: 'text-[#DC143C]' }, { text: ' vantadb', cls: 'text-[#e6e6e6]' }] },
  { line: 2, tokens: [] },
  { line: 3, tokens: [{ text: '# Open (or create) a local database', cls: 'text-[#555570]' }] },
  { line: 4, tokens: [
    { text: 'db', cls: 'text-[#e6e6e6]' },
    { text: ' = ', cls: 'text-[#a0a0b0]' },
    { text: 'vantadb', cls: 'text-[#FFB703]' },
    { text: '.open(', cls: 'text-[#e6e6e6]' },
    { text: '"agent_memory.vdb"', cls: 'text-[#FF6A00]' },
    { text: ')', cls: 'text-[#e6e6e6]' },
  ]},
  { line: 5, tokens: [] },
  { line: 6, tokens: [{ text: '# Store a memory with vector + metadata (atomic write)', cls: 'text-[#555570]' }] },
  { line: 7, tokens: [
    { text: 'db', cls: 'text-[#e6e6e6]' },
    { text: '.collection(', cls: 'text-[#e6e6e6]' },
    { text: '"memories"', cls: 'text-[#FF6A00]' },
    { text: ').insert({', cls: 'text-[#e6e6e6]' },
  ]},
  { line: 8, tokens: [
    { text: '    ', cls: '' },
    { text: '"text"', cls: 'text-[#FF6A00]' },
    { text: ': ', cls: 'text-[#a0a0b0]' },
    { text: '"The user prefers concise responses"', cls: 'text-[#FF6A00]' },
    { text: ',', cls: 'text-[#e6e6e6]' },
  ]},
  { line: 9, tokens: [
    { text: '    ', cls: '' },
    { text: '"vector"', cls: 'text-[#FF6A00]' },
    { text: ': ', cls: 'text-[#a0a0b0]' },
    { text: 'embed(', cls: 'text-[#e6e6e6]' },
    { text: '"user preference"', cls: 'text-[#FF6A00]' },
    { text: '),', cls: 'text-[#e6e6e6]' },
  ]},
  { line: 10, tokens: [
    { text: '    ', cls: '' },
    { text: '"tags"', cls: 'text-[#FF6A00]' },
    { text: ': [', cls: 'text-[#a0a0b0]' },
    { text: '"preference"', cls: 'text-[#FF6A00]' },
    { text: ', ', cls: 'text-[#a0a0b0]' },
    { text: '"ux"', cls: 'text-[#FF6A00]' },
    { text: '],', cls: 'text-[#e6e6e6]' },
  ]},
  { line: 11, tokens: [{ text: '})', cls: 'text-[#e6e6e6]' }] },
  { line: 12, tokens: [] },
  { line: 13, tokens: [{ text: '# Hybrid search: vector similarity + keyword BM25', cls: 'text-[#555570]' }] },
  { line: 14, tokens: [
    { text: 'results', cls: 'text-[#e6e6e6]' },
    { text: ' = ', cls: 'text-[#a0a0b0]' },
    { text: 'db', cls: 'text-[#e6e6e6]' },
    { text: '.search(', cls: 'text-[#e6e6e6]' },
    { text: 'query_vector', cls: 'text-[#FFB703]' },
    { text: ', top_k=', cls: 'text-[#e6e6e6]' },
    { text: '5', cls: 'text-[#DC143C]' },
    { text: ')', cls: 'text-[#e6e6e6]' },
  ]},
];

export default function CodeSection() {
  const [copied, setCopied] = useState(false);
  const [copiedMain, setCopiedMain] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const copyInstall = () => {
    navigator.clipboard.writeText(installCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyMain = () => {
    const raw = `import vantadb\n\ndb = vantadb.open("agent_memory.vdb")\n\ndb.collection("memories").insert({\n    "text": "The user prefers concise responses",\n    "vector": embed("user preference"),\n    "tags": ["preference", "ux"],\n})\n\nresults = db.search(query_vector, top_k=5)`;
    navigator.clipboard.writeText(raw);
    setCopiedMain(true);
    setTimeout(() => setCopiedMain(false), 2000);
  };

  return (
    <section
      id="code-section"
      ref={sectionRef}
      className="relative py-28 bg-[#0d0d0f] overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#FF6A00]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Left: Copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-[#FF6A00]/20 bg-[#FF6A00]/8 mb-5">
              <Terminal size={13} className="text-[#FF6A00]" />
              <span className="text-xs text-[#FF6A00] font-jetbrains tracking-widest uppercase">Zero-Config Setup</span>
            </div>
            <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
              From zero to
              <br />
              <span className="text-[#FF6A00]">persistent memory</span>
              <br />
              in four lines.
            </h2>
            <p className="text-[#6a6a80] text-base leading-relaxed font-jetbrains max-w-sm">
              No servers to configure, no schemas to define, no network to manage. One import, one call — your agent remembers everything.
            </p>

            {/* Install pill */}
            <div className="mt-8 flex items-center gap-3 p-4 rounded-xl bg-[#1a1a1f] border border-white/8 max-w-sm">
              <span className="text-[#FF6A00] font-jetbrains text-sm select-none">$</span>
              <code className="font-jetbrains text-sm text-white flex-1">{installCode}</code>
              <button
                onClick={copyInstall}
                className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-[#666680] hover:text-white"
              >
                {copied ? <Check size={14} className="text-[#FF6A00]" /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          {/* Right: Code Editor */}
          <div className="relative">
            {/* Glow behind editor */}
            <div className="absolute -inset-1 bg-gradient-to-br from-[#FF6A00]/20 to-[#DC143C]/10 rounded-2xl blur-xl" />

            <div className="relative rounded-2xl overflow-hidden border border-white/8 bg-[#111115] shadow-2xl">
              {/* Editor titlebar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#161619] border-b border-white/6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28CA42]" />
                </div>
                <span className="text-xs text-[#444455] font-jetbrains">agent_memory.py</span>
                <button
                  onClick={copyMain}
                  className="flex items-center gap-1.5 text-xs text-[#555570] hover:text-white transition-colors font-jetbrains"
                >
                  {copiedMain ? <Check size={12} className="text-[#FF6A00]" /> : <Copy size={12} />}
                  {copiedMain ? 'Copied' : 'Copy'}
                </button>
              </div>

              {/* Code lines */}
              <div className="px-4 py-5 overflow-x-auto">
                {usageCode.map((row) => (
                  <div key={row.line} className="flex items-start min-h-[1.6rem]">
                    <span className="select-none w-8 text-right text-[#333345] font-jetbrains text-sm mr-4 shrink-0 pt-[1px]">
                      {row.line}
                    </span>
                    <span className="font-jetbrains text-sm leading-relaxed">
                      {row.tokens.map((token, i) => (
                        <span key={i} className={token.cls}>
                          {token.text}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom status bar */}
              <div className="px-4 py-2 bg-[#0f0f13] border-t border-white/5 flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
                  <span className="text-[10px] text-[#444455] font-jetbrains">WAL durability active</span>
                </div>
                <span className="text-[10px] text-[#333345] font-jetbrains ml-auto">Python 3.8+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
