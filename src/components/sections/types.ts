// ─── Shared Types ───────────────────────────────────────

export interface CTALink {
  label: string;
  url: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface MediaRef {
  id: string;
  url: string;
  alt: string;
  blurhash?: string;
  width?: number;
  height?: number;
}

// ─── Section Types ──────────────────────────────────────

export interface HeroSection {
  type: "hero";
  variant: "full" | "short" | "centered" | "split";
  image: MediaRef;
  title: string;
  titleItalic?: string;
  subtitle?: string;
  eyebrow?: string;
  breadcrumb?: { label: string; url: string }[];
  showBreadcrumb?: boolean;
  showScrollIndicator?: boolean;
  overlayOpacity?: number;
}

export interface EditorialSplitSection {
  type: "editorial_split";
  layout: "image-left" | "image-right";
  background: "light" | "dark" | "sand";
  image: MediaRef;
  gallery?: MediaRef[];
  label?: string;
  title: string;
  titleItalic?: string;
  subtitle?: string;
  body: string;
  stats?: StatItem[];
  cta?: CTALink;
  number?: string;
  meals?: { name: string; time: string }[];
  dressCode?: { label: string; description: string };
  menuLinks?: CTALink[];
}

export interface IntroSection {
  type: "intro";
  label?: string;
  title: string;
  titleItalic?: string;
  body: string;
  cta?: CTALink;
  images?: { main: MediaRef; float?: MediaRef };
  yearOverlay?: string;
}

export interface RoomGridSection {
  type: "room_grid";
  label?: string;
  title?: string;
  titleItalic?: string;
  body?: string;
  rooms: {
    name: string;
    description: string;
    image: MediaRef;
    url: string;
  }[];
}

export interface RoomDetailSection {
  type: "room_detail";
  id: string;
  label: string;
  name: string;
  nameItalic?: string;
  description: string;
  images: MediaRef[];
  stats: StatItem[];
  amenities: string[];
  ctaLabel?: string;
  ctaUrl?: string;
}

export interface GalleryMosaicSection {
  type: "gallery_mosaic";
  label?: string;
  title?: string;
  titleItalic?: string;
  images: MediaRef[];
}

export interface GalleryBandSection {
  type: "gallery_band";
  images: MediaRef[];
}

export interface StatsBandSection {
  type: "stats_band";
  stats: StatItem[];
}

export interface TimelineSection {
  type: "timeline";
  items: {
    year: string;
    heading: string;
    headingItalic?: string;
    text: string;
    image?: MediaRef;
  }[];
}

export interface TestimonialSection {
  type: "testimonial";
  quote: string;
  author: string;
  background?: "light" | "dark";
  cta?: CTALink;
}

export interface OfferCardSection {
  type: "offer_card";
  image: MediaRef;
  discountLabel?: string;
  tag?: string;
  title: string;
  titleItalic?: string;
  description: string;
  details?: { label: string; value: string }[];
  includes?: string[];
  includesTitle?: string;
  terms?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export interface WellnessScrollSection {
  type: "wellness_scroll";
  label?: string;
  title?: string;
  titleItalic?: string;
  body?: string;
  cards: {
    image: MediaRef;
    title: string;
    label?: string;
    url: string;
  }[];
}

export interface TreatmentListSection {
  type: "treatment_list";
  label?: string;
  title: string;
  titleItalic?: string;
  description?: string;
  treatments: { name: string; description: string }[];
  ctas?: CTALink[];
}

export interface ExperienceStepsSection {
  type: "experience_steps";
  steps: {
    number: string;
    title: string;
    description: string;
  }[];
}

export interface IncludedUpgradeSection {
  type: "included_upgrade";
  includedTitle: string;
  includedTitleItalic?: string;
  includedNote?: string;
  includedItems: string[];
  upgradeTitle: string;
  upgradeTitleItalic?: string;
  upgradeNote?: string;
  upgradeItems: string[];
  cta?: CTALink;
}

export interface ActivitySection {
  type: "activity_section";
  name: string;
  nameItalic?: string;
  description: string;
  images: { main: MediaRef; small: MediaRef[] };
  badge?: string;
  highlights: string[];
  cta?: CTALink;
}

export interface FilterGallerySection {
  type: "filter_gallery";
  categories: string[];
  images: (MediaRef & { category: string })[];
}

export interface ContactFormSection {
  type: "contact_form";
  title?: string;
  subtitle?: string;
  fields: {
    name: string;
    label: string;
    type: "text" | "email" | "tel" | "select" | "textarea";
    options?: string[];
    required?: boolean;
    halfWidth?: boolean;
  }[];
  submitLabel?: string;
  formType?: string;
}

export interface ContactInfoSection {
  type: "contact_info";
  sections: {
    title: string;
    items: { label: string; value: string; url?: string }[];
  }[];
  pressContacts?: {
    title: string;
    role: string;
    email: string;
  }[];
}

export interface ExploreCardsSection {
  type: "explore_cards";
  label?: string;
  title?: string;
  titleItalic?: string;
  background?: "light" | "dark";
  columns?: 2 | 3;
  cards: {
    title: string;
    subtitle?: string;
    image: MediaRef;
    url: string;
  }[];
}

export interface CTABandSection {
  type: "cta_band";
  background?: "light" | "dark" | "blush";
  title: string;
  titleItalic?: string;
  description?: string;
  cta?: CTALink;
  contactDetails?: { label: string; value: string; url?: string }[];
}

export interface FreeformContentSection {
  type: "freeform_content";
  content: string;
}

export interface EmbedSection {
  type: "embed";
  code: string;
  aspectRatio?: string;
}

export interface AccordionSection {
  type: "accordion";
  title?: string;
  items: { question: string; answer: string }[];
}

export interface VideoSection {
  type: "video";
  url: string;
  poster?: MediaRef;
  title?: string;
}

export interface QuoteSection {
  type: "quote";
  quote: string;
  author?: string;
  background?: "light" | "dark";
}

export interface InclusiveStripSection {
  type: "inclusive_strip";
  items: { icon: string; title: string; subtitle: string }[];
}

export interface IntroSplitSection {
  type: "intro_split";
  title: string;
  titleItalic?: string;
  body: string;
  sidebar: {
    heading: string;
    items: { icon?: string; label: string; value: string }[];
    cta?: CTALink;
  };
}

export interface DetailColumnsSection {
  type: "detail_columns";
  title: string;
  titleItalic?: string;
  columns: string[];
}

export interface MapSection {
  type: "map_section";
  title: string;
  titleItalic?: string;
  body: string;
  image: MediaRef;
}

// ─── Union Type ─────────────────────────────────────────

export type Section =
  | HeroSection
  | EditorialSplitSection
  | IntroSection
  | RoomGridSection
  | RoomDetailSection
  | GalleryMosaicSection
  | GalleryBandSection
  | StatsBandSection
  | TimelineSection
  | TestimonialSection
  | OfferCardSection
  | WellnessScrollSection
  | TreatmentListSection
  | ExperienceStepsSection
  | IncludedUpgradeSection
  | ActivitySection
  | FilterGallerySection
  | ContactFormSection
  | ContactInfoSection
  | ExploreCardsSection
  | CTABandSection
  | FreeformContentSection
  | EmbedSection
  | AccordionSection
  | VideoSection
  | QuoteSection
  | InclusiveStripSection
  | IntroSplitSection
  | DetailColumnsSection
  | MapSection;
