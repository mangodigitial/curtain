import Link from "next/link";
import { db } from "@/lib/db";

const statusColors: Record<string, string> = {
  published: "bg-green-100 text-green-800",
  draft: "bg-yellow-100 text-yellow-800",
  scheduled: "bg-blue-100 text-blue-800",
};

export default async function PagesListPage() {
  const pages = await db.page.findMany({
    orderBy: { sortOrder: "asc" },
    include: { children: { orderBy: { sortOrder: "asc" } } },
  });

  const topLevel = pages.filter((p) => !p.parentId);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-3xl font-semibold text-ocean-deep">
          Pages
        </h1>
        <Link
          href="/admin/pages/new"
          className="px-4 py-2 bg-ocean text-sand text-sm rounded hover:bg-ocean-deep transition-colors"
        >
          New Page
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-sand-light border-b border-sand-dark/20">
            <tr>
              <th className="px-4 py-3 font-medium text-text-light">Title</th>
              <th className="px-4 py-3 font-medium text-text-light">Slug</th>
              <th className="px-4 py-3 font-medium text-text-light">Status</th>
              <th className="px-4 py-3 font-medium text-text-light">
                Template
              </th>
              <th className="px-4 py-3 font-medium text-text-light" />
            </tr>
          </thead>
          <tbody className="divide-y divide-sand/60">
            {topLevel.map((page) => (
              <PageRows key={page.id} page={page} depth={0} />
            ))}
            {topLevel.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-text-light">
                  No pages yet. Create your first page to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PageRows({
  page,
  depth,
}: {
  page: {
    id: string;
    title: string;
    slug: string;
    status: string;
    template: string;
    children?: {
      id: string;
      title: string;
      slug: string;
      status: string;
      template: string;
      children?: unknown[];
    }[];
  };
  depth: number;
}) {
  return (
    <>
      <tr className="hover:bg-sand-light/50 transition-colors">
        <td className="px-4 py-3 font-medium">
          <span style={{ paddingLeft: `${depth * 24}px` }}>
            {depth > 0 && (
              <span className="text-text-light mr-1">&mdash;</span>
            )}
            {page.title}
          </span>
        </td>
        <td className="px-4 py-3 text-text-light font-mono text-xs">
          /{page.slug}
        </td>
        <td className="px-4 py-3">
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              statusColors[page.status] || "bg-gray-100 text-gray-800"
            }`}
          >
            {page.status}
          </span>
        </td>
        <td className="px-4 py-3 text-text-light">{page.template}</td>
        <td className="px-4 py-3 text-right">
          <Link
            href={`/admin/pages/${page.id}`}
            className="text-ocean hover:text-ocean-deep text-xs font-medium"
          >
            Edit
          </Link>
        </td>
      </tr>
      {page.children?.map((child) => (
        <PageRows
          key={child.id}
          page={{ ...child, children: [] }}
          depth={depth + 1}
        />
      ))}
    </>
  );
}
