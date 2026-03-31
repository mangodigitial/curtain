import Link from "next/link";

/* ─── Props ──────────────────────────────────────────── */

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

interface FooterProps {
  siteName: string;
  siteNameItalic: string;
  description: string;
  columns: FooterColumn[];
  badges: string[];
}

/* ─── Footer ─────────────────────────────────────────── */

export default function Footer({
  siteName,
  siteNameItalic,
  description,
  columns,
  badges,
}: FooterProps) {
  return (
    <footer className="bg-[#0A1E26] text-sand-dark py-20 px-12">
      {/* Footer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] gap-12 max-w-[1400px] mx-auto mb-12">
        {/* Brand Column */}
        <div>
          <Link
            href="/"
            className="font-heading text-[1.35rem] font-normal tracking-[0.25em] uppercase text-sand mb-4 block"
          >
            {siteName}{" "}
            <span className="italic font-light tracking-[0.1em] opacity-70 text-[0.85em]">
              {siteNameItalic}
            </span>
          </Link>
          <p className="text-[0.75rem] leading-relaxed font-light max-w-[300px]">
            {description}
          </p>
        </div>

        {/* Link Columns */}
        {columns.map((col) => (
          <div key={col.title}>
            <h5 className="font-heading text-base font-medium text-sand mb-5 tracking-[0.05em]">
              {col.title}
            </h5>
            <ul>
              {col.links.map((link) => (
                <li key={link.href} className="mb-2">
                  <Link
                    href={link.href}
                    className="text-[0.72rem] text-sand-dark font-light hover:text-gold-light transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/[0.08] pt-8 max-w-[1400px] mx-auto flex justify-between items-center flex-wrap gap-4">
        <p className="text-[0.65rem] text-white/25 font-light">
          &copy; {new Date().getFullYear()} {siteName} {siteNameItalic}. All
          rights reserved.
        </p>

        <div className="flex gap-6">
          {badges.map((badge) => (
            <span
              key={badge}
              className="text-[0.55rem] tracking-[0.15em] uppercase text-white/20 border border-white/10 px-3 py-1.5"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
