'use client'

import { siteConfig } from '@/data/config'

/*
  Peta nama link → ikon SVG inline.
  Tambahkan key baru di sini jika siteConfig.links bertambah.
  Key harus cocok (case-insensitive) dengan key di siteConfig.links.
*/
const ICONS = {
  orcid: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" fill="currentColor" opacity="0.15"/>
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.44 5.5h-.92V7h.92v.5zm0 1.5h-.92v6h.92V9zm2.24-.1c1.94 0 3.2 1.32 3.2 3.1 0 1.8-1.28 3.1-3.22 3.1H11V9h1.8zm0 5.28c1.32 0 2.24-.86 2.24-2.18 0-1.3-.9-2.18-2.24-2.18H12v4.36h.8z" fill="currentColor"/>
    </svg>
  ),
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  twitter: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 4l16 16M4 20L20 4" stroke="none"/>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
    </svg>
  ),
  instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
    </svg>
  ),
  youtube: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  /* Fallback — globe icon untuk link yang tidak dikenali */
  default: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

function getIcon(key) {
  return ICONS[key.toLowerCase()] ?? ICONS.default
}

export default function Footer() {
  const links = Object.entries(siteConfig.links)

  return (
    <footer style={{
      backgroundColor: '#1a1a1a',
      padding:         '24px clamp(16px, 4vw, 40px)',
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'center',
      gap:             '4px',
      flexWrap:        'wrap',
    }}>
      <style>{`
        .footer-icon-btn {
          display:         flex;
          align-items:     center;
          justify-content: center;
          width:           44px;
          height:          44px;
          color:           rgba(240,238,234,0.35);
          border:          1.5px solid transparent;
          border-radius:   2px;
          transition:      color 0.15s, border-color 0.15s;
          position:        relative;
        }
        .footer-icon-btn:hover {
          color:        #f0eeea;
          border-color: rgba(240,238,234,0.2);
        }
        .footer-icon-btn::after {
          content:       attr(data-label);
          position:      absolute;
          bottom:        calc(100% + 6px);
          left:          50%;
          transform:     translateX(-50%);
          font-family:   'Work Sans', sans-serif;
          font-weight:   700;
          font-size:     0.55rem;
          letter-spacing:0.14em;
          text-transform:uppercase;
          color:         rgba(240,238,234,0.6);
          background:    #2a2a2a;
          padding:       4px 8px;
          white-space:   nowrap;
          opacity:       0;
          pointer-events:none;
          transition:    opacity 0.15s;
        }
        .footer-icon-btn:hover::after {
          opacity: 1;
        }

        /* Thin separator between icons */
        .footer-sep {
          width:            1px;
          height:           20px;
          background:       rgba(240,238,234,0.08);
          flex-shrink:      0;
          margin:           0 4px;
        }
      `}</style>

      {links.map(([key, url], i) => (
        <span key={key} style={{ display: 'flex', alignItems: 'center' }}>
          {i > 0 && <span className="footer-sep" aria-hidden="true" />}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon-btn"
            data-label={key}
            aria-label={key}
          >
            {getIcon(key)}
          </a>
        </span>
      ))}
    </footer>
  )
}
