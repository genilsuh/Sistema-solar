// Componente raiz da aplicação.
//
// REGRA FUNDAMENTAL DO REACT THREE FIBER:
// Dentro do <Canvas> → apenas componentes 3D (Three.js)
// Fora do <Canvas>  → HTML normal (divs, botões, etc.)
//
// Quebrar essa regra causa o erro:
// "R3F: Div is not part of the THREE namespace"

import { OrbitControls, Preload, Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

// Componentes 3D (ficam DENTRO do Canvas)
import { OrbitRing } from './components/OrbitRing'
import { Planet } from './components/Planet'
import { Sun } from './components/Sun'

// Componentes HTML (ficam FORA do Canvas)
import { Controls } from './components/Controls'
import { InfoPanel } from './components/InfoPanel'

// Estado global e dados
import { PLANETS } from './data/planets'
import { usePlanetStore } from './hooks/usePlanetStore'

export default function App() {
  const {
    selectedPlanet,
    speed,
    paused,
    effectiveSpeed,
    selectPlanet,
    closePlanet,
    setSpeed,
    togglePause,
  } = usePlanetStore()

  return (
    <>
      {/*
        ════════════════════════════════════
        CANVAS — tudo aqui é renderizado em 3D
        ════════════════════════════════════
      */}
      <Canvas
        camera={{ position: [0, 55, 120], fov: 50, near: 0.1, far: 2000 }}
        style={{ width: '100vw', height: '100vh', background: '#000010' }}
        shadows
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        {/*
          Suspense: aguarda o carregamento das texturas.
          fallback={null} = não mostra nada enquanto carrega.
          NUNCA coloque um componente HTML aqui dentro!
        */}
        <Suspense fallback={null}>

          {/* Campo de estrelas ao fundo */}
          <Stars radius={400} depth={60} count={3000} factor={3} fade speed={0} />

          {/* Sol com luz pontual */}
          <Sun />

          {/* Renderiza todos os planetas com suas órbitas */}
          {PLANETS.map((planet) => (
            <group key={planet.name}>
              <OrbitRing radius={planet.distance} />
              <Planet
                data={planet}
                effectiveSpeed={effectiveSpeed}
                onSelect={selectPlanet}
              />
            </group>
          ))}

          {/* Controle de câmera com mouse/touch */}
          <OrbitControls
            enablePan={false}
            enableDamping
            dampingFactor={0.05}
            minDistance={20}
            maxDistance={230}
            maxPolarAngle={Math.PI * 0.85}
          />

          {/* Pré-carrega todos os assets */}
          <Preload all />

        </Suspense>
      </Canvas>

      {/*
        ════════════════════════════════════
        HTML — tudo aqui é interface normal
        ════════════════════════════════════
      */}

      {/* Painel de informações do planeta clicado */}
      <InfoPanel planet={selectedPlanet} onClose={closePlanet} />

      {/* Controles de velocidade e pause */}
      <Controls
        speed={speed}
        paused={paused}
        onSpeedChange={setSpeed}
        onTogglePause={togglePause}
      />

      {/* Dica de uso */}
      <div style={{
        position: 'fixed',
        bottom: 18,
        left: 20,
        fontSize: 12,
        color: 'rgba(255,255,255,0.25)',
        zIndex: 100,
        pointerEvents: 'none',
        userSelect: 'none',
      }}>
        Arraste para girar · Scroll para zoom · Clique num planeta
      </div>
    </>
  )
}