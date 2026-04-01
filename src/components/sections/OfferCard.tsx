import Image from "next/image";
import type { OfferCardSection } from "./types";
import { renderTitle } from "./render-title";

/* ─── Discount Badge ─────────────────────────────────── */

function DiscountBadge({ label }: { label: string }) {
  const match = label.match(/(\d+)/);
  const percent = match ? match[1] : label;

  return (
    <div className="offer-badge">
      <span className="offer-badge-pct">{percent}%</span>
      <span className="offer-badge-off">off</span>
    </div>
  );
}

/* ─── Main Export ─────────────────────────────────────── */

export default function OfferCard({ data }: { data: OfferCardSection }) {
  return (
    <div className="offer-full">
      {/* Image */}
      <div className="offer-full-media">
        {data.discountLabel && <DiscountBadge label={data.discountLabel} />}
        <Image
          src={data.image.url}
          alt={data.image.alt}
          width={data.image.width ?? 800}
          height={data.image.height ?? 600}
          sizes="(min-width: 1024px) 45vw, 100vw"
          {...(data.image.blurhash
            ? { placeholder: "blur", blurDataURL: data.image.blurhash }
            : {})}
        />
      </div>

      {/* Content */}
      <div className="offer-full-content">
        {data.tag && <div className="offer-tag">{data.tag}</div>}

        <h2>{renderTitle(data.title, data.titleItalic)}</h2>

        <p className="offer-desc">{data.description}</p>

        {/* Details grid */}
        {data.details && data.details.length > 0 && (
          <div className="offer-details">
            {data.details.map((detail, i) => (
              <div key={i} className="od-item">
                <div className="od-label">{detail.label}</div>
                <div className="od-val">{detail.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Includes box */}
        {data.includes && data.includes.length > 0 && (
          <div className="offer-includes">
            {data.includesTitle && (
              <div className="offer-includes-title">{data.includesTitle}</div>
            )}
            <div className="offer-includes-list">
              {data.includes.map((item, i) => (
                <span key={i}>{item}</span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        {data.ctaLabel && data.ctaUrl && (
          <a href={data.ctaUrl} className="offer-cta">
            {data.ctaLabel}
            <span aria-hidden="true">&rarr;</span>
          </a>
        )}

        {/* Terms */}
        {data.terms && <p className="offer-terms">{data.terms}</p>}
      </div>
    </div>
  );
}
