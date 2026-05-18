import { Child } from '../../types/child';
import { Reward, RewardRedemptionPayload } from '../../types/reward';
import { userGet, userSet, userUpdate } from '../firebase/userDatabase';

const defaultRewards: Reward[] = [
  {
    id: 'reward_001',
    title: 'Estrela de Coragem',
    description: 'Por manter a rotina de uso da órtese.',
    points_required: 50,
    unlocked: false,
  },
  {
    id: 'reward_002',
    title: 'Herói da Semana',
    description: 'Por completar registros durante a semana.',
    points_required: 100,
    unlocked: false,
  },
  {
    id: 'reward_003',
    title: 'Guardião dos Passos',
    description: 'Por evoluir no acompanhamento do tratamento.',
    points_required: 200,
    unlocked: false,
  },
  {
    id: 'reward_004',
    title: 'Campeão da Órtese',
    description: 'Por acumular muitas horas de uso da órtese.',
    points_required: 300,
    unlocked: false,
  },
];

function rewardsToMap(rewards: Reward[]) {
  return rewards.reduce<Record<string, Reward>>((acc, reward) => {
    acc[reward.id] = reward;
    return acc;
  }, {});
}

export const rewardsService = {
  async getRewards(childId: string): Promise<Reward[]> {
    const child = await userGet<Child>(`children/${childId}`);

    if (!child) {
      throw new Error('Criança não encontrada.');
    }

    const totalPoints = child.totalPoints || 0;

    const savedRewards = await userGet<Record<string, Reward>>(
      `children/${childId}/rewards`
    );

    if (!savedRewards) {
      const initializedRewards = defaultRewards.map((reward) => ({
        ...reward,
        unlocked: totalPoints >= reward.points_required,
      }));

      await userSet(
        `children/${childId}/rewards`,
        rewardsToMap(initializedRewards)
      );

      return initializedRewards;
    }

    const updatedRewards = Object.entries(savedRewards).map(([id, reward]) => ({
      ...reward,
      id,
      unlocked:
        reward.redeemed === true
          ? false
          : totalPoints >= reward.points_required,
    }));

    await userSet(
      `children/${childId}/rewards`,
      rewardsToMap(updatedRewards)
    );

    return updatedRewards;
  },

  async redeemReward(payload: RewardRedemptionPayload) {
    const child = await userGet<Child>(`children/${payload.child}`);

    if (!child) {
      throw new Error('Criança não encontrada.');
    }

    const reward = await userGet<Reward>(
      `children/${payload.child}/rewards/${payload.reward_id}`
    );

    if (!reward) {
      throw new Error('Recompensa não encontrada.');
    }

    if ((child.totalPoints || 0) < reward.points_required) {
      throw new Error('Pontos insuficientes para resgatar esta recompensa.');
    }

    if (reward.redeemed) {
      throw new Error('Esta recompensa já foi resgatada.');
    }

    await userUpdate(
      `children/${payload.child}/rewards/${payload.reward_id}`,
      {
        redeemed: true,
        unlocked: false,
        redeemedAt: new Date().toISOString(),
      }
    );

    await userUpdate(`children/${payload.child}`, {
      totalPoints: Math.max(
        0,
        Number(child.totalPoints || 0) - Number(reward.points_required)
      ),
    });

    return { success: true };
  },
};