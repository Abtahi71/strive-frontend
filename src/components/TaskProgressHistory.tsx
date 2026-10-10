// "use client";

// import { useTaskProgress } from "@/src/hooks/useUsers";
// import {
//   LineChart,
//   Line,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   ReferenceLine,
// } from "recharts";
// import { useTaskSchedules } from "../hooks/useActivities";

// /* ============================================================
//    🎨 CENTRAL THEME
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

//   gradientText:
//     "bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent",
//   gradientTextMuted:
//     "bg-gradient-to-b from-zinc-200 to-zinc-500 bg-clip-text text-transparent",

//   muted: "text-zinc-500",
//   text: "text-white",
//   label: "text-zinc-400",
//   divider: "border-zinc-800",

//   success: "text-emerald-400",
//   warning: "text-orange-400",
//   error: "text-red-400",
// };

// /* ============================================================
//    🎨 CHART THEME
// ============================================================ */
// const chartTheme = {
//   grid: "#27272a",
//   axisText: "#a1a1aa",

//   lineColor: "#60a5fa",
//   areaColor: "#3b82f6",
//   targetLine: "#f97316", // orange for target

//   tooltipBg: "#09090b",
//   tooltipBorder: "#3f3f46",
//   tooltipText: "#ffffff",
// };

// interface TaskProgressHistoryProps {
//   taskId: string;
// }

// export default function TaskProgressHistory({
//   taskId,
// }: TaskProgressHistoryProps) {
//   const { data: progress, isLoading, isError, error } = useTaskProgress(taskId);
//   const {data:schedules} = useTaskSchedules(taskId);

//   /* ==================== STATES ==================== */
//   if (isLoading) {
//     return (
//       <div
//         className={`${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient}`}
//       >
//         <div
//           className={`p-6 ${theme.surfaceSolid} ${theme.innerRadius} ${theme.muted}`}
//         >
//           Loading progress...
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
//           Failed to load progress: {error.message}
//         </div>
//       </div>
//     );
//   }

//   if (!progress || progress.length === 0) {
//     return (
//       <div
//         className={`${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient}`}
//       >
//         <div
//           className={`p-6 ${theme.surfaceSolid} ${theme.innerRadius} ${theme.muted}`}
//         >
//           No progress recorded yet.
//         </div>
//       </div>
//     );
//   }

//   /* ==================== DATA PREP ==================== */
//   const chartData = [...progress]
//     .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
//     .map((item) => ({
//       date: new Date(item.date).toLocaleDateString(undefined, {
//         month: "short",
//         day: "numeric",
//       }),
//       fullDate: item.date,
//       completedValue: Number(item.completedValue),
//       target: Number(item.targetSnapshot),
//       isCompleted: item.isCompleted,
//     }));

//   // Get the most recent target (or average) for the reference line
//   const latestTarget = chartData[chartData.length - 1]?.target ?? 0;

//   return (
//     <div className="w-full space-y-6">
//       {/* ==================== HEADER ==================== */}
//       <h2 className={`text-2xl font-semibold ${theme.gradientText}`}>
//         My Progress
//       </h2>

//       {/* ==================== CHART ==================== */}
//       <div
//         className={`w-full ${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient} shadow-xl`}
//       >
//         <div className={`p-6 ${theme.surfaceSolid} ${theme.innerRadius}`}>
//           <div className="mb-5 flex items-center justify-between">
//             <h3
//               className={`text-sm font-semibold uppercase tracking-wider ${theme.label}`}
//             >
//               Completed Value over time
//             </h3>
//             <div className="flex items-center gap-4 text-xs">
//               <div className="flex items-center gap-1.5">
//                 <div className="h-2.5 w-2.5 rounded-full bg-blue-400" />
//                 <span className={theme.muted}>Completed</span>
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <div className="h-0.5 w-4 bg-orange-400" />
//                 <span className={theme.muted}>Target</span>
//               </div>
//             </div>
//           </div>

//           <div className="h-80 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={chartData}>
//                 <defs>
//                   <linearGradient
//                     id="colorCompleted"
//                     x1="0"
//                     y1="0"
//                     x2="0"
//                     y2="1"
//                   >
//                     <stop
//                       offset="5%"
//                       stopColor={chartTheme.areaColor}
//                       stopOpacity={0.3}
//                     />
//                     <stop
//                       offset="95%"
//                       stopColor={chartTheme.areaColor}
//                       stopOpacity={0}
//                     />
//                   </linearGradient>
//                 </defs>

//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   vertical={false}
//                   stroke={chartTheme.grid}
//                 />
//                 <XAxis
//                   dataKey="date"
//                   tick={{ fontSize: 12, fill: chartTheme.axisText }}
//                   stroke={chartTheme.grid}
//                 />
//                 <YAxis
//                   tick={{ fontSize: 12, fill: chartTheme.axisText }}
//                   stroke={chartTheme.grid}
//                 />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: chartTheme.tooltipBg,
//                     border: `1px solid ${chartTheme.tooltipBorder}`,
//                     borderRadius: 12,
//                     color: chartTheme.tooltipText,
//                     padding: "8px 12px",
//                   }}
//                   labelStyle={{ color: chartTheme.axisText }}
//                   formatter={(value: number, name: string) => [
//                     value,
//                     name === "completedValue" ? "Completed" : "Target",
//                   ]}
//                   labelFormatter={(label:any) => `Date: ${label}`}
//                 />

//                 {/* Soft area under the line */}
//                 <Area
//                   type="monotone"
//                   dataKey="completedValue"
//                   stroke="none"
//                   fill="url(#colorCompleted)"
//                 />

//                 {/* Main line */}
//                 <Line
//                   type="monotone"
//                   dataKey="completedValue"
//                   stroke={chartTheme.lineColor}
//                   strokeWidth={2.5}
//                   dot={{ r: 4, fill: chartTheme.lineColor, strokeWidth: 0 }}
//                   activeDot={{ r: 6 }}
//                 />

//                 {/* Target reference line */}
//                 <ReferenceLine
//                   y={latestTarget}
//                   stroke={chartTheme.targetLine}
//                   strokeDasharray="4 4"
//                   strokeWidth={1.5}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* ==================== DETAILED LIST ==================== */}
//       <div className="grid grid-cols-4 gap-3">
//         {progress.map((item: any) => (
//           <div
//             key={item.id}
//             className={`w-full ${theme.borderWidthThin} ${theme.rowRadius} ${theme.borderGradientThin}`}
//           >
//             <div
//               className={`p-4 ${theme.surfaceSolid} ${theme.rowInnerRadius}`}
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className={`font-medium ${theme.text}`}>
//                     {new Date(item.date).toLocaleDateString()}
//                   </p>
//                   <p className={`text-sm ${theme.muted}`}>
//                     Target: {Number(item.targetSnapshot)}
//                   </p>
//                 </div>

//                 <span
//                   className={
//                     item.isCompleted
//                       ? `font-semibold ${theme.success}`
//                       : `font-semibold ${theme.warning}`
//                   }
//                 >
//                   {item.isCompleted ? "Completed" : "Incomplete"}
//                 </span>
//               </div>

//               <div className="mt-3">
//                 <p className={`text-sm ${theme.muted}`}>Completed value</p>
//                 <p className={`text-2xl font-bold ${theme.gradientText}`}>
//                   {Number(item.completedValue)}
//                 </p>
//               </div>

//               {item.entries?.length > 0 && (
//                 <div className={`mt-4 border-t ${theme.divider} pt-3`}>
//                   <h3 className={`mb-2 font-medium ${theme.text}`}>Entries</h3>

//                   <div className="space-y-2">
//                     {item.entries.map((entry: any) => (
//                       <div
//                         key={entry.id}
//                         className="rounded-xl bg-zinc-900/80 p-3 text-sm"
//                       >
//                         <p className={theme.text}>
//                           Value: <strong>{Number(entry.value)}</strong>
//                         </p>

//                         {entry.note && (
//                           <p className={`mt-1 ${theme.muted}`}>
//                             Note: {entry.note}
//                           </p>
//                         )}

//                         <p className={`mt-1 text-xs ${theme.label}`}>
//                           {new Date(entry.createdAt).toLocaleString()}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




"use client";

import { useTaskProgress } from "@/src/hooks/useUsers";
import { useTaskSchedules } from "../hooks/useActivities";

/* ============================================================
   🎨 CENTRAL THEME
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

  gradientText:
    "bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent",

  gradientTextMuted:
    "bg-gradient-to-b from-zinc-200 to-zinc-500 bg-clip-text text-transparent",

  muted: "text-zinc-500",
  text: "text-white",
  label: "text-zinc-400",
  divider: "border-zinc-800",

  success: "text-emerald-400",
  warning: "text-orange-400",
  error: "text-red-400",
};

/* ============================================================
   TYPES
============================================================ */

interface TaskProgressHistoryProps {
  taskId: string;
}

interface Schedule {
  day: string;
}

interface ProgressItem {
  id: string;
  date: string;
  completedValue: string;
  targetSnapshot: string;
  isCompleted: boolean;
  currentStreak?: number;
  longestStreak?: number;
  entries?: {
    id: string;
    value: string;
    note: string | null;
    createdAt: string;
  }[];
}

interface CalendarDay {
  date: Date;
  dateKey: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isScheduled: boolean;
  progress?: any;
}

/* ============================================================
   CONSTANTS
============================================================ */

// Requested order:
// Saturday → Friday
const WEEK_DAYS = [
  "SATURDAY",
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
];

/* ============================================================
   HELPERS
============================================================ */

function getDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getProgressDateKey(dateString: string) {
  // Your API returns dates like:
  // 2026-09-22T00:00:00.000Z
  //
  // We only need the calendar date.
  return dateString.split("T")[0];
}

function getCalendarDayIndex(day: number) {
  /*
    JavaScript:
      Sunday    = 0
      Monday    = 1
      Tuesday   = 2
      Wednesday = 3
      Thursday  = 4
      Friday    = 5
      Saturday  = 6

    Our calendar:
      Saturday = 0
      Sunday   = 1
      Monday   = 2
      Tuesday  = 3
      Wednesday= 4
      Thursday = 5
      Friday   = 6
  */

  return (day + 1) % 7;
}

/* ============================================================
   COMPONENT
============================================================ */

export default function TaskProgressHistory({
  taskId,
}: TaskProgressHistoryProps) {
  const {
    data: progress,
    isLoading,
    isError,
    error,
  } = useTaskProgress(taskId);

  const { data: schedules,isLoading:schedulesIsLoading } = useTaskSchedules(taskId);

  if(schedulesIsLoading)return <div>Loading...</div>

  console.log("schedules----/////",schedules);

  /* ============================================================
     LOADING
  ============================================================ */

  if (isLoading) {
    return (
      <div
        className={`${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient}`}
      >
        <div
          className={`p-6 ${theme.surfaceSolid} ${theme.innerRadius} ${theme.muted}`}
        >
          Loading progress...
        </div>
      </div>
    );
  }

  /* ============================================================
     ERROR
  ============================================================ */

  if (isError) {
    return (
      <div
        className={`${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient}`}
      >
        <div
          className={`p-6 ${theme.surfaceSolid} ${theme.innerRadius} ${theme.error}`}
        >
          Failed to load progress: {error.message}
        </div>
      </div>
    );
  }

  /* ============================================================
     NORMALIZE API DATA
  ============================================================ */

  const progressData = Array.isArray(progress)
    ? progress
    : [];

  const scheduleData: Schedule[] = Array.isArray(schedules)
    ? schedules
    : schedules?.data ?? [];

  /* ============================================================
     SCHEDULED DAYS
  ============================================================ */

  const scheduledDays = new Set(
    scheduleData.map((schedule) =>
      schedule.day.toUpperCase()
    )
  );

  /* ============================================================
     PROGRESS LOOKUP
     
     Example:
       "2026-09-22" -> progress object
  ============================================================ */

  const progressByDate = new Map<string, any>();

  progressData.forEach((item) => {
    progressByDate.set(
      getProgressDateKey(item.date),
      item
    );
  });

  /* ============================================================
     CURRENT MONTH
     
     Example:
       September 2026
     
     September 1, 2026 = Tuesday
     September 30, 2026 = Wednesday
  ============================================================ */

  const today = new Date();

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const firstDayOfMonth = new Date(
    currentYear,
    currentMonth,
    1
  );

  const lastDayOfMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  );

  /* ============================================================
     CALENDAR START
     
     Calendar starts on Saturday because requested order is:
     
     Saturday Sunday Monday Tuesday Wednesday Thursday Friday
  ============================================================ */

  const firstDayIndex = getCalendarDayIndex(
    firstDayOfMonth.getDay()
  );

  const calendarStart = new Date(firstDayOfMonth);

  calendarStart.setDate(
    firstDayOfMonth.getDate() - firstDayIndex
  );

  /* ============================================================
     CALENDAR END
  ============================================================ */

  const lastDayIndex = getCalendarDayIndex(
    lastDayOfMonth.getDay()
  );

  const calendarEnd = new Date(lastDayOfMonth);

  calendarEnd.setDate(
    lastDayOfMonth.getDate() + (6 - lastDayIndex)
  );

  /* ============================================================
     BUILD CALENDAR
  ============================================================ */

  const calendarDays: CalendarDay[] = [];

  const cursor = new Date(calendarStart);

  while (cursor <= calendarEnd) {
    const dateKey = getDateKey(cursor);

    const isCurrentMonth =
      cursor.getMonth() === currentMonth;

    const dayName = cursor
      .toLocaleDateString("en-US", {
        weekday: "long",
      })
      .toUpperCase();

    const progressForDay =
      progressByDate.get(dateKey);

    calendarDays.push({
      date: new Date(cursor),
      dateKey,
      dayNumber: cursor.getDate(),
      isCurrentMonth,
      isScheduled: scheduledDays.has(dayName),
      progress: progressForDay,
    });

    cursor.setDate(cursor.getDate() + 1);
  }

  /* ============================================================
     GROUP INTO WEEKS
     
     Every row contains 7 days.
  ============================================================ */

  const calendarWeeks: CalendarDay[][] = [];

  for (let i = 0; i < calendarDays.length; i += 7) {
    calendarWeeks.push(
      calendarDays.slice(i, i + 7)
    );
  }

  /* ============================================================
     MONTH NAME
  ============================================================ */

  const monthName = firstDayOfMonth.toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    }
  );

  /* ============================================================
     STATISTICS
  ============================================================ */

  const completedDays = progressData.filter(
    (item) => item.isCompleted
  ).length;

  const latestProgress =
    [...progressData].sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )[0];

  const currentStreak =
    latestProgress?.currentStreak ?? 0;

  const longestStreak = Math.max(
    0,
    ...progressData.map(
      (item) => item.longestStreak ?? 0
    )
  );

  /* ============================================================
     RENDER
  ============================================================ */

  console.log(
    "PROGRESS DATA//////////////////////////////////////////////",
    progressData.map((item) => ({
      date: item.date,
      entries: item.entries?.map((e: any) => e.createdAt),
    }))
  );

  return (
    <div className="w-full space-y-6">
      {/* ========================================================
          HEADER
      ======================================================== */}

      <h2 className={`text-2xl font-semibold ${theme.gradientText}`}>
        My Progress
      </h2>

      {/* ========================================================
          CALENDAR
      ======================================================== */}

      <div
        className={`w-full ${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient} shadow-xl`}
      >
        <div className={`p-6 ${theme.surfaceSolid} ${theme.innerRadius}`}>
          {/* Calendar Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3
                className={`text-sm font-semibold uppercase tracking-wider ${theme.label}`}
              >
                Progress Calendar
              </h3>

              <p className={`mt-1 text-xs ${theme.muted}`}>{monthName}</p>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              {/* No activity */}
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-md bg-blue-900" />

                <span className={theme.muted}>No activity</span>
              </div>

              {/* Incomplete */}
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-md bg-zinc-700" />

                <span className={theme.muted}>Incomplete</span>
              </div>

              {/* Completed */}
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-md bg-emerald-500" />

                <span className={theme.muted}>Completed</span>
              </div>
            </div>
          </div>

          {/* ==================================================
              CALENDAR
          ================================================== */}

          <div className="w-full">
            <div className="mx-auto w-fit">
              {/* Weekday Header */}

              <div className="mb-1.5 grid grid-cols-7 gap-1.5">
                {WEEK_DAYS.map((day) => (
                  <div
                    key={day}
                    className={`
            flex
            h-5
            w-9
            items-center
            justify-center
            text-[9px]
            font-semibold
            uppercase
            tracking-wide
            ${theme.muted}
          `}
                  >
                    {day.slice(0, 2)}
                  </div>
                ))}
              </div>

              {/* Calendar */}

              <div className="space-y-1.5">
                {calendarWeeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-cols-7 gap-1.5">
                    {week.map((day) => {
                      /* Empty cells outside current month */

                      if (!day.isCurrentMonth) {
                        return <div key={day.dateKey} className="h-9 w-9" />;
                      }

                      /* Default = no activity */

                      let cellClass = "bg-blue-900/80 border-blue-800";

                      let statusText = "No activity";

                      /* Scheduled day */

                      if (day.isScheduled) {
                        /* Completed */

                        if (day.progress?.isCompleted) {
                          cellClass = "bg-emerald-500 border-emerald-400";

                          statusText = "Completed";
                        } else {
                          /* Scheduled but incomplete */

                          cellClass = "bg-zinc-700 border-zinc-600";

                          statusText = "Incomplete";
                        }
                      }

                      return (
                        <div
                          key={day.dateKey}
                          className={`
                  group relative
                  h-9 w-9
                  rounded-lg
                  border
                  ${cellClass}
                  p-1
                  transition-all
                  duration-200
                  hover:scale-110
                  hover:z-10
                  hover:shadow-lg
                `}
                        >
                          <div className="flex h-full flex-col justify-between">
                            {/* Date */}

                            <span
                              className="
                      text-[11px]
                      font-semibold
                      leading-none
                      text-white
                    "
                            >
                              {day.dayNumber}
                            </span>

                            {/* Completed check */}

                            {day.isScheduled && day.progress?.isCompleted && (
                              <span className="text-[10px] font-bold leading-none text-white">
                                ✓
                              </span>
                            )}
                          </div>

                          {/* Tooltip */}

                          <div
                            className="
                    pointer-events-none
                    absolute
                    bottom-full
                    left-1/2
                    z-50
                    mb-2
                    hidden
                    w-max
                    -translate-x-1/2
                    rounded-lg
                    border
                    border-zinc-700
                    bg-zinc-950
                    px-3
                    py-2
                    text-xs
                    shadow-2xl
                    group-hover:block
                  "
                          >
                            <p className="font-semibold text-white">
                              {day.date.toLocaleDateString("en-US", {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>

                            <p className="mt-1 text-zinc-400">{statusText}</p>

                            {day.progress && (
                              <>
                                <p className="mt-1 text-zinc-400">
                                  Completed:{" "}
                                  <span className="text-white">
                                    {Number(day.progress.completedValue)}
                                  </span>
                                </p>

                                <p className="text-zinc-400">
                                  Target:{" "}
                                  <span className="text-white">
                                    {Number(day.progress.targetSnapshot)}
                                  </span>
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ==================================================
              SUMMARY
          ================================================== */}

          <div
            className={`mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t ${theme.divider} pt-4 text-xs`}
          >
            <span className={theme.muted}>
              Completed days:{" "}
              <span className="font-semibold text-white">{completedDays}</span>
            </span>

            <span className={theme.muted}>
              Current streak:{" "}
              <span className="font-semibold text-white">{currentStreak}</span>
            </span>

            <span className={theme.muted}>
              Longest streak:{" "}
              <span className="font-semibold text-white">{longestStreak}</span>
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================
          DETAILED LIST
      ======================================================== */}

      {progressData.length > 0 && (
        <div className="grid grid-cols-1 gap-3">
          {progressData.map((item) => (
            <div
              key={item.id}
              className={`w-full ${theme.borderWidthThin} ${theme.rowRadius} ${theme.borderGradientThin}`}
            >
              <div
                className={`p-4 ${theme.surfaceSolid} ${theme.rowInnerRadius}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${theme.text}`}>
                      {new Date(item.date).toLocaleDateString()}
                    </p>

                    <p className={`text-sm ${theme.muted}`}>
                      Target: {Number(item.targetSnapshot)}
                    </p>
                  </div>

                  <span
                    className={
                      item.isCompleted
                        ? `font-semibold ${theme.success}`
                        : `font-semibold ${theme.warning}`
                    }
                  >
                    {item.isCompleted ? "Completed" : "Incomplete"}
                  </span>
                </div>

                <div className="mt-3">
                  <p className={`text-sm ${theme.muted}`}>Completed value</p>

                  <p className={`text-2xl font-bold ${theme.gradientText}`}>
                    {Number(item.completedValue)}
                  </p>
                </div>

                {item.entries && item.entries.length > 0 && (
                  <div className={`mt-4 border-t ${theme.divider} pt-3`}>
                    <h3 className={`mb-2 font-medium ${theme.text}`}>
                      Entries
                    </h3>

                    <div className="grid grid-cols-6 gap-2  space-y-2">
                      {item.entries.map((entry:any) => (
                        <div
                          key={entry.id}
                          className=" rounded-xl bg-zinc-900/80 p-3 text-sm"
                        >
                          <p className={theme.text}>
                            Value: <strong>{Number(entry.value)}</strong>
                          </p>

                          {entry.note && (
                            <p className={`mt-1 ${theme.muted}`}>
                              Note: {entry.note}
                            </p>
                          )}

                          <p className={`mt-1 text-xs ${theme.label}`}>
                            {new Date(entry.createdAt).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

