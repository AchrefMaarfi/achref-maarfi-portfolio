import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { person } from "@/data/content";

/**
 * Lightweight header for project showcase pages. Reuses the homepage's logo
 * mark, but swaps the full section nav for a single back link — showcase
 * pages live outside the homepage's single-page scroll, so #section anchors
 * don't apply here.
 */
export function ShowcaseHeader() {
  const navigate = useNavigate();

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/#projects");
    }
  }

  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:h-20">
        <button
          type="button"
          onClick={handleBack}
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to portfolio
        </button>

        <a
          href="/#home"
          className="group relative text-xl font-extrabold tracking-tight sm:text-2xl"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <span className="absolute inset-0 -z-10 blur-lg opacity-0 transition-opacity group-hover:opacity-35 bg-linear-to-r from-primary to-amber-300" />
          <span className="bg-linear-to-r from-foreground to-primary bg-clip-text text-transparent">
            {person.firstName.toUpperCase()}
          </span>
          <span className="ml-1.5 bg-linear-to-r from-primary to-amber-300 bg-clip-text text-transparent">
            {person.lastName.toUpperCase()}
          </span>
        </a>

        <ThemeToggle />
      </div>
    </header>
  );
}
