import Link from "next/link";

export default function KidsCampTemplate({
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
          src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1800&q=80"
          alt="Cee Bee Kids Camp"
        />
        <div className="sub-hero-bg" />
        <div className="sub-hero-content">
          <div className="sub-hero-breadcrumb">
            <Link href="/">Home</Link> <span>&rarr;</span>{" "}
            <Link href="/activities">Activities</Link> <span>&rarr;</span> Cee
            Bee Kids Camp
          </div>
          <h1 className="sub-hero-title">
            Cee Bee <em>Kids Camp</em>
          </h1>
        </div>
      </section>

      {/* ═══════ INTRO SPLIT ═══════ */}
      <section className="intro-split reveal">
        <div className="intro-text">
          <div className="section-label">For the Family</div>
          <h2>
            Where kids have <em>the time of their lives</em>
          </h2>
          <p>
            Planning the perfect family holiday is a delicate balancing act. On
            one side, there&apos;s the too-rigid itinerary that leaves kids
            feeling dragged along. On the other, the amusement-park chaos that
            leaves parents anything but recharged.
          </p>
          <p>
            Curtain Bluff strikes the perfect balance &mdash; with ample
            activities to keep kids entertained yet within sight of the nearest
            hammock, conveniently serviced by a friendly beach concierge.
          </p>
          <p>
            Headquartered in the shade of the palms on our calm-water beach, Cee
            Bee Kids Camp is home base for our younger guests. A daily activity
            lineup runs the gamut from crafting to crab races, while active
            pursuits like Hobie Cat sailing, snorkelling, waterskiing and court
            sports keep even the most energetic youngsters occupied all day.
          </p>
        </div>
        <div className="intro-sidebar">
          <h4 className="sidebar-heading">At a Glance</h4>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Ages</span>
            <span className="sidebar-val">3 &ndash; 10 years</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Schedule</span>
            <span className="sidebar-val">
              5 days per week (6 in peak season)
            </span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Closed</span>
            <span className="sidebar-val">Thursdays &amp; Sundays</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Cost</span>
            <span className="sidebar-val">Included in room rate</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Evenings</span>
            <span className="sidebar-val">
              Dinner &amp; movie sessions available (fee applies, peak periods)
            </span>
          </div>
          <a href="#" className="sidebar-cta">
            View Kids Camp Schedule &#8599;
          </a>
        </div>
      </section>

      {/* ═══════ GALLERY BAND ═══════ */}
      <div className="gallery-band reveal">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80"
          alt="Beach fun"
        />
        <img
          src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=500&q=80"
          alt="Kids activities"
        />
        <img
          src="https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=500&q=80"
          alt="Playground"
        />
        <img
          src="https://images.unsplash.com/photo-1530549387789-4c1017266635?w=500&q=80"
          alt="Water activities"
        />
      </div>

      {/* ═══════ DETAIL SECTION ═══════ */}
      <section className="detail reveal">
        <div className="detail-inner">
          <h3>
            A day at <em>Cee Bee</em>
          </h3>
          <div className="detail-columns">
            <div>
              <p>
                For the little ones, there&apos;s a shaded sandbox with a full
                jungle gym, while our game room offers a break from the sun with
                board games, computer games and a wide-screen TV showing
                children&apos;s favourites.
              </p>
              <p>
                Active pursuits include Hobie Cat sailing, snorkelling,
                waterskiing and court sports to keep even the most energetic
                youngsters occupied.
              </p>
            </div>
            <div>
              <p>
                In the evening, enjoy family-friendly early dinners on the
                Tamarind Terrace at 6:00 PM. Later on, childcare staff are
                available for hire to look after kids back in the room, freeing
                up parents for leisurely dinners and dancing to our nightly live
                bands under the stars.
              </p>
              <p>
                Creative Camp sessions and kids tennis clinics run throughout the
                season &mdash; dates may vary.
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
            Looking for that one magical resort where the kids have fun and you
            actually get to relax? It exists &mdash; I found it in Antigua.
            Curtain Bluff has stacked up &lsquo;World&apos;s Best&rsquo; awards,
            but that doesn&apos;t impress kids &mdash; here&apos;s what does.
          </p>
          <p className="quote-author">
            Kim-Marie Evans &mdash; Luxury Travel Mom
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
          <a href="#" className="explore-card">
            <img
              src="https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&q=80"
              alt="Water Sports"
            />
            <div className="explore-card-ov">
              <span>On the Water</span>
              <h3>Water Sports</h3>
            </div>
          </a>
          <a href="#" className="explore-card">
            <img
              src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&q=80"
              alt="Ground Sports"
            />
            <div className="explore-card-ov">
              <span>On the Court</span>
              <h3>Ground Sports</h3>
            </div>
          </a>
          <a href="#" className="explore-card">
            <img
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80"
              alt="Scuba"
            />
            <div className="explore-card-ov">
              <span>Beneath the Surface</span>
              <h3>Scuba Diving</h3>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}
