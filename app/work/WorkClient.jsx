'use client'

import { useState, useEffect, useRef } from 'react'
import Modal           from '@/components/ui/Modal'
import ResearchCard    from '@/components/sections/ResearchCard'
import PublicationItem from '@/components/sections/PublicationItem'
import { siteConfig }  from '@/data/config'
import { researchProjects } from '@/data/research'
import { publications }     from '@/data/publications'
import { teaching }         from '@/data/teaching'

const TOC_SECTIONS = [
  { id: 'research',     label: 'RESEARCH',                   indent: false },
  { id: 'publications', label: 'PUBLICATIONS',               indent: false },
  { id: 'peer',         label: 'Peer-reviewed articles',     indent: true  },
  { id: 'chapters',     label: 'Chapters in edited volumes', indent: true  },
  { id: 'reviews',      label: 'Book & conference reviews',  indent: true  },
  { id: 'public',       label: 'Public scholarship',         indent: true  },
  { id: 'teaching',     label: 'TEACHING',                   indent: false },
  { id: 'lectured',     label: 'Lectured courses',           indent: true  },
  { id: 'guest',        label: 'Guest seminars & workshops', indent: true  },
]

const PUB_CATEGORIES = [
  { key: 'all',      label: 'All' },
  { key: 'peer',     label: 'Articles' },
  { key: 'chapters', label: 'Chapters' },
  { key: 'reviews',  label: 'Reviews' },
  { key: 'public',   label: 'Public' },
]

export default function WorkClient() {
  const [modal,     setModal]     = useState(null)
  const [activeId,  setActiveId]  = useState('research')
  const [pubFilter, setPubFilter] = useState('all')
  const [pubYear,   setPubYear]   = useState('all')
  const [tocOpen,   setTocOpen]   = useState(false)
  const observerRef = useRef(null)

  useEffect(() => {
    const ids      = TOC_SECTIONS.map(s => s.id)
    const elements = ids.map(id => document.getElementById(id)).filter(Boolean)

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-10% 0px -60% 0px', threshold: 0 }
    )
    elements.forEach(el => observerRef.current.observe(el))
    return () => observerRef.current?.disconnect()
  }, [])

  const allYears = [...new Set(
    Object.values(publications).flat().map(p => p.year)
  )].sort((a, b) => b - a)

  const filteredPubs = (category) => {
    const list = category === 'all'
      ? Object.entries(publications).flatMap(([cat, items]) =>
          items.map(item => ({ ...item, _cat: cat }))
        )
      : publications[category] ?? []
    return pubYear === 'all' ? list : list.filter(p => p.year === pubYear)
  }

  const showAllPubs = pubFilter === 'all' && pubYear === 'all'

  const handleTocClick = (id) => {
    setTocOpen(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const TocNav = ({ onLinkClick }) => (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {TOC_SECTIONS.map(({ id, label, indent }) => {
        const isActive = activeId === id
        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={e => {
              e.preventDefault()
              onLinkClick?.(id)
            }}
            style={{
              display:       'block',
              fontFamily:    'var(--font-body)',
              fontWeight:    !indent ? 700 : 400,
              fontSize:      !indent ? 'var(--text-md)' : 'var(--text-sm)',
              letterSpacing: '0.05em',
              color:         isActive ? '#c94f35' : (indent ? '#777' : '#1a1a1a'),
              padding:       indent ? '3px 0 3px 14px' : '6px 0',
              borderLeft:    isActive ? '3px solid #c94f35' : '3px solid transparent',
              paddingLeft:   indent
                ? (isActive ? '11px' : '14px')
                : (isActive ? '5px' : '0'),
              transition:    'color 0.15s, border-color 0.15s',
            }}
          >
            {label}
          </a>
        )
      })}
    </nav>
  )

  return (
    <>
      <Modal item={modal} onClose={() => setModal(null)} />

      <div style={{ display: 'flex', minHeight: '100vh' }}>

        {/* ── Desktop Sidebar ── */}
        <aside className="work-sidebar">
          <h1 className="work-sidebar__heading">WORK</h1>
          <TocNav onLinkClick={(id) => {
            setTimeout(() => {
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }, 50)
          }} />
          <div className="social-links dark" style={{ marginTop: '36px' }}>
            {Object.entries(siteConfig.links).map(([key, url]) => (
              <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="dark">
                {key}
              </a>
            ))}
            <span className="email dark">{siteConfig.email}</span>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main style={{ flex: 1, minWidth: 0 }}>

          {/* Mobile TOC toggle */}
          <button
            className="toc-toggle"
            onClick={() => setTocOpen(o => !o)}
            aria-expanded={tocOpen}
            aria-label="Table of contents"
          >
            <span>
              {TOC_SECTIONS.find(s => s.id === activeId)?.label ?? 'WORK'}
            </span>
            <span style={{ fontSize: '0.8rem', flexShrink: 0 }}>{tocOpen ? '▲' : '▼'}</span>
          </button>

          {/* Mobile TOC dropdown */}
          {tocOpen && (
            <div style={{
              backgroundColor: '#e8e6e0',
              padding:         '16px 20px 20px',
              borderBottom:    '2px solid #1a1a1a',
            }}>
              <TocNav onLinkClick={handleTocClick} />
            </div>
          )}

          {/* RESEARCH */}
          <section>
            <div id="research" style={{ scrollMarginTop: '80px' }}>
              <SectionBanner label="RESEARCH" color="#c94f35" />
            </div>
            {researchProjects.map((item, i) => (
              <ResearchCard key={item.id} item={item} onClick={setModal} colorIndex={i} />
            ))}
          </section>

          {/* PUBLICATIONS */}
          <section>
            <div id="publications" style={{ scrollMarginTop: '80px' }}>
              <SectionBanner label="PUBLICATIONS" color="#8a7d3a" />
            </div>

            {/* Filter bar */}
            <div className="pub-filter-bar">
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {PUB_CATEGORIES.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setPubFilter(key)}
                    style={{
                      fontFamily:      'var(--font-body)',
                      fontWeight:      700,
                      fontSize:        'var(--text-xs)',
                      letterSpacing:   '0.1em',
                      textTransform:   'uppercase',
                      padding:         '5px 12px',
                      backgroundColor: pubFilter === key ? '#1a1a1a' : 'transparent',
                      color:           pubFilter === key ? '#f0eeea' : '#777',
                      border:          '1px solid',
                      borderColor:     pubFilter === key ? '#1a1a1a' : '#ccc',
                      transition:      'all 0.15s',
                      cursor:          'pointer',
                    }}
                    onMouseEnter={e => {
                      if (pubFilter !== key) {
                        e.currentTarget.style.borderColor = '#1a1a1a'
                        e.currentTarget.style.color = '#1a1a1a'
                      }
                    }}
                    onMouseLeave={e => {
                      if (pubFilter !== key) {
                        e.currentTarget.style.borderColor = '#ccc'
                        e.currentTarget.style.color = '#777'
                      }
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <select
                value={pubYear}
                onChange={e => setPubYear(e.target.value)}
                style={{
                  fontFamily:      'var(--font-body)',
                  fontSize:        'var(--text-xs)',
                  letterSpacing:   '0.08em',
                  padding:         '5px 10px',
                  border:          '1px solid #ccc',
                  backgroundColor: 'transparent',
                  color:           '#555',
                  cursor:          'pointer',
                  marginLeft:      'auto',
                  minWidth:        '110px',
                }}
              >
                <option value="all">All years</option>
                {allYears.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <div className="content-pad">
              {showAllPubs ? (
                <>
                  <SubBanner id="peer" label="Peer-reviewed articles" />
                  {publications.peer.map((item, i) => <PublicationItem key={i} item={item} />)}

                  <SubBanner id="chapters" label="Chapters in edited volumes" />
                  {publications.chapters.map((item, i) => <PublicationItem key={i} item={item} />)}

                  <SubBanner id="reviews" label="Book & conference reviews" />
                  {publications.reviews.map((item, i) => <PublicationItem key={i} item={item} />)}

                  <SubBanner id="public" label="Public scholarship" />
                  {publications.public.map((item, i) => <PublicationItem key={i} item={item} />)}
                </>
              ) : (
                <>
                  <span id="peer"     style={{ display: 'block', scrollMarginTop: '80px' }} />
                  <span id="chapters" style={{ display: 'block' }} />
                  <span id="reviews"  style={{ display: 'block' }} />
                  <span id="public"   style={{ display: 'block' }} />
                  {filteredPubs(pubFilter).length === 0 ? (
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize:   'var(--text-sm)',
                      color:      '#999',
                      padding:    '32px 0',
                      textAlign:  'center',
                    }}>Tidak ada hasil untuk filter ini.</p>
                  ) : (
                    filteredPubs(pubFilter).map((item, i) => (
                      <PublicationItem key={i} item={item} />
                    ))
                  )}
                </>
              )}
            </div>
          </section>

          {/* TEACHING */}
          <section>
            <div id="teaching" style={{ scrollMarginTop: '80px' }}>
              <SectionBanner label="TEACHING" color="#6b1f3a" />
            </div>
            {teaching.lectured.map((item, i) => (
              <ResearchCard key={item.id} item={item} onClick={setModal} colorIndex={i + 2} />
            ))}
            <div className="content-pad">
              <SubBanner id="lectured" label="Lectured courses" />
              <SubBanner id="guest"   label="Guest seminars and workshops" />
              {teaching.guest.map((item, i) => (
                <PublicationItem key={i} item={item} />
              ))}
            </div>
          </section>

        </main>
      </div>
    </>
  )
}

function SectionBanner({ label, color }) {
  return (
    <div className="section-banner" style={{ backgroundColor: color }}>
      <h2 style={{
        fontFamily:    'var(--font-display)',
        fontSize:      'clamp(1.8rem, 4vw, 3rem)',
        color:         '#f0eeea',
        letterSpacing: '0.04em',
        lineHeight:    1,
      }}>{label}</h2>
    </div>
  )
}

function SubBanner({ id, label }) {
  return (
    <p
      id={id}
      style={{
        fontFamily:      'var(--font-body)',
        fontWeight:      700,
        fontSize:        'var(--text-xs)',
        letterSpacing:   '0.14em',
        textTransform:   'uppercase',
        color:           '#777',
        marginTop:       '32px',
        marginBottom:    '8px',
        paddingBottom:   '6px',
        borderBottom:    '2px solid #1a1a1a',
        scrollMarginTop: '90px',
      }}
    >{label}</p>
  )
}
