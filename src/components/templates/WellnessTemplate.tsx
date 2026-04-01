import Link from "next/link";

const BLOB = "https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images";

export default function WellnessTemplate({
  sections,
}: {
  sections: any[];
}) {
  return (
    <>
      {/* ═══════ SUB-PAGE HERO ═══════ */}
      <section className="sub-hero">
        <img
          className="sub-hero-img"
          src={`${BLOB}/spa-at-curtain-bluff.webp`}
          alt="Wellness and fitness at Curtain Bluff"
        />
        <div className="sub-hero-bg" />
        <div className="sub-hero-content">
          <div className="sub-hero-breadcrumb">
            <Link href="/">Home</Link> <span>&rarr;</span> Wellness
          </div>
          <h1 className="sub-hero-title">
            Wellness &amp;
            <br />
            <em>Fitness</em>
          </h1>
        </div>
      </section>

      {/* ═══════ INTRO SPLIT ═══════ */}
      <section className="intro-split reveal">
        <div className="intro-text">
          <div className="section-label">Restore Balance</div>
          <h2>
            A transformative <em>wellness journey</em>
          </h2>
          <p>
            Immerse yourself in a transformative wellness journey designed to
            restore balance and find peacefulness. This all-inclusive spa
            experience combines luxurious accommodation, holistic healing, and
            personalised fitness.
          </p>
          <p>
            From guided yoga on the bluff at sunrise to deep-tissue treatments in
            our cliffside spa, every element of the Curtain Bluff wellness
            programme is crafted to help you return home feeling renewed,
            re-centred, and truly rested.
          </p>
        </div>
        <div className="intro-sidebar">
          <h4 className="sidebar-heading">At a Glance</h4>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Spa</span>
            <span className="sidebar-val">Full-service, 5,000 sq ft</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Fitness Centre</span>
            <span className="sidebar-val">Modern cardio &amp; weights</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Yoga</span>
            <span className="sidebar-val">Daily classes on the bluff</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Retreats</span>
            <span className="sidebar-val">Multi-day wellness programmes</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Cost</span>
            <span className="sidebar-val">Included in room rate</span>
          </div>
          <a
            href="#"
            className="sidebar-cta"
          >
            Download Wellness Brochure &#8599;
          </a>
        </div>
      </section>

      {/* ═══════ GALLERY BAND ═══════ */}
      <div className="gallery-band-4">
        <img src={`${BLOB}/spa-at-curtain-bluff.webp`} alt="Spa and wellness facilities at Curtain Bluff" />
        <img src={`${BLOB}/spa-1.webp`} alt="Treatment room at the Curtain Bluff Spa" />
        <img src={`${BLOB}/morris-bay-terrace-with-spa-curtain-bluff.webp`} alt="Morris Bay terrace overlooking the sea at Curtain Bluff" />
        <img src={`${BLOB}/spa-3.webp`} alt="Spa treatment and relaxation at Curtain Bluff" />
      </div>

      {/* ═══════ FITNESS CENTRE ═══════ */}
      <section className="detail reveal">
        <div className="detail-inner">
          <h3>
            Fitness <em>Centre</em>
          </h3>
          <div className="detail-columns">
            <div>
              <p>
                Our fully equipped fitness centre features modern cardio
                machines, free weights, and strength-training equipment &mdash;
                all available to guests around the clock. Whether you&apos;re
                maintaining a routine or burning off last night&apos;s five-course
                dinner, the facility is yours to enjoy.
              </p>
            </div>
            <div>
              <p>
                Personal training sessions are available by arrangement, offering
                tailored workouts designed to complement your holiday rhythm.
                Cool, air-conditioned interiors make it easy to stay active even
                during the warmest Caribbean afternoons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ YOGA & MOVEMENT ═══════ */}
      <section className="detail reversed reveal">
        <div className="detail-inner">
          <h3>
            Yoga <em>&amp; Movement</em>
          </h3>
          <div className="detail-columns">
            <div>
              <p>
                Begin each day with a guided yoga class set against panoramic
                ocean views from the bluff. Sessions cater to all levels and
                blend gentle flow, breathwork, and meditation to ground you for
                the day ahead.
              </p>
            </div>
            <div>
              <p>
                Pilates, stretching, and aqua fitness classes round out the
                movement schedule, ensuring there is always an option that suits
                your mood and energy. All classes are complimentary for guests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ WELLNESS RETREATS ═══════ */}
      <section className="detail dark-bg reveal">
        <div className="detail-inner">
          <h3>
            Wellness <em>Retreats</em>
          </h3>
          <div className="detail-columns">
            <div>
              <p>
                Our multi-day wellness retreats offer a structured yet flexible
                programme that weaves together spa treatments, fitness sessions,
                nutritional guidance, and mindfulness practices into a
                deeply restorative stay.
              </p>
            </div>
            <div>
              <p>
                Each retreat is designed in collaboration with expert
                practitioners and can be tailored to individual goals &mdash;
                whether you seek stress relief, renewed energy, or a holistic
                reset. Enquire with our concierge to design your perfect
                programme.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ QUOTE ═══════ */}
      <section className="quote-section reveal">
        <div className="quote-inner">
          <div className="quote-mark">&ldquo;</div>
          <p className="quote-text">
            Softly lapping waves, outstanding treatments, real serenity. Time
            stops here in this extraordinary spa and you feel as if you are the
            most important person in the world.
          </p>
          <p className="quote-author">Patty Hoff &mdash; Ohio</p>
        </div>
      </section>

      {/* ═══════ EXPLORE OTHER WELLNESS ═══════ */}
      <section className="explore-other reveal">
        <div className="explore-other-header">
          <div
            className="section-label"
            style={{ justifyContent: "center" }}
          >
            More Wellness
          </div>
          <h2>
            Also <em>explore</em>
          </h2>
        </div>
        <div className="explore-grid">
          <Link href="/the-spa" className="explore-card">
            <img
              src={`${BLOB}/spa-1.webp`}
              alt="The Spa at Curtain Bluff"
            />
            <div className="explore-card-ov">
              <span>The Sanctuary</span>
              <h3>The Spa</h3>
            </div>
          </Link>
          <Link href="/tennis" className="explore-card">
            <img
              src={`${BLOB}/25-tennis-at-curtain-bluff.webp`}
              alt="Championship tennis courts at Curtain Bluff"
            />
            <div className="explore-card-ov">
              <span>Championship Courts</span>
              <h3>Tennis</h3>
            </div>
          </Link>
          <Link href="/activities" className="explore-card">
            <img
              src={`${BLOB}/activities-8.webp`}
              alt="Activities at Curtain Bluff"
            />
            <div className="explore-card-ov">
              <span>Land &amp; Sea</span>
              <h3>Activities</h3>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
