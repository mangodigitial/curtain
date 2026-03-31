import type { ContactInfoSection } from "./types";

/* ─── Main Export ─────────────────────────────────────── */

export default function ContactInfo({
  data,
}: {
  data: ContactInfoSection;
}) {
  return (
    <div className="pt-4">
      {data.sections.map((section, sIdx) => (
        <div key={section.title}>
          <div className="mb-10">
            <h3 className="mb-4 font-heading text-[1.25rem] font-normal text-ocean-deep">
              {section.title}
            </h3>

            {section.items.map((item) => (
              <div key={item.label} className="mb-5">
                <p className="mb-1 text-[0.55rem] font-medium uppercase tracking-[0.25em] text-gold">
                  {item.label}
                </p>
                {item.url ? (
                  <a
                    href={item.url}
                    className="text-[0.85rem] font-light leading-relaxed text-ocean-deep transition-colors hover:text-coral"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-[0.85rem] font-light leading-relaxed text-text">
                    {item.value}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Divider between sections (not after the last) */}
          {sIdx < data.sections.length - 1 && (
            <div className="my-8 h-px w-full bg-sand-dark" />
          )}
        </div>
      ))}

      {/* ── Press Contacts ──────────────────────────────── */}
      {data.pressContacts && data.pressContacts.length > 0 && (
        <>
          <div className="my-8 h-px w-full bg-sand-dark" />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {data.pressContacts.map((contact) => (
              <div key={contact.email} className="bg-sand-light p-5">
                <h4 className="mb-1 font-heading text-base text-ocean-deep">
                  {contact.title}
                </h4>
                <p className="mb-1 text-[0.72rem] font-light text-text-light">
                  {contact.role}
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-[0.68rem] text-ocean-deep transition-colors hover:text-coral"
                >
                  {contact.email}
                </a>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
