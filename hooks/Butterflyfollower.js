'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * useButterflyGlow
 * Returns [ref, glow] where:
 *   ref  — attach to the element you want to react to the butterfly
 *   glow — 0..1 value: 1 when butterfly is right on the element, 0 when far away
 *
 * @param {{ radius?: number }} options
 *   radius — distance (px) at which glow starts (default 300)
 */
export function useButterflyGlow({ radius = 300 } = {}) {
  const ref = useRef(null)
  const [glow, setGlow] = useState(0)

  useEffect(() => {
    const handler = (e) => {
      const el = ref.current
      if (!el) return

      const { x: bx, y: by, opacity = 1 } = e.detail
      if (!opacity || opacity < 0.05) {
        setGlow(0)
        return
      }

      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2

      const dist = Math.sqrt((bx - cx) ** 2 + (by - cy) ** 2)
      const raw = Math.max(0, 1 - dist / radius)
      // Ease in — feel more dramatic close up
      const eased = raw * raw

      setGlow(eased * opacity)
    }

    window.addEventListener('butterfly:move', handler)
    return () => window.removeEventListener('butterfly:move', handler)
  }, [radius])

  return [ref, glow]
}
