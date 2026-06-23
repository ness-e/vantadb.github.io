import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSubpage } from "../components/HeroSubpage";
import { PageShell } from "../components/PageShell";
import { CtaSection } from "../components/CtaSection";
import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const Route = createFileRoute("/latency")({
  head: () => ({
    meta: [
      { title: "VantaDB — Sub-Millisecond Latency" },
      { name: "description", content: "1.2ms p50 in-process latency vs 200ms+ for cloud vector databases. VantaDB eliminates network round-trips." },
    ],
  }),
  component: LatencyPage,
});

function LatencyPage() {
  useScrollReveal();

  const [pipelineSize, setPipelineSize] = useState(50);

  const legacyTotal = pipelineSize * 200;
  const vantaTotal = pipelineSize * 1.2;

  return (
    <PageShell>
      <HeroSubpage
        eyebrow="// Latency Performance"
        title={<>1.2ms p50.<br />No network.</>}
        subtitle="VantaDB runs in your process — no network round-trip, no serialization overhead, no cold starts. Every microsecond matters when your agent is waiting."
        stats={[
          { value: "1.2ms", label: "VantaDB p50" },
          { value: "200ms", label: "Legacy p50" },
          { value: "166×", label: "Faster" },
        ]}
      />

      <main className="main-content">
        <section className="comparison-split">
          <div className="reveal">
            <span className="section-eyebrow">// Legacy Path</span>
            <h2 className="section-title section-title--compact">~200ms per query</h2>
            <ul className="comparison-list">
              <li><span className="icon-cross">✗</span> Network round-trip: 50-80ms (TLS + serialization)</li>
              <li><span className="icon-cross">✗</span> Remote index traversal: 40-60ms</li>
              <li><span className="icon-cross">✗</span> Result serialization: 20-30ms</li>
              <li><span className="icon-cross">✗</span> Cache miss penalty: 100ms+ to S3 fallback</li>
              <li><span className="icon-cross">✗</span> Cold start: 2-5s (serverless DB wake)</li>
            </ul>
          </div>
          <div className="reveal reveal-delay-1">
            <span className="section-eyebrow">// VantaDB Path</span>
            <h2 className="section-title section-title--compact">1.2ms in-process</h2>
            <ul className="comparison-list">
              <li><span className="icon-check">✓</span> Zero network: same-process memory access</li>
              <li><span className="icon-check">✓</span> HNSW graph traversal: 0.4-0.8ms</li>
              <li><span className="icon-check">✓</span> BM25 intersection: 0.2-0.4ms</li>
              <li><span className="icon-check">✓</span> No serialization: zero-copy result passing</li>
              <li><span className="icon-check">✓</span> No cold start: process is always warm</li>
            </ul>
          </div>
        </section>

        <section className="section-narrow">
          <div className="reveal text-center mb-12">
            <span className="section-eyebrow">// Pipeline Latency</span>
            <h2 className="section-title section-title--compact">Multi-query impact</h2>
          </div>

          <div className="max-w-xl mx-auto mb-8">
            <div className="flex justify-between font-mono text-[0.7rem] text-[var(--steel)] mb-4">
              <span>Queries in pipeline: {pipelineSize}</span>
              <span>Drag to adjust</span>
            </div>
            <input
              type="range"
              min={1}
              max={200}
              value={pipelineSize}
              onChange={(e) => setPipelineSize(Number(e.target.value))}
              className="rrf-slider"
            />
          </div>

          <div className="ops-grid max-w-xl mx-auto">
            <div className="ops-card reveal">
              <span className="section-eyebrow mb-4">Legacy</span>
              <div className="text-[2.5rem] font-bold text-[var(--crimson)] font-display tracking-tight leading-none">
                {(legacyTotal / 1000).toFixed(1)}s
              </div>
              <div className="font-mono text-[0.65rem] text-[var(--steel)] mt-2">
                {pipelineSize} queries × 200ms each
              </div>
            </div>
            <div className="ops-card-vanta reveal reveal-delay-1">
              <span className="section-eyebrow mb-4">VantaDB</span>
              <div className="text-[2.5rem] font-bold text-[var(--amber)] font-display tracking-tight leading-none">
                {vantaTotal < 1000 ? `${Math.round(vantaTotal)}ms` : `${(vantaTotal / 1000).toFixed(1)}s`}
              </div>
              <div className="font-mono text-[0.65rem] text-[var(--steel)] mt-2">
                {pipelineSize} queries × 1.2ms each
              </div>
            </div>
          </div>

          <div className="reveal text-center mt-8">
            <span className="font-display text-lg text-[var(--amber)] font-semibold">
              {Math.round(legacyTotal / Math.max(vantaTotal, 0.1))}× faster
            </span>
          </div>
        </section>

        <section className="chart-section">
          <div className="reveal text-center mb-12">
            <span className="section-eyebrow">// Per-query breakdown</span>
            <h2 className="section-title section-title--compact">Where the milliseconds go</h2>
          </div>

          <div className="latency-bars max-w-xl mx-auto">
            <div className="latency-bar reveal">
              <span className="latency-bar-col latency-bar-col--label">Network</span>
              <span className="latency-bar-col latency-bar-col--bar" style={{ "--legacy-w": "35%", "--vanta-w": "0%" } as React.CSSProperties}>
                <span className="latency-bar-fill latency-bar-fill--legacy" /><span className="latency-bar-fill latency-bar-fill--vanta" />
              </span>
              <span className="latency-bar-col latency-bar-col--value"><span className="lb-legacy">70ms</span> <span className="lb-vanta">0ms</span></span>
            </div>
            <div className="latency-bar reveal reveal-delay-1">
              <span className="latency-bar-col latency-bar-col--label">Index search</span>
              <span className="latency-bar-col latency-bar-col--bar" style={{ "--legacy-w": "25%", "--vanta-w": "50%" } as React.CSSProperties}>
                <span className="latency-bar-fill latency-bar-fill--legacy" /><span className="latency-bar-fill latency-bar-fill--vanta" />
              </span>
              <span className="latency-bar-col latency-bar-col--value"><span className="lb-legacy">50ms</span> <span className="lb-vanta">0.6ms</span></span>
            </div>
            <div className="latency-bar reveal reveal-delay-2">
              <span className="latency-bar-col latency-bar-col--label">Serialize</span>
              <span className="latency-bar-col latency-bar-col--bar" style={{ "--legacy-w": "15%", "--vanta-w": "0%" } as React.CSSProperties}>
                <span className="latency-bar-fill latency-bar-fill--legacy" /><span className="latency-bar-fill latency-bar-fill--vanta" />
              </span>
              <span className="latency-bar-col latency-bar-col--value"><span className="lb-legacy">25ms</span> <span className="lb-vanta">0ms</span></span>
            </div>
            <div className="latency-bar reveal reveal-delay-3">
              <span className="latency-bar-col latency-bar-col--label">Cache fill</span>
              <span className="latency-bar-col latency-bar-col--bar" style={{ "--legacy-w": "20%", "--vanta-w": "0%" } as React.CSSProperties}>
                <span className="latency-bar-fill latency-bar-fill--legacy" /><span className="latency-bar-fill latency-bar-fill--vanta" />
              </span>
              <span className="latency-bar-col latency-bar-col--value"><span className="lb-legacy">45ms</span> <span className="lb-vanta">0.6ms</span></span>
            </div>
          </div>
        </section>

        <section className="section-narrow">
          <div className="reveal text-center reveal-centered">
            <span className="section-eyebrow">// Why Latency Matters</span>
            <h2 className="section-title section-title--compact">Agents can't wait</h2>
            <p className="section-sub">
              Every 100ms of added latency in a RAG pipeline compounds across retrievals, re-rankings,
              and generation steps. VantaDB's in-process architecture removes the bottleneck entirely.
            </p>
          </div>
        </section>

        <CtaSection />

        <nav className="bottom-nav">
          <Link to="/" className="back-link nav-cta">
            ← Back to comparison
          </Link>
        </nav>
      </main>
    </PageShell>
  );
}
