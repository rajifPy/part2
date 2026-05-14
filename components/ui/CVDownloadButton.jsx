'use client'

import { useState, useCallback } from 'react

const STEPS = [
  { pct: 15, label: 'Menyiapkan file...',    ms: 320 },
  { pct: 40, label: 'Memuat data CV...',      ms: 480 },
  { pct: 72, label: 'Membuat dokumen PDF...', ms: 560 },
  { pct: 91, label: 'Hampir selesai...',      ms: 380 },
  { pct: 100, label: 'Selesai!',              ms: 240 },
]

export default function CVDownloadButton({ filePath = '/cv-nafisah.pdf', fileName = 'CV-Zumrotun-Nafisah.pdf' }) {
  const [phase, setPhase]     = useState('idle')   // idle | loading | done
  const [progress, setProgress] = useState(0)
  const [label, setLabel]     = useState('Menyiapkan file...')

  const handleClick = useCallback(() => {
    if (phase !== 'idle') return
    setPhase('loading')
    setProgress(0)

    let i = 0
    let elapsed = 0

    const tick = () => {
      if (i >= STEPS.length) {
        // Trigger actual download
        const a = document.createElement('a')
        a.href     = filePath
        a.download = fileName
        a.click()

        setPhase('done')
        setTimeout(() => {
          setPhase('idle')
          setProgress(0)
          setLabel('Menyiapkan file...')
        }, 2800)
        return
      }
      const s = STEPS[i]
      setProgress(s.pct)
      setLabel(s.label)
      elapsed += s.ms
      i++
      setTimeout(tick, s.ms)
    }
    setTimeout(tick, 180)
  }, [phase, filePath, fileName])

  // ── Style states ──────────────────────────────────────────
  const isLoading = phase === 'loading'
  const isDone    = phase === 'done'

  const btnBg = isDone
    ? '#1a1a1a'
    : isLoading
      ? '#a03a24'   // lebih gelap saat loading
      : '#c94f35'

  return (
    <>
      <style>{`
        @keyframes cv-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes cv-ripple {
          from { transform: translate(-50%, -50%) scale(0); opacity: 0.3; }
          to   { transform: translate(-50%, -50%) scale(3);  opacity: 0; }
        }
        @keyframes cv-fadeslide {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cv-dl-btn {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          font-family: var(--font-body); font-weight: 700;
          font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: #f0eeea; border: 2px solid #1a1a1a;
          padding: 13px 26px; width: 100%;
          cursor: pointer; transition: box-shadow 0.15s, transform 0.12s, background-color 0.2s;
          box-shadow: 4px 4px 0 #1a1a1a;
        }
        .cv-dl-btn:not(:disabled):hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 #1a1a1a;
        }
        .cv-dl-btn:not(:disabled):active {
          transform: translate(1px, 1px);
          box-shadow: 2px 2px 0 #1a1a1a;
        }
        .cv-dl-btn:disabled { cursor: default; }
        .cv-dl-spin { animation: cv-spin 0.75s linear infinite; }
        .cv-dl-ripple {
          position: absolute; top: 50%; left: 50%;
          width: 12px; height: 12px; border-radius: 50%;
          background: rgba(240,238,234,0.35);
          animation: cv-ripple 0.55s ease-out forwards;
          pointer-events: none;
        }
        .cv-dl-done-msg {
          display: flex; align-items: center; gap: 10px; margin-top: 10px;
          animation: cv-fadeslide 0.4s ease both;
        }
        .cv-dl-progress-wrap {
          margin-top: 10px;
          animation: cv-fadeslide 0.3s ease both;
        }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column' }}>

        {/* ── Tombol utama ── */}
        <button
          className="cv-dl-btn"
          onClick={handleClick}
          disabled={isLoading || isDone}
          style={{ backgroundColor: btnBg }}
          aria-label="Download CV PDF"
        >
          {/* Ripple saat klik */}
          {isLoading && <span key={Date.now()} className="cv-dl-ripple" aria-hidden="true" />}

          {/* Icon */}
          {isDone ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          ) : isLoading ? (
            <svg className="cv-dl-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          )}

          {/* Label */}
          {isDone ? 'Berhasil Diunduh!' : isLoading ? 'Mengunduh...' : 'Download CV'}
        </button>

        {/* ── Progress bar (muncul saat loading) ── */}
        {isLoading && (
          <div className="cv-dl-progress-wrap">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.6rem',
                color: '#888', letterSpacing: '0.06em',
              }}>{label}</span>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.6rem',
                fontWeight: 700, color: '#c94f35',
              }}>{progress}%</span>
            </div>
            <div style={{ height: '3px', background: '#e0ddd7', overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${progress}%`,
                background: 'linear-gradient(to right, #c94f35, #6b1f3a)',
                transition: 'width 0.25s ease',
              }} />
            </div>
          </div>
        )}

        {/* ── Done message ── */}
        {isDone && (
          <div className="cv-dl-done-msg">
            <div style={{
              width: '22px', height: '22px', borderRadius: '50%',
              background: '#1a1a1a', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#f0eeea" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.68rem',
              color: '#555', letterSpacing: '0.04em',
            }}>CV tersimpan di folder Unduhan kamu.</span>
          </div>
        )}

      </div>
    </>
  )
}
