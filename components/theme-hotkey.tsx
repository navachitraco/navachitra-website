"use client"

import { useEffect } from "react"

// Alt+D toggles light/dark. The choice is saved to localStorage ("theme")
// and re-applied before paint by the inline script in app/layout.tsx.
// With no saved choice, the site follows the device color scheme.
export function ThemeHotkey() {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (!event.altKey || event.ctrlKey || event.metaKey || event.repeat) {
        return
      }
      if (event.code !== "KeyD") {
        return
      }

      event.preventDefault()

      const root = document.documentElement
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
      const isDark =
        root.classList.contains("dark") ||
        (!root.classList.contains("light") && systemDark)
      const next = isDark ? "light" : "dark"

      root.classList.remove("light", "dark")
      root.classList.add(next)

      try {
        localStorage.setItem("theme", next)
      } catch {
        // localStorage unavailable — theme still toggles for this visit.
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  return null
}
