import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import './Projects.css'

// ==========================================
// CLIENT'S 11 OFFICIAL STUDIO PROJECTS
// ==========================================
const allProjects = [
  // ------------------------------------------
  // ARCHITECTURE (4 Projects)
  // ------------------------------------------
  {
    id: 1,
    title: 'Zahida Residence',
    category: 'Architecture',
    subCategory: 'Residential',
    tagline: 'Exploring scale, cantilevered geometry, and sloping topography in an iconic hillside sanctuary',
    location: 'Private Client',
    year: '2026',
    area: '7,200 sq.ft',
    showcaseImages: [
      '/images/project-villa-001-front.jpg',
      '/images/project-villa-001-perspective.jpg'
    ],
    galleryImages: [
      '/images/project-villa-001-front.jpg',
      '/images/project-villa-001-perspective.jpg',
      '/images/project-villa-001-rear.jpg',
      '/images/hero-villa.png'
    ],
    desc: 'A modern multi-level luxury residence meticulously adapted to sloping topography, featuring clean geometric volumes, black steel perimeter accents, cantilevered glass balconies, and private garage access.',
  },
  {
    id: 2,
    title: 'Ameen Residence',
    category: 'Architecture',
    subCategory: 'Residential',
    tagline: 'A serene luxury residence designed for natural light, living biophilic facades, and calm connection',
    location: 'Private Client',
    year: '2026',
    area: '8,500 sq.ft',
    showcaseImages: [
      '/images/project-vs-villa-facade.jpg',
      '/images/project-vs-villa-corner.jpg'
    ],
    galleryImages: [
      '/images/project-vs-villa-facade.jpg',
      '/images/project-vs-villa-corner.jpg',
      '/images/project-client-1.jpg',
      '/images/hero-slide-2.jpg'
    ],
    desc: 'An exceptional contemporary residence highlighted by a dramatic multi-story vertical living garden wall, transparent glass staircase tower, and warm natural timber soffits.',
  },
  {
    id: 3,
    title: 'Dhulapkar House',
    category: 'Architecture',
    subCategory: 'Residential',
    tagline: 'Warm limestone architecture, handcrafted timber pergolas, and golden-hour estate serenity',
    location: 'Private Client',
    year: '2025',
    area: '10,400 sq.ft',
    showcaseImages: [
      '/images/hero-slide-7.jpg',
      '/images/hero-slide-3.jpg'
    ],
    galleryImages: [
      '/images/hero-slide-7.jpg',
      '/images/hero-slide-3.jpg',
      '/images/hero-slide-5.jpg',
      '/images/project-hillside.png'
    ],
    desc: 'A majestic architectural estate featuring warm limestone facades, handcrafted timber pergolas, rhythmic arched openings, and lush landscape integration.',
  },
  {
    id: 4,
    title: 'Ahvisha Residence',
    category: 'Architecture',
    subCategory: 'Residential',
    tagline: 'Refined geometric volumes, floor-to-ceiling glass envelopes, and harmonious mountain terrace integration',
    location: 'Private Client',
    year: '2025',
    area: '6,800 sq.ft',
    showcaseImages: [
      '/images/project-modern-home.png',
      '/images/hero-slide-1.jpg'
    ],
    galleryImages: [
      '/images/project-modern-home.png',
      '/images/hero-slide-1.jpg',
      '/images/project-urban.png',
      '/images/hero-slide-4.jpg'
    ],
    desc: 'A sculptural modern sanctuary defined by monolithic cantilevered roofs, continuous travertine terraces, and seamless indoor-outdoor transitions.',
  },

  // ------------------------------------------
  // INTERIOR & COMMERCIAL (7 Projects)
  // ------------------------------------------
  {
    id: 5,
    title: 'Courtyard 37 Bar',
    category: 'Interior',
    subCategory: 'Commercial',
    tagline: 'Intimate atmospheric lounge craft with handcrafted brass joinery, fluted walnut, and mood lighting',
    location: 'Courtyard 37',
    year: '2026',
    area: '2,800 sq.ft',
    showcaseImages: [
      '/images/jharoka/jharoka-home-bar.jpg',
      '/images/jharoka/jharoka-dining.jpg'
    ],
    galleryImages: [
      '/images/jharoka/jharoka-home-bar.jpg',
      '/images/jharoka/jharoka-dining.jpg',
      '/images/jharoka/jharoka-tv-lounge.jpg'
    ],
    desc: 'A bespoke hospitality bar concept blending dramatic stone counter faces, unlacquered bronze display niches, custom leather stools, and low ambient illumination.',
  },
  {
    id: 6,
    title: 'Courtyard 37 Fine Dining',
    category: 'Interior',
    subCategory: 'Commercial',
    tagline: 'Reimagining grand heritage arches and artisanal masonry for a new era of culinary hospitality',
    location: 'Courtyard 37',
    year: '2026',
    area: '4,500 sq.ft',
    showcaseImages: [
      '/images/project-client-2.jpg',
      '/images/jharoka/jharoka-kitchen.jpg'
    ],
    galleryImages: [
      '/images/project-client-2.jpg',
      '/images/jharoka/jharoka-kitchen.jpg',
      '/images/jharoka/jharoka-foyer.jpg',
      '/images/project-client-5.jpg'
    ],
    desc: 'An exquisite culinary hospitality environment framed by sculpted portal arches, double-height acoustic ceilings, tactile plaster, and private dining alcoves.',
  },
  {
    id: 7,
    title: 'Vision Hotel Apartments',
    category: 'Interior',
    subCategory: 'Commercial',
    tagline: 'Refined serviced suites balancing boutique residential warmth with master-level hospitality detailing',
    location: 'Vision Tower',
    year: '2026',
    area: '16,000 sq.ft',
    showcaseImages: [
      '/images/jharoka/jharoka-foyer.jpg',
      '/images/project-resort.png'
    ],
    galleryImages: [
      '/images/jharoka/jharoka-foyer.jpg',
      '/images/project-resort.png',
      '/images/project-waterfront.png',
      '/images/jharoka/jharoka-guest-suite.jpg'
    ],
    desc: 'Luxury hotel apartment suites offering expansive double-height foyers, inlaid stone surfaces, custom millwork suites, and private balcony vistas.',
  },
  {
    id: 8,
    title: 'Vision Penthouse',
    category: 'Interior',
    subCategory: 'Residential',
    tagline: 'A tranquil private sanctuary blending soft limewash plaster with an arched Moroccan spa ensuite',
    location: 'Vision Tower',
    year: '2026',
    area: '3,800 sq.ft',
    showcaseImages: [
      '/images/jharoka/jharoka-master-bedroom.jpg',
      '/images/jharoka/jharoka-master-washroom.jpg'
    ],
    galleryImages: [
      '/images/jharoka/jharoka-master-bedroom.jpg',
      '/images/jharoka/jharoka-master-washroom.jpg',
      '/images/jharoka/jharoka-wifes-room.jpg',
      '/images/jharoka/jharoka-wifes-washroom.jpg'
    ],
    desc: 'Crown penthouse suite featuring bespoke velvet arched headboards, Calacatta marble dual vanity, fluted glass partitions, and a freestanding oval soaking tub.',
  },
  {
    id: 9,
    title: 'Rooftop Lounge',
    category: 'Interior',
    subCategory: 'Commercial',
    tagline: 'An open-air hospitality terrace designed for panoramic twilight gatherings and skyline breezes',
    location: 'Commercial Boulevard',
    year: '2025',
    area: '5,200 sq.ft',
    showcaseImages: [
      '/images/hero-slide-6.jpg',
      '/images/hero-slide-5.jpg'
    ],
    galleryImages: [
      '/images/hero-slide-6.jpg',
      '/images/hero-slide-5.jpg',
      '/images/hero-slide-4.jpg'
    ],
    desc: 'An elevated twilight social terrace featuring timber pergola canopies, outdoor lounge seating, ambient fire pits, and uninterrupted urban horizon views.',
  },
  {
    id: 10,
    title: 'Bagkiya',
    category: 'Interior',
    subCategory: 'Residential',
    tagline: 'A peaceful residential haven crafted with bespoke cane millwork, light linen, and courtyard views',
    location: 'Private Client',
    year: '2026',
    area: '4,200 sq.ft',
    showcaseImages: [
      '/images/jharoka/jharoka-guest-suite.jpg',
      '/images/jharoka/jharoka-daughters-bedroom.jpg'
    ],
    galleryImages: [
      '/images/jharoka/jharoka-guest-suite.jpg',
      '/images/jharoka/jharoka-daughters-bedroom.jpg',
      '/images/jharoka/jharoka-daughters-washroom.jpg',
      '/images/jharoka/jharoka-guest-bedroom-2.jpg'
    ],
    desc: 'Thoughtfully appointed private family residence incorporating soft architectural wall niches, woven cane details, tactile linen wall-coverings, and lush garden terraces.',
  },
  {
    id: 11,
    title: "John's Gym",
    category: 'Interior',
    subCategory: 'Commercial',
    tagline: 'High-performance wellness architecture integrating acoustic timber slats, ambient bronze, and fitness zones',
    location: 'Commercial Plaza',
    year: '2026',
    area: '3,500 sq.ft',
    showcaseImages: [
      '/images/jharoka/jharoka-gymnasium.jpg',
      '/images/project-client-4.jpg'
    ],
    galleryImages: [
      '/images/jharoka/jharoka-gymnasium.jpg',
      '/images/project-client-4.jpg',
      '/images/project-commercial.png'
    ],
    desc: 'A state-of-the-art private training and wellness club featuring sound-dampening vertical timber battens, indirect ambient ceiling light coves, and premium ergonomic fitness zones.',
  }
]

// ==========================================
// IMAGE CAROUSEL WITH FIXED WINDOW REVEAL & DOTS
// (Signature Essajees Atelier Architectural Effect)
// ==========================================
function ProjectImageCarousel({ images, title, onOpenModal, isFirst = false }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const frameRef = useRef(null)
  const trackRef = useRef(null)
  const touchStartXRef = useRef(null)
  const touchStartYRef = useRef(null)

  // Synchronize the parallax background image with viewport scroll
  const updateFixedPosition = useCallback(() => {
    if (!frameRef.current || !trackRef.current) return
    const rect = frameRef.current.getBoundingClientRect()
    const vh = window.innerHeight || document.documentElement.clientHeight
    // Only perform calculations when frame is near or inside viewport
    if (rect.bottom >= -80 && rect.top <= vh + 80) {
      // Relative vertical progress from -1 (top of screen) to +1 (bottom of screen)
      const centerY = rect.top + rect.height / 2
      const progress = (centerY - vh / 2) / (vh / 2)
      // Smooth subtle luxury parallax travel (-7.5% to +7.5%)
      const yOffset = Math.max(-7.5, Math.min(7.5, progress * 7))
      trackRef.current.style.transform = `translate3d(0, ${yOffset}%, 0)`
    }
  }, [])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateFixedPosition()
          ticking = false
        })
        ticking = true
      }
    }

    updateFixedPosition()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateFixedPosition)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateFixedPosition)
    }
  }, [updateFixedPosition])

  const handlePrev = (e) => {
    e.stopPropagation()
    setActiveIdx((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleNext = (e) => {
    e.stopPropagation()
    setActiveIdx((prev) => (prev + 1) % images.length)
  }

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX
    touchStartYRef.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return
    const diffX = touchStartXRef.current - e.changedTouches[0].clientX
    const diffY = touchStartYRef.current - e.changedTouches[0].clientY
    // Only navigate slides if gesture is predominantly horizontal
    if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        setActiveIdx((prev) => (prev + 1) % images.length)
      } else {
        setActiveIdx((prev) => (prev - 1 + images.length) % images.length)
      }
    }
    touchStartXRef.current = null
    touchStartYRef.current = null
  }

  return (
    <div className="project-carousel-container">
      <div 
        ref={frameRef}
        className="project-carousel-frame" 
        onClick={onOpenModal}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Fixed background viewport window (clips with 20px radius) */}
        <div className="project-fixed-window">
          <div ref={trackRef} className="project-fixed-track">
            <img
              key={activeIdx}
              src={images[activeIdx]}
              alt={`${title} - view ${activeIdx + 1}`}
              className="project-carousel-image project-carousel-image--fade"
              loading={isFirst ? "eager" : "lazy"}
            />
          </div>
        </div>

        {/* Subtle navigation chevrons for desktop hover */}
        {images.length > 1 && (
          <div className="project-carousel-nav">
            <button
              type="button"
              className="carousel-arrow carousel-arrow--prev"
              onClick={handlePrev}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              className="carousel-arrow carousel-arrow--next"
              onClick={handleNext}
              aria-label="Next image"
            >
              ›
            </button>
          </div>
        )}
      </div>

      {/* Pagination Dots (Gold active dot, grey inactive dot matching video) */}
      {images.length > 1 && (
        <div className="project-carousel-dots" role="tablist">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`project-dot ${i === activeIdx ? 'project-dot--active' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                setActiveIdx(i)
              }}
              aria-label={`Go to slide ${i + 1}`}
              role="tab"
              aria-selected={i === activeIdx}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ==========================================
// MAIN PROJECTS PAGE COMPONENT
// ==========================================
export default function Projects() {
  const pageRef = useRef(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [modalImageIdx, setModalImageIdx] = useState(0)

  // Open modal handler
  const handleOpenModal = (project, imgIndex = 0) => {
    setSelectedProject(project)
    setModalImageIdx(imgIndex)
  }

  // Keyboard navigation for modal
  const handleKeyDown = useCallback(
    (e) => {
      if (!selectedProject) return
      const images = selectedProject.galleryImages || selectedProject.showcaseImages
      if (e.key === 'Escape') {
        setSelectedProject(null)
      } else if (e.key === 'ArrowRight') {
        setModalImageIdx((prev) => (prev + 1) % images.length)
      } else if (e.key === 'ArrowLeft') {
        setModalImageIdx((prev) => (prev - 1 + images.length) % images.length)
      }
    },
    [selectedProject]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-header__title, .projects-header__desc', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  const navigateModal = (direction) => {
    if (!selectedProject) return
    const images = selectedProject.galleryImages || selectedProject.showcaseImages
    if (direction === 'next') {
      setModalImageIdx((prev) => (prev + 1) % images.length)
    } else {
      setModalImageIdx((prev) => (prev - 1 + images.length) % images.length)
    }
  }

  return (
    <div ref={pageRef} className="projects-page-wrapper">
      {/* ===== HEADER SECTION ===== */}
      <section className="projects-header-section" id="projects-header">
        <div className="container">
          <div className="projects-header__top">
            <div className="projects-header__left">
              <span className="projects-header__kicker">PORTFOLIO // ATELIER</span>
              <h1 className="projects-header__title">Our Work</h1>
              <p className="projects-header__desc">
                Explore our curated collection of architectural designs, luxury residences,
                and transformative commercial spaces crafted with precision, proportion, and quiet elegance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SHOWCASE FEED (Alternating 2-Column Desktop, Stacked Mobile) ===== */}
      <section className="projects-showcase-section" id="projects-showcase-feed">
        <div className="container projects-showcase-container">
          {allProjects.map((project, idx) => {
            const isAlt = idx % 2 === 1
            const extraCount = (project.galleryImages?.length || 0) - project.showcaseImages.length
            return (
              <article 
                key={project.id} 
                className={`project-showcase-row ${isAlt ? 'project-showcase-row--alt' : ''}`}
              >
                {/* Image Carousel Column */}
                <div className="project-showcase-carousel-wrap">
                  <ProjectImageCarousel
                    images={project.showcaseImages}
                    title={project.title}
                    onOpenModal={() => handleOpenModal(project, 0)}
                    isFirst={idx === 0}
                  />
                </div>

                {/* Text Content Column */}
                <div className="project-showcase-content">
                  <div className="project-showcase-meta">
                    <span className="project-meta-kicker">{project.category}</span>
                    {project.subCategory && (
                      <>
                        <span className="project-meta-sep">•</span>
                        <span className="project-meta-sub">{project.subCategory}</span>
                      </>
                    )}
                    <span className="project-meta-sep">•</span>
                    <span className="project-meta-area">{project.area}</span>
                  </div>

                  <h2 className="project-showcase-tagline">
                    {project.tagline}
                  </h2>

                  <p className="project-showcase-title">
                    {project.title}
                  </p>

                  <div className="project-showcase-actions">
                    <button
                      type="button"
                      className="project-explore-btn"
                      onClick={() => handleOpenModal(project, 0)}
                      aria-label={`Explore ${project.title}`}
                    >
                      <span>EXPLORE PROJECT</span>
                    </button>

                    {extraCount > 0 && (
                      <button
                        type="button"
                        className="project-gallery-badge-btn"
                        onClick={() => handleOpenModal(project, 0)}
                        aria-label={`View full gallery for ${project.title}`}
                      >
                        <span>+{extraCount} More in Gallery</span>
                        <span className="gallery-badge-arrow">→</span>
                      </button>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* ===== COMPREHENSIVE PROJECT GALLERY SECTION ===== */}
      <section className="projects-gallery-section" id="studio-gallery">
        <div className="container">
          <div className="projects-gallery-header">
            <span className="projects-header__kicker">STUDIO ARCHIVES</span>
            <h2 className="projects-gallery__title">Project Gallery</h2>
            <p className="projects-gallery__desc">
              Additional perspectives, detail captures, material tectonics, and interior vignettes from across our portfolio.
            </p>
          </div>

          <div className="projects-gallery-grid">
            {allProjects.flatMap((p) => 
              (p.galleryImages || []).slice(2).map((img, i) => ({
                img,
                project: p,
                uniqueKey: `${p.id}-extra-${i}`
              }))
            ).map((item, idx) => (
              <div 
                key={item.uniqueKey} 
                className="gallery-grid-item"
                onClick={() => handleOpenModal(item.project, 2 + (idx % 2))}
              >
                <img 
                  src={item.img} 
                  alt={item.project.title} 
                  className="gallery-grid-img" 
                  loading="lazy" 
                />
                <div className="gallery-grid-overlay">
                  <span className="gallery-grid-cat">{item.project.category}</span>
                  <h4 className="gallery-grid-title">{item.project.title}</h4>
                  <span className="gallery-grid-link">Explore Gallery →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HD PROJECT MODAL ===== */}
      {selectedProject && (
        <div className="project-modal" onClick={() => setSelectedProject(null)}>
          <div className="project-modal__content" onClick={(e) => e.stopPropagation()}>
            {/* Modal Close Button */}
            <button
              className="project-modal__close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Modal Image Wrapper with HD View & Multi-Image Gallery */}
            <div className="project-modal__image-wrapper">
              <img
                src={(selectedProject.galleryImages || selectedProject.showcaseImages)[modalImageIdx] || selectedProject.showcaseImages[0]}
                alt={selectedProject.title}
                className="project-modal__image"
              />

              {/* Prev / Next controls */}
              <div className="project-modal__nav-overlay">
                <button
                  className="modal-nav-btn modal-nav-btn--prev"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateModal('prev')
                  }}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  className="modal-nav-btn modal-nav-btn--next"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateModal('next')
                  }}
                  aria-label="Next image"
                >
                  ›
                </button>
              </div>

              {/* In-Modal Image Thumbnails showing all gallery images */}
              <div className="project-modal__thumbs">
                {(selectedProject.galleryImages || selectedProject.showcaseImages).map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`modal-thumb-btn ${i === modalImageIdx ? 'modal-thumb-btn--active' : ''}`}
                    onClick={() => setModalImageIdx(i)}
                    aria-label={`View photo ${i + 1}`}
                  >
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Details */}
            <div className="project-modal__details">
              <div className="project-modal__header-line">
                <span className="project-modal__badge">
                  {selectedProject.category} {selectedProject.subCategory ? `• ${selectedProject.subCategory}` : ''}
                </span>
                <span className="project-modal__counter">
                  Photo {modalImageIdx + 1} of {(selectedProject.galleryImages || selectedProject.showcaseImages).length}
                </span>
              </div>

              <h2 className="project-modal__title">{selectedProject.title}</h2>
              <p className="project-modal__tagline-lead">{selectedProject.tagline}</p>
              <p className="project-modal__desc">{selectedProject.desc}</p>

              <div className="project-modal__meta">
                <div className="project-modal__meta-item">
                  <span className="project-modal__meta-label">Category</span>
                  <span className="project-modal__meta-value">{selectedProject.category}</span>
                </div>
                <div className="project-modal__meta-item">
                  <span className="project-modal__meta-label">Location</span>
                  <span className="project-modal__meta-value">{selectedProject.location}</span>
                </div>
                <div className="project-modal__meta-item">
                  <span className="project-modal__meta-label">Year</span>
                  <span className="project-modal__meta-value">{selectedProject.year}</span>
                </div>
                <div className="project-modal__meta-item">
                  <span className="project-modal__meta-label">Area</span>
                  <span className="project-modal__meta-value">{selectedProject.area}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
