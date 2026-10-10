// src/hooks/useActivities.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Activity, ActivityMember } from "@/src/types/activity";

import { apiFetch } from "@/src/lib/api-client";

async function handleRes(res: Response) {
  console.log(res)
  if (res.status === 401) {
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }
  if (!res.ok) {
    console.log(res)
    throw new Error("Request failed");}
  const json = await res.json();
  return json.data; // backend wraps everything in { success, message, data }
}

export function useMyActivities() {
  return useQuery<any[]>({
    queryKey: ["activities", "mine"],
    queryFn: async () => {
      const res = await apiFetch("/api/activities", { credentials: "include" });
      return handleRes(res);
    },
  });
}

export function useActivity(id:string){
    return useQuery<Activity>({
        queryKey: ["activities", "details",id],
        queryFn: async () => {
            const res = await apiFetch(`/api/activity/${id}`, { credentials: "include" });
            console.log("THIS IS FROM USEACTIVITY-37",res)
            return handleRes(res);
        },
    })
}

export function useTaskSchedules(taskId:string){
    return useQuery({
        queryKey:['taskschedules',taskId],


        queryFn:async()=>{
            const res = await apiFetch(`/api/activity/${taskId}/taskSchedules`,{ credentials: "include" });
            return handleRes(res);
        }
    })
}

export function useUser(searchTerm:string){
    return useQuery({
        queryKey:['users',searchTerm],
        queryFn:async()=>{
            const res = await apiFetch(`/api/users?search=${encodeURIComponent(searchTerm??"")}`, { credentials: "include" });
            return handleRes(res);
        },
        enabled:searchTerm.length>0
    })
}

export function useSendInvite(activityId:string,receiverId:string,name:string){
    return useMutation({
        mutationFn:async()=>{
            const res = await apiFetch(`/api/activity/send-invite`,{ 
                method: "POST",
                body: JSON.stringify({activityId,receiverId,name}),
                headers: { "Content-Type": "application/json" },
                credentials: "include" });
            return handleRes(res);
        }
    })
}
export function useGetInvites(activityId:string){
    return useQuery({
        queryKey:['invites',activityId],
        queryFn:async()=>{
            const res = await apiFetch(`/api/activity/${activityId}/get-invites`,{ credentials: "include" });
            return handleRes(res);
        }
    })
}

export function useActivityMembers(activityId: string) {
  return useQuery<ActivityMember[]>({
    queryKey: ["activities", activityId, "members"],
    queryFn: async () => {
      const res = await apiFetch(`/api/activity/activitymembers/${activityId}`, {
        credentials: "include",
      });
      return handleRes(res);
    },
    enabled: !!activityId,
  });
}

export function useCreateActivity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      name: string;
      description: string;
      imageUrl?: string;
      visibility: "PUBLIC" | "INVITE_ONLY";
      unit: string;
      targetValue: number;
      scheduleType: string;
      taskName: string;
      taskDescription: string;
      taskImage?: string;
      days: string[];
    }) => {
      const res = await apiFetch("/api/activity/create", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return handleRes(res);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities", "mine"] });
    },
  });
}

export function useCreateTask(activityId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      name: string;
      description: string;
      imageUrl?: string;
      unit: string;
      targetValue: number;
      scheduleType: string;
      days: string[];
    }) => {
      const res = await apiFetch(`/api/activities/${activityId}/tasks`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return handleRes(res);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities", activityId] });
    },
  });
}


export function useTotalCompletedValue() {
  return useQuery({
    queryKey: ["totalCompleted"],
    queryFn: async () => {
      const res = await apiFetch(`/api/activity/totalCompleted`, {
        credentials: "include",
      });
      return handleRes(res);
    },
  });
}

export function useChat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {message:string,conversationId:string | null}) => {
      const res = await apiFetch(`/api/chat`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log("THIS IS FROM RES CHAT",res)
      const data = await res.json();
      console.log("THIS IS FROM DATA CHAT",data)
      return data;
    },
  });
}
