'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const ThemeContext = createContext({ isDark: true, toggle: () => {} })

/* ── Helper: terapkan tema ke DOM ── */
function applyTheme(isDark) {
  const theme = isDark ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme)
  // tidak perlu set di body — CSS selector [data-theme] di html sudah cukup
}

export function ThemeProvider({ children }) {
  // Mulai dengan null untuk menghindari hydration mismatch
  // Nilai aktual dibaca dari localStorage di useEffect
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved       = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark        = saved ? saved === 'dark' : prefersDark

    setIsDark(dark)
    applyTheme(dark)
    setMounted(true)
  }, [])

  // Memoize toggle agar referensinya stabil — mencegah infinite loop
  // di komponen yang memakai toggle sebagai dependency
  const toggle = useCallback(() => {
    setIsDark(prev => {
      const next = !prev
      applyTheme(next)
      localStorage.setItem('theme', next ? 'dark' : 'light')
      return next
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ isDark, toggle, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
