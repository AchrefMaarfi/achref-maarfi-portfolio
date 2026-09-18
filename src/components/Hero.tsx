import { ChevronDown } from 'lucide-react'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import { Button } from '@/components/ui/button'
import { hero } from '@/data/content'

export function Hero() {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col justify-center px-6 pt-28 pb-20"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-5xl items-center gap-12 text-center md:grid-cols-[1.15fr_0.85fr] md:gap-16 md:text-left">
        <div>
          <p className="text-accent mb-5 text-xs font-semibold tracking-[0.3em] uppercase sm:text-sm">
            {hero.eyebrow}
          </p>

          <h1 className="text-4xl leading-[1.1] font-black tracking-tight text-balance sm:text-6xl md:text-6xl lg:text-7xl">
            {hero.titleLead} <span className="glow-text">{hero.titleHighlight}</span>
          </h1>

          <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-base text-pretty sm:text-lg md:mx-0">
            {hero.description}
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
            <Button asChild variant="glow" size="xl" className="w-full sm:w-auto">
              <a href={hero.primaryCta.href}>{hero.primaryCta.label}</a>
            </Button>
            <Button asChild variant="glowOutline" size="xl" className="w-full sm:w-auto">
              <a href={hero.secondaryCta.href}>{hero.secondaryCta.label}</a>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[280px] md:max-w-none">
          {/* Soft glow behind the portrait, echoing the particle field's palette. */}
          <div
            aria-hidden="true"
            className="from-primary/30 to-accent/30 absolute -inset-4 -z-10 rounded-[2rem] bg-linear-to-br opacity-60 blur-2xl"
          />
          <ImagePlaceholder
            label="headshot.jpg — 600×750"
            alt={hero.photo.alt}
            aspect="portrait"
            className="border-primary/25 rounded-3xl shadow-2xl"
            src={hero.photo.src}
          />
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="text-muted-foreground hover:text-foreground absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transition-colors motion-safe:animate-bounce"
      >
        <ChevronDown className="size-6" aria-hidden="true" />
      </a>
    </section>
  )
}
