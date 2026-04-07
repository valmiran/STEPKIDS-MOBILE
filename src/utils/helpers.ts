import { Child } from '../types/child';
import { Reward } from '../types/reward';
import { ProgressData } from '../types/monitoring';

export let mockChildren: Child[] = [
  { id: 1, name: 'Lucas', age: 5, diagnosis: 'Pé Torto Congênito' },
  { id: 2, name: 'Clara', age: 3, diagnosis: 'Uso contínuo de órtese' },
];

export let mockRewards: Reward[] = [
  {
    id: 1,
    title: 'Adesivo Especial',
    description: 'Recompensa digital simples',
    points_required: 50,
    unlocked: true,
  },
  {
    id: 2,
    title: 'Novo Avatar',
    description: 'Desbloqueie um avatar diferente',
    points_required: 100,
    unlocked: false,
  },
];

export let mockProgress: ProgressData = {
  child_id: 1,
  child_name: 'Lucas',
  total_points: 80,
  completed_checklists: 5,
  orthosis_usage_days: 4,
  streak_days: 3,
  reward_target: 100,
};