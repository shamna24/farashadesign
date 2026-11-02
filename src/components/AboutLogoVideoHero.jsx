import { useState, useRef, useEffect } from 'react'
import './AboutLogoVideoHero.css'

export default function AboutLogoVideoHero() {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 768 : false
  })

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Track video progress
  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (!video || !video.duration) return
    setProgress((video.currentTime / video.duration) * 100)
  }

  // Toggle play / pause
  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  // Replay from start
  const handleReplay = () => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = 0
    video.play()
    setIsPlaying(true)
  }

  return (
    <section className="about-video-hero" id="logo-video-hero">
      {/* Ambient Radial Golden Glow */}
      <div className="video-hero__ambient-glow"></div>

      <div className="container video-hero__container">
        
        {/* Header Label & Title */}
        <div className="video-hero__header">
          <div className="video-hero__badge">
            <span className="badge-glow-dot"></span>
            <span>ARCHITECTURAL METAMORPHOSIS • LOGO TO 3D MODEL</span>
          </div>

          <h1 className="video-hero__title">
            From Identity To <em>Spatial Form</em>
          </h1>

          <p className="video-hero__subtitle">
            Witness the golden Farasha butterfly emblem unfold into the physical 3D architectural pavilion.
            Small shifts in form, light, and geometry transform into a living sanctuary.
          </p>
        </div>

        {/* Video Cinema Stage */}
        <div className="video-hero__stage">
          
          {/* Architectural Blueprint Corner Accents */}
          <div className="video-corner-bracket vc-tl"></div>
          <div className="video-corner-bracket vc-tr"></div>
          <div className="video-corner-bracket vc-bl"></div>
          <div className="video-corner-bracket vc-br"></div>

          {/* Top Stage Bar */}
          <div className="video-hero__top-bar">
            <div className="stage-datum">
              <span className="datum-tag">DATUM // 01</span>
              <span className="datum-coord">25.2048° N, 55.2708° E</span>
            </div>
            <div className="stage-spec">
              <span>3D ARCHITECTURAL PAVILION MAQUETTE</span>
            </div>
          </div>

          {/* Video Player */}
          <div className="video-hero__player-wrap" onClick={togglePlay}>
            <video
              ref={videoRef}
              key={isMobile ? 'mobile-video' : 'desktop-video'}
              className="video-hero__video"
              src={isMobile ? '/videos/farasha-logo-metamorphosis-mobile.mp4' : '/videos/farasha-logo-metamorphosis.mp4'}
              muted={isMuted}
              playsInline
              autoPlay
              loop
              onTimeUpdate={handleTimeUpdate}
            />

            {/* Subtle edge vignette */}
            <div className="video-hero__vignette"></div>

            {/* Play/Pause Center Indicator when paused */}
            {!isPlaying && (
              <div className="video-hero__play-indicator">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
            )}
          </div>

          {/* Bottom Floating Control Bar */}
          <div className="video-hero__controls">
            
            {/* Scrubber Progress Bar */}
            <div 
              className="video-hero__progress-track"
              onClick={(e) => {
                e.stopPropagation()
                const rect = e.currentTarget.getBoundingClientRect()
                const clickPos = (e.clientX - rect.left) / rect.width
                if (videoRef.current && videoRef.current.duration) {
                  videoRef.current.currentTime = clickPos * videoRef.current.duration
                }
              }}
            >
              <div className="video-hero__progress-fill" style={{ width: `${progress}%` }}>
                <span className="progress-handle"></span>
              </div>
            </div>

            {/* Buttons Row */}
            <div className="video-hero__actions">
              <div className="actions-left">
                <button 
                  type="button" 
                  className="hero-ctrl-btn" 
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16"></rect>
                      <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  )}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>

                <button 
                  type="button" 
                  className="hero-ctrl-btn" 
                  onClick={handleReplay}
                  aria-label="Replay animation"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="1 4 1 10 7 10"></polyline>
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                  </svg>
                  <span>Replay</span>
                </button>
              </div>

              <div className="actions-right">
                <span className="actions-stage-tag">IDEAS  ➔  SPACES  ➔  REALITY</span>
              </div>
            </div>

          </div>
        </div>

        {/* Conceptual Tri-Pill Transformation Sequence */}
        <div className="video-hero__process-row">
          <div className="process-step">
            <span className="step-idx">STEP // 01</span>
            <h4>2D Geometric Emblem</h4>
            <p>Concentric butterfly effect ripples radiating from the golden faceted monogram.</p>
          </div>
          <div className="process-arrow">➔</div>
          <div className="process-step">
            <span className="step-idx">STEP // 02</span>
            <h4>Tectonic Extrusion</h4>
            <p>Golden wireframe lines lift into isometric perspective, forming vertical columns and roof angles.</p>
          </div>
          <div className="process-arrow">➔</div>
          <div className="process-step">
            <span className="step-idx">STEP // 03</span>
            <h4>3D Living Pavilion</h4>
            <p>The butterfly geometry manifests as a physical concrete pavilion with courtyard tree and sunlit shadows.</p>
          </div>
        </div>

      </div>
    </section>
  )
}
