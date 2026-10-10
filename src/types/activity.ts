// src/types/activity.ts
export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
}

export interface ActivityMember {
  id: string;
  userId: string;
  activityId: string;
  role: "ADMIN" | "MEMBER";
  joinedAt: string;
  leftAt: string | null;
  isActive: boolean;
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
  user: User;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  visibility: "PUBLIC" | "INVITE_ONLY";
  memberCount: number;
}

export interface ActivityTask {
  id: string;
  name: string;
  description: string;
  unit: string;
  targetValue: number;
  scheduleType: string;
}
