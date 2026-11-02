import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './AboutLogoStory.css'

export default function AboutLogoStory() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const videoRef = useRef(null)
  const bgVideoRef = useRef(null)
  const [ripples, setRipples] = useState([])
  const [isMuted, setIsMuted] = useState(true)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768
    }
    return false
  })

  // Detect mobile vs desktop screen
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Trigger ripple shockwave on click
  const triggerRipple = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e ? e.clientX - rect.left : rect.width * 0.5
    const y = e ? e.clientY - rect.top : rect.height * 0.5
    const id = Date.now() + Math.random()
    setRipples((prev) => [...prev.slice(-4), { id, x, y }])
  }

  // Replay featured logo video
  const handleReplay = (e) => {
    if (e) e.stopPropagation()
    const video = videoRef.current
    if (video) {
      video.currentTime = 0
      video.play()
    }
    triggerRipple()
  }

  // Toggle Sound
  const toggleSound = (e) => {
    if (e) e.stopPropagation()
    const nextMuted = !isMuted
    setIsMuted(nextMuted)
    if (videoRef.current) {
      videoRef.current.muted = nextMuted
    }
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

      tl.from('.logo-hero__backdrop-video-wrapper', {
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
      })
      .from('.logo-story__badge', {
        y: 25,
        opacity: 0,
        duration: 0.8,
      }, '-=0.8')
      .from('.logo-story__title', {
        y: 35,
        opacity: 0,
        duration: 0.9,
      }, '-=0.7')
      .from('.logo-story__cinema-stage', {
        y: 30,
        opacity: 0,
        scale: 0.98,
        duration: 0.9,
      }, '-=0.6')
      .from('.logo-story__lead', {
        y: 25,
        opacity: 0,
        duration: 0.8,
      }, '-=0.5')
      .from('.logo-story__paragraphs p', {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
      }, '-=0.5')
      .from('.logo-story__stamp', {
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
      }, '-=0.4')
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const videoSource = isMobile
    ? '/videos/logo-animation-mobile.mp4'
    : '/videos/logo-animation-desktop.mp4'

  return (
    <section 
      className="about-logo-hero section" 
      ref={containerRef} 
      id="logo-hero"
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
      {/* AMBIENT BACKGROUND LOGO ANIMATION VIDEO (WATERMARK GLOW)   */}
      {/* ========================================================= */}
      <div className="logo-hero__backdrop-video-wrapper">
        <video
          ref={bgVideoRef}
          key={`bg-${isMobile ? 'mobile' : 'desktop'}`}
          className="logo-backdrop__video"
          src={videoSource}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        <div className="logo-backdrop__vignette"></div>
      </div>

      {/* ========================================================= */}
      {/* FOREGROUND CONTENT: LOGO STORY & CINEMATIC VIDEO STAGE    */}
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

          {/* ========================================================= */}
          {/* FEATURED LOGO ANIMATION CINEMA PORTAL                     */}
          {/* ========================================================= */}
          <div 
            className="logo-story__cinema-stage"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`cinema-stage__frame ${isMobile ? 'cinema-stage__frame--mobile' : 'cinema-stage__frame--desktop'}`}>
              <video
                ref={videoRef}
                key={`cinema-${isMobile ? 'mobile' : 'desktop'}`}
                className="cinema-stage__video"
                src={videoSource}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="auto"
              />
              <div className="cinema-stage__overlay-gradient"></div>

              {/* Corner Architectural Brackets */}
              <div className="cinema-corner cc-tl"></div>
              <div className="cinema-corner cc-tr"></div>
              <div className="cinema-corner cc-bl"></div>
              <div className="cinema-corner cc-br"></div>

              {/* Top Tag */}
              <div className="cinema-stage__tag">
                <span className="tag-dot"></span>
                <span>FARASHA LOGO ANIMATION</span>
              </div>

              {/* Interactive Player Controls */}
              <div className="cinema-stage__controls">
                <button 
                  type="button" 
                  className="cinema-control-btn" 
                  onClick={handleReplay}
                  aria-label="Replay animation"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M1 4v6h6M23 20v-6h-6"/>
                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                  </svg>
                  <span>Replay</span>
                </button>

                <button 
                  type="button" 
                  className="cinema-control-btn" 
                  onClick={toggleSound}
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                >
                  {isMuted ? (
                    <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <line x1="23" y1="9" x2="17" y2="15"></line>
                        <line x1="17" y1="9" x2="23" y2="15"></line>
                      </svg>
                      <span>Unmute</span>
                    </>
                  ) : (
                    <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                      </svg>
                      <span>Mute</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

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
