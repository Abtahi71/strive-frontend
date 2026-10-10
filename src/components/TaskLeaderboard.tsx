"use client";

import { useTaskLeadership } from "@/src/hooks/useUsers";

interface TaskLeaderboardProps {
  taskId: string;
  unit: string;
}

export default function TaskLeaderboard({
  taskId,
  unit,
}: TaskLeaderboardProps) {
  const { data: leadership, isLoading, isError } = useTaskLeadership(taskId);

  if (isLoading) {
    return <p>Loading task leaderboard...</p>;
  }

  if (isError) {
    return <p>Failed to load task leaderboard.</p>;
  }

  if (!leadership || leadership.length === 0) {
    return <p>No progress recorded yet.</p>;
  }

  return (
    <div>
      <h2>Task leaderboard</h2>

      {leadership.map((entry:any, index:any) => (
        <div key={entry.userId}>
          <span>#{index + 1}</span>

          <strong>{entry.username}</strong>

          <span>
            {entry.completedValue} {unit}
          </span>
        </div>
      ))}
    </div>
  );
}
