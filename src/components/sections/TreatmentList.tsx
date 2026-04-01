import type { TreatmentListSection } from "./types";
import { renderTitle } from "./render-title";

export default function TreatmentList({
  data,
}: {
  data: TreatmentListSection;
}) {
  return (
    <section className="treatments">
      <div className="treatments-inner">
        <div className="treatments-heading">
          <h2>{renderTitle(data.title, data.titleItalic)}</h2>
          {data.description && <p>{data.description}</p>}
        </div>

        <div className="treatment-list">
          {data.treatments.map((treatment, i) => (
            <div key={i} className="treatment-item">
              <span className="treatment-name">{treatment.name}</span>
              <span className="treatment-desc">{treatment.description}</span>
            </div>
          ))}

          {data.ctas && data.ctas.length > 0 && (
            <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              {data.ctas.map((cta, i) => (
                <a
                  key={i}
                  href={cta.url}
                  className={`spa-btn${i === 0 ? " primary" : ""}`}
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
