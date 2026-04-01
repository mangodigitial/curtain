import Link from 'next/link'

export default function DiningTemplate({ sections }: { sections: any[] }) {
  return (
    <>
      {/* ═══════ PAGE HERO ═══════ */}
      <section className="page-hero">
        <img className="page-hero-img" src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=80" alt="Dining at Curtain Bluff" />
        <div className="page-hero-bg" />
        <div className="page-hero-content">
          <div className="page-hero-breadcrumb">
            <Link href="/">Home</Link> <span>→</span> Dining &amp; Drinks
          </div>
          <h1 className="page-hero-title">Dining <em>&amp;</em><br /><em>Drinks</em></h1>
          <p className="page-hero-sub">Imaginative, diverse and simply delicious — the food is one of the biggest reasons loyal guests return year after year. Praised by Harper&apos;s Bazaar, Forbes and Gourmet Magazine.</p>
        </div>
      </section>

      {/* ═══════ ALL-INCLUSIVE STRIP ═══════ */}
      <div className="inclusive-strip">
        <div className="inclusive-strip-item">
          <div className="inclusive-icon">✦</div>
          <div className="inclusive-text"><strong>All Meals Included</strong>In your room rate</div>
        </div>
        <div className="inclusive-strip-item">
          <div className="inclusive-icon">◈</div>
          <div className="inclusive-text"><strong>À La Carte Service</strong>Reservations required</div>
        </div>
        <div className="inclusive-strip-item">
          <div className="inclusive-icon">◇</div>
          <div className="inclusive-text"><strong>Afternoon Tea</strong>In the library daily</div>
        </div>
        <div className="inclusive-strip-item">
          <div className="inclusive-icon">❖</div>
          <div className="inclusive-text"><strong>800+ Wine Labels</strong>Curated cellar</div>
        </div>
      </div>

      {/* ═══════ THE SEA GRAPE ═══════ */}
      <section className="restaurant reveal" id="seagrape">
        <div className="restaurant-inner">
          <div className="rest-gallery">
            <img className="rg-hero" src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=900&q=80" alt="Sea Grape exterior" />
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80" alt="Sea Grape food" />
            <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&q=80" alt="Sea Grape dish" />
          </div>
          <div className="rest-content">
            <div className="rest-number">01</div>
            <div className="section-label">On the Sand</div>
            <h2 className="rest-name">The <em>Sea Grape</em></h2>
            <p className="rest-vibe">Open-air beachside dining with Italian-Antiguan soul</p>
            <p className="rest-desc">At the far end of the bay beach, tickled by near-constant sea breezes, the Sea Grape serves an expansive daily lunch — including our legendary weekly beach barbecue with a steel-drum band. Evenings bring an inventive blend of Italian and Antiguan influences: yellowtail tuna carpaccio, beetroot gnocchi, and fresh-caught pan-seared wahoo filet. Bento box service is also available to your cabana or poolside from noon to 4 pm.</p>
            <div className="rest-meals">
              <div className="rest-meal">
                <div className="rest-meal-name">Lunch</div>
                <div className="rest-meal-time">Daily</div>
              </div>
              <div className="rest-meal">
                <div className="rest-meal-name">Dinner</div>
                <div className="rest-meal-time">Select evenings</div>
              </div>
              <div className="rest-meal">
                <div className="rest-meal-name">Bento Service</div>
                <div className="rest-meal-time">12 pm – 4 pm</div>
              </div>
            </div>
            <div className="rest-dress">
              <div className="rest-dress-label">Evening Dress Code</div>
              <p>Smart shorts and collared shirts for gentlemen. Denim shorts not permitted for ladies.</p>
            </div>
            <div className="rest-menus">
              <a href="#" className="rest-menu-link">Dinner Menu</a>
              <a href="#" className="rest-menu-link">Kids Menu</a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ THE TAMARIND ═══════ */}
      <section className="restaurant reveal" id="tamarind">
        <div className="restaurant-inner">
          <div className="rest-gallery">
            <img className="rg-hero" src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80" alt="Tamarind Restaurant" />
            <img src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&q=80" alt="Tamarind breakfast" />
            <img src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=500&q=80" alt="Tamarind dessert" />
          </div>
          <div className="rest-content">
            <div className="rest-number">02</div>
            <div className="section-label">Beneath the Tamarind Tree</div>
            <h2 className="rest-name">The <em>Tamarind</em></h2>
            <p className="rest-vibe">Candlelit five-course dinners and island breakfasts under ancient branches</p>
            <p className="rest-desc">Begin your day beneath the gentle sea breeze with banana pancakes, French toast, eggs benedict and traditional island dishes — all complemented by fresh juice, fruit and pastries from our in-house patisserie. Evenings unfold in candlelight with a rotating five-course menu of salads, locally caught fish, outstanding meats and a dessert selection so extensive it has its own menu. Afterwards, filter onto the terrace for dancing to live music and stargazing under the moonlight.</p>
            <div className="rest-meals">
              <div className="rest-meal">
                <div className="rest-meal-name">Breakfast</div>
                <div className="rest-meal-time">Daily</div>
              </div>
              <div className="rest-meal">
                <div className="rest-meal-name">Dinner</div>
                <div className="rest-meal-time">Nightly, 5 courses</div>
              </div>
              <div className="rest-meal">
                <div className="rest-meal-name">Live Music</div>
                <div className="rest-meal-time">After dinner</div>
              </div>
            </div>
            <div className="rest-dress">
              <div className="rest-dress-label">Evening Dress Code</div>
              <p>Slacks (no jeans), collared shirt and dress shoes for gentlemen. Denim shorts not permitted for ladies.</p>
            </div>
            <div className="rest-menus">
              <a href="#" className="rest-menu-link">Dinner Menu</a>
              <a href="#" className="rest-menu-link">Kids Menu</a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ WINE CELLAR ═══════ */}
      <section className="wine-section reveal" id="wine">
        <div className="wine-hero">
          <div className="wine-media">
            <img src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=900&q=80" alt="Wine Cellar" />
          </div>
          <div className="wine-content">
            <div className="section-label">The Cellar</div>
            <h2 className="wine-name">The <em>Wine Cellar</em></h2>
            <p className="wine-intro">Meticulously sourced from the world&apos;s finest vineyards by our dedicated sommelier team — an extraordinary collection that turns every dinner into an occasion.</p>
            <div className="wine-stats">
              <div>
                <div className="wine-stat-val">800+</div>
                <div className="wine-stat-label">Labels</div>
              </div>
              <div>
                <div className="wine-stat-val">25+</div>
                <div className="wine-stat-label">Years Curated</div>
              </div>
              <div>
                <div className="wine-stat-val">Weekly</div>
                <div className="wine-stat-label">Wine Tastings</div>
              </div>
            </div>
            <div className="wine-lists">
              <a href="#" className="wine-list-link">Champagne &amp; Rosé</a>
              <a href="#" className="wine-list-link">Sommelier&apos;s Picks</a>
              <a href="#" className="wine-list-link">French Reds</a>
              <a href="#" className="wine-list-link">Italian &amp; Spanish</a>
              <a href="#" className="wine-list-link">New World Reds</a>
              <a href="#" className="wine-list-link">White Wines</a>
              <a href="#" className="wine-list-link">Prestige Collection</a>
            </div>
          </div>
        </div>
        <div className="sommelier-band">
          <div className="sommelier-band-label">Meet the Sommeliers</div>
          <p>Led by <strong>Head Sommelier Glouster</strong>, whose 25-year tenure traces back to original wine training under late owner Howard Hulford, the team includes <strong>Auslando</strong>, a 9-year veteran and WSET certificate holder, <strong>Patrick</strong>, formerly head sommelier at Sandals Antigua, and <strong>Javid</strong>, whose two decades of experience and uncanny palate make him a true pillar of the cellar.</p>
        </div>
      </section>

      {/* ═══════ TESTIMONIAL ═══════ */}
      <section className="testimonial reveal">
        <div className="testimonial-inner">
          <div className="testimonial-quote-mark">&ldquo;</div>
          <p className="testimonial-text">Thank you Curtain Bluff for giving us one of the most memorable and magical weeks of our lives. We are already planning our next trip back.</p>
          <p className="testimonial-author">Jennifer B — Somers, New York</p>
        </div>
      </section>
    </>
  )
}
