import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { company, services, solutionGroups, industries } from '../data/site.js'

/** Circle cursor that grows over links/buttons (desktop only) */
export function Cursor() {
  const ref = useRef(null)
  const [hover, setHover] = useState(false)
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, raf
    const move = (e) => {
      x = e.clientX
      y = e.clientY
      const t = e.target.closest?.('a, button, [data-cursor]')
      setHover(!!t)
    }
    const loop = () => {
      cx += (x - cx) * 0.18
      cy += (y - cy) * 0.18
      if (ref.current) ref.current.style.transform = `translate(${cx}px, ${cy}px)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', move)
    loop()
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])
  return <div ref={ref} className={`cursor ${hover ? 'is-hover' : ''}`} aria-hidden="true" />
}

export function Grain() {
  return <div className="grain" aria-hidden="true" />
}

const Icon = {
  phone: <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  whatsapp: <><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M8.8 8.6c0 3.4 2.9 6.4 6.4 6.4l1.1-1.6-2.1-1-1 .8a4.2 4.2 0 0 1-2-2l.8-1-1-2.1-2.2.5" /></>,
  up: <path d="M12 19V5M5 12l7-7 7 7" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
  send: <path d="M4 12 20 4l-5 16-3-7-8-1Z" />,
}
const Svg = ({ name, size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{Icon[name]}</svg>
)

/** Call / email / WhatsApp tab fixed to the right edge */
export function SideRail() {
  const links = [
    { name: 'phone', label: `Call ${company.phone}`, href: `tel:${company.phone.replace(/\s/g, '')}` },
    { name: 'mail', label: `Email ${company.email}`, href: `mailto:${company.email}` },
    { name: 'whatsapp', label: 'Chat on WhatsApp', href: `https://wa.me/${company.whatsapp}`, ext: true },
  ]
  return (
    <nav className="side-rail" aria-label="Quick contact">
      {links.map((l) => (
        <a key={l.name} href={l.href} aria-label={l.label} {...(l.ext ? { target: '_blank', rel: 'noreferrer' } : {})}>
          <Svg name={l.name} />
          <span className="side-rail__tip">{l.label}</span>
        </a>
      ))}
    </nav>
  )
}

// Everything the help-centre search can find
const HELP = [
  { t: 'Contact us', d: 'Phone, email, WhatsApp and office location', to: '/contact' },
  { t: 'Book a free consultation', d: 'Tell us about your project', to: '/contact' },
  { t: 'Our work', d: 'Selected projects and case studies', to: '/work' },
  { t: 'About Pearl Developers', d: 'Our story, team and values', to: '/about' },
  { t: 'How we work', d: 'Our delivery process, step by step', to: '/about#process' },
  ...services.map((s) => ({ t: s.title, d: s.short, to: `/services/${s.slug}`, k: s.items.join(' ') })),
  ...solutionGroups.flatMap((g) => g.items.map(([t, d]) => ({ t, d, to: `/solutions?group=${g.key}` }))),
  ...industries.map((i) => ({ t: i.title, d: i.text, to: '/industries', k: i.apps.join(' ') })),
]
const norm = (x) => x.toLowerCase().normalize('NFKD').replace(/[^\w\s]/g, ' ')

function HelpSearch({ onPick }) {
  const [q, setQ] = useState('')
  const words = norm(q).split(/\s+/).filter(Boolean)
  const hits = words.length
    ? HELP.filter((h) => { const hay = norm(`${h.t} ${h.d} ${h.k || ''}`); return words.every((w) => hay.includes(w)) }).slice(0, 5)
    : []
  return (
    <div className="hc">
      <label className="hc__field">
        <Svg name="search" size={20} />
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for answers" aria-label="Search for answers" />
      </label>
      {words.length > 0 && (
        <ul className="hc__results">
          {hits.map((h) => (
            <li key={h.t + h.to}><Link to={h.to} onClick={onPick}><strong>{h.t}</strong><small>{h.d}</small></Link></li>
          ))}
          {hits.length === 0 && <li className="hc__none">No matches. Start a conversation below and we’ll help.</li>}
        </ul>
      )}
    </div>
  )
}

export function FloatChat() {
  const [open, setOpen] = useState(false)
  const [seen, setSeen] = useState(false)
  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const toTop = () => (window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' }))
  const toggle = () => { setOpen((o) => !o); setSeen(true) }

  return (
    <div className="float-chat">
      <AnimatePresence>
        {showTop && !open && (
          <motion.button
            key="top" type="button" className="float-chat__top" onClick={toTop} aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
          >
            <Svg name="up" />
          </motion.button>
        )}
        {open && (
          <motion.div key="panel" className="float-chat__panel" initial={{ opacity: 0, y: 10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.96 }}>
            <button type="button" className="float-chat__x" onClick={() => setOpen(false)} aria-label="Close"><Svg name="close" size={20} /></button>
            <h3>Hi there <span aria-hidden="true">👋</span></h3>
            <p>Need help? Search our help center for answers or start a conversation:</p>
            <div className="float-chat__card">
              <h4>Help Center</h4>
              <HelpSearch onPick={() => setOpen(false)} />
            </div>
            <a className="float-chat__card float-chat__convo" href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer">
              <span><h4>New Conversation</h4><small>Chat with our team on WhatsApp</small></span>
              <Svg name="send" />
            </a>
            <div className="float-chat__more">
              <Link to="/contact" onClick={() => setOpen(false)}>Discuss my project</Link>
              <a href={`tel:${company.phone.replace(/\s/g, '')}`}>Call us</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="float-chat__row">
        {!open && (
          <button type="button" className="float-chat__label" onClick={toggle} tabIndex={-1} aria-hidden="true">
            <strong>Chat with us</strong>
            <small>Sales &amp; support</small>
          </button>
        )}
        <button type="button" className="float-chat__btn" onClick={toggle} aria-expanded={open} aria-label={open ? 'Close chat options' : 'Chat with us'}>
          {open ? <Svg name="close" size={24} /> : <img src="/logo.png" alt="" />}
          {!seen && !open && <span className="float-chat__badge" aria-hidden="true">1</span>}
        </button>
      </div>
    </div>
  )
}
