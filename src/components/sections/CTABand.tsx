import type { CTABandSection } from "./types";

/* ─── Helper: render title with italic spans ─────────── */

function renderTitle(
  title: string,
  titleItalic?: string,
  italicClass?: string,
) {
  if (!titleItalic) return title;

  const parts = title.split(titleItalic);
  if (parts.length < 2) return title;

  return (
    <>
      {parts[0]}
      <em className={italicClass}>{titleItalic}</em>
      {parts.slice(1).join(titleItalic)}
    </>
  );
}

/* ─── Background map ─────────────────────────────────── */

const bgMap = {
  light: "bg-sand-light",
  dark: "bg-ocean-deep",
  blush: "bg-[#F8F2EF]",
} as const;

/* ─── Main Export ─────────────────────────────────────── */

export default function CTABand({ data }: { data: CTABandSection }) {
  const bg = bgMap[data.background ?? "light"];
  const isDark = data.background === "dark";
  const hasSidebar = data.contactDetails && data.contactDetails.length > 0;

  return (
    <section className={`px-12 py-16 ${bg}`}>
      <div
        className={`mx-auto max-w-[1100px] ${
          hasSidebar
            ? "grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto]"
            : "text-center"
        }`}
      >
        {/* Text column */}
        <div>
          <h2
            className={`mb-2 font-heading text-[clamp(1.6rem,2.5vw,2.2rem)] font-light ${
              isDark ? "text-sand" : "text-ocean-deep"
            }`}
          >
            {renderTitle(
              data.title,
              data.titleItalic,
              isDark ? "text-coral-soft" : "text-coral",
            )}
          </h2>

          {data.description && (
            <p
              className={`text-[0.82rem] font-light leading-relaxed ${
                isDark ? "text-sand-dark" : "text-text-light"
              }`}
            >
              {data.description}
            </p>
          )}

          {data.cta && (
            <a
              href={data.cta.url}
              className="mt-5 inline-flex items-center gap-2 bg-ocean-deep px-8 py-3.5 text-[0.6rem] font-medium uppercase tracking-[0.25em] text-sand transition-colors hover:bg-coral"
            >
              {data.cta.label}
              <span aria-hidden="true">&rarr;</span>
            </a>
          )}
        </div>

        {/* Contact details */}
        {hasSidebar && (
          <div className="flex flex-wrap gap-10">
            {data.contactDetails!.map((detail, i) => (
              <div key={i}>
                <p className="mb-1 text-[0.55rem] font-medium uppercase tracking-[0.25em] text-gold">
                  {detail.label}
                </p>
                {detail.url ? (
                  <a
                    href={detail.url}
                    className={`text-[0.78rem] font-light transition-colors hover:text-coral ${
                      isDark ? "text-sand-dark" : "text-text"
                    }`}
                  >
                    {detail.value}
                  </a>
                ) : (
                  <p
                    className={`text-[0.78rem] font-light ${
                      isDark ? "text-sand-dark" : "text-text"
                    }`}
                  >
                    {detail.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
