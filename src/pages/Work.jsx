import { BigCTA, WorkGrid } from '../components/Sections.jsx'

export default function Work() {
  return (
    <>
      <section className="section" style={{ paddingTop: 'clamp(150px, 16vw, 210px)', background: 'radial-gradient(70% 50% at 50% 0%, #e2d3ea 0%, var(--bg) 70%)' }}>
        <div className="container">
          <WorkGrid />
        </div>
      </section>
      <BigCTA />
    </>
  )
}
