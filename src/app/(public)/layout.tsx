import { getSiteSettings } from "@/lib/site-settings";
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import GrainOverlay from "@/components/shared/GrainOverlay";
import BookingBar from "@/components/shared/BookingBar";
import AnnouncementBar from "@/components/shared/AnnouncementBar";
import CookieConsent from "@/components/shared/CookieConsent";
import Analytics from "@/components/shared/Analytics";
import DataLayerEvents from "@/components/shared/DataLayerEvents";
import SchemaOrg from "@/components/shared/SchemaOrg";
import WebVitals from "@/components/shared/WebVitals";
import RevealObserver from "@/components/shared/RevealObserver";

const NAV_LINKS = [
  {
    number: "01", label: "Rooms & Suites", href: "/rooms",
    children: [
      { label: "Beach Front Rooms", href: "/beach-front-rooms" },
      { label: "Rooms on the Bluff", href: "/rooms-on-the-bluff" },
      { label: "Pool Suites", href: "/pool-suites" },
    ],
  },
  { number: "02", label: "Dining & Drinks", href: "/dining-drinks" },
  { number: "03", label: "Activities", href: "/activities" },
  { number: "04", label: "Wellness", href: "/wellness" },
  { number: "05", label: "Weddings & Events", href: "/weddings-and-events" },
  { number: "06", label: "Gallery", href: "/gallery" },
  { number: "07", label: "Contact", href: "/contact-us" },
];

const FOOTER_COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "Rooms & Suites", href: "/rooms" },
      { label: "Dining & Drinks", href: "/dining-drinks" },
      { label: "Activities", href: "/activities" },
      { label: "The Spa", href: "/the-spa" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Experience",
    links: [
      { label: "Weddings & Events", href: "/weddings-and-events" },
      { label: "Special Offers", href: "/special-offers" },
      { label: "Bentley Transfers", href: "/bentleys" },
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Information",
    links: [
      { label: "Contact Us", href: "/contact-us" },
      { label: "Getting Here", href: "/about" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  const bookingUrl =
    settings?.integrations?.booking_engine?.url || "https://curtainbluff.com/reservations";

  const announcementBar = settings?.announcementBar;

  return (
    <>
      <SchemaOrg
        schemaType="Hotel"
        siteSettings={settings ? { name: settings.name, domain: settings.domain, contact: settings.contact } : undefined}
      />

      {announcementBar?.enabled && (
        <AnnouncementBar
          enabled={announcementBar.enabled}
          message={announcementBar.message || ""}
          linkUrl={announcementBar.link_url}
          linkText={announcementBar.link_text}
          visibleFrom={announcementBar.visible_from}
          visibleTo={announcementBar.visible_to}
        />
      )}

      <Navigation
        siteName="Curtain"
        siteNameItalic="Bluff"
        bookingUrl={bookingUrl}
        menuLinks={NAV_LINKS}
        contactInfo={{
          phone: settings?.contact?.phone_numbers?.[0]?.number,
          email: settings?.contact?.email,
          address: settings?.contact?.address_lines?.join(", "),
        }}
      />

      <main>{children}</main>

      <Footer
        siteName="Curtain"
        siteNameItalic="Bluff"
        description="An intimate, all-inclusive luxury resort on the southern coast of Antigua, where pristine beaches meet world-class hospitality."
        columns={FOOTER_COLUMNS}
        badges={["Five Star", "All Inclusive", "Est. 1962"]}
      />

      <BookingBar bookingUrl={bookingUrl} />
      <GrainOverlay />
      <CookieConsent />

      <Analytics
        ga4Id={settings?.analytics?.ga4_id}
        gtmId={settings?.analytics?.gtm_id}
        fbPixelId={settings?.analytics?.fb_pixel_id}
        hotjarId={settings?.analytics?.hotjar_id}
      />
      <DataLayerEvents />
      <WebVitals />
      <RevealObserver />
    </>
  );
}
