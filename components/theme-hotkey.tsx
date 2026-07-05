"use client"

import { useEffect } from "react"

// Pressing "d" toggles light/dark. The choice is saved to localStorage ("theme")
// and re-applied before paint by the inline script in app/layout.tsx.
// With no saved choice, the site follows the device color scheme.
export function ThemeHotkey() {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      // Ignore when a modifier is held (e.g. Ctrl+D, Cmd+D) or on key repeat.
      if (event.altKey || event.ctrlKey || event.metaKey || event.repeat) {
        return
      }
      if (event.key !== "d" && event.key !== "D") {
        return
      }

      // Don't hijack the key while the user is typing in a field.
      const target = event.target as HTMLElement | null
      if (
        target &&
        (target.isContentEditable ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
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
