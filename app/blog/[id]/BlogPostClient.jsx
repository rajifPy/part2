'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { blogPosts } from '@/data/blog'

export default function BlogPostClient({ params }) {
  const post = blogPosts.find(p => p.id === params.id)
  const [mounted, setMounted] = useState(false)
  const others = blogPosts.filter(p => p.id !== params.id).slice(0, 2)

  useEffect(() => { setMounted(true) }, [])

  if (!post) {
    return (
      <div style={{ minHeight: 'calc(100vh - var(--nav-height))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', color: '#d0cec8' }}>404</p>
          <p style={{ fontFamily: 'var(--font-body)', color: '#999', marginBottom: '20px' }}>Artikel tidak ditemukan.</p>
          <Link href="/blog" style={{
            fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.72rem',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            backgroundColor: '#1a1a1a', color: '#f0eeea', padding: '10px 20px',
          }}>← Kembali ke Blog</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .post-hero    { animation: fadeSlideUp 0.6s ease 0.1s both; }
        .post-body    { animation: fadeSlideUp 0.6s ease 0.25s both; }
        .post-sidebar { animation: fadeSlideUp 0.5s ease 0.15s both; }

        .post-tag {
          display: inline-block;
          font-family: var(--font-body); font-weight: 700;
          font-size: 0.58rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: #1a1a1a; border: 1.5px solid #1a1a1a;
          padding: 3px 9px; margin: 2px;
          transition: background-color 0.15s, color 0.15s;
        }
        .post-tag:hover { background-color: #1a1a1a; color: #f0eeea; }

        .related-card {
          display: block; text-decoration: none; color: inherit;
          border: 2px solid #1a1a1a; background: #fff;
          box-shadow: 3px 3px 0 #1a1a1a;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .related-card:hover {
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0 #1a1a1a;
        }

        .back-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-body); font-weight: 700;
          font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(240,238,234,0.5);
          transition: color 0.15s, gap 0.15s;
        }
        .back-btn:hover { color: #f0eeea; gap: 12px; }

        .progress-bar {
          position: fixed; top: 0; left: 0; height: 3px;
          background: ${post.color};
          z-index: 999; transition: width 0.1s linear;
        }

        @media (max-width: 768px) {
          .post-layout { flex-direction: column !important; }
          .post-sticky-sidebar { position: static !important; width: 100% !important; }
        }
      `}</style>

      {/* Reading progress bar */}
      <ReadingProgress color={post.color} />

      <div className="post-layout" style={{ display: 'flex', minHeight: 'calc(100vh - var(--nav-height))' }}>

        {/* ── Left sidebar ── */}
        <aside className="post-sticky-sidebar" style={{
          width: 'var(--sidebar-width)', flexShrink: 0,
          backgroundColor: '#1a1a1a', padding: '48px 32px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          position: 'sticky', top: 'var(--nav-height)', alignSelf: 'start',
          minHeight: 'calc(100vh - var(--nav-height))',
        }}>
          <div className="post-sidebar">
            <Link href="/blog" className="back-btn" style={{ marginBottom: '32px', display: 'inline-flex' }}>
              ← Blog
            </Link>

            {/* Category badge */}
            <div style={{
              display: 'inline-block',
              backgroundColor: post.color, color: '#f0eeea',
              fontFamily: 'var(--font-body)', fontWeight: 700,
              fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase',
              padding: '4px 12px', marginBottom: '20px',
            }}>{post.category}</div>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem,3vw,2.8rem)',
              lineHeight: 0.9, letterSpacing: '0.02em',
              color: '#f0eeea', textTransform: 'uppercase',
              marginBottom: '20px',
            }}>{post.title}</h2>

            {/* Meta */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '16px', height: '1.5px', backgroundColor: post.color }} />
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.62rem',
                  color: 'rgba(240,238,234,0.45)', letterSpacing: '0.08em',
                }}>{post.date}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '16px', height: '1.5px', backgroundColor: post.color }} />
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.62rem',
                  color: 'rgba(240,238,234,0.45)', letterSpacing: '0.08em',
                }}>{post.readTime} baca</span>
              </div>
            </div>

            {/* Tags */}
            <div style={{ margin: '-2px' }}>
              {post.tags.map(tag => (
                <span key={tag} className="post-tag" style={{
                  borderColor: 'rgba(240,238,234,0.25)',
                  color: 'rgba(240,238,234,0.6)',
                }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Accent stripes bottom */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {[['#c94f35','60%'],['#8a7d3a','40%'],['#6b1f3a','25%']].map(([c,w],i)=>(
              <div key={i} style={{ height: '2px', background: c, width: w }} />
            ))}
          </div>
        </aside>

        {/* ── Main article ── */}
        <main style={{ flex: 1, minWidth: 0, backgroundColor: '#f0eeea' }}>

          {/* Hero band */}
          <div className="post-hero" style={{
            background: `linear-gradient(135deg, ${post.color} 0%, #1a1a1a 100%)`,
            padding: '48px clamp(20px,5vw,56px)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'linear-gradient(rgba(240,238,234,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(240,238,234,0.04) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} />
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem,5vw,4rem)',
              lineHeight: 0.9, letterSpacing: '0.02em',
              color: 'rgba(240,238,234,0.12)',
              textTransform: 'uppercase',
              position: 'relative', zIndex: 1,
              maxWidth: '600px',
            }}>{post.title}</p>
          </div>

          {/* Article content */}
          <div className="post-body" style={{ padding: 'clamp(28px,5vw,56px) clamp(20px,5vw,56px)', maxWidth: '680px' }}>

            {/* Excerpt / lead */}
            <p style={{
              fontFamily: 'var(--font-body)', fontWeight: 600,
              fontSize: 'clamp(1rem,1.8vw,1.15rem)', lineHeight: 1.8,
              color: post.color, marginBottom: '32px',
              borderLeft: `4px solid ${post.color}`, paddingLeft: '20px',
            }}>{post.excerpt}</p>

            {/* Divider */}
            <div style={{
              height: '2px',
              background: `linear-gradient(to right, ${post.color}, transparent)`,
              marginBottom: '32px',
            }} />

            {/* Body paragraphs */}
            {post.body.map((para, i) => (
              <p key={i} style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.95rem,1.6vw,1.05rem)',
                lineHeight: 1.9, color: '#2a2a2a',
                marginBottom: '24px',
              }}>{para}</p>
            ))}

            {/* Tags */}
            <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '2px solid #1a1a1a' }}>
              <p style={{
                fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.58rem',
                letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaa', marginBottom: '10px',
              }}>Tag</p>
              <div style={{ margin: '-2px' }}>
                {post.tags.map(tag => <span key={tag} className="post-tag">{tag}</span>)}
              </div>
            </div>

            {/* Back button */}
            <div style={{ marginTop: '40px' }}>
              <Link href="/blog" style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                fontFamily: 'var(--font-body)', fontWeight: 700,
                fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                backgroundColor: '#1a1a1a', color: '#f0eeea', padding: '12px 24px',
                border: '2px solid #1a1a1a',
                transition: 'background-color 0.15s, color 0.15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = post.color; e.currentTarget.style.borderColor = post.color }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#1a1a1a'; e.currentTarget.style.borderColor = '#1a1a1a' }}
              >
                ← Kembali ke Blog
              </Link>
            </div>

            {/* Related articles */}
            {others.length > 0 && (
              <div style={{ marginTop: '56px' }}>
                <p style={{
                  fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.58rem',
                  letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaa', marginBottom: '16px',
                }}>Artikel Lainnya</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))', gap: '14px' }}>
                  {others.map(other => (
                    <Link key={other.id} href={`/blog/${other.id}`} className="related-card">
                      <div style={{ height: '4px', background: other.color }} />
                      <div style={{ padding: '14px 16px' }}>
                        <span style={{
                          backgroundColor: other.color, color: '#f0eeea',
                          fontFamily: 'var(--font-body)', fontWeight: 700,
                          fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                          padding: '2px 8px', display: 'inline-block', marginBottom: '8px',
                        }}>{other.category}</span>
                        <p style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.95rem', lineHeight: 1.0,
                          letterSpacing: '0.02em', textTransform: 'uppercase', color: '#1a1a1a',
                          marginBottom: '6px',
                        }}>{other.title}</p>
                        <p style={{
                          fontFamily: 'var(--font-body)', fontSize: '0.72rem',
                          color: '#999', letterSpacing: '0.06em',
                        }}>{other.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}

/* Reading progress indicator */
function ReadingProgress({ color }) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const update = () => {
      const el = document.documentElement
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100
      setProgress(Math.min(pct, 100))
    }
    window.addEventListener('scroll', update)
    return () => window.removeEventListener('scroll', update)
  }, [])
  return <div className="progress-bar" style={{ width: `${progress}%`, background: color }} />
}
