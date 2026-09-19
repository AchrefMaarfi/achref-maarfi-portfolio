import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/**
 * Jumps to the top of the page when navigating to a new route — React Router
 * doesn't do this by default. Skipped on back/forward navigation (POP) so the
 * browser's native scroll restoration can put the page back where it was.
 */
export function ScrollToTop() {
  const { pathname } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (navigationType !== 'POP') {
      window.scrollTo(0, 0)
    }
  }, [pathname, navigationType])

  return null
}
