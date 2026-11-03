import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import gsap from 'gsap'
import './Projects.css'

const categories = ['All', 'Featured', 'Residential', 'Hospitality', 'Retail', 'Workplace', 'Interiors']

const allProjects = [
  // Residential, Hospitality, Retail, Workplace
  {
    id: 1,
    title: 'Villa 001 — Sloped Driveway Residence',
    category: 'Residential',
    featured: true,
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
    featured: true,
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
    featured: true,
    location: 'Private Client',
    year: '2025',
    area: '10,400 sq.ft',
    image: '/images/hero-slide-7.jpg',
    desc: 'A majestic Mediterranean-inspired luxury villa featuring warm limestone facades, handcrafted timber pergolas, rhythmic arched windows, and lush golden-hour landscape lighting.',
  },
  {
    id: 4,
    title: 'Farasha Creative Atelier',
    category: 'Workplace',
    featured: false,
    location: 'Studio HQ',
    year: '2026',
    area: '7,200 sq.ft',
    image: '/images/project-villa-001-perspective.jpg',
    desc: 'Bold architectural overhangs with floating corner glass balconies, textured sandstone walls, and architectural privacy screening designed for modern collaborative studio practice.',
  },
  {
    id: 5,
    title: 'Modern Hillside Villa',
    category: 'Residential',
    featured: true,
    location: 'Client Project',
    year: '2025',
    area: '5,500 sq.ft',
    image: '/images/project-client-1.jpg',
    desc: 'An exquisite modern residential project featuring elegant exterior design, geometric volumes, and harmonious landscaping.',
  },
  {
    id: 6,
    title: 'Axis Corporate Headquarters',
    category: 'Workplace',
    featured: false,
    location: 'Urban Sector',
    year: '2024',
    area: '6,200 sq.ft',
    image: '/images/project-client-3.jpg',
    desc: 'A striking urban workplace showcasing innovative facade engineering, sustainable daylighting atriums, and structural elegance.',
  },
  {
    id: 7,
    title: 'Contemporary Estate Panorama',
    category: 'Residential',
    featured: false,
    location: 'Private Client',
    year: '2025',
    area: '8,900 sq.ft',
    image: '/images/hero-slide-3.jpg',
    desc: 'Expansive modern estate with panoramic glass envelopes, integrated ambient lighting, and reflecting water gardens.',
  },
  {
    id: 8,
    title: 'VS Villa — Stilt Lounge & Pool Pavilion',
    category: 'Hospitality',
    featured: true,
    location: 'Private Client',
    year: '2026',
    area: '8,500 sq.ft',
    image: '/images/project-vs-villa-corner.jpg',
    desc: 'Expansive resort-grade hospitality living featuring stilt entertainment pavilion, private lap pool, perimeter vertical planters, and continuous cantilevered balconies framed by lush tropical greenery.',
  },
  {
    id: 9,
    title: 'Pergola Sunset Cabana Terrace',
    category: 'Hospitality',
    featured: false,
    location: 'Private Client',
    year: '2025',
    area: '4,800 sq.ft',
    image: '/images/hero-slide-6.jpg',
    desc: 'An elevated wooden pergola terrace designed for hospitality and leisure gatherings, offering panoramic views over tropical canopy foliage and sunset skylines.',
  },
  {
    id: 10,
    title: 'Mediterranean Courtyard & Corbel Estate',
    category: 'Hospitality',
    featured: false,
    location: 'Private Client',
    year: '2025',
    area: '6,500 sq.ft',
    image: '/images/hero-slide-5.jpg',
    desc: 'Intricate architectural masonry detailing with arched double-height windows, carved timber corbels, lanterns, and wrought-iron Juliet balconies.',
  },
  {
    id: 11,
    title: 'Aura Flagship Boutique Pavilion',
    category: 'Retail',
    featured: true,
    location: 'High Street Promenade',
    year: '2025',
    area: '9,200 sq.ft',
    image: '/images/project-client-2.jpg',
    desc: 'A luxury retail flagship integrating illuminated stone vitrines, double-height cantilevered glass display envelopes, and landscaped pedestrian plazas.',
  },
  {
    id: 12,
    title: 'Avant-Garde Commercial Retail Arcade',
    category: 'Retail',
    featured: true,
    location: 'Commercial Boulevard',
    year: '2025',
    area: '11,000 sq.ft',
    image: '/images/project-client-5.jpg',
    desc: 'A bold retail and lifestyle destination featuring perforated bronze solar fins, dynamic cantilevered shopping concourses, and open-air public plazas.',
  },
  {
    id: 13,
    title: 'Oasis Coastal Sanctuary Resort',
    category: 'Hospitality',
    featured: true,
    location: 'Private Island',
    year: '2024',
    area: '14,000 sq.ft',
    image: '/images/project-resort.png',
    desc: 'Tropical resort hospitality villa with infinity edge water features, open-air cabana structures, and sustainable oceanfront cooling architecture.',
  },

  // ==========================================
  // THE JHAROKA HOUSE — INTERIORS (PART A PDF)
  // ==========================================
  {
    id: 14,
    title: 'The Jharoka House — Grand Heritage Foyer',
    category: 'Interiors',
    featured: true,
    location: 'The Jharoka House',
    year: '2026',
    area: '620 sq.ft',
    image: '/images/jharoka/jharoka-foyer.jpg',
    desc: 'A dramatic double-height arrival hall defined by handcrafted stone arches, delicate bronze lighting, inlaid marble surfaces, and a curated sculptural pedestal.',
  },
  {
    id: 15,
    title: 'The Jharoka House — Haveli Living Room',
    category: 'Interiors',
    featured: true,
    location: 'The Jharoka House',
    year: '2026',
    area: '1,150 sq.ft',
    image: '/images/jharoka/jharoka-living-room.jpg',
    desc: 'A magnificent heritage living sanctuary anchored by a signature arched jali screen, bespoke boucle and ochre seating, fluted walnut millwork, and hand-carved heritage moldings.',
  },
  {
    id: 16,
    title: 'The Jharoka House — TV Lounge & Family Den',
    category: 'Interiors',
    featured: false,
    location: 'The Jharoka House',
    year: '2026',
    area: '650 sq.ft',
    image: '/images/jharoka/jharoka-tv-lounge.jpg',
    desc: 'A warm, relaxed family gathering lounge featuring a bespoke floating low-profile media credenza, woven cane detailing, and textured limewash walls.',
  },
  {
    id: 18,
    title: 'The Jharoka House — Artisanal Dining Suite',
    category: 'Interiors',
    featured: true,
    location: 'The Jharoka House',
    year: '2026',
    area: '780 sq.ft',
    image: '/images/jharoka/jharoka-dining.jpg',
    desc: 'Celebration of artisanal timbercraft featuring a hand-carved solid dining table, sculptural bronze chandelier, and fluted paneling opening seamlessly to private courtyard gardens.',
  },
  {
    id: 19,
    title: 'The Jharoka House — Ground Floor Guest Suite',
    category: 'Interiors',
    featured: false,
    location: 'The Jharoka House',
    year: '2026',
    area: '580 sq.ft',
    image: '/images/jharoka/jharoka-guest-suite.jpg',
    desc: 'Thoughtfully appointed guest sanctuary incorporating soft architectural niches, textured linen wall coverings, warm wood joinery, and private garden views.',
  },
  {
    id: 20,
    title: 'The Jharoka House — Guest Suite Washroom',
    category: 'Interiors',
    featured: false,
    location: 'The Jharoka House',
    year: '2026',
    area: '260 sq.ft',
    image: '/images/jharoka/jharoka-guest-washroom.jpg',
    desc: 'Minimalist guest ensuite featuring fluted stone vanities, brushed bronze fittings, and subtle indirect perimeter lighting.',
  },
  {
    id: 21,
    title: 'The Jharoka House — Master Bedroom Sanctuary',
    category: 'Interiors',
    featured: true,
    location: 'The Jharoka House',
    year: '2026',
    area: '850 sq.ft',
    image: '/images/jharoka/jharoka-master-bedroom.jpg',
    desc: 'A serene private sanctuary blending soft limewash plaster with custom arched velvet headboards, integrated fluted oak wardrobes, and ambient indirect cove lighting.',
  },
  {
    id: 22,
    title: 'The Jharoka House — Moroccan Spa Master Washroom',
    category: 'Interiors',
    featured: true,
    location: 'The Jharoka House',
    year: '2026',
    area: '420 sq.ft',
    image: '/images/jharoka/jharoka-master-washroom.jpg',
    desc: 'Resort-grade master washroom with a freestanding oval soaking tub beneath an arched brass niche, dual Calacatta marble vanity, fluted glass screens, and unlacquered brass tapware.',
  },
  {
    id: 23,
    title: "The Jharoka House — Son's Bedroom & Study",
    category: 'Interiors',
    featured: false,
    location: 'The Jharoka House',
    year: '2026',
    area: '560 sq.ft',
    image: '/images/jharoka/jharoka-sons-bedroom.jpg',
    desc: 'Contemporary tailored bedroom with rich smoked oak finishes, textured acoustic paneling, integrated floating study workstation, and minimalist architectural lighting.',
  },
  {
    id: 24,
    title: "The Jharoka House — Son's En-Suite Washroom",
    category: 'Interiors',
    featured: false,
    location: 'The Jharoka House',
    year: '2026',
    area: '240 sq.ft',
    image: '/images/jharoka/jharoka-sons-washroom.jpg',
    desc: 'Monolithic slate and fluted dark wood washroom with recessed LED mirrors, rainfall shower enclosure, and clean linear brass fixtures.',
  },

  // ==========================================
  // THE JHAROKA HOUSE — INTERIORS (PART B PDF)
  // ==========================================
  {
    id: 25,
    title: 'The Jharoka House — Heritage Home Bar & Lounge',
    category: 'Interiors',
    featured: true,
    location: 'The Jharoka House',
    year: '2026',
    area: '380 sq.ft',
    image: '/images/jharoka/jharoka-home-bar.jpg',
    desc: 'An intimate cocktail and sommelier lounge featuring illuminated fluted glass cabinets, antique brushed brass backsplashes, and rich smoked oak paneling.',
  },
  {
    id: 26,
    title: "The Jharoka House — Emerald & Fluted Chef's Kitchen",
    category: 'Interiors',
    featured: true,
    location: 'The Jharoka House',
    year: '2026',
    area: '580 sq.ft',
    image: '/images/jharoka/jharoka-kitchen.jpg',
    desc: 'A bespoke culinary space pairing rich hunter-green shaker and fluted oak cabinetry with leathered quartzite island counters and concealed chef appliances.',
  },
  {
    id: 27,
    title: 'The Jharoka House — Master Dressing & Sitting Room',
    category: 'Interiors',
    featured: false,
    location: 'The Jharoka House',
    year: '2026',
    area: '480 sq.ft',
    image: '/images/jharoka/jharoka-wifes-room.jpg',
    desc: 'Bespoke walk-in wardrobe and dressing boudoir featuring custom fluted timber islands, floor-to-ceiling glass vitrines, and soft velvet bench seating.',
  },
  {
    id: 28,
    title: 'The Jharoka House — Powder & Vanity Washroom',
    category: 'Interiors',
    featured: false,
    location: 'The Jharoka House',
    year: '2026',
    area: '220 sq.ft',
    image: '/images/jharoka/jharoka-wifes-washroom.jpg',
    desc: 'Elegantly proportioned vanity washroom with arched backlit mirrors, honed marble basins, and delicate brushed brass sconces.',
  },
  {
    id: 29,
    title: "The Jharoka House — Daughter's Bedroom Suite",
    category: 'Interiors',
    featured: false,
    location: 'The Jharoka House',
    year: '2026',
    area: '540 sq.ft',
    image: '/images/jharoka/jharoka-daughters-bedroom.jpg',
    desc: 'Poetic retreat featuring custom arched wall panels with subtle botanical frescoes, blush and terracotta hues, ribbed millwork, and tactile linen drapery.',
  },
  {
    id: 30,
    title: "The Jharoka House — Daughter's En-Suite Washroom",
    category: 'Interiors',
    featured: false,
    location: 'The Jharoka House',
    year: '2026',
    area: '230 sq.ft',
    image: '/images/jharoka/jharoka-daughters-washroom.jpg',
    desc: 'Light-filled personal washroom with soft rose terrazzo tiles, curved arched mirrors, and minimalist champagne brass fixtures.',
  },
  {
    id: 31,
    title: 'The Jharoka House — Upper Guest Bedroom',
    category: 'Interiors',
    featured: false,
    location: 'The Jharoka House',
    year: '2026',
    area: '510 sq.ft',
    image: '/images/jharoka/jharoka-guest-bedroom-2.jpg',
    desc: 'Tranquil upper-level guest suite designed with neutral woven textures, oak headboard shelving, and expansive view portals.',
  },
  {
    id: 32,
    title: 'The Jharoka House — Upper Guest Washroom',
    category: 'Interiors',
    featured: false,
    location: 'The Jharoka House',
    year: '2026',
    area: '220 sq.ft',
    image: '/images/jharoka/jharoka-guest-washroom-2.jpg',
    desc: 'Serene washroom finished in textured travertine slabs, floating vanity credenza, and custom bronze framed glass partitions.',
  },
  {
    id: 33,
    title: 'The Jharoka House — Private Wellness & Gymnasium',
    category: 'Interiors',
    featured: false,
    location: 'The Jharoka House',
    year: '2026',
    area: '510 sq.ft',
    image: '/images/jharoka/jharoka-gymnasium.jpg',
    desc: 'Sunlit fitness sanctuary with floor-to-ceiling mirrored arched portals, natural oak flooring, acoustic timber slats, and integrated wellness equipment.',
  },
  {
    id: 34,
    title: 'The Jharoka House — Private Cinema & Screening Room',
    category: 'Interiors',
    featured: true,
    location: 'The Jharoka House',
    year: '2026',
    area: '720 sq.ft',
    image: '/images/jharoka/jharoka-home-theatre.jpg',
    desc: 'Ultra-luxury private screening room wrapped in acoustic grooved velvet wall panels, tiered reclining seating, fiber-optic starry ceiling, and integrated warm perimeter glow.',
  },
]

function SwipableRibbonRow({
  items,
  direction = 'left',
  isPaused = false,
  onSelectProject,
  rowRef,
  className = '',
}) {
  const containerRef = useRef(null)
  const isInteractingRef = useRef(false)
  const isDraggingRef = useRef(false)
  const hasMovedRef = useRef(false)
  const startXRef = useRef(0)
  const startScrollLeftRef = useRef(0)
  const lastXRef = useRef(0)
  const velocityRef = useRef(0)
  const lastTimeRef = useRef(0)
  const resumeTimeoutRef = useRef(null)
  const scrollPosRef = useRef(0)
  const isMountedRef = useRef(false)

  // Floating speed in pixels per frame
  const autoSpeed = direction === 'left' ? 0.75 : -0.75

  // Expose manual nudge method to parent controls
  useEffect(() => {
    if (rowRef) {
      rowRef.current = {
        nudge: (delta) => {
          const el = containerRef.current
          if (!el) return
          isInteractingRef.current = true
          el.scrollBy({ left: delta, behavior: 'smooth' })
          if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
          resumeTimeoutRef.current = setTimeout(() => {
            isInteractingRef.current = false
          }, 1500)
        },
      }
    }
  }, [rowRef])

  // Center initial scroll position so user can swipe left or right immediately
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const init = () => {
      const seg = el.scrollWidth / 3
      if (seg > 0) {
        el.scrollLeft = seg
        scrollPosRef.current = seg
        isMountedRef.current = true
      }
    }
    const t = setTimeout(init, 60)
    return () => clearTimeout(t)
  }, [items])

  // Infinite wrap check helper
  const checkWrap = (el) => {
    const seg = el.scrollWidth / 3
    if (seg <= 0) return
    if (el.scrollLeft >= 2 * seg) {
      el.scrollLeft -= seg
      scrollPosRef.current = el.scrollLeft
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft += seg
      scrollPosRef.current = el.scrollLeft
    }
  }

  // Auto-scroll loop with RAF
  useEffect(() => {
    let animId
    const step = () => {
      const el = containerRef.current
      if (el && isMountedRef.current && !isPaused && !isInteractingRef.current) {
        scrollPosRef.current += autoSpeed
        el.scrollLeft = scrollPosRef.current
        checkWrap(el)
      }
      animId = requestAnimationFrame(step)
    }
    animId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animId)
  }, [isPaused, autoSpeed])

  // Native scroll handler (handles touch swipes on mobile and trackpad gestures)
  const handleScroll = () => {
    const el = containerRef.current
    if (!el || !isMountedRef.current) return
    scrollPosRef.current = el.scrollLeft
    checkWrap(el)
  }

  // Pointer Down (Desktop Mouse Drag & Mobile Touch Gestures)
  const handlePointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    const el = containerRef.current
    if (!el) return

    isInteractingRef.current = true
    isDraggingRef.current = true
    hasMovedRef.current = false
    startXRef.current = e.clientX
    startScrollLeftRef.current = el.scrollLeft
    lastXRef.current = e.clientX
    lastTimeRef.current = performance.now()
    velocityRef.current = 0

    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch (_) {}
  }

  // Pointer Move (1:1 manual drag tracking)
  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return
    const el = containerRef.current
    if (!el) return

    const now = performance.now()
    const dt = now - lastTimeRef.current
    const dx = e.clientX - startXRef.current
    const stepDx = e.clientX - lastXRef.current

    if (Math.abs(dx) > 6) {
      hasMovedRef.current = true
    }

    if (dt > 0) {
      velocityRef.current = stepDx / dt
    }
    lastXRef.current = e.clientX
    lastTimeRef.current = now

    el.scrollLeft = startScrollLeftRef.current - dx
    scrollPosRef.current = el.scrollLeft
    checkWrap(el)
  }

  // Pointer Up / Cancel (Inertia decay & auto-resume)
  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false

    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch (_) {}

    const el = containerRef.current
    if (el && Math.abs(velocityRef.current) > 0.25) {
      let v = velocityRef.current * 14
      const decay = () => {
        if (!el || isDraggingRef.current) return
        el.scrollLeft -= v
        scrollPosRef.current = el.scrollLeft
        checkWrap(el)
        v *= 0.92
        if (Math.abs(v) > 0.3) {
          requestAnimationFrame(decay)
        } else {
          resumeTimeoutRef.current = setTimeout(() => {
            isInteractingRef.current = false
          }, 1400)
        }
      }
      requestAnimationFrame(decay)
    } else {
      resumeTimeoutRef.current = setTimeout(() => {
        isInteractingRef.current = false
      }, 1400)
    }
  }

  // Hover detection: pause when hovering on desktop, resume on leave
  const handleMouseEnter = () => {
    if (!isDraggingRef.current) {
      isInteractingRef.current = true
    }
  }

  const handleMouseLeave = () => {
    if (!isDraggingRef.current) {
      isInteractingRef.current = false
    }
  }

  return (
    <div
      ref={containerRef}
      className={`gallery-ribbon-wrapper ${className}`}
      onScroll={handleScroll}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ touchAction: 'pan-y' }}
    >
      <div className="gallery-ribbon-track">
        {items.map((project, idx) => (
          <div
            key={`${direction}-${project.id}-${idx}`}
            className="gallery-card hover-target"
            onClick={() => {
              if (!hasMovedRef.current) {
                onSelectProject(project)
              }
            }}
          >
            <div className="gallery-card__inner">
              <img
                src={project.image}
                alt={project.title}
                className="gallery-card__image"
                loading="lazy"
                draggable={false}
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
  )
}

export default function Projects() {
  const pageRef = useRef(null)
  const row1Ref = useRef(null)
  const row2Ref = useRef(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)


  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return allProjects
    if (activeFilter === 'Featured') return allProjects.filter((p) => p.featured)
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

      {/* ===== DUAL-ROW HORIZONTAL SLIDING & SWIPABLE GALLERY ===== */}
      <section className="projects-dual-marquee-section" id="projects-dual-gallery">
        {/* Row 1 — Swipeable Moving Left */}
        <SwipableRibbonRow
          items={row1List}
          direction="left"
          onSelectProject={setSelectedProject}
          rowRef={row1Ref}
          className="gallery-ribbon-wrapper--top"
        />

        {/* Row 2 — Swipeable Moving Right */}
        <SwipableRibbonRow
          items={row2List}
          direction="right"
          onSelectProject={setSelectedProject}
          rowRef={row2Ref}
          className="gallery-ribbon-wrapper--bottom"
        />

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
