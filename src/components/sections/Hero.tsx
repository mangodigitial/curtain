import Image from "next/image";
import type { HeroSection } from "./types";

/* ─── Helper: render title with italic spans ─────────── */

function renderTitle(title: string, titleItalic?: string) {
  if (!titleItalic) return title;

  const parts = title.split(titleItalic);
  if (parts.length < 2) return title;

  return (
    <>
      {parts[0]}
      <em className="text-sand">{titleItalic}</em>
      {parts.slice(1).join(titleItalic)}
    </>
  );
}

/* ─── Breadcrumb ─────────────────────────────────────── */

function Breadcrumb({
  items,
}: {
  items: { label: string; url: string }[];
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-4 text-[0.6rem] uppercase tracking-[0.4em] text-gold-light"
    >
      <ol className="flex flex-wrap gap-x-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-x-2">
            {i > 0 && (
              <span className="opacity-40" aria-hidden="true">
                /
              </span>
            )}
            <a href={item.url} className="transition-opacity hover:opacity-70">
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ─── Scroll Indicator ───────────────────────────────── */

function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 right-12 flex flex-col items-center gap-3 text-[0.55rem] uppercase tracking-[0.3em] text-white/50">
      <span className="writing-vertical">Scroll</span>
      <span className="block h-10 w-px bg-white/30" aria-hidden="true" />
    </div>
  );
}

/* ─── Background Image + Overlay ─────────────────────── */

function HeroBackground({
  image,
  overlayOpacity,
}: {
  image: HeroSection["image"];
  overlayOpacity?: number;
}) {
  const fromAlpha = overlayOpacity != null ? overlayOpacity * 0.27 : 0.15;
  const toAlpha = overlayOpacity != null ? overlayOpacity : 0.55;

  return (
    <>
      <Image
        src={image.url}
        alt={image.alt}
        fill
        priority
        className="animate-slow-zoom object-cover"
        sizes="100vw"
        {...(image.blurhash ? { placeholder: "blur", blurDataURL: image.blurhash } : {})}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, rgba(13,47,58,${fromAlpha}) 0%, rgba(13,47,58,${toAlpha}) 100%)`,
        }}
        aria-hidden="true"
      />
    </>
  );
}

/* ─── Full Variant (homepage) ────────────────────────── */

function HeroFull({ data }: { data: HeroSection }) {
  return (
    <section className="relative flex h-screen min-h-[600px] items-end overflow-hidden">
      <HeroBackground image={data.image} overlayOpacity={data.overlayOpacity} />

      <div className="relative z-10 max-w-[900px] px-12 pb-20">
        {data.eyebrow && (
          <p className="mb-5 text-[0.6rem] font-normal uppercase tracking-[0.5em] text-gold-light">
            {data.eyebrow}
          </p>
        )}

        <h1 className="mb-6 font-heading text-[clamp(3rem,7vw,6.5rem)] font-light leading-[1.05] text-white">
          {renderTitle(data.title, data.titleItalic)}
        </h1>

        {data.subtitle && (
          <p className="max-w-[480px] text-[0.85rem] font-light leading-relaxed text-white/70">
            {data.subtitle}
          </p>
        )}
      </div>

      {data.showScrollIndicator && <ScrollIndicator />}
    </section>
  );
}

/* ─── Short Variant (sub-pages) ──────────────────────── */

function HeroShort({ data }: { data: HeroSection }) {
  return (
    <section className="relative flex h-[70vh] min-h-[480px] items-end overflow-hidden">
      <HeroBackground image={data.image} overlayOpacity={data.overlayOpacity} />

      <div className="relative z-10 max-w-[800px] px-12 pb-16">
        {data.showBreadcrumb && data.breadcrumb && (
          <Breadcrumb items={data.breadcrumb} />
        )}

        <h1 className="mb-6 font-heading text-[clamp(2.8rem,6vw,5.5rem)] font-light leading-[1.05] text-white">
          {renderTitle(data.title, data.titleItalic)}
        </h1>

        {data.subtitle && (
          <p className="max-w-[480px] text-[0.85rem] font-light leading-relaxed text-white/70">
            {data.subtitle}
          </p>
        )}
      </div>

      {data.showScrollIndicator && <ScrollIndicator />}
    </section>
  );
}

/* ─── Centered Variant (weddings, bentleys) ──────────── */

function HeroCentered({ data }: { data: HeroSection }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <HeroBackground image={data.image} overlayOpacity={data.overlayOpacity} />

      <div className="relative z-10 px-6 text-center">
        {data.eyebrow && (
          <p className="mb-5 text-[0.6rem] font-normal uppercase tracking-[0.5em] text-gold-light">
            {data.eyebrow}
          </p>
        )}

        <h1 className="mb-6 font-heading text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] text-white">
          {renderTitle(data.title, data.titleItalic)}
        </h1>

        {data.subtitle && (
          <p className="mx-auto max-w-[480px] font-heading text-lg italic leading-relaxed text-white/60">
            {data.subtitle}
          </p>
        )}
      </div>

      {data.showScrollIndicator && <ScrollIndicator />}
    </section>
  );
}

/* ─── Main Export ─────────────────────────────────────── */

export default function Hero({ data }: { data: HeroSection }) {
  switch (data.variant) {
    case "full":
      return <HeroFull data={data} />;
    case "short":
      return <HeroShort data={data} />;
    case "centered":
      return <HeroCentered data={data} />;
    case "split":
      // Split variant falls back to short layout
      return <HeroShort data={data} />;
    default:
      return <HeroShort data={data} />;
  }
}
