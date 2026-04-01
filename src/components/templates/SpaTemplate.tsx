import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════════
   SpaTemplate — page-level template for The Spa page.

   Reproduces the exact HTML structure from:
     curtain-bluff-templates/curtain-bluff-spa.html
   (body content between nav and footer)
   ═══════════════════════════════════════════════════════════════════ */

interface SpaTemplateProps {
  sections: any[];
}

export default function SpaTemplate({ sections }: SpaTemplateProps) {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="sub-hero">
        <img
          className="sub-hero-img"
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1800&q=80"
          alt="The Spa at Curtain Bluff"
        />
        <div className="sub-hero-bg" />
        <div className="sub-hero-content">
          <div className="sub-hero-breadcrumb">
            <Link href="/">Home</Link> <span>&rarr;</span>{" "}
            <Link href="#">Wellness</Link> <span>&rarr;</span> The Spa
          </div>
          <h1 className="sub-hero-title">
            The <em>Spa</em>
          </h1>
          <p className="sub-hero-tagline">
            Close your eyes, inhale deeply, and sink into tranquility
          </p>
        </div>
      </section>

      {/* ═══ CENTERED INTRO TEXT ═══ */}
      <section className="about-intro reveal">
        <div className="section-label" style={{ justifyContent: "center" }}>
          THE SPA
        </div>
        <h2>
          Close Your Eyes, <em>Inhale Deeply</em>
        </h2>
        <p>
          Our tranquil full-service spa invites you to escape into a world of
          serenity. Set within lush tropical gardens with ocean breezes, every
          treatment is designed to restore, rejuvenate, and inspire.
        </p>
        <div className="spa-stats" style={{ justifyContent: "center" }}>
          <div>
            <div className="spa-stat-val">5,000</div>
            <div className="spa-stat-label">Sq. Ft.</div>
          </div>
          <div>
            <div className="spa-stat-val">4</div>
            <div className="spa-stat-label">Treatment Rooms</div>
          </div>
          <div>
            <div className="spa-stat-val">5</div>
            <div className="spa-stat-label">Island Views</div>
          </div>
        </div>
      </section>

      {/* ═══ INTRO EDITORIAL ═══ */}
      <section className="spa-intro reveal">
        <div className="spa-intro-media">
          <img
            src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=900&q=80"
            alt="Spa treatment room"
          />
        </div>
        <div className="spa-intro-content">
          <div className="section-label">The Sanctuary</div>
          <h2>
            Where the sea <em>heals</em>
          </h2>
          <p>
            Relaxing and intimate, our 5,000-square-foot spa sits apart from the
            rest of the resort, just feet from the sea. Its four treatment rooms
            boast spectacular views over the water to distant Montserrat, Cades
            Reef, St. Kitts, Nevis and Redonda.
          </p>
          <p>
            Before your treatment, unwind on the terrace sipping tea brewed from
            fresh herbs picked from the spa&apos;s own garden. Afterwards, allow
            your mind to wander and your body to decompress in our luxurious
            cliffside soaking tub with over-indulgent refreshments.
          </p>
          <div className="spa-stats">
            <div>
              <div className="spa-stat-val">5,000</div>
              <div className="spa-stat-label">Square Feet</div>
            </div>
            <div>
              <div className="spa-stat-val">4</div>
              <div className="spa-stat-label">Treatment Rooms</div>
            </div>
            <div>
              <div className="spa-stat-val">5</div>
              <div className="spa-stat-label">Island Views</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ THE EXPERIENCE ═══ */}
      <section className="experience-strip reveal">
        <div className="experience-inner">
          <div className="exp-step">
            <div className="exp-step-num">01</div>
            <h4>Arrive &amp; Unwind</h4>
            <p>
              Sip herbal tea on the terrace, brewed from the spa&apos;s own
              garden. Let the sound of waves set your pace.
            </p>
          </div>
          <div className="exp-step">
            <div className="exp-step-num">02</div>
            <h4>Your Treatment</h4>
            <p>
              Expert therapists deliver bespoke treatments in rooms overlooking
              the Caribbean towards five islands.
            </p>
          </div>
          <div className="exp-step">
            <div className="exp-step-num">03</div>
            <h4>Restore &amp; Linger</h4>
            <p>
              Decompress in the cliffside soaking tub with refreshments and let
              the views bring you back slowly.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ GALLERY ═══ */}
      <div className="spa-gallery reveal">
        <img
          className="sg-wide"
          src="https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=900&q=80"
          alt="Spa terrace"
        />
        <img
          src="https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=500&q=80"
          alt="Treatment detail"
        />
        <img
          src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=500&q=80"
          alt="Treatment room"
        />
        <img
          src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=500&q=80"
          alt="Spa products"
        />
        <img
          src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500&q=80"
          alt="Relaxation area"
        />
        <img
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&q=80"
          alt="Massage"
        />
      </div>

      {/* ═══ TREATMENTS ═══ */}
      <section className="treatments reveal">
        <div className="treatments-inner">
          <div className="treatments-heading">
            <div className="section-label">Menu</div>
            <h2>
              Spa <em>Treatments</em>
            </h2>
            <p>
              Every treatment is tailored to your needs by our expert therapists,
              using locally inspired techniques and premium products.
            </p>
          </div>
          <div>
            <div className="treatment-list">
              <div className="treatment-item">
                <span className="treatment-name">Swedish Massage</span>
                <span className="treatment-desc">Full body relaxation</span>
              </div>
              <div className="treatment-item">
                <span className="treatment-name">Deep Tissue Massage</span>
                <span className="treatment-desc">Targeted tension relief</span>
              </div>
              <div className="treatment-item">
                <span className="treatment-name">Shiatsu Massage</span>
                <span className="treatment-desc">Pressure point therapy</span>
              </div>
              <div className="treatment-item">
                <span className="treatment-name">Couples Massage</span>
                <span className="treatment-desc">Side-by-side serenity</span>
              </div>
              <div className="treatment-item">
                <span className="treatment-name">Specialty Massages</span>
                <span className="treatment-desc">
                  Hot stone, prenatal &amp; more
                </span>
              </div>
              <div className="treatment-item">
                <span className="treatment-name">Body Polishes</span>
                <span className="treatment-desc">
                  Exfoliation &amp; renewal
                </span>
              </div>
              <div className="treatment-item">
                <span className="treatment-name">
                  Herbal Aromatherapy Wraps
                </span>
                <span className="treatment-desc">Detox &amp; nourish</span>
              </div>
              <div className="treatment-item">
                <span className="treatment-name">Facials</span>
                <span className="treatment-desc">
                  Cleanse, hydrate &amp; glow
                </span>
              </div>
              <div className="treatment-item">
                <span className="treatment-name">Manicures &amp; Pedicures</span>
                <span className="treatment-desc">
                  Classic &amp; luxury options
                </span>
              </div>
              <div className="treatment-item">
                <span className="treatment-name">Waxing Services</span>
                <span className="treatment-desc">Full menu available</span>
              </div>
              <div className="treatment-item">
                <span className="treatment-name">Wellness &amp; Fitness</span>
                <span className="treatment-desc">Guided programmes</span>
              </div>
            </div>
            <div className="treatments-ctas">
              <a href="#" className="spa-btn primary">
                Reserve a Treatment
              </a>
              <a href="#" className="spa-btn">
                View Price List &nearr;
              </a>
              <a href="#" className="spa-btn">
                Download Brochure &nearr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="quote-section reveal">
        <div className="quote-inner">
          <div className="quote-mark">&ldquo;</div>
          <p className="quote-text">
            Softly lapping waves, outstanding treatments, real serenity. Time
            stops here in this extraordinary spa and you feel as if you are the
            most important person in the world.
          </p>
          <p className="quote-author">Patty Hoff &mdash; Ohio</p>
        </div>
      </section>

      {/* ═══ EXPLORE OTHER WELLNESS ═══ */}
      <section className="explore-other reveal">
        <div className="explore-other-header">
          <div className="section-label" style={{ justifyContent: "center" }}>
            More Wellness
          </div>
          <h2>
            Also <em>explore</em>
          </h2>
        </div>
        <div className="explore-grid">
          <a href="#" className="explore-card">
            <img
              src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&q=80"
              alt="Tennis"
            />
            <div className="explore-card-ov">
              <span>Championship Courts</span>
              <h3>Tennis</h3>
            </div>
          </a>
          <a href="#" className="explore-card">
            <img
              src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80"
              alt="Classes"
            />
            <div className="explore-card-ov">
              <span>Yoga, Pilates &amp; More</span>
              <h3>Classes</h3>
            </div>
          </a>
          <a href="#" className="explore-card">
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=600&q=80"
              alt="Wellness"
            />
            <div className="explore-card-ov">
              <span>Restore Balance</span>
              <h3>Wellness</h3>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}
