import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSubpage } from "../components/HeroSubpage";
import { PageShell } from "../components/PageShell";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "VantaDB — Pricing: Free. Open Core. Enterprise Ready." },
      { name: "description", content: "VantaDB is MIT open core. Free tier for solo devs, Pro tier for teams, Enterprise for compliance-heavy deployments." },
    ],
  }),
  component: PricingPage,
});

const tiers = [
  {
    name: "Free",
    tagline: "For solo devs, prototypes, and side projects",
    price: "$0",
    period: "forever",
    features: [
      "Single-node deployment",
      "Up to 10M vectors",
      "SQL + vector + full-text search",
      "Python SDK + Rust SDK",
      "Community support (Discord)",
      "MIT license",
    ],
    cta: "Get Started",
    href: "/docs",
    featured: false,
  },
  {
    name: "Pro",
    tagline: "For teams shipping AI into production",
    price: "$49",
    period: "/month per seat",
    features: [
      "Multi-node replication",
      "Up to 100M vectors",
      "Priority email + Discord support",
      "WAL shipping & hot backups",
      "Performance benchmarking suite",
      "Direct engineering access",
    ],
    cta: "Subscribe",
    href: "#",
    featured: true,
  },
  {
    name: "Enterprise",
    tagline: "For organizations with compliance requirements",
    price: "Custom",
    period: "annual",
    features: [
      "On-premise deployment",
      "Unlimited vectors",
      "SSO / SAML / OIDC auth",
      "Audit logging & compliance reports",
      "Dedicated SLA (99.99%)",
      "Air-gap deployment support",
      "Custom SDK integrations",
    ],
    cta: "Contact Sales",
    href: "/about/contact",
    featured: false,
  },
];

const comparisonRows = [
  { feature: "Deployment", free: "Single-node, embedded", pro: "Multi-node, embedded", ent: "On-prem, air-gapped" },
  { feature: "Vector limit", free: "10M", pro: "100M", ent: "Unlimited" },
  { feature: "Query engines", free: "HNSW + IVF + BM25", pro: "HNSW + IVF + BM25 + hybrid RRF", ent: "All engines + custom" },
  { feature: "Replication", free: "None", pro: "WAL-based multi-node", ent: "WAL + geo-redundant" },
  { feature: "Auth", free: "None", pro: "API key", ent: "SSO / SAML / OIDC + RBAC" },
  { feature: "Audit log", free: "None", pro: "Basic", ent: "Full + compliance export" },
  { feature: "Support", free: "Community (Discord)", pro: "Priority email + Discord", ent: "Dedicated SLA" },
  { feature: "License", free: "MIT", pro: "MIT", ent: "MIT + enterprise terms" },
];

function PricingPage() {
  useScrollReveal();

  return (
    <PageShell>
      <HeroSubpage
        eyebrow="// Pricing"
        title={<>Free to build.<br />Fair to scale.</>}
        subtitle="VantaDB is MIT open core. Start building with zero cost and zero friction. Upgrade only when your team needs replication, priority support, or compliance features."
        stats={[
          { value: "MIT", label: "Open core" },
          { value: "$0", label: "To start" },
          { value: "Free", label: "Vector cap: 10M" },
        ]}
      />

      <main className="main-content">
        <section className="pricing-section-wrap">
          <div className="pricing-grid">
            {tiers.map((tier, i) => (
              <div
                key={tier.name}
                className={`pricing-card reveal ${tier.featured ? "pricing-card--featured" : ""}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                {tier.featured && (
                  <span className="pricing-badge">Most Popular</span>
                )}
                <div className="pricing-name">{tier.name}</div>
                <div className="pricing-tagline">{tier.tagline}</div>
                <div className="pricing-price-wrap">
                  <span className="pricing-price">{tier.price}</span>
                  <span className="pricing-period">{tier.period}</span>
                </div>
                <ul className="pricing-features">
                  {tier.features.map((f) => (
                    <li key={f} className="pricing-feature-item">
                      <span className="pricing-feature-check">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="pricing-cta-wrap">
                  <Link
                    to={tier.href.startsWith("/") ? tier.href : "/about/contact"}
                    className={`nav-cta pricing-cta ${tier.featured ? "pricing-cta--featured" : "pricing-cta--default"}`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-narrow">
          <div className="reveal text-center reveal-centered">
            <span className="section-eyebrow">// Feature Comparison</span>
            <h2 className="section-title section-title--compact">Detailed breakdown</h2>
          </div>
          <div className="reveal reveal-delay-1">
            <div className="pricing-compare-wrap">
              <table className="pricing-table">
                <thead>
                  <tr className="pricing-table-header">
                    <th>Feature</th>
                    <th className="th-free">Free</th>
                    <th className="th-pro">Pro</th>
                    <th className="th-ent">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.feature} style={{ transitionDelay: `${i * 0.04}s` }}>
                      <td>{row.feature}</td>
                      <td className="td-free">{row.free}</td>
                      <td className="td-pro">{row.pro}</td>
                      <td className="td-ent">{row.ent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section-narrow pricing-section-noborder">
          <div className="reveal text-center reveal-centered">
            <span className="section-eyebrow">// FAQ</span>
            <h2 className="section-title section-title--compact">Common questions</h2>
            <div className="pricing-faq-list">
              {[
                { q: "Is VantaDB really free?", a: "Yes. The core engine is MIT licensed and free forever. No vector limits in the free tier (up to 10M), no hidden pricing, no per-query fees." },
                { q: "What counts as a seat?", a: "A seat is one developer who compiles or deploys VantaDB. CI/CD agents, production replicas, and end users of your application do not count as seats." },
                { q: "Can I use VantaDB in a commercial product?", a: "Yes. The MIT license allows unrestricted use, modification, and distribution. No royalties, no attribution required." },
                { q: "Do you offer managed cloud hosting?", a: "VantaDB is designed to be embedded — we don't offer a cloud-hosted version. For managed infrastructure, the Enterprise tier includes deployment support and on-premise SLAs." },
              ].map((faq, i) => (
                <div
                  key={faq.q}
                  className="pricing-faq-item reveal"
                  style={{ transitionDelay: `${i * 0.06}s` }}
                >
                  <div className="pricing-faq-q">{faq.q}</div>
                  <div className="pricing-faq-a">{faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <nav className="bottom-nav">
          <Link to="/" className="back-link nav-cta">
            ← Back to Home
          </Link>
        </nav>
      </main>
    </PageShell>
  );
}
