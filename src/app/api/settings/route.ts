import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { revalidateAll } from "@/lib/revalidate";

const EMPTY_DEFAULTS = {
  id: "",
  name: "Hotel Name",
  domain: "example.com",
  branding: {
    colors: {
      primary: "#1a3c5e",
      secondary: "#2d6a8f",
      accent: "#d4a853",
      text: "#2c2c2c",
      background: "#faf8f5",
    },
    fonts: { heading: "Cormorant Garamond", body: "Libre Franklin" },
    border_radius: "8px",
  },
  seoDefaults: {
    title_suffix: "",
    default_description: "",
    google_site_verification: "",
    bing_site_verification: "",
  },
  analytics: {
    ga4_id: "",
    gtm_id: "",
    fb_pixel_id: "",
    hotjar_id: "",
    custom_scripts: [],
  },
  contact: {
    email: "",
    phone_numbers: [],
    address_lines: [],
    coordinates: { lat: 0, lng: 0 },
    social_links: [],
  },
  integrations: {
    booking_engine: { provider: "", url: "", widget_code: "" },
    newsletter: { provider: "none", api_key: "", list_id: "" },
    reviews: { tripadvisor_id: "", google_place_id: "" },
    chat_widget: { provider: "", code: "" },
  },
  legal: {
    cookie_policy_url: "",
    privacy_policy_url: "",
    terms_url: "",
    cookie_consent: { enabled: false, message: "" },
  },
  announcementBar: {
    enabled: false,
    message: "",
    link_url: "",
    link_text: "",
    visible_from: "",
    visible_to: "",
  },
};

export async function GET() {
  try {
    const settings = await db.siteSettings.findFirst();

    if (!settings) {
      return NextResponse.json(EMPTY_DEFAULTS);
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const {
      id,
      name,
      domain,
      branding,
      seoDefaults,
      analytics,
      contact,
      integrations,
      legal,
      announcementBar,
    } = body;

    const data = {
      name: name ?? "Hotel Name",
      domain: domain ?? "example.com",
      branding: branding ?? {},
      seoDefaults: seoDefaults ?? {},
      analytics: analytics ?? {},
      contact: contact ?? {},
      integrations: integrations ?? {},
      legal: legal ?? {},
      announcementBar: announcementBar ?? {},
    };

    let updated;

    if (id) {
      updated = await db.siteSettings.update({
        where: { id },
        data,
      });
    } else {
      // Check if any row exists
      const existing = await db.siteSettings.findFirst();
      if (existing) {
        updated = await db.siteSettings.update({
          where: { id: existing.id },
          data,
        });
      } else {
        updated = await db.siteSettings.create({ data });
      }
    }

    revalidateAll();

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
