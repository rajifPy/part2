'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

export default function ThemeToggle() {
  const { isDark, toggle } = useTheme()
  const trackRef = useRef(null)

  const triggerRipple = () => {
    const track = trackRef.current
    if (!track) return
    track.classList.add('tt-pulsed')
    setTimeout(() => track.classList.remove('tt-pulsed'), 600)
  }

  const handleToggle = () => {
    triggerRipple()
    toggle()
  }

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'd' || e.key === 'D') {
        triggerRipple()
        toggle()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [toggle])

  return (
    <>
      <style>{`
        .tt-toggle {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          user-select: none;
        }
        .tt-track {
          position: relative;
          width: 48px;
          height: 24px;
          border-radius: 12px;
          background: #1e1e16;
          border: 2px solid #3a3a28;
          transition: background .35s ease, border-color .35s ease;
          flex-shrink: 0;
          overflow: visible;
        }
        .tt-track.light-mode {
          background: #f0eeea;
          border-color: #d0cec8;
        }
        .tt-thumb {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #c94f35;
          transition: transform .38s cubic-bezier(.34,1.56,.64,1), background .35s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tt-track.light-mode .tt-thumb {
          transform: translateX(24px);
          background: #8a7d3a;
        }
        .tt-icon {
          width: 10px;
          height: 10px;
          stroke: #f0eeea;
          fill: none;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .tt-label {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: rgba(240,238,234,.6);
          min-width: 36px;
        }
        .tt-track::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 16px;
          opacity: 0;
          pointer-events: none;
        }
        .tt-track:not(.light-mode)::after { box-shadow: 0 0 0 3px rgba(201,79,53,.3); }
        .tt-track.light-mode::after       { box-shadow: 0 0 0 3px rgba(138,125,58,.3); }
        .tt-pulsed::after { animation: ttRipple .5s ease forwards; }
        @keyframes ttRipple { from { opacity:1; } to { opacity:0; } }
      `}</style>

      <button
        className="tt-toggle"
        onClick={handleToggle}
        aria-label="Toggle dark/light mode"
        aria-pressed={isDark}
        title="Toggle tema (tekan D)"
      >
        <div className={`tt-track${isDark ? '' : ' light-mode'}`} ref={trackRef}>
          <div className="tt-thumb">
            <svg className="tt-icon" viewBox="0 0 24 24" aria-hidden="true">
              {isDark
                ? <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                : <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 5a7 7 0 100 14A7 7 0 0012 5z" fill="none"/>
              }
            </svg>
          </div>
        </div>
        <span className="tt-label">{isDark ? 'Dark' : 'Light'}</span>
      </button>
    </>
  )
}
