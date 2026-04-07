import { api } from './api';
import {
  Child,
  CreateChildPayload,
  UpdateChildPayload,
} from '../../types/child';
import { USE_MOCK } from '../../utils/constants';
import { mockChildren } from '../../utils/helpers';

let childrenData: Child[] = [...mockChildren];

export const childService = {
  async getChildren(): Promise<Child[]> {
    if (USE_MOCK) {
      return childrenData;
    }

    try {
      const response = await api.get('/children/');
      return response.data;
    } catch (error) {
      console.warn('Erro na API, usando mock');
      return childrenData;
    }
  },

  async createChild(payload: CreateChildPayload): Promise<Child> {
    if (USE_MOCK) {
      const newChild: Child = {
        id: Date.now(),
        name: payload.name,
        age: payload.age,
        diagnosis: payload.diagnosis,
      };

      childrenData = [...childrenData, newChild];
      return newChild;
    }

    try {
      const response = await api.post('/children/', payload);
      return response.data;
    } catch (error) {
      console.warn('Erro na API, criando mock');

      const newChild: Child = {
        id: Date.now(),
        ...payload,
      };

      childrenData.push(newChild);
      return newChild;
    }
  },

  async updateChild(
    id: number,
    payload: UpdateChildPayload
  ): Promise<Child> {
    if (USE_MOCK) {
      childrenData = childrenData.map((child) =>
        child.id === id ? { ...child, ...payload } : child
      );

      return childrenData.find((child) => child.id === id)!;
    }

    try {
      const response = await api.put(`/children/${id}/`, payload);
      return response.data;
    } catch (error) {
      console.warn('Erro na API, atualizando mock');

      childrenData = childrenData.map((child) =>
        child.id === id ? { ...child, ...payload } : child
      );

      return childrenData.find((child) => child.id === id)!;
    }
  },

  async deleteChild(id: number): Promise<void> {
    if (USE_MOCK) {
      childrenData = childrenData.filter((child) => child.id !== id);
      return;
    }

    try {
      await api.delete(`/children/${id}/`);
    } catch (error) {
      console.warn('Erro na API, removendo mock');

      childrenData = childrenData.filter((child) => child.id !== id);
    }
  },
};