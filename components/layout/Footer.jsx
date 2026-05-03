'use client'

import { siteConfig } from '@/data/config'

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#1a1a1a',
      color:           '#f0eeea',
      padding:         '28px clamp(20px, 4vw, 40px)',
      display:         'flex',
      justifyContent:  'space-between',
      alignItems:      'center',
      flexWrap:        'wrap',
      gap:             '12px',
      fontFamily:      'var(--font-body)',
      fontSize:        'var(--text-xs)',
      letterSpacing:   '0.1em',
      textTransform:   'uppercase',
    }}>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
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
        <span style={{ color: 'rgba(240,238,234,0.5)' }}>{siteConfig.email}</span>
      </div>
      <span style={{ color: 'rgba(240,238,234,0.4)' }}>© {new Date().getFullYear()}</span>
    </footer>
  )
}
