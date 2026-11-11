import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { company, solutionCount } from '../data/site.js'

const ease = [0.22, 1, 0.36, 1]
const n = (v) => `calc(${v} * var(--s))`

// dx/dy: dot offset from centre; ex/ey: where the line ends; ang: line direction (deg); side: label side.
// Add `image: '/menu/about.jpg'` to any item to show a photo in the centre circle instead of the gradient.
const items = [
  { to: '/about', label: 'About', text: 'Our story, people and values.', dx: -10.9, dy: -10.8, ex: -2.9, ey: -2.9, ang: -135, len: 4.1, side: 'l', bg: 'radial-gradient(circle at 30% 25%, #fff 0 8%, #f4cfd9 35%, #c9b8ef 75%, #9d8bc4)' },
  { to: '/services', label: 'Services', text: 'Software, apps, AI and design.', dx: 10.8, dy: -10.8, ex: 2.9, ey: -2.9, ang: -45, len: 4.1, side: 'r', bg: 'radial-gradient(circle at 70% 30%, #fff 0 8%, #bfe0e6 35%, #5fb8c6 75%, #17a79a)' },
  { to: '/solutions', label: 'Solutions', text: `${solutionCount}+ ready-to-launch systems.`, dx: 15.3, dy: 0, ex: 3.9, ey: 0, ang: 0, len: 3.9, side: 'r', bg: 'radial-gradient(circle at 35% 30%, #fff 0 8%, #d8ffb0 35%, #7fd65a 75%, #3f9a35)' },
  { to: '/industries', label: 'Industries', text: 'The sectors we know best.', dx: 10.8, dy: 10.9, ex: 2.9, ey: 2.9, ang: 45, len: 4.1, side: 'r', bg: 'radial-gradient(circle at 30% 30%, #fff 0 8%, #b7dcf2 35%, #6ea6dc 75%, #4a6fb5)' },
  { to: '/work', label: 'Work', text: 'Selected products and client projects.', dx: -10.9, dy: 10.9, ex: -2.9, ey: 2.9, ang: 135, len: 4.1, side: 'l', bg: 'radial-gradient(circle at 65% 30%, #fff 0 8%, #ffd0e6 35%, #ff7fb5 75%, #d9528f)' },
  { to: '/contact', label: 'Contact', text: 'Tell us about your next project.', dx: -15.3, dy: 0, ex: -3.9, ey: 0, ang: 180, len: 3.9, side: 'l', bg: 'radial-gradient(circle at 40% 30%, #fff 0 8%, #f6e2c4 35%, #e8b98a 75%, #c98a5a)' },
]
const idle = 'radial-gradient(circle at 32% 28%, #fff 0 8%, #f7e7ef 22%, #d8d7f3 48%, #b4c7e6 70%, #9d8bc4 100%)'

export function RadialMenu({ open, onClose }) {
  const { pathname } = useLocation()
  const [active, setActive] = useState(null)
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  useEffect(() => { if (!open) setActive(null) }, [open])
  const cur = active === null ? null : items[active]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="rm" role="dialog" aria-modal="true" aria-label="Site menu"
          initial={{ clipPath: 'circle(0% at 94% 6%)' }}
          animate={{ clipPath: 'circle(150% at 94% 6%)' }}
          exit={{ clipPath: 'circle(0% at 94% 6%)', transition: { duration: 0.7, ease } }}
          transition={{ duration: 1, ease }}
        >
          <i className="rm__blob rm__blob--a" /><i className="rm__blob rm__blob--b" />
          <Link to="/" className="rm__brand" onClick={onClose}><b>P.</b>Pearl Developers.</Link>
          <button className="rm__close" onClick={onClose} autoFocus>Close <span aria-hidden="true">✕</span></button>

          <div className="rm__stage" onMouseLeave={() => setActive(null)}>
            <div className="rm__orb">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={active ?? 'idle'} className="rm__art"
                  style={cur?.image ? undefined : { background: cur ? cur.bg : idle }}
                  initial={{ opacity: 0, scale: 1.12, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.55, ease }}
                >
                  {cur?.image && <img src={cur.image} alt="" />}
                </motion.div>
              </AnimatePresence>
            </div>
            <i className="rm__dot rm__dot--deco" style={{ '--px': n(0), '--py': n(-15.3) }} />
            <i className="rm__dot rm__dot--deco" style={{ '--px': n(0), '--py': n(15.3) }} />

            {items.map((it, i) => {
              const d = 0.45 + i * 0.07
              const here = pathname === it.to || pathname.startsWith(it.to + '/')
              return (
                <Link
                  key={it.to} to={it.to} onClick={onClose}
                  className={`rm__item rm__item--${it.side} ${active === i ? 'is-on' : ''} ${active !== null && active !== i ? 'is-dim' : ''} ${here ? 'is-here' : ''}`}
                  style={{ '--px': n(it.dx), '--py': n(it.dy) }}
                  onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onBlur={() => setActive(null)}
                >
                  <motion.i className="rm__line" style={{ rotate: it.ang, originX: 0, originY: 0.5, width: n(it.len) }}
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: d + 0.1, duration: 0.7, ease }} />
                  <motion.i className="rm__dot" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: d, duration: 0.6, ease }} />
                  <motion.span className="rm__label"
                    style={it.side === 'l' ? { right: n(-it.ex + 0.8), top: n(it.ey) } : { left: n(it.ex + 0.8), top: n(it.ey) }}
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: d + 0.2, duration: 0.8, ease }}>
                    <span className="rm__num">0{i + 1}</span>
                    <span className="rm__word">{it.label}</span>
                  </motion.span>
                </Link>
              )
            })}
          </div>

          <div className="rm__foot">
            <span>Index / 06 destinations</span>
            <AnimatePresence mode="wait">
              <motion.p key={active ?? 'hint'} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                {cur ? cur.text : 'Hover a point to preview'}
              </motion.p>
            </AnimatePresence>
          </div>
          <a className="rm__mail" href={`mailto:${company.email}`}>{company.email}</a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
