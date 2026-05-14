'use client'

import { useRef, useCallback, useEffect } from 'react'

/**
 * useNavSound — lightweight hook untuk sound effect navbar
 *
 * Fitur:
 * - Lazy-loads audio hanya saat pertama diklik (tidak blocking render)
 * - Respects prefers-reduced-motion
 * - Respects user preference (bisa mute)
 * - Tidak menyebabkan re-render (semua state pakai ref)
 * - Fallback graceful jika file tidak ada / autoplay diblokir
 */
export function useNavSound(src = '/sounds/bubble_effect.mp3') {
  const audioRef    = useRef(null)
  const loadedRef   = useRef(false)
  const mutedRef    = useRef(false)

  // Cek apakah user prefer reduced motion (aksesibilitas)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    mutedRef.current = mq.matches
    const handler = (e) => { mutedRef.current = e.matches }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Preload audio object (sekali saja)
  const ensureAudio = useCallback(() => {
    if (loadedRef.current) return
    try {
      const audio      = new Audio(src)
      audio.volume     = 0.35   // Volume lembut, tidak mengagetkan
      audio.preload    = 'auto'
      audioRef.current = audio
      loadedRef.current = true
    } catch {
      // Browser tidak support Audio API — silent fail
    }
  }, [src])

  // Fungsi yang dipanggil saat klik navbar
  const playSound = useCallback(() => {
    if (mutedRef.current) return
    ensureAudio()
    const audio = audioRef.current
    if (!audio) return
    try {
      // Reset ke awal supaya rapid-click tetap terdengar
      audio.currentTime = 0
      audio.play().catch(() => {
        // Autoplay policy block — silent fail, tidak mengganggu UX
      })
    } catch {
      // Silent fail
    }
  }, [ensureAudio])

  return playSound
}
