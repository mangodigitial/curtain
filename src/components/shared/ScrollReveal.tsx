"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setVisible(true), delay);
          } else {
            setVisible(true);
          }
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[900ms] ease-out ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
}
