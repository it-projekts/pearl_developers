import { Link } from 'react-router-dom'
import { Arrow } from '../components/ui.jsx'

export default function NotFound() {
  return (
    <section className="nf">
      <div>
        <div className="h-display">4<span className="italic iri-text">0</span>4</div>
        <p className="lead" style={{ margin: '20px auto 30px' }}>This pearl is still forming. The page you’re looking for doesn’t exist.</p>
        <Link to="/" className="btn btn--dark">Back home <Arrow dir="right" /></Link>
      </div>
    </section>
  )
}
