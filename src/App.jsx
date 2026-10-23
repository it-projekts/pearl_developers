import { useCallback, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import Header, { SideMenu } from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { Cursor, FloatChat, Grain } from './components/Extras.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services, { ServiceDetail } from './pages/Services.jsx'
import Solutions from './pages/Solutions.jsx'
import Industries from './pages/Industries.jsx'
import Work from './pages/Work.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

const titles = {
  '/': 'Pearl Developers Limited — Software, AI & Systems Studio',
  '/about': 'About — Pearl Developers',
  '/services': 'Services — Pearl Developers',
  '/solutions': 'Solutions — Pearl Developers',
  '/industries': 'Industries — Pearl Developers',
  '/work': 'Work — Pearl Developers',
  '/contact': 'Contact — Pearl Developers',
}

export default function App() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  // Smooth scrolling
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.1 })
    window.__lenis = lenis
    let raf
    const loop = (t) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    menuOpen ? window.__lenis?.stop() : window.__lenis?.start()
  }, [menuOpen])

  // Scroll to top / hash on navigation + title
  useEffect(() => {
    const base = '/' + location.pathname.split('/')[1]
    document.title = titles[base] || titles['/']
    const id = location.hash?.slice(1)
    const t = setTimeout(() => {
      const el = id && document.getElementById(id)
      if (el) {
        window.__lenis ? window.__lenis.scrollTo(el, { offset: -90 }) : el.scrollIntoView()
      } else {
        window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0)
      }
    }, 60)
    return () => clearTimeout(t)
  }, [location.pathname, location.hash])

  return (
    <>
      <Header onOpenMenu={() => setMenuOpen(true)} />
      <SideMenu open={menuOpen} onClose={closeMenu} />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/work" element={<Work />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </motion.main>
      </AnimatePresence>
      <FloatChat />
      <Grain />
      <Cursor />
    </>
  )
}
