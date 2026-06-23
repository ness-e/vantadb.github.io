import { Link } from "@tanstack/react-router";

// ── Swiss Footer — OLED black, 5 columns, all pages ────────────────────────
// No gradients, no shadows, no rounded corners. Swiss Minimal.

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Engine", href: "/engine" },
      { label: "Architecture", href: "/architecture" },
      { label: "Integrations", href: "/integrations" },
      { label: "Use Cases", href: "/use-cases" },
      { label: "Cost", href: "/cost" },
      { label: "Latency", href: "/latency" },
      { label: "Storage", href: "/storage" },
      { label: "Maintenance", href: "/maint" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "AI Agents", href: "/solutions/ai-agents" },
      { label: "Local RAG", href: "/solutions/local-rag" },
      { label: "AI IDE Tooling", href: "/solutions/ai-ide-tooling" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Config Reference", href: "/config" },
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Resources",
    links: [{ label: "Blog", href: "/blog" }],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Company", href: "/about/company" },
      { label: "Community", href: "/about/community" },
      { label: "Contact", href: "/about/contact" },
    ],
  },
];

export function SwissFooter() {
  return (
    <footer className="swiss-footer">
      <div className="swiss-footer__inner">
        <div className="swiss-footer__grid">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <span className="swiss-footer__col-title">{col.title}</span>
              <ul className="swiss-footer__links">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link className="swiss-footer__link" to={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="swiss-footer__bottom">
        <span className="swiss-footer__copyright">
          © {new Date().getFullYear()} VantaDB — Embedded Cognitive Memory
        </span>
        <div className="swiss-footer__social">
          <a
            className="swiss-footer__social-link"
            href="https://github.com/vantadb"
            rel="noopener noreferrer"
            target="_blank"
          >
            {/* GitHub icon (SVG monoline) */}
            <svg
              fill="none"
              height="14"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="14"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
