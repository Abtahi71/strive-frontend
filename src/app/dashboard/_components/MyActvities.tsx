


// "use client";

// import { apiFetch } from "@/src/lib/api-client";
// import { useQuery } from "@tanstack/react-query";
// import Link from "next/link";

// const theme = {
//   pageText: "text-white",

//   borderGradient:
//     "bg-gradient-to-b from-white/20 via-zinc-700/40 to-zinc-800/20",

//   surfaceSolid: "bg-zinc-950",

//   gradientText:
//     "bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent",

//   gradientTextMuted:
//     "bg-gradient-to-b from-zinc-300 to-zinc-500 bg-clip-text text-transparent",

//   muted: "text-zinc-500",
//   label: "text-zinc-400",
//   error: "text-red-400",

//   ownerBadge: "bg-amber-500/10 text-amber-300 border border-amber-500/20",

//   adminBadge: "bg-blue-500/10 text-blue-300 border border-blue-500/20",

//   memberBadge: "bg-zinc-800/80 text-zinc-300 border border-zinc-700",

//   publicBadge:
//     "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",

//   privateBadge: "bg-red-500/10 text-red-400 border border-red-500/20",

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

// type MyActivitiesResponse = {
//   success: boolean;
//   message: string;
//   data: Membership[];
// };

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

// function formatDate(dateStr?: string) {
//   if (!dateStr) return "—";

//   return new Date(dateStr).toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   });
// }

// export default function MyActivities() {
//   const { data, isLoading, error } = useQuery<MyActivitiesResponse>({
//     queryKey: ["my-activities"],
//     queryFn: async () => {
//       const response = await apiFetch("/api/activity/my-activities",{
//         credentials: "include",});

//       if (!response.ok) {
//         throw new Error("Failed to fetch activities");
//       }

//       return response.json();
//     },
//   });

//   if (isLoading) {
//     return (
//       <section className="w-full">
//         <DashboardSectionHeader title="My Activities" />

//         <div className="border-y border-zinc-800 py-8">
//           <p className={`text-sm ${theme.muted}`}>Loading activities...</p>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="w-full">
//         <DashboardSectionHeader title="My Activities" />

//         <div className="border-y border-zinc-800 py-8">
//           <p className={`text-sm ${theme.error}`}>{(error as Error).message}</p>
//         </div>
//       </section>
//     );
//   }

//   if (!data || data.data.length === 0) {
//     return (
//       <section className="w-full">
//         <DashboardSectionHeader title="My Activities" count={0} />

//         <div className="border-y border-zinc-800 py-14 text-center">
//           <div className="mb-3 text-4xl">🎯</div>

//           <p className="text-base font-medium text-white">No activities yet</p>

//           <p className={`mt-1 text-sm ${theme.muted}`}>
//             Create or join an activity to get started.
//           </p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="w-full">
//       <DashboardSectionHeader title="My Activities" count={data.data.length} />

//       <div className="divide-y max-h-[400px] divide-zinc-800 border-y border-zinc-800">
//         {data.data.map((membership:any) => (
//           <ActivityRow key={membership.id} membership={membership} />
//         ))}
//       </div>
//     </section>
//   );
// }

// /* ============================================================
//    SECTION HEADER
// ============================================================ */

// function DashboardSectionHeader({
//   title,
//   count,
// }: {
//   title: string;
//   count?: number;
// }) {
//   return (
//     <div className="mb-4 flex items-center justify-between">
//       <h2 className={`text-xl font-semibold ${theme.gradientText}`}>{title}</h2>

//       {count !== undefined && (
//         <span className={`text-sm ${theme.muted}`}>
//           {count} {count === 1 ? "activity" : "activities"}
//         </span>
//       )}
//     </div>
//   );
// }

// /* ============================================================
//    ACTIVITY ROW
// ============================================================ */

// function ActivityRow({ membership }: { membership: Membership }) {
//   const { activity, role, currentStreak, completionRate } = membership;

//   const pct = Math.min(Math.max(completionRate ?? 0, 0), 100);

//   return (
//     <Link
//       href={`/activities/${activity.id}`}
//       className="group block px-1 py-5 transition-colors hover:bg-zinc-900/40"
//     >
//       <div className="flex items-center gap-4">
//         {/* IMAGE */}
//         {activity.imageUrl ? (
//           <img
//             src={activity.imageUrl}
//             alt={activity.name}
//             className="h-12 w-12 shrink-0 rounded-xl object-cover"
//           />
//         ) : (
//           <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-zinc-800">
//             {/* Base gradient */}
//             <div className="absolute inset-0 bg-gradient-to-br from-zinc-600 via-zinc-800 to-zinc-950" />
//             {/* Diagonal shine */}
//             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10" />
//             {/* Image icon */}
//             <div className="absolute inset-0 flex items-center justify-center text-zinc-500">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1.8"
//                 className="h-5 w-5"
//               >
//                 <rect x="3" y="3" width="18" height="18" rx="2" />
//                 <circle cx="9" cy="9" r="1.6" />
//                 <path d="M21 15l-5-5L5 21" />
//               </svg>
//             </div>
//           </div>
//         )}

//         {/* MAIN INFO */}
//         <div className="min-w-0 flex-1">
//           <div className="flex items-center gap-2">
//             <h3
//               className={`truncate text-base font-semibold ${theme.gradientText}`}
//             >
//               {activity.name}
//             </h3>

//             <span
//               className={`hidden rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide sm:inline-flex ${roleBadge(
//                 role
//               )}`}
//             >
//               {role}
//             </span>
//           </div>

//           {activity.description && (
//             <p className={`mt-1 line-clamp-1 text-sm ${theme.muted}`}>
//               {activity.description}
//             </p>
//           )}

//           {/* META */}
//           <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
//             <span className={theme.label}>👥 {activity.memberCount}</span>

//             <span className={theme.label}>✓ {activity.taskCount} tasks</span>

//             <span
//               className={`rounded-full border px-2 py-0.5 ${visibilityBadge(
//                 activity.visibility
//               )}`}
//             >
//               {activity.visibility}
//             </span>

//             <span className="text-zinc-600">
//               Joined {formatDate(membership.joinedAt)}
//             </span>
//           </div>
//         </div>

//         {/* PROGRESS */}
//         <div className="hidden w-36 shrink-0 sm:block">
//           <div className="mb-1 flex items-center justify-between">
//             <span className="text-xs text-zinc-500">Progress</span>

//             <span className="text-xs font-semibold text-zinc-300">
//               {pct.toFixed(0)}%
//             </span>
//           </div>

//           <div
//             className={`h-1.5 overflow-hidden rounded-full ${theme.progressTrack}`}
//           >
//             <div
//               className={`h-full rounded-full ${theme.progressFill}`}
//               style={{ width: `${pct}%` }}
//             />
//           </div>
//         </div>

//         {/* STREAK */}
//         <div className="hidden w-20 shrink-0 text-center md:block">
//           <p className="text-xs text-zinc-500">Streak</p>

//           <p className="mt-0.5 text-sm font-semibold text-white">
//             🔥 {currentStreak}
//           </p>
//         </div>

//         {/* ARROW */}
//         <span className="shrink-0 text-zinc-600 transition-all group-hover:translate-x-1 group-hover:text-zinc-300">
//           →
//         </span>
//       </div>

//       {/* MOBILE PROGRESS */}
//       <div className="mt-4 sm:hidden">
//         <div className="mb-1 flex justify-between">
//           <span className="text-xs text-zinc-500">Progress</span>

//           <span className="text-xs text-zinc-400">{pct.toFixed(0)}%</span>
//         </div>

//         <div
//           className={`h-1.5 overflow-hidden rounded-full ${theme.progressTrack}`}
//         >
//           <div
//             className={`h-full rounded-full ${theme.progressFill}`}
//             style={{ width: `${pct}%` }}
//           />
//         </div>
//       </div>
//     </Link>
//   );
// }


"use client";

import { apiFetch } from "@/src/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

/* ============================================================
   🎨 CENTRAL THEME — change colors here
============================================================ */
const theme = {
  gradientText:
    "bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent",
  gradientTextMuted:
    "bg-gradient-to-b from-zinc-300 to-zinc-500 bg-clip-text text-transparent",

  muted: "text-zinc-500",
  label: "text-zinc-400",
  error: "text-red-400",

  ownerBadge: "bg-amber-500/10 text-amber-300 border border-amber-500/20",
  adminBadge: "bg-blue-500/10 text-blue-300 border border-blue-500/20",
  memberBadge: "bg-zinc-800/80 text-zinc-300 border border-zinc-700",

  publicBadge:
    "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  privateBadge: "bg-red-500/10 text-red-400 border border-red-500/20",

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

type MyActivitiesResponse = {
  success: boolean;
  message: string;
  data: Membership[];
};

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

function formatDate(dateStr?: string) {
  if (!dateStr) return "—";

  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/* ============================================================
   COMPONENT
============================================================ */
type MyActivitiesProps = {
  /** Show only the first N rows (used for dashboard previews) */
  limit?: number;
  /** Renders a "View all" button in the header when provided */
  onViewAll?: () => void;
};

export default function MyActivities({ limit, onViewAll }: MyActivitiesProps) {
  const { data, isLoading, error } = useQuery<MyActivitiesResponse>({
    queryKey: ["my-activities"],
    queryFn: async () => {
      const response = await apiFetch("/api/activity/my-activities", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch activities");
      }

      return response.json();
    },
  });

  if (isLoading) {
    return (
      <section className="w-full">
        <SectionHeader title="My activities" />
        <RowsSkeleton />
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full">
        <SectionHeader title="My activities" />
        <p className={`py-6 text-sm ${theme.error}`}>
          {(error as Error).message}
        </p>
      </section>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <section className="w-full">
        <SectionHeader title="My activities" count={0} />

        <div className="py-10 text-center">
          <div className="mb-2 text-3xl">🎯</div>
          <p className="text-sm font-medium text-white">No activities yet</p>
          <p className={`mt-1 text-xs ${theme.muted}`}>
            Create or join an activity to get started.
          </p>
        </div>
      </section>
    );
  }

  const items = limit ? data.data.slice(0, limit) : data.data;

  return (
    <section className="w-full">
      <SectionHeader
        title="My activities"
        count={data.data.length}
        onViewAll={onViewAll}
      />

      <div className="space-y-0.5">
        {items.map((membership:any) => (
          <ActivityRow key={membership.id} membership={membership} />
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   SECTION HEADER
============================================================ */
function SectionHeader({
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

function RowsSkeleton() {
  return (
    <div className="space-y-3" aria-busy="true">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex animate-pulse items-center gap-3 px-2.5">
          <div className="h-9 w-9 rounded-lg bg-zinc-800" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-1/3 rounded bg-zinc-800" />
            <div className="h-2.5 w-1/2 rounded bg-zinc-800/70" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   ACTIVITY ROW (dense, single line + meta)
============================================================ */
function ActivityRow({ membership }: { membership: Membership }) {
  const { activity, role, currentStreak, completionRate } = membership;

  const pct = Math.min(Math.max(completionRate ?? 0, 0), 100);

  return (
    <Link
      href={`/activities/${activity.id}`}
      title={activity.description ?? undefined}
      className="group flex items-center gap-3 rounded-lg px-2.5 py-2 transition-colors hover:bg-zinc-900"
    >
      {/* AVATAR */}
      {activity.imageUrl ? (
        <img
          src={activity.imageUrl}
          alt={activity.name}
          className="h-9 w-9 shrink-0 rounded-lg object-cover"
        />
      ) : (
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-gradient-to-br from-zinc-700 to-zinc-900 text-sm font-semibold ${theme.gradientTextMuted}`}
        >
          {activity.name?.charAt(0).toUpperCase() ?? "?"}
        </div>
      )}

      {/* MAIN INFO */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-sm font-medium text-white">
            {activity.name}
          </h3>

          <span
            className={`hidden rounded-full px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide sm:inline-flex ${roleBadge(
              role
            )}`}
          >
            {role}
          </span>
        </div>

        <div className="mt-0.5 flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[11px]">
          <span className={theme.label}>👥 {activity.memberCount}</span>
          <span className={theme.label}>✓ {activity.taskCount}</span>

          <span
            className={`rounded-full px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide ${visibilityBadge(
              activity.visibility
            )}`}
          >
            {activity.visibility}
          </span>

          <span className="hidden text-zinc-600 md:inline">
            Joined {formatDate(membership.joinedAt)}
          </span>

          {/* Mobile: percent only, bar is hidden */}
          <span className="font-medium text-zinc-300 sm:hidden">
            {pct.toFixed(0)}%
          </span>
        </div>
      </div>

      {/* PROGRESS */}
      <div className="hidden w-24 shrink-0 sm:block">
        <div className="mb-1 flex justify-end">
          <span className="text-[11px] font-semibold tabular-nums text-zinc-300">
            {pct.toFixed(0)}%
          </span>
        </div>

        <div
          className={`h-1 overflow-hidden rounded-full ${theme.progressTrack}`}
        >
          <div
            className={`h-full rounded-full ${theme.progressFill}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* STREAK */}
      <div className="w-10 shrink-0 text-right text-xs font-semibold tabular-nums text-white">
        🔥 {currentStreak}
      </div>

      {/* ARROW */}
      <span className="shrink-0 text-zinc-700 transition-all group-hover:translate-x-0.5 group-hover:text-zinc-300">
        →
      </span>
    </Link>
  );
}