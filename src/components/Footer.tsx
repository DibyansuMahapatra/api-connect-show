import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mx-auto mt-16 max-w-3xl px-4 sm:px-6 lg:px-8 pb-8">
      <div className="glass relative overflow-hidden rounded-2xl border border-white/10 px-6 py-5">
        {/* light glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at top left, hsl(var(--blob-1) / .18), transparent 45%)",
          }}
        />

        <div className="relative flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-sm font-medium">
              Found a bug or have an idea?
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              I'd love to hear your feedback.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:2005230@kiit.ac.in?subject=${encodeURIComponent(
                "c-URL Feedback"
              )}&body=${encodeURIComponent(
                "Hi,\n\nI'd like to share the following feedback:\n\n"
              )}`}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-accent/30 transition-all hover:bg-accent hover:scale-105"
              aria-label="Send feedback"
            >
              <Mail className="h-4 w-4" />
            </a>

            <a
              href="https://www.linkedin.com/in/dibyansu-mahapatra/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-accent/30 transition-all hover:bg-accent hover:scale-105"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>

            <a
              href="https://github.com/DibyansuMahapatra"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-accent/30 transition-all hover:bg-accent hover:scale-105"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Built with ❤️ from 🇮🇳.
      </p>
    </footer>
  );
}