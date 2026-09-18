import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { sectionTitleId } from './sectionTitleId'

type SectionHeaderProps = {
  /** Must match the parent Section's id. */
  id: string
  tag: string
  title: ReactNode
  description?: ReactNode
  /** Heading level — explicit so the outline is never accidental. */
  as?: 'h1' | 'h2'
  align?: 'center' | 'left'
  className?: string
}

export function SectionHeader({
  id,
  tag,
  title,
  description,
  as: Heading = 'h2',
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' && 'mx-auto max-w-2xl text-center',
        className,
      )}
    >
      <p className="border-primary/40 text-primary mb-4 inline-block rounded-full border px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase">
        {tag}
      </p>
      <Heading
        id={sectionTitleId(id)}
        className="text-3xl leading-tight font-black tracking-tight text-balance md:text-5xl"
      >
        {title}
      </Heading>
      {description && (
        <p className="text-muted-foreground mt-4 text-base text-pretty md:text-lg">
          {description}
        </p>
      )}
    </header>
  )
}
