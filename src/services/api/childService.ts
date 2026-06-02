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