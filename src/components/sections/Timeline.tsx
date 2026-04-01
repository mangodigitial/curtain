import Image from "next/image";
import type { TimelineSection } from "./types";
import { renderTitle } from "./render-title";

/* ─── Timeline Item ──────────────────────────────────── */

function TimelineItem({
  item,
}: {
  item: TimelineSection["items"][number];
}) {
  return (
    <div className="tl-item">
      <div className="tl-dot" />

      <div className="tl-content">
        <div className="tl-year">{item.year}</div>
        <h3 className="tl-heading">
          {renderTitle(item.heading, item.headingItalic)}
        </h3>
        <p className="tl-text">{item.text}</p>
      </div>

      {item.image && (
        <div className="tl-media">
          <Image
            src={item.image.url}
            alt={item.image.alt}
            width={item.image.width ?? 800}
            height={item.image.height ?? 600}
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
    <section className="timeline">
      {data.items.map((item, i) => (
        <TimelineItem key={i} item={item} />
      ))}
    </section>
  );
}
