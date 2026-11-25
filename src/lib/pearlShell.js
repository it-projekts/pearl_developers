// 3D oyster for the home "Who we are" section: opens, lifts a pearl, then
// sends out four small screens. Everything is drawn in code, no model files.
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }

// One half of a scallop: hinge at the origin, opening toward +z, domed toward +y
function shellGeometry() {
  const U = 180, V = 48, R = 2.2, RIBS = 11
  const pos = [], uvs = [], idx = []
  for (let j = 0; j <= V; j++) {
    for (let i = 0; i <= U; i++) {
      const u = (i / U) * 2 - 1, v = j / V
      const rib = Math.cos(u * Math.PI * RIBS)
      const a = u * 1.3 * (0.55 + 0.45 * Math.sqrt(v))
      const r = R * v * (1 - 0.12 * u * u) * (1 + 0.025 * rib * v * v)
      const round = Math.pow(Math.max(0, Math.cos((u * Math.PI) / 2)), 0.55)
      const y = Math.sin(Math.PI * Math.pow(v, 0.62)) * 0.62 * round + rib * 0.035 * v * (1 - v * 0.4)
      pos.push(Math.sin(a) * r * 1.12, y, Math.cos(a) * r)
      uvs.push(i / U, v)
      if (i < U && j < V) {
        const p = j * (U + 1) + i, q = p + U + 1
        idx.push(p, q, p + 1, q, q + 1, p + 1)
      }
    }
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  g.setIndex(idx)
  g.computeVertexNormals()
  return g
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
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  return t
}

export function startShell(canvas, getProgress, calm) {
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

  const geo = shellGeometry()
  const outer = new THREE.MeshPhysicalMaterial({ color: '#57b7ad', roughness: 0.5, clearcoat: 0.4, side: THREE.FrontSide })
  const inner = new THREE.MeshPhysicalMaterial({ color: '#e3b9dc', roughness: 0.24, metalness: 0.4, iridescence: 1, iridescenceIOR: 1.6, iridescenceThicknessRange: [180, 520], clearcoat: 1, side: THREE.BackSide })
  const half = () => new THREE.Group().add(new THREE.Mesh(geo, outer), new THREE.Mesh(geo, inner))
  const shell = new THREE.Group()
  const top = half()
  const bottomPivot = new THREE.Group()
  const bottom = half()
  bottom.rotation.z = Math.PI
  bottomPivot.add(bottom)
  shell.add(top, bottomPivot)
  root.add(shell)
  top.position.z = bottomPivot.position.z = -1.1

  const pearlGeo = new THREE.SphereGeometry(0.5, 64, 48)
  const pearlMat = new THREE.MeshPhysicalMaterial({ color: '#fff3f6', roughness: 0.16, metalness: 0.1, iridescence: 1, iridescenceIOR: 1.35, iridescenceThicknessRange: [200, 480], clearcoat: 1, clearcoatRoughness: 0.08, sheen: 0.6, sheenColor: new THREE.Color('#ffc9e4') })
  const pearl = new THREE.Mesh(pearlGeo, pearlMat)
  root.add(pearl)

  const trash = [geo, outer, inner, pearlGeo, pearlMat]
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
    p = calm ? 0.9 : p + (getProgress() - p) * k
    soft.x += (mouse.x - soft.x) * k
    soft.y += (mouse.y - soft.y) * k
    const open = smooth(0.04, 0.4, p), rise = smooth(0.24, 0.52, p), out = smooth(0.4, 0.68, p)
    top.rotation.x = -0.04 - open * 1.12
    bottomPivot.rotation.x = open * 0.16
    shell.rotation.y = -0.75 + p * 0.95
    shell.rotation.x = 0.12 + (1 - open) * 0.25
    shell.position.y = -0.55 - rise * 0.35 + Math.sin(time * 0.9) * 0.04
    const py = -0.6 + rise * 1.85 + Math.sin(time * 1.1) * 0.06 * rise
    pearl.position.set(0, py, 0.1 + rise * 0.25)
    pearl.scale.setScalar(0.75 + rise * 0.55)
    pearl.rotation.y = p * 5 + time * 0.2
    screens.forEach((s, i) => {
      const a = i * Math.PI * 0.5 + 0.75 + p * 2.4 + time * 0.06
      const far = out * 1.75
      s.position.set(Math.sin(a) * far, py + (0.1 - Math.cos(a) * 0.75) * out + Math.sin(time + i * 2) * 0.05 * out, Math.cos(a) * far * 0.8 + 0.25)
      s.rotation.set(0, Math.sin(a) * 0.5, (i % 2 ? -0.06 : 0.06) * out)
      s.scale.setScalar(Math.max(0.001, out * 0.8))
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
