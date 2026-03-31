"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const OFFER_STATUSES = ["draft", "active", "expired"] as const;

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

interface DetailPair {
  label: string;
  value: string;
}

export default function NewOfferPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [discountLabel, setDiscountLabel] = useState("");
  const [image, setImage] = useState("");
  const [bookingUrl, setBookingUrl] = useState("");
  const [includesText, setIncludesText] = useState("");
  const [terms, setTerms] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState("");
  const [roomCategories, setRoomCategories] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [status, setStatus] = useState<string>("draft");
  const [details, setDetails] = useState<DetailPair[]>([]);

  function handleTitleChange(value: string) {
    setTitle(value);
    setSlug(slugify(value));
  }

  function addDetail() {
    setDetails([...details, { label: "", value: "" }]);
  }

  function removeDetail(index: number) {
    setDetails(details.filter((_, i) => i !== index));
  }

  function updateDetail(index: number, field: "label" | "value", val: string) {
    const updated = [...details];
    updated[index][field] = val;
    setDetails(updated);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const includesArray = includesText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const roomCatsArray = roomCategories
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);

      // Convert details array to object
      const detailsObj: Record<string, string> = {};
      details.forEach((d) => {
        if (d.label.trim()) {
          detailsObj[d.label.trim()] = d.value.trim();
        }
      });

      const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          description,
          discountLabel: discountLabel || null,
          image: image || null,
          bookingUrl: bookingUrl || null,
          includes: includesArray,
          terms: terms || null,
          validFrom: validFrom || null,
          validTo: validTo || null,
          roomCategories: roomCatsArray,
          isFeatured,
          status,
          details: detailsObj,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create offer");
      }

      router.push("/admin/offers");
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
        <h1 className="text-2xl font-heading font-semibold text-text">New Offer</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-coral/10 border border-coral/30 px-4 py-3 text-sm text-coral">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main fields */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className={inputClass}
                placeholder="Offer title"
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
                placeholder="offer-slug"
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={inputClass}
              placeholder="Describe the offer"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Discount Label</label>
              <input
                type="text"
                value={discountLabel}
                onChange={(e) => setDiscountLabel(e.target.value)}
                className={inputClass}
                placeholder="e.g. 20% Off"
              />
            </div>
            <div>
              <label className={labelClass}>Booking URL</label>
              <input
                type="text"
                value={bookingUrl}
                onChange={(e) => setBookingUrl(e.target.value)}
                className={inputClass}
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className={inputClass}
              placeholder="https://... or media UUID"
            />
          </div>
        </div>

        {/* Includes & Terms */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-5">
          <div>
            <label className={labelClass}>Includes</label>
            <p className="text-xs text-text-light mb-1">One item per line</p>
            <textarea
              value={includesText}
              onChange={(e) => setIncludesText(e.target.value)}
              rows={5}
              className={inputClass}
              placeholder="Daily breakfast&#10;Spa credit&#10;Airport transfer"
            />
          </div>

          <div>
            <label className={labelClass}>Terms</label>
            <textarea
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              rows={3}
              className={inputClass}
              placeholder="Terms and conditions"
            />
          </div>
        </div>

        {/* Dates, Categories, Status */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div>
              <label className={labelClass}>Valid From</label>
              <input
                type="date"
                value={validFrom}
                onChange={(e) => setValidFrom(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Valid To</label>
              <input
                type="date"
                value={validTo}
                onChange={(e) => setValidTo(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={inputClass}
              >
                {OFFER_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Room Categories</label>
            <input
              type="text"
              value={roomCategories}
              onChange={(e) => setRoomCategories(e.target.value)}
              className={inputClass}
              placeholder="suite, deluxe, standard"
            />
            <p className="text-xs text-text-light mt-1">Comma-separated</p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="rounded border-sand-dark/30"
            />
            <label htmlFor="isFeatured" className="text-sm text-text">
              Featured on homepage
            </label>
          </div>
        </div>

        {/* Details Repeater */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-text uppercase tracking-wider">
              Details
            </h2>
            <button
              type="button"
              onClick={addDetail}
              className="text-ocean-deep text-sm hover:underline"
            >
              + Add Detail
            </button>
          </div>

          {details.length === 0 && (
            <p className="text-sm text-text-light">
              No details added. Click &ldquo;Add Detail&rdquo; to start.
            </p>
          )}

          {details.map((detail, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={detail.label}
                  onChange={(e) => updateDetail(i, "label", e.target.value)}
                  className={inputClass}
                  placeholder="Label (e.g. Duration)"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={detail.value}
                  onChange={(e) => updateDetail(i, "value", e.target.value)}
                  className={inputClass}
                  placeholder="Value (e.g. 7 nights)"
                />
              </div>
              <button
                type="button"
                onClick={() => removeDetail(i)}
                className="mt-1.5 text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-ocean-deep text-white px-4 py-2 rounded text-sm hover:bg-ocean-deep/90 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Create Offer"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/offers")}
            className="px-4 py-2 rounded text-sm border border-sand-dark/30 text-text hover:bg-sand-light transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
