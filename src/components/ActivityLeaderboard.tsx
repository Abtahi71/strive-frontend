// "use client";

// import { useActivityLeadership, useCurrentUser } from "@/src/hooks/useUsers";

// interface ActivityLeaderboardProps {
//   activityId: string;
// }

// export default function ActivityLeaderboard({
//   activityId,
// }: ActivityLeaderboardProps) {
//   const {
//     data: leadership,
//     isLoading,
//     isError,
//   } = useActivityLeadership(activityId);

//   const {data:user, isLoading:userLoading, isError:userError} = useCurrentUser();

//   if (isLoading) {
//     return <p>Loading activity leaderboard...</p>;
//   }

//   if (isError) {
//     return <p>Failed to load activity leaderboard.</p>;
//   }

//   if (!leadership || leadership.length === 0) {
//     return <p>No activity progress recorded today.</p>;
//   }

//   return (
//     <div>
//       <h2>Activity leaderboard</h2>

//       {leadership.map((entry:any, index:any) => (
//         {entry.userId===user?.id? <div>
          
//           </div>:(<div key={entry.userId}>
//           <span>#{index + 1}</span>

//           <strong>{entry.username}</strong>

//           <span>
//             {entry.completedTasks}/{entry.totalTasks} tasks
//           </span>

//           <span>{Number(entry.completionPercentage).toFixed(2)} tasks completed</span>

//           {/* {entry.completed && <span> ✓</span>} */}
//         </div>)

//         }
        
//       ))}
//     </div>
//   );
// }


"use client";

import { useActivityLeadership, useCurrentUser } from "@/src/hooks/useUsers";

/* ============================================================
   🎨 CENTRAL THEME — change colors here
============================================================ */
const theme = {
  borderGradientThin: "bg-gradient-to-b from-white via-zinc-500 to-zinc-800",
  borderWidthThin: "p-[1.5px]",
  rowRadius: "rounded-2xl",
  rowInnerRadius: "rounded-[calc(1rem-1.5px)]",

  surfaceSolid: "bg-zinc-950",

  gradientText:
    "bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent",
  gradientTextMuted:
    "bg-gradient-to-b from-zinc-200 to-zinc-500 bg-clip-text text-transparent",

  muted: "text-zinc-500",
  label: "text-zinc-400",
  error: "text-red-400",
  success: "text-emerald-400",

  // Rank badges
  goldBadge:
    "bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 text-amber-950 shadow-md shadow-amber-900/40",
  silverBadge:
    "bg-gradient-to-br from-zinc-200 via-zinc-400 to-zinc-600 text-zinc-900 shadow-md shadow-zinc-900/40",
  bronzeBadge:
    "bg-gradient-to-br from-orange-300 via-orange-500 to-orange-700 text-orange-950 shadow-md shadow-orange-900/40",
  defaultBadge: "bg-zinc-900 border border-zinc-700 text-zinc-300",

  // "You" marker
  youBadge:
    "bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700 text-white border border-blue-300/40 shadow-md shadow-blue-900/40",

  progressTrack: "bg-zinc-800",
  progressFill: "bg-gradient-to-r from-blue-400 to-blue-600",
  progressFillYou: "bg-gradient-to-r from-fuchsia-400 to-purple-600",
};

interface ActivityLeaderboardProps {
  activityId: string;
}

/* ---------- Rank badge picker ---------- */
function rankBadge(rank: number) {
  if (rank === 1) return theme.goldBadge;
  if (rank === 2) return theme.silverBadge;
  if (rank === 3) return theme.bronzeBadge;
  return theme.defaultBadge;
}

export default function ActivityLeaderboard({
  activityId,
}: ActivityLeaderboardProps) {
  const {
    data: leadership,
    isLoading,
    isError,
  } = useActivityLeadership(activityId);

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useCurrentUser();

  /* ==================== STATES ==================== */
  if (isLoading || userLoading) {
    return (
      <div
        className={`${theme.borderWidthThin} ${theme.rowRadius} ${theme.borderGradientThin}`}
      >
        <div
          className={`p-5 ${theme.surfaceSolid} ${theme.rowInnerRadius} ${theme.muted}`}
        >
          Loading activity leaderboard...
        </div>
      </div>
    );
  }

  if (isError || userError) {
    return (
      <div
        className={`${theme.borderWidthThin} ${theme.rowRadius} ${theme.borderGradientThin}`}
      >
        <div
          className={`p-5 ${theme.surfaceSolid} ${theme.rowInnerRadius} ${theme.error}`}
        >
          Failed to load activity leaderboard.
        </div>
      </div>
    );
  }

  if (!leadership || leadership.length === 0) {
    return (
      <div
        className={`${theme.borderWidthThin} ${theme.rowRadius} ${theme.borderGradientThin}`}
      >
        <div
          className={`flex flex-col items-center justify-center py-10 text-center ${theme.surfaceSolid} ${theme.rowInnerRadius}`}
        >
          <div className="mb-2 text-3xl">🏁</div>
          <p className="text-sm font-medium text-white">
            No activity progress today
          </p>
          <p className={`mt-1 text-xs ${theme.muted}`}>
            Be the first to log progress.
          </p>
        </div>
      </div>
    );
  }

  /* ==================== MAIN ==================== */
  return (
    <div className="w-full space-y-4">
      {/* ==================== HEADER ==================== */}
      <div className="flex items-end justify-between">
        <h2 className={`text-lg font-semibold ${theme.gradientText}`}>
          Activity Leaderboard
        </h2>
        <span className={`text-xs ${theme.muted}`}>
          {leadership.length} participants
        </span>
      </div>

      {/* ==================== ROWS ==================== */}
      <div className="flex flex-col gap-2.5">
        {leadership.map((entry: any, index: number) => {
          const rank = index + 1;
          const isYou = entry.userId === user?.id;
          const pct = Math.min(
            Math.max(Number(entry.completionPercentage), 0),
            100
          );

          return (
            <div
              key={entry.userId}
              className={`w-full ${theme.borderWidthThin} ${theme.rowRadius} ${
                isYou
                  ? "bg-gradient-to-b from-blue-300 via-blue-500 to-blue-800"
                  : theme.borderGradientThin
              }`}
            >
              <div
                className={`p-3.5 ${theme.surfaceSolid} ${theme.rowInnerRadius}`}
              >
                {/* Top row: rank + name + task count */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    {/* Rank badge */}
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${rankBadge(
                        rank
                      )}`}
                    >
                      {rank}
                    </span>

                    {/* Name + "you" pill */}
                    <div className="min-w-0">
                      <p className="flex items-center gap-2 truncate text-sm font-medium text-white">
                        {entry.username ?? "Unknown"}
                        {isYou && (
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${theme.youBadge}`}
                          >
                            You
                          </span>
                        )}
                      </p>
                      <p className={`text-xs ${theme.muted}`}>
                        {entry.completedTasks}/{entry.totalTasks} tasks
                      </p>
                    </div>
                  </div>

                  {/* Percentage + completed tick */}
                  <div className="shrink-0 text-right">
                    <p
                      className={`text-sm font-bold ${
                        isYou ? "text-blue-300" : theme.gradientText
                      }`}
                    >
                      {pct.toFixed(0)}%
                    </p>
                    {entry.completed && (
                      <p className={`text-[10px] ${theme.success}`}>
                        ✓ Completed
                      </p>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div
                  className={`mt-3 h-1.5 overflow-hidden rounded-full ${theme.progressTrack}`}
                >
                  <div
                    className={`h-full rounded-full transition-all ${
                      isYou ? theme.progressFillYou : theme.progressFill
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}