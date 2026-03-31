"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MenuOverlay from "./MenuOverlay";

interface NavigationProps {
  siteName: string;
  siteNameItalic: string;
  bookingUrl: string;
  menuLinks: { number: string; label: string; href: string; image?: string }[];
  contactInfo?: { phone?: string; email?: string; address?: string };
}

export default function Navigation({
  siteName,
  siteNameItalic,
  bookingUrl,
  menuLinks,
  contactInfo,
}: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navClasses = [
    scrolled && !menuOpen ? "scrolled" : "",
    menuOpen ? "menu-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <nav id="nav" className={navClasses}>
        {/* Logo */}
        <Link href="/" className="logo">
          {siteName} <em>{siteNameItalic}</em>
        </Link>

        <div className="nav-right">
          {/* CTA Button */}
          <Link href={bookingUrl} className="nav-cta">
            Book Your Stay
          </Link>

          {/* Menu Button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className={`menu-btn${menuOpen ? " active" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <MenuOverlay
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={menuLinks}
        contactInfo={contactInfo}
      />
    </>
  );
}
