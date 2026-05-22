// O Sol: fonte de luz da cena + esfera visível com aparência de estrela.

import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export function Sun() {
  const meshRef = useRef()
  const texture = useTexture(`${import.meta.env.BASE_URL}textures/sun.jpg`)

  // Rotação suave do Sol (60x por segundo)
  useFrame(() => {
    meshRef.current.rotation.y += 0.002
  })

  return (
    <group>
      {/* Luz ambiente fraca — para não deixar o fundo completamente preto */}
      <ambientLight intensity={0.06} color="#ffffff" />

      {/* Luz pontual que ilumina os planetas — irradia em todas as direções */}
      <pointLight
        intensity={8}
        distance={0}
        decay={2}
        color="#fff530"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={500}
      />

      {/* Esfera principal do Sol */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshStandardMaterial
          map={texture}
          emissive="#ff6600"
          emissiveMap={texture}
          emissiveIntensity={1}
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* Halo de brilho ao redor do Sol */}
      <mesh>
        <sphereGeometry args={[5.4, 32, 32]} />
        <meshBasicMaterial
          color="#ff9900"
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}