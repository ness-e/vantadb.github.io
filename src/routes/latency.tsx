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
    <div style={{ background: "var(--background)", minHeight: "100vh" }}>
      <header className="page-header-extended">
        <span className="section-eyebrow reveal">// p99 Query Latency</span>
        <h1 className="title-accent reveal reveal-delay-1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, letterSpacing: "-0.04em", margin: "0.5rem 0 1.5rem" }}>
          In-process,
          <br />not networked.
        </h1>
        <p className="section-sub reveal reveal-delay-2" style={{ maxWidth: "680px", margin: 0 }}>
          Every network hop adds 3-10ms of overhead. VantaDB runs directly in your application memory — no serialization, no TCP, no trade-offs.
        </p>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(1.5rem, 5vw, 4rem) 8rem" }}>
        <section style={{ padding: "4rem 0", borderBottom: "1px solid var(--subtle)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
          <div className="reveal">
            <span className="section-eyebrow">// Legacy Path</span>
            <h2 className="section-title" style={{ margin: "0.5rem 0 1.5rem" }}>200ms (network bound)</h2>
            <ul style={{ listStyle: "none", padding: 0, fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--muted)", lineHeight: "2.2" }}>
              <li><span style={{ color: "var(--crimson)" }}>✗</span> App → Pinecone API: ~15ms TLS + routing</li>
              <li><span style={{ color: "var(--crimson)" }}>✗</span> Pinecone → S3: ~50ms blob fetch</li>
              <li><span style={{ color: "var(--crimson)" }}>✗</span> Pinecone → Redis: ~10ms metadata join</li>
              <li><span style={{ color: "var(--crimson)" }}>✗</span> Serialization overhead: JSON encode/decode</li>
              <li><span style={{ color: "var(--crimson)" }}>✗</span> Cold cache: 500ms+ on first request</li>
            </ul>
          </div>
          <div className="reveal reveal-delay-1">
            <span className="section-eyebrow">// VantaDB Path</span>
            <h2 className="section-title" style={{ margin: "0.5rem 0 1.5rem" }}>1.2ms (in-process)</h2>
            <ul style={{ listStyle: "none", padding: 0, fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--muted)", lineHeight: "2.2" }}>
              <li><span style={{ color: "var(--amber)" }}>✓</span> Direct memory read: ~0.003ms</li>
              <li><span style={{ color: "var(--amber)" }}>✓</span> HNSW graph traversal: ~1ms (1M vectors)</li>
              <li><span style={{ color: "var(--amber)" }}>✓</span> Zero serialization — native Rust structs</li>
              <li><span style={{ color: "var(--amber)" }}>✓</span> No network — same process, same cache</li>
              <li><span style={{ color: "var(--amber)" }}>✓</span> Predictable p99: always under 2ms</li>
            </ul>
          </div>
        </section>

        <section style={{ padding: "4rem 0", borderBottom: "1px solid var(--subtle)" }}>
          <div className="reveal text-center" style={{ maxWidth: "720px", margin: "0 auto" }}>
            <span className="section-eyebrow">// Why Speed Matters</span>
            <h2 className="section-title" style={{ margin: "0.5rem 0 1.5rem" }}>100x Faster Queries</h2>
            <p className="section-sub">
              At 200ms per query, a 50-result RAG pipeline takes 10 seconds. With VantaDB's 1.2ms
              in-process latency, the same pipeline finishes in 60ms — fast enough for real-time
              streaming and interactive applications.
            </p>
          </div>
        </section>

        <nav style={{ marginTop: "3rem", textAlign: "center" }}>
          <Link to="/" className="nav-cta" style={{ display: "inline-block", padding: "0.85rem 2rem", textDecoration: "none" }}>
            ← Back to comparison
          </Link>
        </nav>
      </main>
    </div>
  );
}
