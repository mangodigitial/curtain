"use client";

import { useEffect } from "react";

/* ─── DataLayerEvents ────────────────────────────────── */

/**
 * Pushes dataLayer events for common user interactions
 * using event delegation on the document body.
 */
export default function DataLayerEvents() {
  useEffect(() => {
    function pushEvent(event: string, metadata: Record<string, string>) {
      (window as unknown as { dataLayer?: Record<string, unknown>[] }).dataLayer?.push({
        event,
        ...metadata,
      });
    }

    /* ── Click handler (delegation) ── */
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("a, button");
      if (!target) return;

      const anchor = target.closest("a") as HTMLAnchorElement | null;

      // Phone tap
      if (anchor?.href?.startsWith("tel:")) {
        pushEvent("phone_tap", {
          phone_number: anchor.href.replace("tel:", ""),
        });
        return;
      }

      // Email tap
      if (anchor?.href?.startsWith("mailto:")) {
        pushEvent("email_tap", {
          email_address: anchor.href.replace("mailto:", ""),
        });
        return;
      }

      // Booking click — href contains "book" or "reserv", or class contains "book"
      if (anchor) {
        const href = anchor.href.toLowerCase();
        const className = anchor.className.toLowerCase();
        if (
          href.includes("book") ||
          href.includes("reserv") ||
          className.includes("book")
        ) {
          pushEvent("booking_click", {
            booking_url: anchor.href,
            link_text: anchor.textContent?.trim() || "",
          });
        }
      }
    }

    /* ── Form submit handler ── */
    function handleSubmit(e: Event) {
      const form = e.target as HTMLFormElement;
      pushEvent("form_submit", {
        form_action: form.action || "",
        form_id: form.id || "",
        form_name: form.getAttribute("name") || "",
      });
    }

    document.addEventListener("click", handleClick, true);
    document.addEventListener("submit", handleSubmit, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("submit", handleSubmit, true);
    };
  }, []);

  return null;
}
