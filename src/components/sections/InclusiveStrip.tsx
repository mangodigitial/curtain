import type { InclusiveStripSection } from "./types";

export default function InclusiveStrip({
  data,
}: {
  data: InclusiveStripSection;
}) {
  return (
    <section className="inclusive-strip">
      <div className="inclusive-strip-inner">
        {data.items.map((item, i) => (
          <div key={i} className="inclusive-item">
            <span className="inclusive-icon">{item.icon}</span>
            <span className="inclusive-text">
              <strong>{item.title}</strong>
              {item.subtitle}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
