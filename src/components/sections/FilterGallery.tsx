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
      <div className="sticky top-0 z-50 flex justify-center gap-0 overflow-x-auto border-b border-sand-dark bg-white px-12 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`relative border-none bg-transparent px-6 py-3.5 font-heading text-[0.95rem] font-normal transition-colors ${
              active === cat
                ? "font-medium text-ocean-deep after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-ocean-deep"
                : "text-text-light hover:text-ocean-deep"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Masonry Grid ──────────────────────────────── */}
      <div className="mx-auto max-w-[1500px] columns-2 gap-2 px-6 md:columns-3 lg:columns-4">
        {filtered.map((img) => (
          <div
            key={img.id}
            className="group relative mb-2 overflow-hidden break-inside-avoid"
          >
            <Image
              src={img.url}
              alt={img.alt}
              width={img.width ?? 600}
              height={img.height ?? 800}
              className="block w-full transition-transform duration-500 hover:scale-[1.04]"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              {...(img.blurhash
                ? { placeholder: "blur" as const, blurDataURL: img.blurhash }
                : {})}
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ocean-deep/60 to-transparent p-5 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="text-[0.55rem] uppercase tracking-[0.25em] text-gold-light">
                {img.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Count ─────────────────────────────────────── */}
      <p className="py-10 text-center text-[0.65rem] uppercase tracking-[0.2em] text-text-light">
        Showing{" "}
        <span className="font-medium text-ocean-deep">{filtered.length}</span>{" "}
        of{" "}
        <span className="font-medium text-ocean-deep">
          {data.images.length}
        </span>{" "}
        images
      </p>
    </section>
  );
}
