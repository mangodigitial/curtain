import { revalidatePath, revalidateTag } from "next/cache";

/**
 * Revalidate a specific page by its slug.
 */
export function revalidatePageBySlug(slug: string) {
  const path = slug === "home" ? "/" : `/${slug}`;
  revalidatePath(path);
}

/**
 * Revalidate a blog post by its slug.
 */
export function revalidateBlogPost(slug: string) {
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/blog");
}

/**
 * Revalidate all pages (used when site settings change).
 */
export function revalidateAll() {
  revalidatePath("/", "layout");
}

/**
 * Revalidate by cache tag.
 */
export async function revalidateByTag(tag: string) {
  await revalidateTag(tag, "/");
}
