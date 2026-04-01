import Image from "next/image";
import { db } from "@/lib/db";
import { getSiteSettings } from "@/lib/site-settings";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const suffix = settings?.seoDefaults?.title_suffix || "";
  return {
    title: `Home${suffix}`,
    description:
      settings?.seoDefaults?.default_description ||
      "Curtain Bluff is an all-inclusive luxury resort on the southern coast of Antigua.",
  };
}

/* ─── Helpers ────────────────────────────────────────────── */

function img(section: any, key = "image") {
  const i = key.includes(".") ? key.split(".").reduce((o: any, k: string) => o?.[k], section) : section?.[key];
  return { src: i?.url || "", alt: i?.alt || "", w: i?.width ?? 800, h: i?.height ?? 600, blur: i?.blurhash };
}

function blurProps(blur?: string) {
  return blur ? { placeholder: "blur" as const, blurDataURL: blur } : {};
}

/* ─── Page ───────────────────────────────────────────────── */

export default async function HomePage() {
  let page = null;
  try {
    page = await db.page.findUnique({ where: { slug: "home" } });
  } catch {
    // DB not available at build time
  }

  if (!page) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "3rem", color: "var(--ocean-deep)" }}>Curtain Bluff</h1>
          <p style={{ marginTop: "1rem", color: "var(--text-light)" }}>Run the seed script to populate content.</p>
        </div>
      </div>
    );
  }

  const s = page.sections as any[];

  // Map section indices to their types
  const hero = s[0]; // hero
  const intro = s[1]; // intro
  const rooms = s[2]; // room_grid
  const dining = s[3]; // editorial_split
  const family = s[4]; // editorial_split
  const wellness = s[5]; // wellness_scroll
  const gallery = s[6]; // gallery_mosaic
  const testimonial = s[7]; // testimonial
  const weddings = s[8]; // editorial_split

  const heroImg = img(hero);
  const introMainImg = img(intro, "images.main");
  const introFloatImg = img(intro, "images.float");
  const diningImg = img(dining);
  const familyImg = img(family);
  const weddingsImg = img(weddings);

  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="hero">
        <Image className="hero-img" src={heroImg.src} alt={heroImg.alt} fill priority sizes="100vw" {...blurProps(heroImg.blur)} />
        <div className="hero-bg"></div>
        <div className="hero-content">
          <p className="hero-eyebrow">{hero.eyebrow}</p>
          <h1 className="hero-title">{hero.title} <em>{hero.titleItalic}</em></h1>
          <p className="hero-sub">{hero.subtitle}</p>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="line"></div>
        </div>
      </section>

      {/* ═══════════════ INTRO ═══════════════ */}
      <section className="intro reveal">
        <div className="intro-visual">
          <div className="intro-year">{intro.yearOverlay}</div>
          <Image className="intro-img-main" src={introMainImg.src} alt={introMainImg.alt} width={introMainImg.w} height={introMainImg.h} sizes="(max-width: 900px) 85vw, 42vw" {...blurProps(introMainImg.blur)} />
          <Image className="intro-img-float" src={introFloatImg.src} alt={introFloatImg.alt} width={introFloatImg.w} height={introFloatImg.h} sizes="(max-width: 900px) 55vw, 24vw" {...blurProps(introFloatImg.blur)} />
        </div>
        <div className="intro-text">
          <div className="section-label">{intro.label}</div>
          <h2 className="section-heading">{intro.title} <em>{intro.titleItalic}</em></h2>
          <p className="section-body">{intro.body}</p>
          {intro.cta && (
            <a href={intro.cta.url} className="btn-line">{intro.cta.label} <span className="arrow"></span></a>
          )}
        </div>
      </section>

      {/* ═══════════════ ROOMS ═══════════════ */}
      <section className="rooms reveal" id="rooms">
        <div className="rooms-header">
          <div className="section-label" style={{ justifyContent: "center" }}>{rooms.label}</div>
          <h2 className="section-heading">{rooms.title} <em>{rooms.titleItalic}</em></h2>
        </div>
        <div className="rooms-grid">
          {rooms.rooms?.map((room: any, i: number) => {
            const ri = img(room);
            return (
              <div className="room-card" key={i}>
                <Image className="room-card-img" src={ri.src} alt={ri.alt} width={ri.w} height={ri.h} sizes="(max-width: 900px) 100vw, 33vw" {...blurProps(ri.blur)} />
                <div className="room-card-overlay">
                  <h3 className="room-card-name">{room.name}</h3>
                  <p className="room-card-desc">{room.description}</p>
                  <a href={room.url} className="room-card-link">View Rooms &rarr;</a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════ EDITORIAL: DINING ═══════════════ */}
      <section className="editorial reveal" id="dining">
        <div className="editorial-media">
          <Image src={diningImg.src} alt={diningImg.alt} fill sizes="(max-width: 900px) 100vw, 50vw" {...blurProps(diningImg.blur)} />
        </div>
        <div className="editorial-text">
          <div className="section-label">{dining.label}</div>
          <h2 className="section-heading">{dining.title} <em>{dining.titleItalic}</em></h2>
          <p className="section-body">{dining.body}</p>
          {dining.stats && dining.stats.length > 0 && (
            <div style={{ display: "flex", gap: "2rem", marginTop: "2rem", flexWrap: "wrap" as const }}>
              {dining.stats.map((stat: any, i: number) => (
                <div key={i}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 300, color: "var(--coral)" }}>{stat.value}</div>
                  <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--text-light)", fontWeight: 400 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          )}
          {dining.cta && (
            <a href={dining.cta.url} className="btn-line">{dining.cta.label} <span className="arrow"></span></a>
          )}
        </div>
      </section>

      {/* ═══════════════ EDITORIAL: FAMILY (reversed, dark) ═══════════════ */}
      <section className="editorial reversed dark-bg reveal">
        <div className="editorial-media">
          <Image src={familyImg.src} alt={familyImg.alt} fill sizes="(max-width: 900px) 100vw, 50vw" {...blurProps(familyImg.blur)} />
        </div>
        <div className="editorial-text">
          <div className="section-label">{family.label}</div>
          <h2 className="section-heading">{family.title} <em>{family.titleItalic}</em></h2>
          <p className="section-body">{family.body}</p>
          {family.cta && (
            <a href={family.cta.url} className="btn-line">{family.cta.label} <span className="arrow"></span></a>
          )}
        </div>
      </section>

      {/* ═══════════════ WELLNESS ═══════════════ */}
      <section className="wellness reveal" id="wellness">
        <div className="wellness-header">
          <div className="section-label">{wellness.label}</div>
          <h2 className="section-heading">{wellness.title} <em>{wellness.titleItalic}</em></h2>
        </div>
        <div className="wellness-scroll">
          {wellness.cards?.map((card: any, i: number) => {
            const ci = img(card);
            return (
              <div className="wellness-card" key={i}>
                <Image src={ci.src} alt={ci.alt} width={ci.w} height={ci.h} sizes="320px" {...blurProps(ci.blur)} />
                <div className="wellness-card-info">
                  <span>{card.label}</span>
                  <h4>{card.title}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════ GALLERY ═══════════════ */}
      <section className="gallery reveal" id="gallery">
        <div className="gallery-header">
          <div className="section-label" style={{ justifyContent: "center" }}>{gallery.label}</div>
          <h2 className="section-heading">{gallery.title} <em>{gallery.titleItalic}</em></h2>
        </div>
        <div className="gallery-grid">
          {gallery.images?.map((image: any, i: number) => {
            const gi = img({ image }, "image");
            return (
              <div className="gi" key={i}>
                <Image src={gi.src} alt={gi.alt} width={gi.w} height={gi.h} sizes="(min-width: 768px) 25vw, 50vw" {...blurProps(gi.blur)} />
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════ WEDDINGS EDITORIAL ═══════════════ */}
      {weddings && (
        <section className="editorial reveal">
          <div className="editorial-media">
            <Image src={weddingsImg.src} alt={weddingsImg.alt} fill sizes="(max-width: 900px) 100vw, 50vw" {...blurProps(weddingsImg.blur)} />
          </div>
          <div className="editorial-text">
            <div className="section-label">{weddings.label}</div>
            <h2 className="section-heading">{weddings.title} <em>{weddings.titleItalic}</em></h2>
            <p className="section-body">{weddings.body}</p>
            {weddings.cta && (
              <a href={weddings.cta.url} className="btn-line">{weddings.cta.label} <span className="arrow"></span></a>
            )}
          </div>
        </section>
      )}

      {/* ═══════════════ CHARITY / TESTIMONIAL ═══════════════ */}
      {testimonial && (
        <section className="charity reveal">
          <div className="charity-inner">
            {testimonial.type === "testimonial" ? (
              <>
                <p className="testimonial-mark" aria-hidden="true">&ldquo;</p>
                <blockquote className="testimonial-quote">{testimonial.quote}</blockquote>
                <cite className="testimonial-author">&mdash; {testimonial.author}</cite>
              </>
            ) : (
              <>
                <div className="section-label">{testimonial.label}</div>
                <h2 className="section-heading">{testimonial.title} <em>{testimonial.titleItalic}</em></h2>
                <p className="section-body">{testimonial.body}</p>
                {testimonial.cta && (
                  <a href={testimonial.cta.url} className="btn-line">{testimonial.cta.label} <span className="arrow"></span></a>
                )}
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
}
