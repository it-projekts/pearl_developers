import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { company } from '../data/site.js'
import { courses, courseBySlug } from '../data/courses.js'
import { downloadIcs, googleUrl, inviteText, length, lessonPath, lessonUrl, loadLessons, newRoom, saveLessons, when } from '../lib/lessons.js'

const pad = (n) => String(n).padStart(2, '0')
const local = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
// the next full hour that is at least 30 minutes away
const soon = () => {
  const d = new Date(Date.now() + 90 * 60000)
  d.setMinutes(0, 0, 0)
  return local(d)
}
const titleFor = (c, n) => (c ? (n ? `${c.title}: ${c.classes[n - 1]}` : c.title) : '')
const isMail = (s) => /^\S+@\S+\.\S+$/.test(s)
const digits = (s) => {
  const d = s.replace(/\D/g, '')
  return d.startsWith('0') ? `256${d.slice(1)}` : d
}

function Share({ l }) {
  const [copied, setCopied] = useState(false)
  const mails = l.people.filter((p) => isMail(p.contact)).map((p) => p.contact)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(lessonUrl(l))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copy this link', lessonUrl(l))
    }
  }
  const wa = (to, text) => `https://wa.me/${to}?text=${encodeURIComponent(text)}`
  return (
    <div className="os-share">
      <button type="button" className="os-chip" onClick={copy}>{copied ? 'Link copied' : 'Copy link'}</button>
      <a className="os-chip" href={wa(company.whatsapp, `Please confirm a tutor for this lesson.\n\n${inviteText(l)}`)} target="_blank" rel="noreferrer">Ask our team to confirm</a>
      <a className="os-chip" href={wa('', inviteText(l))} target="_blank" rel="noreferrer">Share on WhatsApp</a>
      <a className="os-chip" href={`mailto:${mails.map(encodeURIComponent).join(',')}?subject=${encodeURIComponent(l.title)}&body=${encodeURIComponent(inviteText(l))}`}>{mails.length ? `Email ${mails.length} ${mails.length === 1 ? 'person' : 'people'}` : 'Email invite'}</a>
      {l.people.filter((p) => !isMail(p.contact)).map((p) => (
        <a className="os-chip" key={p.contact} href={wa(digits(p.contact), inviteText(l))} target="_blank" rel="noreferrer">WhatsApp {p.name}</a>
      ))}
      <a className="os-chip" href={googleUrl(l)} target="_blank" rel="noreferrer">Google Calendar</a>
      <button type="button" className="os-chip" onClick={() => downloadIcs(l)}>Calendar file</button>
    </div>
  )
}

export default function ScheduleLesson() {
  const [params] = useSearchParams()
  const nav = useNavigate()
  const first = courseBySlug(params.get('course'))
  const num = Number(params.get('class'))
  const firstClass = first?.classes[num - 1] ? String(num) : ''
  const [slug, setSlug] = useState(first?.slug || '')
  const [cls, setCls] = useState(firstClass)
  const [title, setTitle] = useState(titleFor(first, Number(firstClass)))
  const [start, setStart] = useState(soon)
  const [mins, setMins] = useState(60)
  const [people, setPeople] = useState([])
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [err, setErr] = useState('')
  const [pErr, setPErr] = useState('')
  const [shown, setShown] = useState(null)
  const [lessons, setLessons] = useState(loadLessons)
  const course = courseBySlug(slug)
  const sorted = [...lessons].sort((a, b) => new Date(a.start) - new Date(b.start))

  const pick = (s, n) => {
    setSlug(s)
    setCls(n)
    setTitle(titleFor(courseBySlug(s), Number(n)))
  }
  const addPerson = () => {
    const n = name.trim()
    const v = contact.trim()
    if (!n) return setPErr('Enter a name.')
    if (!isMail(v) && digits(v).length < 9) return setPErr('Enter an email address or phone number.')
    if (people.some((p) => p.contact === v)) return setPErr('That person is already on the list.')
    setPeople([...people, { name: n, contact: v }])
    setName('')
    setContact('')
    setPErr('')
  }
  const store = (l) => {
    const list = [...lessons, l]
    setLessons(list)
    if (!saveLessons(list)) setErr('This browser blocked saving, so keep the lesson link yourself.')
  }
  const make = (iso) => ({ room: newRoom(title), title: title.trim(), start: iso, mins, people })
  const startNow = () => {
    if (!title.trim()) return setErr('Give the lesson a title.')
    const l = make(new Date().toISOString())
    store(l)
    nav(lessonPath(l))
  }
  const schedule = (e) => {
    e.preventDefault()
    setErr('')
    if (!title.trim()) return setErr('Give the lesson a title.')
    const s = new Date(start)
    if (Number.isNaN(s.getTime())) return setErr('Choose a date and time.')
    if (s <= new Date()) return setErr('Choose a time that has not passed.')
    const end = (t, m) => t + (m || 60) * 60000
    const clash = lessons.find((x) => {
      const t = new Date(x.start).getTime()
      return t < end(s.getTime(), mins) && end(t, x.mins) > s.getTime()
    })
    if (clash) return setErr(`This overlaps with “${clash.title}” on ${when(clash.start)}.`)
    const l = make(s.toISOString())
    store(l)
    setShown(l)
    setPeople([])
  }
  const remove = (l) => {
    if (!window.confirm(`Delete “${l.title}” from this device? People with the link can still open the room.`)) return
    const list = lessons.filter((x) => x.room !== l.room)
    saveLessons(list)
    setLessons(list)
    if (shown?.room === l.room) setShown(null)
  }

  return (
    <section className="os-page">
      <div className="container">
        <Link to="/online_study" className="os-back">Back to courses</Link>
        <h1>Schedule a lesson</h1>
        <form className="os-sched" onSubmit={schedule} noValidate>
          <div className="os-card">
            <h2>Lesson details</h2>
            <div className="os-fields">
              <label>Course
                <select value={slug} onChange={(e) => pick(e.target.value, '')}>
                  <option value="">Other topic</option>
                  {courses.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
                </select>
              </label>
              <label>Class
                <select value={cls} disabled={!course} onChange={(e) => pick(slug, e.target.value)}>
                  <option value="">Any class</option>
                  {course?.classes.map((t, i) => <option key={t} value={i + 1}>{i + 1}. {t}</option>)}
                </select>
              </label>
              <label className="os-wide">Lesson title<input value={title} maxLength={90} onChange={(e) => setTitle(e.target.value)} /></label>
              <label>Date and time<input type="datetime-local" value={start} min={local(new Date())} onChange={(e) => setStart(e.target.value)} /></label>
              <label>Duration
                <select value={mins} onChange={(e) => setMins(Number(e.target.value))}>
                  {[30, 60, 90, 120, 180, 0].map((m) => <option key={m} value={m}>{length(m)}</option>)}
                </select>
              </label>
            </div>
            {err && <p className="os-err" role="alert">{err}</p>}
            <div className="os-row">
              <button type="submit" className="os-btn os-btn--brand">Schedule lesson</button>
              <button type="button" className="os-btn os-btn--soft" onClick={startNow}>Start now</button>
            </div>
          </div>
          <div className="os-card os-people">
            <h2>Participants</h2>
            <div className="os-people__in">
              <label>Name<input value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault() }} /></label>
              <label>Email or phone
                <input value={contact} onChange={(e) => setContact(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addPerson() } }} />
              </label>
              {pErr && <p className="os-err" role="alert">{pErr}</p>}
              <button type="button" className="os-btn os-btn--soft" onClick={addPerson}>Add participant</button>
              {people.length ? (
                <ul>
                  {people.map((p) => (
                    <li key={p.contact}>
                      <span><b>{p.name}</b><small>{p.contact}</small></span>
                      <button type="button" onClick={() => setPeople(people.filter((x) => x !== p))} aria-label={`Remove ${p.name}`}>Remove</button>
                    </li>
                  ))}
                </ul>
              ) : <p className="os-hint">Add people now, or share the link later.</p>}
            </div>
          </div>
        </form>

        {shown && (
          <div className="os-card os-made" role="status">
            <h2>Invite people</h2>
            <p><b>{shown.title}</b>, {when(shown.start)}, {length(shown.mins)}</p>
            <p className="os-hint">The lesson is saved. Invites are not sent automatically, so use these buttons to send them.</p>
            <Share key={shown.room} l={shown} />
          </div>
        )}

        <div className="os-mine">
          <h2>Your lessons</h2>
          <p className="os-hint">Saved on this device only.</p>
          {sorted.length ? sorted.map((l) => (
            <div className="os-lesson" key={l.room}>
              <div><b>{l.title}</b><small>{when(l.start)}, {length(l.mins)}{l.people.length ? `, ${l.people.length} invited` : ''}</small></div>
              <div className="os-row">
                <Link className="os-btn os-btn--brand" to={lessonPath(l)}>Open</Link>
                <button type="button" className="os-btn os-btn--soft" onClick={() => setShown(l)}>Invite</button>
                <button type="button" className="os-btn os-btn--plain" onClick={() => remove(l)}>Delete</button>
              </div>
            </div>
          )) : <p>No lessons yet. Fill in the form above to make your first one.</p>}
        </div>
      </div>
    </section>
  )
}
