import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const philosophies = [
  {
    num: '01',
    axis: 'AXIS // 01 • PROPORTION',
    image: '/images/philosophy-1.jpg',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
      </svg>
    ),
    title: 'Timeless Geometry',
    emphasis: 'Geometry',
    tagline: 'Pure Proportions',
    desc: 'Crafting exterior forms that transcend temporary trends, establishing balanced proportions, cantilevered planes, and sculptural silhouettes destined to remain iconic across generations.',
    elevation: '+0.150M',
    coordinate: '25.2048° N, 55.2708° E',
  },
  {
    num: '02',
    axis: 'AXIS // 02 • BIOPHILIA',
    image: '/images/philosophy-2.jpg',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
        <path d="M2 17l10 5 10-5"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    ),
    title: 'Biophilic Integration',
    emphasis: 'Integration',
    tagline: 'Nature in Dialogue',
    desc: 'Dissolving boundaries between built mass and living landscape with multi-story vertical garden facades, reflective water bodies, and microclimate-regulating shaded courtyards.',
    elevation: '+0.250M',
    coordinate: '25.1972° N, 55.2744° E',
  },
  {
    num: '03',
    axis: 'AXIS // 03 • TECTONICS',
    image: '/images/philosophy-3.jpg',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="9" y1="21" x2="9" y2="9"></line>
      </svg>
    ),
    title: 'Master Craftsmanship',
    emphasis: 'Craftsmanship',
    tagline: 'Detail Precision',
    desc: 'From custom bronze louvers and fluted limestone to cantilevered structural glass, every connection is engineered to the millimeter with uncompromising aesthetic fidelity.',
    elevation: '+0.350M',
    coordinate: '25.1865° N, 55.2631° E',
  },
  {
    num: '04',
    axis: 'AXIS // 04 • CLIMATE',
    image: '/images/philosophy-4.jpg',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    ),
    title: 'Climate Envelopes',
    emphasis: 'Envelopes',
    tagline: 'Sustainable Future',
    desc: 'Pioneering intelligent kinetic solar shading and thermal envelope engineering to maximize passive cooling, solar orientation, and carbon-neutral building longevity.',
    elevation: '+0.450M',
    coordinate: '25.2011° N, 55.2690° E',
  },
]

const milestones = [
  {
    year: '2015',
    title: 'Studio Inception',
    desc: 'Farasha Design Studio was founded with a foundational ambition to redefine luxury exterior architecture through biophilic harmony.',
  },
  {
    year: '2018',
    title: 'International Design Citation',
    desc: 'Received the Global Architecture Citation for bespoke cliffside residential innovation and sloped topography adaptation.',
  },
  {
    year: '2021',
    title: 'Dubai & Regional Studios',
    desc: 'Expanded permanent presence across the Middle East and Asia, designing signature private villa compounds and coastal estates.',
  },
  {
    year: '2024',
    title: '150+ Built Realizations',
    desc: 'Surpassed 150 completed exterior architecture and master-planned estates across 8 countries.',
  },
  {
    year: '2026',
    title: 'Climate-Adaptive Envelopes',
    desc: 'Pioneering kinetic solar shading facades and carbon-neutral building envelopes setting new benchmarks for exterior performance.',
  },
]

export default function About() {
  const pageRef = useRef(null)
  const [activePillar, setActivePillar] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from('.about-hero__title-line', {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2,
      })

      gsap.from('.about-hero__desc', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.6,
      })

      gsap.from('.about-hero__visual', {
        x: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.4,
      })

      // Story section
      gsap.from('.about-story__image', {
        scale: 1.1,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-story',
          start: 'top 70%',
        },
      })

      gsap.from('.about-story__text > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-story',
          start: 'top 60%',
        },
      })

      // Horizon entrance
      gsap.fromTo(
        '.about-horizon',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: '.about-values',
            start: 'top 80%',
          },
        }
      )

      // Timeline
      gsap.from('.timeline-item', {
        x: -60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-timeline__list',
          start: 'top 75%',
        },
      })

      gsap.from('.about-timeline__line-fill', {
        scaleY: 0,
        duration: 2,
        ease: 'power2.out',
        transformOrigin: 'top',
        scrollTrigger: {
          trigger: '.about-timeline__list',
          start: 'top 75%',
          end: 'bottom 50%',
          scrub: true,
        },
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      {/* Hero with 3D Architecture Model */}
      <section className="about-hero section" id="about-hero">
        <div className="container">
          <div className="about-hero__grid">
            <div className="about-hero__text">
              <span className="section-label">About Us</span>
              <h1 className="about-hero__title">
                <span className="about-hero__title-line">Crafting Spaces</span>
                <span className="about-hero__title-line about-hero__title-line--accent">That Inspire</span>
              </h1>
              <p className="about-hero__desc">
                Farasha Design Studio is a multidisciplinary exterior architecture practice 
                dedicated to creating environments that elevate the human experience through 
                thoughtful design, material innovation, and a deep respect for context.
              </p>
            </div>

            <div className="about-hero__visual">
              <div className="about-hero__3d-container">
                <img 
                  src="/images/about-3d-model.png" 
                  alt="3D Architectural Real Estate Model" 
                  className="about-hero__3d-image" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="about-story section" id="about-story">
        <div className="container about-story__grid">
          <div className="about-story__image-wrapper">
            <img src="/images/project-modern-home.png" alt="Modern architectural design" className="about-story__image" />
          </div>
          <div className="about-story__text">
            <span className="section-label">Our Story</span>
            <h2>Born from a<br /><em>passion</em> for form</h2>
            <p>
              Founded on the belief that exterior architecture should exist in poetic dialogue with its natural surroundings, Farasha Design Studio transforms visionary concepts into enduring physical landmarks. Our name—derived from the Arabic word for butterfly—epitomizes our dedication to metamorphosis, crafting environments that gracefully elevate nature through structural artistry.
            </p>
            <p>
              From private hillside sanctuaries and expansive estates to high-performance corporate facades, our multidisciplinary collective of architects, landscape visionaries, and structural engineers approaches each commission with rigorous devotion to craft, material authenticity, and timeless form.
            </p>
            <div className="about-story__highlight">
              <span className="about-story__highlight-num">25+</span>
              <span className="about-story__highlight-text">Creative professionals<br />shaping the future of exterior design</span>
            </div>
          </div>
        </div>
      </section>

      {/* Values / Philosophy — Kinetic Architectural Horizon */}
      <section className="about-values section" id="about-values">
        <div className="container">
          <div className="about-values__header">
            <span className="section-label">Our Philosophy</span>
            <h2>What Drives Us</h2>
          </div>
          
          <div className="about-horizon">
            {philosophies.map((p, i) => (
              <div 
                key={i} 
                className={`horizon-slat ${activePillar === i ? 'horizon-slat--active' : ''}`}
                onMouseEnter={() => setActivePillar(i)}
                onClick={() => setActivePillar(i)}
              >
                <img src={p.image} alt={p.title} className="horizon-slat__bg" />
                <div className="horizon-slat__overlay"></div>

                {/* Collapsed state (when another slat is active) */}
                <div className="horizon-slat__collapsed">
                  <span className="horizon-slat__collapsed-num">{p.num}</span>
                  <span className="horizon-slat__collapsed-title">{p.title}</span>
                  <div className="horizon-slat__collapsed-dot"></div>
                </div>

                {/* Expanded state */}
                <div className="horizon-slat__expanded">
                  <div className="horizon-slat__top">
                    <span className="horizon-slat__axis-tag">
                      <span className="horizon-slat__axis-dot"></span>
                      {p.axis}
                    </span>
                    <div className="horizon-slat__icon-pill">
                      {p.icon}
                    </div>
                  </div>

                  <div className="horizon-slat__center">
                    <span className="horizon-slat__tagline">{p.tagline}</span>
                    <h3 className="horizon-slat__title">
                      {p.title.replace(p.emphasis, '')}<em>{p.emphasis}</em>
                    </h3>
                    <p className="horizon-slat__desc">{p.desc}</p>
                  </div>

                  <div className="horizon-slat__bottom">
                    <span>ELEVATION <span className="horizon-slat__datum-val">{p.elevation}</span></span>
                    <span>COORDINATES <span className="horizon-slat__datum-val">{p.coordinate}</span></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline section" id="about-timeline">
        <div className="container">
          <div className="about-timeline__header">
            <span className="section-label">Our Journey</span>
            <h2>Milestones of Distinction</h2>
          </div>
          <div className="about-timeline__list">
            <div className="about-timeline__line">
              <div className="about-timeline__line-fill"></div>
            </div>
            {milestones.map((m, i) => (
              <div key={i} className="timeline-item">
                <span className="timeline-item__year">{m.year}</span>
                <div className="timeline-item__dot"></div>
                <div className="timeline-item__content">
                  <h3 className="timeline-item__title">{m.title}</h3>
                  <p className="timeline-item__desc">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

