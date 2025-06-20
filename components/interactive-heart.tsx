"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { useFrame, Canvas } from "@react-three/fiber"
import { Points, PointMaterial, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

// Custom shader material for the heart particles
const HeartParticles = ({ mouse }: { mouse: { x: number; y: number } }) => {
  const ref = useRef<THREE.Points>(null!)
  const [hovered, setHovered] = useState(false)

  // Generate heart-shaped particle positions
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    const colors = new Float32Array(2000 * 3)

    for (let i = 0; i < 2000; i++) {
      // Heart equation: x = 16sin³(t), y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)
      const t = (i / 2000) * Math.PI * 2 * 3 // Multiple loops for density
      const x = 16 * Math.pow(Math.sin(t), 3) * 0.1
      const y = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 0.1
      const z = (Math.random() - 0.5) * 2

      positions[i * 3] = x + (Math.random() - 0.5) * 0.5
      positions[i * 3 + 1] = y + (Math.random() - 0.5) * 0.5
      positions[i * 3 + 2] = z

      // Color gradient from pink to red
      const intensity = Math.random()
      colors[i * 3] = 1 // Red
      colors[i * 3 + 1] = 0.2 + intensity * 0.6 // Green
      colors[i * 3 + 2] = 0.6 + intensity * 0.4 // Blue
    }

    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (ref.current) {
      // Rotate the heart slowly
      ref.current.rotation.y = state.clock.elapsedTime * 0.2
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1

      // Interactive movement based on mouse
      ref.current.rotation.x += mouse.y * 0.0005
      ref.current.rotation.y += mouse.x * 0.0005

      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      ref.current.scale.setScalar(scale)

      // Update particle positions for floating effect
      const positions = ref.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += Math.sin(state.clock.elapsedTime + i) * 0.001
      }
      ref.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points
      ref={ref}
      positions={particlesPosition.positions}
      colors={particlesPosition.colors}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <PointMaterial
        transparent
        vertexColors
        size={hovered ? 0.08 : 0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Floating sparkles around the heart
const Sparkles = () => {
  const ref = useRef<THREE.Points>(null!)

  const sparklesPosition = useMemo(() => {
    const positions = new Float32Array(100 * 3)
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05

      // Make sparkles twinkle
      const positions = ref.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(state.clock.elapsedTime + i) * 0.01
        positions[i + 1] += Math.cos(state.clock.elapsedTime + i) * 0.01
      }
      ref.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={ref} positions={sparklesPosition}>
      <PointMaterial
        transparent
        color="#ffd700"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

export default function InteractiveHeart() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ff69b4" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff1493" />

        <HeartParticles mouse={mouse} />
        <Sparkles />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
