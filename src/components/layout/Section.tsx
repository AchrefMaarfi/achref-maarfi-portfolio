import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import { sectionTitleId } from './sectionTitleId'

type SectionProps = ComponentProps<'section'> & { id: string }

/**
 * A named page section. `aria-labelledby` points at `${id}-title`, which
 * SectionHeader renders — so pass the same `id` to both and every section gets
 * an accessible name in the landmark list.
 */
export function Section({ id, className, ...props }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={sectionTitleId(id)}
      className={cn('relative scroll-mt-20 py-20 md:py-28', className)}
      {...props}
    />
  )
}
