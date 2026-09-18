import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/layout/Reveal'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/layout/SectionHeader'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { stackLayers, toolBelts } from '@/data/content'

export function Skills() {
  return (
    <Section id="skills" className="bg-surface/40">
      <Container>
        <SectionHeader
          id="skills"
          tag="Skills"
          title="My stack, top to bottom"
          description="From what people see and touch, down to where their data lives."
        />

        {/* The rail mirrors Experience's timeline — same device, different
            meaning: a request's path through the stack instead of a date order.
            Dots alternate amber/violet so the two don't read as identical. */}
        <ol className="relative space-y-10 pl-10 before:absolute before:top-1 before:bottom-1 before:left-3 before:w-px before:bg-border">
          {stackLayers.map((layer, i) => (
            <li key={layer.label} className="relative">
              <span
                aria-hidden="true"
                className={`border-background absolute top-1 -left-10 size-3.5 rounded-full border-2 ${
                  i % 2 === 0
                    ? 'bg-primary shadow-glow-amber'
                    : 'bg-accent shadow-glow-violet'
                }`}
              />
              <Reveal delay={i * 90}>
                <article className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-8">
                  <div className="sm:w-48 sm:shrink-0">
                    <h3 className="text-lg font-bold">{layer.label}</h3>
                    <p className="text-muted-foreground mt-0.5 text-sm">{layer.role}</p>
                  </div>
                  <ul className="flex flex-1 flex-wrap gap-2">
                    {layer.skills.map((skill) => (
                      <li key={skill}>
                        <Badge variant="secondary" className="h-auto px-2.5 py-1 text-xs">
                          {skill}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <Separator className="my-10" />

        <Reveal delay={stackLayers.length * 90}>
          <div className="grid gap-6 sm:grid-cols-2">
            {toolBelts.map((belt) => (
              <div key={belt.label}>
                <h3 className="text-sm font-bold">{belt.label}</h3>
                <ul className="mt-2.5 flex flex-wrap gap-2">
                  {belt.skills.map((skill) => (
                    <li key={skill}>
                      <Badge variant="outline" className="h-auto px-2.5 py-1 text-xs">
                        {skill}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
