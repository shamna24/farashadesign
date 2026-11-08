import { useState, useEffect, useRef } from 'react'
import './AboutLogoVideoHero.css'

export default function AboutLogoVideoHero() {
  const videoRef = useRef(null)

  const checkIsMobile = () => {
    if (typeof window === 'undefined') return false
    const isPortrait = window.innerHeight > window.innerWidth
    return window.innerWidth <= 768 || (isPortrait && window.innerWidth <= 920)
  }

  const [isMobile, setIsMobile] = useState(checkIsMobile)

  useEffect(() => {
    const handleResize = () => setIsMobile(checkIsMobile())
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  // Guarantee mobile autoplay compliance across iOS Safari & Android Chrome
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.defaultMuted = true
    video.playsInline = true
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Video auto-playback deferred:', err)
      })
    }
  }, [isMobile])

  return (
    <section className="about-video-hero" id="logo-video-hero">
      {/* Ambient Radial Golden Glow */}
      <div className="video-hero__ambient-glow"></div>

      {/* Seamless, Borderless Cinematic Video Presentation */}
      <div className="video-hero__cinema-wrap">
        <video
          key={isMobile ? 'mobile-video' : 'desktop-video'}
          ref={videoRef}
          className={`video-hero__video ${isMobile ? 'video-hero__video--mobile' : 'video-hero__video--desktop'}`}
          src={isMobile ? '/videos/farasha-logo-metamorphosis-mobile.mp4?v=4' : '/videos/farasha-logo-metamorphosis.mp4?v=4'}
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
        />

        {/* Soft edge vignette to seamlessly dissolve any boundary into the dark background */}
        <div className="video-hero__feather-top"></div>
        <div className="video-hero__feather-bottom"></div>
        <div className="video-hero__feather-sides"></div>
      </div>
    </section>
  )
}
