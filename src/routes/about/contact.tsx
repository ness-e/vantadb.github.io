import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSubpage } from "../../components/HeroSubpage";
import { PageShell } from "../../components/PageShell";

export const Route = createFileRoute("/about/contact")({
  head: () => ({
    meta: [
      { title: "VantaDB — Contact" },
      {
        name: "description",
        content:
          "Get in touch with the VantaDB team. Enterprise inquiries, partnerships, security reports, or general questions.",
      },
    ],
  }),
  component: ContactPage,
});

const contacts = [
  { channel: "Enterprise Inquiries", detail: "enterprise@vantadb.dev", type: "email" },
  { channel: "Security Reports", detail: "security@vantadb.dev", type: "email" },
  { channel: "Partnerships", detail: "partners@vantadb.dev", type: "email" },
  { channel: "GitHub Issues", detail: "Bug reports and feature requests", type: "link" },
  { channel: "Discord", detail: "Community chat and support", type: "link" },
  { channel: "X / Twitter", detail: "@vantadb", type: "link" },
];

function ContactPage() {
  return (
    <PageShell>
      <HeroSubpage
        eyebrow="// Contact"
        title={
          <>
            Get in touch.
            <br />
            We read everything.
          </>
        }
        subtitle="Whether you're evaluating VantaDB for your enterprise, interested in a partnership, or just want to say hello — we'd love to hear from you."
        stats={[
          { value: "48h", label: "Response time" },
          { value: "Email", label: "Preferred" },
          { value: "Open", label: "Source" },
        ]}
      />

      <main className="main-content">
        <section className="section-narrow">
          <div className="reveal">
            <span className="section-eyebrow">// Reach out</span>
            <h2 className="section-title section-title--compact">Contact channels</h2>
          </div>
          <div className="grid-2" style={{ marginTop: "1rem" }}>
            {contacts.map((c) => (
              <div key={c.channel} className="arch-card reveal">
                <div className="arch-title">{c.channel}</div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.85rem",
                    color: "var(--amber)",
                    marginTop: "0.5rem",
                  }}
                >
                  {c.type === "email" ? <span>{c.detail}</span> : <span>{c.detail}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-narrow" style={{ borderBottom: "none" }}>
          <div className="reveal text-center reveal-centered">
            <span className="section-eyebrow">// Security</span>
            <h2 className="section-title section-title--compact">Responsible disclosure</h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>
              Found a security vulnerability? Email security@vantadb.dev. We practice responsible
              disclosure and will work with you to validate, fix, and release a patch before public
              disclosure. We don't have a formal bug bounty program yet, but we'll credit you in the
              release notes.
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
