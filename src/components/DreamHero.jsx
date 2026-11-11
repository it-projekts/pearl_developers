import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { solutionCount } from '../data/site.js'

const ghost = 'SOFTWARE · AI · SYSTEMS · APPS · '

function Scene() {
  return (
    <svg className="dream__scene" viewBox="0 0 1000 640" role="img" aria-label="A floating hologram screen above a small projector, a smiling pink mug and a green ball on a pedestal">
      <defs>
        <linearGradient id="dp-ped" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" /><stop offset="1" stop-color="#d9d3f5" /></linearGradient>
        <linearGradient id="dp-dev" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b7dcf2" /><stop offset="1" stop-color="#6ea6dc" /></linearGradient>
        <linearGradient id="dp-beam" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#7dffa0" stop-opacity=".85" /><stop offset="1" stop-color="#bff5e4" stop-opacity=".12" /></linearGradient>
        <radialGradient id="dp-ball" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#d8ffb0" /><stop offset=".5" stop-color="#7fd65a" /><stop offset="1" stop-color="#4aa83c" /></radialGradient>
        <filter id="dp-glow"><feGaussianBlur stdDeviation="5" /></filter>
      </defs>
      <rect x="110" y="480" width="780" height="170" rx="24" fill="url(#dp-ped)" />
      <polygon points="300,215 700,215 575,440 425,440" fill="url(#dp-beam)" />
      <g className="dream__panel">
        <rect x="205" y="40" width="590" height="200" rx="26" fill="#ffffff" fill-opacity=".3" stroke="#ffffff" stroke-opacity=".7" stroke-width="2" />
        {[[205, 40], [795, 40], [205, 240], [795, 240]].map(([x, y]) => (
          <rect key={x + '-' + y} x={x - 18} y={y - 18} width="36" height="36" rx="10" fill="#7f9ff0" stroke="#fff" stroke-opacity=".8" stroke-width="3" />
        ))}
        {['#ff5fa2', '#2b2b2b', '#8f7bff', '#1db954', '#e01e5a'].map((c, i) => (
          <circle key={c} cx="248" cy={78 + i * 34} r="12" fill={c} />
        ))}
        <rect x="290" y="62" width="460" height="150" rx="14" fill="#fff" fill-opacity=".72" />
        <rect x="312" y="94" width="230" height="96" rx="12" fill="#fff" />
        <text x="330" y="136" font-family="DM Sans, sans-serif" font-weight="700" font-size="22" fill="#14181c">Hello there,</text>
        <text x="330" y="168" font-family="DM Sans, sans-serif" font-weight="700" font-size="22" fill="#14181c">visitor 👋</text>
        {['Discovery', 'Design', 'Build', 'Launch'].map((t, i) => (
          <g key={t}>
            <circle cx="574" cy={104 + i * 26} r="4" fill="#4cd37c" />
            <text x="586" y={108 + i * 26} font-family="DM Sans, sans-serif" font-size="12" fill="#3d4750">{t}</text>
          </g>
        ))}
      </g>
      <rect x="330" y="415" width="340" height="100" rx="46" fill="url(#dp-dev)" />
      <ellipse cx="500" cy="428" rx="120" ry="14" fill="#8fc4ea" />
      <rect x="372" y="468" width="170" height="14" rx="7" fill="#6dff8a" filter="url(#dp-glow)" />
      <rect x="372" y="468" width="170" height="14" rx="7" fill="#7dffa0" />
      <circle cx="610" cy="470" r="25" fill="#ff7fb5" stroke="#ffc2dc" stroke-width="4" />
      <rect x="150" y="372" width="104" height="112" rx="16" fill="#ff6fb0" />
      <path d="M254 398 q44 4 40 36 q-4 28 -40 28" fill="none" stroke="#ff6fb0" stroke-width="14" stroke-linecap="round" />
      <circle cx="184" cy="410" r="14" fill="#fff" /><circle cx="226" cy="410" r="14" fill="#fff" />
      <circle cx="187" cy="412" r="6" fill="#222" /><circle cx="229" cy="412" r="6" fill="#222" />
      <path d="M190 438 q16 14 32 0" fill="none" stroke="#7a1f4a" stroke-width="4" stroke-linecap="round" />
      <circle cx="770" cy="436" r="46" fill="url(#dp-ball)" />
    </svg>
  )
}

export default function DreamHero({ onOpenMenu }) {
  const [day, setDay] = useState(true)
  useEffect(() => {
    document.body.classList.add('is-dream')
    return () => document.body.classList.remove('is-dream')
  }, [])

  return (
    <section className="dream" data-dream={day ? 'on' : 'off'}>
      <div className="dream__stars" aria-hidden="true" />
      <div className="dream__ghost" aria-hidden="true"><span>{ghost.repeat(4)}</span></div>
      <i className="dream__cloud dream__cloud--l" aria-hidden="true" />
      <i className="dream__cloud dream__cloud--r" aria-hidden="true" />

      <div className="dream__intro">
        <p className="dream__hi">Hi, we’re</p>
        <h1 className="dream__name">Pearl</h1>
        <p className="dream__sub">
          A software studio building apps, AI and {solutionCount}+ business systems, with a playful eye and a love for the details.
        </p>
      </div>

      <button type="button" className="dream__menu" onClick={onOpenMenu}>Menu <i aria-hidden="true" /></button>
      <Scene />

      <nav className="dream__nav" aria-label="Main">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/work">Work</NavLink>
        <NavLink to="/about">Studio</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <div className="dream__mode">
          <span id="dm-label">Daydream Mode</span>
          <button type="button" role="switch" aria-checked={day} aria-labelledby="dm-label" className="dream__switch" onClick={() => setDay((d) => !d)}>
            <b>{day ? 'ON' : 'OFF'}</b><i />
          </button>
        </div>
      </nav>
    </section>
  )
}
