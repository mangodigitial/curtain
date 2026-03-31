"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = ["news", "press", "travel", "dining", "events"] as const;
const STATUSES = ["draft", "published"] as const;

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function NewPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState<string>("news");
  const [authorName, setAuthorName] = useState("");
  const [status, setStatus] = useState<string>("draft");
  const [featuredImage, setFeaturedImage] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  function handleTitleChange(value: string) {
    setTitle(value);
    setSlug(slugify(value));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      // Convert content text to JSON blocks
      const contentBlocks = content
        .split("\n\n")
        .filter((p) => p.trim())
        .map((p) => ({ type: "paragraph", content: p.trim() }));

      // Parse tags
      const tags = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          excerpt: excerpt || null,
          content: contentBlocks,
          featuredImage: featuredImage || null,
          category,
          tags,
          authorName,
          status,
          seo: {
            metaTitle: metaTitle || title,
            metaDescription: metaDescription || excerpt || "",
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create post");
      }

      router.push("/admin/blog");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full border border-sand-dark/30 rounded px-3 py-2 text-sm focus:outline-none focus:border-ocean-deep";
  const labelClass = "block text-sm font-medium text-text mb-1";

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-semibold text-text">New Blog Post</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-coral/10 border border-coral/30 px-4 py-3 text-sm text-coral">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main content card */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-5">
          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className={inputClass}
              placeholder="Post title"
            />
          </div>

          <div>
            <label className={labelClass}>Slug</label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className={inputClass}
              placeholder="post-slug"
            />
          </div>

          <div>
            <label className={labelClass}>Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              className={inputClass}
              placeholder="Brief summary of the post"
            />
          </div>

          <div>
            <label className={labelClass}>Content</label>
            <p className="text-xs text-text-light mb-1">
              Separate paragraphs with a blank line.
            </p>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              className={inputClass}
              placeholder="Write your post content here..."
            />
          </div>
        </div>

        {/* Sidebar-style fields */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-5">
            <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
              Details
            </h2>

            <div>
              <label className={labelClass}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Author Name</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className={inputClass}
                placeholder="Author name"
              />
            </div>

            <div>
              <label className={labelClass}>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={inputClass}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Featured Image URL</label>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className={inputClass}
                placeholder="https://... or media UUID"
              />
            </div>

            <div>
              <label className={labelClass}>Tags</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className={inputClass}
                placeholder="tag1, tag2, tag3"
              />
              <p className="text-xs text-text-light mt-1">Comma-separated</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 space-y-5">
            <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
              SEO
            </h2>

            <div>
              <label className={labelClass}>Meta Title</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className={inputClass}
                placeholder="Defaults to post title"
              />
            </div>

            <div>
              <label className={labelClass}>Meta Description</label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={3}
                className={inputClass}
                placeholder="Search engine description"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-ocean-deep text-white px-4 py-2 rounded text-sm hover:bg-ocean-deep/90 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Create Post"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/blog")}
            className="px-4 py-2 rounded text-sm border border-sand-dark/30 text-text hover:bg-sand-light transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
