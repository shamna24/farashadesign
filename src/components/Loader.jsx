import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './Loader.css'

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const textGroupRef = useRef(null)
  const brandRef = useRef(null)
  const lineRef = useRef(null)
  const taglineRef = useRef(null)
  const videoWrapperRef = useRef(null)
  const videoRef = useRef(null)

  const [phase, setPhase] = useState('text') // 'text' | 'video' | 'exit'
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

  // Final exit animation
  const triggerExit = () => {
    if (!loaderRef.current) return
    gsap.to(loaderRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
      onComplete: () => {
        if (onComplete) onComplete()
      }
    })
  }

  // Phase 1: Animate Farasha typography intro, then transition to video
  useEffect(() => {
    const tl = gsap.timeline()

    // 1. Text reveals
    tl.to(brandRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .to(lineRef.current, {
      width: 120,
      duration: 0.8,
      ease: 'power2.inOut'
    }, '-=0.3')
    .to(taglineRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.3')
    // 2. Hold text for a moment
    .to({}, { duration: 0.6 })
    // 3. Fade out typography and switch to video phase
    .to(textGroupRef.current, {
      opacity: 0,
      scale: 0.96,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        setPhase('video')
      }
    })

    return () => tl.kill()
  }, [])

  // Phase 2: Fade in video & play 4-second animation
  useEffect(() => {
    if (phase !== 'video') return

    // Fade in video container
    if (videoWrapperRef.current) {
      gsap.fromTo(videoWrapperRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
      )
    }

    // Play video
    const video = videoRef.current
    if (video) {
      video.currentTime = 0
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Video autoplay prevented, advancing after timer:', err)
        })
      }
    }

    // Advance after 4 seconds (video length is exactly 6s)
    const timer = setTimeout(() => {
      triggerExit()
    }, 6000)

    return () => clearTimeout(timer)
  }, [phase])

  return (
    <div ref={loaderRef} className={`loader ${phase === "video" ? "loader--video-phase" : ""}`} id="site-intro-loader">
      {/* Background radial gold glow */}
      <div className="loader-ambient-glow"></div>

      {/* Skip Button */}
      <button 
        type="button" 
        className="loader-skip-btn" 
        onClick={triggerExit}
        aria-label="Skip intro animation"
      >
        <span>Skip</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      {/* PHASE 1: TYPOGRAPHY (Farasha Design Studio) */}
      <div 
        ref={textGroupRef} 
        className="loader-text-group"
        style={{ display: phase === 'video' ? 'none' : 'flex' }}
      >
        <div ref={brandRef} className="loader-brand">Farasha</div>
        <div ref={lineRef} className="loader-line"></div>
        <div ref={taglineRef} className="loader-tagline">Design Studio</div>
      </div>

      {/* PHASE 2: 4-SECOND LOGO ANIMATION VIDEO (Mobile & Desktop) */}
      {phase === 'video' && (
        <div ref={videoWrapperRef} className="loader-video-container">
          <video
            ref={videoRef}
            className={`loader-video ${isMobile ? 'loader-video--mobile' : 'loader-video--desktop'}`}
            src={isMobile ? '/videos/logo-animation-mobile.mp4' : '/videos/logo-animation-desktop.mp4'}
            muted
            playsInline
            autoPlay
            preload="auto"
            onEnded={triggerExit}
          />
          <div className="loader-video-overlay"></div>
        </div>
      )}
    </div>
  )
}
