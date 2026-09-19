import { useEffect, useRef, useState } from "react";

/**
 * True for a brief window each time the element scrolls into the viewport
 * (re-triggers on every entry, e.g. scrolling back up past it), then false
 * again — an "entrance" pulse (e.g. for a brief glow) rather than a
 * persisted sticky/docked state.
 */
export function useInView<T extends HTMLElement>(
  threshold = 0.5,
  pulseDuration = 1500,
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timeout: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        clearTimeout(timeout);
        setInView(true);
        timeout = setTimeout(() => setInView(false), pulseDuration);
      },
      { threshold },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [threshold, pulseDuration]);

  return { ref, inView };
}
