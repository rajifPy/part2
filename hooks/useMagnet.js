'use client'

import { useRef, useCallback } from 'react'

export function useMagnet({ strength = 0.35, ease = 0.12 } = {}) {
  const ref    = useRef(null)
  const rafRef = useRef(null)
  const target = useRef({ x: 0, y: 0 })
  const cur    = useRef({ x: 0, y: 0 })
  const active = useRef(false)

  const tick = useCallback(() => {
    if (!active.current || !ref.current) return

    cur.current.x += (target.current.x - cur.current.x) * ease
    cur.current.y += (target.current.y - cur.current.y) * ease

    ref.current.style.transform = `translate(${cur.current.x}px, ${cur.current.y}px)`

    rafRef.current = requestAnimationFrame(tick)
  }, [ease])

  const onMouseEnter = useCallback((e) => {
    active.current = true
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(tick)
  }, [tick])

  const onMouseMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx   = rect.left + rect.width  / 2
    const cy   = rect.top  + rect.height / 2
    target.current = {
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    }
  }, [strength])

  const onMouseLeave = useCallback(() => {
    active.current     = false
    target.current     = { x: 0, y: 0 }
    cancelAnimationFrame(rafRef.current)

    // Spring balik ke posisi semula
    const spring = () => {
      if (!ref.current) return
      cur.current.x += (0 - cur.current.x) * 0.10
      cur.current.y += (0 - cur.current.y) * 0.10
      ref.current.style.transform = `translate(${cur.current.x}px, ${cur.current.y}px)`

      if (Math.abs(cur.current.x) > 0.1 || Math.abs(cur.current.y) > 0.1) {
        rafRef.current = requestAnimationFrame(spring)
      } else {
        cur.current = { x: 0, y: 0 }
        if (ref.current) ref.current.style.transform = 'translate(0px, 0px)'
      }
    }
    rafRef.current = requestAnimationFrame(spring)
  }, [])

  return {
    ref,
    handlers: { onMouseEnter, onMouseMove, onMouseLeave },
  }
}

/**
 * MagneticWrapper — bungkus komponen apapun dengan efek magnet
 *
 * Contoh:
 *   <MagneticWrapper strength={0.4}>
 *     <button className="home-btn-primary">Tentang Saya →</button>
 *   </MagneticWrapper>
 */
export function MagneticWrapper({ children, strength = 0.35, style = {}, className = '' }) {
  const { ref, handlers } = useMagnet({ strength })

  return (
    <span
      ref={ref}
      {...handlers}
      style={{ display: 'inline-block', ...style }}
      className={className}
    >
      {children}
    </span>
  )
}
