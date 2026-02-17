import './D20.css'

function D20({ rolling, value, isCrit, isFail }) {
  const stroke = isCrit ? '#ffd700' : isFail ? '#ff4444' : 'var(--accent)'
  const fill = isCrit
    ? 'rgba(255, 215, 0, 0.08)'
    : isFail
    ? 'rgba(255, 68, 68, 0.08)'
    : 'var(--bg-primary)'
  const textColor = isCrit ? '#ffd700' : isFail ? '#ff4444' : 'var(--text-primary)'

  return (
    <div className={`d20-container${rolling ? ' rolling' : ''}${isCrit ? ' crit' : ''}${isFail ? ' fail' : ''}`}>
      <svg viewBox="0 0 120 120" className="d20-svg" xmlns="http://www.w3.org/2000/svg">
        {/* Outer D20 hexagonal silhouette */}
        <polygon
          points="60,4 100,26 100,84 60,116 20,84 20,26"
          fill={fill}
          stroke={stroke}
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Top horizontal divider */}
        <line x1="20" y1="26" x2="100" y2="26" stroke={stroke} strokeWidth="2" opacity="0.6" />

        {/* Bottom horizontal divider */}
        <line x1="20" y1="84" x2="100" y2="84" stroke={stroke} strokeWidth="2" opacity="0.6" />

        {/* Belt diagonal lines */}
        <line x1="60" y1="26" x2="20" y2="84" stroke={stroke} strokeWidth="1.5" opacity="0.4" />
        <line x1="60" y1="26" x2="100" y2="84" stroke={stroke} strokeWidth="1.5" opacity="0.4" />
        <line x1="20" y1="26" x2="60" y2="84" stroke={stroke} strokeWidth="1.5" opacity="0.4" />
        <line x1="100" y1="26" x2="60" y2="84" stroke={stroke} strokeWidth="1.5" opacity="0.4" />

        {/* Number or placeholder */}
        {value !== null ? (
          <text
            x="60"
            y="58"
            textAnchor="middle"
            dominantBaseline="central"
            fill={textColor}
            fontSize={value >= 10 ? '22' : '26'}
            fontFamily="'Press Start 2P', monospace"
          >
            {value}
          </text>
        ) : (
          <text
            x="60"
            y="58"
            textAnchor="middle"
            dominantBaseline="central"
            fill={stroke}
            fontSize="14"
            fontFamily="'Press Start 2P', monospace"
            opacity="0.35"
          >
            d20
          </text>
        )}
      </svg>
    </div>
  )
}

export default D20
