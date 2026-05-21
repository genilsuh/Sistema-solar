import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { DoubleSide, MathUtils } from 'three'

export function Planet({ data, effectiveSpeed, onSelect }) {
  const groupRef = useRef()
  const meshRef = useRef()
  const initialAngle = useRef(Math.random() * Math.PI * 2)

  // Carrega APENAS a textura principal — sem opcionais
  const texture = useTexture(data.texture)

  // Textura dos anéis — só Saturno tem
  const ringTexture = useTexture(
    data.hasRings ? data.ringTexture : `${import.meta.env.BASE_URL}textures/saturn-ring.jpg`
  )

  useFrame(({ clock }) => {
    const t =
      clock.getElapsedTime() * effectiveSpeed * 0.25 + initialAngle.current
    groupRef.current.position.x = Math.cos(t) * data.distance
    groupRef.current.position.z = Math.sin(t) * data.distance
    meshRef.current.rotation.y += data.rotationSpeed * effectiveSpeed
  })

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        rotation={[0, 0, MathUtils.degToRad(data.tilt ?? 0)]}
        castShadow
        receiveShadow
        onClick={(e) => {
          e.stopPropagation()
          onSelect(data)
        }}
      >
        <sphereGeometry args={[data.radius, 32, 32]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Atmosfera — só Terra */}
      {data.hasAtmosphere && (
        <mesh>
          <sphereGeometry args={[data.radius + 0.08, 32, 32]} />
          <meshStandardMaterial
            color="#88bbff"
            transparent
            opacity={0.18}
            depthWrite={false}
            side={DoubleSide}
          />
        </mesh>
      )}

      {/* Anéis — só Saturno */}
      {data.hasRings && (
        <group rotation={[Math.PI / 2.5, 0, 0]}>
          <mesh>
            <ringGeometry
              args={[
                data.radius * data.ringInnerRadius,
                data.radius * data.ringOuterRadius,
                64,
              ]}
            />
            <meshBasicMaterial
              map={ringTexture}
              transparent
              opacity={0.85}
              side={DoubleSide}
              depthWrite={false}
            />
          </mesh>
        </group>
      )}
    </group>
  )
}