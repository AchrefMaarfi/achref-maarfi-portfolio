import { ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type ImagePlaceholderProps = {
  /** Shown to the person editing the site — where the real file goes. */
  label: string
  alt: string
  aspect?: 'video' | 'square' | 'portrait'
  className?: string
  /** Real image path. When set, renders the image instead of the placeholder. */
  src?: string
  /** Dark-theme variant of `src`. When set, swaps in for `src` while the site is in dark mode. */
  srcDark?: string
}

const aspectClass = {
  video: 'aspect-video',
  square: 'aspect-square',
  /** 4:5 — a standard headshot/portrait crop. */
  portrait: 'aspect-[4/5]',
} as const

/**
 * Stands in for a real photo until Achref supplies one (see the image
 * checklist). Deliberately visible as a placeholder rather than a blank box,
 * so it's obvious in review what still needs a file — and it still reserves
 * the right aspect ratio, so swapping in the real image causes no layout shift.
 *
 * The featured project card stretches this to match a much taller text
 * column (`md:h-full`), which overrides `aspect-video` — CSS only applies
 * aspect-ratio when a dimension is auto. A lone centered icon in that much
 * space reads as broken, so a faint dot pattern fills the rest of the area
 * and keeps it looking like a deliberate placeholder rather than empty space.
 */
export function ImagePlaceholder({
  label,
  alt,
  aspect = 'video',
  className,
  src,
  srcDark,
}: ImagePlaceholderProps) {
  if (src) {
    return (
      <div
        className={cn(
          'border-border relative overflow-hidden border',
          aspectClass[aspect],
          className,
        )}
      >
        <img
          src={src}
          alt={alt}
          className={cn('size-full object-cover', srcDark && 'dark:hidden')}
        />
        {srcDark && (
          <img
            src={srcDark}
            alt={alt}
            className="absolute inset-0 hidden size-full object-cover dark:block"
          />
        )}
      </div>
    )
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        'from-surface to-card border-border relative flex min-h-40 flex-col items-center justify-center gap-2 overflow-hidden border bg-linear-to-br',
        aspectClass[aspect],
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] bg-size-[18px_18px] opacity-[0.07]"
      />
      <ImageIcon className="text-muted-foreground/40 relative size-9" aria-hidden="true" />
      <span className="text-muted-foreground/60 relative px-4 text-center text-xs">{label}</span>
    </div>
  )
}
