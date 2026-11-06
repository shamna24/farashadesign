import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Services.css'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    num: '01',
    title: 'Concept and Design Development',
    desc: 'Formulating visionary design philosophies, spatial explorations, and preliminary concepts that lay the cornerstone for architectural distinction and bespoke character.',
    features: ['Conceptual Massing & Volumetric Studies', 'Contextual & Environmental Site Analysis', 'Design Philosophy & Vision Definition', 'Preliminary Material & Style Direction'],
    image: '/images/hero-villa.png',
  },
  {
    num: '02',
    title: 'Architectural Design',
    desc: 'Transforming ambitious visions into sculpturally arresting building envelopes. From ultra-luxury private villas to prestigious commercial landmarks, our architecture balances contextual elegance, microclimate responsiveness, and pure geometric precision.',
    features: ['Parametric Massing & Volume Studies', 'Bespoke Cladding & Material Selection', 'Solar Exposure & Microclimate Optimization', 'Luxury Cantilevers & Structural Articulation'],
    image: '/images/project-modern-home.png',
  },
  {
    num: '03',
    title: 'Interior Design',
    desc: 'Curating bespoke interior spaces that balance curated materiality, atmospheric lighting, and effortless luxurious living crafted to elevate human wellbeing.',
    features: ['Bespoke Millwork & Custom Joinery', 'Curated Lighting & Acoustic Design', 'High-End Material & Finishes Palette', 'Furnishing & Spatial Harmonization'],
    image: '/images/project-waterfront.png',
  },
  {
    num: '04',
    title: 'Consultation',
    desc: 'Providing strategic architectural guidance, site feasibility evaluations, regulatory advisory, and master project roadmapping from initial intent to execution.',
    features: ['Comprehensive Feasibility Studies', 'Regulatory & Zoning Advisory', 'Budgetary & Material Optimization', 'Phased Development Strategy'],
    image: '/images/project-client-1.jpg',
  },
  {
    num: '05',
    title: '3D Modeling',
    desc: 'Empowering visionary clients to experience their estates long before groundbreaking. Our hyper-realistic CGI renders, lighting studies, and cinematographic video flythroughs articulate spatial depth with absolute visual fidelity.',
    features: ['Photorealistic Day & Dusk Lighting CGI', 'Cinematic Drone & Perspective Flythroughs', 'VR Spatial Scale Walkthroughs', 'Material Texture & Shadow Analysis'],
    image: '/images/project-hillside.png',
  },
  {
    num: '06',
    title: 'Landscape Design',
    desc: 'Crafting fluid outdoor ecosystems that merge organic nature with built forms. We design immersive water terraces, private reflection gardens, infinity pool pavilions, and sculptural botanical sanctuaries tailored for tranquil outdoor living.',
    features: ['Infinity Pool & Cabana Masterplanning', 'Lush Native Botanical Curation', 'Sculptural Hardscaping & Water Cascades', 'Ambient Evening Architectural Lighting'],
    image: '/images/project-resort.png',
  },
  {
    num: '07',
    title: 'Facade Development',
    desc: 'Fusing structural durability with cutting-edge architectural aesthetics. We design performance-driven curtain wall assemblies, kinetic louvers, and thermally broken glazing systems engineered to withstand intense climate extremes with elegance.',
    features: ['Dynamic Solar Fin & Shading Arrays', 'Thermally Efficient Glazing Systems', 'Natural Stone & Perforated Metal Facades', 'Structural Glass Balustrades & Skylights'],
    image: '/images/project-commercial.png',
  },
  {
    num: '08',
    title: 'Bespoke End-to-End Solutions',
    desc: 'Delivering complete turnkey design realization—coordinating every facet from initial blueprint, engineering, and craftsmanship to final handover.',
    features: ['Turnkey Design & Execution Oversight', 'Material Procurement & Artisan Crafting', 'Integrated Multi-Disciplinary Coordination', 'Rigorous Quality & Milestone Assurance'],
    image: '/images/project-urban.png',
  },
]

const process = [
  {
    step: '01',
    title: 'Discovery & Context',
    desc: 'We delve into your lifestyle, site topography, sun paths, and architectural ambitions to formulate the overarching design philosophy.',
    image: '/images/process-1.png',
  },
  {
    step: '02',
    title: 'Design & Engineering',
    desc: 'Meticulous iteration of 3D forms, facade engineering, material palettes, and technical schematics calibrated for flawless execution.',
    image: '/images/process-2.png',
  },
  {
    step: '03',
    title: 'Precision Realization',
    desc: 'Overseeing craft fidelity, material procurement, and construction milestones until the finished estate stands as a living masterpiece.',
    image: '/images/process-3.png',
  },
]

export default function Services() {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.from('.services-hero__title-line', {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.3,
      })

      gsap.from('.services-hero__desc', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8,
      })

      gsap.from('.services-hero__visual', {
        x: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.5,
      })

      // Service cards — alternate slide directions
      document.querySelectorAll('.service-card').forEach((card, i) => {
        const direction = i % 2 === 0 ? -60 : 60

        gsap.from(card.querySelector('.service-card__image-wrapper'), {
          x: direction,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
          },
        })

        gsap.from(card.querySelector('.service-card__text'), {
          x: -direction,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 75%',
          },
        })
      })

      // Process - 3D Fan Out Animation
      let mm = gsap.matchMedia()
      mm.add('(min-width: 769px)', () => {
        const processCards = gsap.utils.toArray('.process-step')

        // Initial stack state
        gsap.set(processCards, {
          position: 'absolute',
          top: '40%',
          left: '50%',
          xPercent: -50,
          yPercent: -50,
          z: (i) => -i * 50,
          opacity: 0,
          transformOrigin: 'center center',
        })

        const processTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.services-process',
            start: 'top top',
            end: '+=200%',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        })

        // Fade in the stack first
        processTl.to(processCards, { opacity: 1, duration: 0.2, stagger: 0.05 })

        const spreadLeft = -170
        const spreadRight = 70
        const rotAngle = 25

        // Fan out cards
        processTl
          .to(processCards[0], { xPercent: spreadLeft, rotationY: -rotAngle, z: -100, ease: 'power2.inOut', duration: 1 }, 0.5)
          .to(processCards[1], { xPercent: -50, rotationY: 0, z: 50, ease: 'power2.inOut', duration: 1 }, 0.5)
          .to(processCards[2], { xPercent: spreadRight, rotationY: rotAngle, z: -100, ease: 'power2.inOut', duration: 1 }, 0.5)
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      {/* Hero with 3D Architectural Model */}
      <section className="services-hero section" id="services-hero">
        <div className="container">
          <div className="services-hero__grid">
            <div className="services-hero__text">
              <span className="section-label">Our Services</span>
              <h1 className="services-hero__title">
                <span className="services-hero__title-line">Design</span>
                <span className="services-hero__title-line services-hero__title-line--accent">Excellence</span>
              </h1>
              <p className="services-hero__desc">
                From initial concept to final realization, we offer a comprehensive suite 
                of exterior architecture and design services that transform visions into 
                extraordinary built environments.
              </p>
            </div>

            <div className="services-hero__visual">
              <div className="services-hero__3d-container">
                <img 
                  src="/images/services-3d-model.png" 
                  alt="3D Architectural Pavilion Model" 
                  className="services-hero__3d-image" 
                />
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services list */}
      <section className="services-list section" id="services-list">
        <div className="container">
          {services.map((service, i) => (
            <div key={service.num} className={`service-card ${i % 2 !== 0 ? 'service-card--reverse' : ''}`}>
              <div className="service-card__image-wrapper">
                <img src={service.image} alt={service.title} className="service-card__image" />
                <span className="service-card__num">{service.num}</span>
              </div>
              <div className="service-card__text">
                <h2 className="service-card__title">{service.title}</h2>
                <p className="service-card__desc">{service.desc}</p>
                <ul className="service-card__features">
                  {service.features.map((f, j) => (
                    <li key={j} className="service-card__feature">
                      <span className="service-card__feature-dot"></span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="services-process section" id="services-process">
        <div className="container">
          <div className="services-process__header">
            <span className="section-label">Our Process</span>
            <h2>How We Work</h2>
          </div>
          <div className="services-process__grid">
            {process.map((p) => (
              <div key={p.step} className="process-step" style={{ backgroundImage: `url(${p.image})` }}>
                <div className="process-step__overlay"></div>
                <div className="process-step__content">
                  <span className="process-step__num">{p.step}</span>
                  <h3 className="process-step__title">{p.title}</h3>
                  <p className="process-step__desc">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="services-cta section" id="services-cta">
        <div className="container services-cta__content">
          <span className="section-label">Ready?</span>
          <h2>Let's Create<br />Something Extraordinary</h2>
          <p>Every great project begins with a conversation. Tell us about your vision.</p>
          <Link to="/contact" className="btn btn-primary">
            <span>Start a Project</span>
          </Link>
        </div>
      </section>
    </div>
  )
}

