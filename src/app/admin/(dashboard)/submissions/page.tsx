"use client";

import { useEffect, useState } from "react";

interface Submission {
  id: string;
  formType: string;
  data: Record<string, unknown>;
  read: boolean;
  replied: boolean;
  createdAt: string;
}

type FilterTab = "all" | "contact" | "wedding" | "event" | "newsletter";

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  function fetchSubmissions() {
    fetch("/api/submissions")
      .then((res) => res.json())
      .then((data) => setSubmissions(data))
      .catch((err) => console.error("Failed to load submissions:", err))
      .finally(() => setLoading(false));
  }

  const filtered = submissions.filter((s) => {
    if (activeTab === "all") return true;
    return s.formType.toLowerCase() === activeTab;
  });

  const unreadCount = submissions.filter((s) => !s.read).length;

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "contact", label: "Contact" },
    { key: "wedding", label: "Wedding" },
    { key: "event", label: "Event" },
    { key: "newsletter", label: "Newsletter" },
  ];

  async function markAs(id: string, field: "read" | "replied", value: boolean) {
    try {
      const res = await fetch(`/api/submissions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      if (res.ok) {
        setSubmissions((prev) =>
          prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
        );
      }
    } catch (err) {
      console.error("Failed to update submission:", err);
    }
  }

  function getPreviewFields(data: Record<string, unknown>): string {
    const entries = Object.entries(data);
    return entries
      .slice(0, 2)
      .map(([key, value]) => `${key}: ${String(value).substring(0, 60)}`)
      .join(" | ");
  }

  function exportCSV() {
    if (filtered.length === 0) return;

    // Gather all unique keys from data fields
    const allKeys = new Set<string>();
    filtered.forEach((s) => {
      Object.keys(s.data).forEach((k) => allKeys.add(k));
    });
    const dataKeys = Array.from(allKeys);

    const headers = ["Form Type", "Date", "Read", "Replied", ...dataKeys];
    const rows = filtered.map((s) => {
      const dataValues = dataKeys.map((k) => {
        const val = s.data[k];
        const str = val !== undefined && val !== null ? String(val) : "";
        // Escape quotes for CSV
        return `"${str.replace(/"/g, '""')}"`;
      });
      return [
        `"${s.formType}"`,
        `"${new Date(s.createdAt).toLocaleString()}"`,
        s.read ? "Yes" : "No",
        s.replied ? "Yes" : "No",
        ...dataValues,
      ].join(",");
    });

    const csv = [headers.map((h) => `"${h}"`).join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `submissions-${activeTab}-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-heading font-semibold text-text">Submissions</h1>
          {unreadCount > 0 && (
            <span className="inline-flex items-center justify-center bg-ocean-deep text-white text-xs font-medium rounded-full px-2.5 py-0.5">
              {unreadCount} unread
            </span>
          )}
        </div>
        <button
          onClick={exportCSV}
          disabled={filtered.length === 0}
          className="bg-ocean-deep text-white px-4 py-2 rounded text-sm hover:bg-ocean-deep/90 transition disabled:opacity-50"
        >
          Export CSV
        </button>
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

      {/* List */}
      {loading ? (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center text-text-light text-sm">
          Loading submissions...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center text-text-light text-sm">
          No submissions found.
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((submission) => {
            const isExpanded = expandedId === submission.id;
            return (
              <div
                key={submission.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                {/* Summary row */}
                <button
                  onClick={() => {
                    setExpandedId(isExpanded ? null : submission.id);
                    if (!submission.read) {
                      markAs(submission.id, "read", true);
                    }
                  }}
                  className="w-full text-left px-6 py-4 flex items-center gap-4 hover:bg-sand-light/50 transition"
                >
                  {/* Unread indicator */}
                  <div className="flex-shrink-0 w-2.5 h-2.5">
                    {!submission.read && (
                      <span className="block w-2.5 h-2.5 rounded-full bg-ocean-deep" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        className={`text-sm capitalize ${
                          !submission.read ? "font-bold text-text" : "font-medium text-text"
                        }`}
                      >
                        {submission.formType}
                      </span>
                      <span className="text-xs text-text-light">
                        {new Date(submission.createdAt).toLocaleString()}
                      </span>
                      {submission.replied && (
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          Replied
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-sm truncate ${
                        !submission.read ? "font-semibold text-text" : "text-text-light"
                      }`}
                    >
                      {getPreviewFields(submission.data)}
                    </p>
                  </div>

                  <svg
                    className={`w-4 h-4 text-text-light transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="px-6 pb-5 border-t border-sand-dark/20">
                    <div className="pt-4 space-y-2">
                      {Object.entries(submission.data).map(([key, value]) => (
                        <div key={key} className="flex gap-3 text-sm">
                          <span className="font-medium text-text min-w-[140px] capitalize">
                            {key}:
                          </span>
                          <span className="text-text-light">{String(value)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-sand-dark/10">
                      {!submission.read && (
                        <button
                          onClick={() => markAs(submission.id, "read", true)}
                          className="bg-ocean-deep text-white px-3 py-1.5 rounded text-xs hover:bg-ocean-deep/90 transition"
                        >
                          Mark as Read
                        </button>
                      )}
                      {!submission.replied && (
                        <button
                          onClick={() => markAs(submission.id, "replied", true)}
                          className="bg-green-600 text-white px-3 py-1.5 rounded text-xs hover:bg-green-700 transition"
                        >
                          Mark as Replied
                        </button>
                      )}
                      {submission.replied && (
                        <button
                          onClick={() => markAs(submission.id, "replied", false)}
                          className="border border-sand-dark/30 text-text px-3 py-1.5 rounded text-xs hover:bg-sand-light transition"
                        >
                          Unmark Replied
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
