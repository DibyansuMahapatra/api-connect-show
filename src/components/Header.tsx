import { Link } from "react-router-dom";
import { Link2 } from "lucide-react";

export function Header() {
  return (
    <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">

      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2 font-semibold tracking-tight"
      >
        <img
        src="/favicon.png"
        alt="c-URL Logo"
        className="h-8 w-8 rounded-xl object-contain"
        />
        <span>c-URL</span>
      </Link>

      {/* NAV */}
      <nav className="flex items-center gap-4 text-sm text-muted-foreground">

        <Link className="hover:text-foreground transition" to="/about">
          About
        </Link>

        <span className="opacity-40">|</span>

        <Link className="hover:text-foreground transition" to="/developer">
          Developer
        </Link>

      </nav>
    </header>
  );
}