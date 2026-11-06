import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './AboutLogoStory.css'

export default function AboutLogoStory() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const bgLogoRef = useRef(null)
  const [ripples, setRipples] = useState([])

  // Trigger ripple shockwave on click
  const triggerRipple = (e) => {
    const rect = containerRef.current.getBoundingClientRect()
    const x = e ? e.clientX - rect.left : rect.width * 0.5
    const y = e ? e.clientY - rect.top : rect.height * 0.5
    const id = Date.now() + Math.random()
    setRipples((prev) => [...prev.slice(-4), { id, x, y }])
  }

  // 3D Parallax Tilt with Mouse on Background Logo
  const handleMouseMove = (e) => {
    if (!bgLogoRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    bgLogoRef.current.style.transform = `translate(-50%, -50%) perspective(1400px) rotateY(${x * 18}deg) rotateX(${-y * 18}deg) scale(1.02)`
  }

  const handleMouseLeave = () => {
    if (!bgLogoRef.current) return
    bgLogoRef.current.style.transform = 'translate(-50%, -50%) perspective(1400px) rotateY(0deg) rotateX(0deg) scale(1)'
  }

  // Floating Golden Particles Canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', handleResize)

    const particleCount = 45
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.6,
      speedY: Math.random() * 0.35 + 0.15,
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.55 + 0.15,
      pulse: Math.random() * Math.PI,
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach((p) => {
        p.y -= p.speedY
        p.x += p.speedX
        p.pulse += 0.02
        if (p.y < -10) p.y = height + 10
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10

        const currentOpacity = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212, 175, 55, ${currentOpacity})`
        ctx.shadowColor = 'rgba(212, 175, 55, 0.6)'
        ctx.shadowBlur = 8
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Initial Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.logo-hero__backdrop-logo', {
        scale: 0.85,
        opacity: 0,
        duration: 1.4,
      })
      .from('.logo-story__badge', {
        y: 25,
        opacity: 0,
        duration: 0.8,
      }, '-=0.9')
      .from('.logo-story__title', {
        y: 35,
        opacity: 0,
        duration: 0.9,
      }, '-=0.7')
      .from('.logo-story__lead', {
        y: 30,
        opacity: 0,
        duration: 0.85,
      }, '-=0.6')
      .from('.logo-story__paragraphs p', {
        y: 25,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
      }, '-=0.6')
      .from('.logo-story__stamp', {
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
      }, '-=0.4')
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      className="about-logo-hero section" 
      ref={containerRef} 
      id="logo-hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={triggerRipple}
    >
      {/* Background Interactive Particles Canvas */}
      <canvas ref={canvasRef} className="logo-hero__canvas" />

      {/* Ambient Radial Golden Glow */}
      <div className="logo-hero__ambient-glow"></div>
      <div className="logo-hero__ambient-spotlight"></div>

      {/* Screen-Wide Click Ripples */}
      <div className="logo-hero__ripple-container">
        {ripples.map((r) => (
          <span 
            key={r.id} 
            className="logo-hero__click-wave" 
            style={{ left: `${r.x}px`, top: `${r.y}px` }} 
          />
        ))}
      </div>

      {/* ========================================================= */}
      {/* MONUMENTAL BACKGROUND LOGO (Watermark & 3D Parallax Emblem) */}
      {/* ========================================================= */}
      <div className="logo-hero__backdrop-logo" ref={bgLogoRef}>
        <svg 
          className="logo-backdrop__svg" 
          viewBox="0 0 540 540" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bgGold1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF4DC" />
              <stop offset="35%" stopColor="#E5C388" />
              <stop offset="70%" stopColor="#C9A96E" />
              <stop offset="100%" stopColor="#8A6628" />
            </linearGradient>

            <linearGradient id="bgGold2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFE5B0" />
              <stop offset="45%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#755219" />
            </linearGradient>

            <linearGradient id="bgGold3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FDEBC8" />
              <stop offset="50%" stopColor="#BFA056" />
              <stop offset="100%" stopColor="#634516" />
            </linearGradient>

            <linearGradient id="bgGold4" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FFF8EB" />
              <stop offset="40%" stopColor="#D8B570" />
              <stop offset="100%" stopColor="#967028" />
            </linearGradient>

            <linearGradient id="bgBodyGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#FFF9EE" />
              <stop offset="100%" stopColor="#8A6628" />
            </linearGradient>
          </defs>

          {/* Concentric Butterfly Effect Ripples */}
          <g className="logo-backdrop__ripples">
            <circle className="epic-ripple r-1" cx="270" cy="270" r="140" />
            <circle className="epic-ripple r-2" cx="270" cy="270" r="185" />
            <circle className="epic-ripple r-3" cx="270" cy="270" r="230" />
            <circle className="epic-ripple r-4" cx="270" cy="270" r="275" />
            <circle className="epic-ripple r-5" cx="270" cy="270" r="320" />
          </g>

          {/* Architectural Monogram Framing Lines */}
          <g className="logo-backdrop__frame">
            <text 
              x="160" 
              y="142" 
              fill="#FFFFFF" 
              fontFamily="var(--ff-accent)" 
              fontSize="24" 
              fontWeight="600" 
              letterSpacing="0.04em"
            >
              farasha.
            </text>

            <path 
              d="M 160 160 L 255 160 M 160 160 L 160 260 M 160 212 L 210 212" 
              stroke="#FFFFFF" 
              strokeWidth="5" 
              strokeLinecap="square" 
              fill="none" 
            />

            <path 
              d="M 285 160 L 380 160 L 380 320" 
              stroke="#FFFFFF" 
              strokeWidth="5" 
              strokeLinecap="square" 
              fill="none" 
            />

            <path 
              d="M 160 285 L 160 380 L 255 380" 
              stroke="#FFFFFF" 
              strokeWidth="5" 
              strokeLinecap="square" 
              fill="none" 
            />

            <path 
              d="M 336 334 L 380 334 L 380 357 L 336 357 L 336 380 L 380 380" 
              stroke="#FFFFFF" 
              strokeWidth="5" 
              strokeLinecap="square" 
              strokeLinejoin="miter" 
              fill="none" 
            />

            <text 
              x="270" 
              y="418" 
              textAnchor="middle" 
              fill="#FFFFFF" 
              fontFamily="var(--ff-accent)" 
              fontSize="17" 
              fontWeight="400" 
              letterSpacing="0.16em"
            >
              des/gn • stud/o
            </text>
          </g>

                    {/* Centered 3D Architectural Butterfly Logo */}
          <g className="logo-backdrop__butterfly">
            {/* Left Wing Architectural Facets */}
            <g className="epic-wing wing-left">
              {/* Top Roof Plane */}
              <polygon 
                className="butterfly-facet facet-left f-top" 
                points="124.5,182.6 125.7,225.2 140.6,240.1 209.6,263.1 255.6,238.9 132.6,179.2" 
                fill="url(#bgGold1)" 
                stroke="rgba(235, 215, 175, 0.6)" 
                strokeWidth="1.2"
              />
              {/* Outer Wall */}
              <polygon 
                className="butterfly-facet facet-left f-outer" 
                points="206.2,274.6 163.6,278.1 164.8,358.6 206.2,337.9" 
                fill="url(#bgGold2)" 
                stroke="rgba(212, 175, 55, 0.5)" 
                strokeWidth="1.2"
              />
              {/* Inner Wall */}
              <polygon 
                className="butterfly-facet facet-left f-inner" 
                points="252.2,244.7 209.6,266.6 208.5,335.6 251.0,311.4" 
                fill="url(#bgGold3)" 
                stroke="rgba(212, 175, 55, 0.5)" 
                strokeWidth="1.2"
              />
            </g>

            {/* Right Wing Architectural Facets */}
            <g className="epic-wing wing-right">
              {/* Top Roof Plane */}
              <polygon 
                className="butterfly-facet facet-right f-top" 
                points="414.3,183.8 398.2,182.6 285.5,238.9 330.4,263.1 401.7,238.9 414.3,220.6" 
                fill="url(#bgGold1)" 
                stroke="rgba(235, 215, 175, 0.6)" 
                strokeWidth="1.2"
              />
              {/* Inner Wall */}
              <polygon 
                className="butterfly-facet facet-right f-inner" 
                points="289.0,244.7 290.1,311.4 330.4,336.7 330.4,267.7" 
                fill="url(#bgGold3)" 
                stroke="rgba(212, 175, 55, 0.5)" 
                strokeWidth="1.2"
              />
              {/* Outer Wall */}
              <polygon 
                className="butterfly-facet facet-right f-outer" 
                points="333.8,274.6 332.7,337.9 371.8,359.7 375.2,276.9" 
                fill="url(#bgGold2)" 
                stroke="rgba(212, 175, 55, 0.5)" 
                strokeWidth="1.2"
              />
            </g>

            {/* Logo Typography in Parallax Tilt */}
            <text 
              x="270" 
              y="420" 
              textAnchor="middle" 
              fill="url(#bgGold1)" 
              fontFamily="var(--ff-heading)" 
              fontSize="32" 
              letterSpacing="12"
              style={{ fontWeight: 400 }}
            >
              FARASHA
            </text>
            <text 
              x="270" 
              y="455" 
              textAnchor="middle" 
              fill="var(--clr-text-muted)" 
              fontFamily="var(--ff-body)" 
              fontSize="13" 
              letterSpacing="6"
              style={{ opacity: 0.8 }}
            >
              des/gn • stud/o
            </text>
          </g>
        </svg>
      </div>

      {/* ========================================================= */}
      {/* FOREGROUND CONTENT: LOGO STORY & CLIENT TEXT             */}
      {/* ========================================================= */}
      <div className="container logo-hero__container">
        <div className="logo-story__wrapper">
          
          {/* Studio Identity Tag */}
          <div className="logo-story__badge">
            <span className="logo-story__arabic" dir="rtl" lang="ar">فَرَاشَة</span>
            <span className="badge-divider">•</span>
            <span className="badge-name">FARASHA</span>
            <span className="badge-divider">•</span>
            <span className="badge-phonetic">[fah-rah-shah]</span>
            <span className="badge-divider">•</span>
            <span className="badge-desc">Arabic for <em>Butterfly</em></span>
          </div>

          {/* Heading */}
          <h2 className="logo-story__title">
            The Story Behind <em>Our Identity</em>
          </h2>

          {/* Lead Paragraph */}
          <p className="logo-story__lead">
            Farasha means “butterfly” in Arabic. For two architects starting a studio while the world stood still, a little movement felt like a good place to begin.
          </p>

          {/* Body Paragraphs */}
          <div className="logo-story__paragraphs">
            <p>
              One small decision to keep creating together set a wave of change in motion—today, we’re designing spaces we love, for the lives you build within them.
            </p>

            <p>
              Our logo takes its inspiration from the butterfly effect—the idea that a small change can lead to something much bigger. Our own beginning was a little like that: a few projects, plenty of conversations, and a shared love for creating.
            </p>

            <p>
              That idea carries into our work. It’s also how we approach design: sometimes, the smallest design decision changes how an entire space feels—a thoughtful detail, a shift in light, a favourite corner can transform how a home feels.
            </p>

            <p>
              We enjoy finding those moments—and, admittedly, overthinking them until they feel effortless.
            </p>
          </div>

          {/* Signature Conclusion */}
          <div className="logo-story__stamp">
            <span className="stamp-line"></span>
            <span className="stamp-text">Small changes. Big impact.</span>
            <span className="stamp-line"></span>
          </div>


        </div>
      </div>
    </section>
  )
}
