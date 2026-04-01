import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════════
   BentleysTemplate — page-level template for the Bentley Transfers
   page.

   Reproduces the exact HTML structure from:
     curtain-bluff-templates/curtain-bluff-bentleys.html
   (body content between nav and footer)
   ═══════════════════════════════════════════════════════════════════ */

interface BentleysTemplateProps {
  sections: any[];
}

export default function BentleysTemplate({
  sections,
}: BentleysTemplateProps) {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="bentley-hero">
        <img
          className="bentley-hero-img"
          src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/both-bentleys-1-picsart-aiimageenhancer.webp"
          alt="Curtain Bluff's two Bentleys awaiting guests at the resort entrance"
        />
        <div className="bentley-hero-content">
          <div className="bentley-hero-breadcrumb">
            <Link href="/">Home</Link> <span>&rarr;</span> Bentley Transfers
          </div>
          <h1 className="bentley-hero-title">
            Arrive in
            <br />
            <em>Unparalleled Elegance</em>
          </h1>
          <div className="bentley-divider" />
          <p className="bentley-hero-sub">
            Embrace the essence of timeless Caribbean sophistication with our
            exclusive Bentley airport transfers
          </p>
        </div>
      </section>

      {/* ═══ SHOWCASE IMAGES ═══ */}
      <div className="bentley-showcase reveal">
        <img
          src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/both-bentleys-1-picsart-aiimageenhancer.webp"
          alt="Exterior view of Curtain Bluff's Bentley fleet"
        />
        <img
          src="https://ztjed0qworgbvtt3.public.blob.vercel-storage.com/images/both-bentleys-1-picsart-aiimageenhancer.webp"
          alt="Handcrafted leather interior of the Curtain Bluff Bentley"
        />
      </div>

      {/* ═══ CONTENT + BOOKING CARD ═══ */}
      <section className="bentley-content reveal">
        <div className="bentley-content-inner">
          <div className="bentley-text">
            <div className="section-label-dark">The Experience</div>
            <h2>
              A journey as <em>memorable</em> as your stay
            </h2>
            <p>
              Our two impeccably maintained Bentleys are available to whisk you
              from the airport to our sanctuary of luxury, and back, in a journey
              as memorable as your stay.
            </p>
            <p>
              Indulge in the comfort of handcrafted leather interiors, the serene
              hush of a ride designed for royalty, and the attentive service that
              has made Curtain Bluff an enduring symbol of Caribbean tradition
              and charm.
            </p>
            <p>
              Whether arriving to begin your escape or departing with cherished
              memories, our Bentleys ensure your travels are steeped in
              refinement.
            </p>
          </div>
          <div className="booking-card">
            <h3>Reserve Your Transfer</h3>
            <div className="booking-row">
              <span className="booking-label">Round Trip</span>
              <span className="booking-val price">$300 USD</span>
            </div>
            <div className="booking-row">
              <span className="booking-label">Passengers</span>
              <span className="booking-val">2 maximum</span>
            </div>
            <div className="booking-row">
              <span className="booking-label">Deposit</span>
              <span className="booking-val">$100 USD</span>
            </div>
            <div className="booking-row">
              <span className="booking-label">Cancellation</span>
              <span className="booking-val">30 days prior</span>
            </div>
            <p className="booking-note">
              Available by advance reservation only. Availability is limited
              &mdash; we recommend securing your transfer well in advance.
            </p>
            <div className="booking-ctas">
              <a
                href="mailto:curtainbluff@curtainbluff.com"
                className="b-btn primary"
              >
                Reserve by Email
              </a>
              <a href="#" className="b-btn secondary">
                Pre-Arrival Form
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
