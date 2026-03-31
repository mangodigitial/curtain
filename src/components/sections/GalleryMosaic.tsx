import Image from "next/image";
import type { GalleryMosaicSection } from "./types";

/* ─── Helper: render title with italic spans ─────────── */

function renderTitle(title: string, titleItalic?: string) {
  if (!titleItalic) return title;

  const parts = title.split(titleItalic);
  if (parts.length < 2) return title;

  return (
    <>
      {parts[0]}
      <em className="text-sand">{titleItalic}</em>
      {parts.slice(1).join(titleItalic)}
    </>
  );
}

/* ─── Grid Item ──────────────────────────────────────── */

function MosaicItem({
  image,
  className,
}: {
  image: GalleryMosaicSection["images"][number];
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <Image
        src={image.url}
        alt={image.alt}
        width={image.width ?? 800}
        height={image.height ?? 600}
        className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.06]"
        sizes="(min-width: 768px) 25vw, 50vw"
        {...(image.blurhash
          ? { placeholder: "blur", blurDataURL: image.blurhash }
          : {})}
      />
    </div>
  );
}

/* ─── Main Export ─────────────────────────────────────── */

export default function GalleryMosaic({
  data,
}: {
  data: GalleryMosaicSection;
}) {
  const hasHeader = data.label || data.title;

  return (
    <section className="bg-sand-light px-12 py-28">
      {hasHeader && (
        <header className="mb-12 text-center">
          {data.label && (
            <p className="mb-3 text-[0.6rem] uppercase tracking-[0.4em] text-gold-light">
              {data.label}
            </p>
          )}
          {data.title && (
            <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-light leading-tight text-ocean-deep">
              {renderTitle(data.title, data.titleItalic)}
            </h2>
          )}
        </header>
      )}

      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-3 md:grid-cols-4">
        {data.images.map((image, i) => {
          let span = "";
          if (i === 0) span = "col-span-2 row-span-2";
          else if (i === 4) span = "col-span-2";

          return <MosaicItem key={image.id} image={image} className={span} />;
        })}
      </div>
    </section>
  );
}
