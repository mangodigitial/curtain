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

interface ImagePickerProps {
  value?: string;
  onChange: (media: { id: string; url: string; alt: string }) => void;
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

export function ImagePicker({ value, onChange }: ImagePickerProps) {
  const [open, setOpen] = useState(false);
  const [media, setMedia] = useState<MediaRecord[]>([]);
  const [activeFolder, setActiveFolder] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [thumbnail, setThumbnail] = useState<MediaRecord | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch thumbnail for current value
  useEffect(() => {
    if (!value) {
      setThumbnail(null);
      return;
    }
    fetch(`/api/media/${value}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setThumbnail(data))
      .catch(() => setThumbnail(null));
  }, [value]);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    try {
      const params = activeFolder !== "all" ? `?folder=${activeFolder}` : "";
      const res = await fetch(`/api/media${params}`);
      if (res.ok) {
        setMedia(await res.json());
      }
    } catch (error) {
      console.error("Failed to fetch media:", error);
    } finally {
      setLoading(false);
    }
  }, [activeFolder]);

  useEffect(() => {
    if (open) {
      fetchMedia();
    }
  }, [open, fetchMedia]);

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

      if (res.ok) {
        await fetchMedia();
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  function handleSelect(item: MediaRecord) {
    onChange({ id: item.id, url: item.url, alt: item.altText });
    setOpen(false);
  }

  const filtered = media.filter((item) =>
    search
      ? item.filename.toLowerCase().includes(search.toLowerCase())
      : true
  );

  return (
    <div>
      {/* Trigger button with optional thumbnail */}
      <div className="flex items-center gap-3">
        {thumbnail && (
          <div className="relative w-16 h-16 rounded overflow-hidden border border-sand-dark/30 shrink-0">
            <Image
              src={thumbnail.url}
              alt={thumbnail.altText || thumbnail.filename}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        )}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-white border border-sand-dark rounded text-sm font-medium text-text hover:bg-sand transition-colors"
        >
          {value ? "Change Image" : "Select Image"}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange({ id: "", url: "", alt: "" })}
            className="px-3 py-2 text-sm text-red-600 hover:text-red-700"
          >
            Remove
          </button>
        )}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[85vh] flex flex-col mx-4">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-sand-dark/30">
              <h2 className="font-heading text-xl text-ocean-deep">
                Select Image
              </h2>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="px-4 py-1.5 bg-ocean-deep text-white rounded text-sm font-medium hover:bg-ocean transition-colors disabled:opacity-50"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleUpload(e.target.files)}
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
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
            </div>

            {/* Filters row */}
            <div className="flex items-center gap-3 p-4 border-b border-sand-dark/30">
              {/* Folder tabs */}
              <div className="flex gap-1.5 flex-wrap flex-1">
                {FOLDERS.map((folder) => (
                  <button
                    key={folder}
                    type="button"
                    onClick={() => setActiveFolder(folder)}
                    className={`px-3 py-1 rounded text-xs font-medium capitalize transition-colors ${
                      activeFolder === folder
                        ? "bg-ocean-deep text-white"
                        : "bg-sand-light text-text hover:bg-sand"
                    }`}
                  >
                    {folder}
                  </button>
                ))}
              </div>

              {/* Search */}
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by filename..."
                className="px-3 py-1.5 border border-sand-dark rounded text-sm w-48 focus:outline-none focus:ring-1 focus:ring-ocean"
              />
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <div className="text-center py-12 text-text-light">
                  Loading...
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-12 text-text-light">
                  No images found.
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {filtered.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelect(item)}
                      className={`relative aspect-square overflow-hidden rounded-lg group focus:outline-none ${
                        value === item.id
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
          </div>
        </div>
      )}
    </div>
  );
}
