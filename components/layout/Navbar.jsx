'use client'

import Link            from 'next/link'
import { usePathname } from 'next/navigation'
import { siteConfig }  from '@/data/config'

const TAB_COLORS = {
  '/about':     '#8a7d3a',
  '/news':      '#e8a8c0',
  '/work':      '#d4604a',
  '/documents': '#6b1f3a',
}

const TAB_TEXT_COLORS = {
  '/about':     '#f0eeea',
  '/news':      '#1a1a1a',
  '/work':      '#1a1a1a',
  '/documents': '#f0eeea',
}

function adjustAlpha(hexOrRgb, alpha) {
  if (hexOrRgb === '#f0eeea') return `rgba(240,238,234,${alpha})`
  if (hexOrRgb === '#1a1a1a') return `rgba(26,26,26,${alpha})`
  return hexOrRgb
}

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Top bar */}
      <div style={{
        backgroundColor: '#1a1a1a',
        color:           '#f0eeea',
        textAlign:       'center',
        padding:         '10px 0',
        fontFamily:      'var(--font-body)',
        fontWeight:      700,
        fontSize:        'var(--text-sm)',
        letterSpacing:   '0.18em',
        textTransform:   'uppercase',
      }}>
        {siteConfig.name}
      </div>

      {/* Tab navigasi */}
      <nav style={{ display: 'flex' }}>
        {siteConfig.nav.map(({ label, href }) => {
          const isActive  = pathname === href || pathname.startsWith(href + '/')
          const bg        = TAB_COLORS[href]      ?? '#ccc'
          const textColor = TAB_TEXT_COLORS[href] ?? '#1a1a1a'

          return (
            <Link
              key={href}
              href={href}
              style={{
                flex:            1,
                textAlign:       'center',
                padding:         '18px 8px',
                backgroundColor: bg,
                color:           isActive ? textColor : adjustAlpha(textColor, 0.55),
                fontFamily:      'var(--font-body)',
                fontWeight:      700,
                fontSize:        'var(--text-sm)',
                letterSpacing:   '0.15em',
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
    </header>
  )
}
