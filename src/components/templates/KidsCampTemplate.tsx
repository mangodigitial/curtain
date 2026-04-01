import Image from "next/image";
import type { Section } from "@/components/sections/types";
import type {
  HeroSection,
  IntroSplitSection,
  EditorialSplitSection,
  TestimonialSection,
} from "@/components/sections/types";
import { renderTitle } from "@/components/sections/render-title";

/* ═══════════════════════════════════════════════════════════════════
   KidsCampTemplate — page-level template for the Cee Bee Kids Camp
   page.

   Reproduces the exact HTML structure from:
     curtain-bluff-templates/curtain-bluff-kids-camp.html
   (body content between nav and footer)

   Section mapping:
     sections[0] = hero              (sub-hero)
     sections[1] = intro             (intro-split w/ sidebar)
     sections[2] = editorial_split   (Fun & Learning — "A day at Cee Bee")
     sections[3] = editorial_split   (Evening Programs)
     sections[4] = testimonial       (quote section)
   ═══════════════════════════════════════════════════════════════════ */

/* ─── Helpers ────────────────────────────────────────────── */

function blurProps(blur?: string) {
  return blur ? { placeholder: "blur" as const, blurDataURL: blur } : {};
}

/* ─── Props ──────────────────────────────────────────────── */

interface KidsCampTemplateProps {
  sections: Section[];
}

/* ─── Main Export ────────────────────────────────────────── */

export default function KidsCampTemplate({
  sections,
}: KidsCampTemplateProps) {
  const hero = sections[0] as HeroSection | undefined;
  const intro = sections[1] as IntroSplitSection | undefined;
  const editorialFun = sections[2] as EditorialSplitSection | undefined;
  const editorialEvening = sections[3] as EditorialSplitSection | undefined;
  const testimonial = sections[4] as TestimonialSection | undefined;

  return (
    <>
      {/* ═══ HERO ═══ */}
      {hero && <KidsHero data={hero} />}

      {/* ═══ INTRO SPLIT w/ SIDEBAR ═══ */}
      {intro && <KidsIntroSplit data={intro} />}

      {/* ═══ DETAIL SECTION — Fun & Learning ═══ */}
      {editorialFun && <KidsDetail data={editorialFun} />}

      {/* ═══ DETAIL SECTION — Evening Programs ═══ */}
      {editorialEvening && <KidsDetail data={editorialEvening} />}

      {/* ═══ TESTIMONIAL / QUOTE ═══ */}
      {testimonial && <KidsTestimonial data={testimonial} />}
    </>
  );
}

/* ─── Sub-Page Hero ──────────────────────────────────────
   Template: curtain-bluff-kids-camp.html

   <section class="sub-hero">
     <img class="sub-hero-img" src="..." alt="Cee Bee Kids Camp">
     <div class="sub-hero-bg"></div>
     <div class="sub-hero-content">
       <div class="sub-hero-breadcrumb">
         <a href="#">Home</a> <span>→</span> <a href="#">Activities</a>
         <span>→</span> Cee Bee Kids Camp
       </div>
       <h1 class="sub-hero-title">Cee Bee <em>Kids Camp</em></h1>
     </div>
   </section>
────────────────────────────────────────────────────────── */

function KidsHero({ data }: { data: HeroSection }) {
  return (
    <section className="sub-hero">
      <Image
        src={data.image?.url || ""}
        alt={data.image?.alt || "Cee Bee Kids Camp"}
        fill
        priority
        className="sub-hero-img"
        sizes="100vw"
        {...blurProps(data.image?.blurhash)}
      />
      <div className="sub-hero-bg" />
      <div className="sub-hero-content">
        {data.breadcrumb && (
          <div className="sub-hero-breadcrumb">
            {data.breadcrumb.map(
              (crumb: { label: string; url: string }, i: number) => (
                <span key={i}>
                  {i > 0 && <span>&rarr;</span>}
                  {crumb.url ? (
                    <a href={crumb.url}>{crumb.label}</a>
                  ) : (
                    crumb.label
                  )}
                </span>
              ),
            )}
          </div>
        )}
        <h1 className="sub-hero-title">
          {renderTitle(data.title, data.titleItalic, "")}
        </h1>
        {data.subtitle && (
          <p className="sub-hero-tagline">{data.subtitle}</p>
        )}
      </div>
    </section>
  );
}

/* ─── Intro Split with Sidebar ───────────────────────────
   Template: curtain-bluff-kids-camp.html

   <section class="intro-split reveal">
     <div class="intro-text">
       <div class="section-label">For the Family</div>
       <h2>Where kids have <em>the time of their lives</em></h2>
       <p>...</p>
     </div>
     <div class="intro-sidebar">
       <h4 class="sidebar-heading">At a Glance</h4>
       <div class="sidebar-item">
         <span class="sidebar-icon">◆</span>
         <span class="sidebar-label">Ages</span>
         <span class="sidebar-val">3 – 10 years</span>
       </div>
       ...
       <a href="#" class="sidebar-cta">View Kids Camp Schedule ↗</a>
     </div>
   </section>
────────────────────────────────────────────────────────── */

function KidsIntroSplit({ data }: { data: IntroSplitSection }) {
  return (
    <section className="intro-split reveal">
      {/* ── Left: Text ─────────────────────────────────── */}
      <div className="intro-text">
        {data.titleItalic && (
          <div className="section-label">
            {/* The label comes from the section, use a reasonable fallback */}
            {(data as any).label || "For the Family"}
          </div>
        )}
        <h2>{renderTitle(data.title, data.titleItalic, "")}</h2>
        {data.body && <p>{data.body}</p>}
      </div>

      {/* ── Right: Sidebar ─────────────────────────────── */}
      {data.sidebar && (
        <div className="intro-sidebar">
          {data.sidebar.heading && (
            <h4 className="sidebar-heading">{data.sidebar.heading}</h4>
          )}

          {data.sidebar.items?.map(
            (
              item: { icon?: string; label: string; value: string },
              i: number,
            ) => (
              <div key={i} className="sidebar-item">
                <span className="sidebar-icon">
                  {item.icon || "\u25C6"}
                </span>
                <span className="sidebar-label">{item.label}</span>
                <span className="sidebar-val">{item.value}</span>
              </div>
            ),
          )}

          {data.sidebar.cta && (
            <a href={data.sidebar.cta.url} className="sidebar-cta">
              {data.sidebar.cta.label} &#8599;
            </a>
          )}
        </div>
      )}
    </section>
  );
}

/* ─── Detail Section (Fun & Learning / Evening Programs) ──
   Template: curtain-bluff-kids-camp.html

   <section class="detail reveal">
     <div class="detail-inner">
       <h3>A day at <em>Cee Bee</em></h3>
       <div class="detail-columns">
         <div><p>...</p><p>...</p></div>
         <div><p>...</p><p>...</p></div>
       </div>
     </div>
   </section>
────────────────────────────────────────────────────────── */

function KidsDetail({ data }: { data: EditorialSplitSection }) {
  const sectionClasses = [
    "detail",
    data.background === "sand" ? "" : "",
    "reveal",
  ]
    .filter(Boolean)
    .join(" ");

  const sectionStyle =
    data.background === "sand"
      ? { background: "var(--sand-light)" }
      : undefined;

  return (
    <section className={sectionClasses} style={sectionStyle}>
      <div className="detail-inner">
        {data.label && <div className="section-label">{data.label}</div>}
        <h3>{renderTitle(data.title, data.titleItalic, "")}</h3>
        <p>{data.body}</p>

        {data.stats && data.stats.length > 0 && (
          <div className="detail-columns">
            {data.stats.map((stat, i) => (
              <div key={i}>
                <p>{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {data.cta && (
          <a href={data.cta.url} className="sidebar-cta" style={{ display: "inline-block", marginTop: "1.5rem" }}>
            {data.cta.label} &#8599;
          </a>
        )}
      </div>
    </section>
  );
}

/* ─── Testimonial / Quote ────────────────────────────────
   Template: curtain-bluff-kids-camp.html

   <section class="quote-section reveal">
     <div class="quote-inner">
       <div class="quote-mark">"</div>
       <p class="quote-text">...</p>
       <p class="quote-author">Kim-Marie Evans — Luxury Travel Mom</p>
     </div>
   </section>
────────────────────────────────────────────────────────── */

function KidsTestimonial({ data }: { data: TestimonialSection }) {
  return (
    <section className="quote-section reveal">
      <div className="quote-inner">
        <div className="quote-mark" aria-hidden="true">
          &ldquo;
        </div>
        <p className="quote-text">{data.quote}</p>
        <p className="quote-author">{data.author}</p>
      </div>
    </section>
  );
}
