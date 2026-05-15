'use client'

import Link            from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useCallback, useEffect } from 'react'
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

/* ─────────────────────────────────────
   CURSOR EFFECT — trailing dot + ring
───────────────────────────────────── */
function NavCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const posRef  = useRef({ x: -100, y: -100 })
  const dotPos  = useRef({ x: -100, y: -100 })
  const rafRef  = useRef(null)
  const [visible, setVisible] = useState(false)
  const [clicking, setClicking] = useState(false)

  useEffect(() => {
    const header = document.querySelector('header')
    if (!header) return

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)
    }

    const onLeave = () => setVisible(false)
    const onDown  = () => setClicking(true)
    const onUp    = () => setClicking(false)

    header.addEventListener('mousemove', onMove)
    header.addEventListener('mouseleave', onLeave)
    header.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    /* rAF loop — dot lags behind, ring follows instantly */
    const tick = () => {
      const target = posRef.current
      const cur    = dotPos.current

      /* lerp dot */
      dotPos.current = {
        x: cur.x + (target.x - cur.x) * 0.12,
        y: cur.y + (target.y - cur.y) * 0.12,
      }

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${dotPos.current.x}px, ${dotPos.current.y}px) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${target.x}px, ${target.y}px) translate(-50%, -50%)`
      }

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      header.removeEventListener('mousemove', onMove)
      header.removeEventListener('mouseleave', onLeave)
      header.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(rafRef.current)
    }
  }, [visible])

  return (
    <>
      {/* Outer ring — snappy */}
      <div ref={ringRef} style={{
        position:      'fixed',
        top:           0,
        left:          0,
        width:         clicking ? '28px' : '36px',
        height:        clicking ? '28px' : '36px',
        border:        '1.5px solid rgba(240,238,234,0.55)',
        borderRadius:  '50%',
        pointerEvents: 'none',
        zIndex:        9999,
        opacity:       visible ? 1 : 0,
        transition:    'width 0.15s ease, height 0.15s ease, opacity 0.25s ease',
        mixBlendMode:  'difference',
      }} />

      {/* Inner dot — trails behind */}
      <div ref={dotRef} style={{
        position:        'fixed',
        top:             0,
        left:            0,
        width:           clicking ? '6px' : '5px',
        height:          clicking ? '6px' : '5px',
        background:      '#f0eeea',
        borderRadius:    '50%',
        pointerEvents:   'none',
        zIndex:          9999,
        opacity:         visible ? 1 : 0,
        transition:      'width 0.12s ease, height 0.12s ease, opacity 0.25s ease',
        mixBlendMode:    'difference',
      }} />
    </>
  )
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
      {/* Radial spotlight that tracks horizontal position */}
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

        /* Hide default system cursor inside header */
        header { cursor: none; }
        header a, header button { cursor: none; }

        .nav-hamburger { display: none !important; }

        @media (max-width: 600px) {
          .nav-hamburger { display: flex !important; }
          .nav-tabs      { display: none !important; }
          /* Restore cursor on mobile (no mouse) */
          header, header a, header button { cursor: auto; }
        }
        @media (min-width: 601px) {
          .nav-mobile { display: none !important; }
        }

        /* Reduce motion */
        @media (prefers-reduced-motion: reduce) {
          .nav-tab-link span[style*="animation"] { animation: none !important; }
        }
      `}</style>

      {/* Custom cursor — desktop only */}
      <NavCursor />

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
   SINGLE TAB — isolated so each tab
   can have its own ripple state
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
        color:           isActive ? textColor : adjustAlpha(textColor, 0.55),
        fontFamily:      'var(--font-body)',
        fontWeight:      700,
        fontSize:        'var(--text-sm)',
        letterSpacing:   '0.12em',
        textTransform:   'uppercase',
        borderBottom:    isActive ? '4px solid rgba(0,0,0,0.25)' : '4px solid transparent',
        transition:      'filter 0.15s ease, color 0.15s ease',
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

      {/* Label stays on top */}
      <span style={{ position: 'relative', zIndex: 1 }}>{label}</span>
    </Link>
  )
}
