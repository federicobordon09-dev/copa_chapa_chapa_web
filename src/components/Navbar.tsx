"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/campeonato", label: "Campeonato" },
  { href: "/clasificacion", label: "Clasificación" },
  { href: "/calendario", label: "Calendario" },
  { href: "/pilotos", label: "Pilotos" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  const toggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    document.body.style.overflow = next ? "hidden" : "";
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest(".navbar")) close();
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [isOpen]);

  return (
    <nav
      className="navbar"
      style={{ backgroundColor: scrolled ? "rgba(0,0,0,0.97)" : "" }}
    >
      <div className="container">
        <Link href="/" className="nav-logo">
          <img
            src="/assets/images/isotipo_cc.webp"
            alt="Logo Copa Chapa Chapa"
            className="nav-logo-img"
          />
        </Link>
        <ul className={`nav-links${isOpen ? " open" : ""}`}>
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={pathname === l.href ? "active" : ""}
                onClick={close}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <span className="nav-cta nav-cta--closed">
              Inscripciones cerradas
            </span>
          </li>
        </ul>
        <button
          className={`nav-toggle${isOpen ? " open" : ""}`}
          id="navToggle"
          aria-label="Abrir menú"
          onClick={toggle}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
