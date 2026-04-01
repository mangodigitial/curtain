"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════════
   RoomsOnBluffTemplate — page-level template for the Rooms on the
   Bluff page.

   Reproduces the exact HTML structure from BeachfrontRoomsTemplate
   with content from the rooms-on-the-bluff page.
   ═══════════════════════════════════════════════════════════════════ */

/* ─── Carousel Hook ─────────────────────────────────────── */

function useCarousel(total: number) {
  const [index, setIndex] = useState(0);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + total) % total),
    [total],
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % total),
    [total],
  );
  return { index, prev, next };
}

/* ─── RoomCarousel ──────────────────────────────────────── */

function RoomCarousel({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  const { index, prev, next } = useCarousel(images.length);

  return (
    <div className="room-carousel">
      <div className="room-carousel-counter">
        <span className="cur">{index + 1}</span> /{" "}
        <span className="tot">{images.length}</span>
      </div>
      <div
        className="room-carousel-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <img key={i} src={img.src} alt={img.alt} />
        ))}
      </div>
      <div className="room-carousel-controls">
        <button
          className="room-carousel-btn prev"
          aria-label="Previous"
          onClick={prev}
        >
          &#8249;
        </button>
        <button
          className="room-carousel-btn next"
          aria-label="Next"
          onClick={next}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
}

/* ─── AmenitiesToggle ───────────────────────────────────── */

function AmenitiesToggle({ amenities }: { amenities: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className={`room-amenities-toggle${open ? " open" : ""}`}
        onClick={() => setOpen((o) => !o)}
      >
        Features &amp; Amenities <span className="chevron">&#9660;</span>
      </button>
      <div className={`room-amenities-list${open ? " open" : ""}`}>
        <div className="room-amenities-grid">
          {amenities.map((a, i) => (
            <span key={i} className="room-amenity">
              {a}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─── Main Export ────────────────────────────────────────── */

export default function RoomsOnBluffTemplate({
  sections,
}: {
  sections: any[];
}) {
  return (
    <>
      {/* ═══ PAGE HERO ═══ */}
      <section className="page-hero">
        <img
          className="page-hero-img"
          src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/pt-rooms-on-bluff-bg.webp"
          alt="Rooms on the Bluff"
        />
        <div className="page-hero-bg" />
        <div className="page-hero-content">
          <div className="page-hero-breadcrumb">
            <Link href="/">Home</Link> <span>&rarr;</span>{" "}
            <Link href="/rooms">Rooms</Link> <span>&rarr;</span> On the Bluff
          </div>
          <h1 className="page-hero-title">
            Rooms on
            <br />
            <em>the Bluff</em>
          </h1>
          <p className="page-hero-sub">
            Alarm clocks become a thing of the past as you awaken to calming
            breezes and the gentle lull of crashing waves in one of our
            blufftop accommodations.
          </p>
        </div>
      </section>

      {/* ═══ ROOM NAV ═══ */}
      <div className="room-nav" id="roomNav">
        <div className="room-nav-inner">
          <a href="#bluff-room" className="active">
            Bluff Room
          </a>
          <a href="#one-bedroom-bluff-suite">One Bedroom Bluff Suite</a>
          <a href="#morris-bay-suite">Morris Bay Suite</a>
        </div>
      </div>

      {/* ═══ Room 1: Bluff Room ═══ */}
      <section className="room-section" id="bluff-room">
        <div className="room-inner">
          <RoomCarousel
            images={[
              {
                src: "https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/bluff-room-balcony-jpg.webp",
                alt: "Bluff Room balcony view",
              },
              {
                src: "https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/Bluff-1.webp",
                alt: "Bluff Room interior",
              },
              {
                src: "https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/Bluff-5.webp",
                alt: "Bluff Room terrace",
              },
            ]}
          />
          <div className="room-details">
            <div className="room-type-label">Accommodations</div>
            <h2 className="room-name">
              Bluff
              <br />
              <em>Room</em>
            </h2>
            <p className="room-desc">
              Experience blufftop luxury from the comfort of our newly
              renovated bluff rooms. Each room features a king-size bed,
              freestanding tub, large terrace with daybed and incredible
              views of the turquoise waters below. For families requiring
              two bedrooms, the bluff room can be added to a one-bedroom
              bluff suite.
            </p>
            <div className="room-stats">
              <div className="room-stat">
                <div className="room-stat-val">816</div>
                <div className="room-stat-label">Sq. Ft.</div>
              </div>
              <div className="room-stat">
                <div className="room-stat-val">King</div>
                <div className="room-stat-label">Bed</div>
              </div>
              <div className="room-stat">
                <div className="room-stat-val">2</div>
                <div className="room-stat-label">Max Guests</div>
              </div>
            </div>
            <AmenitiesToggle
              amenities={[
                "Free WiFi",
                "King-size bed",
                "Freestanding tub",
                "Personal refrigerator",
                "Hair dryer",
                "Room service",
                "Amazing views",
                "Large terrace with daybed",
                "Air conditioned",
                "816 Sq. Ft.",
              ]}
            />
            <a href="https://curtainbluff.com/reservations" className="room-cta">
              Book This Room
            </a>
          </div>
        </div>
      </section>

      {/* ═══ Room 2: One Bedroom Bluff Suite ═══ */}
      <section className="room-section" id="one-bedroom-bluff-suite">
        <div className="room-inner">
          <RoomCarousel
            images={[
              {
                src: "https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/Bluff-6-1.webp",
                alt: "Bluff Suite living area",
              },
              {
                src: "https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/Bluff-2.webp",
                alt: "Bluff Suite bedroom",
              },
              {
                src: "https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/Bluff-3.webp",
                alt: "Bluff Suite terrace",
              },
              {
                src: "https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/Bluff-4.webp",
                alt: "Bluff Suite bathroom",
              },
            ]}
          />
          <div className="room-details">
            <div className="room-type-label">Accommodations</div>
            <h2 className="room-name">
              One Bedroom
              <br />
              <em>Bluff Suite</em>
            </h2>
            <p className="room-desc">
              Overlooking our surf beach from their perch atop the bluff are
              our five one- and two-bedroom bluff suites. These light and
              airy rooms are split across three spacious levels outfitted
              with natural wood and sea-grass furniture. The three-walled
              living room offers the best of indoor-outdoor living, opening
              onto a garden patio with relaxing daybed where you&apos;ll
              enjoy dozing off to the sound of the waves. Upstairs,
              you&apos;ll find a breakfast nook and dining terrace, beyond
              which is the bedroom with an ensuite bath and adjoining
              oceanfront patio.
            </p>
            <div className="room-stats">
              <div className="room-stat">
                <div className="room-stat-val">1,759</div>
                <div className="room-stat-label">Sq. Ft.</div>
              </div>
              <div className="room-stat">
                <div className="room-stat-val">5</div>
                <div className="room-stat-label">Suites</div>
              </div>
              <div className="room-stat">
                <div className="room-stat-val">4</div>
                <div className="room-stat-label">Max Guests</div>
              </div>
            </div>
            <AmenitiesToggle
              amenities={[
                "Free WiFi",
                "One or two bedroom options",
                "Personal refrigerator",
                "Hair dryer",
                "Room service",
                "Amazing views",
                "Open-air living room",
                "Garden patio with daybed",
                "Air conditioned",
                "One bedroom 1,759 Sq. Ft. / Two bedroom 2,756 Sq. Ft.",
              ]}
            />
            <a href="https://curtainbluff.com/reservations" className="room-cta">
              Book This Suite
            </a>
          </div>
        </div>
      </section>

      {/* ═══ Room 3: Morris Bay Suite ═══ */}
      <section className="room-section" id="morris-bay-suite">
        <div className="room-inner">
          <RoomCarousel
            images={[
              {
                src: "https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/morris-bay-bedroom-curtain-bluff.webp",
                alt: "Morris Bay Suite bedroom",
              },
              {
                src: "https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/morris-bay-living-room-curtain-bluff.webp",
                alt: "Morris Bay Suite living room",
              },
              {
                src: "https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/morris-bay-bathroom-curtain-bluff.webp",
                alt: "Morris Bay Suite bathroom",
              },
              {
                src: "https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/morris-bay-shower-curtain-bluff.webp",
                alt: "Morris Bay Suite shower",
              },
            ]}
          />
          <div className="room-details">
            <div className="room-type-label">Accommodations</div>
            <h2 className="room-name">
              Morris Bay
              <br />
              <em>Suite</em>
            </h2>
            <p className="room-desc">
              Our most luxurious suites, with expansive living spaces and
              private terraces overlooking Morris Bay. Featuring a separate
              living room, walk-in rain shower, dual vanity bathroom, and
              elegant coastal furnishings that soothe the senses and serve
              as the ideal setting for your island getaway.
            </p>
            <div className="room-stats">
              <div className="room-stat">
                <div className="room-stat-val">1,200</div>
                <div className="room-stat-label">Sq. Ft.</div>
              </div>
              <div className="room-stat">
                <div className="room-stat-val">King</div>
                <div className="room-stat-label">Bed</div>
              </div>
              <div className="room-stat">
                <div className="room-stat-val">4</div>
                <div className="room-stat-label">Max Guests</div>
              </div>
            </div>
            <AmenitiesToggle
              amenities={[
                "Private plunge pool",
                "Separate living room",
                "Walk-in rain shower",
                "Dual vanity bathroom",
                "Air conditioned",
                "Personal refrigerator",
                "Nespresso machine",
                "Free WiFi",
                "Room service",
                "Hair dryer",
                "1,200 Sq. Ft.",
              ]}
            />
            <a href="https://curtainbluff.com/reservations" className="room-cta">
              Book This Suite
            </a>
          </div>
        </div>
      </section>

      {/* ═══ OFFERS RIBBON ═══ */}
      <section className="offers-ribbon">
        <div className="offers-ribbon-header">
          <div className="section-label">Available for Rooms on the Bluff</div>
          <h2>
            Special <em>Offers</em>
          </h2>
        </div>
        <div className="offers-scroll">
          <a href="/special-offers" className="offer-mini">
            <img
              src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/30-off-offer-1.webp"
              alt="25% offer"
            />
            <div className="offer-mini-text">
              <h4>Save 25%</h4>
              <p>
                Book 5 nights and save 25% on your blufftop stay.
              </p>
              <span className="offer-tag">Year-long offer &rarr;</span>
            </div>
          </a>
          <a href="/special-offers" className="offer-mini">
            <img
              src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/spa-at-curtain-bluff.webp"
              alt="30% offer"
            />
            <div className="offer-mini-text">
              <h4>Save 30%</h4>
              <p>
                Book 10 nights and save 30% on your blufftop stay.
              </p>
              <span className="offer-tag">Year-long offer &rarr;</span>
            </div>
          </a>
        </div>
      </section>

      {/* ═══ ALSO EXPLORE ═══ */}
      <section className="also-explore">
        <div className="also-explore-header">
          <div className="section-label">Also Explore</div>
          <h2>
            Other <em>Accommodations</em>
          </h2>
        </div>
        <div className="also-explore-grid">
          <a href="/beach-front-rooms" className="explore-card">
            <img
              src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/beach-front-header-scaled.webp"
              alt="Beach Front Rooms"
            />
            <div className="explore-card-overlay">
              <span>Beachside Living</span>
              <h3>Beach Front Rooms</h3>
            </div>
          </a>
          <a href="/pool-suites" className="explore-card">
            <img
              src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/3-curtain-bluff-pool-min-scaled.webp"
              alt="Pool Suites"
            />
            <div className="explore-card-overlay">
              <span>Ultimate Luxury</span>
              <h3>Pool Suites</h3>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}
