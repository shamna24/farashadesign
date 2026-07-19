import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Home.css'

gsap.registerPlugin(ScrollTrigger)

const featuredProjects = [
  {
    id: 1,
    title: 'Modern Villa',
    category: 'Residential',
    location: 'Client Project',
    image: '/images/project-client-1.jpg',
  },
  {
    id: 2,
    title: 'Luxury Estate',
    category: 'Residential',
    location: 'Client Project',
    image: '/images/project-client-2.jpg',
  },
  {
    id: 3,
    title: 'Urban Residence',
    category: 'Urban',
    location: 'Client Project',
    image: '/images/project-client-3.jpg',
  },
  {
    id: 4,
    title: 'Serene Retreat',
    category: 'Residential',
    location: 'Client Project',
    image: '/images/project-client-4.jpg',
  },
]



const services = [
  {
    num: '01',
    title: 'Exterior Design',
    desc: 'Transforming visions into architectural masterpieces that define skylines and elevate living.',
    image: '/images/exp-1.png'
  },
  {
    num: '02',
    title: 'Landscape Architecture',
    desc: 'Creating harmonious outdoor environments that seamlessly blend nature with design intent.',
    image: '/images/exp-2.png'
  },
  {
    num: '03',
    title: 'Facade Engineering',
    desc: 'Engineering innovative building envelopes that balance aesthetics, performance, and sustainability.',
    image: '/images/exp-3.png'
  },
  {
    num: '04',
    title: 'Urban Planning',
    desc: 'Designing integrated urban experiences that foster community, culture, and connectivity.',
    image: '/images/exp-4.png'
  },
]

export default function Home() {
  const heroRef = useRef(null)
  const introVideoContainerRef = useRef(null)
  const introVideoRef = useRef(null)
  const introText1Ref = useRef(null)
  const introText2Ref = useRef(null)
  const aboutRef = useRef(null)
  const interactiveServicesRef = useRef(null)
  const projectsRef = useRef(null)

  const ctaRef = useRef(null)

  useEffect(() => {
    let scrollTimeout;
    const ctx = gsap.context((self) => {

      // Hero animations
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      heroTl
        .from('.hero__title-line', { y: 100, opacity: 0, duration: 1, stagger: 0.15 }, '+=0.2')
        .from('.hero__subtitle', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
        .from('.hero__cta-group', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
        .from('.hero__scroll-indicator', { opacity: 0, duration: 1 }, '-=0.3')

      // Video scroll animation (Intro) - Removed for now as requested.

      // Hero parallax
      gsap.fromTo('.hero__bg-image',
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top', // Start immediately since it's the first section again
            end: 'bottom top',
            scrub: true,
          }
        }
      )

      // About section
      gsap.from('.ach-photo', {
        x: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 70%',
        }
      })

      gsap.from('.ach-title, .ach-bottom > *', {
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

      // Interactive Services Scroll
      if (interactiveServicesRef.current) {
        ScrollTrigger.create({
          trigger: interactiveServicesRef.current,
          pin: true,
          start: 'top top',
          end: '+=300%',
          onUpdate: (self) => {
            const progress = self.progress;
            let idx = Math.floor(progress * 4);
            if (idx >= 4) idx = 3;
            
            const leftItems = document.querySelectorAll('.is-left .is-text-container');
            const rightItems = document.querySelectorAll('.is-right .is-text-container');
            const centerItems = document.querySelectorAll('.is-center .is-image-container');
            
            leftItems.forEach((el, i) => {
              if (i === idx) el.classList.add('active');
              else el.classList.remove('active');
            });
            rightItems.forEach((el, i) => {
              if (i === idx) el.classList.add('active');
              else el.classList.remove('active');
            });
            centerItems.forEach((el, i) => {
              if (i === idx) el.classList.add('active');
              else el.classList.remove('active');
            });
          }
        })
      }

      // Projects — horizontal scroll
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
      if (scrollTimeout) {
         gsap.ticker.remove(scrollTimeout);
      }
    }
  }, [])

  return (
    <div ref={heroRef}>
      {/* ===== HERO ===== */}
      <section className="hero section" id="hero-section">
        <div className="hero__bg overflow-hidden">
          <img src="/images/hero-villa.png" alt="Modern luxury villa" className="hero__bg-image" />
          <div className="hero__bg-overlay"></div>
          <div className="hero__bg-grain"></div>
        </div>

        <div className="container hero__content">
          <h1 className="hero__title">
            <span className="hero__title-line">Where Vision</span>
            <span className="hero__title-line hero__title-line--accent">Meets</span>
            <span className="hero__title-line">Landscape</span>
          </h1>
          <p className="hero__subtitle">
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

        <div className="hero__scroll-indicator">
          <span>Scroll</span>
          <div className="hero__scroll-line">
            <div className="hero__scroll-dot"></div>
          </div>
        </div>


      </section>

      {/* ===== ABOUT PREVIEW ===== */}
      <section ref={aboutRef} className="home-about section" id="home-about-section">
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="ach-card">
            <div className="ach-left-content">
              <h2 className="ach-title">
                OUR<br/>
                <span className="ach-title-line2">STUDIO</span>
              </h2>
              
              <div className="ach-bottom">
                <p className="ach-desc">
                  At Farasha Design Studio, we believe that exceptional exterior architecture is born from the harmony between human ambition and nature's canvas. Our team of visionary architects and landscape designers brings over a decade of expertise to every project.
                  <br/><br/>
                  From sprawling residential estates to iconic commercial facades, we approach each commission as a unique opportunity to push the boundaries of what's possible.
                </p>
                <Link to="/about" className="btn-arrow" style={{ marginTop: '20px', display: 'inline-flex' }}>
                  Learn Our Story
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px', marginLeft: '10px' }}>
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>

            <div className="ach-right-content">
              <img src="/images/project-modern-home.png" alt="Our Studio" className="ach-photo" />
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
                <div key={`left-${i}`} className="is-text-container" style={{ left: 0 }}>
                  <div className="is-num">{service.num}</div>
                  <h3 className="is-title">{service.title}</h3>
                </div>
              ))}
            </div>

            {/* Center: Images */}
            <div className="is-center">
              {services.map((service, i) => (
                <div key={`img-${i}`} className="is-image-container">
                  <img src={service.image} alt={service.title} className="is-image" />
                </div>
              ))}
            </div>

            {/* Right side: Desc and CTA */}
            <div className="is-right">
              {services.map((service, i) => (
                <div key={`right-${i}`} className="is-text-container" style={{ right: 0 }}>
                  <p className="is-desc">{service.desc}</p>
                  <Link to="/services" className="btn-arrow" style={{ marginTop: '30px', display: 'inline-flex' }}>
                    Explore All Services
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px', marginLeft: '10px' }}>
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
