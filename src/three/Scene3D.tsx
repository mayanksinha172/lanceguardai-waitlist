import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

/* ────────────────────────────────────────────────────────────────────────────
   Shared input state — window-level listeners, refs only, zero React renders.
──────────────────────────────────────────────────────────────────────────── */
const input = {
  mouse: new THREE.Vector2(0, 0),       // NDC -1..1
  mouseWorld: new THREE.Vector3(),      // projected onto z=0 plane
  click: new THREE.Vector3(0, 0, -999), // x, y world; z = time of click
  scroll: 0,                            // scrollY / viewportHeight
}

if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', e => {
    input.mouse.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1)
  }, { passive: true })
  window.addEventListener('scroll', () => {
    input.scroll = window.scrollY / window.innerHeight
  }, { passive: true })
}

const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

/* ────────────────────────────────────────────────────────────────────────────
   Particle nebula — one draw call, custom shader.
   Mouse repulsion + click shockwave + scroll hue drift, all on the GPU.
──────────────────────────────────────────────────────────────────────────── */
const PARTICLE_COUNT = isMobile ? 2000 : 5500

const particleVertex = /* glsl */ `
  uniform float uTime;
  uniform vec3 uMouse;
  uniform vec3 uClick;      // xy = world pos, z = click timestamp
  uniform float uScroll;
  attribute float aSeed;
  attribute float aMix;
  varying float vMix;
  varying float vAlpha;

  // cheap pseudo-noise
  vec3 drift(vec3 p, float seed, float t) {
    return vec3(
      sin(t * 0.31 + seed * 17.0 + p.y * 0.35),
      cos(t * 0.24 + seed * 23.0 + p.x * 0.30),
      sin(t * 0.19 + seed * 11.0 + p.z * 0.40)
    ) * 0.55;
  }

  void main() {
    vMix = aMix;
    vec3 pos = position + drift(position, aSeed, uTime);

    // parallax: deeper particles scroll slower
    float depth = clamp((pos.z + 10.0) / 20.0, 0.0, 1.0);
    pos.y += uScroll * mix(2.5, 7.0, depth);

    // mouse repulsion (xy plane)
    vec2 toMouse = pos.xy - uMouse.xy;
    float md = length(toMouse);
    float push = smoothstep(3.2, 0.0, md) * 1.6;
    pos.xy += normalize(toMouse + 0.0001) * push;

    // click shockwave: expanding ring displacement
    float age = uTime - uClick.z;
    if (age > 0.0 && age < 2.5) {
      float cd = length(pos.xy - uClick.xy);
      float ring = cd - age * 9.0;
      float wave = exp(-ring * ring * 0.35) * exp(-age * 1.8) * 2.2;
      pos.xy += normalize(pos.xy - uClick.xy + 0.0001) * wave;
    }

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    float size = mix(0.7, 2.0, fract(aSeed * 7.13));
    gl_PointSize = size * (30.0 / -mv.z) * ${isMobile ? '1.1' : '1.5'};
    gl_Position = projectionMatrix * mv;

    float tw = 0.5 + 0.5 * sin(uTime * (0.8 + fract(aSeed * 3.7)) + aSeed * 40.0);
    vAlpha = mix(0.15, 0.7, tw) * smoothstep(34.0, 14.0, -mv.z);
  }
`

const particleFragment = /* glsl */ `
  uniform float uScroll;
  varying float vMix;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float circle = smoothstep(0.5, 0.08, d);
    if (circle < 0.01) discard;

    vec3 green = vec3(0.067, 1.0, 0.6);
    vec3 blue  = vec3(0.25, 0.5, 1.0);
    vec3 gold  = vec3(1.0, 0.84, 0.04);

    // base palette per-particle, hue drifts as user scrolls
    vec3 col = mix(green, blue, vMix);
    col = mix(col, gold, smoothstep(0.75, 0.95, vMix));
    float sectionShift = clamp(uScroll * 0.18, 0.0, 0.6);
    col = mix(col, blue, sectionShift);

    gl_FragColor = vec4(col, circle * vAlpha * 0.5);
  }
`

function ParticleField() {
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const { positions, seeds, mixes } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const seeds = new Float32Array(PARTICLE_COUNT)
    const mixes = new Float32Array(PARTICLE_COUNT)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // disc-ish volume, hollow center so text stays clear, all behind the UI plane
      const r = 4 + Math.pow(Math.random(), 0.8) * 24
      const theta = Math.random() * Math.PI * 2
      positions[i * 3] = Math.cos(theta) * r
      positions[i * 3 + 1] = (Math.random() - 0.5) * 26
      positions[i * 3 + 2] = -Math.random() * 20 - 1
      seeds[i] = Math.random() * 100
      mixes[i] = Math.random()
    }
    return { positions, seeds, mixes }
  }, [])

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector3() },
    uClick: { value: new THREE.Vector3(0, 0, -999) },
    uScroll: { value: 0 },
  }), [])

  useFrame(({ clock }) => {
    const m = matRef.current
    if (!m) return
    m.uniforms.uTime.value = clock.elapsedTime
    m.uniforms.uMouse.value.copy(input.mouseWorld)
    m.uniforms.uClick.value.copy(input.click)
    m.uniforms.uScroll.value = input.scroll
  })

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
        <bufferAttribute attach="attributes-aMix" args={[mixes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={particleVertex}
        fragmentShader={particleFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
   Shield artifact — wireframe icosahedron core + gyroscope rings.
   Tilts toward the cursor, recedes and spins away on scroll.
──────────────────────────────────────────────────────────────────────────── */
function ShieldArtifact() {
  const group = useRef<THREE.Group>(null)
  const inner = useRef<THREE.Mesh>(null)
  const ring1 = useRef<THREE.Mesh>(null)
  const ring2 = useRef<THREE.Mesh>(null)
  const ring3 = useRef<THREE.Mesh>(null)

  useFrame(({ clock }, delta) => {
    const g = group.current
    if (!g) return
    const t = clock.elapsedTime
    const s = Math.min(input.scroll, 1.4)

    // tilt toward cursor, smooth
    const targetRX = -input.mouse.y * 0.35 + t * 0.06
    const targetRY = input.mouse.x * 0.5 + t * 0.12
    g.rotation.x += (targetRX - g.rotation.x) * Math.min(delta * 3, 1)
    g.rotation.y += (targetRY - g.rotation.y) * Math.min(delta * 3, 1)

    // breathe + scroll exit: sink, shrink, spin up
    const breathe = 1 + Math.sin(t * 0.8) * 0.02
    const scale = breathe * Math.max(1 - s * 0.55, 0.25)
    g.scale.setScalar(scale)
    g.position.y = Math.sin(t * 0.6) * 0.25 - s * 5.5
    g.position.z = -3 - s * 6
    g.rotation.z = s * 1.2

    if (inner.current) inner.current.rotation.y = -t * 0.3
    if (ring1.current) ring1.current.rotation.z = t * 0.4
    if (ring2.current) ring2.current.rotation.z = -t * 0.3
    if (ring3.current) ring3.current.rotation.z = t * 0.22
  })

  return (
    <group ref={group} position={[0, 0, -3]}>
      {/* outer wireframe shell */}
      <mesh>
        <icosahedronGeometry args={[2.4, 1]} />
        <meshBasicMaterial color="#11ff99" wireframe transparent opacity={0.28} />
      </mesh>

      {/* inner glowing core */}
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.15, 2]} />
        <meshStandardMaterial
          color="#062218"
          emissive="#11ff99"
          emissiveIntensity={1.6}
          roughness={0.15}
          metalness={0.9}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* heart of light — feeds the bloom pass */}
      <mesh>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshBasicMaterial color="#b6ffe0" toneMapped={false} />
      </mesh>

      {/* gyroscope rings */}
      <mesh ref={ring1} rotation={[Math.PI / 2.4, 0.4, 0]}>
        <torusGeometry args={[3.2, 0.012, 8, 128]} />
        <meshBasicMaterial color="#11ff99" transparent opacity={0.55} toneMapped={false} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 1.8, -0.6, 0.5]}>
        <torusGeometry args={[3.7, 0.008, 8, 128]} />
        <meshBasicMaterial color="#4080FF" transparent opacity={0.4} toneMapped={false} />
      </mesh>
      <mesh ref={ring3} rotation={[0.3, 0.9, 0.2]}>
        <torusGeometry args={[4.3, 0.006, 8, 128]} />
        <meshBasicMaterial color="#FFD60A" transparent opacity={0.22} toneMapped={false} />
      </mesh>

      <pointLight color="#11ff99" intensity={12} distance={14} />
    </group>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
   Camera rig — mouse parallax + scroll descent, projects mouse to world.
──────────────────────────────────────────────────────────────────────────── */
function CameraRig() {
  const { camera } = useThree()

  useFrame((_, delta) => {
    const k = Math.min(delta * 2.5, 1)
    const targetX = input.mouse.x * 0.9
    const targetY = -input.mouse.y * 0.6 - input.scroll * 1.2
    camera.position.x += (targetX - camera.position.x) * k
    camera.position.y += (targetY - camera.position.y) * k
    camera.lookAt(0, -input.scroll * 1.2, -3)

    // project mouse NDC onto z=0 plane for the particle shader
    const cam = camera as THREE.PerspectiveCamera
    const halfH = Math.tan((cam.fov * Math.PI) / 360) * cam.position.z
    const halfW = halfH * cam.aspect
    input.mouseWorld.set(
      camera.position.x + input.mouse.x * halfW,
      camera.position.y + input.mouse.y * halfH,
      0,
    )
  })

  return null
}

function ClickWaves() {
  const { clock } = useThree()
  useMemo(() => {
    if (typeof window === 'undefined') return
    window.addEventListener('pointerdown', () => {
      input.click.set(input.mouseWorld.x, input.mouseWorld.y, clock.elapsedTime)
    }, { passive: true })
  }, [clock])
  return null
}

/* ──────────────────────────────────────────────────────────────────────── */
function webglAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

export default function Scene3D() {
  const [visible, setVisible] = useState(false)
  useEffect(() => setVisible(true), [])

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reducedMotion || !webglAvailable()) return null

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 1.6s ease' }}
      aria-hidden
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 13], fov: 50 }}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
        style={{ background: 'transparent' }}
      >
        <CameraRig />
        <ClickWaves />
        <ParticleField />
        <ShieldArtifact />
        <ambientLight intensity={0.15} />
        <EffectComposer>
          <Bloom intensity={0.5} luminanceThreshold={0.45} mipmapBlur radius={0.6} />
          <Vignette darkness={0.55} offset={0.25} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
