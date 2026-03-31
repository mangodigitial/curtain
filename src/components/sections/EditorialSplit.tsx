import Image from "next/image";
import type { EditorialSplitSection } from "./types";

/* ─── Theme Maps ────────────────────────────────────────── */

const bgMap = {
  light: "bg-white",
  dark: "bg-ocean-deep",
  sand: "bg-sand-light",
} as const;

const headingColorMap = {
  light: "text-ocean-deep",
  dark: "text-sand",
  sand: "text-ocean-deep",
} as const;

const bodyColorMap = {
  light: "text-text-light",
  dark: "text-sand-dark",
  sand: "text-text-light",
} as const;

const labelColorMap = {
  light: "text-gold",
  dark: "text-gold-light",
  sand: "text-gold",
} as const;

const italicColorMap = {
  light: "text-coral",
  dark: "text-coral-soft",
  sand: "text-coral",
} as const;

const statValueColorMap = {
  light: "text-coral",
  dark: "text-gold-light",
  sand: "text-coral",
} as const;

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

  const bg = bgMap[background];
  const headingColor = headingColorMap[background];
  const bodyColor = bodyColorMap[background];
  const labelColor = labelColorMap[background];
  const italicColor = italicColorMap[background];
  const statValueColor = statValueColorMap[background];

  const imageFirst = layout === "image-left";

  return (
    <section className={`${bg} grid grid-cols-1 lg:grid-cols-2 lg:min-h-[85vh]`}>
      {/* ── Image Column ─────────────────────────────────── */}
      <div
        className={`relative overflow-hidden ${
          !imageFirst ? "lg:order-2" : ""
        } ${gallery && gallery.length > 0 ? "" : "min-h-[60vh] lg:min-h-0"}`}
      >
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
      <div className="relative flex flex-col justify-center p-8 lg:p-20">
        {/* Number overlay */}
        {number && (
          <span className="pointer-events-none absolute right-0 top-[-2.5rem] font-heading text-[8rem] font-light text-sand-dark/35">
            {number}
          </span>
        )}

        {/* Label */}
        {label && (
          <p
            className={`mb-5 flex items-center gap-3 text-[0.55rem] font-medium uppercase tracking-[0.5em] ${labelColor}`}
          >
            <span className="block h-px w-[30px] bg-current" />
            {label}
          </p>
        )}

        {/* Title */}
        <h2
          className={`mb-2 font-heading text-[clamp(2.2rem,4vw,3.6rem)] font-light leading-[1.15] ${headingColor}`}
        >
          {title}
          {titleItalic && (
            <>
              {" "}
              <em className={`${italicColor}`}>{titleItalic}</em>
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
        <p className={`mb-8 max-w-[520px] text-[0.9rem] font-light leading-[1.85] ${bodyColor}`}>
          {body}
        </p>

        {/* Meals */}
        {meals && meals.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-6">
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
          <div className="mb-8 border-l-2 border-gold bg-ocean-deep/[0.04] p-4">
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
          <div className="flex flex-wrap gap-4">
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
          <div className="mt-8 flex flex-wrap gap-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className={`font-heading text-[2rem] font-light ${statValueColor}`}>
                  {stat.value}
                </p>
                <p className="text-[0.6rem] uppercase tracking-[0.2em] text-text-light">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        {cta && (
          <a
            href={cta.url}
            className={`mt-8 inline-flex items-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.3em] ${headingColor}`}
          >
            {cta.label}
            <span className="inline-flex items-center">
              <span className="block h-px w-8 bg-current" />
              <span className="-ml-1.5 block h-0 w-0 border-y-[3px] border-l-[5px] border-y-transparent border-l-current" />
            </span>
          </a>
        )}
      </div>
    </section>
  );
}
