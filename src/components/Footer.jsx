import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import './Footer.css'

export default function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer__content > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        }
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="footer" id="footer">
      <div className="footer__top-line"></div>
      <div className="container footer__content">
        <div className="footer__brand-col">
          <Link to="/" className="footer__brand">
            <span className="footer__brand-name">Farasha</span>
            <span className="footer__brand-sub">Design Studio</span>
          </Link>
          <p className="footer__tagline">
            Crafting exterior spaces that transcend the ordinary.
            Architecture that speaks to the soul.
          </p>
        </div>

        <div className="footer__links-col">
          <h4 className="footer__col-title">Navigate</h4>
          <Link to="/" className="footer__link">Home</Link>
          <Link to="/about" className="footer__link">About Us</Link>
          <Link to="/services" className="footer__link">Services</Link>
          <Link to="/projects" className="footer__link">Projects</Link>
          <Link to="/contact" className="footer__link">Contact</Link>
        </div>

        <div className="footer__links-col">
          <h4 className="footer__col-title">Services</h4>
          <Link to="/services" className="footer__link">Exterior Design</Link>
          <Link to="/services" className="footer__link">Landscape Architecture</Link>
          <Link to="/services" className="footer__link">Facade Engineering</Link>
          <Link to="/services" className="footer__link">Urban Planning</Link>
          <Link to="/services" className="footer__link">3D Visualization</Link>
        </div>

        <div className="footer__contact-col">
          <h4 className="footer__col-title">Connect</h4>
          <a href="mailto:hello@farashadesign.com" className="footer__link">hello@farashadesign.com</a>
          <a href="tel:+9719731151543" className="footer__link">+971 973 115 1543</a>
          <div className="footer__social">
            <a href="#" className="footer__social-link" aria-label="Instagram">IG</a>
            <a href="#" className="footer__social-link" aria-label="LinkedIn">LI</a>
            <a href="#" className="footer__social-link" aria-label="Pinterest">PI</a>
            <a href="#" className="footer__social-link" aria-label="Behance">BE</a>
          </div>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>&copy; {new Date().getFullYear()} Farasha Design Studio. All rights reserved.</p>
        <a 
          href="https://www.instagram.com/intellex.web?igsh=MTVlYjBid3gwbHBmZw==" 
          target="_blank" 
          rel="noopener noreferrer"
          className="footer__dev-link"
        >
          MEET THE DEVELOPERS
        </a>
      </div>
    </footer>
  )
}
