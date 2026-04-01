import Image from "next/image";
import type { GalleryMosaicSection } from "./types";
import { renderTitle } from "./render-title";

/* ─── Main Export ─────────────────────────────────────── */

export default function GalleryMosaic({
  data,
}: {
  data: GalleryMosaicSection;
}) {
  const hasHeader = data.label || data.title;

  return (
    <section className="gallery reveal" id="gallery">
      {hasHeader && (
        <div className="gallery-header">
          {data.label && (
            <div className="section-label" style={{ justifyContent: "center" }}>
              {data.label}
            </div>
          )}
          {data.title && (
            <h2 className="section-heading">
              {renderTitle(data.title, data.titleItalic)}
            </h2>
          )}
        </div>
      )}

      <div className="gallery-grid">
        {data.images.map((image) => (
          <div key={image.id} className="gi">
            <Image
              src={image.url}
              alt={image.alt}
              width={image.width ?? 800}
              height={image.height ?? 600}
              sizes="(min-width: 768px) 25vw, 50vw"
              {...(image.blurhash
                ? { placeholder: "blur", blurDataURL: image.blurhash }
                : {})}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
