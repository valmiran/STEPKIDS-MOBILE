import { Child } from '../../types/child';
import {
  DailyCheckInData,
  DailyCheckInReward,
  Reward,
  RewardRedemptionPayload,
} from '../../types/reward';
import { userGet, userSet, userUpdate } from '../firebase/userDatabase';

const defaultRewards: Reward[] = [
  {
    id: 'reward_001',
    title: 'Estrela de Coragem',
    description:
      'Recompensa semanal por manter a rotina de cuidado e acompanhar a jornada do herói.',
    points_required: 50,
    unlocked: false,
  },
  {
    id: 'reward_002',
    title: 'Herói da Semana',
    description:
      'Recompensa especial para quem segue firme no uso da órtese durante a semana.',
    points_required: 100,
    unlocked: false,
  },
  {
    id: 'reward_003',
    title: 'Guardião dos Passos',
    description:
      'Reconhecimento por evoluir no acompanhamento do tratamento e no cuidado diário.',
    points_required: 200,
    unlocked: false,
  },
  {
    id: 'reward_004',
    title: 'Campeão da Órtese',
    description:
      'Conquista para quem acumula dedicação, registros e progresso na jornada.',
    points_required: 300,
    unlocked: false,
  },
];

const dailyCheckInRewards: DailyCheckInReward[] = [
  { day: 1, exp: 10, coins: 0 },
  { day: 2, exp: 10, coins: 10 },
  { day: 3, exp: 15, coins: 0 },
  { day: 4, exp: 15, coins: 10 },
  { day: 5, exp: 20, coins: 0 },
  { day: 6, exp: 20, coins: 15 },
  { day: 7, exp: 30, coins: 20 },
  { day: 8, exp: 35, coins: 20 },
  { day: 9, exp: 40, coins: 25 },
  { day: 10, exp: 45, coins: 25 },
  { day: 11, exp: 50, coins: 30 },
  { day: 12, exp: 55, coins: 30 },
  { day: 13, exp: 60, coins: 35 },
  { day: 14, exp: 70, coins: 40 },
  { day: 15, exp: 75, coins: 45 },
  { day: 16, exp: 80, coins: 45 },
  { day: 17, exp: 85, coins: 50 },
  { day: 18, exp: 90, coins: 50 },
  { day: 19, exp: 95, coins: 55 },
  { day: 20, exp: 100, coins: 60 },
  { day: 21, exp: 110, coins: 70 },
  { day: 22, exp: 115, coins: 70 },
  { day: 23, exp: 120, coins: 75 },
  { day: 24, exp: 125, coins: 80 },
  { day: 25, exp: 130, coins: 85 },
  { day: 26, exp: 135, coins: 90 },
  { day: 27, exp: 140, coins: 95 },
  { day: 28, exp: 150, coins: 100, medal: 'Medalha Jornada 28 Dias' },
];

function rewardsToMap(rewards: Reward[]) {
  return rewards.reduce<Record<string, Reward>>((acc, reward) => {
    acc[reward.id] = reward;
    return acc;
  }, {});
}

function todayKey() {
  return new Date().toISOString().split('T')[0];
}

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function isSameDay(dateISO?: string) {
  if (!dateISO) return false;
  return dateISO.split('T')[0] === todayKey();
}

function isSevenDaysPassed(dateISO?: string) {
  if (!dateISO) return true;

  const lastDate = new Date(dateISO);
  const now = new Date();

  const diffMs = now.getTime() - lastDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  return diffDays >= 7;
}

export const rewardsService = {
  getDailyCheckInRewards(): DailyCheckInReward[] {
    return dailyCheckInRewards;
  },

  async getDailyCheckIn(childId: string): Promise<DailyCheckInData> {
    if (!childId) {
      throw new Error('Selecione uma criança.');
    }

    const saved = await userGet<DailyCheckInData>(
      `children/${childId}/dailyCheckIn`
    );

    if (!saved) {
      const initialData: DailyCheckInData = {
        currentDay: 1,
        lastCollectedAt: '',
      };

      await userSet(`children/${childId}/dailyCheckIn`, initialData);

      return initialData;
    }

    return saved;
  },

  async collectDailyCheckIn(childId: string): Promise<DailyCheckInData> {
    if (!childId) {
      throw new Error('Selecione uma criança antes de coletar.');
    }

    const child = await userGet<Child>(`children/${childId}`);

    if (!child) {
      throw new Error('Criança não encontrada.');
    }

    const checkIn = await this.getDailyCheckIn(childId);

    if (isSameDay(checkIn.lastCollectedAt)) {
      throw new Error(
        'Você já fez o check-in de hoje. Volte amanhã para continuar sua jornada.'
      );
    }

    const safeDay =
      checkIn.currentDay < 1 || checkIn.currentDay > 28
        ? 1
        : checkIn.currentDay;

    const reward = dailyCheckInRewards.find((item) => item.day === safeDay);

    if (!reward) {
      throw new Error('Recompensa diária não encontrada.');
    }

    const newExp = (child.totalExp || 0) + reward.exp;
    const newCoins = (child.goldCoins || 0) + reward.coins;
    const newPoints = (child.totalPoints || 0) + reward.exp;

    await userUpdate(`children/${childId}`, {
      totalExp: newExp,
      goldCoins: newCoins,
      totalPoints: newPoints,
    });

    await userSet(`children/${childId}/dailyCheckInHistory/day_${safeDay}`, {
      day: safeDay,
      exp: reward.exp,
      coins: reward.coins,
      medal: reward.medal || '',
      collectedAt: new Date().toISOString(),
    });

    const nextDay = safeDay >= 28 ? 1 : safeDay + 1;

    const updatedCheckIn: DailyCheckInData = {
      currentDay: nextDay,
      lastCollectedAt: new Date().toISOString(),
      cycleCompletedAt:
        safeDay >= 28 ? new Date().toISOString() : checkIn.cycleCompletedAt || '',
    };

    await userSet(`children/${childId}/dailyCheckIn`, updatedCheckIn);

    return updatedCheckIn;
  },

  async getRewards(childId: string): Promise<Reward[]> {
    if (!childId) {
      return [];
    }

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

    const updatedRewards = Object.entries(savedRewards).map(([id, reward]) => {
      const canCollectWeekly = isSevenDaysPassed(reward.lastRedeemedAt);

      return {
        ...reward,
        id,
        unlocked:
          totalPoints >= reward.points_required &&
          canCollectWeekly,
        nextAvailableAt:
          reward.lastRedeemedAt && !canCollectWeekly
            ? addDays(new Date(reward.lastRedeemedAt), 7).toISOString()
            : '',
      };
    });

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

    if (!isSevenDaysPassed(reward.lastRedeemedAt)) {
      throw new Error(
        'Essa recompensa só pode ser coletada novamente após 7 dias.'
      );
    }

    if ((child.totalPoints || 0) < reward.points_required) {
      throw new Error('Pontos insuficientes para resgatar esta recompensa.');
    }

    await userUpdate(
      `children/${payload.child}/rewards/${payload.reward_id}`,
      {
        redeemed: true,
        unlocked: false,
        redeemedAt: new Date().toISOString(),
        lastRedeemedAt: new Date().toISOString(),
        nextAvailableAt: addDays(new Date(), 7).toISOString(),
      }
    );

    await userUpdate(`children/${payload.child}`, {
      totalPoints: Math.max(
        0,
        Number(child.totalPoints || 0) - Number(reward.points_required)
      ),
      totalExp: Number(child.totalExp || 0) + 20,
      goldCoins: Number(child.goldCoins || 0) + 10,
    });

    return { success: true };
  },
};