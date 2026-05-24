"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavDropdownProps {
  label: string;
  href: string;
  items: DropdownItem[];
  isActive: boolean;
  pathname: string;
  onNavigate: () => void;
}

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

export default function NavDropdown({
  label,
  href,
  items,
  isActive,
  pathname,
  onNavigate,
}: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const [touch] = useState(isTouchDevice);
  const ref = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = undefined;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 200);
  }, [cancelClose]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  const anyChildActive = items.some((item) => pathname === item.href);

  return (
    <li
      ref={ref}
      className={`nav-dropdown${open ? " open" : ""}`}
      onMouseEnter={() => {
        if (!touch) {
          cancelClose();
          setOpen(true);
        }
      }}
      onMouseLeave={() => {
        if (!touch) scheduleClose();
      }}
      onFocus={() => {
        if (!touch) setOpen(true);
      }}
      onBlur={(e) => {
        if (!touch && !ref.current?.contains(e.relatedTarget as Node)) {
          scheduleClose();
        }
      }}
    >
      <Link
        href={href}
        className={isActive || anyChildActive ? "active" : ""}
        onClick={onNavigate}
      >
        {label}
      </Link>
      <button
        className={`nav-dropdown-chevron${open ? " open" : ""}`}
        onClick={handleToggle}
        aria-label={open ? "Cerrar submenú" : "Abrir submenú"}
        aria-expanded={open}
        type="button"
      >
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <ul className="nav-dropdown-menu">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={pathname === item.href ? "active" : ""}
              onClick={() => {
                setOpen(false);
                onNavigate();
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}
