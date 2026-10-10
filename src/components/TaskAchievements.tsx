"use client";

import { useTaskAchievements } from "@/src/hooks/useAchievements";

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

  if (isLoading) {
    return <div className="rounded-lg border p-4">Loading achievements...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 p-4 text-red-600">
        Failed to load achievements: {error.message}
      </div>
    );
  }

  if (!achievements || achievements.length === 0) {
    return (
      <div className="rounded-lg border p-4 text-gray-500">
        No achievements available for this task.
      </div>
    );
  }

  return (
    <div className="space-y-3 text-black">
      <h2 className="text-lg font-semibold">Task Achievements</h2>

      {achievements.map((achievement:any) => (
        <div
          key={achievement.id}
          className="rounded-lg border bg-white p-4 shadow-sm"
        >
          <h3 className="font-semibold">{achievement.title}</h3>
          <h3 className="font-semibold">{achievement.totalValue} {achievement.unit}</h3>

          {achievement.description && (
            <p className="mt-1 text-sm text-gray-600">
              {achievement.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
