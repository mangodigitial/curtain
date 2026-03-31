import type { TreatmentListSection } from "./types";
import { renderTitle } from "./render-title";

/* ─── Main Export ─────────────────────────────────────── */

export default function TreatmentList({
  data,
}: {
  data: TreatmentListSection;
}) {
  return (
    <section className="bg-sand-light px-12 py-20">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-start gap-16 lg:grid-cols-[0.4fr_0.6fr]">
        {/* Left heading (sticky) */}
        <div className="sticky top-[100px]">
          <h2 className="mb-4 font-heading text-[clamp(1.8rem,3vw,2.4rem)] font-light leading-tight text-ocean-deep">
            {renderTitle(data.title, data.titleItalic)}
          </h2>
          {data.description && (
            <p className="text-[0.85rem] font-light leading-relaxed text-text-light">
              {data.description}
            </p>
          )}
        </div>

        {/* Right list */}
        <div className="flex flex-col">
          {data.treatments.map((treatment, i) => (
            <div
              key={i}
              className={`flex items-baseline justify-between gap-4 border-b border-sand-dark py-4${
                i === 0 ? " border-t" : ""
              }`}
            >
              <span className="font-heading text-[1.15rem] font-normal text-ocean-deep">
                {treatment.name}
              </span>
              <span className="flex-shrink-0 text-right text-[0.72rem] font-light text-text-light">
                {treatment.description}
              </span>
            </div>
          ))}

          {/* CTAs */}
          {data.ctas && data.ctas.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {data.ctas.map((cta, i) => (
                <a
                  key={i}
                  href={cta.url}
                  className={`text-[0.6rem] font-medium uppercase tracking-[0.2em] transition ${
                    i === 0
                      ? "border border-ocean-deep bg-ocean-deep px-5 py-2.5 text-sand hover:border-coral hover:bg-coral"
                      : "border border-ocean-deep px-5 py-2.5 text-ocean-deep hover:bg-ocean-deep hover:text-sand"
                  }`}
                >
                  {cta.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
