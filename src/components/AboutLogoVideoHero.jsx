import { useState, useEffect } from 'react'
import './AboutLogoVideoHero.css'

export default function AboutLogoVideoHero() {
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 768 : false
  })

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className="about-video-hero" id="logo-video-hero">
      {/* Ambient Radial Golden Glow */}
      <div className="video-hero__ambient-glow"></div>

      {/* Seamless, Borderless Cinematic Video Presentation */}
      <div className="video-hero__cinema-wrap">
        <video
          key={isMobile ? 'mobile-video' : 'desktop-video'}
          className="video-hero__video"
          src={isMobile ? '/videos/farasha-logo-metamorphosis-mobile.mp4' : '/videos/farasha-logo-metamorphosis.mp4'}
          muted
          playsInline
          autoPlay
          loop
        />

        {/* Soft edge vignette to seamlessly dissolve any boundary into the dark background */}
        <div className="video-hero__feather-top"></div>
        <div className="video-hero__feather-bottom"></div>
        <div className="video-hero__feather-sides"></div>
      </div>
    </section>
  )
}
