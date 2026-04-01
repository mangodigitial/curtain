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
        <p className="testimonial-mark" aria-hidden="true">&ldquo;</p>
        <blockquote className="testimonial-quote">{data.quote}</blockquote>
        <cite className="testimonial-author">&mdash; {data.author}</cite>

        {data.cta && (
          <div className="mt-6">
            <a href={data.cta.url} className="btn-line">
              {data.cta.label} <span className="arrow"></span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
