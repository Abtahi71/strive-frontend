// src/app/activities/[id]/layout.tsx
"use client";

import { useParams } from "next/navigation";
import { useActivity, useActivityMembers } from "@/src/hooks/useActivities";
import { ActivityProvider } from "@/src/context/ActivityContext";

export default function ActivityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id } = useParams<{ id: string }>();
  const { data: activity, isLoading, error } = useActivity(id);
  const { data:members, isLoading:memberLoading, error:memberError } = useActivityMembers(id);

  if (isLoading || memberLoading) return <div>Loading activity...</div>;
  if (error) return <div>Failed to load activity.</div>;

  //console.log("this is the members--------------------------------",members);

  return (
    <div>
      

      <ActivityProvider
        value={{ activity,members,memberLoading,memberError, isLoading, error: error as Error | null }}
      >
        {children}
      </ActivityProvider>
    </div>
  );
}
