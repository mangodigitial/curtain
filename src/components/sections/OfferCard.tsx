import Image from "next/image";
import type { OfferCardSection } from "./types";

/* ─── Helper: render title with italic spans ─────────── */

function renderTitle(title: string, titleItalic?: string) {
  if (!titleItalic) return title;

  const parts = title.split(titleItalic);
  if (parts.length < 2) return title;

  return (
    <>
      {parts[0]}
      <em className="text-coral">{titleItalic}</em>
      {parts.slice(1).join(titleItalic)}
    </>
  );
}

/* ─── Discount Badge ─────────────────────────────────── */

function DiscountBadge({ label }: { label: string }) {
  const match = label.match(/(\d+)/);
  const percent = match ? match[1] : label;

  return (
    <div className="absolute left-6 top-6 z-10 bg-coral p-3 text-center text-white">
      <span className="block font-heading text-[2.2rem] font-normal leading-none">
        {percent}%
      </span>
      <span className="block text-[0.5rem] font-medium uppercase tracking-[0.2em]">
        off
      </span>
    </div>
  );
}

/* ─── Main Export ─────────────────────────────────────── */

export default function OfferCard({ data }: { data: OfferCardSection }) {
  return (
    <section className="grid grid-cols-1 overflow-hidden bg-sand-light lg:grid-cols-[0.45fr_0.55fr]">
      {/* Image */}
      <div className="relative overflow-hidden">
        {data.discountLabel && <DiscountBadge label={data.discountLabel} />}
        <Image
          src={data.image.url}
          alt={data.image.alt}
          width={data.image.width ?? 800}
          height={data.image.height ?? 600}
          className="min-h-[400px] w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
          sizes="(min-width: 1024px) 45vw, 100vw"
          {...(data.image.blurhash
            ? { placeholder: "blur", blurDataURL: data.image.blurhash }
            : {})}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center p-12">
        {data.tag && (
          <p className="mb-3 text-[0.55rem] font-medium uppercase tracking-[0.4em] text-gold">
            {data.tag}
          </p>
        )}

        <h2 className="mb-4 font-heading text-[clamp(1.6rem,2.5vw,2.2rem)] font-light leading-tight text-ocean-deep">
          {renderTitle(data.title, data.titleItalic)}
        </h2>

        <p className="mb-6 text-[0.85rem] font-light leading-relaxed text-text-light">
          {data.description}
        </p>

        {/* Details grid */}
        {data.details && data.details.length > 0 && (
          <div className="mb-6 grid grid-cols-2 gap-3">
            {data.details.map((detail, i) => (
              <div key={i}>
                <p className="mb-0.5 text-[0.5rem] font-medium uppercase tracking-[0.2em] text-text-light">
                  {detail.label}
                </p>
                <p className="text-[0.78rem] font-normal text-ocean-deep">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Includes box */}
        {data.includes && data.includes.length > 0 && (
          <div className="mb-6 border-l-2 border-gold bg-ocean-deep/[0.04] p-4">
            {data.includesTitle && (
              <p className="mb-2 text-[0.55rem] font-medium uppercase tracking-[0.25em] text-gold">
                {data.includesTitle}
              </p>
            )}
            <ul>
              {data.includes.map((item, i) => (
                <li
                  key={i}
                  className="text-[0.75rem] font-light text-text-light"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        {data.ctaLabel && data.ctaUrl && (
          <div>
            <a
              href={data.ctaUrl}
              className="inline-flex items-center gap-2 bg-ocean-deep px-8 py-3.5 text-[0.6rem] font-medium uppercase tracking-[0.25em] text-sand transition hover:bg-coral"
            >
              {data.ctaLabel}
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        )}

        {/* Terms */}
        {data.terms && (
          <p className="mt-4 text-[0.62rem] font-light italic text-text-light/60">
            {data.terms}
          </p>
        )}
      </div>
    </section>
  );
}
