import type { EmbedSection } from "./types";

/* ─── Main Export ─────────────────────────────────────── */

export default function Embed({ data }: { data: EmbedSection }) {
  const ratio = data.aspectRatio ?? "16/9";

  return (
    <section className="mx-auto max-w-[1200px] px-12 py-8">
      <div
        className="overflow-hidden"
        style={{ aspectRatio: ratio }}
        dangerouslySetInnerHTML={{ __html: data.code }}
      />
    </section>
  );
}
