import Link from "next/link";

const BLOB = "https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/";

export default function HoneymoonTemplate({
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
          src={`${BLOB}pt-honeymoon-bg.webp`}
          alt="Romantic honeymoon setting at Curtain Bluff"
        />
        <div className="sub-hero-bg" />
        <div className="sub-hero-content">
          <div className="sub-hero-breadcrumb">
            <Link href="/">Home</Link> <span>&rarr;</span>{" "}
            <Link href="/weddings-and-events">Weddings</Link>{" "}
            <span>&rarr;</span> Honeymoon
          </div>
          <h1
            className="sub-hero-title"
            dangerouslySetInnerHTML={{
              __html: "Honeymoon<br /><em>Escape</em>",
            }}
          />
        </div>
      </section>

      {/* ═══════ INTRO SPLIT ═══════ */}
      <section className="intro-split reveal">
        <div className="intro-text">
          <div className="section-label">Romance</div>
          <h2>
            Begin your journey <em>together</em>
          </h2>
          <p>
            The perfect honeymoon sets the tone for the journey of marriage
            ahead: moments of warmth and wonder, intimacy and laughter, shared
            activities and stillness.
          </p>
          <p>
            It is all about balance, and Curtain Bluff allows you to tailor a
            vacation that suits anyone&apos;s personal preferences. It&apos;s
            easy to see why so many couples choose Curtain Bluff as the place to
            start their lives together.
          </p>
          <p>
            Your romantic vacation takes shape amidst our lush grounds as you
            stroll the gardens and discover secluded swings and day beds where
            you can spend the long days together &mdash; simply enjoying each
            other&apos;s company.
          </p>
          <p>
            During the balmy tropical evenings you can enjoy a private dinner for
            two on the beach with a private butler, delight in the delicious
            cuisine, treat yourselves to top-shelf beverages and end the evening
            together in the comfort of your luxurious suite, all set against the
            backdrop of the glittering Caribbean sea.
          </p>
        </div>
        <div className="intro-sidebar">
          <h4 className="sidebar-heading">At a Glance</h4>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Setting</span>
            <span className="sidebar-val">
              Lush tropical gardens &amp; two beaches
            </span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Dining</span>
            <span className="sidebar-val">
              Private dinners for two on the beach
            </span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Spa</span>
            <span className="sidebar-val">Couple&apos;s massages &amp; wellness</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Activities</span>
            <span className="sidebar-val">
              Water sports, kayaking &amp; yoga
            </span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Included</span>
            <span className="sidebar-val">
              All-inclusive dining, drinks &amp; minibar
            </span>
          </div>
          <a href="/contact-us" className="sidebar-cta">
            Contact Us &#8599;
          </a>
        </div>
      </section>

      {/* ═══════ GALLERY BAND ═══════ */}
      <div className="sub-gallery-band reveal">
        <img
          src={`${BLOB}honeymoon-1.webp`}
          alt="Couple strolling along the beach at Curtain Bluff"
        />
        <img
          src={`${BLOB}honeymoon-2.webp`}
          alt="Romantic sunset dinner for two on the sand"
        />
        <img
          src={`${BLOB}honeymoon-3.webp`}
          alt="Couple relaxing in a secluded garden daybed"
        />
        <img
          src={`${BLOB}honeymoon-5.webp`}
          alt="Oceanside spa treatments for honeymooners"
        />
      </div>

      {/* ═══════ DETAIL: ROMANCE ═══════ */}
      <section className="detail reversed reveal">
        <div className="detail-inner">
          <h3>
            Unforgettable <em>moments</em>
          </h3>
          <div className="detail-columns">
            <div>
              <p>
                Our secluded spa is a honeymoon mainstay, with treatments
                ranging from couple&apos;s massages to assorted wellness
                services. Once you&apos;ve sampled our celebrated restaurants,
                savor each other&apos;s company with a private picnic or dinner
                on the beach.
              </p>
            </div>
            <div>
              <p>
                Make once-in-a-lifetime memories with all-inclusive activities
                like water sports, kayaking, and yoga before retiring to your
                room for a nightcap from the minibar at no additional cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ DETAIL: INCLUDED ═══════ */}
      <section className="detail reveal">
        <div className="detail-inner">
          <h3>
            Honeymoon <em>inclusions</em>
          </h3>
          <div className="detail-columns">
            <div>
              <ul style={{ paddingLeft: "1.2em" }}>
                <li>Private dinner for two on the beach with a butler</li>
                <li>Couple&apos;s spa treatments at our oceanside spa</li>
                <li>All-inclusive gourmet dining and top-shelf beverages</li>
              </ul>
            </div>
            <div>
              <ul style={{ paddingLeft: "1.2em" }}>
                <li>Complimentary water sports, kayaking &amp; yoga</li>
                <li>Secluded gardens with day beds and swings</li>
                <li>In-room minibar replenished at no extra cost</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ QUOTE ═══════ */}
      <section className="quote-section reveal">
        <div className="quote-inner">
          <div className="quote-mark">&ldquo;</div>
          <p className="quote-text">
            Everything we could wish for. I can&apos;t imagine a better place
            for a honeymoon.
          </p>
          <p className="quote-author">Emmy &amp; Jesse &mdash; Oregon</p>
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
          <Link href="/corporate-events" className="explore-card">
            <img
              src={`${BLOB}corporateevent-1.webp`}
              alt="Corporate event at Curtain Bluff"
            />
            <div className="explore-card-ov">
              <span>Business</span>
              <h3>Corporate Events</h3>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
