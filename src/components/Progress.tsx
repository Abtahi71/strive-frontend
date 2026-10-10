

// "use client";

// import { useMemo } from "react";
// import { useTotalCompletedValue } from "@/src/hooks/useActivities";

// type CompletedTask = {
//   date: string;
//   completedTask: number;
// };

// const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// const WEEKDAY_NAMES = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

// export default function MonthlyTaskHeatmap() {
//   const { data: completedTasks, isLoading } = useTotalCompletedValue();

//   const today = new Date();

//   /*
//    * Convert API data into:
//    *
//    * {
//    *   "2026-09-14": 1,
//    *   "2026-09-15": 1,
//    *   "2026-09-16": 5,
//    *   ...
//    * }
//    */
//   const taskMap = useMemo(() => {
//     const map = new Map<string, number>();

//     if (!completedTasks) return map;

//     completedTasks.forEach((item: CompletedTask) => {
//       const date = new Date(item.date);

//       const key = [
//         date.getFullYear(),
//         String(date.getMonth() + 1).padStart(2, "0"),
//         String(date.getDate()).padStart(2, "0"),
//       ].join("-");

//       map.set(key, item.completedTask);
//     });

//     return map;
//   }, [completedTasks]);

//   /*
//    * Sum completed tasks per weekday (index 0 = Sun ... 6 = Sat),
//    * across every date present in taskMap.
//    */
//   const weekdayTotals = useMemo(() => {
//     const totals = new Array(7).fill(0);

//     taskMap.forEach((count, key) => {
//       const [y, m, d] = key.split("-").map(Number);

//       /*
//        * Reconstruct as a local date the same way the keys
//        * were built above — avoids the UTC-parsing off-by-one
//        * you'd get from `new Date(key)` in negative-offset zones.
//        */
//       const weekday = new Date(y, m - 1, d).getDay();

//       totals[weekday] += count;
//     });

//     return totals;
//   }, [taskMap]);

//   const maxWeekdayTotal = useMemo(
//     () => Math.max(...weekdayTotals, 0),
//     [weekdayTotals]
//   );

//   const bestWeekdayIndex = useMemo(() => {
//     if (maxWeekdayTotal === 0) return null;

//     return weekdayTotals.indexOf(maxWeekdayTotal);
//   }, [weekdayTotals, maxWeekdayTotal]);

//   /*
//    * Green intensity.
//    */
//   const getColor = (count: number, max: number) => {
//     if (!count || count <= 0) {
//       return "bg-zinc-800/50";
//     }

//     if (max <= 1) {
//       return "bg-green-500";
//     }

//     const percentage = count / max;

//     if (percentage <= 0.25) {
//       return "bg-green-900";
//     }

//     if (percentage <= 0.5) {
//       return "bg-green-700";
//     }

//     if (percentage <= 0.75) {
//       return "bg-green-500";
//     }

//     return "bg-green-400";
//   };

//   const monthName = new Intl.DateTimeFormat("en-US", {
//     month: "long",
//     year: "numeric",
//   }).format(today);

//   if (isLoading) {
//     return (
//       <div className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-5">
//         <div className="mb-5 h-6 w-40 animate-pulse rounded bg-zinc-800" />

//         <div className="flex gap-3">
//           {Array.from({ length: 7 }).map((_, index) => (
//             <div key={index} className="flex flex-col items-center gap-2">
//               <div className="h-10 w-10 animate-pulse rounded-md bg-zinc-800" />
//               <div className="h-2 w-6 animate-pulse rounded bg-zinc-800" />
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto w-full rounded-xl border border-zinc-800 bg-zinc-950 p-5">
//       {/* ================= HEADER ================= */}

//       <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h2 className="text-lg font-semibold text-white">Task Activity</h2>

//           <p className="text-sm text-zinc-400">{monthName}</p>
//         </div>

//         {/* Legend */}

//         <div className="flex items-center gap-2 text-xs text-zinc-500">
//           <span>Less</span>

//           <div className="h-3 w-3 rounded-sm bg-zinc-800/50" />
//           <div className="h-3 w-3 rounded-sm bg-green-900" />
//           <div className="h-3 w-3 rounded-sm bg-green-700" />
//           <div className="h-3 w-3 rounded-sm bg-green-500" />
//           <div className="h-3 w-3 rounded-sm bg-green-400" />

//           <span>More</span>
//         </div>
//       </div>

//       {/* ================= HEATMAP (single weekday row) ================= */}

//       <div className="flex items-center gap-3">
//         {WEEKDAY_LABELS.map((day, index) => {
//           const count = weekdayTotals[index];

//           return (
//             <div
//               key={day}
//               className="group relative flex flex-col items-center gap-2"
//             >
//               <div
//                 title={`${day}: ${count} completed task${
//                   count === 1 ? "" : "s"
//                 }`}
//                 className={`
//                   h-10
//                   w-10
//                   rounded-md
//                   border
//                   border-zinc-800/50
//                   transition-all
//                   duration-150
//                   hover:scale-110
//                   hover:border-zinc-500
//                   ${getColor(count, maxWeekdayTotal)}
//                 `}
//               />

//               <span className="text-[10px] text-zinc-500">{day}</span>

//               {/* Tooltip */}

//               {count > 0 && (
//                 <div
//                   className="
//                     pointer-events-none
//                     absolute
//                     bottom-full
//                     left-1/2
//                     z-50
//                     mb-2
//                     hidden
//                     -translate-x-1/2
//                     whitespace-nowrap
//                     rounded-md
//                     bg-black
//                     px-2
//                     py-1
//                     text-xs
//                     text-white
//                     shadow-lg
//                     group-hover:block
//                   "
//                 >
//                   {count} completed task{count === 1 ? "" : "s"}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* ================= FOOTER ================= */}

//       <div className="mt-4 text-xs text-zinc-500">
//         {bestWeekdayIndex !== null ? (
//           <>
//             Most productive on{" "}
//             <span className="font-medium text-zinc-300">
//               {WEEKDAY_NAMES[bestWeekdayIndex]}
//             </span>{" "}
//             — {maxWeekdayTotal} completed task{maxWeekdayTotal === 1 ? "" : "s"}
//           </>
//         ) : (
//           "No completed tasks yet this month"
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useMemo } from "react";
import { useTotalCompletedValue } from "@/src/hooks/useActivities";

type CompletedTask = {
  date: string;
  completedTask: number;
};

export default function MonthlyTaskHeatmap() {
  const { data: completedTasks, isLoading } = useTotalCompletedValue();

  const today = new Date();
  const year = today.getFullYear();
  const monthIndex = today.getMonth(); // 0-based

  const daysInMonth = useMemo(
    () => new Date(year, monthIndex + 1, 0).getDate(),
    [year, monthIndex]
  );

  /*
   * Convert API data into:
   *
   * {
   *   "2026-09-14": 1,
   *   "2026-09-15": 1,
   *   "2026-09-16": 5,
   *   ...
   * }
   */
  const taskMap = useMemo(() => {
    const map = new Map<string, number>();

    if (!completedTasks) return map;

    completedTasks.forEach((item: CompletedTask) => {
      const date = new Date(item.date);

      const key = [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
      ].join("-");

      map.set(key, item.completedTask);
    });

    return map;
  }, [completedTasks]);

  /*
   * One entry per calendar day of the current month, 1..daysInMonth,
   * carrying that day's completed-task count (0 if none recorded).
   */
  const dayEntries = useMemo(() => {
    const entries: { day: number; key: string; count: number }[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const key = [
        year,
        String(monthIndex + 1).padStart(2, "0"),
        String(day).padStart(2, "0"),
      ].join("-");

      entries.push({
        day,
        key,
        count: taskMap.get(key) ?? 0,
      });
    }

    return entries;
  }, [daysInMonth, year, monthIndex, taskMap]);

  const maxDayTotal = useMemo(
    () => Math.max(...dayEntries.map((e) => e.count), 0),
    [dayEntries]
  );

  const bestDay = useMemo(() => {
    if (maxDayTotal === 0) return null;

    return dayEntries.find((e) => e.count === maxDayTotal) ?? null;
  }, [dayEntries, maxDayTotal]);

  /*
   * Green intensity.
   */
  const getColor = (count: number, max: number) => {
    if (!count || count <= 0) {
      return "bg-zinc-800/50";
    }

    if (max <= 1) {
      return "bg-green-500";
    }

    const percentage = count / max;

    if (percentage <= 0.25) {
      return "bg-green-900";
    }

    if (percentage <= 0.5) {
      return "bg-green-700";
    }

    if (percentage <= 0.75) {
      return "bg-green-500";
    }

    return "bg-green-400";
  };

  const monthName = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(today);

  if (isLoading) {
    return (
      <div className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-5">
        <div className="mb-5 h-6 w-40 animate-pulse rounded bg-zinc-800" />

        <div className="grid grid-cols-10 gap-2 sm:grid-cols-15">
          {Array.from({ length: 30 }).map((_, index) => (
            <div
              key={index}
              className="aspect-square animate-pulse rounded-md bg-zinc-800"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full rounded-xl border border-zinc-800 bg-zinc-950 p-5">
      {/* ================= HEADER ================= */}

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Task Activity</h2>

          <p className="text-sm text-zinc-400">{monthName}</p>
        </div>

        {/* Legend */}

        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span>Less</span>

          <div className="h-3 w-3 rounded-sm bg-zinc-800/50" />
          <div className="h-3 w-3 rounded-sm bg-green-900" />
          <div className="h-3 w-3 rounded-sm bg-green-700" />
          <div className="h-3 w-3 rounded-sm bg-green-500" />
          <div className="h-3 w-3 rounded-sm bg-green-400" />

          <span>More</span>
        </div>
      </div>

      {/* ================= HEATMAP (one cell per day) ================= */}

      <div className="grid grid-cols-10 gap-2 sm:grid-cols-15">
        {dayEntries.map(({ day, key, count }) => (
          <div
            key={key}
            className="group relative flex flex-col items-center gap-1"
          >
            <div
              title={`${
                monthName.split(" ")[0]
              } ${day}: ${count} completed task${count === 1 ? "" : "s"}`}
              className={`
                aspect-square
                w-full
                rounded-md
                border
                border-zinc-800/50
                transition-all
                duration-150
                hover:scale-110
                hover:border-zinc-500
                ${getColor(count, maxDayTotal)}
              `}
            />

            <span className="text-[9px] text-zinc-500">{day}</span>

            {/* Tooltip */}

            {count > 0 && (
              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-full
                  left-1/2
                  z-50
                  mb-2
                  hidden
                  -translate-x-1/2
                  whitespace-nowrap
                  rounded-md
                  bg-black
                  px-2
                  py-1
                  text-xs
                  text-white
                  shadow-lg
                  group-hover:block
                "
              >
                {count} completed task{count === 1 ? "" : "s"}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ================= FOOTER ================= */}

      <div className="mt-4 text-xs text-zinc-500">
        {bestDay !== null ? (
          <>
            Most productive on{" "}
            <span className="font-medium text-zinc-300">
              {monthName.split(" ")[0]} {bestDay.day}
            </span>{" "}
            — {maxDayTotal} completed task{maxDayTotal === 1 ? "" : "s"}
          </>
        ) : (
          "No completed tasks yet this month"
        )}
      </div>
    </div>
  );
}