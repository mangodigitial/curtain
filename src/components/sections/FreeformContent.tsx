import type { FreeformContentSection } from "./types";

/* ─── Main Export ─────────────────────────────────────── */

export default function FreeformContent({
  data,
}: {
  data: FreeformContentSection;
}) {
  return (
    <section className="mx-auto max-w-[800px] px-12 py-16">
      <div
        className={[
          /* headings */
          "[&_h1]:mb-4 [&_h1]:font-heading [&_h1]:text-[1.8rem] [&_h1]:font-light [&_h1]:text-ocean-deep",
          "[&_h2]:mb-4 [&_h2]:font-heading [&_h2]:text-[1.5rem] [&_h2]:font-light [&_h2]:text-ocean-deep",
          "[&_h3]:mb-3 [&_h3]:font-heading [&_h3]:text-[1.25rem] [&_h3]:font-light [&_h3]:text-ocean-deep",
          "[&_h4]:mb-3 [&_h4]:font-heading [&_h4]:text-[1.1rem] [&_h4]:font-normal [&_h4]:text-ocean-deep",
          /* paragraphs */
          "[&_p]:mb-5 [&_p]:text-[0.88rem] [&_p]:font-light [&_p]:leading-[1.85] [&_p]:text-text-light",
          /* links */
          "[&_a]:text-ocean-deep [&_a]:underline",
          /* lists */
          "[&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-[0.88rem] [&_ul]:font-light [&_ul]:leading-[1.85] [&_ul]:text-text-light",
          "[&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:text-[0.88rem] [&_ol]:font-light [&_ol]:leading-[1.85] [&_ol]:text-text-light",
          /* blockquote */
          "[&_blockquote]:border-l-2 [&_blockquote]:border-gold/30 [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-text-light",
        ].join(" ")}
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </section>
  );
}
