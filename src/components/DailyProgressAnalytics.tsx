


// "use client";

// import { useDailyProgressAnalytics } from "@/src/hooks/useUsers";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   Legend,
// } from "recharts";

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

//   gradientText:
//     "bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent",
//   gradientTextMuted:
//     "bg-gradient-to-b from-zinc-200 to-zinc-500 bg-clip-text text-transparent",

//   muted: "text-zinc-500",
//   text: "text-white",
//   label: "text-zinc-400",
//   divider: "border-zinc-800",

//   success: "text-emerald-400",
//   error: "text-red-400",
// };

// /* ============================================================
//    🎨 CHART THEME — tweak chart colors here
// ============================================================ */
// const chartTheme = {
//   grid: "#27272a",
//   axisText: "#a1a1aa",

//   lineColor: "#60a5fa",
//   lineDot: "#60a5fa",
//   lineDotActive: "#93c5fd",

//   barCompleted: "#34d399",
//   barTotal: "#4CC9F0",

//   tooltipBg: "#09090b",
//   tooltipBorder: "#3f3f46",
//   tooltipText: "#ffffff",

//   progressTrack: "bg-zinc-800",
//   progressFill: "bg-gradient-to-r from-blue-400 to-blue-600",
// };

// interface DailyProgressAnalyticsProps {
//   activityId: string;
// }

// export default function DailyProgressAnalytics({
//   activityId,
// }: DailyProgressAnalyticsProps) {
//   const {
//     data: progress,
//     isLoading,
//     isError,
//     error,
//   } = useDailyProgressAnalytics(activityId);

//   /* ==================== STATES ==================== */
//   if (isLoading) {
//     return (
//       <div
//         className={`${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient}`}
//       >
//         <div
//           className={`p-6 ${theme.surfaceSolid} ${theme.innerRadius} ${theme.muted}`}
//         >
//           Loading analytics...
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
//           Failed to load analytics: {error.message}
//         </div>
//       </div>
//     );
//   }

//   console.log("THIS IS THE RESULT", progress);

//   if (!progress || progress.length === 0) {
//     return (
//       <div
//         className={`${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient}`}
//       >
//         <div
//           className={`p-6 ${theme.surfaceSolid} ${theme.innerRadius} ${theme.muted}`}
//         >
//           No progress data available yet.
//         </div>
//       </div>
//     );
//   }

//   /* ==================== DATA PREP ==================== */
//   // 1. Sort existing progress
//   const sorted = [...progress].sort(
//     (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
//   );

//   // 2. Create a lookup by date
//   const progressByDate = new Map(
//     sorted.map((day) => [new Date(day.date).toISOString().slice(0, 10), day])
//   );

//   // 3. Generate every date between first and last date
//   const chartData = [];

//     const start = new Date(sorted[0].date);
//     start.setUTCHours(0, 0, 0, 0);

//     const lastRecorded = new Date(sorted[sorted.length - 1].date);
//     lastRecorded.setUTCHours(0, 0, 0, 0);

//     const todayUTC = new Date();
//     todayUTC.setUTCHours(0, 0, 0, 0);


//     const end = todayUTC > lastRecorded ? todayUTC : lastRecorded;


//   for (
//     let date = new Date(start);
//     date <= end;
//     date.setUTCDate(date.getDate() + 1)
//   ) {
//     const key = date.toISOString().slice(0, 10);
//     const day = progressByDate.get(key);

//     chartData.push({
//       date:`${date.toLocaleString("en-US", {
//         month: "short",
//         timeZone: "UTC",
//       })} ${date.getUTCDate()}`,
//       fullDate: key,
//       percentage: day ? Number(day.completionPercentage) : 0,
//       completed: day ? day.completedTasks : 0,
//       total: day ? day.totalTasks : 0,
//       completedStatus: day ? day.completed : false,
//     });
//   }

//   return (
//     <div className="w-full space-y-6">
//       {/* ==================== HEADER ==================== */}
//       <h2 className={`text-2xl font-semibold ${theme.gradientText}`}>
//         Daily Progress
//       </h2>

//       {/* ==================== LINE CHART ==================== */}
//       <div
//         className={`w-full ${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient} shadow-xl`}
//       >
//         <div className={`p-6 ${theme.surfaceSolid} ${theme.innerRadius}`}>
//           <h3
//             className={`mb-5 text-sm font-semibold uppercase tracking-wider ${theme.label}`}
//           >
//             Completion % over time
//           </h3>

//           <div className="h-80 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={chartData}>
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
//                   domain={[0, 100]}
//                   tickFormatter={(v: any) => `${v}%`}
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
//                   itemStyle={{ color: chartTheme.tooltipText }}
//                   formatter={(value: any) => [
//                     `${value.toFixed(0)}%`,
//                     "Completion",
//                   ]}
//                   labelFormatter={(label: any) => `Date: ${label}`}
//                   cursor={{ stroke: chartTheme.grid }}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="percentage"
//                   stroke={chartTheme.lineColor}
//                   strokeWidth={2.5}
//                   dot={{ r: 4, fill: chartTheme.lineDot, strokeWidth: 0 }}
//                   activeDot={{
//                     r: 6,
//                     fill: chartTheme.lineDotActive,
//                     strokeWidth: 0,
//                   }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* ==================== BAR CHART ==================== */}
//       <div
//         className={`w-full ${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient} shadow-xl`}
//       >
//         <div className={`p-6 ${theme.surfaceSolid} ${theme.innerRadius}`}>
//           <h3
//             className={`mb-5 text-sm font-semibold uppercase tracking-wider ${theme.label}`}
//           >
//             Tasks completed vs total
//           </h3>

//           <div className="h-72 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={chartData}>
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
//                   itemStyle={{ color: chartTheme.tooltipText }}
//                   cursor={{ fill: "rgba(255,255,255,0.04)" }}
//                 />
//                 <Legend
//                   wrapperStyle={{ color: chartTheme.axisText, fontSize: 12 }}
//                 />
//                 <Bar
//                   dataKey="completed"
//                   name="Completed"
//                   fill={chartTheme.barCompleted}
//                   radius={[6, 6, 0, 0]}
//                 />
//                 <Bar
//                   dataKey="total"
//                   name="Total"
//                   fill={chartTheme.barTotal}
//                   radius={[6, 6, 0, 0]}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* ==================== DAILY LIST ==================== */}
//       <div className="grid grid-cols-5 gap-3">
//         {progress.map((day: any) => {
//           const percentage = Number(day.completionPercentage);

//           return (
//             <div
//               key={day.id}
//               className={`w-full ${theme.borderWidthThin} ${theme.rowRadius} ${theme.borderGradientThin}`}
//             >
//               <div
//                 className={`p-4 ${theme.surfaceSolid} ${theme.rowInnerRadius}`}
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className={`font-small ${theme.text}`}>
//                       {new Date(day.date).toLocaleDateString()}
//                     </p>
//                     <p className={`text-sm ${theme.muted}`}>
//                       {day.completedTasks} / {day.totalTasks} tasks completed
//                     </p>
//                   </div>

//                   <div className={`text-md font-bold ${theme.gradientText}`}>
//                     {percentage.toFixed(0)}%
//                   </div>
//                 </div>

//                 {/* Progress bar */}
//                 <div
//                   className={`mt-3 h-2 overflow-hidden rounded-full ${chartTheme.progressTrack}`}
//                 >
//                   <div
//                     className={`h-full rounded-full ${chartTheme.progressFill} transition-all`}
//                     style={{ width: `${Math.min(percentage, 100)}%` }}
//                   />
//                 </div>

//                 <p className={`mt-2 text-sm ${theme.muted}`}>
//                   Status:{" "}
//                   <span
//                     className={
//                       day.completed
//                         ? `font-medium ${theme.success}`
//                         : `font-medium ${theme.label}`
//                     }
//                   >
//                     {day.completed ? "Completed" : "Incomplete"}
//                   </span>
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }



"use client";

import { useDailyProgressAnalytics } from "@/src/hooks/useUsers";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

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
  muted: "text-zinc-500",
  text: "text-white",
  label: "text-zinc-400",
  success: "text-emerald-400",
  error: "text-red-400",
};

const chartTheme = {
  grid: "#27272a",
  axisText: "#a1a1aa",
  tooltipBg: "#09090b",
  tooltipBorder: "#3f3f46",
  tooltipText: "#ffffff",
  barCompleted: "#34d399",
  barTotal: "#4CC9F0",
  progressTrack: "bg-zinc-800",
  progressFill: "bg-gradient-to-r from-blue-400 to-blue-600",
};

const memberColors = [
  "#c084fc",
  "#f472b6",
  "#fbbf24",
  "#34d399",
  "#fb7185",
  "#22d3ee",
  "#a3e635",
  "#818cf8",
];

interface DailyProgressAnalyticsProps {
  activityId: string;
}

type ProgressRecord = {
  id: string;
  userId: string;
  date: string;
  completedTasks: number;
  totalTasks: number;
  completionPercentage: string | number;
  completed: boolean;
};

type MemberProgress = {
  username: string | null;
  progress: ProgressRecord[];
};

type AnalyticsData = {
  ownProgressAnalytics: ProgressRecord[];
  membersProgressAnalytics: Record<string, MemberProgress>;
};

export default function DailyProgressAnalytics({
  activityId,
}: DailyProgressAnalyticsProps) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useDailyProgressAnalytics(activityId);

  // Supports either the API payload itself or the complete API response.
  const analytics = (response?.data ?? response) as AnalyticsData | undefined;

  if (isLoading) {
    return (
      <div className="rounded-3xl bg-zinc-950 p-6 text-zinc-400">
        Loading analytics...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-3xl bg-zinc-950 p-6 text-red-400">
        Failed to load analytics: {error?.message}
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="rounded-3xl bg-zinc-950 p-6 text-zinc-400">
        No progress data available yet.
      </div>
    );
  }

  const ownProgress = analytics.ownProgressAnalytics ?? [];
  const members = analytics.membersProgressAnalytics ?? {};

  // Turn the object into a list for rendering and chart generation.
  const memberList = Object.entries(members).map(([userId, member]) => ({
    userId,
    username: member.username ?? "Unknown member",
    progress: member.progress ?? [],
  }));

  const allRecords = [
    ...ownProgress,
    ...memberList.flatMap((member) => member.progress),
  ];

  if (allRecords.length === 0) {
    return (
      <div className="rounded-3xl bg-zinc-950 p-6 text-zinc-400">
        No progress data available yet.
      </div>
    );
  }

  // Build a lookup for each member's recorded progress by calendar date.
  // If a member has multiple records on the same date, use the latest one.
  const makeDailyLookup = (records: ProgressRecord[]) => {
    const lookup = new Map<string, ProgressRecord>();

    [...records]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .forEach((record) => {
        const key = new Date(record.date).toISOString().slice(0, 10);
        lookup.set(key, record);
      });

    return lookup;
  };

  const ownByDate = makeDailyLookup(ownProgress);

  const memberLookups = memberList.map((member) => ({
    ...member,
    byDate: makeDailyLookup(member.progress),
  }));

  // Generate a shared date axis for a fair comparison.
  const allDates = allRecords.map((record) => new Date(record.date).getTime());

  const start = new Date(Math.min(...allDates));
  start.setUTCHours(0, 0, 0, 0);

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const end = new Date(Math.max(...allDates));
  end.setUTCHours(0, 0, 0, 0);

  const finalDate = today > end ? today : end;

  const chartData: Record<string, any>[] = [];

  for (
    let date = new Date(start);
    date <= finalDate;
    date.setUTCDate(date.getUTCDate() + 1)
  ) {
    const key = date.toISOString().slice(0, 10);
    const ownDay = ownByDate.get(key);

    const row: Record<string, any> = {
      fullDate: key,
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      }),

      // Your own daily percentage.
      percentage: ownDay ? Number(ownDay.completionPercentage) : 0,

      completed: ownDay?.completedTasks ?? 0,
      total: ownDay?.totalTasks ?? 0,
    };

    // Add one data property per member.
    memberLookups.forEach((member) => {
      const memberDay = member.byDate.get(key);

      row[member.userId] = memberDay
        ? Number(memberDay.completionPercentage)
        : 0;
    });

    chartData.push(row);
  }

  const renderProgressCards = (
    records: ProgressRecord[],
    emptyMessage: string
  ) => {
    if (records.length === 0) {
      return <p className="text-sm text-zinc-500">{emptyMessage}</p>;
    }

    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {[...records]
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map((day) => {
            const percentage = Number(day.completionPercentage);

            return (
              <div
                key={day.id}
                className={`w-full ${theme.borderWidthThin} ${theme.rowRadius} ${theme.borderGradientThin}`}
              >
                <div
                  className={`p-4 ${theme.surfaceSolid} ${theme.rowInnerRadius}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className={`font-medium ${theme.text}`}>
                        {new Date(day.date).toLocaleDateString()}
                      </p>
                      <p className={`text-sm ${theme.muted}`}>
                        {day.completedTasks} / {day.totalTasks} tasks
                      </p>
                    </div>

                    <span className={`font-bold ${theme.gradientText}`}>
                      {percentage.toFixed(0)}%
                    </span>
                  </div>

                  <div
                    className={`mt-3 h-2 overflow-hidden rounded-full ${chartTheme.progressTrack}`}
                  >
                    <div
                      className={`h-full rounded-full ${chartTheme.progressFill}`}
                      style={{
                        width: `${Math.min(100, Math.max(0, percentage))}%`,
                      }}
                    />
                  </div>

                  <p className={`mt-2 text-sm ${theme.muted}`}>
                    Status:{" "}
                    <span
                      className={
                        day.completed
                          ? "font-medium text-emerald-400"
                          : "font-medium text-zinc-400"
                      }
                    >
                      {day.completed ? "Completed" : "Incomplete"}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <div className="w-full space-y-6">
      <h2 className={`text-2xl font-semibold ${theme.gradientText}`}>
        Daily Progress Analytics
      </h2>

      {/* COMPARISON LINE CHART */}
      <div
        className={`w-full ${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient} shadow-xl`}
      >
        <div className={`p-6 ${theme.surfaceSolid} ${theme.innerRadius}`}>
          <h3
            className={`mb-5 text-sm font-semibold uppercase tracking-wider ${theme.label}`}
          >
            Completion percentage comparison
          </h3>

          {/* Member selection */}
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedUserId(null)}
              className={`rounded-lg px-3 py-1.5 text-sm transition ${
                selectedUserId === null
                  ? "bg-blue-500/20 text-blue-300 ring-1 ring-blue-400/40"
                  : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              Everyone
            </button>

            {memberList.map((member, index) => (
              <button
                key={member.userId}
                onClick={() => {
                  setSelectedUserId((current) =>
                    current === member.userId ? null : member.userId
                  );
                }}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition ${
                  selectedUserId === member.userId
                    ? "bg-zinc-700 text-white ring-1 ring-zinc-500"
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: memberColors[index % memberColors.length],
                  }}
                />
                {member.username}
              </button>
            ))}
          </div>

          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={chartTheme.grid}
                />

                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: chartTheme.axisText }}
                  stroke={chartTheme.grid}
                  minTickGap={25}
                />

                <YAxis
                  domain={[0, 100]}
                  tickFormatter={(value: any) => `${value}%`}
                  tick={{ fontSize: 12, fill: chartTheme.axisText }}
                  stroke={chartTheme.grid}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: chartTheme.tooltipBg,
                    border: `1px solid ${chartTheme.tooltipBorder}`,
                    borderRadius: 12,
                    color: chartTheme.tooltipText,
                  }}
                  labelStyle={{ color: chartTheme.axisText }}
                  formatter={(value: any, name: any) => [
                    `${Number(value).toFixed(0)}%`,
                    name,
                  ]}
                  labelFormatter={(_: any, payload:readonly any[]) =>
                    payload?.[0]?.payload?.fullDate ?? ""
                  }
                />

                <Legend />

                {/* Your line */}
                <Line
                  type="monotone"
                  dataKey="percentage"
                  name="You"
                  stroke="#60a5fa"
                  strokeWidth={6}
                  dot={false}
                  activeDot={{ r: 5 }}
                />

                {/* One line for every other member */}
                {memberLookups
                  .filter(
                    (member) =>
                      selectedUserId === null ||
                      selectedUserId === member.userId
                  )
                  .map((member, index) => (
                    <Line
                      key={member.userId}
                      type="monotone"
                      dataKey={member.userId}
                      name={member.username}
                      stroke={
                        memberColors[
                          memberList.findIndex(
                            (item) => item.userId === member.userId
                          ) % memberColors.length
                        ]
                      }
                      strokeWidth={1.5}
                      dot={false}
                      activeDot={{ r: 5 }}
                      connectNulls={false}
                    />
                  ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <p className="mt-3 text-xs text-zinc-500">
            Missing daily records are displayed as 0%. This assumes no record
            means no progress for that day.
          </p>
        </div>
      </div>

      {/* YOUR TASKS BAR CHART */}
      <div
        className={`w-full ${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient} shadow-xl`}
      >
        <div className={`p-6 ${theme.surfaceSolid} ${theme.innerRadius}`}>
          <h3
            className={`mb-5 text-sm font-semibold uppercase tracking-wider ${theme.label}`}
          >
            Your tasks completed vs total
          </h3>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={chartTheme.grid}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: chartTheme.axisText }}
                  stroke={chartTheme.grid}
                  minTickGap={25}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: chartTheme.axisText }}
                  stroke={chartTheme.grid}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: chartTheme.tooltipBg,
                    border: `1px solid ${chartTheme.tooltipBorder}`,
                    borderRadius: 12,
                    color: chartTheme.tooltipText,
                  }}
                />
                <Legend />
                <Bar
                  dataKey="completed"
                  name="Completed"
                  fill={chartTheme.barCompleted}
                />
                <Bar dataKey="total" name="Total" fill={chartTheme.barTotal} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* YOUR HISTORY */}
      <section className="space-y-4">
        <h3 className={`text-lg font-semibold ${theme.text}`}>
          Your progress history
        </h3>
        {renderProgressCards(ownProgress, "You have no progress records yet.")}
      </section>

      {/* EACH MEMBER'S HISTORY */}
      <section className="space-y-5">
        <h3 className={`text-lg font-semibold ${theme.text}`}>
          Members' progress histories
        </h3>

        {memberList.length === 0 ? (
          <p className={theme.muted}>No other members' progress available.</p>
        ) : (
          memberList.map((member, index) => (
            <div key={member.userId} className="space-y-3">
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: memberColors[index % memberColors.length],
                  }}
                />
                <h4 className={`font-semibold ${theme.text}`}>
                  {member.username}
                </h4>
              </div>

              {renderProgressCards(
                member.progress,
                "This member has no progress records yet."
              )}
            </div>
          ))
        )}
      </section>
    </div>
  );
}