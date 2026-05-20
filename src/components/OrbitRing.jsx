// Linha circular que representa o caminho orbital de um planeta.
// useMemo garante que os pontos são calculados só quando o raio muda.

import { useMemo } from 'react'
import { BufferGeometry, Float32BufferAttribute } from 'three'

export function OrbitRing({ radius }) {
  const geometry = useMemo(() => {
    const points = []

    // 128 pontos formam um círculo suave
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2
      points.push(
        Math.cos(angle) * radius, // x
        0,                         // y (plano horizontal)
        Math.sin(angle) * radius  // z
      )
    }

    const geo = new BufferGeometry()
    geo.setAttribute('position', new Float32BufferAttribute(points, 3))
    return geo
  }, [radius])

  return (
    <lineLoop geometry={geometry}>
      <lineBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.12}
        depthWrite={false}
      />
    </lineLoop>
  )
}