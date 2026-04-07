export type OrthosisUsagePayload = {
  child: number;
  used_today: boolean;
  usage_hours: number;
  notes?: string;
  date?: string;
};

export type DailyChecklistPayload = {
  child: number;
  used_today: boolean;
  felt_pain: boolean;
  slept_with_orthosis: boolean;
  restlessness?: boolean;
  notes?: string;
  date?: string;
};

export type SymptomPayload = {
  child: number;
  symptom_type: string;
  intensity: number;
  description?: string;
  date?: string;
};

export type ProgressData = {
  child_id: number;
  child_name: string;
  total_points: number;
  completed_checklists: number;
  orthosis_usage_days: number;
  streak_days: number;
  reward_target: number;
};