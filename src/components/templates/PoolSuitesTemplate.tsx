"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════════
   PoolSuitesTemplate — page-level template for the Pool Suites page.

   Reproduces content from the original WordPress pool-suites page
   using the same JSX structure as BeachfrontRoomsTemplate.
   ═══════════════════════════════════════════════════════════════════ */

const BLOB =
  "https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images";

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

export default function PoolSuitesTemplate({
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
          src={`${BLOB}/terrace-pool-suite-bedroom-view-curtain-bluff.webp`}
          alt="Pool Suites"
        />
        <div className="page-hero-bg" />
        <div className="page-hero-content">
          <div className="page-hero-breadcrumb">
            <Link href="/">Home</Link> <span>&rarr;</span>{" "}
            <Link href="/rooms">Rooms</Link> <span>&rarr;</span> Pool Suites
          </div>
          <h1 className="page-hero-title">
            Pool
            <br />
            <em>Suites</em>
          </h1>
          <p className="page-hero-sub">
            This exclusive tier of suites is the epitome of style and comfort.
            Luxurious features like private plunge pools, marble fixtures and
            unparalleled views of the sparkling blue Caribbean make our Pool
            Suites the crown jewel of Curtain Bluff&apos;s accommodations.
          </p>
        </div>
      </section>

      {/* ═══ ROOM NAV ═══ */}
      <div className="room-nav" id="roomNav">
        <div className="room-nav-inner">
          <a href="#grace-morris" className="active">
            Grace &amp; Morris Bay Suites
          </a>
          <a href="#terrace-suite">Terrace Suite</a>
          <a href="#cliff-suite">Cliff Suite</a>
        </div>
      </div>

      {/* ═══ Room 1: Grace & Morris Bay Suites ═══ */}
      <section className="room-section" id="grace-morris">
        <div className="room-inner">
          <RoomCarousel
            images={[
              {
                src: `${BLOB}/morris-bay-bedroom-curtain-bluff.webp`,
                alt: "Grace & Morris Bay Suite bedroom",
              },
              {
                src: `${BLOB}/morris-bay-living-room-curtain-bluff.webp`,
                alt: "Grace & Morris Bay Suite living room",
              },
              {
                src: `${BLOB}/morris-bay-terrace-with-spa-curtain-bluff.webp`,
                alt: "Grace & Morris Bay Suite terrace with plunge pool",
              },
              {
                src: `${BLOB}/morris-bay-bathroom-curtain-bluff.webp`,
                alt: "Grace & Morris Bay Suite bathroom",
              },
              {
                src: `${BLOB}/morris-bay-shower-curtain-bluff.webp`,
                alt: "Grace & Morris Bay Suite shower",
              },
            ]}
          />
          <div className="room-details">
            <div className="room-type-label">Accommodations</div>
            <h2 className="room-name">
              Grace &amp; Morris Bay
              <br />
              <em>Suites</em>
            </h2>
            <p className="room-desc">
              This pair of generously scaled suites occupies the third floor of a
              Caribbean-style villa directly on the sands of the resort&apos;s
              surf beach. Both suites are luxuriously outfitted with free
              standing tubs and showers in the bathrooms, white oak furniture and
              lush palms. The bedroom and adjoining, three walled, open air
              living room open onto a sweeping veranda with lounge chairs and a
              private plunge pool, the perfect site for private sunbathing or
              romantic cocktails under the stars. The Grace &amp; Morris Bay
              suites can be linked to a junior suite to create a two-bedroom
              suite. Extended groups and families (with children over age 6) can
              reserve the entire floor (four bedrooms).
            </p>
            <div className="room-stats">
              <div className="room-stat">
                <div className="room-stat-val">1,944</div>
                <div className="room-stat-label">Sq. Ft.</div>
              </div>
              <div className="room-stat">
                <div className="room-stat-val">2</div>
                <div className="room-stat-label">Suites</div>
              </div>
              <div className="room-stat">
                <div className="room-stat-val">4</div>
                <div className="room-stat-label">Max Guests</div>
              </div>
            </div>
            <AmenitiesToggle
              amenities={[
                "Beachfront",
                "King-size bed",
                "Terrace with plunge pool",
                "Marble bathroom",
                "Walk-in rainforest shower",
                "Bidet or bidet shower",
                "Hairdryer",
                "In-room safe",
                "Personal refrigerator",
                "Exclusive Molton Brown bath amenities",
                "Free WiFi",
                "Room service",
                "Option for adjoining room",
                "1,944 Sq. Ft.",
              ]}
            />
            <a href="https://curtainbluff.com/reservations" className="room-cta">
              Book This Suite
            </a>
          </div>
        </div>
      </section>

      {/* ═══ Room 2: Terrace Suite ═══ */}
      <section className="room-section" id="terrace-suite">
        <div className="room-inner">
          <RoomCarousel
            images={[
              {
                src: `${BLOB}/terrace-pool-suite-bedroom-view-curtain-bluff.webp`,
                alt: "Terrace Suite bedroom view",
              },
              {
                src: `${BLOB}/terrace-pool-suite-bedroom-curtain-bluff.webp`,
                alt: "Terrace Suite bedroom",
              },
              {
                src: `${BLOB}/terrace-pool-suite-bathroom-curtain-bluff.webp`,
                alt: "Terrace Suite bathroom",
              },
              {
                src: `${BLOB}/terrace-pool-suite-shower-curtain-bluff.webp`,
                alt: "Terrace Suite shower",
              },
            ]}
          />
          <div className="room-details">
            <div className="room-type-label">Accommodations</div>
            <h2 className="room-name">
              Terrace
              <br />
              <em>Suite</em>
            </h2>
            <p className="room-desc">
              Our terrace suite&apos;s secluded location at the top of the bluff
              and breathtaking views of the sea below make it the most popular
              choice for newlyweds. White walls, sea-blue fabrics, bespoke
              furnishings and rich, natural woods give the room a sense of calm
              and timeless sophistication. Its 567-square-foot terrace with
              infinity-edge plunge pool and comfortable daybed is your private
              sanctuary for intimate relaxation and dining.
            </p>
            <div className="room-stats">
              <div className="room-stat">
                <div className="room-stat-val">891</div>
                <div className="room-stat-label">Sq. Ft.</div>
              </div>
              <div className="room-stat">
                <div className="room-stat-val">1</div>
                <div className="room-stat-label">Suite</div>
              </div>
              <div className="room-stat">
                <div className="room-stat-val">2</div>
                <div className="room-stat-label">Max Guests</div>
              </div>
            </div>
            <AmenitiesToggle
              amenities={[
                "Seaview",
                "Terrace with plunge pool",
                "Marble bathroom",
                "Walk-in rainforest shower",
                "Bidet or bidet shower",
                "Hair dryer",
                "In-room safe",
                "Personal refrigerator",
                "Exclusive Molton Brown bath amenities",
                "Free WiFi",
                "Room service",
                "891 Sq. Ft.",
              ]}
            />
            <a href="https://curtainbluff.com/reservations" className="room-cta">
              Book This Suite
            </a>
          </div>
        </div>
      </section>

      {/* ═══ Room 3: Cliff Suite ═══ */}
      <section className="room-section" id="cliff-suite">
        <div className="room-inner">
          <RoomCarousel
            images={[
              {
                src: `${BLOB}/cliff-suite-8.webp`,
                alt: "Cliff Suite exterior view",
              },
              {
                src: `${BLOB}/cliff-suite-7.webp`,
                alt: "Cliff Suite living room",
              },
              {
                src: `${BLOB}/cliff-suite-2.webp`,
                alt: "Cliff Suite interior",
              },
              {
                src: `${BLOB}/cliff-suite-1.webp`,
                alt: "Cliff Suite terrace",
              },
              {
                src: `${BLOB}/cliff-suite-3.webp`,
                alt: "Cliff Suite bedroom",
              },
              {
                src: `${BLOB}/bluff-cliff-suite-bathrooms.webp`,
                alt: "Cliff Suite bathroom",
              },
            ]}
          />
          <div className="room-details">
            <div className="room-type-label">Accommodations</div>
            <h2 className="room-name">
              Cliff
              <br />
              <em>Suite</em>
            </h2>
            <p className="room-desc">
              Tucked into the hillside, our cliff suite features a spacious
              living room that opens onto a large patio with an infinity soaking
              pool and unobstructed views of Grace Bay beach. Its separate
              bedroom is elegantly appointed with a king-size bed, marble
              bathroom and second terrace overlooking the surf beach.
            </p>
            <div className="room-stats">
              <div className="room-stat">
                <div className="room-stat-val">1,500</div>
                <div className="room-stat-label">Sq. Ft.</div>
              </div>
              <div className="room-stat">
                <div className="room-stat-val">1</div>
                <div className="room-stat-label">Suite</div>
              </div>
              <div className="room-stat">
                <div className="room-stat-val">2</div>
                <div className="room-stat-label">Max Guests</div>
              </div>
            </div>
            <AmenitiesToggle
              amenities={[
                "Seaview",
                "Separate bedroom with king-size bed",
                "Terrace with plunge pool",
                "Marble bathroom",
                "Walk-in rainforest shower",
                "Bidet or bidet shower",
                "Hair dryer",
                "Personal refrigerator",
                "In-room safe",
                "Exclusive Molton Brown bath amenities",
                "Free WiFi",
                "Room service",
                "1,500 Sq. Ft.",
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
          <div className="section-label">Available for Pool Suites</div>
          <h2>
            Special <em>Offers</em>
          </h2>
        </div>
        <div className="offers-scroll">
          <a href="/special-offers" className="offer-mini">
            <img
              src={`${BLOB}/30-off-offer-1.webp`}
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
          <a href="/special-offers" className="offer-mini">
            <img
              src={`${BLOB}/spa-at-curtain-bluff.webp`}
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
          <a href="/special-offers" className="offer-mini">
            <img
              src={`${BLOB}/slider-6-31.webp`}
              alt="25% offer"
            />
            <div className="offer-mini-text">
              <h4>Save 25%</h4>
              <p>
                Book 5 nights and save 25% on your pool suite stay.
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
          <Link href="/beach-front-rooms" className="explore-card">
            <img
              src={`${BLOB}/beach-front-header-scaled.webp`}
              alt="Beach Front Rooms"
            />
            <div className="explore-card-overlay">
              <span>Steps from the Sea</span>
              <h3>Beach Front Rooms</h3>
            </div>
          </Link>
          <Link href="/rooms-on-the-bluff" className="explore-card">
            <img
              src={`${BLOB}/bluff-room-balcony-jpg.webp`}
              alt="Rooms on the Bluff"
            />
            <div className="explore-card-overlay">
              <span>Elevated Views</span>
              <h3>Rooms on the Bluff</h3>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
