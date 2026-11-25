import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'
import { Arrow, Reveal, SplitWords, ease } from './ui.jsx'
import ProjectArt from './ProjectArt.jsx'
import { LineIcon } from './MenuIcons.jsx'
import { WaveGallery, WaveMedia, useWaveGallery } from './WaveGallery.jsx'
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

/* ─── Services index (a row drops its image open on hover or keyboard focus) ─── */
export function ServicesIndex() {
  const [open, setOpen] = useState(null)
  return (
    <div className="svc-list" onMouseLeave={() => setOpen(null)}>
      {services.map((s, i) => (
        <Reveal key={s.slug} delay={i * 0.04} y={30}>
          <Link
            to={`/services/${s.slug}`}
            className={`svc-row${open === i ? ' is-open' : ''}`}
            onMouseEnter={() => setOpen(i)}
            onFocus={() => setOpen(i)}
            onBlur={() => setOpen((o) => (o === i ? null : o))}
          >
            <span className="svc-row__num">({String(i + 1).padStart(2, '0')})</span>
            <span className="svc-row__title">{s.title}</span>
            <span className="svc-row__desc">{s.short}</span>
            <span className="svc-row__arrow"><Arrow /></span>
            <span className="svc-row__drop"><span><img src={`/services/${s.image || `${s.slug}.svg`}`} alt="" loading="lazy" /></span></span>
          </Link>
        </Reveal>
      ))}
    </div>
  )
}

/* ─── Work grid with filter pills (unseen.co style) ─── */
/* Opens the project's own link when it has one, otherwise the contact page */
function ProjectLink({ project, children }) {
  return project.link
    ? <a href={project.link} target="_blank" rel="noreferrer" className="card" data-cursor>{children}</a>
    : <Link to="/contact" className="card" data-cursor>{children}</Link>
}

/* A project card that folds like paper as it travels through the screen,
   and waves with the speed of scrolling (up or down). */
function FoldCard({ wave, children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const fold = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [32, 0, 0, -32])
  const rotateX = useTransform([fold, wave], ([f, w]) => f + w * 10)
  const skewY = useTransform(wave, (w) => w * -2.5)
  const scaleY = useTransform(wave, (w) => 1 - Math.abs(w) * 0.06)
  return (
    <motion.div ref={ref} className="fold" style={{ rotateX, skewY, scaleY, transformPerspective: 1200 }}>
      {children}
    </motion.div>
  )
}

export function WorkGrid({ limit, showHead = true }) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const speed = useSpring(useVelocity(scrollY), { stiffness: 120, damping: 30 })
  const wave = useTransform(speed, [-2500, 0, 2500], [-1, 0, 1], { clamp: true })
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
      <WaveGallery>
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
              <WorkCard project={p} wave={wave} reduce={reduce} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      </WaveGallery>
    </>
  )
}

/* Image cards bend in WebGL; the rest (or every card without WebGL) fold with CSS */
function WorkCard({ project: p, wave, reduce }) {
  const gl = useWaveGallery()
  const card = (
    <ProjectLink project={p}>
      <WaveMedia src={p.image}><ProjectArt project={p} /></WaveMedia>
      <div className="card__meta">
        <div>
          <div className="card__title">{p.title}</div>
          <div className="card__kind">{p.kind}</div>
        </div>
        <span className="card__arrow"><Arrow /></span>
      </div>
    </ProjectLink>
  )
  if (reduce || (gl && p.image)) return card
  return <FoldCard wave={wave}>{card}</FoldCard>
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
            {v.image
              ? <img className="value__img" src={v.image} alt="" loading="lazy" decoding="async" />
              : <span className="value__icon"><LineIcon name={v.icon} size={44} stroke={1.4} /></span>}
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
          <SplitWords text="Let’s build" />{' '}
          <span className="italic"><SplitWords text="something rare" delay={0.15} /></span>
        </h2>
        <p className="cta__lead">Tell us what you have in mind. We’ll reply within one working day with next steps.</p>
        <div className="cta__actions">
          <Link to="/contact" className="btn btn--dark">Start a project <Arrow dir="right" /></Link>
          <Link to="/work" className="btn btn--light">View our work <Arrow /></Link>
        </div>
      </div>
    </section>
  )
}
