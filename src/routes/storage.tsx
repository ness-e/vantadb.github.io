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
    <div className="page-wrapper">
      <header className="page-header-extended">
        <span className="section-eyebrow reveal">// Storage Architecture</span>
        <h1 className="title-accent reveal reveal-delay-1">
          One dependency,
          <br />not three.
        </h1>
        <p className="section-sub reveal reveal-delay-2 desc-text">
          Traditional vector search requires Pinecone (vector DB), Redis (cache), and S3 (blob storage).
          VantaDB replaces all three with a single in-process engine.
        </p>
      </header>

      <main className="main-content">
        <section className="comparison-split">
          <div className="reveal">
            <span className="section-eyebrow">// Legacy Stack</span>
            <h2 className="section-title section-title--compact">Pinecone + Redis + S3</h2>
            <ul className="comparison-list">
              <li><span className="icon-cross">✗</span> Pinecone — vector index (managed, $0.10/hr)</li>
              <li><span className="icon-cross">✗</span> Redis — metadata cache (self-hosted or ElastiCache)</li>
              <li><span className="icon-cross">✗</span> S3 — blob/raw storage (per-request pricing)</li>
              <li><span className="icon-cross">✗</span> Three separate SDKs to install and maintain</li>
              <li><span className="icon-cross">✗</span> Network calls between each layer (3-10ms per hop)</li>
            </ul>
          </div>
          <div className="reveal reveal-delay-1">
            <span className="section-eyebrow">// VantaDB</span>
            <h2 className="section-title section-title--compact">pip install vantadb</h2>
            <ul className="comparison-list">
              <li><span className="icon-check">✓</span> Single Rust binary compiled to a native library</li>
              <li><span className="icon-check">✓</span> LSM tree + HNSW index in the same process</li>
              <li><span className="icon-check">✓</span> WAL-backed persistence — no separate DB needed</li>
              <li><span className="icon-check">✓</span> One SDK, one import, zero daemons</li>
            </ul>
          </div>
        </section>

        <section className="section-narrow">
          <div className="reveal text-center reveal-centered">
            <span className="section-eyebrow">// How It Works</span>
            <h2 className="section-title section-title--compact">In-Process Engine</h2>
            <p className="section-sub">
              VantaDB embeds a log-structured merge-tree (LSM) directly in your application process.
              Vector indexes, metadata, and raw data all live in the same memory space — no serialization,
              no network, no context switches.
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
