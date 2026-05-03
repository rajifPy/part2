'use client'

const CARD_COLORS = ['#6b1f3a', '#c94f35', '#d4604a', '#8a7d3a']

export default function ResearchCard({ item, onClick, colorIndex = 0 }) {
  const bgColor = CARD_COLORS[colorIndex % CARD_COLORS.length]

  return (
    <button
      onClick={() => onClick(item)}
      className="research-card"
      style={{ backgroundColor: bgColor }}
    >
      {/* Thumbnail */}
      <div className="research-card__thumb">
        {item.image
          ? <img
              src={item.image}
              alt={item.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          : <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.2)' }} />
        }
      </div>

      {/* Teks */}
      <div className="research-card__body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{
            fontFamily:    'var(--font-body)',
            fontWeight:    400,
            fontSize:      'var(--text-sm)',
            color:         'rgba(240,238,234,0.75)',
            letterSpacing: '0.05em',
          }}>{item.year}</span>
          <span style={{
            fontFamily:    'var(--font-body)',
            fontWeight:    700,
            fontSize:      'var(--text-xs)',
            color:         'rgba(240,238,234,0.75)',
            letterSpacing: '0.1em',
          }}>READ →</span>
        </div>

        <div>
          <h3 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(1.4rem, 2.5vw, 2rem)',
            color:         '#f0eeea',
            lineHeight:    1.05,
            letterSpacing: '0.03em',
            marginBottom:  '10px',
            textTransform: 'uppercase',
          }}>
            {item.title}
            {item.subtitle && (
              <span style={{ fontSize: '0.75em', opacity: 0.9 }}> ({item.subtitle})</span>
            )}
          </h3>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize:   'var(--text-sm)',
            color:      'rgba(240,238,234,0.85)',
            lineHeight: 1.5,
          }}>{item.tagline}</p>
        </div>
      </div>
    </button>
  )
}
