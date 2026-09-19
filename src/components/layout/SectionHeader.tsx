import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import { sectionTitleId } from "./sectionTitleId";

type SectionHeaderProps = {
  /** Must match the parent Section's id. */
  id: string;
  title: ReactNode;
  description?: ReactNode;
  tag?: string;
  /** Heading level — explicit so the outline is never accidental. */
  as?: "h1" | "h2";
  align?: "center" | "left";
  className?: string;
};

export function SectionHeader({
  id,
  title,
  description,
  tag,
  as: Heading = "h2",
  align = "center",
  className,
}: SectionHeaderProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();

  return (
    <header
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      {tag && (
        <span
          ref={ref}
          className="relative mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-widest text-primary uppercase"
        >
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute -inset-x-4 -inset-y-2 rounded-full bg-primary/20 blur-xl transition-opacity duration-700",
              inView ? "opacity-100" : "opacity-0",
            )}
          />
          <span className="relative">{tag}</span>
        </span>
      )}
      <Heading
        id={sectionTitleId(id)}
        className="text-3xl leading-tight font-black tracking-tight text-balance md:text-5xl"
      >
        {title}
      </Heading>
      {description && (
        <p className="text-muted-foreground mt-4 text-base text-pretty md:text-lg">
          {description}
        </p>
      )}
    </header>
  );
}
