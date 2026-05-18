export type ActivityType = 'standard' | 'custom';

export type ActivityFrequency = 'daily' | 'once';

export type Activity = {
  id: string;
  title: string;
  description: string;
  expReward: number;
  goldReward: number;
  icon?: string;
  type: ActivityType;
  frequency: ActivityFrequency;
  targetDays?: number;
  realLifeReward?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateActivityPayload = {
  title: string;
  description: string;
  expReward: number;
  goldReward: number;
  icon?: string;
  realLifeReward?: string;
};

export type ActivityCompletion = {
  id: string;
  childId: string;
  activityId: string;
  activityTitle: string;
  expReward: number;
  goldReward: number;
  completedAt: string;
  date: string;
  type: ActivityType;
};