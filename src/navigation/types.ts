import { Child } from '../types/child';

export type AuthStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  AddressRegister: { form: any };
  ForgotPassword: undefined;
  ConfirmEmail: undefined;
};

export type MainStackParamList = {
  LoadingJourney: undefined;
  Home: undefined;

  ChildList: undefined;
  CreateChild: undefined;
  EditChild: { child: Child };
  ChildDetails: { child: Child };

  RegisterOrthosisUsage: undefined;
  DailyChecklist: undefined;
  Symptoms: { mood?: string } | undefined;
  History: undefined;

  Progress: undefined;
  Points: undefined;
  Ranking: undefined;
  LevelBonus: undefined;

  Rewards: undefined;
  RewardDetails: undefined;

  ActivityList: undefined;
  CreateActivity: undefined;

  WeeklyReport: undefined;
  Profile: undefined;
  Settings: undefined;
  ChangePassword: undefined;
};