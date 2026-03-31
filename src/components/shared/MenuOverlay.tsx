"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ─── Props ──────────────────────────────────────────── */

interface MenuLink {
  number: string;
  label: string;
  href: string;
  image?: string;
}

interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
}

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  links: MenuLink[];
  contactInfo?: ContactInfo;
}

/* ─── MenuOverlay ────────────────────────────────────── */

export default function MenuOverlay({
  isOpen,
  onClose,
  links,
  contactInfo,
}: MenuOverlayProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={`fixed inset-0 bg-ocean-deep z-[1001] transition-all duration-500 ${
        isOpen
          ? "opacity-100 visible"
          : "opacity-0 invisible"
      }`}
    >
      <div className="flex h-full">
        {/* Left — Navigation Links */}
        <div className="flex-1 flex flex-col justify-center px-20 py-24">
          <ul className="space-y-1">
            {links.map((link, i) => (
              <li key={link.href} className="overflow-hidden">
                <Link
                  href={link.href}
                  onClick={onClose}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="font-heading text-[clamp(2rem,4.5vw,3.8rem)] font-light text-sand hover:text-coral-soft inline-flex items-baseline gap-4 transition-colors duration-300"
                  style={{
                    transform: isOpen ? "translateY(0)" : "translateY(110%)",
                    transition: `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.06}s`,
                  }}
                >
                  <span className="font-body text-[0.7rem] font-light tracking-[0.1em] text-gold/60">
                    {link.number}
                  </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Contact */}
          {contactInfo && (
            <div className="mt-16 text-[0.7rem] tracking-[0.15em] text-sand-dark font-light leading-loose">
              {contactInfo.phone && (
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className="block text-gold-light hover:text-coral-soft transition-colors"
                >
                  {contactInfo.phone}
                </a>
              )}
              {contactInfo.email && (
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="block text-gold-light hover:text-coral-soft transition-colors"
                >
                  {contactInfo.email}
                </a>
              )}
              {contactInfo.address && (
                <p className="mt-2">{contactInfo.address}</p>
              )}
            </div>
          )}
        </div>

        {/* Right — Hover Image */}
        <div className="hidden lg:block w-[40%] relative overflow-hidden">
          {links.map((link, i) =>
            link.image ? (
              <div
                key={link.href}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  hoveredIndex === i ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={link.image}
                  alt={link.label}
                  fill
                  className="object-cover"
                  sizes="40vw"
                />
              </div>
            ) : null,
          )}
          {/* Fallback gradient when no image is hovered */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-ocean-deep to-ocean transition-opacity duration-500 ${
              hoveredIndex === null ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
