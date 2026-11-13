import { Suspense, lazy, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Arrow, Reveal, SplitWords, ease } from '../components/ui.jsx'
import { BigCTA, IndustriesGrid, Marquee, Process, ServicesIndex, SolutionsCatalog, Testimonials, Values, WorkGrid } from '../components/Sections.jsx'
import { Typed, useSplashDone, useTypedLines } from '../components/Intro.jsx'
import { solutionCount, testimonials } from '../data/site.js'

const PearlScene = lazy(() => import('../components/PearlScene.jsx'))

const LINES = [
  'A software, AI & systems studio',
  'Software,',
  'polished.',
  `Pearl Developers builds custom software, mobile apps, AI and ${solutionCount}+ business systems — layer by layer, until they shine.`,
]
const SPEEDS = [28, 75, 75, 11]

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    return false
  }
}

const HERO_TAGS = ['Custom Software', 'Mobile Apps', 'Artificial Intelligence', 'SACCO Systems', 'School Management', 'ERP & CRM', 'E‑commerce', 'CCTV & Security', 'UI/UX Design']

function Hero() {
  const ready = useSplashDone()
  const up = (d) => ({
    initial: { opacity: 0, y: 18 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.8, delay: d, ease },
  })

  return (
    <section className="ph">
      <div className="ph__inner">
        <motion.h1 className="ph__title" {...up(0)}>
          <span className="ph__thin">A </span><b>Software &amp; AI Studio</b>{' '}
          <br />
          <span className="ph__thin">turning your ideas into </span><b>products that work</b>
        </motion.h1>

        <motion.p className="ph__sub" {...up(0.08)}>
          We design and build custom software, mobile apps, AI tools and {solutionCount}+ ready‑to‑deploy
          business systems for SACCOs, schools, hospitals, hotels and growing companies.
        </motion.p>

        <motion.div className="ph__ctas" {...up(0.16)}>
          <Link to="/work" className="ph__btn ph__btn--solid">View our work <Arrow dir="right" /></Link>
          <Link to="/contact" className="ph__btn ph__btn--ghost">Book a free call <Arrow dir="right" /></Link>
        </motion.div>

      </div>
      <Marquee items={HERO_TAGS} />
    </section>
  )
}

/* Previous 3D hero, kept for reference (not rendered) */
// eslint-disable-next-line no-unused-vars
function PearlHero() {
  const [webgl, setWebgl] = useState(false)
  useEffect(() => setWebgl(hasWebGL()), [])
  const { scrollY } = useScroll()
  const yText = useTransform(scrollY, [0, 800], [0, 160])
  const fade = useTransform(scrollY, [0, 600], [1, 0])
  const ready = useSplashDone()
  const typed = useTypedLines(LINES, ready, SPEEDS)
  const T = (i) => <Typed text={typed.shown[i]} full={LINES[i]} caret={ready && typed.active === i} />

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
        <div className="hero__kicker">{T(0)}</div>
        <h1 className="hero__title" aria-label="Software, polished.">
          <span className="reveal-line"><span className="l1">{T(1)}</span></span>
          <span className="reveal-line"><span className="l2">{T(2)}</span></span>
        </h1>
        <p className="hero__sub">{T(3)}</p>
        <motion.div
          className="hero__ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={typed.done ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9, ease }}
          style={{ pointerEvents: typed.done ? 'auto' : 'none' }}
        >
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

      {/* What we do, in one statement */}
      <section className="section">
        <div className="container">
          <Reveal><span className="eyebrow">Who we are</span></Reveal>
          <h2 className="statement" style={{ marginTop: 28 }}>
            <SplitWords text="We build custom software, mobile apps and AI tools," />{' '}
            <span className="italic muted"><SplitWords text="plus ready‑made systems for SACCOs, schools, hospitals and businesses." delay={0.2} /></span>{' '}
            <SplitWords text="Built in Uganda, supported long after launch." delay={0.4} />
          </h2>
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
      <section className="section" id="work" style={{ background: 'linear-gradient(180deg, var(--bg), #dfe9f4)' }}>
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

      {/* Testimonials (hidden until real quotes are added in site.js) */}
      {testimonials.length > 0 && <section className="section section--night">
        <div className="container">
          <div className="section-head">
            <h2 className="h-2">Kind <span className="italic">words</span></h2>
            <p className="lead" style={{ color: '#b5acb0' }}>What our clients say about working with us.</p>
          </div>
          <Testimonials />
        </div>
      </section>}

      <BigCTA />
    </>
  )
}
