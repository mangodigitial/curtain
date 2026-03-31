/* ─── GrainOverlay (server component) ────────────────── */

export default function GrainOverlay() {
  const svgNoise = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.025]"
      style={{
        backgroundImage: svgNoise,
        backgroundSize: "256px",
      }}
      aria-hidden="true"
    />
  );
}
