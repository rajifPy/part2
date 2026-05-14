'use client'

import Link            from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useCallback }    from 'react'
import { siteConfig }  from '@/data/config'

const TAB_COLORS = {
  '/':             '#8a7d3a',
  '/tentang-saya': '#e8a8c0',
  '/pengalaman':   '#d4604a',
  '/galeri':       '#6b1f3a',
}

const TAB_TEXT_COLORS = {
  '/':             '#f0eeea',
  '/tentang-saya': '#1a1a1a',
  '/pengalaman':   '#f0eeea',
  '/galeri':       '#f0eeea',
}

function adjustAlpha(hexOrRgb, alpha) {
  if (hexOrRgb === '#f0eeea') return `rgba(240,238,234,${alpha})`
  if (hexOrRgb === '#1a1a1a') return `rgba(26,26,26,${alpha})`
  return hexOrRgb
}

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  // ── Sound effect ──────────────────────────────────────────
  const audioRef  = useRef(null)

  const playSound = useCallback(() => {
    // Lazy-init audio supaya tidak memblokir render pertama
    if (!audioRef.current) {
      audioRef.current = new Audio('/image/BUBBLE_EFFECT.mp3')
      audioRef.current.volume = 0.35
    }
    const audio = audioRef.current
    audio.currentTime = 0          // reset agar rapid-click tetap bunyi
    audio.play().catch(() => {})   // silent fail jika browser blokir autoplay
  }, [])
  // ─────────────────────────────────────────────────────────

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Top bar */}
      <div style={{
        backgroundColor: '#1a1a1a',
        color:           '#f0eeea',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'space-between',
        padding:         '0 20px',
        height:          '44px',
        fontFamily:      'var(--font-body)',
      }}>
        <div style={{ flex: 1 }} />

        <Link
          href="/"
          onClick={playSound}
          style={{
            fontWeight:    700,
            fontSize:      'var(--text-sm)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         '#f0eeea',
            flex:          1,
            textAlign:     'center',
            whiteSpace:    'nowrap',
            overflow:      'hidden',
            textOverflow:  'ellipsis',
            maxWidth:      'calc(100vw - 96px)',
          }}
        >
          {siteConfig.name}
        </Link>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => { playSound(); setMenuOpen(o => !o) }}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            style={{
              color:      '#f0eeea',
              padding:    '6px 0 6px 12px',
              fontSize:   '1.1rem',
              lineHeight: 1,
            }}
            className="nav-hamburger"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Desktop tab nav */}
      <nav className="nav-tabs" style={{ display: 'flex' }}>
        {siteConfig.nav.map(({ label, href }) => {
          const isActive  = href === '/'
            ? pathname === '/'
            : pathname === href || pathname.startsWith(href + '/')
          const bg        = TAB_COLORS[href]      ?? '#ccc'
          const textColor = TAB_TEXT_COLORS[href] ?? '#1a1a1a'

          return (
            <Link
              key={href}
              href={href}
              onClick={playSound}
              style={{
                flex:            1,
                textAlign:       'center',
                padding:         '14px 6px',
                backgroundColor: bg,
                color:           isActive ? textColor : adjustAlpha(textColor, 0.55),
                fontFamily:      'var(--font-body)',
                fontWeight:      700,
                fontSize:        'var(--text-sm)',
                letterSpacing:   '0.12em',
                textTransform:   'uppercase',
                borderBottom:    isActive ? '4px solid rgba(0,0,0,0.25)' : '4px solid transparent',
                transition:      'filter var(--transition-base)',
                whiteSpace:      'nowrap',
              }}
              onMouseEnter={e => e.currentTarget.style.filter = 'brightness(0.9)'}
              onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
            >
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Mobile dropdown nav */}
      {menuOpen && (
        <nav
          className="nav-mobile"
          style={{
            backgroundColor: '#1a1a1a',
            display:         'flex',
            flexDirection:   'column',
            borderTop:       '1px solid rgba(240,238,234,0.1)',
          }}
        >
          {siteConfig.nav.map(({ label, href }) => {
            const isActive = href === '/'
              ? pathname === '/'
              : pathname === href || pathname.startsWith(href + '/')
            const bg = TAB_COLORS[href] ?? '#ccc'
            return (
              <Link
                key={href}
                href={href}
                onClick={() => { playSound(); setMenuOpen(false) }}
                style={{
                  padding:         '16px 24px',
                  backgroundColor: isActive ? bg : 'transparent',
                  color:           isActive ? (TAB_TEXT_COLORS[href] ?? '#f0eeea') : 'rgba(240,238,234,0.65)',
                  fontFamily:      'var(--font-body)',
                  fontWeight:      700,
                  fontSize:        'var(--text-sm)',
                  letterSpacing:   '0.12em',
                  textTransform:   'uppercase',
                  borderLeft:      isActive ? `4px solid rgba(255,255,255,0.3)` : '4px solid transparent',
                  display:         'block',
                }}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      )}

      <style>{`
        .nav-hamburger { display: none !important; }

        @media (max-width: 600px) {
          .nav-hamburger { display: flex !important; }
          .nav-tabs      { display: none !important; }
        }
        @media (min-width: 601px) {
          .nav-mobile { display: none !important; }
        }
      `}</style>
    </header>
  )
}
