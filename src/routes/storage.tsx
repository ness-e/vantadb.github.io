import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/storage")({
  head: () => ({
    meta: [
      { title: "VantaDB — Storage Architecture: One Dependency" },
      { name: "description", content: "Replace Pinecone + Redis + S3 with a single pip install. VantaDB's in-process storage engine eliminates the three-service stack." },
    ],
  }),
  component: StoragePage,
});

function StoragePage() {
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
        <span className="section-eyebrow reveal">// Storage Architecture</span>
        <h1 className="title-accent reveal reveal-delay-1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, letterSpacing: "-0.04em", margin: "0.5rem 0 1.5rem" }}>
          One dependency,
          <br />not three.
        </h1>
        <p className="section-sub reveal reveal-delay-2" style={{ maxWidth: "680px", margin: 0 }}>
          Traditional vector search requires Pinecone (vector DB), Redis (cache), and S3 (blob storage).
          VantaDB replaces all three with a single in-process engine.
        </p>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(1.5rem, 5vw, 4rem) 8rem" }}>
        <section style={{ padding: "4rem 0", borderBottom: "1px solid var(--subtle)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
          <div className="reveal">
            <span className="section-eyebrow">// Legacy Stack</span>
            <h2 className="section-title" style={{ margin: "0.5rem 0 1.5rem" }}>Pinecone + Redis + S3</h2>
            <ul style={{ listStyle: "none", padding: 0, fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--muted)", lineHeight: "2.2" }}>
              <li><span style={{ color: "var(--crimson)" }}>✗</span> Pinecone — vector index (managed, $0.10/hr)</li>
              <li><span style={{ color: "var(--crimson)" }}>✗</span> Redis — metadata cache (self-hosted or ElastiCache)</li>
              <li><span style={{ color: "var(--crimson)" }}>✗</span> S3 — blob/raw storage (per-request pricing)</li>
              <li><span style={{ color: "var(--crimson)" }}>✗</span> Three separate SDKs to install and maintain</li>
              <li><span style={{ color: "var(--crimson)" }}>✗</span> Network calls between each layer (3-10ms per hop)</li>
            </ul>
          </div>
          <div className="reveal reveal-delay-1">
            <span className="section-eyebrow">// VantaDB</span>
            <h2 className="section-title" style={{ margin: "0.5rem 0 1.5rem" }}>pip install vantadb</h2>
            <ul style={{ listStyle: "none", padding: 0, fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--muted)", lineHeight: "2.2" }}>
              <li><span style={{ color: "var(--amber)" }}>✓</span> Single Rust binary compiled to a native library</li>
              <li><span style={{ color: "var(--amber)" }}>✓</span> LSM tree + HNSW index in the same process</li>
              <li><span style={{ color: "var(--amber)" }}>✓</span> WAL-backed persistence — no separate DB needed</li>
              <li><span style={{ color: "var(--amber)" }}>✓</span> One SDK, one import, zero daemons</li>
            </ul>
          </div>
        </section>

        <section style={{ padding: "4rem 0", borderBottom: "1px solid var(--subtle)" }}>
          <div className="reveal text-center" style={{ maxWidth: "720px", margin: "0 auto" }}>
            <span className="section-eyebrow">// How It Works</span>
            <h2 className="section-title" style={{ margin: "0.5rem 0 1.5rem" }}>In-Process Engine</h2>
            <p className="section-sub">
              VantaDB embeds a log-structured merge-tree (LSM) directly in your application process.
              Vector indexes, metadata, and raw data all live in the same memory space — no serialization,
              no network, no context switches.
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
