import type { IntroSplitSection } from "./types";
import { renderTitle } from "./render-title";

/* ─── Main Export ─────────────────────────────────────── */

export default function IntroSplit({ data }: { data: IntroSplitSection }) {
  const { sidebar } = data;

  return (
    <section className="intro-split">
      <div className="intro-split-inner">
        {/* Text column */}
        <div>
          <h2 className="section-heading">
            {renderTitle(data.title, data.titleItalic, "")}
          </h2>

          <div
            className="intro-split-body"
            dangerouslySetInnerHTML={{ __html: data.body }}
          />
        </div>

        {/* Sidebar */}
        <aside className="sidebar-card">
          <h3>{sidebar?.heading}</h3>

          <div>
            {(sidebar?.items ?? []).map((item, i) => (
              <div key={i} className="sidebar-item">
                {item.icon && (
                  <span className="sidebar-item-icon">{item.icon}</span>
                )}
                <span className="sidebar-item-label">{item.label}</span>
                <span className="sidebar-item-value">{item.value}</span>
              </div>
            ))}
          </div>

          {sidebar?.cta && (
            <a href={sidebar?.cta?.url} className="sidebar-cta">
              {sidebar?.cta?.label}
            </a>
          )}
        </aside>
      </div>
    </section>
  );
}
