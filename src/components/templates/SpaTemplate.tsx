import Image from "next/image";
import type { Section } from "@/components/sections/types";
import type {
  HeroSection,
  IntroSection,
  EditorialSplitSection,
  TreatmentListSection,
  ExperienceStepsSection,
  TestimonialSection,
} from "@/components/sections/types";
import { renderTitle } from "@/components/sections/render-title";

/* ─── Helpers ─────────────────────────────────────────────── */

function img(section: any, key = "image") {
  const i = key.includes(".")
    ? key.split(".").reduce((o: any, k: string) => o?.[k], section)
    : section?.[key];
  return {
    src: i?.url || "",
    alt: i?.alt || "",
    w: i?.width ?? 800,
    h: i?.height ?? 600,
    blur: i?.blurhash,
  };
}

function blurProps(blur?: string) {
  return blur ? { placeholder: "blur" as const, blurDataURL: blur } : {};
}

/* ─── Props ───────────────────────────────────────────────── */

interface SpaTemplateProps {
  sections: Section[];
}

/* ═══════════════════════════════════════════════════════════
   SpaTemplate
   ─────────────────────────────────────────────────────────
   sections[0] = hero           (sub-hero)
   sections[1] = intro          (spa-intro split)
   sections[2] = editorial_split
   sections[3] = treatment_list
   sections[4] = experience_steps
   sections[5] = testimonial
   ═══════════════════════════════════════════════════════════ */

export default function SpaTemplate({ sections }: SpaTemplateProps) {
  const safeSections = sections ?? [];
  const hero = safeSections.find(s => s?.type === 'hero') as HeroSection | undefined;
  const intro = safeSections.find(s => s?.type === 'intro') as IntroSection | undefined;
  const editorial = safeSections.find(s => s?.type === 'editorial_split') as EditorialSplitSection | undefined;
  const treatments = safeSections.find(s => s?.type === 'treatment_list') as TreatmentListSection | undefined;
  const steps = safeSections.find(s => s?.type === 'experience_steps') as ExperienceStepsSection | undefined;
  const testimonial = safeSections.find(s => s?.type === 'testimonial') as TestimonialSection | undefined;

  return (
    <>
      {/* ═══ HERO ═══ */}
      {hero && <SpaHero data={hero} />}

      {/* ═══ INTRO ═══ */}
      {intro && <SpaIntro data={intro} />}

      {/* ═══ EDITORIAL SPLIT ═══ */}
      {editorial && <SpaEditorial data={editorial} />}

      {/* ═══ TREATMENT LIST ═══ */}
      {treatments && <SpaTreatments data={treatments} />}

      {/* ═══ EXPERIENCE STEPS ═══ */}
      {steps && <SpaExperienceSteps data={steps} />}

      {/* ═══ TESTIMONIAL ═══ */}
      {testimonial && <SpaTestimonial data={testimonial} />}
    </>
  );
}

/* ─── Hero ────────────────────────────────────────────────
   Template: curtain-bluff-spa.html

   <section class="sub-hero">
     <img class="sub-hero-img" src="..." alt="...">
     <div class="sub-hero-bg"></div>
     <div class="sub-hero-content">
       <div class="sub-hero-breadcrumb">
         <a href="#">Home</a> <span>→</span> ... The Spa
       </div>
       <h1 class="sub-hero-title">The <em>Spa</em></h1>
       <p class="sub-hero-tagline">...</p>
     </div>
   </section>
──────────────────────────────────────────────────────────── */

function SpaHero({ data }: { data: HeroSection }) {
  const heroImg = img(data);

  return (
    <section className="sub-hero">
      <Image
        className="sub-hero-img"
        src={heroImg.src}
        alt={heroImg.alt}
        fill
        priority
        sizes="100vw"
        {...blurProps(heroImg.blur)}
      />
      <div className="sub-hero-bg"></div>
      <div className="sub-hero-content">
        {data?.showBreadcrumb && data?.breadcrumb && (
          <div className="sub-hero-breadcrumb">
            {(data.breadcrumb ?? []).map((item, i) => (
              <span key={i}>
                {i > 0 && <span>&rarr;</span>}
                <a href={item?.url}>{item?.label}</a>
              </span>
            ))}
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

/* ─── Intro ──────────────────────────────────────────────
   Template: curtain-bluff-spa.html

   <section class="spa-intro reveal">
     <div class="spa-intro-media">
       <img src="..." alt="...">
     </div>
     <div class="spa-intro-content">
       <div class="section-label">The Sanctuary</div>
       <h2>Where the sea <em>heals</em></h2>
       <p>...</p>
       <div class="spa-stats">
         <div>
           <div class="spa-stat-val">5,000</div>
           <div class="spa-stat-label">Square Feet</div>
         </div>
         ...
       </div>
     </div>
   </section>
──────────────────────────────────────────────────────────── */

function SpaIntro({ data }: { data: IntroSection }) {
  const mainImg = data.images?.main ? img(data, "images.main") : null;

  return (
    <section className="spa-intro reveal">
      {mainImg && (
        <div className="spa-intro-media">
          <Image
            src={mainImg.src}
            alt={mainImg.alt}
            width={mainImg.w}
            height={mainImg.h}
            sizes="(max-width: 900px) 100vw, 50vw"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: 400 }}
            {...blurProps(mainImg.blur)}
          />
        </div>
      )}
      <div className="spa-intro-content">
        {data.label && <div className="section-label">{data.label}</div>}
        <h2>{renderTitle(data.title, data.titleItalic, "")}</h2>
        <p className="section-body">{data.body}</p>
        {data.cta && (
          <a href={data.cta.url} className="btn-line">
            {data.cta.label} <span className="arrow"></span>
          </a>
        )}
      </div>
    </section>
  );
}

/* ─── Editorial Split ────────────────────────────────────
   Re-uses the standard editorial layout from the template.

   <section class="editorial [reversed] [dark-bg] reveal">
     <div class="editorial-media">
       <img ...>
     </div>
     <div class="editorial-text">
       <div class="section-label">...</div>
       <h2 class="section-heading">... <em>...</em></h2>
       <p class="section-body">...</p>
       <div class="editorial-stats">...</div>
       <a class="btn-line">...</a>
     </div>
   </section>
──────────────────────────────────────────────────────────── */

function SpaEditorial({ data }: { data: EditorialSplitSection }) {
  const editImg = img(data);

  const sectionClasses = [
    "editorial",
    data.layout === "image-right" ? "reversed" : "",
    data.background === "dark" ? "dark-bg" : "",
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
      <div className="editorial-media">
        <Image
          src={editImg.src}
          alt={editImg.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          {...blurProps(editImg.blur)}
        />
      </div>
      <div className="editorial-text">
        {data.number && (
          <span className="editorial-number" aria-hidden="true">
            {data.number}
          </span>
        )}
        {data.label && <div className="section-label">{data.label}</div>}
        <h2 className="section-heading">
          {data.title}
          {data.titleItalic && (
            <>
              {" "}
              <em>{data.titleItalic}</em>
            </>
          )}
        </h2>
        {data.subtitle && (
          <p className="editorial-subtitle">{data.subtitle}</p>
        )}
        <p className="section-body">{data.body}</p>
        {data?.stats && (data.stats?.length ?? 0) > 0 && (
          <div className="editorial-stats">
            {(data.stats ?? []).map((stat) => (
              <div key={stat?.label}>
                <div className="editorial-stat-val">{stat?.value}</div>
                <div className="editorial-stat-label">{stat?.label}</div>
              </div>
            ))}
          </div>
        )}
        {data.cta && (
          <a href={data.cta.url} className="btn-line">
            {data.cta.label} <span className="arrow"></span>
          </a>
        )}
      </div>
    </section>
  );
}

/* ─── Treatment List ─────────────────────────────────────
   Template: curtain-bluff-spa.html

   <section class="treatments reveal">
     <div class="treatments-inner">
       <div class="treatments-heading">
         <div class="section-label">Menu</div>
         <h2>Spa <em>Treatments</em></h2>
         <p>...</p>
       </div>
       <div>
         <div class="treatment-list">
           <div class="treatment-item">
             <span class="treatment-name">...</span>
             <span class="treatment-desc">...</span>
           </div>
           ...
         </div>
         <div class="treatments-ctas">
           <a class="spa-btn primary">...</a>
           <a class="spa-btn">...</a>
         </div>
       </div>
     </div>
   </section>
──────────────────────────────────────────────────────────── */

function SpaTreatments({ data }: { data: TreatmentListSection }) {
  return (
    <section className="treatments reveal">
      <div className="treatments-inner">
        <div className="treatments-heading">
          {data.label && <div className="section-label">{data.label}</div>}
          <h2>{renderTitle(data.title, data.titleItalic)}</h2>
          {data.description && <p>{data.description}</p>}
        </div>

        <div>
          <div className="treatment-list">
            {(data?.treatments ?? []).map((treatment, i) => (
              <div key={i} className="treatment-item">
                <span className="treatment-name">{treatment?.name}</span>
                <span className="treatment-desc">{treatment?.description}</span>
              </div>
            ))}
          </div>

          {data?.ctas && (data.ctas?.length ?? 0) > 0 && (
            <div className="treatments-ctas">
              {(data.ctas ?? []).map((cta, i) => (
                <a
                  key={i}
                  href={cta?.url}
                  className={`spa-btn${i === 0 ? " primary" : ""}`}
                >
                  {cta?.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Experience Steps ───────────────────────────────────
   Template: curtain-bluff-spa.html

   <section class="experience-strip reveal">
     <div class="experience-inner">
       <div class="exp-step">
         <div class="exp-step-num">01</div>
         <h4>Arrive &amp; Unwind</h4>
         <p>...</p>
       </div>
       ...
     </div>
   </section>
──────────────────────────────────────────────────────────── */

function SpaExperienceSteps({ data }: { data: ExperienceStepsSection }) {
  return (
    <section className="experience-strip reveal">
      <div className="experience-inner">
        {(data?.steps ?? []).map((step, i) => (
          <div key={i} className="exp-step">
            <div className="exp-step-num">{step?.number}</div>
            <h4>{step?.title}</h4>
            <p>{step?.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Testimonial / Quote ────────────────────────────────
   Template: curtain-bluff-spa.html

   <section class="quote-section reveal">
     <div class="quote-inner">
       <div class="quote-mark">"</div>
       <p class="quote-text">...</p>
       <p class="quote-author">...</p>
     </div>
   </section>
──────────────────────────────────────────────────────────── */

function SpaTestimonial({ data }: { data: TestimonialSection }) {
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
