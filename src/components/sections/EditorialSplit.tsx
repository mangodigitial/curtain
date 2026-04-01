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
          <span className="editorial-number" aria-hidden="true">
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
          <p className="editorial-subtitle">{subtitle}</p>
        )}

        {/* Body */}
        <p className="section-body">{body}</p>

        {/* Meals */}
        {meals && meals.length > 0 && (
          <div className="rest-meals">
            {meals.map((meal) => (
              <div key={meal.name} className="rest-meal">
                <p className="rest-meal-name">{meal.name}</p>
                <p className="rest-meal-time">{meal.time}</p>
              </div>
            ))}
          </div>
        )}

        {/* Dress code */}
        {dressCode && (
          <div className="rest-dress">
            <p className="rest-dress-label">{dressCode.label}</p>
            <p>{dressCode.description}</p>
          </div>
        )}

        {/* Menu links */}
        {menuLinks && menuLinks.length > 0 && (
          <div className="rest-menus">
            {menuLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                className="rest-menu-link"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div className="editorial-stats">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="editorial-stat-val">{stat.value}</div>
                <div className="editorial-stat-label">{stat.label}</div>
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
