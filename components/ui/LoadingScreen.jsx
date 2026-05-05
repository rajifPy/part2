'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function LoadingScreen({ name = 'Dendi Yusuf' }) {
  const pathname           = usePathname()
  const prevPathname       = useRef(null)
  const [show, setShow]    = useState(false)
  const [visibleChars, setVisibleChars] = useState(0)
  const [revealing, setRevealing]       = useState(false)
  const intervalRef        = useRef(null)
  const timeoutsRef        = useRef([])

  const displayName = name.toUpperCase()
  const total       = displayName.length

  const addTimeout = (fn, ms) => {
    const id = setTimeout(fn, ms)
    timeoutsRef.current.push(id)
    return id
  }

  const clearAll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }

  const runAnimation = () => {
    clearAll()
    setRevealing(false)
    setVisibleChars(0)
    setShow(true)

    addTimeout(() => {
      let i = 0
      intervalRef.current = setInterval(() => {
        i++
        setVisibleChars(i)
        if (i >= total) {
          clearInterval(intervalRef.current)
          addTimeout(() => {
            setRevealing(true)
            addTimeout(() => {
              setShow(false)
              setRevealing(false)
            }, 700)
          }, 300)
        }
      }, 70)
    }, 80)
  }

  useEffect(() => {
    prevPathname.current = pathname
    runAnimation()
    return clearAll
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (prevPathname.current === null) return
    if (prevPathname.current === pathname) return
    prevPathname.current = pathname
    runAnimation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

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
          will-change: transform;
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
      `}</style>

      <div className={`kl-loading${revealing ? ' revealing' : ''}`}>
        <p className="kl-text">
          {displayName.slice(0, visibleChars)}
          {!revealing && visibleChars < total && (
            <span className="kl-cursor" />
          )}
        </p>
      </div>
    </>
  )
}
