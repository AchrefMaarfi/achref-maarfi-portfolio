import { navLinks } from "@/data/content";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const sectionIds = navLinks.map((link) => link.href.slice(1));

/**
 * Fixed side rail of one line per homepage section. The active section's
 * line stretches; hovering any line reveals its label. Purely a navigation
 * aid — decorative from a screen reader's perspective, since navLinks
 * already exposes the same destinations as real links in the header/menu.
 */
export function SectionMap() {
  const active = useActiveSection(sectionIds);

  return (
    <nav
      aria-hidden="true"
      className="fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 sm:flex md:right-6"
    >
      {navLinks.map((link) => {
        const id = link.href.slice(1);
        const isActive = id === active;

        return (
          <a
            key={id}
            href={link.href}
            className="group flex items-center gap-3"
          >
            <span
              className={cn(
                "text-muted-foreground pointer-events-none text-xs font-medium whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100",
                isActive && "text-foreground",
              )}
            >
              {link.label}
            </span>
            <span
              className={cn(
                "h-0.5 rounded-full transition-all duration-300 ease-out",
                isActive
                  ? "bg-primary w-8"
                  : "bg-foreground/25 group-hover:bg-foreground/50 w-4",
              )}
            />
          </a>
        );
      })}
    </nav>
  );
}
