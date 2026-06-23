import { useState, useRef, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";

interface DropdownItem {
  label: string;
  to: string;
  external?: boolean;
}

interface NavDropdownProps {
  label: string;
  items: DropdownItem[];
  isActive?: boolean;
}

export function NavDropdown({ label, items, isActive }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleOpen = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  }, []);

  const handleClick = useCallback(() => {
    setOpen((v) => !v);
  }, []);

  return (
    <div className="nav-dropdown" onMouseEnter={handleOpen} onMouseLeave={handleClose}>
      <button
        className={`nav-dropdown-toggle${isActive ? " active" : ""}`}
        onClick={handleClick}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <svg
          className={`nav-chevron${open ? " open" : ""}`}
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M2.5 3.5l2.5 3 2.5-3" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-dropdown-panel"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
          >
            {items.map((item, i) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.to}
                  className="nav-dropdown-item"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  {item.external && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="nav-external-icon"
                      aria-hidden="true"
                    >
                      <path d="M7 1H3M7 1v4M7 1L2.5 5.5" />
                    </svg>
                  )}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.to as any}
                  className="nav-dropdown-item"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ),
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
