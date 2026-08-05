import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)


export default function Contact() {
  const pageRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo('.contact-hero__title-line', 
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.3,
        }
      )

      gsap.fromTo('.contact-hero__desc', 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.8,
        }
      )


      // Form
      gsap.fromTo('.contact-form__inner > *', 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 75%',
          }
        }
      )

    }, pageRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    // In production, this would send the form data to a backend
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section className="contact-hero section" id="contact-hero">
        <div className="container">
          <span className="section-label">Contact Us</span>
          <h1 className="contact-hero__title">
            <span className="contact-hero__title-line">Let's Build</span>
            <span className="contact-hero__title-line contact-hero__title-line--accent">Together</span>
          </h1>
          <p className="contact-hero__desc">
            Every extraordinary space starts with a conversation. Whether you have 
            a clear vision or a seed of an idea, we'd love to hear from you.
          </p>
        </div>
      </section>


      {/* Form */}
      <section className="contact-form section" id="contact-form">
        <div className="container contact-form__grid">
          <div className="contact-form__text">
            <span className="section-label">Start a Project</span>
            <h2>Tell Us About<br />Your <em>Vision</em></h2>
            <p>
              Fill out the form and our team will get back to you within 24 hours.
              We're excited to learn about your project and explore how we can 
              bring your vision to life.
            </p>

            <div className="contact-form__quote">
              <blockquote>
                "Architecture should speak of its time and place, but yearn for timelessness."
              </blockquote>
              <cite>— Frank Gehry</cite>
            </div>
          </div>

          <div className="contact-form__inner">
            {submitted ? (
              <div className="contact-form__success">
                <span className="contact-form__success-icon">✓</span>
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. We'll get back to you within 24 hours.</p>
                <button className="btn" onClick={() => setSubmitted(false)}>
                  <span>Send Another Message</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-input"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-input"
                      placeholder="+971 973 115 1543"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="service" className="form-label">Service Interested In</label>
                    <select
                      id="service"
                      name="service"
                      className="form-input form-select"
                      value={formData.service}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a service</option>
                      <option value="exterior">Exterior Design</option>
                      <option value="landscape">Landscape Architecture</option>
                      <option value="facade">Facade Engineering</option>
                      <option value="urban">Urban Planning</option>
                      <option value="visualization">3D Visualization</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="budget" className="form-label">Estimated Budget</label>
                  <select
                    id="budget"
                    name="budget"
                    className="form-input form-select"
                    value={formData.budget}
                    onChange={handleChange}
                  >
                    <option value="">Select budget range</option>
                    <option value="50-100k">₹50L – ₹1 Cr</option>
                    <option value="100-500k">₹1 Cr – ₹5 Cr</option>
                    <option value="500k-1m">₹5 Cr – ₹10 Cr</option>
                    <option value="1m+">₹10 Cr+</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-input form-textarea"
                    placeholder="Tell us about your project, site, and vision..."
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary form-submit">
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="contact-map" id="contact-map">
        <div className="contact-map__content">
          <div className="contact-map__overlay">
            <h3>Mumbai, Maharashtra</h3>
            <p>42 Archway Road, Suite 200</p>
          </div>
          <div className="contact-map__visual">
            <div className="contact-map__grid-line contact-map__grid-line--h"></div>
            <div className="contact-map__grid-line contact-map__grid-line--v"></div>
            <div className="contact-map__pin">
              <span></span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links / Icons */}
      <section className="contact-quick-links" style={{ padding: '4rem 0', background: 'var(--clr-bg-tertiary)', textAlign: 'center' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          <a href="#" className="contact-icon-btn" aria-label="Location">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </a>
          <a href="#" className="contact-icon-btn" aria-label="Email">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </a>
          <a href="#" className="contact-icon-btn" aria-label="Call">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </a>
        </div>
      </section>
    </div>
  )
}
