export interface TaskAchievement {
  id: string;
  taskId: string;

  title: string;
  description: string;

  // Add these according to your actual Prisma schema
  iconUrl?: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface UserTaskAchievement {
  id: string;

  userId: string;
  achievementId: string;

  createdAt: string;

  // Add these if your actual model returns them
  taskAchievement?: TaskAchievement;
}
