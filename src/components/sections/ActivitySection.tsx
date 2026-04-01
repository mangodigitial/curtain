import Image from "next/image";
import type { ActivitySection as ActivitySectionType } from "./types";

/* ─── Main Export ─────────────────────────────────────── */

export default function ActivitySection({
  data,
}: {
  data: ActivitySectionType;
}) {
  return (
    <section className="act-section">
      <div className="act-inner">
        {/* ── Image Mosaic ──────────────────────────────── */}
        <div className="act-media">
          {/* Main image spanning both columns */}
          <Image
            src={data?.images?.main?.url}
            alt={data?.images?.main?.alt}
            width={data?.images?.main?.width ?? 960}
            height={data?.images?.main?.height ?? 600}
            className="act-img-main"
            sizes="(max-width: 1024px) 100vw, 55vw"
            {...(data?.images?.main?.blurhash
              ? { placeholder: "blur" as const, blurDataURL: data?.images?.main?.blurhash }
              : {})}
          />

          {data.badge && (
            <span className="act-media-badge">
              {data.badge}
            </span>
          )}

          {/* Two smaller images */}
          {(data?.images?.small ?? []).slice(0, 2).map((img) => (
            <Image
              key={img.id}
              src={img.url}
              alt={img.alt}
              width={img.width ?? 480}
              height={img.height ?? 360}
              className="act-img-sm"
              sizes="(max-width: 1024px) 50vw, 27vw"
              {...(img.blurhash
                ? { placeholder: "blur" as const, blurDataURL: img.blurhash }
                : {})}
            />
          ))}
        </div>

        {/* ── Content ───────────────────────────────────── */}
        <div className="act-content">
          <h2 className="act-name">
            {data.name}
            {data.nameItalic && (
              <>
                {" "}
                <em>{data.nameItalic}</em>
              </>
            )}
          </h2>

          <p className="act-desc">
            {data.description}
          </p>

          {/* Highlights */}
          {(data?.highlights?.length ?? 0) > 0 && (
            <div className="act-highlights">
              {(data?.highlights ?? []).map((highlight) => (
                <div
                  key={highlight}
                  className="act-highlight"
                >
                  <span className="act-highlight-dot" />
                  {highlight}
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          {data?.cta && (
            <a
              href={data?.cta?.url}
              className="act-link"
            >
              {data?.cta?.label}
              <span className="arrow" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
