import { useCallback, useEffect, useState } from 'react';
import { Activity } from '../types/activity';
import { activityService } from '../services/api/activityService';

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  const loadActivities = useCallback(async () => {
    try {
      setLoading(true);
      const data = await activityService.getActivities();
      setActivities(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  return {
    activities,
    loading,
    reload: loadActivities,
  };
}