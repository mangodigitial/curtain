import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getSiteSettings } from "@/lib/site-settings";
import SectionRenderer from "@/components/sections/SectionRenderer";
import type { Section } from "@/components/sections/types";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string; child: string }>;
}

export async function generateStaticParams() {
  try {
    const pages = await db.page.findMany({
      where: { status: "published", parentId: { not: null } },
      select: { slug: true, parent: { select: { slug: true } } },
    });

    return pages
      .filter((p) => p.parent)
      .map((p) => ({
        slug: p.parent!.slug,
        child: p.slug,
      }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { child } = await params;
  const page = await db.page.findUnique({ where: { slug: child } });
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

export default async function ChildPage({ params }: PageProps) {
  const { slug, child } = await params;

  const page = await db.page.findUnique({
    where: { slug: child },
    include: { parent: true },
  });

  if (!page || page.status !== "published") {
    notFound();
  }

  // Verify the parent slug matches
  if (page.parent?.slug !== slug) {
    notFound();
  }

  const sections = page.sections as unknown as Section[];

  return <SectionRenderer sections={sections} />;
}
