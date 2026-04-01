import Image from "next/image";

/* ═══════════════════════════════════════════════════════════════════
   WeddingsTemplate — page-level template for Weddings & Events

   Reproduces the exact HTML structure from:
     curtain-bluff-templates/curtain-bluff-weddings.html
   (body content between nav and footer)

   Section mapping:
     sections[0] = hero
     sections[1] = intro
     sections[2] = editorial_split  (Beach Weddings)
     sections[3] = editorial_split  (Romantic Honeymoons)
     sections[4] = editorial_split  (Corporate Events)
     sections[5] = testimonial
     sections[6] = cta_band
   ═══════════════════════════════════════════════════════════════════ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function WeddingsTemplate({ sections }: { sections: any[] }) {
  const safeSections = sections ?? [];
  const hero = safeSections.find((s: any) => s?.type === 'hero');
  const intro = safeSections.find((s: any) => s?.type === 'intro');
  const eventTypes = safeSections.filter((s: any) => s?.type === 'editorial_split');
  const testimonial = safeSections.find((s: any) => s?.type === 'testimonial');
  const ctaBand = safeSections.find((s: any) => s?.type === 'cta_band');

  return (
    <>
      {/* ═══ Hero ═══ */}
      {hero && (
        <section className="hero">
          <Image
            src={hero.image?.url || ""}
            alt={hero.image?.alt || "Wedding at Curtain Bluff"}
            fill
            priority
            className="hero-img"
            sizes="100vw"
            {...(hero.image?.blurhash
              ? { placeholder: "blur" as const, blurDataURL: hero.image.blurhash }
              : {})}
          />
          <div className="hero-bg"></div>
          <div className="hero-content">
            {hero.breadcrumb && (
              <div className="hero-breadcrumb">
                {(hero.breadcrumb ?? []).map(
                  (crumb: { label: string; url?: string }, i: number) => (
                    <span key={i}>
                      {i > 0 && <span> &rarr; </span>}
                      {crumb?.url ? (
                        <a href={crumb.url}>{crumb?.label}</a>
                      ) : (
                        crumb?.label
                      )}
                    </span>
                  )
                )}
              </div>
            )}
            <div className="hero-divider"></div>
            <h1 className="hero-title">
              {hero.title}
              {hero.titleItalic && (
                <>
                  {" "}<em>{hero.titleItalic}</em>
                </>
              )}
            </h1>
            {hero.subtitle && (
              <p className="hero-sub">{hero.subtitle}</p>
            )}
          </div>
        </section>
      )}

      {/* ═══ Intro ═══ */}
      {intro && (
        <section className="intro reveal">
          {intro.label && (
            <div className="section-label" style={{ justifyContent: "center" }}>
              {intro.label}
            </div>
          )}
          <h2>
            {intro.title}
            {intro.titleItalic && (
              <>
                {" "}<em>{intro.titleItalic}</em>
              </>
            )}
          </h2>
          <p>{intro.body}</p>
        </section>
      )}

      {/* ═══ Event Types (editorial_split sections) ═══ */}
      {(eventTypes ?? []).map((event, i) => (
        <EventTypeSection key={i} data={event} index={i} />
      ))}

      {/* ═══ Testimonial ═══ */}
      {testimonial && (
        <section className="testimonial reveal">
          <div className="testimonial-inner">
            <div className="testimonial-mark">&ldquo;</div>
            <p className="testimonial-text">{testimonial.quote}</p>
            <p className="testimonial-author">{testimonial.author}</p>
            {testimonial.cta && (
              <a href={testimonial.cta.url} className="testimonial-cta">
                {testimonial.cta.label} &nearr;
              </a>
            )}
          </div>
        </section>
      )}

      {/* ═══ Contact Strip / CTA Band ═══ */}
      {ctaBand && (
        <section className="contact-strip reveal">
          <div className="contact-inner">
            <div className="contact-text">
              <h2>
                {ctaBand.title}
                {ctaBand.titleItalic && (
                  <>
                    {" "}<em>{ctaBand.titleItalic}</em>
                  </>
                )}
              </h2>
              {ctaBand.description && <p>{ctaBand.description}</p>}
              {ctaBand.cta && (
                <a href={ctaBand.cta.url} className="enquire-btn">
                  {ctaBand.cta.label}
                </a>
              )}
            </div>
            {ctaBand?.contactDetails && (ctaBand.contactDetails?.length ?? 0) > 0 && (
              <div className="contact-details">
                {(ctaBand.contactDetails ?? []).map(
                  (detail: { label: string; value: string; url?: string }, i: number) => (
                    <div key={i} className="cd-item">
                      <div className="cd-label">{detail?.label}</div>
                      <div className="cd-val">
                        {detail.url ? (
                          <a href={detail.url}>{detail.value}</a>
                        ) : (
                          <span dangerouslySetInnerHTML={{ __html: detail.value }} />
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}

/* ─── Event Type Section ──────────────────────────────────────────
   Template: curtain-bluff-weddings.html

   <section class="event-type reveal">
     <div class="event-media">
       <img src="..." alt="...">
     </div>
     <div class="event-content">
       <div class="event-num">01</div>
       <h2 class="event-name">Caribbean <em>Weddings</em></h2>
       <p class="event-desc">...</p>
       <a href="#" class="event-link">Plan Your Wedding <span class="arrow"></span></a>
     </div>
   </section>

   Even-indexed sections render image-left; odd-indexed use CSS
   direction:rtl to flip layout (handled by .event-type:nth-child(even)).
──────────────────────────────────────────────────────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function EventTypeSection({ data, index }: { data: any; index: number }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <section className="event-type reveal">
      <div className="event-media">
        {data?.image && (
          <Image
            src={data.image?.url ?? ""}
            alt={data.image?.alt || ""}
            width={data.image?.width ?? 900}
            height={data.image?.height ?? 600}
            sizes="(max-width: 900px) 100vw, 50vw"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: "450px" }}
            {...(data.image?.blurhash
              ? { placeholder: "blur" as const, blurDataURL: data.image.blurhash }
              : {})}
          />
        )}
      </div>
      <div className="event-content">
        <div className="event-num">{data.number || num}</div>
        <h2 className="event-name">
          {data.title}
          {data.titleItalic && (
            <>
              {" "}<em>{data.titleItalic}</em>
            </>
          )}
        </h2>
        <p className="event-desc">{data.body}</p>
        {data.cta && (
          <a href={data.cta.url} className="event-link">
            {data.cta.label} <span className="arrow"></span>
          </a>
        )}
      </div>
    </section>
  );
}
