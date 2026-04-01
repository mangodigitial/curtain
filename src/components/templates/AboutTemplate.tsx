import Image from "next/image";
import { renderTitle } from "@/components/sections/render-title";

/* ═══════════════════════════════════════════════════════════
   AboutTemplate — page-level template for the About page.

   Converts curtain-bluff-about.html body content (between
   nav and footer) into a React / Next.js component.

   sections[0] = hero
   sections[1] = intro
   sections[2] = stats_band
   sections[3] = timeline
   sections[4] = map_section
   sections[5] = editorial_split  (antigua band)
   ═══════════════════════════════════════════════════════════ */

export default function AboutTemplate({ sections }: { sections: any[] }) {
  const safeSections = sections ?? [];
  const hero = safeSections.find((s: any) => s?.type === 'hero');
  const intro = safeSections.find((s: any) => s?.type === 'intro');
  const statsBand = safeSections.find((s: any) => s?.type === 'stats_band');
  const timeline = safeSections.find((s: any) => s?.type === 'timeline');
  const mapSection = safeSections.find((s: any) => s?.type === 'map_section');
  const editorialSplit = safeSections.find((s: any) => s?.type === 'editorial_split');

  return (
    <>
      {/* ═══ Hero ═══ */}
      {hero && (
        <section className="sub-hero">
          <Image
            src={hero.image?.url || ""}
            alt={hero.image?.alt || "Curtain Bluff aerial"}
            fill
            priority
            className="sub-hero-img"
            sizes="100vw"
            {...(hero.image?.blurhash
              ? { placeholder: "blur" as const, blurDataURL: hero.image.blurhash }
              : {})}
          />
          <div className="sub-hero-bg"></div>
          <div className="sub-hero-content">
            {hero?.showBreadcrumb && hero?.breadcrumb && (
              <div className="sub-hero-breadcrumb">
                {(hero.breadcrumb ?? []).map(
                  (item: { label: string; url: string }, i: number) => (
                    <span key={i}>
                      {i > 0 && <span>&rarr;</span>}
                      <a href={item?.url}>{item?.label}</a>
                    </span>
                  ),
                )}
                {/* Final non-link segment (current page) */}
                <span>&rarr;</span> {hero.breadcrumbCurrent || "About"}
              </div>
            )}
            <h1 className="sub-hero-title">
              {renderTitle(hero.title, hero.titleItalic, "")}
            </h1>
          </div>
        </section>
      )}

      {/* ═══ Intro ═══ */}
      {intro && (
        <section className="about-intro reveal">
          {intro.label && (
            <div className="section-label" style={{ justifyContent: "center" }}>
              {intro.label}
            </div>
          )}
          <h2>
            {renderTitle(intro.title, intro.titleItalic, "")}
          </h2>
          <p>{intro.body}</p>
        </section>
      )}

      {/* ═══ Stats Band ═══ */}
      {statsBand && statsBand?.stats && (
        <div className="stats-band reveal">
          {(statsBand.stats ?? []).map(
            (stat: { value: string; label: string }, i: number) => (
              <div key={i} className="stat-cell">
                <div className="stat-val">{stat?.value}</div>
                <div className="stat-lbl">{stat?.label}</div>
              </div>
            ),
          )}
        </div>
      )}

      {/* ═══ Timeline ═══ */}
      {timeline && timeline?.items && (
        <section className="timeline">
          {(timeline.items ?? []).map(
            (
              item: {
                year: string;
                heading: string;
                headingItalic?: string;
                text: string;
                image?: {
                  url: string;
                  alt: string;
                  blurhash?: string;
                  width?: number;
                  height?: number;
                };
              },
              i: number,
            ) => (
              <div key={i} className="tl-item reveal">
                <div className="tl-dot"></div>
                <div className="tl-content">
                  <div className="tl-year">{item.year}</div>
                  <h3 className="tl-heading">
                    {renderTitle(item.heading, item.headingItalic)}
                  </h3>
                  <p className="tl-text">{item.text}</p>
                </div>
                {item?.image && (
                  <div className="tl-media">
                    <Image
                      src={item.image?.url ?? ""}
                      alt={item.image?.alt ?? ""}
                      width={item.image?.width ?? 700}
                      height={item.image?.height ?? 525}
                      sizes="(min-width: 800px) 50vw, 100vw"
                      {...(item.image?.blurhash
                        ? {
                            placeholder: "blur" as const,
                            blurDataURL: item.image.blurhash,
                          }
                        : {})}
                    />
                  </div>
                )}
              </div>
            ),
          )}
        </section>
      )}

      {/* ═══ Map Section ═══ */}
      {mapSection && (
        <section className="map-section reveal">
          <div className="map-inner">
            <div className="map-text">
              {mapSection.label && (
                <div className="section-label">{mapSection.label}</div>
              )}
              <h2>
                {renderTitle(mapSection.title, mapSection.titleItalic, "")}
              </h2>
              <p>{mapSection.body}</p>
            </div>
            {mapSection?.image && (
              <Image
                className="map-img"
                src={mapSection.image?.url ?? ""}
                alt={mapSection.image?.alt ?? ""}
                width={mapSection.image?.width ?? 800}
                height={mapSection.image?.height ?? 500}
                sizes="(min-width: 800px) 60vw, 100vw"
                {...(mapSection.image?.blurhash
                  ? {
                      placeholder: "blur" as const,
                      blurDataURL: mapSection.image.blurhash,
                    }
                  : {})}
              />
            )}
          </div>
        </section>
      )}

      {/* ═══ Antigua Band (Editorial Split) ═══ */}
      {editorialSplit && (
        <section className="antigua-band reveal">
          <div className="antigua-media">
            {editorialSplit?.image && (
              <Image
                src={editorialSplit.image?.url ?? ""}
                alt={editorialSplit.image?.alt ?? ""}
                width={editorialSplit.image?.width ?? 900}
                height={editorialSplit.image?.height ?? 600}
                sizes="(min-width: 800px) 50vw, 100vw"
                {...(editorialSplit.image?.blurhash
                  ? {
                      placeholder: "blur" as const,
                      blurDataURL: editorialSplit.image.blurhash,
                    }
                  : {})}
              />
            )}
          </div>
          <div className="antigua-content">
            {editorialSplit.label && (
              <div className="section-label">{editorialSplit.label}</div>
            )}
            <h2>
              {renderTitle(
                editorialSplit.title,
                editorialSplit.titleItalic,
                "",
              )}
            </h2>
            <p>{editorialSplit.body}</p>
          </div>
        </section>
      )}
    </>
  );
}
