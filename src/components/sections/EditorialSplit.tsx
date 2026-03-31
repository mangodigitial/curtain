import Image from "next/image";
import type { EditorialSplitSection } from "./types";

/* ─── Component ─────────────────────────────────────────── */

export default function EditorialSplit({ data }: { data: EditorialSplitSection }) {
  const {
    layout,
    background,
    image,
    gallery,
    label,
    title,
    titleItalic,
    subtitle,
    body,
    stats,
    cta,
    number,
    meals,
    dressCode,
    menuLinks,
  } = data;

  /* Build the section className */
  const sectionClasses = [
    "editorial",
    layout === "image-right" ? "reversed" : "",
    background === "dark" ? "dark-bg" : "",
    "reveal",
  ]
    .filter(Boolean)
    .join(" ");

  /* Sand background uses inline style */
  const sectionStyle =
    background === "sand"
      ? { background: "var(--sand-light)" }
      : undefined;

  return (
    <section className={sectionClasses} style={sectionStyle}>
      {/* ── Image Column ─────────────────────────────────── */}
      <div className="editorial-media">
        {gallery && gallery.length > 0 ? (
          <div className="grid grid-cols-2 h-full">
            {/* Main image spans both columns */}
            <div className="relative col-span-2 min-h-[40vh]">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder={image.blurhash ? "blur" : undefined}
                blurDataURL={image.blurhash}
              />
            </div>
            {gallery.slice(0, 2).map((img) => (
              <div key={img.id} className="relative min-h-[25vh]">
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  placeholder={img.blurhash ? "blur" : undefined}
                  blurDataURL={img.blurhash}
                />
              </div>
            ))}
          </div>
        ) : (
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            placeholder={image.blurhash ? "blur" : undefined}
            blurDataURL={image.blurhash}
          />
        )}
      </div>

      {/* ── Text Column ──────────────────────────────────── */}
      <div className="editorial-text">
        {/* Number overlay */}
        {number && (
          <span
            className="pointer-events-none absolute right-0 top-[-2.5rem] font-heading text-[8rem] font-light text-sand-dark/35"
            aria-hidden="true"
          >
            {number}
          </span>
        )}

        {/* Label */}
        {label && (
          <div className="section-label">{label}</div>
        )}

        {/* Title */}
        <h2 className="section-heading">
          {title}
          {titleItalic && (
            <>
              {" "}
              <em>{titleItalic}</em>
            </>
          )}
        </h2>

        {/* Subtitle */}
        {subtitle && (
          <p className="mb-6 font-heading text-lg font-light italic text-text-light">
            {subtitle}
          </p>
        )}

        {/* Body */}
        <p className="section-body">{body}</p>

        {/* Meals */}
        {meals && meals.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-6" style={{ marginTop: "2rem" }}>
            {meals.map((meal) => (
              <div
                key={meal.name}
                className="border border-sand-dark p-3 text-center"
              >
                <p className="text-[0.55rem] uppercase tracking-[0.2em] text-text-light">
                  {meal.name}
                </p>
                <p className="font-heading text-base text-ocean-deep">
                  {meal.time}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Dress code */}
        {dressCode && (
          <div className="mb-8 border-l-2 border-gold bg-ocean-deep/[0.04] p-4" style={{ marginTop: "1rem" }}>
            <p className="text-[0.55rem] font-medium uppercase tracking-[0.25em] text-gold">
              {dressCode.label}
            </p>
            <p className="text-[0.78rem] text-text-light">
              {dressCode.description}
            </p>
          </div>
        )}

        {/* Menu links */}
        {menuLinks && menuLinks.length > 0 && (
          <div className="flex flex-wrap gap-4" style={{ marginTop: "1rem" }}>
            {menuLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                className="border border-ocean-deep px-5 py-2.5 text-[0.6rem] font-medium uppercase tracking-[0.25em] text-ocean-deep transition-colors hover:bg-ocean-deep hover:text-sand"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div style={{ display: "flex", gap: "2rem", marginTop: "2rem", flexWrap: "wrap" }}>
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-heading text-[2rem] font-light text-coral">
                  {stat.value}
                </div>
                <div className="text-[0.6rem] uppercase tracking-[0.2em] text-text-light">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        {cta && (
          <a href={cta.url} className="btn-line">
            {cta.label} <span className="arrow" />
          </a>
        )}
      </div>
    </section>
  );
}
