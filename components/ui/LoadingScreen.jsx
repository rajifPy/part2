'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { usePathname } from 'next/navigation'

/**
 * LoadingScreen — dioptimasi:
 * - Semua timeout/interval disimpan dalam satu ref array agar cleanup aman
 * - Tidak ada setState setelah unmount (mencegah memory leak)
 * - Animasi font pakai CSS variable supaya rendering lebih halus
 */
export default function LoadingScreen({ name = 'Zumrotun Nafisah' }) {
  const pathname           = usePathname()
  const prevPathname       = useRef(null)
  const [show, setShow]    = useState(false)
  const [visibleChars, setVisibleChars] = useState(0)
  const [revealing, setRevealing]       = useState(false)
  const timersRef          = useRef([])   // kumpulan semua timer
  const mountedRef         = useRef(true) // cegah setState setelah unmount

  const displayName = name.toUpperCase()
  const total       = displayName.length

  // Helper: tambah timeout dengan auto-cleanup
  const addTimer = useCallback((fn, ms, isInterval = false) => {
    const id = isInterval ? setInterval(fn, ms) : setTimeout(fn, ms)
    timersRef.current.push({ id, isInterval })
    return id
  }, [])

  const clearAll = useCallback(() => {
    timersRef.current.forEach(({ id, isInterval }) => {
      isInterval ? clearInterval(id) : clearTimeout(id)
    })
    timersRef.current = []
  }, [])

  const runAnimation = useCallback(() => {
    if (!mountedRef.current) return
    clearAll()
    setRevealing(false)
    setVisibleChars(0)
    setShow(true)

    addTimer(() => {
      let i = 0
      const interval = setInterval(() => {
        if (!mountedRef.current) { clearInterval(interval); return }
        i++
        setVisibleChars(i)
        if (i >= total) {
          clearInterval(interval)
          addTimer(() => {
            if (!mountedRef.current) return
            setRevealing(true)
            addTimer(() => {
              if (!mountedRef.current) return
              setShow(false)
              setRevealing(false)
            }, 700)
          }, 300)
        }
      }, 65)          // 65ms per karakter — sedikit lebih cepat dari 70ms
      timersRef.current.push({ id: interval, isInterval: true })
    }, 80)
  }, [total, clearAll, addTimer])

  // Mount pertama kali
  useEffect(() => {
    prevPathname.current = pathname
    runAnimation()
    return () => {
      mountedRef.current = false
      clearAll()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Route change
  useEffect(() => {
    if (prevPathname.current === null) return
    if (prevPathname.current === pathname) return
    prevPathname.current = pathname
    mountedRef.current   = true
    runAnimation()
  }, [pathname, runAnimation])

  if (!show) return null

  return (
    <>
      <style>{`
        @keyframes revealUp {
          from { transform: translateY(0); }
          to   { transform: translateY(-100%); }
        }
        .kl-loading {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: all;
          /* GPU layer hint */
          will-change: transform;
          contain: strict;
        }
        .kl-loading.revealing {
          animation: revealUp 0.65s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        .kl-text {
          font-family: 'Work Sans', 'Helvetica Neue', sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.22em;
          color: rgba(240, 238, 234, 0.9);
          text-transform: uppercase;
          white-space: nowrap;
          user-select: none;
        }
        .kl-cursor {
          display: inline-block;
          width: 1px;
          height: 11px;
          background: rgba(240, 238, 234, 0.6);
          margin-left: 2px;
          vertical-align: middle;
          animation: klBlink 0.8s step-end infinite;
        }
        @keyframes klBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .kl-loading.revealing { animation: none; opacity: 0; }
          .kl-cursor            { animation: none; }
        }
      `}</style>

      <div className={`kl-loading${revealing ? ' revealing' : ''}`} aria-live="polite" aria-label="Memuat halaman">
        <p className="kl-text">
          {displayName.slice(0, visibleChars)}
          {!revealing && visibleChars < total && (
            <span className="kl-cursor" aria-hidden="true" />
          )}
        </p>
      </div>
    </>
  )
}
