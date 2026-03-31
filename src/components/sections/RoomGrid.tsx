import Image from "next/image";
import type { RoomGridSection } from "./types";
import { renderTitle } from "./render-title";

/* ─── Room Card ──────────────────────────────────────── */

function RoomCard({
  room,
}: {
  room: RoomGridSection["rooms"][number];
}) {
  return (
    <a href={room.url} className="group relative overflow-hidden">
      <Image
        src={room.image.url}
        alt={room.image.alt}
        width={room.image.width ?? 600}
        height={room.image.height ?? 800}
        className="aspect-[3/4] w-full object-cover transition-transform duration-[800ms] group-hover:scale-[1.06]"
        sizes="(max-width: 768px) 100vw, 33vw"
        {...(room.image.blurhash
          ? { placeholder: "blur", blurDataURL: room.image.blurhash }
          : {})}
      />

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[rgba(13,47,58,0.85)] to-transparent p-8">
        <h3 className="mb-2 font-heading text-[1.6rem] font-normal text-white">
          {room.name}
        </h3>

        <p className="max-h-0 text-[0.75rem] font-light leading-relaxed text-white/65 opacity-0 transition-all duration-500 group-hover:max-h-[100px] group-hover:opacity-100">
          {room.description}
        </p>

        <span className="mt-4 text-[0.6rem] uppercase tracking-[0.3em] text-gold-light">
          Discover
        </span>
      </div>
    </a>
  );
}

/* ─── Main Export ─────────────────────────────────────── */

export default function RoomGrid({ data }: { data: RoomGridSection }) {
  return (
    <section className="bg-sand-light py-28">
      {/* Header */}
      {(data.label || data.title) && (
        <div className="mb-16 px-12 text-center">
          {data.label && (
            <p className="mb-6 flex items-center justify-center gap-4 text-[0.55rem] font-medium uppercase tracking-[0.5em] text-gold">
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              {data.label}
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
            </p>
          )}

          {data.title && (
            <h2 className="font-heading text-[clamp(1.8rem,3vw,2.4rem)] font-light leading-[1.3] text-ocean-deep">
              {renderTitle(data.title, data.titleItalic)}
            </h2>
          )}
        </div>
      )}

      {/* Grid */}
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-12 md:grid-cols-3">
        {data.rooms.map((room) => (
          <RoomCard key={room.name} room={room} />
        ))}
      </div>
    </section>
  );
}
