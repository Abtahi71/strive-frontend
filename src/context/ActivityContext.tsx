// src/context/ActivityContext.tsx
"use client";

import { createContext, useContext } from "react";
import { Activity, ActivityMember } from "@/src/types/activity";

interface ActivityContextValue {
  activity: any;
  members: ActivityMember[] | undefined;
  memberLoading: boolean;
  memberError: Error | null;
  isLoading: boolean;
  error: Error | null;
}

const ActivityContext = createContext<ActivityContextValue | null>(null);

export function ActivityProvider({
  value,
  children,
}: {
  value: ActivityContextValue;
  children: React.ReactNode;
}) {
  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivityContext() {
  const ctx = useContext(ActivityContext);
  if (!ctx)
    throw new Error("useActivityContext must be used within ActivityProvider");
  return ctx;
}
