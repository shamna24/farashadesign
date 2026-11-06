import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'
import AboutLogoVideoHero from '../components/AboutLogoVideoHero'
import AboutLogoStory from '../components/AboutLogoStory'

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
    year: '2020',
    title: 'Our First Design Was Farasha',
    desc: 'A logo sketched by hand, a mood board, and a shared vision for the studio we wanted to build. Farasha began with us imagining something of our own.',
  },
  {
    year: '2021',
    title: 'The First Homes, the First Trust',
    desc: 'We offered our design time freely, drawn to the joy of creating. Watching someone see their future home in our sketches gave those early projects a meaning we still carry.',
  },
  {
    year: '2022',
    title: 'Finding Our Place in Goa',
    desc: 'A move to Goa opened a new chapter. One small townhouse led to a handful of villas, and our first project feature brought our work to a wider audience.',
  },
  {
    year: '2023',
    title: 'A Name of Our Own',
    desc: 'We formally registered Farasha and began establishing our presence, shaping a studio known for thoughtful spaces and a deeply personal approach.',
  },
  {
    year: '2024',
    title: 'A Full Calendar',
    desc: 'For the first time, we were fully booked for the year—a milestone built on the trust of clients who welcomed us into their homes and their plans.',
  },
  {
    year: '2025',
    title: 'Our Most Personal Chapter',
    desc: 'The studio we had always called our first baby welcomed a little competition. Becoming parents brought a new rhythm to our lives and a deeper appreciation for the spaces families call home.',
  },
  {
    year: '2026',
    title: 'From Vision to Completion',
    desc: 'We expanded into turnkey projects, bringing design and execution together to carry our clients’ homes from the first conversation to the final detail.',
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

      // Founders narrative staggered reveal
      gsap.from('.founders-narrative__block', {
        y: 40,
        opacity: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-founders',
          start: 'top 80%',
        },
      })

      // Fixed background window reveal on scroll for Farah's photo (Ref: Essajees Atelier)
      const photoCard = document.querySelector('.founders-photo__card')
      const fixedImg = document.querySelector('.founders-photo__fixed-img')
      
      if (photoCard && fixedImg) {
        const syncFixedImage = () => {
          const rect = photoCard.getBoundingClientRect()
          // Counter-translate so the image stays stationary on the viewport while the card moves over it
          fixedImg.style.transform = `translate3d(0, ${-rect.top}px, 0)`
        }

        ScrollTrigger.create({
          trigger: photoCard,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: syncFixedImage,
        })

        window.addEventListener('scroll', syncFixedImage, { passive: true })
        window.addEventListener('resize', syncFixedImage)
        syncFixedImage()
      }

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
      {/* 1. Logo Metamorphosis Video Animation Hero (Brand Origin Metamorphosis) */}
      <AboutLogoVideoHero />

      {/* 2. The Story Behind Our Name / Logo Narrative & Philosophy */}
      <AboutLogoStory />

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

            {/* ========================================================= */}
      {/* ABOUT THE FOUNDERS — CLEAN LUXURY EDITORIAL (REF: ESSAJEES) */}
      {/* ========================================================= */}
      <section className="about-founders section" id="about-founders">
        <div className="about-founders__ambient-glow"></div>
        <div className="container about-founders__container">

          {/* 1. Header with Name & Simple Social Icons */}
          <div className="founders-simple__header founders-narrative__block">
            <div className="founders-profile__title-row">
              <div className="founders-title-group">
                <span className="founders-eyebrow">HOW OUR FIRM CAME TOGETHER • FOUNDERS' STORY</span>
                <h2 className="founders-banner-heading">
                  Some couples start with a home.<br />
                  We started with a <em>design studio.</em>
                </h2>
                <p className="founders-banner-sub">
                  We’re <strong>Ar. Shabeeb Cherkala</strong> and <strong>Ar. Farah Ansari</strong> — two architects who met in college, fell in love, and eventually found ourselves married in the middle of a world that had pressed pause.
                </p>
              </div>

              {/* Simple Clean Social Icons (Ref: Essajees Atelier) */}
              <div className="founders-social-icons">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="founder-icon-btn" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="founder-icon-btn" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="mailto:hello@farashadesign.com" className="founder-icon-btn" aria-label="Email">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* 2. One Nice Picture + Full Client Narrative */}
          <div className="founders-simple__body founders-narrative__block">
            {/* One Nice Picture (Client Photo) */}
            <div className="founders-photo__wrapper">
              <div className="founders-photo__card">
                <div className="founders-photo__hollow-mask">
                  <img 
                    src="/images/farah-ansari.jpg" 
                    alt="Ar. Farah Ansari - Co-Founder & Principal Architect" 
                    className="founders-photo__fixed-img" 
                  />
                </div>
                <div className="founders-photo__caption">
                  <div className="caption-dot"></div>
                  <div>
                    <strong>Ar. Farah Ansari</strong>
                    <span>Co-Founder &amp; Principal Architect</span>
                  </div>
                </div>
              </div>

              {/* Co-Founder Partnership Badge */}
              <div className="founders-partner-pill">
                <div className="partner-avatar">SC</div>
                <div className="partner-info">
                  <span className="partner-name">Ar. Shabeeb Cherkala</span>
                  <span className="partner-role">Co-Founder &amp; Construction Logistics Lead</span>
                </div>
              </div>
            </div>

            {/* Editorial Bio Content — Full Client Narrative */}
            <div className="founders-bio__content">
              <p className="founders-bio__lead">
                The pandemic wasn’t exactly the setting we had imagined for our beginning. But somewhere between the uncertainty and the unexpected time to think, a conversation kept coming back: <em>what did we want to create together?</em>
              </p>

              <p className="founders-bio__text">
                Building was already part of both our stories. Shabeeb comes from a family rooted in construction, and Farah from a family in construction machines and mining. We grew up around the practical realities of making things happen: materials, logistics, numbers, and the endless coordination behind every finished building. Not always glamorous dinner-table conversation, but an education we’ve come to appreciate.
              </p>

              {/* Architectural Calling Highlight Callout */}
              <div className="founders-callout-quote">
                <span className="callout-mark">✦</span>
                <blockquote>
                  "Architecture was the part that made us lean in. We loved how those practical decisions could become something deeply personal—a place to gather, a favourite corner, a home that feels unmistakably yours."
                </blockquote>
              </div>

              <p className="founders-bio__text">
                Joining our family businesses would have been a natural next step, especially at a time when certainty was in short supply. But we kept coming back to our sketchbooks. There were ideas we wanted to explore and spaces we wanted to bring to life.
              </p>

              <p className="founders-bio__text">
                So we started small. We took on projects simply for the chance to design, sometimes without charging a fee. Those early projects gave our days purpose and our creativity somewhere to go. They also taught us how much we enjoyed helping people imagine what their homes could become.
              </p>

              <p className="founders-bio__text">
                That was the beginning of Farasha Design Studio. <em>Our first baby, as we called it</em>—one that arrived with drawings, deadlines, and a healthy disregard for working hours.
              </p>

              <p className="founders-bio__text">
                Today, that affection for the work sits alongside a serious commitment to getting it right. We listen closely, care about the details, and bring both imagination and practical understanding to the spaces we design.
              </p>
            </div>
          </div>

          {/* 3. Simple Architectural Climax Quote Block */}
          <div className="founders-quote__block founders-narrative__block">
            <div className="quote-accent-mark">“</div>
            <blockquote className="founders-simple-quote">
              Farasha began as something we wanted to build together. It grew into the privilege of creating places where other people build their lives.
            </blockquote>
            <span className="quote-author">— Ar. Shabeeb Cherkala &amp; Ar. Farah Ansari</span>
          </div>

          {/* 4. Small Milestone Tab (Ref: Essajees Atelier) */}
          <div className="founders-milestones__tab founders-narrative__block">
            <div className="milestone-item">
              <span className="milestone-val">2020</span>
              <span className="milestone-label">Estd. Studio</span>
              <span className="milestone-desc">Born from a shared vision during the global pause</span>
            </div>
            <div className="milestone-divider"></div>

            <div className="milestone-item">
              <span className="milestone-val">Turnkey</span>
              <span className="milestone-label">End-to-End</span>
              <span className="milestone-desc">From initial concept sketches to finished handover</span>
            </div>
            <div className="milestone-divider"></div>

            <div className="milestone-item">
              <span className="milestone-val">Bespoke</span>
              <span className="milestone-label">Design Practice</span>
              <span className="milestone-desc">Exterior architecture, facades &amp; landscape curation</span>
            </div>
            <div className="milestone-divider"></div>

            <div className="milestone-item">
              <span className="milestone-val">2 Founders</span>
              <span className="milestone-label">United Vision</span>
              <span className="milestone-desc">Engineering discipline paired with sculptural craft</span>
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
                    <div className="horizon-slat__axis-tag">
                      <span className="horizon-slat__axis-dot"></span>
                      <span>{p.axis}</span>
                    </div>
                    <div className="horizon-slat__icon-pill">
                      {p.icon}
                    </div>
                  </div>

                  <div className="horizon-slat__center">
                    <span className="horizon-slat__tagline">{p.tagline}</span>
                    <h3 className="horizon-slat__title">
                      {p.title.split(p.emphasis)[0]}
                      <em>{p.emphasis}</em>
                      {p.title.split(p.emphasis)[1]}
                    </h3>
                    <p className="horizon-slat__desc">{p.desc}</p>
                  </div>

                  <div className="horizon-slat__bottom">
                    <div className="horizon-slat__meta-item">
                      <span className="meta-label">DATUM ELEVATION</span>
                      <span className="meta-value">{p.elevation}</span>
                    </div>
                    <div className="horizon-slat__meta-item">
                      <span className="meta-label">COORDINATES</span>
                      <span className="meta-value">{p.coordinate}</span>
                    </div>
                    <div className="horizon-slat__explore-btn">
                      <span>Explore Pillar</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="about-timeline section" id="about-timeline">
        <div className="container">
          <div className="about-timeline__header">
            <span className="section-label">Milestones</span>
            <h2>Our Journey</h2>
          </div>

          <div className="about-timeline__list">
            <div className="about-timeline__line">
              <div className="about-timeline__line-fill"></div>
            </div>

            {milestones.map((m, i) => (
              <div key={i} className="timeline-item" id={`timeline-${m.year}`}>
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
