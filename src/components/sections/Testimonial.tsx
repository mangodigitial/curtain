import type { TestimonialSection } from "./types";

/* ─── Main Export ─────────────────────────────────────── */

export default function Testimonial({
  data,
}: {
  data: TestimonialSection;
}) {
  return (
    <section className="charity reveal">
      <div className="charity-inner">
        {/* Quote mark */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "5rem",
            color: "var(--color-gold)",
            opacity: 0.5,
            lineHeight: 0.5,
            marginBottom: "1.5rem",
          }}
          aria-hidden="true"
        >
          &ldquo;
        </p>

        {/* Quote text */}
        <blockquote
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)",
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 1.6,
            color: "var(--color-sand)",
            marginBottom: "1.5rem",
          }}
        >
          {data.quote}
        </blockquote>

        {/* Author */}
        <cite
          style={{
            fontStyle: "normal",
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "var(--color-sand-dark)",
          }}
        >
          &mdash; {data.author}
        </cite>

        {/* Optional CTA */}
        {data.cta && (
          <div style={{ marginTop: "1.5rem" }}>
            <a href={data.cta.url} className="btn-line" style={{ color: "var(--color-gold-light)" }}>
              {data.cta.label} <span className="arrow"></span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
