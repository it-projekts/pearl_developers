import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Chevron, Logo, Arrow, ease } from './ui.jsx'
import { company, services, solutionGroups, industries, solutionCount } from '../data/site.js'

const mega = {
  company: {
    label: 'Company',
    to: '/about',
    items: [
      { title: 'About Us', text: 'Our story, people and values.', to: '/about', side: null },
      { title: 'Our Work', text: 'Selected products and client work.', to: '/work' },
      { title: 'How We Work', text: 'Our five-step delivery process.', to: '/about#process' },
      { title: 'Careers', text: 'Grow with a team that cares about craft.', to: '/contact?topic=careers' },
      { title: 'Contact Us', text: 'Talk to us about your next project.', to: '/contact' },
    ],
    promo: {
      kicker: 'Meet Pearl Developers',
      title: 'A technology partner built around your goals.',
      to: '/about',
      cta: 'Explore our company',
    },
  },
  services: {
    label: 'Services',
    to: '/services',
    items: services.map((s) => ({ title: s.title, text: s.short, to: `/services/${s.slug}`, side: s.items })),
  },
  solutions: {
    label: 'Solutions',
    to: '/solutions',
    items: solutionGroups.map((g) => ({ title: g.title, text: g.blurb, to: `/solutions?group=${g.key}`, side: g.items.map((i) => i[0]) })),
  },
  industries: {
    label: 'Industries',
    to: '/industries',
    items: industries.slice(0, 10).map((i) => ({ title: i.title, text: i.text, to: '/industries', side: i.apps })),
  },
}

function MegaMenu({ data, onClose }) {
  const [active, setActive] = useState(0)
  const item = data.items[active]
  return (
    <motion.div
      className="mega"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease }}
    >
      <div className="mega__panel">
        <div className="mega__list">
          {data.items.map((it, i) => (
            <Link key={it.title} to={it.to} className={`mega__item ${i === active ? 'is-on' : ''}`} onMouseEnter={() => setActive(i)} onClick={onClose}>
              <span className="mega__icon" style={{ backgroundPosition: `${i * 23}% 0` }}>{it.title[0]}</span>
              <span>
                <strong>{it.title}</strong>
                <small>{it.text}</small>
              </span>
            </Link>
          ))}
        </div>
        <div className="mega__side">
          <div className="mega__orb" />
          {data.promo || !item.side ? (
            <div style={{ position: 'relative' }}>
              <div className="eyebrow" style={{ color: '#e9dff0' }}>{data.promo?.kicker || data.label}</div>
              <h4 style={{ marginTop: 18 }}>{data.promo?.title || item.title}</h4>
              <p style={{ color: '#cbbfd0', maxWidth: '30ch' }}>
                {solutionCount}+ ready-made systems, custom software and AI — designed and built in-house.
              </p>
              <Link to={data.promo?.to || item.to} className="btn btn--light" onClick={onClose} style={{ marginTop: 10 }}>
                {data.promo?.cta || 'Learn more'} <Arrow dir="right" />
              </Link>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div key={item.title} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.3 }} style={{ position: 'relative' }}>
                <h4>{item.title}</h4>
                <ul>
                  {item.side.slice(0, 9).map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Header({ onOpenMenu }) {
  const [open, setOpen] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const last = useRef(0)
  const timer = useRef()
  const { pathname } = useLocation()

  useEffect(() => setOpen(null), [pathname])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(y > 400 && y > last.current)
      last.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const enter = (k) => {
    clearTimeout(timer.current)
    setOpen(k)
  }
  const leave = () => {
    timer.current = setTimeout(() => setOpen(null), 160)
  }

  const isActive = (to) => (to === '/' ? pathname === '/' : pathname.startsWith(to))

  return (
    <>
      <div className="topbar">
        <span className="topbar__long">Transforming ideas into powerful digital solutions — </span>{solutionCount}+ ready systems, custom software & AI.{' '}
        <Link to="/contact">Book a free consultation</Link>
      </div>
      <header className={`header has-topbar ${scrolled ? 'is-scrolled' : ''} ${hidden && !open ? 'is-hidden' : ''}`} onMouseLeave={leave}>
        <div className="container header__inner">
          <Logo />
          <nav className="nav" aria-label="Main">
            {Object.entries(mega).map(([k, m]) => (
              <div key={k} className="nav__item" onMouseEnter={() => enter(k)}>
                <Link to={m.to} className={`nav__link ${open === k ? 'is-open' : ''} ${isActive(m.to) ? 'is-active' : ''}`} aria-expanded={open === k}>
                  {m.label} <Chevron />
                </Link>
              </div>
            ))}
            <NavLink to="/work" className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`} onMouseEnter={() => setOpen(null)}>
              Work
            </NavLink>
          </nav>
          <div className="header__actions">
            <Link to="/contact" className="btn btn--dark header__cta">
              Let’s talk <Arrow dir="right" />
            </Link>
            <button className="dots-btn" onClick={onOpenMenu} aria-label="Open menu">
              <span><i /><i /></span>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <div onMouseEnter={() => enter(open)}>
              <MegaMenu key={open} data={mega[open]} onClose={() => setOpen(null)} />
            </div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}

const menuLinks = [
  { to: '/', label: 'Index' },
  { to: '/services', label: 'Services' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/work', label: 'Projects' },
  { to: '/about', label: 'Studio' },
  { to: '/contact', label: 'Contact' },
]

export function SideMenu({ open, onClose }) {
  const { pathname } = useLocation()
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="menu-backdrop" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside
            className="menu"
            role="dialog"
            aria-label="Site menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.8, ease }}
          >
            <button className="menu__close" onClick={onClose} aria-label="Close menu">✕</button>
            <nav className="menu__nav">
              {menuLinks.map((l, i) => {
                const active = l.to === '/' ? pathname === '/' : pathname.startsWith(l.to)
                return (
                  <motion.div key={l.to} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.06, duration: 0.8, ease }}>
                    <Link to={l.to} className={`menu__link ${active ? 'is-active' : ''}`} onClick={onClose}>
                      <span className="menu__num">0{i + 1}</span>
                      <span className="menu__word">{l.label}</span>
                    </Link>
                  </motion.div>
                )
              })}
            </nav>
            <div className="menu__foot">
              <div>
                <a href={`mailto:${company.email}`}>{company.email}</a>
                <br />
                <a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a>
                <div className="muted" style={{ fontSize: 15, marginTop: 6 }}>{company.address}</div>
              </div>
              <ul className="menu__socials">
                {company.socials.map((s) => (
                  <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer">{s.label}</a></li>
                ))}
              </ul>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
