import type { CTABandSection } from "./types";
import { renderTitle } from "./render-title";

/* ─── Background variant map ────────────────────────────── */

const variantMap = {
  light: "light",
  dark: "",
  blush: "blush",
} as const;

/* ─── Main Export ─────────────────────────────────────── */

export default function CTABand({ data }: { data: CTABandSection }) {
  const variant = variantMap[data.background ?? "light"];
  const sectionClass = variant
    ? `value-strip ${variant}`
    : "value-strip";
  const hasSidebar = data?.contactDetails && (data?.contactDetails?.length ?? 0) > 0;

  return (
    <section className={sectionClass}>
      {hasSidebar ? (
        <div className="value-strip-sidebar">
          {/* Text column */}
          <div>
            <h2>
              {renderTitle(data.title, data.titleItalic, "")}
            </h2>
            {data.description && <p>{data.description}</p>}
            {data?.cta && (
              <a href={data?.cta?.url} className="value-strip-cta">
                {data?.cta?.label}
                <span aria-hidden="true">&rarr;</span>
              </a>
            )}
          </div>

          {/* Contact details */}
          <div className="value-strip-contact">
            {(data?.contactDetails ?? []).map((detail, i) => (
              <div key={i} className="value-strip-contact-item">
                <p className="vsc-label">{detail.label}</p>
                <p className="vsc-val">
                  {detail.url ? (
                    <a href={detail.url}>{detail.value}</a>
                  ) : (
                    detail.value
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <h2>
            {renderTitle(data.title, data.titleItalic, "")}
          </h2>
          {data.description && <p>{data.description}</p>}
          {data?.cta && (
            <a href={data?.cta?.url} className="value-strip-cta">
              {data?.cta?.label}
              <span aria-hidden="true">&rarr;</span>
            </a>
          )}
        </>
      )}
    </section>
  );
}
