"use client";

import { useState } from "react";
import Image from "next/image";
import type { FilterGallerySection } from "@/components/sections/types";

/* ═══════════════════════════════════════════════════════════════════
   GalleryTemplate — page-level template for the Gallery page

   Reproduces the exact HTML structure from:
     curtain-bluff-templates/curtain-bluff-gallery.html
   (body content between nav and footer)

   Section mapping:
     sections[0] = hero       (page-header style, no hero image)
     sections[1] = filter_gallery
   ═══════════════════════════════════════════════════════════════════ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function GalleryTemplate({ sections }: { sections: any[] }) {
  const safeSections = sections ?? [];
  const hero = safeSections.find((s: any) => s?.type === "hero");
  const filterGallery = safeSections.find(
    (s: any) => s?.type === "filter_gallery"
  ) as FilterGallerySection | undefined;

  return (
    <>
      {/* ═══ Page Header (no hero image -- gallery IS the visual) ═══ */}
      {hero && (
        <div className="page-header">
          <h1>
            {hero.title}
            {hero.titleItalic && (
              <>
                {" "}<em>{hero.titleItalic}</em>
              </>
            )}
          </h1>
          {hero.subtitle && <p>{hero.subtitle}</p>}
        </div>
      )}

      {/* ═══ Filter Gallery (client-side interactivity) ═══ */}
      {filterGallery && <InlineFilterGallery data={filterGallery} />}
    </>
  );
}

/* ─── Inline Filter Gallery ──────────────────────────────────────
   Implements the exact HTML from curtain-bluff-gallery.html:

   <div class="filter-bar" id="filterBar">
     <button class="filter-btn active" data-filter="all">All</button>
     ...
   </div>
   <div class="gallery-count">Showing <span>24</span> photos</div>
   <div class="masonry">
     <div class="masonry-item" data-cat="resort">
       <img ...>
       <div class="masonry-item-overlay">
         <span class="masonry-item-label">The Resort</span>
       </div>
     </div>
     ...
   </div>
──────────────────────────────────────────────────────────────────── */

function InlineFilterGallery({ data }: { data: FilterGallerySection }) {
  const [active, setActive] = useState("All");

  const categories = ["All", ...(data?.categories ?? [])];
  const filtered =
    active === "All"
      ? (data?.images ?? [])
      : (data?.images ?? []).filter((img) => img?.category === active);

  return (
    <>
      {/* ── Filter Bar ────────────────────────────────── */}
      <div className="filter-bar" id="filterBar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={"filter-btn" + (active === cat ? " active" : "")}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Count ─────────────────────────────────────── */}
      <div className="gallery-count">
        Showing <span>{filtered.length}</span> photos
      </div>

      {/* ── Masonry Grid ──────────────────────────────── */}
      <div className="masonry" id="masonry">
        {filtered.map((img) => (
          <div key={img.id} className="masonry-item">
            <Image
              src={img.url}
              alt={img.alt || ""}
              width={img.width ?? 600}
              height={img.height ?? 800}
              sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw"
              style={{ width: "100%", display: "block" }}
              {...(img.blurhash
                ? {
                    placeholder: "blur" as const,
                    blurDataURL: img.blurhash,
                  }
                : {})}
            />
            <div className="masonry-item-overlay">
              <span className="masonry-item-label">{img.category}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
