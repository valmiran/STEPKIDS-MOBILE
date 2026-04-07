export type Reward = {
  id: number;
  title: string;
  description: string;
  points_required: number;
  unlocked: boolean;
};

export type RewardRedemptionPayload = {
  child: number;
  reward_id: number;
};