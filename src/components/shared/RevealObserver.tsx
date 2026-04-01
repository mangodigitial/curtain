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

    // Observe all current .reveal elements
    document.querySelectorAll(".reveal:not(.visible)").forEach((el) => {
      observer.observe(el);
    });

    // Watch for new .reveal elements added to the DOM
    const mutation = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node instanceof HTMLElement) {
            if (node.classList.contains("reveal") && !node.classList.contains("visible")) {
              observer.observe(node);
            }
            node.querySelectorAll?.(".reveal:not(.visible)").forEach((el) => {
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
