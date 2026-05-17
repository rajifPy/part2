'use client'

import { siteConfig } from '@/data/config'

const SOCIAL_LINKS = [
  {
    key: 'instagram',
    label: 'Instagram',
    href: siteConfig.links.instagram ?? '#',
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>),
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: siteConfig.links.linkedin ?? '#',
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>),
  },
  {
    key: 'email',
    label: 'Email',
    href: `mailto:${siteConfig.email}`,
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>),
  },
  {
    key: 'youtube',
    label: 'YouTube',
    href: siteConfig.links.youtube ?? '#',
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/></svg>),
  },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1a1a1a', padding: '32px clamp(16px, 4vw, 40px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <style>{`
        .footer-icon-btn { display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 6px; width: 64px; color: rgba(240,238,234,0.35); transition: color 0.15s; }
        .footer-icon-btn:hover { color: #f0eeea; }
        .footer-icon-circle { width: 44px; height: 44px; border-radius: 50%; border: 1.5px solid currentColor; display: flex; align-items: center; justify-content: center; transition: background-color 0.15s; }
        .footer-icon-btn:hover .footer-icon-circle { background-color: rgba(240,238,234,0.08); }
        .footer-icon-btn--instagram:hover { color: #e1306c; }
        .footer-icon-btn--linkedin:hover { color: #0a66c2; }
        .footer-icon-btn--email:hover { color: #c94f35; }
        .footer-icon-btn--youtube:hover { color: #ff0000; }
        .footer-icon-label { font-family: 'Work Sans', sans-serif; font-weight: 700; font-size: 0.52rem; letter-spacing: 0.14em; text-transform: uppercase; }
        .footer-sep { width: 1px; height: 32px; background: rgba(240,238,234,0.08); flex-shrink: 0; }
        .footer-icons-row { display: flex; align-items: center; gap: 8px; }
        .footer-copy { font-family: 'Work Sans', sans-serif; font-size: 0.58rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(240,238,234,0.2); }

        /* Override warna ThemeToggle label agar cocok di footer gelap */
        .footer-theme-wrap .tt-label { color: rgba(240,238,234,0.4) !important; }
        .footer-theme-wrap .tt-label:hover { color: rgba(240,238,234,0.7) !important; }
      `}</style>

      {/* Social icons */}
      <div className="footer-icons-row">
        {SOCIAL_LINKS.map((s, i) => (
          <span key={s.key} style={{ display: 'flex', alignItems: 'center' }}>
            {i > 0 && <span className="footer-sep" style={{ marginRight: '8px' }} />}
            <a
              href={s.href}
              target={s.key === 'email' ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className={`footer-icon-btn footer-icon-btn--${s.key}`}
              aria-label={s.label}
            >
              <div className="footer-icon-circle">{s.icon}</div>
              <span className="footer-icon-label">{s.label}</span>
            </a>
          </span>
        ))}
      </div>

      {/* Divider tipis */}
      <div style={{ width: '100%', maxWidth: '320px', height: '1px', background: 'rgba(240,238,234,0.08)' }} />

      {/* Copyright */}
      <p className="footer-copy">
        © {new Date().getFullYear()} {siteConfig.name} — editor @murfhi
      </p>
    </footer>
  )
}
