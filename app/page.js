'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { siteConfig } from '@/data/config'
import { MagneticWrapper } from '@/hooks/useMagnet'
import { useButterflyGlow } from '@/hooks/useButterflyGlow'

// ── Quote of the Day ──────────────────────────────────────────
const QUOTES = [
  { arab:'طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ', teks:'Menuntut ilmu adalah kewajiban bagi setiap muslim.', sumber:'HR. Ibnu Majah' },
  { arab:'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ', teks:"Sebaik-baik kalian adalah yang mempelajari Al-Qur'an dan mengajarkannya.", sumber:'HR. Bukhari' },
  { arab:'مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ', teks:'Barang siapa menempuh jalan untuk mencari ilmu, Allah mudahkan baginya jalan menuju surga.', sumber:'HR. Muslim' },
  { arab:'إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَنْ يُتْقِنَهُ', teks:'Sesungguhnya Allah mencintai jika salah seorang dari kalian mengerjakan suatu pekerjaan dengan itqan (profesional).', sumber:'HR. Thabrani' },
  { arab:'الدُّنْيَا مَزْرَعَةُ الْآخِرَةِ', teks:'Dunia adalah ladang bagi akhirat.', sumber:'Pepatah Ulama' },
  { arab:'مَنْ عَرَفَ نَفْسَهُ فَقَدْ عَرَفَ رَبَّهُ', teks:'Barang siapa mengenal dirinya, sungguh ia telah mengenal Tuhannya.', sumber:'Pepatah Sufi' },
  { arab:'اَلْعِلْمُ بِلَا عَمَلٍ كَالشَّجَرِ بِلَا ثَمَرٍ', teks:'Ilmu tanpa amal seperti pohon tanpa buah.', sumber:'Pepatah Ulama' },
]

function getDailyQuote() {
  const day = new Date().getDate() + new Date().getMonth() * 31
  return QUOTES[day % QUOTES.length]
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [quote]   = useState(getDailyQuote)

  // ── Parallax ─────────────────────────────────────────────
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const rafRef   = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e) => {
    mouseRef.current = {
      x: (e.clientX / window.innerWidth  - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    }
  }, [])

  useEffect(() => {
    setMounted(true)
    let current = { x: 0, y: 0 }
    const tick = () => {
      current.x += (mouseRef.current.x - current.x) * 0.06
      current.y += (mouseRef.current.y - current.y) * 0.06
      setMouse({ x: current.x, y: current.y })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('mousemove', handleMouseMove) }
  }, [handleMouseMove])

  const px = (depth = 1) => `translateX(${mouse.x * depth * 14}px) translateY(${mouse.y * depth * 10}px)`

  // ── Butterfly glow untuk nama ─────────────────────────────
  const [nameRef, { glow, relX, relY }] = useButterflyGlow({ radius: 340 })

  // Hitung warna gradient berdasarkan posisi kupu-kupu
  // Saat glow = 0: teks putih biasa
  // Saat glow = 1: gradient emas cerah yang titik terangnya mengikuti relX
  const goldStop1 = `rgba(255,215,0,${(glow * 0.95).toFixed(3)})`
  const goldStop2 = `rgba(255,160,0,${(glow * 0.7).toFixed(3)})`
  const goldStop3 = `rgba(255,235,100,${(glow * 0.9).toFixed(3)})`

  // gradient radial dari posisi kupu-kupu → menyinari seluruh teks sekaligus
  const nameBackground = glow > 0.02
    ? `radial-gradient(ellipse 80% 120% at ${(relX * 100).toFixed(1)}% ${(relY * 100).toFixed(1)}%, ${goldStop3} 0%, ${goldStop1} 30%, ${goldStop2} 55%, rgba(240,238,234,0.9) 100%)`
    : 'none'

  // text-shadow emas saat mendekati
  const nameShadow = glow > 0.05
    ? `0 0 ${20 + glow * 60}px rgba(255,200,0,${(glow * 0.8).toFixed(3)}), 0 0 ${50 + glow * 100}px rgba(255,140,0,${(glow * 0.4).toFixed(3)})`
    : 'none'

  return (
    <>
      <style>{`
        .home-grid-bg {
          position:absolute; inset:0;
          background-image:
            linear-gradient(rgba(240,238,234,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(240,238,234,0.06) 1px, transparent 1px);
          background-size:48px 48px; pointer-events:none;
        }
        @keyframes slideUp    { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideRight { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeIn     { from{opacity:0} to{opacity:1} }
        @keyframes quoteReveal { from{opacity:0;transform:translateY(10px) scaleY(0.96)} to{opacity:1;transform:translateY(0) scaleY(1)} }
        @keyframes arabicFloat { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-4px)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }

        .home-role    { animation:slideRight .6s ease .15s both }
        .home-name    { animation:slideUp    .7s ease .25s both }
        .home-divider { animation:fadeIn     .5s ease .45s both }
        .home-tagline { animation:slideUp    .6s ease .5s  both }
        .home-ctas    { animation:slideUp    .6s ease .65s both }
        .home-meta    { animation:fadeIn     .7s ease .8s  both }
        .home-index   { animation:fadeIn     .8s ease .9s  both }
        .home-quote   { animation:quoteReveal .8s ease 1.0s both }

        /* ── Nama dengan efek glow smooth ── */
        .home-name-text {
          font-family: var(--font-display);
          font-size: clamp(4rem, 9vw, 8.5rem);
          line-height: .85;
          letter-spacing: .01em;
          text-transform: uppercase;
          margin-bottom: 28px;
          /* Default: teks putih */
          color: #f0eeea;
          /* Background gradient diaplikasikan via inline style */
          -webkit-background-clip: text;
          background-clip: text;
          /* transition smooth untuk semua perubahan */
          transition: color 0.25s ease, text-shadow 0.25s ease, -webkit-text-fill-color 0.25s ease;
          will-change: color, text-shadow;
          display: block;
        }

        .home-btn-primary {
          display:inline-flex; align-items:center; gap:10px;
          font-family:var(--font-body); font-weight:700;
          font-size:.78rem; letter-spacing:.16em; text-transform:uppercase;
          background:#f0eeea; color:#1a1a1a;
          padding:14px 28px; border:2px solid #f0eeea;
          transition:background .15s, color .15s;
        }
        .home-btn-primary:hover { background:#c94f35; border-color:#c94f35; color:#f0eeea; }

        .home-btn-secondary {
          display:inline-flex; align-items:center; gap:10px;
          font-family:var(--font-body); font-weight:700;
          font-size:.78rem; letter-spacing:.16em; text-transform:uppercase;
          background:transparent; color:rgba(240,238,234,.65);
          padding:14px 28px; border:2px solid rgba(240,238,234,.3);
          transition:border-color .15s, color .15s;
        }
        .home-btn-secondary:hover { border-color:#f0eeea; color:#f0eeea; }

        .home-social a {
          font-family:var(--font-body); font-size:.62rem;
          letter-spacing:.14em; text-transform:uppercase;
          color:rgba(240,238,234,.35); transition:color .15s;
        }
        .home-social a:hover { color:#f0eeea; }

        .home-nav-item {
          display:flex; align-items:center; gap:16px;
          padding:16px 0; border-bottom:1px solid rgba(26,26,26,.1);
          text-decoration:none; transition:gap .2s;
        }
        .home-nav-item:hover { gap:22px; }
        .home-nav-item:hover .home-nav-arrow { color:#c94f35; }
        .home-nav-num {
          font-family:var(--font-display); font-size:1.1rem;
          color:rgba(26,26,26,.2); line-height:1; min-width:28px; transition:color .15s;
        }
        .home-nav-item:hover .home-nav-num { color:#c94f35; }
        .home-nav-label {
          font-family:var(--font-body); font-weight:700;
          font-size:.75rem; letter-spacing:.14em; text-transform:uppercase;
          color:#1a1a1a; flex:1;
        }
        .home-nav-arrow { font-family:var(--font-body); font-size:.72rem; color:rgba(26,26,26,.3); transition:color .15s; }

        .quote-card {
          background:rgba(201,79,53,0.08); border:1px solid rgba(201,79,53,0.25);
          border-left:3px solid #c94f35; padding:16px 18px;
          position:relative; overflow:hidden;
        }
        .quote-card::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(105deg,transparent 40%,rgba(201,79,53,0.06) 50%,transparent 60%);
          background-size:200% 100%; animation:shimmer 4s ease infinite; pointer-events:none;
        }
        .quote-arabic {
          font-family:'Georgia','Times New Roman',serif;
          font-size:clamp(.95rem,1.4vw,1.1rem); line-height:2;
          color:rgba(240,238,234,.9); text-align:right; direction:rtl;
          letter-spacing:.04em; animation:arabicFloat 5s ease-in-out infinite;
          display:block; margin-bottom:10px;
        }
        .quote-label  { font-family:var(--font-body); font-weight:700; font-size:.52rem; letter-spacing:.22em; text-transform:uppercase; color:#c94f35; margin-bottom:6px; display:block; }
        .quote-teks   { font-family:var(--font-body); font-size:.72rem; line-height:1.65; color:rgba(240,238,234,.55); font-style:italic; }
        .quote-sumber { font-family:var(--font-body); font-weight:700; font-size:.58rem; letter-spacing:.14em; text-transform:uppercase; color:rgba(240,238,234,.3); margin-top:10px; display:block; }

        .parallax-layer { transition:transform 0.05s linear; will-change:transform; }

        @media (max-width:768px) {
          .home-split { flex-direction:column !important; min-height:auto !important; }
          .home-left  { min-height:60vw !important; padding:32px 24px !important; }
          .home-right { padding:28px 24px 40px !important; }
          .home-name-text { font-size:clamp(3.2rem,18vw,6rem) !important; line-height:.88 !important; }
          .home-index { display:none !important; }
          .home-ctas  { flex-direction:column !important; }
          .home-ctas a { width:100%; justify-content:center !important; }
          .parallax-layer { transform:none !important; transition:none !important; }
        }
        @media (max-width:480px) {
          .home-left  { padding:24px 18px !important; }
          .home-right { padding:20px 18px 32px !important; }
        }
        @media (prefers-reduced-motion:reduce) {
          .parallax-layer { transform:none !important; transition:none !important; }
          .quote-arabic   { animation:none !important; }
          .quote-card::before { animation:none !important; }
        }
      `}</style>

      <div className="home-split" style={{ display:'flex', minHeight:`calc(100vh - var(--nav-height))` }}>

        {/* ── LEFT ── */}
        <div className="home-left" style={{
          flex:'0 0 58%', backgroundColor:'#1e1e16',
          position:'relative', padding:'clamp(36px,5vw,64px) clamp(28px,4vw,56px)',
          display:'flex', flexDirection:'column', justifyContent:'space-between', overflow:'hidden',
        }}>
          <div className="home-grid-bg parallax-layer" style={{ transform:px(0.3) }} />
          <div className="parallax-layer" style={{ position:'absolute', top:'-80px', right:'-60px', width:'320px', height:'320px', borderRadius:'50%', background:'radial-gradient(circle, rgba(201,79,53,0.12) 0%, transparent 70%)', pointerEvents:'none', transform:px(0.8) }} />
          <div className="parallax-layer" style={{ position:'absolute', bottom:'-40px', left:'20%', width:'240px', height:'240px', borderRadius:'50%', background:'radial-gradient(circle, rgba(138,125,58,0.10) 0%, transparent 70%)', pointerEvents:'none', transform:px(0.5) }} />
          <div style={{ position:'absolute', top:0, left:0, width:'5px', height:'100%', background:'linear-gradient(to bottom, #c94f35, #8a7d3a 60%, #6b1f3a)' }} />

          <div style={{ position:'relative', zIndex:1 }}>
            <p className="home-role" style={{ fontFamily:'var(--font-body)', fontWeight:700, fontSize:'.65rem', letterSpacing:'.22em', textTransform:'uppercase', color:'#c94f35' }}>
              {siteConfig.role} — {siteConfig.title}
            </p>
          </div>

          {/* ── NAMA dengan efek emas smooth ── */}
          <div style={{ position:'relative', zIndex:1, margin:'auto 0' }}>
            <h1
              ref={nameRef}
              className="home-name-text home-name parallax-layer"
              style={{
                transform: px(1.2),
                // Saat glow aktif: gunakan background-clip untuk gradient emas
                // Saat tidak aktif: warna putih biasa
                backgroundImage: nameBackground,
                WebkitTextFillColor: glow > 0.02 ? 'transparent' : '#f0eeea',
                color: glow > 0.02 ? 'transparent' : '#f0eeea',
                textShadow: nameShadow,
              }}
            >
              {siteConfig.name}
            </h1>

            <div
              className="home-divider"
              style={{
                width:'48px', height:'3px',
                backgroundColor: glow > 0.15 ? `rgba(255,${Math.round(180+glow*75)},0,1)` : '#c94f35',
                marginBottom:'20px',
                transition:'background-color 0.2s, box-shadow 0.2s',
                boxShadow: glow > 0.15 ? `0 0 ${glow*20}px rgba(255,180,0,0.8)` : 'none',
              }}
            />

            <p className="home-tagline parallax-layer" style={{ fontFamily:'var(--font-body)', fontWeight:400, fontSize:'clamp(.85rem,1.4vw,1rem)', lineHeight:1.75, color:'rgba(240,238,234,.6)', maxWidth:'340px', transform:px(0.6) }}>
              Mahasiswa Pendidikan Agama Islam yang aktif dalam dunia pengajaran,
              pengabdian masyarakat, dan pengembangan diri.
            </p>
          </div>

          <div style={{ position:'relative', zIndex:1 }}>
            <div className="home-ctas" style={{ display:'flex', gap:'12px', flexWrap:'wrap', marginBottom:'28px' }}>
              <MagneticWrapper strength={0.4}>
                <Link href="/tentang-saya" className="home-btn-primary">Tentang Saya →</Link>
              </MagneticWrapper>
              <MagneticWrapper strength={0.4}>
                <Link href="/pengalaman" className="home-btn-secondary">Pengalaman</Link>
              </MagneticWrapper>
            </div>

            <div className="home-social" style={{ display:'flex', gap:'20px', flexWrap:'wrap', marginBottom:'24px' }}>
              {Object.entries(siteConfig.links).map(([k,url]) => (
                <a key={k} href={url} target="_blank" rel="noopener noreferrer">{k}</a>
              ))}
            </div>

            <div className="home-quote">
              <div className="quote-card">
                <span className="quote-label">✦ Quote Hari Ini</span>
                <span className="quote-arabic">{quote.arab}</span>
                <p className="quote-teks">"{quote.teks}"</p>
                <span className="quote-sumber">— {quote.sumber}</span>
              </div>
            </div>
          </div>

          <div className="home-index parallax-layer" style={{ position:'absolute', bottom:'28px', right:'28px', fontFamily:'var(--font-display)', fontSize:'4rem', lineHeight:1, color:'rgba(240,238,234,.04)', userSelect:'none', pointerEvents:'none', letterSpacing:'-.02em', transform:px(1.5) }}>01</div>
        </div>

        {/* ── RIGHT ── */}
        <div className="home-right" style={{ flex:'1', backgroundColor:'#f0eeea', padding:'clamp(36px,5vw,64px) clamp(28px,4vw,52px)', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
          <div className="home-meta">
            <p style={{ fontFamily:'var(--font-body)', fontWeight:700, fontSize:'.6rem', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(26,26,26,.3)', marginBottom:'32px' }}>
              Portfolio — {new Date().getFullYear()}
            </p>
            <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'40px' }}>
              {[{label:'Kota',val:'Jepara'},{label:'Prodi',val:'PAI'},{label:'Status',val:'Mahasiswa'}].map(({label,val}) => (
                <div key={label} style={{ border:'1px solid #d0cec8', padding:'6px 14px', display:'flex', flexDirection:'column', gap:'2px' }}>
                  <span style={{ fontFamily:'var(--font-body)', fontSize:'.55rem', letterSpacing:'.14em', textTransform:'uppercase', color:'#aaa', fontWeight:700 }}>{label}</span>
                  <span style={{ fontFamily:'var(--font-body)', fontSize:'.78rem', fontWeight:600, color:'#1a1a1a' }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center' }}>
            <p style={{ fontFamily:'var(--font-body)', fontWeight:700, fontSize:'.58rem', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(26,26,26,.28)', marginBottom:'8px' }}>Navigasi</p>
            {[
              {num:'01',label:'Tentang Saya',href:'/tentang-saya',desc:'Profil & biografi'},
              {num:'02',label:'Pengalaman',  href:'/pengalaman',  desc:'Timeline perjalanan'},
              {num:'03',label:'Galeri',      href:'/galeri',      desc:'Foto & dokumentasi'},
              {num:'04',label:'Blog',        href:'/blog',        desc:'Tulisan & refleksi'},
            ].map((item, i) => (
              <Link key={item.href} href={item.href} className="home-nav-item"
                style={{ opacity:mounted?1:0, transform:mounted?'none':'translateY(12px)', transition:`opacity .5s ease ${.7+i*.1}s, transform .5s ease ${.7+i*.1}s` }}>
                <span className="home-nav-num">{item.num}</span>
                <span style={{ display:'flex', flexDirection:'column', flex:1 }}>
                  <span className="home-nav-label">{item.label}</span>
                  <span style={{ fontFamily:'var(--font-body)', fontSize:'.65rem', color:'#aaa', letterSpacing:'.06em' }}>{item.desc}</span>
                </span>
                <span className="home-nav-arrow">→</span>
              </Link>
            ))}
          </div>

          <div style={{ marginTop:'32px' }}>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'.62rem', color:'#bbb', letterSpacing:'.08em' }}>{siteConfig.email}</p>
          </div>
        </div>
      </div>
    </>
  )
}
