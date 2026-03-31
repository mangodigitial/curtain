import type { TestimonialSection } from "./types";

/* ─── Main Export ─────────────────────────────────────── */

export default function Testimonial({
  data,
}: {
  data: TestimonialSection;
}) {
  const isDark = data.background === "dark";

  return (
    <section
      className={`px-12 py-24 text-center ${
        isDark ? "bg-ocean-deep" : "bg-sand-light"
      }`}
    >
      <div className="mx-auto max-w-[700px]">
        {/* Quote mark */}
        <p
          className={`mb-6 font-heading text-[5rem] leading-[0.5] opacity-50 ${
            isDark ? "text-gold" : "text-gold"
          }`}
          aria-hidden="true"
        >
          &ldquo;
        </p>

        {/* Quote text */}
        <blockquote
          className={`mb-6 font-heading text-[clamp(1.3rem,2.5vw,1.7rem)] font-light italic leading-relaxed ${
            isDark ? "text-sand" : "text-ocean-deep"
          }`}
        >
          {data.quote}
        </blockquote>

        {/* Author */}
        <p
          className={`text-[0.7rem] uppercase tracking-[0.2em] ${
            isDark ? "text-sand-dark" : "text-text-light"
          }`}
        >
          {data.author}
        </p>

        {/* Optional CTA */}
        {data.cta && (
          <a
            href={data.cta.url}
            className="mt-6 inline-flex items-center gap-2 border border-white/10 px-5 py-2.5 text-[0.6rem] uppercase tracking-[0.2em] text-gold-light transition-colors hover:border-gold-light"
          >
            {data.cta.label}
          </a>
        )}
      </div>
    </section>
  );
}
