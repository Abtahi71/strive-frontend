


"use client";

import { useDailyProgressAnalytics } from "@/src/hooks/useUsers";
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

  gradientText:
    "bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent",
  gradientTextMuted:
    "bg-gradient-to-b from-zinc-200 to-zinc-500 bg-clip-text text-transparent",

  muted: "text-zinc-500",
  text: "text-white",
  label: "text-zinc-400",
  divider: "border-zinc-800",

  success: "text-emerald-400",
  error: "text-red-400",
};

/* ============================================================
   🎨 CHART THEME — tweak chart colors here
============================================================ */
const chartTheme = {
  grid: "#27272a",
  axisText: "#a1a1aa",

  lineColor: "#60a5fa",
  lineDot: "#60a5fa",
  lineDotActive: "#93c5fd",

  barCompleted: "#34d399",
  barTotal: "#4CC9F0",

  tooltipBg: "#09090b",
  tooltipBorder: "#3f3f46",
  tooltipText: "#ffffff",

  progressTrack: "bg-zinc-800",
  progressFill: "bg-gradient-to-r from-blue-400 to-blue-600",
};

interface DailyProgressAnalyticsProps {
  activityId: string;
}

export default function DailyProgressAnalytics({
  activityId,
}: DailyProgressAnalyticsProps) {
  const {
    data: progress,
    isLoading,
    isError,
    error,
  } = useDailyProgressAnalytics(activityId);

  /* ==================== STATES ==================== */
  if (isLoading) {
    return (
      <div
        className={`${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient}`}
      >
        <div
          className={`p-6 ${theme.surfaceSolid} ${theme.innerRadius} ${theme.muted}`}
        >
          Loading analytics...
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
          className={`p-6 ${theme.surfaceSolid} ${theme.innerRadius} ${theme.error}`}
        >
          Failed to load analytics: {error.message}
        </div>
      </div>
    );
  }

  console.log("THIS IS THE RESULT", progress);

  if (!progress || progress.length === 0) {
    return (
      <div
        className={`${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient}`}
      >
        <div
          className={`p-6 ${theme.surfaceSolid} ${theme.innerRadius} ${theme.muted}`}
        >
          No progress data available yet.
        </div>
      </div>
    );
  }

  /* ==================== DATA PREP ==================== */
  // 1. Sort existing progress
  const sorted = [...progress].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // 2. Create a lookup by date
  const progressByDate = new Map(
    sorted.map((day) => [new Date(day.date).toISOString().slice(0, 10), day])
  );

  // 3. Generate every date between first and last date
  const chartData = [];

    const start = new Date(sorted[0].date);
    start.setUTCHours(0, 0, 0, 0);

    const lastRecorded = new Date(sorted[sorted.length - 1].date);
    lastRecorded.setUTCHours(0, 0, 0, 0);

    const todayUTC = new Date();
    todayUTC.setUTCHours(0, 0, 0, 0);


    const end = todayUTC > lastRecorded ? todayUTC : lastRecorded;


  for (
    let date = new Date(start);
    date <= end;
    date.setUTCDate(date.getDate() + 1)
  ) {
    const key = date.toISOString().slice(0, 10);
    const day = progressByDate.get(key);

    chartData.push({
      date:`${date.toLocaleString("en-US", {
        month: "short",
        timeZone: "UTC",
      })} ${date.getUTCDate()}`,
      fullDate: key,
      percentage: day ? Number(day.completionPercentage) : 0,
      completed: day ? day.completedTasks : 0,
      total: day ? day.totalTasks : 0,
      completedStatus: day ? day.completed : false,
    });
  }

  return (
    <div className="w-full space-y-6">
      {/* ==================== HEADER ==================== */}
      <h2 className={`text-2xl font-semibold ${theme.gradientText}`}>
        Daily Progress
      </h2>

      {/* ==================== LINE CHART ==================== */}
      <div
        className={`w-full ${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient} shadow-xl`}
      >
        <div className={`p-6 ${theme.surfaceSolid} ${theme.innerRadius}`}>
          <h3
            className={`mb-5 text-sm font-semibold uppercase tracking-wider ${theme.label}`}
          >
            Completion % over time
          </h3>

          <div className="h-80 w-full">
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
                />
                <YAxis
                  domain={[0, 100]}
                  tickFormatter={(v: any) => `${v}%`}
                  tick={{ fontSize: 12, fill: chartTheme.axisText }}
                  stroke={chartTheme.grid}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: chartTheme.tooltipBg,
                    border: `1px solid ${chartTheme.tooltipBorder}`,
                    borderRadius: 12,
                    color: chartTheme.tooltipText,
                    padding: "8px 12px",
                  }}
                  labelStyle={{ color: chartTheme.axisText }}
                  itemStyle={{ color: chartTheme.tooltipText }}
                  formatter={(value: any) => [
                    `${value.toFixed(0)}%`,
                    "Completion",
                  ]}
                  labelFormatter={(label: any) => `Date: ${label}`}
                  cursor={{ stroke: chartTheme.grid }}
                />
                <Line
                  type="monotone"
                  dataKey="percentage"
                  stroke={chartTheme.lineColor}
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: chartTheme.lineDot, strokeWidth: 0 }}
                  activeDot={{
                    r: 6,
                    fill: chartTheme.lineDotActive,
                    strokeWidth: 0,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ==================== BAR CHART ==================== */}
      <div
        className={`w-full ${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient} shadow-xl`}
      >
        <div className={`p-6 ${theme.surfaceSolid} ${theme.innerRadius}`}>
          <h3
            className={`mb-5 text-sm font-semibold uppercase tracking-wider ${theme.label}`}
          >
            Tasks completed vs total
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
                    padding: "8px 12px",
                  }}
                  labelStyle={{ color: chartTheme.axisText }}
                  itemStyle={{ color: chartTheme.tooltipText }}
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                />
                <Legend
                  wrapperStyle={{ color: chartTheme.axisText, fontSize: 12 }}
                />
                <Bar
                  dataKey="completed"
                  name="Completed"
                  fill={chartTheme.barCompleted}
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="total"
                  name="Total"
                  fill={chartTheme.barTotal}
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ==================== DAILY LIST ==================== */}
      <div className="grid grid-cols-5 gap-3">
        {progress.map((day: any) => {
          const percentage = Number(day.completionPercentage);

          return (
            <div
              key={day.id}
              className={`w-full ${theme.borderWidthThin} ${theme.rowRadius} ${theme.borderGradientThin}`}
            >
              <div
                className={`p-4 ${theme.surfaceSolid} ${theme.rowInnerRadius}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-small ${theme.text}`}>
                      {new Date(day.date).toLocaleDateString()}
                    </p>
                    <p className={`text-sm ${theme.muted}`}>
                      {day.completedTasks} / {day.totalTasks} tasks completed
                    </p>
                  </div>

                  <div className={`text-md font-bold ${theme.gradientText}`}>
                    {percentage.toFixed(0)}%
                  </div>
                </div>

                {/* Progress bar */}
                <div
                  className={`mt-3 h-2 overflow-hidden rounded-full ${chartTheme.progressTrack}`}
                >
                  <div
                    className={`h-full rounded-full ${chartTheme.progressFill} transition-all`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>

                <p className={`mt-2 text-sm ${theme.muted}`}>
                  Status:{" "}
                  <span
                    className={
                      day.completed
                        ? `font-medium ${theme.success}`
                        : `font-medium ${theme.label}`
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
    </div>
  );
}