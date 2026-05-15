'use client'

import { useState } from 'react'

/**
 * data/galeri.js — bisa dipindah ke file terpisah
 * Tambahkan item foto/media di sini.
 */
const galeriItems = [
  {
    id:       'Seminar Kolabarosi UNJ & UNISNU',
    year:     '2025',
    category: 'Konferensi',
    caption:  'Seminar Kolaborasi di Universitas Negeri Jakarta, Kota Jakarta',
    src:      '/image/galeri1.jpg',
  },
  {
    id:       'Diseminasi MdsM',
    year:     '2025',
    category: 'Pengajaran',
    caption:  'Sesi kelas mata kuliah [Judul Mata Kuliah',
    src:      '/image/galeri2.JPG',
  },
  {
    id:       'Fotbar Penyerahan Praktik Mengajar MAHABA',
    year:     '2024',
    category: 'Fieldwork',
    caption:  'Penelitian arsip di [Nama Kota]',
    src:      '/image/galeri3.JPG',
  },
  {
    id:       'foto-4',
    year:     '2024',
    category: 'Konferensi',
    caption:  'Workshop bersama peserta di [Nama Institusi]',
    src:      '/image/sementara.jpg',
  },
  {
    id:       'foto-5',
    year:     '2023',
    category: 'Fieldwork',
    caption:  'Wawancara sejarah lisan di [Lokasi]',
    src:      '/image/sementara.jpg',
  },
  {
    id:       'foto-6',
    year:     '2023',
    category: 'Pengajaran',
    caption:  'Diskusi panel mahasiswa [Nama Universitas]',
    src:      '/image/sementara.jpg',
  },
]

const CATEGORIES = ['Semua', 'Konferensi', 'Pengajaran', 'Fieldwork']

const CATEGORY_COLORS = {
  'Konferensi': '#c94f35',
  'Pengajaran': '#8a7d3a',
  'Fieldwork':  '#6b1f3a',
}

export default function GaleriClient() {
  const [filter, setFilter] = useState('Semua')
  const [lightbox, setLightbox] = useState(null)

  const filtered = filter === 'Semua'
    ? galeriItems
    : galeriItems.filter(g => g.category === filter)

  return (
    <>
      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position:        'fixed',
            inset:           0,
            backgroundColor: 'rgba(26,26,26,0.96)',
            zIndex:          200,
            display:         'flex',
            flexDirection:   'column',
            alignItems:      'center',
            justifyContent:  'center',
            padding:         '40px 24px',
            cursor:          'pointer',
          }}
        >
          <button
            style={{
              position:      'absolute',
              top:           '24px',
              right:         '28px',
              color:         'rgba(240,238,234,0.6)',
              fontSize:      '0.72rem',
              fontFamily:    'var(--font-body)',
              fontWeight:    700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            ✕ Tutup
          </button>

          <div style={{
            width:           '100%',
            maxWidth:        '800px',
            aspectRatio:     '4/3',
            backgroundColor: '#2a2a2a',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            overflow:        'hidden',
          }}>
            {lightbox.src
              ? <img
                  src={lightbox.src}
                  alt={lightbox.caption}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              : <span style={{
                  color:         'rgba(240,238,234,0.25)',
                  fontFamily:    'var(--font-body)',
                  fontSize:      'var(--text-xs)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}>Foto belum tersedia</span>
            }
          </div>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <p style={{
              color:         'rgba(240,238,234,0.5)',
              fontFamily:    'var(--font-body)',
              fontSize:      'var(--text-xs)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom:  '6px',
            }}>{lightbox.category} — {lightbox.year}</p>
            <p style={{
              color:      'rgba(240,238,234,0.85)',
              fontFamily: 'var(--font-body)',
              fontSize:   'var(--text-sm)',
              lineHeight: 1.6,
              maxWidth:   '560px',
            }}>{lightbox.caption}</p>
          </div>
        </div>
      )}

      <div className="page-layout">

        {/* Sidebar kiri — maroon */}
        <aside
          className="page-sidebar page-sidebar--sticky"
          style={{ backgroundColor: '#6b1f3a' }}
        >
          <div>
            <h1 className="sidebar-heading" style={{ marginBottom: '24px' }}>GALERI</h1>
            <p style={{
              fontFamily:    'var(--font-body)',
              fontWeight:    500,
              fontSize:      'var(--text-sm)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color:         'rgba(240,238,234,0.55)',
            }}>Foto &amp; Dokumentasi</p>
          </div>

          {/* Filter sidebar */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  fontFamily:    'var(--font-body)',
                  fontWeight:    filter === cat ? 700 : 400,
                  fontSize:      'var(--text-sm)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color:         filter === cat ? '#f0eeea' : 'rgba(240,238,234,0.45)',
                  textAlign:     'left',
                  padding:       '4px 0',
                  borderLeft:    filter === cat ? '3px solid #f0eeea' : '3px solid transparent',
                  paddingLeft:   filter === cat ? '9px' : '0',
                  transition:    'all 0.15s',
                }}
                onMouseEnter={e => {
                  if (filter !== cat) e.currentTarget.style.color = 'rgba(240,238,234,0.75)'
                }}
                onMouseLeave={e => {
                  if (filter !== cat) e.currentTarget.style.color = 'rgba(240,238,234,0.45)'
                }}
              >
                {cat}
              </button>
            ))}
          </nav>
        </aside>

        {/* Konten kanan */}
        <main className="page-main">
          <div className="name-bar">
            <p>Foto &amp; Dokumentasi Kegiatan</p>
          </div>

          {/* Grid galeri */}
          <div style={{
            padding:             'clamp(20px, 4vw, 40px)',
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap:                 '16px',
          }}>
            {filtered.map((item) => (
              <GalleryCard key={item.id} item={item} onClick={() => setLightbox(item)} />
            ))}

            {filtered.length === 0 && (
              <p style={{
                gridColumn:  '1 / -1',
                fontFamily:  'var(--font-body)',
                fontSize:    'var(--text-sm)',
                color:       '#999',
                textAlign:   'center',
                padding:     '40px 0',
              }}>Tidak ada foto untuk kategori ini.</p>
            )}
          </div>
        </main>
      </div>
    </>
  )
}

function GalleryCard({ item, onClick }) {
  const accent = CATEGORY_COLORS[item.category] ?? '#1a1a1a'

  return (
    <button
      onClick={onClick}
      style={{
        display:      'flex',
        flexDirection:'column',
        textAlign:    'left',
        border:       'none',
        background:   'none',
        cursor:       'pointer',
        padding:      0,
      }}
    >
      {/* Gambar */}
      <div
        style={{
          width:           '100%',
          aspectRatio:     '4/3',
          backgroundColor: '#d0cec8',
          overflow:        'hidden',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          transition:      'filter 0.15s',
          position:        'relative',
        }}
        onMouseEnter={e => e.currentTarget.style.filter = 'brightness(0.85)'}
        onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
      >
        {item.src
          ? <img
              src={item.src}
              alt={item.caption}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          : <>
              <span style={{
                fontFamily:    'var(--font-body)',
                fontSize:      'var(--text-xs)',
                color:         '#999',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>Foto</span>
              {/* Overlay hover */}
              <div style={{
                position:        'absolute',
                inset:           0,
                backgroundColor: 'rgba(26,26,26,0)',
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                transition:      'background-color 0.15s',
              }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(26,26,26,0.35)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(26,26,26,0)'}
              >
                <span style={{
                  fontFamily:    'var(--font-body)',
                  fontWeight:    700,
                  fontSize:      'var(--text-xs)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color:         '#f0eeea',
                  opacity:       0,
                }}>Lihat →</span>
              </div>
            </>
        }

        {/* Category badge */}
        <span style={{
          position:        'absolute',
          top:             '10px',
          left:            '10px',
          backgroundColor: accent,
          color:           '#f0eeea',
          fontFamily:      'var(--font-body)',
          fontWeight:      700,
          fontSize:        '0.6rem',
          letterSpacing:   '0.12em',
          textTransform:   'uppercase',
          padding:         '3px 8px',
        }}>{item.category}</span>
      </div>

      {/* Caption */}
      <div style={{ padding: '10px 2px 6px' }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          fontSize:   'var(--text-sm)',
          lineHeight: 1.5,
          color:      '#1a1a1a',
        }}>{item.caption}</p>
        <p style={{
          fontFamily:    'var(--font-body)',
          fontSize:      'var(--text-xs)',
          color:         '#999',
          marginTop:     '4px',
          letterSpacing: '0.06em',
        }}>{item.year}</p>
      </div>
    </button>
  )
}
