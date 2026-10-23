import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, animate } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1]

export function Arrow({ dir = 'down-right', size = 18 }) {
  const rot = { 'down-right': 0, right: -45, 'up-right': -90, down: 45 }[dir] ?? 0
  return (
    <svg className="arrow" width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ transform: `rotate(${rot}deg)` }} aria-hidden="true">
      <path d="M5 5L15 15M15 15V6.5M15 15H6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Chevron() {
  return (
    <svg className="nav__chev" viewBox="0 0 10 6" fill="none" aria-hidden="true">
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/** Fade + rise when scrolled into view */
export function Reveal({ children, delay = 0, y = 40, as = 'div', className, style }) {
  const M = motion[as]
  return (
    <M
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </M>
  )
}

/** Splits text into words that slide up one by one */
export function SplitWords({ text, className, delay = 0 }) {
  const words = text.split(' ')
  return (
    <motion.span
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
    >
      {words.map((w, i) => (
        <span key={i} className="reveal-line" style={{ display: 'inline-block', marginRight: '.24em', verticalAlign: 'top', paddingBottom: '.08em' }} aria-hidden="true">
          <motion.span
            style={{ display: 'inline-block' }}
            variants={{ hidden: { y: '110%' }, show: { y: 0 } }}
            transition={{ duration: 0.9, ease, delay: delay + i * 0.035 }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

export function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 2, ease, onUpdate: (x) => setV(Math.round(x)) })
    return () => c.stop()
  }, [inView, to])
  return (
    <span ref={ref}>
      {v}
      <em>{suffix}</em>
    </span>
  )
}

export function Logo({ to = '/' }) {
  return (
    <Link to={to} className="logo" aria-label="Pearl Developers home">
      <span className="logo__pearl" />
      <span>
        pearl <span className="serif">developers</span>
        <sup>®</sup>
      </span>
    </Link>
  )
}

export function PageHero({ crumb, title, lead, children }) {
  return (
    <section className="page-hero">
      <div className="page-hero__bg" />
      <motion.div
        className="page-hero__orb"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, y: [0, -14, 0] }}
        transition={{ scale: { duration: 1.4, ease }, opacity: { duration: 1.4 }, y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
      />
      <div className="container">
        {crumb && (
          <div className="crumbs">
            <Link to="/">Home</Link> <span>/</span> <span>{crumb}</span>
          </div>
        )}
        <h1 className="h-1" style={{ maxWidth: '14ch' }}>{title}</h1>
        {lead && (
          <Reveal delay={0.2}>
            <p className="lead" style={{ marginTop: 28 }}>{lead}</p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}
