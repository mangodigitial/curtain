/* eslint-disable @typescript-eslint/no-explicit-any */

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://curtainbluff.com";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SchemaOrgProps {
  schemaType?: string;
  page?: {
    title: string;
    slug: string;
    seo?: Record<string, unknown>;
    sections?: unknown[];
  };
  post?: {
    title: string;
    slug: string;
    excerpt?: string;
    authorName?: string;
    createdAt: Date;
    featuredImage?: string;
  };
  siteSettings?: {
    name: string;
    domain: string;
    contact?: {
      email?: string;
      phone_numbers?: { number: string }[];
      address_lines?: string[];
      coordinates?: { lat: number; lng: number };
    };
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildAddress(addressLines?: string[]) {
  if (!addressLines?.length) return undefined;
  return {
    "@type": "PostalAddress",
    streetAddress: addressLines[0],
    addressLocality: addressLines[1] || undefined,
    addressRegion: addressLines[2] || undefined,
    addressCountry: addressLines[3] || undefined,
  };
}

function buildGeo(coordinates?: { lat: number; lng: number }) {
  if (!coordinates) return undefined;
  return {
    "@type": "GeoCoordinates",
    latitude: coordinates.lat,
    longitude: coordinates.lng,
  };
}

function buildBreadcrumbs(page?: SchemaOrgProps["page"]) {
  const items: { "@type": string; position: number; name: string; item?: string }[] = [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
  ];

  if (page && page.slug !== "home") {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: page.title,
      item: `${siteUrl}/${page.slug}`,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

function extractFaqItems(sections?: unknown[]): { q: string; a: string }[] {
  if (!Array.isArray(sections)) return [];

  const pairs: { q: string; a: string }[] = [];

  for (const section of sections) {
    const s = section as any;
    if (s?.type !== "accordion" && s?.variant !== "accordion") continue;
    const items: any[] = s.items || s.content?.items || [];
    for (const item of items) {
      const question = item.title || item.question || item.heading;
      const answer = item.body || item.answer || item.content;
      if (question && answer) {
        pairs.push({ q: String(question), a: String(answer) });
      }
    }
  }

  return pairs;
}

// ---------------------------------------------------------------------------
// Schema builders per type
// ---------------------------------------------------------------------------

function hotelSchema(props: SchemaOrgProps) {
  const { siteSettings } = props;
  const contact = siteSettings?.contact;
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: siteSettings?.name || "Curtain Bluff",
    url: siteUrl,
    address: buildAddress(contact?.address_lines),
    geo: buildGeo(contact?.coordinates),
    telephone: contact?.phone_numbers?.[0]?.number,
    email: contact?.email,
    image: `${siteUrl}/og-image.jpg`,
    starRating: { "@type": "Rating", ratingValue: "5" },
    priceRange: "$$$$",
  };
}

function restaurantSchema(props: SchemaOrgProps) {
  const { siteSettings, page } = props;
  const contact = siteSettings?.contact;
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: page?.title || siteSettings?.name || "Curtain Bluff Restaurant",
    servesCuisine: "Caribbean",
    address: buildAddress(contact?.address_lines),
    url: page ? `${siteUrl}/${page.slug}` : siteUrl,
  };
}

function lodgingSchema(props: SchemaOrgProps) {
  const { siteSettings, page } = props;
  const contact = siteSettings?.contact;
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: page?.title || siteSettings?.name || "Curtain Bluff",
    address: buildAddress(contact?.address_lines),
    geo: buildGeo(contact?.coordinates),
    telephone: contact?.phone_numbers?.[0]?.number,
    url: page ? `${siteUrl}/${page.slug}` : siteUrl,
  };
}

function eventSchema(props: SchemaOrgProps) {
  const { page, siteSettings } = props;
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: page?.title || "Event",
    location: {
      "@type": "Place",
      name: siteSettings?.name || "Curtain Bluff",
      address: buildAddress(siteSettings?.contact?.address_lines),
    },
    url: page ? `${siteUrl}/${page.slug}` : siteUrl,
  };
}

function faqSchema(props: SchemaOrgProps) {
  const pairs = extractFaqItems(props.page?.sections);
  if (pairs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pairs.map((p) => ({
      "@type": "Question",
      name: p.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: p.a,
      },
    })),
  };
}

function blogPostingSchema(props: SchemaOrgProps) {
  const { post } = props;
  if (!post) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    author: {
      "@type": "Person",
      name: post.authorName || "Curtain Bluff",
    },
    datePublished: new Date(post.createdAt).toISOString(),
    image: post.featuredImage || undefined,
    url: `${siteUrl}/blog/${post.slug}`,
    description: post.excerpt || undefined,
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SchemaOrg(props: SchemaOrgProps) {
  const schemas: unknown[] = [];

  // Add type-specific schema
  switch (props.schemaType) {
    case "Hotel":
      schemas.push(hotelSchema(props));
      break;
    case "Restaurant":
      schemas.push(restaurantSchema(props));
      break;
    case "LodgingBusiness":
      schemas.push(lodgingSchema(props));
      break;
    case "Event":
      schemas.push(eventSchema(props));
      break;
    case "FAQPage": {
      const faq = faqSchema(props);
      if (faq) schemas.push(faq);
      break;
    }
    case "BlogPosting": {
      const bp = blogPostingSchema(props);
      if (bp) schemas.push(bp);
      break;
    }
    default:
      break;
  }

  // Always include breadcrumbs when a page is provided
  if (props.page) {
    schemas.push(buildBreadcrumbs(props.page));
  }

  if (schemas.length === 0) return null;

  return (
    <>
      {schemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
