import { useEffect, useState } from 'react'
import '../intro.css'

/* ── 5-second opening screen ─────────────────────────────── */
export default function Splash() {
  const [phase, setPhase] = useState(() => (typeof window !== 'undefined' && window.__splashDone ? 'gone' : 'show'))

  useEffect(() => {
    if (phase === 'gone') return
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    const t1 = setTimeout(() => setPhase('out'), 4400)
    const t2 = setTimeout(() => {
      root.style.overflow = prev
      window.__splashDone = true
      window.dispatchEvent(new Event('splash:done'))
      setPhase('gone')
    }, 5000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      root.style.overflow = prev
    }
  }, [])

  if (phase === 'gone') return null
  return (
    <div className={`splash ${phase === 'out' ? 'is-out' : ''}`} aria-hidden="true">
      <div className="splash__inner">
        <div className="splash__word">
          {[...'PEARL DEVELOPERS'].map((c, i) => (
            <span key={i} style={{ animationDelay: `${0.15 + i * 0.07}s` }}>{c === ' ' ? '\u00a0' : c}</span>
          ))}
        </div>
        <i className="splash__line" />
      </div>
    </div>
  )
}

/* True once the opening screen has finished (immediately if it already ran). */
export function useSplashDone() {
  const [done, setDone] = useState(() => typeof window !== 'undefined' && !!window.__splashDone)
  useEffect(() => {
    if (done) return
    const f = () => setDone(true)
    window.addEventListener('splash:done', f)
    return () => window.removeEventListener('splash:done', f)
  }, [done])
  return done
}

/* ── Typing effect: types `lines` one after another once `start` is true ── */
export function useTypedLines(lines, start, speeds) {
  const [shown, setShown] = useState(() => lines.map(() => ''))
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!start) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(lines)
      setDone(true)
      return
    }
    setShown(lines.map(() => ''))
    setDone(false)
    let li = 0
    let ci = 0
    let t
    const tick = () => {
      if (li >= lines.length) { setDone(true); return }
      const idx = li
      const n = ++ci
      const str = lines[idx].slice(0, n)
      setShown((p) => p.map((s, i) => (i === idx ? str : s)))
      if (n >= lines[idx].length) { li++; ci = 0; t = setTimeout(tick, 240) } else t = setTimeout(tick, speeds[idx])
    }
    t = setTimeout(tick, 250)
    return () => clearTimeout(t)
  }, [start])

  const first = shown.findIndex((s, i) => s.length < lines[i].length)
  return { shown, done, active: first === -1 ? lines.length - 1 : first }
}

/* Renders typed text; the untyped rest stays invisible so the layout never jumps. */
export function Typed({ text, full, caret }) {
  return (
    <span aria-hidden="true">
      {text}
      {caret && <i className="tw-caret" />}
      <span className="tw-rest">{full.slice(text.length)}</span>
    </span>
  )
}
