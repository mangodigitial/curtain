import Link from "next/link";

export default function ActivitiesTemplate({
  sections,
}: {
  sections: any[];
}) {
  return (
    <>
      {/* ═══════ PAGE HERO ═══════ */}
      <section className="page-hero">
        <img
          className="page-hero-img"
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1800&q=80"
          alt="Scuba diving at Curtain Bluff"
        />
        <div className="page-hero-bg" />
        <div className="page-hero-content">
          <div className="page-hero-breadcrumb">
            <Link href="/">Home</Link> <span>&rarr;</span> Activities
          </div>
          <h1 className="page-hero-title">
            <em>Activities</em>
          </h1>
          <p className="page-hero-sub">
            More than a dozen exciting activities are fully included in your room
            rate &mdash; from championship tennis to scuba diving on Cade&apos;s
            Reef, there&apos;s never a dull moment on our shores.
          </p>
        </div>
      </section>

      {/* ═══════ WATER SPORTS ═══════ */}
      <section className="act-section reveal" id="water">
        <div className="act-inner">
          <div className="act-media">
            <img
              className="act-img-main"
              src="https://images.unsplash.com/photo-1530549387789-4c1017266635?w=900&q=80"
              alt="Waterskiing"
            />
            <img
              className="act-img-sm"
              src="https://images.unsplash.com/photo-1502680390548-bdbac40f7154?w=500&q=80"
              alt="Kayaking"
            />
            <img
              className="act-img-sm"
              src="https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=500&q=80"
              alt="Paddleboarding"
            />
          </div>
          <div className="act-content">
            <div className="section-label">On the Water</div>
            <h2 className="act-name">
              Water <em>Sports</em>
            </h2>
            <p className="act-desc">
              Skim across the bay on a Hobie Cat, carve through the waves on
              water skis, or take a leisurely paddle around the coast on a kayak.
              With two beaches, calm and surf, there&apos;s something for every
              comfort level.
            </p>
            <div className="act-highlights">
              <div className="act-highlight">
                <span className="act-highlight-dot" />
                Waterskiing &amp; instruction
              </div>
              <div className="act-highlight">
                <span className="act-highlight-dot" />
                Hobie Cats &amp; Windsurfers
              </div>
              <div className="act-highlight">
                <span className="act-highlight-dot" />
                Kayaks &amp; paddle-boats
              </div>
              <div className="act-highlight">
                <span className="act-highlight-dot" />
                Paddleboarding
              </div>
              <div className="act-highlight">
                <span className="act-highlight-dot" />
                Snorkel gear &amp; reef trips
              </div>
              <div className="act-highlight">
                <span className="act-highlight-dot" />
                Water aerobics
              </div>
            </div>
            <a href="#" className="act-link">
              Learn More <span className="arrow" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════ GROUND SPORTS ═══════ */}
      <section className="act-section reveal" id="ground">
        <div className="act-inner">
          <div className="act-media">
            <img
              className="act-img-main"
              src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=900&q=80"
              alt="Tennis courts"
            />
            <img
              className="act-img-sm"
              src="https://images.unsplash.com/photo-1526888935184-a82d2a4b7e67?w=500&q=80"
              alt="Pickleball"
            />
            <img
              className="act-img-sm"
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80"
              alt="Fitness centre"
            />
          </div>
          <div className="act-content">
            <div className="section-label">On the Ground</div>
            <h2 className="act-name">
              Ground <em>Sports</em>
            </h2>
            <p className="act-desc">
              Four championship hard courts have established Curtain Bluff as one
              of the Caribbean&apos;s premier tennis destinations. Beyond the
              courts, you&apos;ll find a full fitness centre, squash, pickleball,
              bocce, shuffleboard and a half basketball court.
            </p>
            <div className="act-highlights">
              <div className="act-highlight">
                <span className="act-highlight-dot" />4 championship tennis
                courts
              </div>
              <div className="act-highlight">
                <span className="act-highlight-dot" />
                Pickleball
              </div>
              <div className="act-highlight">
                <span className="act-highlight-dot" />
                Squash court
              </div>
              <div className="act-highlight">
                <span className="act-highlight-dot" />
                Fully equipped gym
              </div>
              <div className="act-highlight">
                <span className="act-highlight-dot" />
                Bocce &amp; shuffleboard
              </div>
              <div className="act-highlight">
                <span className="act-highlight-dot" />
                Half basketball court
              </div>
            </div>
            <a href="#" className="act-link">
              Learn More <span className="arrow" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════ SCUBA DIVING ═══════ */}
      <section className="act-section reveal" id="scuba">
        <div className="act-inner">
          <div className="act-media">
            <img
              className="act-img-main"
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=80"
              alt="Scuba diving reef"
            />
            <img
              className="act-img-sm"
              src="https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=500&q=80"
              alt="Underwater coral"
            />
            <img
              className="act-img-sm"
              src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&q=80"
              alt="Dive boat"
            />
          </div>
          <div className="act-content">
            <div className="section-label">Beneath the Surface</div>
            <h2 className="act-name">
              Scuba <em>Diving</em>
            </h2>
            <p className="act-desc">
              Discover the incredible sea life around Cade&apos;s Reef and
              Antigua&apos;s south coast with our experienced dive team. Whether
              you&apos;re a certified diver or a complete beginner, we offer
              guided experiences and PADI courses for all levels.
            </p>
            <div className="act-highlights">
              <div className="act-highlight">
                <span className="act-highlight-dot" />
                Guided reef dives
              </div>
              <div className="act-highlight">
                <span className="act-highlight-dot" />
                PADI certification available
              </div>
              <div className="act-highlight">
                <span className="act-highlight-dot" />
                Cade&apos;s Reef exploration
              </div>
              <div className="act-highlight">
                <span className="act-highlight-dot" />
                Full equipment provided
              </div>
            </div>
            <a href="#" className="act-link">
              Learn More <span className="arrow" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════ KIDS CAMP ═══════ */}
      <section className="act-section reveal" id="kids">
        <div className="act-inner">
          <div className="act-media">
            <img
              className="act-img-main"
              src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=900&q=80"
              alt="Beach family fun"
            />
            <img
              className="act-img-sm"
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80"
              alt="Kids beach"
            />
            <img
              className="act-img-sm"
              src="https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=500&q=80"
              alt="Playground activities"
            />
          </div>
          <div className="act-content">
            <div className="section-label">For the Family</div>
            <h2 className="act-name">
              Cee Bee <em>Kids Camp</em>
            </h2>
            <p className="act-desc">
              Turn family holidays into beloved annual traditions. Our dedicated
              kids camp offers supervised fun, creative activities, island
              adventures and tennis clinics &mdash; so your youngest guests are
              having the time of their lives while you relax.
            </p>
            <div className="act-highlights">
              <div className="act-highlight">
                <span className="act-highlight-dot" />
                Supervised activities
              </div>
              <div className="act-highlight">
                <span className="act-highlight-dot" />
                Creative camp sessions
              </div>
              <div className="act-highlight">
                <span className="act-highlight-dot" />
                Kids tennis clinics
              </div>
              <div className="act-highlight">
                <span className="act-highlight-dot" />
                Playground &amp; games
              </div>
            </div>
            <a href="#" className="act-link">
              Learn More <span className="arrow" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════ INCLUDED VS UPGRADE ═══════ */}
      <section className="included-section reveal">
        <div className="included-inner">
          <div className="included-col">
            <h2>
              Included in <em>your stay</em>
            </h2>
            <div className="sub-note">
              All complimentary with your room rate
            </div>
            <div className="included-list">
              <div className="included-item">
                <span className="check">&#10003;</span> Tennis courts, rackets
                &amp; balls
              </div>
              <div className="included-item">
                <span className="check">&#10003;</span> 75-foot lap swimming
                pool
              </div>
              <div className="included-item">
                <span className="check">&#10003;</span> Waterskiing with
                instruction
              </div>
              <div className="included-item">
                <span className="check">&#10003;</span> Hobie Cats &amp;
                Windsurfers
              </div>
              <div className="included-item">
                <span className="check">&#10003;</span> Kayaks &amp;
                paddle-boats
              </div>
              <div className="included-item">
                <span className="check">&#10003;</span> Snorkel gear &amp; reef
                trips
              </div>
              <div className="included-item">
                <span className="check">&#10003;</span> Beach chairs &amp;
                hammocks
              </div>
              <div className="included-item">
                <span className="check">&#10003;</span> Fully equipped fitness
                centre
              </div>
              <div className="included-item">
                <span className="check">&#10003;</span> Squash court &amp;
                equipment
              </div>
              <div className="included-item">
                <span className="check">&#10003;</span> Yoga, Pilates &amp;
                water aerobics
              </div>
              <div className="included-item">
                <span className="check">&#10003;</span> Bocce &amp; shuffleboard
              </div>
              <div className="included-item">
                <span className="check">&#10003;</span> Half basketball court
              </div>
              <div className="included-item">
                <span className="check">&#10003;</span> Pickleball
              </div>
              <div className="included-item">
                <span className="check">&#10003;</span> Cee Bee Kids Club
              </div>
              <div className="included-item">
                <span className="check">&#10003;</span> Creative camp &amp; kids
                tennis
              </div>
              <div className="included-item">
                <span className="check">&#10003;</span> Computer rooms
              </div>
            </div>
            <a href="#" className="schedule-link">
              View Sample Schedule &#8599;
            </a>
          </div>
          <div className="upgrade-col">
            <h2>
              Enhance <em>your stay</em>
            </h2>
            <div className="sub-note">Additional services available</div>
            <div className="upgrade-list">
              <div className="upgrade-item">
                <span className="plus">+</span> Spa &amp; beauty salon
                treatments
              </div>
              <div className="upgrade-item">
                <span className="plus">+</span> Private tennis &amp; squash
                lessons
              </div>
              <div className="upgrade-item">
                <span className="plus">+</span> Caribbean cooking classes
              </div>
              <div className="upgrade-item">
                <span className="plus">+</span> Wine appreciation classes
              </div>
              <div className="upgrade-item">
                <span className="plus">+</span> Tennis, spa &amp; gift shops
              </div>
              <div className="upgrade-item">
                <span className="plus">+</span> Off-property island excursions
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ TESTIMONIAL ═══════ */}
      <section className="testimonial reveal">
        <div className="testimonial-inner">
          <div className="testimonial-quote-mark">&ldquo;</div>
          <p className="testimonial-text">
            Looking for that one magical resort where the kids have fun and you
            actually get to relax? It exists &mdash; I found it in Antigua, a
            four-and-a-half-hour flight from New York.
          </p>
          <p className="testimonial-author">
            Kim-Marie Evans &mdash; Luxury Travel Mom
          </p>
        </div>
      </section>
    </>
  );
}
