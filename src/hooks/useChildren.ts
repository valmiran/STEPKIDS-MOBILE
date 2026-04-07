import { useEffect, useState } from 'react';
import { Child } from '../types/child';
import { childService } from '../services/api/childService';

export function useChildren() {
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadChildren() {
    try {
      const data = await childService.getChildren();
      setChildren(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadChildren();
  }, []);

  return {
    children,
    loading,
    reload: loadChildren,
  };
}