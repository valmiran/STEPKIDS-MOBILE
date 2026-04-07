import { monitoringService } from '../services/api/monitoringService';

export function useMonitoring() {
  return {
    registerOrthosisUsage: monitoringService.registerOrthosisUsage,
    createDailyChecklist: monitoringService.createDailyChecklist,
    createSymptom: monitoringService.createSymptom,
  };
}