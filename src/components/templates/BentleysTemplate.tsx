import Image from "next/image";
import type { Section } from "@/components/sections/types";
import type {
  HeroSection,
  IntroSection,
  EditorialSplitSection,
  CTABandSection,
} from "@/components/sections/types";
import { renderTitle } from "@/components/sections/render-title";

/* ═══════════════════════════════════════════════════════════════════
   BentleysTemplate — page-level template for the Bentley Transfers
   page.

   Reproduces the exact HTML structure from:
     curtain-bluff-templates/curtain-bluff-bentleys.html
   (body content between nav and footer)

   Section mapping:
     sections[0] = hero              (bentley-hero, centred dark)
     sections[1] = intro             (bentley-showcase images)
     sections[2] = editorial_split   (bentley-content w/ booking card)
     sections[3] = cta_band
   ═══════════════════════════════════════════════════════════════════ */

/* ─── Helpers ────────────────────────────────────────────── */

function blurProps(blur?: string) {
  return blur ? { placeholder: "blur" as const, blurDataURL: blur } : {};
}

/* ─── Props ──────────────────────────────────────────────── */

interface BentleysTemplateProps {
  sections: Section[];
}

/* ─── Main Export ────────────────────────────────────────── */

export default function BentleysTemplate({
  sections,
}: BentleysTemplateProps) {
  const safeSections = sections ?? [];
  const hero = safeSections.find(s => s?.type === 'hero') as HeroSection | undefined;
  const intro = safeSections.find(s => s?.type === 'intro') as IntroSection | undefined;
  const editorial = safeSections.find(s => s?.type === 'editorial_split') as EditorialSplitSection | undefined;
  const ctaBand = safeSections.find(s => s?.type === 'cta_band') as CTABandSection | undefined;

  return (
    <>
      {/* ═══ HERO ═══ */}
      {hero && <BentleyHero data={hero} />}

      {/* ═══ SHOWCASE IMAGES ═══ */}
      {intro && <BentleyShowcase data={intro} />}

      {/* ═══ CONTENT + BOOKING CARD ═══ */}
      {editorial && <BentleyContent data={editorial} />}

      {/* ═══ CTA BAND ═══ */}
      {ctaBand && <BentleyCtaBand data={ctaBand} />}
    </>
  );
}

/* ─── Bentley Hero ───────────────────────────────────────
   Template: curtain-bluff-bentleys.html

   <section class="bentley-hero">
     <img class="bentley-hero-img" src="..." alt="Bentley silhouette">
     <div class="bentley-hero-content">
       <div class="bentley-hero-breadcrumb">
         <a href="#">Home</a> <span>→</span> Bentley Transfers
       </div>
       <h1 class="bentley-hero-title">Arrive in<br><em>Unparalleled Elegance</em></h1>
       <div class="bentley-divider"></div>
       <p class="bentley-hero-sub">...</p>
     </div>
   </section>
────────────────────────────────────────────────────────── */

function BentleyHero({ data }: { data: HeroSection }) {
  return (
    <section className="bentley-hero">
      {data.image?.url && (
        <Image
          src={data.image.url}
          alt={data.image.alt || "Bentley silhouette"}
          width={data.image.width ?? 1200}
          height={data.image.height ?? 800}
          className="bentley-hero-img"
          sizes="85vw"
          priority
          {...blurProps(data.image.blurhash)}
        />
      )}
      <div className="bentley-hero-content">
        {data?.breadcrumb && (
          <div className="bentley-hero-breadcrumb">
            {(data.breadcrumb ?? []).map(
              (crumb: { label: string; url: string }, i: number) => (
                <span key={i}>
                  {i > 0 && <span>&rarr;</span>}
                  {crumb?.url ? (
                    <a href={crumb.url}>{crumb?.label}</a>
                  ) : (
                    crumb?.label
                  )}
                </span>
              ),
            )}
          </div>
        )}
        <h1 className="bentley-hero-title">
          {renderTitle(data.title, data.titleItalic, "")}
        </h1>
        <div className="bentley-divider" />
        {data.subtitle && (
          <p className="bentley-hero-sub">{data.subtitle}</p>
        )}
      </div>
    </section>
  );
}

/* ─── Showcase Images ────────────────────────────────────
   Template: curtain-bluff-bentleys.html

   <div class="bentley-showcase reveal">
     <img src="..." alt="Bentley exterior">
     <img src="..." alt="Bentley interior">
   </div>
────────────────────────────────────────────────────────── */

function BentleyShowcase({ data }: { data: IntroSection }) {
  const images = data.images;
  const mainImg = images?.main;
  const floatImg = images?.float;

  return (
    <div className="bentley-showcase reveal">
      {mainImg && (
        <Image
          src={mainImg.url}
          alt={mainImg.alt || "Bentley exterior"}
          width={mainImg.width ?? 900}
          height={mainImg.height ?? 563}
          sizes="(max-width: 700px) 100vw, 50vw"
          style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", display: "block" }}
          {...blurProps(mainImg.blurhash)}
        />
      )}
      {floatImg && (
        <Image
          src={floatImg.url}
          alt={floatImg.alt || "Bentley interior"}
          width={floatImg.width ?? 900}
          height={floatImg.height ?? 563}
          sizes="(max-width: 700px) 100vw, 50vw"
          style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", display: "block" }}
          {...blurProps(floatImg.blurhash)}
        />
      )}
    </div>
  );
}

/* ─── Content + Booking Card ─────────────────────────────
   Template: curtain-bluff-bentleys.html

   <section class="bentley-content reveal">
     <div class="bentley-content-inner">
       <div class="bentley-text">
         <div class="section-label-dark">The Experience</div>
         <h2>A journey as <em>memorable</em> as your stay</h2>
         <p>...</p>
       </div>
       <div class="booking-card">
         <h3>Reserve Your Transfer</h3>
         <div class="booking-row">...</div>
         ...
         <p class="booking-note">...</p>
         <div class="booking-ctas">
           <a href="..." class="b-btn primary">Reserve by Email</a>
           <a href="#" class="b-btn secondary">Pre-Arrival Form</a>
         </div>
       </div>
     </div>
   </section>
────────────────────────────────────────────────────────── */

function BentleyContent({ data }: { data: EditorialSplitSection }) {
  return (
    <section className="bentley-content reveal">
      <div className="bentley-content-inner">
        {/* ── Left: Text Column ─────────────────────────── */}
        <div className="bentley-text">
          {data.label && (
            <div className="section-label-dark">{data.label}</div>
          )}
          <h2>
            {renderTitle(data.title, data.titleItalic, "")}
          </h2>
          {data.body && (
            <p>{data.body}</p>
          )}
        </div>

        {/* ── Right: Booking Card ───────────────────────── */}
        <div className="booking-card">
          {data.subtitle && <h3>{data.subtitle}</h3>}

          {data?.stats && (data.stats?.length ?? 0) > 0 && (
            <>
              {(data.stats ?? []).map((stat, i) => (
                <div key={i} className="booking-row">
                  <span className="booking-label">{stat?.label}</span>
                  <span
                    className={`booking-val${
                      i === 0 ? " price" : ""
                    }`}
                  >
                    {stat?.value}
                  </span>
                </div>
              ))}
            </>
          )}

          {data.dressCode?.description && (
            <p className="booking-note">{data.dressCode.description}</p>
          )}

          {data?.menuLinks && (data.menuLinks?.length ?? 0) > 0 && (
            <div className="booking-ctas">
              {(data.menuLinks ?? []).map((link, i) => (
                <a
                  key={i}
                  href={link?.url}
                  className={`b-btn ${i === 0 ? "primary" : "secondary"}`}
                >
                  {link?.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Band ───────────────────────────────────────────
   Generic CTA band section (re-uses template pattern)
────────────────────────────────────────────────────────── */

function BentleyCtaBand({ data }: { data: CTABandSection }) {
  const bgClass =
    data.background === "dark"
      ? "also-explore"
      : "offers-ribbon";

  return (
    <section className={bgClass}>
      <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto" }}>
        <h2>{renderTitle(data.title, data.titleItalic, "")}</h2>
        {data.description && <p>{data.description}</p>}
        {data.cta && (
          <a href={data.cta.url} className="b-btn primary" style={{ display: "inline-block", marginTop: "1.5rem" }}>
            {data.cta.label}
          </a>
        )}
      </div>
    </section>
  );
}
