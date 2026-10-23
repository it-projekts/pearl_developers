import { PageHero } from '../components/ui.jsx'
import { BigCTA, IndustriesGrid } from '../components/Sections.jsx'

export default function Industries() {
  return (
    <>
      <PageHero
        crumb="Industries"
        title={<>Built for the way <span className="italic">your sector</span> works</>}
        lead="From SACCOs and schools to hospitals, hotels and taxi parks — we understand the rules, users and realities of your industry."
      />
      <section className="section section--night">
        <div className="container">
          <IndustriesGrid />
        </div>
      </section>
      <BigCTA />
    </>
  )
}
