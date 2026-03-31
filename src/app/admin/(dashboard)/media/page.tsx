"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

interface MediaRecord {
  id: string;
  url: string;
  filename: string;
  altText: string;
  caption: string | null;
  width: number;
  height: number;
  sizeBytes: number;
  mimeType: string;
  folder: string;
  blurhash: string | null;
  createdAt: string;
  updatedAt: string;
}

const FOLDERS = [
  "all",
  "rooms",
  "dining",
  "resort",
  "activities",
  "wellness",
  "events",
  "general",
] as const;

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MediaLibraryPage() {
  const [media, setMedia] = useState<MediaRecord[]>([]);
  const [selected, setSelected] = useState<MediaRecord | null>(null);
  const [activeFolder, setActiveFolder] = useState<string>("all");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Editable fields for detail panel
  const [editAlt, setEditAlt] = useState("");
  const [editCaption, setEditCaption] = useState("");
  const [editFolder, setEditFolder] = useState("general");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    try {
      const params = activeFolder !== "all" ? `?folder=${activeFolder}` : "";
      const res = await fetch(`/api/media${params}`);
      if (res.ok) {
        const data = await res.json();
        setMedia(data);
      }
    } catch (error) {
      console.error("Failed to fetch media:", error);
    } finally {
      setLoading(false);
    }
  }, [activeFolder]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  // Sync detail panel fields when selection changes
  useEffect(() => {
    if (selected) {
      setEditAlt(selected.altText);
      setEditCaption(selected.caption || "");
      setEditFolder(selected.folder);
      setConfirmDelete(false);
    }
  }, [selected]);

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      const res = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("Upload error:", err);
      }

      await fetchMedia();
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    handleUpload(e.dataTransfer.files);
  }

  async function handleSave() {
    if (!selected) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/media/${selected.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alt_text: editAlt,
          caption: editCaption,
          folder: editFolder,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setSelected(updated);
        setMedia((prev) =>
          prev.map((m) => (m.id === updated.id ? updated : m))
        );
      }
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!selected) return;

    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch(`/api/media/${selected.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMedia((prev) => prev.filter((m) => m.id !== selected.id));
        setSelected(null);
      }
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeleting(false);
      setConfirmDelete(false);
    }
  }

  return (
    <div className="flex gap-6">
      {/* Main content */}
      <div className={`flex-1 min-w-0 ${selected ? "max-w-[calc(100%-24rem)]" : ""}`}>
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-heading text-3xl text-ocean-deep mb-4">
            Media Library
          </h1>

          {/* Upload zone */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              dragOver
                ? "border-ocean bg-ocean/5"
                : "border-sand-dark hover:border-ocean-light"
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleUpload(e.target.files)}
            />
            {uploading ? (
              <p className="text-ocean font-medium">Uploading...</p>
            ) : (
              <div>
                <svg
                  className="mx-auto h-10 w-10 text-text-light mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                <p className="text-text-light">
                  Drag and drop images here, or{" "}
                  <span className="text-ocean font-medium">click to browse</span>
                </p>
                <p className="text-sm text-text-light/60 mt-1">
                  Accepts JPG, PNG, WebP, and other image formats
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Folder filter tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {FOLDERS.map((folder) => (
            <button
              key={folder}
              onClick={() => {
                setActiveFolder(folder);
                setSelected(null);
              }}
              className={`px-4 py-1.5 rounded text-sm font-medium capitalize transition-colors ${
                activeFolder === folder
                  ? "bg-ocean-deep text-white"
                  : "bg-white text-text hover:bg-sand"
              }`}
            >
              {folder}
            </button>
          ))}
        </div>

        {/* Media grid */}
        {loading ? (
          <div className="text-center py-12 text-text-light">Loading...</div>
        ) : media.length === 0 ? (
          <div className="text-center py-12 text-text-light">
            No media found. Upload some images to get started.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {media.map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  setSelected(selected?.id === item.id ? null : item)
                }
                className={`relative aspect-square overflow-hidden rounded-lg group focus:outline-none ${
                  selected?.id === item.id
                    ? "ring-2 ring-ocean ring-offset-2"
                    : ""
                }`}
              >
                <Image
                  src={item.url}
                  alt={item.altText || item.filename}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                  <span className="text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition-opacity truncate w-full text-left">
                    {item.filename}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="w-96 shrink-0 bg-white rounded-lg p-6 shadow-sm border border-sand-dark/30 self-start sticky top-20">
          {/* Close button */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-xl text-ocean-deep">Details</h2>
            <button
              onClick={() => setSelected(null)}
              className="text-text-light hover:text-text p-1"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Image preview */}
          <div className="relative aspect-video rounded-lg overflow-hidden bg-sand mb-4">
            <Image
              src={selected.url}
              alt={selected.altText || selected.filename}
              fill
              className="object-contain"
              sizes="384px"
            />
          </div>

          {/* Metadata */}
          <div className="space-y-1 text-sm text-text-light mb-4">
            <p className="truncate" title={selected.filename}>
              <span className="font-medium text-text">File:</span>{" "}
              {selected.filename}
            </p>
            <p>
              <span className="font-medium text-text">Dimensions:</span>{" "}
              {selected.width} x {selected.height}
            </p>
            <p>
              <span className="font-medium text-text">Size:</span>{" "}
              {formatBytes(selected.sizeBytes)}
            </p>
            <p>
              <span className="font-medium text-text">Uploaded:</span>{" "}
              {formatDate(selected.createdAt)}
            </p>
          </div>

          {/* Editable fields */}
          <div className="space-y-3 mb-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Alt Text
              </label>
              <input
                type="text"
                value={editAlt}
                onChange={(e) => setEditAlt(e.target.value)}
                placeholder="Describe this image..."
                className="w-full px-3 py-2 border border-sand-dark rounded text-sm focus:outline-none focus:ring-1 focus:ring-ocean"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Caption
              </label>
              <input
                type="text"
                value={editCaption}
                onChange={(e) => setEditCaption(e.target.value)}
                placeholder="Optional caption..."
                className="w-full px-3 py-2 border border-sand-dark rounded text-sm focus:outline-none focus:ring-1 focus:ring-ocean"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Folder
              </label>
              <select
                value={editFolder}
                onChange={(e) => setEditFolder(e.target.value)}
                className="w-full px-3 py-2 border border-sand-dark rounded text-sm focus:outline-none focus:ring-1 focus:ring-ocean bg-white"
              >
                {FOLDERS.filter((f) => f !== "all").map((folder) => (
                  <option key={folder} value={folder}>
                    {folder.charAt(0).toUpperCase() + folder.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-ocean-deep text-white px-4 py-2 rounded text-sm font-medium hover:bg-ocean transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors disabled:opacity-50 ${
                confirmDelete
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-white text-red-600 border border-red-200 hover:bg-red-50"
              }`}
            >
              {deleting
                ? "Deleting..."
                : confirmDelete
                  ? "Confirm"
                  : "Delete"}
            </button>
          </div>

          {confirmDelete && (
            <p className="text-xs text-red-500 mt-2 text-center">
              Click Confirm to permanently delete this image.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
