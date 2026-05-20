// Painel HTML exibido quando o usuário clica num planeta.
// Fica fixo sobre o canvas 3D, no canto superior direito.
// IMPORTANTE: este componente é HTML puro, NÃO fica dentro do Canvas.

export function InfoPanel({ planet, onClose }) {
  // Se nenhum planeta selecionado, não renderiza nada
  if (!planet) return null

  return (
    <>
      {/* Animação de entrada */}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{
        position: 'fixed',
        top: 20,
        right: 20,
        width: 240,
        background: 'rgba(0, 0, 15, 0.88)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: 14,
        padding: '20px 18px',
        color: '#ffffff',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 100,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        animation: 'slideIn 0.25s ease',
      }}>

        {/* Botão fechar */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 12,
            right: 14,
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: 20,
            cursor: 'pointer',
            lineHeight: 1,
            padding: 0,
          }}
          aria-label="Fechar"
        >
          ×
        </button>

        {/* Nome do planeta */}
        <h2 style={{
          fontSize: 20,
          fontWeight: 600,
          marginBottom: 4,
          paddingRight: 24,
        }}>
          {planet.name}
        </h2>

        {/* Tipo do planeta */}
        <p style={{
          fontSize: 11,
          color: 'rgba(255, 255, 255, 0.4)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: 14,
        }}>
          {planet.type}
        </p>

        {/* Lista de curiosidades */}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {planet.facts.map((fact, index) => (
            <li key={index} style={{
              fontSize: 13,
              lineHeight: 1.75,
              color: 'rgba(255, 255, 255, 0.72)',
              display: 'flex',
              gap: 8,
              marginBottom: 2,
            }}>
              <span style={{ color: '#f9c74f', flexShrink: 0 }}>◆</span>
              <span>{fact}</span>
            </li>
          ))}
        </ul>

      </div>
    </>
  )
}