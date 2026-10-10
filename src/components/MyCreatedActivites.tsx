


// // MyActivities.tsx
// "use client";

// import { useQuery } from "@tanstack/react-query";
// import Link from "next/link";
// import { apiFetch } from "../lib/api-client";

// /* ============================================================
//    🎨 CENTRAL THEME — change colors here
// ============================================================ */
// const theme = {
//   pageText: "text-white",

//   borderGradient: "bg-gradient-to-b from-white via-zinc-400 to-zinc-700",
//   borderGradientThin: "bg-gradient-to-b from-white via-zinc-500 to-zinc-800",
//   borderWidth: "p-[2px]",
//   borderWidthThin: "p-[1.5px]",
//   borderRadius: "rounded-2xl",
//   innerRadius: "rounded-[calc(1rem-2px)]",

//   surfaceSolid: "bg-zinc-950",
//   surfaceSoft: "bg-zinc-900/60",

//   gradientText:
//     "bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent",
//   gradientTextMuted:
//     "bg-gradient-to-b from-zinc-200 to-zinc-500 bg-clip-text text-transparent",

//   muted: "text-zinc-500",
//   label: "text-zinc-400",
//   error: "text-red-400",
//   success: "text-emerald-400",

//   ownerBadge: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
//   adminBadge: "bg-blue-500/15 text-blue-300 border border-blue-500/30",
//   memberBadge: "bg-zinc-800 text-zinc-300 border border-zinc-700",

//   publicBadge:
//     "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
//   privateBadge: "bg-red-500/15 text-red-400 border border-red-500/30",

//   progressTrack: "bg-zinc-800",
//   progressFill: "bg-gradient-to-r from-emerald-400 to-emerald-600",
// };

// type Activity = {
//   id: string;
//   name: string;
//   description: string | null;
//   imageUrl: string | null;
//   memberCount: number;
//   taskCount: number;
//   creatorId: string;
//   createdAt: string;
//   updatedAt: string;
//   visibility: "PUBLIC" | "PRIVATE";
// };

// type Membership = {
//   id: string;
//   userId: string;
//   activityId: string;
//   role: "MEMBER" | "ADMIN" | "OWNER";
//   joinedAt: string;
//   leftAt: string | null;
//   isActive: boolean;
//   currentStreak: number;
//   longestStreak: number;
//   completionRate: number;
//   activity: Activity;
// };

// /* ---------- helpers ---------- */
// function roleBadge(role: Membership["role"]) {
//   switch (role) {
//     case "OWNER":
//       return theme.ownerBadge;
//     case "ADMIN":
//       return theme.adminBadge;
//     default:
//       return theme.memberBadge;
//   }
// }

// function visibilityBadge(v: Activity["visibility"]) {
//   return v === "PUBLIC" ? theme.publicBadge : theme.privateBadge;
// }

// /* ============================================================
//    COMPONENT
// ============================================================ */
// export default function MyCreatedActivities() {
//   const { data, isLoading, error } = useQuery<any>({
//     queryKey: ["created-activities"],
//     queryFn: async () => {
//       const response = await apiFetch("/api/activity/created-activities");
//       if (!response.ok) throw new Error("Failed to fetch activities");
//       return response.json();
//     },
//   });

//   /* ==================== STATES ==================== */
//   if (isLoading) {
//     return (
//       <div className={`${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient}`}>
//         <div className={`p-5 ${theme.surfaceSolid} ${theme.innerRadius} ${theme.muted}`}>
//           Loading activities...
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={`${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient}`}>
//         <div className={`p-5 ${theme.surfaceSolid} ${theme.innerRadius} ${theme.error}`}>
//           {(error as Error).message}
//         </div>
//       </div>
//     );
//   }

//   if (!data || data.data.length === 0) {
//     return (
//       <div className={`${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient}`}>
//         <div
//           className={`flex flex-col items-center justify-center py-10 text-center ${theme.surfaceSolid} ${theme.innerRadius}`}
//         >
//           <div className="mb-2 text-3xl">🎯</div>
//           <p className="text-sm font-medium text-white">No activities yet</p>
//           <p className={`mt-1 text-xs ${theme.muted}`}>
//             Create or join an activity to get started.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   /* ==================== MAIN ==================== */
//   return (
//     <div className="w-full">
//       {/* Header */}
//       <div className="flex items-end justify-between">
//         <h1 className={`text-xl font-semibold ${theme.gradientText}`}>
//           Activities Created
//         </h1>
//         <span className={`text-xs ${theme.muted}`}>
//           {data.data.length} total
//         </span>
//       </div>

//       {/* Denser grid — 1 / 2 / 3 / 4 columns */}
//       <div className="grid max-h-[500px] w-full grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2 mt-4">
//       {/* <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 "> */}
//         {data.data.map((membership: any) => (
//           <ActivityCard key={membership.id} membership={membership} />
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ============================================================
//    COMPACT ACTIVITY CARD
// ============================================================ */
// function ActivityCard({ membership }: { membership: Membership }) {
//   const { activity, role, currentStreak, longestStreak, completionRate } =
//     membership;

//   const pct = Math.min(Math.max(completionRate, 0), 100);

//   return (
//     <Link
//       href={`/activities/${activity.id}`}
//       className={`group block ${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient} shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl`}
//     >
//       <div
//         className={`flex h-full flex-col gap-3 p-4 ${theme.surfaceSolid} ${theme.innerRadius}`}
//       >
//         {/* ==================== HEADER ROW ==================== */}
//         <div className="flex items-start gap-3">
//           {/* Thumbnail (smaller) */}
//           {activity.imageUrl ? (
//             <div
//               className={`${theme.borderWidthThin} rounded-xl ${theme.borderGradientThin} flex-shrink-0`}
//             >
//               <img
//                 src={activity.imageUrl}
//                 alt={activity.name}
//                 className="h-11 w-11 rounded-[calc(0.75rem-1.5px)] object-cover"
//               />
//             </div>
//           ) : (
//             <div
//               className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-700 to-zinc-900 text-base font-semibold ${theme.gradientTextMuted}`}
//             >
//               {activity.name?.charAt(0).toUpperCase() ?? "?"}
//             </div>
//           )}

//           <div className="min-w-0 flex-1">
//             <h3
//               className={`truncate text-base font-semibold ${theme.gradientText}`}
//             >
//               {activity.name}
//             </h3>

//             {/* Role + visibility inline with the title */}
//             <div className="mt-1 flex flex-wrap items-center gap-1.5">
//               <span
//                 className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${roleBadge(role)}`}
//               >
//                 {role}
//               </span>
//               <span
//                 className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${visibilityBadge(activity.visibility)}`}
//               >
//                 {activity.visibility}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* ==================== DESCRIPTION (1 line) ==================== */}
//         {activity.description && (
//           <p className={`line-clamp-1 text-xs leading-relaxed ${theme.muted}`}>
//             {activity.description}
//           </p>
//         )}

//         {/* ==================== INLINE STATS ROW ==================== */}
//         <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
//           <span className="flex items-center gap-1 text-zinc-300">
//             🔥 <span className="font-semibold text-white">{currentStreak}</span>
//             <span className={theme.muted}>current</span>
//           </span>

//           <span className="flex items-center gap-1 text-zinc-300">
//             🏆 <span className="font-semibold text-white">{longestStreak}</span>
//             <span className={theme.muted}>best</span>
//           </span>

//           <span className="flex items-center gap-1 text-zinc-300">
//             👥 <span className="font-semibold text-white">{activity.memberCount}</span>
//           </span>

//           <span className="flex items-center gap-1 text-zinc-300">
//             ✅ <span className="font-semibold text-white">{activity.taskCount}</span>
//           </span>
//         </div>

//         {/* ==================== PROGRESS (compact) ==================== */}
//         <div className="flex items-center gap-2">
//           <div
//             className={`h-1.5 flex-1 overflow-hidden rounded-full ${theme.progressTrack}`}
//           >
//             <div
//               className={`h-full rounded-full ${theme.progressFill} transition-all`}
//               style={{ width: `${pct}%` }}
//             />
//           </div>
//           <span className={`w-9 text-right text-xs font-semibold ${theme.gradientText}`}>
//             {pct.toFixed(0)}%
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// MyCreatedActivities.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { apiFetch } from "../lib/api-client";

/* ============================================================
   🎨 CENTRAL THEME — change colors here
============================================================ */
const theme = {
  // Thin gradient hairline around each card
  cardBorder: "bg-gradient-to-b from-zinc-600/70 to-zinc-800/30",
  cardBorderHover: "hover:from-zinc-400/80 hover:to-zinc-700/40",
  cardInnerRadius: "rounded-[calc(0.75rem-1px)]",
  surfaceSolid: "bg-zinc-950",

  gradientText:
    "bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent",
  gradientTextMuted:
    "bg-gradient-to-b from-zinc-200 to-zinc-500 bg-clip-text text-transparent",

  muted: "text-zinc-500",
  label: "text-zinc-400",
  error: "text-red-400",

  ownerBadge: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
  adminBadge: "bg-blue-500/15 text-blue-300 border border-blue-500/30",
  memberBadge: "bg-zinc-800 text-zinc-300 border border-zinc-700",

  publicBadge:
    "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  privateBadge: "bg-red-500/15 text-red-400 border border-red-500/30",

  progressTrack: "bg-zinc-800",
  progressFill: "bg-gradient-to-r from-emerald-400 to-emerald-600",
};

type Activity = {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  memberCount: number;
  taskCount: number;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
  visibility: "PUBLIC" | "PRIVATE";
};

type Membership = {
  id: string;
  userId: string;
  activityId: string;
  role: "MEMBER" | "ADMIN" | "OWNER";
  joinedAt: string;
  leftAt: string | null;
  isActive: boolean;
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
  activity: Activity;
};

/* ---------- helpers ---------- */
function roleBadge(role: Membership["role"]) {
  switch (role) {
    case "OWNER":
      return theme.ownerBadge;
    case "ADMIN":
      return theme.adminBadge;
    default:
      return theme.memberBadge;
  }
}

function visibilityBadge(v: Activity["visibility"]) {
  return v === "PUBLIC" ? theme.publicBadge : theme.privateBadge;
}

/* ============================================================
   COMPONENT
============================================================ */
type MyCreatedActivitiesProps = {
  /** Show only the first N cards (used for dashboard previews) */
  limit?: number;
  /** Renders a "View all" button in the header when provided */
  onViewAll?: () => void;
};

export default function MyCreatedActivities({
  limit,
  onViewAll,
}: MyCreatedActivitiesProps) {
  const { data, isLoading, error } = useQuery<any>({
    queryKey: ["created-activities"],
    queryFn: async () => {
      const response = await apiFetch("/api/activity/created-activities");
      if (!response.ok) throw new Error("Failed to fetch activities");
      return response.json();
    },
  });

  /* ==================== STATES ==================== */
  if (isLoading) {
    return (
      <div className="w-full">
        <Header title="Created by me" />
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2" aria-busy="true">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-[104px] animate-pulse rounded-xl border border-zinc-800/80 bg-zinc-900/40"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <Header title="Created by me" />
        <p className={`py-6 text-sm ${theme.error}`}>
          {(error as Error).message}
        </p>
      </div>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <div className="w-full">
        <Header title="Created by me" count={0} />
        <div className="py-10 text-center">
          <div className="mb-2 text-3xl">🎯</div>
          <p className="text-sm font-medium text-white">No activities yet</p>
          <p className={`mt-1 text-xs ${theme.muted}`}>
            Create or join an activity to get started.
          </p>
        </div>
      </div>
    );
  }

  const items = limit ? data.data.slice(0, limit) : data.data;

  /* ==================== MAIN ==================== */
  return (
    <div className="w-full">
      <Header
        title="Created by me"
        count={data.data.length}
        onViewAll={onViewAll}
      />

      <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
        {items.map((membership: any) => (
          <ActivityCard key={membership.id} membership={membership} />
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   HEADER
============================================================ */
function Header({
  title,
  count,
  onViewAll,
}: {
  title: string;
  count?: number;
  onViewAll?: () => void;
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <div className="flex items-baseline gap-2">
        <h2 className={`text-sm font-semibold ${theme.gradientText}`}>
          {title}
        </h2>
        {count !== undefined && (
          <span className={`text-xs tabular-nums ${theme.muted}`}>{count}</span>
        )}
      </div>

      {onViewAll && (
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-medium text-zinc-400 transition hover:text-white"
        >
          View all →
        </button>
      )}
    </div>
  );
}

/* ============================================================
   COMPACT ACTIVITY CARD
============================================================ */
function ActivityCard({ membership }: { membership: Membership }) {
  const { activity, role, currentStreak, longestStreak, completionRate } =
    membership;

  const pct = Math.min(Math.max(completionRate, 0), 100);

  return (
    <Link
      href={`/activities/${activity.id}`}
      title={activity.description ?? undefined}
      className={`group block rounded-xl p-px transition-all hover:-translate-y-0.5 ${theme.cardBorder} ${theme.cardBorderHover}`}
    >
      <div
        className={`flex h-full flex-col gap-2.5 p-3 ${theme.surfaceSolid} ${theme.cardInnerRadius}`}
      >
        {/* ==================== HEADER ROW ==================== */}
        <div className="flex items-center gap-2.5">
          {activity.imageUrl ? (
            <img
              src={activity.imageUrl}
              alt={activity.name}
              className="h-9 w-9 shrink-0 rounded-lg border border-zinc-800 object-cover"
            />
          ) : (
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-gradient-to-b from-zinc-700 to-zinc-900 text-sm font-semibold ${theme.gradientTextMuted}`}
            >
              {activity.name?.charAt(0).toUpperCase() ?? "?"}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold text-white">
              {activity.name}
            </h3>

            <div className="mt-0.5 flex flex-wrap items-center gap-1">
              <span
                className={`rounded-full px-1.5 py-px text-[9px] font-semibold uppercase tracking-wider ${roleBadge(
                  role
                )}`}
              >
                {role}
              </span>
              <span
                className={`rounded-full px-1.5 py-px text-[9px] font-semibold uppercase tracking-wider ${visibilityBadge(
                  activity.visibility
                )}`}
              >
                {activity.visibility}
              </span>
            </div>
          </div>
        </div>

        {/* ==================== INLINE STATS ==================== */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px]">
          <span className="flex items-center gap-1 text-zinc-300">
            🔥{" "}
            <span className="font-semibold tabular-nums text-white">
              {currentStreak}
            </span>
          </span>

          <span className="flex items-center gap-1 text-zinc-300">
            🏆{" "}
            <span className="font-semibold tabular-nums text-white">
              {longestStreak}
            </span>
          </span>

          <span className="flex items-center gap-1 text-zinc-300">
            👥{" "}
            <span className="font-semibold tabular-nums text-white">
              {activity.memberCount}
            </span>
          </span>

          <span className="flex items-center gap-1 text-zinc-300">
            ✅{" "}
            <span className="font-semibold tabular-nums text-white">
              {activity.taskCount}
            </span>
          </span>
        </div>

        {/* ==================== PROGRESS ==================== */}
        <div className="flex items-center gap-2">
          <div
            className={`h-1 flex-1 overflow-hidden rounded-full ${theme.progressTrack}`}
          >
            <div
              className={`h-full rounded-full ${theme.progressFill} transition-all`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="w-8 text-right text-[11px] font-semibold tabular-nums text-zinc-300">
            {pct.toFixed(0)}%
          </span>
        </div>
      </div>
    </Link>
  );
}