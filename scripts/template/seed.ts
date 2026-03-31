/**
 * Template Seed — Minimal Example Hotel
 *
 * This seed creates a basic structure for a new hotel site.
 * Customize with real content for each client.
 *
 * Run: npm run db:seed
 */

import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🏨 Seeding template hotel...\n");

  // ── Clear existing data ──────────────────────────────
  console.log("→ Clearing existing data...");
  await prisma.submission.deleteMany();
  await prisma.redirect.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.post.deleteMany();
  await prisma.page.deleteMany();
  await prisma.media.deleteMany();
  await prisma.user.deleteMany();
  await prisma.siteSettings.deleteMany();

  // ── Site Settings ────────────────────────────────────
  console.log("→ Creating site settings...");
  await prisma.siteSettings.create({
    data: {
      name: "Hotel Name",
      domain: "example.com",
      branding: {
        colors: { primary: "#2C3E50", secondary: "#F5F0EB", accent: "#C0392B" },
        fonts: { heading: "Playfair Display", body: "Inter" },
        border_radius: "0px",
      },
      seoDefaults: {
        title_suffix: " — Hotel Name",
        default_description: "A luxury hotel offering world-class hospitality.",
      },
      analytics: {},
      contact: {
        email: "info@example.com",
        phone_numbers: [{ label: "Reservations", number: "+1-000-000-0000" }],
        address_lines: ["123 Hotel Street", "City, Country"],
        coordinates: { lat: 0, lng: 0 },
        social_links: [],
      },
      integrations: {
        booking_engine: { provider: "", url: "", widget_code: "" },
      },
      legal: {
        cookie_consent: { enabled: true, message: "We use cookies to enhance your experience." },
      },
      announcementBar: { enabled: false, message: "" },
    },
  });

  // ── Admin User ───────────────────────────────────────
  console.log("→ Creating admin user...");
  await prisma.user.create({
    data: {
      email: "admin@example.com",
      passwordHash: hashSync("changeme", 12),
      name: "Admin",
      role: "admin",
    },
  });

  // ── Pages ────────────────────────────────────────────
  console.log("→ Creating pages...");

  // Homepage
  await prisma.page.create({
    data: {
      title: "Home",
      slug: "home",
      template: "home",
      status: "published",
      sortOrder: 0,
      showInNav: false,
      sections: [
        {
          type: "hero",
          variant: "full",
          image: { id: "", url: "/placeholder.jpg", alt: "Hotel Hero" },
          title: "Hotel",
          titleItalic: "Name",
          subtitle: "Your tagline here",
          eyebrow: "LOCATION",
          showScrollIndicator: true,
          overlayOpacity: 45,
        },
        {
          type: "intro",
          label: "WELCOME",
          title: "About",
          titleItalic: "Us",
          body: "Replace this with your hotel description. Tell guests what makes your property special.",
        },
      ],
      seo: {},
    },
  });

  // About
  await prisma.page.create({
    data: {
      title: "About",
      slug: "about",
      template: "generic",
      status: "published",
      sortOrder: 1,
      showInNav: true,
      sections: [
        {
          type: "hero",
          variant: "short",
          image: { id: "", url: "/placeholder.jpg", alt: "About" },
          title: "About",
          titleItalic: "Us",
          showBreadcrumb: true,
          breadcrumb: [{ label: "Home", url: "/" }],
        },
        {
          type: "intro",
          title: "Our",
          titleItalic: "Story",
          body: "Replace with your hotel's history and story.",
        },
      ],
      seo: {},
    },
  });

  // Contact
  await prisma.page.create({
    data: {
      title: "Contact Us",
      slug: "contact-us",
      template: "contact",
      status: "published",
      sortOrder: 10,
      showInNav: true,
      sections: [
        {
          type: "hero",
          variant: "short",
          image: { id: "", url: "/placeholder.jpg", alt: "Contact" },
          title: "Get in",
          titleItalic: "Touch",
          showBreadcrumb: true,
          breadcrumb: [{ label: "Home", url: "/" }],
        },
        {
          type: "contact_form",
          title: "Send us a message",
          subtitle: "We'll get back to you within 24 hours",
          formType: "contact",
          fields: [
            { name: "name", label: "Full Name", type: "text", required: true, halfWidth: true },
            { name: "email", label: "Email", type: "email", required: true, halfWidth: true },
            { name: "phone", label: "Phone", type: "tel", halfWidth: true },
            { name: "subject", label: "Subject", type: "select", options: ["General Enquiry", "Reservations", "Events", "Other"], halfWidth: true },
            { name: "message", label: "Message", type: "textarea", required: true },
          ],
          submitLabel: "Send Message",
        },
        {
          type: "contact_info",
          sections: [
            {
              title: "Contact Details",
              items: [
                { label: "Email", value: "info@example.com", url: "mailto:info@example.com" },
                { label: "Phone", value: "+1-000-000-0000", url: "tel:+10000000000" },
                { label: "Address", value: "123 Hotel Street, City, Country" },
              ],
            },
          ],
        },
      ],
      seo: {},
    },
  });

  // Gallery
  await prisma.page.create({
    data: {
      title: "Gallery",
      slug: "gallery",
      template: "gallery",
      status: "published",
      sortOrder: 8,
      showInNav: true,
      sections: [
        {
          type: "filter_gallery",
          categories: ["All", "Resort", "Rooms", "Dining"],
          images: [],
        },
      ],
      seo: {},
    },
  });

  // ── Summary ──────────────────────────────────────────
  console.log("");
  console.log("✓ Created site settings");
  console.log("✓ Created admin user (admin@example.com / changeme)");
  console.log("✓ Created 4 pages (Home, About, Contact, Gallery)");
  console.log("");
  console.log("Seed complete. Run npm run dev and visit http://localhost:3000");
  console.log("");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
