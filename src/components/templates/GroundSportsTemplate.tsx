import Link from "next/link";

const BLOB = "https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images";

export default function GroundSportsTemplate({
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
          src={`${BLOB}/pt-ground-sports-bg.webp`}
          alt="Tennis and ground sports facilities at Curtain Bluff"
        />
        <div className="sub-hero-bg" />
        <div className="sub-hero-content">
          <div className="sub-hero-breadcrumb">
            <Link href="/">Home</Link> <span>&rarr;</span>{" "}
            <Link href="/activities">Activities</Link> <span>&rarr;</span>{" "}
            Ground Sports
          </div>
          <h1 className="sub-hero-title">
            Ground
            <br />
            <em>Sports</em>
          </h1>
        </div>
      </section>

      {/* ═══════ INTRO SPLIT ═══════ */}
      <section className="intro-split reveal">
        <div className="intro-text">
          <div className="section-label">On the Court</div>
          <h2>
            Step off the sand, <em>onto the court</em>
          </h2>
          <p>
            Take a break from the waves with a pick-up game on our half
            basketball court, which is stocked with balls and fully lit for
            evening play. Up for trying something new? Grab a paddle and hit the
            pickleball court or break a sweat under the A/C in a game of squash.
          </p>
          <p>
            Whether you&apos;re sharpening your backhand with our resident pro,
            rallying on one of four championship-grade tennis courts, or
            challenging a fellow guest to a friendly game of croquet on the lawn,
            Curtain Bluff offers world-class ground sports for every skill level
            &mdash; all included in your stay.
          </p>
        </div>
        <div className="intro-sidebar">
          <h4 className="sidebar-heading">At a Glance</h4>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Tennis</span>
            <span className="sidebar-val">
              4 championship courts (2 lit for night play)
            </span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Pickleball</span>
            <span className="sidebar-val">Dedicated court</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Squash</span>
            <span className="sidebar-val">Air-conditioned court</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Basketball</span>
            <span className="sidebar-val">Half court, lit for evenings</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Cost</span>
            <span className="sidebar-val">Included in room rate</span>
          </div>
        </div>
      </section>

      {/* ═══════ GALLERY BAND ═══════ */}
      <div className="gallery-band reveal">
        <img
          src={`${BLOB}/25-tennis-at-curtain-bluff.webp`}
          alt="Championship tennis courts at Curtain Bluff"
        />
        <img
          src={`${BLOB}/curtain-bluff-tennis-class.webp`}
          alt="Tennis coaching clinic at Curtain Bluff"
        />
        <img
          src={`${BLOB}/pt-ground-sports-bg.webp`}
          alt="Ground sports facilities at Curtain Bluff"
        />
      </div>

      {/* ═══════ TENNIS ═══════ */}
      <section className="detail reveal">
        <div className="detail-inner">
          <h3>
            Championship <em>Tennis</em>
          </h3>
          <div className="detail-columns">
            <div>
              <p>
                Curtain Bluff has long been regarded as one of the Caribbean&apos;s
                premier tennis destinations. Four Har-Tru courts &mdash; two lit
                for evening play &mdash; sit at the heart of the resort, flanked
                by tropical gardens and ocean breezes that make every set feel
                like a holiday in itself.
              </p>
            </div>
            <div>
              <p>
                Our resident tennis pro offers private lessons, clinics and
                round-robins for players of all abilities. Complimentary racquets
                and balls are provided, so all you need to bring is your
                competitive spirit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PICKLEBALL & SQUASH ═══════ */}
      <section className="detail reveal">
        <div className="detail-inner">
          <h3>
            Pickleball <em>&amp; Squash</em>
          </h3>
          <div className="detail-columns">
            <div>
              <p>
                Pickleball has quickly become a guest favourite. Our dedicated
                court is equipped with paddles and balls &mdash; just show up and
                play. It&apos;s the perfect way to squeeze in some friendly
                competition between beach sessions.
              </p>
            </div>
            <div>
              <p>
                Prefer to play out of the sun? The air-conditioned squash court
                offers a fast-paced workout any time of day. Equipment is
                provided on-site, and our sports team can arrange matches or
                coaching on request.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ MORE SPORTS ═══════ */}
      <section className="detail reveal">
        <div className="detail-inner">
          <h3>
            Shuffleboard, Croquet <em>&amp; More</em>
          </h3>
          <div className="detail-columns">
            <div>
              <p>
                For a more leisurely pace, challenge friends and family to a
                round of shuffleboard or croquet on our manicured lawns. These
                classic resort pastimes are available throughout the day and
                offer the perfect excuse to linger outdoors with a cocktail in
                hand.
              </p>
            </div>
            <div>
              <p>
                Our fully equipped gym features modern cardio and weight
                equipment, available to all guests at any time. Whether
                you&apos;re maintaining a routine or burning off last night&apos;s
                five-course dinner, the facility is yours to enjoy.
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
            The tennis programme at Curtain Bluff is simply outstanding &mdash;
            world-class courts, expert coaching and a setting that makes every
            rally feel like a highlight reel.
          </p>
          <p className="quote-author">
            Travel + Leisure &mdash; World&apos;s Best Awards
          </p>
        </div>
      </section>

      {/* ═══════ EXPLORE OTHER ACTIVITIES ═══════ */}
      <section className="explore-other reveal">
        <div className="explore-other-header">
          <div
            className="section-label"
            style={{ justifyContent: "center" }}
          >
            More Activities
          </div>
          <h2>
            Also <em>explore</em>
          </h2>
        </div>
        <div className="explore-grid">
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
          <Link href="/scuba-diving" className="explore-card">
            <img
              src={`${BLOB}/activities-8.webp`}
              alt="Scuba diving near Curtain Bluff"
            />
            <div className="explore-card-ov">
              <span>Beneath the Surface</span>
              <h3>Scuba Diving</h3>
            </div>
          </Link>
          <Link href="/cee-bee-kids-camp" className="explore-card">
            <img
              src={`${BLOB}/activities-3.webp`}
              alt="Children at Cee Bee Kids Camp at Curtain Bluff"
            />
            <div className="explore-card-ov">
              <span>For the Family</span>
              <h3>Kids Camp</h3>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
