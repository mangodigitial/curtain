import type { DetailColumnsSection } from "./types";
import { renderTitle } from "./render-title";

/* ─── Main Export ─────────────────────────────────────── */

export default function DetailColumns({
  data,
}: {
  data: DetailColumnsSection;
}) {
  return (
    <section className="detail-columns">
      <div className="detail-columns-inner">
        {/* Title */}
        <h2>
          {renderTitle(data.title, data.titleItalic, "")}
        </h2>

        {/* Columns */}
        <div className="detail-columns-grid">
          {data.columns.map((column, i) => (
            <div
              key={i}
              className="detail-col"
              dangerouslySetInnerHTML={{ __html: column }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
