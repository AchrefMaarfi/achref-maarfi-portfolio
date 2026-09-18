import { Camera, Palette } from 'lucide-react'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/layout/Reveal'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/layout/SectionHeader'
import { Badge } from '@/components/ui/badge'
import { creative } from '@/data/content'

function CreativeBlock({
  icon: Icon,
  title,
  description,
  tags,
  images,
  delay,
}: {
  icon: typeof Palette
  title: string
  description: string
  tags: string[]
  images: { src: string; alt: string }[]
  delay: number
}) {
  return (
    <Reveal delay={delay}>
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{description}</p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <li key={tag}>
            <Badge variant="outline" className="h-auto px-2 py-0.5 text-[0.7rem]">
              {tag}
            </Badge>
          </li>
        ))}
      </ul>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {images.map((image) => (
          <ImagePlaceholder
            key={image.src}
            label={image.src.split('/').pop() ?? ''}
            alt={image.alt}
            aspect="square"
            className="rounded-lg"
          />
        ))}
      </div>
    </Reveal>
  )
}

export function Creative() {
  return (
    <Section id="creative">
      <Container>
        <SectionHeader
          id="creative"
          tag={creative.tag}
          title={creative.title}
          description="Visual work alongside the code — graphic design and photography."
        />

        <div className="grid gap-12 md:grid-cols-2 md:gap-10">
          <CreativeBlock
            icon={Palette}
            title={creative.design.title}
            description={creative.design.description}
            tags={[...creative.design.tools, ...creative.design.work]}
            images={[...creative.design.images]}
            delay={0}
          />
          <CreativeBlock
            icon={Camera}
            title={creative.photography.title}
            description={`${creative.photography.description} Shot on a ${creative.photography.gear}.`}
            tags={[...creative.photography.interests]}
            images={[...creative.photography.images]}
            delay={100}
          />
        </div>
      </Container>
    </Section>
  )
}
