'use client'

import Link            from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useCallback, useEffect } from 'react'
import { siteConfig }  from '@/data/config'
import ThemeToggle from '@/components/ui/ThemeToggle'

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

/* ─────────────────────────────────────
   HOVER SPOTLIGHT — per-tab glow strip
───────────────────────────────────── */
function TabSpotlight({ color }) {
  const [pos, setPos] = useState({ x: 50, show: false })
  const ref = useRef(null)

  const onMove = useCallback((e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    setPos({ x, show: true })
  }, [])

  const onLeave = useCallback(() => setPos(p => ({ ...p, show: false })), [])

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'all',
      }}
    >
      <div style={{
        position:   'absolute',
        inset:      0,
        background: `radial-gradient(ellipse 60% 120% at ${pos.x}% 110%, rgba(255,255,255,0.22) 0%, transparent 70%)`,
        opacity:    pos.show ? 1 : 0,
        transition: 'opacity 0.2s ease',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

/* ─────────────────────────────────────
   RIPPLE on click
───────────────────────────────────── */
function useRipple() {
  const [ripples, setRipples] = useState([])

  const addRipple = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    setRipples(r => [...r, { x, y, id }])
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 600)
  }, [])

  const RippleContainer = useCallback(({ color }) => (
    <>
      {ripples.map(rp => (
        <span key={rp.id} style={{
          position:      'absolute',
          left:          rp.x,
          top:           rp.y,
          width:         '8px',
          height:        '8px',
          borderRadius:  '50%',
          background:    'rgba(255,255,255,0.45)',
          transform:     'translate(-50%, -50%) scale(0)',
          animation:     'navRipple 0.55s ease-out forwards',
          pointerEvents: 'none',
        }} />
      ))}
    </>
  ), [ripples])

  return { addRipple, RippleContainer }
}

/* ─────────────────────────────────────
   GLITCH TEXT — efek glitch saat hover
───────────────────────────────────── */
function GlitchLabel({ label, isActive, textColor }) {
  const [glitching, setGlitching] = useState(false)
  const timerRef = useRef(null)

  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'
  const [displayText, setDisplayText] = useState(label)
  const iterRef = useRef(0)

  const startGlitch = useCallback(() => {
    if (glitching) return
    setGlitching(true)
    iterRef.current = 0
    const originalChars = label.toUpperCase().split('')
    const totalIter = originalChars.length * 3  // iterasi total

    const tick = () => {
      iterRef.current++
      const progress = iterRef.current / totalIter

      const next = originalChars.map((ch, i) => {
        if (ch === ' ') return ' '
        // karakter terkunci dari kiri secara bertahap
        if (i < Math.floor(progress * originalChars.length)) return ch
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      }).join('')

      setDisplayText(next)

      if (iterRef.current < totalIter) {
        timerRef.current = setTimeout(tick, 38)
      } else {
        setDisplayText(label.toUpperCase())
        setGlitching(false)
      }
    }

    timerRef.current = setTimeout(tick, 0)
  }, [label, glitching])

  const stopGlitch = useCallback(() => {
    clearTimeout(timerRef.current)
    setDisplayText(label.toUpperCase())
    setGlitching(false)
  }, [label])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  return (
    <span
      onMouseEnter={startGlitch}
      onMouseLeave={stopGlitch}
      style={{
        position:      'relative',
        zIndex:        1,
        fontFamily:    'var(--font-body)',
        fontWeight:    700,
        fontSize:      'var(--text-sm)',
        letterSpacing: glitching ? '0.18em' : '0.12em',
        color:         isActive ? textColor : adjustAlpha(textColor, 0.55),
        transition:    'letter-spacing 0.1s ease, color 0.15s ease',
        display:       'inline-block',
        minWidth:      '4ch',   // cegah layout shift saat karakter random lebih lebar
      }}
    >
      {/* Layer glitch merah — sedikit geser ke kanan */}
      {glitching && (
        <span aria-hidden="true" style={{
          position:    'absolute',
          inset:       0,
          color:       'rgba(255,60,60,0.55)',
          transform:   'translateX(2px)',
          pointerEvents: 'none',
          letterSpacing: '0.18em',
          userSelect:  'none',
        }}>
          {displayText}
        </span>
      )}

      {/* Layer glitch cyan — sedikit geser ke kiri */}
      {glitching && (
        <span aria-hidden="true" style={{
          position:    'absolute',
          inset:       0,
          color:       'rgba(0,220,220,0.45)',
          transform:   'translateX(-2px)',
          pointerEvents: 'none',
          letterSpacing: '0.18em',
          userSelect:  'none',
        }}>
          {displayText}
        </span>
      )}

      {/* Teks utama */}
      <span style={{ position: 'relative' }}>{displayText}</span>
    </span>
  )
}

/* ─────────────────────────────────────
   MAIN NAVBAR
───────────────────────────────────── */
export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = new Audio('/image/BUBBLE_EFFECT.mp3')
    audio.preload = 'auto'
    audio.volume  = 0.35
    audioRef.current = audio
  }, [])

  const playSound = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = 0
    audio.play().catch(() => {})
  }, [])

  return (
    <>
      <style>{`
        @keyframes navRipple {
          to { transform: translate(-50%, -50%) scale(18); opacity: 0; }
        }

        .nav-tab-link {
          position: relative;
          overflow: hidden;
        }

        .nav-hamburger { display: none !important; }

        @media (max-width: 600px) {
          .nav-hamburger { display: flex !important; }
          .nav-tabs      { display: none !important; }
        }
        @media (min-width: 601px) {
          .nav-mobile { display: none !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .nav-tab-link span[style*="animation"] { animation: none !important; }
        }
      `}</style>

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
            <ThemeToggle/>
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
              <NavTabLink
                key={href}
                href={href}
                label={label}
                isActive={isActive}
                bg={bg}
                textColor={textColor}
                onPlay={playSound}
              />
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
      </header>
    </>
  )
}

/* ─────────────────────────────────────
   SINGLE TAB — isolated ripple + glitch
───────────────────────────────────── */
function NavTabLink({ href, label, isActive, bg, textColor, onPlay }) {
  const { addRipple, RippleContainer } = useRipple()

  const handleClick = useCallback((e) => {
    addRipple(e)
    onPlay()
  }, [addRipple, onPlay])

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="nav-tab-link"
      style={{
        flex:            1,
        textAlign:       'center',
        padding:         '14px 6px',
        backgroundColor: bg,
        borderBottom:    isActive ? '4px solid rgba(0,0,0,0.25)' : '4px solid transparent',
        transition:      'filter 0.15s ease',
        whiteSpace:      'nowrap',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
      }}
      onMouseEnter={e => e.currentTarget.style.filter = 'brightness(0.9)'}
      onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
    >
      {/* Spotlight glow */}
      <TabSpotlight color={bg} />

      {/* Ripples */}
      <RippleContainer color={bg} />

      {/* Glitch label */}
      <GlitchLabel label={label} isActive={isActive} textColor={textColor} />
    </Link>
  )
}
