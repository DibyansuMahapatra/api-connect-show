import { Link } from "react-router-dom";
import { Link2 } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
      
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2 font-semibold tracking-tight"
      >
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-primary-foreground">
          <Link2 className="h-4 w-4" />
        </span>
        <span>c-URL</span>
      </Link>

      {/* Right side nav */}
      <div className="flex items-center gap-4">
        
        <Link
          to="/about"
          className="text-sm text-muted-foreground hover:text-foreground transition"
        >
          About
        </Link>

        <Link
          to="/developer"
          className="text-sm text-muted-foreground hover:text-foreground transition"
        >
          Developer
        </Link>

        <ThemeToggle />
      </div>
    </header>
  );
}