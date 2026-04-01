import Image from "next/image";
import type { GalleryBandSection } from "./types";

/* ─── Main Export ─────────────────────────────────────── */

export default function GalleryBand({
  data,
}: {
  data: GalleryBandSection;
}) {
  return (
    <section className="gallery-band">
      {data.images.map((image) => (
        <div key={image.id} className="gb-item">
          <Image
            src={image.url}
            alt={image.alt}
            width={image.width ?? 600}
            height={image.height ?? 600}
            sizes="(min-width: 768px) 25vw, 50vw"
            {...(image.blurhash
              ? { placeholder: "blur", blurDataURL: image.blurhash }
              : {})}
          />
        </div>
      ))}
    </section>
  );
}
