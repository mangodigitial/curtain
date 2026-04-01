"use client";

import { useState } from "react";
import type { AccordionSection } from "./types";

/* ─── Main Export ─────────────────────────────────────── */

export default function Accordion({ data }: { data: AccordionSection }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section className="faq">
      {data.title && (
        <h2 className="faq-title">
          {data.title}
        </h2>
      )}

      <div>
        {(data?.items ?? []).map((item, i) => {
          const isOpen = openIndex === i;

          return (
            <div key={i} className="faq-item">
              <button
                type="button"
                onClick={() => toggle(i)}
                className="faq-question"
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>

                {/* Chevron */}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className={"faq-chevron" + (isOpen ? " open" : "")}
                  aria-hidden="true"
                >
                  <path
                    d="M3 5.5L7 9.5L11 5.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Answer */}
              <div className={"faq-answer" + (isOpen ? " open" : "")}>
                <p>{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
