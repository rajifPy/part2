'use client'

import Link            from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useCallback, memo } from 'react'
import { siteConfig }  from '@/data/config'
import { useNavSound } from '@/hooks/useNavSound'

// ─── Konstanta warna per halaman ─────────────────────────────
const TAB_COLORS = {
  '/':             '#8a7d3a',
  '/tentang-saya': '#e8a8c0',
  '/pengalaman':   '#d4604a',
  '/galeri':       '#6b1f3a',
  '/blog':         '#c94f35',
}

const TAB_TEXT_COLORS = {
  '/':             '#f0eeea',
  '/tentang-saya': '#1a1a1a',
  '/pengalaman':   '#f0eeea',
  '/galeri':       '#f0eeea',
  '/blog':         '#f0eeea',
}

function alphaHex(hex, alpha) {
  // Konversi hex ke rgba untuk transparent states
  const map = {
    '#f0eeea': `rgba(240,238,234,${alpha})`,
    '#1a1a1a': `rgba(26,26,26,${alpha})`,
  }
  return map[hex] ?? hex
}

// ─── Desktop Tab Link — di-memo supaya tidak re-render tiap keystroke ──
const TabLink = memo(function TabLink({ href, label, isActive, bg, textColor, onPlay }) {
  const activeColor = textColor
  const idleColor   = alphaHex(textColor, 0.55)

  return (
    <Link
      href={href}
      onClick={onPlay}
      prefetch={true}                    // Next.js prefetch untuk navigasi instan
      style={{
        flex:            1,
        textAlign:       'center',
        padding:         '14px 6px',
        backgroundColor: bg,
        color:           isActive ? activeColor : idleColor,
        fontFamily:      'var(--font-body)',
        fontWeight:      700,
        fontSize:        'var(--text-sm)',
        letterSpacing:   '0.12em',
        textTransform:   'uppercase',
        borderBottom:    isActive ? '4px solid rgba(0,0,0,0.25)' : '4px solid transparent',
        // GPU-composited transition — hanya opacity & filter, tidak layout
        transition:      'filter 0.15s ease, opacity 0.15s ease',
        whiteSpace:      'nowrap',
        // Hapus filter brightness hover dari JS → pakai CSS vars supaya lebih smooth
        willChange:      'filter',
      }}
      // Hover via CSS class lebih performant daripada JS inline style
      className="nav-tab-link"
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </Link>
  )
})

// ─── Mobile Nav Link ─────────────────────────────────────────
const MobileNavLink = memo(function MobileNavLink({ href, label, isActive, bg, textColor, onPlay, onClose }) {
  const handleClick = useCallback(() => {
    onPlay()
    onClose()
  }, [onPlay, onClose])

  return (
    <Link
      href={href}
      onClick={handleClick}
      prefetch={true}
      style={{
        padding:         '16px 24px',
        backgroundColor: isActive ? bg : 'transparent',
        color:           isActive ? textColor : 'rgba(240,238,234,0.65)',
        fontFamily:      'var(--font-body)',
        fontWeight:      700,
        fontSize:        'var(--text-sm)',
        letterSpacing:   '0.12em',
        textTransform:   'uppercase',
        borderLeft:      isActive ? '4px solid rgba(255,255,255,0.3)' : '4px solid transparent',
        display:         'block',
        transition:      'background-color 0.12s ease, color 0.12s ease',
      }}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </Link>
  )
})

// ─── Main Navbar ─────────────────────────────────────────────
export default function Navbar() {
  const pathname  = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const playSound = useNavSound('/image/BUBBLE_EFFECT.mp3')

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const toggleMenu = useCallback(() => {
    playSound()
    setMenuOpen(o => !o)
  }, [playSound])

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100 }}>

      {/* ─── Top brand bar ─── */}
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
          prefetch={true}
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
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
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

      {/* ─── Desktop tab nav ─── */}
      <nav className="nav-tabs" aria-label="Menu utama">
        {siteConfig.nav.map(({ label, href }) => {
          const isActive  = href === '/'
            ? pathname === '/'
            : pathname === href || pathname.startsWith(href + '/')
          const bg        = TAB_COLORS[href]      ?? '#ccc'
          const textColor = TAB_TEXT_COLORS[href] ?? '#1a1a1a'

          return (
            <TabLink
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

      {/* ─── Mobile dropdown nav ─── */}
      <nav
        id="mobile-nav"
        className="nav-mobile"
        aria-label="Menu mobile"
        aria-hidden={!menuOpen}
        style={{
          backgroundColor: '#1a1a1a',
          display:         menuOpen ? 'flex' : 'none',
          flexDirection:   'column',
          borderTop:       '1px solid rgba(240,238,234,0.1)',
          // Animasi slide-down ringan via CSS transform
          animation:       menuOpen ? 'navSlideDown 0.2s ease both' : 'none',
        }}
      >
        {siteConfig.nav.map(({ label, href }) => {
          const isActive = href === '/'
            ? pathname === '/'
            : pathname === href || pathname.startsWith(href + '/')
          const bg        = TAB_COLORS[href]      ?? '#ccc'
          const textColor = TAB_TEXT_COLORS[href] ?? '#f0eeea'

          return (
            <MobileNavLink
              key={href}
              href={href}
              label={label}
              isActive={isActive}
              bg={bg}
              textColor={textColor}
              onPlay={playSound}
              onClose={closeMenu}
            />
          )
        })}
      </nav>

      {/* ─── Scoped styles ─── */}
      <style>{`
        /* Hamburger: mobile only */
        .nav-hamburger { display: none !important; }

        /* Desktop tab hover — CSS lebih performant dari JS inline */
        .nav-tab-link:hover { filter: brightness(0.88); }
        .nav-tab-link:active { filter: brightness(0.75); }

        /* Mobile nav slide-down animation */
        @keyframes navSlideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .nav-hamburger { display: flex !important; }
          .nav-tabs      { display: none !important; }
        }
        @media (min-width: 601px) {
          .nav-mobile { display: none !important; }
        }

        /* Reduce motion: skip animations */
        @media (prefers-reduced-motion: reduce) {
          .nav-tab-link  { transition: none !important; }
          @keyframes navSlideDown { from { opacity: 1; transform: none; } }
        }
      `}</style>
    </header>
  )
}
