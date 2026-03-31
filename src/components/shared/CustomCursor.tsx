"use client";

import { useEffect, useRef, useState } from "react";

/* ─── CustomCursor ───────────────────────────────────── */

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only enable on pointer-fine devices (no touch)
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    setVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px) scale(${hovering ? 3.5 : 1})`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          "a, button, [role='button'], select, input, textarea",
        )
      ) {
        setHovering(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          "a, button, [role='button'], select, input, textarea",
        )
      ) {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [hovering]);

  if (!visible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-3 h-3 bg-coral rounded-full pointer-events-none z-[10000]"
      style={{
        mixBlendMode: "difference",
        filter: "invert(1)",
        transition: "transform 0.15s ease",
        transform: `translate(${posRef.current.x - 6}px, ${posRef.current.y - 6}px) scale(${hovering ? 3.5 : 1})`,
      }}
    />
  );
}
