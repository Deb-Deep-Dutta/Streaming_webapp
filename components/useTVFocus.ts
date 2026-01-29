'use client'

import { useEffect } from 'react'

export function useTVFocus() {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const active = document.activeElement as HTMLElement | null
      if (!active) return

      const focusables = Array.from(
        document.querySelectorAll<HTMLElement>(
          'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter(el => !el.hasAttribute('disabled'))

      const index = focusables.indexOf(active)
      if (index === -1) return

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          focusables[index + 1]?.focus()
          e.preventDefault()
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          focusables[index - 1]?.focus()
          e.preventDefault()
          break
        case 'Enter':
          active.click()
          break
        case 'Backspace':
        case 'Escape':
          window.history.back()
          break
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
}
