import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSubpage } from "../../components/HeroSubpage";
import { PageShell } from "../../components/PageShell";

export const Route = createFileRoute("/about/community")({
  head: () => ({
    meta: [
      { title: "VantaDB — Community" },
      {
        name: "description",
        content:
          "Join the VantaDB community. Contribute on GitHub, discuss on Discord, ask questions, and help shape the future of embedded AI data infrastructure.",
      },
    ],
  }),
  component: CommunityPage,
});

const channels = [
  {
    name: "GitHub",
    desc: "Star the repo, open issues, submit PRs, and follow development.",
    href: "https://github.com/vantadb/vantadb",
    cta: "github.com/vantadb/vantadb",
  },
  {
    name: "Discord",
    desc: "Real-time chat with the team and community. Ask questions, share projects, get help.",
    href: "#",
    cta: "Join our Discord",
  },
  {
    name: "GitHub Discussions",
    desc: "Long-form discussions, feature proposals, and Q&A.",
    href: "https://github.com/vantadb/vantadb/discussions",
    cta: "Start a discussion",
  },
  {
    name: "X / Twitter",
    desc: "Follow for release announcements, benchmarks, and ecosystem news.",
    href: "#",
    cta: "@vantadb",
  },
];

const ways = [
  {
    title: "Report a bug",
    desc: "Found something broken? Open a GitHub issue with reproduction steps.",
  },
  {
    title: "Submit a PR",
    desc: "Check the good-first-issue label. We review PRs within 48 hours.",
  },
  {
    title: "Write docs",
    desc: "Docs are never done. Fix a typo, clarify a section, add an example.",
  },
  {
    title: "Build an integration",
    desc: "LangChain, LlamaIndex, or your own framework — we'd love to link to it.",
  },
  {
    title: "Share your project",
    desc: "Built something with VantaDB? Let us know and we'll feature it.",
  },
  { title: "Run a benchmark", desc: "Test VantaDB against your workload and share the results." },
];

function CommunityPage() {
  return (
    <PageShell>
      <HeroSubpage
        eyebrow="// Community"
        title={
          <>
            Built in the open.
            <br />
            With the community.
          </>
        }
        subtitle="VantaDB is open source, and the community is at the center of everything we build. Join us on GitHub, Discord, and beyond."
        stats={[
          { value: "MIT", label: "License" },
          { value: "Open", label: "Core + roadmap" },
          { value: "48h", label: "PR review window" },
        ]}
      />

      <main className="main-content">
        <section className="section-narrow">
          <div className="reveal">
            <span className="section-eyebrow">// Join the conversation</span>
            <h2 className="section-title section-title--compact">Where to find us</h2>
          </div>
          <div className="grid-2" style={{ marginTop: "1rem" }}>
            {channels.map((ch) => (
              <div
                key={ch.name}
                className="arch-card reveal"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div className="arch-title">{ch.name}</div>
                <div className="arch-desc" style={{ flex: 1 }}>
                  {ch.desc}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    color: "var(--amber)",
                    marginTop: "1rem",
                  }}
                >
                  {ch.cta} →
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-narrow">
          <div className="reveal">
            <span className="section-eyebrow">// Contribute</span>
            <h2 className="section-title section-title--compact">Ways to get involved</h2>
          </div>
          <div className="grid-3" style={{ marginTop: "1rem" }}>
            {ways.map((w) => (
              <div key={w.title} className="arch-card reveal">
                <div className="arch-title">{w.title}</div>
                <div className="arch-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-narrow" style={{ borderBottom: "none" }}>
          <div className="reveal text-center reveal-centered">
            <span className="section-eyebrow">// Code of Conduct</span>
            <h2 className="section-title section-title--compact">Safe and welcoming</h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>
              We're committed to a harassment-free experience for everyone. Our code of conduct
              applies to all community spaces — GitHub, Discord, and events.
            </p>
          </div>
        </section>

        <nav className="bottom-nav">
          <Link to="/about" className="back-link nav-cta">
            ← About
          </Link>
        </nav>
      </main>
    </PageShell>
  );
}
