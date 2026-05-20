import { Link2 } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
      <a href="/" className="flex items-center gap-2 font-semibold tracking-tight">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-primary-foreground">
          <Link2 className="h-4 w-4" />
        </span>
        <span>c-URL</span>
      </a>
      <ThemeToggle />
    </header>
  );
}
