"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useState } from "react";

export function AdminTopBar({ userName }: { userName: string }) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
    } catch {
      setLoggingOut(false);
    }
  }

  return (
    <header className="fixed top-0 left-64 right-0 h-14 bg-white border-b border-sand-dark/30 flex items-center justify-end px-6 z-20">
      <div className="flex items-center gap-4">
        <span className="text-sm text-text-light">{userName}</span>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-text-light hover:text-coral hover:bg-coral/5 transition disabled:opacity-50"
        >
          <LogOut size={16} />
          {loggingOut ? "Signing out..." : "Logout"}
        </button>
      </div>
    </header>
  );
}
