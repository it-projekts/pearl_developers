import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Arrow, PageHero, Reveal } from '../components/ui.jsx'
import { company, services } from '../data/site.js'

// Optional: set a Formspree (https://formspree.io) or similar endpoint to receive
// submissions by email. When empty, the form opens the visitor's email app instead.
const FORM_ENDPOINT = '' // e.g. 'https://formspree.io/f/xxxxxxx'

const budgets = ['< $2k', '$2k – $5k', '$5k – $15k', '$15k +', 'Not sure']

export default function Contact() {
  const [params] = useSearchParams()
  const topic = params.get('topic') || ''
  const [interest, setInterest] = useState(topic ? [topic] : [])
  const [budget, setBudget] = useState('')
  const [status, setStatus] = useState('idle')

  const toggle = (t) => setInterest((arr) => (arr.includes(t) ? arr.filter((x) => x !== t) : [...arr, t]))

  async function submit(e) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    data.interest = interest.join(', ')
    data.budget = budget
    if (FORM_ENDPOINT) {
      setStatus('sending')
      try {
        const r = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) })
        setStatus(r.ok ? 'sent' : 'error')
      } catch {
        setStatus('error')
      }
      return
    }
    const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nCompany: ${data.company}\nInterested in: ${data.interest}\nBudget: ${data.budget}\n\n${data.message}`
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent('New project enquiry — ' + (data.name || ''))}&body=${encodeURIComponent(body)}`
    setStatus('sent')
  }

  const chips = [...new Set([...(topic ? [topic] : []), ...services.map((s) => s.title)])]

  return (
    <>
      <PageHero
        crumb="Contact"
        title={<>Let’s make something <span className="italic">rare</span></>}
        lead="Tell us about your idea, your system or your challenge. We reply within one business day."
      />
      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="container contact-grid">
          <Reveal>
            <div className="contact-card">
              <div><small>Email</small><a href={`mailto:${company.email}`}>{company.email}</a></div>
              <div><small>Phone</small><a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a></div>
              <div><small>WhatsApp</small><a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer">Chat with us ↗</a></div>
              <div><small>Office</small><span style={{ fontSize: 20 }}>{company.address}</span></div>
              <div><small>Hours</small><span>{company.hours}</span></div>
            </div>
          </Reveal>

          {status === 'sent' ? (
            <div className="success">
              <h3 className="h-3">Thank you — <span className="italic">message ready.</span></h3>
              <p className="muted">If your email app didn’t open, write to us directly at <a href={`mailto:${company.email}`}>{company.email}</a>.</p>
            </div>
          ) : (
            <form className="form" onSubmit={submit}>
              <div className="field">
                <label>I’m interested in</label>
                <div className="chips">
                  {chips.map((c) => (
                    <button type="button" key={c} className={`chip ${interest.includes(c) ? 'is-on' : ''}`} onClick={() => toggle(c)}>{c}</button>
                  ))}
                </div>
              </div>
              <div className="form__row">
                <div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" required autoComplete="name" /></div>
                <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required autoComplete="email" /></div>
              </div>
              <div className="form__row">
                <div className="field"><label htmlFor="phone">Phone</label><input id="phone" name="phone" autoComplete="tel" /></div>
                <div className="field"><label htmlFor="company">Organisation</label><input id="company" name="company" autoComplete="organization" /></div>
              </div>
              <div className="field">
                <label>Budget</label>
                <div className="chips">
                  {budgets.map((b) => (
                    <button type="button" key={b} className={`chip ${budget === b ? 'is-on' : ''}`} onClick={() => setBudget(b)}>{b}</button>
                  ))}
                </div>
              </div>
              <div className="field"><label htmlFor="message">Tell us about your project</label><textarea id="message" name="message" required /></div>
              <div>
                <button className="btn btn--dark" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send message'} <Arrow dir="right" />
                </button>
                {status === 'error' && <p style={{ color: '#a33' }}>Something went wrong — please email us directly.</p>}
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
