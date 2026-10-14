"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DailyProgress, Friend, FriendRequest, TaskProgress, TodayTask } from "../types/user";

import { apiFetch } from "@/src/lib/api-client";


export interface DailyLeadership {
  userId: string;
  completedValue: number;
  isCompleted: boolean;
  user: {
    username: string;
    createdAt: string;
  };
}

export interface TaskLeadership {
  userId: string;
  username?: string;
  createdAt?: string;
  completedValue: number;
}

export interface ActivityLeadership {
  userId: string;
  completedTasks: number;
  totalTasks: number;
  completionPercentage: number;
  completed: boolean;
  user: {
    username: string;
    createdAt: string;
  };
}

async function handleRes(res: Response) {
  if (res.status === 401) {
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }
  if (!res.ok) throw new Error("Request failed");
  const json = await res.json();
  return json.data; // backend wraps everything in { success, message, data }
}

export function useGetInvitations(){
    return useQuery({
        queryKey: ["invitations"],
        queryFn: async () => {
            const res = await apiFetch("/api/users/invitations", { credentials: "include" });
            return handleRes(res);
        },
    })
}
export function useAcceptInvite(id:string,activityId:string, senderId:string,activityName:string){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await apiFetch(`/api/users/invitations/accept-invite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, activityId, senderId, activityName }),
        credentials: "include",
      });
      return handleRes(res);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invitations"],
      });
    },
  });
}

export function useCreateProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      completedValue: number;
      activityId: string;
      taskId: string;
      note?: string;
    }) => {
      const res = await apiFetch("/api/activity/progress", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      return handleRes(res);
    },

    onSuccess: (_:any, variables:any) => {
      // Refresh activity data if you want the page
      // to immediately reflect updated information.
      queryClient.invalidateQueries({
        queryKey: ["activities", "details", variables.activityId],
      });
    },
  });
}

export function useDailyLeadership(taskId: string) {
  return useQuery<DailyLeadership[]>({
    queryKey: ["leadership", "daily", taskId],
    queryFn: async () => {
      const res = await apiFetch(`/api/activity/leadership/daily/${taskId}`, {
        credentials: "include",
      });

      return handleRes(res);
    },
    enabled: !!taskId,
  });
}

export function useTaskLeadership(taskId: string) {
  return useQuery({
    queryKey: ["leadership", "task", taskId],
    queryFn: async () => {
      const res = await apiFetch(`/api/activity/leadership/task/${taskId}`, {
        credentials: "include",
      });

      console.log("STATUS:", res.status);

      const json = await res.json();

      console.log("RAW TASK LEADERSHIP RESPONSE:", json);

      if (!res.ok) {
        throw new Error(json.message || "Failed to load task leaderboard");
      }

      return json.data;

      //return handleRes(res);
    },
    enabled: !!taskId,
  });
}

export function useActivityLeadership(activityId: string) {
  return useQuery<ActivityLeadership[]>({
    queryKey: ["leadership", "activity", activityId],
    queryFn: async () => {
      const res = await apiFetch(
        `/api/activity/leadership/activity/${activityId}`,
        {
          credentials: "include",
        }
      );

      return handleRes(res);
    },
    enabled: !!activityId,
  });
}


export function useTodaysTasks(activityId: string) {
  return useQuery<TodayTask[]>({
    queryKey: ["activities", activityId, "tasks", "today"],

    queryFn: async () => {
      const res = await apiFetch(`/api/activity/tasks/today/${activityId}`, {
        credentials: "include",
      });

      return handleRes(res);
    },

    enabled: !!activityId,
  });
}

export function useDailyProgressAnalytics(activityId: string) {
  return useQuery<any>({
    queryKey: ["activities", activityId, "analytics", "daily"],

    queryFn: async () => {
      const res = await apiFetch(`/api/activity/analytics/daily/${activityId}`, {
        credentials: "include",
      });

      return handleRes(res);
    },

    enabled: !!activityId,
  });
}

export function useFriendRequests(status = "PENDING") {
  return useQuery<FriendRequest[]>({
    queryKey: ["friends", "requests", status],

    queryFn: async () => {
      const res = await apiFetch(
        `/api/users/friend-requests?status=${encodeURIComponent(status)}`,
        {
          credentials: "include",
        }
      );

      return handleRes(res);
    },
  });
}

export function useFriendList() {
  return useQuery<any>({
    queryKey: ["friends", "list"],

    queryFn: async () => {
      const res = await apiFetch("/api/users/friends", {
        credentials: "include",
      });

      return handleRes(res);
    },
  });
}

export function useTaskProgress(taskId: string) {
  return useQuery<any>({
    queryKey: ["progress", "task", taskId],

    queryFn: async () => {
      const res = await apiFetch(`/api/activity/progress/task/${taskId}`, {
        credentials: "include",
      });

      return handleRes(res);
    },

    enabled: !!taskId,
  });
}
export function useTaskCompleted(taskId: string) {
  return useQuery<TaskProgress[]>({
    queryKey: ["completed", "task", taskId],

    queryFn: async () => {
      const res = await apiFetch(`/api/activity/tasks/today/completed/${taskId}`, {
        credentials: "include",
      });

      return handleRes(res);
    },

    enabled: !!taskId,
  });
}

export function useSendFriendRequest(receiverId:string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await apiFetch(`/api/users/friend-requests/${receiverId}`, {
        method: "POST",
        credentials: "include",
      });

      return handleRes(res);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["friends"],
      });
    },
  });
}

export function useAcceptFriendRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requesterId: string) => {
      const res = await apiFetch(`/api/users/friend-requests/${requesterId}`, {
        method: "PUT",
        credentials: "include",
      });

      return handleRes(res);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["friends", "requests"],
      });

      queryClient.invalidateQueries({
        queryKey: ["friends", "list"],
      });
    },
  });
}


export interface CurrentUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export function useCurrentUser(id?:string) {
  return useQuery<any>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await apiFetch(
        `/api/users/me`, 
        {credentials: "include",}
      );

      if (response.status === 401) {
        throw new Error("Unauthorized");
      }

      if (!response.ok) {
        throw new Error(
          "Failed to apiFetch current user"
        );
      }

      const result = await response.json();

      return result.data;
    },

    staleTime: 5 * 60 * 1000,
    retry:false
  });
}




export function getTodayUsage(){
  return useQuery({
    queryKey: ["todayUsage"],
    queryFn: async () => {
      const response = await apiFetch(`/api/users/usage/today`, {
        credentials: "include",
        
      });
     
    return handleRes(response);
    }})
}