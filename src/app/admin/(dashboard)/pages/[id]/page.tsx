"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";

// ─── Constants ──────────────────────────────────────────

const TEMPLATES = [
  "generic",
  "home",
  "rooms",
  "room-detail",
  "dining",
  "wellness",
  "experiences",
  "offers",
  "gallery",
  "contact",
  "about",
];

const SCHEMA_TYPES = [
  "",
  "Hotel",
  "Restaurant",
  "Event",
  "LodgingBusiness",
  "FAQPage",
];

const SECTION_TYPES = [
  "hero",
  "editorial_split",
  "intro",
  "intro_split",
  "room_grid",
  "room_detail",
  "gallery_mosaic",
  "gallery_band",
  "stats_band",
  "timeline",
  "testimonial",
  "offer_card",
  "wellness_scroll",
  "treatment_list",
  "experience_steps",
  "included_upgrade",
  "activity_section",
  "filter_gallery",
  "contact_form",
  "contact_info",
  "explore_cards",
  "cta_band",
  "freeform_content",
  "embed",
  "accordion",
  "video",
  "quote",
  "inclusive_strip",
  "detail_columns",
  "map_section",
];

function sectionLabel(type: string) {
  return type
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnySection = Record<string, any>;

interface PageData {
  id: string;
  title: string;
  slug: string;
  parentId: string | null;
  template: string;
  sections: AnySection[];
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    noIndex?: boolean;
    schemaType?: string;
  };
  status: "published" | "draft" | "scheduled";
  publishAt: string | null;
  sortOrder: number;
  showInNav: boolean;
  navLabel: string | null;
}

interface ParentOption {
  id: string;
  title: string;
  slug: string;
}

// ─── Page Component ─────────────────────────────────────

export default function PageEditorPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [page, setPage] = useState<PageData | null>(null);
  const [parents, setParents] = useState<ParentOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<"content" | "seo" | "settings">(
    "content"
  );
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`/api/pages/${id}`).then((r) => r.json()),
      fetch("/api/pages").then((r) => r.json()),
    ]).then(([pageData, allPages]) => {
      setPage({
        ...pageData,
        sections: Array.isArray(pageData.sections) ? pageData.sections : [],
        seo: pageData.seo && typeof pageData.seo === "object" ? pageData.seo : {},
      });
      if (Array.isArray(allPages)) {
        setParents(allPages.filter((p: ParentOption) => p.id !== id));
      }
      setLoading(false);
    });
  }, [id]);

  const updatePage = useCallback(
    (updates: Partial<PageData>) => {
      setPage((prev) => (prev ? { ...prev, ...updates } : prev));
    },
    []
  );

  const updateSeo = useCallback(
    (updates: Partial<PageData["seo"]>) => {
      setPage((prev) =>
        prev ? { ...prev, seo: { ...prev.seo, ...updates } } : prev
      );
    },
    []
  );

  const updateSection = useCallback(
    (index: number, data: AnySection) => {
      setPage((prev) => {
        if (!prev) return prev;
        const sections = [...prev.sections];
        sections[index] = { ...sections[index], ...data };
        return { ...prev, sections };
      });
    },
    []
  );

  const deleteSection = useCallback((index: number) => {
    if (!window.confirm("Delete this section?")) return;
    setPage((prev) => {
      if (!prev) return prev;
      const sections = prev.sections.filter((_, i) => i !== index);
      return { ...prev, sections };
    });
    setExpandedSection(null);
  }, []);

  const moveSection = useCallback(
    (index: number, direction: -1 | 1) => {
      setPage((prev) => {
        if (!prev) return prev;
        const target = index + direction;
        if (target < 0 || target >= prev.sections.length) return prev;
        const sections = [...prev.sections];
        [sections[index], sections[target]] = [
          sections[target],
          sections[index],
        ];
        return { ...prev, sections };
      });
      setExpandedSection((prev) =>
        prev === index ? index + direction : prev
      );
    },
    []
  );

  const addSection = useCallback((type: string) => {
    setPage((prev) => {
      if (!prev) return prev;
      const newSection: AnySection = { type };
      const updated = { ...prev, sections: [...prev.sections, newSection] };
      setExpandedSection(updated.sections.length - 1);
      return updated;
    });
  }, []);

  async function handleSave() {
    if (!page) return;
    setSaving(true);
    setFeedback(null);

    try {
      const res = await fetch(`/api/pages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: page.title,
          slug: page.slug,
          parentId: page.parentId || null,
          template: page.template,
          sections: page.sections,
          seo: page.seo,
          status: page.status,
          publishAt: page.publishAt || null,
          sortOrder: page.sortOrder,
          showInNav: page.showInNav,
          navLabel: page.navLabel || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Save failed");
      }

      setFeedback({ type: "success", message: "Page saved successfully." });
    } catch (err) {
      setFeedback({
        type: "error",
        message: err instanceof Error ? err.message : "Save failed",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-text-light">
        Loading...
      </div>
    );
  }

  if (!page) {
    return (
      <div className="flex items-center justify-center py-20 text-red-600">
        Page not found
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin/pages")}
            className="text-text-light hover:text-text text-sm"
          >
            &larr; Pages
          </button>
          <span className="text-sand-dark">/</span>
          <h1 className="font-heading text-2xl font-semibold text-ocean-deep">
            Edit Page
          </h1>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2 bg-ocean text-sand text-sm rounded hover:bg-ocean-deep transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      {/* Feedback */}
      {feedback && (
        <div
          className={`mb-4 px-4 py-3 rounded text-sm ${
            feedback.type === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {feedback.message}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-0 mb-6 border-b border-sand-dark/20">
        {(["content", "seo", "settings"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? "border-ocean text-ocean"
                : "border-transparent text-text-light hover:text-text"
            }`}
          >
            {tab === "seo" ? "SEO" : tab}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {activeTab === "content" && (
        <ContentTab
          page={page}
          updatePage={updatePage}
          updateSection={updateSection}
          deleteSection={deleteSection}
          moveSection={moveSection}
          addSection={addSection}
          expandedSection={expandedSection}
          setExpandedSection={setExpandedSection}
        />
      )}
      {activeTab === "seo" && <SeoTab page={page} updateSeo={updateSeo} />}
      {activeTab === "settings" && (
        <SettingsTab page={page} updatePage={updatePage} parents={parents} />
      )}
    </div>
  );
}

// ─── Content Tab ────────────────────────────────────────

function ContentTab({
  page,
  updatePage,
  updateSection,
  deleteSection,
  moveSection,
  addSection,
  expandedSection,
  setExpandedSection,
}: {
  page: PageData;
  updatePage: (u: Partial<PageData>) => void;
  updateSection: (i: number, d: AnySection) => void;
  deleteSection: (i: number) => void;
  moveSection: (i: number, d: -1 | 1) => void;
  addSection: (type: string) => void;
  expandedSection: number | null;
  setExpandedSection: (i: number | null) => void;
}) {
  const [addingType, setAddingType] = useState("");

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <label className="block text-sm font-medium text-text mb-1">
          Page Title
        </label>
        <input
          type="text"
          value={page.title}
          onChange={(e) => updatePage({ title: e.target.value })}
          className="w-full px-4 py-3 border border-sand-dark/30 rounded text-xl font-heading focus:outline-none focus:ring-2 focus:ring-ocean/30"
        />
      </div>

      {/* Sections */}
      <div>
        <h2 className="text-sm font-medium text-text mb-3">
          Sections ({page.sections.length})
        </h2>

        {page.sections.length === 0 && (
          <div className="bg-white rounded-lg border border-sand-dark/20 px-4 py-8 text-center text-text-light text-sm">
            No sections yet. Add one below.
          </div>
        )}

        <div className="space-y-2">
          {page.sections.map((section, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-sand-dark/20 overflow-hidden"
            >
              {/* Section header */}
              <div className="flex items-center gap-3 px-4 py-3">
                <span className="px-2 py-0.5 bg-ocean/10 text-ocean text-xs font-medium rounded">
                  {sectionLabel(section.type || "unknown")}
                </span>
                <span className="text-xs text-text-light truncate flex-1">
                  {getSectionPreview(section)}
                </span>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => moveSection(i, -1)}
                    disabled={i === 0}
                    className="p-1 text-text-light hover:text-text disabled:opacity-30"
                    title="Move up"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6"/></svg>
                  </button>
                  <button
                    onClick={() => moveSection(i, 1)}
                    disabled={i === page.sections.length - 1}
                    className="p-1 text-text-light hover:text-text disabled:opacity-30"
                    title="Move down"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                  <button
                    onClick={() =>
                      setExpandedSection(expandedSection === i ? null : i)
                    }
                    className="p-1 text-text-light hover:text-ocean"
                    title="Edit"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button
                    onClick={() => deleteSection(i)}
                    className="p-1 text-text-light hover:text-red-600"
                    title="Delete"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                  </button>
                </div>
              </div>

              {/* Expanded editor */}
              {expandedSection === i && (
                <div className="border-t border-sand-dark/20 px-4 py-4 bg-sand-light/30">
                  <SectionEditor
                    section={section}
                    onChange={(data) => updateSection(i, data)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Section */}
        <div className="flex items-center gap-2 mt-4">
          <select
            value={addingType}
            onChange={(e) => setAddingType(e.target.value)}
            className="flex-1 px-3 py-2 border border-sand-dark/30 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ocean/30"
          >
            <option value="">Select section type...</option>
            {SECTION_TYPES.map((t) => (
              <option key={t} value={t}>
                {sectionLabel(t)}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              if (addingType) {
                addSection(addingType);
                setAddingType("");
              }
            }}
            disabled={!addingType}
            className="px-4 py-2 bg-ocean text-sand text-sm rounded hover:bg-ocean-deep transition-colors disabled:opacity-50"
          >
            Add Section
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Section Preview ────────────────────────────────────

function getSectionPreview(section: AnySection): string {
  const t = section.title || section.quote || section.name || section.content || section.body || "";
  if (typeof t === "string" && t.length > 0) {
    return t.length > 50 ? t.slice(0, 50) + "..." : t;
  }
  return "";
}

// ─── Section Editor ─────────────────────────────────────

function SectionEditor({
  section,
  onChange,
}: {
  section: AnySection;
  onChange: (data: AnySection) => void;
}) {
  switch (section.type) {
    case "hero":
      return <HeroEditor section={section} onChange={onChange} />;
    case "editorial_split":
      return <EditorialSplitEditor section={section} onChange={onChange} />;
    case "testimonial":
      return <TestimonialEditor section={section} onChange={onChange} />;
    case "intro":
      return <IntroEditor section={section} onChange={onChange} />;
    case "stats_band":
      return <StatsBandEditor section={section} onChange={onChange} />;
    default:
      return <JsonFallbackEditor section={section} onChange={onChange} />;
  }
}

// ─── Hero Editor ────────────────────────────────────────

function HeroEditor({
  section,
  onChange,
}: {
  section: AnySection;
  onChange: (data: AnySection) => void;
}) {
  return (
    <div className="space-y-4">
      <FieldSelect
        label="Variant"
        value={section.variant || "full"}
        options={["full", "short", "centered", "split"]}
        onChange={(v) => onChange({ variant: v })}
      />
      <FieldInput
        label="Title"
        value={section.title || ""}
        onChange={(v) => onChange({ title: v })}
      />
      <FieldInput
        label="Title Italic"
        value={section.titleItalic || ""}
        onChange={(v) => onChange({ titleItalic: v })}
      />
      <FieldInput
        label="Subtitle"
        value={section.subtitle || ""}
        onChange={(v) => onChange({ subtitle: v })}
      />
      <FieldInput
        label="Eyebrow"
        value={section.eyebrow || ""}
        onChange={(v) => onChange({ eyebrow: v })}
      />
      <FieldInput
        label="Image URL"
        value={section.image?.url || ""}
        onChange={(v) =>
          onChange({
            image: {
              ...(section.image || {}),
              url: v,
              alt: section.image?.alt || "",
              id: section.image?.id || "",
            },
          })
        }
      />
      <div>
        <label className="block text-sm font-medium text-text mb-1">
          Overlay Opacity ({section.overlayOpacity ?? 0.4})
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={section.overlayOpacity ?? 0.4}
          onChange={(e) =>
            onChange({ overlayOpacity: parseFloat(e.target.value) })
          }
          className="w-full"
        />
      </div>
    </div>
  );
}

// ─── Editorial Split Editor ─────────────────────────────

function EditorialSplitEditor({
  section,
  onChange,
}: {
  section: AnySection;
  onChange: (data: AnySection) => void;
}) {
  return (
    <div className="space-y-4">
      <FieldSelect
        label="Layout"
        value={section.layout || "image-left"}
        options={["image-left", "image-right"]}
        onChange={(v) => onChange({ layout: v })}
      />
      <FieldSelect
        label="Background"
        value={section.background || "light"}
        options={["light", "dark", "sand"]}
        onChange={(v) => onChange({ background: v })}
      />
      <FieldInput
        label="Title"
        value={section.title || ""}
        onChange={(v) => onChange({ title: v })}
      />
      <FieldInput
        label="Title Italic"
        value={section.titleItalic || ""}
        onChange={(v) => onChange({ titleItalic: v })}
      />
      <FieldTextarea
        label="Body"
        value={section.body || ""}
        onChange={(v) => onChange({ body: v })}
      />
      <FieldInput
        label="Image URL"
        value={section.image?.url || ""}
        onChange={(v) =>
          onChange({
            image: {
              ...(section.image || {}),
              url: v,
              alt: section.image?.alt || "",
              id: section.image?.id || "",
            },
          })
        }
      />
      <FieldInput
        label="Label"
        value={section.label || ""}
        onChange={(v) => onChange({ label: v })}
      />
    </div>
  );
}

// ─── Testimonial Editor ─────────────────────────────────

function TestimonialEditor({
  section,
  onChange,
}: {
  section: AnySection;
  onChange: (data: AnySection) => void;
}) {
  return (
    <div className="space-y-4">
      <FieldTextarea
        label="Quote"
        value={section.quote || ""}
        onChange={(v) => onChange({ quote: v })}
      />
      <FieldInput
        label="Author"
        value={section.author || ""}
        onChange={(v) => onChange({ author: v })}
      />
      <FieldSelect
        label="Background"
        value={section.background || "light"}
        options={["light", "dark"]}
        onChange={(v) => onChange({ background: v })}
      />
    </div>
  );
}

// ─── Intro Editor ───────────────────────────────────────

function IntroEditor({
  section,
  onChange,
}: {
  section: AnySection;
  onChange: (data: AnySection) => void;
}) {
  return (
    <div className="space-y-4">
      <FieldInput
        label="Title"
        value={section.title || ""}
        onChange={(v) => onChange({ title: v })}
      />
      <FieldInput
        label="Title Italic"
        value={section.titleItalic || ""}
        onChange={(v) => onChange({ titleItalic: v })}
      />
      <FieldTextarea
        label="Body"
        value={section.body || ""}
        onChange={(v) => onChange({ body: v })}
      />
      <FieldInput
        label="Label"
        value={section.label || ""}
        onChange={(v) => onChange({ label: v })}
      />
    </div>
  );
}

// ─── Stats Band Editor ──────────────────────────────────

function StatsBandEditor({
  section,
  onChange,
}: {
  section: AnySection;
  onChange: (data: AnySection) => void;
}) {
  const stats: { value: string; label: string }[] = Array.isArray(section.stats)
    ? section.stats
    : [];

  function updateStat(index: number, field: "value" | "label", val: string) {
    const updated = [...stats];
    updated[index] = { ...updated[index], [field]: val };
    onChange({ stats: updated });
  }

  function addStat() {
    onChange({ stats: [...stats, { value: "", label: "" }] });
  }

  function removeStat(index: number) {
    onChange({ stats: stats.filter((_, i) => i !== index) });
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-text">Stats</label>
      {stats.map((stat, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            type="text"
            value={stat.value}
            onChange={(e) => updateStat(i, "value", e.target.value)}
            placeholder="Value"
            className="flex-1 px-3 py-2 border border-sand-dark/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30"
          />
          <input
            type="text"
            value={stat.label}
            onChange={(e) => updateStat(i, "label", e.target.value)}
            placeholder="Label"
            className="flex-1 px-3 py-2 border border-sand-dark/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30"
          />
          <button
            onClick={() => removeStat(i)}
            className="p-1.5 text-text-light hover:text-red-600"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      ))}
      <button
        onClick={addStat}
        className="text-sm text-ocean hover:text-ocean-deep font-medium"
      >
        + Add Stat
      </button>
    </div>
  );
}

// ─── JSON Fallback Editor ───────────────────────────────

function JsonFallbackEditor({
  section,
  onChange,
}: {
  section: AnySection;
  onChange: (data: AnySection) => void;
}) {
  const { type, ...rest } = section;
  const [json, setJson] = useState(JSON.stringify(rest, null, 2));
  const [error, setError] = useState("");

  function handleBlur() {
    try {
      const parsed = JSON.parse(json);
      onChange(parsed);
      setError("");
    } catch {
      setError("Invalid JSON");
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text">
        Section Data (JSON) &mdash; type: {type}
      </label>
      <textarea
        value={json}
        onChange={(e) => setJson(e.target.value)}
        onBlur={handleBlur}
        rows={12}
        className="w-full px-3 py-2 border border-sand-dark/30 rounded text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ocean/30"
      />
      {error && <p className="text-red-600 text-xs">{error}</p>}
    </div>
  );
}

// ─── SEO Tab ────────────────────────────────────────────

function SeoTab({
  page,
  updateSeo,
}: {
  page: PageData;
  updateSeo: (u: Partial<PageData["seo"]>) => void;
}) {
  const seo = page.seo;
  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <label className="block text-sm font-medium text-text mb-1">
          Meta Title{" "}
          <span className="text-text-light font-normal">
            ({(seo.metaTitle || "").length}/60)
          </span>
        </label>
        <input
          type="text"
          value={seo.metaTitle || ""}
          maxLength={60}
          onChange={(e) => updateSeo({ metaTitle: e.target.value })}
          className="w-full px-3 py-2 border border-sand-dark/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text mb-1">
          Meta Description{" "}
          <span className="text-text-light font-normal">
            ({(seo.metaDescription || "").length}/160)
          </span>
        </label>
        <textarea
          value={seo.metaDescription || ""}
          maxLength={160}
          rows={3}
          onChange={(e) => updateSeo({ metaDescription: e.target.value })}
          className="w-full px-3 py-2 border border-sand-dark/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text mb-1">
          OG Title
        </label>
        <input
          type="text"
          value={seo.ogTitle || ""}
          onChange={(e) => updateSeo({ ogTitle: e.target.value })}
          className="w-full px-3 py-2 border border-sand-dark/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text mb-1">
          OG Description
        </label>
        <input
          type="text"
          value={seo.ogDescription || ""}
          onChange={(e) => updateSeo({ ogDescription: e.target.value })}
          className="w-full px-3 py-2 border border-sand-dark/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="noIndex"
          checked={seo.noIndex || false}
          onChange={(e) => updateSeo({ noIndex: e.target.checked })}
          className="rounded border-sand-dark/30"
        />
        <label htmlFor="noIndex" className="text-sm text-text">
          No-index (hide from search engines)
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-text mb-1">
          Schema Type
        </label>
        <select
          value={seo.schemaType || ""}
          onChange={(e) =>
            updateSeo({ schemaType: e.target.value || undefined })
          }
          className="w-full px-3 py-2 border border-sand-dark/30 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ocean/30"
        >
          <option value="">None</option>
          {SCHEMA_TYPES.filter(Boolean).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

// ─── Settings Tab ───────────────────────────────────────

function SettingsTab({
  page,
  updatePage,
  parents,
}: {
  page: PageData;
  updatePage: (u: Partial<PageData>) => void;
  parents: ParentOption[];
}) {
  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <label className="block text-sm font-medium text-text mb-1">
          Status
        </label>
        <select
          value={page.status}
          onChange={(e) =>
            updatePage({
              status: e.target.value as PageData["status"],
            })
          }
          className="w-full px-3 py-2 border border-sand-dark/30 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ocean/30"
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
        </select>
      </div>

      {page.status === "scheduled" && (
        <div>
          <label className="block text-sm font-medium text-text mb-1">
            Publish Date
          </label>
          <input
            type="date"
            value={page.publishAt ? page.publishAt.slice(0, 10) : ""}
            onChange={(e) =>
              updatePage({
                publishAt: e.target.value
                  ? new Date(e.target.value).toISOString()
                  : null,
              })
            }
            className="w-full px-3 py-2 border border-sand-dark/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30"
          />
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="showInNav"
          checked={page.showInNav}
          onChange={(e) => updatePage({ showInNav: e.target.checked })}
          className="rounded border-sand-dark/30"
        />
        <label htmlFor="showInNav" className="text-sm text-text">
          Show in navigation
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1">
          Nav Label
        </label>
        <input
          type="text"
          value={page.navLabel || ""}
          onChange={(e) => updatePage({ navLabel: e.target.value })}
          placeholder="Defaults to page title"
          className="w-full px-3 py-2 border border-sand-dark/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1">
          Template
        </label>
        <select
          value={page.template}
          onChange={(e) => updatePage({ template: e.target.value })}
          className="w-full px-3 py-2 border border-sand-dark/30 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ocean/30"
        >
          {TEMPLATES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1">
          Parent Page
        </label>
        <select
          value={page.parentId || ""}
          onChange={(e) => updatePage({ parentId: e.target.value || null })}
          className="w-full px-3 py-2 border border-sand-dark/30 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ocean/30"
        >
          <option value="">None (top-level)</option>
          {parents.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title} (/{p.slug})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1">
          Sort Order
        </label>
        <input
          type="number"
          value={page.sortOrder}
          onChange={(e) =>
            updatePage({ sortOrder: parseInt(e.target.value) || 0 })
          }
          className="w-32 px-3 py-2 border border-sand-dark/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30"
        />
      </div>
    </div>
  );
}

// ─── Reusable Field Components ──────────────────────────

function FieldInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-text mb-1">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-sand-dark/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30"
      />
    </div>
  );
}

function FieldTextarea({
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
      <label className="block text-sm font-medium text-text mb-1">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full px-3 py-2 border border-sand-dark/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-ocean/30"
      />
    </div>
  );
}

function FieldSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-text mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-sand-dark/30 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ocean/30"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
