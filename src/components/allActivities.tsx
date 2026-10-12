"use client";

import Link from "next/link";
import { useAllActivities } from "../hooks/useActivities";

/* ============================================================
   🎨 CENTRAL THEME — change colors here
============================================================ */
const theme = {
  borderGradient: "bg-gradient-to-b from-white via-zinc-400 to-zinc-700",
  borderGradientThin: "bg-gradient-to-b from-white via-zinc-500 to-zinc-800",
  borderWidth: "p-[2px]",
  borderWidthThin: "p-[1.5px]",
  borderRadius: "rounded-3xl",
  innerRadius: "rounded-[calc(1.5rem-2px)]",
  cardRadius: "rounded-2xl",
  cardInnerRadius: "rounded-[calc(1rem-1.5px)]",

  surfaceSolid: "bg-zinc-950",
  surfaceSoft: "bg-zinc-900/60",

  gradientText:
    "bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent",
  gradientTextMuted:
    "bg-gradient-to-b from-zinc-200 to-zinc-500 bg-clip-text text-transparent",

  muted: "text-zinc-500",
  label: "text-zinc-400",
  error: "text-red-400",
  success: "text-emerald-400",

  publicBadge:
    "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  privateBadge: "bg-red-500/15 text-red-400 border border-red-500/30",
  statPill: "bg-zinc-900/60 border border-zinc-800 text-zinc-300",
};

/* ============================================================
   HELPERS
============================================================ */
function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function visibilityBadge(v?: string) {
  return v?.toUpperCase() === "PUBLIC" ? theme.publicBadge : theme.privateBadge;
}

/* ============================================================
   COMPONENT
============================================================ */
export default function AllActivities() {
  const { data: activities, isLoading, error } = useAllActivities();

  /* ==================== STATES ==================== */
  if (isLoading) {
    return (
      <div
        className={`${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient}`}
      >
        <div
          className={`p-6 ${theme.surfaceSolid} ${theme.innerRadius} ${theme.muted}`}
        >
          Loading activities...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient}`}
      >
        <div
          className={`p-6 ${theme.surfaceSolid} ${theme.innerRadius} ${theme.error}`}
        >
          {error.message}
        </div>
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div
        className={`${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient}`}
      >
        <div
          className={`flex flex-col items-center justify-center py-14 text-center ${theme.surfaceSolid} ${theme.innerRadius}`}
        >
          <div className="mb-3 text-4xl">🌐</div>
          <p className="text-base font-medium text-white">
            No public activities yet
          </p>
          <p className={`mt-1 text-sm ${theme.muted}`}>
            Be the first to create one!
          </p>
        </div>
      </div>
    );
  }

  /* ==================== MAIN ==================== */
  return (
    <div className="max-w-7xl mx-auto space-y-6" id="all-activities">
      {/* ==================== HEADER ==================== */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className={`text-2xl font-semibold ${theme.gradientText}`}>
            All Activities
          </h1>
          <p className={`mt-1 text-sm ${theme.muted}`}>
            Explore public activities you can join.
          </p>
        </div>

        <span className={`text-xs ${theme.muted}`}>
          {activities.length} total
        </span>
      </div>

      {/* ==================== GRID ==================== */}
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {activities.map((activity: any) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   ACTIVITY CARD
============================================================ */
function ActivityCard({ activity }: { activity: any }) {
  const initial = activity.name?.charAt(0).toUpperCase() ?? "?";

  return (
    <Link
      href={`/activities/${activity.id}`}
      className={`group block ${theme.borderWidth} ${theme.cardRadius} ${theme.borderGradient} shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl`}
    >
      <div
        className={`flex h-full flex-col gap-3 p-4 ${theme.surfaceSolid} ${theme.cardInnerRadius}`}
      >
        {/* ==================== HEADER ROW ==================== */}
        <div className="flex items-start gap-3">
          {/* Thumbnail (or gradient placeholder) */}
          {activity.imageUrl ? (
            <div
              className={`${theme.borderWidthThin} rounded-xl ${theme.borderGradientThin} shrink-0`}
            >
              <img
                src={activity.imageUrl}
                alt={activity.name}
                className="h-12 w-12 rounded-[calc(0.75rem-1.5px)] object-cover"
              />
            </div>
          ) : (
            <div
              className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-zinc-800 text-base font-semibold text-zinc-300"
              aria-label={`${activity.name} placeholder`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-600 via-zinc-800 to-zinc-950" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10" />
              <span className="relative">{initial}</span>
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h3
              className={`truncate text-base font-semibold ${theme.gradientText}`}
            >
              {activity.name}
            </h3>

            {/* Visibility badge */}
            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${visibilityBadge(
                  activity.visibility
                )}`}
              >
                {activity.visibility ?? "PUBLIC"}
              </span>
            </div>
          </div>
        </div>

        {/* ==================== DESCRIPTION (1 line) ==================== */}
        {activity.description && (
          <p className={`line-clamp-1 text-xs leading-relaxed ${theme.muted}`}>
            {activity.description}
          </p>
        )}

        {/* ==================== INLINE STATS ROW ==================== */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span className="flex items-center gap-1 text-zinc-300">
            👥{" "}
            <span className="font-semibold text-white">
              {activity.memberCount ?? 0}
            </span>
            <span className={theme.muted}>members</span>
          </span>

          <span className="flex items-center gap-1 text-zinc-300">
            ✅{" "}
            <span className="font-semibold text-white">
              {activity.taskCount ?? 0}
            </span>
            <span className={theme.muted}>tasks</span>
          </span>
        </div>

        {/* ==================== FOOTER ==================== */}
        <div className="mt-auto flex items-center justify-between border-t border-zinc-800 pt-3">
          <p className={`text-[11px] ${theme.muted}`}>
            Created {formatDate(activity.createdAt)}
          </p>

          <span
            className={`text-[11px] font-semibold ${theme.gradientTextMuted} transition group-hover:translate-x-0.5`}
          >
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
