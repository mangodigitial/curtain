import Link from "next/link";

const BLOB =
  "https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/";

export default function WaterSportsTemplate({
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
          src={`${BLOB}pt-water-sports-bg.webp`}
          alt="Water sports at Curtain Bluff, Antigua"
        />
        <div className="sub-hero-bg" />
        <div className="sub-hero-content">
          <div className="sub-hero-breadcrumb">
            <Link href="/">Home</Link> <span>&rarr;</span>{" "}
            <Link href="/activities">Activities</Link> <span>&rarr;</span> Water
            Sports
          </div>
          <h1 className="sub-hero-title">
            Water
            <br />
            <em>Sports</em>
          </h1>
        </div>
      </section>

      {/* ═══════ INTRO SPLIT ═══════ */}
      <section className="intro-split reveal">
        <div className="intro-text">
          <div className="section-label">On the Water</div>
          <h2>
            An all-day lineup of <em>fun in the sun</em>
          </h2>
          <p>
            If lounging in the shade is a bit low-key for your tastes, our
            extensive selection of water sports ensures an all-day lineup of fun
            in the sun. All water sports are included in the room rate so you can
            snorkel, sail, ski, and paddle to your heart&apos;s content.
          </p>
          <p>
            From the calm leeward beach to the open Atlantic side, Curtain
            Bluff&apos;s unique peninsula setting means the right conditions are
            always just a short walk away &mdash; sheltered shallows for
            beginners, steady trade winds for seasoned sailors, and pristine
            reefs for every level of snorkeller.
          </p>
        </div>
        <div className="intro-sidebar">
          <h4 className="sidebar-heading">What&apos;s Included</h4>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Waterskiing</span>
            <span className="sidebar-val">
              Speedboat, equipment &amp; instruction
            </span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Beach toys</span>
            <span className="sidebar-val">
              Hobie Cats, paddleboats, kayaks &amp; Windsurfers
            </span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Snorkelling</span>
            <span className="sidebar-val">
              Fins, mask, snorkel &amp; two daily reef trips
            </span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Pool</span>
            <span className="sidebar-val">
              Swimming pool with two 75-foot lap lanes
            </span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Extras</span>
            <span className="sidebar-val">
              Aqua aerobics, boat tubing &amp; sun floats
            </span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Cost</span>
            <span className="sidebar-val">Included in room rate</span>
          </div>
        </div>
      </section>

      {/* ═══════ GALLERY BAND ═══════ */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridAutoRows: '300px',
        gap: '0.4rem'
      }}>
        <img src={`${BLOB}activities-7.webp`} alt="Sailing a Hobie Cat at Curtain Bluff" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <img src={`${BLOB}activities-8.webp`} alt="Kayaking on calm Caribbean waters" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <img src={`${BLOB}activities-9.webp`} alt="Waterskiing off Curtain Bluff beach" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <img src={`${BLOB}pt-water-sports-bg.webp`} alt="Snorkelling along Antigua reefs" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>

      {/* ═══════ EDITORIAL: SAILING & HOBIE CATS ═══════ */}
      <section className="detail reveal">
        <div className="detail-inner">
          <h3>
            Sailing &amp; <em>Hobie Cats</em>
          </h3>
          <div className="detail-columns">
            <div>
              <p>
                Curtain Bluff&apos;s calm-water beach is the perfect launch point
                for an afternoon on the water. Hobie Cats are available
                throughout the day &mdash; whether you&apos;re an experienced
                sailor looking to catch the trade winds or a first-timer ready to
                learn the ropes, our beach team will get you set up and on your
                way.
              </p>
            </div>
            <div>
              <p>
                Windsurfers and paddleboats round out the sailing fleet, giving
                guests of every skill level a way to explore the turquoise waters
                off Antigua&apos;s southern coast. All equipment is complimentary
                and available on a first-come, first-served basis right from the
                beach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ EDITORIAL: KAYAKING & PADDLEBOARDING ═══════ */}
      <section className="detail reversed reveal">
        <div className="detail-inner">
          <h3>
            Kayaking &amp; <em>Paddleboarding</em>
          </h3>
          <div className="detail-columns">
            <div>
              <p>
                Glide along the coastline at your own pace on one of our
                single or tandem kayaks. The sheltered leeward side offers
                glass-smooth conditions ideal for a leisurely paddle, while
                more adventurous guests can round the peninsula for a closer look
                at the dramatic bluff from the water.
              </p>
            </div>
            <div>
              <p>
                Stand-up paddleboards are equally popular for those who prefer to
                stay upright and take in the views. Early morning sessions, when
                the sea is at its calmest, are especially rewarding &mdash; you
                may spot sea turtles and rays gliding beneath you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ EDITORIAL: WATERSKIING & TUBING ═══════ */}
      <section className="detail reveal">
        <div className="detail-inner">
          <h3>
            Waterskiing &amp; <em>Tubing</em>
          </h3>
          <div className="detail-columns">
            <div>
              <p>
                Our dedicated speedboat, professional-grade equipment and
                experienced instructors make waterskiing and wakeboarding
                accessible to everyone &mdash; from first-time skiers to
                seasoned wake jumpers. Sessions run throughout the day directly
                from the beach.
              </p>
            </div>
            <div>
              <p>
                For pure adrenaline with a lower learning curve, boat tubing on
                the Super Mable is a guest favourite. Hold on tight as the boat
                sweeps through the bay &mdash; it&apos;s a hit with families and
                thrill-seekers alike. All waterskiing and tubing activities are
                included in the room rate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ EDITORIAL: SNORKELLING ═══════ */}
      <section className="detail reversed reveal">
        <div className="detail-inner">
          <h3>
            <em>Snorkelling</em>
          </h3>
          <div className="detail-columns">
            <div>
              <p>
                Curtain Bluff sits beside some of Antigua&apos;s healthiest reef
                systems. Complimentary snorkel gear &mdash; fins, mask and
                snorkel &mdash; is available for every guest, so you can explore
                the house reef at your leisure, just steps from the sand.
              </p>
            </div>
            <div>
              <p>
                For a guided experience, two daily reef trips by boat take you to
                pristine sites teeming with tropical fish, sea fans and the
                occasional turtle. Whether you&apos;re dipping your mask in for
                the first time or logging your hundredth reef, the waters off
                Curtain Bluff never disappoint.
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
            I am a complete convert&hellip; Everything from the snorkel trip to
            the massage was fantastic. I&apos;ve already filled out a booking
            form for next year!
          </p>
          <p className="quote-author">
            Leslie Madd &mdash; California
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
          <Link href="/tennis" className="explore-card">
            <img
              src={`${BLOB}25-tennis-at-curtain-bluff.webp`}
              alt="Championship tennis courts at Curtain Bluff"
            />
            <div className="explore-card-ov">
              <span>On the Court</span>
              <h3>Tennis</h3>
            </div>
          </Link>
          <Link href="/scuba-diving" className="explore-card">
            <img
              src={`${BLOB}activities-8.webp`}
              alt="Scuba diving near Curtain Bluff"
            />
            <div className="explore-card-ov">
              <span>Beneath the Surface</span>
              <h3>Scuba Diving</h3>
            </div>
          </Link>
          <Link href="/ground-sports" className="explore-card">
            <img
              src={`${BLOB}activities-9.webp`}
              alt="Ground sports at Curtain Bluff"
            />
            <div className="explore-card-ov">
              <span>On the Pitch</span>
              <h3>Ground Sports</h3>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
