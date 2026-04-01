import type { StatsBandSection } from "./types";

/* ─── Main Export ─────────────────────────────────────── */

export default function StatsBand({
  data,
}: {
  data: StatsBandSection;
}) {
  return (
    <div className="stats-band reveal">
      {(data?.stats ?? []).map((stat, i) => (
        <div key={i} className="stat-cell">
          <div className="stat-val">{stat.value}</div>
          <div className="stat-lbl">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
