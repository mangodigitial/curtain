import Link from "next/link";

const BLOB = "https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/";

export default function CaribbeanWeddingsTemplate({
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
          src={`${BLOB}9-er-portraits-1.webp`}
          alt="Caribbean wedding ceremony at Curtain Bluff"
        />
        <div className="sub-hero-bg" />
        <div className="sub-hero-content">
          <div className="sub-hero-breadcrumb">
            <Link href="/">Home</Link> <span>&rarr;</span>{" "}
            <Link href="/weddings-and-events">Weddings</Link>{" "}
            <span>&rarr;</span> Caribbean Weddings
          </div>
          <h1
            className="sub-hero-title"
            dangerouslySetInnerHTML={{
              __html: "Caribbean<br /><em>Weddings</em>",
            }}
          />
        </div>
      </section>

      {/* ═══════ INTRO SPLIT ═══════ */}
      <section className="intro-split reveal">
        <div className="intro-text">
          <div className="section-label">Your Special Day</div>
          <h2>
            A wedding as <em>unforgettable</em> as your love
          </h2>
          <p>
            At Curtain Bluff, your special day is our special day. Whether your
            dream wedding is an intimate two-person affair or an all-resort
            buyout for up to 140 guests, our experienced and attentive team will
            oversee every detail for an event that unfolds flawlessly.
          </p>
          <p>
            To ensure that your destination wedding is both personal and
            seamless, we never schedule more than one wedding on any given day.
          </p>
          <p>
            Our wedding rate starts at $4,200 and includes your picturesque
            ceremony, officiant, round-trip taxi to St. John&apos;s to complete
            the wedding paperwork, one of our stunning locations on property for
            your ceremony with reception to follow, bridal bouquet and
            groom&apos;s boutonniere, wedding cake and the services of our
            resident wedding planner &mdash; everything you need for a magical
            and memorable wedding day.
          </p>
        </div>
        <div className="intro-sidebar">
          <h4 className="sidebar-heading">At a Glance</h4>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Capacity</span>
            <span className="sidebar-val">2 &ndash; 140 guests</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Venues</span>
            <span className="sidebar-val">
              Beach, Sea Grape, Bluff House
            </span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Planning</span>
            <span className="sidebar-val">Resident wedding planner</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Includes</span>
            <span className="sidebar-val">
              Ceremony, officiant, bouquet, cake &amp; more
            </span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">&#9670;</span>
            <span className="sidebar-label">Starting rate</span>
            <span className="sidebar-val">From $4,200</span>
          </div>
          <a href="/contact-us" className="sidebar-cta">
            Contact Us &#8599;
          </a>
        </div>
      </section>

      {/* ═══════ GALLERY BAND ═══════ */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridAutoRows: '300px',
        gap: '0.4rem'
      }}>
        <img src={`${BLOB}wedding03.webp`} alt="Beach wedding ceremony at Curtain Bluff" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <img src={`${BLOB}wedding05.webp`} alt="Bride and groom exchanging vows on the sand" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <img src={`${BLOB}wedding06.webp`} alt="Wedding reception under the Caribbean stars" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <img src={`${BLOB}wedding07.webp`} alt="Newlyweds celebrating at Curtain Bluff" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>

      {/* ═══════ DETAIL: A DAY IN THE LIFE ═══════ */}
      <section className="detail reveal">
        <div className="detail-inner">
          <h3>
            A day in the life of a <em>bride</em>
          </h3>
          <div className="detail-columns">
            <div>
              <p>
                Begin with a leisurely breakfast before the groom and his friends
                set off on a private fishing excursion from the resort dock.
                Meanwhile, the bride and her wedding party retreat to the spa for
                an afternoon of pampering, with private use of the pool and
                relaxation area for lunch and champagne.
              </p>
              <p>
                After hair and makeup in the salon, dress for the ceremony in the
                salon, your suite, or a private bedroom at the Bluff House.
              </p>
            </div>
            <div>
              <p>
                Exchange vows at sunset either at the Bluff House or on the
                beach, followed by dinner and dancing in either the Sea Grape
                Beach Restaurant or the Tamarind Restaurant.
              </p>
              <p>
                Return to your suite after the reception to a romantic turndown
                service &mdash; the perfect ending to a perfect day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ DETAIL: VENUES ═══════ */}
      <section className="detail reveal">
        <div className="detail-inner">
          <h3>
            Explore <em>the space</em>
          </h3>
          <div className="detail-columns">
            <div>
              <p>
                <strong>The Sea Grape</strong> &mdash; Located on the sand, feet
                from the lapping waves of Morris Bay beach. The open area is the
                ideal barefoot-elegance ceremony location. Cocktails follow on
                the deck with an a&nbsp;la carte dinner inside the open-walled
                pavilion. Accommodates 20 to 100 persons with space for a live
                band or DJ and dancing.
              </p>
              <p>
                <strong>Grace Bay / Morris Bay Suites</strong> &mdash; Our
                ultra-exclusive 1,600-square-foot suites with expansive patios
                and plunge pools overlooking Grace Bay beach. Ideal for intimate
                weddings of up to six guests with a tailor-made dinner menu fully
                serviced in private.
              </p>
            </div>
            <div>
              <p>
                <strong>The Bluff House</strong> &mdash; A private residence
                perched on the very edge of the bluff with 180-degree views of
                the Caribbean Sea, setting sun and neighboring islands. 1,000
                square feet of patio for the ceremony and 1,500 square feet
                indoors for entertaining from 2 to 140 persons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ DETAIL: SERVICES ═══════ */}
      <section className="detail reveal">
        <div className="detail-inner">
          <h3>
            Details &amp; <em>Amenities</em>
          </h3>
          <div className="detail-columns">
            <div>
              <p>
                <strong>Service</strong> &mdash; Wedding planner and team,
                on-site banquet manager, assistance with pre- and post-wedding
                events, wedding officiant, in-house arrangements for sourcing
                decor, bands, DJs, photographer and videographer, and round-trip
                taxi transportation to and from St. John&apos;s.
              </p>
            </div>
            <div>
              <p>
                <strong>Food &amp; Drink</strong> &mdash; From mouthwatering
                filet mignon to the day&apos;s fresh catch, our chefs blend
                imaginative pairings with locally sourced ingredients to create a
                one-of-a-kind wedding menu you won&apos;t find anywhere else.
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
            From the very beginning we knew we were in good hands. Wendy and
            Curtain Bluff&apos;s amazing staff took care of everything. Leaving
            Jesse and I to spend time with our friends and family and enjoy the
            resort. We had such a good time, we immediately booked a return trip
            for the same time next year.
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
              src={`${BLOB}28-oa-coupleportraits.webp`}
              alt="Weddings and Events at Curtain Bluff"
            />
            <div className="explore-card-ov">
              <span>Celebrations</span>
              <h3>Weddings &amp; Events</h3>
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
