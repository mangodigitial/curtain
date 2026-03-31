"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  PenSquare,
  Tag,
  Image,
  Inbox,
  ArrowRightLeft,
  Settings,
  ExternalLink,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Pages", href: "/admin/pages", icon: FileText },
  { label: "Blog", href: "/admin/blog", icon: PenSquare },
  { label: "Offers", href: "/admin/offers", icon: Tag },
  { label: "Media", href: "/admin/media", icon: Image },
  { label: "Submissions", href: "/admin/submissions", icon: Inbox },
  { label: "Redirects", href: "/admin/redirects", icon: ArrowRightLeft },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-ocean-deep text-sand flex flex-col z-30">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <h1 className="font-heading text-xl font-semibold tracking-wide text-sand">
          Curtain Bluff
        </h1>
        <span className="text-[10px] uppercase tracking-[0.2em] text-sand-dark">
          Admin
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 py-2.5 px-4 rounded text-sm transition-colors ${
              isActive(href)
                ? "bg-white/10 text-sand"
                : "text-sand-dark hover:bg-white/10 hover:text-sand"
            }`}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      {/* View Site */}
      <div className="px-3 py-4 border-t border-white/10">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 py-2.5 px-4 rounded text-sm text-sand-dark hover:bg-white/10 hover:text-sand transition-colors"
        >
          <ExternalLink size={18} />
          View Site
        </a>
      </div>
    </aside>
  );
}
