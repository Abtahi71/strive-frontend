"use client";

import { useActivityLeadership } from "@/src/hooks/useUsers";

interface ActivityLeaderboardProps {
  activityId: string;
}

export default function ActivityLeaderboard({
  activityId,
}: ActivityLeaderboardProps) {
  const {
    data: leadership,
    isLoading,
    isError,
  } = useActivityLeadership(activityId);

  if (isLoading) {
    return <p>Loading activity leaderboard...</p>;
  }

  if (isError) {
    return <p>Failed to load activity leaderboard.</p>;
  }

  if (!leadership || leadership.length === 0) {
    return <p>No activity progress recorded today.</p>;
  }

  return (
    <div>
      <h2>Activity leaderboard</h2>

      {leadership.map((entry:any, index:any) => (
        <div key={entry.userId}>
          <span>#{index + 1}</span>

          <strong>{entry.username}</strong>

          <span>
            {entry.completedTasks}/{entry.totalTasks} tasks
          </span>

          <span>{Number(entry.completionPercentage).toFixed(2)} tasks completed</span>

          {/* {entry.completed && <span> ✓</span>} */}
        </div>
      ))}
    </div>
  );
}
