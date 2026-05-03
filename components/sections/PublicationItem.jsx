'use client'

export default function PublicationItem({ item }) {
  const Tag = item.url ? 'a' : 'div'
  const linkProps = item.url
    ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Tag
      {...linkProps}
      className={`pub-item${item.url ? ' clickable' : ''}`}
    >
      <span style={{
        fontFamily:  'var(--font-body)',
        fontWeight:  700,
        fontSize:    'var(--text-xs)',
        color:       '#999',
        flexShrink:  0,
        paddingTop:  '2px',
      }}>
        {item.year}
      </span>
      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}>
        {item.citation}
      </span>
      {item.url && (
        <span style={{
          fontFamily:    'var(--font-body)',
          fontWeight:    700,
          fontSize:      'var(--text-xs)',
          color:         '#c94f35',
          flexShrink:    0,
          letterSpacing: '0.08em',
        }}>
          READ →
        </span>
      )}
    </Tag>
  )
}
