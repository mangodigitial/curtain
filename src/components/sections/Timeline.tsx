import Image from "next/image";
import type { TimelineSection } from "./types";

/* ─── Helper: render heading with italic spans ────────── */

function renderHeading(heading: string, headingItalic?: string) {
  if (!headingItalic) return heading;

  const parts = heading.split(headingItalic);
  if (parts.length < 2) return heading;

  return (
    <>
      {parts[0]}
      <em className="text-coral">{headingItalic}</em>
      {parts.slice(1).join(headingItalic)}
    </>
  );
}

/* ─── Timeline Item ──────────────────────────────────── */

function TimelineItem({
  item,
  index,
}: {
  item: TimelineSection["items"][number];
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative mb-16 grid grid-cols-1 gap-16 pl-14 lg:grid-cols-2 lg:pl-0">
      {/* Dot on the vertical line */}
      <div className="absolute left-6 top-2 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-[3px] border-white bg-gold lg:left-1/2" />

      {/* Content */}
      <div className={isEven ? "" : "lg:order-2"}>
        <p className="mb-2 font-heading text-[3.5rem] font-light leading-none text-sand-dark">
          {item.year}
        </p>
        <h3 className="mb-3 font-heading text-[clamp(1.4rem,2vw,1.8rem)] font-normal leading-tight text-ocean-deep">
          {renderHeading(item.heading, item.headingItalic)}
        </h3>
        <p className="text-[0.88rem] font-light leading-[1.85] text-text-light">
          {item.text}
        </p>
      </div>

      {/* Media */}
      {item.image && (
        <div className={isEven ? "" : "lg:order-1"}>
          <Image
            src={item.image.url}
            alt={item.image.alt}
            width={item.image.width ?? 800}
            height={item.image.height ?? 600}
            className="aspect-[4/3] w-full object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
            {...(item.image.blurhash
              ? { placeholder: "blur", blurDataURL: item.image.blurhash }
              : {})}
          />
        </div>
      )}
    </div>
  );
}

/* ─── Main Export ─────────────────────────────────────── */

export default function Timeline({
  data,
}: {
  data: TimelineSection;
}) {
  return (
    <section className="relative mx-auto max-w-[1100px] px-12 py-24">
      {/* Vertical line */}
      <div
        className="absolute bottom-24 left-6 top-24 w-px -translate-x-1/2 bg-sand-dark lg:left-1/2"
        aria-hidden="true"
      />

      {data.items.map((item, i) => (
        <TimelineItem key={i} item={item} index={i} />
      ))}
    </section>
  );
}
