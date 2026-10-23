import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { Arrow, Reveal, SplitWords, ease } from './ui.jsx'
import ProjectArt from './ProjectArt.jsx'
import { services, projects, projectFilters, solutionGroups, industries, process, values, testimonials } from '../data/site.js'

/* ─── Marquee ─── */
export function Marquee({ items }) {
  const list = items || ['Custom Software', 'Mobile Apps', 'Artificial Intelligence', 'SACCO Systems', 'School Management', 'ERP & CRM', 'E‑commerce', 'CCTV & Security', 'IoT & Robotics', 'UI/UX Design']
  const doubled = [...list, ...list]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {doubled.map((t, i) => (
          <div className="marquee__item" key={i}>
            {t} <span className="marquee__dot" />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Services index (numbered rows with floating preview) ─── */
export function ServicesIndex() {
  const [hovered, setHovered] = useState(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 25 })
  const sy = useSpring(y, { stiffness: 200, damping: 25 })
  return (
    <div className="svc-list" onMouseMove={(e) => { x.set(e.clientX + 30); y.set(e.clientY - 110) }} onMouseLeave={() => setHovered(null)}>
      {services.map((s, i) => (
        <Reveal key={s.slug} delay={i * 0.04} y={30}>
          <Link to={`/services/${s.slug}`} className="svc-row" onMouseEnter={() => setHovered(i)}>
            <span className="svc-row__num">({String(i + 1).padStart(2, '0')})</span>
            <span className="svc-row__title">{s.title}</span>
            <span className="svc-row__desc">{s.short}</span>
            <span className="svc-row__arrow"><Arrow /></span>
          </Link>
        </Reveal>
      ))}
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            className="svc-preview"
            style={{ x: sx, y: sy, background: `linear-gradient(135deg, ${services[hovered].hue[0]}, ${services[hovered].hue[1]})` }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.35, ease }}
          >
            <div style={{ position: 'absolute', inset: 0, padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {services[hovered].items.slice(0, 4).map((t) => (
                  <span key={t} style={{ fontSize: 12, padding: '5px 10px', borderRadius: 99, background: 'rgba(255,255,255,.7)' }}>{t}</span>
                ))}
              </div>
              <span className="italic" style={{ fontSize: 34, lineHeight: 1 }}>{services[hovered].title}</span>
            </div>
            <div style={{ position: 'absolute', width: 120, height: 120, right: -30, top: -30, borderRadius: '50%', background: 'radial-gradient(circle at 32% 28%, #fff 0 10%, #f7e7ef 26%, #d8d7f3 52%, #9d8bc4 100%)' }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Work grid with filter pills (unseen.co style) ─── */
export function WorkGrid({ limit, showHead = true }) {
  const [filter, setFilter] = useState('All')
  const counts = useMemo(() => Object.fromEntries(projectFilters.map((f) => [f, f === 'All' ? projects.length : projects.filter((p) => p.category === f).length])), [])
  const list = projects.filter((p) => filter === 'All' || p.category === filter).slice(0, limit || 99)
  return (
    <>
      {showHead && (
        <div className="work-head">
          <h2 className="h-1">Selected <span className="italic">Projects</span></h2>
          <div className="pill-row" role="tablist">
            {projectFilters.map((f) => (
              <button key={f} role="tab" aria-selected={filter === f} className={`pill ${filter === f ? 'is-active' : ''}`} onClick={() => setFilter(f)}>
                {f}<sup>{counts[f]}</sup>
              </button>
            ))}
          </div>
        </div>
      )}
      <motion.div layout className="work-grid">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div
              key={p.title}
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.8, ease, delay: (i % 2) * 0.08 }}
              style={{ marginTop: i % 2 === 1 ? 'var(--stagger, 0px)' : 0 }}
            >
              <Link to="/contact" className="card" data-cursor>
                <div className="card__media"><ProjectArt project={p} /></div>
                <div className="card__meta">
                  <div>
                    <div className="card__title">{p.title}</div>
                    <div className="card__kind">{p.kind}</div>
                  </div>
                  <span className="card__arrow"><Arrow /></span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  )
}

/* ─── Solutions catalogue (from the systems we have built) ─── */
export function SolutionsCatalog({ initial = 'all', compact = false }) {
  const [group, setGroup] = useState(initial)
  const [q, setQ] = useState('')
  const all = solutionGroups.flatMap((g) => g.items.map(([title, text]) => ({ title, text, group: g.key, groupTitle: g.title })))
  const list = all.filter((s) => (group === 'all' || s.group === group) && (s.title + s.text).toLowerCase().includes(q.toLowerCase()))
  const shown = compact ? list.slice(0, 9) : list
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'center', marginBottom: 30 }}>
        <div className="sol-tabs" style={{ marginBottom: 0 }}>
          <button className={`chip ${group === 'all' ? 'is-on' : ''}`} onClick={() => setGroup('all')}>All {all.length}</button>
          {solutionGroups.map((g) => (
            <button key={g.key} className={`chip ${group === g.key ? 'is-on' : ''}`} onClick={() => setGroup(g.key)}>{g.title}</button>
          ))}
        </div>
        {!compact && (
          <input className="sol-search" placeholder="Search systems… e.g. SACCO, POS, hotel" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search solutions" />
        )}
      </div>
      <motion.div layout className="sol-grid">
        <AnimatePresence mode="popLayout">
          {shown.map((s) => (
            <motion.div key={s.title} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5, ease }}>
              <Link to={`/contact?topic=${encodeURIComponent(s.title)}`} className="sol-card">
                <span className="sol-card__tag">{s.groupTitle}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p style={{ marginTop: 8 }}>{s.text}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {!shown.length && <p className="muted">No systems match “{q}”. Tell us what you need — we build custom too.</p>}
    </div>
  )
}

/* ─── Industries ─── */
export function IndustriesGrid({ limit }) {
  return (
    <div className="ind-grid">
      {industries.slice(0, limit || 99).map((ind, i) => (
        <Reveal key={ind.title} className="ind" delay={(i % 3) * 0.06}>
          <span className="ind__num">{String(i + 1).padStart(2, '0')}</span>
          <h3>{ind.title}</h3>
          <p>{ind.text}</p>
          <div className="ind__apps">{ind.apps.map((a) => <span key={a}>{a}</span>)}</div>
        </Reveal>
      ))}
    </div>
  )
}

/* ─── Process ─── */
export function Process() {
  return (
    <div className="process">
      {process.map((p, i) => (
        <Reveal key={p.title} className="step" delay={i * 0.08}>
          <span className="step__n">0{i + 1}</span>
          <div>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

/* ─── Values ─── */
const valueArt = [
  'radial-gradient(circle at 30% 40%, #fff 0 8%, #e8d8f6 30%, #c5b2ea 60%, #8f7bc4 100%)',
  'conic-gradient(from 200deg at 50% 60%, #f6d9cf, #f3e6ef, #cfd8f3, #f6d9cf)',
  'linear-gradient(160deg, #dbe9f2 0%, #f6efe6 50%, #e8d2dd 100%)',
  'radial-gradient(circle at 70% 30%, #fff 0 10%, #f6e1c5 35%, #efc6d3 70%, #c7b4e8 100%)',
]
export function Values() {
  return (
    <div className="values">
      {values.map((v, i) => (
        <Reveal key={v.title} className="value" delay={i * 0.08}>
          <div className="value__art" style={{ background: valueArt[i % 4] }}>
            <span className="italic" style={{ position: 'absolute', left: 22, bottom: 10, fontSize: 90, lineHeight: 1, color: 'rgba(27,24,26,.75)' }}>{v.title[0]}</span>
          </div>
          <div className="value__body">
            <h3>{v.title}</h3>
            <p>{v.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

/* ─── Testimonials ─── */
export function Testimonials() {
  return (
    <div className="quotes">
      {testimonials.map((t, i) => (
        <Reveal key={i} delay={i * 0.08}>
          <figure className="quote" style={{ margin: 0, height: '100%' }}>
            <blockquote>“{t.quote}”</blockquote>
            <figcaption><strong>{t.name}</strong>{t.role}</figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  )
}

/* ─── Big call to action ─── */
export function BigCTA() {
  return (
    <section className="cta">
      <motion.div
        className="cta__orb"
        style={{ translateX: '-50%', translateY: '-50%' }}
        animate={{ y: [0, -24, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="container">
        <span className="eyebrow">Let’s collaborate</span>
        <h2 className="cta__big">
          <SplitWords text="Let’s build" />
          <br />
          <span className="italic"><SplitWords text="something rare" delay={0.15} /></span>
        </h2>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact" className="btn btn--dark">Start a project <Arrow dir="right" /></Link>
          <Link to="/work" className="btn btn--light">View our work <Arrow /></Link>
        </div>
      </div>
    </section>
  )
}
