import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

const positions = new Map<string, number>()

/**
 * Handles scroll position across route changes, since React Router doesn't
 * do this by default and the browser's native scroll restoration doesn't
 * work reliably with client-side navigation (see main.tsx).
 *
 * - Forward navigation (PUSH/REPLACE): jump to the top of the new page.
 * - Back/forward navigation (POP): restore the scroll position the page
 *   had when the user left it, so e.g. going back from a project page
 *   doesn't dump you at the top of the homepage.
 */
export function ScrollToTop() {
  const { pathname, key } = useLocation()
  const navigationType = useNavigationType()
  const lastKey = useRef(key)

  // Save the outgoing page's scroll position before the new route paints.
  useLayoutEffect(() => {
    return () => {
      positions.set(lastKey.current, window.scrollY)
    }
  })

  useEffect(() => {
    lastKey.current = key

    if (navigationType === 'POP') {
      const saved = positions.get(key)
      if (saved !== undefined) {
        window.scrollTo(0, saved)
      }
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, key, navigationType])

  return null
}
