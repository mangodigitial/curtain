import type { ExperienceStepsSection } from "./types";

/* ─── Main Export ─────────────────────────────────────── */

export default function ExperienceSteps({
  data,
}: {
  data: ExperienceStepsSection;
}) {
  return (
    <section className="relative bg-ocean-deep px-12 py-20">
      {/* Subtle radial gradient background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 70% 40%, rgba(138,154,123,0.08), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto grid max-w-[1100px] grid-cols-1 gap-8 md:grid-cols-3">
        {data.steps.map((step, i) => (
          <div key={i} className="px-4 text-center">
            <span className="mb-2 block font-heading text-[3rem] font-light leading-none text-gold-light/40">
              {step.number}
            </span>
            <h3 className="mb-2 font-heading text-[1.3rem] font-normal text-sand">
              {step.title}
            </h3>
            <p className="text-[0.78rem] font-light leading-relaxed text-sand-dark">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
