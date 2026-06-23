import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/about/")({
  head: () => ({
    meta: [
      { title: "About VantaDB — The Database That Thinks With You" },
      { name: "description", content: "Learn about VantaDB: an embeddable, open-source vector database built for AI agents, local RAG, and intelligent applications." },
    ],
  }),
  component: AboutIndex,
});

const sections = [
  { title: "Company", desc: "Who we are, our values, and why we build VantaDB.", href: "/about/company", slug: "company" },
  { title: "Roadmap", desc: "What we're building and where we're headed — transparent engineering milestones.", href: "/about/roadmap", slug: "roadmap" },
  { title: "Community", desc: "Join the community. Contribute, ask questions, and help shape the future of embedded AI data.", href: "/about/community", slug: "community" },
  { title: "Contact", desc: "Get in touch with the team. Enterprise inquiries, partnerships, or just to say hi.", href: "/about/contact", slug: "contact" },
];

function AboutIndex() {
  return (
    <PageShell>
      <header className="page-header-extended">
        <span className="section-eyebrow reveal">// About VantaDB</span>
        <h1 className="section-title reveal reveal-delay-1">
          The database<br />
          <span className="title-accent">that thinks with you.</span>
        </h1>
        <p className="section-sub desc-text reveal reveal-delay-2">
          We're building the data infrastructure for the AI era — embedded, open-source, and engineered for sub-millisecond performance.
        </p>
      </header>

      <main className="main-content">
        <section className="section-sm" style={{ borderBottom: "1px solid var(--subtle)" }}>
          <div className="metrics-strip-wrap">
            <div className="metrics-strip">
              {[
                { value: "MIT", label: "License" },
                { value: "1.2ms", label: "p50 Latency" },
                { value: "Rust", label: "Core Engine" },
                { value: "Open", label: "Source + Roadmap" },
              ].map((m) => (
                <div key={m.label} className="metric-item" style={{ background: "transparent" }}>
                  <span className="metric-value">{m.value}</span>
                  <span className="metric-label">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-sm">
          <div className="about-grid">
            {sections.map((s, i) => (
              <Link
                key={s.slug}
                to={s.href}
                className="arch-card reveal"
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <div className="arch-title">{s.title}</div>
                <div className="arch-desc">{s.desc}</div>
                <div className="arch-cta">{s.href} →</div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
