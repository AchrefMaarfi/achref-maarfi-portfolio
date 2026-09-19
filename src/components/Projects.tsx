import { ArrowUpRight, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { GithubIcon } from "@/components/icons";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { featuredProject, projects } from "@/data/content";

/** True for a same-app path ("/projects/planit"); false for a full URL. */
function isInternalPath(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

export function Projects() {
  return (
    <Section id="projects">
      <Container>
        <SectionHeader
          id="projects"
          tag="Projects"
          title="Things I've built"
          description="A mix of freelance, internship and academic work — full-stack platforms, dashboards and enterprise apps."
        />

        <Reveal>
          <Card variant="glow" className="mb-8 overflow-hidden py-0">
            <div className="grid md:grid-cols-2 md:items-center">
              <ImagePlaceholder
                label="planit.jpg — 1200×675"
                alt={featuredProject.imageAlt}
                aspect="video"
                src={
                  featuredProject.hasRealImage
                    ? featuredProject.image
                    : undefined
                }
              />
              <CardContent className="flex flex-col justify-center gap-4 px-6 py-8 md:px-10">
                <Badge
                  variant="secondary"
                  className="h-auto w-fit px-2.5 py-1 text-xs"
                >
                  {featuredProject.tag}
                </Badge>
                <h3 className="text-2xl font-bold">{featuredProject.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {featuredProject.description}
                </p>

                <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                  {featuredProject.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-muted-foreground flex items-baseline gap-2"
                    >
                      <span className="text-primary" aria-hidden="true">
                        ▹
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-2 space-y-2">
                  {featuredProject.stackGroups.map((group) => (
                    <p key={group.label} className="text-xs">
                      <span className="text-muted-foreground font-semibold uppercase">
                        {group.label}:{" "}
                      </span>
                      <span className="text-foreground/80">
                        {group.items.join(", ")}
                      </span>
                    </p>
                  ))}
                </div>

                {featuredProject.link &&
                  (isInternalPath(featuredProject.link) ? (
                    <Link
                      to={featuredProject.link}
                      className="text-primary mt-2 inline-flex w-fit items-center gap-1 text-sm font-semibold hover:underline"
                    >
                      {featuredProject.linkLabel ??
                        `View ${featuredProject.title} project`}
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </Link>
                  ) : (
                    <a
                      href={featuredProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary mt-2 inline-flex w-fit items-center gap-1 text-sm font-semibold hover:underline"
                    >
                      {featuredProject.linkLabel ??
                        `View ${featuredProject.title} project`}
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  ))}
              </CardContent>
            </div>
          </Card>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 60}>
              <Card variant="glow" className="h-full overflow-hidden py-0">
                <article className="flex h-full flex-col">
                  <ImagePlaceholder
                    label={`${project.image.split("/").pop()} — 800×450`}
                    alt={project.imageAlt}
                    aspect="video"
                    src={project.hasRealImage ? project.image : undefined}
                    srcDark={
                      project.hasRealImage ? project.imageDark : undefined
                    }
                  />
                  <CardContent className="flex flex-1 flex-col gap-3 px-5 py-5">
                    <Badge
                      variant="secondary"
                      className="h-auto w-fit px-2 py-0.5 text-[0.7rem]"
                    >
                      {project.tag}
                    </Badge>
                    <h3 className="text-lg font-bold">{project.title}</h3>
                    <p className="text-muted-foreground flex-1 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <ul className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <li key={tech}>
                          <Badge
                            variant="outline"
                            className="h-auto px-2 py-0.5 text-[0.7rem]"
                          >
                            {tech}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                    {project.githubLink || project.demoLink ? (
                      <div className="flex items-center gap-4">
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-violet-500 transition-colors hover:text-violet-400"
                          >
                            <GithubIcon className="size-4" aria-hidden="true" />
                            GitHub
                          </a>
                        )}
                        {project.demoLink && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary inline-flex w-fit items-center gap-1.5 text-sm font-semibold hover:underline"
                          >
                            <Globe className="size-4" aria-hidden="true" />
                            Live Demo
                          </a>
                        )}
                      </div>
                    ) : (
                      project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary inline-flex w-fit items-center gap-1 text-sm font-semibold hover:underline"
                        >
                          View {project.githubLink ?? "on GitHub"}
                          <ArrowUpRight className="size-4" aria-hidden="true" />
                        </a>
                      )
                    )}
                  </CardContent>
                </article>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
