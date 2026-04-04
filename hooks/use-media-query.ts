"use client"

import { useSyncExternalStore } from "react"

/**
 * Subscribes to `window.matchMedia`. Server snapshot is `false` (mobile-first).
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      if (typeof window === "undefined") return () => {}
      const mql = window.matchMedia(query)
      mql.addEventListener("change", onChange)
      return () => mql.removeEventListener("change", onChange)
    },
    () => (typeof window !== "undefined" ? window.matchMedia(query).matches : false),
    () => false
  )
}
