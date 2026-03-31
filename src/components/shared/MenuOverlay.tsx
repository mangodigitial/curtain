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
    <div className={`menu-overlay${isOpen ? " open" : ""}`} id="menuOverlay">
      {/* Left — Navigation Links */}
      <div className="menu-left">
        <ul className="menu-links">
          {links.map((link, i) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span className="link-num">{link.number}</span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Contact */}
        {contactInfo && (
          <div className="menu-contact">
            {contactInfo.phone && (
              <>
                <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}>
                  {contactInfo.phone}
                </a>
                <br />
              </>
            )}
            {contactInfo.email && (
              <>
                <a href={`mailto:${contactInfo.email}`}>
                  {contactInfo.email}
                </a>
                <br />
              </>
            )}
            {contactInfo.address && contactInfo.address}
          </div>
        )}
      </div>

      {/* Right — Hover Image */}
      <div className="menu-right">
        {links.map((link, i) =>
          link.image ? (
            <Image
              key={link.href}
              src={link.image}
              alt={link.label}
              fill
              className={hoveredIndex === i ? "visible" : ""}
              sizes="40vw"
            />
          ) : null,
        )}
      </div>
    </div>
  );
}
