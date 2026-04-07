import { api } from './api';
import { Reward, RewardRedemptionPayload } from '../../types/reward';
import { USE_MOCK } from '../../utils/constants';
import { mockRewards } from '../../utils/helpers';

let rewardsData: Reward[] = [...mockRewards];

export const rewardsService = {
  async getRewards(childId: number): Promise<Reward[]> {
    if (USE_MOCK) {
      return rewardsData;
    }

    try {
      const response = await api.get(`/rewards/?child=${childId}`);
      return response.data;
    } catch (error) {
      console.warn('Erro na API, usando mock (rewards)');
      return rewardsData;
    }
  },

  async redeemReward(payload: RewardRedemptionPayload) {
    if (USE_MOCK) {
      rewardsData = rewardsData.map((reward) =>
        reward.id === payload.reward_id
          ? { ...reward, unlocked: false }
          : reward
      );

      return { success: true };
    }

    try {
      const response = await api.post('/rewards/redeem/', payload);
      return response.data;
    } catch (error) {
      console.warn('Erro na API, usando mock (redeem reward)');

      rewardsData = rewardsData.map((reward) =>
        reward.id === payload.reward_id
          ? { ...reward, unlocked: false }
          : reward
      );

      return { success: true };
    }
  },
};