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
  const themeClass = isDark ? "dark" : "light";
  const gridClass = data.columns === 2 ? "explore-grid cols-2" : "explore-grid";

  return (
    <section className={`explore-section ${themeClass}`}>
      {/* Header */}
      {(data.label || data.title) && (
        <div className="explore-header">
          {data.label && (
            <div className="section-label">{data.label}</div>
          )}
          {data.title && (
            <h2 className="section-heading">
              {renderTitle(data.title, data.titleItalic, "")}
            </h2>
          )}
        </div>
      )}

      {/* Grid */}
      <div className={gridClass}>
        {data.cards.map((card, i) => (
          <Link key={i} href={card.url} className="explore-card">
            <Image
              src={card.image.url}
              alt={card.image.alt}
              width={card.image.width ?? 800}
              height={card.image.height ?? 500}
            />
            <div className="explore-card-ov">
              {card.subtitle && <span>{card.subtitle}</span>}
              <h3>{card.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
