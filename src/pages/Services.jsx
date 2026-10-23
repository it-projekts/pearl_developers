import { Link, useParams } from 'react-router-dom'
import { Arrow, PageHero, Reveal } from '../components/ui.jsx'
import { BigCTA, Process, ServicesIndex } from '../components/Sections.jsx'
import { services } from '../data/site.js'
import NotFound from './NotFound.jsx'

export default function Services() {
  return (
    <>
      <PageHero
        crumb="Services"
        title={<>Services that <span className="italic">shine</span></>}
        lead="Strategy, design, engineering, AI and security — everything you need to take a product from idea to impact."
      />
      <section className="section--tight">
        <div className="container">
          <div className="svc-cards">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 4) * 0.06}>
                <Link to={`/services/${s.slug}`} className="svc-card" style={{ background: `linear-gradient(150deg, ${s.hue[0]}, ${s.hue[1]})` }}>
                  <span className="svc-card__n">({String(i + 1).padStart(2, '0')})</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p style={{ marginTop: 10 }}>{s.short}</p>
                    <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center', marginTop: 18, fontWeight: 500 }}>Explore <Arrow dir="right" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--paper">
        <div className="container">
          <div className="section-head">
            <h2 className="h-2">The full <span className="italic">index</span></h2>
            <p className="lead">Hover a service to preview what’s inside.</p>
          </div>
          <ServicesIndex />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head"><h2 className="h-2">How we <span className="italic">deliver</span></h2></div>
          <Process />
        </div>
      </section>
      <BigCTA />
    </>
  )
}

export function ServiceDetail() {
  const { slug } = useParams()
  const idx = services.findIndex((s) => s.slug === slug)
  if (idx < 0) return <NotFound />
  const s = services[idx]
  const next = services[(idx + 1) % services.length]
  return (
    <>
      <PageHero crumb={<><Link to="/services">Services</Link> / {s.title}</>} title={s.title} lead={s.intro}>
        <Reveal delay={0.3}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 34 }}>
            <Link to={`/contact?topic=${encodeURIComponent(s.title)}`} className="btn btn--dark">Discuss your project <Arrow dir="right" /></Link>
            <Link to="/work" className="btn btn--light">See our work <Arrow /></Link>
          </div>
        </Reveal>
      </PageHero>
      <section className="section--tight">
        <div className="container svc-detail">
          <div>
            <div style={{ aspectRatio: '4/3', borderRadius: 28, position: 'relative', overflow: 'hidden', background: `linear-gradient(150deg, ${s.hue[0]}, ${s.hue[1]})` }}>
              <div style={{ position: 'absolute', width: '46%', aspectRatio: 1, borderRadius: '50%', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle at 32% 28%, #fff 0 8%, #f7e7ef 24%, #d8d7f3 50%, #b4c7e6 72%, #9d8bc4 100%)', boxShadow: 'inset -20px -30px 60px rgba(110,70,140,.25), 0 50px 70px -40px rgba(110,70,120,.5)' }} />
              <span className="italic" style={{ position: 'absolute', left: 26, bottom: 18, fontSize: 'clamp(30px,4vw,54px)', lineHeight: 1 }}>{s.title}</span>
            </div>
          </div>
          <div>
            <span className="eyebrow">What’s included</span>
            <ul className="check-list" style={{ marginTop: 24 }}>
              {s.items.map((it, i) => (
                <li key={it}><span>{String(i + 1).padStart(2, '0')}</span>{it}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="section section--paper">
        <div className="container">
          <div className="section-head"><h2 className="h-2">Our <span className="italic">process</span></h2></div>
          <Process />
        </div>
      </section>
      <section className="section--tight">
        <div className="container">
          <Link to={`/services/${next.slug}`} className="svc-row" style={{ borderTop: '1px solid var(--line-strong)' }}>
            <span className="svc-row__num">Next</span>
            <span className="svc-row__title">{next.title}</span>
            <span className="svc-row__desc">{next.short}</span>
            <span className="svc-row__arrow"><Arrow /></span>
          </Link>
        </div>
      </section>
      <BigCTA />
    </>
  )
}
