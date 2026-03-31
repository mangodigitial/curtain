"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  authorName: string;
  createdAt: string;
}

type FilterTab = "all" | "published" | "draft";

export default function BlogListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to load posts:", err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = posts.filter((p) => {
    if (activeTab === "all") return true;
    return p.status === activeTab;
  });

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "published", label: "Published" },
    { key: "draft", label: "Draft" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-semibold text-text">Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="bg-ocean-deep text-white px-4 py-2 rounded text-sm hover:bg-ocean-deep/90 transition"
        >
          New Post
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
          <div className="p-6 text-center text-text-light text-sm">Loading posts...</div>
        ) : filtered.length === 0 ? (
          <div className="p-6 text-center text-text-light text-sm">No posts found.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-sand-dark/20 text-left text-xs uppercase tracking-wider text-text-light">
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-dark/20">
              {filtered.map((post) => (
                <tr key={post.id} className="hover:bg-sand-light/50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-text">
                    {post.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-text-light capitalize">
                    {post.category}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        post.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-light">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/blog/${post.id}`}
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
