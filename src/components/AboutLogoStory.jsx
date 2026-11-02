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
      {/* MONUMENTAL BACKGROUND LOGO (Exact Image 3 Gold Emblem & 3D Parallax) */}
      {/* ========================================================= */}
      <div className="logo-hero__backdrop-logo" ref={bgLogoRef}>
        <img 
          src="/images/farasha_logo_gold_perfect.png" 
          alt="Farasha Logo Emblem" 
          className="logo-backdrop__img"
        />
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
