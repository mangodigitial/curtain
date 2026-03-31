"use client";

import { useState, useEffect } from "react";

/* ─── Props ──────────────────────────────────────────── */

interface AnnouncementBarProps {
  enabled: boolean;
  message: string;
  linkUrl?: string;
  linkText?: string;
  visibleFrom?: string; // ISO date string
  visibleTo?: string;   // ISO date string
}

const STORAGE_KEY = "announcement_dismissed";

/* ─── AnnouncementBar ────────────────────────────────── */

export default function AnnouncementBar({
  enabled,
  message,
  linkUrl,
  linkText,
  visibleFrom,
  visibleTo,
}: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (!enabled) return;

    // Check date range
    const now = new Date();
    if (visibleFrom && now < new Date(visibleFrom)) return;
    if (visibleTo && now > new Date(visibleTo)) return;

    // Check session storage
    const wasDismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!wasDismissed) {
      setDismissed(false);
    }
  }, [enabled, visibleFrom, visibleTo]);

  const handleDismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "true");
    setDismissed(true);
  };

  if (!enabled || dismissed) return null;

  return (
    <div className="bg-gold text-ocean-deep py-2.5 px-12 flex justify-center items-center gap-4 relative">
      <p className="text-[0.7rem] tracking-[0.1em] font-medium">
        {message}
        {linkUrl && linkText && (
          <>
            {" "}
            <a
              href={linkUrl}
              className="underline font-medium hover:opacity-80 transition-opacity"
            >
              {linkText}
            </a>
          </>
        )}
      </p>

      <button
        onClick={handleDismiss}
        className="absolute right-4 text-lg opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Dismiss announcement"
      >
        &times;
      </button>
    </div>
  );
}
