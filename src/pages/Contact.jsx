import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { company, services, liveSocials } from '../data/site.js'

// Optional: set a Formspree (https://formspree.io) or similar endpoint to receive
// submissions by email. When empty, the form opens the visitor's email app instead.
const FORM_ENDPOINT = '' // e.g. 'https://formspree.io/f/xxxxxxx'

const codes = [['UG', '+256'], ['KE', '+254'], ['TZ', '+255'], ['RW', '+250'], ['US', '+1'], ['GB', '+44'], ['IN', '+91']]
const short = { LinkedIn: 'in', 'X / Twitter': 'X', Instagram: 'ig', Facebook: 'f', GitHub: 'gh' }

const I = (d) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
)
const icons = {
  pin: I(<><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>),
  phone: I(<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />),
  mail: I(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>),
  share: I(<><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6" /></>),
  user: I(<><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4 4-6 8-6s7 2 8 6" /></>),
  list: I(<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" />),
  edit: I(<><path d="M4 20h4L19 9l-4-4L4 16v4z" /><path d="m13.5 6.5 4 4" /></>),
}

export default function Contact() {
  const [params] = useSearchParams()
  const topic = params.get('topic') || ''
  const [status, setStatus] = useState('idle')
  const options = [...new Set([...(topic ? [topic] : []), ...services.map((s) => s.title)])]
  const mapQ = encodeURIComponent(company.address)

  async function submit(e) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    data.phone = `${data.code} ${data.phone}`
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
    const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nInterested in: ${data.interest}\n\n${data.message}`
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent('New project enquiry — ' + (data.name || ''))}&body=${encodeURIComponent(body)}`
    setStatus('sent')
  }

  return (
    <section className="ct">
      <div className="container ct__grid">
        <div className="ct__info">
          <h1 className="ct__title">Contact us</h1>
          <p className="ct__lead">Have a question, an idea or a system you need built? Reach out and we will reply within one business day.</p>

          <div className="ct__facts">
            <div className="ct__fact">
              <span className="ct__icon">{icons.pin}</span>
              <div><h2>Location</h2><p>{company.address}</p><p className="ct__small">{company.hours}</p></div>
            </div>
            <div className="ct__fact">
              <span className="ct__icon">{icons.phone}</span>
              <div>
                <h2>Phone</h2>
                <p><a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a></p>
                <p><a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer">Chat on WhatsApp</a></p>
              </div>
            </div>
            <div className="ct__fact">
              <span className="ct__icon">{icons.mail}</span>
              <div><h2>Email</h2><p><a href={`mailto:${company.email}`}>{company.email}</a></p></div>
            </div>
            {liveSocials.length > 0 && (
              <div className="ct__fact">
              <span className="ct__icon">{icons.share}</span>
              <div>
                <h2>Social</h2>
                <div className="ct__social">
                  {liveSocials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>{short[s.label] || s.label[0]}</a>
                  ))}
                </div>
              </div>
            </div>
            )}
          </div>

          <div className="ct__map">
            <iframe title={`Map of ${company.address}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://maps.google.com/maps?q=${mapQ}&z=13&output=embed`} />
            <a className="ct__maplink" href={`https://www.google.com/maps/search/?api=1&query=${mapQ}`} target="_blank" rel="noreferrer">Open in Maps</a>
          </div>
        </div>

        <div className="ct__panel">
          {status === 'sent' ? (
            <div role="status">
              <h2 className="ct__ptitle">Thank you, your message is ready.</h2>
              <p className="ct__small">If your email app did not open, write to us at <a href={`mailto:${company.email}`}>{company.email}</a>.</p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <h2 className="ct__ptitle">Send us a message</h2>
              <div className="cf">
                <label className="sr" htmlFor="name">Your name</label>
                {icons.user}<input id="name" name="name" placeholder="Your name*" required autoComplete="name" />
              </div>
              <div className="cf">
                <label className="sr" htmlFor="email">Email address</label>
                {icons.mail}<input id="email" name="email" type="email" placeholder="Email address*" required autoComplete="email" />
              </div>
              <div className="cf cf--phone">
                <label className="sr" htmlFor="code">Country code</label>
                <select id="code" name="code" defaultValue="+256">{codes.map(([c, n]) => <option key={c} value={n}>{c} {n}</option>)}</select>
                <label className="sr" htmlFor="phone">Mobile number</label>
                <input id="phone" name="phone" type="tel" placeholder="Mobile number*" required autoComplete="tel-national" />
              </div>
              <div className="cf">
                <label className="sr" htmlFor="interest">I am interested in</label>
                {icons.list}
                <select id="interest" name="interest" defaultValue={topic || ''}>
                  <option value="">I am interested in…</option>
                  {options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div className="cf cf--area">
                <label className="sr" htmlFor="message">Your message</label>
                {icons.edit}<textarea id="message" name="message" placeholder="Tell us about your project*" required rows="4" />
              </div>
              <button className="ct__submit" type="submit" disabled={status === 'sending'}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7z" /></svg>
                {status === 'sending' ? 'Sending…' : 'Get in touch'}
              </button>
              {status === 'error' && <p role="alert" className="ct__err">Something went wrong. Please email us directly.</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
