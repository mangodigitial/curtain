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
    <footer>
      <div className="footer-grid">
        {/* Brand Column */}
        <div className="footer-brand">
          <Link href="/" className="logo">
            {siteName} <em>{siteNameItalic}</em>
          </Link>
          <p>{description}</p>
        </div>

        {/* Link Columns */}
        {columns.map((col) => (
          <div key={col.title} className="footer-col">
            <h5>{col.title}</h5>
            <ul>
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} {siteName} {siteNameItalic}. All
          rights reserved.
        </p>

        <div className="footer-badges">
          {badges.map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
