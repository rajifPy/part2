'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { siteConfig } from '@/data/config'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <>
      <style>{`
        /* ── Grid texture overlay ── */
        .home-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(240,238,234,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(240,238,234,0.06) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        /* ── Stagger reveal animations ── */
        @keyframes slideUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes slideRight {
          from { opacity:0; transform:translateX(-20px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity:0; }
          to   { opacity:1; }
        }

        .home-role     { animation: slideRight .6s ease .15s both; }
        .home-name     { animation: slideUp   .7s ease .25s both; }
        .home-divider  { animation: fadeIn    .5s ease .45s both; }
        .home-tagline  { animation: slideUp   .6s ease .5s  both; }
        .home-ctas     { animation: slideUp   .6s ease .65s both; }
        .home-meta     { animation: fadeIn    .7s ease .8s  both; }
        .home-index    { animation: fadeIn    .8s ease .9s  both; }

        /* ── CTA buttons ── */
        .home-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--font-body); font-weight: 700;
          font-size: .78rem; letter-spacing: .16em; text-transform: uppercase;
          background: #f0eeea; color: #1a1a1a;
          padding: 14px 28px;
          border: 2px solid #f0eeea;
          transition: background .15s, color .15s;
        }
        .home-btn-primary:hover { background: #c94f35; border-color: #c94f35; color: #f0eeea; }

        .home-btn-secondary {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--font-body); font-weight: 700;
          font-size: .78rem; letter-spacing: .16em; text-transform: uppercase;
          background: transparent; color: rgba(240,238,234,.65);
          padding: 14px 28px;
          border: 2px solid rgba(240,238,234,.3);
          transition: border-color .15s, color .15s;
        }
        .home-btn-secondary:hover { border-color: #f0eeea; color: #f0eeea; }

        /* ── Social links ── */
        .home-social a {
          font-family: var(--font-body); font-size: .62rem;
          letter-spacing: .14em; text-transform: uppercase;
          color: rgba(240,238,234,.35);
          transition: color .15s;
        }
        .home-social a:hover { color: #f0eeea; }

        /* ── Right panel nav items ── */
        .home-nav-item {
          display: flex; align-items: center; gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(26,26,26,.1);
          text-decoration: none;
          transition: gap .2s;
          group: true;
        }
        .home-nav-item:hover { gap: 22px; }
        .home-nav-item:hover .home-nav-arrow { color: #c94f35; }
        .home-nav-num {
          font-family: var(--font-display);
          font-size: 1.1rem; color: rgba(26,26,26,.2);
          line-height: 1; min-width: 28px;
          transition: color .15s;
        }
        .home-nav-item:hover .home-nav-num { color: #c94f35; }
        .home-nav-label {
          font-family: var(--font-body); font-weight: 700;
          font-size: .75rem; letter-spacing: .14em; text-transform: uppercase;
          color: #1a1a1a; flex: 1;
        }
        .home-nav-arrow {
          font-family: var(--font-body); font-size: .72rem;
          color: rgba(26,26,26,.3); transition: color .15s;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .home-split { flex-direction: column !important; min-height: auto !important; }
          .home-left  { min-height: 60vw !important; padding: 32px 24px !important; }
          .home-right { padding: 28px 24px 40px !important; }
          .home-name-text {
            font-size: clamp(3.2rem, 18vw, 6rem) !important;
            line-height: .88 !important;
          }
          .home-index { display: none !important; }
          .home-ctas  { flex-direction: column !important; }
          .home-ctas a { width: 100%; justify-content: center !important; }
        }
        @media (max-width: 480px) {
          .home-left { padding: 24px 18px !important; }
          .home-right{ padding: 20px 18px 32px !important; }
        }
      `}</style>

      {/* ══ FULLSCREEN SPLIT ══ */}
      <div
        className="home-split"
        style={{
          display:   'flex',
          minHeight: `calc(100vh - var(--nav-height))`,
        }}
      >

        {/* ── LEFT — dark olive cover ── */}
        <div
          className="home-left"
          style={{
            flex:            '0 0 58%',
            backgroundColor: '#1e1e16',
            position:        'relative',
            padding:         'clamp(36px,5vw,64px) clamp(28px,4vw,56px)',
            display:         'flex',
            flexDirection:   'column',
            justifyContent:  'space-between',
            overflow:        'hidden',
          }}
        >
          {/* Grid texture */}
          <div className="home-grid-bg" />

          {/* Accent bar top-left */}
          <div style={{
            position:        'absolute',
            top:             0,
            left:            0,
            width:           '5px',
            height:          '100%',
            background:      'linear-gradient(to bottom, #c94f35, #8a7d3a 60%, #6b1f3a)',
          }} />

          {/* Top meta row */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p className="home-role" style={{
              fontFamily:    'var(--font-body)',
              fontWeight:    700,
              fontSize:      '.65rem',
              letterSpacing: '.22em',
              textTransform: 'uppercase',
              color:         '#c94f35',
              marginBottom:  '0',
            }}>
              {siteConfig.role} — {siteConfig.title}
            </p>
          </div>

          {/* Hero name */}
          <div style={{ position: 'relative', zIndex: 1, margin: 'auto 0' }}>
            <h1
              className="home-name-text home-name"
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'clamp(4rem, 9vw, 8.5rem)',
                lineHeight:    .85,
                letterSpacing: '.01em',
                color:         '#f0eeea',
                textTransform: 'uppercase',
                marginBottom:  '28px',
              }}
            >
              {siteConfig.name.split(' ').map((w, i) => (
                <span key={i} style={{ display: 'block' }}>{w}</span>
              ))}
            </h1>

            <div className="home-divider" style={{
              width:           '48px',
              height:          '3px',
              backgroundColor: '#c94f35',
              marginBottom:    '20px',
            }} />

            <p className="home-tagline" style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize:   'clamp(.85rem,1.4vw,1rem)',
              lineHeight: 1.75,
              color:      'rgba(240,238,234,.6)',
              maxWidth:   '340px',
            }}>
              Mahasiswa Pendidikan Agama Islam yang aktif dalam dunia pengajaran,
              pengabdian masyarakat, dan pengembangan diri.
            </p>
          </div>

          {/* Bottom: CTA + social */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="home-ctas" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
              <Link href="/tentang-saya" className="home-btn-primary">
                Tentang Saya →
              </Link>
              <Link href="/pengalaman" className="home-btn-secondary">
                Pengalaman
              </Link>
            </div>

            <div className="home-social" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              {Object.entries(siteConfig.links).map(([k, url]) => (
                <a key={k} href={url} target="_blank" rel="noopener noreferrer">{k}</a>
              ))}
            </div>
          </div>

          {/* Page index bottom-right */}
          <div className="home-index" style={{
            position:      'absolute',
            bottom:        '28px',
            right:         '28px',
            fontFamily:    'var(--font-display)',
            fontSize:      '4rem',
            lineHeight:    1,
            color:         'rgba(240,238,234,.04)',
            userSelect:    'none',
            pointerEvents: 'none',
            letterSpacing: '-.02em',
          }}>01</div>
        </div>

        {/* ── RIGHT — cream, navigation index ── */}
        <div
          className="home-right"
          style={{
            flex:            '1',
            backgroundColor: '#f0eeea',
            padding:         'clamp(36px,5vw,64px) clamp(28px,4vw,52px)',
            display:         'flex',
            flexDirection:   'column',
            justifyContent:  'space-between',
          }}
        >
          {/* Top label */}
          <div className="home-meta">
            <p style={{
              fontFamily:    'var(--font-body)',
              fontWeight:    700,
              fontSize:      '.6rem',
              letterSpacing: '.2em',
              textTransform: 'uppercase',
              color:         'rgba(26,26,26,.3)',
              marginBottom:  '32px',
            }}>Portfolio — {new Date().getFullYear()}</p>

            {/* Info chips */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
              {[
                { label: 'Kota',    val: 'Jepara'  },
                { label: 'Prodi',   val: 'PAI'        },
                { label: 'Status',  val: 'Mahasiswa'  },
              ].map(({ label, val }) => (
                <div key={label} style={{
                  border:          '1px solid #d0cec8',
                  padding:         '6px 14px',
                  display:         'flex',
                  flexDirection:   'column',
                  gap:             '2px',
                }}>
                  <span style={{
                    fontFamily:    'var(--font-body)',
                    fontSize:      '.55rem',
                    letterSpacing: '.14em',
                    textTransform: 'uppercase',
                    color:         '#aaa',
                    fontWeight:    700,
                  }}>{label}</span>
                  <span style={{
                    fontFamily:    'var(--font-body)',
                    fontSize:      '.78rem',
                    fontWeight:    600,
                    color:         '#1a1a1a',
                  }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation index — main visual element */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{
              fontFamily:    'var(--font-body)',
              fontWeight:    700,
              fontSize:      '.58rem',
              letterSpacing: '.2em',
              textTransform: 'uppercase',
              color:         'rgba(26,26,26,.28)',
              marginBottom:  '8px',
            }}>Navigasi</p>
            {[
              { num: '01', label: 'Tentang Saya',  href: '/tentang-saya', desc: 'Profil & biografi' },
              { num: '02', label: 'Pengalaman',    href: '/pengalaman',   desc: 'Timeline perjalanan' },
              { num: '03', label: 'Galeri',        href: '/galeri',       desc: 'Foto & dokumentasi' },
            ].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="home-nav-item"
                style={{
                  opacity:    mounted ? 1 : 0,
                  transform:  mounted ? 'none' : 'translateY(12px)',
                  transition: `opacity .5s ease ${.7 + i * .1}s, transform .5s ease ${.7 + i * .1}s`,
                }}
              >
                <span className="home-nav-num">{item.num}</span>
                <span style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span className="home-nav-label">{item.label}</span>
                  <span style={{
                    fontFamily:    'var(--font-body)',
                    fontSize:      '.65rem',
                    color:         '#aaa',
                    letterSpacing: '.06em',
                  }}>{item.desc}</span>
                </span>
                <span className="home-nav-arrow">→</span>
              </Link>
            ))}
          </div>

          {/* Bottom: email */}
          <div style={{ marginTop: '32px' }}>
            <p style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '.62rem',
              color:         '#bbb',
              letterSpacing: '.08em',
            }}>{siteConfig.email}</p>
          </div>
        </div>
      </div>
    </>
  )
}
