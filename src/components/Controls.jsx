// Painel HTML de controles: slider de velocidade e botão pause.
// Fica fixo no canto superior esquerdo, sobre o canvas 3D.
// IMPORTANTE: este componente é HTML puro, NÃO fica dentro do Canvas.

export function Controls({ speed, paused, onSpeedChange, onTogglePause }) {
  return (
    <div style={{
      position: 'fixed',
      top: 20,
      left: 20,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      background: 'rgba(0, 0, 15, 0.75)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      borderRadius: 10,
      padding: '10px 16px',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      zIndex: 100,
    }}>

      {/* Label */}
      <span style={{
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.45)',
        userSelect: 'none',
      }}>
        Velocidade
      </span>

      {/* Slider de velocidade */}
      <input
        type="range"
        min={0}
        max={5}
        step={0.1}
        value={speed}
        onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
        style={{
          width: 90,
          accentColor: '#f9c74f',
          cursor: 'pointer',
        }}
        aria-label="Velocidade das órbitas"
      />

      {/* Valor atual */}
      <span style={{
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.6)',
        minWidth: 24,
        textAlign: 'right',
      }}>
        {speed.toFixed(1)}x
      </span>

      {/* Divisor */}
      <div style={{
        width: 1,
        height: 20,
        background: 'rgba(255, 255, 255, 0.1)',
      }} />

      {/* Botão pause/continuar */}
      <button
        onClick={onTogglePause}
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: 'rgba(255, 255, 255, 0.75)',
          borderRadius: 6,
          padding: '5px 12px',
          fontSize: 12,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
        aria-label={paused ? 'Continuar animação' : 'Pausar animação'}
      >
        {paused ? '▶ Continuar' : '⏸ Pausar'}
      </button>

    </div>
  )
}