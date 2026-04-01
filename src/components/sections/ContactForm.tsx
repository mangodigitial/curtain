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
    <div className="form-card">
      {data.title && <h2>{data.title}</h2>}
      {data.subtitle && <p className="form-sub">{data.subtitle}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          {data.fields.map((field) => (
            <div
              key={field.name}
              className={`form-group${field.halfWidth ? "" : " full"}`}
            >
              <label className="form-label">
                {field.label}
                {field.required && " *"}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  required={field.required}
                  onChange={handleChange}
                  className="form-textarea"
                />
              ) : field.type === "select" ? (
                <select
                  name={field.name}
                  required={field.required}
                  onChange={handleChange}
                  defaultValue=""
                  className="form-select"
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
                  className="form-input"
                />
              )}
            </div>
          ))}
        </div>

        <button type="submit" className="form-submit">
          {data.submitLabel ?? "Send Message"}
        </button>
      </form>
    </div>
  );
}
