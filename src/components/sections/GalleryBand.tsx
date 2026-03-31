import Image from "next/image";
import type { GalleryBandSection } from "./types";

/* ─── Main Export ─────────────────────────────────────── */

export default function GalleryBand({
  data,
}: {
  data: GalleryBandSection;
}) {
  return (
    <section className="grid grid-cols-2 gap-1.5 md:grid-cols-4">
      {data.images.map((image) => (
        <div key={image.id} className="overflow-hidden">
          <Image
            src={image.url}
            alt={image.alt}
            width={image.width ?? 600}
            height={image.height ?? 600}
            className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
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
