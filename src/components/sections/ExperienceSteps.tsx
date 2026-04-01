import type { ExperienceStepsSection } from "./types";

export default function ExperienceSteps({
  data,
}: {
  data: ExperienceStepsSection;
}) {
  return (
    <section className="exp-steps">
      <div className="exp-steps-inner">
        {data.steps.map((step, i) => (
          <div key={i} className="exp-step">
            <span className="exp-step-num">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
