'use client'

import { siteConfig } from '@/data/config'

export default function TentangSayaClient() {
  return (
    <div className="page-layout">

      {/* Sidebar kiri — pink */}
      <aside
        className="page-sidebar"
        style={{ backgroundColor: '#e8a8c0' }}
      >
        <div>
          <h1 className="sidebar-heading sidebar-heading--dark" style={{ marginBottom: '24px' }}>
            TENTANG<br/>SAYA
          </h1>
          <p style={{
            fontFamily:    'var(--font-body)',
            fontWeight:    500,
            fontSize:      'var(--text-sm)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:         'rgba(26,26,26,0.55)',
          }}>{siteConfig.role}</p>
        </div>

        <div className="social-links">
          {Object.entries(siteConfig.links).map(([key, url]) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'rgba(26,26,26,0.5)' }}
              onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(26,26,26,0.5)'}
            >
              {key}
            </a>
          ))}
          <span style={{
            fontSize:   'var(--text-xs)',
            color:      'rgba(26,26,26,0.4)',
            marginTop:  '4px',
          }}>{siteConfig.email}</span>
        </div>
      </aside>

      {/* Konten kanan */}
      <main className="page-main">
        <div className="name-bar">
          <p>{siteConfig.name}</p>
        </div>

        <div style={{
          padding:  'clamp(24px, 5vw, 48px) clamp(16px, 5vw, 40px)',
          maxWidth: '680px',
        }}>
          <p style={{
            fontFamily:   'var(--font-body)',
            fontSize:     '1.05rem',
            lineHeight:   1.85,
            color:        '#1a1a1a',
            marginBottom: '24px',
          }}>
            Tuliskan biografi singkat Anda di sini. Sebutkan posisi, institusi,
            dan latar belakang akademik Anda.
          </p>
          <p style={{
            fontFamily:   'var(--font-body)',
            fontSize:     '1.05rem',
            lineHeight:   1.85,
            color:        '#1a1a1a',
            marginBottom: '24px',
          }}>
            Paragraf kedua: fokus penelitian, metodologi, dan minat akademik utama.
          </p>
          <p style={{
            fontFamily:   'var(--font-body)',
            fontSize:     '1.05rem',
            lineHeight:   1.85,
            color:        '#1a1a1a',
            marginBottom: '36px',
          }}>
            Paragraf ketiga: riwayat pendidikan dan afiliasi terdahulu.
          </p>

          <a
            href={`mailto:${siteConfig.email.replace('[at]', '@')}`}
            className="about-email-btn"
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e8a8c0'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1a1a1a'}
          >
            {siteConfig.email} →
          </a>
        </div>
      </main>
    </div>
  )
}
