

// "use client";

// import { getTodayUsage } from "../hooks/useUsers";

// /* ============================================================
//    🎨 CENTRAL THEME — change colors here
// ============================================================ */
// const theme = {
//   borderGradient: "bg-gradient-to-b from-white via-zinc-400 to-zinc-700",
//   borderGradientThin: "bg-gradient-to-b from-white via-zinc-500 to-zinc-800",
//   borderWidth: "p-[2px]",
//   borderWidthThin: "p-[1.5px]",
//   borderRadius: "rounded-3xl",
//   innerRadius: "rounded-[calc(1.5rem-2px)]",
//   rowRadius: "rounded-2xl",
//   rowInnerRadius: "rounded-[calc(1rem-1.5px)]",

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

//   progressTrack: "bg-zinc-800",
//   progressFill: "bg-gradient-to-r from-blue-400 to-blue-600",
// };

// /* ============================================================
//    DURATION FORMATTER
// ============================================================ */
// function formatDuration(totalSec: number): string {
//   if (!totalSec || totalSec < 0) return "0s";

//   const hours = Math.floor(totalSec / 3600);
//   const minutes = Math.floor((totalSec % 3600) / 60);
//   const seconds = totalSec % 60;

//   if (hours > 0) {
//     return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
//   }

//   if (minutes > 0) {
//     return totalSec < 600 && seconds > 0
//       ? `${minutes}m ${seconds}s`
//       : `${minutes}m`;
//   }

//   return `${seconds}s`;
// }

// /* ============================================================
//    COMPONENT
// ============================================================ */
// export default function UsagePage() {
//   const { data: usage, isLoading, isError } = getTodayUsage();

//   /* ==================== STATES ==================== */
//   if (isLoading) {
//     return (
//       <div
//         className={`${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient}`}
//       >
//         <div
//           className={`p-6 ${theme.surfaceSolid} ${theme.innerRadius} ${theme.muted}`}
//         >
//           Loading usage...
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div
//         className={`${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient}`}
//       >
//         <div
//           className={`p-6 ${theme.surfaceSolid} ${theme.innerRadius} ${theme.error}`}
//         >
//           Failed to load usage.
//         </div>
//       </div>
//     );
//   }

//   if (!usage || usage.length === 0) {
//     return (
//       <div
//         className={`${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient}`}
//       >
//         <div
//           className={`flex flex-col items-center justify-center py-14 text-center ${theme.surfaceSolid} ${theme.innerRadius}`}
//         >
//           <div className="mb-3 text-4xl">📊</div>
//           <p className="text-base font-medium text-white">No usage today</p>
//           <p className={`mt-1 text-sm ${theme.muted}`}>
//             Your tracked website activity will appear here.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   /* ==================== DERIVED DATA ==================== */
//   // Sort by duration descending so the biggest time sinks are on top
//   const sorted = [...usage].sort(
//     (a: any, b: any) => b.durationSec - a.durationSec
//   );

//   const totalSec = sorted.reduce(
//     (sum: number, item: any) => sum + (item.durationSec || 0),
//     0
//   );

//   const maxSec = sorted[0]?.durationSec || 1;

//   /* ==================== MAIN ==================== */
//   return (
//     <div className="w-full space-y-6 my-10">
//       {/* ==================== HEADER ==================== */}
//       <div className="flex flex-wrap items-end justify-between gap-3">
//         <div>
//           <h1 className={`text-2xl font-semibold ${theme.gradientText}`}>
//             Today's Website Usage
//           </h1>
//           <p className={`mt-1 text-sm ${theme.muted}`}>
//             Time spent across your tracked domains today.
//           </p>
//         </div>

//         {/* Total time pill */}
//         <div
//           className={`${theme.borderWidthThin} ${theme.rowRadius} ${theme.borderGradientThin}`}
//         >
//           <div
//             className={`flex items-center gap-3 px-4 py-2 ${theme.surfaceSolid} ${theme.rowInnerRadius}`}
//           >
//             <span className={`text-xs uppercase tracking-wider ${theme.label}`}>
//               Total
//             </span>
//             <span className={`text-lg font-semibold ${theme.gradientText}`}>
//               {formatDuration(totalSec)}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* ==================== USAGE LIST ==================== */}
//       <div className="grid grid-cols-3 gap-3">
//         {sorted.map((item: any, index: number) => {
//           const pct = Math.min((item.durationSec / maxSec) * 100, 100);

//           return (
//             <div
//               key={item.domain}
//               className={`w-full ${theme.borderWidthThin} ${theme.rowRadius} ${theme.borderGradientThin}`}
//             >
//               <div
//                 className={`p-4 ${theme.surfaceSolid} ${theme.rowInnerRadius}`}
//               >
//                 {/* Top row: rank + domain + duration */}
//                 <div className="flex items-center justify-between gap-3">
//                   <div className="flex min-w-0 items-center gap-3">
//                     {/* Rank badge */}
//                     <span
//                       className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-xs font-semibold ${theme.gradientTextMuted}`}
//                     >
//                       {index + 1}
//                     </span>

//                     <div className="min-w-0">
//                       <p className="truncate text-sm font-medium text-white">
//                         {item.domain}
//                       </p>
//                       <p className={`text-xs ${theme.muted}`}>
//                         {item.durationSec} seconds
//                       </p>
//                     </div>
//                   </div>

//                   {/* Duration badge */}
//                   <span className="flex-shrink-0 rounded-full border border-blue-500/30 bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-300">
//                     {formatDuration(item.durationSec)}
//                   </span>
//                 </div>

//                 {/* Progress bar */}
//                 <div
//                   className={`mt-3 h-1.5 overflow-hidden rounded-full ${theme.progressTrack}`}
//                 >
//                   <div
//                     className={`h-full rounded-full ${theme.progressFill} transition-all`}
//                     style={{ width: `${pct}%` }}
//                   />
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }



"use client";

import { getTodayUsage } from "../hooks/useUsers";

/* ============================================================
   🎨 CENTRAL THEME — change colors here
============================================================ */
const theme = {
  tile: "border border-zinc-800/80 bg-zinc-900/40",

  gradientText:
    "bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent",
  gradientTextMuted:
    "bg-gradient-to-b from-zinc-200 to-zinc-500 bg-clip-text text-transparent",

  muted: "text-zinc-500",
  label: "text-zinc-400",
  error: "text-red-400",

  progressTrack: "bg-zinc-800",
  progressFill: "bg-gradient-to-r from-blue-400 to-blue-600",

  durationChip:
    "rounded-md border border-blue-500/25 bg-blue-500/10 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-blue-300",
};

// Colors for the "share of today" bar (top 5 domains)
const SEGMENT_COLORS = [
  "bg-blue-400",
  "bg-violet-400",
  "bg-emerald-400",
  "bg-amber-400",
  "bg-rose-400",
];

/* ============================================================
   DURATION FORMATTER
============================================================ */
function formatDuration(totalSec: number): string {
  if (!totalSec || totalSec < 0) return "0s";

  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;

  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }

  if (minutes > 0) {
    return totalSec < 600 && seconds > 0
      ? `${minutes}m ${seconds}s`
      : `${minutes}m`;
  }

  return `${seconds}s`;
}

/* ============================================================
   SMALL PIECES
============================================================ */
function StateBlock({
  icon,
  title,
  text,
  tone = "default",
}: {
  icon: string;
  title: string;
  text?: string;
  tone?: "default" | "error";
}) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="mb-2 text-3xl">{icon}</div>
      <p
        className={`text-sm font-medium ${
          tone === "error" ? theme.error : "text-white"
        }`}
      >
        {title}
      </p>
      {text && <p className={`mt-1 text-xs ${theme.muted}`}>{text}</p>}
    </div>
  );
}

function UsageSkeleton({ rows }: { rows: number }) {
  return (
    <div className="space-y-4" aria-busy="true">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="mb-2 flex justify-between">
            <div className="h-3 w-1/3 rounded bg-zinc-800" />
            <div className="h-3 w-10 rounded bg-zinc-800" />
          </div>
          <div className="h-1.5 rounded-full bg-zinc-800" />
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   COMPONENT
============================================================ */
type UsagePageProps = {
  variant?: "full" | "compact";
  limit?: number;
  onViewAll?: () => void;
};

export default function UsagePage({
  variant = "full",
  limit,
  onViewAll,
}: UsagePageProps) {
  const { data: usage, isLoading, isError } = getTodayUsage();
  const compact = variant === "compact";

  /* ==================== STATES ==================== */
  if (isLoading) {
    return <UsageSkeleton rows={compact ? 4 : 6} />;
  }

  if (isError) {
    return <StateBlock icon="⚠️" title="Failed to load usage." tone="error" />;
  }

  if (!usage || usage.length === 0) {
    return (
      <StateBlock
        icon="📊"
        title="No usage today"
        text="Your tracked website activity will appear here."
      />
    );
  }

  /* ==================== DERIVED DATA ==================== */
  // Sort by duration descending so the biggest time sinks are on top
  const sorted = [...usage].sort(
    (a: any, b: any) => b.durationSec - a.durationSec
  );

  const totalSec = sorted.reduce(
    (sum: number, item: any) => sum + (item.durationSec || 0),
    0
  );

  const maxSec = sorted[0]?.durationSec || 1;

  const maxItems = limit ?? (compact ? 5 : undefined);
  const visible = maxItems ? sorted.slice(0, maxItems) : sorted;

  const share = (sec: number) =>
    totalSec > 0 ? Math.round((sec / totalSec) * 100) : 0;

  // Share bar data (full variant)
  const top = sorted.slice(0, 5);
  const otherSec = Math.max(
    totalSec - top.reduce((s: number, i: any) => s + (i.durationSec || 0), 0),
    0
  );

  /* ==================== MAIN ==================== */
  return (
    <div className="w-full">
      {/* ==================== HEADER ==================== */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className={`text-sm font-semibold ${theme.gradientText}`}>
            Today&apos;s website usage
          </h2>
          {!compact && (
            <p className={`mt-0.5 text-xs ${theme.muted}`}>
              Time spent across your tracked domains today.
            </p>
          )}
        </div>

        <div
          className={`flex shrink-0 items-baseline gap-2 rounded-lg px-3 py-1.5 ${theme.tile}`}
        >
          <span className="text-[10px] uppercase tracking-wider text-zinc-500">
            Total
          </span>
          <span className="text-sm font-semibold tabular-nums text-white">
            {formatDuration(totalSec)}
          </span>
        </div>
      </div>

      {/* ==================== SHARE BAR (full only) ==================== */}
      {!compact && totalSec > 0 && (
        <div className="mb-4">
          <div className="flex h-2 overflow-hidden rounded-full bg-zinc-800">
            {top.map((item: any, i: number) => (
              <div
                key={item.domain}
                className={SEGMENT_COLORS[i]}
                style={{ width: `${(item.durationSec / totalSec) * 100}%` }}
                title={`${item.domain} · ${formatDuration(item.durationSec)}`}
              />
            ))}
            {otherSec > 0 && (
              <div
                className="bg-zinc-600"
                style={{ width: `${(otherSec / totalSec) * 100}%` }}
                title={`Other · ${formatDuration(otherSec)}`}
              />
            )}
          </div>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-zinc-400">
            {top.map((item: any, i: number) => (
              <span key={item.domain} className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${SEGMENT_COLORS[i]}`} />
                <span className="max-w-[10rem] truncate">{item.domain}</span>
                <span className="tabular-nums text-zinc-500">
                  {share(item.durationSec)}%
                </span>
              </span>
            ))}
            {otherSec > 0 && (
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-zinc-600" />
                Other
                <span className="tabular-nums text-zinc-500">
                  {share(otherSec)}%
                </span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* ==================== LIST ==================== */}
      {compact ? (
        <ul className="divide-y divide-zinc-800/70">
          {visible.map((item: any, index: number) => {
            const pct = Math.min((item.durationSec / maxSec) * 100, 100);

            return (
              <li key={item.domain} className="flex items-center gap-3 py-2.5">
                <span className="w-4 text-[11px] tabular-nums text-zinc-600">
                  {index + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-[13px] font-medium text-white">
                      {item.domain}
                    </p>
                    <span className="shrink-0 text-xs tabular-nums text-zinc-400">
                      {formatDuration(item.durationSec)}
                    </span>
                  </div>

                  <div
                    className={`mt-1.5 h-1 overflow-hidden rounded-full ${theme.progressTrack}`}
                  >
                    <div
                      className={`h-full rounded-full ${theme.progressFill}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((item: any, index: number) => {
            const pct = Math.min((item.durationSec / maxSec) * 100, 100);

            return (
              <div
                key={item.domain}
                className={`rounded-lg p-3 transition-colors hover:border-zinc-700 ${theme.tile}`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-[11px] font-semibold ${theme.gradientTextMuted}`}
                  >
                    {index + 1}
                  </span>

                  <p className="min-w-0 flex-1 truncate text-sm font-medium text-white">
                    {item.domain}
                  </p>

                  <span className={`shrink-0 ${theme.durationChip}`}>
                    {formatDuration(item.durationSec)}
                  </span>
                </div>

                <div
                  className={`mt-2.5 h-1 overflow-hidden rounded-full ${theme.progressTrack}`}
                >
                  <div
                    className={`h-full rounded-full ${theme.progressFill} transition-all`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <p className={`mt-1.5 text-[11px] ${theme.muted}`}>
                  {share(item.durationSec)}% of today
                </p>
              </div>
            );
          })}
        </div>
      )}

      {onViewAll && (
        <button
          type="button"
          onClick={onViewAll}
          className="mt-2 w-full rounded-lg py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
        >
          View all {sorted.length} →
        </button>
      )}
    </div>
  );
}