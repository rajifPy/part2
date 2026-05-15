'use client'

import { useEffect, useRef, useState } from 'react'

export function TextReveal({
  text       = '',
  tag        = 'p',
  delay      = 0,
  stagger    = 60,
  threshold  = 0.15,
  className  = '',
  style      = {},
  once       = true,
}) {
  const containerRef = useRef(null)
  const [revealed, setRevealed]   = useState([])   // index kata yang sudah muncul
  const [started, setStarted]     = useState(false)
  const timersRef = useRef([])

  const words = text.split(' ').filter(Boolean)

  // Cleanup semua timer saat unmount
  useEffect(() => {
    return () => timersRef.current.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (once) io.disconnect()
          setStarted(true)
          setRevealed([])

          // Stagger reveal per kata
          timersRef.current.forEach(clearTimeout)
          timersRef.current = []

          words.forEach((_, i) => {
            const t = setTimeout(() => {
              setRevealed(prev => [...prev, i])
            }, delay + i * stagger)
            timersRef.current.push(t)
          })
        } else if (!once) {
          // Reset jika bisa reveal ulang
          setStarted(false)
          setRevealed([])
          timersRef.current.forEach(clearTimeout)
        }
      },
      { threshold }
    )

    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay, stagger, threshold, once])

  const Tag = tag

  return (
    <>
      <style>{`
        .tr-word {
          display: inline-block;
          overflow: hidden;
          /* Bungkus tiap kata agar animasi tidak merusak layout */
          vertical-align: top;
          margin-right: 0.3em;
          line-height: inherit;
        }
        .tr-inner {
          display: inline-block;
          transform: translateY(110%);
          opacity: 0;
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
                      opacity   0.4s  ease;
          will-change: transform, opacity;
        }
        .tr-inner.visible {
          transform: translateY(0%);
          opacity: 1;
        }
        @media (prefers-reduced-motion: reduce) {
          .tr-inner        { transform: none !important; }
          .tr-inner.visible{ opacity: 1 !important; transition: none !important; }
        }
      `}</style>

      <Tag ref={containerRef} className={className} style={{ ...style, lineHeight: style.lineHeight ?? 1.75 }}>
        {words.map((word, i) => (
          <span key={i} className="tr-word">
            <span className={`tr-inner${revealed.includes(i) ? ' visible' : ''}`}>
              {word}
            </span>
          </span>
        ))}
      </Tag>
    </>
  )
}

/**
 * useTextReveal — hook versi headless (untuk kasus custom)
 *
 * Returns: [containerRef, revealedIndices, words]
 */
export function useTextReveal(text = '', { delay = 0, stagger = 60, threshold = 0.15, once = true } = {}) {
  const containerRef = useRef(null)
  const [revealed, setRevealed] = useState([])
  const timersRef = useRef([])

  const words = text.split(' ').filter(Boolean)

  useEffect(() => {
    return () => timersRef.current.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (once) io.disconnect()
          setRevealed([])
          timersRef.current.forEach(clearTimeout)
          timersRef.current = []

          words.forEach((_, i) => {
            const t = setTimeout(() => {
              setRevealed(prev => [...prev, i])
            }, delay + i * stagger)
            timersRef.current.push(t)
          })
        } else if (!once) {
          setRevealed([])
          timersRef.current.forEach(clearTimeout)
        }
      },
      { threshold }
    )

    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay, stagger, threshold, once])

  return [containerRef, revealed, words]
}
