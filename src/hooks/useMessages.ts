"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Message } from "@/src/types/message";

import { apiFetch } from "@/src/lib/api-client";

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

export function useMessages(activityId: string) {
  return useQuery<Message[]>({
    queryKey: ["messages", activityId],

    queryFn: async () => {
      const res = await apiFetch(`/api/activity/messages/${activityId}`, {
        credentials: "include",
      });

      return handleRes(res);
    },

    enabled: !!activityId,
  });
}
