import Link from "next/link";

const BLOB = "https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/";

export default function CorporateEventsTemplate({
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
          src={`${BLOB}pt-corporate-events-bg.webp`}
          alt="Corporate events at Curtain Bluff"
        />
        <div className="sub-hero-bg" />
        <div className="sub-hero-content">
          <div className="sub-hero-breadcrumb">
            <Link href="/">Home</Link> <span>&rarr;</span>{" "}
            <Link href="/weddings-and-events">Weddings</Link>{" "}
            <span>&rarr;</span> Corporate Events
          </div>
          <h1
            className="sub-hero-title"
            dangerouslySetInnerHTML={{
              __html: "Corporate<br /><em>Events</em>",
            }}
          />
        </div>
      </section>

      {/* ═══════ INTRO SPLIT ═══════ */}
      <section className="intro-split reveal">
        <div className="intro-text">
          <div className="section-label">Business &amp; Leisure</div>
          <h2>
            Where business meets <em>paradise</em>
          </h2>
          <p>
            Host your corporate event at the most contemporary all-inclusive
            luxury hotel in the Caribbean. Curtain Bluff offers 850 square feet
            of flexible event space in the Tamarind events room set on 20 acres
            of lush tropical grounds flanked by the Caribbean Sea.
          </p>
          <p>
            Many groups find that our all-inclusive room rate covers all the
            amenities they&apos;re after. Others prefer to add a few extra
            indulgences &mdash; yacht charters and sunset cruises, fine wines
            from our celebrated cellar, private tennis instruction, island tours,
            discounted spa treatments, and in-room gifts.
          </p>
          <p>
            Thanks to Curtain Bluff&apos;s famous flexibility, larger groups can
            enjoy full run of the house by booking the entire resort, which gives
            you ultimate exclusivity.
          </p>
        </div>
        <div className="intro-sidebar">
          <h4 className="sidebar-heading">At a Glance</h4>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Capacity</span>
            <span className="sidebar-val">Up to 72 rooms</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Meeting space</span>
            <span className="sidebar-val">850 sq ft, up to 28 people</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Dining</span>
            <span className="sidebar-val">
              Private dinners &amp; cocktail parties
            </span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Leisure</span>
            <span className="sidebar-val">
              Two beaches, tennis, squash, water sports &amp; spa
            </span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Access</span>
            <span className="sidebar-val">
              Non-stop from NYC, Miami, Toronto &amp; London
            </span>
          </div>
          <a href="/contact-us" className="sidebar-cta">
            Contact Us &#8599;
          </a>
        </div>
      </section>

      {/* ═══════ GALLERY BAND ═══════ */}
      <div className="gallery-band-4">
        <img src={`${BLOB}corporateevent-1.webp`} alt="Corporate team gathering at Curtain Bluff resort" />
        <img src={`${BLOB}corporateevent-2.webp`} alt="Executive meeting in the Tamarind events room" />
        <img src={`${BLOB}corporateevent-3.webp`} alt="Corporate cocktail reception overlooking the Caribbean" />
        <img src={`${BLOB}corporateevent-4.webp`} alt="Group dining event at Curtain Bluff" />
      </div>

      {/* ═══════ DETAIL: FACILITIES & SERVICES ═══════ */}
      <section className="detail reversed reveal">
        <div className="detail-inner">
          <h3>
            Facilities &amp; <em>Services</em>
          </h3>
          <p>
            When you welcome your group to Curtain Bluff, you&apos;ll enjoy
            facilities and services that include:
          </p>
          <div className="detail-columns">
            <div>
              <ul style={{ paddingLeft: "1.2em" }}>
                <li>
                  Sound proof event room featuring individual controls for air
                  conditioning, sound, music and telephones
                </li>
                <li>
                  High-speed wired and wireless internet access in every meeting
                  room and property wide
                </li>
                <li>Multiple, easily accessible electric outlets</li>
                <li>Budget planning assistance to manage costs</li>
                <li>
                  Expert, on-site event and IT staff to bring your ideas to life
                  and troubleshoot any technical issues
                </li>
              </ul>
            </div>
            <div>
              <ul style={{ paddingLeft: "1.2em" }}>
                <li>Welcome cocktail party at the Bluff House</li>
                <li>Private dinner at the Sea Grape beach restaurant</li>
                <li>Complimentary room drop</li>
                <li>
                  High-tech equipment including cameras, multi-image
                  presentations, data projectors, digital audio and more
                  (available for a premium)
                </li>
                <li>Meeting planning (available for a premium)</li>
              </ul>
            </div>
          </div>
          <p style={{ marginTop: "1.5rem" }}>
            Special discounted rates are extended to groups of 10 or more rooms
            booked for a minimum of three nights. Other discounts may be
            available depending on season and group size.
          </p>
        </div>
      </section>

      {/* ═══════ DETAIL: WHY CURTAIN BLUFF ═══════ */}
      <section className="detail reveal">
        <div className="detail-inner">
          <h3>
            Why <em>Curtain Bluff</em>
          </h3>
          <div className="detail-columns">
            <div>
              <p>
                <strong>Perfect Size</strong> &mdash; Small enough for
                home-away-from-home intimacy yet spacious enough to accommodate
                larger groups of up to 72 rooms.
              </p>
              <p>
                <strong>Five-Star Dining</strong> &mdash; Breathtaking settings
                and delicious, locally sourced ingredients make every meal
                memorable. Private dinners, cocktail parties and sunset cruises
                can be fully customized.
              </p>
              <p>
                <strong>Outstanding Facilities</strong> &mdash; Meeting rooms
                accommodate up to 28 people with various layout configurations.
                Our leisure facilities include two beaches, a pro-run tennis
                center, squash court, a water sports center, and our acclaimed
                spa just feet from the water&apos;s edge.
              </p>
            </div>
            <div>
              <p>
                <strong>Attentive Staff</strong> &mdash; Our welcoming,
                world-class staff are to thank for the highest repeat-guest rate
                in the region. We go above and beyond to make your corporate stay
                seamless.
              </p>
              <p>
                <strong>Accessible</strong> &mdash; Antigua is served by
                non-stop flights from four major cities: New York (4.5 hours),
                Miami (3 hours), Toronto (5 hours), and London (8 hours). Curtain
                Bluff is a scenic 30-minute private taxi ride from Antigua&apos;s
                V.C. Bird International Airport.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ DETAIL: EXTRAS ═══════ */}
      <section className="detail reversed reveal">
        <div className="detail-inner">
          <h3>
            Additional <em>indulgences</em>
          </h3>
          <div className="detail-columns">
            <div>
              <ul style={{ paddingLeft: "1.2em" }}>
                <li>Yacht charters and sunset cruises</li>
                <li>Fine wines from our celebrated cellar</li>
                <li>
                  Private tennis instruction and round-robin / pro-am
                  tournaments
                </li>
                <li>Island tours</li>
              </ul>
            </div>
            <div>
              <ul style={{ paddingLeft: "1.2em" }}>
                <li>Discounted treatments at our oceanside spa</li>
                <li>In-room gifts and special amenities</li>
                <li>
                  Extra nights (dependent on the season and size of the initial
                  booking)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ EXPLORE OTHER PAGES ═══════ */}
      <section className="explore-other reveal">
        <div className="explore-other-header">
          <div
            className="section-label"
            style={{ justifyContent: "center" }}
          >
            Weddings &amp; Events
          </div>
          <h2>
            Also <em>explore</em>
          </h2>
        </div>
        <div className="explore-grid">
          <Link href="/weddings-and-events" className="explore-card">
            <img
              src={`${BLOB}9-er-portraits-1.webp`}
              alt="Weddings and Events at Curtain Bluff"
            />
            <div className="explore-card-ov">
              <span>Celebrations</span>
              <h3>Weddings &amp; Events</h3>
            </div>
          </Link>
          <Link href="/caribbean-weddings" className="explore-card">
            <img
              src={`${BLOB}wedding03.webp`}
              alt="Beach wedding ceremony at Curtain Bluff"
            />
            <div className="explore-card-ov">
              <span>Say I Do</span>
              <h3>Caribbean Weddings</h3>
            </div>
          </Link>
          <Link href="/honeymoon" className="explore-card">
            <img
              src={`${BLOB}honeymoon-1.webp`}
              alt="Romantic honeymoon escape at Curtain Bluff"
            />
            <div className="explore-card-ov">
              <span>Romance</span>
              <h3>Honeymoon</h3>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
