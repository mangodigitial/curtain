import type { DetailColumnsSection } from "./types";

/* ─── Helper: render title with italic spans ─────────── */

function renderTitle(title: string, titleItalic?: string) {
  if (!titleItalic) return title;

  const parts = title.split(titleItalic);
  if (parts.length < 2) return title;

  return (
    <>
      {parts[0]}
      <em className="text-coral">{titleItalic}</em>
      {parts.slice(1).join(titleItalic)}
    </>
  );
}

/* ─── Main Export ─────────────────────────────────────── */

export default function DetailColumns({
  data,
}: {
  data: DetailColumnsSection;
}) {
  return (
    <section className="bg-sand-light px-12 py-20">
      <div className="mx-auto max-w-[800px]">
        {/* Title */}
        <h2 className="mb-5 font-heading text-[clamp(1.6rem,2.5vw,2.2rem)] font-light leading-tight text-ocean-deep">
          {renderTitle(data.title, data.titleItalic)}
        </h2>

        {/* Columns */}
        <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-4 md:grid-cols-2">
          {data.columns.map((column, i) => (
            <div
              key={i}
              className="text-[0.88rem] font-light leading-[1.85] text-text-light [&_p]:mb-3"
              dangerouslySetInnerHTML={{ __html: column }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
