import type { InclusiveStripSection } from "./types";

/* ─── Main Export ─────────────────────────────────────── */

export default function InclusiveStrip({
  data,
}: {
  data: InclusiveStripSection;
}) {
  return (
    <section className="bg-ocean-deep">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 md:grid-cols-4">
        {data.items.map((item, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 px-6 py-5 ${
              i < data.items.length - 1
                ? "border-r border-white/[0.06]"
                : ""
            }`}
          >
            {/* Icon */}
            <span className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full border border-white/[0.12] text-[0.7rem] text-gold-light">
              {item.icon}
            </span>

            {/* Text */}
            <span className="text-[0.58rem] uppercase leading-snug tracking-[0.1em] text-sand-dark">
              <strong className="mb-0.5 block text-[0.62rem] font-medium text-sand">
                {item.title}
              </strong>
              {item.subtitle}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
