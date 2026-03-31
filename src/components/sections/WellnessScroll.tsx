"use client";

import Image from "next/image";
import type { WellnessScrollSection } from "./types";
import { renderTitle } from "./render-title";

/* ─── Main Export ─────────────────────────────────────── */

export default function WellnessScroll({
  data,
}: {
  data: WellnessScrollSection;
}) {
  return (
    <section className="wellness reveal" id="wellness">
      {/* Header */}
      <div className="wellness-header">
        {data.label && (
          <div className="section-label">{data.label}</div>
        )}
        {data.title && (
          <h2 className="section-heading">
            {renderTitle(data.title, data.titleItalic)}
          </h2>
        )}
      </div>

      {/* Scroll container */}
      <div className="wellness-scroll">
        {data.cards.map((card, i) => (
          <a key={i} href={card.url} className="wellness-card">
            <Image
              src={card.image.url}
              alt={card.image.alt}
              width={card.image.width ?? 320}
              height={card.image.height ?? 427}
              sizes="320px"
              {...(card.image.blurhash
                ? { placeholder: "blur", blurDataURL: card.image.blurhash }
                : {})}
            />

            <div className="wellness-card-info">
              {card.label && <span>{card.label}</span>}
              <h4>{card.title}</h4>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
