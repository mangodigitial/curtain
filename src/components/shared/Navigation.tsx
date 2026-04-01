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
          <img src="/logo.svg" alt={`${siteName} ${siteNameItalic}`} />
        </Link>

        {/* Desktop menu links */}
        <ul className="nav-links">
          <li className="nav-dropdown">
            <Link href="/rooms">Rooms</Link>
            <div className="nav-dropdown-menu">
              <Link href="/beach-front-rooms">Beach Front Rooms</Link>
              <Link href="/rooms-on-the-bluff">Rooms on the Bluff</Link>
              <Link href="/pool-suites">Pool Suites</Link>
            </div>
          </li>
          <li><Link href="/dining-drinks">Dining</Link></li>
          <li className="nav-dropdown">
            <Link href="/wellness">Wellness</Link>
            <div className="nav-dropdown-menu">
              <Link href="/the-spa">The Spa</Link>
              <Link href="/tennis">Tennis</Link>
              <Link href="/activities">Activities</Link>
            </div>
          </li>
          <li><Link href="/activities">Activities</Link></li>
          <li><Link href="/gallery">Gallery</Link></li>
          <li><Link href="/weddings-and-events">Weddings</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>

        <div className="nav-right">
          {/* CTA Button */}
          <Link href={bookingUrl} className="nav-cta">
            Book Your Stay
          </Link>

          {/* Menu Button (mobile only, hidden on desktop via CSS) */}
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
