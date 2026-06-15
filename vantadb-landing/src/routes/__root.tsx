import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

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
      { title: "VantaDB — The SQLite for AI Agents" },
      {
        name: "description",
        content:
          "Persistent memory, hybrid search, and structured context. Embedded, local-first, and written in Rust.",
      },
      { name: "author", content: "VantaDB" },
      { property: "og:title", content: "VantaDB — The SQLite for AI Agents" },
      {
        property: "og:description",
        content:
          "Persistent memory, hybrid search, and structured context. Embedded, local-first, and written in Rust.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "VantaDB — The SQLite for AI Agents" },
      {
        name: "twitter:description",
        content:
          "Persistent memory, hybrid search, and structured context. Embedded, local-first, written in Rust.",
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

  return (
    <QueryClientProvider client={queryClient}>
      <div className="page-container">
        {/* Navigation global */}
        <nav className="vanta-nav">
          <Link to="/" className="vanta-logo" style={{ textDecoration: "none" }}>
            <div className="vanta-logo-icon" />
            Vanta<span>DB</span>
          </Link>
          <ul className="nav-links">
            <li><Link to="/engine" activeProps={{ className: "active" }}>Engine</Link></li>
            <li><Link to="/architecture" activeProps={{ className: "active" }}>Architecture</Link></li>
            <li><Link to="/integrations" activeProps={{ className: "active" }}>Integrations</Link></li>
            <li><Link to="/use-cases" activeProps={{ className: "active" }}>Use Cases</Link></li>
          </ul>
          <a href="https://github.com/ness-e/Vantadb" target="_blank" rel="noopener noreferrer" className="nav-cta">
            GitHub ↗
          </a>
        </nav>

        {/* Dynamic content */}
        <Outlet />

        {/* Footer global */}
        <footer className="vanta-footer">
          <div>
            <div className="footer-brand">Vanta<span>DB</span></div>
            <div className="footer-tagline">Where Context Never Escapes</div>
          </div>
          <ul className="footer-links">
            <li><Link to="/engine">Engine</Link></li>
            <li><Link to="/architecture">Architecture</Link></li>
            <li><Link to="/integrations">Integrations</Link></li>
            <li><Link to="/use-cases">Use Cases</Link></li>
            <li><a href="https://github.com/ness-e/Vantadb" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://pypi.org/project/vantadb-py/" target="_blank" rel="noopener noreferrer">PyPI</a></li>
          </ul>
          <div className="footer-copy">© 2026 VantaDB · Apache 2.0</div>
        </footer>
      </div>
    </QueryClientProvider>
  );
}
