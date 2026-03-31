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

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[1002] px-6 md:px-12 transition-all duration-[400ms] ease-in-out flex justify-between items-center ${
          scrolled && !menuOpen
            ? "py-4 bg-white/[0.92] backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.05)]"
            : "py-6 bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className={`font-heading text-[1.35rem] font-normal tracking-[0.25em] uppercase transition-colors duration-[400ms] ${
            menuOpen
              ? "text-sand"
              : scrolled
                ? "text-ocean-deep"
                : "text-white"
          }`}
        >
          {siteName}{" "}
          <span className="italic font-light tracking-[0.1em] opacity-70 text-[0.85em]">
            {siteNameItalic}
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {/* CTA Button */}
          <Link
            href={bookingUrl}
            className={`hidden sm:inline-block text-[0.65rem] tracking-[0.25em] uppercase font-medium px-7 py-2.5 transition-all duration-300 ${
              menuOpen ? "!hidden" : ""
            } ${
              scrolled
                ? "bg-ocean-deep text-white hover:bg-coral"
                : "bg-white/15 backdrop-blur text-white hover:bg-coral"
            }`}
          >
            Book Now
          </Link>

          {/* Menu Button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="relative flex flex-col gap-[5px] p-2 z-[1003]"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block w-7 h-[1.5px] transition-all duration-300 origin-center ${
                menuOpen
                  ? "bg-sand rotate-[45deg] translate-y-[6.5px]"
                  : scrolled
                    ? "bg-ocean-deep"
                    : "bg-white"
              }`}
            />
            <span
              className={`block w-[18px] h-[1.5px] ml-auto transition-all duration-300 ${
                menuOpen
                  ? "opacity-0 bg-sand"
                  : scrolled
                    ? "bg-ocean-deep"
                    : "bg-white"
              }`}
            />
            <span
              className={`block w-7 h-[1.5px] transition-all duration-300 origin-center ${
                menuOpen
                  ? "bg-sand -rotate-[45deg] -translate-y-[6.5px]"
                  : scrolled
                    ? "bg-ocean-deep"
                    : "bg-white"
              }`}
            />
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
