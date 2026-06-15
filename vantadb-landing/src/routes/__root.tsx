import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, useCallback, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { VantaDBLogoFull } from "../components/VantaDBLogo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VantaDB — Embedded Cognitive Memory for AI Agents" },
      {
        name: "description",
        content:
          "The embedded database that gives AI agents persistent memory. Hybrid BM25 + HNSW search, GraphRAG, crash-safe WAL — zero config, one pip install.",
      },
      { name: "author", content: "VantaDB" },
      { property: "og:title", content: "VantaDB — Embedded Cognitive Memory for AI Agents" },
      {
        property: "og:description",
        content:
          "The embedded database that gives AI agents persistent memory. Hybrid search, GraphRAG, crash-safe durability — zero config.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "VantaDB — Embedded Cognitive Memory for AI Agents" },
      {
        name: "twitter:description",
        content:
          "The embedded database that gives AI agents persistent memory. Hybrid search, GraphRAG, crash-safe durability.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600&display=swap",
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="page-container">
        {/* ── Navigation ── */}
        <nav className={`vanta-nav${scrolled ? " vanta-nav--scrolled" : ""}`} id="main-nav">
          {/* Logo — VantaDB animated SVG mark + wordmark */}
          <Link
            to="/"
            className="vanta-logo"
            style={{ textDecoration: "none" }}
            onClick={() => setMobileOpen(false)}
            aria-label="VantaDB — inicio"
          >
            <VantaDBLogoFull size="sm" />
          </Link>

          {/* Center nav links */}
          <div className={`nav-center${mobileOpen ? " nav-center--open" : ""}`}>
            <ul className="nav-links" role="navigation">
              <li><Link to="/engine" activeProps={{ className: "active" }} onClick={() => setMobileOpen(false)}>Engine</Link></li>
              <li><Link to="/architecture" activeProps={{ className: "active" }} onClick={() => setMobileOpen(false)}>Architecture</Link></li>
              <li><Link to="/integrations" activeProps={{ className: "active" }} onClick={() => setMobileOpen(false)}>Integrations</Link></li>
              <li><Link to="/use-cases" activeProps={{ className: "active" }} onClick={() => setMobileOpen(false)}>Use Cases</Link></li>
            </ul>
          </div>

          {/* Right CTA group */}
          <div className="nav-actions">
            <a
              href="https://github.com/ness-e/Vantadb"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-github-link"
              aria-label="GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://pypi.org/project/vantadb-py/"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta"
              id="nav-get-started"
            >
              Get Started
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2.5 6h7M6.5 3l3 3-3 3" />
              </svg>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`nav-hamburger${mobileOpen ? " nav-hamburger--open" : ""}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            id="nav-hamburger"
          >
            <span /><span /><span />
          </button>
        </nav>

        {/* Mobile overlay */}
        {mobileOpen && <div className="nav-overlay" onClick={() => setMobileOpen(false)} />}

        {/* Dynamic content */}
        <Outlet />

        {/* ── Footer ── */}
        <footer className="vanta-footer">
          <div className="footer-top">
            <div className="footer-brand-group">
              <VantaDBLogoFull size="sm" noAnimation />
              <div className="footer-tagline">Embedded cognitive memory for AI agents</div>
            </div>
            <div className="footer-columns">
              <div className="footer-col">
                <h4 className="footer-col-title">Product</h4>
                <ul>
                  <li><Link to="/engine">Engine</Link></li>
                  <li><Link to="/architecture">Architecture</Link></li>
                  <li><Link to="/integrations">Integrations</Link></li>
                  <li><Link to="/use-cases">Use Cases</Link></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4 className="footer-col-title">Resources</h4>
                <ul>
                  <li><a href="https://github.com/ness-e/Vantadb" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                  <li><a href="https://pypi.org/project/vantadb-py/" target="_blank" rel="noopener noreferrer">PyPI</a></li>
                  <li><a href="https://github.com/ness-e/Vantadb#readme" target="_blank" rel="noopener noreferrer">Documentation</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">© 2026 VantaDB</div>
            <div className="footer-license">Apache 2.0 License</div>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

