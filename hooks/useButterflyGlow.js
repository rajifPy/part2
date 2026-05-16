'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * useButterflyGlow({ radius })
 *
 * Returns [ref, { glow, relX, relY }]
 *   glow  — 0..1, intensity (1 = kupu-kupu di atas elemen)
 *   relX  — 0..1, posisi horizontal kupu-kupu relatif terhadap elemen
 *   relY  — 0..1, posisi vertikal kupu-kupu relatif terhadap elemen
 *
 * Gunakan relX/relY untuk membuat gradient yang mengikuti kupu-kupu
 * sehingga seluruh teks menyala secara merata (bukan per huruf).
 */
export function useButterflyGlow({ radius = 320 } = {}) {
  const ref = useRef(null)
  const [state, setState] = useState({ glow: 0, relX: 0.5, relY: 0.5 })

  useEffect(() => {
    const handler = (e) => {
      const el = ref.current
      if (!el) return

      const { x: bx, y: by, opacity = 1 } = e.detail

      if (!opacity || opacity < 0.05) {
        setState(s => s.glow < 0.01 ? s : { ...s, glow: 0 })
        return
      }

      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2

      const dist = Math.sqrt((bx - cx) ** 2 + (by - cy) ** 2)
      const raw = Math.max(0, 1 - dist / radius)
      const eased = raw * raw * opacity

      // posisi kupu-kupu relatif terhadap bounding box elemen (0..1)
      const relX = Math.max(0, Math.min(1, (bx - rect.left) / rect.width))
      const relY = Math.max(0, Math.min(1, (by - rect.top) / rect.height))

      setState({ glow: parseFloat(eased.toFixed(4)), relX, relY })
    }

    window.addEventListener('butterfly:move', handler)
    return () => window.removeEventListener('butterfly:move', handler)
  }, [radius])

  return [ref, state]
}
