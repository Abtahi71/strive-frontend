"use client";

import { useMyAchievements } from "@/src/hooks/useAchievements";

export default function MyAchievements() {
  const { data: achievements, isLoading, isError, error } = useMyAchievements();

  if (isLoading) {
    return (
      <div className="rounded-lg border p-4">Loading your achievements...</div>
    );
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
        You haven't earned any achievements yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">My Achievements</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement:any) => (
          <div
            key={achievement.id}
            className="rounded-lg border bg-white p-5 shadow-sm"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-2xl">
              🏆
            </div>

            <h2 className="font-semibold">
              {achievement.taskAchievement?.name ?? "Achievement"}
            </h2>

            {achievement.taskAchievement?.description && (
              <p className="mt-1 text-sm text-gray-600">
                {achievement.taskAchievement.description}
              </p>
            )}

            <p className="mt-3 text-xs text-gray-400">
              Earned {new Date(achievement.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
