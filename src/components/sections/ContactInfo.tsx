import type { ContactInfoSection } from "./types";

export default function ContactInfo({
  data,
}: {
  data: ContactInfoSection;
}) {
  return (
    <div className="info-panel">
      {data.sections.map((section, sIdx) => (
        <div key={section.title}>
          <div className="info-section">
            <h3>{section.title}</h3>

            {section.items.map((item) => (
              <div key={item.label} className="info-item">
                <p className="info-label">{item.label}</p>
                {item.url ? (
                  <div className="info-val">
                    <a href={item.url}>{item.value}</a>
                  </div>
                ) : (
                  <p className="info-val">{item.value}</p>
                )}
              </div>
            ))}
          </div>

          {sIdx < data.sections.length - 1 && (
            <div className="info-divider" />
          )}
        </div>
      ))}

      {data.pressContacts && data.pressContacts.length > 0 && (
        <>
          <div className="info-divider" />

          <div className="press-grid">
            {data.pressContacts.map((contact) => (
              <div key={contact.email} className="press-card">
                <h4>{contact.title}</h4>
                <p>{contact.role}</p>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
