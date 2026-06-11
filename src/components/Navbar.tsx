"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NavDropdown from "./NavDropdown";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/campeonato", label: "Campeonato" },
  { href: "/calendario", label: "Calendario" },
];

const dropdownItems = [
  { label: "Copa Chapa Chapa", href: "/copa-chapa-chapa" },
  { label: "Splits", href: "/splits" },
  { label: "Campeones", href: "/campeones" },
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

  const cccActive =
    pathname === "/copa-chapa-chapa" || pathname === "/splits";

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
          <NavDropdown
            label="Copa Chapa Chapa"
            href="/copa-chapa-chapa"
            items={dropdownItems}
            isActive={cccActive}
            pathname={pathname}
            onNavigate={close}
          />
          <li>
            <Link href="/inscripcion" className="nav-cta" onClick={close}>
              Inscribite
            </Link>
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
