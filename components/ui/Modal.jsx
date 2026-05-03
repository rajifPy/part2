'use client'

import { useEffect } from 'react'

export default function Modal({ item, onClose }) {
  useEffect(() => {
    if (!item) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    // Save current scroll position and lock body
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollY)
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .modal-overlay {
          animation: modalFadeIn 0.2s ease;
        }
      `}</style>

      <div
        className="modal-inner"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            fontFamily:    'var(--font-body)',
            fontWeight:    700,
            fontSize:      'var(--text-xs)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color:         '#999',
            marginBottom:  '32px',
            display:       'flex',
            alignItems:    'center',
            gap:           '8px',
            transition:    'color var(--transition-base)',
            padding:       '8px 0',        /* larger tap target on mobile */
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'}
          onMouseLeave={e => e.currentTarget.style.color = '#999'}
        >
          ← Close
        </button>

        {/* Category label */}
        <p style={{
          fontFamily:    'var(--font-body)',
          fontWeight:    700,
          fontSize:      'var(--text-xs)',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color:         '#c94f35',
          marginBottom:  '10px',
        }}>{item.subtitle}</p>

        {/* Title */}
        <h2 style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(1.8rem, 5vw, 3.2rem)',
          fontWeight:    400,
          lineHeight:    1.0,
          letterSpacing: '0.03em',
          textTransform: 'uppercase',
          marginBottom:  '28px',
          maxWidth:      '640px',
        }}>{item.title}</h2>

        {/* PDF link */}
        {item.pdfUrl && (
          <a
            href={item.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display:         'inline-flex',
              alignItems:      'center',
              gap:             '10px',
              fontFamily:      'var(--font-body)',
              fontWeight:      700,
              fontSize:        'var(--text-xs)',
              letterSpacing:   '0.15em',
              textTransform:   'uppercase',
              backgroundColor: '#1a1a1a',
              color:           '#f0eeea',
              padding:         '10px 20px',
              marginBottom:    '36px',
              transition:      'background-color var(--transition-base)',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#c94f35'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1a1a1a'}
          >
            Download PDF ↓
          </a>
        )}

        {/* Meta */}
        {item.meta?.length > 0 && (
          <div style={{
            marginBottom: '28px',
            display:      'flex',
            flexWrap:     'wrap',
            gap:          '8px 24px',
          }}>
            {item.meta.map(m => (
              <div key={m.label} style={{ display: 'flex', gap: '10px', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily:    'var(--font-body)',
                  fontWeight:    700,
                  fontSize:      'var(--text-xs)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color:         '#999',
                }}>{m.label}</span>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   'var(--text-sm)',
                  color:      '#1a1a1a',
                }}>{m.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Divider */}
        <div style={{ height: '2px', backgroundColor: '#1a1a1a', marginBottom: '28px' }} />

        {/* Body */}
        <div>
          {(Array.isArray(item.body) ? item.body : [item.body]).map((para, i) => (
            <p key={i} style={{
              fontFamily:   'var(--font-body)',
              fontSize:     '1rem',
              lineHeight:   1.85,
              marginBottom: '18px',
              color:        '#1a1a1a',
            }}>{para}</p>
          ))}
        </div>

        {/* Images */}
        {item.images?.map((img, i) => (
          <div key={i} style={{ marginTop: '28px' }}>
            <div style={{
              width:           '100%',
              aspectRatio:     '16/9',
              backgroundColor: '#d0cec8',
              overflow:        'hidden',
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
            }}>
              {img.src
                ? <img src={img.src} alt={img.caption}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span style={{
                    fontFamily:    'var(--font-body)',
                    fontSize:      'var(--text-xs)',
                    color:         '#999',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}>Image</span>
              }
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'var(--text-xs)',
              color:      '#777',
              marginTop:  '8px',
              lineHeight: 1.6,
            }}>
              <strong style={{ color: '#1a1a1a' }}>{i + 1}.</strong> {img.caption}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
