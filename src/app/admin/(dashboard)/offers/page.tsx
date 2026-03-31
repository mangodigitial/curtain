"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Offer {
  id: string;
  title: string;
  slug: string;
  discountLabel: string | null;
  status: string;
  validFrom: string | null;
  validTo: string | null;
  isFeatured: boolean;
  createdAt: string;
}

type FilterTab = "all" | "active" | "expired" | "draft";

export default function OffersListPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  useEffect(() => {
    fetch("/api/offers")
      .then((res) => res.json())
      .then((data) => setOffers(data))
      .catch((err) => console.error("Failed to load offers:", err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = offers.filter((o) => {
    if (activeTab === "all") return true;
    return o.status === activeTab;
  });

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "expired", label: "Expired" },
    { key: "draft", label: "Draft" },
  ];

  function formatDate(d: string | null) {
    if (!d) return "--";
    return new Date(d).toLocaleDateString();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-semibold text-text">Special Offers</h1>
        <Link
          href="/admin/offers/new"
          className="bg-ocean-deep text-white px-4 py-2 rounded text-sm hover:bg-ocean-deep/90 transition"
        >
          New Offer
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded text-sm font-medium transition ${
              activeTab === tab.key
                ? "bg-ocean-deep text-white"
                : "bg-white text-text hover:bg-sand-dark/20"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm">
        {loading ? (
          <div className="p-6 text-center text-text-light text-sm">Loading offers...</div>
        ) : filtered.length === 0 ? (
          <div className="p-6 text-center text-text-light text-sm">No offers found.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-sand-dark/20 text-left text-xs uppercase tracking-wider text-text-light">
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Discount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Valid Dates</th>
                <th className="px-6 py-3">Featured</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-dark/20">
              {filtered.map((offer) => (
                <tr key={offer.id} className="hover:bg-sand-light/50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-text">
                    {offer.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-text-light">
                    {offer.discountLabel || "--"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        offer.status === "active"
                          ? "bg-green-100 text-green-700"
                          : offer.status === "expired"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {offer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-light">
                    {formatDate(offer.validFrom)} &mdash; {formatDate(offer.validTo)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {offer.isFeatured && (
                      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-ocean-deep/10 text-ocean-deep">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/offers/${offer.id}`}
                      className="text-ocean-deep text-sm hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
