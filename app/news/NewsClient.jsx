'use client'

import { newsItems } from '@/data/news'

export default function NewsClient() {
  return (
    <div className="page-layout">

      {/* Sidebar kiri — pink */}
      <aside
        className="page-sidebar page-sidebar--sticky"
        style={{ backgroundColor: '#e8a8c0' }}
      >
        <h1 className="sidebar-heading sidebar-heading--dark">NEWS</h1>
      </aside>

      {/* Konten kanan */}
      <main className="page-main">
        <div className="name-bar">
          <p>Latest updates</p>
        </div>

        <div className="content-pad">
          {newsItems.map((item, i) => (
            <NewsRow key={i} item={item} />
          ))}
        </div>
      </main>
    </div>
  )
}

function NewsRow({ item }) {
  const Tag = item.url ? 'a' : 'div'
  const linkProps = item.url
    ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Tag
      {...linkProps}
      className={`row-item${item.url ? ' clickable' : ''}`}
    >
      <div>
        <p style={{
          fontFamily:    'var(--font-body)',
          fontWeight:    700,
          fontSize:      'var(--text-xs)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color:         '#555',
        }}>{item.type}</p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize:   'var(--text-xs)',
          color:      '#999',
          marginTop:  '4px',
        }}>{item.date}</p>
      </div>

      <div>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          fontSize:   '0.95rem',
          lineHeight: 1.5,
        }}>{item.title}</p>
        {item.location && (
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize:   'var(--text-xs)',
            color:      '#888',
            marginTop:  '4px',
          }}>{item.location}</p>
        )}
      </div>

      {item.url && (
        <span style={{
          fontFamily:    'var(--font-body)',
          fontWeight:    700,
          fontSize:      'var(--text-xs)',
          color:         '#c94f35',
          letterSpacing: '0.08em',
          whiteSpace:    'nowrap',
          alignSelf:     'center',
        }}>
          READ →
        </span>
      )}
    </Tag>
  )
}
