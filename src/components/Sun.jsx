import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export function Sun() {
  const meshRef = useRef()
  const texture = useTexture(`${import.meta.env.BASE_URL}textures/sun.jpg`)

  useFrame(() => {
    meshRef.current.rotation.y += 0.002
  })

  return (
    <group>
      {/* Luz ambiente — ilumina tudo levemente para não ficar preto */}
      <ambientLight intensity={0.4} />

      {/* Luz do Sol — sem decay para alcançar todos os planetas */}
      <pointLight
        intensity={5}
        distance={0}
        decay={0}
        color="#fff5e0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Esfera do Sol */}
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

      {/* Halo */}
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