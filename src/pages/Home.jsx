import { useEffect, useRef, useState, useCallback, useMemo } from 'react'

import { Link } from 'react-router-dom'

import gsap from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './Home.css'



gsap.registerPlugin(ScrollTrigger)



const heroSlides = [
  {
    id: 1,
    image: '/images/hero-slide-7.jpg',
    mobileLeft: '/images/split/slide-1-left.jpg',
    mobileRight: '/images/split/slide-1-right.jpg',
    title: 'Villa Jannat Golden Hour Estate',
  },
  {
    id: 2,
    image: '/images/project-villa-001-front.jpg',
    mobileLeft: '/images/split/slide-2-left.jpg',
    mobileRight: '/images/split/slide-2-right.jpg',
    title: 'Villa 001 — Sloped Driveway Residence',
  },
  {
    id: 3,
    image: '/images/project-vs-villa-facade.jpg',
    mobileLeft: '/images/split/slide-3-left.jpg',
    mobileRight: '/images/split/slide-3-right.jpg',
    title: 'VS Villa — Biophilic Living Facade',
  },
  {
    id: 4,
    image: '/images/hero-slide-1.jpg',
    mobileLeft: '/images/split/slide-4-left.jpg',
    mobileRight: '/images/split/slide-4-right.jpg',
    title: 'Modern Terrace & Pavilion',
  },
  {
    id: 5,
    image: '/images/hero-slide-2.jpg',
    mobileLeft: '/images/split/slide-5-left.jpg',
    mobileRight: '/images/split/slide-5-right.jpg',
    title: 'Luxury Multi-Tier Residence',
  },
  {
    id: 6,
    image: '/images/hero-slide-3.jpg',
    mobileLeft: '/images/split/slide-6-left.jpg',
    mobileRight: '/images/split/slide-6-right.jpg',
    title: 'Contemporary Estate Panorama',
  },
  {
    id: 7,
    image: '/images/project-vs-villa-corner.jpg',
    mobileLeft: '/images/split/slide-7-left.jpg',
    mobileRight: '/images/split/slide-7-right.jpg',
    title: 'VS Villa — Stilt Lounge & Pool Pavilion',
  },
  {
    id: 8,
    image: '/images/hero-slide-6.jpg',
    mobileLeft: '/images/split/slide-8-left.jpg',
    mobileRight: '/images/split/slide-8-right.jpg',
    title: 'Timber Pergola Family Terrace',
  },
]



const featuredProjects = [

  {

    id: 1,

    title: 'The Jharoka House',

    category: 'Interiors',

    location: 'Private Residence',

    image: '/images/jharoka/jharoka-living-room.jpg',

  },

  {

    id: 2,

    title: 'Modern Villa',

    category: 'Residential',

    location: 'Client Project',

    image: '/images/project-client-1.jpg',

  },

  {

    id: 3,

    title: 'Luxury Estate',

    category: 'Residential',

    location: 'Client Project',

    image: '/images/project-client-2.jpg',

  },

  {

    id: 4,

    title: 'Urban Residence',

    category: 'Urban',

    location: 'Client Project',

    image: '/images/project-client-3.jpg',

  },

  {

    id: 5,

    title: 'Serene Retreat',

    category: 'Residential',

    location: 'Client Project',

    image: '/images/project-client-4.jpg',

  },

]







const services = [

  {

    num: '01',

    title: 'Concept and Design Development',

    desc: 'Formulating visionary design philosophies, spatial explorations, and preliminary concepts that lay the cornerstone for architectural distinction.',

    image: '/images/exp-1.png'

  },

  {

    num: '02',

    title: 'Architectural Design',

    desc: 'Sculpting iconic building forms with geometric precision, contextual sensitivity, and timeless aesthetic resonance.',

    image: '/images/exp-2.png'

  },

  {

    num: '03',

    title: 'Interior Design',

    desc: 'Curating bespoke interior spaces that balance curated materiality, atmospheric lighting, and effortless luxurious living.',

    image: '/images/exp-3.png'

  },

  {

    num: '04',

    title: 'Consultation',

    desc: 'Providing strategic architectural guidance, site feasibility evaluations, and master project roadmapping from initial intent to execution.',

    image: '/images/services-3d-model.png'

  },

  {

    num: '05',

    title: '3D Modeling',

    desc: 'Creating hyper-accurate 3D digital twins and immersive spatial models to explore volume, proportion, and materiality in real time.',

    image: '/images/isometric_house_transparent.png'

  },

  {

    num: '06',

    title: 'Landscape Design',

    desc: 'Weaving nature into built spaces through sculpted outdoor terrains, biophilic features, and private botanical sanctuaries.',

    image: '/images/exp-4.png'

  },

  {

    num: '07',

    title: 'Facade Development',

    desc: 'Engineering innovative building envelopes that harmonize striking architectural expression with climate performance and thermal efficiency.',

    image: '/images/about-3d-model.png'

  },

  {

    num: '08',

    title: 'Bespoke End-to-End Solutions',

    desc: 'Delivering complete turnkey design realization—coordinating every facet from initial blueprint to final handcrafted masterpiece.',

    image: '/images/exp-1.png'

  },

]



export default function Home() {

  const heroRef = useRef(null)

  const aboutRef = useRef(null)

  const interactiveServicesRef = useRef(null)

  const projectsRef = useRef(null)

    const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768
    }
    return false
  })

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const [currentSlide, setCurrentSlide] = useState(0)

  const slideTimerRef = useRef(null)

  const touchStartX = useRef(0)

  const touchEndX = useRef(0)



  const ctaRef = useRef(null)



  const resetSlideTimer = useCallback(() => {

    if (slideTimerRef.current) clearInterval(slideTimerRef.current)

    slideTimerRef.current = setInterval(() => {

      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)

    }, 3000)

  }, [])



  const handleNext = useCallback(() => {

    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)

    resetSlideTimer()

  }, [resetSlideTimer])



  const handlePrev = useCallback(() => {

    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)

    resetSlideTimer()

  }, [resetSlideTimer])



  const goToSlide = useCallback((index) => {

    setCurrentSlide(index)

    resetSlideTimer()

  }, [resetSlideTimer])



  useEffect(() => {

    resetSlideTimer()

    return () => {

      if (slideTimerRef.current) clearInterval(slideTimerRef.current)

    }

  }, [resetSlideTimer])



  const handleTouchStart = (e) => {

    touchStartX.current = e.targetTouches[0].clientX

  }



  const handleTouchMove = (e) => {

    touchEndX.current = e.targetTouches[0].clientX

  }



  const handleTouchEnd = () => {

    if (!touchStartX.current || !touchEndX.current) return

    const diff = touchStartX.current - touchEndX.current

    if (diff > 50) {

      handleNext()

    } else if (diff < -50) {

      handlePrev()

    }

    touchStartX.current = 0

    touchEndX.current = 0

  }



  useEffect(() => {

    const ctx = gsap.context(() => {



      // Hero animations

      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      heroTl

        .from('.hero__title-line', { y: 100, opacity: 0, duration: 1, stagger: 0.15 }, '+=0.2')

        .from('.hero__subtitle', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')

        .from('.hero__cta-group', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')





      // About section

      gsap.from('.re-3d-model-container', {

        x: 80,

        opacity: 0,

        duration: 1.2,

        ease: 'power3.out',

        scrollTrigger: {

          trigger: aboutRef.current,

          start: 'top 70%',

        }

      })



      gsap.from('.re-subtitle, .re-title, .re-desc, .re-cta-group', {

        y: 50,

        opacity: 0,

        duration: 0.8,

        stagger: 0.12,

        ease: 'power3.out',

        scrollTrigger: {

          trigger: aboutRef.current,

          start: 'top 65%',

        }

      })



      // Interactive Services Scroll (Desktop and Mobile)

      if (interactiveServicesRef.current) {

        ScrollTrigger.create({

          trigger: interactiveServicesRef.current,

          pin: true,

          start: "top top",

          end: `+=${(services.length - 1) * 80}%`,

          anticipatePin: 1,

          onUpdate: (self) => {

            const progress = self.progress;

            let idx = Math.floor(progress * services.length);

            if (idx >= services.length) idx = services.length - 1;

            

            const leftItems = document.querySelectorAll(".is-left .is-text-container");

            const rightItems = document.querySelectorAll(".is-right .is-text-container");

            const centerItems = document.querySelectorAll(".is-center .is-image-container");

            

            leftItems.forEach((el, i) => {

              if (i === idx) el.classList.add("active");

              else el.classList.remove("active");

            });

            rightItems.forEach((el, i) => {

              if (i === idx) el.classList.add("active");

              else el.classList.remove("active");

            });

            centerItems.forEach((el, i) => {

              if (i === idx) el.classList.add("active");

              else el.classList.remove("active");

            });

          }

        });

      }

      // Projects - horizontal scroll

      let mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {

        const projectsTrack = document.querySelector('.home-projects__track')

        if (projectsTrack) {

          gsap.to(projectsTrack, {

            x: () => -(projectsTrack.scrollWidth - window.innerWidth + 200),

            ease: 'none',

            scrollTrigger: {

              trigger: projectsRef.current,

              start: 'top top',

              end: () => `+=${projectsTrack.scrollWidth - window.innerWidth + 200}`,

              scrub: 1,

              pin: true,

              anticipatePin: 1,

              invalidateOnRefresh: true,

            }

          })

        }

      });







      // CTA Section

      gsap.from('.home-cta__content > *', {

        y: 50,

        opacity: 0,

        duration: 0.8,

        stagger: 0.12,

        ease: 'power3.out',

        scrollTrigger: {

          trigger: ctaRef.current,

          start: 'top 75%',

        }

      })



    }, heroRef)



    return () => {

      ctx.revert();

      

    }

  }, [])



  return (

    <div ref={heroRef}>

      {/* ===== SECTION 1: IMAGE SLIDER ONLY ===== */}

      <section 

        className="hero-slider-only" 

        id="hero-section"

        onTouchStart={handleTouchStart}

        onTouchMove={handleTouchMove}

        onTouchEnd={handleTouchEnd}

      >

        <div className="hero__bg overflow-hidden">

          <div className="hero__slider-container">

            <div 

              className="hero__slider-track"

              style={{ transform: `translateX(-${currentSlide * 100}%)` }}

            >

              {heroSlides.map((slide) => (
                <div key={slide.id} className="hero__slide">
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="hero__slide-image" 
                  />
                  {isMobile && slide.part && (
                    <div className="hero__slide-badge">
                      <span className="hero__slide-badge-title">{slide.title}</span>
                      <span className="hero__slide-badge-part">{slide.part} ({slide.step})</span>
                    </div>
                  )}
                </div>
              ))}

            </div>

          </div>

        </div>



        {/* Slide dot indicators */}

        <div className="hero-slider-only__dots">

          {heroSlides.map((_, i) => (

            <button

              key={i}

              className={`hero-slider-only__dot${i === currentSlide ? " active" : ""}`}

              onClick={() => goToSlide(i)}

              aria-label={`Go to slide ${i + 1}`}

            />

          ))}

        </div>

      </section>



      {/* ===== SECTION 2: TEXT CONTENT ===== */}

      <section className="hero-text-section" id="hero-text-section">

        <div className="container hero-text-section__content">

          <h1 className="hero__title">

            <span className="hero__title-line">Small Changes</span>

            <span className="hero__title-line hero__title-line--accent">Big Impact</span>

          </h1>

          <p className="hero__subtitle hero-text-section__subtitle">

            We craft exterior spaces that transcend the ordinary — blending architectural

            precision with natural beauty to create environments that inspire.

          </p>

          <div className="hero__cta-group">

            <Link to="/projects" className="btn btn-primary">

              <span>View Our Work</span>

            </Link>

            <Link to="/contact" className="btn">

              <span>Start a Project</span>

              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">

                <path d="M5 12h14M12 5l7 7-7 7" />

              </svg>

            </Link>

          </div>

        </div>

      </section>



      {/* ===== ABOUT PREVIEW ===== */}

      <section ref={aboutRef} className="home-about section" id="home-about-section">

        <div className="container" style={{ maxWidth: '1800px', display: 'flex', justifyContent: 'center' }}>

          <div className="real-estate-card">

            <h1 className="re-bg-text">FARASHA</h1>

            

            <div className="re-content">

              <div className="re-left-content">

                <span className="re-subtitle">OUR STUDIO</span>

                <h2 className="re-title">

                  Shaping Ambition into<br/>

                  Architectural Reality

                </h2>

                

                <p className="re-desc">

                  At Farasha Design Studio, we believe that exceptional exterior architecture is born from the harmony between human ambition and nature's canvas. Our team of visionary architects brings over a decade of expertise to every project.

                </p>



                <div className="re-cta-group">

                  <Link to="/about" className="re-explore-btn">

                    Learn Our Story <span className="arrow">→</span>

                  </Link>

                </div>

              </div>



              <div className="re-right-content">

                <div className="re-3d-model-container">

                  <img src="/images/isometric_house_transparent.png" alt="3D Real Estate Model" className="re-3d-image" />

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* ===== INTERACTIVE SERVICES PREVIEW ===== */}

      <section ref={interactiveServicesRef} className="interactive-services" id="home-services-section">

        <div className="interactive-services__pinned">

          

          <div className="home-services__header">

            <span className="section-label">What We Do</span>

            <h2>Our Expertise</h2>

          </div>



          <div className="is-content">

            {/* Left side: Num and Title */}

            <div className="is-left">

              {services.map((service, i) => (

                <div key={`left-${i}`} className={`is-text-container ${i === 0 ? "active" : ""}`} style={{ left: 0 }}>

                  <div className="is-num">{service.num}</div>

                  <h3 className="is-title">{service.title}</h3>

                </div>

              ))}

            </div>



            {/* Center: Images */}

            <div className="is-center">

              {services.map((service, i) => (

                <div key={`img-${i}`} className={`is-image-container ${i === 0 ? "active" : ""}`}>

                  <img src={service.image} alt={service.title} className="is-image" />

                </div>

              ))}

            </div>



            {/* Right side: Desc and CTA */}

            <div className="is-right">

              {services.map((service, i) => (

                <div key={`right-${i}`} className={`is-text-container ${i === 0 ? "active" : ""}`} style={{ right: 0 }}>

                  <p className="is-desc">{service.desc}</p>

                  <Link to="/services" className="btn-arrow" style={{ marginTop: "30px", display: "inline-flex" }}>

                    Explore All Services

                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: "20px", marginLeft: "10px" }}>

                      <path d="M5 12h14M12 5l7 7-7 7"/>

                    </svg>

                  </Link>

                </div>

              ))}

            </div>

          </div>



        </div>

      </section>



      {/* ===== PROJECTS HORIZONTAL SCROLL ===== */}

      <section ref={projectsRef} className="home-projects" id="home-projects-section">

        <div className="home-projects__track">

          <div className="home-projects__intro">

            <span className="section-label">Featured Work</span>

            <h2>Selected<br />Projects</h2>

            <p>A curated collection of our most impactful exterior architecture and landscape design projects.</p>

          </div>



          {featuredProjects.map((project, i) => (

            <Link to="/projects" key={project.id} className="home-project-card hover-target">

              <div className="home-project-card__image-wrapper overflow-hidden w-full h-full rounded-xl">

                <img src={project.image} alt={project.title} className="home-project-card__image w-full h-full object-cover max-w-full" />

                <div className="home-project-card__overlay"></div>

              </div>

              <div className="home-project-card__info">

                <span className="home-project-card__category">{project.category}</span>

                <h3 className="home-project-card__title">{project.title}</h3>

                <span className="home-project-card__location">{project.location}</span>

              </div>

              <span className="home-project-card__num">0{i + 1}</span>

            </Link>

          ))}



          <div className="home-projects__end">

            <Link to="/projects" className="btn btn-primary">

              <span>View All Projects</span>

            </Link>

          </div>

        </div>

      </section>







      {/* ===== CTA ===== */}

      <section ref={ctaRef} className="home-cta section" id="home-cta-section">

        <div className="home-cta__bg overflow-hidden w-full h-full absolute inset-0">

          <img src="/images/project-hillside.png" alt="Architecture project" className="home-cta__bg-image w-full h-full object-cover max-w-full" />

          <div className="home-cta__bg-overlay"></div>

        </div>

        <div className="container home-cta__content">

          <span className="section-label">Start Your Journey</span>

          <h2>Ready to Transform<br />Your Vision?</h2>

          <p>

            Every masterpiece begins with a conversation. Let's discuss how 

            Farasha Design Studio can bring your architectural dreams to life.

          </p>

          <Link to="/contact" className="btn btn-primary">

            <span>Get in Touch</span>

          </Link>

        </div>

      </section>

    </div>

  )

}

