import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { AdminSidebar } from "../admin-sidebar";
import { AdminTopBar } from "../admin-top-bar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-sand-light">
      <AdminSidebar />
      <AdminTopBar userName={user.name} />
      <main className="ml-64 pt-14 p-8">{children}</main>
    </div>
  );
}
