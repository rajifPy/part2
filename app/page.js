'use client'

import { siteConfig } from '@/data/config'

export default function HomePage() {
  return (
    <div className="page-layout">

      {/* Sidebar kiri — olive */}
      <aside
        className="page-sidebar"
        style={{ backgroundColor: '#8a7d3a' }}
      >
        <div>
          <h1 className="sidebar-heading" style={{ marginBottom: '28px' }}>
            {siteConfig.name.split(' ').map((word, i) => (
              <span key={i} style={{ display: 'block' }}>{word.toUpperCase()}</span>
            ))}
          </h1>
          <p style={{
            fontFamily:    'var(--font-body)',
            fontWeight:    500,
            fontSize:      'var(--text-sm)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:         'rgba(240,238,234,0.75)',
          }}>{siteConfig.role}</p>
        </div>

        <div className="social-links">
          {Object.entries(siteConfig.links).map(([key, url]) => (
            <a key={key} href={url} target="_blank" rel="noopener noreferrer">
              {key}
            </a>
          ))}
          <span className="email">{siteConfig.email}</span>
        </div>
      </aside>

      {/* Konten kanan */}
      <main
        className="page-main"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <div className="name-bar">
          <p>Research Portfolio</p>
        </div>

        <div style={{
          flex:            1,
          padding:         'clamp(28px, 5vw, 48px) clamp(16px, 5vw, 40px)',
          backgroundColor: '#f0eeea',
        }}>
          <p style={{
            fontFamily:   'var(--font-body)',
            fontWeight:   400,
            fontSize:     '1.05rem',
            lineHeight:   1.8,
            color:        '#1a1a1a',
            maxWidth:     '520px',
            marginBottom: '32px',
          }}>
            Peneliti di bidang [bidang Anda] di [Institusi].
            Penelitian saya berfokus pada [topik utama], dengan minat khusus
            pada [topik A] dan [topik B] melalui pendekatan sejarah arsip
            dan sejarah lisan.
          </p>

          <a
            href="/work"
            style={{
              display:         'inline-flex',
              alignItems:      'center',
              gap:             '10px',
              fontFamily:      'var(--font-body)',
              fontWeight:      700,
              fontSize:        'var(--text-sm)',
              letterSpacing:   '0.15em',
              textTransform:   'uppercase',
              backgroundColor: '#1a1a1a',
              color:           '#f0eeea',
              padding:         '12px 24px',
              transition:      'background-color var(--transition-base)',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#c94f35'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1a1a1a'}
          >
            Lihat karya →
          </a>
        </div>
      </main>
    </div>
  )
}
