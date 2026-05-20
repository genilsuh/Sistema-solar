// O Sol: fonte de luz da cena + esfera visível com aparência de estrela.

import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export function Sun() {
  const meshRef = useRef()
  const texture = useTexture('/textures/sun.jpg')

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
        intensity={3}
        distance={0}
        color="#fff3c0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Esfera principal do Sol */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshStandardMaterial
          map={texture}
          emissive="#ff6600"
          emissiveMap={texture}
          emissiveIntensity={0.8}
          roughness={0.8}
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