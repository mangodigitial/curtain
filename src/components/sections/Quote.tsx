import type { QuoteSection } from "./types";

/* ─── Main Export ─────────────────────────────────────── */

export default function Quote({ data }: { data: QuoteSection }) {
  const isDark = data.background === "dark";

  return (
    <section
      className={`px-12 py-20 text-center ${
        isDark ? "bg-ocean-deep" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-[750px]">
        {/* Quote mark */}
        <p
          className="mb-6 font-heading text-[5rem] leading-[0.5] text-gold opacity-50"
          aria-hidden="true"
        >
          &ldquo;
        </p>

        {/* Quote text */}
        <blockquote
          className={`mb-5 font-heading text-[clamp(1.2rem,2.2vw,1.55rem)] font-light italic leading-relaxed ${
            isDark ? "text-sand" : "text-ocean-deep"
          }`}
        >
          {data.quote}
        </blockquote>

        {/* Author */}
        {data.author && (
          <p
            className={`text-[0.7rem] uppercase tracking-[0.2em] ${
              isDark ? "text-sand-dark" : "text-text-light"
            }`}
          >
            {data.author}
          </p>
        )}
      </div>
    </section>
  );
}
