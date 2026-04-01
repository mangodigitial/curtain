import Image from "next/image";
import FilterGallery from "@/components/sections/FilterGallery";
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
  const hero = safeSections.find((s: any) => s?.type === 'hero');
  const filterGallery = safeSections.find((s: any) => s?.type === 'filter_gallery') as FilterGallerySection | undefined;

  return (
    <>
      {/* ═══ Page Header (no hero image — gallery IS the visual) ═══ */}
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
      {filterGallery && <FilterGallery data={filterGallery} />}
    </>
  );
}
