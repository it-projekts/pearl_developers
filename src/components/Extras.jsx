import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { company } from '../data/site.js'

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

export function FloatChat() {
  const [open, setOpen] = useState(false)
  return (
    <div className="float-chat">
      <AnimatePresence>
        {open && (
          <motion.div className="float-chat__panel" initial={{ opacity: 0, y: 10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.96 }}>
            <p>👋 Hi! How can we help?</p>
            <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
            <Link to="/contact" onClick={() => setOpen(false)}>Discuss my project</Link>
            <a href={`tel:${company.phone.replace(/\s/g, '')}`}>Book a call</a>
          </motion.div>
        )}
      </AnimatePresence>
      <button className="float-chat__btn" onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close chat options' : 'Open chat options'}>
        {open ? '✕' : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4A2.5 2.5 0 0 1 4 13.5v-8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <circle cx="9" cy="9.5" r="1" fill="currentColor" /><circle cx="12" cy="9.5" r="1" fill="currentColor" /><circle cx="15" cy="9.5" r="1" fill="currentColor" />
          </svg>
        )}
      </button>
    </div>
  )
}
