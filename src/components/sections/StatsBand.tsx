import type { StatsBandSection } from "./types";

/* ─── Main Export ─────────────────────────────────────── */

export default function StatsBand({
  data,
}: {
  data: StatsBandSection;
}) {
  return (
    <section className="bg-ocean-deep">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {data.stats.map((stat, i) => (
          <div
            key={i}
            className={`px-6 py-10 text-center ${
              i < data.stats.length - 1
                ? "border-r border-white/[0.06]"
                : ""
            }`}
          >
            <p className="font-heading text-[2.8rem] font-light leading-none text-gold-light">
              {stat.value}
            </p>
            <p className="mt-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-sand-dark">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
