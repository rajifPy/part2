'use client'

import { siteConfig } from '@/data/config'

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#1a1a1a',
      color:           '#f0eeea',
      padding:         '32px 40px',
      display:         'flex',
      justifyContent:  'space-between',
      alignItems:      'center',
      flexWrap:        'wrap',
      gap:             '16px',
      fontFamily:      'var(--font-body)',
      fontSize:        'var(--text-xs)',
      letterSpacing:   '0.1em',
      textTransform:   'uppercase',
    }}>
      <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap', alignItems: 'center' }}>
        {Object.entries(siteConfig.links).map(([key, url]) => (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color:      'rgba(240,238,234,0.6)',
              transition: 'color var(--transition-base)',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#f0eeea'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,238,234,0.6)'}
          >
            {key}
          </a>
        ))}
        <span style={{ color: 'rgba(240,238,234,0.6)' }}>{siteConfig.email}</span>
      </div>
      <span style={{ color: 'rgba(240,238,234,0.4)' }}>© {new Date().getFullYear()}</span>
    </footer>
  )
}
