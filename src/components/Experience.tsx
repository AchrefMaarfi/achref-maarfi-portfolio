import { GraduationCap } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/layout/Reveal'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/layout/SectionHeader'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { education, experience } from '@/data/content'

export function Experience() {
  return (
    <Section id="experience">
      <Container>
        <SectionHeader
          id="experience"
          tag="Experience"
          title="Where I've worked"
          description="Internships and roles that shaped how I build software today."
        />

        <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          {/* Timeline: rail sits at left-3, content is padded to pl-10 so text
              never squishes against the viewport edge on narrow phones. */}
          <ol className="relative space-y-10 pl-10 before:absolute before:top-1 before:bottom-1 before:left-3 before:w-px before:bg-border">
            {experience.map((entry, i) => (
              <li key={`${entry.company}-${entry.start}`} className="relative">
                <span
                  aria-hidden="true"
                  className="border-background bg-primary shadow-glow-amber absolute top-1 -left-10 size-3.5 rounded-full border-2"
                />
                <Reveal delay={i * 80}>
                  <article>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-lg font-bold">{entry.role}</h3>
                      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                        {entry.start} – {entry.end}
                      </p>
                    </div>
                    <p className="text-primary mt-0.5 text-sm font-medium">
                      {entry.company} · {entry.location}
                    </p>
                    <ul className="text-muted-foreground mt-3 list-disc space-y-1.5 pl-4 text-sm leading-relaxed">
                      {entry.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {entry.stack.map((tech) => (
                        <li key={tech}>
                          <Badge variant="outline" className="h-auto px-2 py-0.5 text-[0.7rem]">
                            {tech}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal delay={120}>
            <Card variant="glass" className="lg:sticky lg:top-24">
              <CardContent>
                <div className="mb-4 flex items-center gap-2">
                  <GraduationCap className="text-primary size-5" aria-hidden="true" />
                  <h3 className="text-base font-bold">Education</h3>
                </div>
                <ul className="space-y-5">
                  {education.map((entry) => (
                    <li key={entry.school}>
                      <p className="text-sm font-semibold">{entry.degree}</p>
                      <p className="text-muted-foreground mt-0.5 text-sm">{entry.school}</p>
                      <p className="text-muted-foreground mt-0.5 text-xs tracking-wide uppercase">
                        {entry.date}
                      </p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
