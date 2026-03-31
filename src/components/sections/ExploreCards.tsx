import Image from "next/image";
import Link from "next/link";
import type { ExploreCardsSection } from "./types";
import { renderTitle } from "./render-title";

/* ─── Main Export ─────────────────────────────────────── */

export default function ExploreCards({
  data,
}: {
  data: ExploreCardsSection;
}) {
  const isDark = data.background === "dark";
  const cols = data.columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2";

  return (
    <section
      className={`px-12 py-20 ${isDark ? "bg-ocean-deep" : "bg-sand-light"}`}
    >
      {/* Header */}
      {(data.label || data.title) && (
        <header className="mb-12 text-center">
          {data.label && (
            <p
              className={`mb-4 flex items-center justify-center gap-4 text-[0.55rem] font-medium uppercase tracking-[0.5em] ${
                isDark ? "text-gold-light" : "text-gold"
              }`}
            >
              <span
                className={`h-px w-8 ${isDark ? "bg-gold-light/30" : "bg-gold/30"}`}
                aria-hidden="true"
              />
              {data.label}
              <span
                className={`h-px w-8 ${isDark ? "bg-gold-light/30" : "bg-gold/30"}`}
                aria-hidden="true"
              />
            </p>
          )}

          {data.title && (
            <h2
              className={`font-heading text-[clamp(1.8rem,3vw,2.6rem)] font-light ${
                isDark ? "text-sand" : "text-ocean-deep"
              }`}
            >
              {renderTitle(
                data.title,
                data.titleItalic,
                isDark ? "text-coral-soft" : "text-coral",
              )}
            </h2>
          )}
        </header>
      )}

      {/* Grid */}
      <div
        className={`mx-auto grid max-w-[1100px] grid-cols-1 ${cols} gap-5`}
      >
        {data.cards.map((card, i) => (
          <Link
            key={i}
            href={card.url}
            className="group relative block overflow-hidden"
          >
            {/* Image */}
            <Image
              src={card.image.url}
              alt={card.image.alt}
              width={card.image.width ?? 800}
              height={card.image.height ?? 500}
              className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            />

            {/* Overlay */}
            <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ocean-deep/80 to-transparent p-6 md:p-8">
              <span className="mb-1 font-heading text-[1.3rem] font-normal text-white md:text-[1.5rem]">
                {card.title}
              </span>
              {card.subtitle && (
                <span className="text-[0.55rem] uppercase tracking-[0.3em] text-gold-light md:text-[0.6rem]">
                  {card.subtitle}
                </span>
              )}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
