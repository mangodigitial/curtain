import Image from "next/image";
import type { Section } from "@/components/sections/types";
import type {
  HeroSection,
  IntroSection,
  RoomDetailSection,
  CTABandSection,
} from "@/components/sections/types";
import { renderTitle } from "@/components/sections/render-title";
import RoomDetail from "@/components/sections/RoomDetail";

/* ═══════════════════════════════════════════════════════════════════
   BeachfrontRoomsTemplate — page-level template for the Beach Front
   Rooms page.

   Reproduces the exact HTML structure from:
     curtain-bluff-templates/curtain-bluff-beachfront-rooms.html
   (body content between nav and footer)

   Section mapping:
     sections[0] = hero          (page-hero)
     sections[1] = intro         (room-nav tabs)
     sections[2] = room_detail   (Ground Floor Junior Suites)
     sections[3] = room_detail   (Upper Level Junior Suites)
     sections[4] = room_detail   (Ground Floor Deluxe)
     sections[5] = cta_band      (offers ribbon / also explore)
   ═══════════════════════════════════════════════════════════════════ */

/* ─── Helpers ────────────────────────────────────────────── */

function blurProps(blur?: string) {
  return blur ? { placeholder: "blur" as const, blurDataURL: blur } : {};
}

/* ─── Props ──────────────────────────────────────────────── */

interface BeachfrontRoomsTemplateProps {
  sections: Section[];
}

/* ─── Main Export ────────────────────────────────────────── */

export default function BeachfrontRoomsTemplate({
  sections,
}: BeachfrontRoomsTemplateProps) {
  const hero = sections[0] as HeroSection | undefined;
  const intro = sections[1] as IntroSection | undefined;
  const roomSections = sections.slice(2, 5) as RoomDetailSection[];
  const ctaBand = sections[5] as CTABandSection | undefined;

  return (
    <>
      {/* ═══ PAGE HERO ═══ */}
      {hero && <PageHero data={hero} />}

      {/* ═══ ROOM NAV TABS ═══ */}
      {intro && roomSections.length > 0 && (
        <RoomNav rooms={roomSections} />
      )}

      {/* ═══ ROOM SECTIONS ═══ */}
      {roomSections.map((room, i) => (
        <section
          key={room.id ?? i}
          id={room.id}
          className="room-section reveal"
        >
          <div className="room-inner">
            <RoomDetail data={room} />
          </div>
        </section>
      ))}

      {/* ═══ CTA BAND / OFFERS ═══ */}
      {ctaBand && <CtaBandSection data={ctaBand} />}
    </>
  );
}

/* ─── Page Hero ──────────────────────────────────────────
   Template: curtain-bluff-beachfront-rooms.html

   <section class="page-hero">
     <img class="page-hero-img" src="..." alt="Beach Front Rooms">
     <div class="page-hero-bg"></div>
     <div class="page-hero-content">
       <div class="page-hero-breadcrumb">
         <a href="#">Home</a> <span>→</span> <a href="#">Rooms</a> <span>→</span> Beach Front
       </div>
       <h1 class="page-hero-title">Beach Front<br><em>Rooms</em></h1>
       <p class="page-hero-sub">...</p>
     </div>
   </section>
────────────────────────────────────────────────────────── */

function PageHero({ data }: { data: HeroSection }) {
  return (
    <section className="page-hero">
      <Image
        src={data.image?.url || ""}
        alt={data.image?.alt || "Beach Front Rooms"}
        fill
        priority
        className="page-hero-img"
        sizes="100vw"
        {...blurProps(data.image?.blurhash)}
      />
      <div className="page-hero-bg" />
      <div className="page-hero-content">
        {data.breadcrumb && (
          <div className="page-hero-breadcrumb">
            {data.breadcrumb.map(
              (crumb: { label: string; url: string }, i: number) => (
                <span key={i}>
                  {i > 0 && <span>&rarr;</span>}
                  {crumb.url ? (
                    <a href={crumb.url}>{crumb.label}</a>
                  ) : (
                    crumb.label
                  )}
                </span>
              ),
            )}
          </div>
        )}
        <h1 className="page-hero-title">
          {renderTitle(data.title, data.titleItalic, "")}
        </h1>
        {data.subtitle && <p className="page-hero-sub">{data.subtitle}</p>}
      </div>
    </section>
  );
}

/* ─── Room Nav ───────────────────────────────────────────
   Template: curtain-bluff-beachfront-rooms.html

   <div class="room-nav" id="roomNav">
     <div class="room-nav-inner">
       <a href="#ground-junior" class="active">Ground Floor Junior Suites</a>
       <a href="#upper-junior">Upper Level Junior Suites</a>
       ...
     </div>
   </div>
────────────────────────────────────────────────────────── */

function RoomNav({ rooms }: { rooms: RoomDetailSection[] }) {
  return (
    <div className="room-nav" id="roomNav">
      <div className="room-nav-inner">
        {rooms.map((room, i) => (
          <a
            key={room.id ?? i}
            href={`#${room.id}`}
            className={i === 0 ? "active" : undefined}
          >
            {room.name}
            {room.nameItalic ? ` ${room.nameItalic}` : ""}
          </a>
        ))}
      </div>
    </div>
  );
}

/* ─── CTA Band / Offers Ribbon ──────────────────────────
   Template: curtain-bluff-beachfront-rooms.html

   <section class="offers-ribbon">
     <div class="offers-ribbon-header">
       <div class="section-label">Available for Beach Front Rooms</div>
       <h2>Special <em>Offers</em></h2>
     </div>
     ...
   </section>

   Also wraps the "Also Explore" section:
   <section class="also-explore">
     ...
   </section>
────────────────────────────────────────────────────────── */

function CtaBandSection({ data }: { data: CTABandSection }) {
  const bgClass =
    data.background === "dark"
      ? "also-explore"
      : data.background === "blush"
        ? "offers-ribbon"
        : "offers-ribbon";

  return (
    <section className={bgClass}>
      <div
        className={
          data.background === "dark"
            ? "also-explore-header"
            : "offers-ribbon-header"
        }
      >
        {data.description && (
          <div className="section-label">{data.description}</div>
        )}
        <h2>{renderTitle(data.title, data.titleItalic, "")}</h2>
      </div>
      {data.cta && (
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <a href={data.cta.url} className="room-cta">
            {data.cta.label}
          </a>
        </div>
      )}
    </section>
  );
}
