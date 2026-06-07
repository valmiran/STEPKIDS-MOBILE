import { auth } from '../../config/firebaseConfig';
import {
  userGet,
  userPush,
  userRemove,
  userUpdate,
} from '../firebase/userDatabase';
import {
  Child,
  CreateChildPayload,
  UpdateChildPayload,
} from '../../types/child';

type ChildRewardPayload = {
  exp?: number;
  coins?: number;
  points?: number;
  reason?: string;
  medal?: string;
  itemId?: string;
  itemName?: string;
};

function mapFirebaseObjectToList<T extends { id?: string }>(
  data: Record<string, T> | null
): T[] {
  if (!data) return [];

  return Object.entries(data).map(([id, value]) => ({
    id,
    ...value,
  }));
}

export const childService = {
  async getChildren(): Promise<Child[]> {
    const data = await userGet<Record<string, Child>>('children');
    return mapFirebaseObjectToList<Child>(data);
  },

  async getChildById(id: string): Promise<Child | null> {
    const child = await userGet<Child>(`children/${id}`);

    if (!child) {
      return null;
    }

    return {
      ...child,
      id,
    };
  },

  async createChild(payload: CreateChildPayload): Promise<Child> {
    const uid = auth.currentUser?.uid;

    if (!uid) {
      throw new Error('Usuário não autenticado.');
    }

    if (!payload.name.trim()) {
      throw new Error('Informe o nome da criança.');
    }

    if (!payload.age || payload.age <= 0) {
      throw new Error('Informe uma idade válida.');
    }

    const childData = {
      name: payload.name.trim(),
      age: payload.age,
      diagnosis: payload.diagnosis?.trim() || '',
      avatar: payload.avatar || '',
      parentUid: uid,
      doctorUid: '',
      level: 1,
      totalPoints: 0,
      totalExp: 0,
      goldCoins: 0,
      totalOrthosisHours: 0,
      completedMissions: 0,
      completedActivities: 0,
    };

    const id = await userPush('children', childData);

    return {
      id,
      ...childData,
    };
  },

  async updateChild(id: string, payload: UpdateChildPayload): Promise<Child> {
    if (!id) {
      throw new Error('ID da criança não informado.');
    }

    const updateData: UpdateChildPayload = {};

    if (payload.name !== undefined) {
      if (!payload.name.trim()) {
        throw new Error('Informe o nome da criança.');
      }

      updateData.name = payload.name.trim();
    }

    if (payload.age !== undefined) {
      if (!payload.age || payload.age <= 0) {
        throw new Error('Informe uma idade válida.');
      }

      updateData.age = payload.age;
    }

    if (payload.diagnosis !== undefined) {
      updateData.diagnosis = payload.diagnosis.trim();
    }

    if (payload.avatar !== undefined) {
      updateData.avatar = payload.avatar;
    }

    if (payload.doctorUid !== undefined) {
      updateData.doctorUid = payload.doctorUid;
    }

    await userUpdate(`children/${id}`, updateData);

    const updated = await this.getChildById(id);

    if (!updated) {
      throw new Error('Criança não encontrada.');
    }

    return updated;
  },

  async deleteChild(id: string): Promise<void> {
    if (!id) {
      throw new Error('ID da criança não informado.');
    }

    await userRemove(`children/${id}`);
  },

  async addChildRewards(
    childId: string,
    payload: ChildRewardPayload
  ): Promise<Child> {
    if (!childId) {
      throw new Error('Selecione uma criança antes de entregar a recompensa.');
    }

    const child = await this.getChildById(childId);

    if (!child) {
      throw new Error('Criança não encontrada.');
    }

    const exp = Number(payload.exp || 0);
    const coins = Number(payload.coins || 0);
    const points = Number(payload.points || exp || 0);

    const reward = {
      exp,
      coins,
      points,
      medal: payload.medal || '',
      itemId: payload.itemId || '',
      itemName: payload.itemName || '',
      reason: payload.reason || 'Recompensa da jornada Pé de Herói',
      createdAt: new Date().toISOString(),
    };

    const updatedChildData = {
      totalExp: (child.totalExp || 0) + exp,
      goldCoins: (child.goldCoins || 0) + coins,
      totalPoints: (child.totalPoints || 0) + points,
      completedMissions: (child.completedMissions || 0) + 1,
      completedActivities: (child.completedActivities || 0) + 1,
    };

    await userUpdate(`children/${childId}`, updatedChildData);

    await userPush(`children/${childId}/rewardsHistory`, reward);

    const updatedChild = await this.getChildById(childId);

    if (!updatedChild) {
      throw new Error('Não foi possível atualizar a criança.');
    }

    return updatedChild;
  },

  async spendChildResources(
    childId: string,
    payload: {
      coins?: number;
      exp?: number;
      itemId?: string;
      itemName?: string;
      message?: string;
    }
  ): Promise<Child> {
    if (!childId) {
      throw new Error('Selecione uma criança.');
    }

    const child = await this.getChildById(childId);

    if (!child) {
      throw new Error('Criança não encontrada.');
    }

    const coinsCost = Number(payload.coins || 0);
    const expCost = Number(payload.exp || 0);

    if ((child.goldCoins || 0) < coinsCost) {
      throw new Error(
        'Você ainda não possui moedas suficientes para esse item. Continue cumprindo missões e usando a órtese para evoluir.'
      );
    }

    if ((child.totalExp || 0) < expCost) {
      throw new Error(
        'Você ainda não possui XP suficiente para esse item. Continue sua jornada para evoluir.'
      );
    }

    await userUpdate(`children/${childId}`, {
      goldCoins: (child.goldCoins || 0) - coinsCost,
      totalExp: (child.totalExp || 0) - expCost,
    });

    await userPush(`children/${childId}/inventory`, {
      itemId: payload.itemId || '',
      itemName: payload.itemName || '',
      message: payload.message || '',
      purchasedAt: new Date().toISOString(),
      coinsCost,
      expCost,
    });

    const updatedChild = await this.getChildById(childId);

    if (!updatedChild) {
      throw new Error('Não foi possível atualizar a criança.');
    }

    return updatedChild;
  },

  async levelUpChild(childId: string): Promise<Child> {
    if (!childId) {
      throw new Error('Selecione uma criança.');
    }

    const child = await this.getChildById(childId);

    if (!child) {
      throw new Error('Criança não encontrada.');
    }

    const currentLevel = child.level || 1;

    const levelRequirements: Record<number, number> = {
      1: 100,
      2: 250,
      3: 500,
      4: 900,
      5: 1300,
      6: 1700,
      7: 2200,
      8: 2800,
      9: 3500,
      10: 4300,
      11: 5200,
      12: 6200,
      13: 7300,
      14: 8500,
    };

    if (currentLevel >= 15) {
      throw new Error('A criança já alcançou o nível máximo: Herói da Órtese.');
    }

    const requiredExp = levelRequirements[currentLevel];

    if ((child.totalExp || 0) < requiredExp) {
      throw new Error(
        `XP insuficiente. São necessários ${requiredExp} XP para subir para o próximo nível.`
      );
    }

    const newLevel = currentLevel + 1;

    await userUpdate(`children/${childId}`, {
      level: newLevel,
      totalExp: (child.totalExp || 0) - requiredExp,
    });

    await userPush(`children/${childId}/levelHistory`, {
      fromLevel: currentLevel,
      toLevel: newLevel,
      spentExp: requiredExp,
      createdAt: new Date().toISOString(),
    });

    const updatedChild = await this.getChildById(childId);

    if (!updatedChild) {
      throw new Error('Não foi possível atualizar o nível da criança.');
    }

    return updatedChild;
  },

  async completeOrthosisHeroGame(childId: string): Promise<Child> {
    if (!childId) {
      throw new Error('Selecione uma criança antes de concluir o jogo.');
    }

    const child = await this.getChildById(childId);

    if (!child) {
      throw new Error('Criança não encontrada.');
    }

    const reward = {
      exp: 100,
      coins: 25,
      points: 100,
      medal: 'Medalha cuidado',
      game: 'Monte a Órtese do Herói',
      completedAt: new Date().toISOString(),
    };

    const updatedChildData = {
      totalExp: (child.totalExp || 0) + reward.exp,
      goldCoins: (child.goldCoins || 0) + reward.coins,
      totalPoints: (child.totalPoints || 0) + reward.points,
      completedActivities: (child.completedActivities || 0) + 1,
      completedMissions: (child.completedMissions || 0) + 1,
    };

    await userUpdate(`children/${childId}`, updatedChildData);

    await userPush(`children/${childId}/gameRewards`, reward);

    const updatedChild = await this.getChildById(childId);

    if (!updatedChild) {
      throw new Error('Não foi possível atualizar a criança.');
    }

    return updatedChild;
  },
};