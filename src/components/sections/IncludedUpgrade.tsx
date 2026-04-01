import type { IncludedUpgradeSection } from "./types";

export default function IncludedUpgrade({
  data,
}: {
  data: IncludedUpgradeSection;
}) {
  return (
    <section className="incl-upgrade">
      <div className="incl-upgrade-inner">
        {/* Included Column */}
        <div>
          <h3 className="incl-col-title">
            {data.includedTitle}
            {data.includedTitleItalic && (
              <>
                {" "}
                <em>{data.includedTitleItalic}</em>
              </>
            )}
          </h3>

          {data.includedNote && (
            <p className="incl-note">{data.includedNote}</p>
          )}

          <ul className="incl-list">
            {(data?.includedItems ?? []).map((item) => (
              <li key={item} className="incl-item">
                <span className="check">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Upgrade Column */}
        <div>
          <h3 className="incl-col-title upgrade-col-title">
            {data.upgradeTitle}
            {data.upgradeTitleItalic && (
              <>
                {" "}
                <em>{data.upgradeTitleItalic}</em>
              </>
            )}
          </h3>

          {data.upgradeNote && (
            <p className="upgrade-note">{data.upgradeNote}</p>
          )}

          <ul className="upgrade-list">
            {(data?.upgradeItems ?? []).map((item) => (
              <li key={item} className="upgrade-item">
                <span className="plus">+</span>
                {item}
              </li>
            ))}
          </ul>

          {data?.cta && (
            <a href={data?.cta?.url} className="upgrade-cta">
              {data?.cta?.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
