import { Menu } from 'lucide-react'
import { useState } from 'react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet'
import { navLinks, person } from '@/data/content'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/lib/utils'

export function Header() {
  const scrolled = useScrolled(50)
  const [open, setOpen] = useState(false)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300',
        'pt-[env(safe-area-inset-top)]',
        scrolled
          ? 'border-border/60 bg-background/80 border-b backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:h-20">
        <a
          href="#home"
          className="group relative text-xl font-extrabold tracking-tight sm:text-2xl"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <span className="absolute inset-0 -z-10 blur-lg opacity-0 transition-opacity group-hover:opacity-75 bg-linear-to-r from-primary to-amber-300" />
          <span className="bg-linear-to-r from-foreground to-primary bg-clip-text text-transparent transition-all group-hover:from-primary group-hover:to-amber-300">
            {person.firstName.toUpperCase()}
          </span>
          <span className="ml-1.5 bg-linear-to-r from-primary to-amber-300 bg-clip-text text-transparent transition-all group-hover:from-amber-300 group-hover:to-primary">
            {person.lastName.toUpperCase()}
          </span>
        </a>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 md:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button asChild variant="glow" size="default">
            <a href="#contact">Let&apos;s Talk</a>
          </Button>
        </div>

        {/* Mobile: theme toggle + menu trigger */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <Button
              type="button"
              variant="ghost"
              size="icon-lg"
              aria-label="Open navigation menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Menu aria-hidden="true" />
            </Button>
            <SheetContent side="right" className="w-[85vw] max-w-xs">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <nav
                aria-label="Primary"
                className="mt-12 flex flex-col gap-1 px-4"
              >
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <a
                      href={link.href}
                      className="hover:bg-muted flex min-h-11 items-center rounded-lg px-3 text-base font-medium"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button asChild variant="glow" size="xl" className="mt-4">
                    <a href="#contact">Let&apos;s Talk</a>
                  </Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
