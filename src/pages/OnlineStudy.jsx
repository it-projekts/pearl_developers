import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { company } from '../data/site.js'
import { courses, courseCats } from '../data/courses.js'
import { lessonPath, loadLessons, when } from '../lib/lessons.js'

const enrol = (c) => `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(`Hello Pearl Developers, I would like to join the ${c.title} short course. Please share the dates and fees.`)}`
const faqs = [
  ['What do I need?', 'A phone, tablet or computer with a camera and microphone, a current browser such as Chrome or Edge, and a steady internet connection. A computer is best for programming and design courses.'],
  ['How do I join a course?', 'Open a course and choose “Join on WhatsApp”, then ask us for the dates and fees.'],
  ['Where do live lessons happen?', 'Each lesson has its own private link. Open it a few minutes early to check your camera and microphone, then enter the class.'],
  ['Can I book a private lesson?', 'Yes. Choose “Book” beside any class, pick a time, then send the invite to our team to confirm a tutor.'],
]

export default function OnlineStudy() {
  const { hash } = useLocation()
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const [next, setNext] = useState(null)
  useEffect(() => {
    const now = Date.now()
    setNext(loadLessons()
      .filter((l) => new Date(l.start).getTime() + (l.mins || 180) * 60000 > now)
      .sort((a, b) => new Date(a.start) - new Date(b.start))[0] || null)
  }, [])
  // Links such as /online_study#web-design open that course
  useEffect(() => {
    const el = hash && document.getElementById(hash.slice(1))
    if (el?.tagName === 'DETAILS') el.open = true
  }, [hash])

  const words = q.toLowerCase().split(/\s+/).filter(Boolean)
  const list = courses.filter((c) => (cat === 'All' || c.cat === cat) &&
    words.every((w) => `${c.title} ${c.text} ${c.tools} ${c.level} ${c.classes.join(' ')}`.toLowerCase().includes(w)))

  return (
    <>
      <section className="os-hero">
        <div className="container os-hero__grid">
          <div>
            <h1>Learn ICT skills live, from wherever you are</h1>
            <p>{courses.length} short courses taught in small steps, from first-time computer use to programming, data, design and security.</p>
            <div className="os-row">
              <Link to="/online_study#courses" className="os-btn os-btn--white">See the courses</Link>
              <Link to="/online_study/schedule" className="os-btn os-btn--line">Schedule a lesson</Link>
            </div>
          </div>
          <div className="os-next">
            {next ? (
              <>
                <h2>Your next lesson</h2>
                <strong>{next.title}</strong>
                <span>{when(next.start)}</span>
                <Link to={lessonPath(next)} className="os-btn os-btn--brand">Go to classroom</Link>
              </>
            ) : (
              <>
                <h2>How lessons work</h2>
                <ol>
                  <li>Choose a course and class</li>
                  <li>Pick a time and send the invite</li>
                  <li>Check your camera and sound, then join</li>
                </ol>
                <Link to="/online_study/class/check" className="os-btn os-btn--brand">Test camera and sound</Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="os-body" id="courses">
        <div className="container">
          <div className="os-tools">
            <label className="os-search">
              <span className="sr">Search courses</span>
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search courses, tools or topics" />
            </label>
            <div className="os-cats" role="group" aria-label="Course area">
              {courseCats.map((x) => <button key={x} type="button" aria-pressed={cat === x} onClick={() => setCat(x)}>{x}</button>)}
            </div>
          </div>
          <p className="os-count" role="status">{list.length} {list.length === 1 ? 'course' : 'courses'}</p>
          <div className="os-list">
            {list.map((c) => (
              <details className="os-course" key={c.slug} id={c.slug}>
                <summary>
                  <span><b>{c.title}</b><small>{c.text}</small></span>
                  <em>{c.level}</em>
                  <em>{c.classes.length} classes</em>
                  <i aria-hidden="true" />
                </summary>
                <div className="os-course__in">
                  <ol>
                    {c.classes.map((t, i) => (
                      <li key={t}>
                        <span>{t}</span>
                        <Link to={`/online_study/schedule?course=${c.slug}&class=${i + 1}`} aria-label={`Book class ${i + 1}: ${t}`}>Book</Link>
                      </li>
                    ))}
                  </ol>
                  <div className="os-course__side">
                    <p><b>You will use</b><br />{c.tools}</p>
                    <a className="os-btn os-btn--brand" href={enrol(c)} target="_blank" rel="noreferrer">Join on WhatsApp</a>
                    <Link className="os-btn os-btn--soft" to={`/online_study/schedule?course=${c.slug}`}>Schedule a lesson</Link>
                  </div>
                </div>
              </details>
            ))}
            {!list.length && (
              <div className="os-empty">
                <p>No course matches that search.</p>
                <button type="button" className="os-btn os-btn--soft" onClick={() => { setQ(''); setCat('All') }}>Show all courses</button>
              </div>
            )}
          </div>

          <div className="os-faq">
            <h2>Before you start</h2>
            <dl>{faqs.map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl>
          </div>
        </div>
      </section>
    </>
  )
}
