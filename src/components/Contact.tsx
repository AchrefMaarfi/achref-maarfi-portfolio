import { Mail, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/layout/Reveal'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/layout/SectionHeader'
import { Card, CardContent } from '@/components/ui/card'
import { contact } from '@/data/content'

const icons = { Email: Mail, GitHub: GithubIcon, LinkedIn: LinkedinIcon, Location: MapPin }

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
            return (
              <Reveal key={link.label} delay={i * 60}>
                <a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  aria-label={`${link.label}: ${link.value}`}
                >
                  <Card variant="glow" className="h-full">
                    <CardContent className="flex min-h-11 items-center gap-4">
                      <div className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-xl">
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
                </a>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
