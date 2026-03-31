import { db } from "@/lib/db";
import {
  FileText,
  PenSquare,
  Inbox,
  Tag,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

async function getStats() {
  try {
    const [totalPages, publishedPosts, unreadSubmissions, activeOffers] =
      await Promise.all([
        db.page.count(),
        db.post.count({ where: { status: "published" } }),
        db.submission.count({ where: { read: false } }),
        db.offer.count({ where: { status: "active" } }),
      ]);
    return { totalPages, publishedPosts, unreadSubmissions, activeOffers };
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return { totalPages: 0, publishedPosts: 0, unreadSubmissions: 0, activeOffers: 0 };
  }
}

async function getRecentSubmissions() {
  try {
    return await db.submission.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
  } catch (error) {
    console.error("Failed to fetch submissions:", error);
    return [];
  }
}

async function getExpiringOffers() {
  try {
    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return await db.offer.findMany({
      where: {
        status: "active",
        validTo: {
          gte: now,
          lte: sevenDaysFromNow,
        },
      },
      orderBy: { validTo: "asc" },
    });
  } catch (error) {
    console.error("Failed to fetch expiring offers:", error);
    return [];
  }
}

const statCards = [
  { label: "Total Pages", key: "totalPages" as const, icon: FileText, href: "/admin/pages" },
  { label: "Published Posts", key: "publishedPosts" as const, icon: PenSquare, href: "/admin/blog" },
  { label: "Unread Submissions", key: "unreadSubmissions" as const, icon: Inbox, href: "/admin/submissions" },
  { label: "Active Offers", key: "activeOffers" as const, icon: Tag, href: "/admin/offers" },
];

export default async function AdminDashboard() {
  const [stats, recentSubmissions, expiringOffers] = await Promise.all([
    getStats(),
    getRecentSubmissions(),
    getExpiringOffers(),
  ]);

  return (
    <div className="space-y-8">
      <h1 className="font-heading text-3xl font-semibold text-ocean-deep">
        Dashboard
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map(({ label, key, icon: Icon, href }) => (
          <Link
            key={key}
            href={href}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <Icon size={20} className="text-ocean-light" />
            </div>
            <p className="font-heading text-3xl font-semibold text-ocean-deep">
              {stats[key]}
            </p>
            <p className="text-sm text-text-light mt-1">{label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Submissions */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-sand-dark/20 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-ocean-deep">
              Recent Submissions
            </h2>
            <Link
              href="/admin/submissions"
              className="text-sm text-ocean-light hover:text-ocean transition"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-sand-dark/10">
            {recentSubmissions.length === 0 ? (
              <p className="px-6 py-8 text-sm text-text-light text-center">
                No submissions yet
              </p>
            ) : (
              recentSubmissions.map((submission) => (
                <Link
                  key={submission.id}
                  href="/admin/submissions"
                  className="flex items-center justify-between px-6 py-3 hover:bg-sand-light/50 transition"
                >
                  <div className="flex items-center gap-3">
                    {!submission.read && (
                      <span className="w-2 h-2 rounded-full bg-coral flex-shrink-0" />
                    )}
                    <span
                      className={`text-sm ${
                        !submission.read
                          ? "font-semibold text-text"
                          : "text-text-light"
                      }`}
                    >
                      {submission.formType}
                    </span>
                  </div>
                  <time className="text-xs text-text-light">
                    {new Date(submission.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </time>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Expiring Offers */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-sand-dark/20">
            <h2 className="font-heading text-lg font-semibold text-ocean-deep">
              Expiring Offers
            </h2>
          </div>
          <div className="divide-y divide-sand-dark/10">
            {expiringOffers.length === 0 ? (
              <p className="px-6 py-8 text-sm text-text-light text-center">
                No offers expiring in the next 7 days
              </p>
            ) : (
              expiringOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="flex items-center gap-3 px-6 py-3"
                >
                  <AlertTriangle size={16} className="text-gold flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text truncate">
                      {offer.title}
                    </p>
                    <p className="text-xs text-text-light">
                      Expires{" "}
                      {offer.validTo
                        ? new Date(offer.validTo).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "N/A"}
                    </p>
                  </div>
                  <Link
                    href={`/admin/offers`}
                    className="text-xs text-ocean-light hover:text-ocean transition"
                  >
                    Edit
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
