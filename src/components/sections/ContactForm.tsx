"use client";

import { useState } from "react";
import type { ContactFormSection } from "./types";

/* ─── Main Export ─────────────────────────────────────── */

export default function ContactForm({
  data,
}: {
  data: ContactFormSection;
}) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formType: data.formType ?? "contact",
        data: formData,
      }),
    });
  };

  return (
    <div className="bg-white p-12 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
      {data.title && (
        <h3 className="mb-1.5 font-heading text-[1.6rem] font-normal text-ocean-deep">
          {data.title}
        </h3>
      )}

      {data.subtitle && (
        <p className="mb-8 text-[0.75rem] font-light text-text-light">
          {data.subtitle}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {data.fields.map((field) => {
            const spanClass = field.halfWidth ? "" : "md:col-span-2";

            return (
              <div key={field.name} className={spanClass}>
                <label className="mb-1.5 block text-[0.58rem] font-medium uppercase tracking-[0.2em] text-text-light">
                  {field.label}
                  {field.required && " *"}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    required={field.required}
                    onChange={handleChange}
                    className="min-h-[80px] w-full resize-y border border-sand-dark bg-transparent p-3 font-body text-[0.82rem] font-light text-text outline-none transition placeholder:text-sand-dark focus:border-ocean-deep"
                  />
                ) : field.type === "select" ? (
                  <select
                    name={field.name}
                    required={field.required}
                    onChange={handleChange}
                    defaultValue=""
                    className="w-full appearance-none border-b border-sand-dark bg-transparent py-3 font-body text-[0.82rem] font-light text-text outline-none transition placeholder:text-sand-dark focus:border-ocean-deep"
                  >
                    <option value="" disabled>
                      Select...
                    </option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    required={field.required}
                    onChange={handleChange}
                    className="w-full border-b border-sand-dark bg-transparent py-3 font-body text-[0.82rem] font-light text-text outline-none transition placeholder:text-sand-dark focus:border-ocean-deep"
                  />
                )}
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          className="mt-6 w-full border-none bg-ocean-deep py-3.5 text-[0.6rem] font-medium uppercase tracking-[0.3em] text-sand transition-colors hover:bg-coral"
        >
          {data.submitLabel ?? "Send Message"}
        </button>
      </form>
    </div>
  );
}
