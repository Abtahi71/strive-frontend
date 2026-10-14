"use client";

import Link from "next/link";
import { useCurrentUser } from "../hooks/useUsers";

/* ============================================================
   🎨 CENTRAL THEME — change colors here
============================================================ */
const theme = {
  navBg: "bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800",

  borderGradientThin: "bg-gradient-to-b from-white via-zinc-500 to-zinc-800",
  borderWidthThin: "p-[1.5px]",
  borderRadius: "rounded-xl",

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
};

export default function Navbar() {
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useCurrentUser();

  return (
    <nav
      className={`sticky top-0 z-40 w-full ${theme.navBg}`}
      aria-label="Main navigation"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-3 lg:px-12">
        {/* ==================== LOGO ==================== */}
        <Link href="/" className="flex items-center gap-2.5">
          {/* Gradient-bordered logo */}
          <div
            className={`${theme.borderWidthThin} ${theme.borderRadius} ${theme.borderGradientThin}`}
          >
            <div className="flex h-9 w-13 items-center justify-center overflow-hidden rounded-[calc(0.75rem-1.5px)] bg-zinc-950">
              <img
                src="/logo.jpg"
                alt="Strive logo"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

         
        </Link>

        {/* ==================== NAV LINKS ==================== */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* ---------- Loading skeleton ---------- */}
          {userLoading && (
            <>
              <div className="h-8 w-16 animate-pulse rounded-xl bg-zinc-800" />
              <div className="h-8 w-20 animate-pulse rounded-xl bg-zinc-800" />
            </>
          )}

          {/* ---------- Authenticated ---------- */}
          {!userLoading && user && (
            <>
              {/* Dashboard — primary */}
              <Link
                href="/dashboard"
                className={`hidden rounded-xl px-4 py-2 text-sm font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 sm:inline-block ${theme.primaryBtn}`}
              >
                Dashboard
              </Link>

              {/* Profile — with avatar */}
              <Link
                href="/profile"
                className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-medium transition ${theme.ghostBtn}`}
              >
                {/* Avatar */}
                
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border border-zinc-700 bg-gradient-to-b from-zinc-700 to-zinc-900 text-[10px] font-semibold ${theme.gradientTextMuted}`}
                  >
                    {user?.username?.charAt(0).toUpperCase() ?? "?"}
                  </span>
                
                <span className="hidden sm:inline">
                  {user?.username ?? "Profile"}
                </span>
              </Link>

              {/* Logout — subtle */}
              <Link
                href="/logout"
                className={`rounded-xl px-3 py-2 text-sm font-medium transition ${theme.ghostBtn}`}
              >
                Logout
              </Link>
            </>
          )}

          {/* ---------- Unauthenticated ---------- */}
          {!userLoading && !user && (
            <>
              <Link
                href="/login"
                className={`rounded-xl px-3.5 py-2 text-sm font-medium transition ${theme.ghostBtn}`}
              >
                Login
              </Link>

              <Link
                href="/register"
                className={`rounded-xl px-4 py-2 text-sm font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 ${theme.primaryBtn}`}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
