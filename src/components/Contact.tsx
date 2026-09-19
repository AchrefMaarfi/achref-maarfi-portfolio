import { Mail, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/layout/Reveal'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/layout/SectionHeader'
import { Card, CardContent } from '@/components/ui/card'
import { contact } from '@/data/content'

const icons = { Email: Mail, GitHub: GithubIcon, LinkedIn: LinkedinIcon, Location: MapPin }

// Per-platform brand tints for the icon badge. GitHub has no official brand
// color, so it borrows the site's violet accent instead of forcing one.
const colors = {
  Email: 'bg-primary/10 text-primary',
  GitHub: 'bg-accent/10 text-accent',
  LinkedIn: 'bg-[#3B9EF5]/10 text-[#3B9EF5]',
  Location: 'bg-teal-500/10 text-teal-500',
} satisfies Record<string, string>

export function Contact() {
  return (
    <Section id="contact" className="bg-surface/40">
      <Container>
        <SectionHeader
          id="contact"
          tag={contact.tag}
          title={contact.title}
          description={contact.description}
        />

        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          {contact.links.map((link, i) => {
            const Icon = icons[link.label as keyof typeof icons]
            const colorClass = colors[link.label as keyof typeof colors]
            const cardContent = (
              <Card variant="glow" className="h-full">
                <CardContent className="flex min-h-11 items-center gap-4">
                  <div
                    className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${colorClass}`}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                      {link.label}
                    </p>
                    <p className="truncate text-sm font-medium">{link.value}</p>
                  </div>
                </CardContent>
              </Card>
            )

            return (
              <Reveal key={link.label} delay={i * 60}>
                {link.href ? (
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    aria-label={`${link.label}: ${link.value}`}
                  >
                    {cardContent}
                  </a>
                ) : (
                  <div aria-label={`${link.label}: ${link.value}`}>{cardContent}</div>
                )}
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
