import Link from 'next/link'
import type { Metadata } from 'next'
import { getSiteSettings } from '@/lib/site-settings'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const suffix = settings?.seoDefaults?.title_suffix || ''
  return {
    title: `Home${suffix}`,
    description:
      settings?.seoDefaults?.default_description ||
      'Curtain Bluff is an all-inclusive luxury resort on the southern coast of Antigua.',
  }
}

export default async function HomePage() {
  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <section className="hero">
        <img
          className="hero-img"
          src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/slider-6-51.webp"
          alt="Curtain Bluff aerial view"
        />
        <div className="hero-bg" />
        <div className="hero-content">
          <p className="hero-eyebrow">Relais &amp; Châteaux — Antigua, West Indies</p>
          <h1 className="hero-title">
            Effortless<br /><em>Island Luxury</em>
          </h1>
          <p className="hero-sub">
            Tucked away on a rocky promontory on Antigua&apos;s south coast, where two beaches
            meet — Curtain Bluff has been the Caribbean&apos;s best-kept secret since 1962.
          </p>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="line" />
        </div>
      </section>

      {/* ═══════ INTRO ═══════ */}
      <section className="intro reveal">
        <div className="intro-visual">
          <div className="intro-year">1962</div>
          <img
            className="intro-img-main"
            src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/aa_8102-edit.webp"
            alt="Curtain Bluff resort"
          />
          <img
            className="intro-img-float"
            src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/curtain-bluff-seagrape-restaurant-beach-service.webp"
            alt="Beach at Curtain Bluff"
          />
        </div>
        <div className="intro-text">
          <div className="section-label">Discovery</div>
          <h2 className="section-heading">
            Where the <em>Caribbean</em><br />whispers your name
          </h2>
          <p className="section-body">
            Flanked on both sides by the stunning Caribbean Sea, Curtain Bluff coaxes visitors
            from life&apos;s relentless pace into a tranquil island paradise. Breathtaking views,
            impeccable amenities, and unparalleled hospitality have made this Antigua gem a
            beloved tradition for generations of families.
          </p>
          <Link href="/about" className="btn-line">
            Our Story <span className="arrow" />
          </Link>
        </div>
      </section>

      {/* ═══════ ROOMS ═══════ */}
      <section className="rooms reveal" id="rooms">
        <div className="rooms-header">
          <div className="section-label" style={{ justifyContent: 'center' }}>
            Accommodations
          </div>
          <h2 className="section-heading">
            Rooms with a <em>View</em>
          </h2>
          <p className="section-body">
            72 spacious suites offer gaze-all-day views. All accommodations are directly on
            the sand or just a few steps from it.
          </p>
        </div>
        <div className="rooms-grid">
          <div className="room-card">
            <img
              className="room-card-img"
              src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/ground-floor-junior-sweet-beach-front-bedroom-curtain-bluff.webp"
              alt="Beach Front Room"
            />
            <div className="room-card-overlay">
              <h3 className="room-card-name">Beach Front Rooms</h3>
              <p className="room-card-desc">
                Dazzling views of the secluded beach and lush gardens located just outside your door.
              </p>
              <Link href="/beach-front-rooms" className="room-card-link">View Rooms →</Link>
            </div>
          </div>
          <div className="room-card">
            <img
              className="room-card-img"
              src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/bluff-room-balcony-jpg.webp"
              alt="Rooms on the Bluff"
            />
            <div className="room-card-overlay">
              <h3 className="room-card-name">On the Bluff</h3>
              <p className="room-card-desc">
                Overlook the surf beach amidst gentle breezes from atop the airy bluff.
              </p>
              <Link href="/rooms-on-the-bluff" className="room-card-link">View Rooms →</Link>
            </div>
          </div>
          <div className="room-card">
            <img
              className="room-card-img"
              src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/3-curtain-bluff-pool-min-scaled.webp"
              alt="Pool Suites"
            />
            <div className="room-card-overlay">
              <h3 className="room-card-name">Pool Suites</h3>
              <p className="room-card-desc">
                Private plunge pools and panoramic views in our most luxurious accommodations.
              </p>
              <Link href="/pool-suites" className="room-card-link">View Rooms →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ EDITORIAL: DINING ═══════ */}
      <section className="editorial reveal" id="dining">
        <div className="editorial-media">
          <img
            src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/tamarind-restaurant-curtain-bluff.webp"
            alt="Dining at Curtain Bluff"
          />
        </div>
        <div className="editorial-text">
          <div className="section-label">Dining &amp; Drinks</div>
          <h2 className="section-heading">
            A Culinary<br /><em>Experience</em>
          </h2>
          <p className="section-body">
            From our legendary open-air Sea Grape buffet to the five-course candlelit dinners
            beneath the Tamarind tree — every meal is a celebration. Our resident sommelier
            curates wines from the world&apos;s finest vineyards.
          </p>
          <div className="editorial-stats">
            <div className="editorial-stat">
              <div className="editorial-stat-val">3</div>
              <div className="editorial-stat-label">Restaurants</div>
            </div>
            <div className="editorial-stat">
              <div className="editorial-stat-val">800+</div>
              <div className="editorial-stat-label">Wine Labels</div>
            </div>
            <div className="editorial-stat">
              <div className="editorial-stat-val">All</div>
              <div className="editorial-stat-label">Inclusive</div>
            </div>
          </div>
          <Link href="/dining-drinks" className="btn-line">
            Explore Dining <span className="arrow" />
          </Link>
        </div>
      </section>

      {/* ═══════ EDITORIAL: FAMILY (reversed, dark) ═══════ */}
      <section className="editorial reversed dark-bg reveal">
        <div className="editorial-media">
          <img
            src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/activities-1.webp"
            alt="Family activities"
          />
        </div>
        <div className="editorial-text">
          <div className="section-label">Family</div>
          <h2 className="section-heading">
            Where <em>families</em><br />become traditions
          </h2>
          <p className="section-body">
            From the Cee Bee Kids Camp to water sports, scuba diving, and tennis — Curtain
            Bluff turns family vacations into beloved annual rituals. Leave your wallet behind:
            nearly everything is included.
          </p>
          <Link href="/activities" className="btn-line">
            Activities &amp; Fun <span className="arrow" />
          </Link>
        </div>
      </section>

      <div className="dark-section-divider" />

      {/* ═══════ WELLNESS ═══════ */}
      <section className="wellness reveal" id="wellness">
        <div className="wellness-header">
          <div className="section-label">Wellness &amp; Spa</div>
          <h2 className="section-heading">
            Restore your <em>balance</em>
          </h2>
          <p className="section-body">
            An immersive journey into serenity, from rejuvenating spa treatments to championship
            tennis and sunrise yoga.
          </p>
        </div>
        <div className="wellness-scroll">
          {[
            { img: 'https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/spa-at-curtain-bluff.webp', label: '01 — Rejuvenate', title: 'The Spa' },
            { img: 'https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/25-tennis-at-curtain-bluff.webp', label: '02 — Compete', title: 'Tennis' },
            { img: 'https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/spa-1.webp', label: '03 — Breathe', title: 'Yoga & Classes' },
            { img: 'https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/activities-7.webp', label: '04 — Explore', title: 'Water Sports' },
            { img: 'https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/activities-8.webp', label: '05 — Discover', title: 'Scuba Diving' },
          ].map((card, i) => (
            <div className="wellness-card" key={i}>
              <img
                src={card.img}
                alt={card.title}
              />
              <div className="wellness-card-info">
                <span>{card.label}</span>
                <h4>{card.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ GALLERY ═══════ */}
      <section className="gallery reveal" id="gallery">
        <div className="gallery-header">
          <div className="section-label" style={{ justifyContent: 'center' }}>Gallery</div>
          <h2 className="section-heading">
            A Glimpse of <em>Our Spirit</em>
          </h2>
        </div>
        <div className="gallery-grid">
          {[
            'https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/gallery01.webp',
            'https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/gallery02-1.webp',
            'https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/gallery03-1.webp',
            'https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/gallery04-1.webp',
            'https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/gallery05.webp',
            'https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/gallery06.webp',
          ].map((img, i) => (
            <div className="gi" key={i}>
              <img src={img} alt="" />
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ OFFERS ═══════ */}
      <section className="offers reveal">
        <div className="offers-header">
          <div className="section-label" style={{ justifyContent: 'center' }}>Special Offers</div>
          <h2 className="section-heading">
            Stay <em>Relaxed</em>
          </h2>
        </div>
        <div className="offers-grid">
          <div className="offer-card">
            <img
              src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/30-off-offer-1.webp"
              alt="Offer"
            />
            <div className="offer-card-text">
              <div className="pct">25%</div>
              <h4>Returning Guest Offer</h4>
              <p>
                Make Antigua part of your family tradition. Precious memories in the sunshine
                bring loyal guests back year after year.
              </p>
              <Link href="/special-offers" className="btn-line" style={{ marginTop: '1.5rem' }}>
                Learn More <span className="arrow" />
              </Link>
            </div>
          </div>
          <div className="offer-card">
            <img
              src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/slider-6-31.webp"
              alt="Offer"
            />
            <div className="offer-card-text">
              <div className="pct">30%</div>
              <h4>Fall Reopening</h4>
              <p>
                Usher in a new season and celebrate a fresh start by joining us on our sandy
                shores this autumn.
              </p>
              <Link href="/special-offers" className="btn-line" style={{ marginTop: '1.5rem' }}>
                Learn More <span className="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ EDITORIAL: WEDDINGS ═══════ */}
      <section className="editorial reveal">
        <div className="editorial-media">
          <img
            src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/9-er-portraits-1.webp"
            alt="Wedding"
          />
        </div>
        <div className="editorial-text">
          <div className="section-label">Weddings &amp; Events</div>
          <h2 className="section-heading">
            Your <em>unforgettable</em><br />begins here
          </h2>
          <p className="section-body">
            Breathtaking natural surroundings set the scene for an unforgettable wedding,
            honeymoon, or anniversary celebration on the shores of Antigua.
          </p>
          <Link href="/weddings-and-events" className="btn-line">
            Plan Your Event <span className="arrow" />
          </Link>
        </div>
      </section>

      {/* ═══════ CHARITY ═══════ */}
      <section className="charity reveal">
        <div className="charity-inner">
          <div className="section-label">The Old Road Fund</div>
          <h2 className="section-heading">
            Philanthropic <em>Roots</em>
          </h2>
          <p className="section-body">
            Since 1974, our 501(c)(3) nonprofit has been supported by Curtain Bluff and our
            generous guests to foster community initiatives on our beloved island home.
          </p>
          <Link href="/about" className="btn-line">
            Learn More <span className="arrow" />
          </Link>
        </div>
      </section>
    </>
  )
}
