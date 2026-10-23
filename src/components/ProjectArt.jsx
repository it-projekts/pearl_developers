// Generated, image-free artwork for project cards.
// Replace with real screenshots by passing `image` on a project in data/site.js.

function Chart({ shape, color }) {
  const paths = {
    rings: 'M0 70 C 40 20, 80 90, 120 40 S 200 10, 240 50 S 300 80, 320 30',
    grid: 'M0 80 L40 60 L80 66 L120 40 L160 48 L200 22 L240 30 L280 12 L320 18',
    pulse: 'M0 60 L70 60 L85 20 L100 95 L115 45 L130 60 L320 60',
    wave: 'M0 50 Q 40 10 80 50 T 160 50 T 240 50 T 320 50',
    orb: 'M0 90 C 80 90, 120 10, 320 20',
    arch: 'M0 85 C 60 85, 90 20, 160 20 S 260 85, 320 85',
    radar: 'M0 70 L60 40 L100 75 L150 30 L210 55 L260 25 L320 45',
  }
  return (
    <svg viewBox="0 0 320 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: '20% 6% 10%', width: '88%', height: '70%' }}>
      <path d={paths[shape] || paths.wave} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d={(paths[shape] || paths.wave) + ' L320 100 L0 100 Z'} fill={color} opacity=".18" />
    </svg>
  )
}

export default function ProjectArt({ project, showLabel = true }) {
  const [a, b, c] = project.palette
  if (project.image) {
    return (
      <div className="art">
        <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    )
  }
  const bg = `linear-gradient(135deg, ${a} 0%, ${b} 55%, ${c} 100%)`
  return (
    <div className="art" style={{ background: bg }}>
      <span className="art__blob" style={{ width: '55%', height: '80%', left: '-10%', top: '-20%', background: c }} />
      <span className="art__blob" style={{ width: '45%', height: '70%', right: '-8%', bottom: '-25%', background: '#ffffff' }} />

      {(project.category === 'Systems' || project.category === 'Web') && (
        <div className="art__window">
          <div className="art__side">
            <i /> <i /> <i style={{ width: '80%' }} /> <i /> <i style={{ width: '70%' }} /> <i />
          </div>
          <div className="art__main">
            <div className="art__kpis"><b /><b /><b /></div>
            <div className="art__chart"><Chart shape={project.shape} color="#6b55a8" /></div>
          </div>
        </div>
      )}

      {project.category === 'Mobile' && (
        <>
          <div className="art__phone">
            <div style={{ background: `linear-gradient(180deg, #fff, ${b})` }}>
              <div style={{ position: 'absolute', inset: '12% 10% auto', height: '28%', borderRadius: 12, background: c, opacity: 0.8 }} />
              {[48, 60, 72].map((t) => (
                <div key={t} style={{ position: 'absolute', left: '10%', right: '10%', top: `${t}%`, height: '8%', borderRadius: 8, background: 'rgba(27,24,26,.08)' }} />
              ))}
              <div style={{ position: 'absolute', left: '10%', right: '10%', bottom: '6%', height: '9%', borderRadius: 99, background: '#1b181a' }} />
            </div>
          </div>
          <div className="art__phone" style={{ left: '72%', top: '24%', transform: 'translateX(-50%) rotate(8deg) scale(.85)', opacity: 0.85 }}>
            <div style={{ background: `linear-gradient(180deg, ${a}, #fff)` }}>
              <Chart shape={project.shape} color="#6b55a8" />
            </div>
          </div>
        </>
      )}

      {project.category === 'AI' && (
        <>
          <div
            style={{
              position: 'absolute', width: '30%', aspectRatio: '1', borderRadius: '50%', left: '50%', top: '46%', transform: 'translate(-50%,-50%)',
              background: 'radial-gradient(circle at 32% 28%, #fff 0 8%, #f7e7ef 24%, #d8d7f3 50%, #b4c7e6 72%, #9d8bc4 100%)',
              boxShadow: 'inset -14px -20px 40px rgba(110,70,140,.25), 0 30px 50px -20px rgba(110,70,120,.5)',
            }}
          />
          {[
            { l: '10%', t: '20%', w: '30%' },
            { l: '60%', t: '62%', w: '28%' },
            { l: '14%', t: '66%', w: '22%' },
          ].map((s, i) => (
            <div key={i} style={{ position: 'absolute', left: s.l, top: s.t, width: s.w, height: '11%', borderRadius: 16, background: 'rgba(255,255,255,.7)', backdropFilter: 'blur(8px)', boxShadow: '0 10px 30px -10px rgba(60,30,70,.3)' }} />
          ))}
        </>
      )}

      {project.category === 'IoT' && (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
          {[80, 60, 40, 20].map((s) => (
            <div key={s} style={{ position: 'absolute', width: `${s}%`, aspectRatio: '1', borderRadius: '50%', border: '1.5px solid rgba(27,24,26,.25)' }} />
          ))}
          <div style={{ position: 'absolute', width: '40%', aspectRatio: '1', borderRadius: '50%', background: `conic-gradient(from 0deg, transparent 0 75%, ${c} 100%)`, transformOrigin: 'center', animation: 'spin 4s linear infinite', left: '50%', top: '50%', translate: '-50% -50%' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#1b181a' }} />
          <style>{'@keyframes spin{to{transform:rotate(360deg)}}'}</style>
        </div>
      )}

      {showLabel && <span className="art__label">{project.title}</span>}
    </div>
  )
}
