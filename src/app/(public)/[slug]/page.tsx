import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getSiteSettings } from "@/lib/site-settings";
import SectionRenderer from "@/components/sections/SectionRenderer";
import SchemaOrg from "@/components/shared/SchemaOrg";
import type { Section } from "@/components/sections/types";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

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

  const sections = page.sections as unknown as Section[];
  const seo = page.seo as Record<string, unknown> | null;

  return (
    <>
      <SectionRenderer sections={sections} />
      <SchemaOrg
        schemaType={(seo?.schema_type as string) || undefined}
        page={{
          title: page.title,
          slug: page.slug,
          seo: seo || undefined,
          sections: sections,
        }}
      />
    </>
  );
}
