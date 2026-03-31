"use client";

import { useEffect, useRef, useCallback } from "react";

interface VitalEntry {
  name: string;
  value: number;
  id: string;
  page: string;
}

export default function WebVitals() {
  const queue = useRef<VitalEntry[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flush = useCallback(() => {
    if (queue.current.length === 0) return;

    const batch = [...queue.current];
    queue.current = [];

    navigator.sendBeacon?.(
      "/api/vitals",
      JSON.stringify(batch)
    ) ||
      fetch("/api/vitals", {
        method: "POST",
        body: JSON.stringify(batch),
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      }).catch(() => {
        // Silently fail — vitals are non-critical
      });
  }, []);

  const enqueue = useCallback(
    (entry: VitalEntry) => {
      queue.current.push(entry);

      // Reset the batch timer on each new entry; flush after 5s of quiet
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(flush, 5_000);
    },
    [flush]
  );

  useEffect(() => {
    const page = window.location.pathname;

    // ---------- LCP ----------
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        if (last) {
          enqueue({
            name: "LCP",
            value: last.startTime,
            id: `lcp-${Date.now()}`,
            page,
          });
        }
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      // Not supported
    }

    // ---------- FID / FCP ----------
    try {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === "first-input") {
            enqueue({
              name: "FID",
              value: (entry as PerformanceEventTiming).processingStart - entry.startTime,
              id: `fid-${Date.now()}`,
              page,
            });
          }
        }
      });
      fidObserver.observe({ type: "first-input", buffered: true });
    } catch {
      // Not supported
    }

    // ---------- CLS ----------
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (!(entry as any).hadRecentInput) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            clsValue += (entry as any).value;
          }
        }
        enqueue({
          name: "CLS",
          value: clsValue,
          id: `cls-${Date.now()}`,
          page,
        });
      });
      clsObserver.observe({ type: "layout-shift", buffered: true });
    } catch {
      // Not supported
    }

    // ---------- TTFB ----------
    try {
      const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
      if (navEntries.length > 0) {
        enqueue({
          name: "TTFB",
          value: navEntries[0].responseStart - navEntries[0].requestStart,
          id: `ttfb-${Date.now()}`,
          page,
        });
      }
    } catch {
      // Not supported
    }

    // Flush remaining vitals when the page is hidden
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        flush();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (timerRef.current) clearTimeout(timerRef.current);
      flush();
    };
  }, [enqueue, flush]);

  return null;
}
