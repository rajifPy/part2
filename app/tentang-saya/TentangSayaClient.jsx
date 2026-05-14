'use client'

import { useState, useEffect, useRef } from 'react'
import { siteConfig } from '@/data/config'

/* ══════════════════════════════════════════
   DATA — sesuaikan dengan profil Nafis
══════════════════════════════════════════ */
const STATS = [
  { value: '2+',  label: 'Tahun Mengajar' },
  { value: '3',   label: 'Mata Pelajaran' },
  { value: '40+', label: 'Siswa Bimbel'   },
]

const SKILLS = [
  { label: 'Pendidikan Agama Islam',  pct: 90, color: '#c94f35' },
  { label: 'Bahasa Arab',             pct: 78, color: '#8a7d3a' },
  { label: 'Metode Pembelajaran',     pct: 82, color: '#6b1f3a' },
  { label: 'Komunikasi & Dakwah',     pct: 75, color: '#d4604a' },
]

const INTERESTS = [
  'Kurikulum PAI', 'Bahasa Arab', 'Pendidikan Islam',
  'Literasi Digital', 'Pengabdian Masyarakat', 'Sejarah Islam',
]

/* ══════════════════════════════════════════
   HOOK: animasikan bar saat masuk viewport
══════════════════════════════════════════ */
function useSkillReveal() {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); io.disconnect() } },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, started]
}

/* ══════════════════════════════════════════
   SKILL BAR COMPONENT
══════════════════════════════════════════ */
function SkillBar({ label, pct, color, delay, started }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{
        display:       'flex',
        justifyContent:'space-between',
        alignItems:    'baseline',
        marginBottom:  '6px',
      }}>
        <span style={{
          fontFamily:    'var(--font-body)',
          fontSize:      'var(--text-xs)',
          fontWeight:    600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color:         '#1a1a1a',
        }}>{label}</span>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize:   '1rem',
          color:      color,
          lineHeight: 1,
        }}>{pct}%</span>
      </div>
      {/* Track */}
      <div style={{
        height:          '4px',
        backgroundColor: '#e0ddd7',
        borderRadius:    '2px',
        overflow:        'hidden',
      }}>
        {/* Fill */}
        <div style={{
          height:           '100%',
          width:            started ? `${pct}%` : '0%',
          backgroundColor:  color,
          borderRadius:     '2px',
          transition:       `width 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        }} />
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   STAT CARD COMPONENT
══════════════════════════════════════════ */
function StatCard({ value, label, index, mounted }) {
  return (
    <div style={{
      border:          '1px solid #d0cec8',
      padding:         '14px 16px',
      flex:            '1',
      minWidth:        '80px',
      opacity:         mounted ? 1 : 0,
      transform:       mounted ? 'none' : 'translateY(12px)',
      transition:      `opacity 0.5s ease ${0.4 + index * 0.1}s, transform 0.5s ease ${0.4 + index * 0.1}s`,
    }}>
      <p style={{
        fontFamily:    'var(--font-display)',
        fontSize:      'clamp(1.8rem, 4vw, 2.4rem)',
        lineHeight:    1,
        color:         '#c94f35',
        letterSpacing: '0.02em',
        marginBottom:  '4px',
      }}>{value}</p>
      <p style={{
        fontFamily:    'var(--font-body)',
        fontSize:      '0.6rem',
        fontWeight:    700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color:         '#999',
      }}>{label}</p>
    </div>
  )
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export default function TentangSayaClient() {
  const [mounted, setMounted] = useState(false)
  const [skillRef, skillStarted] = useSkillReveal()

  useEffect(() => { setMounted(true) }, [])

  return (
    <>
      <style>{`
        /* ── Scoped animations ── */
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes avatarPop {
          0%   { opacity: 0; transform: scale(0.8); }
          70%  { transform: scale(1.04); }
          100% { opacity: 1; transform: scale(1); }
        }

        .ts-avatar-wrap  { animation: avatarPop 0.6s cubic-bezier(0.22,1,0.36,1) 0.15s both; }
        .ts-name-text    { animation: fadeSlideUp 0.6s ease 0.25s both; }
        .ts-role-text    { animation: fadeSlideUp 0.5s ease 0.35s both; }
        .ts-bio-block    { animation: fadeSlideUp 0.6s ease 0.45s both; }
        .ts-interests    { animation: fadeIn 0.6s ease 0.6s both; }
        .ts-email-btn    { animation: fadeIn 0.5s ease 0.7s both; }

        /* ── Interest tags ── */
        .ts-tag {
          display: inline-block;
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #1a1a1a;
          border: 1.5px solid #1a1a1a;
          padding: 4px 10px;
          margin: 3px;
          transition: background-color 0.15s, color 0.15s;
          cursor: default;
        }
        .ts-tag:hover {
          background-color: #1a1a1a;
          color: #f0eeea;
        }

        /* ── Email button ── */
        .ts-email-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-body);
          font-weight: 700;
          font-size: var(--text-sm);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background-color: #1a1a1a;
          color: #f0eeea;
          padding: 13px 26px;
          border: 2px solid #1a1a1a;
          transition: background-color 0.15s, color 0.15s;
          word-break: break-all;
          max-width: 100%;
        }
        .ts-email-cta:hover {
          background-color: #e8a8c0;
          border-color: #e8a8c0;
          color: #1a1a1a;
        }

        /* ── Divider ── */
        .ts-divider {
          height: 2px;
          background: linear-gradient(to right, #c94f35, #8a7d3a 50%, #6b1f3a);
          margin: 28px 0;
        }

        /* ── Section label ── */
        .ts-section-label {
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #aaa;
          margin-bottom: 16px;
        }

        /* ── Responsive ── */

        /* Tablet: shrink sidebar */
        @media (max-width: 960px) {
          .ts-sidebar { padding: 32px 20px !important; }
          .ts-content { padding: clamp(20px,4vw,36px) clamp(16px,4vw,28px) 40px !important; }
        }

        /* Mobile: stack layout */
        @media (max-width: 768px) {
          .ts-layout { flex-direction: column !important; }

          .ts-sidebar {
            width: 100% !important;
            min-height: auto !important;
            position: static !important;
            flex-direction: row !important;
            align-items: flex-end !important;
            justify-content: space-between !important;
            flex-wrap: wrap !important;
            gap: 16px !important;
            padding: 24px 20px !important;
          }

          .ts-sidebar-social { flex-direction: row !important; flex-wrap: wrap !important; gap: 10px 16px !important; }

          .ts-avatar-wrap {
            width: 80px !important;
            height: 80px !important;
          }
          .ts-avatar-initials { font-size: 2rem !important; }

          .ts-stats { flex-direction: row !important; flex-wrap: wrap !important; }
          .ts-stats > div { flex: 1 1 80px !important; }

          .ts-content { padding: 20px 20px 40px !important; }
        }

        /* Small mobile */
        @media (max-width: 480px) {
          .ts-sidebar {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding: 20px 16px !important;
          }
          .ts-content { padding: 16px 16px 32px !important; }
          .ts-avatar-wrap { width: 70px !important; height: 70px !important; }
        }
      `}</style>

      <div
        className="ts-layout"
        style={{
          display:    'flex',
          minHeight:  'calc(100vh - var(--nav-height))',
        }}
      >

        {/* ════════════════════════════
            SIDEBAR — pink
        ════════════════════════════ */}
        <aside
          className="ts-sidebar page-sidebar page-sidebar--sticky"
          style={{ backgroundColor: '#e8a8c0' }}
        >
          {/* Top: heading + avatar */}
          <div>
            <h1
              className="sidebar-heading sidebar-heading--dark"
              style={{ marginBottom: '28px' }}
            >
              TENTANG<br/>SAYA
            </h1>

            {/* Avatar */}
            <div
              className="ts-avatar-wrap"
              style={{
                width:          '110px',
                height:         '110px',
                borderRadius:   '50%',
                backgroundColor:'#1a1a1a',
                border:         '3px solid #1a1a1a',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                marginBottom:   '16px',
                overflow:       'hidden',
                position:       'relative',
              }}
            >
              {/*
                Jika ada foto: ganti <span> di bawah dengan:
                <img src="/foto-profil.jpg" alt={siteConfig.name}
                     style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              */}
              <span
                className="ts-avatar-initials"
                style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      '2.8rem',
                  color:         '#f0eeea',
                  letterSpacing: '0.04em',
                  userSelect:    'none',
                }}
              >
                {siteConfig.name.charAt(0)}
              </span>
            </div>

            <p style={{
              fontFamily:    'var(--font-body)',
              fontWeight:    700,
              fontSize:      'var(--text-sm)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         'rgba(26,26,26,0.65)',
            }}>{siteConfig.role}</p>
          </div>

          {/* Bottom: social links */}
          <div
            className="ts-sidebar-social"
            style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
          >
            {Object.entries(siteConfig.links).map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      'var(--text-xs)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color:         'rgba(26,26,26,0.5)',
                  transition:    'color 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(26,26,26,0.5)'}
              >
                {key}
              </a>
            ))}
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'var(--text-xs)',
              color:      'rgba(26,26,26,0.4)',
              marginTop:  '4px',
            }}>{siteConfig.email}</span>
          </div>
        </aside>

        {/* ════════════════════════════
            MAIN CONTENT
        ════════════════════════════ */}
        <main className="page-main">

          {/* Name bar */}
          <div className="name-bar">
            <p>{siteConfig.name}</p>
          </div>

          <div
            className="ts-content"
            style={{
              padding:   'clamp(24px, 5vw, 48px) clamp(20px, 5vw, 44px) 56px',
              maxWidth:  '720px',
            }}
          >

            {/* ── Name + role ── */}
            <div style={{ marginBottom: '28px' }}>
              <h2
                className="ts-name-text"
                style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      'clamp(2.2rem, 5vw, 3.8rem)',
                  lineHeight:    0.9,
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  color:         '#1a1a1a',
                  marginBottom:  '10px',
                }}
              >
                {siteConfig.name}
              </h2>
              <p
                className="ts-role-text"
                style={{
                  fontFamily:    'var(--font-body)',
                  fontWeight:    700,
                  fontSize:      'var(--text-sm)',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color:         '#c94f35',
                }}
              >
                {siteConfig.title}
              </p>
            </div>

            {/* ── Stat cards ── */}
            <div
              className="ts-stats"
              style={{
                display:       'flex',
                gap:           '8px',
                marginBottom:  '32px',
                flexWrap:      'wrap',
              }}
            >
              {STATS.map((s, i) => (
                <StatCard key={s.label} {...s} index={i} mounted={mounted} />
              ))}
            </div>

            {/* ── Biografi ── */}
            <div className="ts-bio-block">
              <p style={{
                fontFamily:   'var(--font-body)',
                fontSize:     '1rem',
                lineHeight:   1.9,
                color:        '#3a3a3a',
                marginBottom: '18px',
              }}>
                {/*
                  Ganti paragraf ini dengan biografi singkat Anda.
                  Sebutkan posisi, institusi, dan latar belakang.
                */}
                Saya adalah mahasiswa Program Studi Pendidikan Agama Islam di UIN Sunan Ampel
                Surabaya, sekaligus aktif sebagai guru bimbingan belajar di Lembaga Bimbel
                Al-Falah. Saya percaya bahwa ilmu yang bermanfaat adalah ilmu yang diamalkan
                untuk kemaslahatan bersama.
              </p>
              <p style={{
                fontFamily:   'var(--font-body)',
                fontSize:     '1rem',
                lineHeight:   1.9,
                color:        '#3a3a3a',
                marginBottom: '18px',
              }}>
                {/*
                  Paragraf kedua: fokus studi dan minat akademik.
                */}
                Fokus studi saya mencakup kurikulum PAI, metode pembelajaran Islam modern,
                dan literasi keagamaan. Saya telah menjalani PPL di MAN 1 Surabaya serta
                KKN di Desa Sidoarjo, di mana saya mengembangkan program bimbingan
                Al-Qur&apos;an dan pelatihan literasi digital bagi masyarakat.
              </p>
              <p style={{
                fontFamily:   'var(--font-body)',
                fontSize:     '1rem',
                lineHeight:   1.9,
                color:        '#3a3a3a',
              }}>
                {/*
                  Paragraf ketiga: latar belakang pendidikan & organisasi.
                */}
                Sebelumnya, saya menyelesaikan pendidikan di MA Nurul Huda Surabaya dan
                aktif di Himpunan Mahasiswa Jurusan PAI divisi akademik, terlibat dalam
                seminar pendidikan Islam dan kajian keislaman rutin lintas angkatan.
              </p>
            </div>

            <div className="ts-divider" />

            {/* ── Skill bars ── */}
            <div ref={skillRef}>
              <p className="ts-section-label">Keahlian</p>
              {SKILLS.map((sk, i) => (
                <SkillBar
                  key={sk.label}
                  {...sk}
                  delay={i * 0.1}
                  started={skillStarted}
                />
              ))}
            </div>

            <div className="ts-divider" />

            {/* ── Minat / interest tags ── */}
            <div className="ts-interests">
              <p className="ts-section-label">Minat &amp; Fokus</p>
              <div style={{ margin: '-3px' }}>
                {INTERESTS.map(tag => (
                  <span key={tag} className="ts-tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="ts-divider" />

            {/* ── CTA email ── */}
            <div className="ts-email-btn">
              <a
                href={`mailto:${siteConfig.email.replace('[at]', '@')}`}
                className="ts-email-cta"
              >
                {siteConfig.email} →
              </a>
            </div>

          </div>
        </main>
      </div>
    </>
  )
}
