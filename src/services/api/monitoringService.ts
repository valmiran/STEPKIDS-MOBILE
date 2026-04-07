import { api } from './api';
import {
  DailyChecklistPayload,
  OrthosisUsagePayload,
  ProgressData,
  SymptomPayload,
} from '../../types/monitoring';

export const monitoringService = {
  async registerOrthosisUsage(payload: OrthosisUsagePayload) {
    const response = await api.post('/monitoring/orthosis-usage/', payload);
    return response.data;
  },

  async createDailyChecklist(payload: DailyChecklistPayload) {
    const response = await api.post('/monitoring/checklists/', payload);
    return response.data;
  },

  async createSymptom(payload: SymptomPayload) {
    const response = await api.post('/monitoring/symptoms/', payload);
    return response.data;
  },

  async getProgress(childId: number): Promise<ProgressData> {
    const response = await api.get(`/monitoring/progress/${childId}/`);
    return response.data;
  },
};