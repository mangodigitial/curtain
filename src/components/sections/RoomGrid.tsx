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
    <a href={room.url} className="room-card">
      <Image
        src={room.image.url}
        alt={room.image.alt}
        width={room.image.width ?? 600}
        height={room.image.height ?? 800}
        className="room-card-img"
        sizes="(max-width: 900px) 100vw, 33vw"
        {...(room.image.blurhash
          ? { placeholder: "blur" as const, blurDataURL: room.image.blurhash }
          : {})}
      />

      <div className="room-card-overlay">
        <h3 className="room-card-name">{room.name}</h3>
        <p className="room-card-desc">{room.description}</p>
        <span className="room-card-link">Discover &rarr;</span>
      </div>
    </a>
  );
}

/* ─── Main Export ─────────────────────────────────────── */

export default function RoomGrid({ data }: { data: RoomGridSection }) {
  return (
    <section className="rooms reveal" id="rooms">
      {/* Header */}
      {(data.label || data.title) && (
        <div className="rooms-header">
          {data.label && (
            <div className="section-label">{data.label}</div>
          )}

          {data.title && (
            <h2 className="section-heading">
              {renderTitle(data.title, data.titleItalic, "")}
            </h2>
          )}
        </div>
      )}

      {/* Grid */}
      <div className="rooms-grid">
        {data.rooms.map((room) => (
          <RoomCard key={room.name} room={room} />
        ))}
      </div>
    </section>
  );
}
