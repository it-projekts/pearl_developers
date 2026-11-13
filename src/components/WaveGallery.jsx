// WebGL "wave" gallery for project images (unseen.co style).
// One fixed, see-through canvas draws every registered project image as a
// soft 3D sheet that sits exactly over its card. While you scroll the sheets
// bend and ripple with the scroll speed, tilt back as they leave the screen,
// and the cards coming up pass in front of the ones going away.
// The real <img> stays in the page (for layout, SEO and screen readers) but
// is hidden once its sheet is ready. Without WebGL nothing changes.
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

const Ctx = createContext(null)
export const useWaveGallery = () => useContext(Ctx)

const vertex = /* glsl */ `
  uniform float uVel;
  uniform float uTime;
  uniform vec2 uSize;
  uniform vec2 uView;
  varying vec2 vUv;
  varying float vDepth;
  const float PI = 3.141592653589793;
  void main() {
    vUv = uv;
    vec4 w = modelMatrix * vec4(position, 1.0);
    // the page curves away like the inside of a drum, top and bottom
    float ny = clamp(w.y / (uView.y * 0.5), -1.6, 1.6);
    w.z -= ny * ny * uView.y * 0.12;
    // scroll speed bends the sheet: its middle lags behind the edges
    w.y -= uVel * sin(uv.x * PI) * uSize.y * 0.14;
    w.z += abs(uVel) * sin(uv.y * PI) * sin(uv.x * PI) * -uSize.y * 0.18;
    // and a ripple runs across it
    w.z += uVel * sin(uv.x * PI * 2.0 + uv.y * 3.0 + uTime * 6.0) * uSize.y * 0.05;
    vDepth = w.z;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`

const fragment = /* glsl */ `
  uniform sampler2D uTex;
  uniform vec2 uSize;
  uniform float uAspect;
  uniform float uHover;
  uniform float uRadius;
  uniform float uShade;
  varying vec2 vUv;
  varying float vDepth;
  float rbox(vec2 p, vec2 b, float r) { vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
  void main() {
    vec2 px = (vUv - 0.5) * uSize;
    float d = rbox(px, uSize * 0.5, uRadius);
    if (d > 0.5) discard;
    float box = uSize.x / uSize.y;
    vec2 uv = (vUv - 0.5) / (1.0 + uHover * 0.06);
    // blurred "cover" copy fills the card
    vec2 cs = box > uAspect ? vec2(1.0, uAspect / box) : vec2(box / uAspect, 1.0);
    vec3 col = texture2D(uTex, uv * cs + 0.5, 5.5).rgb * 0.88 + 0.08;
    // whole image ("contain") on top
    vec2 ct = box > uAspect ? vec2(box / uAspect, 1.0) : vec2(1.0, uAspect / box);
    vec2 iuv = uv * ct + 0.5;
    if (iuv.x >= 0.0 && iuv.x <= 1.0 && iuv.y >= 0.0 && iuv.y <= 1.0) col = texture2D(uTex, iuv).rgb;
    // sheets further away get a little darker
    col *= 1.0 - clamp(uShade - vDepth * 0.0006, 0.0, 0.45);
    gl_FragColor = vec4(col, 1.0);
  }
`

function webglOk() {
  try {
    const c = document.createElement('canvas')
    return !!c.getContext('webgl2')
  } catch {
    return false
  }
}

const RADIUS = 26 // matches .card__media corners

export function WaveGallery({ children }) {
  const [enabled] = useState(() => typeof window !== 'undefined' && webglOk())
  const items = useRef(new Map()) // element -> { src, mesh, ready, hover }
  const api = useRef(null)

  useEffect(() => {
    if (!enabled) return
    let dead = false, cleanup = null
    import('three').then((THREE) => { if (!dead) cleanup = start(THREE) })
    return () => { dead = true; cleanup?.() }
  }, [enabled])

  function start(THREE) {
    const canvas = document.createElement('canvas')
    canvas.className = 'wave-gl'
    canvas.setAttribute('aria-hidden', 'true')
    document.body.appendChild(canvas)

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, 1, 10, 6000)
    const geo = new THREE.PlaneGeometry(1, 1, 40, 40)
    const loader = new THREE.TextureLoader()
    let W = 0, H = 0

    const resize = () => {
      W = window.innerWidth
      H = window.innerHeight
      renderer.setSize(W, H, false)
      const dist = 1600
      camera.position.set(0, 0, dist)
      camera.fov = (2 * Math.atan(H / 2 / dist) * 180) / Math.PI
      camera.aspect = W / H
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener('resize', resize)

    const build = (el, item) => {
      const mat = new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: {
          uTex: { value: null }, uVel: { value: 0 }, uTime: { value: 0 }, uSize: { value: new THREE.Vector2(1, 1) },
          uView: { value: new THREE.Vector2(1, 1) }, uAspect: { value: 1 }, uHover: { value: 0 }, uRadius: { value: RADIUS }, uShade: { value: 0 },
        },
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.visible = false
      scene.add(mesh)
      item.mesh = mesh
      loader.load(item.src, (tex) => {
        if (!item.mesh) return tex.dispose()
        tex.anisotropy = 4
        mat.uniforms.uTex.value = tex
        mat.uniforms.uAspect.value = tex.image.width / tex.image.height
        item.ready = true
        el.classList.add('gl-on')
      })
      const card = el.closest('.card') || el
      item.enter = () => { item.hover = 1 }
      item.leave = () => { item.hover = 0 }
      card.addEventListener('mouseenter', item.enter)
      card.addEventListener('mouseleave', item.leave)
      item.card = card
      item.h = 0
    }
    const drop = (el, item) => {
      el.classList.remove('gl-on')
      if (item.card) {
        item.card.removeEventListener('mouseenter', item.enter)
        item.card.removeEventListener('mouseleave', item.leave)
      }
      if (item.mesh) {
        scene.remove(item.mesh)
        item.mesh.material.uniforms.uTex.value?.dispose()
        item.mesh.material.dispose()
        item.mesh = null
      }
    }

    api.current = {
      add(el, src) { const it = { src }; items.current.set(el, it); build(el, it) },
      remove(el) { const it = items.current.get(el); if (it) { drop(el, it); items.current.delete(el) } },
    }
    // cards that registered before the canvas existed
    items.current.forEach((it, el) => build(el, it))

    let vel = 0, lastY = window.scrollY, t0 = performance.now()
    const render = () => {
      const lenis = window.__lenis
      const y = window.scrollY
      const raw = lenis && typeof lenis.velocity === 'number' ? lenis.velocity : y - lastY
      lastY = y
      vel += (Math.max(-1, Math.min(1, raw / 45)) - vel) * 0.12
      const time = (performance.now() - t0) / 1000
      let any = false
      items.current.forEach((it, el) => {
        const m = it.mesh
        if (!m) return
        const r = el.getBoundingClientRect()
        const on = it.ready && r.width > 0 && r.bottom > -H * 0.3 && r.top < H * 1.3
        m.visible = on
        if (!on) return
        any = true
        it.h += ((it.hover || 0) - it.h) * 0.1
        const cy = r.top + r.height / 2
        const p = Math.max(-1.4, Math.min(1.4, (H / 2 - cy) / (H / 2))) // +1 top edge, -1 bottom edge
        const away = Math.max(0, Math.abs(p) - 0.15)
        m.scale.set(r.width, r.height, 1)
        m.position.set(r.left + r.width / 2 - W / 2, H / 2 - cy, -away * away * 260)
        m.rotation.x = -Math.sign(p) * away * 0.62 * (1 - it.h * 0.6)
        m.rotation.z = vel * 0.035 * (r.left + r.width / 2 < W / 2 ? 1 : -1)
        m.renderOrder = Math.round(cy)
        const u = m.material.uniforms
        u.uVel.value = vel * (1 - it.h * 0.5)
        u.uTime.value = time
        u.uHover.value = it.h
        u.uSize.value.set(r.width, r.height)
        u.uView.value.set(W, H)
        u.uShade.value = away * 0.35
      })
      if (any || canvas.dataset.drawn) renderer.render(scene, camera)
      canvas.dataset.drawn = any ? '1' : ''
    }

    let raf
    const loop = () => { render(); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    // also redraw right after Lenis moves the page, so sheets never lag a frame
    let lenisRef = null
    const hook = setInterval(() => {
      if (window.__lenis && lenisRef !== window.__lenis) {
        lenisRef = window.__lenis
        lenisRef.on('scroll', render)
        clearInterval(hook)
      }
    }, 300)

    return () => {
      cancelAnimationFrame(raf)
      clearInterval(hook)
      lenisRef?.off?.('scroll', render)
      window.removeEventListener('resize', resize)
      items.current.forEach((it, el) => drop(el, it))
      api.current = null
      geo.dispose()
      renderer.dispose()
      canvas.remove()
    }
  }

  const register = useCallback((el, src) => {
    if (!el) return
    if (api.current) api.current.add(el, src)
    else items.current.set(el, { src })
  }, [])
  const unregister = useCallback((el) => {
    if (api.current) api.current.remove(el)
    else items.current.delete(el)
  }, [])

  return <Ctx.Provider value={enabled ? { register, unregister } : null}>{children}</Ctx.Provider>
}

/** Card media box: hands its image to the WebGL gallery when one is available */
export function WaveMedia({ src, children }) {
  const gl = useWaveGallery()
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!gl || !src || !el) return
    gl.register(el, src)
    return () => gl.unregister(el)
  }, [gl, src])
  return <div ref={ref} className="card__media">{children}</div>
}
