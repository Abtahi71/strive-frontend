"use client";

import Link from "next/link";

/* ============================================================
   🎨 CENTRAL THEME — change colors here
============================================================ */
const theme = {
  pageBg: "bg-zinc-950",
  pageText: "text-white",

  borderGradient: "bg-gradient-to-b from-white via-zinc-400 to-zinc-700",
  borderGradientThin: "bg-gradient-to-b from-white via-zinc-500 to-zinc-800",
  borderWidth: "p-[2px]",
  borderWidthThin: "p-[1.5px]",
  borderRadius: "rounded-3xl",
  innerRadius: "rounded-[calc(1.5rem-2px)]",

  surfaceSolid: "bg-zinc-950",
  surfaceSoft: "bg-zinc-900/60",

  gradientText:
    "bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent",
  gradientTextMuted:
    "bg-gradient-to-b from-zinc-200 to-zinc-500 bg-clip-text text-transparent",

  primaryBtn:
    "bg-gradient-to-b from-white to-zinc-300 text-zinc-900 hover:from-white hover:to-white",
  ghostBtn:
    "border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white",

  muted: "text-zinc-500",
  label: "text-zinc-400",
  accent: "text-blue-400",
};

export default function Hero() {
  return (
    <section
      className={`relative w-full overflow-hidden ${theme.pageBg} ${theme.pageText}`}
    >
      {/* ==================== ANIMATED BACKGROUND ==================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top-left blob */}
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" />
        {/* Bottom-right blob */}
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-fuchsia-500/15 blur-[120px]" />
        {/* Center glow */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[150px]" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Fade to bottom */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent" />
      </div>

      {/* ==================== CONTENT ==================== */}
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-24 text-center lg:px-12 lg:py-32">
        {/* ---------- Top pill ---------- */}
        <div
          className={`mb-8 ${theme.borderWidthThin} ${theme.borderRadius} ${theme.borderGradientThin}`}
        >
          <div
            className={`flex items-center gap-2 rounded-[calc(1.5rem-1.5px)] bg-zinc-950/80 px-4 py-1.5 backdrop-blur`}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-zinc-300">
              v1.0 — now with activity streaks & chat
            </span>
          </div>
        </div>

        {/* ---------- Headline ---------- */}
        <h1
          className={`max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl ${theme.gradientText}`}
        >
          Build better habits,
          <br />
          one day at a time.
        </h1>

        {/* ---------- Subheadline ---------- */}
        <p
          className={`mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl ${theme.muted}`}
        >
          <span className="text-zinc-300">Strive</span> is your personal
          self-improvement tracker. Create activities, log progress, compete
          with friends, and watch your streaks grow.
        </p>

        {/* ---------- CTAs ---------- */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/register"
            className={`rounded-2xl px-7 py-3.5 text-sm font-semibold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 ${theme.primaryBtn}`}
          >
            Get started — it's free
          </Link>

          <a
            href="#all-activities"
            className={`rounded-2xl px-7 py-3.5 text-sm font-semibold backdrop-blur transition ${theme.ghostBtn}`}
          >
            Explore activities →
          </a>
        </div>

        {/* ---------- Small trust line ---------- */}
        <p className={`mt-6 text-xs ${theme.muted}`}>
          No credit card · Open source · Built for focus
        </p>

        {/* ==================== MOCK PREVIEW ==================== */}
        <div
          className={`mt-16 w-full max-w-4xl ${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient} shadow-2xl`}
        >
          <div
            className={`overflow-hidden ${theme.surfaceSolid} ${theme.innerRadius}`}
          >
            {/* Fake browser bar */}
            <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
              <span className="ml-3 text-xs text-zinc-500">
                strive.app/dashboard
              </span>
            </div>

            {/* Dashboard preview grid */}
            <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-3">
              {/* Streak card */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                <p
                  className={`text-xs uppercase tracking-wider ${theme.label}`}
                >
                  Current streak
                </p>
                <p className="mt-1 text-3xl font-bold text-white">
                  🔥 <span className="text-white">12</span>
                </p>
                <p className={`mt-1 text-xs ${theme.muted}`}>days in a row</p>
              </div>

              {/* Completion card */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                <p
                  className={`text-xs uppercase tracking-wider ${theme.label}`}
                >
                  Completion
                </p>
                <p className="mt-1 text-3xl font-bold text-white">84%</p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600" />
                </div>
              </div>

              {/* Members card */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                <p
                  className={`text-xs uppercase tracking-wider ${theme.label}`}
                >
                  Friends
                </p>
                <p className="mt-1 text-3xl font-bold text-white">👥 8</p>
                <p className={`mt-1 text-xs ${theme.muted}`}>
                  keeping you accountable
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== FEATURE STRIP ==================== */}
        <div className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { icon: "🎯", label: "Goals" },
            { icon: "📊", label: "Analytics" },
            { icon: "🏆", label: "Achievements" },
            { icon: "💬", label: "Community" },
          ].map((f) => (
            <div
              key={f.label}
              className={`${theme.borderWidthThin} rounded-2xl ${theme.borderGradientThin}`}
            >
              <div
                className={`flex flex-col items-center gap-1 rounded-[calc(1rem-1.5px)] bg-zinc-950 px-3 py-4`}
              >
                <span className="text-2xl">{f.icon}</span>
                <span className="text-xs font-medium text-zinc-300">
                  {f.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
