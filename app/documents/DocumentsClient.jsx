'use client'

const documents = [
  {
    year:        '2024',
    type:        'CV',
    title:       'Curriculum Vitae',
    description: 'Updated 2024',
    url:         null,
  },
  {
    year:        '2024',
    type:        'Syllabus',
    title:       'Judul Mata Kuliah — Silabus',
    description: 'Semester Ganjil 2024/2025',
    url:         null,
  },
]

export default function DocumentsClient() {
  return (
    <div className="page-layout">
      <aside
        className="page-sidebar page-sidebar--sticky"
        style={{ backgroundColor: '#6b1f3a' }}
      >
        <h1 className="sidebar-heading">DOCU-<br/>MENTS</h1>
      </aside>

      <main className="page-main">
        <div className="name-bar">
          <p>Downloads &amp; resources</p>
        </div>

        <div className="content-pad">
          {documents.map((doc, i) => (
            <DocumentRow key={i} item={doc} />
          ))}
        </div>
      </main>
    </div>
  )
}

function DocumentRow({ item }) {
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
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color:         '#555',
        }}>{item.type}</p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize:   'var(--text-xs)',
          color:      '#999',
          marginTop:  '4px',
        }}>{item.year}</p>
      </div>

      <div>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          fontSize:   '0.95rem',
          lineHeight: 1.5,
        }}>{item.title}</p>
        {item.description && (
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize:   'var(--text-xs)',
            color:      '#888',
            marginTop:  '4px',
          }}>{item.description}</p>
        )}
      </div>

      {item.url && (
        <span style={{
          fontFamily:    'var(--font-body)',
          fontWeight:    700,
          fontSize:      'var(--text-xs)',
          color:         '#6b1f3a',
          letterSpacing: '0.1em',
        }}>
          DOWNLOAD →
        </span>
      )}
    </Tag>
  )
}
