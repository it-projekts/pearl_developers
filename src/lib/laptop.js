// 3D laptop for the home "Who we are" section: the lid opens, code fills the
// screen, four small screens come out, then it all folds shut again.
// Everything is drawn in code, no model files.
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }

function keyboardTexture() {
  const c = document.createElement('canvas')
  c.width = 1360
  c.height = 900
  const x = c.getContext('2d')
  const box = (a, b, w, h, r, f) => { x.fillStyle = f; x.beginPath(); x.roundRect(a, b, w, h, r); x.fill() }
  box(110, 40, 1140, 460, 26, '#9fb6bb')
  for (let j = 0; j < 5; j++) {
    for (let i = 0; i < 14; i++) box(124 + i * 80, 54 + j * 72, 70, 62, 12, '#15333b')
  }
  ;[[0, 3], [3, 1], [4, 6], [10, 1], [11, 3]].forEach(([i, n]) => box(124 + i * 80, 414, n * 80 - 10, 72, 12, '#15333b'))
  box(440, 550, 480, 300, 26, '#b3c7cb')
  return asTexture(c)
}

function asTexture(c) {
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  return t
}

// The laptop's own display: lines of code that fill in with the scroll
const ROWS = [[0, 190, 260], [1, 240, 150], [1, 130, 380], [2, 300, 170], [2, 180, 260], [2, 90, 340], [1, 210, 0], [1, 160, 300], [2, 260, 120], [1, 120, 0], [0, 90, 0]]
const WORDS = ROWS.reduce((n, r) => n + (r[2] ? 2 : 1), 0)
function makeDisplay(logo) {
  const c = document.createElement('canvas')
  c.width = 1280
  c.height = 800
  const x = c.getContext('2d')
  const tex = asTexture(c)
  let shown = -1
  const box = (a, b, w, h, r, f) => { x.fillStyle = f; x.beginPath(); x.roundRect(a, b, w, h, r); x.fill() }
  const draw = (f, force) => {
    const n = Math.round(f * WORDS)
    if (n === shown && !force) return
    shown = n
    box(0, 0, 1280, 800, 0, '#072a30')
    box(0, 0, 1280, 90, 0, '#eef6f5')
    ;['#ff9db8', '#b6a5ea', '#4fc7b4'].forEach((k, i) => box(36 + i * 44, 34, 24, 24, 12, k))
    if (logo.complete && logo.naturalWidth) { const w = 60 * logo.naturalWidth / logo.naturalHeight; x.drawImage(logo, 1240 - w, 15, w, 60) }
    box(0, 90, 200, 710, 0, '#0b3840')
    for (let i = 0; i < 6; i++) box(36, 140 + i * 62, 128, 18, 9, i === 1 ? '#9fe3d4' : '#2b6570')
    let k = 0
    ROWS.forEach(([ind, a, b], i) => {
      const X = 250 + ind * 70, Y = 140 + i * 58
      if (k++ < n) box(X, Y, a, 24, 12, i % 2 ? '#b6a5ea' : '#4fc7b4')
      if (b && k++ < n) box(X + a + 22, Y, b, 24, 12, i % 3 === 2 ? '#ffd0e6' : '#ffffff')
    })
    tex.needsUpdate = true
  }
  logo.addEventListener('load', () => draw(Math.max(0, shown) / WORDS, true))
  return { tex, draw }
}

function screenTexture(kind, w, h) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const x = c.getContext('2d')
  const box = (a, b, W, H, r, f) => { x.fillStyle = f; x.beginPath(); x.roundRect(a, b, W, H, r); x.fill() }
  box(0, 0, w, h, 44, kind === 'code' ? '#0c3038' : '#ffffff')
  if (kind === 'code') {
    ;['#ffd0e6', '#b6a5ea', '#9fe3d4'].forEach((f, i) => box(40 + i * 40, 36, 24, 24, 12, f))
    const rows = [[0, 150, 220], [1, 120, 200], [2, 170, 110], [2, 90, 200], [1, 170, 90], [0, 60, 0]]
    rows.forEach(([n, a, b], i) => {
      box(40 + n * 44, 104 + i * 50, a, 22, 11, i % 2 ? '#b6a5ea' : '#9fe3d4')
      if (b) box(56 + n * 44 + a, 104 + i * 50, b, 22, 11, '#ffffff')
    })
  } else if (kind === 'phone') {
    box(0, 0, w, 210, 44, '#0b7f72')
    box(0, 120, w, 90, 0, '#0b7f72')
    box(36, 60, 110, 22, 11, '#9fe3d4')
    box(36, 104, 190, 40, 14, '#fff')
    ;['#b6a5ea', '#ffd0e6', '#9fe3d4', '#b6a5ea'].forEach((f, i) => {
      box(36, 246 + i * 76, 54, 54, 18, f)
      box(108, 254 + i * 76, 150, 16, 8, '#2f4a49')
      box(108, 280 + i * 76, 90, 12, 6, '#bccdcb')
    })
  } else if (kind === 'chat') {
    box(40, 44, 300, 84, 34, '#e2efed')
    box(72, 78, 220, 16, 8, '#5a7270')
    box(150, 152, 322, 118, 34, '#0b7f72')
    box(184, 188, 250, 16, 8, '#fff')
    box(184, 220, 180, 16, 8, '#bfe9e4')
    box(40, 294, 180, 84, 34, '#e2efed')
    ;[0, 1, 2].forEach((i) => box(84 + i * 36, 326, 20, 20, 10, '#0b7f72'))
  } else {
    box(40, 44, 170, 24, 12, '#2f4a49')
    ;[90, 140, 110, 180, 150, 220].forEach((H, i) => box(44 + i * 74, 376 - H, 48, H, 14, i % 2 ? '#0b7f72' : '#b6a5ea'))
    box(300, 36, 172, 60, 20, '#dff3f0')
    box(324, 58, 110, 16, 8, '#0b7f72')
  }
  return asTexture(c)
}

export function startLaptop(canvas, getProgress, calm) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  const scene = new THREE.Scene()
  const pm = new THREE.PMREMGenerator(renderer)
  const room = new RoomEnvironment()
  const env = pm.fromScene(room, 0.04)
  scene.environment = env.texture
  scene.environmentIntensity = 0.5
  const key = new THREE.DirectionalLight('#fff1f7', 1.8)
  key.position.set(3, 6, 5)
  const rim = new THREE.DirectionalLight('#9d8cf0', 2.2)
  rim.position.set(-5, 2, -3)
  scene.add(key, rim)
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60)
  const root = new THREE.Group()
  scene.add(root)

  const logo = new Image()
  logo.src = '/logo.png'
  const display = makeDisplay(logo)
  const keys = keyboardTexture()
  const metal = new THREE.MeshStandardMaterial({ color: '#cfdcde', roughness: 0.36, metalness: 0.75 })
  const black = new THREE.MeshStandardMaterial({ color: '#06181c', roughness: 0.4 })
  const glass = new THREE.MeshBasicMaterial({ map: display.tex, toneMapped: false })
  const keyMat = new THREE.MeshStandardMaterial({ map: keys, transparent: true, roughness: 0.6 })
  const baseGeo = new RoundedBoxGeometry(3.4, 0.14, 2.3, 5, 0.06)
  const lidGeo = new RoundedBoxGeometry(3.4, 0.09, 2.25, 5, 0.04)
  const bezelGeo = new RoundedBoxGeometry(3.3, 0.02, 2.15, 3, 0.01)
  const glassGeo = new THREE.PlaneGeometry(3.14, 1.96).rotateX(Math.PI / 2)
  const keyGeo = new THREE.PlaneGeometry(3.3, 2.18).rotateX(-Math.PI / 2)
  const laptop = new THREE.Group()
  const lid = new THREE.Group()
  const part = (g, m, y, z) => { const o = new THREE.Mesh(g, m); o.position.set(0, y, z); return o }
  // hinge runs along the back edge; the closed lid lies toward the viewer
  lid.position.set(0, 0.125, -1.12)
  lid.add(part(lidGeo, metal, 0, 1.125), part(bezelGeo, black, -0.045, 1.125), part(glassGeo, glass, -0.057, 1.125))
  laptop.add(part(baseGeo, metal, 0, 0), part(keyGeo, keyMat, 0.072, 0), lid)
  // the logo on the outside of the lid
  const badge = new THREE.TextureLoader().load('/logo.png', (t) => {
    const h = 0.5
    const m = new THREE.Mesh(new THREE.PlaneGeometry((h * t.image.width) / t.image.height, h).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: t, transparent: true }))
    m.position.set(0, 0.047, 1.125)
    trash.push(m.geometry, m.material)
    lid.add(m)
  })
  badge.colorSpace = THREE.SRGBColorSpace
  badge.anisotropy = 8
  root.add(laptop)

  const trash = [display.tex, keys, badge, metal, black, glass, keyMat, baseGeo, lidGeo, bezelGeo, glassGeo, keyGeo]
  const screens = [['code', 512, 420], ['phone', 290, 560], ['chat', 512, 420], ['chart', 512, 420]].map(([kind, w, h]) => {
    const g = new THREE.PlaneGeometry(w / 420, h / 420)
    const tex = screenTexture(kind, w, h)
    const m = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide, toneMapped: false, alphaTest: 0.05 })
    trash.push(g, tex, m)
    const mesh = new THREE.Mesh(g, m)
    root.add(mesh)
    return mesh
  })

  const resize = () => {
    const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    // keep the whole scene in view on any shape of box
    const t = Math.tan((camera.fov * Math.PI) / 360)
    const d = Math.max(2.3 / t, 2.55 / (t * camera.aspect))
    camera.position.set(0, d * 0.24, d)
    camera.lookAt(0, 0.2, 0)
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(canvas)
  resize()

  const mouse = { x: 0, y: 0 }, soft = { x: 0, y: 0 }
  const move = (e) => { mouse.x = e.clientX / window.innerWidth - 0.5; mouse.y = e.clientY / window.innerHeight - 0.5 }
  if (!calm) window.addEventListener('pointermove', move, { passive: true })

  let p = getProgress(), raf = 0, last = performance.now(), time = 0
  const draw = (now) => {
    raf = requestAnimationFrame(draw)
    const dt = Math.max(0, Math.min(0.1, (now - last) / 1000))
    last = now
    if (!calm) time += dt
    const k = 1 - Math.exp(-dt * 7)
    p = calm ? 0.7 : p + (getProgress() - p) * k
    soft.x += (mouse.x - soft.x) * k
    soft.y += (mouse.y - soft.y) * k
    // opens, holds, then folds shut at the end
    const open = smooth(0.04, 0.36, p) * (1 - smooth(0.86, 1, p))
    const out = smooth(0.38, 0.62, p) * (1 - smooth(0.76, 0.9, p))
    display.draw(smooth(0.12, 0.5, p))
    lid.rotation.x = -open * 1.88
    laptop.rotation.y = -0.6 + p * 0.95
    laptop.rotation.x = 0.1 + (1 - open) * 0.28
    laptop.position.y = -0.1 - open * 0.75 + Math.sin(time * 0.9) * 0.04
    screens.forEach((s, i) => {
      const a = i * Math.PI * 0.5 + 0.75 + p * 2.4 + time * 0.06
      const far = out * 2.15
      s.position.set(Math.sin(a) * far, 0.3 + (0.25 - Math.cos(a) * 0.95) * out + Math.sin(time + i * 2) * 0.05 * out, Math.cos(a) * far * 0.75 + 0.2)
      s.rotation.set(0, Math.sin(a) * 0.5, (i % 2 ? -0.06 : 0.06) * out)
      s.scale.setScalar(Math.max(0.001, out * 0.72))
      s.visible = out > 0.01
    })
    root.rotation.set(soft.y * 0.18, soft.x * 0.4, 0)
    renderer.render(scene, camera)
  }
  const io = new IntersectionObserver(([e]) => {
    cancelAnimationFrame(raf)
    if (e.isIntersecting) {
      last = performance.now()
      raf = requestAnimationFrame(draw)
    }
  }, { rootMargin: '80px' })
  io.observe(canvas)

  return () => {
    cancelAnimationFrame(raf)
    io.disconnect()
    ro.disconnect()
    window.removeEventListener('pointermove', move)
    trash.forEach((t) => t.dispose())
    room.dispose()
    env.dispose()
    pm.dispose()
    renderer.dispose()
  }
}
