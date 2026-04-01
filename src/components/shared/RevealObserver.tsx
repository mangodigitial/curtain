"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );

    // Observe all elements that start hidden and need scroll reveal
    const selector = ".reveal:not(.visible), .room-section:not(.visible)";
    document.querySelectorAll(selector).forEach((el) => {
      observer.observe(el);
    });

    // Watch for new elements added to the DOM
    const mutation = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node instanceof HTMLElement) {
            if ((node.classList.contains("reveal") || node.classList.contains("room-section")) && !node.classList.contains("visible")) {
              observer.observe(node);
            }
            node.querySelectorAll?.(selector).forEach((el) => {
              observer.observe(el);
            });
          }
        }
      }
    });

    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, [pathname]);

  return null;
}
