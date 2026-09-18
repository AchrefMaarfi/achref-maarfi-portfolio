import { useCallback, useSyncExternalStore } from 'react'

/**
 * Subscribes to a CSS media query. useSyncExternalStore owns the
 * subscribe/unsubscribe lifecycle, so no listener outlives the component —
 * including under StrictMode's double mount.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    [query],
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}
