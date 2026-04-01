import Image from "next/image";

/* ═══════════════════════════════════════════════════════════
   Activities Page Template
   Source: curtain-bluff-activities.html (body between nav & footer)

   sections[0] = hero
   sections[1] = activity_section  (Water Sports)
   sections[2] = activity_section  (Ground Sports)
   sections[3] = activity_section  (Scuba Diving)
   sections[4] = activity_section  (Kids Camp)
   sections[5] = included_upgrade
   sections[6] = testimonial
   ═══════════════════════════════════════════════════════════ */

/* ─── Hero ──────────────────────────────────────────────── */

function PageHero({ data }: { data: any }) {
  return (
    <section className="page-hero">
      <Image
        src={data.image?.url ?? ""}
        alt={data.image?.alt ?? ""}
        fill
        priority
        className="page-hero-img"
        sizes="100vw"
        style={{ objectFit: "cover" }}
        {...(data.image?.blurhash
          ? { placeholder: "blur" as const, blurDataURL: data.image.blurhash }
          : {})}
      />
      <div className="page-hero-bg" />
      <div className="page-hero-content">
        {data.breadcrumb && (
          <div className="page-hero-breadcrumb">
            {data.breadcrumb.map(
              (crumb: { label: string; url?: string }, i: number) => (
                <span key={i}>
                  {i > 0 && <span> &rarr; </span>}
                  {crumb.url ? (
                    <a href={crumb.url}>{crumb.label}</a>
                  ) : (
                    crumb.label
                  )}
                </span>
              )
            )}
          </div>
        )}
        <h1 className="page-hero-title">
          {data.title}
          {data.titleItalic && (
            <>
              {" "}
              <em>{data.titleItalic}</em>
            </>
          )}
        </h1>
        {data.subtitle && <p className="page-hero-sub">{data.subtitle}</p>}
      </div>
    </section>
  );
}

/* ─── Activity Section ──────────────────────────────────── */

function ActivityBlock({ data, index }: { data: any; index: number }) {
  const isEven = index % 2 === 1;

  return (
    <section
      className="act-section reveal"
      id={data.id}
      style={index === 0 ? { paddingTop: "7rem" } : undefined}
    >
      <div
        className="act-inner"
        style={isEven ? { direction: "rtl" } : undefined}
      >
        {/* ── Image Mosaic ──────────────────────────────── */}
        <div className="act-media" style={isEven ? { direction: "ltr" } : undefined}>
          <Image
            src={data.images?.main?.url ?? ""}
            alt={data.images?.main?.alt ?? ""}
            width={data.images?.main?.width ?? 960}
            height={data.images?.main?.height ?? 600}
            className="act-img-main"
            sizes="(max-width: 1024px) 100vw, 55vw"
            style={{ objectFit: "cover" }}
            {...(data.images?.main?.blurhash
              ? {
                  placeholder: "blur" as const,
                  blurDataURL: data.images.main.blurhash,
                }
              : {})}
          />

          {data.badge && (
            <span className="act-media-badge">{data.badge}</span>
          )}

          {data.images?.small
            ?.slice(0, 2)
            .map((img: any, i: number) => (
              <Image
                key={img.id ?? i}
                src={img.url}
                alt={img.alt}
                width={img.width ?? 480}
                height={img.height ?? 360}
                className="act-img-sm"
                sizes="(max-width: 1024px) 50vw, 27vw"
                style={{ objectFit: "cover" }}
                {...(img.blurhash
                  ? {
                      placeholder: "blur" as const,
                      blurDataURL: img.blurhash,
                    }
                  : {})}
              />
            ))}
        </div>

        {/* ── Content ───────────────────────────────────── */}
        <div className="act-content" style={isEven ? { direction: "ltr" } : undefined}>
          {data.label && (
            <div className="section-label">{data.label}</div>
          )}

          <h2 className="act-name">
            {data.name}
            {data.nameItalic && (
              <>
                {" "}
                <em>{data.nameItalic}</em>
              </>
            )}
          </h2>

          <p className="act-desc">{data.description}</p>

          {data.highlights && data.highlights.length > 0 && (
            <div className="act-highlights">
              {data.highlights.map((highlight: string, i: number) => (
                <div key={i} className="act-highlight">
                  <span className="act-highlight-dot" />
                  {highlight}
                </div>
              ))}
            </div>
          )}

          {data.cta && (
            <a href={data.cta.url} className="act-link">
              {data.cta.label}
              <span className="arrow" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Included / Upgrade ────────────────────────────────── */

function IncludedUpgrade({ data }: { data: any }) {
  return (
    <section className="included-section reveal">
      <div className="included-inner">
        {/* Included Column */}
        <div className="included-col">
          <h2>
            {data.includedTitle}
            {data.includedTitleItalic && (
              <>
                {" "}
                <em>{data.includedTitleItalic}</em>
              </>
            )}
          </h2>
          {data.includedNote && (
            <div className="sub-note">{data.includedNote}</div>
          )}
          <div className="included-list">
            {data.includedItems?.map((item: string, i: number) => (
              <div key={i} className="included-item">
                <span className="check">&#10003;</span>
                {item}
              </div>
            ))}
          </div>
          {data.cta && (
            <a href={data.cta.url} className="schedule-link">
              {data.cta.label} &#8599;
            </a>
          )}
        </div>

        {/* Upgrade Column */}
        <div className="upgrade-col">
          <h2>
            {data.upgradeTitle}
            {data.upgradeTitleItalic && (
              <>
                {" "}
                <em>{data.upgradeTitleItalic}</em>
              </>
            )}
          </h2>
          {data.upgradeNote && (
            <div className="sub-note">{data.upgradeNote}</div>
          )}
          <div className="upgrade-list">
            {data.upgradeItems?.map((item: string, i: number) => (
              <div key={i} className="upgrade-item">
                <span className="plus">+</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonial ───────────────────────────────────────── */

function TestimonialBlock({ data }: { data: any }) {
  return (
    <section className="testimonial reveal">
      <div className="testimonial-inner">
        <div className="testimonial-mark">&ldquo;</div>
        <p className="testimonial-text">{data.quote}</p>
        <p className="testimonial-author">{data.author}</p>
      </div>
    </section>
  );
}

/* ─── Main Export ───────────────────────────────────────── */

export default function ActivitiesTemplate({
  sections,
}: {
  sections: any[];
}) {
  const hero = sections[0];
  const activities = sections.slice(1, 5);
  const includedUpgrade = sections[5];
  const testimonial = sections[6];

  return (
    <>
      {/* Hero */}
      {hero && <PageHero data={hero} />}

      {/* Activity Sections */}
      {activities.map((activity, i) => (
        <ActivityBlock key={i} data={activity} index={i} />
      ))}

      {/* Included vs Upgrade */}
      {includedUpgrade && <IncludedUpgrade data={includedUpgrade} />}

      {/* Testimonial */}
      {testimonial && <TestimonialBlock data={testimonial} />}
    </>
  );
}
