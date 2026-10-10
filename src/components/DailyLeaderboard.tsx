"use client";

import { useDailyLeadership } from "@/src/hooks/useUsers";

interface DailyTaskLeaderboardProps {
  taskId: string;
}

export default function DailyTaskLeaderboard({
  taskId,
}: DailyTaskLeaderboardProps) {
  const { data: leadership, isLoading, isError } = useDailyLeadership(taskId);

  if (isLoading) {
    return <p>Loading daily leaderboard...</p>;
  }

  if (isError) {
    return <p>Failed to load daily leaderboard.</p>;
  }

  if (!leadership || leadership.length === 0) {
    return <p>No progress recorded today.</p>;
  }

  return (
    <div>
      <h2>Today&apos;s leaderboard</h2>

      {leadership.map((entry:any, index:any) => (
        <div key={entry.userId}>
          <span>#{index + 1}</span>

          <strong>{entry.user.username}</strong>

          <span>{entry.completedValue}</span>

          {entry.isCompleted && <span> ✓</span>}
        </div>
      ))}
    </div>
  );
}
