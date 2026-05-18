import { useEffect, useState } from 'react';
import { Reward } from '../types/reward';
import { rewardsService } from '../services/api/rewardsService';

export function useRewards(childId?: string) {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadRewards() {
    if (!childId) return;

    try {
      setLoading(true);
      const data = await rewardsService.getRewards(childId);
      setRewards(data);
    } finally {
      setLoading(false);
    }
  }

  async function redeemReward(rewardId: string) {
    if (!childId) return;

    await rewardsService.redeemReward({
      child: childId,
      reward_id: rewardId,
    });

    await loadRewards();
  }

  useEffect(() => {
    loadRewards();
  }, [childId]);

  return {
    rewards,
    loading,
    reload: loadRewards,
    redeemReward,
  };
}