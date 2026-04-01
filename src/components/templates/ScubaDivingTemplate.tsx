import Link from "next/link";

const BLOB = "https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images";

export default function ScubaDivingTemplate({
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
          src={`${BLOB}/pt-padi-bg.webp`}
          alt="Scuba diving in the crystal-clear waters near Curtain Bluff"
        />
        <div className="sub-hero-bg" />
        <div className="sub-hero-content">
          <div className="sub-hero-breadcrumb">
            <Link href="/">Home</Link> <span>&rarr;</span>{" "}
            <Link href="/activities">Activities</Link> <span>&rarr;</span>{" "}
            Scuba Diving
          </div>
          <h1 className="sub-hero-title">
            Scuba
            <br />
            <em>Diving</em>
          </h1>
        </div>
      </section>

      {/* ═══════ INTRO SPLIT ═══════ */}
      <section className="intro-split reveal">
        <div className="intro-text">
          <div className="section-label">Beneath the Surface</div>
          <h2>
            Dive into the magic of <em>Cades Reef</em>
          </h2>
          <p>
            Experience the underwater wonders of Antigua with our exclusive scuba
            diving adventures. Our hotel is the closest to the famous Cades Reef,
            one of the island&apos;s most vibrant and diverse marine sanctuaries.
          </p>
          <p>
            Whether you&apos;re a first-timer or looking to add more dives to
            your logbook, we&apos;ve got you covered. Let the Caribbean Sea
            become your playground at Curtain Bluff.
          </p>
        </div>
        <div className="intro-sidebar">
          <h4 className="sidebar-heading">At a Glance</h4>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Certified Divers</span>
            <span className="sidebar-val">$125 per person per dive</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Discover Scuba</span>
            <span className="sidebar-val">$150 per person (beginners)</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Additional DSD</span>
            <span className="sidebar-val">$50 per person per dive</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">PADI Certification</span>
            <span className="sidebar-val">
              Open-water dive portion &mdash; $450 pp
            </span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Booking</span>
            <span className="sidebar-val">Must be pre-booked &amp; confirmed</span>
          </div>
        </div>
      </section>

      {/* ═══════ GALLERY BAND ═══════ */}
      <div className="gallery-band reveal">
        <img
          src={`${BLOB}/activities-8.webp`}
          alt="Scuba diver exploring Cades Reef near Curtain Bluff"
        />
        <img
          src={`${BLOB}/activities-10.webp`}
          alt="Colourful marine life at Cades Reef"
        />
        <img
          src={`${BLOB}/pt-padi-bg.webp`}
          alt="Underwater diving adventure at Curtain Bluff"
        />
      </div>

      {/* ═══════ DIVE SITES ═══════ */}
      <section className="detail reveal">
        <div className="detail-inner">
          <h3>
            Cades Reef <em>&amp; Dive Sites</em>
          </h3>
          <div className="detail-columns">
            <div>
              <p>
                Cades Reef stretches along Antigua&apos;s southwest coast and is
                one of the most spectacular dive sites in the Eastern Caribbean.
                As the resort closest to the reef, Curtain Bluff offers
                unmatched convenience &mdash; you can be underwater exploring
                vibrant coral formations within minutes of leaving the dock.
              </p>
            </div>
            <div>
              <p>
                The reef teems with tropical fish, sea turtles, rays and an
                extraordinary array of soft and hard corals. Visibility regularly
                exceeds 80 feet, making every dive a feast for the eyes whether
                you&apos;re hovering over a shallow garden or descending along a
                dramatic wall.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PADI COURSES ═══════ */}
      <section className="detail reveal">
        <div className="detail-inner">
          <h3>
            PADI <em>Courses</em>
          </h3>
          <div className="detail-columns">
            <div>
              <p>
                <strong>Discover Scuba Diving</strong> &mdash; Perfect for
                beginners, this introductory course will have you exploring the
                reef under the guidance of certified instructors. No prior
                experience is required &mdash; just bring your sense of
                adventure. Additional DSD dives can be booked to discover even
                more of Antigua&apos;s underwater beauty.
              </p>
            </div>
            <div>
              <p>
                <strong>PADI Open Water Certification</strong> &mdash; Guests
                must complete theoretical classes and pool sessions prior to
                arriving at Curtain Bluff. The hotel offers the open-water dive
                portion of the PADI certification at a cost of $450 per person.
                There is a minimum age for participation, and all services must
                be pre-booked and confirmed by the resort before arrival.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ EQUIPMENT & WHAT'S INCLUDED ═══════ */}
      <section className="detail reveal">
        <div className="detail-inner">
          <h3>
            Equipment <em>&amp; Inclusions</em>
          </h3>
          <div className="detail-columns">
            <div>
              <p>
                All diving equipment is provided &mdash; BCD, regulator, wetsuit,
                mask, fins and tanks are included in every dive package. Our
                gear is professionally maintained and inspected before each
                outing, so you can focus entirely on the experience below the
                surface.
              </p>
            </div>
            <div>
              <p>
                Boat transfers to dive sites, expert PADI-certified dive guides
                and surface support are all part of the package. Terms and
                conditions apply &mdash; please contact the hotel team in advance
                to learn about all requirements and to secure your preferred dive
                times.
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
            Cades Reef is one of Antigua&apos;s best-kept secrets &mdash; and
            diving it straight from the resort makes Curtain Bluff the ultimate
            base for underwater exploration in the Caribbean.
          </p>
          <p className="quote-author">PADI Travel &mdash; Caribbean Diving</p>
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
          <Link href="/ground-sports" className="explore-card">
            <img
              src={`${BLOB}/25-tennis-at-curtain-bluff.webp`}
              alt="Championship tennis courts at Curtain Bluff"
            />
            <div className="explore-card-ov">
              <span>On the Court</span>
              <h3>Ground Sports</h3>
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
