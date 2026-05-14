'use client'

import { useState, useEffect, useRef } from 'react'
import { siteConfig } from '@/data/config'

/* ─────────────────────────────────────────
   DATA — edit sesuai pengalaman Nafis
───────────────────────────────────────── */
const timelineData = [
  {
    id:       'kuliah',
    year:     '2023 — Sekarang',
    category: 'PENDIDIKAN',
    color:    '#c94f35',
    title:    'Mahasiswa Pendidikan Agama Islam',
    place:    'Universitas Islam Negeri — Surabaya',
    body:     'Menempuh pendidikan S1 Program Studi Pendidikan Agama Islam. Aktif mengikuti perkuliahan, diskusi akademik, dan kegiatan kemahasiswaan. Fokus pada kajian kurikulum PAI dan metode pembelajaran Islam modern.',
    tags:     ['Pendidikan', 'Akademik', 'PAI'],
  },
  {
    id:       'kkn',
    year:     '2025',
    category: 'PENGABDIAN',
    color:    '#8a7d3a',
    title:    'Kuliah Kerja Nyata (KKN)',
    place:    'Desa Sidoarjo, Jawa Timur',
    body:     "Melaksanakan program pengabdian masyarakat selama 40 hari. Mengadakan program bimbingan belajar Al-Qur'an untuk anak-anak desa, pelatihan literasi digital untuk ibu PKK, dan penyuluhan keagamaan di masjid setempat.",
    tags:     ['Pengabdian', 'Komunitas', 'KKN'],
  },
  {
    id:       'ppl',
    year:     '2024',
    category: 'PRAKTIK MENGAJAR',
    color:    '#6b1f3a',
    title:    'Praktik Pengalaman Lapangan (PPL)',
    place:    'MAN 1 Surabaya',
    body:     'Melaksanakan praktik mengajar mata pelajaran Pendidikan Agama Islam di kelas X dan XI selama satu semester. Merancang RPP, melaksanakan pembelajaran aktif, dan mengevaluasi hasil belajar siswa.',
    tags:     ['Mengajar', 'PPL', 'MAN'],
  },
  {
    id:       'organisasi',
    year:     '2023 — 2024',
    category: 'ORGANISASI',
    color:    '#d4604a',
    title:    'Anggota HMJ Pendidikan Agama Islam',
    place:    'Himpunan Mahasiswa Jurusan — UIN Surabaya',
    body:     'Aktif sebagai anggota divisi akademik HMJ PAI. Terlibat dalam penyelenggaraan seminar pendidikan Islam, lomba karya tulis ilmiah antar mahasiswa, dan diskusi rutin kajian keislaman.',
    tags:     ['Organisasi', 'HMJ', 'Kepemimpinan'],
  },
  {
    id:       'bimbel',
    year:     '2023 — Sekarang',
    category: 'MENGAJAR',
    color:    '#8a7d3a',
    title:    'Guru Bimbingan Belajar',
    place:    'Lembaga Bimbel Al-Falah, Surabaya',
    body:     'Mengajar mata pelajaran PAI dan Bahasa Arab untuk siswa SMP dan SMA. Membantu siswa mempersiapkan ujian dan meningkatkan pemahaman materi keagamaan melalui metode pembelajaran yang interaktif.',
    tags:     ['Guru', 'Bimbel', 'Bahasa Arab'],
  },
  {
    id:       'sma',
    year:     '2020 — 2023',
    category: 'PENDIDIKAN',
    color:    '#c94f35',
    title:    'Madrasah Aliyah',
    place:    'MA Nurul Huda — Surabaya',
    body:     'Lulus dengan predikat memuaskan dari jurusan IPS. Aktif dalam organisasi OSIS sebagai sekretaris, mengikuti berbagai lomba debat Bahasa Arab tingkat kota, dan menjadi koordinator kegiatan keagamaan sekolah.',
    tags:     ['SMA', 'MA', 'OSIS'],
  },
]

/* ─────────────────────────────────────────
   HOOK — scroll-triggered animation
───────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref  = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

/* ─────────────────────────────────────────
   TIMELINE ITEM
───────────────────────────────────────── */
function TimelineItem({ item, index }) {
  const [ref, inView] = useInView(0.1)
  const isLeft = index % 2 === 0
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      style={{
        display:        'flex',
        justifyContent: isLeft ? 'flex-start' : 'flex-end',
        position:       'relative',
        opacity:        inView ? 1 : 0,
        transform:      inView
          ? 'translateX(0) translateY(0)'
          : `translateX(${isLeft ? '-32px' : '32px'}) translateY(12px)`,
        transition:     `opacity 0.55s ease ${index * 0.1}s, transform 0.55s ease ${index * 0.1}s`,
      }}
    >
      {/* Card */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width:           'calc(50% - 40px)',
          backgroundColor: '#ffffff',
          border:          '2px solid #1a1a1a',
          position:        'relative',
          boxShadow:       hovered ? `5px 5px 0 ${item.color}` : '3px 3px 0 #1a1a1a',
          transform:       hovered ? 'translate(-2px,-2px)' : 'translate(0,0)',
          transition:      'box-shadow 0.18s ease, transform 0.18s ease',
        }}
      >
        {/* Top color bar */}
        <div style={{ height: '4px', backgroundColor: item.color }} />

        {/* Card header */}
        <div style={{
          padding:        '14px 18px 10px',
          borderBottom:   '1px solid #e8e6e0',
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          gap:            '8px',
          flexWrap:       'wrap',
        }}>
          <span style={{
            fontFamily:      'var(--font-body)',
            fontWeight:      700,
            fontSize:        '0.58rem',
            letterSpacing:   '0.18em',
            textTransform:   'uppercase',
            backgroundColor: item.color,
            color:           '#f0eeea',
            padding:         '3px 9px',
          }}>{item.category}</span>
          <span style={{
            fontFamily:    'var(--font-body)',
            fontSize:      '0.65rem',
            fontWeight:    600,
            letterSpacing: '0.08em',
            color:         '#aaa',
            textTransform: 'uppercase',
          }}>{item.year}</span>
        </div>

        {/* Card body */}
        <div style={{ padding: '14px 18px 18px' }}>
          <h3 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(1rem, 2vw, 1.5rem)',
            letterSpacing: '0.03em',
            lineHeight:    1.0,
            color:         '#1a1a1a',
            marginBottom:  '5px',
            textTransform: 'uppercase',
          }}>{item.title}</h3>
          <p style={{
            fontFamily:    'var(--font-body)',
            fontSize:      '0.7rem',
            letterSpacing: '0.05em',
            color:         item.color,
            fontWeight:    600,
            marginBottom:  '10px',
            textTransform: 'uppercase',
          }}>{item.place}</p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize:   '0.84rem',
            lineHeight: 1.75,
            color:      '#555',
          }}>{item.body}</p>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '12px' }}>
            {item.tags.map(tag => (
              <span key={tag} style={{
                fontFamily:    'var(--font-body)',
                fontSize:      '0.6rem',
                fontWeight:    700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color:         '#888',
                border:        '1px solid #d0cec8',
                padding:       '2px 7px',
              }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Connector arrow */}
        <div style={{
          position:    'absolute',
          top:         '26px',
          [isLeft ? 'right' : 'left']: '-14px',
          width:       0,
          height:      0,
          borderTop:   '10px solid transparent',
          borderBottom:'10px solid transparent',
          [isLeft ? 'borderLeft' : 'borderRight']: '14px solid #1a1a1a',
        }} />
        <div style={{
          position:    'absolute',
          top:         '28px',
          [isLeft ? 'right' : 'left']: '-11px',
          width:       0,
          height:      0,
          borderTop:   '8px solid transparent',
          borderBottom:'8px solid transparent',
          [isLeft ? 'borderLeft' : 'borderRight']: '12px solid #ffffff',
        }} />
      </div>

      {/* Center dot */}
      <div style={{
        position:        'absolute',
        left:            'calc(50% - 11px)',
        top:             '22px',
        width:           '22px',
        height:          '22px',
        backgroundColor: hovered ? item.color : '#f0eeea',
        border:          `3px solid ${item.color}`,
        borderRadius:    '50%',
        zIndex:          2,
        transition:      'background-color 0.18s ease',
        boxShadow:       `0 0 0 3px #f0eeea`,
      }} />
    </div>
  )
}

/* ─────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────── */
export default function PengalamanClient() {
  const [activeFilter, setActiveFilter] = useState('SEMUA')

  const categories = ['SEMUA', ...new Set(timelineData.map(d => d.category))]
  const filtered   = activeFilter === 'SEMUA'
    ? timelineData
    : timelineData.filter(d => d.category === activeFilter)

  return (
    <>
      <style>{`
        @keyframes lineGrow {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .tl-header { animation: fadeDown 0.5s ease both; }

        /* Mobile: stack single column */
        @media (max-width: 768px) {
          .tl-item-wrap { justify-content: flex-start !important; }
          .tl-card      { width: calc(100% - 32px) !important; margin-left: 32px; }
          .tl-arrow-r,
          .tl-arrow-r2  { display: none !important; }
          .tl-dot       { left: 4px !important; }
          .tl-line      { left: 15px !important; }
        }
      `}</style>

      <div style={{ display: 'flex', minHeight: '100vh' }}>

        {/* ── Sidebar kiri ── */}
        <aside style={{
          width:           'var(--sidebar-width)',
          flexShrink:      0,
          backgroundColor: '#1a1a1a',
          padding:         '40px 28px',
          position:        'sticky',
          top:             'var(--nav-height)',
          alignSelf:       'start',
          minHeight:       'calc(100vh - var(--nav-height))',
          display:         'flex',
          flexDirection:   'column',
          justifyContent:  'space-between',
          overflowY:       'auto',
        }}>
          <div>
            {/* Heading */}
            <h1 style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(2.8rem, 5vw, 4.8rem)',
              lineHeight:    0.88,
              letterSpacing: '0.02em',
              color:         '#f0eeea',
              marginBottom:  '28px',
            }}>
              PERJA<br/>LANAN
            </h1>

            {/* Stripe dekoratif */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '28px' }}>
              {[
                { c: '#c94f35', w: '100%' },
                { c: '#d4604a', w: '80%'  },
                { c: '#8a7d3a', w: '60%'  },
                { c: '#6b1f3a', w: '40%'  },
              ].map((s, i) => (
                <div key={i} style={{ height: '3px', backgroundColor: s.c, width: s.w }} />
              ))}
            </div>

            {/* Filter */}
            <p style={{
              fontFamily:    'var(--font-body)',
              fontSize:      '0.6rem',
              fontWeight:    700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color:         'rgba(240,238,234,0.3)',
              marginBottom:  '8px',
            }}>Kategori</p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              {categories.map(cat => {
                const isActive = activeFilter === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    style={{
                      fontFamily:    'var(--font-body)',
                      fontWeight:    isActive ? 700 : 400,
                      fontSize:      '0.7rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color:         isActive ? '#f0eeea' : 'rgba(240,238,234,0.38)',
                      textAlign:     'left',
                      padding:       '6px 0 6px 10px',
                      borderLeft:    isActive ? '3px solid #c94f35' : '3px solid transparent',
                      transition:    'all 0.12s',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) e.currentTarget.style.color = 'rgba(240,238,234,0.7)'
                    }}
                    onMouseLeave={e => {
                      if (!isActive) e.currentTarget.style.color = 'rgba(240,238,234,0.38)'
                    }}
                  >
                    {cat}
                    {isActive && (
                      <span style={{
                        marginLeft:      '8px',
                        fontSize:        '0.58rem',
                        color:           '#c94f35',
                        fontWeight:      700,
                      }}>
                        ({filtered.length})
                      </span>
                    )}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Social */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {Object.entries(siteConfig.links).map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      '0.65rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color:         'rgba(240,238,234,0.35)',
                  transition:    'color 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#f0eeea'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,238,234,0.35)'}
              >
                {key}
              </a>
            ))}
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize:   '0.6rem',
              color:      'rgba(240,238,234,0.2)',
              marginTop:  '4px',
              wordBreak:  'break-all',
            }}>{siteConfig.email}</span>
          </div>
        </aside>

        {/* ── Konten utama ── */}
        <main style={{ flex: 1, minWidth: 0, backgroundColor: '#f0eeea' }}>

          {/* Name bar */}
          <div className="tl-header" style={{
            backgroundColor: '#c94f35',
            padding:         '20px clamp(16px,4vw,40px)',
            display:         'flex',
            justifyContent:  'space-between',
            alignItems:      'center',
          }}>
            <p style={{
              fontFamily:    'var(--font-body)',
              fontWeight:    700,
              fontSize:      '0.68rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         'rgba(240,238,234,0.8)',
            }}>Perjalanan &amp; Pengalaman</p>
            <p style={{
              fontFamily:    'var(--font-body)',
              fontWeight:    700,
              fontSize:      '0.65rem',
              letterSpacing: '0.1em',
              color:         'rgba(240,238,234,0.5)',
              textTransform: 'uppercase',
            }}>{filtered.length} Entri</p>
          </div>

          {/* Timeline wrapper */}
          <div style={{
            padding:  'clamp(28px, 5vw, 56px) clamp(12px, 4vw, 36px)',
            position: 'relative',
          }}>

            {/* Garis vertikal tengah */}
            <div
              className="tl-line"
              style={{
                position:        'absolute',
                left:            'calc(50% - 1px)',
                top:             '0',
                bottom:          '0',
                width:           '2px',
                background:      'linear-gradient(to bottom, transparent, #1a1a1a 5%, #1a1a1a 95%, transparent)',
                opacity:         0.15,
                pointerEvents:   'none',
                transformOrigin: 'top center',
                animation:       'lineGrow 1s cubic-bezier(0.22,1,0.36,1) 0.2s both',
              }}
            />

            {/* Label atas */}
            <div style={{ textAlign: 'center', marginBottom: '36px', position: 'relative', zIndex: 1 }}>
              <span style={{
                display:         'inline-block',
                fontFamily:      'var(--font-display)',
                fontSize:        '0.95rem',
                letterSpacing:   '0.22em',
                textTransform:   'uppercase',
                color:           '#f0eeea',
                backgroundColor: '#1a1a1a',
                padding:         '5px 22px',
              }}>Sekarang</span>
            </div>

            {/* Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {filtered.map((item, i) => (
                <TimelineItem key={item.id} item={item} index={i} />
              ))}
            </div>

            {/* Label bawah */}
            <div style={{ textAlign: 'center', marginTop: '36px', position: 'relative', zIndex: 1 }}>
              <span style={{
                display:      'inline-block',
                fontFamily:   'var(--font-display)',
                fontSize:     '0.95rem',
                letterSpacing:'0.22em',
                textTransform:'uppercase',
                color:        '#bbb',
                border:       '2px solid #d0cec8',
                padding:      '5px 22px',
              }}>Awal</span>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
