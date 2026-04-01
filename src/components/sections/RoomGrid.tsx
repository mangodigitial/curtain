import Image from "next/image";
import type { RoomGridSection } from "./types";
import { renderTitle } from "./render-title";

/* ─── Template: curtain-bluff-redesign.html line 1143 ────
   <section class="rooms reveal" id="rooms">
     <div class="rooms-header">
       <div class="section-label" style="justify-content:center">...</div>
       <h2 class="section-heading">... <em>...</em></h2>
       <p class="section-body">...</p>
     </div>
     <div class="rooms-grid">
       <div class="room-card">
         <img class="room-card-img" src="..." alt="...">
         <div class="room-card-overlay">
           <h3 class="room-card-name">...</h3>
           <p class="room-card-desc">...</p>
           <a href="#" class="room-card-link">View Rooms →</a>
         </div>
       </div>
     </div>
   </section>
──────────────────────────────────────────────────────────── */

function RoomCard({ room }: { room: RoomGridSection["rooms"][number] }) {
  return (
    <div className="room-card">
      <Image
        src={room?.image?.url}
        alt={room?.image?.alt}
        width={room?.image?.width ?? 700}
        height={room?.image?.height ?? 933}
        className="room-card-img"
        sizes="(max-width: 900px) 100vw, 33vw"
        {...(room?.image?.blurhash
          ? { placeholder: "blur" as const, blurDataURL: room?.image?.blurhash }
          : {})}
      />
      <div className="room-card-overlay">
        <h3 className="room-card-name">{room.name}</h3>
        <p className="room-card-desc">{room.description}</p>
        <a href={room.url} className="room-card-link">View Rooms &rarr;</a>
      </div>
    </div>
  );
}

export default function RoomGrid({ data }: { data: RoomGridSection }) {
  return (
    <section className="rooms reveal" id="rooms">
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
          {data.body && (
            <p className="section-body">{data.body}</p>
          )}
        </div>
      )}
      <div className="rooms-grid">
        {(data?.rooms ?? []).map((room) => (
          <RoomCard key={room.name} room={room} />
        ))}
      </div>
    </section>
  );
}
