import { useEffect, useRef } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type Particle = {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  isAmber: boolean
}

const PARTICLE_COUNT = 90
const LINK_DISTANCE = 130
const LINK_DISTANCE_SQ = LINK_DISTANCE * LINK_DISTANCE
const MOUSE_RADIUS = 150
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS

function makeParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2 + 1,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5,
    opacity: Math.random() * 0.5 + 0.2,
    isAmber: Math.random() > 0.5,
  }
}

type ParticlesProps = {
  /** Tints every particle and link violet instead of the default amber/violet mix — used on project pages that lean on the accent color rather than the site's primary amber. */
  accentOnly?: boolean
}

/**
 * Ambient background. Desktop (>=768px) gets a canvas particle field that
 * drifts and links to the mouse; phones get a static/slow CSS gradient —
 * the canvas's rAF loop plus its O(n^2) link pass causes real thermal
 * throttling on mid-range phones, so it is never mounted there at all.
 */
export function Particles({ accentOnly = false }: ParticlesProps = {}) {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const reducedMotion = usePrefersReducedMotion()

  if (!isDesktop) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div
          className={`absolute -top-32 -left-24 size-80 rounded-full blur-3xl motion-safe:animate-[drift_16s_ease-in-out_infinite] ${accentOnly ? 'bg-accent/20' : 'bg-primary/20'}`}
        />
        <div className="bg-accent/20 absolute top-1/2 -right-24 size-96 rounded-full blur-3xl motion-safe:animate-[drift_20s_ease-in-out_infinite_reverse]" />
      </div>
    )
  }

  return <ParticleCanvas active={!reducedMotion} accentOnly={accentOnly} />
}

function ParticleCanvas({
  active,
  accentOnly,
}: {
  active: boolean
  accentOnly: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !active) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    let mouseX = -9999
    let mouseY = -9999
    let rafId = 0

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particles = Array.from({ length: PARTICLE_COUNT }, () =>
        makeParticle(canvas.width, canvas.height),
      )
    }
    resize()

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    let resizeTimeout = 0
    function onResize() {
      window.clearTimeout(resizeTimeout)
      resizeTimeout = window.setTimeout(resize, 150)
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove)

    // Read the actual rendered colors so this stays in sync with the theme
    // (including the light/dark swap) without duplicating the palette here.
    const styles = getComputedStyle(document.documentElement)
    const amber = styles.getPropertyValue('--primary').trim() || '#ffb020'
    const violet = styles.getPropertyValue('--accent').trim() || '#8b5cf6'

    function hexToRgb(hex: string) {
      const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return m
        ? `${parseInt(m[1], 16)}, ${parseInt(m[2], 16)}, ${parseInt(m[3], 16)}`
        : '255, 176, 32'
    }
    const amberRgb = hexToRgb(amber)
    const violetRgb = hexToRgb(violet)

    function draw() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x += p.speedX
        p.y += p.speedY

        const dx = mouseX - p.x
        const dy = mouseY - p.y
        if (dx * dx + dy * dy < MOUSE_RADIUS_SQ) {
          p.x -= dx * 0.005
          p.y -= dy * 0.005
        }

        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          Object.assign(p, makeParticle(canvas.width, canvas.height))
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        const useAmber = !accentOnly && p.isAmber
        ctx.fillStyle = `rgba(${useAmber ? amberRgb : violetRgb}, ${p.opacity})`
        ctx.fill()
      }

      const linkColor = accentOnly ? violetRgb : amberRgb
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distSq = dx * dx + dy * dy
          if (distSq < LINK_DISTANCE_SQ) {
            const dist = Math.sqrt(distSq)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${linkColor}, ${(1 - dist / LINK_DISTANCE) * 0.15})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      rafId = requestAnimationFrame(draw)
    }
    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.clearTimeout(resizeTimeout)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [active, accentOnly])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  )
}
