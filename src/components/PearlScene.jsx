import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Lightformer, MeshReflectorMaterial, Sparkles } from '@react-three/drei'

/* Wall with arch-shaped openings (like unseen.co's dreamy architecture) */
function ArchWall({ width = 30, height = 16, arches = [], color = '#ead2d0', ...props }) {
  const geometry = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(-width / 2, -1)
    s.lineTo(width / 2, -1)
    s.lineTo(width / 2, height)
    s.lineTo(-width / 2, height)
    s.lineTo(-width / 2, -1)
    arches.forEach(({ x, w, h, y = 0 }) => {
      const r = w / 2
      const p = new THREE.Path()
      p.moveTo(x - r, y)
      p.lineTo(x - r, y + h - r)
      p.absarc(x, y + h - r, r, Math.PI, 0, true)
      p.lineTo(x + r, y)
      p.lineTo(x - r, y)
      s.holes.push(p)
    })
    return new THREE.ExtrudeGeometry(s, { depth: 1.2, bevelEnabled: false, curveSegments: 48 })
  }, [width, height, arches])
  return (
    <mesh geometry={geometry} castShadow receiveShadow {...props}>
      <meshStandardMaterial color={color} roughness={0.95} />
    </mesh>
  )
}

function Steps(props) {
  const steps = 7
  return (
    <group {...props}>
      {Array.from({ length: steps }).map((_, i) => (
        <mesh key={i} position={[0, i * 0.32 + 0.16, -i * 0.55]} castShadow receiveShadow>
          <boxGeometry args={[4.2, 0.32 + i * 0.0, 0.55 + (steps - i) * 0.0]} />
          <meshStandardMaterial color="#efdcd8" roughness={0.9} />
        </mesh>
      ))}
      {/* solid block under the steps */}
      <mesh position={[0, 1.1, -2.2]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 2.2, 1.6]} />
        <meshStandardMaterial color="#e6cfcb" roughness={0.95} />
      </mesh>
    </group>
  )
}

function Rock(props) {
  const geo = useMemo(() => {
    const g = new THREE.SphereGeometry(1, 64, 48)
    const pos = g.attributes.position
    const v = new THREE.Vector3()
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i)
      const n = 1 + 0.12 * Math.sin(v.x * 4.1) * Math.cos(v.y * 3.3) + 0.07 * Math.sin(v.z * 7.7)
      v.multiplyScalar(n)
      pos.setXYZ(i, v.x, v.y, v.z)
    }
    g.computeVertexNormals()
    return g
  }, [])
  return (
    <mesh geometry={geo} castShadow receiveShadow {...props}>
      <meshStandardMaterial color="#d9c2b8" roughness={1} />
    </mesh>
  )
}

function Pearl({ small }) {
  const ref = useRef()
  useFrame((state, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.25
  })
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.1} floatingRange={[-0.15, 0.25]}>
      <mesh ref={ref} position={small ? [0.9, 5.1, -3] : [4.4, 3.3, -2.6]} scale={small ? 0.75 : 1} castShadow>
        <sphereGeometry args={[1.3, 96, 96]} />
        <meshPhysicalMaterial
          color="#f6eeec"
          roughness={0.28}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.05}
          iridescence={0.85}
          iridescenceIOR={1.35}
          iridescenceThicknessRange={[200, 1100]}
          sheen={1}
          sheenColor="#f3c6e0"
          sheenRoughness={0.4}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  )
}

function Rig() {
  const target = useMemo(() => new THREE.Vector3(0, 2.4, -3), [])
  useFrame((state) => {
    const { pointer, camera } = state
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 1.2, 0.03)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 2.6 + pointer.y * 0.5, 0.03)
    camera.lookAt(target)
  })
  return null
}

function SkyPlane() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        fog: false,
        depthWrite: false,
        uniforms: {},
        vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
        fragmentShader:
          'varying vec2 vUv; void main(){ vec3 top = vec3(0.70,0.76,0.93); vec3 mid = vec3(0.86,0.80,0.92); vec3 low = vec3(0.96,0.86,0.87); vec3 c = mix(low, mid, smoothstep(0.0,0.45,vUv.y)); c = mix(c, top, smoothstep(0.45,1.0,vUv.y)); gl_FragColor = vec4(c,1.0); }',
      }),
    []
  )
  return (
    <mesh position={[0, 10, -22]} material={mat}>
      <planeGeometry args={[120, 50]} />
    </mesh>
  )
}

export default function PearlScene() {
  const isSmall = typeof window !== 'undefined' && window.innerWidth < 760
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0, 2.6, 9.5], fov: isSmall ? 62 : 42, near: 0.1, far: 120 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#e7d3d5']} />
      <fog attach="fog" args={['#ead6d6', 14, 34]} />

      <ambientLight intensity={0.55} />
      <directionalLight
        position={[-8, 12, 6]}
        intensity={2.2}
        color="#fff1e6"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-16}
        shadow-camera-right={16}
        shadow-camera-top={16}
        shadow-camera-bottom={-16}
        shadow-bias={-0.0004}
      />
      <pointLight position={[6, 4, 2]} intensity={14} color="#d7c4ff" distance={18} />

      <SkyPlane />

      {/* back wall with one tall arch and one window */}
      <ArchWall
        width={44}
        height={18}
        position={[0, 0, -9]}
        arches={[
          { x: -2.2, w: 4.4, h: 9.5 },
          { x: 7.5, w: 3, h: 4.2, y: 6.2 },
        ]}
        color="#ecd5d3"
      />
      {/* left angled wall with two arches */}
      <ArchWall
        width={20}
        height={14}
        position={[-9.5, 0, -1]}
        rotation={[0, Math.PI / 2.6, 0]}
        arches={[
          { x: -4.6, w: 3.6, h: 8 },
          { x: 2.2, w: 3.6, h: 8 },
        ]}
        color="#e8cfcd"
      />
      {/* right block */}
      <mesh position={[10.5, 1.4, -4.5]} castShadow receiveShadow>
        <boxGeometry args={[7, 2.8, 4]} />
        <meshStandardMaterial color="#e9d3cf" roughness={0.95} />
      </mesh>

      <Steps position={[-1.4, 0, -3.2]} />
      <Rock position={[5.6, 0.05, 0.6]} scale={[1.6, 1, 1.3]} />
      <Rock position={[-5.8, -0.2, 2.2]} scale={[0.9, 0.6, 0.8]} />
      <Pearl small={isSmall} />

      <Sparkles count={40} scale={[16, 7, 8]} position={[0, 3.5, -2]} size={2.4} speed={0.25} color="#ffffff" opacity={0.7} />

      {/* water */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[80, 60]} />
        <MeshReflectorMaterial
          blur={[400, 120]}
          resolution={isSmall ? 512 : 1024}
          mixBlur={1}
          mixStrength={2.2}
          roughness={0.85}
          depthScale={1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#cbb8c6"
          metalness={0.4}
          mirror={0.75}
        />
      </mesh>

      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.6} position={[0, 6, -8]} scale={[14, 5, 1]} color="#ffffff" />
        <Lightformer intensity={0.6} position={[0, -4, 0]} rotation-x={Math.PI / 2} scale={[20, 20, 1]} color="#f2dbe2" />
        <Lightformer intensity={1.6} position={[-6, 2, 4]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} color="#f6c9dc" />
        <Lightformer intensity={1.6} position={[6, 2, 4]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} color="#bcd4ff" />
        <Lightformer form="ring" intensity={3} position={[2, 5, 6]} scale={3} color="#fff4e0" />
      </Environment>

      <Rig />
    </Canvas>
  )
}
