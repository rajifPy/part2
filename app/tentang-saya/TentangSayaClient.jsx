'use client'

import { useState, useEffect, useRef } from 'react'
import { siteConfig } from '@/data/config'
import CVDownloadButton from '@/components/ui/CVDownloadButton'
import { TextReveal } from '@/hooks/useTextReveal'

/* ══════════════════════════════════════════
   FOTO SLIDESHOW — tambahkan path foto kamu
══════════════════════════════════════════ */
const SLIDE_PHOTOS = [
  { src: '/image/nafis.png'},
  { src: '/image/nafisprofile2.png'},
  { src: '/image/nafisprofile3.png'},
]

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const STATS = [
  { value: '2023', label: 'Mulai Kuliah' },
  { value: '2+',   label: 'Tahun Belajar' },
  { value: 'PAI',  label: 'Program Studi' },
]

const SKILLS = [
  { label: 'Pendidikan Agama Islam', pct: 90, color: '#c94f35' },
  { label: 'Inovasi Pembelajaran',   pct: 82, color: '#8a7d3a' },
  { label: 'Literasi Digital',       pct: 78, color: '#6b1f3a' },
  { label: 'Komunikasi & Dakwah',    pct: 75, color: '#d4604a' },
]

const INTERESTS = [
  'Inovasi Pembelajaran Islam', 'Literasi Digital', 'Pendidikan Agama Islam',
  'Manajemen Pendidikan', 'Teknologi Pendidikan', 'Nilai Keagamaan',
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
  const [mounted, setMounted] = useState(false)
  const [skillRef, skillStarted] = useSkillReveal()
  const [slideIdx, setSlideIdx] = useState(0)
  const timerRef = useRef(null)

  const goTo = (n) => {
    setSlideIdx(n)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setSlideIdx(i => (i + 1) % SLIDE_PHOTOS.length)
    }, 4500)
  }

  useEffect(() => {
    setMounted(true)
    timerRef.current = setInterval(() => {
      setSlideIdx(i => (i + 1) % SLIDE_PHOTOS.length)
    }, 4500)
    return () => clearInterval(timerRef.current)
  }, [])

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

        .ts-name-text { animation: fadeSlideUp 0.6s ease 0.3s both; }
        .ts-bio-block { animation: fadeSlideUp 0.6s ease 0.45s both; }
        .ts-interests { animation: fadeIn 0.6s ease 0.6s both; }
        .ts-email-btn { animation: fadeIn 0.5s ease 0.7s both; }

        /* ─── Layout utama ─── */
        .ts-layout {
          display: flex;
          flex-direction: row;
          min-height: calc(100vh - var(--nav-height));
        }

        /* ─── Sidebar slideshow ───
           Pakai !important untuk override globals.css
           yang mengubah sidebar jadi flex-row di mobile
        ─── */
        .ts-sidebar {
          width: var(--sidebar-width) !important;
          flex-shrink: 0 !important;
          padding: 0 !important;
          position: sticky !important;
          top: var(--nav-height) !important;
          align-self: start !important;
          min-height: calc(100vh - var(--nav-height)) !important;
          height: calc(100vh - var(--nav-height)) !important;
          overflow: hidden !important;
          background-color: #1a1a1a !important;
          flex-direction: column !important;
          justify-content: flex-start !important;
          align-items: stretch !important;
          flex-wrap: nowrap !important;
          gap: 0 !important;
        }

        .ts-sidebar-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center top;
          opacity: 0;
          transition: opacity 1.2s ease;
        }
        .ts-sidebar-slide.active { opacity: 1; }

        .ts-slide-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            160deg,
            rgba(15,10,30,0.50) 0%,
            rgba(15,10,30,0.22) 35%,
            rgba(10,6,22,0.88) 100%
          );
          z-index: 5;
        }

        .ts-sidebar-content {
          position: relative;
          z-index: 10;
          width: 100%;
          height: 100%;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
        }

        .ts-dot-btn {
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.4s ease;
          flex-shrink: 0;
        }

        .ts-nav-arrow {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.28);
          background: rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.85);
          cursor: pointer;
          font-size: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, color 0.2s;
          line-height: 1;
        }
        .ts-nav-arrow:hover {
          background: rgba(255,255,255,0.24);
          color: #fff;
        }

        /* ─── Main content ─── */
        .ts-main {
          flex: 1;
          min-width: 0;
          background-color: #f0eeea;
        }

        .ts-content {
          padding: clamp(24px,5vw,48px) clamp(20px,5vw,44px) 56px;
          max-width: 720px;
        }

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
        .ts-email-cta:hover { background-color: #c94f35; border-color: #c94f35; color: #f0eeea; }

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

        /* quote: hanya muncul di mobile, dalam main content */
        .ts-quote-mobile { display: none; }

        /* ══════════════════════════════════════
           MOBILE ≤ 768px
           Sidebar berubah jadi banner foto di atas,
           quote panjang dipindah ke dalam main content
        ══════════════════════════════════════ */
        @media (max-width: 768px) {
          .ts-layout {
            flex-direction: column !important;
          }

          /* sidebar jadi banner horizontal penuh */
          .ts-sidebar {
            width: 100% !important;
            position: relative !important;
            top: 0 !important;
            align-self: auto !important;
            min-height: 0 !important;
            height: 300px !important;
          }

          .ts-sidebar-content {
            height: 300px !important;
            padding: 18px 20px !important;
          }

          /* sembunyikan quote & caption di dalam sidebar (kurang tempat) */
          .ts-quote-block  { display: none !important; }
          .ts-caption-txt  { display: none !important; }
          .ts-divider-thin { display: none !important; }

          /* nama lebih besar di mobile karena lebar penuh */
          .ts-slide-name {
            font-size: clamp(2.6rem, 9vw, 3.8rem) !important;
            margin-bottom: 8px !important;
          }

          /* tampilkan quote di main content */
          .ts-quote-mobile { display: block !important; }

          .ts-content {
            padding: 20px 20px 40px !important;
          }

          .ts-email-cta {
            width: 100%;
            justify-content: center;
          }
        }

        /* ══════════════════════════════════════
           SMALL MOBILE ≤ 480px
        ══════════════════════════════════════ */
        @media (max-width: 480px) {
          .ts-sidebar {
            height: 240px !important;
          }
          .ts-sidebar-content {
            height: 240px !important;
            padding: 14px 16px !important;
          }
          .ts-slide-name {
            font-size: clamp(2.2rem, 8vw, 3rem) !important;
          }
          .ts-content {
            padding: 16px 16px 32px !important;
          }
        }
      `}</style>

      <div className="ts-layout">

        {/* ══════════════════════════════════════
            SIDEBAR — FOTO SLIDESHOW
        ══════════════════════════════════════ */}
        <aside className="ts-sidebar">

          {/* Accent bar kiri */}
          <div style={{
            position: 'absolute', left: 0, top: 0,
            width: '4px', height: '100%',
            background: 'linear-gradient(to bottom, #c94f35, #8a7d3a 60%, #6b1f3a)',
            zIndex: 20,
          }} />

          {/* Slide foto */}
          {SLIDE_PHOTOS.map((photo, i) => (
            <div
              key={i}
              className={`ts-sidebar-slide${i === slideIdx ? ' active' : ''}`}
              style={{ backgroundImage: `url(${photo.src})` }}
            />
          ))}

          {/* Overlay gelap */}
          <div className="ts-slide-overlay" />

          {/* Konten di atas foto */}
          <div className="ts-sidebar-content">

            {/* Baris atas: dots + tombol panah */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                {SLIDE_PHOTOS.map((_, i) => (
                  <button
                    key={i}
                    className="ts-dot-btn"
                    onClick={() => goTo(i)}
                    aria-label={`Foto ${i + 1}`}
                    style={{
                      width: i === slideIdx ? '20px' : '6px',
                      height: '6px',
                      borderRadius: i === slideIdx ? '3px' : '50%',
                      background: i === slideIdx ? '#fff' : 'rgba(255,255,255,0.35)',
                    }}
                  />
                ))}
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  className="ts-nav-arrow"
                  onClick={() => goTo((slideIdx - 1 + SLIDE_PHOTOS.length) % SLIDE_PHOTOS.length)}
                  aria-label="Foto sebelumnya"
                >‹</button>
                <button
                  className="ts-nav-arrow"
                  onClick={() => goTo((slideIdx + 1) % SLIDE_PHOTOS.length)}
                  aria-label="Foto berikutnya"
                >›</button>
              </div>
            </div>

            {/* Baris bawah: nama + quote */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

              {/* Caption (disembunyikan di mobile) */}
              <span className="ts-caption-txt" style={{
                fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
                textAlign: 'right',
              }}>
                {SLIDE_PHOTOS[slideIdx].caption} / {SLIDE_PHOTOS.length}
              </span>

              {/* Nama & role */}
              <div>
                <p
                  className="ts-slide-name"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)',
                    letterSpacing: '0.03em', textTransform: 'uppercase',
                    color: '#fff', lineHeight: 0.92, marginBottom: '10px',
                  }}
                >
                  {siteConfig.name.split(' ').map((w, i) => (
                    <span key={i} style={{ display: 'block' }}>{w}</span>
                  ))}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '18px', height: '2px', background: '#c94f35', flexShrink: 0 }} />
                  <span style={{
                    fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)',
                  }}>{siteConfig.role}</span>
                </div>
              </div>

              {/* Garis tipis (disembunyikan di mobile) */}
              <div className="ts-divider-thin" style={{ height: '1px', background: 'rgba(255,255,255,0.15)' }} />

              {/* Quote (disembunyikan di mobile, dipindah ke bawah main) */}
              <div className="ts-quote-block">
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: '2.2rem',
                  lineHeight: 0.6, color: 'rgba(255,255,255,0.15)',
                  marginBottom: '8px', userSelect: 'none',
                }}>"</div>
                <p style={{
                  fontFamily: 'var(--font-body)', fontWeight: 400,
                  fontSize: '11px', lineHeight: 1.75,
                  color: 'rgba(255,255,255,0.7)', fontStyle: 'italic',
                  marginBottom: '10px',
                }}>
                  Grow at your own pace, stay grounded in faith, and let your impact do the talking.
                  Authenticity is the new standard.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '14px', height: '1.5px', background: '#c94f35' }} />
                  <span style={{
                    fontSize: '8px', fontWeight: 700, letterSpacing: '0.18em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
                  }}>Moto Hidup</span>
                </div>
              </div>

            </div>
          </div>
        </aside>

        {/* ══════════════════════════════
            MAIN CONTENT
        ══════════════════════════════ */}
        <main className="ts-main">
          <div className="ts-content">

            {/* Stats */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
              {STATS.map((s, i) => <StatCard key={s.label} {...s} index={i} mounted={mounted} />)}
            </div>

            {/* Bio */}
            <div className="ts-bio-block">
               <TextReveal
               text="Saya adalah mahasiswa Program Studi Pendidikan Agama Islam di Universitas Islam
                Nahdlatul Ulama (UNISNU) Jepara yang menempuh studi sejak tahun 2023. Saya percaya
                bahwa pendidikan adalah tentang adaptasi dan memberikan dampak nyata yang relevan
                dengan perkembangan zaman yang serba cepat"
               tag="p"
               stagger={55}
               delay={0}
               style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.9, color: '#3a3a3a', marginBottom: '18px', textAlign: 'justify'}}
               />
               <TextReveal
               text="Fokus akademik saya berpusat pada inovasi pembelajaran Islam dan literasi digital,
                dengan komitmen untuk mengemas nilai-nilai keagamaan melalui pendekatan yang modern."
               tag="p"
               stagger={55}
               delay={0}
               style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.9, color: '#3a3a3a', marginBottom: '18px', textAlign: 'justify'}}
               />
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

            {/* Quote mobile — tampil di sini hanya pada layar kecil */}
            <div className="ts-quote-mobile" style={{
              borderLeft: '4px solid #c94f35',
              paddingLeft: '16px',
              marginBottom: '28px',
            }}>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                lineHeight: 1.8, color: '#555', fontStyle: 'italic',
                marginBottom: '8px',
              }}>
                Grow at your own pace, stay grounded in faith, and let your impact do the talking.
                Authenticity is the new standard.
              </p>
              <span style={{
                fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.6rem',
                letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c94f35',
              }}>Moto Hidup</span>
            </div>

            {/* CV Download */}
            <div className="ts-email-btn" style={{ marginBottom: '12px' }}>
              <CVDownloadButton />
            </div>

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
