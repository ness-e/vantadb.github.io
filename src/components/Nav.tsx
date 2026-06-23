import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { gsap } from "gsap";
import { VantaDBLogoFull } from "./VantaDBLogo";
import { NavDropdown } from "./NavDropdown";

interface NavChild {
  label: string;
  to: string;
  external?: boolean;
}

interface NavItem {
  label: string;
  to?: string;
  children?: NavChild[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Product",
    children: [
      { label: "Engine", to: "/engine" },
      { label: "Architecture", to: "/architecture" },
      { label: "Integrations", to: "/integrations" },
      { label: "Use Cases", to: "/use-cases" },
    ],
  },
  {
    label: "Why VantaDB",
    children: [
      { label: "vs. Vector DBs", to: "/cost" },
      { label: "Latency", to: "/latency" },
      { label: "Storage", to: "/storage" },
      { label: "Config", to: "/config" },
      { label: "Maintenance", to: "/maint" },
    ],
  },
  {
    label: "Solutions",
    children: [
      { label: "AI Agents", to: "/solutions/ai-agents" },
      { label: "Local RAG", to: "/solutions/local-rag" },
      { label: "IDE Tooling", to: "/solutions/ai-ide-tooling" },
    ],
  },
  { label: "Docs", to: "/docs" },
  { label: "Pricing", to: "/pricing" },
  {
    label: "Company",
    children: [
      { label: "About", to: "/about" },
      { label: "Roadmap", to: "/about/roadmap" },
      { label: "Blog", to: "/blog" },
      { label: "Community", to: "/about/community" },
      { label: "Contact", to: "/about/contact" },
    ],
  },
];

function isItemActive(item: NavItem, pathname: string): boolean {
  if (item.to) return pathname === item.to;
  if (item.children) {
    return item.children.some(
      (c) => !c.external && pathname.startsWith(c.to),
    );
  }
  return false;
}

function MobileNavItem({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const active = isItemActive(item, location.pathname);

  if (item.to) {
    return (
      <Link
        to={item.to as any}
        className={`nav-drawer-link${active ? " active" : ""}`}
        onClick={onNavigate}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="nav-drawer-group">
      <button
        className={`nav-drawer-group-toggle${active ? " active" : ""}`}
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        {item.label}
        <svg
          className={`nav-drawer-chevron${expanded ? " open" : ""}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3.5 4.5l2.5 3 2.5-3" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            className="nav-drawer-sublist"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            {item.children?.map((child) =>
              child.external ? (
                <a
                  key={child.label}
                  href={child.to}
                  className="nav-drawer-sublink"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onNavigate}
                >
                  {child.label}
                </a>
              ) : (
                <Link
                  key={child.label}
                  to={child.to as any}
                  className="nav-drawer-sublink"
                  onClick={onNavigate}
                >
                  {child.label}
                </Link>
              ),
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const location = useLocation();

  const handleCloseMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 40);
      if (currentY > 100) {
        setHidden(currentY > lastScrollY.current);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.to(navRef.current, {
      y: hidden ? -64 : 0,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, [hidden]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    },
    [],
  );

  return (
    <>
      <nav
        ref={navRef}
        className={`vanta-nav${scrolled ? " vanta-nav--scrolled" : ""}`}
        id="main-nav"
        onKeyDown={handleKeyDown}
      >
        <Link
          to="/"
          className="vanta-logo"
          onClick={handleCloseMobile}
          aria-label="VantaDB — home"
        >
          <VantaDBLogoFull size="sm" />
        </Link>

        <div className="nav-desktop">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <NavDropdown
                key={item.label}
                label={item.label}
                items={item.children}
                isActive={isItemActive(item, location.pathname)}
              />
            ) : (
              <Link
                key={item.label}
                to={item.to as any}
                className={`nav-link${isItemActive(item, location.pathname) ? " active" : ""}`}
                activeOptions={{ exact: true }}
              >
                {item.label}
              </Link>
            ),
          )}
        </div>

        <div className="nav-actions">
          <a
            href="https://github.com/ness-e/Vantadb"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-github-link"
            aria-label="GitHub"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
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
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2.5 6h7M6.5 3l3 3-3 3" />
            </svg>
          </a>
        </div>

        <button
          className={`nav-hamburger${mobileOpen ? " nav-hamburger--open" : ""}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="nav-overlay"
              onClick={handleCloseMobile}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              className="nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="nav-drawer-header">
                <VantaDBLogoFull size="sm" noAnimation />
                <button
                  className="nav-drawer-close"
                  onClick={handleCloseMobile}
                  aria-label="Close menu"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <path d="M4.5 4.5l9 9M13.5 4.5l-9 9" />
                  </svg>
                </button>
              </div>
              <div className="nav-drawer-body">
                {NAV_ITEMS.map((item) => (
                  <MobileNavItem
                    key={item.label}
                    item={item}
                    onNavigate={handleCloseMobile}
                  />
                ))}
              </div>
              <div className="nav-drawer-footer">
                <a
                  href="https://github.com/ness-e/Vantadb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-drawer-cta"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                <a
                  href="https://pypi.org/project/vantadb-py/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-drawer-cta nav-drawer-cta--primary"
                >
                  Get Started
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M2.5 6h7M6.5 3l3 3-3 3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
