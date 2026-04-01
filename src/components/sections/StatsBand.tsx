import type { StatsBandSection } from "./types";

/* ─── Main Export ─────────────────────────────────────── */

export default function StatsBand({
  data,
}: {
  data: StatsBandSection;
}) {
  return (
    <section className="stats-band">
      {data.stats.map((stat, i) => (
        <div key={i} className="stat-cell">
          <p className="stat-val">{stat.value}</p>
          <p className="stat-lbl">{stat.label}</p>
        </div>
      ))}
    </section>
  );
}
