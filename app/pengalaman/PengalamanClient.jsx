'use client'

import { useState, useEffect, useRef } from 'react'
import { siteConfig } from '@/data/config'

/* ══════════════════════════════════════════
   DATA — edit isi sesuai pengalaman Nafis
══════════════════════════════════════════ */
const TIMELINE = [
  {
    id:       'kuliah',
    year:     '2023 — Sekarang',
    category: 'Pendidikan',
    color:    '#c94f35',
    title:    'Mahasiswa Pendidikan Agama Islam',
    place:    'UNISNU — Jepara',
    body:     'Menempuh pendidikan S1 Program Studi Pendidikan Agama Islam. Aktif dalam perkuliahan, diskusi akademik, dan kegiatan kemahasiswaan. Fokus pada kajian kurikulum PAI dan metode pembelajaran Islam modern.',
    tags:     ['Akademik', 'PAI', 'S1'],
  },
  {
    id:       'KKL',
    year:     'Juni — 2025',
    category: 'Mengajar',
    color:    '#8a7d3a',
    title:    'Guru Bimbingan Belajar',
    place:    'Universitas Negeri Jakarta',
    body:     'Mengajar mata pelajaran PAI dan Bahasa Arab untuk siswa SMP dan SMA. Membantu siswa mempersiapkan ujian dan meningkatkan pemahaman materi keagamaan melalui metode pembelajaran interaktif.',
    tags:     ['Guru', 'Bimbel', 'Bahasa Arab'],
  },
  {
    id:       'kkn',
    year:     '2025',
    category: 'Pengabdian',
    color:    '#6b1f3a',
    title:    'Kuliah Kerja Nyata (KKN)',
    place:    'Belum tahu wkwk — Jepara',
    body:     "Melaksanakan pengabdian masyarakat 40 hari. Program bimbingan belajar Al-Qur'an untuk anak desa, pelatihan literasi digital ibu PKK, dan penyuluhan keagamaan di masjid setempat.",
    tags:     ['KKN', 'Komunitas', 'Pengabdian'],
  },
  {
    id:       'ppl',
    year:     '2024',
    category: 'Praktik Mengajar',
    color:    '#d4604a',
    title:    'Praktik Pengalaman Lapangan (PPL)',
    place:    'MAN 1 Surabaya',
    body:     'Praktik mengajar PAI di kelas X dan XI selama satu semester. Merancang RPP, melaksanakan pembelajaran aktif berbasis diskusi, dan mengevaluasi hasil belajar siswa secara berkala.',
    tags:     ['PPL', 'MAN', 'Mengajar'],
  },
  {
    id:       'MA',
    year:     '2019 — 2022',
    category: 'Pendidikan',
    color:    '#8a7d3a',
    title:    'Madrasah Aliyah - MIPA',
    place:    'MA Hasyim Asy ari Bangsri — Jepara',
    body:     'Lulus jurusan dengan predikat memuaskan. Sekretaris OSIS, peserta lomba debat Bahasa Arab tingkat kota, dan koordinator kegiatan keagamaan sekolah.',
    tags:     ['MA', 'Organisasi', 'Kepemimpinan'],
  },
  {
    id:       'MTs',
    year:     '2016 — 2019',
    category: 'Pendidikan',
    color:    '#c94f35',
    title:    'Madrasah Tsanawiyah',
    place:    'MTs Hasyim Asy ari Bangsri — Jepara',
    body:     'Lulus jurusan dengan predikat memuaskan. Sekretaris OSIS, peserta lomba debat Bahasa Arab tingkat kota, dan koordinator kegiatan keagamaan sekolah.',
    tags:     ['Mts', 'OSIS', 'Prestasi'],
  },
]

const ALL_CATEGORIES = ['Semua', ...Array.from(new Set(TIMELINE.map(d => d.category)))]

/* ══════════════════════════════════════════
   HOOK: scroll-triggered reveal
══════════════════════════════════════════ */
function useReveal() {
  const ref    = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } },
      { threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, seen]
}

/* ══════════════════════════════════════════
   CARD COMPONENT
══════════════════════════════════════════ */
function TimelineCard({ item, side, delay }) {
  const [ref, seen] = useReveal()
  const [hov, setHov] = useState(false)

  /* On mobile (side === 'mobile') card goes full-width left-aligned */
  const isMobile = side === 'mobile'

  return (
    <div
      ref={ref}
      className={`tl-card-wrap tl-card-wrap--${isMobile ? 'mobile' : side}`}
      style={{
        opacity:    seen ? 1 : 0,
        transform:  seen ? 'none' : `translateX(${side === 'right' ? '28px' : '-28px'})`,
        transition: `opacity .55s ease ${delay}s, transform .55s ease ${delay}s`,
      }}
    >
      <div
        className="tl-card"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          boxShadow: hov ? `4px 4px 0 ${item.color}` : '3px 3px 0 #1a1a1a',
          transform: hov ? 'translate(-1px,-1px)' : 'none',
          transition: 'box-shadow .16s, transform .16s',
        }}
      >
        {/* Accent stripe */}
        <div style={{ height: 4, background: item.color }} />

        {/* Header row */}
        <div className="tl-card__head">
          <span className="tl-badge" style={{ background: item.color }}>{item.category}</span>
          <span className="tl-year">{item.year}</span>
        </div>

        {/* Content */}
        <div className="tl-card__body">
          <h3 className="tl-title">{item.title}</h3>
          <p className="tl-place" style={{ color: item.color }}>{item.place}</p>
          <p className="tl-desc">{item.body}</p>
          <div className="tl-tags">
            {item.tags.map(t => <span key={t} className="tl-tag">{t}</span>)}
          </div>
        </div>

        {/* Arrow pointing to spine — hidden on mobile */}
        {!isMobile && (
          <>
            <div
              className={`tl-arrow tl-arrow--outer tl-arrow--${side}`}
              style={{ borderColor: `transparent transparent transparent ${side === 'left' ? '#1a1a1a' : 'transparent'}`,
                       [side === 'left' ? 'borderLeftColor' : 'borderRightColor']: '#1a1a1a' }}
            />
            <div
              className={`tl-arrow tl-arrow--inner tl-arrow--${side}`}
              style={{ [side === 'left' ? 'borderLeftColor' : 'borderRightColor']: '#fff' }}
            />
          </>
        )}
      </div>

      {/* Dot on spine */}
      <div
        className={`tl-dot tl-dot--${isMobile ? 'mobile' : 'center'}`}
        style={{
          background: hov ? item.color : '#f0eeea',
          border:     `3px solid ${item.color}`,
          transition: 'background .16s',
        }}
      />
    </div>
  )
}

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
export default function PengalamanClient() {
  const [filter, setFilter]   = useState('Semua')
  const [mobileNav, setMobileNav] = useState(false)

  const list = filter === 'Semua'
    ? TIMELINE
    : TIMELINE.filter(d => d.category === filter)

  return (
    <>
      {/* ─── Scoped styles ─── */}
      <style>{`
        /* ── LAYOUT ── */
        .pgl-wrap   { display:flex; min-height:calc(100vh - var(--nav-height)); }
        .pgl-sidebar{
          width: var(--sidebar-width);
          flex-shrink: 0;
          background: #1a1a1a;
          padding: 40px 28px;
          position: sticky;
          top: var(--nav-height);
          align-self: start;
          min-height: calc(100vh - var(--nav-height));
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow-y: auto;
        }
        .pgl-main   { flex:1; min-width:0; background:#f0eeea; }

        /* ── SIDEBAR ── */
        .pgl-heading{
          font-family: var(--font-display);
          font-size: clamp(2.6rem,5vw,4.8rem);
          line-height: .88;
          letter-spacing: .02em;
          color: #f0eeea;
          margin-bottom: 24px;
        }
        .pgl-stripes{ display:flex; flex-direction:column; gap:3px; margin-bottom:28px; }
        .pgl-stripe { height:3px; }
        .pgl-filter-label{
          font-family:var(--font-body); font-size:.6rem; font-weight:700;
          letter-spacing:.18em; text-transform:uppercase;
          color:rgba(240,238,234,.3); margin-bottom:8px;
        }
        .pgl-filter-btn{
          font-family:var(--font-body); font-size:.7rem; font-weight:400;
          letter-spacing:.1em; text-transform:uppercase;
          color:rgba(240,238,234,.38); text-align:left;
          padding:6px 0 6px 10px;
          border-left:3px solid transparent;
          transition:all .12s; width:100%;
        }
        .pgl-filter-btn:hover{ color:rgba(240,238,234,.72); }
        .pgl-filter-btn--active{
          font-weight:700; color:#f0eeea;
          border-left-color:#c94f35;
        }
        .pgl-social-link{
          font-family:var(--font-body); font-size:.65rem;
          letter-spacing:.14em; text-transform:uppercase;
          color:rgba(240,238,234,.35); transition:color .15s;
        }
        .pgl-social-link:hover{ color:#f0eeea; }
        .pgl-email{
          font-family:var(--font-body); font-size:.6rem;
          color:rgba(240,238,234,.2); margin-top:4px; word-break:break-all;
        }

        /* ── NAME BAR ── */
        .pgl-namebar{
          background:#c94f35; padding:18px clamp(16px,4vw,40px);
          display:flex; justify-content:space-between; align-items:center;
        }
        .pgl-namebar p{
          font-family:var(--font-body); font-weight:700; font-size:.68rem;
          letter-spacing:.2em; text-transform:uppercase;
          color:rgba(240,238,234,.8);
        }
        .pgl-namebar span{
          font-family:var(--font-body); font-weight:700; font-size:.65rem;
          letter-spacing:.1em; text-transform:uppercase;
          color:rgba(240,238,234,.5);
        }

        /* ── MOBILE FILTER BAR (shown on mobile only) ── */
        .pgl-mobile-filter{
          display:none;
          background:#1a1a1a; padding:0 16px;
          overflow-x:auto; gap:8px; white-space:nowrap;
          border-bottom:2px solid rgba(240,238,234,.06);
          -webkit-overflow-scrolling:touch;
          scrollbar-width:none;
        }
        .pgl-mobile-filter::-webkit-scrollbar{ display:none; }
        .pgl-mobile-chip{
          display:inline-block;
          font-family:var(--font-body); font-size:.62rem; font-weight:700;
          letter-spacing:.12em; text-transform:uppercase;
          padding:10px 12px; color:rgba(240,238,234,.4);
          border-bottom:3px solid transparent;
          transition:all .12s; flex-shrink:0;
          white-space:nowrap;
        }
        .pgl-mobile-chip--active{ color:#f0eeea; border-bottom-color:#c94f35; }

        /* ── TIMELINE AREA ── */
        .pgl-timeline{
          padding: clamp(24px,5vw,52px) clamp(12px,4vw,32px);
          position:relative;
        }

        /* Vertical spine */
        .pgl-spine{
          position:absolute; left:calc(50% - 1px); top:0; bottom:0;
          width:2px;
          background:linear-gradient(to bottom,transparent,rgba(26,26,26,.2) 5%,rgba(26,26,26,.2) 95%,transparent);
          pointer-events:none;
        }

        /* Era labels */
        .pgl-era{
          text-align:center; position:relative; z-index:1;
          margin-bottom:36px;
        }
        .pgl-era span{
          display:inline-block;
          font-family:var(--font-display); font-size:.92rem;
          letter-spacing:.22em; text-transform:uppercase;
          padding:5px 22px;
        }
        .pgl-era--top span{ background:#1a1a1a; color:#f0eeea; }
        .pgl-era--bot span{ border:2px solid #ccc; color:#bbb; }

        /* Items container */
        .pgl-items{ display:flex; flex-direction:column; gap:28px; }

        /* ── CARD WRAPPER — desktop zigzag ── */
        .tl-card-wrap{
          display:flex; position:relative; align-items:flex-start;
        }
        .tl-card-wrap--left { justify-content:flex-start; }
        .tl-card-wrap--right{ justify-content:flex-end; }

        /* ── CARD ── */
        .tl-card{
          width:calc(50% - 40px);
          background:#fff; border:2px solid #1a1a1a;
          position:relative;
        }
        .tl-card__head{
          padding:12px 16px 10px;
          border-bottom:1px solid #e8e6e0;
          display:flex; justify-content:space-between;
          align-items:center; gap:8px; flex-wrap:wrap;
        }
        .tl-badge{
          font-family:var(--font-body); font-weight:700;
          font-size:.58rem; letter-spacing:.16em; text-transform:uppercase;
          color:#f0eeea; padding:3px 9px; white-space:nowrap;
        }
        .tl-year{
          font-family:var(--font-body); font-size:.65rem; font-weight:600;
          letter-spacing:.08em; color:#aaa; text-transform:uppercase;
          white-space:nowrap;
        }
        .tl-card__body{ padding:14px 16px 18px; }
        .tl-title{
          font-family:var(--font-display);
          font-size:clamp(.95rem,2vw,1.45rem);
          letter-spacing:.03em; line-height:1.0;
          color:#1a1a1a; margin-bottom:5px; text-transform:uppercase;
        }
        .tl-place{
          font-family:var(--font-body); font-size:.68rem;
          letter-spacing:.05em; font-weight:600;
          margin-bottom:10px; text-transform:uppercase;
        }
        .tl-desc{
          font-family:var(--font-body); font-size:.83rem;
          line-height:1.75; color:#555;
        }
        .tl-tags{ display:flex; gap:5px; flex-wrap:wrap; margin-top:12px; }
        .tl-tag{
          font-family:var(--font-body); font-size:.58rem; font-weight:700;
          letter-spacing:.1em; text-transform:uppercase;
          color:#888; border:1px solid #d0cec8; padding:2px 7px;
        }

        /* ── ARROWS (desktop only) ── */
        .tl-arrow{
          position:absolute; top:24px; width:0; height:0;
          border-top:9px solid transparent;
          border-bottom:9px solid transparent;
        }
        .tl-arrow--outer{ z-index:1; }
        .tl-arrow--inner{ z-index:2; }
        /* left card: arrow points right (toward center) */
        .tl-arrow--outer.tl-arrow--left{
          right:-14px;
          border-left:14px solid #1a1a1a;
          border-right:none;
        }
        .tl-arrow--inner.tl-arrow--left{
          right:-11px;
          border-left:12px solid #fff;
          border-right:none;
        }
        /* right card: arrow points left (toward center) */
        .tl-arrow--outer.tl-arrow--right{
          left:-14px;
          border-right:14px solid #1a1a1a;
          border-left:none;
        }
        .tl-arrow--inner.tl-arrow--right{
          left:-11px;
          border-right:12px solid #fff;
          border-left:none;
        }

        /* ── DOTS ── */
        .tl-dot{
          position:absolute; width:20px; height:20px;
          border-radius:50%; z-index:3;
          box-shadow:0 0 0 3px #f0eeea;
        }
        .tl-dot--center{
          left:calc(50% - 10px); top:22px;
        }
        .tl-dot--mobile{ left:-10px; top:22px; }

        /* ── EMPTY STATE ── */
        .pgl-empty{
          text-align:center; padding:60px 20px;
          font-family:var(--font-body); font-size:.85rem;
          color:#aaa; letter-spacing:.08em; text-transform:uppercase;
        }

        /* ═══════════════════════════════
           RESPONSIVE — Tablet (≤960px)
        ═══════════════════════════════ */
        @media(max-width:960px){
          .tl-card{ width:calc(50% - 28px); }
        }

        /* ═══════════════════════════════
           RESPONSIVE — Mobile (≤768px)
           Single-column, spine on left
        ═══════════════════════════════ */
        @media(max-width:768px){
          /* Hide desktop sidebar */
          .pgl-sidebar{ display:none; }

          /* Show mobile filter bar */
          .pgl-mobile-filter{ display:flex; }

          /* Spine moves to left */
          .pgl-spine{ left:15px; }

          /* All cards: full width, margin-left for spine */
          .tl-card-wrap--left,
          .tl-card-wrap--right{
            justify-content:flex-start;
          }
          .tl-card{
            width:calc(100% - 44px);
            margin-left:44px;
          }
          /* No zigzag animations on mobile — simple fade up */
          .tl-card-wrap--left,
          .tl-card-wrap--right{
            /* override inline transform direction */
          }
          /* Hide desktop arrows */
          .tl-arrow{ display:none; }

          /* Dot on left spine */
          .tl-dot--center{
            left:5px; top:22px;
          }

          /* Timeline padding */
          .pgl-timeline{
            padding:24px 16px;
          }
          .pgl-era span{
            font-size:.78rem; padding:4px 16px;
          }
        }

        /* ═══════════════════════════════
           RESPONSIVE — Small mobile (≤480px)
        ═══════════════════════════════ */
        @media(max-width:480px){
          .tl-card{ margin-left:36px; width:calc(100% - 36px); }
          .tl-dot--center{ left:3px; }
          .pgl-spine{ left:13px; }
          .tl-card__head{ flex-direction:column; align-items:flex-start; gap:4px; }
          .tl-title{ font-size:.9rem; }
          .tl-desc{ font-size:.8rem; }
          .pgl-namebar{ flex-direction:column; align-items:flex-start; gap:4px; }
        }

        /* ── ANIMATION ── */
        @keyframes spineGrow{
          from{ transform:scaleY(0); transform-origin:top; }
          to  { transform:scaleY(1); transform-origin:top; }
        }
        .pgl-spine{ animation:spineGrow .9s cubic-bezier(.22,1,.36,1) .1s both; }
      `}</style>

      <div className="pgl-wrap">

        {/* ════════════════════════════
            DESKTOP SIDEBAR
        ════════════════════════════ */}
        <aside className="pgl-sidebar">
          <div>
            <h1 className="pgl-heading">PERJA<br/>LANAN</h1>

            {/* Accent stripes */}
            <div className="pgl-stripes">
              {[['#c94f35','100%'],['#d4604a','78%'],['#8a7d3a','56%'],['#6b1f3a','34%']].map(([c,w],i)=>(
                <div key={i} className="pgl-stripe" style={{ background:c, width:w }} />
              ))}
            </div>

            {/* Category filter */}
            <p className="pgl-filter-label">Kategori</p>
            <nav style={{ display:'flex', flexDirection:'column', gap:1 }}>
              {ALL_CATEGORIES.map(cat => {
                const active = filter === cat
                const count  = cat === 'Semua' ? TIMELINE.length : TIMELINE.filter(d=>d.category===cat).length
                return (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`pgl-filter-btn${active ? ' pgl-filter-btn--active' : ''}`}
                  >
                    {cat}
                    <span style={{
                      marginLeft:'8px', fontSize:'.58rem',
                      color: active ? '#c94f35' : 'rgba(240,238,234,.25)',
                      fontWeight:700,
                    }}>({count})</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Social footer */}
          <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
            {Object.entries(siteConfig.links).map(([k,url])=>(
              <a key={k} href={url} target="_blank" rel="noopener noreferrer" className="pgl-social-link">{k}</a>
            ))}
            <span className="pgl-email">{siteConfig.email}</span>
          </div>
        </aside>

        {/* ════════════════════════════
            MAIN CONTENT
        ════════════════════════════ */}
        <main className="pgl-main">

          {/* Name / title bar */}
          <div className="pgl-namebar">
            <p>Perjalanan &amp; Pengalaman</p>
            <span>{list.length} Entri</span>
          </div>

          {/* MOBILE filter chips */}
          <div className="pgl-mobile-filter">
            {ALL_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`pgl-mobile-chip${filter===cat?' pgl-mobile-chip--active':''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="pgl-timeline">
            {/* Vertical spine */}
            <div className="pgl-spine" />

            {/* Era: top */}
            <div className="pgl-era pgl-era--top">
              <span>Sekarang</span>
            </div>

            {/* Cards */}
            <div className="pgl-items">
              {list.length === 0 && (
                <p className="pgl-empty">Tidak ada entri untuk kategori ini.</p>
              )}
              {list.map((item, i) => (
                <TimelineCard
                  key={item.id}
                  item={item}
                  side={i % 2 === 0 ? 'left' : 'right'}
                  delay={i * 0.08}
                />
              ))}
            </div>

            {/* Era: bottom */}
            <div className="pgl-era pgl-era--bot" style={{ marginTop:36 }}>
              <span>Awal Perjalanan</span>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
