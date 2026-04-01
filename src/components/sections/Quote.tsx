import type { QuoteSection } from "./types";

/* ─── Main Export ─────────────────────────────────────── */

export default function Quote({ data }: { data: QuoteSection }) {
  const isDark = data.background === "dark";

  return (
    <section className={`quote-section ${isDark ? "dark" : "light"}`}>
      <div className="quote-inner">
        <p className="quote-mark" aria-hidden="true">&ldquo;</p>
        <blockquote className="quote-text">{data.quote}</blockquote>
        {data.author && (
          <p className="quote-author">&mdash; {data.author}</p>
        )}
      </div>
    </section>
  );
}
