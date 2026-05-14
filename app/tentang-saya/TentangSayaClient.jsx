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
   SKILL BAR
══════════════════════════════════════════ */
function SkillBar({ label, pct, color, delay, started }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)',
          fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1a1a1a',
        }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color, lineHeight: 1 }}>{pct}%</span>
      </div>
      <div style={{ height: '4px', backgroundColor: '#e0ddd7', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: started ? `${pct}%` : '0%',
          backgroundColor: color, borderRadius: '2px',
          transition: `width 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        }} />
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   STAT CARD
══════════════════════════════════════════ */
function StatCard({ value, label, index, mounted }) {
  return (
    <div style={{
      border: '1px solid #d0cec8', padding: '14px 16px', flex: '1', minWidth: '80px',
      opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(12px)',
      transition: `opacity 0.5s ease ${0.4 + index * 0.1}s, transform 0.5s ease ${0.4 + index * 0.1}s`,
    }}>
      <p style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
        lineHeight: 1, color: '#c94f35', letterSpacing: '0.02em', marginBottom: '4px',
      }}>{value}</p>
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 700,
        letterSpacing: '0.12em', textTransform: 'uppercase', color: '#999',
      }}>{label}</p>
    </div>
  )
}

/* ══════════════════════════════════════════
   MAIN
══════════════════════════════════════════ */
export default function TentangSayaClient() {
  const [mounted, setMounted]    = useState(false)
  const [skillRef, skillStarted] = useSkillReveal()

  useEffect(() => { setMounted(true) }, [])

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes avatarReveal {
          0%   { opacity: 0; transform: translate(8px, 8px) scale(0.9); }
          65%  { transform: translate(-2px, -2px) scale(1.02); }
          100% { opacity: 1; transform: translate(0,0) scale(1); }
        }

        .ts-avatar-wrap { animation: avatarReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
        .ts-name-text   { animation: fadeSlideUp 0.6s ease 0.3s both; }
        .ts-role-row    { animation: fadeSlideUp 0.5s ease 0.4s both; }
        .ts-bio-block   { animation: fadeSlideUp 0.6s ease 0.45s both; }
        .ts-interests   { animation: fadeIn 0.6s ease 0.6s both; }
        .ts-email-btn   { animation: fadeIn 0.5s ease 0.7s both; }

        .ts-tag {
          display: inline-block;
          font-family: var(--font-body); font-weight: 700;
          font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase;
          color: #1a1a1a; border: 1.5px solid #1a1a1a;
          padding: 4px 10px; margin: 3px;
          transition: background-color 0.15s, color 0.15s;
          cursor: default;
        }
        .ts-tag:hover { background-color: #1a1a1a; color: #f0eeea; }

        .ts-email-cta {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--font-body); font-weight: 700;
          font-size: var(--text-sm); letter-spacing: 0.12em; text-transform: uppercase;
          background-color: #1a1a1a; color: #f0eeea;
          padding: 13px 26px; border: 2px solid #1a1a1a;
          transition: background-color 0.15s, color 0.15s, border-color 0.15s;
          word-break: break-all; max-width: 100%;
        }
        .ts-email-cta:hover { background-color: #e8a8c0; border-color: #e8a8c0; color: #1a1a1a; }

        .ts-divider {
          height: 2px;
          background: linear-gradient(to right, #c94f35, #8a7d3a 50%, #6b1f3a);
          margin: 28px 0;
        }
        .ts-section-label {
          font-family: var(--font-body); font-weight: 700;
          font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: #aaa; margin-bottom: 16px;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 960px) {
          .ts-sidebar { padding: 32px 20px !important; }
          .ts-content { padding: clamp(20px,4vw,36px) clamp(16px,4vw,28px) 40px !important; }
        }

        @media (max-width: 768px) {
          .ts-layout  { flex-direction: column !important; }
          .ts-sidebar {
            width: 100% !important; min-height: auto !important;
            position: static !important;
            flex-direction: row !important; align-items: center !important;
            justify-content: space-between !important;
            flex-wrap: wrap !important; gap: 20px !important;
            padding: 28px 20px !important;
          }
          .ts-deco    { display: none !important; }
          .ts-sidebar-social { flex-direction: row !important; flex-wrap: wrap !important; gap: 8px 14px !important; }
          .ts-avatar-sq        { width: 88px !important; height: 88px !important; }
          .ts-avatar-sq-shadow { width: 88px !important; height: 88px !important; }
          .ts-avatar-wrap      { width: 88px !important; height: 88px !important; }
          .ts-avatar-initials  { font-size: 3rem !important; }
          .ts-stats > div { flex: 1 1 80px !important; }
          .ts-content { padding: 20px 20px 40px !important; }
        }

        @media (max-width: 480px) {
          .ts-sidebar { flex-direction: column !important; align-items: flex-start !important; padding: 20px 16px !important; }
          .ts-content { padding: 16px 16px 32px !important; }
        }
      `}</style>

      <div className="ts-layout" style={{ display: 'flex', minHeight: 'calc(100vh - var(--nav-height))' }}>

        {/* ══════════════════
            SIDEBAR
        ══════════════════ */}
        <aside
          className="ts-sidebar page-sidebar page-sidebar--sticky"
          style={{ backgroundColor: '#e8a8c0', overflow: 'hidden', position: 'relative' }}
        >
          {/* Decorative rings */}
          <div className="ts-deco" style={{ position:'absolute', top:'-80px', right:'-80px', width:'260px', height:'260px', borderRadius:'50%', border:'1.5px solid rgba(26,26,26,0.08)', pointerEvents:'none' }} />
          <div className="ts-deco" style={{ position:'absolute', top:'-35px', right:'-35px', width:'150px', height:'150px', borderRadius:'50%', border:'1.5px solid rgba(26,26,26,0.06)', pointerEvents:'none' }} />
          <div className="ts-deco" style={{ position:'absolute', bottom:'50px', left:'-55px', width:'170px', height:'170px', borderRadius:'50%', border:'1.5px solid rgba(26,26,26,0.05)', pointerEvents:'none' }} />

          {/* ── Avatar ── */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div
              className="ts-avatar-wrap"
              style={{ position: 'relative', width: '130px', height: '130px', marginBottom: '24px' }}
            >
              {/* Offset shadow square */}
              <div
                className="ts-avatar-sq-shadow"
                style={{
                  position: 'absolute', top: '10px', left: '10px',
                  width: '130px', height: '130px',
                  backgroundColor: 'rgba(26,26,26,0.2)',
                }}
              />
              {/* Main avatar square */}
              <div
                className="ts-avatar-sq"
                style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '130px', height: '130px',
                  backgroundColor: '#1a1a1a',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                {
                  <img src="public/image/nafis.jpeg" alt={siteConfig.name}
                       style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                   }
                <span
                  className="ts-avatar-initials"
                  style={{
                    fontFamily: 'var(--font-display)', fontSize: '4.2rem',
                    color: '#e8a8c0', letterSpacing: '0.04em',
                    userSelect: 'none', lineHeight: 1,
                  }}
                >
                  {siteConfig.name.charAt(0)}
                </span>
              </div>

              {/* Left accent stripe */}
              <div style={{
                position: 'absolute', top: 0, left: '-10px',
                width: '4px', height: '100%',
                background: 'linear-gradient(to bottom, #c94f35, #6b1f3a)',
              }} />

              {/* Bottom-right accent dot */}
              <div style={{
                position: 'absolute', bottom: '-3px', right: '-3px',
                width: '22px', height: '22px',
                backgroundColor: '#c94f35', borderRadius: '50%',
                border: '3px solid #e8a8c0', zIndex: 2,
              }} />
            </div>

            {/* Name */}
            <p style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
              letterSpacing: '0.03em', textTransform: 'uppercase',
              color: '#1a1a1a', lineHeight: 1, marginBottom: '10px',
            }}>{siteConfig.name}</p>

            {/* Role row */}
            <div className="ts-role-row" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '20px', height: '2px', backgroundColor: '#c94f35', flexShrink: 0 }} />
              <p style={{
                fontFamily: 'var(--font-body)', fontWeight: 700,
                fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'rgba(26,26,26,0.6)',
              }}>{siteConfig.role}</p>
            </div>
          </div>

          {/* ── Motto / Quote ── */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Opening quotation mark */}
            <div style={{
              fontFamily:    'var(--font-display)',
              fontSize:      '3.5rem',
              lineHeight:    0.6,
              color:         'rgba(26,26,26,0.18)',
              marginBottom:  '10px',
              userSelect:    'none',
            }}>"</div>

            <p style={{
              fontFamily:   'var(--font-body)',
              fontWeight:   500,
              fontSize:     '0.82rem',
              lineHeight:   1.75,
              color:        'rgba(26,26,26,0.72)',
              fontStyle:    'italic',
              marginBottom: '14px',
            }}>
              {/*
                Ganti dengan motto atau kutipan favorit Nafis.
              */}
              Ilmu yang bermanfaat adalah ilmu yang diamalkan untuk sesama.
            </p>

            {/* Attribution line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '16px', height: '1.5px', backgroundColor: '#c94f35' }} />
              <span style={{
                fontFamily:    'var(--font-body)',
                fontWeight:    700,
                fontSize:      '0.58rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color:         'rgba(26,26,26,0.45)',
              }}>Moto Hidup</span>
            </div>
          </div>
        </aside>

        {/* ══════════════════
            MAIN CONTENT
        ══════════════════ */}
        <main className="page-main">
          <div className="name-bar"><p>{siteConfig.name}</p></div>

          <div
            className="ts-content"
            style={{ padding: 'clamp(24px,5vw,48px) clamp(20px,5vw,44px) 56px', maxWidth: '720px' }}
          >

            {/* Name + title */}
            <div style={{ marginBottom: '28px' }}>
              <h2
                className="ts-name-text"
                style={{
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                  lineHeight: 0.9, letterSpacing: '0.02em', textTransform: 'uppercase',
                  color: '#1a1a1a', marginBottom: '10px',
                }}
              >
                {siteConfig.name}
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)', fontWeight: 700,
                fontSize: 'var(--text-sm)', letterSpacing: '0.16em', textTransform: 'uppercase',
                color: '#c94f35',
              }}>{siteConfig.title}</p>
            </div>

            {/* Stats */}
            <div className="ts-stats" style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
              {STATS.map((s, i) => <StatCard key={s.label} {...s} index={i} mounted={mounted} />)}
            </div>

            {/* Bio */}
            <div className="ts-bio-block">
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.9, color: '#3a3a3a', marginBottom: '18px' }}>
                Saya adalah mahasiswa Program Studi Pendidikan Agama Islam di UIN Sunan Ampel
                Surabaya, sekaligus aktif sebagai guru bimbingan belajar di Lembaga Bimbel
                Al-Falah. Saya percaya bahwa ilmu yang bermanfaat adalah ilmu yang diamalkan
                untuk kemaslahatan bersama.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.9, color: '#3a3a3a', marginBottom: '18px' }}>
                Fokus studi saya mencakup kurikulum PAI, metode pembelajaran Islam modern,
                dan literasi keagamaan. Saya telah menjalani PPL di MAN 1 Surabaya serta
                KKN di Desa Sidoarjo, di mana saya mengembangkan program bimbingan
                Al-Qur&apos;an dan pelatihan literasi digital bagi masyarakat.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.9, color: '#3a3a3a' }}>
                Sebelumnya, saya menyelesaikan pendidikan di MA Nurul Huda Surabaya dan
                aktif di Himpunan Mahasiswa Jurusan PAI divisi akademik, terlibat dalam
                seminar pendidikan Islam dan kajian keislaman rutin lintas angkatan.
              </p>
            </div>

            <div className="ts-divider" />

            {/* Skills */}
            <div ref={skillRef}>
              <p className="ts-section-label">Keahlian</p>
              {SKILLS.map((sk, i) => (
                <SkillBar key={sk.label} {...sk} delay={i * 0.1} started={skillStarted} />
              ))}
            </div>

            <div className="ts-divider" />

            {/* Interests */}
            <div className="ts-interests">
              <p className="ts-section-label">Minat &amp; Fokus</p>
              <div style={{ margin: '-3px' }}>
                {INTERESTS.map(tag => <span key={tag} className="ts-tag">{tag}</span>)}
              </div>
            </div>

            <div className="ts-divider" />

            {/* Email CTA */}
            <div className="ts-email-btn">
              <a href={`mailto:${siteConfig.email.replace('[at]', '@')}`} className="ts-email-cta">
                {siteConfig.email} →
              </a>
            </div>

          </div>
        </main>
      </div>
    </>
  )
}
