export type MainStackParamList = {
  LoadingJourney: undefined;
  Home: undefined;

  ParentArea: undefined;
  ChildArea: undefined;

  ChildList: undefined;
  CreateChild: undefined;
  EditChild: {
    childId: string;
  };
  ChildDetails: {
    childId: string;
  };

  RegisterOrthosisUsage: undefined;
  DailyChecklist: undefined;
  Symptoms: undefined;
  History: undefined;

  Progress: undefined;
  Points: undefined;
  Ranking: undefined;
  LevelBonus: undefined;

  Rewards: undefined;
  RewardDetails: {
    rewardId: string;
  };
  Shop: undefined;

  SelectChildForGame: undefined;
  GamePlaceholder: {
    childId: string;
    childName?: string;
  };

  ActivityList: undefined;
  CreateActivity: undefined;
  ActivityHistory: undefined;
  ChildMissions: undefined;

  WeeklyReport: undefined;

  Profile: undefined;
  Settings: undefined;
  ChangePassword: undefined;
};