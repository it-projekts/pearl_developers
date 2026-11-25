import { useEffect, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

// Each line lights up word by word over its own stretch of the scroll (0 to 1)
const LINES = [
  ['We build custom software, mobile apps and AI tools.', 0.06, 0.36],
  ['Ready‑made systems for SACCOs, schools, hospitals and businesses.', 0.4, 0.66],
  ['Built in Uganda, supported long after launch.', 0.7, 0.9],
]

function Word({ children, progress, from, to, still }) {
  const opacity = useTransform(progress, [from, to], [0.28, 1])
  return <motion.span style={{ opacity: still ? 1 : opacity }}>{children} </motion.span>
}

export default function WhoWeAre() {
  const section = useRef(null)
  const art = useRef(null)
  const still = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: section, offset: ['start 0.55', 'end end'] })

  // The 3D code is only downloaded when the section gets close
  useEffect(() => {
    let dead = false, stop
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      import('../lib/pearlShell.js').then(({ startShell }) => {
        if (dead || !art.current) return
        // a fresh canvas each time: a disposed WebGL canvas cannot be reused
        const el = document.createElement('canvas')
        art.current.appendChild(el)
        try {
          const end = startShell(el, () => scrollYProgress.get(), still)
          stop = () => { end(); el.remove() }
        } catch {
          el.remove() // no WebGL: the text stands alone
        }
      }).catch(() => {})
    }, { rootMargin: '600px' })
    io.observe(section.current)
    return () => { dead = true; io.disconnect(); stop?.() }
  }, [scrollYProgress, still])

  return (
    <section className="who" ref={section} aria-labelledby="who-title">
      <div className="who__stage">
        <div className="who__inner">
          <div className="who__text">
            <h2 id="who-title">Who we are</h2>
            {LINES.map(([text, a, b]) => {
              const words = text.split(' ')
              const step = (b - a) / words.length
              return (
                <p key={text}>
                  {words.map((w, i) => <Word key={i} progress={scrollYProgress} from={a + i * step} to={a + (i + 1.6) * step} still={still}>{w}</Word>)}
                </p>
              )
            })}
          </div>
          <div className="who__art" ref={art} aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
