"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { TaskAchievement, UserTaskAchievement } from "@/src/types/achievement";

import { apiFetch } from "@/src/lib/api-client"

async function handleRes(res: Response) {
  if (res.status === 401) {
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Request failed");
  }

  return json.data;
}

export function useTaskAchievements(taskId: string) {
  return useQuery<TaskAchievement[]>({
    queryKey: ["achievements", "task", taskId],

    queryFn: async () => {
      const res = await apiFetch(`/api/achievements/task/${taskId}`, {
        credentials: "include",
      });

      return handleRes(res);
    },

    enabled: !!taskId,
  });
}
export function useMyAchievements() {
  return useQuery<UserTaskAchievement[]>({
    queryKey: ["achievements", "mine"],

    queryFn: async () => {
      const res = await apiFetch("/api/achievements/my-achievements", {
        credentials: "include",
      });

      return handleRes(res);
    },
  });
}
export function useCreateTaskAchievement(taskId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      title: string;
      totalValue: number;
      description: string;
      unit?: string;
      imageUrl?: string;
      iconType?: string;
      iconValue?: string;
    }) => {
      const res = await apiFetch(`/api/achievements/create/${taskId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      return handleRes(res);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["achievements", "task", taskId],
      });
    },
  });
}