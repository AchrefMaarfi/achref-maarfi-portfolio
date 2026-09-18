import { Download } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/layout/Reveal'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/layout/SectionHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { about, person } from '@/data/content'

export function About() {
  return (
    <Section id="about">
      <Container>
        <SectionHeader
          id="about"
          tag={about.tag}
          title={about.title}
          align="left"
          className="mx-0 max-w-2xl text-left"
        />

        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:gap-14">
          <Reveal className="order-2 md:order-1">
            <div className="text-muted-foreground space-y-4 text-base leading-relaxed md:text-lg">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <Button asChild variant="glowOutline" size="xl" className="mt-8">
              <a href={person.resume} download="Achref_Maarfi_Resume.pdf">
                <Download aria-hidden="true" />
                Download Résumé (PDF)
              </a>
            </Button>
          </Reveal>

          <Reveal delay={100} className="order-1 md:order-2">
            <Card variant="glow">
              <CardContent>
                <dl className="divide-border grid divide-y">
                  {about.facts.map((fact) => (
                    <div key={fact.label} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0">
                      <dt className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                        {fact.label}
                      </dt>
                      <dd className="text-sm font-medium">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
