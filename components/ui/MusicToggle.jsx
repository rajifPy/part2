'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

const MUSIC_SRC = '/music/opick.mp3'

export default function MusicToggle() {
  const audioRef   = useRef(null)
  const [playing, setPlaying]   = useState(false)
  const [ready, setReady]       = useState(false)
  const [loading, setLoading]   = useState(false)

  // Inisialisasi audio — lazy, hanya saat pertama klik
  const ensureAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current
    const audio = new Audio(MUSIC_SRC)
    audio.loop   = true
    audio.volume = 0.35
    audio.addEventListener('canplaythrough', () => setReady(true), { once: true })
    audioRef.current = audio
    return audio
  }, [])

  // Fade in/out volume agar transisi halus
  const fadeTo = useCallback((audio, targetVol, duration = 600) => {
    const start    = audio.volume
    const startTime = performance.now()
    const tick = (now) => {
      const t = Math.min((now - startTime) / duration, 1)
      audio.volume = start + (targetVol - start) * t
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [])

  const toggle = useCallback(async () => {
    const audio = ensureAudio()

    if (!playing) {
      setLoading(true)
      try {
        audio.volume = 0
        await audio.play()
        fadeTo(audio, 0.35)
        setPlaying(true)
      } catch {
        // autoplay blocked — still update state so user can retry
      } finally {
        setLoading(false)
      }
    } else {
      fadeTo(audio, 0, 400)
      setTimeout(() => {
        audio.pause()
        setPlaying(false)
      }, 420)
    }
  }, [playing, ensureAudio, fadeTo])

  // Cleanup saat unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  return (
    <>
      <style>{`
        .music-toggle {
          position: relative;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid rgba(240,238,234,0.3);
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          flex-shrink: 0;
        }
        .music-toggle:hover {
          border-color: rgba(240,238,234,0.6);
          background: rgba(240,238,234,0.06);
        }
        .music-toggle.is-playing {
          border-color: #c94f35;
          background: rgba(201,79,53,0.1);
        }
        .music-toggle:disabled {
          opacity: 0.5;
          cursor: default;
        }

        /* Spin ring saat playing */
        .music-spin {
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 1.5px solid transparent;
          border-top-color: #c94f35;
          opacity: 0;
          pointer-events: none;
        }
        .music-toggle.is-playing .music-spin {
          opacity: 1;
          animation: musicSpin 2.4s linear infinite;
        }
        @keyframes musicSpin {
          to { transform: rotate(360deg); }
        }

        /* Icon SVG */
        .music-icon {
          width: 16px;
          height: 16px;
          stroke: rgba(240,238,234,0.55);
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: stroke 0.2s;
          position: relative;
          z-index: 1;
        }
        .music-toggle.is-playing .music-icon {
          stroke: #c94f35;
        }

        /* Equalizer bars — hanya muncul saat playing */
        .music-eq {
          display: flex;
          align-items: flex-end;
          gap: 2px;
          height: 14px;
          position: relative;
          z-index: 1;
        }
        .music-eq-bar {
          width: 2.5px;
          background: #c94f35;
          border-radius: 1px;
          transform-origin: bottom;
        }
        .music-eq-bar:nth-child(1) { animation: meq1 0.65s ease-in-out infinite alternate; }
        .music-eq-bar:nth-child(2) { animation: meq2 0.45s ease-in-out infinite alternate; }
        .music-eq-bar:nth-child(3) { animation: meq3 0.85s ease-in-out infinite alternate; }
        .music-eq-bar:nth-child(4) { animation: meq4 0.55s ease-in-out infinite alternate; }
        @keyframes meq1 { from { height: 3px; } to { height: 12px; } }
        @keyframes meq2 { from { height: 7px; } to { height: 5px;  } }
        @keyframes meq3 { from { height: 2px; } to { height: 14px; } }
        @keyframes meq4 { from { height: 9px; } to { height: 3px;  } }

        /* Loading spinner kecil */
        @keyframes musicLoad {
          to { transform: rotate(360deg); }
        }
        .music-loader {
          width: 14px; height: 14px;
          border: 2px solid rgba(240,238,234,0.2);
          border-top-color: rgba(240,238,234,0.7);
          border-radius: 50%;
          animation: musicLoad 0.7s linear infinite;
        }

        @media (max-width: 768px) {
          .music-toggle { width: 44px; height: 44px; }
        }
      `}</style>

      <button
        className={`music-toggle${playing ? ' is-playing' : ''}`}
        onClick={toggle}
        disabled={loading}
        aria-label={playing ? 'Pause musik' : 'Putar musik'}
        title={playing ? 'Pause musik' : 'Putar musik'}
      >
        <div className="music-spin" aria-hidden="true" />

        {loading ? (
          <div className="music-loader" aria-hidden="true" />
        ) : playing ? (
          /* Equalizer bars saat playing */
          <div className="music-eq" aria-hidden="true">
            <div className="music-eq-bar" style={{ height: '6px' }} />
            <div className="music-eq-bar" style={{ height: '11px' }} />
            <div className="music-eq-bar" style={{ height: '4px' }} />
            <div className="music-eq-bar" style={{ height: '9px' }} />
          </div>
        ) : (
          /* Play icon */
          <svg className="music-icon" viewBox="0 0 24 24" aria-hidden="true">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        )}
      </button>
    </>
  )
}
