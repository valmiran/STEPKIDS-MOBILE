import {
  DailyChecklist,
  DailyChecklistPayload,
  OrthosisUsage,
  OrthosisUsagePayload,
  ProgressData,
  Symptom,
  SymptomPayload,
} from '../../types/monitoring';

import { Child } from '../../types/child';

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

async function addPointsToChild(childId: string, points: number) {
  const child = await userGet<Child>(`children/${childId}`);

  if (!child) return;

  const currentPoints = child.totalPoints || 0;
  const newTotal = currentPoints + points;
  const newLevel = Math.max(1, Math.floor(newTotal / 100) + 1);

  await userUpdate(`children/${childId}`, {
    totalPoints: newTotal,
    level: newLevel,
    completedActivities: (child.completedActivities || 0) + 1,
  });
}

async function addOrthosisHoursToChild(childId: string, hours: number) {
  const child = await userGet<Child>(`children/${childId}`);

  if (!child) return;

  await userUpdate(`children/${childId}`, {
    totalOrthosisHours: (child.totalOrthosisHours || 0) + hours,
  });
}

async function hasSymptomRegisteredToday(childId: string, date: string) {
  const data = await userGet<Record<string, Symptom>>('symptoms');
  const symptoms = mapFirebaseObjectToList(data);

  return symptoms.some(
    (item) =>
      String(item.child || item.childId) === String(childId) &&
      String(item.date) === String(date)
  );
}

export const monitoringService = {
  async registerOrthosisUsage(
    payload: OrthosisUsagePayload
  ): Promise<OrthosisUsage> {
    if (!payload.child) {
      throw new Error('Informe o ID da criança.');
    }

    const usage = {
      ...payload,
      child: String(payload.child),
      childId: String(payload.child),
      usage_hours: Number(payload.usage_hours || 0),
      date: payload.date || todayISO(),
    };

    const id = await userPush('orthosisUsage', usage);

    if (payload.used_today) {
      await addPointsToChild(String(payload.child), 10);
      await addOrthosisHoursToChild(
        String(payload.child),
        Number(payload.usage_hours || 0)
      );
    }

    return {
      id,
      ...usage,
    };
  },

  async createDailyChecklist(
    payload: DailyChecklistPayload
  ): Promise<DailyChecklist> {
    if (!payload.child) {
      throw new Error('Informe o ID da criança.');
    }

    const pointsEarned =
      payload.used_today && payload.slept_with_orthosis
        ? 15
        : payload.used_today
          ? 8
          : 0;

    const checklist = {
      ...payload,
      child: String(payload.child),
      childId: String(payload.child),
      date: payload.date || todayISO(),
      pointsEarned,
    };

    const id = await userPush('checklists', checklist);

    if (pointsEarned > 0) {
      await addPointsToChild(String(payload.child), pointsEarned);
    }

    return {
      id,
      ...checklist,
    };
  },

  async createSymptom(payload: SymptomPayload): Promise<Symptom> {
    const childId = String(payload.child || payload.childId || '');

    if (!childId) {
      throw new Error('Selecione uma criança antes de registrar o sintoma.');
    }

    const child = await userGet<Child>(`children/${childId}`);

    if (!child) {
      throw new Error('Criança não encontrada. Selecione novamente.');
    }

    if (!payload.symptom_type) {
      throw new Error('Selecione o tipo de sintoma.');
    }

    const intensity = Number(payload.intensity || 1);

    if (Number.isNaN(intensity) || intensity < 1 || intensity > 5) {
      throw new Error('A intensidade deve ser um número de 1 a 5.');
    }

    const symptomDate = payload.date || todayISO();

    const alreadyRegistered = await hasSymptomRegisteredToday(
      childId,
      symptomDate
    );

    if (alreadyRegistered) {
      throw new Error(
        'Já existe um registro de sintomas para esta criança hoje. Tente novamente amanhã.'
      );
    }

    const symptom = {
      child: childId,
      childId,
      childName: child.name,
      symptom_type: payload.symptom_type,
      intensity,
      mood: payload.mood || '',
      description: payload.description || '',
      date: symptomDate,
    };

    const id = await userPush('symptoms', symptom);

    await userUpdate(`symptoms/${id}`, {
      id,
    });

    await userSet(`children/${childId}/symptoms/${id}`, {
      id,
      ...symptom,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    await userUpdate(`children/${childId}`, {
      lastSymptomDate: symptomDate,
      lastSymptomType: symptom.symptom_type,
      lastSymptomIntensity: intensity,
    });

    return {
      id,
      ...symptom,
    };
  },

  async getOrthosisUsageByChild(childId: string): Promise<OrthosisUsage[]> {
    const data = await userGet<Record<string, OrthosisUsage>>('orthosisUsage');

    return mapFirebaseObjectToList(data).filter(
      (item) => String(item.child || item.childId) === String(childId)
    );
  },

  async getChecklistsByChild(childId: string): Promise<DailyChecklist[]> {
    const data = await userGet<Record<string, DailyChecklist>>('checklists');

    return mapFirebaseObjectToList(data).filter(
      (item) => String(item.child || item.childId) === String(childId)
    );
  },

  async getSymptomsByChild(childId: string): Promise<Symptom[]> {
    const childSymptoms = await userGet<Record<string, Symptom>>(
      `children/${childId}/symptoms`
    );

    if (childSymptoms) {
      return mapFirebaseObjectToList(childSymptoms);
    }

    const data = await userGet<Record<string, Symptom>>('symptoms');

    return mapFirebaseObjectToList(data).filter(
      (item) => String(item.child || item.childId) === String(childId)
    );
  },

  async getProgress(childId: string): Promise<ProgressData> {
    const child = await userGet<Child>(`children/${childId}`);

    const checklists = await this.getChecklistsByChild(childId);
    const usages = await this.getOrthosisUsageByChild(childId);

    const totalHours = usages.reduce(
      (sum, item) => sum + Number(item.usage_hours || 0),
      0
    );

    return {
      child_id: childId,
      child_name: child?.name || 'Criança',

      total_points: child?.totalPoints || 0,
      total_exp: child?.totalExp || child?.totalPoints || 0,
      gold_coins: child?.goldCoins || 0,
      level: child?.level || 1,

      completed_checklists: checklists.length,
      orthosis_usage_days: usages.length,
      total_orthosis_hours: totalHours,
      completed_missions: child?.completedMissions || 0,
      completed_activities: child?.completedActivities || 0,

      streak_days: 0,
      reward_target: 100,
    };
  },

  async saveMood(mood: string) {
    await userSet('lastMood', {
      mood,
      createdAt: new Date().toISOString(),
    });
  },
};