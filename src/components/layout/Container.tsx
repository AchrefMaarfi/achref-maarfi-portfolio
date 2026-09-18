import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

/** Max width + side gutter. The one place page padding is set. */
export function Container({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cn('mx-auto w-full max-w-6xl px-6', className)} {...props} />
  )
}
