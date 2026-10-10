"use client";

import { useTodaysTasks } from "@/src/hooks/useUsers";

interface TodaysTasksProps {
  activityId: string;
}

export default function TodaysTasks({ activityId }: TodaysTasksProps) {
  const { data: tasks, isLoading, isError, error } = useTodaysTasks(activityId);

  if (isLoading) {
    return (
      <div className="rounded-lg border p-4">Loading today's tasks...</div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 p-4 text-red-600">
        Failed to load today's tasks: {error.message}
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="rounded-lg border p-4 text-gray-500">
        No tasks scheduled for today.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Today&apos;s Tasks</h2>

      {tasks.map((task:any) => (
        <div key={task.id} className="rounded-lg border bg-white p-4 shadow-sm">
          <h3 className="text-lg font-semibold">{task.name}</h3>

          {task.description && (
            <p className="mt-1 text-sm text-gray-600">{task.description}</p>
          )}

          <div className="mt-3 flex gap-4 text-sm">
            <span>
              Target:{" "}
              <strong>
                {task.targetValue} {task.unit}
              </strong>
            </span>

            <span>
              Schedule: <strong>{task.scheduleType}</strong>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
