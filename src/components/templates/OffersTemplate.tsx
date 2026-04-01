import Image from "next/image";

/* ═══════════════════════════════════════════════════════════════════
   OffersTemplate — page-level template for the Special Offers page

   Reproduces the exact HTML structure from:
     curtain-bluff-templates/curtain-bluff-offers.html
   (body content between nav and footer)

   Section mapping:
     sections[0] = hero
     sections[1] = offer_card
     sections[2] = offer_card
   ═══════════════════════════════════════════════════════════════════ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function OffersTemplate({ sections }: { sections: any[] }) {
  const safeSections = sections ?? [];
  const hero = safeSections.find((s: any) => s?.type === 'hero');
  const offerCards = safeSections.filter((s: any) => s?.type === "offer_card");

  return (
    <>
      {/* ═══ Sub-Hero ═══ */}
      {hero && (
        <section className="sub-hero">
          <Image
            src={hero.image?.url || ""}
            alt={hero.image?.alt || "Curtain Bluff beach"}
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
            {hero.breadcrumb && (
              <div className="sub-hero-breadcrumb">
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
            <h1 className="sub-hero-title">
              {hero.title}
              {hero.titleItalic && (
                <>
                  {" "}<em>{hero.titleItalic}</em>
                </>
              )}
            </h1>
            {hero.subtitle && (
              <p className="sub-hero-sub">{hero.subtitle}</p>
            )}
          </div>
        </section>
      )}

      {/* ═══ Offers List ═══ */}
      {(offerCards?.length ?? 0) > 0 && (
        <div className="offers-list">
          {(offerCards ?? []).map((offer, i) => (
            <OfferFullCard key={i} data={offer} />
          ))}
        </div>
      )}
    </>
  );
}

/* ─── Offer Full Card ─────────────────────────────────────────────
   Template: curtain-bluff-offers.html

   <div class="offer-full reveal">
     <div class="offer-full-media">
       <img src="..." alt="...">
       <div class="offer-badge">
         <span class="offer-badge-pct">25%</span>
         <span class="offer-badge-off">off</span>
       </div>
     </div>
     <div class="offer-full-content">
       <div class="offer-tag">Year-Long Offer</div>
       <h2>Book 5 Nights, <em>Save 25%</em></h2>
       <p class="offer-desc">...</p>
       <div class="offer-details">
         <div class="od-item">
           <div class="od-label">Minimum Stay</div>
           <div class="od-val">5-9 nights</div>
         </div>
         ...
       </div>
       <div class="offer-includes">
         <div class="offer-includes-title">Includes</div>
         <div class="offer-includes-list">
           <span>...</span>
         </div>
       </div>
       <a href="#" class="offer-cta">Book This Offer</a>
       <p class="offer-terms">...</p>
     </div>
   </div>
──────────────────────────────────────────────────────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function OfferFullCard({ data }: { data: any }) {
  return (
    <div className="offer-full reveal">
      {/* ── Media Side ───────────────────────────────────── */}
      <div className="offer-full-media">
        {data?.image && (
          <Image
            src={data.image?.url ?? ""}
            alt={data.image?.alt || ""}
            width={data.image?.width ?? 800}
            height={data.image?.height ?? 600}
            sizes="(max-width: 900px) 100vw, 45vw"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: "400px" }}
            {...(data.image?.blurhash
              ? { placeholder: "blur" as const, blurDataURL: data.image.blurhash }
              : {})}
          />
        )}
        {data.discountLabel && (
          <div className="offer-badge">
            <span className="offer-badge-pct">{data.discountLabel}</span>
            <span className="offer-badge-off">off</span>
          </div>
        )}
      </div>

      {/* ── Content Side ─────────────────────────────────── */}
      <div className="offer-full-content">
        {data.tag && <div className="offer-tag">{data.tag}</div>}

        <h2>
          {data.title}
          {data.titleItalic && (
            <>
              {" "}<em>{data.titleItalic}</em>
            </>
          )}
        </h2>

        {data.description && (
          <p className="offer-desc">{data.description}</p>
        )}

        {/* Details Grid */}
        {data?.details && (data.details?.length ?? 0) > 0 && (
          <div className="offer-details">
            {(data.details ?? []).map(
              (detail: { label: string; value: string }, i: number) => (
                <div key={i} className="od-item">
                  <div className="od-label">{detail?.label}</div>
                  <div className="od-val">{detail?.value}</div>
                </div>
              )
            )}
          </div>
        )}

        {/* Includes */}
        {data?.includes && (data.includes?.length ?? 0) > 0 && (
          <div className="offer-includes">
            <div className="offer-includes-title">
              {data?.includesTitle || "Includes"}
            </div>
            <div className="offer-includes-list">
              {(data.includes ?? []).map((item: string, i: number) => (
                <span key={i}>{item}</span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        {data.ctaLabel && (
          <a href={data.ctaUrl || "#"} className="offer-cta">
            {data.ctaLabel}
          </a>
        )}

        {/* Terms */}
        {data.terms && <p className="offer-terms">{data.terms}</p>}
      </div>
    </div>
  );
}
