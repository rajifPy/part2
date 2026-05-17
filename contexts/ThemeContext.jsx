'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({ isDark: true, toggle: () => {} })

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true)

  // Sinkronisasi state dengan localStorage dan DOM saat pertama mount
  useEffect(() => {
    const saved        = localStorage.getItem('theme')
    const prefersDark  = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark         = saved ? saved === 'dark' : prefersDark

    setIsDark(dark)
    applyTheme(dark)
  }, [])

  const toggle = () => {
    setIsDark(prev => {
      const next = !prev
      applyTheme(next)
      localStorage.setItem('theme', next ? 'dark' : 'light')
      return next
    })
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

/* ── Helper: terapkan tema ke DOM ── */
function applyTheme(isDark) {
  const theme = isDark ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme)
  document.body.setAttribute('data-theme', theme)
}
