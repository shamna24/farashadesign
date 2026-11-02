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

          {/* Centered 3D Faceted Golden Butterfly */}
          <g className="logo-backdrop__butterfly">
            <g className="epic-body">
              <path 
                d="M 269 236 Q 260 214 246 216 M 271 236 Q 280 214 294 216" 
                stroke="url(#bgGold1)" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                fill="none" 
              />
              <polygon points="270,232 274,242 270,250 266,242" fill="url(#bgGold1)" stroke="#DFC08A" strokeWidth="0.8" />
              <polygon points="270,250 274,262 274,285 273,308 270,320 267,308 266,285 266,262" fill="url(#bgBodyGold)" stroke="#DFC08A" strokeWidth="0.8" />
            </g>

            {/* Left Wing Facets */}
            <g className="epic-wing wing-left">
              <polygon className="butterfly-facet facet-left f-1" points="268,258 235,230 205,200" fill="url(#bgGold1)" />
              <polygon className="butterfly-facet facet-left f-2" points="235,230 182,225 205,200" fill="url(#bgGold2)" />
              <polygon className="butterfly-facet facet-left f-3" points="235,230 215,245 182,225" fill="url(#bgGold3)" />
              <polygon className="butterfly-facet facet-left f-4" points="215,245 188,255 182,225" fill="url(#bgGold4)" />
              <polygon className="butterfly-facet facet-left f-5" points="215,245 188,255 215,268" fill="url(#bgGold2)" />
              <polygon className="butterfly-facet facet-left f-6" points="235,230 215,245 245,260" fill="url(#bgGold1)" />
              <polygon className="butterfly-facet facet-left f-7" points="215,245 245,260 215,268" fill="url(#bgGold3)" />
              <polygon className="butterfly-facet facet-left f-8" points="268,258 235,230 245,260" fill="url(#bgGold4)" />
              <polygon className="butterfly-facet facet-left f-9" points="268,258 267,278 245,260" fill="url(#bgGold1)" />
              <polygon className="butterfly-facet facet-left f-10" points="267,278 215,268 235,285" fill="url(#bgGold2)" />
              <polygon className="butterfly-facet facet-left f-11" points="215,268 200,290 235,285" fill="url(#bgGold3)" />
              <polygon className="butterfly-facet facet-left f-12" points="200,290 218,325 235,285" fill="url(#bgGold4)" />
              <polygon className="butterfly-facet facet-left f-13" points="218,325 250,300 235,285" fill="url(#bgGold1)" />
              <polygon className="butterfly-facet facet-left f-14" points="218,325 245,320 250,300" fill="url(#bgGold2)" />
              <polygon className="butterfly-facet facet-left f-15" points="267,278 235,285 250,300" fill="url(#bgGold3)" />
              <polygon className="butterfly-facet facet-left f-16" points="267,278 268,298 250,300" fill="url(#bgGold4)" />
              <polygon className="butterfly-facet facet-left f-17" points="268,298 245,320 250,300" fill="url(#bgGold2)" />
              <polygon className="butterfly-facet facet-left f-18" points="268,298 270,318 245,320" fill="url(#bgGold1)" />
            </g>

            {/* Right Wing Facets */}
            <g className="epic-wing wing-right">
              <polygon className="butterfly-facet facet-right f-1" points="272,258 305,230 335,200" fill="url(#bgGold3)" />
              <polygon className="butterfly-facet facet-right f-2" points="305,230 358,225 335,200" fill="url(#bgGold4)" />
              <polygon className="butterfly-facet facet-right f-3" points="305,230 325,245 358,225" fill="url(#bgGold2)" />
              <polygon className="butterfly-facet facet-right f-4" points="325,245 352,255 358,225" fill="url(#bgGold1)" />
              <polygon className="butterfly-facet facet-right f-5" points="325,245 352,255 325,268" fill="url(#bgGold3)" />
              <polygon className="butterfly-facet facet-right f-6" points="305,230 325,245 295,260" fill="url(#bgGold4)" />
              <polygon className="butterfly-facet facet-right f-7" points="325,245 295,260 325,268" fill="url(#bgGold1)" />
              <polygon className="butterfly-facet facet-right f-8" points="272,258 305,230 295,260" fill="url(#bgGold2)" />
              <polygon className="butterfly-facet facet-right f-9" points="272,258 273,278 295,260" fill="url(#bgGold3)" />
              <polygon className="butterfly-facet facet-right f-10" points="273,278 325,268 305,285" fill="url(#bgGold4)" />
              <polygon className="butterfly-facet facet-right f-11" points="325,268 340,290 305,285" fill="url(#bgGold1)" />
              <polygon className="butterfly-facet facet-right f-12" points="340,290 322,325 305,285" fill="url(#bgGold2)" />
              <polygon className="butterfly-facet facet-right f-13" points="322,325 290,300 305,285" fill="url(#bgGold3)" />
              <polygon className="butterfly-facet facet-right f-14" points="322,325 295,320 290,300" fill="url(#bgGold4)" />
              <polygon className="butterfly-facet facet-right f-15" points="273,278 305,285 290,300" fill="url(#bgGold2)" />
              <polygon className="butterfly-facet facet-right f-16" points="273,278 272,298 290,300" fill="url(#bgGold1)" />
              <polygon className="butterfly-facet facet-right f-17" points="272,298 295,320 290,300" fill="url(#bgGold1)" />
              <polygon className="butterfly-facet facet-right f-18" points="272,298 270,318 295,320" fill="url(#bgGold2)" />
            </g>
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

          {/* Interactive Hint */}
          <div className="logo-hero__interactive-hint">
            <span className="hint-pulse"></span>
            <span>Interactive Logo Background • Move cursor to tilt 3D perspective • Click anywhere to ripple</span>
          </div>

        </div>
      </div>
    </section>
  )
}
