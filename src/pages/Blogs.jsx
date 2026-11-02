import { useState, useMemo, useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Blogs.css'

const categories = ['All', 'Architectural Philosophy', 'Interior Narratives', 'Studio Notes', 'Materials & Craft']

const blogPosts = [
  {
    id: 'butterfly-effect-architecture',
    title: 'The Butterfly Effect in Architecture: How Small Decisions Transform Entire Homes',
    category: 'Architectural Philosophy',
    date: 'October 28, 2026',
    readTime: '6 min read',
    author: 'Ar. Shabeeb Cherkala & Ar. Farah Ansari',
    image: '/images/project-vs-villa-facade.jpg',
    featured: true,
    excerpt:
      'Farasha means butterfly in Arabic. In architecture, the smallest inflection—a 10-degree pivot in a cantilevered overhang, a shift in morning light, or an unlacquered brass joint—cascades into how an entire space breathes and feels.',
    content: [
      'When we founded Farasha Design Studio during a period when the world had pressed pause, one conversation returned continuously: what does it mean to create a space that genuinely moves people? We drew our name and emblem from the butterfly effect—the scientific premise that a seemingly minor perturbation in one system can ignite profound, far-reaching transformations.',
      'In luxury architecture, people often notice the grand gestures first: the floating fifty-foot cantilever, the monumental travertine portal, or the floor-to-ceiling glass wall framing an infinity pool. Yet the true essence of enduring architecture rarely lives solely in scale. It lives in the micro-decisions.',
      'Consider the threshold between an indoor gallery and an exterior courtyard. If the sill is recessed flush into the stone floor, the boundary between interior sanctuary and nature dissolves completely. Consider the placement of a clerestory slit window: tilt it five degrees towards the east, and winter mornings bathe the breakfast pavilion in warm golden light while shielding occupants from harsh summer midday glare.',
      'We often say we enjoy finding those delicate moments—and overthinking them until they feel effortless. When every detail is resolved with care, a building ceases to be a mere enclosure of concrete and steel. It becomes a sanctuary where life unfolds naturally.',
    ],
    quote: 'Architecture is not merely the construction of walls; it is the thoughtful choreography of light, shadow, and human emotion.',
  },
  {
    id: 'the-jharoka-house-revival',
    title: 'The Jharoka House: Reimagining Traditional Overhanging Portals for Contemporary Living',
    category: 'Interior Narratives',
    date: 'October 14, 2026',
    readTime: '5 min read',
    author: 'Ar. Farah Ansari',
    image: '/images/jharoka/jharoka-living-room.jpg',
    featured: false,
    excerpt:
      'The historical Jharoka is not mere ornamentation; it is an architectural climate lens. In our latest residential commission, we reinterpreted the cantilevered overhanging portal into a light-filtering private sanctuary.',
    content: [
      'Historically, the Jharoka served as a sheltered balcony projecting from building facades in classical Indian and Islamic architecture. It was designed to capture cool breezes, provide shaded sightlines to the courtyard below, and establish private observation points without exposing occupants to external scrutiny.',
      'In our contemporary residential work, we asked: what is the modern equivalent of this historic sanctuary? For The Jharoka House, we translated this timeless language into deep cantilevered glass bays framed in blackened bronze and warm teakwood louvers.',
      'Inside, the spatial layout responds with double-height volume transitions, fluted limestone wall paneling, and tailored furnishings that create intimate conversation pockets within monumental spaces. Rather than replicating antiquity, we captured its acoustic stillness and light filtration.',
      'By honoring regional architectural wisdom through modern materiality, we ground contemporary homes in authentic cultural resonance.',
    ],
    quote: 'Tradition is not the preservation of ashes, but the passing of fire into modern spatial forms.',
  },
  {
    id: 'tropical-modernism-goa',
    title: 'Designing for Stillness: Lessons in Coastal Tropical Modernism from Goa',
    category: 'Studio Notes',
    date: 'September 29, 2026',
    readTime: '7 min read',
    author: 'Ar. Shabeeb Cherkala',
    image: '/images/hero-slide-3.jpg',
    featured: false,
    excerpt:
      'Moving our studio practice into coastal Goa taught us how to design in active dialogue with torrential monsoons, salt-laden sea air, and intense equatorial sun—without surrendering clean geometric clarity.',
    content: [
      'Building in tropical coastal microclimates requires a humble surrender to nature. Air conditioning alone cannot solve architectural discomfort; genuine comfort must be engineered into the building’s passive thermal envelope.',
      'In our coastal villa commissions, we deploy deep roof overhangs extending up to 2.5 meters. These projections cast cooling shadows across external glass walls, preventing solar heat gain while permitting floor-to-ceiling sliding panels to stay open even during heavy tropical rain showers.',
      'We embrace local red laterite stone, indigenous timber, and permeable lime plasters that breathe with fluctuating humidity. Courtyards act as thermal chimneys, drawing cool air across shallow reflective water pools and venting warm air through high-level timber louvers.',
      'The result is a home that does not fight its environment, but dances in harmony with seasonal tides and sea breezes.',
    ],
    quote: 'A well-designed tropical home never forces you indoors; it makes the outdoors feel effortlessly welcoming.',
  },
  {
    id: 'light-as-a-building-material',
    title: 'Light as a Structural Material: Sculpting with Louvers, Shadows, and Sun Paths',
    category: 'Architectural Philosophy',
    date: 'September 12, 2026',
    readTime: '4 min read',
    author: 'Ar. Shabeeb Cherkala',
    image: '/images/philosophy-4.jpg',
    featured: false,
    excerpt:
      'Before pouring concrete or specifying glazing, we map the solar azimuth. Kinetic louvers and architectural reveals turn harsh midday heat into poetic geometric shadows across interior stone floors.',
    content: [
      'Louis Kahn famously observed that "the sun never knew how great it was until it struck the side of a building." At Farasha, we treat sunlight not as an ambient byproduct, but as a primary building material alongside concrete, stone, and steel.',
      'By analyzing the sun’s geometric trajectory across summer and winter solstices, we formulate facade envelopes that mutate throughout the day. In the morning, razor-sharp geometric shadows sweep across fluted limestone walls, creating an ever-changing mural.',
      'At midday, kinetic and fixed architectural louvers intercept the harshest thermal rays, reducing HVAC electrical loads by up to 35% while diffusing soft, glare-free luminescence into double-height living rooms.',
      'Light reveals texture, defines volume, and marks the passage of time—reminding occupants of their connection to the celestial rhythm.',
    ],
    quote: 'Light does not merely illuminate space; it sculpts its emotional soul.',
  },
  {
    id: 'bespoke-materiality-and-emotion',
    title: 'Smoked Oak, Raw Travertine, & Patinated Brass: Materials That Age With Dignity',
    category: 'Materials & Craft',
    date: 'August 24, 2026',
    readTime: '5 min read',
    author: 'Ar. Farah Ansari',
    image: '/images/jharoka/jharoka-home-bar.jpg',
    featured: false,
    excerpt:
      'We reject finishes that deteriorate after five years. Discover our studio’s philosophy on authentic tactility, unlacquered metals that develop a living patina, and stone that gains depth across decades.',
    content: [
      'In an era dominated by synthetic laminates and disposable trend cycles, luxury architecture must stand for permanence. We evaluate materials through a simple criterion: how will this surface feel in thirty years?',
      'Raw Italian travertine, honed granite, and open-pore smoked oak possess an inherent honesty. When touched, they communicate density, earth, and tectonic weight. They do not rely on high-gloss chemical topcoats that chip or peel.',
      'Similarly, we specify unlacquered raw brass and hand-cast bronze hardware throughout our residential commissions. As hands touch the door handles and cabinet pulls, the metal oxidizes uniquely in response to touch, recording the tactile story of the family that inhabits the home.',
      'When materials are permitted to age with grace, buildings become richer with each passing season.',
    ],
    quote: 'True luxury is the ability to age without losing dignity or grace.',
  },
  {
    id: 'turnkey-execution-reality',
    title: 'From Sketchbook to Turnkey: The Unseen Logistics Behind Architectural Precision',
    category: 'Studio Notes',
    date: 'August 05, 2026',
    readTime: '8 min read',
    author: 'Ar. Shabeeb Cherkala & Ar. Farah Ansari',
    image: '/images/project-villa-001-perspective.jpg',
    featured: false,
    excerpt:
      'Growing up around construction logistics and mining machinery taught us an invaluable lesson: a visionary sketch is only as good as the coordination on site. Here is how we bridge design with turnkey execution.',
    content: [
      'Many design practices celebrate the conceptual stage while detaching themselves from the gritty realities of construction. Because both of us grew up in families deeply embedded in construction and heavy earthmoving, we developed an instinctive respect for the job site.',
      'A two-millimeter tolerance in structural steel fabrication can make or break a seamless glass corner. A missed electrical conduit cast into a post-tensioned concrete slab can disrupt an entire lighting design.',
      'By offering comprehensive turnkey execution alongside architectural design, we maintain uncompromised oversight from the initial foundation pour to the installation of custom millwork and final art curation.',
      'Our clients experience the peace of mind that comes from knowing the architects who drew their dream home are the very ones standing on site ensuring its flawless realization.',
    ],
    quote: 'Poetry in design requires discipline in execution.',
  },
]

export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeArticle, setActiveArticle] = useState(null)
  const pageRef = useRef(null)

  // Filter posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
      const matchesSearch =
        searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  // Featured Hero Post
  const featuredPost = useMemo(() => {
    return blogPosts.find((p) => p.featured) || blogPosts[0]
  }, [])

  // Animate page elements on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.blogs-hero__badge', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      })
      gsap.from('.blogs-hero__title-line', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.15,
      })
      gsap.from('.blogs-hero__desc', {
        y: 25,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.3,
      })
      gsap.from('.blogs-featured__card', {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.45,
      })
      gsap.from('.blogs-controls', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.6,
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveArticle(null)
    }
    if (activeArticle) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeArticle])

  return (
    <div className="blogs-page" ref={pageRef} id="blogs-page">
      {/* ========================================================= */}
      {/* HERO SECTION                                             */}
      {/* ========================================================= */}
      <section className="blogs-hero section">
        <div className="blogs-hero__ambient-glow"></div>
        <div className="container">
          <div className="blogs-hero__header">
            <div className="blogs-hero__badge">
              <span className="badge-dot"></span>
              <span className="badge-text">STUDIO DISPATCHES & ESSAYS</span>
            </div>
            <h1 className="blogs-hero__title">
              <span className="blogs-hero__title-line">Architectural</span>
              <span className="blogs-hero__title-line blogs-hero__title-line--accent">
                Chronicles & Insights
              </span>
            </h1>
            <p className="blogs-hero__desc">
              Reflections on spatial poetry, sustainable tectonics, tropical coastal living,
              and the delicate micro-decisions that transform modern houses into enduring sanctuaries.
            </p>
          </div>

          {/* ========================================================= */}
          {/* FEATURED STORY HERO CARD                                  */}
          {/* ========================================================= */}
          <div className="blogs-featured__card" onClick={() => setActiveArticle(featuredPost)}>
            <div className="blogs-featured__image-box">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="blogs-featured__img"
                loading="eager"
              />
              <div className="blogs-featured__tag-badge">FEATURED ESSAY</div>
            </div>

            <div className="blogs-featured__content">
              <div className="blogs-card__meta">
                <span className="blogs-card__category">{featuredPost.category}</span>
                <span className="blogs-card__divider">•</span>
                <span className="blogs-card__date">{featuredPost.date}</span>
                <span className="blogs-card__divider">•</span>
                <span className="blogs-card__time">{featuredPost.readTime}</span>
              </div>

              <h2 className="blogs-featured__title">{featuredPost.title}</h2>
              <p className="blogs-featured__excerpt">{featuredPost.excerpt}</p>

              <div className="blogs-featured__footer">
                <div className="blogs-author">
                  <div className="blogs-author__avatar">FA</div>
                  <div className="blogs-author__info">
                    <span className="blogs-author__name">{featuredPost.author}</span>
                    <span className="blogs-author__role">Principal Architects, Farasha</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="blogs-read-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveArticle(featuredPost)
                  }}
                >
                  <span>Read Full Essay</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* CONTROLS (CATEGORIES & SEARCH)                            */}
      {/* ========================================================= */}
      <section className="blogs-controls section--flush-top">
        <div className="container">
          <div className="blogs-controls__bar">
            {/* Category Pills */}
            <div className="blogs-controls__categories" role="tablist">
              {categories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={selectedCategory === cat}
                  className={`blogs-category-pill ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="blogs-controls__search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Search essays, materials, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="blogs-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="blogs-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOG GRID SECTION                                         */}
      {/* ========================================================= */}
      <section className="blogs-grid-section">
        <div className="container">
          {filteredPosts.length === 0 ? (
            <div className="blogs-empty">
              <p className="blogs-empty__title">No articles match your criteria</p>
              <p className="blogs-empty__subtitle">Try resetting the category filter or searching for another term.</p>
              <button
                type="button"
                className="btn btn--outline"
                onClick={() => {
                  setSelectedCategory('All')
                  setSearchQuery('')
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="blogs-grid">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="blogs-card"
                  onClick={() => setActiveArticle(post)}
                >
                  <div className="blogs-card__media">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="blogs-card__img"
                      loading="lazy"
                    />
                    <span className="blogs-card__badge">{post.category}</span>
                  </div>

                  <div className="blogs-card__body">
                    <div className="blogs-card__meta">
                      <span className="blogs-card__date">{post.date}</span>
                      <span className="blogs-card__divider">•</span>
                      <span className="blogs-card__time">{post.readTime}</span>
                    </div>

                    <h3 className="blogs-card__title">{post.title}</h3>
                    <p className="blogs-card__excerpt">{post.excerpt}</p>

                    <div className="blogs-card__footer">
                      <span className="blogs-card__author-name">{post.author}</span>
                      <span className="blogs-card__arrow">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================= */}
      {/* STUDIO DISPATCH NEWSLETTER CTA                           */}
      {/* ========================================================= */}
      <section className="blogs-dispatch section">
        <div className="container">
          <div className="blogs-dispatch__box">
            <div className="blogs-dispatch__badge">FARASHA JOURNAL</div>
            <h2 className="blogs-dispatch__title">
              Subscribe to <em>Studio Dispatches</em>
            </h2>
            <p className="blogs-dispatch__desc">
              Receive quarterly essays on spatial philosophy, architectural project reveals,
              and private client monographs directly in your inbox. No spam. Only thoughtful design.
            </p>

            <form
              className="blogs-dispatch__form"
              onSubmit={(e) => {
                e.preventDefault()
                alert('Thank you for subscribing to Farasha Studio Dispatches.')
              }}
            >
              <input
                type="email"
                required
                placeholder="Enter your private email address"
                className="blogs-dispatch__input"
              />
              <button type="submit" className="btn btn--primary blogs-dispatch__submit">
                <span>Join Journal</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ARTICLE READER MODAL                                      */}
      {/* ========================================================= */}
      {activeArticle && (
        <div className="blogs-modal-backdrop" onClick={() => setActiveArticle(null)}>
          <div
            className="blogs-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              className="blogs-modal__close"
              onClick={() => setActiveArticle(null)}
              aria-label="Close article"
            >
              ✕
            </button>

            <div className="blogs-modal__hero-image">
              <img src={activeArticle.image} alt={activeArticle.title} />
              <div className="blogs-modal__image-overlay"></div>
              <div className="blogs-modal__category-tag">{activeArticle.category}</div>
            </div>

            <div className="blogs-modal__content">
              <div className="blogs-modal__meta">
                <span>{activeArticle.date}</span>
                <span className="dot">•</span>
                <span>{activeArticle.readTime}</span>
                <span className="dot">•</span>
                <span>By {activeArticle.author}</span>
              </div>

              <h2 className="blogs-modal__title">{activeArticle.title}</h2>

              {activeArticle.quote && (
                <blockquote className="blogs-modal__quote">
                  <p>"{activeArticle.quote}"</p>
                  <cite>— Farasha Design Studio</cite>
                </blockquote>
              )}

              <div className="blogs-modal__body">
                {activeArticle.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="blogs-modal__author-card">
                <div className="author-card__avatar">FD</div>
                <div className="author-card__text">
                  <h4>Farasha Design Studio</h4>
                  <p>
                    Led by Ar. Shabeeb Cherkala & Ar. Farah Ansari. Shaping poetic exterior architecture,
                    curated interior sanctuaries, and climate-conscious luxury residences.
                  </p>
                </div>
              </div>

              <div className="blogs-modal__footer">
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={() => setActiveArticle(null)}
                >
                  Close Essay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
