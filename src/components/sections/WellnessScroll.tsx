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
    <section className="overflow-hidden bg-ocean-deep py-24">
      {/* Header */}
      <div className="mb-12 px-12">
        {data.label && (
          <p className="mb-3 text-[0.55rem] font-medium uppercase tracking-[0.4em] text-gold-light">
            {data.label}
          </p>
        )}
        {data.title && (
          <h2 className="font-heading text-[clamp(1.8rem,3vw,2.4rem)] font-light leading-tight text-sand">
            {renderTitle(data.title, data.titleItalic, "text-coral-soft")}
          </h2>
        )}
      </div>

      {/* Scroll container */}
      <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-12 scrollbar-hide">
        {data.cards.map((card, i) => (
          <a
            key={i}
            href={card.url}
            className="group relative w-[320px] flex-none snap-start overflow-hidden"
          >
            <Image
              src={card.image.url}
              alt={card.image.alt}
              width={card.image.width ?? 320}
              height={card.image.height ?? 427}
              className="aspect-[3/4] w-full object-cover brightness-[0.85] transition-all duration-700 group-hover:scale-[1.05] group-hover:brightness-100"
              sizes="320px"
              {...(card.image.blurhash
                ? { placeholder: "blur", blurDataURL: card.image.blurhash }
                : {})}
            />

            {/* Info overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 p-8"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
              }}
            >
              {card.label && (
                <p className="mb-1 text-[0.6rem] uppercase tracking-[0.3em] text-gold-light">
                  {card.label}
                </p>
              )}
              <h3 className="font-heading text-[1.4rem] font-normal text-white">
                {card.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
