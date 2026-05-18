export type Reward = {
  id: string;
  title: string;
  description: string;
  points_required: number;
  unlocked: boolean;
  redeemed?: boolean;
  redeemedAt?: string;
  createdAt?: string;
};

export type RewardRedemptionPayload = {
  child: string;
  reward_id: string;
};