import { ArrowUp, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { person } from '@/data/content'

const socials = [
  { label: 'Email', href: `mailto:${person.email}`, icon: Mail, external: false },
  { label: 'GitHub', href: person.github, icon: GithubIcon, external: true },
  { label: 'LinkedIn', href: person.linkedin, icon: LinkedinIcon, external: true },
]

export function Footer() {
  return (
    <footer className="border-border relative border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} {person.name}. Built with React &amp; Tailwind CSS.
        </p>

        <div className="flex items-center gap-2">
          {socials.map((social) => (
            <Button
              key={social.label}
              asChild
              variant="ghost"
              size="icon-lg"
              aria-label={social.label}
            >
              <a
                href={social.href}
                target={social.external ? '_blank' : undefined}
                rel={social.external ? 'noopener noreferrer' : undefined}
              >
                <social.icon aria-hidden="true" />
              </a>
            </Button>
          ))}

          <Button asChild variant="ghost" size="icon-lg" aria-label="Back to top">
            <a href="#home">
              <ArrowUp aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  )
}
