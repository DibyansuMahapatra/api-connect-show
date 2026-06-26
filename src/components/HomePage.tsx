import { useState } from "react";
import { Header } from "./Header";
import { GlassCursor } from "./GlassCursor";
import { BackgroundGradient } from "./BackgroundGradient";
import { ShortenForm } from "./ShortenForm";
import { ShortenResultCard } from "./ShortenResultCard";
import { HistoryTable } from "./HistoryTable";
import type { UrlShortenerModel } from "@/lib/api/types";
import { FloatingThemeToggle } from "./FloatingThemeToggle";

export function HomePage() {
  const [result, setResult] = useState<{
    data: UrlShortenerModel;
    isExisting: boolean;
  } | null>(null);

  return (
    <div className="relative min-h-full">
      <BackgroundGradient />
      <GlassCursor />
      <Header />

      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 pt-8 sm:pt-12 lg:pt-16">
        {/* HERO */}
        <section className="mb-8 sm:mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Shorten any link, instantly.
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            Free, no account required. Paste a long URL and get a short one in a click.
          </p>

          <a
            href="/about"
            className="mt-5 inline-block text-sm font-medium text-primary hover:underline"
          >
            Learn more about c-URL →
          </a>
        </section>

        {/* FORM */}
        <section className="w-full">
          <ShortenForm onResult={setResult} />
        </section>

        {/* RESULT */}
        {result && (
          <section className="mt-6 sm:mt-8">
            <ShortenResultCard
              data={result.data}
              isExisting={result.isExisting}
            />
          </section>
        )}

        {/* HISTORY */}
        <section className="mt-10 sm:mt-14">
          <h2 className="mb-4 text-base sm:text-lg font-semibold tracking-tight">
            Recent links
          </h2>

          <div className="w-full overflow-x-auto">
            <HistoryTable />
          </div>
        </section>
      </main>
      <FloatingThemeToggle />
    </div>
  );
}