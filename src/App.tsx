import { useState } from "react";
import { Header } from "@/components/Header";
import { GlassCursor } from "@/components/GlassCursor";
import { BackgroundGradient } from "@/components/BackgroundGradient";
import { ShortenForm } from "@/components/ShortenForm";
import { ShortenResultCard } from "@/components/ShortenResultCard";
import { HistoryTable } from "@/components/HistoryTable";
import type { UrlShortenerModel } from "@/lib/api/types";

export default function App() {
  const [result, setResult] = useState<{
    data: UrlShortenerModel;
    isExisting: boolean;
  } | null>(null);

  return (
    <div className="relative min-h-full">
      <BackgroundGradient />
      <Header />
      <main className="mx-auto max-w-3xl px-5 pb-24 pt-10 sm:pt-16">
        <section className="mb-10 text-center">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Shorten any link, instantly.
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Free, no account required. Paste a long URL and get a short one in
            a click.
          </p>
        </section>

        <ShortenForm onResult={setResult} />
        {result && (
          <ShortenResultCard
            data={result.data}
            isExisting={result.isExisting}
          />
        )}

        <div className="mt-14">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">
            Recent links
          </h2>
          <HistoryTable />
        </div>
      </main>
    </div>
  );
}
