export interface TodayTask {
  id: string;
  activityId: string;
  unit: string;
  targetValue: number;
  scheduleType: string;
  name: string;
  description: string;
  imageUrl?: string | null;
  creatorId: string;
  createdAt: string;
  updatedAt: string;

  schedules: {
    id: string;
    taskId: string;
    day: string;
  }[];

  activity: {
    id: string;
    name: string;
  };
}

export interface DailyProgress {
  id: string;
  activityId: string;
  userId: string;
  date: string;
  completedTasks: number;
  totalTasks: number;
  completionPercentage: number | string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FriendRequest {
  id: string;
  requesterId: string;
  receiverId: string;
  status: string;
  createdAt: string;

  requester: {
    id: string;
    username: string;
    createdAt: string;
  };
}

export interface Friend {
  friendshipId: string;
  userId: string;
  username: string;
  createdAt: string;
}

export interface TaskProgressEntry {
  id: string;
  progressId: string;
  value: string | number;
  note: string | null;
  createdAt: string;
}

export interface TaskProgress {
  id: string;
  activityId: string;
  taskId: string;
  userId: string;
  date: string;
  completedValue: string | number;
  targetSnapshot: string | number;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  entries: TaskProgressEntry[];
}