// "use client";

// import { useTaskAchievements } from "@/src/hooks/useAchievements";

// interface TaskAchievementsProps {
//   taskId: string;
// }

// export default function TaskAchievements({ taskId }: TaskAchievementsProps) {
//   const {
//     data: achievements,
//     isLoading,
//     isError,
//     error,
//   } = useTaskAchievements(taskId);

//   if (isLoading) {
//     return <div className="rounded-lg border p-4">Loading achievements...</div>;
//   }

//   if (isError) {
//     return (
//       <div className="rounded-lg border border-red-200 p-4 text-red-600">
//         Failed to load achievements: {error.message}
//       </div>
//     );
//   }

//   if (!achievements || achievements.length === 0) {
//     return (
//       <div className="rounded-lg border p-4 text-gray-500">
//         No achievements available for this task.
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-3 text-black">
//       <h2 className="text-lg font-semibold">Task Achievements</h2>

//       {achievements.map((achievement:any) => (
//         <div
//           key={achievement.id}
//           className="rounded-lg border bg-white p-4 shadow-sm"
//         >
//           <h3 className="font-semibold">{achievement.title}</h3>
//           <h3 className="font-semibold">{achievement.totalValue} {achievement.unit}</h3>

//           {achievement.description && (
//             <p className="mt-1 text-sm text-gray-600">
//               {achievement.description}
//             </p>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }


"use client";

import { useTaskAchievements } from "@/src/hooks/useAchievements";

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
  rowRadius: "rounded-2xl",
  rowInnerRadius: "rounded-[calc(1rem-1.5px)]",

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

  trophyBadge:
    "bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 text-amber-950 border border-amber-300/40 shadow-md shadow-amber-900/40",
};

interface TaskAchievementsProps {
  taskId: string;
}

export default function TaskAchievements({ taskId }: TaskAchievementsProps) {
  const {
    data: achievements,
    isLoading,
    isError,
    error,
  } = useTaskAchievements(taskId);

  /* ==================== STATES ==================== */
  if (isLoading) {
    return (
      <div
        className={`${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient}`}
      >
        <div
          className={`p-5 ${theme.surfaceSolid} ${theme.innerRadius} ${theme.muted}`}
        >
          Loading achievements...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={`${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient}`}
      >
        <div
          className={`p-5 ${theme.surfaceSolid} ${theme.innerRadius} ${theme.error}`}
        >
          Failed to load achievements: {error.message}
        </div>
      </div>
    );
  }

  if (!achievements || achievements.length === 0) {
    return (
      <div
        className={`${theme.borderWidthThin} ${theme.rowRadius} ${theme.borderGradientThin}`}
      >
        <div
          className={`flex flex-col items-center justify-center py-10 text-center ${theme.surfaceSolid} ${theme.rowInnerRadius}`}
        >
          <div className="mb-2 text-3xl">🎖️</div>
          <p className="text-sm font-medium text-white">No achievements yet</p>
          <p className={`mt-1 text-xs ${theme.muted}`}>
            Unlock your first one by hitting a milestone.
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
          Task Achievements
        </h2>
        <span className={`text-xs ${theme.muted}`}>
          {achievements.length} unlocked
        </span>
      </div>

      {/* ==================== LIST ==================== */}
      <div className="flex flex-col gap-3">
        {achievements.map((achievement: any) => (
          <div
            key={achievement.id}
            className={`w-full ${theme.borderWidthThin} ${theme.rowRadius} ${theme.borderGradientThin}`}
          >
            <div
              className={`flex items-start gap-3 p-4 ${theme.surfaceSolid} ${theme.rowInnerRadius}`}
            >
              {/* ==================== TROPHY BADGE ==================== */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${theme.trophyBadge}`}
                aria-hidden
              >
                🏆
              </div>

              {/* ==================== CONTENT ==================== */}
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-white">
                  {achievement.title}
                </h3>

                {/* Target value pill */}
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-zinc-700 bg-zinc-800/60 px-2.5 py-0.5 text-[11px] font-semibold text-zinc-200">
                    🎯 {achievement.totalValue} {achievement.unit}
                  </span>
                </div>

                {/* Description */}
                {achievement.description && (
                  <p
                    className={`mt-2 line-clamp-2 text-xs leading-relaxed ${theme.muted}`}
                  >
                    {achievement.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}