import { useEffect } from "react";

import { Header } from "./Header";
import { BackgroundGradient } from "./BackgroundGradient";
import { GlassCursor } from "./GlassCursor";
import { UpiQR } from "./UpiQR";
import EarthScene from "./EarthScene";

export function DeveloperPage() {
  // 🔒 FORCE DARK MODE ONLY FOR THIS PAGE
  useEffect(() => {
    document.documentElement.className = "dark";
  }, []);

  return (
    <div className="relative min-h-full overflow-x-hidden">

      <BackgroundGradient />
      <GlassCursor />
      <Header />

      {/* 🌍 FIXED 3D BACKGROUND */}
      <div className="fixed inset-0 w-full h-screen -z-10">
        <EarthScene />
      </div>

      <main className="relative z-10 w-full pb-20">

        {/* ================= HERO ================= */}
        <section className="relative w-full min-h-screen overflow-hidden">

          {/* DARK OVERLAY FOR READABILITY */}
          <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* OVERLAY TEXT */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 sm:pb-20 px-4 text-center z-10">

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
              Dibyansu Mahapatra
            </h1>

            <p className="mt-2 text-muted-foreground text-sm sm:text-base lg:text-lg">
              Associate Software Developer • Backend Engineer • API Architect
            </p>

            <p className="mt-4 max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed">
              I build scalable backend systems, REST APIs, and performance-focused
              applications using Spring Boot, PostgreSQL, Redis, and Docker.
            </p>

            {/* LINKS */}
            <div className="mt-5 flex flex-wrap gap-3 justify-center">

              <a
                href="https://github.com/DibyansuMahapatra"
                className="px-4 py-2 rounded-xl bg-background/20 border border-border/60 text-sm hover:bg-background/40 transition"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/dibyansu-mahapatra/"
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm hover:opacity-90 transition"
              >
                LinkedIn
              </a>

            </div>

          </div>
        </section>

        {/* ================= CONTENT ================= */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          {/* spacer for scroll breathing */}
          <div className="h-[10vh]" />

          {/* STATS */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
            {[
              { label: "Experience", value: "2+ Years" },
              { label: "Backend Focus", value: "Spring Boot" },
              { label: "Project", value: "c-URL API" }
            ].map((item) => (
              <div
                key={item.label}
                className="glass rounded-2xl p-5 text-center"
              >
                <p className="text-2xl font-semibold">{item.value}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.label}
                </p>
              </div>
            ))}
          </section>

          {/* ABOUT */}
          <section className="glass mt-8 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold">About Me</h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-7">
              I am a backend-focused software engineer who enjoys building clean,
              scalable systems and APIs. I specialize in Java, Spring Boot, and
              distributed system patterns like caching, scheduling, and DB optimization.
            </p>
          </section>

          {/* EXPERIENCE */}
          <section className="glass mt-6 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold">Experience</h2>

            <div className="mt-5 space-y-5 text-sm sm:text-base text-muted-foreground">

              <div>
                <p className="text-foreground font-medium">
                  Associate Software Developer — Rumango Services Pvt. Ltd.
                </p>
                <p>2025 – Present</p>
              </div>

              <div>
                <p className="text-foreground font-medium">
                  SDE Trainee — KPIT
                </p>
                <p>2024 – 2025</p>
              </div>

            </div>
          </section>

          {/* SKILLS */}
          <section className="glass mt-6 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold">Tech Stack</h2>

            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">

              {[
                "Java",
                "Spring Boot",
                "PostgreSQL",
                "Redis",
                "Docker",
                "REST APIs",
                "React",
                "TypeScript",
                "Tailwind CSS"
              ].map((skill) => (
                <div
                  key={skill}
                  className="rounded-xl border border-border/60 bg-background/20 p-3 text-center"
                >
                  {skill}
                </div>
              ))}

            </div>
          </section>

          {/* PROJECT */}
          <section className="glass mt-6 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Featured Project
            </h2>

            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-7">
              c-URL — A production-grade URL shortener built with Spring Boot,
              PostgreSQL, Redis caching, and Docker.
            </p>

            <a
              href="/"
              className="inline-block mt-4 text-primary text-sm hover:underline"
            >
              View live project →
            </a>
          </section>

          <UpiQR />

          {/* CTA */}
          <section className="mt-10 text-center">
            <a
              href="/"
              className="inline-flex rounded-2xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
            >
              Back to c-URL
            </a>
          </section>

        </div>
      </main>
    </div>
  );
}