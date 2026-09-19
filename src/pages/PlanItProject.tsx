import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/layout/Reveal";
import { Particles } from "@/components/Particles";
import { ShowcaseHeader } from "@/components/ShowcaseHeader";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { featuredProject } from "@/data/content";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const highlights = [
  {
    src: "/assets/planit/create-post.png",
    alt: "Post composer with AI caption generation, mood analysis and a live engagement-prediction score",
    title: "AI-assisted composing",
    body: "Generate or rewrite a caption for a chosen mood, then get an engagement score with the reasoning behind it before you schedule anything.",
    wide: true,
  },
  {
    src: "/assets/planit/content-board.png",
    alt: "Kanban board with pending, rejected, scheduled and posted columns",
    title: "Approval pipeline",
    body: "Every post moves through pending → validated → scheduled → posted, so clients approve their own content before it goes live.",
  },
  {
    src: "/assets/planit/content-calendar.png",
    alt: "Monthly content calendar showing scheduled posts per day",
    title: "Content calendar",
    body: "A month-at-a-glance view of everything queued across clients and platforms.",
  },
  {
    src: "/assets/planit/reports.png",
    alt: "Analytics report with engagement trend chart and top-performing posts",
    title: "Reporting",
    body: "Reach, engagement rate and top posts per client, exportable as a PDF for hand-off.",
  },
  {
    src: "/assets/planit/chat.png",
    alt: "Real-time chat between a moderator and a client with a live notification",
    title: "Real-time chat",
    body: "Moderators, creators and clients message directly inside the dashboard — no email thread required.",
  },
];

export function PlanItProject() {
  useDocumentMeta({
    title: `${featuredProject.title} | Achref Maarfi`,
    description: featuredProject.description,
    path: "/projects/planit",
  });

  return (
    <div className="min-h-screen">
      <Particles accentOnly />
      <ShowcaseHeader />

      <main className="relative z-1">
        <section className="py-14 md:py-20">
          <Container>
            <Reveal>
              <Badge
                variant="secondary"
                className="h-auto w-fit px-2.5 py-1 text-xs"
              >
                {featuredProject.tag}
              </Badge>
              <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">
                {featuredProject.title}
              </h1>
              <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed md:text-lg">
                {featuredProject.description}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-10">
                <div className="ring-accent/30 bg-card shadow-glow-violet relative overflow-hidden rounded-xl p-2 ring-1">
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <iframe
                      className="h-full w-full"
                      src="https://www.youtube-nocookie.com/embed/XRAXM7WZNH0"
                      title={`${featuredProject.title} — full walkthrough`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
                <p className="text-muted-foreground mt-3 text-sm">
                  Full walkthrough — the dashboard sits behind a login, so this
                  is the closest thing to a live demo.
                </p>
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="pb-14 md:pb-20">
          <Container>
            <Reveal>
              <h2 className="text-2xl font-bold">What it does</h2>
            </Reveal>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {highlights.map((item, i) => (
                <Reveal
                  key={item.title}
                  delay={i * 60}
                  className={item.wide ? "sm:col-span-2" : undefined}
                >
                  <Card
                    variant="glow"
                    className="ring-accent/25 hover:ring-accent/60 hover:shadow-glow-violet h-full overflow-hidden py-0"
                  >
                    <div
                      className={
                        item.wide
                          ? "grid md:grid-cols-[1.3fr_1fr] md:items-center"
                          : undefined
                      }
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        className={
                          item.wide
                            ? "bg-muted aspect-video w-full object-cover object-top md:aspect-square"
                            : "bg-muted aspect-video w-full object-cover object-top"
                        }
                      />
                      <div className="flex flex-col gap-2 px-5 py-5">
                        <h3 className="text-base font-bold">{item.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section className="pb-20 md:pb-28">
          <Container>
            <Reveal>
              <Card variant="default" className="p-6 md:p-8">
                <h2 className="text-2xl font-bold">Under the hood</h2>
                <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 text-sm md:grid-cols-3">
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
                <div className="mt-8 space-y-3">
                  {featuredProject.stackGroups.map((group) => (
                    <p key={group.label} className="text-sm">
                      <span className="text-muted-foreground font-semibold uppercase">
                        {group.label}:{" "}
                      </span>
                      <span className="text-foreground/80">
                        {group.items.join(", ")}
                      </span>
                    </p>
                  ))}
                </div>
              </Card>
            </Reveal>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
