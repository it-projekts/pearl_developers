import { company } from '../data/site.js'

const icons = {
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></>,
  phone: <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  WhatsApp: <><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M8.8 8.6c0 3.4 2.9 6.4 6.4 6.4l1.1-1.6-2.1-1-1 .8a4.2 4.2 0 0 1-2-2l.8-1-1-2.1-2.2.5" /></>,
  LinkedIn: <><path d="M5 10v10M10 20V10M10 14.5c0-2.6 1.6-4.5 4.5-4.5S19 12 19 14.5V20" /><path d="M5 5v.5" strokeWidth="3" /></>,
  'X / Twitter': <path d="m4 4 16 16M20 4 4 20" />,
  Instagram: <><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17 7h.01" /></>,
  TikTok: <path d="M14 3v12.5a4 4 0 1 1-4-4M14 3c.3 3 2.2 5 5.5 5.3" />,
  Facebook: <path d="M14.5 21v-8h3l.5-3.5h-3.5V7.5c0-1.2.6-2 2-2H18V2.6C15 2 11 2.4 11 7v2.5H8V13h3v8" />,
  GitHub: <path d="M9 19c-4.5 1.4-4.5-2.2-6-2.7M15 22v-3.6c0-1 .1-1.4-.5-2 2.8-.3 5.7-1.4 5.7-6.2a4.8 4.8 0 0 0-1.3-3.4 4.5 4.5 0 0 0-.1-3.3s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6.2 0C6.800 3.200 5.800 3.500 5.800 3.500a4.500 4.500 0 0 0-.1 3.300A4.800 4.800 0 0 0 4.400 10.200c0 4.800 2.900 5.900 5.700 6.200-.6.600-.6 1.200-.5 2V22" />,
}
const Icon = ({ name }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>
)

const ALWAYS = ['Facebook', 'X / Twitter', 'TikTok', 'Instagram']

/** Contact details on the left, social icons on the right */
export default function TopBar() {
  const social = [...company.socials.filter((s) => s.href || ALWAYS.includes(s.label)), { label: 'WhatsApp', href: `https://wa.me/${company.whatsapp}` }]
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <div className="topbar__info">
          <a className="topbar__mail" href={`mailto:${company.email}`}><Icon name="mail" />{company.email}</a>
          <a className="topbar__place" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`} target="_blank" rel="noreferrer"><Icon name="pin" />{company.address}</a>
          <a className="topbar__phone" href={`tel:${company.phone.replace(/\s/g, '')}`}><Icon name="phone" />{company.phone}</a>
        </div>
        <div className="topbar__social">
          {social.map((s) => s.href
            ? <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} title={s.label}><Icon name={s.label} /></a>
            : <span key={s.label} aria-hidden="true"><Icon name={s.label} /></span>)}
        </div>
      </div>
    </div>
  )
}
