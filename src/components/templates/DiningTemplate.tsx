import Image from "next/image";

/* ═══════════════════════════════════════════════════════════════════
   DiningTemplate — page-level template for the Dining & Drinks page

   Reproduces the exact HTML structure from:
     curtain-bluff-templates/curtain-bluff-dining.html
   (body content between nav and footer)

   Section mapping:
     sections[0] = hero            (type: hero)
     sections[1] = inclusive_strip
     sections[2] = editorial_split (Sea Grape restaurant)
     sections[3] = editorial_split (Tamarind restaurant)
     sections[4] = editorial_split (Wine cellar)
     sections[5] = testimonial
   ═══════════════════════════════════════════════════════════════════ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DiningTemplate({ sections }: { sections: any[] }) {
  const safeSections = sections ?? [];
  const hero = safeSections.find((s: any) => s?.type === 'hero');
  const strip = safeSections.find((s: any) => s?.type === 'inclusive_strip');
  const editorialSplits = safeSections.filter((s: any) => s?.type === 'editorial_split');
  const seaGrape = editorialSplits[0] ?? null;
  const tamarind = editorialSplits[1] ?? null;
  const wine = editorialSplits[2] ?? null;
  const testimonial = safeSections.find((s: any) => s?.type === 'testimonial');

  return (
    <>
      {/* ═══════ PAGE HERO ═══════ */}
      {hero && (
        <section className="page-hero">
          <Image
            src={hero.image?.url || ""}
            alt={hero.image?.alt || "Dining at Curtain Bluff"}
            fill
            priority
            className="page-hero-img"
            sizes="100vw"
            {...(hero.image?.blurhash
              ? { placeholder: "blur" as const, blurDataURL: hero.image.blurhash }
              : {})}
          />
          <div className="page-hero-bg"></div>
          <div className="page-hero-content">
            {hero.breadcrumb && (
              <div className="page-hero-breadcrumb">
                {(hero.breadcrumb ?? []).map(
                  (crumb: { label: string; url: string }, i: number) => (
                    <span key={i}>
                      {i > 0 && <span>&rarr;</span>}
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
            <h1 className="page-hero-title">
              {hero.title}
              {hero.titleItalic && (
                <>
                  {" "}
                  <em>{hero.titleItalic}</em>
                </>
              )}
            </h1>
            {hero.subtitle && (
              <p className="page-hero-sub">{hero.subtitle}</p>
            )}
          </div>
        </section>
      )}

      {/* ═══════ ALL-INCLUSIVE STRIP ═══════ */}
      {strip && strip?.items && (
        <div className="inclusive-strip">
          {(strip.items ?? []).map(
            (
              item: { icon: string; title: string; subtitle: string },
              i: number
            ) => (
              <div key={i} className="inclusive-strip-item">
                <div className="inclusive-icon">{item.icon}</div>
                <div className="inclusive-text">
                  <strong>{item.title}</strong>
                  {item.subtitle}
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* ═══════ THE SEA GRAPE ═══════ */}
      {seaGrape && (
        <RestaurantSection data={seaGrape} id="seagrape" />
      )}

      {/* ═══════ THE TAMARIND RESTAURANT ═══════ */}
      {tamarind && (
        <RestaurantSection data={tamarind} id="tamarind" />
      )}

      {/* ═══════ THE WINE CELLAR ═══════ */}
      {wine && <WineCellarSection data={wine} />}

      {/* ═══════ TESTIMONIAL ═══════ */}
      {testimonial && (
        <section className="testimonial reveal">
          <div className="testimonial-inner">
            <div className="testimonial-quote-mark">&ldquo;</div>
            <p className="testimonial-text">{testimonial.quote}</p>
            <p className="testimonial-author">{testimonial.author}</p>
          </div>
        </section>
      )}
    </>
  );
}

/* ─── Restaurant Section (Sea Grape / Tamarind) ────────────────────
   Template: curtain-bluff-dining.html

   <section class="restaurant reveal" id="seagrape">
     <div class="restaurant-inner">
       <div class="rest-gallery">
         <img class="rg-hero" ...>
         <img ...>
         <img ...>
       </div>
       <div class="rest-content">
         <div class="rest-number">01</div>
         <div class="section-label">On the Sand</div>
         <h2 class="rest-name">The <em>Sea Grape</em></h2>
         <p class="rest-vibe">...</p>
         <p class="rest-desc">...</p>
         <div class="rest-meals">
           <div class="rest-meal">
             <div class="rest-meal-name">Lunch</div>
             <div class="rest-meal-time">Daily</div>
           </div>
           ...
         </div>
         <div class="rest-dress">
           <div class="rest-dress-label">Evening Dress Code</div>
           <p>...</p>
         </div>
         <div class="rest-menus">
           <a href="#" class="rest-menu-link">Dinner Menu</a>
           ...
         </div>
       </div>
     </div>
   </section>
──────────────────────────────────────────────────────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RestaurantSection({ data, id }: { data: any; id?: string }) {
  return (
    <section className="restaurant reveal" {...(id ? { id } : {})}>
      <div className="restaurant-inner">
        {/* ── Gallery Mosaic ──────────────────────────────── */}
        <div className="rest-gallery">
          {data?.image && (
            <Image
              src={data.image?.url ?? ""}
              alt={data.image?.alt || ""}
              width={data.image?.width ?? 900}
              height={data.image?.height ?? 563}
              className="rg-hero"
              sizes="(max-width: 960px) 100vw, 50vw"
              {...(data.image?.blurhash
                ? { placeholder: "blur" as const, blurDataURL: data.image.blurhash }
                : {})}
            />
          )}
          {data?.gallery &&
            (data.gallery ?? []).slice(0, 2).map(
              (
                img: {
                  id?: string;
                  url: string;
                  alt: string;
                  blurhash?: string;
                  width?: number;
                  height?: number;
                },
                i: number
              ) => (
                <Image
                  key={img.id || i}
                  src={img.url}
                  alt={img.alt || ""}
                  width={img.width ?? 500}
                  height={img.height ?? 375}
                  sizes="(max-width: 960px) 50vw, 25vw"
                  {...(img.blurhash
                    ? { placeholder: "blur" as const, blurDataURL: img.blurhash }
                    : {})}
                />
              )
            )}
        </div>

        {/* ── Restaurant Content ─────────────────────────── */}
        <div className="rest-content">
          {data.number && (
            <div className="rest-number">{data.number}</div>
          )}

          {data.label && (
            <div className="section-label">{data.label}</div>
          )}

          <h2 className="rest-name">
            {data.title}
            {data.titleItalic && (
              <>
                {" "}
                <em>{data.titleItalic}</em>
              </>
            )}
          </h2>

          {data.subtitle && (
            <p className="rest-vibe">{data.subtitle}</p>
          )}

          {data.body && (
            <p className="rest-desc">{data.body}</p>
          )}

          {/* Meal Times */}
          {data?.meals && (data.meals?.length ?? 0) > 0 && (
            <div className="rest-meals">
              {(data.meals ?? []).map(
                (meal: { name: string; time: string }, i: number) => (
                  <div key={i} className="rest-meal">
                    <div className="rest-meal-name">{meal.name}</div>
                    <div className="rest-meal-time">{meal.time}</div>
                  </div>
                )
              )}
            </div>
          )}

          {/* Dress Code */}
          {data?.dressCode && (
            <div className="rest-dress">
              <div className="rest-dress-label">{data.dressCode?.label}</div>
              <p>{data.dressCode?.description}</p>
            </div>
          )}

          {/* Menu Links */}
          {data?.menuLinks && (data.menuLinks?.length ?? 0) > 0 && (
            <div className="rest-menus">
              {(data.menuLinks ?? []).map(
                (link: { label: string; url: string }, i: number) => (
                  <a key={i} href={link?.url} className="rest-menu-link">
                    {link?.label}
                  </a>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Wine Cellar Section ──────────────────────────────────────────
   Template: curtain-bluff-dining.html

   <section class="wine-section reveal" id="wine">
     <div class="wine-hero">
       <div class="wine-media">
         <img src="..." alt="Wine Cellar">
       </div>
       <div class="wine-content">
         <div class="section-label">The Cellar</div>
         <h2 class="wine-name">The <em>Wine Cellar</em></h2>
         <p class="wine-intro">...</p>
         <div class="wine-stats">
           <div>
             <div class="wine-stat-val">800+</div>
             <div class="wine-stat-label">Labels</div>
           </div>
           ...
         </div>
         <div class="wine-lists">
           <a href="#" class="wine-list-link">...</a>
           ...
         </div>
       </div>
     </div>
     <div class="sommelier-band">
       <div class="sommelier-band-label">Meet the Sommeliers</div>
       <p>Led by <strong>...</strong> ...</p>
     </div>
   </section>
──────────────────────────────────────────────────────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function WineCellarSection({ data }: { data: any }) {
  return (
    <section className="wine-section reveal" id="wine">
      <div className="wine-hero">
        {/* ── Wine Media ─────────────────────────────────── */}
        <div className="wine-media">
          {data?.image && (
            <Image
              src={data.image?.url ?? ""}
              alt={data.image?.alt || "Wine Cellar"}
              width={data.image?.width ?? 900}
              height={data.image?.height ?? 600}
              sizes="(max-width: 960px) 100vw, 50vw"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: "450px", filter: "brightness(0.85)" }}
              {...(data.image?.blurhash
                ? { placeholder: "blur" as const, blurDataURL: data.image.blurhash }
                : {})}
            />
          )}
        </div>

        {/* ── Wine Content ───────────────────────────────── */}
        <div className="wine-content">
          {data.label && (
            <div className="section-label">{data.label}</div>
          )}

          <h2 className="wine-name">
            {data.title}
            {data.titleItalic && (
              <>
                {" "}
                <em>{data.titleItalic}</em>
              </>
            )}
          </h2>

          {data.body && (
            <p className="wine-intro">{data.body}</p>
          )}

          {/* Wine Stats */}
          {data?.stats && (data.stats?.length ?? 0) > 0 && (
            <div className="wine-stats">
              {(data.stats ?? []).map(
                (stat: { value: string; label: string }, i: number) => (
                  <div key={i}>
                    <div className="wine-stat-val">{stat.value}</div>
                    <div className="wine-stat-label">{stat.label}</div>
                  </div>
                )
              )}
            </div>
          )}

          {/* Wine List Links */}
          {data?.menuLinks && (data.menuLinks?.length ?? 0) > 0 && (
            <div className="wine-lists">
              {(data.menuLinks ?? []).map(
                (link: { label: string; url: string }, i: number) => (
                  <a key={i} href={link?.url} className="wine-list-link">
                    {link?.label}
                  </a>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Sommelier Band ───────────────────────────────── */}
      {data?.sommelierBand && (
        <div className="sommelier-band">
          {data.sommelierBand?.label && (
            <div className="sommelier-band-label">
              {data.sommelierBand.label}
            </div>
          )}
          {data.sommelierBand?.text && (
            <p
              dangerouslySetInnerHTML={{ __html: data.sommelierBand.text }}
            />
          )}
        </div>
      )}
    </section>
  );
}
