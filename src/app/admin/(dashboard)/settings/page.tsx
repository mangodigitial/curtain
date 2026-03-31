"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, X } from "lucide-react";

/* ──────────────────────────────────────────────────────────
   Types
   ────────────────────────────────────────────────────────── */

interface CustomScript {
  location: "head" | "body";
  code: string;
}

interface PhoneNumber {
  label: string;
  number: string;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface Settings {
  id: string;
  name: string;
  domain: string;
  branding: {
    colors: Record<string, string>;
    fonts: { heading: string; body: string };
    border_radius: string;
  };
  seoDefaults: {
    title_suffix: string;
    default_description: string;
    google_site_verification: string;
    bing_site_verification: string;
  };
  analytics: {
    ga4_id: string;
    gtm_id: string;
    fb_pixel_id: string;
    hotjar_id: string;
    custom_scripts: CustomScript[];
  };
  contact: {
    email: string;
    phone_numbers: PhoneNumber[];
    address_lines: string[];
    coordinates: { lat: number; lng: number };
    social_links: SocialLink[];
  };
  integrations: {
    booking_engine: { provider: string; url: string; widget_code: string };
    newsletter: { provider: string; api_key: string; list_id: string };
    reviews: { tripadvisor_id: string; google_place_id: string };
    chat_widget: { provider: string; code: string };
  };
  legal: {
    cookie_policy_url: string;
    privacy_policy_url: string;
    terms_url: string;
    cookie_consent: { enabled: boolean; message: string };
  };
  announcementBar: {
    enabled: boolean;
    message: string;
    link_url: string;
    link_text: string;
    visible_from: string;
    visible_to: string;
  };
}

/* ──────────────────────────────────────────────────────────
   Constants
   ────────────────────────────────────────────────────────── */

const TABS = [
  "Branding",
  "SEO Defaults",
  "Analytics",
  "Contact",
  "Integrations",
  "Legal",
  "Announcement Bar",
] as const;

type Tab = (typeof TABS)[number];

const HEADING_FONTS = [
  "Cormorant Garamond",
  "Playfair Display",
  "EB Garamond",
  "Lora",
];

const BODY_FONTS = ["Libre Franklin", "Inter", "Open Sans", "Raleway"];

const SOCIAL_PLATFORMS = [
  "instagram",
  "facebook",
  "twitter",
  "linkedin",
  "youtube",
  "tiktok",
];

const NEWSLETTER_PROVIDERS = ["none", "mailchimp", "sendinblue"];

/* ──────────────────────────────────────────────────────────
   Shared input styles
   ────────────────────────────────────────────────────────── */

const inputClass =
  "w-full border border-sand-dark/30 rounded px-3 py-2 text-sm focus:outline-none focus:border-ocean-deep";

const selectClass =
  "w-full border border-sand-dark/30 rounded px-3 py-2 text-sm focus:outline-none focus:border-ocean-deep bg-white";

const textareaClass =
  "w-full border border-sand-dark/30 rounded px-3 py-2 text-sm focus:outline-none focus:border-ocean-deep min-h-[80px] resize-y";

/* ──────────────────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────────────────── */

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-ocean-deep mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-text-light">{description}</p>
      )}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium text-text mb-1.5">
      {children}
    </label>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-shrink-0 p-1.5 text-text-light hover:text-coral transition rounded hover:bg-coral/5"
      aria-label="Remove"
    >
      <X size={16} />
    </button>
  );
}

function AddButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 text-sm text-ocean-light hover:text-ocean-deep transition mt-2"
    >
      <Plus size={14} />
      {label}
    </button>
  );
}

/* ──────────────────────────────────────────────────────────
   Color Field with swatch
   ────────────────────────────────────────────────────────── */

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <span
          className="w-8 h-8 rounded border border-sand-dark/30 flex-shrink-0"
          style={{ backgroundColor: value || "#ffffff" }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className={inputClass}
        />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Main Page Component
   ────────────────────────────────────────────────────────── */

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("Branding");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings(normalizeSettings(data));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /** Ensure all nested objects exist with proper defaults */
  function normalizeSettings(raw: Record<string, unknown>): Settings {
    const b = (raw.branding ?? {}) as Record<string, unknown>;
    const s = (raw.seoDefaults ?? {}) as Record<string, unknown>;
    const a = (raw.analytics ?? {}) as Record<string, unknown>;
    const c = (raw.contact ?? {}) as Record<string, unknown>;
    const i = (raw.integrations ?? {}) as Record<string, unknown>;
    const l = (raw.legal ?? {}) as Record<string, unknown>;
    const ab = (raw.announcementBar ?? {}) as Record<string, unknown>;
    const cc = (l.cookie_consent ?? {}) as Record<string, unknown>;
    const be = (i.booking_engine ?? {}) as Record<string, unknown>;
    const nl = (i.newsletter ?? {}) as Record<string, unknown>;
    const rv = (i.reviews ?? {}) as Record<string, unknown>;
    const cw = (i.chat_widget ?? {}) as Record<string, unknown>;
    const colors = (b.colors ?? {}) as Record<string, string>;
    const fonts = (b.fonts ?? {}) as Record<string, string>;
    const coords = (c.coordinates ?? {}) as Record<string, number>;

    return {
      id: (raw.id as string) ?? "",
      name: (raw.name as string) ?? "Hotel Name",
      domain: (raw.domain as string) ?? "example.com",
      branding: {
        colors: {
          primary: colors.primary ?? "#1a3c5e",
          secondary: colors.secondary ?? "#2d6a8f",
          accent: colors.accent ?? "#d4a853",
          text: colors.text ?? "#2c2c2c",
          background: colors.background ?? "#faf8f5",
        },
        fonts: {
          heading: fonts.heading ?? "Cormorant Garamond",
          body: fonts.body ?? "Libre Franklin",
        },
        border_radius: (b.border_radius as string) ?? "8px",
      },
      seoDefaults: {
        title_suffix: (s.title_suffix as string) ?? "",
        default_description: (s.default_description as string) ?? "",
        google_site_verification:
          (s.google_site_verification as string) ?? "",
        bing_site_verification: (s.bing_site_verification as string) ?? "",
      },
      analytics: {
        ga4_id: (a.ga4_id as string) ?? "",
        gtm_id: (a.gtm_id as string) ?? "",
        fb_pixel_id: (a.fb_pixel_id as string) ?? "",
        hotjar_id: (a.hotjar_id as string) ?? "",
        custom_scripts: (a.custom_scripts as CustomScript[]) ?? [],
      },
      contact: {
        email: (c.email as string) ?? "",
        phone_numbers: (c.phone_numbers as PhoneNumber[]) ?? [],
        address_lines: (c.address_lines as string[]) ?? [],
        coordinates: {
          lat: coords.lat ?? 0,
          lng: coords.lng ?? 0,
        },
        social_links: (c.social_links as SocialLink[]) ?? [],
      },
      integrations: {
        booking_engine: {
          provider: (be.provider as string) ?? "",
          url: (be.url as string) ?? "",
          widget_code: (be.widget_code as string) ?? "",
        },
        newsletter: {
          provider: (nl.provider as string) ?? "none",
          api_key: (nl.api_key as string) ?? "",
          list_id: (nl.list_id as string) ?? "",
        },
        reviews: {
          tripadvisor_id: (rv.tripadvisor_id as string) ?? "",
          google_place_id: (rv.google_place_id as string) ?? "",
        },
        chat_widget: {
          provider: (cw.provider as string) ?? "",
          code: (cw.code as string) ?? "",
        },
      },
      legal: {
        cookie_policy_url: (l.cookie_policy_url as string) ?? "",
        privacy_policy_url: (l.privacy_policy_url as string) ?? "",
        terms_url: (l.terms_url as string) ?? "",
        cookie_consent: {
          enabled: (cc.enabled as boolean) ?? false,
          message: (cc.message as string) ?? "",
        },
      },
      announcementBar: {
        enabled: (ab.enabled as boolean) ?? false,
        message: (ab.message as string) ?? "",
        link_url: (ab.link_url as string) ?? "",
        link_text: (ab.link_text as string) ?? "",
        visible_from: (ab.visible_from as string) ?? "",
        visible_to: (ab.visible_to as string) ?? "",
      },
    };
  }

  const update = useCallback(
    <K extends keyof Settings>(key: K, value: Settings[K]) => {
      setSettings((prev) => (prev ? { ...prev, [key]: value } : prev));
    },
    []
  );

  async function handleSave() {
    if (!settings) return;
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        const updated = await res.json();
        setSettings(normalizeSettings(updated));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-text-light text-sm">
        Loading settings...
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-64 text-coral text-sm">
        Failed to load settings.
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {/* Header row */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl font-semibold text-ocean-deep">
          Settings
        </h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-ocean-deep text-white px-6 py-2.5 rounded text-sm font-medium hover:bg-ocean-deep/90 transition disabled:opacity-60"
        >
          {saving ? "Saving..." : saved ? "Saved!" : "Save All"}
        </button>
      </div>

      {/* Tab bar */}
      <div className="flex gap-0 border-b border-sand-dark/20 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "border-ocean-deep text-ocean-deep"
                : "border-transparent text-text-light hover:text-text"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="max-w-2xl">
        {activeTab === "Branding" && (
          <BrandingTab settings={settings} update={update} />
        )}
        {activeTab === "SEO Defaults" && (
          <SeoTab settings={settings} update={update} />
        )}
        {activeTab === "Analytics" && (
          <AnalyticsTab settings={settings} update={update} />
        )}
        {activeTab === "Contact" && (
          <ContactTab settings={settings} update={update} />
        )}
        {activeTab === "Integrations" && (
          <IntegrationsTab settings={settings} update={update} />
        )}
        {activeTab === "Legal" && (
          <LegalTab settings={settings} update={update} />
        )}
        {activeTab === "Announcement Bar" && (
          <AnnouncementTab settings={settings} update={update} />
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Tab Props
   ────────────────────────────────────────────────────────── */

interface TabProps {
  settings: Settings;
  update: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}

/* ──────────────────────────────────────────────────────────
   BRANDING TAB
   ────────────────────────────────────────────────────────── */

function BrandingTab({ settings, update }: TabProps) {
  const { branding } = settings;

  function setColor(key: string, value: string) {
    update("branding", {
      ...branding,
      colors: { ...branding.colors, [key]: value },
    });
  }

  return (
    <div className="space-y-10">
      <div>
        <SectionHeading
          title="Colors"
          description="Define the color palette used across the site."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ColorField
            label="Primary"
            value={branding.colors.primary}
            onChange={(v) => setColor("primary", v)}
          />
          <ColorField
            label="Secondary"
            value={branding.colors.secondary}
            onChange={(v) => setColor("secondary", v)}
          />
          <ColorField
            label="Accent"
            value={branding.colors.accent}
            onChange={(v) => setColor("accent", v)}
          />
          <ColorField
            label="Text"
            value={branding.colors.text}
            onChange={(v) => setColor("text", v)}
          />
          <ColorField
            label="Background"
            value={branding.colors.background}
            onChange={(v) => setColor("background", v)}
          />
        </div>
      </div>

      <div>
        <SectionHeading
          title="Typography"
          description="Choose font families for headings and body text."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Heading Font</Label>
            <select
              value={branding.fonts.heading}
              onChange={(e) =>
                update("branding", {
                  ...branding,
                  fonts: { ...branding.fonts, heading: e.target.value },
                })
              }
              className={selectClass}
            >
              {HEADING_FONTS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Body Font</Label>
            <select
              value={branding.fonts.body}
              onChange={(e) =>
                update("branding", {
                  ...branding,
                  fonts: { ...branding.fonts, body: e.target.value },
                })
              }
              className={selectClass}
            >
              {BODY_FONTS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <SectionHeading
          title="Border Radius"
          description="Global border radius for buttons and cards."
        />
        <div className="max-w-xs">
          <Label>Border Radius</Label>
          <input
            type="text"
            value={branding.border_radius}
            onChange={(e) =>
              update("branding", {
                ...branding,
                border_radius: e.target.value,
              })
            }
            placeholder="8px"
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   SEO DEFAULTS TAB
   ────────────────────────────────────────────────────────── */

function SeoTab({ settings, update }: TabProps) {
  const { seoDefaults } = settings;

  function set(key: keyof Settings["seoDefaults"], value: string) {
    update("seoDefaults", { ...seoDefaults, [key]: value });
  }

  return (
    <div className="space-y-10">
      <div>
        <SectionHeading
          title="SEO Defaults"
          description="Fallback SEO values used when pages don't specify their own."
        />
        <div className="space-y-4">
          <div>
            <Label>Title Suffix</Label>
            <input
              type="text"
              value={seoDefaults.title_suffix}
              onChange={(e) => set("title_suffix", e.target.value)}
              placeholder=" — Curtain Bluff, Antigua"
              className={inputClass}
            />
          </div>
          <div>
            <Label>Default Meta Description</Label>
            <textarea
              value={seoDefaults.default_description}
              onChange={(e) => set("default_description", e.target.value)}
              placeholder="A luxury resort on the shores of Antigua..."
              className={textareaClass}
            />
          </div>
          <div>
            <Label>Google Site Verification</Label>
            <input
              type="text"
              value={seoDefaults.google_site_verification}
              onChange={(e) => set("google_site_verification", e.target.value)}
              placeholder="Verification code"
              className={inputClass}
            />
          </div>
          <div>
            <Label>Bing Site Verification</Label>
            <input
              type="text"
              value={seoDefaults.bing_site_verification}
              onChange={(e) => set("bing_site_verification", e.target.value)}
              placeholder="Verification code"
              className={inputClass}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   ANALYTICS TAB
   ────────────────────────────────────────────────────────── */

function AnalyticsTab({ settings, update }: TabProps) {
  const { analytics } = settings;

  function set(
    key: "ga4_id" | "gtm_id" | "fb_pixel_id" | "hotjar_id",
    value: string
  ) {
    update("analytics", { ...analytics, [key]: value });
  }

  function setScript(index: number, field: keyof CustomScript, value: string) {
    const scripts = [...analytics.custom_scripts];
    scripts[index] = { ...scripts[index], [field]: value };
    update("analytics", { ...analytics, custom_scripts: scripts });
  }

  function addScript() {
    update("analytics", {
      ...analytics,
      custom_scripts: [
        ...analytics.custom_scripts,
        { location: "head" as const, code: "" },
      ],
    });
  }

  function removeScript(index: number) {
    const scripts = analytics.custom_scripts.filter((_, i) => i !== index);
    update("analytics", { ...analytics, custom_scripts: scripts });
  }

  return (
    <div className="space-y-10">
      <div>
        <SectionHeading
          title="Tracking IDs"
          description="Third-party analytics and tracking identifiers."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>GA4 Measurement ID</Label>
            <input
              type="text"
              value={analytics.ga4_id}
              onChange={(e) => set("ga4_id", e.target.value)}
              placeholder="G-XXXXXXXXXX"
              className={inputClass}
            />
          </div>
          <div>
            <Label>GTM Container ID</Label>
            <input
              type="text"
              value={analytics.gtm_id}
              onChange={(e) => set("gtm_id", e.target.value)}
              placeholder="GTM-XXXXXXX"
              className={inputClass}
            />
          </div>
          <div>
            <Label>Facebook Pixel ID</Label>
            <input
              type="text"
              value={analytics.fb_pixel_id}
              onChange={(e) => set("fb_pixel_id", e.target.value)}
              placeholder="Pixel ID"
              className={inputClass}
            />
          </div>
          <div>
            <Label>Hotjar Site ID</Label>
            <input
              type="text"
              value={analytics.hotjar_id}
              onChange={(e) => set("hotjar_id", e.target.value)}
              placeholder="Site ID"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div>
        <SectionHeading
          title="Custom Scripts"
          description="Inject custom code into the head or body of every page."
        />
        <div className="space-y-3">
          {analytics.custom_scripts.map((script, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 bg-sand-light/50 rounded border border-sand-dark/10"
            >
              <div className="flex-1 space-y-2">
                <select
                  value={script.location}
                  onChange={(e) => setScript(i, "location", e.target.value)}
                  className={selectClass}
                >
                  <option value="head">Head</option>
                  <option value="body">Body</option>
                </select>
                <textarea
                  value={script.code}
                  onChange={(e) => setScript(i, "code", e.target.value)}
                  placeholder="<script>...</script>"
                  className={textareaClass + " font-mono text-xs"}
                />
              </div>
              <RemoveButton onClick={() => removeScript(i)} />
            </div>
          ))}
          <AddButton onClick={addScript} label="Add script" />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   CONTACT TAB
   ────────────────────────────────────────────────────────── */

function ContactTab({ settings, update }: TabProps) {
  const { contact } = settings;

  /* Phone numbers */
  function setPhone(index: number, field: keyof PhoneNumber, value: string) {
    const phones = [...contact.phone_numbers];
    phones[index] = { ...phones[index], [field]: value };
    update("contact", { ...contact, phone_numbers: phones });
  }
  function addPhone() {
    update("contact", {
      ...contact,
      phone_numbers: [...contact.phone_numbers, { label: "", number: "" }],
    });
  }
  function removePhone(index: number) {
    update("contact", {
      ...contact,
      phone_numbers: contact.phone_numbers.filter((_, i) => i !== index),
    });
  }

  /* Address lines */
  function setAddress(index: number, value: string) {
    const lines = [...contact.address_lines];
    lines[index] = value;
    update("contact", { ...contact, address_lines: lines });
  }
  function addAddress() {
    update("contact", {
      ...contact,
      address_lines: [...contact.address_lines, ""],
    });
  }
  function removeAddress(index: number) {
    update("contact", {
      ...contact,
      address_lines: contact.address_lines.filter((_, i) => i !== index),
    });
  }

  /* Social links */
  function setSocial(index: number, field: keyof SocialLink, value: string) {
    const links = [...contact.social_links];
    links[index] = { ...links[index], [field]: value };
    update("contact", { ...contact, social_links: links });
  }
  function addSocial() {
    update("contact", {
      ...contact,
      social_links: [
        ...contact.social_links,
        { platform: "instagram", url: "" },
      ],
    });
  }
  function removeSocial(index: number) {
    update("contact", {
      ...contact,
      social_links: contact.social_links.filter((_, i) => i !== index),
    });
  }

  return (
    <div className="space-y-10">
      <div>
        <SectionHeading
          title="Email"
          description="Primary contact email address."
        />
        <div>
          <Label>Email</Label>
          <input
            type="email"
            value={contact.email}
            onChange={(e) =>
              update("contact", { ...contact, email: e.target.value })
            }
            placeholder="reservations@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <SectionHeading
          title="Phone Numbers"
          description="Add one or more contact numbers with labels."
        />
        <div className="space-y-2">
          {contact.phone_numbers.map((phone, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={phone.label}
                onChange={(e) => setPhone(i, "label", e.target.value)}
                placeholder="Label (e.g. Reservations)"
                className={inputClass}
              />
              <input
                type="text"
                value={phone.number}
                onChange={(e) => setPhone(i, "number", e.target.value)}
                placeholder="+1 268 462 8400"
                className={inputClass}
              />
              <RemoveButton onClick={() => removePhone(i)} />
            </div>
          ))}
          <AddButton onClick={addPhone} label="Add phone number" />
        </div>
      </div>

      <div>
        <SectionHeading
          title="Address"
          description="Physical address lines displayed on the site."
        />
        <div className="space-y-2">
          {contact.address_lines.map((line, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={line}
                onChange={(e) => setAddress(i, e.target.value)}
                placeholder="Address line"
                className={inputClass}
              />
              <RemoveButton onClick={() => removeAddress(i)} />
            </div>
          ))}
          <AddButton onClick={addAddress} label="Add address line" />
        </div>
      </div>

      <div>
        <SectionHeading
          title="Coordinates"
          description="Map coordinates for the property location."
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Latitude</Label>
            <input
              type="number"
              step="any"
              value={contact.coordinates.lat}
              onChange={(e) =>
                update("contact", {
                  ...contact,
                  coordinates: {
                    ...contact.coordinates,
                    lat: parseFloat(e.target.value) || 0,
                  },
                })
              }
              className={inputClass}
            />
          </div>
          <div>
            <Label>Longitude</Label>
            <input
              type="number"
              step="any"
              value={contact.coordinates.lng}
              onChange={(e) =>
                update("contact", {
                  ...contact,
                  coordinates: {
                    ...contact.coordinates,
                    lng: parseFloat(e.target.value) || 0,
                  },
                })
              }
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div>
        <SectionHeading
          title="Social Links"
          description="Social media profiles linked from the site."
        />
        <div className="space-y-2">
          {contact.social_links.map((link, i) => (
            <div key={i} className="flex items-center gap-2">
              <select
                value={link.platform}
                onChange={(e) => setSocial(i, "platform", e.target.value)}
                className={selectClass + " max-w-[160px]"}
              >
                {SOCIAL_PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </select>
              <input
                type="url"
                value={link.url}
                onChange={(e) => setSocial(i, "url", e.target.value)}
                placeholder="https://..."
                className={inputClass}
              />
              <RemoveButton onClick={() => removeSocial(i)} />
            </div>
          ))}
          <AddButton onClick={addSocial} label="Add social link" />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   INTEGRATIONS TAB
   ────────────────────────────────────────────────────────── */

function IntegrationsTab({ settings, update }: TabProps) {
  const { integrations } = settings;

  function setBooking(
    field: keyof Settings["integrations"]["booking_engine"],
    value: string
  ) {
    update("integrations", {
      ...integrations,
      booking_engine: { ...integrations.booking_engine, [field]: value },
    });
  }

  function setNewsletter(
    field: keyof Settings["integrations"]["newsletter"],
    value: string
  ) {
    update("integrations", {
      ...integrations,
      newsletter: { ...integrations.newsletter, [field]: value },
    });
  }

  function setReviews(
    field: keyof Settings["integrations"]["reviews"],
    value: string
  ) {
    update("integrations", {
      ...integrations,
      reviews: { ...integrations.reviews, [field]: value },
    });
  }

  function setChat(
    field: keyof Settings["integrations"]["chat_widget"],
    value: string
  ) {
    update("integrations", {
      ...integrations,
      chat_widget: { ...integrations.chat_widget, [field]: value },
    });
  }

  return (
    <div className="space-y-10">
      <div>
        <SectionHeading
          title="Booking Engine"
          description="Configure the external booking system."
        />
        <div className="space-y-4">
          <div>
            <Label>Provider Name</Label>
            <input
              type="text"
              value={integrations.booking_engine.provider}
              onChange={(e) => setBooking("provider", e.target.value)}
              placeholder="e.g. Synxis, Cloudbeds"
              className={inputClass}
            />
          </div>
          <div>
            <Label>Booking URL</Label>
            <input
              type="url"
              value={integrations.booking_engine.url}
              onChange={(e) => setBooking("url", e.target.value)}
              placeholder="https://booking.example.com"
              className={inputClass}
            />
          </div>
          <div>
            <Label>Widget Code</Label>
            <textarea
              value={integrations.booking_engine.widget_code}
              onChange={(e) => setBooking("widget_code", e.target.value)}
              placeholder="Embed code or script tag"
              className={textareaClass + " font-mono text-xs"}
            />
          </div>
        </div>
      </div>

      <div>
        <SectionHeading
          title="Newsletter"
          description="Email marketing integration."
        />
        <div className="space-y-4">
          <div>
            <Label>Provider</Label>
            <select
              value={integrations.newsletter.provider}
              onChange={(e) => setNewsletter("provider", e.target.value)}
              className={selectClass}
            >
              {NEWSLETTER_PROVIDERS.map((p) => (
                <option key={p} value={p}>
                  {p === "none"
                    ? "None"
                    : p === "mailchimp"
                    ? "Mailchimp"
                    : "Sendinblue"}
                </option>
              ))}
            </select>
          </div>
          {integrations.newsletter.provider !== "none" && (
            <>
              <div>
                <Label>API Key</Label>
                <input
                  type="text"
                  value={integrations.newsletter.api_key}
                  onChange={(e) => setNewsletter("api_key", e.target.value)}
                  placeholder="API key"
                  className={inputClass}
                />
              </div>
              <div>
                <Label>List ID</Label>
                <input
                  type="text"
                  value={integrations.newsletter.list_id}
                  onChange={(e) => setNewsletter("list_id", e.target.value)}
                  placeholder="Audience / list ID"
                  className={inputClass}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div>
        <SectionHeading
          title="Reviews"
          description="Connect review platform profiles."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>TripAdvisor ID</Label>
            <input
              type="text"
              value={integrations.reviews.tripadvisor_id}
              onChange={(e) => setReviews("tripadvisor_id", e.target.value)}
              placeholder="Property ID"
              className={inputClass}
            />
          </div>
          <div>
            <Label>Google Place ID</Label>
            <input
              type="text"
              value={integrations.reviews.google_place_id}
              onChange={(e) => setReviews("google_place_id", e.target.value)}
              placeholder="Place ID"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div>
        <SectionHeading
          title="Chat Widget"
          description="Live chat or chatbot integration."
        />
        <div className="space-y-4">
          <div>
            <Label>Provider Name</Label>
            <input
              type="text"
              value={integrations.chat_widget.provider}
              onChange={(e) => setChat("provider", e.target.value)}
              placeholder="e.g. Intercom, Drift"
              className={inputClass}
            />
          </div>
          <div>
            <Label>Embed Code</Label>
            <textarea
              value={integrations.chat_widget.code}
              onChange={(e) => setChat("code", e.target.value)}
              placeholder="Chat widget embed code"
              className={textareaClass + " font-mono text-xs"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   LEGAL TAB
   ────────────────────────────────────────────────────────── */

function LegalTab({ settings, update }: TabProps) {
  const { legal } = settings;

  function set(
    key: "cookie_policy_url" | "privacy_policy_url" | "terms_url",
    value: string
  ) {
    update("legal", { ...legal, [key]: value });
  }

  return (
    <div className="space-y-10">
      <div>
        <SectionHeading
          title="Legal Pages"
          description="URLs for legal documents linked in the site footer."
        />
        <div className="space-y-4">
          <div>
            <Label>Cookie Policy URL</Label>
            <input
              type="text"
              value={legal.cookie_policy_url}
              onChange={(e) => set("cookie_policy_url", e.target.value)}
              placeholder="/cookie-policy"
              className={inputClass}
            />
          </div>
          <div>
            <Label>Privacy Policy URL</Label>
            <input
              type="text"
              value={legal.privacy_policy_url}
              onChange={(e) => set("privacy_policy_url", e.target.value)}
              placeholder="/privacy-policy"
              className={inputClass}
            />
          </div>
          <div>
            <Label>Terms URL</Label>
            <input
              type="text"
              value={legal.terms_url}
              onChange={(e) => set("terms_url", e.target.value)}
              placeholder="/terms"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div>
        <SectionHeading
          title="Cookie Consent"
          description="Configure the cookie consent banner shown to visitors."
        />
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={legal.cookie_consent.enabled}
              onChange={(e) =>
                update("legal", {
                  ...legal,
                  cookie_consent: {
                    ...legal.cookie_consent,
                    enabled: e.target.checked,
                  },
                })
              }
              className="w-4 h-4 rounded border-sand-dark/30 text-ocean-deep focus:ring-ocean-deep"
            />
            <span className="text-sm font-medium text-text">
              Enable cookie consent banner
            </span>
          </label>
          {legal.cookie_consent.enabled && (
            <div>
              <Label>Banner Message</Label>
              <textarea
                value={legal.cookie_consent.message}
                onChange={(e) =>
                  update("legal", {
                    ...legal,
                    cookie_consent: {
                      ...legal.cookie_consent,
                      message: e.target.value,
                    },
                  })
                }
                placeholder="We use cookies to enhance your experience..."
                className={textareaClass}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   ANNOUNCEMENT BAR TAB
   ────────────────────────────────────────────────────────── */

function AnnouncementTab({ settings, update }: TabProps) {
  const { announcementBar } = settings;

  function set<K extends keyof Settings["announcementBar"]>(
    key: K,
    value: Settings["announcementBar"][K]
  ) {
    update("announcementBar", { ...announcementBar, [key]: value });
  }

  return (
    <div className="space-y-10">
      <div>
        <SectionHeading
          title="Announcement Bar"
          description="A banner displayed at the top of the site to highlight promotions or notices."
        />
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={announcementBar.enabled}
              onChange={(e) => set("enabled", e.target.checked)}
              className="w-4 h-4 rounded border-sand-dark/30 text-ocean-deep focus:ring-ocean-deep"
            />
            <span className="text-sm font-medium text-text">
              Enable announcement bar
            </span>
          </label>

          <div>
            <Label>Message</Label>
            <input
              type="text"
              value={announcementBar.message}
              onChange={(e) => set("message", e.target.value)}
              placeholder="Book now and save 20% on summer stays!"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Link URL</Label>
              <input
                type="text"
                value={announcementBar.link_url}
                onChange={(e) => set("link_url", e.target.value)}
                placeholder="/offers/summer-special"
                className={inputClass}
              />
            </div>
            <div>
              <Label>Link Text</Label>
              <input
                type="text"
                value={announcementBar.link_text}
                onChange={(e) => set("link_text", e.target.value)}
                placeholder="Learn More"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Visible From</Label>
              <input
                type="date"
                value={announcementBar.visible_from}
                onChange={(e) => set("visible_from", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <Label>Visible To</Label>
              <input
                type="date"
                value={announcementBar.visible_to}
                onChange={(e) => set("visible_to", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
