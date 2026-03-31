import { cache } from "react";
import { db } from "./db";

export interface SiteSettingsData {
  id: string;
  name: string;
  domain: string;
  branding: {
    logo_light?: string;
    logo_dark?: string;
    favicon?: string;
    og_default_image?: string;
    colors?: Record<string, string>;
    fonts?: { heading?: string; body?: string; accent?: string };
    border_radius?: string;
  };
  seoDefaults: {
    title_suffix?: string;
    default_description?: string;
    default_og_image?: string;
    google_site_verification?: string;
    bing_site_verification?: string;
  };
  analytics: {
    ga4_id?: string;
    gtm_id?: string;
    fb_pixel_id?: string;
    hotjar_id?: string;
    custom_scripts?: { location: "head" | "body"; code: string }[];
  };
  contact: {
    email?: string;
    phone_numbers?: { label: string; number: string }[];
    address_lines?: string[];
    coordinates?: { lat: number; lng: number };
    social_links?: { platform: string; url: string }[];
  };
  integrations: {
    booking_engine?: { provider?: string; url?: string; widget_code?: string };
    newsletter?: { provider?: string; api_key?: string; list_id?: string };
    reviews?: { tripadvisor_id?: string; google_place_id?: string };
    chat_widget?: { provider?: string; code?: string };
  };
  legal: {
    cookie_policy_url?: string;
    privacy_policy_url?: string;
    terms_url?: string;
    cookie_consent?: {
      enabled?: boolean;
      message?: string;
      categories?: string[];
    };
  };
  announcementBar: {
    enabled?: boolean;
    message?: string;
    link_url?: string;
    link_text?: string;
    visible_from?: string;
    visible_to?: string;
  };
}

export const getSiteSettings = cache(async (): Promise<SiteSettingsData | null> => {
  try {
    const settings = await db.siteSettings.findFirst();
    if (!settings) return null;
    return settings as unknown as SiteSettingsData;
  } catch {
    return null;
  }
});
