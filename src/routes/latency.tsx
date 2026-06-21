import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/latency")({
  head: () => ({
    meta: [
      { title: "VantaDB — p99 Query Latency: In-Process Speed" },
      { name: "description", content: "1.2ms in-process vs 200ms networked. VantaDB eliminates network hops for p99 latency under 2ms." },
    ],
  }),
  component: LatencyPage,
});

function LatencyPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("is-visible"); }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="page-wrapper">
      <header className="page-header-extended">
        <span className="section-eyebrow reveal">// p99 Query Latency</span>
        <h1 className="title-accent reveal reveal-delay-1">
          In-process,
          <br />not networked.
        </h1>
        <p className="section-sub reveal reveal-delay-2 desc-text">
          Every network hop adds 3-10ms of overhead. VantaDB runs directly in your application memory — no serialization, no TCP, no trade-offs.
        </p>
      </header>

      <main className="main-content">
        <section className="comparison-split">
          <div className="reveal">
            <span className="section-eyebrow">// Legacy Path</span>
            <h2 className="section-title section-title--compact">200ms (network bound)</h2>
            <ul className="comparison-list">
              <li><span className="icon-cross">✗</span> App → Pinecone API: ~15ms TLS + routing</li>
              <li><span className="icon-cross">✗</span> Pinecone → S3: ~50ms blob fetch</li>
              <li><span className="icon-cross">✗</span> Pinecone → Redis: ~10ms metadata join</li>
              <li><span className="icon-cross">✗</span> Serialization overhead: JSON encode/decode</li>
              <li><span className="icon-cross">✗</span> Cold cache: 500ms+ on first request</li>
            </ul>
          </div>
          <div className="reveal reveal-delay-1">
            <span className="section-eyebrow">// VantaDB Path</span>
            <h2 className="section-title section-title--compact">1.2ms (in-process)</h2>
            <ul className="comparison-list">
              <li><span className="icon-check">✓</span> Direct memory read: ~0.003ms</li>
              <li><span className="icon-check">✓</span> HNSW graph traversal: ~1ms (1M vectors)</li>
              <li><span className="icon-check">✓</span> Zero serialization — native Rust structs</li>
              <li><span className="icon-check">✓</span> No network — same process, same cache</li>
              <li><span className="icon-check">✓</span> Predictable p99: always under 2ms</li>
            </ul>
          </div>
        </section>

        <section className="section-narrow">
          <div className="reveal text-center reveal-centered">
            <span className="section-eyebrow">// Why Speed Matters</span>
            <h2 className="section-title section-title--compact">100x Faster Queries</h2>
            <p className="section-sub">
              At 200ms per query, a 50-result RAG pipeline takes 10 seconds. With VantaDB's 1.2ms
              in-process latency, the same pipeline finishes in 60ms — fast enough for real-time
              streaming and interactive applications.
            </p>
          </div>
        </section>

        <nav className="bottom-nav">
          <Link to="/" className="back-link nav-cta">
            ← Back to comparison
          </Link>
        </nav>
      </main>
    </div>
  );
}
