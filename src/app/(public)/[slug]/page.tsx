import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getSiteSettings } from "@/lib/site-settings";
import SchemaOrg from "@/components/shared/SchemaOrg";
import SectionRenderer from "@/components/sections/SectionRenderer";
import type { Section } from "@/components/sections/types";
import type { Metadata } from "next";

import DiningTemplate from "@/components/templates/DiningTemplate";
import AboutTemplate from "@/components/templates/AboutTemplate";
import ActivitiesTemplate from "@/components/templates/ActivitiesTemplate";
import SpaTemplate from "@/components/templates/SpaTemplate";
import ContactTemplate from "@/components/templates/ContactTemplate";
import WeddingsTemplate from "@/components/templates/WeddingsTemplate";
import GalleryTemplate from "@/components/templates/GalleryTemplate";
import OffersTemplate from "@/components/templates/OffersTemplate";
import BeachfrontRoomsTemplate from "@/components/templates/BeachfrontRoomsTemplate";
import RoomsOnBluffTemplate from "@/components/templates/RoomsOnBluffTemplate";
import PoolSuitesTemplate from "@/components/templates/PoolSuitesTemplate";
import BentleysTemplate from "@/components/templates/BentleysTemplate";
import KidsCampTemplate from "@/components/templates/KidsCampTemplate";
import WaterSportsTemplate from "@/components/templates/WaterSportsTemplate";
import GroundSportsTemplate from "@/components/templates/GroundSportsTemplate";
import ScubaDivingTemplate from "@/components/templates/ScubaDivingTemplate";
import TennisTemplate from "@/components/templates/TennisTemplate";
import WellnessTemplate from "@/components/templates/WellnessTemplate";
import CaribbeanWeddingsTemplate from "@/components/templates/CaribbeanWeddingsTemplate";
import HoneymoonTemplate from "@/components/templates/HoneymoonTemplate";
import CorporateEventsTemplate from "@/components/templates/CorporateEventsTemplate";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/* slug → template mapping */
const TEMPLATES: Record<string, React.ComponentType<{ sections: any[] }>> = {
  "dining-drinks": DiningTemplate,
  "about": AboutTemplate,
  "activities": ActivitiesTemplate,
  "the-spa": SpaTemplate,
  "contact-us": ContactTemplate,
  "weddings-and-events": WeddingsTemplate,
  "gallery": GalleryTemplate,
  "special-offers": OffersTemplate,
  "beach-front-rooms": BeachfrontRoomsTemplate,
  "rooms-on-the-bluff": RoomsOnBluffTemplate,
  "pool-suites": PoolSuitesTemplate,
  "bentleys": BentleysTemplate,
  "cee-bee-kids-camp": KidsCampTemplate,
  "water-sports": WaterSportsTemplate,
  "ground-sports": GroundSportsTemplate,
  "scuba-diving": ScubaDivingTemplate,
  "tennis": TennisTemplate,
  "wellness": WellnessTemplate,
  "caribbean-weddings": CaribbeanWeddingsTemplate,
  "honeymoon": HoneymoonTemplate,
  "corporate-events": CorporateEventsTemplate,
};

export async function generateStaticParams() {
  try {
    const pages = await db.page.findMany({
      where: { status: "published" },
      select: { slug: true },
    });
    return pages
      .filter((p) => p.slug !== "home")
      .map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await db.page.findUnique({ where: { slug } });
  const settings = await getSiteSettings();
  const suffix = settings?.seoDefaults?.title_suffix || "";

  if (!page) return { title: `Not Found${suffix}` };

  const seo = page.seo as Record<string, string> | null;

  return {
    title: seo?.meta_title || `${page.title}${suffix}`,
    description:
      seo?.meta_description || settings?.seoDefaults?.default_description,
    openGraph: {
      title: seo?.og_title || page.title,
      description: seo?.og_description || seo?.meta_description,
    },
  };
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params;

  const page = await db.page.findUnique({
    where: { slug },
  });

  if (!page || page.status !== "published") {
    notFound();
  }

  const sections = page.sections as any[];
  const seo = page.seo as Record<string, unknown> | null;

  const Template = TEMPLATES[slug];

  return (
    <>
      {Template ? (
        <Template sections={sections} />
      ) : (
        <SectionRenderer sections={sections as unknown as Section[]} />
      )}
      <SchemaOrg
        schemaType={(seo?.schema_type as string) || undefined}
        page={{
          title: page.title,
          slug: page.slug,
          seo: seo || undefined,
          sections: sections as unknown as Section[],
        }}
      />
    </>
  );
}
