'use client'

import { useState } from 'react'
import Link from 'next/link'
import { blogPosts } from '@/data/blog'

const CATEGORIES = ['Semua', ...Array.from(new Set(blogPosts.map(p => p.category)))]

export default function BlogClient() {
  const [filter, setFilter] = useState('Semua')

  const filtered = filter === 'Semua'
    ? blogPosts
    : blogPosts.filter(p => p.category === filter)

  return (
    <>
      <style>{`
        .blog-card {
          display: block;
          text-decoration: none;
          color: inherit;
          background: #fff;
          border: 2px solid #1a1a1a;
          position: relative;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          box-shadow: 4px 4px 0 #1a1a1a;
        }
        .blog-card:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 #1a1a1a;
        }
        .blog-read-more {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 0.65rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #1a1a1a;
          transition: gap 0.15s;
        }
        .blog-card:hover .blog-read-more { gap: 14px; }

        .blog-filter-btn {
          font-family: var(--font-body);
          font-weight: 400;
          font-size: var(--text-sm);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(240,238,234,0.45);
          text-align: left;
          padding: 4px 0;
          border-left: 3px solid transparent;
          padding-left: 0;
          transition: all 0.15s;
          width: 100%;
        }
        .blog-filter-btn:hover { color: rgba(240,238,234,0.75); }
        .blog-filter-btn--active {
          font-weight: 700;
          color: #f0eeea;
          border-left-color: #f0eeea;
          padding-left: 9px;
        }

        .blog-mobile-filter {
          display: none;
          background: #1e1e16;
          padding: 0 16px;
          overflow-x: auto;
          border-bottom: 2px solid rgba(240,238,234,0.06);
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .blog-mobile-filter::-webkit-scrollbar { display: none; }
        .blog-mobile-chip {
          display: inline-block;
          font-family: var(--font-body);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 10px 14px;
          color: rgba(240,238,234,0.4);
          border-bottom: 3px solid transparent;
          transition: all 0.12s;
          white-space: nowrap;
        }
        .blog-mobile-chip--active {
          color: #f0eeea;
          border-bottom-color: #c94f35;
        }

        .blog-featured { grid-column: 1 / -1; }

        @media (max-width: 768px) {
          .blog-sidebar { display: none !important; }
          .blog-mobile-filter { display: flex !important; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .blog-card { animation: fadeUp 0.4s ease both; }
      `}</style>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - var(--nav-height))' }}>

        {/* Sidebar */}
        <aside className="blog-sidebar" style={{
          width: 'var(--sidebar-width)', flexShrink: 0,
          backgroundColor: '#1e1e16', padding: '48px 32px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          position: 'sticky', top: 'var(--nav-height)', alignSelf: 'start',
          minHeight: 'calc(100vh - var(--nav-height))',
        }}>
          <div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem,5vw,5rem)',
              lineHeight: 0.88, letterSpacing: '0.02em',
              color: '#f0eeea', marginBottom: '24px',
            }}>BLOG</h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '28px' }}>
              {[['#c94f35','100%'],['#8a7d3a','72%'],['#6b1f3a','44%']].map(([c,w],i)=>(
                <div key={i} style={{ height: '3px', background: c, width: w }} />
              ))}
            </div>

            <p style={{
              fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.6rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(240,238,234,0.3)', marginBottom: '10px',
            }}>Kategori</p>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {CATEGORIES.map(cat => {
                const count = cat === 'Semua' ? blogPosts.length : blogPosts.filter(p => p.category === cat).length
                const active = filter === cat
                return (
                  <button key={cat} onClick={() => setFilter(cat)}
                    className={`blog-filter-btn${active ? ' blog-filter-btn--active' : ''}`}>
                    {cat}
                    <span style={{
                      marginLeft: '8px', fontSize: '0.58rem', fontWeight: 700,
                      color: active ? '#c94f35' : 'rgba(240,238,234,0.25)',
                    }}>({count})</span>
                  </button>
                )
              })}
            </nav>
          </div>

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.6rem',
            color: 'rgba(240,238,234,0.2)', letterSpacing: '0.06em', lineHeight: 1.6,
          }}>
            Tulisan tentang pendidikan,<br/>Islam, dan perjalanan belajar.
          </p>
        </aside>

        {/* Main */}
        <main style={{ flex: 1, minWidth: 0, backgroundColor: '#f0eeea' }}>

          {/* Name bar */}
          <div style={{
            backgroundColor: '#c94f35', padding: '20px clamp(16px,4vw,40px)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <p style={{
              fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 'var(--text-xs)',
              letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,238,234,0.8)',
            }}>Tulisan &amp; Refleksi</p>
            <span style={{
              fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.65rem',
              letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(240,238,234,0.5)',
            }}>{filtered.length} Artikel</span>
          </div>

          {/* Mobile filter */}
          <div className="blog-mobile-filter">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                className={`blog-mobile-chip${filter === cat ? ' blog-mobile-chip--active' : ''}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div style={{
            padding: 'clamp(20px,4vw,40px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}>
            {filtered.length === 0 && (
              <p style={{
                gridColumn: '1 / -1', fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)', color: '#999',
                textAlign: 'center', padding: '40px 0', letterSpacing: '0.08em',
              }}>Tidak ada artikel untuk kategori ini.</p>
            )}

            {filtered.map((post, i) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className={`blog-card${i === 0 && filter === 'Semua' ? ' blog-featured' : ''}`}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                {/* Top color stripe */}
                <div style={{ height: '5px', background: post.color }} />

                {/* Featured hero area */}
                {i === 0 && filter === 'Semua' && (
                  <div style={{
                    height: '180px',
                    background: `linear-gradient(135deg, ${post.color} 0%, #1a1a1a 100%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '24px', position: 'relative', overflow: 'hidden',
                  }}>
                    <div style={{
                      position: 'absolute', inset: 0,
                      backgroundImage: 'linear-gradient(rgba(240,238,234,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(240,238,234,0.05) 1px, transparent 1px)',
                      backgroundSize: '32px 32px',
                    }} />
                    <p style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.6rem,3vw,2.4rem)',
                      color: 'rgba(240,238,234,0.12)', letterSpacing: '0.04em',
                      textTransform: 'uppercase', textAlign: 'center',
                      lineHeight: 1, position: 'relative', zIndex: 1,
                    }}>{post.title}</p>
                    <span style={{
                      position: 'absolute', top: '14px', left: '14px',
                      backgroundColor: 'rgba(240,238,234,0.15)', color: '#f0eeea',
                      fontFamily: 'var(--font-body)', fontWeight: 700,
                      fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                      padding: '3px 10px',
                    }}>✦ Terbaru</span>
                  </div>
                )}

                {/* Card body */}
                <div style={{ padding: '18px 20px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{
                      backgroundColor: post.color, color: '#f0eeea',
                      fontFamily: 'var(--font-body)', fontWeight: 700,
                      fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                      padding: '3px 9px',
                    }}>{post.category}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: '#bbb', letterSpacing: '0.06em' }}>
                      {post.readTime} baca
                    </span>
                  </div>

                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: i === 0 && filter === 'Semua' ? 'clamp(1.2rem,2.5vw,1.7rem)' : 'clamp(1rem,1.8vw,1.3rem)',
                    lineHeight: 1.0, letterSpacing: '0.02em', textTransform: 'uppercase',
                    color: '#1a1a1a', marginBottom: '10px',
                  }}>{post.title}</h2>

                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
                    lineHeight: 1.7, color: '#666', marginBottom: '14px',
                  }}>{post.excerpt}</p>

                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    borderTop: '1px solid #e8e6e0', paddingTop: '12px',
                  }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', color: '#aaa', letterSpacing: '0.06em' }}>
                      {post.date}
                    </span>
                    <span className="blog-read-more">
                      Baca <span style={{ color: post.color }}>→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}
