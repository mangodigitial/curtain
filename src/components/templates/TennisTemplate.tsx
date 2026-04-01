import Link from "next/link";

const BLOB = "https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images";

export default function TennisTemplate({
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
          src={`${BLOB}/pt-tennis-bg.webp`}
          alt="Championship tennis courts at Curtain Bluff"
        />
        <div className="sub-hero-bg" />
        <div className="sub-hero-content">
          <div className="sub-hero-breadcrumb">
            <Link href="/">Home</Link> <span>&rarr;</span>{" "}
            <Link href="/wellness">Wellness</Link> <span>&rarr;</span> Tennis
          </div>
          <h1 className="sub-hero-title">
            Championship
            <br />
            <em>Tennis</em>
          </h1>
        </div>
      </section>

      {/* ═══════ INTRO SPLIT ═══════ */}
      <section className="intro-split reveal">
        <div className="intro-text">
          <div className="section-label">On the Court</div>
          <h2>
            World-class tennis, <em>Caribbean style</em>
          </h2>
          <p>
            When it comes to tennis, it&apos;s hard to match Curtain Bluff in
            terms of court quality, instructors, equipment and events. Join
            players from around the world in enjoying our beautiful, world-class
            tennis facilities.
          </p>
          <p>
            Our tennis centre features four championship hard courts kept in
            impeccable condition and lit for night play. A pro shop located an
            easy lob shot from the sea offers all the essentials you need for
            play. Private lessons are available for $90 per hour.
          </p>
        </div>
        <div className="intro-sidebar">
          <h4 className="sidebar-heading">At a Glance</h4>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Courts</span>
            <span className="sidebar-val">4 championship hard courts</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Night Play</span>
            <span className="sidebar-val">Lit for evening sessions</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Lessons</span>
            <span className="sidebar-val">Private &amp; group with resident pro</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Pro Shop</span>
            <span className="sidebar-val">Racquets, balls &amp; accessories</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Cost</span>
            <span className="sidebar-val">Included in room rate</span>
          </div>
        </div>
      </section>

      {/* ═══════ GALLERY BAND ═══════ */}
      <div className="sub-gallery-band reveal">
        <img
          src={`${BLOB}/pt-tennis-bg.webp`}
          alt="Aerial view of Curtain Bluff tennis courts"
        />
        <img
          src={`${BLOB}/25-tennis-at-curtain-bluff.webp`}
          alt="Tennis match at Curtain Bluff"
        />
        <img
          src={`${BLOB}/curtain-bluff-tennis-class.webp`}
          alt="Tennis coaching clinic at Curtain Bluff"
        />
        <img
          src={`${BLOB}/activities-5.webp`}
          alt="Tennis and activities at Curtain Bluff"
        />
      </div>

      {/* ═══════ THE COURTS ═══════ */}
      <section className="detail reveal">
        <div className="detail-inner">
          <h3>
            The <em>Courts</em>
          </h3>
          <div className="detail-columns">
            <div>
              <p>
                Curtain Bluff has long been regarded as one of the
                Caribbean&apos;s premier tennis destinations. Four championship
                hard courts sit at the heart of the resort, flanked by tropical
                gardens and ocean breezes that make every set feel like a holiday
                in itself.
              </p>
            </div>
            <div>
              <p>
                Two courts are lit for night play, extending your time on court
                well into the cool Caribbean evening. Complimentary racquets and
                balls are provided &mdash; all you need to bring is your
                competitive spirit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ LESSONS & CLINICS ═══════ */}
      <section className="detail reversed reveal">
        <div className="detail-inner">
          <h3>
            Lessons <em>&amp; Clinics</em>
          </h3>
          <div className="detail-columns">
            <div>
              <p>
                Our resident tennis pro offers private lessons and group clinics
                for players of all abilities &mdash; from first-time players
                picking up a racquet to seasoned competitors looking to fine-tune
                their game. Sessions can be arranged at the pro shop or through
                our concierge.
              </p>
            </div>
            <div>
              <p>
                Weekly round-robins and social mix-ins are organised throughout
                the season, giving guests the chance to meet fellow players and
                enjoy some friendly competition in a relaxed resort setting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ TOURNAMENTS & EVENTS ═══════ */}
      <section className="detail reveal">
        <div className="detail-inner">
          <h3>
            Tournaments <em>&amp; Events</em>
          </h3>
          <div className="detail-columns">
            <div>
              <p>
                Curtain Bluff plays host to tennis events each year, but perhaps
                the most well-known is Tennis Challenge Week, held here each
                November. Guests join former Davis Cup player Dick Stockton and
                former Curtain Bluff pro Robert Raedisch, alongside other pros,
                for a fun-filled week of tennis, relaxation, and celebratory
                events.
              </p>
            </div>
            <div>
              <p>
                The annual tournament attracts players from around the globe who
                come for the exceptional competition and stay for the legendary
                Curtain Bluff hospitality. It is a highlight of the resort&apos;s
                sporting calendar and a must for any tennis enthusiast.
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
            Over the span of my long professional tennis career, I have been
            fortunate to play at many of the finest tennis centres in the world.
            So I know a good tennis centre when I see it. I come to Curtain Bluff
            at least once a year.
          </p>
          <p className="quote-author">
            Fred Stolle &mdash; Winner of the U.S. and French Open
            Championships, International Tennis Hall of Fame
          </p>
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
              src={`${BLOB}/spa-at-curtain-bluff.webp`}
              alt="The Spa at Curtain Bluff"
            />
            <div className="explore-card-ov">
              <span>The Sanctuary</span>
              <h3>The Spa</h3>
            </div>
          </Link>
          <Link href="/water-sports" className="explore-card">
            <img
              src={`${BLOB}/activities-7.webp`}
              alt="Water sports at Curtain Bluff"
            />
            <div className="explore-card-ov">
              <span>On the Water</span>
              <h3>Water Sports</h3>
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
