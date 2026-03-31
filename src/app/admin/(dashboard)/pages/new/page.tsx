"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const TEMPLATES = [
  "generic",
  "home",
  "rooms",
  "room-detail",
  "dining",
  "wellness",
  "experiences",
  "offers",
  "gallery",
  "contact",
  "about",
];

interface ParentOption {
  id: string;
  title: string;
  slug: string;
}

export default function NewPagePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [template, setTemplate] = useState("generic");
  const [parentId, setParentId] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [parents, setParents] = useState<ParentOption[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/pages")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setParents(data);
      });
  }, []);

  function handleTitleChange(val: string) {
    setTitle(val);
    setSlug(
      val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const res = await fetch("/api/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug,
        parentId: parentId || null,
        template,
        status,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to create page");
      setSaving(false);
      return;
    }

    const page = await res.json();
    router.push(`/admin/pages/${page.id}`);
  }

  return (
    <div className="max-w-xl">
      <h1 className="font-heading text-3xl font-semibold text-ocean-deep mb-6">
        New Page
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-50 text-red-700 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-text mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className="w-full px-3 py-2 border border-sand-dark/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">
            Slug
          </label>
          <div className="flex items-center gap-1 text-sm text-text-light">
            <span>/</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="flex-1 px-3 py-2 border border-sand-dark/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">
            Template
          </label>
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="w-full px-3 py-2 border border-sand-dark/30 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ocean/30"
          >
            {TEMPLATES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">
            Parent Page
          </label>
          <select
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
            className="w-full px-3 py-2 border border-sand-dark/30 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ocean/30"
          >
            <option value="">None (top-level)</option>
            {parents.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} (/{p.slug})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "draft" | "published")}
            className="w-full px-3 py-2 border border-sand-dark/30 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ocean/30"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 bg-ocean text-sand text-sm rounded hover:bg-ocean-deep transition-colors disabled:opacity-50"
          >
            {saving ? "Creating..." : "Create Page"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/pages")}
            className="px-5 py-2 border border-sand-dark/30 text-sm rounded hover:bg-sand-light transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
