import { db } from "@/lib/db";
import SectionRenderer from "@/components/sections/SectionRenderer";
import type { Section } from "@/components/sections/types";
import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const suffix = settings?.seoDefaults?.title_suffix || "";

  return {
    title: `Home${suffix}`,
    description:
      settings?.seoDefaults?.default_description ||
      "Curtain Bluff is an all-inclusive luxury resort on the southern coast of Antigua.",
  };
}

export default async function HomePage() {
  let page = null;
  try {
    page = await db.page.findUnique({
      where: { slug: "home" },
    });
  } catch {
    // DB not available at build time
  }

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-5xl font-light font-heading text-ocean-deep tracking-wide">
            Curtain Bluff
          </h1>
          <p className="mt-4 text-text-light text-lg tracking-widest uppercase">
            Antigua
          </p>
          <p className="mt-8 text-sm text-text-light">
            Run the seed script to populate content.
          </p>
        </div>
      </div>
    );
  }

  const sections = page.sections as unknown as Section[];

  return <SectionRenderer sections={sections} />;
}
