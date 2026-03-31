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
    <section className="mx-auto max-w-[800px] px-12 py-16">
      {data.title && (
        <h2 className="mb-8 font-heading text-[clamp(1.6rem,2.5vw,2.2rem)] font-light text-ocean-deep">
          {data.title}
        </h2>
      )}

      <div>
        {data.items.map((item, i) => {
          const isOpen = openIndex === i;

          return (
            <div key={i} className="border-b border-sand-dark">
              <button
                type="button"
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between py-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-heading text-[1.1rem] font-normal text-ocean-deep">
                  {item.question}
                </span>

                {/* Chevron */}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className={`flex-shrink-0 text-ocean-deep transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
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
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? "max-h-[500px] pb-5" : "max-h-0"
                }`}
              >
                <p className="text-[0.85rem] font-light leading-relaxed text-text-light">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
