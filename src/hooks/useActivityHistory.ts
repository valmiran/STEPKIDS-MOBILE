import { useEffect, useState } from 'react';
import { ActivityCompletion } from '../types/activity';
import { activityService } from '../services/api/activityService';

export function useActivityHistory(childId?: string) {
  const [history, setHistory] = useState<ActivityCompletion[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadHistory() {
    if (!childId) {
      setHistory([]);
      return;
    }

    try {
      setLoading(true);
      const data = await activityService.getCompletionsByChild(childId);
      setHistory(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHistory();
  }, [childId]);

  return {
    history,
    loading,
    reload: loadHistory,
  };
}