import Image from "next/image";
import type { HeroSection } from "./types";
import { renderTitle } from "./render-title";

/* ─── Full Variant (homepage) ────────────────────────────
   Template: curtain-bluff-redesign.html line 1112

   <section class="hero">
     <img class="hero-img" src="..." alt="...">
     <div class="hero-bg"></div>
     <div class="hero-content">
       <p class="hero-eyebrow">...</p>
       <h1 class="hero-title">...<br><em>...</em></h1>
       <p class="hero-sub">...</p>
     </div>
     <div class="hero-scroll">
       <span>Scroll</span>
       <div class="line"></div>
     </div>
   </section>
──────────────────────────────────────────────────────────── */

function HeroFull({ data }: { data: HeroSection }) {
  return (
    <section className="hero">
      <Image
        src={data?.image?.url}
        alt={data?.image?.alt}
        fill
        priority
        className="hero-img"
        sizes="100vw"
        {...(data?.image?.blurhash
          ? { placeholder: "blur", blurDataURL: data?.image?.blurhash }
          : {})}
      />
      <div className="hero-bg"></div>
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
      {data.showScrollIndicator && (
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="line"></div>
        </div>
      )}
    </section>
  );
}

/* ─── Short Variant (sub-pages) ──────────────────────────
   Template: curtain-bluff-about.html line 348

   <section class="sub-hero">
     <img class="sub-hero-img" src="..." alt="...">
     <div class="sub-hero-bg"></div>
     <div class="sub-hero-content">
       <div class="sub-hero-breadcrumb">
         <a href="#">Home</a> <span>→</span> About
       </div>
       <h1 class="sub-hero-title">Our <em>Story</em></h1>
     </div>
   </section>
──────────────────────────────────────────────────────────── */

function HeroShort({ data }: { data: HeroSection }) {
  return (
    <section className="sub-hero">
      <Image
        src={data?.image?.url}
        alt={data?.image?.alt}
        fill
        priority
        className="sub-hero-img"
        sizes="100vw"
        {...(data?.image?.blurhash
          ? { placeholder: "blur", blurDataURL: data?.image?.blurhash }
          : {})}
      />
      <div className="sub-hero-bg"></div>
      <div className="sub-hero-content">
        {data.showBreadcrumb && data.breadcrumb && (
          <div className="sub-hero-breadcrumb">
            {(data?.breadcrumb ?? []).map((item, i) => (
              <span key={i}>
                {i > 0 && <span>&rarr;</span>}
                <a href={item.url}>{item.label}</a>
              </span>
            ))}
          </div>
        )}
        <h1 className="sub-hero-title">
          {renderTitle(data.title, data.titleItalic, "")}
        </h1>
      </div>
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
      return <HeroFull data={data} />;
    case "split":
      return <HeroShort data={data} />;
    default:
      return <HeroShort data={data} />;
  }
}
