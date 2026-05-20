// Hook customizado para gerenciar o estado global da aplicação.
// Controla: qual planeta está selecionado, velocidade e pausa.

import { useCallback, useState } from 'react'

export function usePlanetStore() {
  // Planeta clicado pelo usuário (null = nenhum = painel fechado)
  const [selectedPlanet, setSelectedPlanet] = useState(null)

  // Multiplicador de velocidade das órbitas (0 a 5)
  const [speed, setSpeed] = useState(1)

  // Se true, todas as órbitas param
  const [paused, setPaused] = useState(false)

  // useCallback: evita recriar funções a cada render (otimização)
  const selectPlanet = useCallback((planet) => {
    setSelectedPlanet(planet)
  }, [])

  const closePlanet = useCallback(() => {
    setSelectedPlanet(null)
  }, [])

  const togglePause = useCallback(() => {
    setPaused((prev) => !prev)
  }, [])

  // Quando pausado, a velocidade efetiva é 0
  const effectiveSpeed = paused ? 0 : speed

  return {
    selectedPlanet,
    speed,
    paused,
    effectiveSpeed,
    selectPlanet,
    closePlanet,
    setSpeed,
    togglePause,
  }
}