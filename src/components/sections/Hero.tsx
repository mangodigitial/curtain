import Image from "next/image";
import type { HeroSection } from "./types";
import { renderTitle } from "./render-title";

/* ─── Breadcrumb ─────────────────────────────────────── */

function Breadcrumb({
  items,
}: {
  items: { label: string; url: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="page-hero-breadcrumb">
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span aria-hidden="true">→</span>}
          <a href={item.url}>{item.label}</a>
        </span>
      ))}
    </nav>
  );
}

/* ─── Scroll Indicator ───────────────────────────────── */

function ScrollIndicator() {
  return (
    <div className="hero-scroll">
      <span className="writing-vertical">Scroll</span>
      <span className="line" aria-hidden="true" />
    </div>
  );
}

/* ─── Full Variant (homepage) ────────────────────────── */

function HeroFull({ data }: { data: HeroSection }) {
  return (
    <section className="hero">
      <Image
        src={data.image.url}
        alt={data.image.alt}
        fill
        priority
        className="hero-img"
        sizes="100vw"
        {...(data.image.blurhash
          ? { placeholder: "blur", blurDataURL: data.image.blurhash }
          : {})}
      />
      <div className="hero-bg" aria-hidden="true" />

      <div className="hero-content">
        {data.eyebrow && (
          <p className="hero-eyebrow">{data.eyebrow}</p>
        )}

        <h1 className="hero-title">
          {renderTitle(data.title, data.titleItalic, "")}
        </h1>

        {data.subtitle && (
          <p className="hero-sub">{data.subtitle}</p>
        )}
      </div>

      {data.showScrollIndicator && <ScrollIndicator />}
    </section>
  );
}

/* ─── Short Variant (sub-pages) ──────────────────────── */

function HeroShort({ data }: { data: HeroSection }) {
  return (
    <section className="page-hero">
      <Image
        src={data.image.url}
        alt={data.image.alt}
        fill
        priority
        className="page-hero-img"
        sizes="100vw"
        {...(data.image.blurhash
          ? { placeholder: "blur", blurDataURL: data.image.blurhash }
          : {})}
      />
      <div className="page-hero-bg" aria-hidden="true" />

      <div className="page-hero-content">
        {data.showBreadcrumb && data.breadcrumb && (
          <Breadcrumb items={data.breadcrumb} />
        )}

        <h1 className="page-hero-title">
          {renderTitle(data.title, data.titleItalic, "")}
        </h1>

        {data.subtitle && (
          <p className="page-hero-sub">{data.subtitle}</p>
        )}
      </div>
    </section>
  );
}

/* ─── Centered Variant (weddings, bentleys) ──────────── */

function HeroCentered({ data }: { data: HeroSection }) {
  return (
    <section className="hero" style={{ alignItems: "center", justifyContent: "center" }}>
      <Image
        src={data.image.url}
        alt={data.image.alt}
        fill
        priority
        className="hero-img"
        sizes="100vw"
        {...(data.image.blurhash
          ? { placeholder: "blur", blurDataURL: data.image.blurhash }
          : {})}
      />
      <div className="hero-bg" aria-hidden="true" />

      <div className="hero-content" style={{ textAlign: "center", maxWidth: "none", padding: "0 1.5rem" }}>
        {data.eyebrow && (
          <p className="hero-eyebrow">{data.eyebrow}</p>
        )}

        <h1 className="hero-title" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
          {renderTitle(data.title, data.titleItalic, "")}
        </h1>

        {data.subtitle && (
          <p className="hero-sub" style={{ margin: "0 auto", fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: "1.125rem", maxWidth: "480px", color: "rgba(255,255,255,0.6)" }}>
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
