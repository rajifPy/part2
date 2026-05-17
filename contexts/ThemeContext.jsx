'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({ isDark: true, toggle: () => {} })

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = saved ? saved === 'dark' : prefersDark
    setIsDark(dark)
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [])

  const toggle = () => {
    setIsDark(prev => {
      const next = !prev
      document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
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