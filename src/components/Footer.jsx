import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from './ui.jsx'
import { company, services, solutionGroups, industries } from '../data/site.js'

/* Looping video that shows only through the letters of the wordmark */
function VideoFill() {
  const ref = useRef(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return v.pause()
    // Only play while the footer is on screen
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()))
    io.observe(v)
    return () => io.disconnect()
  }, [])
  return <video ref={ref} className="fw__video" src="/footer-wordmark.mp4" muted loop playsInline preload="metadata" />
}

export default function Footer() {
  const topSolutions = solutionGroups.flatMap((g) => g.items.slice(0, 2).map((i) => [i[0], g.key])).slice(0, 10)
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <Logo />
            <div className="footer__contact">
              <a href={`mailto:${company.email}`}>✉&nbsp; {company.email}</a>
              <a href={`tel:${company.phone.replace(/\s/g, '')}`}>☏&nbsp; {company.phone}</a>
            </div>
            <div className="footer__office">
              <strong>HEAD OFFICE</strong>
              <div style={{ marginTop: 6 }}>{company.address}</div>
              <div style={{ color: '#8c8387', fontSize: 14, marginTop: 4 }}>{company.hours}</div>
            </div>
          </div>
          <div>
            <h5>Solutions</h5>
            <ul>
              {topSolutions.map(([name, key]) => (
                <li key={name}><Link to={`/solutions?group=${key}`}>{name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Industries</h5>
            <ul>
              {industries.slice(0, 10).map((i) => (
                <li key={i.title}><Link to="/industries">{i.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Services</h5>
            <ul>
              {services.map((s) => (
                <li key={s.slug}><Link to={`/services/${s.slug}`}>{s.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Quick links</h5>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/work">Our Work</Link></li>
              <li><Link to="/solutions">All Solutions</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/contact?topic=careers">Careers</Link></li>
            </ul>
            <h5 style={{ marginTop: 30 }}>Follow</h5>
            <ul>
              {company.socials.map((s) => (
                <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer">{s.label}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer__giant" aria-hidden="true">
          <svg className="fw__defs" width="0" height="0" focusable="false">
            <defs>
              <clipPath id="fw-clip" clipPathUnits="objectBoundingBox">
                <text transform="scale(0.001 0.014286)" x="0" y="66.5" fontSize="87.5" textLength="1000" lengthAdjust="spacingAndGlyphs" className="fw__word">PEARL DEVELOPERS</text>
              </clipPath>
            </defs>
          </svg>
          <VideoFill />
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} {company.legal}. All rights reserved.</span>
          <span className="links">
            <Link to="/contact">Privacy Policy</Link>
            <Link to="/contact">Terms &amp; Conditions</Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
