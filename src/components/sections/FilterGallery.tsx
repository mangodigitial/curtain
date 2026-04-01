"use client";

import { useState } from "react";
import Image from "next/image";
import type { FilterGallerySection } from "./types";

/* ─── Main Export ─────────────────────────────────────── */

export default function FilterGallery({
  data,
}: {
  data: FilterGallerySection;
}) {
  const [active, setActive] = useState("All");

  const categories = ["All", ...data.categories];
  const filtered =
    active === "All"
      ? data.images
      : data.images.filter((img) => img.category === active);

  return (
    <section>
      {/* ── Filter Bar ────────────────────────────────── */}
      <div className="filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={"filter-tab" + (active === cat ? " active" : "")}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Masonry Grid ──────────────────────────────── */}
      <div className="masonry-grid">
        {filtered.map((img) => (
          <div
            key={img.id}
            className="masonry-item"
          >
            <Image
              src={img.url}
              alt={img.alt}
              width={img.width ?? 600}
              height={img.height ?? 800}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              {...(img.blurhash
                ? { placeholder: "blur" as const, blurDataURL: img.blurhash }
                : {})}
            />

            {/* Hover Overlay */}
            <div className="masonry-item-ov">
              <span>{img.category}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Count ─────────────────────────────────────── */}
      <p className="gallery-count">
        Showing{" "}
        <strong>{filtered.length}</strong>{" "}
        of{" "}
        <strong>{data.images.length}</strong>{" "}
        images
      </p>
    </section>
  );
}
