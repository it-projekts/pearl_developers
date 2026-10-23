import { Link } from 'react-router-dom'
import { Arrow, Counter, PageHero, Reveal, SplitWords } from '../components/ui.jsx'
import { BigCTA, Marquee, Process, Values } from '../components/Sections.jsx'
import { company, stats, team } from '../data/site.js'

const pillars = [
  { k: 'Purpose', t: 'To make world‑class software accessible to every ambitious organisation — from a village SACCO to a national enterprise.' },
  { k: 'Mission', t: 'Design and engineer secure, beautiful and reliable digital products that solve real problems and grow with our clients.' },
  { k: 'Vision', t: 'To be Africa’s most trusted studio for software, AI and business systems — known for craft, honesty and impact.' },
]

export default function About() {
  return (
    <>
      <PageHero
        crumb="About"
        title={<>We turn ideas into <span className="italic">rare</span> software</>}
        lead={`${company.legal} is a software, AI and systems studio. We combine strategic thinking, user‑focused design and modern engineering to build secure, high‑performance products tailored to your goals.`}
      >
        <Reveal delay={0.3}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 34 }}>
            <Link to="/contact" className="btn btn--dark">Book free consultation <Arrow dir="right" /></Link>
            <Link to="/work" className="btn btn--light">View our portfolio <Arrow /></Link>
          </div>
        </Reveal>
      </PageHero>
      <Marquee items={['Integrity', 'Craft', 'Transparency', 'Partnership', 'Accountability', 'Teamwork', 'Innovation']} />

      <section className="section">
        <div className="container">
          <h2 className="statement">
            <SplitWords text="A pearl is made of thousands of thin, perfect layers." />{' '}
            <span className="italic muted"><SplitWords text="That’s how we build software" delay={0.2} /></span>{' '}
            <SplitWords text="— patiently, precisely, and built to last." delay={0.35} />
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

      <section className="section section--night">
        <div className="container">
          <div className="section-head">
            <h2 className="h-1">Purpose, mission <span className="italic">&amp; vision</span></h2>
          </div>
          <div className="quotes">
            {pillars.map((p, i) => (
              <Reveal key={p.k} delay={i * 0.08}>
                <figure className="quote" style={{ margin: 0, height: '100%' }}>
                  <span className="eyebrow" style={{ color: '#e9dff0' }}>{p.k}</span>
                  <blockquote>{p.t}</blockquote>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <div className="section-head">
            <h2 className="h-1">Our core <span className="italic">values</span></h2>
            <p className="lead">The principles behind every decision, every sprint and every client relationship.</p>
          </div>
          <Values />
        </div>
      </section>

      <section className="section" id="process">
        <div className="container">
          <div className="section-head">
            <h2 className="h-1">How we <span className="italic">work</span></h2>
            <p className="lead">Discovery to launch — and long after.</p>
          </div>
          <Process />
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <div className="section-head">
            <h2 className="h-1">Meet the <span className="italic">people</span></h2>
            <p className="lead">Project management, product design, full‑stack engineering and mobile expertise — with one shared goal: building reliable products that help businesses grow.</p>
          </div>
          <div className="team">
            {team.map((m, i) => (
              <Reveal key={i} className="member" delay={i * 0.06}>
                <div className="member__photo" style={{ backgroundPosition: `${i * 25}% 0` }}>
                  {m.photo ? <img src={m.photo} alt={m.name} /> : m.name[0]}
                </div>
                <h4>{m.name}</h4>
                <p>{m.role}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <BigCTA />
    </>
  )
}
