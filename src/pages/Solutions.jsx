import { useSearchParams } from 'react-router-dom'
import { PageHero } from '../components/ui.jsx'
import { BigCTA, SolutionsCatalog } from '../components/Sections.jsx'
import { solutionCount, solutionGroups } from '../data/site.js'

export default function Solutions() {
  const [params] = useSearchParams()
  const g = params.get('group')
  const initial = solutionGroups.some((x) => x.key === g) ? g : 'all'
  return (
    <>
      <PageHero
        crumb="Solutions"
        title={<>{solutionCount}+ systems, <span className="italic">ready</span> to deploy</>}
        lead="Proven platforms we have already designed and built — customised to your brand, data and workflow, then deployed in weeks. Don’t see yours? We build custom."
      />
      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <SolutionsCatalog key={initial} initial={initial} />
        </div>
      </section>
      <BigCTA />
    </>
  )
}
