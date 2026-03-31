import type { IntroSplitSection } from "./types";
import { renderTitle } from "./render-title";

/* ─── Main Export ─────────────────────────────────────── */

export default function IntroSplit({ data }: { data: IntroSplitSection }) {
  const { sidebar } = data;

  return (
    <section className="px-12 py-20">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Text column */}
        <div>
          <h2 className="mb-5 font-heading text-[clamp(1.8rem,3vw,2.6rem)] font-light text-ocean-deep">
            {renderTitle(data.title, data.titleItalic)}
          </h2>

          <div
            className="text-[0.88rem] font-light leading-[1.85] text-text-light [&_p]:mb-4"
            dangerouslySetInnerHTML={{ __html: data.body }}
          />
        </div>

        {/* Sidebar */}
        <aside className="sticky top-[100px] self-start bg-sand-light p-8">
          <h3 className="mb-5 font-heading text-[1.2rem] font-normal text-ocean-deep">
            {sidebar.heading}
          </h3>

          <div>
            {sidebar.items.map((item, i) => (
              <div
                key={i}
                className="flex items-baseline gap-3 border-b border-sand-dark py-2.5"
              >
                {item.icon && (
                  <span className="w-4 text-[0.65rem] text-gold">
                    {item.icon}
                  </span>
                )}
                <span className="min-w-[70px] text-[0.6rem] font-medium uppercase tracking-[0.15em] text-text-light">
                  {item.label}
                </span>
                <span className="text-[0.78rem] font-light text-text">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {sidebar.cta && (
            <a
              href={sidebar.cta.url}
              className="mt-6 block border border-ocean-deep py-3 text-center text-[0.6rem] font-medium uppercase tracking-[0.25em] text-ocean-deep transition-colors hover:bg-ocean-deep hover:text-sand"
            >
              {sidebar.cta.label}
            </a>
          )}
        </aside>
      </div>
    </section>
  );
}
