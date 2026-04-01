"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════════
   BeachfrontRoomsTemplate — page-level template for the Beach Front
   Rooms page.

   Reproduces the exact HTML structure from:
     curtain-bluff-templates/curtain-bluff-beachfront-rooms.html
   (body content between nav and footer)
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

export default function BeachfrontRoomsTemplate({
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
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1800&q=80"
          alt="Beach Front Rooms"
        />
        <div className="page-hero-bg" />
        <div className="page-hero-content">
          <div className="page-hero-breadcrumb">
            <Link href="/">Home</Link> <span>&rarr;</span>{" "}
            <Link href="#">Rooms</Link> <span>&rarr;</span> Beach Front
          </div>
          <h1 className="page-hero-title">
            Beach Front
            <br />
            <em>Rooms</em>
          </h1>
          <p className="page-hero-sub">
            Thoughtfully designed to bring the beauty and splendour of the
            Caribbean Sea to your doorstep &mdash; blending contemporary
            luxuries with classic island influences.
          </p>
        </div>
      </section>

      {/* ═══ ROOM NAV ═══ */}
      <div className="room-nav" id="roomNav">
        <div className="room-nav-inner">
          <a href="#ground-junior" className="active">
            Ground Floor Junior Suites
          </a>
          <a href="#upper-junior">Upper Level Junior Suites</a>
          <a href="#ground-deluxe">Ground Floor Deluxe</a>
          <a href="#upper-deluxe">Upper Level Deluxe</a>
        </div>
      </div>

      {/* ═══ Room 1: Ground Floor Junior Suites ═══ */}
      <section className="room-section" id="ground-junior">
        <div className="room-inner">
          <RoomCarousel
            images={[
              {
                src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80",
                alt: "Junior Suite bedroom",
              },
              {
                src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=80",
                alt: "Junior Suite living",
              },
              {
                src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=900&q=80",
                alt: "Junior Suite bathroom",
              },
            ]}
          />
          <div className="room-details">
            <div className="room-type-label">Accommodations</div>
            <h2 className="room-name">
              Ground Floor
              <br />
              <em>Junior Suites</em>
            </h2>
            <p className="room-desc">
              Located just a stone&apos;s throw from the water on the
              resort&apos;s surf beach, our 17 ground floor junior suites
              feature serene interiors in soft blues and greens that mirror the
              adjacent sea. Grand marble bathrooms offer double sinks, expansive
              soaking tubs and large open-walled showers. King bed convertible
              to twins, with a maximum occupancy of four.
            </p>
            <div className="room-stats">
              <div className="room-stat">
                <div className="room-stat-val">861</div>
                <div className="room-stat-label">Sq. Ft.</div>
              </div>
              <div className="room-stat">
                <div className="room-stat-val">17</div>
                <div className="room-stat-label">Suites</div>
              </div>
              <div className="room-stat">
                <div className="room-stat-val">4</div>
                <div className="room-stat-label">Max Guests</div>
              </div>
            </div>
            <AmenitiesToggle
              amenities={[
                "Air conditioned",
                "In-room safe",
                "Sunken living room",
                "Molton Brown amenities",
                "Marble bathroom",
                "Free WiFi",
                "Rainforest shower",
                "Room service",
                "Personal refrigerator",
                "Hair dryer",
                "Bidet",
                "861 Sq. Ft.",
              ]}
            />
            <a href="#" className="room-cta">
              Book This Suite
            </a>
          </div>
        </div>
      </section>

      {/* ═══ Room 2: Upper Level Junior Suites ═══ */}
      <section className="room-section" id="upper-junior">
        <div className="room-inner">
          <RoomCarousel
            images={[
              {
                src: "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=900&q=80",
                alt: "Upper Junior terrace",
              },
              {
                src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=80",
                alt: "Upper Junior interior",
              },
              {
                src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900&q=80",
                alt: "Upper Junior balcony",
              },
            ]}
          />
          <div className="room-details">
            <div className="room-type-label">Accommodations</div>
            <h2 className="room-name">
              Upper Level
              <br />
              <em>Junior Suites</em>
            </h2>
            <p className="room-desc">
              Our 23 junior suites on the second and third floors offer elevated
              sea views from private terraces. Coastal interiors inspired by the
              natural surroundings are bordered by floor-to-ceiling glass doors.
              Roomy bathrooms feature double sinks, large tubs, and open-walled
              rainforest-style showers. King bed convertible to twins, with a
              maximum occupancy of four.
            </p>
            <div className="room-stats">
              <div className="room-stat">
                <div className="room-stat-val">861</div>
                <div className="room-stat-label">Sq. Ft.</div>
              </div>
              <div className="room-stat">
                <div className="room-stat-val">23</div>
                <div className="room-stat-label">Suites</div>
              </div>
              <div className="room-stat">
                <div className="room-stat-val">4</div>
                <div className="room-stat-label">Max Guests</div>
              </div>
            </div>
            <AmenitiesToggle
              amenities={[
                "Air conditioned",
                "In-room safe",
                "King-size bed",
                "Molton Brown amenities",
                "Sunken living room",
                "Free WiFi",
                "Marble bathroom",
                "Room service",
                "Rainforest shower",
                "Hair dryer",
                "Personal refrigerator",
                "Bidet",
              ]}
            />
            <a href="#" className="room-cta">
              Book This Suite
            </a>
          </div>
        </div>
      </section>

      {/* ═══ Room 3: Ground Floor Deluxe ═══ */}
      <section className="room-section" id="ground-deluxe">
        <div className="room-inner">
          <RoomCarousel
            images={[
              {
                src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=80",
                alt: "Deluxe exterior",
              },
              {
                src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=80",
                alt: "Deluxe interior",
              },
              {
                src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=900&q=80",
                alt: "Deluxe bathroom",
              },
            ]}
          />
          <div className="room-details">
            <div className="room-type-label">Accommodations</div>
            <h2 className="room-name">
              Ground Floor
              <br />
              <em>Deluxe Rooms</em>
            </h2>
            <p className="room-desc">
              Housed in a Caribbean-style villa, our nine ground floor deluxe
              rooms open directly onto the surf beach. Step through large
              sliding doors into traditional West-Indian decor, contemporary
              dark wood furniture and colourful accents that evoke the spirit of
              the islands. King bed convertible to twins, maximum occupancy of
              three.
            </p>
            <div className="room-stats">
              <div className="room-stat">
                <div className="room-stat-val">360</div>
                <div className="room-stat-label">Sq. Ft.</div>
              </div>
              <div className="room-stat">
                <div className="room-stat-val">9</div>
                <div className="room-stat-label">Rooms</div>
              </div>
              <div className="room-stat">
                <div className="room-stat-val">3</div>
                <div className="room-stat-label">Max Guests</div>
              </div>
            </div>
            <AmenitiesToggle
              amenities={[
                "Air conditioned",
                "Walk-in shower",
                "King-size bed",
                "Room service",
                "Balcony / terrace",
                "Free WiFi",
                "Connecting rooms available",
                "Hair dryer",
                "Personal refrigerator",
                "360 Sq. Ft.",
              ]}
            />
            <a href="#" className="room-cta">
              Book This Room
            </a>
          </div>
        </div>
      </section>

      {/* ═══ Room 4: Upper Level Deluxe ═══ */}
      <section className="room-section" id="upper-deluxe">
        <div className="room-inner">
          <RoomCarousel
            images={[
              {
                src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900&q=80",
                alt: "Upper Deluxe view",
              },
              {
                src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80",
                alt: "Upper Deluxe interior",
              },
              {
                src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=900&q=80",
                alt: "Upper Deluxe bathroom",
              },
            ]}
          />
          <div className="room-details">
            <div className="room-type-label">Accommodations</div>
            <h2 className="room-name">
              Upper Level
              <br />
              <em>Deluxe Rooms</em>
            </h2>
            <p className="room-desc">
              Our most affordable accommodations, these nine upper level rooms
              offer the ideal mix of value and comfort. Housed on the second
              floor of a Caribbean villa overlooking the surf beach, each
              features a spacious private veranda with sweeping views of the sea
              and distant headland. King bed convertible to twins, maximum
              occupancy of three.
            </p>
            <div className="room-stats">
              <div className="room-stat">
                <div className="room-stat-val">360</div>
                <div className="room-stat-label">Sq. Ft.</div>
              </div>
              <div className="room-stat">
                <div className="room-stat-val">9</div>
                <div className="room-stat-label">Rooms</div>
              </div>
              <div className="room-stat">
                <div className="room-stat-val">3</div>
                <div className="room-stat-label">Max Guests</div>
              </div>
            </div>
            <AmenitiesToggle
              amenities={[
                "Air conditioned",
                "Walk-in shower",
                "King-size bed",
                "Room service",
                "Balcony / terrace",
                "Free WiFi",
                "Connecting rooms available",
                "Hair dryer",
                "Personal refrigerator",
                "360 Sq. Ft.",
              ]}
            />
            <a href="#" className="room-cta">
              Book This Room
            </a>
          </div>
        </div>
      </section>

      {/* ═══ OFFERS RIBBON ═══ */}
      <section className="offers-ribbon">
        <div className="offers-ribbon-header">
          <div className="section-label">Available for Beach Front Rooms</div>
          <h2>
            Special <em>Offers</em>
          </h2>
        </div>
        <div className="offers-scroll">
          <a href="#" className="offer-mini">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80"
              alt="Romance"
            />
            <div className="offer-mini-text">
              <h4>Unforgettable Moments</h4>
              <p>
                Romance Package &mdash; 4-night all-inclusive packages for
                couples.
              </p>
              <span className="offer-tag">Year-long offer &rarr;</span>
            </div>
          </a>
          <a href="#" className="offer-mini">
            <img
              src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80"
              alt="Wellness"
            />
            <div className="offer-mini-text">
              <h4>Wellness Retreat</h4>
              <p>
                4-night wellness packages featuring spa, yoga and mindful
                activities.
              </p>
              <span className="offer-tag">Year-long offer &rarr;</span>
            </div>
          </a>
          <a href="#" className="offer-mini">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80"
              alt="25% offer"
            />
            <div className="offer-mini-text">
              <h4>Save 25%</h4>
              <p>
                Book 5 nights and save 25% on your beach front stay.
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
          <a href="#" className="explore-card">
            <img
              src="https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=700&q=80"
              alt="Rooms on the Bluff"
            />
            <div className="explore-card-overlay">
              <span>Elevated Views</span>
              <h3>Rooms on the Bluff</h3>
            </div>
          </a>
          <a href="#" className="explore-card">
            <img
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700&q=80"
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
