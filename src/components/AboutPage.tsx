import { Header } from "./Header";
import { BackgroundGradient } from "./BackgroundGradient";
import { GlassCursor } from "./GlassCursor";

export function AboutPage() {
  return (
    <div className="relative min-h-full">
      <BackgroundGradient />
      <GlassCursor />
      <Header />

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 pt-8 sm:pt-12 lg:pt-16">
        {/* HERO */}
        <section className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            About c-URL
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
            c-URL is a fast, free URL shortener that turns long links into clean,
            shareable URLs in seconds — with no account required.
          </p>
        </section>

        {/* WHAT IS */}
        <section className="glass mt-8 sm:mt-10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
            What is c-URL?
          </h2>

          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-7">
            c-URL is a lightweight URL shortening service that converts long web
            addresses into shorter, easier-to-share links. It is built for speed,
            simplicity, and usability.
          </p>

          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-7">
            No accounts, no dashboards, no friction — just instant link shortening.
          </p>
        </section>

        {/* WHY USE */}
        <section className="glass mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
            Why use a URL shortener?
          </h2>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base text-muted-foreground">
            {[
              "Cleaner links for social media",
              "Easier sharing in chats and emails",
              "Better readability in documents",
              "Professional appearance for branding",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-border/60 bg-background/20 p-4"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="glass mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
            Features
          </h2>

          <ul className="mt-5 sm:mt-6 space-y-3 text-sm sm:text-base text-muted-foreground">
            <li>• Instant URL shortening</li>
            <li>• No account required</li>
            <li>• Fast redirects</li>
            <li>• Works on all devices</li>
            <li>• Clean modern UI</li>
          </ul>
        </section>

        {/* HOW IT WORKS */}
        <section className="glass mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
            How it works
          </h2>

          <ol className="mt-5 sm:mt-6 space-y-3 text-sm sm:text-base text-muted-foreground">
            <li>Step 1: Paste the long URL you want to make compact</li>
            <li>Step 2 (Optional): Add your custom alias to make your link unique or easy to remember. PS: It looks kinda cool, not gonna lie.</li>
            <li>Step 3: Click the "Shorten Button" </li>
            <li>Step 4: Get a short link instantly</li>
            <li>Step 5: Use or Share it anywhere</li>
          </ol>
        </section>

         {/* SYSTEM DESIGN (NEW ENGINEERING SECTION) */}
        <section className="glass mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
            System Architecture
          </h2>

          <ul className="mt-5 space-y-3 text-sm sm:text-base text-muted-foreground">
            <li>• Layered architecture (Controller → Service → Repository)</li>
            <li>• PostgreSQL as primary database</li>
            <li>• Redis for caching and fast redirects</li>
            <li>• TTL-based expiration system (2-hour lifecycle)</li>
            <li>• Scheduled cleanup of expired URLs</li>
            <li>• Click tracking via atomic DB updates</li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="glass mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
            Frequently Asked Questions
          </h2>

          <div className="mt-5 sm:mt-6 space-y-5 text-sm sm:text-base text-muted-foreground">
            <div>
              <h3 className="font-medium text-foreground">
                Is c-URL free?
              </h3>
              <p className="mt-1">
                Ofcourse, it is completely free to use.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-foreground">
                Do links expire?
              </h3>
              <p className="mt-1">
                Yeah, links remain active for 1 hour from the time of creation.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-foreground">
                Can I use it for marketing?
              </h3>
              <p className="mt-1">
                Yes, it was made for campaigns and sharing. *Shh!* Bringing Analytics later on if I get supported ❤️ It takes effort and ☕ for creating magic as an Independent Developer 😁
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-10 sm:mt-12 text-center">
          <a
            href="/"
            className="inline-flex rounded-xl sm:rounded-2xl bg-primary px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-primary-foreground transition hover:opacity-90"
          >
            Start shortening links
          </a>
        </section>
      </main>
    </div>
  );
}