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
const MOUSE_RADIUS = 150

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

/**
 * Ambient background. Desktop (>=768px) gets a canvas particle field that
 * drifts and links to the mouse; phones get a static/slow CSS gradient —
 * the canvas's rAF loop plus its O(n^2) link pass causes real thermal
 * throttling on mid-range phones, so it is never mounted there at all.
 */
export function Particles() {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const reducedMotion = usePrefersReducedMotion()

  if (!isDesktop) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div className="bg-primary/20 absolute -top-32 -left-24 size-80 rounded-full blur-3xl motion-safe:animate-[drift_16s_ease-in-out_infinite]" />
        <div className="bg-accent/20 absolute top-1/2 -right-24 size-96 rounded-full blur-3xl motion-safe:animate-[drift_20s_ease-in-out_infinite_reverse]" />
      </div>
    )
  }

  return <ParticleCanvas active={!reducedMotion} />
}

function ParticleCanvas({ active }: { active: boolean }) {
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

    function onResize() {
      resize()
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
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_RADIUS) {
          p.x -= dx * 0.005
          p.y -= dy * 0.005
        }

        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          Object.assign(p, makeParticle(canvas.width, canvas.height))
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.isAmber ? amberRgb : violetRgb}, ${p.opacity})`
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < LINK_DISTANCE) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${amberRgb}, ${(1 - dist / LINK_DISTANCE) * 0.15})`
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
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  )
}
