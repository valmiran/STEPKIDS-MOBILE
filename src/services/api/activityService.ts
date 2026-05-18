import { Child } from '../../types/child';
import {
  Activity,
  ActivityCompletion,
  CreateActivityPayload,
} from '../../types/activity';
import {
  userGet,
  userPush,
  userSet,
  userUpdate,
} from '../firebase/userDatabase';

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

function mapFirebaseObjectToList<T extends { id?: string }>(
  data: Record<string, T> | null
): T[] {
  if (!data) return [];

  return Object.entries(data).map(([id, value]) => ({
    id,
    ...value,
  }));
}

export const standardHeroMissions: Activity[] = [
  {
    id: 'std_orthosis_1_day',
    title: 'Primeiro Passo do Herói',
    description: 'Usar a órtese corretamente por 1 dia.',
    expReward: 25,
    goldReward: 10,
    icon: '🦶',
    type: 'standard',
    frequency: 'daily',
    targetDays: 1,
    active: true,
  },
  {
    id: 'std_sleep_orthosis',
    title: 'Sono dos Pés Mágicos',
    description: 'Dormir com a órtese durante a noite.',
    expReward: 30,
    goldReward: 12,
    icon: '🌙',
    type: 'standard',
    frequency: 'daily',
    targetDays: 1,
    active: true,
  },
  {
    id: 'std_orthosis_2_days',
    title: 'Pegadas de Coragem',
    description: 'Manter a rotina da órtese por 2 dias.',
    expReward: 60,
    goldReward: 25,
    icon: '👣',
    type: 'standard',
    frequency: 'once',
    targetDays: 2,
    active: true,
  },
  {
    id: 'std_orthosis_3_days',
    title: 'Trilha do Pequeno Guardião',
    description: 'Cumprir 3 dias de uso da órtese.',
    expReward: 100,
    goldReward: 45,
    icon: '🛡️',
    type: 'standard',
    frequency: 'once',
    targetDays: 3,
    active: true,
  },
  {
    id: 'std_orthosis_7_days',
    title: 'Semana do Pé de Herói',
    description: 'Completar 7 dias de rotina com a órtese.',
    expReward: 250,
    goldReward: 100,
    icon: '🏆',
    type: 'standard',
    frequency: 'once',
    targetDays: 7,
    active: true,
  },
  {
    id: 'std_orthosis_30_days',
    title: 'Lenda dos Pés Mágicos',
    description: 'Completar 1 mês de rotina com a órtese.',
    expReward: 1200,
    goldReward: 500,
    icon: '👑',
    type: 'standard',
    frequency: 'once',
    targetDays: 30,
    active: true,
  },
];

function calculateLevel(totalExp: number) {
  return Math.max(1, Math.floor(totalExp / 100) + 1);
}

function getCompletionKey(activity: Activity) {
  if (activity.frequency === 'daily') {
    return `${activity.id}_${todayISO()}`;
  }

  return activity.id;
}

export const activityService = {
  async getActivities(): Promise<Activity[]> {
    const customData = await userGet<Record<string, Activity>>(
      'customActivities'
    );

    const customActivities = mapFirebaseObjectToList<Activity>(customData);

    return [
      ...standardHeroMissions,
      ...customActivities.filter((item) => item.active !== false),
    ];
  },

  async createCustomActivity(
    payload: CreateActivityPayload
  ): Promise<Activity> {
    if (!payload.title.trim()) {
      throw new Error('Informe o título da missão.');
    }

    if (!payload.expReward || payload.expReward <= 0) {
      throw new Error('Informe uma quantidade válida de EXP.');
    }

    if (payload.goldReward === undefined || payload.goldReward < 0) {
      throw new Error('Informe uma quantidade válida de moedas.');
    }

    const activityData: Omit<Activity, 'id'> = {
      title: payload.title.trim(),
      description: payload.description.trim(),
      expReward: Number(payload.expReward),
      goldReward: Number(payload.goldReward),
      icon: payload.icon || '🎯',
      realLifeReward: payload.realLifeReward?.trim() || '',
      type: 'custom',
      frequency: 'once',
      active: true,
    };

    const id = await userPush('customActivities', activityData);

    return {
      id,
      ...activityData,
    };
  },

  async completeActivity(childId: string, activity: Activity): Promise<void> {
    if (!childId) {
      throw new Error('Selecione uma criança.');
    }

    const child = await userGet<Child>(`children/${childId}`);

    if (!child) {
      throw new Error('Criança não encontrada.');
    }

    const completionKey = getCompletionKey(activity);

    const existing = await userGet<ActivityCompletion>(
      `activityCompletions/${childId}/${completionKey}`
    );

    if (existing) {
      if (activity.frequency === 'daily') {
        throw new Error('Esta missão já foi concluída hoje.');
      }

      throw new Error('Esta missão já foi concluída para esta criança.');
    }

    const currentExp = child.totalExp || child.totalPoints || 0;
    const currentGold = child.goldCoins || 0;

    const newExp = currentExp + activity.expReward;
    const newGold = currentGold + activity.goldReward;
    const newLevel = calculateLevel(newExp);

    await userUpdate(`children/${childId}`, {
      totalExp: newExp,
      totalPoints: newExp,
      goldCoins: newGold,
      level: newLevel,
      completedMissions: (child.completedMissions || 0) + 1,
      completedActivities: (child.completedActivities || 0) + 1,
    });

    const completion: ActivityCompletion = {
      id: completionKey,
      childId,
      activityId: activity.id,
      activityTitle: activity.title,
      expReward: activity.expReward,
      goldReward: activity.goldReward,
      completedAt: new Date().toISOString(),
      date: todayISO(),
      type: activity.type,
    };

    await userSet(
      `activityCompletions/${childId}/${completionKey}`,
      completion
    );
  },

  async getCompletionsByChild(
    childId: string
  ): Promise<ActivityCompletion[]> {
    const data = await userGet<Record<string, ActivityCompletion>>(
      `activityCompletions/${childId}`
    );

    if (!data) return [];

    return Object.entries(data)
      .map(([id, value]) => ({
        ...value,
        id,
      }))
      .sort((a, b) =>
        String(b.completedAt).localeCompare(String(a.completedAt))
      );
  },
};