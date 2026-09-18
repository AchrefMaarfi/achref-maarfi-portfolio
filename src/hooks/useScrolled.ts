import { useSyncExternalStore } from 'react'

function subscribe(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true })
  return () => window.removeEventListener('scroll', onChange)
}

/**
 * True once the page has scrolled past `threshold` px. Returns a boolean
 * snapshot, so React only re-renders when it flips — not on every scroll event.
 */
export function useScrolled(threshold = 50): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    () => false,
  )
}
