import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import gsap from 'gsap'
import './Projects.css'

const categories = ['All', 'Residential', 'Resort', 'Urban', 'Commercial']

const allProjects = [
  // Collection 1
  {
    id: 1,
    title: 'Villa 001 — Sloped Driveway Residence',
    category: 'Residential',
    location: 'Private Client',
    year: '2026',
    area: '7,200 sq.ft',
    image: '/images/project-villa-001-front.jpg',
    desc: 'A modern multi-level luxury residence meticulously adapted to sloping topography, featuring clean geometric volumes, black steel perimeter accents, cantilevered glass balconies, and sloped garage access.',
  },
  {
    id: 2,
    title: 'VS Villa — Biophilic Living Facade',
    category: 'Residential',
    location: 'Private Client',
    year: '2026',
    area: '8,500 sq.ft',
    image: '/images/project-vs-villa-facade.jpg',
    desc: 'An exceptional contemporary residence highlighted by a dramatic multi-story vertical living garden wall, transparent glass staircase tower, and warm natural timber soffits.',
  },
  {
    id: 3,
    title: 'Villa Jannat — Golden Hour Estate',
    category: 'Residential',
    location: 'Private Client',
    year: '2025',
    area: '10,400 sq.ft',
    image: '/images/hero-slide-7.jpg',
    desc: 'A majestic Mediterranean-inspired luxury villa featuring warm limestone facades, handcrafted timber pergolas, rhythmic arched windows, and lush golden-hour landscape lighting.',
  },
  {
    id: 4,
    title: 'Villa 001 — Cantilever Balcony Perspective',
    category: 'Urban',
    location: 'Private Client',
    year: '2026',
    area: '7,200 sq.ft',
    image: '/images/project-villa-001-perspective.jpg',
    desc: 'Bold architectural overhangs with floating corner glass balconies, textured sandstone walls, and architectural privacy screening designed for refined street presence.',
  },
  {
    id: 5,
    title: 'Modern Hillside Villa',
    category: 'Residential',
    location: 'Client Project',
    year: '2025',
    area: '5,500 sq.ft',
    image: '/images/project-client-1.jpg',
    desc: 'An exquisite modern residential project featuring elegant exterior design, geometric volumes, and harmonious landscaping.',
  },
  {
    id: 6,
    title: 'Urban Structural Residence',
    category: 'Urban',
    location: 'Client Project',
    year: '2024',
    area: '6,200 sq.ft',
    image: '/images/project-client-3.jpg',
    desc: 'A stunning urban residential project showcasing innovative facade engineering and structural elegance.',
  },
  {
    id: 7,
    title: 'Contemporary Estate Panorama',
    category: 'Residential',
    location: 'Private Client',
    year: '2025',
    area: '8,900 sq.ft',
    image: '/images/hero-slide-3.jpg',
    desc: 'Expansive modern estate with panoramic glass envelopes, integrated ambient lighting, and reflecting water gardens.',
  },
  {
    id: 8,
    title: 'Modern Minimalist Haven',
    category: 'Residential',
    location: 'Private Client',
    year: '2025',
    area: '6,800 sq.ft',
    image: '/images/project-modern-home.png',
    desc: 'Sleek minimalist architecture featuring clean white stucco, contrasting black metal frames, and seamless indoor-outdoor living flow.',
  },

  // Collection 2
  {
    id: 9,
    title: 'VS Villa — Stilt Lounge & Pool Pavilion',
    category: 'Resort',
    location: 'Private Client',
    year: '2026',
    area: '8,500 sq.ft',
    image: '/images/project-vs-villa-corner.jpg',
    desc: 'Expansive outdoor living featuring stilt parking pavilion, private lap pool, perimeter vertical planters, and continuous cantilevered balconies framed by lush tropical greenery.',
  },
  {
    id: 10,
    title: 'Villa 001 — Garden & Terrace Elevation',
    category: 'Residential',
    location: 'Private Client',
    year: '2026',
    area: '7,200 sq.ft',
    image: '/images/project-villa-001-rear.jpg',
    desc: 'Expansive sliding glass curtain walls, double-height light atriums, and seamless indoor-outdoor transitions overlooking manicured private lawn gardens.',
  },
  {
    id: 11,
    title: 'Pergola Family Terrace',
    category: 'Resort',
    location: 'Private Client',
    year: '2025',
    area: '4,800 sq.ft',
    image: '/images/hero-slide-6.jpg',
    desc: 'An elevated wooden pergola terrace designed for family gatherings, offering panoramic views over tropical canopy foliage and sunset skylines.',
  },
  {
    id: 12,
    title: 'Mediterranean Stone Arches & Corbel Estate',
    category: 'Residential',
    location: 'Private Client',
    year: '2025',
    area: '6,500 sq.ft',
    image: '/images/hero-slide-5.jpg',
    desc: 'Intricate architectural masonry detailing with arched double-height windows, carved timber corbels, lanterns, and wrought-iron Juliet balconies.',
  },
  {
    id: 13,
    title: 'Horizon Luxury Estate',
    category: 'Residential',
    location: 'Client Project',
    year: '2025',
    area: '9,200 sq.ft',
    image: '/images/project-client-2.jpg',
    desc: 'A magnificent luxury estate integrating natural stone veneers, dramatic double-height cantilevered terraces, and manicured courtyard gardens.',
  },
  {
    id: 14,
    title: 'Serene Forest Retreat',
    category: 'Residential',
    location: 'Client Project',
    year: '2024',
    area: '5,100 sq.ft',
    image: '/images/project-client-4.jpg',
    desc: 'Nestled among native trees, this retreat pairs warm cedar cladding with full-height floor-to-ceiling glass to dissolve boundaries with nature.',
  },
  {
    id: 15,
    title: 'Avant-Garde Commercial Pavilion',
    category: 'Commercial',
    location: 'Corporate HQ',
    year: '2025',
    area: '11,000 sq.ft',
    image: '/images/project-client-5.jpg',
    desc: 'A bold commercial pavilion featuring perforated metal solar fins, dynamic cantilevered meeting pods, and public plaza integration.',
  },
  {
    id: 16,
    title: 'Oasis Coastal Sanctuary',
    category: 'Resort',
    location: 'Private Island',
    year: '2024',
    area: '14,000 sq.ft',
    image: '/images/project-resort.png',
    desc: 'Tropical resort villa with infinity edge water features, open-air cabana structures, and sustainable oceanfront cooling architecture.',
  },
]

export default function Projects() {
  const pageRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [isPaused, setIsPaused] = useState(false)

  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return allProjects
    return allProjects.filter((p) => p.category === activeFilter)
  }, [activeFilter])

  // Partition filtered projects into two rows
  const { row1List, row2List } = useMemo(() => {
    const list = filteredProjects
    const half = Math.ceil(list.length / 2)
    let r1 = list.slice(0, half)
    let r2 = list.slice(half)

    if (r2.length === 0) {
      r2 = [...r1]
    }

    // Multiply items to guarantee infinite seamless loop across wide displays
    const repeatToMin = (arr, minCount = 8) => {
      if (arr.length === 0) return []
      let res = [...arr]
      while (res.length < minCount) {
        res = [...res, ...arr]
      }
      return res
    }

    const baseR1 = repeatToMin(r1, 8)
    const baseR2 = repeatToMin(r2, 8)

    // Triple the array for seamless keyframe translation (-33.333% loop)
    return {
      row1List: [...baseR1, ...baseR1, ...baseR1],
      row2List: [...baseR2, ...baseR2, ...baseR2],
    }
  }, [filteredProjects])

  // Featured project for "See Details" pill button
  const featuredProject = filteredProjects[0] || allProjects[0]

  // Keyboard navigation for modal
  const handleKeyDown = useCallback(
    (e) => {
      if (!selectedProject) return
      if (e.key === 'Escape') {
        setSelectedProject(null)
      } else if (e.key === 'ArrowRight') {
        const currIdx = filteredProjects.findIndex((p) => p.id === selectedProject.id)
        const nextIdx = (currIdx + 1) % filteredProjects.length
        setSelectedProject(filteredProjects[nextIdx])
      } else if (e.key === 'ArrowLeft') {
        const currIdx = filteredProjects.findIndex((p) => p.id === selectedProject.id)
        const prevIdx = (currIdx - 1 + filteredProjects.length) % filteredProjects.length
        setSelectedProject(filteredProjects[prevIdx])
      }
    },
    [selectedProject, filteredProjects]
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
    const currIdx = filteredProjects.findIndex((p) => p.id === selectedProject.id)
    if (direction === 'next') {
      const nextIdx = (currIdx + 1) % filteredProjects.length
      setSelectedProject(filteredProjects[nextIdx])
    } else {
      const prevIdx = (currIdx - 1 + filteredProjects.length) % filteredProjects.length
      setSelectedProject(filteredProjects[prevIdx])
    }
  }

  return (
    <div ref={pageRef} className="projects-page-wrapper">
      {/* ===== HEADER SECTION (Exact match to recording & screenshot) ===== */}
      <section className="projects-header-section" id="projects-header">
        <div className="container">
          <div className="projects-header__top">
            <div className="projects-header__left">
              <h1 className="projects-header__title">Our Work</h1>
              <p className="projects-header__desc">
                Explore our curated collection of architectural designs, luxury residences,
                and transformative exterior spaces crafted with precision and passion.
              </p>
            </div>

            <div className="projects-header__right">
              <button
                className="projects-see-details-btn hover-target"
                onClick={() => setSelectedProject(featuredProject)}
                aria-label="See Details"
              >
                <span>See Details</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="projects-filters-row">
            <div className="projects-filter-pills">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`projects-filter-pill ${activeFilter === cat ? 'projects-filter-pill--active' : ''}`}
                  onClick={() => setActiveFilter(cat)}
                  id={`filter-${cat.toLowerCase()}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="projects-count-pill">
              {filteredProjects.length} Selected Projects
            </div>
          </div>
        </div>
      </section>

      {/* ===== DUAL-ROW HORIZONTAL SLIDING GALLERY ===== */}
      <section className="projects-dual-marquee-section" id="projects-dual-gallery">
        {/* Row 1 — Moving Left */}
        <div className="gallery-ribbon-wrapper gallery-ribbon-wrapper--top">
          <div
            className={`gallery-ribbon-track gallery-ribbon-track--left ${
              isPaused ? 'gallery-ribbon-track--paused' : ''
            }`}
          >
            {row1List.map((project, idx) => (
              <div
                key={`r1-${project.id}-${idx}`}
                className="gallery-card hover-target"
                onClick={() => setSelectedProject(project)}
              >
                <div className="gallery-card__inner">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="gallery-card__image"
                    loading="lazy"
                  />
                  <div className="gallery-card__badge">{project.category}</div>
                  <div className="gallery-card__overlay">
                    <div className="gallery-card__content">
                      <span className="gallery-card__meta">
                        {project.location} • {project.year}
                      </span>
                      <h4 className="gallery-card__title">{project.title}</h4>
                      <span className="gallery-card__view-btn">
                        <span>View Project</span>
                        <span className="arrow">→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — Moving Right */}
        <div className="gallery-ribbon-wrapper gallery-ribbon-wrapper--bottom">
          <div
            className={`gallery-ribbon-track gallery-ribbon-track--right ${
              isPaused ? 'gallery-ribbon-track--paused' : ''
            }`}
          >
            {row2List.map((project, idx) => (
              <div
                key={`r2-${project.id}-${idx}`}
                className="gallery-card hover-target"
                onClick={() => setSelectedProject(project)}
              >
                <div className="gallery-card__inner">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="gallery-card__image"
                    loading="lazy"
                  />
                  <div className="gallery-card__badge">{project.category}</div>
                  <div className="gallery-card__overlay">
                    <div className="gallery-card__content">
                      <span className="gallery-card__meta">
                        {project.location} • {project.year}
                      </span>
                      <h4 className="gallery-card__title">{project.title}</h4>
                      <span className="gallery-card__view-btn">
                        <span>View Project</span>
                        <span className="arrow">→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Control Bar */}
        <div className="gallery-controls-bar">
          <div className="container gallery-controls-bar__inner">
            <button
              className="gallery-motion-toggle hover-target"
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? 'Play ribbon motion' : 'Pause ribbon motion'}
            >
              {isPaused ? (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>Play Motion</span>
                </>
              ) : (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                  <span>Pause Motion</span>
                </>
              )}
            </button>

            <div className="gallery-hint-text">
              <span className="hint-pulse"></span>
              <span>Hover any project to pause & explore • Click to expand in full HD</span>
            </div>
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

            {/* Modal Image Wrapper with HD View */}
            <div className="project-modal__image-wrapper">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="project-modal__image"
              />
              <div className="project-modal__nav-overlay">
                <button
                  className="modal-nav-btn modal-nav-btn--prev"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateModal('prev')
                  }}
                  aria-label="Previous project"
                >
                  ‹
                </button>
                <button
                  className="modal-nav-btn modal-nav-btn--next"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateModal('next')
                  }}
                  aria-label="Next project"
                >
                  ›
                </button>
              </div>
            </div>

            {/* Modal Details */}
            <div className="project-modal__details">
              <div className="project-modal__header-line">
                <span className="project-modal__badge">{selectedProject.category}</span>
                <span className="project-modal__counter">
                  {filteredProjects.findIndex((p) => p.id === selectedProject.id) + 1} /{' '}
                  {filteredProjects.length}
                </span>
              </div>

              <h2 className="project-modal__title">{selectedProject.title}</h2>
              <p className="project-modal__desc">{selectedProject.desc}</p>

              <div className="project-modal__meta">
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
