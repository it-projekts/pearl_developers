import { Suspense, lazy, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Arrow, Counter, Reveal, SplitWords, ease } from '../components/ui.jsx'
import { BigCTA, IndustriesGrid, Marquee, Process, ServicesIndex, SolutionsCatalog, Testimonials, Values, WorkGrid } from '../components/Sections.jsx'
import { stats, solutionCount } from '../data/site.js'

const PearlScene = lazy(() => import('../components/PearlScene.jsx'))

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    return false
  }
}

function Hero() {
  const [webgl, setWebgl] = useState(false)
  useEffect(() => setWebgl(hasWebGL()), [])
  const { scrollY } = useScroll()
  const yText = useTransform(scrollY, [0, 800], [0, 160])
  const fade = useTransform(scrollY, [0, 600], [1, 0])

  return (
    <section className="hero">
      <div className="hero__fallback"><div className="orb" /></div>
      {webgl && (
        <motion.div className="hero__canvas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, delay: 0.2 }}>
          <Suspense fallback={null}>
            <PearlScene />
          </Suspense>
        </motion.div>
      )}
      <div className="hero__veil" />

      <motion.div className="hero__content" style={{ y: yText, opacity: fade }}>
        <motion.div className="hero__kicker" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.3 }}>
          A software, AI &amp; systems studio
        </motion.div>
        <h1 className="hero__title">
          <span className="reveal-line">
            <motion.span className="l1" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.3, ease, delay: 0.4 }}>
              Software,
            </motion.span>
          </span>
          <span className="reveal-line">
            <motion.span className="l2" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.3, ease, delay: 0.55 }}>
              polished.
            </motion.span>
          </span>
        </h1>
        <motion.p className="hero__sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 1 }}>
          Pearl Developers builds custom software, mobile apps, AI and {solutionCount}+ business systems — layer by layer, until they shine.
        </motion.p>
        <motion.div className="hero__ctas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 1.15 }}>
          <Link to="/work" className="btn btn--light">View our work <Arrow /></Link>
          <Link to="/contact" className="btn btn--dark">Book a free call <Arrow dir="right" /></Link>
        </motion.div>
      </motion.div>

      <div className="hero__corner hero__corner--l">
        <span className="round-btn" aria-hidden="true"><span className="eq"><i /><i /><i /><i /><i /></span></span>
        <Link to="/solutions" className="hero__badge">Explore {solutionCount}+ systems</Link>
      </div>
      <div className="hero__corner hero__corner--r">©{new Date().getFullYear()}</div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />

      {/* Statement + stats */}
      <section className="section">
        <div className="container">
          <Reveal><span className="eyebrow">Who we are</span></Reveal>
          <h2 className="statement" style={{ marginTop: 28 }}>
            <SplitWords text="Every pearl begins as a grain of sand." />{' '}
            <span className="italic muted"><SplitWords text="Every great product begins as an idea." delay={0.2} /></span>{' '}
            <SplitWords text="We add the layers that make it rare." delay={0.4} />
          </h2>
          <div className="stats">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <div className="stat__num"><Counter to={s.value} suffix={s.suffix} /></div>
                <div className="stat__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section section--paper" id="services">
        <div className="container">
          <div className="section-head">
            <h2 className="h-1">What we <span className="italic">do</span></h2>
            <p className="lead">From a first sketch to a system thousands of people rely on daily — strategy, design, engineering and support under one roof.</p>
          </div>
          <ServicesIndex />
        </div>
      </section>

      {/* Work */}
      <section className="section" id="work" style={{ background: 'linear-gradient(180deg, var(--bg), #e9e1e4)' }}>
        <div className="container">
          <WorkGrid limit={6} />
          <div style={{ textAlign: 'center', marginTop: 60 }}>
            <Link to="/work" className="btn btn--dark">See all projects <Arrow dir="right" /></Link>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="section section--night">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Ready to deploy</span>
              <h2 className="h-1" style={{ marginTop: 20 }}>{solutionCount}+ systems, <span className="italic iri-text">ready</span> to shine</h2>
            </div>
            <p className="lead" style={{ color: '#b5acb0' }}>
              Battle‑tested platforms we have already built — SACCOs, schools, hospitals, hotels, POS, ERP and more — customised to your brand and workflow in weeks, not months.
            </p>
          </div>
          <SolutionsCatalog compact />
          <div style={{ marginTop: 40 }}>
            <Link to="/solutions" className="btn btn--iri">Browse all solutions <Arrow dir="right" /></Link>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section section--night" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <h2 className="h-2">Industries we <span className="italic">serve</span></h2>
            <p className="lead" style={{ color: '#b5acb0' }}>Deep domain knowledge across the sectors that move East Africa and beyond.</p>
          </div>
          <IndustriesGrid limit={9} />
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="h-1">How we <span className="italic">work</span></h2>
            <p className="lead">A clear, collaborative process with weekly demos — so you always know where your project stands.</p>
          </div>
          <Process />
        </div>
      </section>

      {/* Values */}
      <section className="section section--paper">
        <div className="container">
          <div className="section-head">
            <h2 className="h-1">Our core <span className="italic">values</span></h2>
            <p className="lead">Integrity, craft, transparency and partnership define who we are — and how every line of code gets written.</p>
          </div>
          <Values />
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section--night">
        <div className="container">
          <div className="section-head">
            <h2 className="h-2">Kind <span className="italic">words</span></h2>
            <p className="lead" style={{ color: '#b5acb0' }}>What our clients say about working with us.</p>
          </div>
          <Testimonials />
        </div>
      </section>

      <BigCTA />
    </>
  )
}
