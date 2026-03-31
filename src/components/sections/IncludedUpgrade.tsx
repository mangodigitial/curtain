import type { IncludedUpgradeSection } from "./types";

/* ─── Main Export ─────────────────────────────────────── */

export default function IncludedUpgrade({
  data,
}: {
  data: IncludedUpgradeSection;
}) {
  return (
    <section className="bg-ocean-deep px-12 py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-16 lg:grid-cols-[1.2fr_0.8fr]">
        {/* ── Included Column ───────────────────────────── */}
        <div>
          <h3 className="mb-2 font-heading text-[clamp(1.8rem,3vw,2.4rem)] font-light text-sand">
            {data.includedTitle}
            {data.includedTitleItalic && (
              <>
                {" "}
                <em className="text-coral-soft">{data.includedTitleItalic}</em>
              </>
            )}
          </h3>

          {data.includedNote && (
            <p className="mb-8 text-[0.68rem] uppercase tracking-[0.15em] text-gold-light">
              {data.includedNote}
            </p>
          )}

          <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
            {data.includedItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[0.78rem] font-light leading-relaxed text-sand-dark"
              >
                <span className="text-gold-light">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Upgrade Column ────────────────────────────── */}
        <div>
          <h3 className="mb-2 font-heading text-[clamp(1.8rem,3vw,2.4rem)] font-light text-sand">
            {data.upgradeTitle}
            {data.upgradeTitleItalic && (
              <>
                {" "}
                <em className="text-gold-light">{data.upgradeTitleItalic}</em>
              </>
            )}
          </h3>

          {data.upgradeNote && (
            <p className="mb-8 text-[0.68rem] uppercase tracking-[0.15em] text-sand-dark/60">
              {data.upgradeNote}
            </p>
          )}

          <ul className="flex flex-col gap-2">
            {data.upgradeItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[0.78rem] text-sand-dark"
              >
                <span className="text-coral-soft">+</span>
                {item}
              </li>
            ))}
          </ul>

          {data.cta && (
            <a
              href={data.cta.url}
              className="mt-8 inline-flex items-center gap-2 border border-white/15 px-6 py-2.5 text-[0.6rem] font-medium uppercase tracking-[0.25em] text-sand transition-colors hover:border-gold-light hover:text-gold-light"
            >
              {data.cta.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
