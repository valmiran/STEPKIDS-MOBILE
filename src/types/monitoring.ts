export type OrthosisUsagePayload = {
  child: string;
  childId?: string;
  used_today: boolean;
  usage_hours: number;
  notes?: string;
  date?: string;
};

export type DailyChecklistPayload = {
  child: string;
  childId?: string;
  used_today: boolean;
  felt_pain: boolean;
  slept_with_orthosis: boolean;
  restlessness?: boolean;
  notes?: string;
  date?: string;
};

export type SymptomPayload = {
  child: string;
  childId?: string;
  childName?: string;
  symptom_type: string;
  intensity: number;
  description?: string;
  mood?: string;
  date?: string;
};

export type OrthosisUsage = OrthosisUsagePayload & {
  id: string;
  createdAt?: string;
  updatedAt?: string;
};

export type DailyChecklist = DailyChecklistPayload & {
  id: string;
  pointsEarned?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type Symptom = SymptomPayload & {
  id: string;
  childId?: string;
  childName?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ProgressData = {
  child_id: string;
  child_name: string;

  total_points: number;
  total_exp: number;
  gold_coins: number;
  level: number;

  completed_checklists: number;
  orthosis_usage_days: number;
  total_orthosis_hours: number;
  completed_missions: number;
  completed_activities: number;

  streak_days: number;
  reward_target: number;
};