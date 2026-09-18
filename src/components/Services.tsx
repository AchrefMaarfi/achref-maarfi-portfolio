import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/layout/Reveal'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/layout/SectionHeader'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { services } from '@/data/content'

export function Services() {
  return (
    <Section id="services" className="bg-surface/40">
      <Container>
        <SectionHeader
          id="services"
          tag="Services"
          title="How I can help"
          description="Available for freelance work, collaborations and full-time opportunities."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <Reveal key={service.title} delay={i * 60}>
                <Card variant="glow" className="h-full">
                  <CardContent className="flex gap-4">
                    <div className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-xl">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold">{service.title}</h3>
                      <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                        {service.description}
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {service.tools.map((tool) => (
                          <li key={tool}>
                            <Badge variant="outline" className="h-auto px-2 py-0.5 text-[0.7rem]">
                              {tool}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
