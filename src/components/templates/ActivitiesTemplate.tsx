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
          src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/pt-water-sports-bg.webp"
          alt="Water sports on the beach at Curtain Bluff resort"
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
              src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/activities-7.webp"
              alt="Waterskiing on Morris Bay at Curtain Bluff"
            />
            <img
              className="act-img-sm"
              src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/activities-8.webp"
              alt="Kayaking along the coast at Curtain Bluff"
            />
            <img
              className="act-img-sm"
              src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/activities-9.webp"
              alt="Paddleboarding in calm waters at Curtain Bluff"
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
            <Link href="/water-sports" className="act-link">
              Learn More <span className="arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ GROUND SPORTS ═══════ */}
      <section className="act-section reveal" id="ground">
        <div className="act-inner">
          <div className="act-media">
            <img
              className="act-img-main"
              src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/25-tennis-at-curtain-bluff.webp"
              alt="Championship tennis courts at Curtain Bluff"
            />
            <img
              className="act-img-sm"
              src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/curtain-bluff-tennis-class.webp"
              alt="Tennis class in progress at Curtain Bluff"
            />
            <img
              className="act-img-sm"
              src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/pt-tennis-bg.webp"
              alt="Tennis at Curtain Bluff with ocean views"
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
            <Link href="/ground-sports" className="act-link">
              Learn More <span className="arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ SCUBA DIVING ═══════ */}
      <section className="act-section reveal" id="scuba">
        <div className="act-inner">
          <div className="act-media">
            <img
              className="act-img-main"
              src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/activities-8.webp"
              alt="Scuba diving at Cade's Reef near Curtain Bluff"
            />
            <img
              className="act-img-sm"
              src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/activities-10.webp"
              alt="Underwater coral and marine life at Cade's Reef"
            />
            <img
              className="act-img-sm"
              src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/activities-5.webp"
              alt="Dive boat departing from Curtain Bluff beach"
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
            <Link href="/scuba-diving" className="act-link">
              Learn More <span className="arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ KIDS CAMP ═══════ */}
      <section className="act-section reveal" id="kids">
        <div className="act-inner">
          <div className="act-media">
            <img
              className="act-img-main"
              src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/activities-3.webp"
              alt="Families enjoying the beach at Curtain Bluff Kids Camp"
            />
            <img
              className="act-img-sm"
              src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/activities-4.webp"
              alt="Children playing on the calm-water beach at Curtain Bluff"
            />
            <img
              className="act-img-sm"
              src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/activities-5.webp"
              alt="Kids camp playground activities at Curtain Bluff"
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
            <Link href="/cee-bee-kids-camp" className="act-link">
              Learn More <span className="arrow" />
            </Link>
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
