import { api } from './api';
import {
  Child,
  CreateChildPayload,
  UpdateChildPayload,
} from '../../types/child';

export const childService = {
  async getChildren(): Promise<Child[]> {
    const response = await api.get('/children/');
    return response.data;
  },

  async createChild(payload: CreateChildPayload): Promise<Child> {
    const response = await api.post('/children/', payload);
    return response.data;
  },

  async updateChild(id: number, payload: UpdateChildPayload): Promise<Child> {
    const response = await api.put(`/children/${id}/`, payload);
    return response.data;
  },

  async deleteChild(id: number): Promise<void> {
    await api.delete(`/children/${id}/`);
  },
};