import { useEffect, useState } from 'react';
import { ProgressData } from '../types/monitoring';
import { monitoringService } from '../services/api/monitoringService';

export function useProgress(childId: number = 1) {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadProgress() {
    try {
      const data = await monitoringService.getProgress(childId);
      setProgress(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProgress();
  }, [childId]);

  return {
    progress,
    loading,
    reload: loadProgress,
  };
}