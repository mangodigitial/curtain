"use client";

import { useState, useEffect, useCallback } from "react";
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  /* Deduplicate: always start with "All", then add any categories that aren't "All" */
  const categories = [
    "All",
    ...(data?.categories ?? []).filter((c) => c !== "All"),
  ];
  const filtered =
    active === "All"
      ? (data?.images ?? [])
      : (data?.images ?? []).filter((img) => img?.category === active);

  /* Close lightbox */
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  /* Navigate prev/next with wrap-around */
  const goPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + filtered.length) % filtered.length
    );
  }, [filtered.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % filtered.length
    );
  }, [filtered.length]);

  /* Keyboard: Escape to close, Arrow keys to navigate */
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, closeLightbox, goPrev, goNext]);

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
        {filtered.map((img, idx) => (
          <div
            key={img.id}
            className="masonry-item"
            onClick={() => setLightboxIndex(idx)}
            style={{ cursor: "pointer" }}
          >
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

      {/* ── Lightbox ──────────────────────────────────── */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            CLOSE &times;
          </button>
          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label="Previous image"
          >
            &#8249;
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="lightbox-img"
            src={filtered[lightboxIndex].url}
            alt={filtered[lightboxIndex].alt || ""}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label="Next image"
          >
            &#8250;
          </button>
        </div>
      )}
    </>
  );
}
