import { ArrowUp } from "lucide-react";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";

/** Floating button, bottom-left, that appears after scrolling and jumps back to the hero. */
export function BackToTop() {
  const visible = useScrolled(600);

  return (
    <a
      href="#home"
      aria-label="Back to top"
      className={cn(
        "bg-primary ring-primary/25 hover:ring-primary/60 hover:shadow-glow-amber text-black fixed bottom-6 right-4 sm:right-10 z-40 flex size-11 items-center justify-center rounded-full ring-1 transition-all duration-300",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </a>
  );
}
