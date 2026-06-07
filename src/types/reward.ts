export type Reward = {
  id: string;
  title: string;
  description: string;
  points_required: number;
  unlocked: boolean;
  redeemed?: boolean;
  redeemedAt?: string;
  lastRedeemedAt?: string;
  nextAvailableAt?: string;
  createdAt?: string;
};

export type RewardRedemptionPayload = {
  child: string;
  reward_id: string;
};

export type DailyCheckInData = {
  currentDay: number;
  lastCollectedAt?: string;
  cycleCompletedAt?: string;
};

export type DailyCheckInReward = {
  day: number;
  exp: number;
  coins: number;
  medal?: string;
};